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
import { gte } from '../../data/query/Relations';
import { SqlConnection } from '../../data/sql/SQLConnection';
import { SQL } from '../../wotlk/SQLFiles';
import { Random } from './Random';

describe('SQL', function() {
    this.beforeAll(function() {
        SqlConnection.connect();
    });

    this.afterAll(async function() {
        // SQL changes are auto-persisted, no finish() needed
    });

    it('writes data to the world db', async function() {
        // Randomize so we don't get false positives from old runs
        const num = Random.def.int(0, 1007688);
        const things = SQL.access_requirement.query({mapId: gte(0), difficulty: 1});
        const g = things.clone(1007688, 1);
        g.item.set(num);
        // SQL changes are auto-persisted
        const dest = SQL.access_requirement.query({mapId: 1007688, difficulty: 1});
        assert.notStrictEqual(dest, undefined);
        assert.strictEqual(dest.item.get(), num);
    });

    it('can query with no filters', function() {
        SQL.access_requirement.queryAll({});
    });

    describe('Add', function () {
        it('writes adds to the world db', async function() {
            // Randomize so we don't get false positives from old runs
            const num = Random.def.int(0, 12345);
            const g = SQL.access_requirement.add(12345, 1);
            g.item.set(num);
            // SQL changes are auto-persisted
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

    describe('delete', function() {
        it('deletes rows with a single id', async function() {
            const TEST_ID = 1007688;
            const readDest = ()=> SqlConnection.world_dst.read(`SELECT * from achievement_dbc where ID=${TEST_ID};`)
            assert.strictEqual(readDest().length,0
                , `test error: row ${TEST_ID} already exists in achievement_dbc `
                + `(delete it manually if a previous test created it)`);
            SQL.achievement_dbc.add(TEST_ID)
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,1,`test error: failed to create row`);
            SQL.achievement_dbc.add(TEST_ID).delete();
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,0,`failed to delete created row`);
        });

        it('deletes rows with multiple ids', async function() {
            const TEST_MENU_ID = 17688;
            const TEST_TEXT_ID = 17689;
            const readDest = ()=> SqlConnection.world_dst
                .read(`SELECT * from gossip_menu where MenuID=${TEST_MENU_ID} and TextID=${TEST_TEXT_ID} ;`)
            assert.strictEqual(readDest().length,0
                , `test error: row ${TEST_MENU_ID}/${TEST_TEXT_ID} already exists in gossip_menu`
                + `( delete it manually if a previous test created it)`);
            SQL.gossip_menu.add(TEST_MENU_ID,TEST_TEXT_ID);
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,1,`test error: failed to create row`);
            SQL.gossip_menu.add(TEST_MENU_ID,TEST_TEXT_ID).delete();
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,0,`failed to delete created row`);
        });

    });

    describe('undelete', function() {
        it('stops a deletion on new rows', async function() {
            const TEST_ID = 1007688;
            const readDest = ()=> SqlConnection.world_dst.read(`SELECT * from achievement_dbc where ID=${TEST_ID};`)
            assert.strictEqual(readDest().length,0
                , `test error: row ${TEST_ID} already exists in achievement_dbc `
                + `(delete it manually if a previous test created it)`);
            SQL.achievement_dbc.add(TEST_ID)
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,1,`test error: failed to create row`);
            SQL.achievement_dbc.add(TEST_ID).delete().undelete();
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,1,`row was still deleted`);
            // delete it for real
            SQL.achievement_dbc.add(TEST_ID).delete();
            // SQL changes are auto-persisted
        });

        it('restores existing SQL rows', async function() {
            const TEST_CREATURE_TEMPLATE = 25;
            const TEST_SQL = `SELECT * from creature_template where entry=${TEST_CREATURE_TEMPLATE};`

            const readDest = ()=> SqlConnection.world_dst
                .read(TEST_SQL)

            const sourceValues = SqlConnection.world_src.read(TEST_SQL);
            const initialValues = readDest();

            assert.strictEqual(sourceValues.length,1
                , `test error: ${TEST_CREATURE_TEMPLATE} does not exist in source db`);
            assert.strictEqual(initialValues.length,1
                , `test error: ${TEST_CREATURE_TEMPLATE} does not exist in destination db`);

            for(let key in sourceValues[0]) {
                let sourceValue = sourceValues[0][key];
                let initialValue = initialValues[0][key];
                assert.strictEqual(
                      sourceValue,initialValue
                    , `test error: refusing to run test because row ${TEST_CREATURE_TEMPLATE} is dirty `
                    + `(${key} has values source=${sourceValue} dest=${initialValue})`
                    )
            }

            SQL.creature_template.query({entry:25}).delete();
            // SQL changes are auto-persisted
            assert.strictEqual(readDest().length,0,`test error: failed to delete row ${TEST_CREATURE_TEMPLATE}`);
            SQL.creature_template.query({entry:25}).undelete();
            // SQL changes are auto-persisted

            let restoredValues = readDest();
            assert.strictEqual(restoredValues.length,1,`test error: failed to undelete row ${TEST_CREATURE_TEMPLATE}`);
            for(let key in sourceValues[0]) {
                let sourceValue = sourceValues[0][key];
                let restoredValue = restoredValues[0][key];
                assert.strictEqual(
                    sourceValue,restoredValue
                  , `failed to restore ${TEST_CREATURE_TEMPLATE}`
                  + `(${key} values differ: source=${sourceValue} restored=${restoredValue})`
                  )
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
