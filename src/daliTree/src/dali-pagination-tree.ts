import {Util} from './util/util';
import DaliTree from './dali-tree';
import {DaliPaginationParams} from './entity/dali-pagination-tree-params';
import { ERR_CODE, DOM_ATTR, DOM_TYPE} from './dictionnary/index';

export default class DaliPaginationTree extends DaliTree {
    options: DaliPaginationParams
    constructor(options) {
        super(options);
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
        //渲染paginationParams
        this._renderPagination(node, renderDom);
    }
    /**
     * 渲染分页dom
     */
    _renderPagination(node, renderDom) {
        let {pagination} = this.options;
        let pageDomGenerator = pagination && pagination.pageDomGenerator || this._pageDomGenerator;
        let pageDom = document.createElement('span');
        pageDom.innerHTML = pageDomGenerator(node);
        pageDom.setAttribute(DOM_ATTR.dali_type, DOM_TYPE.pagination);
        pageDom.setAttribute('id', `${DOM_TYPE.pagination}-${node.id}`);
        renderDom.appendChild(pageDom);

    }
    /**
     * 默认分页dom生成器
     */
    _pageDomGenerator(node) {
        return '<span>分页</span>';
    }
}