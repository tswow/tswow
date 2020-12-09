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
import { EnumBase } from "wotlkdata/cell/Systems/Enum";
import { ItemBase } from "./Item";

export class ItemTotemCategory extends EnumBase<ItemBase> {
    get(): number {
        return this.owner.row.TotemCategory.get();
    }

    set(value: number): ItemBase {
        this.owner.row.TotemCategory.set(value);
        return this.owner;
    }

    setSkinningKnife() { return this.set(1); }
    setEarthTotem() { return this.set(2); }
    setAirTotem() { return this.set(3); }
    setFireTotem() { return this.set(4); }
    setWaterTotem() { return this.set(5); }
    setRunedCopperRod() { return this.set(6); }
    setRunedSilverRod() { return this.set(7); }
    setRunedGoldenRod() { return this.set(8); }
    setRunedTruesilverRod() { return this.set(9); }
    setRunedArcaniteRod() { return this.set(10); }
    setMiningPick() { return this.set(11); }
    setPhilosophersStone() { return this.set(12); }
    setBlacksmithHammer() { return this.set(13); }
    setArclightSpanner() { return this.set(14); }
    setGyromaticMicroAdjustor() { return this.set(15); }
    setMasterTotem() { return this.set(21); }
    setRunedFelIronRod() { return this.set(41); }
    setRunedAdamantiteRod() { return this.set(62); }
    setRunedEterniumRod() { return this.set(63); }
    setHollowQuill() { return this.set(81); }
    setRunedAzuriteRod() { return this.set(101); }
    setVirtuosoInkingSet() { return this.set(121); }
    setDrums() { return this.set(141); }
    setGnomishArmyKnife() { return this.set(161); }
    setBlacksmithHammer2() { return this.set(162); }
    setMiningPick2() { return this.set(165); }
    setSkinningKnife2() { return this.set(166); }
    setHammerPick() { return this.set(167); }
    setBladedPickaxe() { return this.set(168); }
    setFlintAndTinder() { return this.set(169); }
    setRunedCobaltRod() { return this.set(189); }
    setRunedTitaniumRod() { return this.set(190); }
}