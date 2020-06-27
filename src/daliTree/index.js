import {Util} from './util';
export default class DaliTree {
    constructor(options){
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
                this.nodes =  nodeData;
                this._addToNodeMap(nodeData);
                this.render();
            })
        }
    }
    render(){
        let {nodes, options} = this;
        let {renderDom} = options;

        this._renderNodes(nodes, renderDom);
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

    _renderNodes(nodes, renderDom){
        if(!nodes){
            return;
        }
        let fakeDom = document.createElement('div');
        this._generateRenderNodes(nodes, fakeDom);
        console.info("ok")
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
         if(node.isParent && node.expend){
             //子节点
             let childsDom = document.createElement('ul');
             childsDom.setAttribute('dali-type', 'child');
             currentDom.appendChild(childsDom);
             this._generateRenderNodes(node.childNodes, childsDom);
         }
         //渲染到根节点
         renderDom.appendChild(currentDom);
    }
    /**
     * 懒渲染（渲染一会休息一会)
     */
    async _renderNodesLazy(nodes, renderDom){
        if(!nodes){
            return;
        }
        let {lazyRender} = this.options;
        let {time, maxNum} = lazyRender;
        let t = 0;
        while(t < nodes.length){
            t = t+maxNum;
            for(let i=t-maxNum; i<t+maxNum && i<nodes.length; i++){
                this._depthLoopNode(nodes[i], renderDom);
            }
            await Util.awaitPromise(time); //休息200毫秒
        }
        console.info('dali tree update complete.')
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
        this._renderNodesLazy(node.childNodes, childsDom);
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
    _renderExpandDom(node, renderDom){
        if(node.isParent){
            let tagDom = document.createElement('span');
            let t = node.expend ? 'dali-expand' : 'dali-un-expand';
            tagDom.setAttribute('dali-type', 'expand');
            tagDom.setAttribute('class', t);
            //tagDom.innerText = t;
            renderDom.appendChild(tagDom)
        }
    }
    /*
    *  渲染label
    */
    _renderLabelDom(node, renderDom){
        let nodeHtmlGenerator = node.nodeHtmlGenerator || this._nodeHtmlGenerator;
        let labelDom = document.createElement('span');
        labelDom.innerHTML = nodeHtmlGenerator(node);
        labelDom.setAttribute('dali-type', 'label');
        renderDom.appendChild(labelDom);
    }
     /*
    *  渲染checkbox节点
    */
    _renderCheckBoxDom(node, renderDom){
        let checkBoxDom = document.createElement('span');
        let t = node.checked ? 'dali-checked' : 'dali-un-checked1';
        checkBoxDom.setAttribute('dali-type', 'check-box');
        checkBoxDom.setAttribute('class', 'dali-checkbox '+t);
        //tagDom.innerText = t;
        renderDom.appendChild(checkBoxDom)
    }
    _bindEvnetAgent(){
        let {renderDom} = this.options;
        let _this = this;
        renderDom.addEventListener("click", e => {
            let srcElemt = e.srcElement;
            let daliType = srcElemt.getAttribute('dali-type');
            switch (daliType) {
                case 'expand': 
                    let nodeDom = srcElemt.parentNode;
                    let daliId = nodeDom.getAttribute('dali-id');
                    let node = _this.nodesMap[daliId];
                    node.expend = !node.expend;
                    if(node.expend){
                        _this._expandNodes(node, nodeDom);
                    }else{
                        _this._unExpandNodes(node, nodeDom);
                    }
                    break;
                case 'check-box':
                    let nodeDom1 = srcElemt.parentNode;
                    let daliId1 = nodeDom1.getAttribute('dali-id');
                    let node1 = _this.nodesMap[daliId1];
                    node1.checked = !node1.checked;
                    let t = node1.checked ? 'dali-checked' : 'dali-un-checked1';
                    srcElemt.setAttribute('class', 'dali-checkbox '+t);
                    nodeDom1.setAttribute('class', t+'-parent');
                    break;
            }
        });
    }
}