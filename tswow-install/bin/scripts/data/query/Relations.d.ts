/**
 * Describes the permitted final types checked in a relation
 */
export type Primitive = string | number | boolean;
/**
 * Describes the most arbitrary form of a relation
 *
 * A relation of type T implicitly means it's an equivalence relation
 */
export type Relation<T extends Primitive> = RelationBase | T;
/**
 * Performs the function of a relation against an in-memory value.
 * @param value Value to be checked
 * @param relation Relation to be checked against
 */
export declare function inMemoryRelation(value: any, relation: Relation<any>): boolean;
/**
 * Describes any non-primitive relation
 */
declare abstract class RelationBase {
    isRelationBase: boolean;
    /**
     * Transforms this relation to sql code
     * @param key Name of the key to write in sql
     */
    abstract toSql(key: string): string;
    /**
     * Performs the function of this relation against an in-memory value.
     * @param value Value to be checked
     */
    abstract inMemory(value: any): boolean;
}
/**
 * Describes a relation with a value directly applied.
 */
declare abstract class ValueRelationBase<T extends Primitive> extends RelationBase {
    /**
     * Returns the value of this relation.
     */
    abstract getValue(): T;
}
/**
 * Describes a relation with a numerical value.
 */
declare abstract class NumericRelation extends ValueRelationBase<number> {
    private value;
    precision: number;
    constructor(value: number, precision: number);
    getValue(): number;
    toSql(key: string): string;
    inMemory(value: any): boolean;
    protected abstract match(thisvalue: number, value: number): boolean;
    protected abstract sign(): string;
}
/**
 * Describes a relation with a string value.
 */
export declare abstract class StringRelation extends ValueRelationBase<string> {
    private value;
    caseSensitive: boolean;
    constructor(value: string, caseSensitive: boolean);
    getValue(): string;
    sqlLike(): string;
    sqlEq(): "=" | "LIKE";
    inMemory(value: any): boolean;
    protected abstract match(thisValue: string, value: string): boolean;
}
export declare class Includes extends StringRelation {
    toSql(key: string): string;
    protected match(thisvalue: string, value: string): boolean;
}
export declare class StartsWith extends StringRelation {
    toSql(key: string): string;
    protected match(thisvalue: string, value: string): boolean;
}
export declare class EndsWith extends StringRelation {
    toSql(key: string): string;
    protected match(thisvalue: string, value: string): boolean;
}
declare class LT extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean;
    protected sign(): string;
}
declare class NumEq extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean;
    protected sign(): string;
}
declare class NumNeq extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean;
    protected sign(): string;
}
declare class StrEq extends StringRelation {
    toSql(key: string): string;
    protected match(thisvalue: string, value: string): boolean;
}
declare class StrNeq extends StringRelation {
    toSql(key: string): string;
    protected match(thisvalue: string, value: string): boolean;
}
declare abstract class BoolRelation extends ValueRelationBase<boolean> {
    constructor(value: boolean);
    value: boolean;
    getValue(): boolean;
    inMemory(value: any): boolean;
    abstract match(thisvalue: boolean, value: boolean): boolean;
}
declare class BoolEq extends BoolRelation {
    match(thisvalue: boolean, value: boolean): boolean;
    toSql(key: string): string;
}
declare class BoolNeq extends BoolRelation {
    match(thisvalue: boolean, value: boolean): boolean;
    toSql(key: string): string;
}
declare class LTE extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean;
    protected sign(): string;
}
declare class GTE extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean;
    protected sign(): string;
}
declare class GT extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean;
    protected sign(): string;
}
declare class AnyRelation<T extends Primitive> extends RelationBase {
    constructor(relations: Relation<T>[]);
    relations: Relation<T>[];
    inMemory(value: any): boolean;
    toSql(key: string): string;
}
declare class AllRelation<T extends Primitive> extends RelationBase {
    relations: Relation<T>[];
    constructor(relations: Relation<T>[]);
    toSql(key: string): string;
    inMemory(value: any): boolean;
}
/**
 * Creates a relation for fullfilling at least one of multiple sub-relations
 * @param values Relations to be fullfilled
 */
export declare const any: <T extends Primitive>(...values: Relation<T>[]) => AnyRelation<T>;
/**
 * Creates a relation for fullfilling all of multiple sub-relations
 * @param values Relations to be fullfilled
 */
export declare const all: <T extends Primitive>(...values: Relation<T>[]) => AllRelation<T>;
/**
 * Creates a relation for checking that a value is not equal to the first argument.
 * @param value Argument checked against.
 */
export declare const neq: <T extends Primitive>(value: T) => NumNeq | StrNeq | BoolNeq;
/**
 * Creates a relation for checking that a string is equal to the first argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export declare const streq: (value: string, caseSensitive?: boolean) => StrEq;
/**
 * Creates a relation for checking that a string is not equal to the first argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export declare const strneq: (value: string, caseSensitive?: boolean) => StrNeq;
/**
 * Creates a relation for checking that a number is equal to the first argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparisons.
 */
export declare const numeq: (value: number, precision?: number) => NumEq;
/**
 * Creates a relation for checking that a number is not equal to the first argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparisons.
 */
export declare const numneq: (value: number, precision?: number) => NumNeq;
/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value
 * @param precision Decimal precision for numeric comparisons.
 */
export declare const lte: (value: number, precision?: number) => LTE;
/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value
 * @param precision Decimal precision for numeric comparisons.
 */
export declare const lt: (value: number, precision?: number) => LT;
/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparison.
 */
export declare const gt: (value: number, precision?: number) => GT;
/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparison.
 */
export declare const gte: (value: number, precision?: number) => GTE;
/**
 * Creates a relation for checking that a string ends with the argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export declare const ends: (value: string, caseSensitive?: boolean) => EndsWith;
/**
 * Creates a relation for checking that a string starts with the argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export declare const starts: (value: string, caseSensitive?: boolean) => StartsWith;
/**
 * Creates a relation for checking that a string starts with the argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export declare const includes: (value: string, caseSensitive?: boolean) => Includes;
/**
 * Creates a relation for checking that a value is equal to the first argument.
 * @param value Argument checked against.
 */
export declare const eq: <T extends Primitive>(value: T) => NumEq | StrEq | BoolEq;
/**
 * Transforms a relation to sql code
 * @param key Name of the key to write in sql
 * @param relation Relation to be translated
 */
export declare function relationToSql<T extends Primitive>(key: string, relation: Relation<T>): string;
export {};
