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
import { GetId, GetIdRange, GetTempId, IdPrivate, IdRange } from '../../util/ids/Ids';
import { Random } from './Random';

const file = './testids.txt';

class IdPublic extends IdPrivate {
    static flushMemory = IdPrivate.flushMemory;
    static getMappings = IdPrivate.getMappings;
    static readFile = () => IdPrivate.readFile(file);
    static writeFile = () => IdPrivate.writeFile(file);
}

async function read() {
    IdPublic.readFile();
}

async function write() {
    IdPublic.writeFile();
}

const seed = 'hello_world';

let random = new Random(seed);

function SimpleID(name: string, startid: number = 10000) {
    return GetId('item_template','',name,startid)
}

function SimpleRange(name: string, range: number, startid: number = 10000) {
    return GetIdRange('item_template', 'a', name, range, startid);
}

function TempID(startid: number = 10000) {
    return GetTempId('item_template',startid);
}

describe('Ids', function() {
    this.beforeEach(async function() {
        IdPublic.flushMemory();
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        random = new Random(seed);
    });

    describe('IdRange#offset', function() {
        it('works when offset<size', function() {
            assert.strictEqual(new IdRange(false, '', '', '', 0, 0).offset(0), 0);
            assert.strictEqual(new IdRange(false, '', '', '', 0, 1).offset(1), 1);
        });

        it('throws when offset>=size', function() {
            assert.throws(() => new IdRange(false, '', '', '', 0, 0).offset(1));
            assert.throws(() => new IdRange(false, '', '', '', 0, 0).offset(2));

            assert.throws(() => new IdRange(false, '', '', '', 2, 5).offset(4));
            assert.throws(() => new IdRange(false, '', '', '', 2, 5).offset(4));
        });
    });

    describe('GetIdTemp', function() {
        it('increments', function() {
            let id1 = TempID(0);
            let id2 = TempID(1);
            assert.strictEqual(id1,0);
            assert.strictEqual(id2,1);
        })

        it('fills holes from saved data', async function() {
            TempID(0);
            let staticId = SimpleID('a',0)
            assert.strictEqual(staticId,1)
            await write();
            await read();
            assert.strictEqual(SimpleID('a',0),1)
            assert.strictEqual(TempID(0),0)
            assert.strictEqual(TempID(0),2)
        })
    })

    describe('GetRange', function() {
        it('writes ranges to distinct ids', function() {
            const a = SimpleRange('a', 1);
            const b = SimpleRange('b', 2);
            const c = SimpleRange('c', 3);
            const d = SimpleRange('d', 1);

            assert.strictEqual(a.contains(b), false);
            assert.strictEqual(a.contains(c), false);
            assert.strictEqual(a.contains(d), false);

            assert.strictEqual(b.contains(c), false);
            assert.strictEqual(b.contains(d), false);

            assert.strictEqual(c.contains(d), false);
        });

        it('remembers ranges in memory', function() {
            const a = SimpleRange('a', 1);
            const b = SimpleRange('b', 10);
            const c = SimpleRange('c', 5);
            const d = SimpleRange('d', 1);

            assert.strictEqual(a.equals(SimpleRange('a', 1)), true);
            assert.strictEqual(b.equals(SimpleRange('b', 10)), true);
            assert.strictEqual(c.equals(SimpleRange('c', 5)), true);
            assert.strictEqual(d.equals(SimpleRange('d', 1)), true);
        });

        it('remembers ranges on disk', async function() {
            const a = SimpleRange('a', 1);
            const b = SimpleRange('b', 10);
            const c = SimpleRange('c', 5);
            const d = SimpleRange('d', 1);

            await write();
            await read();

            assert.strictEqual(a.equals(SimpleRange('a', 1)), true);
            assert.strictEqual(b.equals(SimpleRange('b', 10)), true);
            assert.strictEqual(c.equals(SimpleRange('c', 15)), true);
            assert.strictEqual(d.equals(SimpleRange('d', 1)), true);
        });

        it('writes 10000 fast ids under 10 seconds', async function() {
            this.timeout(1000000000);
            let now = Date.now();
            for (let i = 0; i < 100000; ++i) {
                SimpleRange(random.string(20), 1);
            }

            console.log(`Time to find ${Date.now() - now}`);
            now = Date.now();

            await write();
            console.log(`Time to write ${Date.now() - now}`);
            now = Date.now();

            await read();
            console.log(`Time to read ${Date.now() - now}`);
            now = Date.now();

            await write();
            console.log(`Time to write (time 2) ${Date.now() - now}`);
        });

        it('Doesn\'t cause collisions after closing the file', async function () {
            const a = SimpleRange('a', 1, 0);
            const b = SimpleRange('b', 1, 0);

            await IdPublic.writeFile();
            await IdPublic.readFile();
            const c = SimpleRange('c', 1, 0);

            assert.strictEqual(a.low, 0);
            assert.strictEqual(b.low, 1);
            assert.strictEqual(c.low, 2);
        });
    });
});
