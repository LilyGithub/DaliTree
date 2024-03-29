import ERR_CODE from './errCode';
export {
    ERR_CODE
}
export enum DOM_ATTR {dali_type = 'dali_type', dali_id = 'dali_id'};
export enum PAGER {server='server', client='client'};
export enum DOM_TYPE {
    root = 'root',
    expand = 'expand',
    check_box = 'check_box',
    node = 'node',
    childs = 'childs',
    label = 'label',
    loading = 'loading',
    pagination = 'pagination'
};