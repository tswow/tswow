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
import * as assert from 'assert';
import { deepAssign, isDifferentType } from '../../data/table/DeepAssign';

describe('deepAssign', function() {
    it('works with primitives', function() {
        assert.deepStrictEqual(deepAssign({a: 20}, {a: 30}), {a: 30});
        assert.deepStrictEqual(deepAssign({a: 'k'}, {a: 'c'}), {a: 'c'});
        assert.deepStrictEqual(deepAssign({a: true}, {a: false}), {a: false});
    });

    it('works with lists', function() {
        assert.deepStrictEqual(deepAssign({a: [1, 2, 3]}, {a: [4]}), {a: [4, 2, 3]});
        assert.deepStrictEqual(deepAssign({a: [1, 2, 3]}, {a: [4, 5]}), {a: [4, 5, 3]});
        assert.deepStrictEqual(deepAssign({a: [1, 2, 3]}, {a: [4, 5, 6, 7]}), {a: [4, 5, 6, 7]});
    });

    it('works with sub-objects', function() {
        assert.deepStrictEqual(deepAssign({a: {b: 25, d: 5}}, {a: {b: 90, c: 100}}), {a: {b: 90, c: 100, d: 5}});
    });
});

describe('isDifferentType', function() {
    it('gives true negatives', function() {
        assert.strictEqual(isDifferentType('a', 'k'), false);
        assert.strictEqual(isDifferentType(1, 200), false);
        assert.strictEqual(isDifferentType(false, true), false);
        assert.strictEqual(isDifferentType({a: 25}, {}), false);
        assert.strictEqual(isDifferentType({a: 25}, [10, 10]), false);
    });

    it('gives true positives', function() {
        assert.strictEqual(isDifferentType('a', 10), true);
        assert.strictEqual(isDifferentType(10, 'a'), true);
        assert.strictEqual(isDifferentType(true, 'a'), true);
        assert.strictEqual(isDifferentType({}, 'a'), true);
        assert.strictEqual(isDifferentType('a', []), true);
    });

    it('works with undefineds', function( ) {
        assert.strictEqual(isDifferentType(undefined, 'k'), false);
    });

    it('works with bigint/number', function() {
        assert.strictEqual(isDifferentType(BigInt(999), 0), false);
        assert.strictEqual(isDifferentType(0, BigInt(999)), false);
    });
});
