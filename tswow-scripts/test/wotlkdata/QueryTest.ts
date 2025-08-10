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
import { DBC } from '../../wotlk/DBCFiles';
import { inMemory, qall, qany, queryToSql } from '../../data/query/Query';
import { all, any, eq, gt, gte, includes, lt, lte, neq, numeq, numneq, streq, strneq } from '../../data/query/Relations';

describe('Query', function() {
    describe('AllQuery', function() {
        it('exports correctly to sql', function() {
            assert.strictEqual(queryToSql(qall({k: 1}, {k: 1})),
            '(`k` = 1) AND (`k` = 1);');

            assert.strictEqual(queryToSql(qall({k: 1, k1: 2}, {k: 1, k1: 2})),
            '(`k` = 1 AND `k1` = 2) AND (`k` = 1 AND `k1` = 2);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory(qall({k: 1}, {k: lt(2)}, {k: gt(0)}), {k: 1}), true);
            assert.strictEqual(inMemory(qall({k: 1}, {k: lt(2)}, {k: gt(2)}), {k: 1}), false);
            assert.strictEqual(inMemory(qall({k: 3}, {k: lt(0)}, {k: gt(4)}), {k: 1}), false);
        });
    });

    describe('AnyQuery', function() {
        it('exports correctly to sql', function() {
            assert.strictEqual(queryToSql(qany({k: 1}, {k: 1})),
            '(`k` = 1) OR (`k` = 1);');

            assert.strictEqual(queryToSql(qany({k: 1, k1: 2}, {k: 1, k1: 2})),
            '(`k` = 1 AND `k1` = 2) OR (`k` = 1 AND `k1` = 2);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory(qany({k: 1}, {k: lt(2)}, {k: gt(0)}), {k: 1}), true);
            assert.strictEqual(inMemory(qany({k: 1}, {k: lt(2)}, {k: gt(2)}), {k: 1}), true);
            assert.strictEqual(inMemory(qany({k: 3}, {k: lt(0)}, {k: gt(4)}), {k: 1}), false);
        });
    });

    describe('DeepMatch', function() {
        it('works with flat objects', function() {
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: {enGb: 'hi', frFR: 'bonjour'}}), true);
            assert.strictEqual(inMemory({Lang: 'hello'}, {Lang: {enGb: 'hi', frFR: 'bonjour'}}), false);
        });

        it('works with deep objects and incorrect types', function() {
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: {a: {aa: 'hi'}}}), true);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: {a: {aa: 'hii', bb: false, d: 9}}}), false);
        });

        it('works with flat lists', function() {
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: ['hi', 'bye']}), true);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: ['bye', 'hi']}), true);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: ['bye', 'hi', 'bye', 'hi']}), true);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: ['bye']}), false);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: ['bye', 'bye']}), false);
        });

        it('works with deep lists and incorrect types', function() {
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: [['hi', 0]]}), true);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: [['bye'], 5, ['hi'], 'bye']}), true);
            assert.strictEqual(inMemory({Lang: 'hi'}, {Lang: [[], ['bye'], false]}), false);
        });
    });
});

describe('Relations', function() {
    describe('StrEq', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: streq('v')}), '`k` LIKE "v";');
            assert.strictEqual(queryToSql({k: streq('v', true)}), '`k` = "v";');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: streq('v')}, {k: 'v'}), true);
            assert.strictEqual(inMemory({k: streq('v1')}, {k: 'v2'}), false);
        });
    });

    describe('StrNeq', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: strneq('v')}), '(NOT `k` LIKE "v");');
            assert.strictEqual(queryToSql({k: strneq('v', true)}), '(NOT `k` = "v");');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: strneq('v')}, {k: 'v'}), false);
            assert.strictEqual(inMemory({k: strneq('v1')}, {k: 'v2'}), true);
        });
    });

    describe('NumEq', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: numeq(1.001)}), '`k` = 1.001;');
            assert.strictEqual(queryToSql({k: numeq(1.001, 2)}), 'ROUND(`k`,2) = 1.00;');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: numeq(1.001)}, {k: 1.002}), false);
            assert.strictEqual(inMemory({k: numeq(1.001, 3)}, {k: 1.002}), false);
            assert.strictEqual(inMemory({k: numeq(1.001, 2)}, {k: 1.002}), true);
        });
    });

    describe('NumNeq', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: numneq(1.001)}), '`k` != 1.001;');
            assert.strictEqual(queryToSql({k: numneq(1.001, 2)}), 'ROUND(`k`,2) != 1.00;');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: numneq(1.001)}, {k: 1.002}), true);
            assert.strictEqual(inMemory({k: numneq(1.003, 3)}, {k: 1.002}), true);
            assert.strictEqual(inMemory({k: numneq(1.001, 2)}, {k: 1.002}), false);
        });
    });

    describe('LTE', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: lte(1.001)}), '`k` <= 1.001;');
            assert.strictEqual(queryToSql({k: lte(1.001, 2)}), 'ROUND(`k`,2) <= 1.00;');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: lte(1.1)}, {k: 1.05}), true);
            assert.strictEqual(inMemory({k: lte(1.1)}, {k: 1.2}), false);
            assert.strictEqual(inMemory({k: lte(1.1, 0)}, {k: 1.2}), true);
            assert.strictEqual(inMemory({k: lte(1.1, 2)}, {k: 1.15}), false);
            assert.strictEqual(inMemory({k: lte(1.1, 1)}, {k: 1.15}), true);
        });
    });

    describe('LT', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: lt(1.001)}), '`k` < 1.001;');
            assert.strictEqual(queryToSql({k: lt(1.001, 2)}), 'ROUND(`k`,2) < 1.00;');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: lt(1.1)}, {k: 1.05}), true);
            assert.strictEqual(inMemory({k: lt(1.1, 0)}, {k: 1.05}), false);
            assert.strictEqual(inMemory({k: lt(1.1, 2)}, {k: 1.05}), true);
            assert.strictEqual(inMemory({k: lt(1.1, 1)}, {k: 1.05}), false);
        });
    });

    describe('GT', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: gt(1.001)}), '`k` > 1.001;');
            assert.strictEqual(queryToSql({k: gt(1.001, 2)}), 'ROUND(`k`,2) > 1.00;');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: gt(1.1)}, {k: 1.15}), true);
            assert.strictEqual(inMemory({k: gt(1.1, 0)}, {k: 1.15}), false);
            assert.strictEqual(inMemory({k: gt(1.1, 2)}, {k: 1.15}), true);
            assert.strictEqual(inMemory({k: gt(1.1, 1)}, {k: 1.15}), false);
        });
    });

    describe('GTE', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: gte(1.001)}), '`k` >= 1.001;');
            assert.strictEqual(queryToSql({k: gte(1.001, 2)}), 'ROUND(`k`,2) >= 1.00;');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: gte(1.1)}, {k: 1.15}), true);
            assert.strictEqual(inMemory({k: gte(1.1)}, {k: 1.05}), false);
            assert.strictEqual(inMemory({k: gte(1.1, 0)}, {k: 1.2}), true);
            assert.strictEqual(inMemory({k: gte(1.1, 2)}, {k: 1.05}), false);
            assert.strictEqual(inMemory({k: gte(1.1, 1)}, {k: 1.05}), true);
        });
    });

    describe('BoolEq', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: eq(true)}), '(NOT `k` = 0);');
            assert.strictEqual(queryToSql({k: eq(false)}), '(`k` = 0);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: eq(true)}, {k: true}), true);
            assert.strictEqual(inMemory({k: eq(true)}, {k: false}), false);
            assert.strictEqual(inMemory({k: eq(false)}, {k: true}), false);
            assert.strictEqual(inMemory({k: eq(false)}, {k: false}), true);
        });
    });

    describe('BoolNeq', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: neq(true)}), '(`k` = 0);');
            assert.strictEqual(queryToSql({k: neq(false)}), '(NOT `k` = 0);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: neq(true)}, {k: true}), false);
            assert.strictEqual(inMemory({k: neq(true)}, {k: false}), true);
            assert.strictEqual(inMemory({k: neq(false)}, {k: true}), true);
            assert.strictEqual(inMemory({k: neq(false)}, {k: false}), false);
        });
    });

    describe('Primitives', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: 'a'}), '`k` LIKE "a";');
            assert.strictEqual(queryToSql({k: 1}), '`k` = 1;');
            assert.strictEqual(queryToSql({k: true}), '(NOT `k` = 0);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: 1}, {k: 1}), true);
            assert.strictEqual(inMemory({k: 'a'}, {k: 'a'}), true);
            assert.strictEqual(inMemory({k: true}, {k: true}), true);

            assert.strictEqual(inMemory({k: 1}, {k: 2}), false);
            assert.strictEqual(inMemory({k: 'a'}, {k: 'b'}), false);
            assert.strictEqual(inMemory({k: true}, {k: false}), false);
        });
    });

    describe('AnyRelation', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: any('a', 'b', 'c')}),
                '(`k` LIKE "a" OR `k` LIKE "b" OR `k` LIKE "c");');
            assert.strictEqual(queryToSql({k: any(1, 2, 3)}),
                '(`k` = 1 OR `k` = 2 OR `k` = 3);');
            assert.strictEqual(queryToSql({k: any(true, false, true)}),
                '((NOT `k` = 0) OR (`k` = 0) OR (NOT `k` = 0));');
            assert.strictEqual(queryToSql({k: any(gt(0), lt(0), lte(0), gte(0), eq(0))}),
                '(`k` > 0 OR `k` < 0 OR `k` <= 0 OR `k` >= 0 OR `k` = 0);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: any(1, 2, 3)}, {k: 2}), true);
            assert.strictEqual(inMemory({k: any(1, 2, 3)}, {k: 4}), false);
        });
    });

    describe('AllRelation', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: all('a', 'b', 'c')}),
                '(`k` LIKE "a" AND `k` LIKE "b" AND `k` LIKE "c");');
            assert.strictEqual(queryToSql({k: all(1, 2, 3)}),
                '(`k` = 1 AND `k` = 2 AND `k` = 3);');
            assert.strictEqual(queryToSql({k: all(true, false, true)}),
                '((NOT `k` = 0) AND (`k` = 0) AND (NOT `k` = 0));');
            assert.strictEqual(queryToSql({k: all(gt(0), lt(0), lte(0), gte(0), eq(0))}),
                '(`k` > 0 AND `k` < 0 AND `k` <= 0 AND `k` >= 0 AND `k` = 0);');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: all(1, 2)}, {k: 2}), false);
            assert.strictEqual(inMemory({k: all(1, 2)}, {k: 1}), false);
            assert.strictEqual(inMemory({k: all(1, 2)}, {k: 1}), false);
            assert.strictEqual(inMemory({k: all(lt(2), lte(1), gte(1), 1, gt(0))}, {k: 1}), true);
        });
    });

    describe('All/Any Nesting', function() {
        it('exports correct sql', function() {
            assert.strictEqual(queryToSql({k: all(any(1, 2), any(3, 4))}),
                '((`k` = 1 OR `k` = 2) AND (`k` = 3 OR `k` = 4));');

            assert.strictEqual(queryToSql({k: any(all(1, 2), all(3, 4))}),
                '((`k` = 1 AND `k` = 2) OR (`k` = 3 AND `k` = 4));');
        });

        it('compares correctly in-memory', function() {
            assert.strictEqual(inMemory({k: all(any(1, 2), any(1, 2))}, {k: 2}), true);
            assert.strictEqual(inMemory({k: any(all(1, 2), all(1, 2))}, {k: 2}), false);
            assert.strictEqual(inMemory({k: any(all(1, 2), all(1, 2))}, {k: 3}), false);
        });
    });

    describe('Cells', function() {
        it('doesnt freeze', function() {
            DBC.AuctionHouse.query({Name: includes('stormwind')});
        });
    });
});
