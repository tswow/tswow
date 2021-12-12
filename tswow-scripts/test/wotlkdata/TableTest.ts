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
import { SqlConnection } from '../../wotlkdata/sql/SQLConnection';
import { SQL } from '../../wotlkdata/sql/SQLFiles';
import { SqlTable } from '../../wotlkdata/sql/SQLTable';

describe('Table', function() {
    this.beforeAll(function() {
        SqlConnection.connect();
    });

    this.afterAll(async function() {
        await SqlConnection.finish();
    });

    describe('add', function() {
        it('does not crash', async function() {
            assert.strictEqual(SqlTable.cachedRowCount(SQL.playercreateinfo_spell_custom), 0);
            SQL.playercreateinfo_spell_custom.add(0, 0, 0, {Note: 'Test'});
            assert.strictEqual(SqlTable.cachedRowCount(SQL.playercreateinfo_spell_custom), 2);
            assert.strictEqual(SQL.playercreateinfo_spell_custom.find({racemask: 0, Spell: 0, classmask: 0}).Note.get(), 'Test');
        });
    });
});
