/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Describes the permitted final types checked in a relation
 */
export type Primitive = string|number|boolean;

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
export function inMemoryRelation(value: any, relation: Relation<any>) {
    // Hackaround to make objects accept on any of its (even nested) values
    if (typeof(value) === 'object') {
        for (const key in value) {
            if (inMemoryRelation(value[key], relation)) { return true; }
        }
        return false;
    }

    if (isNonPrimitive(relation)) {
        return relation.inMemory(value);
    } else {
        return value === relation;
    }
}

/**
 * Describes any non-primitive relation
 */
abstract class RelationBase {
    isRelationBase = true;
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
 * Check if a relation is a primitive or not
 * @param relation Relation to be checked
 */
function isNonPrimitive<T extends Primitive>(relation: Relation<T>): relation is RelationBase {
    return (relation as RelationBase).isRelationBase !== undefined;
}

/**
 * Describes a relation with a value directly applied.
 */
abstract class ValueRelationBase<T extends Primitive> extends RelationBase {
    /**
     * Returns the value of this relation.
     */
    abstract getValue(): T;
}

/**
 * Describes a relation with a numerical value.
 */
abstract class NumericRelation extends ValueRelationBase<number> {
    private value: number;
    precision: number;
    constructor(value: number, precision: number) {
        super();
        this.value = value;
        this.precision = precision;
    }

    getValue(): number {
        return this.value;
    }

    toSql(key: string): string {
        return this.precision >= 0 ?
            `ROUND(${key},${this.precision}) ${this.sign()} ${this.value.toFixed(this.precision)}` :
            `${key} ${this.sign()} ${this.value}`;
    }

    inMemory(value: any) {
        if (typeof(value) !== 'number') { return false; }
        return this.precision >= 0 ?
            this.match(parseFloat(this.value.toFixed(this.precision)),
                parseFloat(value.toFixed(this.precision))) :
            this.match(this.value, value);
    }

    protected abstract match(thisvalue: number, value: number): boolean;
    protected abstract sign(): string;
}

/**
 * Describes a relation with a string value.
 */
export abstract class StringRelation extends ValueRelationBase<string> {
    private value: string;
    caseSensitive: boolean;

    constructor(value: string, caseSensitive: boolean) {
        super();
        this.value = value;
        this.caseSensitive = caseSensitive;
    }

    getValue(): string {
        return this.value;
    }

    sqlLike() {
        return `LIKE${this.caseSensitive ? ' BINARY' : ''}`;
    }

    sqlEq() {
        return this.caseSensitive ? '=' : 'LIKE';
    }

    inMemory(value: any): boolean {
        if (typeof(value) !== 'string') { return false; }
        return this.caseSensitive ? this.match(this.value, value) : this.match(this.value.toLowerCase(), value.toLowerCase());
    }

    protected abstract match(thisValue: string, value: string): boolean;
}

export class Includes extends StringRelation {
    toSql(key: string): string {
        return `${key} ${this.sqlLike()} "%${this.getValue()}%"`;
    }

    protected match(thisvalue: string, value: string): boolean {
        return value.includes(thisvalue);
    }
}

export class StartsWith extends StringRelation {
    toSql(key: string): string {
        return `${key} LIKE ${this.sqlLike()} "${this.getValue()}%"`;
    }

    protected match(thisvalue: string, value: string): boolean {
        return value.startsWith(thisvalue);
    }
}

export class EndsWith extends StringRelation {
    toSql(key: string): string {
        return `${key} ${this.sqlLike()} "%${this.getValue()}"`;
    }

    protected match(thisvalue: string, value: string): boolean {
        return value.endsWith(thisvalue);
    }
}

class LT extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean {
        return value < thisvalue;
    }
    protected sign(): string {
        return '<';
    }
}

class NumEq extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean {
        return thisvalue === value;
    }

    protected sign(): string {
        return '=';
    }
}

class NumNeq extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean {
        return thisvalue !== value;
    }

    protected sign(): string {
        return '!=';
    }
}

class StrEq extends StringRelation {
    toSql(key: string): string {
        return `${key} ${this.sqlEq()} "${this.getValue()}"`;
    }

    protected match(thisvalue: string, value: string): boolean {
        return thisvalue === value;
    }
}

class StrNeq extends StringRelation {
    toSql(key: string): string {
        return `(NOT ${key} ${this.sqlEq()} "${this.getValue()}")`;
    }

    protected match(thisvalue: string, value: string): boolean {
        return thisvalue !== value;
    }
}

abstract class BoolRelation extends ValueRelationBase<boolean> {
    constructor(value: boolean) {
        super();
        this.value = value;
    }

    value: boolean;
    getValue(): boolean {
        return this.value;
    }

    inMemory(value: any): boolean {
        if (typeof(value) !== 'boolean') {  return false; }
        return this.match((value as boolean), this.value);
    }

    abstract match(thisvalue: boolean, value: boolean): boolean;
}

class BoolEq extends BoolRelation {
    match(thisvalue: boolean, value: boolean): boolean {
        return thisvalue === value;
    }
    toSql(key: string): string {
        return `(${!this.value ? '' : 'NOT '}${key} = 0)`;
    }
}

class BoolNeq extends BoolRelation {
    match(thisvalue: boolean, value: boolean): boolean {
        return thisvalue !== value;
    }

    toSql(key: string): string {
        return `(${this.value ? '' : 'NOT '}${key} = 0)`;
    }
}

class EQ<T extends Primitive> extends ValueRelationBase<T> {

    constructor(value: T, precision: number = -1) {
        super();
        this.value = value;
        this.precision = precision;
    }
    value: T;
    precision: number;
    inMemory(value: any): boolean {
        if (typeof(value) === 'string') { value = value.toLowerCase(); }
        let ow = <any> this.value;
        if (typeof(ow) === 'string') { ow = ow.toLowerCase(); }
        return value === ow;
    }

    getValue(): T {
        return this.value;
    }

    toSql(key: string): string {
        if (typeof(this.value) === 'string') {
            return `${key} = "${this.value}"`;
        } else {
            return `${key} = ${this.value}`;
        }
    }

    sign(): string {
        return '=';
    }
}

class LTE extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean {
        return value <= thisvalue;
    }
    protected sign(): string {
        return '<=';
    }
}

class GTE extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean {
        return value >= thisvalue;
    }
    protected sign(): string {
        return '>=';
    }
}

class GT extends NumericRelation {
    protected match(thisvalue: number, value: number): boolean {
        return value > thisvalue;
    }
    protected sign():  string {
        return '>';
    }
}

class AnyRelation<T extends Primitive> extends RelationBase {
    constructor(relations: Relation<T>[]) {
        super();
        this.relations = relations;
    }

    relations: Relation<T>[];
    inMemory(value: any): boolean {
        for (const relation of this.relations) {
            if (inMemoryRelation(value, relation)) { return true; }
        }
        return false;
    }

    toSql(key: string): string {
        return `(${this.relations.map(x => relationToSql(key, x)).join(' OR ')})`;
    }
}

class AllRelation<T extends Primitive> extends RelationBase {
    relations: Relation<T>[];
    constructor(relations: Relation<T>[]) {
        super();
        this.relations = relations;
    }

    toSql(key: string): string {
        return `(${this.relations.map(x => relationToSql(key, x)).join(' AND ')})`;
    }

    inMemory(value: any): boolean {
        for (const relation of this.relations) {
            if (!inMemoryRelation(value, relation)) { return false; }
        }
        return true;
    }
}

/**
 * Creates a relation for fullfilling at least one of multiple sub-relations
 * @param values Relations to be fullfilled
 */
export const any = <T extends Primitive>(...values: Relation<T>[]) => new AnyRelation(values);
/**
 * Creates a relation for fullfilling all of multiple sub-relations
 * @param values Relations to be fullfilled
 */
export const all = <T extends Primitive>(...values: Relation<T>[]) => new AllRelation(values);

/**
 * Creates a relation for checking that a value is not equal to the first argument.
 * @param value Argument checked against.
 */
export const neq = <T extends Primitive>(value: T) => {
    switch (typeof(value)) {
        case 'string':
            return new StrNeq(value, false);
        case 'number':
            return new NumNeq(value, -1);
        case 'boolean':
            return new BoolNeq(value);
    }
};

/**
 * Creates a relation for checking that a string is equal to the first argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export const streq = (value: string, caseSensitive: boolean = false) => new StrEq(value, caseSensitive);

/**
 * Creates a relation for checking that a string is not equal to the first argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export const strneq = (value: string, caseSensitive: boolean = false) => new StrNeq(value, caseSensitive);

/**
 * Creates a relation for checking that a number is equal to the first argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparisons.
 */
export const numeq = (value: number, precision: number = -1) => new NumEq(value, precision);

/**
 * Creates a relation for checking that a number is not equal to the first argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparisons.
 */
export const numneq = (value: number, precision: number = -1) => new NumNeq(value, precision);

/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value
 * @param precision Decimal precision for numeric comparisons.
 */
export const lte = (value: number, precision: number = -1) => new LTE(value, precision);

/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value
 * @param precision Decimal precision for numeric comparisons.
 */
export const lt = (value: number, precision: number = -1) => new LT(value, precision);

/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparison.
 */
export const gt = (value: number, precision: number= -1) => new GT(value, precision);

/**
 * Creates a relation for checking that a number is greater than the argument
 * @param value Argument checked against
 * @param precision Decimal precision for numeric comparison.
 */
export const gte = (value: number, precision: number= -1) => new GTE(value, precision);

/**
 * Creates a relation for checking that a string ends with the argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export const ends = (value: string, caseSensitive: boolean = false) => new EndsWith(value, caseSensitive);

/**
 * Creates a relation for checking that a string starts with the argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export const starts = (value: string, caseSensitive: boolean = false) => new StartsWith(value, caseSensitive);

/**
 * Creates a relation for checking that a string starts with the argument
 * @param value Argument checked against
 * @param caseSensitive Whether the comparison should be case sensitive
 */
export const includes = (value: string, caseSensitive: boolean = false) => new Includes(value, caseSensitive);

/**
 * Creates a relation for checking that a value is equal to the first argument.
 * @param value Argument checked against.
 */
export const eq = <T extends Primitive>(value: T) => {
    switch (typeof(value)) {
        case 'string':
            return streq(value);
        case 'number':
            return numeq(value);
        case 'boolean':
            return new BoolEq(value);
    }
};

/**
 * Transforms a relation to sql code
 * @param key Name of the key to write in sql
 * @param relation Relation to be translated
 */
export function relationToSql<T extends Primitive>(key: string, relation: Relation<T>) {
    if (isNonPrimitive(relation)) {
        return relation.toSql(key);
    } else {
        return eq(relation).toSql(key);
    }
}
