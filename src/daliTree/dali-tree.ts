import {Util} from './util';
import Event from './event';
import { ERR_CODE, DOM_ATTR, DOM_TYPE} from './dictionnary/index';
import { LoadType, DaliTreeParams} from './dali-tree-params';
export default class DaliTree extends Event {
    nodes: Array<TreeNode>;
    options: DaliTreeParams;
    nodesMap: Object;
    
    constructor(options){
        super();
        this.nodes = [];
        this.options = {
            loadType: LoadType.sync,
            ...options
        }
        let {dataInterface, loadComplete, loadBefore} = this.options;
        if (dataInterface instanceof Function) {
            this.options.dataInterface = (node) => {
                loadBefore && loadBefore(node);
                let netApi = dataInterface();
                if (netApi && netApi.then) {
                    return new Promise(resolve => {
                        netApi.then( data => {
                            loadComplete && loadComplete(node, data);
                            resolve(data);
                        })
                    });
                }
                return netApi;
            }
        }
        this.nodesMap = {};
        this.init();
    }
    /**
     * @description 树初始化
     */
    init(){
        let {dataInterface} = this.options;
        if (dataInterface) {
            if (dataInterface instanceof Function) {
                let nodeDataApi = dataInterface();
                if (nodeDataApi instanceof Promise) {
                    nodeDataApi.then(nodeData=>{
                        this._initNodeMap(nodeData);
                    })
                } else {
                    let nodeData = nodeDataApi;
                    this._initNodeMap(nodeData);
                }
            } else if (dataInterface instanceof Object) {
                let nodeData = dataInterface;
                this._initNodeMap(nodeData);
            }
        }
    }
    /**
     * @description 初始化nodemap,便于后续节点查找速度
     * @param {} nodeData 节点构造Object
     */
    _initNodeMap(nodeData){
        if (!(nodeData instanceof Array)) {
            nodeData = [nodeData];
        }
        this.nodes =  nodeData;
        this._addToNodeMap(nodeData);
        this.render();
    }
    /**
     * @description 把nodes添加到nodeMap中
     * @param {*} nodes 
     */
    _addToNodeMap(nodes: Array<TreeNode>){
        if(!nodes || !nodes.length){
            return;
        }
        let _this = this;
        nodes.map(n=>{
            _this.nodesMap[n.id] = n;
            _this._addToNodeMap(n.childNodes);
        });
    }
    /**
     * @description 树渲染
     */
    render(){
        let {nodes, options} = this;
        let {renderDom, renderComplete} = options;

        this._renderNodes({
            renderId: '_rootNode',
            nodes: nodes,
            renderDom: renderDom
        });
        this._bindEvnetAgent();
        //render complete
        renderComplete && renderComplete(nodes);
    }
    /**
     * @description 默认的节点node节点标签生成器
     * @param {*} node 
     */
    _nodeHtmlGenerator(node){
        return `${node.name}`;
    }
    /**
     * @description 渲染树节点
     * @param {*} opt 
     */
    _renderNodes(opt){
        let {nodes, renderDom} = opt;
        if(!nodes){
            return;
        }
        let fakeDom = document.createElement('div');
        this._generateRenderNodes(nodes, fakeDom);
        renderDom.appendChild(fakeDom);
    }
    /**
     * @description 渲染到临时dom，一次性渲染到真实dom，减少浏览器重排重绘次数
     */
    _generateRenderNodes(nodes, renderDom){
        if(!nodes){
            return;
        }
        nodes.map(n=>{
            this._depthLoopNode(n, renderDom);
        })
    }
    /*
    * 深度优先遍历渲染node
    */
    _depthLoopNode(node, renderDom){
        let {options} = this;
        let {dataInterface} = options;
         //节点dom
         let currentDom = document.createElement('li');
         currentDom.setAttribute(DOM_ATTR.dali_id, node.id);
         currentDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.node);
         //渲染label
         this._renderMainLabel(node, currentDom);
         //渲染到当前节点
         if(node.isParent && node.expand){
             if (options.loadType === LoadType.async) {
                let dataApi = dataInterface(node);
                if (dataApi instanceof Promise) {
                    dataApi.then(data => {
                        node.childNodes = data;
                        this._generateChildNodes(node, currentDom);
                    });
                } else {
                    Log.info(ERR_CODE.NEED_PROMISE);
                }
             } else {
                this._generateChildNodes(node, currentDom);
             }
         }
         //渲染到根节点
         renderDom.appendChild(currentDom);
    }
    /**
     * @deprecated 生产孩子节点
     */
    _generateChildNodes(node, currentDom){
        //子节点
        let childsDom = document.createElement('ul');
        childsDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.childs);
        currentDom.appendChild(childsDom);
        this._generateRenderNodes(node.childNodes, childsDom);
    }
    /*
    * 选中每个node的label部分包括所有按钮
    */
    _renderMainLabel(node, renderDom){
        //缩展按钮
        this._renderExpandDom(node, renderDom);
        //渲染checkbox
        this._renderCheckBoxDom(node, renderDom);
        //渲染label
        this._renderLabelDom(node, renderDom);
    }
    /*
    *  展开节点
    */
    _expandNodes(node, renderDom){
        renderDom.innerHTML = '';
        this._renderMainLabel(node, renderDom);
        //子节点
        let childsDom = document.createElement('ul');
        childsDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.childs);
        this._renderNodes({
            renderId: node.id,
            nodes: node.childNodes, 
            renderDom: childsDom
        });
        renderDom.appendChild(childsDom);
    }
    /*
    *  收起节点
    */
    _unExpandNodes(node, renderDom){
        renderDom.innerHTML = '';
        //缩展按钮
        this._renderMainLabel(node, renderDom);
    }
    /*
    *  渲染缩展按钮
    */
    _renderExpandDom(node, renderDom) {
        if(node.isParent){
            let tagDom = document.createElement('span');
            let t = node.expand ? 'dali-expand' : 'dali-un-expand';
            tagDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.expand);
            tagDom.setAttribute('class', t);
            //tagDom.innerText = t;
            renderDom.appendChild(tagDom)
        }
    }
    /*
    *  渲染label
    */
    _renderLabelDom(node, renderDom) {
        let nodeHtmlGenerator = node.nodeHtmlGenerator || this._nodeHtmlGenerator;
        let labelDom = document.createElement('span');
        labelDom.innerHTML = nodeHtmlGenerator(node);
        labelDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.label);
        renderDom.appendChild(labelDom);
    }
     /*
    *  渲染checkbox节点
    */
    _renderCheckBoxDom(node, renderDom) {
        let checkBoxDom = document.createElement('span');
        let t = node.checked ? 'dali-checked' : 'dali-un-checked';
        checkBoxDom.setAttribute('id', `${DOM_TYPE.check_box}-${node.id}`);
        checkBoxDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.check_box);
        checkBoxDom.setAttribute('class', t);
        //tagDom.innerText = t;
        renderDom.appendChild(checkBoxDom)
    }
    /**
     * check child
     */
    _checkNode(node, checkStatus) {
        if (node instanceof Array) {
            node.map(n => {
                this._checkNode(n, checkStatus);
            });
        } else {
            let srcElemt = document.getElementById(`${DOM_TYPE.check_box}-${node.id}`);
            node.checked = checkStatus;
            node.checkChilds = checkStatus;
            if (srcElemt && srcElemt.setAttribute) {
                let t = node.checked ? 'dali-checked' : 'dali-un-checked';
                srcElemt.setAttribute('class', t);
            }
            node.childNodes && this._checkNode(node.childNodes, checkStatus);
        }
    }
   /******************************************************************************event****************************** */
    /**
     * @description 点击事件 事件代理
     * @param {*} e 
     */
   _bindEvnetAgent() {
        let {renderDom} = this.options;
        let _this = this;
        renderDom.addEventListener("click", e => {
            let srcElemt = e.srcElement;
            let daliType = srcElemt.getAttribute(DOM_ATTR.dali_type);
            switch (daliType) {
                case DOM_TYPE.expand: 
                    _this._evnetTrigger_expand(e);
                    break;
                case DOM_TYPE.check_box:
                    _this._evnetTrigger_check(e);
                    break;
            }
        });
    }
    /**
     * @description 点击事件 点击展开收起按钮
     * @param {*} e 
     */
    _evnetTrigger_expand(e) {
        let srcElemt = e.srcElement;
        let nodeDom = srcElemt.parentNode;
        let daliId = nodeDom.getAttribute(DOM_ATTR.dali_id);
        let node = this.nodesMap[daliId];
        node.expand = !node.expand;
        if(node.expand){
            this._expandNodes(node, nodeDom);
        }else{
            this._unExpandNodes(node, nodeDom);
        }
    }
     /**
     * @description 点击事件 点击check框
     * @param {*} e 
     */
    _evnetTrigger_check(e) {
        let srcElemt = e.srcElement;
        let nodeDom = srcElemt.parentNode;
        let daliId = nodeDom.getAttribute(DOM_ATTR.dali_id);
        let node = this.nodesMap[daliId];
        this._checkNode(node, !node.checked);
    }
}