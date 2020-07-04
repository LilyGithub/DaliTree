class TreeNode {
    id: string;
    label: string;
    isParent: Boolean;
    checked: Boolean; //是否选中
    childNodes: Array<TreeNode>;
    expand: Boolean;
    nodeHtmlHandle: Function;
    _hasLoadData: Boolean; //sync时加载状态

    constructor(){
        
    }
}