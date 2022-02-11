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
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { Ids } from "../Misc/Ids";
import { TrainerPlain, TrainerRegistry } from "../Trainer/Trainer";
import { Vendor } from "../Vendor/Vendor";
import { Gossip } from "./Gossip";
import { GossipOption } from "./GossipOption";
import { GossipRegistry } from "./Gossips";

export class OptionCellBase extends CellSystem<GossipOption> {
    protected type: number;
    protected flag: number;

    constructor(owner: GossipOption, type: number, flag: number) {
        super(owner)
        this.type = type;
        this.flag = flag;
    }

    is() {
        return this.owner.row.OptionType.get() === this.type;
    }

    on(callback: (option: GossipOption)=>void) {
        if(this.is()) callback(this.owner);
        return this.owner;
    }

    protected _set() {
        this.owner.row.OptionType.set(this.type);
        this.owner.row.OptionNpcFlag.set(this.flag);
        return this.owner;
    }
}

export class VendorCell extends OptionCellBase {
    set(): GossipOption
    set(creatureId: number, callback?: (vendor: Vendor)=>void): GossipOption;

    set(creatureId?: number, callback?: (vendor: Vendor)=>void) {
        this._set();
        if(creatureId === undefined) {

        }
        this.owner.row.ActionMenuID.set(creatureId||0)
        if(callback && creatureId) callback(new Vendor(creatureId))
        return this.owner;
    }

    setNew(callback: (vendor: Vendor)=>void) {
        let c = SQL.creature_template.add(Ids.creature_template.dynamicId());
        c.name.set('Dummy Vendor Creature')
        return this.set(c.entry.get(), callback);
    }
}

export class TrainerCell extends OptionCellBase {
    private __set(trainerId: number, creatureId: number, callback?: (trainer: TrainerPlain)=>void) {
        this._set();
        this.owner.row.ActionMenuID.set(creatureId);
        if(callback) callback(TrainerRegistry.load(trainerId));
        return this.owner;
    }

    setOwner() {
        this._set();
        this.owner.row.ActionMenuID.set(0)
        return this.owner;
    }

    set(trainerId: number, callback?: (trainer: TrainerPlain)=>void) {
        return this.__set(
              trainerId
            , SQL.creature_default_trainer
                .query({TrainerId:trainerId}).CreatureId.get()
            , callback)
    }

    setNew(callback: (trainer: TrainerPlain)=>void) {
        let creature = SQL.creature_template.add(Ids.creature_template.dynamicId());
        creature.name.set('Dummy Trainer Creature').npcflag.set(16)
        let trainer = TrainerRegistry.create()
        SQL.creature_default_trainer.add(creature.entry.get())
            .TrainerId.set(trainer.ID)
        return this.__set(trainer.ID,creature.entry.get(),callback);
    }
}

export class GossipLinkCell extends OptionCellBase {
    setLink(id: number) {
        this._set();
        this.owner.row.ActionMenuID.set(id);
        return this.owner;
    }

    setNew(callback: (gossip: Gossip)=>void) {
        let gossip = GossipRegistry.create()
        this.setLink(gossip.ID)
        callback(gossip);
        return this.owner;
    }

    setNewStatic(mod: string, id: string, callback: (gossip: Gossip)=>void) {
        let gossip = GossipRegistry.createStatic(mod,id);
        this.setLink(gossip.ID)
        callback(gossip);
        return this.owner;
    }
}

export class OptionCellPlain extends OptionCellBase {
    set() {
        this._set();
        this.owner.row.ActionMenuID.set(0)
        return this.owner;
    }
}

export class GossipOptionType extends CellSystem<GossipOption> {
    protected set(value: number, npcValue: number, action = 0) {
        this.owner.row.OptionType.set(value);
        this.owner.row.OptionNpcFlag.set(npcValue);
        this.owner.row.ActionMenuID.set(action);
        return this.owner;
    }

    protected value(type: number, flag: number) {
        return new OptionCellPlain(this.owner, type,flag);
    }

    get VENDOR()  { return new VendorCell(this.owner, 3, 128); }
    get GOSSIP()  { return new GossipLinkCell(this.owner, 1, 1); }
    get TRAINER() { return new TrainerCell(this.owner, 5, 16); }

    get SPIRIT_HEALER()      { return this.value(6,16384)}
    get SPIRIT_GUIDE()       { return this.value(7,32768)}
    get INNKEEPER()         { return this.value(8,65536)}
    get BANKER()            { return this.value(9,131072)}
    get PETITION()          { return this.value(10,262144)}
    get TABARD_DESIGNER()    { return this.value(11,524288)}
    get AUCTIONEER()        { return this.value(13,2097152)}
    get STABLE_MASTER()      { return this.value(14,4194304)}
    get UNLEARN_TALENTS()    { return this.value(16,16)}
    get UNLEARN_PET_TALENTS() { return this.value(17,16)}
    get DUAL_SPEC()          { return this.value(18,16)}

    get() { return this.owner.row.OptionType.get()}

    objectify() {
        switch(this.owner.row.OptionType.get()) {
            case 1:  return 'VENDOR'
            case 3:  return 'GOSSIP'
            case 5:  return 'TRAINER'
            case 6:  return 'SPIRIT_HEALER'
            case 7:  return 'SPIRIT_GUIDE'
            case 8:  return 'INNKEEPER'
            case 9:  return 'BANKER'
            case 10: return 'PETITION'
            case 11: return 'TABARD_DESIGNER'
            case 13: return 'AUCTIONEER'
            case 14: return 'STABLE_MASTER'
            case 16: return 'UNLEARN_TALENTS'
            case 17: return 'UNLEARN_PET_TALENTS'
            case 18: return 'DUAL_SPECS'
            default: return 'INVALID'
        }
    }
}