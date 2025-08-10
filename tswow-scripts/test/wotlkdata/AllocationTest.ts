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
import { Allocator } from '../../util/ids/Allocator';
import { Random } from './Random';

let p = new Allocator();

describe('Allocations', function() {
    this.beforeEach(function() {
        p.allocations = [];
    });

    it('Adds a lone entry', function() {
        p.add(0, 1);
        assert.strictEqual(p.get(0).low, 0);
        assert.strictEqual(p.get(0).high, 0);
        assert.strictEqual(p.length, 1);
    });

    it('Merges two identical', function() {
        p.add(0, 1);
        p.add(0, 1);
        assert.strictEqual(p.length, 1);
        assert.strictEqual(p.get(0).low, 0);
        assert.strictEqual(p.get(0).high, 1);
    });

    it('Merges 3 allocations', function() {
        p.add(0, 1);
        p.add(0, 1);
        p.add(2, 1);
        assert.strictEqual(p.length, 1);
        assert.strictEqual(p.get(0).low, 0);
        assert.strictEqual(p.get(0).high, 2);
    });

    it('Separates non-merging allocations', function() {
        p.add(0, 1);
        p.add(2, 1);
        assert.strictEqual(p.length, 2);
        assert.strictEqual(p.get(1).low, 2);
        assert.strictEqual(p.get(1).high, 2);
    });

    it('Merges under a higher allocation', function() {
        p.add(0, 1);
        p.add(5, 1);
        p.add(0, 1);
        assert.strictEqual(p.length, 2);
        assert.strictEqual(p.get(0).high, 1);
    });

    it('Merges two allocations to one', function() {
        p.add(0, 1);
        p.add(2, 1);
        assert.strictEqual(p.length, 2);
        p.add(0, 1);
        assert.strictEqual(p.length, 1);
        assert.strictEqual(p.get(0).low, 0);
        assert.strictEqual(p.get(0).high, 2);
    });

    it('Does not merge a non-fitting allocation', function() {
        p.add(0, 1); // [0]
        p.add(2, 1); // [2]
        p.add(0, 2); // [2,4]
        assert.strictEqual(p.length, 2);
        assert.strictEqual(p.get(0).high, 0);
        assert.strictEqual(p.get(1).low, 2);
        assert.strictEqual(p.get(1).high, 4);
    });

    it('Handles complex allocation', function() {
        p.add(0, 2); // claims [0,1]

        p.add(6, 2); // claims [6,7]

        p.add(3, 2); // claims [3,4]

        assert.strictEqual(p.length, 3);

        assert.strictEqual(p.get(0).low, 0);
        assert.strictEqual(p.get(0).high, 1);

        assert.strictEqual(p.get(1).low, 3);
        assert.strictEqual(p.get(1).high, 4);

        assert.strictEqual(p.get(2).low, 6);
        assert.strictEqual(p.get(2).high, 7);

        p.add(0, 2); // merges to [6,9]

        assert.strictEqual(p.length, 3);
        assert.strictEqual(p.get(2).low, 6);
        assert.strictEqual(p.get(2).high, 9);

        p.add(4, 1); // merges to [3,9]

        assert.strictEqual(p.length, 2);
        assert.strictEqual(p.get(1).low, 3);
        assert.strictEqual(p.get(1).high, 9);
    });

    it('Handles 1000 random allocations in ranges 15-200', function() {
        const rnd = new Random('^^');
        for (let i = 0; i < 1000; ++i) {
            p = new Allocator();
            let tot = 0;
            const segments = [];
            const ids: number[] = [];

            const roof = rnd.int(15, 200);
            const count = rnd.int(0, Math.round(roof * 0.75));

            for (let j = 0; j < count; ++j) {
                const c = rnd.int(1, 5);
                let insert = rnd.int(0, roof);
                if (rnd.int(0, 5)) { insert = 1; }
                segments.push([insert, c]);
                tot += c;
                const id = (p.add(insert, c));

                // Check for duplicate ids
                if (ids.includes(id)) {
                    assert.fail(`ID ${id} already exists from ${JSON.stringify(segments)}\nIn:${JSON.stringify(p.allocations)}`);
                }
                ids.push(id);

                // Check for holes of 0
                for (let i2 = 0; i2 < p.allocations.length - 1; ++i2)  {
                    const p1 = p.get(i2);
                    const p2 = p.get(i2 + 1);

                    if (p1.high < p1.low) { assert.fail(`Invalid allocation ${p1} from segments ${JSON.stringify(segments)}\nIn: ${JSON.stringify(p.allocations)}`); }
                    if (p1.high > p2.low) { assert.fail(`Allocations not in order: [..${JSON.stringify(p1)},${JSON.stringify(p2)}..] from segments ${JSON.stringify(segments)}\nIn: ${JSON.stringify(p.allocations)}`); }
                    if (p2.low === p1.high + 1) { assert.fail(`Hole of 0: [..${JSON.stringify(p1)},${JSON.stringify(p2)}..] from segments ${JSON.stringify(segments)}\nIn: ${JSON.stringify(p.allocations)}`); }
                }

                // Check for insert/allocation sizes mismatch
                if (p.totalIds !== tot) { assert.fail(`${JSON.stringify(segments)} gives sum ${tot}!=${p.totalIds}\nIn:${JSON.stringify(p.allocations)}`); }
                if (isNaN(p.fragmentation)) { assert.fail(`Invalid fragmentation: ${JSON.stringify(segments)}\nIn: ${JSON.stringify(p.allocations)}`); }

            }
        }
    });
});
