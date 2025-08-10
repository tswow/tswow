export declare class DBCBufferArray<T> {
    readonly length: number;
    constructor(size: number, reader: (index: number) => T, writer: (index: number, value: T) => void);
}
