import {Util} from './util';
import DaliTree from './dali-tree';
export default class DaliLazyTree extends DaliTree {
    constructor() {
        super();
        this.keepRendingMap = {};
    }
     /**
     * 懒渲染（渲染一会休息一会)
     */
    async _renderNodes(opt){
        let {nodes, renderId, renderDom} = opt;
        if(!nodes){
            return;
        }
        this._addRending(renderId); //持续渲染
        let {lazyRender} = this.options;
        let {time, maxNum} = lazyRender;
        let t = 0;
        while(t < nodes.length){
            t = t+maxNum;
            for(let i=t-maxNum; i<t+maxNum && i<nodes.length; i++){
                this._depthLoopNode(nodes[i], renderDom);
            }
            await Util.awaitPromise(time); //休息200毫秒
            if (!this.keepRendingMap[renderId]) {
                break;
            }
        }
        console.info('dali tree update complete.')
    }
    _addRending(rendingId){
        this.keepRendingMap[rendingId] = true;
    }
    _cancelRending(rendingId){
        this.keepRendingMap[rendingId] && delete this.keepRendingMap[rendingId];
    }
}