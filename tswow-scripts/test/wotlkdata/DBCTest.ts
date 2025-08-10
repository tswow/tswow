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
import { describe, it } from 'mocha';
import { DBC } from '../../wotlk/DBCFiles';
import { lt } from '../../data/query/Relations';
import fs = require('fs');

const TEMP_DBC = './tmp.dbc';

describe('DBC', function() {
    this.afterEach(function() {
        if (fs.existsSync(TEMP_DBC)) {
            fs.unlinkSync(TEMP_DBC);
        }
    });

    describe('filter', function() {
        it('finds multiple values', function() {
            const ic = DBC.ItemClass;
            const values = ic.queryAll({ClassID: lt(10) });
            assert.strictEqual(values.length, 10);
            assert.strictEqual(values[0].ClassID.get(), 0);
        });

        it('finds a single value', function() {
            assert.notStrictEqual(DBC.ItemClass.query({ClassID: 0}), undefined);
        });
    });

    describe('Add', function() {
        it('works with multiple id field files', function() {
            const ic = DBC.ItemClass;
            ic.read();
            assert.strictEqual(ic.rowCount, 17);
            ic.add(1007688, 1007688, {Flags: 123123});
            assert.strictEqual(ic.rowCount, 18);
            ic.write(TEMP_DBC);
            ic.read();
            assert.strictEqual(ic.rowCount, 17);
            ic.read(TEMP_DBC);
            assert.strictEqual(ic.rowCount, 18);
            assert.strictEqual(ic.query({ClassID: 1007688}).Flags.get(), 123123);
        });

        it('works with single-id files', function() {
            const ipcg = DBC.ItemPurchaseGroup;
            ipcg.read();
            assert.strictEqual(ipcg.rowCount, 1);
            const grp = ipcg.add(1007688);
            grp.ItemID.setIndex(0, 123123);
            assert.strictEqual(ipcg.rowCount, 2);
            ipcg.write(TEMP_DBC);
            ipcg.read();
            assert.strictEqual(ipcg.rowCount, 1);
            ipcg.read(TEMP_DBC);
            assert.strictEqual(ipcg.rowCount, 2);
        });
    });

    describe('delete', function() {
        it('deletes existing rows after rewrite', function() {
            let ed = DBC.EnvironmentalDamage;

            const ADDED_IDS = [8,10]
            const REMOVED_IDS = [4,1,3,8];
            const KEPT_IDS = [2,5,10];
            const RESTORED_IDS = [6];

            ADDED_IDS.forEach(x=>{
                ed.add(x).EnumID.set(1007688).VisualkitID.set(1007688);
            });

            REMOVED_IDS.concat(RESTORED_IDS).concat(KEPT_IDS).forEach(x=>{
                assert.notStrictEqual(ed.query({ID: x}),undefined
                    , `invalid source dbc (EnvironmentalDamage.dbc missing ID=${x}), cant run tests`);
            });

            REMOVED_IDS.concat(RESTORED_IDS).forEach(x=>
                assert.strictEqual(ed.query({ID: x}).delete().isDeleted(),true,`${x} is not deleted`));

            KEPT_IDS.concat(RESTORED_IDS).forEach(x=>
                assert.strictEqual(ed.query({ID: x}).undelete().isDeleted(),false,`${x} is deleted`));

            ed.write(TEMP_DBC);
            ed.read(TEMP_DBC);

            KEPT_IDS.concat(RESTORED_IDS).forEach(x=>{
                assert.notStrictEqual(ed.query({ID: x}),undefined
                    , `deletion corrupt or removed wrong row (can't find id=${x})`);
            });

            REMOVED_IDS.forEach(x=>{
                assert.strictEqual(ed.query({ID: x}),undefined
                    , `deletion corrupt or failed to remove id = ${x}`);
            });
        });
    });

    it('writes loc_constructors', function() {
        const ipf = DBC.ItemPetFood;
        const myitem = ipf.query({}).clone(1007688, {Name: {enGB: 'testname'}});
        assert.strictEqual(myitem.Name.enGB.get(), 'testname');
        ipf.write(TEMP_DBC);
        ipf.read(TEMP_DBC);
        assert.strictEqual(ipf.query({ID: 1007688}).Name.enGB.get(), 'testname');
    });

    it('writes multi-id files', function() {
        const ic = DBC.ItemClass;
        ic.read();
        assert.strictEqual(ic.rowCount, 17);
        ic.query({}).clone(1007688, 1007688, {Flags: 123123});
        assert.strictEqual(ic.rowCount, 18);
        ic.write(TEMP_DBC);
        ic.read();
        assert.strictEqual(ic.rowCount, 17);
        ic.read(TEMP_DBC);
        assert.strictEqual(ic.rowCount, 18);
        assert.strictEqual(ic.query({ClassID: 1007688}).Flags.get(), 123123);
    });

    it('writes single-id files', function() {
        const ipcg = DBC.ItemPurchaseGroup;
        ipcg.read();
        assert.strictEqual(ipcg.rowCount, 1);
        const grp = ipcg.query({}).clone(1007688);
        grp.ItemID.setIndex(0, 123123);
        assert.strictEqual(ipcg.rowCount, 2);
        ipcg.write(TEMP_DBC);
        ipcg.read();
        assert.strictEqual(ipcg.rowCount, 1);
        ipcg.read(TEMP_DBC);
        assert.strictEqual(ipcg.rowCount, 2);
    });

    describe('SpecificFiles', function() {
        describe('Spell', function() {
            it('Has "World of Recall Other" on row 3', function() {
                assert.strictEqual(DBC.Spell.getRow(2).Name.enGB.get(), 'Word of Recall Other');
                assert.strictEqual(DBC.Spell.getRow(2).ID.get(), 4);
            });

            it('Has "Blizzard" at ID=10', function() {
                const blizzard = DBC.Spell.query({ID: 10});
                assert.strictEqual(blizzard.ID.get(), 10);
                assert.strictEqual(blizzard.index, 5);
                assert.strictEqual(blizzard.Name.enGB.get(), 'Blizzard');
                assert.strictEqual(blizzard.SpellDescriptionVariableID.get(), 167);
            });

            it('Has SpellDifficultyID=381 at ID=67154', function() {
                const t = DBC.Spell.query({ID: 67154});
                assert.strictEqual(t.SpellDifficultyID.get(), 381);
            });

            it('Has SpellDifficultyID=382 at ID=67155', function() {
                const t = DBC.Spell.query({ID: 67155});
                assert.strictEqual(t.SpellDifficultyID.get(), 382);
            });
        });

        describe('ChrClasses', function() {
            it('Has "Mage" at ID=8', function() {
                const t = DBC.ChrClasses.query({ID: 8});
                assert.strictEqual(t.Filename.get(), 'MAGE');
                assert.strictEqual(t.Name.enGB.get(), 'Mage');
            });

            it('Has required_expansion=2 at Filename="DEATHKNIGHT"', function() {
                const t = DBC.ChrClasses.query({Filename: 'DEATHKNIGHT'});
                assert.strictEqual(t.Required_Expansion.get(), 2);
            });
        });

        describe('gtChanceToMeleeCrit', function() {
            it('has 1100 entries', function() {
                DBC.GtChanceToMeleeCrit.read();
                assert.strictEqual(DBC.GtChanceToMeleeCrit.rowCount, 1100);
            });

            it('does not throw when adding entries', function() {
                assert.doesNotThrow(() => {
                    DBC.GtChanceToMeleeCrit.add({Data: 25});
                });
            });
        });

        describe('gtChanceToMeleeCritBase', function() {
            it('Has 11 entries', function () {
                assert.strictEqual(DBC.GtChanceToMeleeCritBase.rowCount, 11);
            });
        });

        describe('gtOCTClassCombatRatingScalar (gt file with IDs)', function() {
            it('Has 352 entries', function() {
                assert.strictEqual(DBC.GtOCTClassCombatRatingScalar.rowCount, 352);
            });

            it('Starts at ID=1', function() {
                assert.strictEqual(DBC.GtOCTClassCombatRatingScalar.getRow(0).ID.get(), 1);
            });

            it('Ends at ID=352', function() {
                assert.strictEqual(DBC.GtOCTClassCombatRatingScalar.getRow(351).ID.get(), 352);
            });

            it('Has Data=1.29999995231628 at ID=338', function() {
                assert.strictEqual(Math.abs(DBC.GtOCTClassCombatRatingScalar
                    .query({ID: 338}).Data.get() - 1.29999995231628) < 0.0000000001, true);

                assert.strictEqual(Math.abs(DBC.GtOCTClassCombatRatingScalar
                    .getRow(337).Data.get() - 1.29999995231628) < 0.0000000001, true);
            });
        });
    });

    describe('DBCFile#add', function() {
        it('does not throw when adding rows', function() {
            assert.doesNotThrow(() => {
                DBC.Languages.add(39);
            });
        });

        it('keeps added rows', function () {
            DBC.Languages.read();
            assert.strictEqual(DBC.Languages.query({ID: 39}), undefined);
            DBC.Languages.add(39);
            const row = DBC.Languages.query({ID: 39});
            assert.notStrictEqual(row, undefined);
        });

        it('keeps added rows on disk', function () {
            DBC.Languages.read();
            assert.strictEqual(DBC.Languages.query({ID: 39}), undefined);
            DBC.Languages.add(39);
            DBC.Languages.write(TEMP_DBC);
            DBC.Languages.read(TEMP_DBC);
            assert.notStrictEqual(DBC.Languages.query({ID: 39}), undefined);
        });
    });

    describe('Modifying', function() {
        it('modifies values in memory',  function() {
            DBC.Languages.read();
            const taurahe = DBC.Languages.query({ID: 3});
            assert.strictEqual(taurahe.Name.enGB.get(), 'Taurahe');
            taurahe.Name.enGB.set('Tauraha');
            assert.strictEqual(taurahe.Name.enGB.get(), 'Tauraha');
        });

        it('keeps modifications on disk', function () {
            DBC.Languages.read();
            const taurahe = DBC.Languages.query({ID: 3});
            taurahe.Name.enGB.set('Tauraho');
            DBC.Languages.write(TEMP_DBC);
            DBC.Languages.read(TEMP_DBC);
            assert.strictEqual(DBC.Languages
                .query({ID: 3}).Name.enGB.get(), 'Tauraho');
        });

        it('combines modifications and additions', function() {
            DBC.Languages.read();
            const taurahe = DBC.Languages.query({ID: 3});
            taurahe.Name.enGB.set('Taur');
            DBC.Languages.add(50, {Name: {enGB: 'TestLang'}});

            assert.strictEqual(DBC.Languages.query({ID: 3}).Name.enGB.get(), 'Taur');
            assert.strictEqual(DBC.Languages.query({ID: 50}).Name.enGB.get(), 'TestLang');

            DBC.Languages.write(TEMP_DBC);
            DBC.Languages.read(TEMP_DBC);

            assert.strictEqual(DBC.Languages.query({ID: 3}).Name.enGB.get(), 'Taur');
            assert.strictEqual(DBC.Languages.query({ID: 50}).Name.enGB.get(), 'TestLang');
        });
    });

    describe('BinSearch', function() {
        it('finds valid ids', function() {
            assert.strictEqual(DBC.Spell.query({ID: 25}).ID.get(), 25);
            assert.strictEqual(DBC.Spell.query({ID: 1}).ID.get(), 1);
            assert.strictEqual(DBC.Spell.query({ID: 80864}).ID.get(), 80864);
        });

        it('finds modded ids', function() {
            for (let i = 0 ; i < 1000; ++i) {
                DBC.SkillLine.add(3000 + i);
            }
            assert.strictEqual(DBC.SkillLine.query({ID: 3500}).ID.get(), 3500);
            assert.strictEqual(DBC.SkillLine.query({ID: 788}).ID.get(), 788);
            assert.strictEqual(DBC.SkillLine.query({ID: 6}).ID.get(), 6);
            assert.strictEqual(DBC.SkillLine.query({ID: 3999}).ID.get(), 3999);
            assert.strictEqual(DBC.SkillLine.query({ID: 3000}).ID.get(), 3000);
        });
    });

    describe('DBCBufferArray', function() {
        it('Reads', function() {
            const r1 = DBC.Spell.query({ID: 3591});
            assert.strictEqual(r1.Effect.getIndex(0), 10);
            assert.strictEqual(r1.Effect.getIndex(1), 38);
            assert.strictEqual(r1.Effect.getIndex(2), 30);
        });

        it('Assigns entire array', function() {
            DBC.Spell.read();
            const r1 = DBC.Spell.query({ID: 3591});
            r1.Effect.set([100, 200, 300]);
            assert.strictEqual(r1.Effect.getIndex(0), 100);
            assert.strictEqual(r1.Effect.getIndex(1), 200);
            assert.strictEqual(r1.Effect.getIndex(2), 300);
        });

        it('Assigns per index', function() {
            DBC.Spell.read();
            const r1 = DBC.Spell.query({ID: 3591});
            r1.Effect.setIndex(0, 25);
            r1.Effect.setIndex(1, 1007688);
            r1.Effect.setIndex(2, 90);
            assert.strictEqual(r1.Effect.getIndex(0), 25);
            assert.strictEqual(r1.Effect.getIndex(1), 1007688);
            assert.strictEqual(r1.Effect.getIndex(2), 90);
        });

        it('Reads non-numeric values', function() {
            DBC.Vehicle.read();
            const r = DBC.Vehicle.query({ID: 24});
            assert.strictEqual(r.MsslTrgtImpactModel.getIndex(0), 'Interface\\Vehicles\\Vehicle_Target_01.mdx');
            assert.strictEqual(r.MsslTrgtImpactModel.getIndex(1), 'Interface\\Vehicles\\Vehicle_Target_02.mdx');
        });

        it('writes entire non-numeric array', function() {
            DBC.Vehicle.read();
            const r = DBC.Vehicle.query({ID: 24});
            r.MsslTrgtImpactModel.set(['abc', 'def']),
            assert.strictEqual(r.MsslTrgtImpactModel.getIndex(0), 'abc');
            assert.strictEqual(r.MsslTrgtImpactModel.getIndex(1), 'def');
        });

        it('writes non-numeric values per index', function() {
            DBC.Vehicle.read();
            const r = DBC.Vehicle.query({ID: 24});
            r.MsslTrgtImpactModel.setIndex(0, 'z');
            r.MsslTrgtImpactModel.setIndex(1, 'asdfg');
            assert.strictEqual(r.MsslTrgtImpactModel.getIndex(0), 'z');
            assert.strictEqual(r.MsslTrgtImpactModel.getIndex(1), 'asdfg');
        });
    });

    describe('Floats', function() {
        it('writes correctly', function() {
            DBC.GtOCTClassCombatRatingScalar.add({ID: 2000, Data: 1.25});
            assert.strictEqual(Math.abs((DBC.GtOCTClassCombatRatingScalar.query({ID: 2000}).Data.get() - 1.25)) < 0.00001, true);
        });
    });

    describe('Row#copyTo', function() {
        it('copies rows in DBC files', function() {
            const src = DBC.Resistances.query({ID: 4})
            const dst = DBC.Resistances.query({ID: 5})
            src.copyTo(dst);
            const nxt = DBC.Resistances.query({ID: 6});
            assert.strictEqual(src.ID.get(),4);
            assert.strictEqual(src.Name.mask.get(),16712190);
            assert.strictEqual(dst.ID.get(),5);
            assert.strictEqual(nxt.ID.get(),6);
            assert.strictEqual(dst.FizzleSoundID.get(),1425); });
    });
});
