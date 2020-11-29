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
import { Row } from './Row';

export abstract class Table<C, Q, R extends Row<C, Q>> {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract first(): R;
    abstract filter(predicate: Q): R[];

    /**
     * Return the first row matching a predicate.
     * @param predicate
     * @param tag Identifier used for error messages
     * @throws if no row is found matching predicate
     */
    findAssert(tag: string, predicate: Q): R {
        const value = this.findUnsafe(predicate);
        if (!value) {
            throw new Error(`Row not found:${tag}`);
        }
        return value;
    }

    /**
     * Returns a unique row matching a predicate.
     * @param tag Identifier used for error messages
     * @param predicate
     * @throws if no or multiple rows are found matching predicate.
     */
    findUnique(tag: string, predicate: Q): R {
        const values = this.filter(predicate);
        if (values.length === 0) {
            throw new Error(`Row not found:${tag}`);
        }

        if (values.length > 1) {
            throw new Error(`Multiple rows found:${tag}`);
        }

        return values[0];
    }

    /**
     * Returns the first row matching the predicate.
     * @param predicate
     */
    findUnsafe(predicate: Q): R | undefined {
        return (this.filter(predicate))[0];
    }

    /**
     * Returns the first row matching a predicate, or a default value
     * @param predicate
     * @param defValue
     */
    find(predicate: Q, defValue?: R): R {
        const unsafe = this.findUnsafe(predicate);
        if (unsafe === undefined || unsafe === null) {
            return <R> defValue;
        }
        return unsafe;
    }
}
