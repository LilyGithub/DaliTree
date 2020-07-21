import {DaliTreeParams} from './dali-tree-params';
import {PAGER} from '../dictionnary/index';
export interface DaliPaginationParams extends DaliTreeParams{
    pagination: Pagination
}
interface Pagination {
    pageSize: Number,
    pageDomGenerator: Function,
    pager: PAGER
}