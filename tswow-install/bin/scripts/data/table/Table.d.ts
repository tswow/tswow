import { Row } from './Row';
export declare abstract class Table<C, Q, R extends Row<C, Q>> {
    name: string;
    constructor(name: string);
    abstract first(): R;
    abstract queryAll(predicate: Q): R[];
    /**
     * Returns the first row matching a predicate
     * @param predicate
     * @param defValue
     */
    query(predicate: Q): R;
}
