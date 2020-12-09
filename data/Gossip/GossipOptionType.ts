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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { GossipOption } from "./GossipOption";

export class GossipOptionType<T> extends Subsystem<GossipOption<T>> {
    protected set(value: number, npcValue: number) {
        this.owner.row.OptionType.set(value);
        this.owner.row.OptionNpcFlag.set(value);
        return this.owner;
    }
    
    setGossip() { return this.set(1,1); }
    setQuestgiver() { return this.set(2,2); }
    setVendor() { return this.set(3,128); }
    setTaxiVendor() { return this.set(4,8192); }
    setTrainer() { return this.set(5,16); }
    setSpiritHealer() { return this.set(6,16384); }
    setSpiritGuide() { return this.set(7,32768); }
    setInnkeeper() { return this.set(8,65536); }
    setBanker() { return this.set(9,131072); }
    setPetition() { return this.set(10,262144); }
    setTabardDesigner() { return this.set(11,524288); }
    setBattlefield() { return this.set(12,1048576); }
    setAuctioneer() { return this.set(13,2097152); }
    setStablepet() { return this.set(14,4194304); }
    setArmorer() { return this.set(15,4096); }
    setUnlearnTalents() { return this.set(16,16); }
    setUnlearnPetTalents() { return this.set(17,16); }
    setLearnDualSpec() { return this.set(18,16); }
    setOutdoorPVP() { return this.set(19,0); }
}
