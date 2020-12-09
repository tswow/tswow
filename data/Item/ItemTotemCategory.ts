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
import { EnumBase, EnumField } from "wotlkdata/cell/Systems/Enum";
import { ItemBase } from "./Item";

export class ItemTotemCategory extends EnumBase<ItemBase> {
    get(): number {
        return this.owner.row.TotemCategory.get();
    }

    set(value: number): ItemBase {
        this.owner.row.TotemCategory.set(value);
        return this.owner;
    }

    @EnumField(1)
    setSkinningKnife() { return this.set(1); }

    @EnumField(2)
    setEarthTotem() { return this.set(2); }

    @EnumField(3)
    setAirTotem() { return this.set(3); }

    @EnumField(4)
    setFireTotem() { return this.set(4); }

    @EnumField(5)
    setWaterTotem() { return this.set(5); }

    @EnumField(6)
    setRunedCopperRod() { return this.set(6); }

    @EnumField(7)
    setRunedSilverRod() { return this.set(7); }

    @EnumField(8)
    setRunedGoldenRod() { return this.set(8); }

    @EnumField(9)
    setRunedTruesilverRod() { return this.set(9); }
    
    @EnumField(10)
    setRunedArcaniteRod() { return this.set(10); }
    
    @EnumField(11)
    setMiningPick() { return this.set(11); }
    
    @EnumField(12)
    setPhilosophersStone() { return this.set(12); }
    
    @EnumField(13)
    setBlacksmithHammer() { return this.set(13); }

    @EnumField(14)
    setArclightSpanner() { return this.set(14); }

    @EnumField(15)
    setGyromaticMicroAdjustor() { return this.set(15); }

    @EnumField(21)
    setMasterTotem() { return this.set(21); }

    @EnumField(41)
    setRunedFelIronRod() { return this.set(41); }

    @EnumField(62)
    setRunedAdamantiteRod() { return this.set(62); }

    @EnumField(63)
    setRunedEterniumRod() { return this.set(63); }

    @EnumField(81)
    setHollowQuill() { return this.set(81); }

    @EnumField(101)
    setRunedAzuriteRod() { return this.set(101); }
    
    @EnumField(121)
    setVirtuosoInkingSet() { return this.set(121); }

    @EnumField(141)
    setDrums() { return this.set(141); }

    @EnumField(161)
    setGnomishArmyKnife() { return this.set(161); }

    @EnumField(162)
    setBlacksmithHammer2() { return this.set(162); }

    @EnumField(165)
    setMiningPick2() { return this.set(165); }

    @EnumField(166)
    setSkinningKnife2() { return this.set(166); }

    @EnumField(167)
    setHammerPick() { return this.set(167); }

    @EnumField(168)
    setBladedPickaxe() { return this.set(168); }

    @EnumField(169)
    setFlintAndTinder() { return this.set(169); }

    @EnumField(189)
    setRunedCobaltRod() { return this.set(189); }

    @EnumField(190)
    setRunedTitaniumRod() { return this.set(190); }
}