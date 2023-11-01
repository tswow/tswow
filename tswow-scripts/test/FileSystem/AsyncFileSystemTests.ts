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
import { mpath, wfs, wfsa } from '../../util/FileSystem';

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

    describe('wfsa', function() {
        describe('exists', function () {
            it('detects existing directory', async function () {
                assert.strictEqual(await wfsa.exists(tempdir), true);
            });

            it('detects existing file', async function () {
                const fpath = mpath(tempdir, 'file.txt');
                fs.writeFileSync(fpath, 'myfile');
                assert.strictEqual(await wfsa.exists(fpath), true);
            });

            it('does not detect non-existing path', async function () {
                assert.strictEqual(await wfsa.exists(mpath(tempdir, 'empty')), false);
            });
        });

        describe('readDir', function() {
            it('reads empty directories', async function() {
                assert.deepStrictEqual(await wfsa.readDir(tempdir), []);
            });

            it('reads directories with files', async function() {
                fs.writeFileSync(mpath(tempdir, 'file'), '');
                assert.deepStrictEqual(await wfsa.readDir(tempdir), [mpath(tempdir, 'file')]);
            });

            it('reads directories with subdirectories', async function() {
                fs.mkdirSync(mpath(tempdir, 'subdir'));
                assert.deepStrictEqual(await wfs.readDir(tempdir), [mpath(tempdir, 'subdir')]);
            });
        });

        describe('mkDirs', function() {
            it('creates single subdirectories', async function() {
                await wfsa.mkDirs(mpath(tempdir, 'subdir'));
                assert.strictEqual(fs.existsSync(mpath(tempdir, 'subdir')), true);
            });

            it('creates nested subdirectories', async function() {
                const ssd = mpath(tempdir, 'subdir', 'subsubdir');
                await wfsa.mkDirs(ssd);
                assert.strictEqual(fs.existsSync(ssd), true);
            });

            it('throws if you try to mkDirs to a file path', async function() {
                const p = mpath(tempdir, 'file');
                fs.writeFileSync(p, '');
                assert.rejects(() => wfsa.mkDirs(p));
            });
        });

        describe('remove', function() {
            it('removes a file', async function() {
                const fp = mpath(tempdir, 'file');
                fs.writeFileSync(fp, '');
                await wfsa.remove(fp);
                assert.strictEqual(fs.existsSync(fp), false);
            });

            it('removes an empty directory', async function() {
                const ed = mpath(tempdir, 'dir');
                fs.mkdirSync(ed);
                assert.strictEqual(fs.existsSync(ed), true);
                await wfsa.remove(ed);
                assert.strictEqual(fs.existsSync(ed), false);
            });

            it('removes a non-empty directory', async function() {
                const ed = mpath(tempdir, 'dir');
                const fp = mpath(ed, 'file');
                const ned = mpath(ed, 'subdir');
                fs.mkdirSync(ed);
                fs.writeFileSync(fp, '');
                fs.mkdirSync(ned);
                await wfsa.remove(ed);
                assert.strictEqual(fs.existsSync(ed), false);
            });
        });

        describe('isFile', function() {
            it('returns true for existing files', async function() {
                const fp = mpath(tempdir, 'file');
                fs.writeFileSync(fp, '');
                assert.strictEqual(await wfs.isFile(fp), true);
            });

            it('returns false for directories', async function() {
                const dp = mpath(tempdir, 'dir');
                fs.mkdirSync(dp);
                assert.strictEqual(await wfsa.exists(dp), true);
                assert.strictEqual(await wfsa.isFile(dp), false);
            });

            it('returns false for non-existing files', async function() {
                assert.strictEqual(await wfs.isFile(mpath(tempdir, 'file2')), false);
            });
        });

        describe('isDirectory', function() {
            it('returns true for existing directories', async function() {
                const dp = mpath(tempdir, 'dir');
                fs.mkdirSync(dp);
                assert.strictEqual(await wfsa.isDirectory(dp), true);
            });

            it('returns false for files', async function() {
                const fp = mpath(tempdir, 'file');
                fs.writeFileSync(fp, '');
                assert.strictEqual(await wfsa.isDirectory(fp), false);
            });

            it('returns false for non-existing paths', async function() {
                assert.strictEqual(await wfsa.isDirectory(mpath(tempdir, 'dir2')), false);
            });
        });

        describe('write', function() {
            it('writes a text file', async function() {
                const fp = mpath(tempdir, 'file');
                const text = 'test_text';
                await wfsa.write(fp, text);
                assert.strictEqual(fs.readFileSync(fp).toString(), text);
            });
        });

        describe('read', function() {
            it('reads text files', async function() {
                const fp = mpath(tempdir, 'file');
                const text = 'node_text';
                fs.writeFileSync(fp, text);
                assert.strictEqual(await wfsa.read(fp), text);
            });
        });

        describe('move', function() {
            it('moves a file', async function() {
                const sp = mpath(tempdir, 'file1');
                const dp = mpath(tempdir, 'file2');
                const text = 'move_text';
                fs.writeFileSync(sp, text);
                await wfsa.move(sp, dp);
                assert.strictEqual(fs.readFileSync(dp).toString(), text);
                assert.strictEqual(fs.existsSync(sp), false);
            });

            it('moves an empty directory', async function() {
                const sp = mpath(tempdir, 'dir1');
                const dp = mpath(tempdir, 'dir2');
                fs.mkdirSync(sp);
                await wfsa.move(sp, dp);
                assert.strictEqual(fs.existsSync(sp), false);
                assert.strictEqual(fs.existsSync(dp), true);
            });

            it('moves non-empty directory', async function() {
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

                await wfsa.move(srp, drp);

                assert.strictEqual(fs.existsSync(srp), false);
                assert.strictEqual(fs.readFileSync(dfp).toString(), text1);
                assert.strictEqual(fs.readFileSync(dsfp).toString(), text2);
            });
        });

        describe('copy', function() {
            it('copies a single file', async function() {
                const text = 'text_1';
                const sp = mpath(tempdir, 'file1');
                const dp = mpath(tempdir, 'file2');
                fs.writeFileSync(sp, text);
                await wfsa.copy(sp, dp);
                assert.strictEqual(fs.readFileSync(sp).toString(), text);
                assert.strictEqual(fs.readFileSync(dp).toString(), text);
            });

            it('copies an empty directory', async function() {
                const sp = mpath(tempdir, 'dir1');
                const dp = mpath(tempdir, 'dir2');
                fs.mkdirSync(sp);
                await wfsa.copy(sp, dp);
                assert.strictEqual(fs.lstatSync(sp).isDirectory(), true);
                assert.strictEqual(fs.lstatSync(dp).isDirectory(), true);
            });

            it('copies a non-empty directory', async function() {
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

                await wfsa.copy(srp, drp);

                assert.strictEqual(fs.readFileSync(sfp).toString(), text1);
                assert.strictEqual(fs.readFileSync(ssfp).toString(), text2);

                assert.strictEqual(fs.readFileSync(dfp).toString(), text1);
                assert.strictEqual(fs.readFileSync(dsfp).toString(), text2);
            });
        });
    });
});
