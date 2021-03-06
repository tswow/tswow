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
import { SQL } from '../../wotlkdata/sql/SQLFiles';
import { gte } from '../../wotlkdata/query/Relations';
import { SqlConnection } from '../../wotlkdata/sql/SQLConnection';
import * as assert from 'assert';
import { Random } from './Random';

describe('SQL', function() {
    this.beforeAll(function() {
        SqlConnection.connect();
    });

    this.afterAll(async function() {
        await SqlConnection.finish();
    });

    it('writes data to the world db', async function() {
        // Randomize so we don't get false positives from old runs
        const num = Random.def.int(0, 1007688);
        const things = SQL.access_requirement.find({mapId: gte(0), difficulty: 1});
        const g = things.clone(1007688, 1);
        g.item.set(num);
        await SqlConnection.write();
        const dest: any[] = SqlConnection.world_dst.read('SELECT * from access_requirement WHERE mapId = 1007688');
        assert.strictEqual(dest.length, 1);
        assert.strictEqual(dest[0].item, num);
    });

    it('can query with no filters', function() {
        SQL.access_requirement.filter({});
    });

    describe('Add', function () {
        it('writes adds to the world db', async function() {
            // Randomize so we don't get false positives from old runs
            const num = Random.def.int(0, 12345);
            const g = SQL.access_requirement.add(12345, 1);
            g.item.set(num);
            await SqlConnection.write();
            const dest: any[] = SqlConnection.world_dst.read('SELECT * from access_requirement WHERE mapId = 12345');
            assert.strictEqual(dest.length, 1);
            assert.strictEqual(dest[0].item, num);
        });
    });

    describe('Performance', function () {
        it('makes 1000 queries under 4 seconds', function () {
            this.timeout(4000);
            for (let i = 0; i < 1000; ++i) {
                SqlConnection.querySource('SELECT * FROM item_template WHERE entry = 17;');
            }
        });
    });

    describe('Constructors', function() {
        it('includes zero and non-zero attributes', function() {
            const q = SQL.quest_template.add(1007688, {
                VerifiedBuild: 25,
                RewardMoney: 0
            });
            assert.strictEqual(q.VerifiedBuild.get(), 25);
            assert.strictEqual(q.RewardMoney.get(), 0);
        });
    });

    describe('Row#copyTo', function() {
        it('copies rows in SQL tables', function() {
            const r1 = SQL.item_template.add(1007688);
            r1.delay.set(10);
            const r2 = SQL.item_template.add(1007689);
            r2.delay.set(20);
            r1.copyTo(r2);
            assert.strictEqual(r1.entry.get(), 1007688);
            assert.strictEqual(r2.entry.get(), 1007689);
            assert.strictEqual(r1.delay.get(), 10);
            assert.strictEqual(r2.delay.get(), 10);
        });
    });
});
