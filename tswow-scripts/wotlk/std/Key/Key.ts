/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { CellSystemTop, MulticastLocCell } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { MultirowSystemCached } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { SpellRow } from "wotlkdata/wotlkdata/dbc/types/Spell";
import { item_templateRow } from "wotlkdata/wotlkdata/sql/types/item_template";
import { ChargesSystem } from "../Item/ItemSpells";
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate";
import { Lock } from "../Locks/Lock";
import { LockRegistry } from "../Locks/Locks";
import { SelfRef } from "../Refs/Ref";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";

export class KeyLocks extends MultirowSystemCached<Lock,Key> {
    protected getAllRows(): Lock[] {
        return LockRegistry
            .filter(x=>x.Requirements.find(y=>
                y.Type.ITEM.is()
                && this.owner.ItemID === y.Type.ITEM.as().Item.get()
            ))
    }
    protected isDeleted(value: Lock): boolean {
        return value.row.isDeleted()
    }

    addGet(lockType: number = 5, lockSkill = 0) {
        return LockRegistry.create()
            .Requirements.addItem(this.owner.ItemID,1)
            .Requirements.addLockType(lockType,lockSkill,0)
    }
}

export class Key extends CellSystemTop {
    readonly spellRow: SpellRow
    readonly itemRow: item_templateRow
    readonly Locks = new KeyLocks(this)
    get AsSpell() { return new SelfRef(this, ()=>new Spell(this.spellRow)); }
    get AsItem() { return new SelfRef(this, ()=>new ItemTemplate(this.itemRow)); }

    get SpellID() { return this.spellRow.ID.get(); }
    get ItemID() { return this.itemRow.entry.get(); }

    get Name() {
        return new MulticastLocCell(
            this,([this.spellRow.Name,this.AsItem.get().Name])
        )
    }

    get Charges() {
        return new ChargesSystem(this, this.AsItem.get().Spells.get(0).Charges.Raw)
    }

    get Description() {
        return this.wrapLoc(this.spellRow.Description)
    }

    constructor(spell: SpellRow, item: item_templateRow) {
        super();
        this.spellRow = spell;
        this.itemRow = item;
    }
}

export const KeyRegistry = {
    create(mod: string, id: string, type: 'GAMEOBJECT') {
        const KEY_SPELL = SpellRegistry
            .create(mod,`${id}-spell`)
            .Attributes.IS_HIDDEN_FROM_LOG.set(true)
            .Attributes.NOT_SHAPESHIFTED.set(true)
            .TargetType.GAME_OBJECT_ITEM.set(true)
            .Range.set(12)
            .CastTime.set(4)
            .Visual.set(104)
            .InterruptFlags.set(['ON_MOVEMENT','ON_PUSHBACK','ON_INTERRUPT_CAST',1<<3,1<<4])
            .Effects.addMod(eff=>{
                eff.Type
                    .OPEN_LOCK.set()
                    .AsEffect.mod(eff=>eff.PointsBase.set(-1))
                    .ImplicitTargetA.GAMEOBJECT_TARGET.set()
            })

        const KEY_ITEM = ItemTemplateRegistry.create(mod,id)
            .Quality.WHITE.set()
            .Class.KEY.set()
            .RequiredLevel.set(0)
            .ItemLevel.set(1)
            .MaxStack.set(1)
            .Flags.PLAYER_CAST.set(true)
            .RequiredDisenchantSkill.set(-1)
            .Spells.addMod(spell=>{
                spell.Spell.set(KEY_SPELL.ID)
                     .Charges.set('UNLIMITED')
                     .ProcsPerMinute.set(-1)
            })
        return new Key(KEY_SPELL.row,KEY_ITEM.row)
    },
}