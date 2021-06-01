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
import { ItemTemplate } from "./ItemTemplate";

let itemClassFields : {[key: string]: string} = {}
function indexKey(indexA: number, indexB: number) {
    return `${indexA},${indexB}`
}

function ItemClassField(indexA: number, indexB: number) {
    return function(target: any, field: string) {
        if(field.startsWith('set')) field = field.substring(3);
        itemClassFields[indexKey(indexA,indexB)] = field
    }
}

export class ItemClass extends CellSystem<ItemTemplate> {
    objectify() {
        let field = itemClassFields[indexKey(this.getClass(),this.getSubclass())]
        if(field!==undefined) {
            return field;
        } else {
            return {class: this.getClass(), subclass: this.getSubclass()};
        }
    }

    getClass(): number {
        return this.owner.row.class.get();
    }

    getSubclass(): number {
            return this.owner.row.subclass.get();
    }

    set(cls: number, subclass: number): ItemTemplate {
        this.owner.row.class.set(cls);
        this.owner.row.subclass.set(subclass);

        this.owner.dbcRow.ClassID.set(cls)
        this.owner.dbcRow.SubclassID.set(subclass);
        return this.owner;
    }

    // Consumables
    @ItemClassField(0,0)
    setConsumable() { return this.set(0,0) ;}
    @ItemClassField(0,1)
    setPotion() { return this.set(0,1)}
    @ItemClassField(0,2)
    setElixit() { return this.set(0,2)}
    @ItemClassField(0,3)
    setFlask() { return this.set(0,3)}
    @ItemClassField(0,4)
    setScroll() { return this.set(0,4)}
    @ItemClassField(0,5)
    setFoodDrink() { return this.set(0,5)}
    @ItemClassField(0,6)
    setItemEnhancement() { return this.set(0,6)}
    @ItemClassField(0,7)
    setBandage() { return this.set(0,7)}
    @ItemClassField(0,8)
    setOther() { return this.set(0,8)}

    // Containers
    @ItemClassField(1,0)
    setBag() { return this.set(1,0)}
    @ItemClassField(1,1)
    setSoulBag() { return this.set(1,1)}
    @ItemClassField(1,2)
    setHerbBag() { return this.set(1,2)}
    @ItemClassField(1,3)
    setEnchantingBag() { return this.set(1,3)}
    @ItemClassField(1,4)
    setEngineeringBag() { return this.set(1,4)}
    @ItemClassField(1,5)
    setGemBag() { return this.set(1,5)}
    @ItemClassField(1,6)
    setMiningBag() { return this.set(1,6)}
    @ItemClassField(1,7)
    setLeatherworkingBag() { return this.set(1,7)}
    @ItemClassField(1,8)
    setInscriptionBag() { return this.set(1,8)}

    // Weapon
    @ItemClassField(2,0)
    setAxe1H() { return this.set(2,0)}
    @ItemClassField(2,1)
    setAxe2H() { return this.set(2,1)}
    @ItemClassField(2,2)
    setBow() { return this.set(2,2)}
    @ItemClassField(2,3)
    setGun() { return this.set(2,3)}
    @ItemClassField(2,4)
    setMace1H() { return this.set(2,4)}
    @ItemClassField(2,5)
    setMace2H() { return this.set(2,5)}
    @ItemClassField(2,6)
    setPolearm() { return this.set(2,6)}
    @ItemClassField(2,7)
    setSword1H() { return this.set(2,7)}
    @ItemClassField(2,8)
    setSword2H() { return this.set(2,8)}
    @ItemClassField(2,9)
    setObsolete() { return this.set(2,9)}
    @ItemClassField(2,10)
    setStaff() { return this.set(2,10)}
    @ItemClassField(2,11)
    setExotic() { return this.set(2,11)}
    @ItemClassField(2,12)
    setExotic2() { return this.set(2,12)}
    @ItemClassField(2,13)
    setFistWeapon() { return this.set(2,13)}
    /** Blacksmith Hammer, Mining pick etc. */
    @ItemClassField(2,15)
    setMiscWeapon() { return this.set(2,15)}
    @ItemClassField(2,16)
    setDagger() { return this.set(2,16)}
    @ItemClassField(2,17)
    setThrown() { return this.set(2,17)}
    @ItemClassField(2,18)
    setSpear() { return this.set(2,18)}
    @ItemClassField(2,19)
    setCrossbow() { return this.set(2,19)}
    @ItemClassField(2,20)
    setWand() { return this.set(2,20)}
    @ItemClassField(2,21)
    setFishingPole() { return this.set(2,21)}

    // Gem
    @ItemClassField(3,0)
    setRedGem() { return this.set(3,0)}
    @ItemClassField(3,1)
    setBlueGem() { return this.set(3,1)}
    @ItemClassField(3,2)
    setYellowGem() { return this.set(3,2)}
    @ItemClassField(3,3)
    setPurpleGem() { return this.set(3,3)}
    @ItemClassField(3,4)
    setGreenGem() { return this.set(3,4)}
    @ItemClassField(3,5)
    setOrangeGem() { return this.set(3,5)}
    @ItemClassField(3,6)
    setMetaGem() { return this.set(3,6)}
    @ItemClassField(3,7)
    setSimpleGem() { return this.set(3,7)}
    @ItemClassField(3,8)
    setPrismaticGem() { return this.set(3,8)}

    // Armor
    @ItemClassField(4,0)
    setMisc() { return this.set(4,0)}
    @ItemClassField(4,1)
    setClothEquip() { return this.set(4,1)}
    @ItemClassField(4,2)
    setLeatherEquip() { return this.set(4,2)}
    @ItemClassField(4,3)
    setMailEquip() { return this.set(4,3)}
    @ItemClassField(4,4)
    setPlateEquip() { return this.set(4,4)}
    @ItemClassField(4,5)
    setShieldEquip() { return this.set(4,5)}
    @ItemClassField(4,6)
    setLibramEquip() { return this.set(4,6)}
    @ItemClassField(4,7)
    setIdolEquip() { return this.set(4,7)}
    @ItemClassField(4,8)
    setTotemEquip() { return this.set(4,8)}
    @ItemClassField(4,9)
    setSigilEquip() { return this.set(4,9)}

    // Reagent
    @ItemClassField(5,0)
    setReagentReagent() { return this.set(5,0)}

    // Projectiles
    @ItemClassField(6,0)
    setArrowEquip() { return this.set(6,0)}
    @ItemClassField(6,1)
    setBulletEquip() { return this.set(6,1)}

    // TradeGoods
    @ItemClassField(7,0)
    setTradeGoods() { return this.set(7,0)}
    @ItemClassField(7,1)
    setTradeParts() { return this.set(7,1)}
    @ItemClassField(7,2)
    setTradeExplosives() { return this.set(7,2)}
    @ItemClassField(7,3)
    setTradeDevices() { return this.set(7,3)}
    @ItemClassField(7,4)
    setTradeJewelcrafting() { return this.set(7,4)}
    @ItemClassField(7,5)
    setTradeCloth() { return this.set(7,5)}
    @ItemClassField(7,6)
    setTradeLeather() { return this.set(7,6)}
    @ItemClassField(7,7)
    setTradeMetalStone() { return this.set(7,7)}
    @ItemClassField(7,8)
    setTradeMeat() { return this.set(7,8)}
    @ItemClassField(7,9)
    setTradeHerb() { return this.set(7,9)}
    @ItemClassField(7,10)
    setTradeElemental() { return this.set(7,10)}
    @ItemClassField(7,11)
    setTradeOther() { return this.set(7,11)}
    @ItemClassField(7,12)
    setTradeEnchanting() { return this.set(7,12)}
    @ItemClassField(7,13)
    setTradeMaterials() { return this.set(7,13)}
    @ItemClassField(7,14)
    setTradeArmorEnchantment() { return this.set(7,14)}
    @ItemClassField(7,15)
    setTradeWeaponEnchantment() { return this.set(7,15)}

    // Recipes
    @ItemClassField(9,0)
    setBook() { return this.set(9,0)}
    @ItemClassField(9,1)
    setLeatherworkingRecipe() { return this.set(9,1)}
    @ItemClassField(9,2)
    setTailoringRecipe() { return this.set(9,2)}
    @ItemClassField(9,3)
    setEngineeringRecipe() { return this.set(9,3)}
    @ItemClassField(9,4)
    setBlacksmithingRecipe() { return this.set(9,4)}
    @ItemClassField(9,5)
    setCookingRecipe() { return this.set(9,5)}
    @ItemClassField(9,6)
    setAlchemyRecipe() { return this.set(9,6)}
    @ItemClassField(9,7)
    setFirstAidRecipe() { return this.set(9,7)}
    @ItemClassField(9,8)
    setEnchantingRecipe() { return this.set(9,8)}
    @ItemClassField(9,9)
    setFishingRecipe() { return this.set(9,9)}
    @ItemClassField(9,10)
    setJewelcraftingRecipe() { return this.set(9,10)}

    // Quiver
    @ItemClassField(11,2)
    setQuiver() { return this.set(11, 2)}
    @ItemClassField(11,3)
    setAmmoPouch() { return this.set(11, 3)}

    // Quest
    @ItemClassField(12,0)
    setQuest() { return this.set(12,0)}

    // Key
    @ItemClassField(13,0)
    setKey() { return this.set(13,0);}
    @ItemClassField(13,1)
    setLockpick() { return this.set(13,1);}

    // Misc
    @ItemClassField(15,0)
    setJunk() { return this.set(15,0);}
    @ItemClassField(15,1)
    setReagent() { return this.set(15,1);}
    @ItemClassField(15,2)
    setPet() { return this.set(15,2);}
    @ItemClassField(15,3)
    setHoliday() { return this.set(15,3);}
    @ItemClassField(15,4)
    setOtherMisc() { return this.set(15,4);}
    @ItemClassField(15,5)
    setMount() { return this.set(15,5);}

    // Class
    @ItemClassField(16,1)
    setWarrior() { return this.set(16,1);}
    @ItemClassField(16,2)
    setPaladin() { return this.set(16,2);}
    @ItemClassField(16,3)
    setHunter() { return this.set(16,3);}
    @ItemClassField(16,4)
    setRogue() { return this.set(16,4);}
    @ItemClassField(16,5)
    setPriest() { return this.set(16,5);}
    @ItemClassField(16,6)
    setDeathKnight() { return this.set(16,6);}
    @ItemClassField(16,7)
    setShaman() { return this.set(16,7);}
    @ItemClassField(16,8)
    setMage() { return this.set(16,8);}
    @ItemClassField(16,9)
    setWarlock() { return this.set(16,9);}
    @ItemClassField(16,11)
    setDruid() { return this.set(16,11);}
}