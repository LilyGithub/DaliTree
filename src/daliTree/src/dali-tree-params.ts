export interface DaliTreeParams {
    renderDom: any,
    loadType: LoadType,
    lazyRender: Object,
    dataInterface: any,
    loadComplete: Function,
    loadBefore: Function,
    renderComplete: Function,
    nodeExpandBefore: Function,
    nodeExpandAfter: Function,
    nodeClick: Function,
    nodeDbclick: Function,
    checkBefore: Function,
    checkAfter: Function
}
export enum LoadType {async = 'async', sync = 'sync'};