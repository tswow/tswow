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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { Ids } from "../Misc/Ids";
import { Trainer } from "../Trainer/Trainer";
import { Vendor } from "../Vendor/Vendor";
import { Gossip } from "./Gossip";
import { getGossipLabel } from "./GossipLabels";
import { GossipOption } from "./GossipOption";
import { Gossips } from "./Gossips";

export class GossipOptionType extends CellSystem<GossipOption> {
    protected set(value: number, npcValue: number, action = 0) {
        this.owner.row.OptionType.set(value);
        this.owner.row.OptionNpcFlag.set(npcValue);
        this.owner.row.ActionMenuID.set(action);
        return this.owner;
    }

    /**
     * @deprecated Only use this for modifying blizzlike creatures,
     * for custom creatures, use "setExistingVendor/setNewVendor"
     */
    setCreatureVendor(creatureId: number, callback: (vendor: Vendor<void>)=>void) {
        this.set(3,128);
        this.owner.row.ActionMenuID.set(0);
        callback(new Vendor(undefined,creatureId));
        return this.owner;
    }

    setExistingVendor(vendorId: number, callback: (vendor: Vendor<void>)=>void = ()=>{}) {
        this.set(3,128);
        if(vendorId < 0) {
            vendorId = Ids.Vendor.id();
        }
        this.owner.row.ActionMenuID.set(vendorId);
        callback(new Vendor(undefined, vendorId));
    }

    setNewVendor(callback: (vendor: Vendor<void>)=>void = ()=>{}) {
        return this.setExistingVendor(Ids.Vendor.id(),callback);
    }

    setGossipLink(id: number) {
        this.set(1,1);
        this.owner.row.ActionMenuID.set(id);
        return this.owner;
    }

    setNewGossip(callback: (gossip: Gossip)=>void) {
        const gossip = Gossips.create();
        this.set(1,1,gossip.ID);
        callback(gossip);
        return this.owner;
    }

    setExistingTrainer(id: number, callback: (trainer: Trainer)=>void = ()=>{}) {
        let defTrainer = SQL.creature_default_trainer.find({TrainerId:id})
        return this.setTrainer(defTrainer.CreatureId.get(),SQL.trainer.find({Id:id}),callback);
    }

    setNewTrainer(callback: (trainer: Trainer)=>void = ()=>{}) {
        let row = SQL.trainer.add(Ids.Trainer.id());
        let creature = SQL.creature_template.add(Ids.TrainerCreature.id())
            .npcflag.set(16)
        SQL.creature_default_trainer.add(creature.entry.get())
            .TrainerId.set(row.Id.get())
        return this.setTrainer(creature.entry.get(),row,callback);
    }

    private setTrainer(creatureId: number, trainer: trainerRow, callback: (trainer: Trainer)=>void) {
        this.set(5,16,creatureId);
        callback(new Trainer(trainer));
        return this.owner;
    }

    setSpiritHealer() {
        return this.set(6,16384);
    }

    setSpiritGuide() {
        return this.set(7,32768);
    }

    setInnkeeper() {
        return this.set(8,65536);
    }

    setBanker() {
        return this.set(9,131072);
    }

    setPetition() {
        return this.set(10,262144);
    }

    setTabardDesigner() {
        return this.set(11,524288);
    }

    setAuctioneer() {
        return this.set(13,2097152);
    }

    setStableMaster() {
        return this.set(14,4194304);
    }

    setUnlearnTalents() {
        return this.set(16,16);
    }

    setUnlearnPetTalents() {
        return this.set(17,16);
    }

    setLearnDualSpec() {
        return this.set(18,16);
    }
}