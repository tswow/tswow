import { CellWrapper, CPrim } from "./Cell";
export interface PendingCell {
    exists(): boolean;
}
export declare class CellWrapperExists<D extends CPrim, T> extends CellWrapper<D, T> implements PendingCell {
    exists(): any;
}
