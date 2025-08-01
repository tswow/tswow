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
import * as fs from 'fs';
import { LUAXML } from '../../wotlk/luaxml/LUAXML';
import { _clearLUAXML, _writeLUAXML } from '../../data/luaxml/LUAXML';
import { TextFile } from '../../data/luaxml/TextFile';
import { dataset } from '../../data/Settings';

function luatest() {
    return LUAXML.anyfile('Interface/GlueXML/AddonList.lua');
}

// from https://stackoverflow.com/questions/9960908/permutations-in-javascript
function permutator<T>(inputArr: T[]): T[][] {
    const result: T[][] = [];
    const permute = (arr: T[], m: T[] = []) => {
      if (arr.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
       }
     }
   };
   permute(inputArr);
   return result;
  }

const TEXT_FILE_LENGTH = 382;

function clear() {
    _clearLUAXML();
    if (fs.existsSync('./tmp')) {
        fs.rmSync('./tmp', {recursive: true});
    }
}

describe('LUAXML', function() {
    this.beforeEach(function() {
        clear();
    });
    this.afterEach(function() {
        clear();
    });

    describe('_writeLUAXML', function() {
        it('creates the root dir', function() {
            assert.strictEqual(fs.existsSync('./tmp/'), false);
            luatest().replace(1, 'TextEdit');
            _writeLUAXML();
            assert.strictEqual(fs.existsSync('./tmp/'), true);
        });

        it('creates files', function() {
            const dstLuaA = './tmp/Interface/GlueXML/AddonList.lua';
            const dstLuaB = './tmp/Interface/GlueXML/AccountLogin.lua';
            const dstXML = './tmp/Interface/GlueXML/AddonList.xml';
            assert.strictEqual(fs.existsSync(dstLuaA), false);
            assert.strictEqual(fs.existsSync(dstLuaB), false);
            assert.strictEqual(fs.existsSync(dstXML), false);
            luatest().replace(1, 'TextEdit');
            _writeLUAXML();
            assert.strictEqual(fs.existsSync(dstLuaA), true);
            assert.strictEqual(fs.existsSync(dstLuaB), true);
            assert.strictEqual(fs.existsSync(dstXML), true);
            const outText = fs.readFileSync(dstLuaA).toString().split('\n')[0];
            assert.strictEqual(outText, 'TextEdit');
        });
    });

    describe('TextFile', function() {
        describe('resolveMatch', function() {
            it('finds a match from a number', function() {
                assert.strictEqual(luatest().replace(1, '').line, 1);
                assert.strictEqual(luatest().replace(4, '').line, 4);
            });

            it('finds a match from regex', function() {
                assert.strictEqual(luatest().replace(/function AddonList_Update/, '').line, 26);
            });

            it('throws on invalid index', function() {
                assert.throws(() => luatest().replace(0, ''));
                assert.throws(() => luatest().replace(TEXT_FILE_LENGTH + 1, ''));
                assert.doesNotThrow(() => luatest().replace(1, ''));
                assert.doesNotThrow(() => luatest().replace(TEXT_FILE_LENGTH, ''));
            });

            it('throws on non-matching regex', function() {
                assert.throws(() => luatest().replace(/doesnotexist/, ''));
            });

            it('throws on multiple matching regex', function() {
                assert.throws(() => luatest().replace(/AddonList_Update/, ''));
            });
        });

        describe('replace', function() {
            it('replaces a row based on row number', function() {
                luatest().replace(26, 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), 'NewText');
            });

            it('replaces multiple rows based on row numbers', function() {
                luatest().replace(26, 'NewText');
                luatest().replace(27, 'NewerText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), 'NewerText');
            });

            it('replaces multiple rows based on regex', function() {
                luatest().replace(/function AddonList_Update/, 'NewText');
                luatest().replace(/local numEntrys = GetNumAddOns/, 'NewerText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), 'NewerText');
            });

            it('accepts multiple non-identical edits', function() {
                const edit = luatest().replace(1, 'NewText');
                assert.strictEqual(edit.text, 'NewText');
                luatest().replace(1, 'NewerText');
                assert.strictEqual(edit.text, 'NewerText');
            });
        });

        describe('emptyReplace', function() {
            it('grabs data from the file', function () {
                assert.strictEqual(luatest().emptyReplace(26).text, 'function AddonList_Update()\r');
            });

            it('grabs previous edits', function () {
                luatest().replace(26, 'NewText');
                assert.strictEqual(luatest().emptyReplace(26).text, 'NewText');
                assert.strictEqual(luatest().getRow(26), 'function AddonList_Update()\r');
            });
        });

        describe('after', function() {
            it('appends a row', function() {
                luatest().after(26, 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), luatest().getRow(26));
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(28), luatest().getRow(27));
                assert.strictEqual(TextFile._apply(luatest()).length, TEXT_FILE_LENGTH + 1);
            });

            it('appends multiple rows', function() {
                luatest().after(26, 'NewText');
                luatest().after(26, 'NewerText');
                assert.strictEqual(TextFile._apply(luatest()).length, TEXT_FILE_LENGTH + 2);
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(28), 'NewerText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(29), luatest().getRow(27));
            });

            it('appends a row at the end of the file', function() {
                assert.doesNotThrow(() => luatest().after(TEXT_FILE_LENGTH, 'NewText'));
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(TEXT_FILE_LENGTH + 1), 'NewText');
            });

            it('appends at the start of a file', function() {
                luatest().after(1, 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(2), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(3), luatest().getRow(2));
            });
        });

        describe('before', function() {
            it('prepends a row', function() {
                luatest().before(26, 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), luatest().getRow(26));
            });

            it('prepends multiple rows', function() {
                luatest().before(26, 'NewText');
                luatest().before(26, 'NewerText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), 'NewerText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(28), luatest().getRow(26));
            });

            it('prepends at the start of the file', function() {
                luatest().before(1, 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(1), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(2), luatest().getRow(1));
            });

            it('prepends at the end of the file', function() {
                luatest().before(TEXT_FILE_LENGTH , 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(TEXT_FILE_LENGTH), 'NewText');
                assert.strictEqual(TextFile._applyWrap(luatest()).getRow(TEXT_FILE_LENGTH + 1), luatest().getRow(TEXT_FILE_LENGTH));
            });
        });

        describe('before+after+replace', function() {
            it('works on a single line', function() {
                const fn1 = () => luatest().replace(26, 'Replace');
                const fn2 = () => luatest().before(26, 'Before');
                const fn3 = () => luatest().after(26, 'After');

                permutator([fn1, fn2, fn3]).forEach(([f1, f2, f3], i) => {
                    _clearLUAXML();
                    f1();
                    f2();
                    f3();
                    assert.strictEqual(TextFile._applyWrap(luatest()).getRow(26), 'Before');
                    assert.strictEqual(TextFile._applyWrap(luatest()).getRow(27), 'Replace');
                    assert.strictEqual(TextFile._applyWrap(luatest()).getRow(28), 'After');
                });
            });

            it('works spread on multiple lines', function() {
                const fn1 = () => luatest().replace(6, 'Replace');
                const fn2 = () => luatest().before(1, 'Before');
                const fn3 = () => luatest().after(11, 'After');

                permutator([fn1, fn2, fn3]).forEach(([f1, f2, f3], i) => {
                    _clearLUAXML();
                    f1();
                    f2();
                    f3();
                    assert.strictEqual(TextFile._applyWrap(luatest()).getRow(1), 'Before');
                    assert.strictEqual(TextFile._applyWrap(luatest()).getRow(7), 'Replace');
                    assert.strictEqual(TextFile._applyWrap(luatest()).getRow(13), 'After');
                });
            });
        });
    });
});
