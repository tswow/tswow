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
import { sleep } from 'deasync';
import * as fs from 'fs';
import { mpath, wfs } from '../../util/FileSystem';

const tempdir = './bin/tmpfs';

describe('FileSystem', function () {
    this.beforeEach(function() {
        sleep(5);
        fs.mkdirSync(tempdir, {recursive: true});
    });

    this.afterEach(function() {
        sleep(5);
        fs.rmSync(tempdir, {recursive: true});
    });

    describe('wfs', function() {
        describe('exists', function () {
            it('detects existing directory', function () {
                assert.strictEqual(wfs.exists(tempdir), true);
            });

            it('detects existing file', function () {
                const fpath = mpath(tempdir, 'file.txt');
                fs.writeFileSync(fpath, 'myfile');
                assert.strictEqual(wfs.exists(fpath), true);
            });

            it('does not detect non-existing path', function () {
                assert.strictEqual(wfs.exists(mpath(tempdir, 'empty')), false);
            });
        });

        describe('readDir', function() {
            it('reads empty directories', function() {
                assert.deepStrictEqual(wfs.readDir(tempdir), []);
            });

            it('reads directories with files', function() {
                fs.writeFileSync(mpath(tempdir, 'file'), '');
                assert.deepStrictEqual(wfs.readDir(tempdir), [mpath(tempdir, 'file')]);
            });

            it('reads directories with subdirectories', function() {
                fs.mkdirSync(mpath(tempdir, 'subdir'));
                assert.deepStrictEqual(wfs.readDir(tempdir), [mpath(tempdir, 'subdir')]);
            });
        });

        describe('mkDirs', function() {
            it('creates single subdirectories', function() {
                wfs.mkDirs(mpath(tempdir, 'subdir'));
                assert.strictEqual(fs.existsSync(mpath(tempdir, 'subdir')), true);
            });

            it('creates nested subdirectories', function() {
                const ssd = mpath(tempdir, 'subdir', 'subsubdir');
                wfs.mkDirs(ssd);
                assert.strictEqual(fs.existsSync(ssd), true);
            });

            it('throws if you try to mkDirs to a file path', function() {
                const p = mpath(tempdir, 'file');
                fs.writeFileSync(p, '');
                assert.throws(() => wfs.mkDirs(p));
            });
        });

        describe('iterate', function() {
            it('iterates through all files in a directory', function() {
                const files: {[key: string]: boolean} = {};
                for (let i = 0; i < 10; ++i) {
                    const file = mpath(tempdir, `file${i}`);
                    files[file] = true;
                    fs.writeFileSync(file, '');
                }
                wfs.iterate(tempdir, (path) => {
                    delete files[path];
                });

                assert.strictEqual(Object.values(files).length, 0);
            });
        });

        describe('remove', function() {
            it('removes a file', function() {
                const fp = mpath(tempdir, 'file');
                fs.writeFileSync(fp, '');
                wfs.remove(fp);
                assert.strictEqual(fs.existsSync(fp), false);
            });

            it('removes an empty directory', function() {
                const ed = mpath(tempdir, 'dir');
                fs.mkdirSync(ed);
                assert.strictEqual(fs.existsSync(ed), true);
                wfs.remove(ed);
                assert.strictEqual(fs.existsSync(ed), false);
            });

            it('removes a non-empty directory', function() {
                const ed = mpath(tempdir, 'dir');
                const fp = mpath(ed, 'file');
                const ned = mpath(ed, 'subdir');
                fs.mkdirSync(ed);
                fs.writeFileSync(fp, '');
                fs.mkdirSync(ned);
                wfs.remove(ed);
                assert.strictEqual(fs.existsSync(ed), false);
            });
        });

        describe('isFile', function() {
            it('returns true for existing files', function() {
                const fp = mpath(tempdir, 'file');
                fs.writeFileSync(fp, '');
                assert.strictEqual(wfs.isFile(fp), true);
            });

            it('returns false for directories', function() {
                const dp = mpath(tempdir, 'dir');
                fs.mkdirSync(dp);
                assert.strictEqual(wfs.exists(dp), true);
                assert.strictEqual(wfs.isFile(dp), false);
            });

            it('returns false for non-existing files', function() {
                assert.strictEqual(wfs.isFile(mpath(tempdir, 'file2')), false);
            });
        });

        describe('isDirectory', function() {
            it('returns true for existing directories', function() {
                const dp = mpath(tempdir, 'dir');
                fs.mkdirSync(dp);
                assert.strictEqual(wfs.isDirectory(dp), true);
            });

            it('returns false for files', function() {
                const fp = mpath(tempdir, 'file');
                fs.writeFileSync(fp, '');
                assert.strictEqual(wfs.isDirectory(fp), false);
            });

            it('returns false for non-existing paths', function() {
                assert.strictEqual(wfs.isDirectory(mpath(tempdir, 'dir2')), false);
            });
        });

        describe('write', function() {
            it('writes a text file', function() {
                const fp = mpath(tempdir, 'file');
                const text = 'test_text';
                wfs.write(fp, text);
                assert.strictEqual(fs.readFileSync(fp).toString(), text);
            });
        });

        describe('read', function() {
            it('reads text files', function() {
                const fp = mpath(tempdir, 'file');
                const text = 'node_text';
                fs.writeFileSync(fp, text);
                assert.strictEqual(wfs.read(fp), text);
            });
        });

        describe('move', function() {
            it('moves a file', function() {
                const sp = mpath(tempdir, 'file1');
                const dp = mpath(tempdir, 'file2');
                const text = 'move_text';
                fs.writeFileSync(sp, text);
                wfs.move(sp, dp);
                assert.strictEqual(fs.readFileSync(dp).toString(), text);
                assert.strictEqual(fs.existsSync(sp), false);
            });

            it('moves an empty directory', function() {
                const sp = mpath(tempdir, 'dir1');
                const dp = mpath(tempdir, 'dir2');
                fs.mkdirSync(sp);
                wfs.move(sp, dp);
                assert.strictEqual(fs.existsSync(sp), false);
                assert.strictEqual(fs.existsSync(dp), true);
            });

            it('moves non-empty directory', function() {
                const text1 = 'file1_contents';
                const text2 = 'file2_contents';

                const srp = mpath(tempdir, 'dir1');
                const sfp = mpath(srp, 'file');
                const ssdp = mpath(srp, 'subdir');
                const ssfp = mpath(ssdp, 'subfile');

                const drp = mpath(tempdir, 'dir2');
                const dfp = mpath(drp, 'file');
                const dsdp = mpath(drp, 'subdir');
                const dsfp = mpath(dsdp, 'subfile');

                fs.mkdirSync(srp);
                fs.mkdirSync(ssdp);
                fs.writeFileSync(sfp, text1);
                fs.writeFileSync(ssfp, text2);

                wfs.move(srp, drp);

                assert.strictEqual(fs.existsSync(srp), false);
                assert.strictEqual(fs.readFileSync(dfp).toString(), text1);
                assert.strictEqual(fs.readFileSync(dsfp).toString(), text2);
            });
        });

        describe('copy', function() {
            it('copies a single file', function() {
                const text = 'text_1';
                const sp = mpath(tempdir, 'file1');
                const dp = mpath(tempdir, 'file2');
                fs.writeFileSync(sp, text);
                wfs.copy(sp, dp);
                assert.strictEqual(fs.readFileSync(sp).toString(), text);
                assert.strictEqual(fs.readFileSync(dp).toString(), text);
            });

            it('copies an empty directory', function() {
                const sp = mpath(tempdir, 'dir1');
                const dp = mpath(tempdir, 'dir2');
                fs.mkdirSync(sp);
                wfs.copy(sp, dp);
                assert.strictEqual(fs.lstatSync(sp).isDirectory(), true);
                assert.strictEqual(fs.lstatSync(dp).isDirectory(), true);
            });

            it('copies a non-empty directory', function() {
                const text1 = 'file1_contents';
                const text2 = 'file2_contents';

                const srp = mpath(tempdir, 'dir1');
                const sfp = mpath(srp, 'file');
                const ssdp = mpath(srp, 'subdir');
                const ssfp = mpath(ssdp, 'subfile');

                const drp = mpath(tempdir, 'dir2');
                const dfp = mpath(drp, 'file');
                const dsdp = mpath(drp, 'subdir');
                const dsfp = mpath(dsdp, 'subfile');

                fs.mkdirSync(srp);
                fs.mkdirSync(ssdp);
                fs.writeFileSync(sfp, text1);
                fs.writeFileSync(ssfp, text2);

                wfs.copy(srp, drp);

                assert.strictEqual(fs.readFileSync(sfp).toString(), text1);
                assert.strictEqual(fs.readFileSync(ssfp).toString(), text2);

                assert.strictEqual(fs.readFileSync(dfp).toString(), text1);
                assert.strictEqual(fs.readFileSync(dsfp).toString(), text2);
            });
        });
    });
});
