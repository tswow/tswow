export declare abstract class CellRoot<T> {
    constructor(owner: T);
    protected get isCell(): boolean;
    protected owner: T;
    static owner<T>(cell: CellRoot<T>): T;
    static isCell(candidate: any): boolean;
    protected abstract objectify(): any;
    protected abstract deserialize(value: any): void;
    protected serialize(obj: any, key: string): void;
    get end(): T;
}
