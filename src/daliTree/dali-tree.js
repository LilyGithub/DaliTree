import {Util} from './util';
import Event from './event';
export default class DaliTree extends Event {
    constructor(options){
        super();
        this.nodes = [];
        this.options = {
            type: 'async',
            ...options
        }
        this.nodesMap = {};
        this.init();
    }
    init(){
        let {dataInterface} = this.options;
        if (dataInterface) {
            dataInterface().then(nodeData=>{
                if (!(nodeData instanceof Array)) {
                    nodeData = [nodeData];
                }
                this.nodes =  nodeData;
                this._addToNodeMap(nodeData);
                this.render();
            })
        }
    }
    render(){
        let {nodes, options} = this;
        let {renderDom} = options;

        this._renderNodes({
            renderId: '_rootNode',
            nodes: nodes,
            renderDom: renderDom
        });
        this._bindEvnetAgent();
    }

    _nodeHtmlGenerator(node){
        return `${node.name}`;
    }
    _addToNodeMap(nodes){
        if(!nodes || !nodes.length){
            return;
        }
        let _this = this;
        nodes.map(n=>{
            _this.nodesMap[n.id] = n;
            _this._addToNodeMap(n.childNodes);
        });
    }

    _renderNodes(opt){
        let {nodes, renderDom} = opt;
        if(!nodes){
            return;
        }
        let fakeDom = document.createElement('div');
        this._generateRenderNodes(nodes, fakeDom);
        renderDom.appendChild(fakeDom);
    }
    /*
    * 渲染到临时dom，一次性渲染到真实dom，减少浏览器重排重绘次数
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
         //节点dom
         let currentDom = document.createElement('li');
         currentDom.setAttribute('dali-id', node.id);
         currentDom.setAttribute('dali-type', 'node');
         //渲染label
         this._renderMainLabel(node, currentDom);
         //渲染到当前节点
         if(node.isParent && node.expand){
             //子节点
             let childsDom = document.createElement('ul');
             childsDom.setAttribute('dali-type', 'child');
             currentDom.appendChild(childsDom);
             this._generateRenderNodes(node.childNodes, childsDom);
         }
         //渲染到根节点
         renderDom.appendChild(currentDom);
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
        childsDom.setAttribute('dali-type', 'child');
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
            tagDom.setAttribute('dali-type', 'expand');
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
        labelDom.setAttribute('dali-type', 'label');
        renderDom.appendChild(labelDom);
    }
     /*
    *  渲染checkbox节点
    */
    _renderCheckBoxDom(node, renderDom) {
        let checkBoxDom = document.createElement('span');
        let t = node.checked ? 'dali-checked' : 'dali-un-checked';
        checkBoxDom.setAttribute('id', `check-box-${node.id}`);
        checkBoxDom.setAttribute('dali-type', 'check-box');
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
            let srcElemt = document.getElementById(`check-box-${node.id}`);
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
   _bindEvnetAgent(){
        let {renderDom} = this.options;
        let _this = this;
        renderDom.addEventListener("click", e => {
            let srcElemt = e.srcElement;
            let daliType = srcElemt.getAttribute('dali-type');
            switch (daliType) {
                case 'expand': 
                    _this._evnetTrigger_expand(e);
                    break;
                case 'check-box':
                    _this._evnetTrigger_check(e);
                    break;
            }
        });
    }
    _evnetTrigger_expand(e){
        let srcElemt = e.srcElement;
        let nodeDom = srcElemt.parentNode;
        let daliId = nodeDom.getAttribute('dali-id');
        let node = this.nodesMap[daliId];
        node.expand = !node.expand;
        if(node.expand){
            this._expandNodes(node, nodeDom);
        }else{
            this._unExpandNodes(node, nodeDom);
        }
    }
    _evnetTrigger_check(e){
        let srcElemt = e.srcElement;
        let nodeDom = srcElemt.parentNode;
        let daliId = nodeDom.getAttribute('dali-id');
        let node = this.nodesMap[daliId];
        this._checkNode(node, !node.checked);
    }
}