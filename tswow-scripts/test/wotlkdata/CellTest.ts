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
import { Cell, CPrim } from '../../data/cell/cells/Cell';
import { CellSystem, CellSystemTop } from '../../data/cell/systems/CellSystem';

class BasicCell<T extends CPrim, G> extends Cell<T, G> {
    field: string;
    constructor(owner: G, field: string) {
        super(owner);
        this.field = field;
    }

    get(): T {
        return (this.owner as any)[`_${this.field}`];
    }

    set(value: T): G {
        (this.owner as any)[`_${this.field}`] = value;
        return this.owner;
    }
}

class ShallowStruct extends CellSystemTop {
    private _g1 = 'initial';
    private _g2 = 2;
    private _g3 = true;

    g1 = new BasicCell<string, ShallowStruct>(this, 'g1');
    g2 = new BasicCell<number, ShallowStruct>(this, 'g2');
    g3 = new BasicCell<boolean, ShallowStruct>(this, 'g3');
}

class DeepStruct extends ShallowStruct {
    readonly sub = new DeepSubsystem(this);
}

class DeepSubsystem extends CellSystem<DeepStruct> {
    private _d1 = 'deepvalue';
    d1 = new BasicCell<string, DeepSubsystem>(this, 'd1');
}


describe('Cell', function() {
    describe('BasicCell', function() {
        it('Reads/assigns', function() {
            const g = new ShallowStruct();
            assert.strictEqual(g.g1.get(), 'initial');
            g.g1.set('value1');
            g.g2.set(25);
            g.g3.set(false);
            assert.strictEqual(g.g1.get(), 'value1');
            assert.strictEqual(g.g2.get(), 25);
            assert.strictEqual(g.g3.get(), false);
        });

        it('clones shallow', function() {
            const g1 = new ShallowStruct();
            const g2 = new ShallowStruct();
            g1.g1.set('clonedvalue');
            g1.g2.set(1007688);
            g1.g3.set(false);
            CellSystem.cloneFrom(g2, g1);
            assert.strictEqual(g2.g1.get(), 'clonedvalue');
            assert.strictEqual(g2.g2.get(), 1007688);
            assert.strictEqual(g2.g3.get(), false);
        });

        it('clones deep', function() {
            const g1 = new DeepStruct();
            const g2 = new DeepStruct();
            g1.g1.set('clonedvalue');
            g1.g2.set(1007688);
            g1.g3.set(false);
            g1.sub.d1.set('changed_deep');
            CellSystem.cloneFrom(g2, g1);
            assert.strictEqual(g2.g1.get(), 'clonedvalue');
            assert.strictEqual(g2.g2.get(), 1007688);
            assert.strictEqual(g2.g3.get(), false);
            assert.strictEqual(g2.sub.d1.get(), 'changed_deep');
        });
    });
});
