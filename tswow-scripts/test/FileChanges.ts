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

/*
import * as assert from 'assert';
import { FileChanges } from '../util/FileChanges';
import { wfs } from '../util/FileSystem';

const exampleFile1 = './test_file_1';
const exampleFile2 = './test_file_2';
const changefile = './test_changefile';

function clear() {
    FileChanges.setLogFile(changefile);
    wfs.remove(exampleFile1);
    wfs.remove(exampleFile2);
    wfs.remove(changefile);
}

describe('FileChanges', function() {
    beforeEach(clear);
    afterEach(clear);

    it('assumes changes with empty log', function() {
        wfs.write(exampleFile1, 'test');
        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
    });

    it('stores changes', function() {
        wfs.write(exampleFile1, 'test');
        FileChanges.tagChange(exampleFile1);
        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
    });

    it('detects new changes', function() {
        wfs.write(exampleFile1, 'test1');
        FileChanges.tagChange(exampleFile1);
        wfs.write(exampleFile1, 'test2');
        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
    });

    it('works with multiple files', function() {
        wfs.write(exampleFile1, 'test1');
        wfs.write(exampleFile2, 'test2');

        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2), true);
        FileChanges.tagChange(exampleFile1);
        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile2), true);
        FileChanges.tagChange(exampleFile2);
        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile2), false);
        wfs.write(exampleFile1, 'test3');
        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2), false);
        wfs.write(exampleFile2, 'test4');
        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2), true);
    });

    it('works with multiple tags', function() {
        wfs.write(exampleFile1, 'test1');
        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
        FileChanges.tagChange(exampleFile1);

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), true);

        FileChanges.tagChange(exampleFile1, 'tag1');

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), true);

        FileChanges.tagChange(exampleFile1, 'tag2');

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), false);

        wfs.write(exampleFile1, 'test1'),

        assert.strictEqual(FileChanges.isChanged(exampleFile1), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), true);
    });

    it('works with multiple files and tags', function() {
        wfs.write(exampleFile1, 'test1');
        wfs.write(exampleFile2, 'test2');
        FileChanges.tagChange(exampleFile1);

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), true);

        assert.strictEqual(FileChanges.isChanged(exampleFile2), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag2'), true);

        FileChanges.tagChange(exampleFile1, 'tag1');

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), true);

        assert.strictEqual(FileChanges.isChanged(exampleFile2), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag2'), true);

        FileChanges.tagChange(exampleFile2);

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), true);

        assert.strictEqual(FileChanges.isChanged(exampleFile2), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag2'), true);

        FileChanges.tagChange(exampleFile1, 'tag2');

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), false);

        assert.strictEqual(FileChanges.isChanged(exampleFile2), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag2'), true);

        FileChanges.tagChange(exampleFile2, 'tag2');
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag2'), false);

        wfs.write(exampleFile2, 'test25');

        assert.strictEqual(FileChanges.isChanged(exampleFile1), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag1'), false);
        assert.strictEqual(FileChanges.isChanged(exampleFile1, 'tag2'), false);

        assert.strictEqual(FileChanges.isChanged(exampleFile2), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag1'), true);
        assert.strictEqual(FileChanges.isChanged(exampleFile2, 'tag2'), true);
    });
});
*/