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
import { SQL } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { EnumField } from "wotlkdata/cell/Systems/Enum";
import { creature_default_trainerRow } from "wotlkdata/sql/types/creature_default_trainer";
import { trainerRow } from "wotlkdata/sql/types/trainer";
import { GOCreature } from "../Base/GOorCreature";
import { Ids } from "../Base/Ids";
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { GameObjectTemplate } from "../GameObject/GameObjectTemplate";
import { Trainer } from "../Trainer/Trainer";
import { Vendor } from "../Vendor/Vendor";
import { GossipOption } from "./GossipOption";
import { Gossips } from "./Gossips";

export class GossipOptionType<S,G,T extends GOCreature<G>> extends Subsystem<GossipOption<S,G,T>> {
    protected set(value: number, npcValue: number, action = 0) {
        this.owner.row.OptionType.set(value);
        this.owner.row.OptionNpcFlag.set(npcValue);
        this.owner.row.ActionMenuID.set(action);
        return this.owner;
    }

    protected topOwner() {
        return this.end.end.topOwner;
    }

    protected onCreature(callback: (c: CreatureTemplate)=>any) {
        const owner = this.topOwner();
        if(GOCreature.isCreature(owner)) {
            callback(owner);
        }
    }

    protected onGameObject(callback: (c: GameObjectTemplate)=>any) {
        const owner = this.topOwner();
        if(GOCreature.isGameObject(owner)) {
            callback(owner);
        }
    }

    setOwnVendor() : Vendor<GossipOption<S,G,T>> { 
        this.set(3,128);
        this.owner.row.ActionMenuID.set(0);
        this.onCreature((x)=>{
            x.NPCFlags.Vendor.mark()
        });
        // TODO: onGameObject
        return new Vendor(this.owner, this.end.end.topOwner.ID);
    }

    setMultivendor(vendorId: number = -1) : Vendor<GossipOption<S,G,T>> {
        if(vendorId===-1) {
            vendorId = Ids.Vendor.id();
        }
        this.set(3,128);
        this.owner.row.ActionMenuID.set(vendorId);
        this.onCreature((x)=>{
            x.NPCFlags.Vendor.mark();
        });
        // TODO: onGameObject
        return new Vendor(this.owner, vendorId)
    }

    setGossipLink(id: number) {
        this.set(1,1);
        this.owner.row.ActionMenuID.set(id);
        return this.owner;
    }

    setNewGossip() {
        const gossip = Gossips.create(this.owner, this.end.end.topOwner);
        this.set(1,1,gossip.ID);
        return gossip;
    }

    setOwnTrainer() {
        this.set(5,16,0);
        let trainer : Trainer<GossipOption<S,G,T>>|undefined = undefined;
        const x = this.end.end.topOwner
        if(GOCreature.isCreature(x)) {
            x.NPCFlags.Trainer.mark();
            const ctrainer = x.Trainer;
            trainer = new Trainer<GossipOption<S,G,T>>
                (this.owner, ctrainer.trainerRow, ctrainer.creatureRow);
        }

        if(trainer===undefined) {
            throw new Error(`GameObject trainers not supported`);
        }

        return trainer;
    }

    setMultitrainer(creatureId = -1) {
        this.onCreature((x)=>{
            x.NPCFlags.Trainer.mark();
        });

        let trainerRow : trainerRow;
        let creatureRow : creature_default_trainerRow;

        if(creatureId == -1){
            creatureId = Ids.TrainerCreature.id();

            // MultiTrainers don't work if there isn't a creature backing it
            SQL.creature_template.add(creatureId)
                .npcflag.set(16)

            trainerRow = SQL.trainer.add(Ids.Trainer.id());
            creatureRow = SQL.creature_default_trainer.add(creatureId);
            creatureRow.TrainerId.set(trainerRow.Id.get());
        } else {
            creatureRow = SQL.creature_default_trainer.find({CreatureId: creatureId})
            trainerRow = SQL.trainer.find({Id:creatureRow.TrainerId.get()});
        }
        this.set(5,16,creatureId);
        return new Trainer(this.owner, trainerRow, creatureRow);
    }

    setSpiritHealer() { 
        this.onCreature((x)=>{
            x.NPCFlags.SpiritHealer.mark();
        });
        return this.set(6,16384); 
    }

    setSpiritGuide() { 
        this.onCreature((x)=>{
            x.NPCFlags.SpiritGuide.mark();
        });
        return this.set(7,32768); 
    }
    
    //setQuestgiver() { return this.set(2,2); }
    //setTaxiVendor() { return this.set(4,8192); }
    setInnkeeper() { 
        this.onCreature((x)=>{
            x.NPCFlags.Innkeeper.mark();
        });
        return this.set(8,65536); 
    }

    setBanker() { 
        this.onCreature((x)=>{
            x.NPCFlags.Banker.mark();
        });
        return this.set(9,131072); 
    }

    setPetition() { 
        this.onCreature((x)=>{
            x.NPCFlags.Petitioner.mark();
        });
        return this.set(10,262144); 
    }

    setTabardDesigner() { 
        this.onCreature((x)=>{
            x.NPCFlags.TabardDesigner.mark();
        });
        return this.set(11,524288); 
    }
    //setBattlefield() { return this.set(12,1048576); }

    setAuctioneer() { 
        this.onCreature((x)=>{
            x.NPCFlags.Auctioneer.mark();
        })
        return this.set(13,2097152); 
    }

    setStableMaster() { 
        this.onCreature((x)=>{
            x.NPCFlags.StableMaster.mark();
        });
        return this.set(14,4194304); 
    }

    //setArmorer() { return this.set(15,4096); }

    setUnlearnTalents() { 
        this.onCreature((x)=>{
            x.NPCFlags.Trainer.mark();
        });
        return this.set(16,16); 
    }

    setUnlearnPetTalents() { 
        this.onCreature((x)=>{
            x.NPCFlags.Trainer.mark();
        });
        return this.set(17,16); 
    }

    setLearnDualSpec() { 
        this.onCreature((x)=>{
            x.NPCFlags.Trainer.mark();
        });
        return this.set(18,16); 
    }

    //setOutdoorPVP() { return this.set(19,0); }
}
