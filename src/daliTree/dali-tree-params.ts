export interface DaliTreeParams {
    renderDom: any,
    loadType: LoadType,
    lazyRender: Object,
    dataInterface: any,
    loadComplete: Function,
    loadBefore: Function,
    renderComplete: Function,
    nodeExpandAfter: Function,
    nodeClick: Function,
    nodeDbclick: Function
}
export enum LoadType {async = 'async', sync = 'sync'};