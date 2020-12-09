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
import { ItemBase } from "./Item";

export class ItemClass extends Subsystem<ItemBase> {

    getClass(): number {
        return this.owner.row.class.get();
    }

    getSubclass(): number {
        return this.owner.row.subclass.get();
    }

    set(cls: number, subclass: number): ItemBase {
        this.owner.row.class.set(cls);
        this.owner.row.subclass.set(subclass);
        return this.owner;
    }

    // Consumables
    Consumable() { return this.set(0,0) ;}
    Potion() { return this.set(0,1)}
    Elixir() { return this.set(0,2)}
    Flask() { return this.set(0,3)}
    Scroll() { return this.set(0,4)}
    FoodDrink() { return this.set(0,5)}
    ItemEnhancement() { return this.set(0,6)}
    Bandage() { return this.set(0,7)}
    Other() { return this.set(0,8)}

    // Containers
    Bag() { return this.set(1,0)}
    SoulBag() { return this.set(1,1)}
    HerbBag() { return this.set(1,2)}
    EnchantingBag() { return this.set(1,3)}
    EngineeringBag() { return this.set(1,4)}
    GemBag() { return this.set(1,5)}
    MiningBag() { return this.set(1,6)}
    LeatherworkingBag() { return this.set(1,7)}
    InscriptionBag() { return this.set(1,8)}

    // Weapon
    Axe1H() { return this.set(2,1)}
    Axe2H() { return this.set(2,2)}
    Bow() { return this.set(2,3)}
    Gun() { return this.set(2,4)}
    Mace1H() { return this.set(2,5)}
    Mace2H() { return this.set(2,6)}
    Polearm() { return this.set(2,7)}
    Sword1H() { return this.set(2,8)}
    Sword2H() { return this.set(2,9)}
    Obsolete() { return this.set(2,10)}
    Staff() { return this.set(2,11)}
    Exotic() { return this.set(2,12)}
    Exotic2() { return this.set(2,13)}
    FistWeapon() { return this.set(2,14)}
    /** Blacksmith Hammer, Mining pick etc. */
    MiscWeapon() { return this.set(2,15)}
    Dagger() { return this.set(2,16)}
    Thrown() { return this.set(2,17)}
    Spear() { return this.set(2,18)}
    Crossbow() { return this.set(2,19)}
    Wand() { return this.set(2,20)}
    FishingPole() { return this.set(2,21)}

    // Gem
    RedGem() { return this.set(3,0)}
    BlueGem() { return this.set(3,1)}
    YellowGem() { return this.set(3,2)}
    PurpleGem() { return this.set(3,3)}
    GreenGem() { return this.set(3,4)}
    OrangeGem() { return this.set(3,5)}
    MetaGem() { return this.set(3,6)}
    SimpleGem() { return this.set(3,7)}
    PrismaticGem() { return this.set(3,8)}

    // Armor
    Misc() { return this.set(4,0)}
    ClothEquip() { return this.set(4,1)}
    LeatherEquip() { return this.set(4,2)}
    MailEquip() { return this.set(4,3)}
    PlateEquip() { return this.set(4,4)}
    ShieldEquip() { return this.set(4,5)}
    LibramEquip() { return this.set(4,6)}
    IdolEquip() { return this.set(4,7)}
    TotemEquip() { return this.set(4,8)}
    SigilEquip() { return this.set(4,9)}

    // Reagent
    ReagentReagent() { return this.set(5,0)}

    // Projectiles
    ArrowEquip() { return this.set(6,0)}
    BulletEquip() { return this.set(6,1)}

    // TradeGoods
    TradeGoods() { return this.set(7,0)}
    TradeParts() { return this.set(7,1)}
    TradeExplosives() { return this.set(7,2)}
    TradeDevices() { return this.set(7,3)}
    TradeJewelcrafting() { return this.set(7,4)}
    TradeCloth() { return this.set(7,5)}
    TradeLeather() { return this.set(7,6)}
    TradeMetalStone() { return this.set(7,7)}
    TradeMeat() { return this.set(7,8)}
    TradeHerb() { return this.set(7,9)}
    TradeElemental() { return this.set(7,10)}
    TradeOther() { return this.set(7,11)}
    TradeEnchanting() { return this.set(7,12)}
    TradeMaterials() { return this.set(7,13)}
    TradeArmorEnchantment() { return this.set(7,14)}
    TradeWeaponEnchantment() { return this.set(7,15)}

    // Recipes
    Book() { return this.set(9,0)}
    LeatherworkingRecipe() { return this.set(9,1)}
    TailoringRecipe() { return this.set(9,2)}
    EngineeringRecipe() { return this.set(9,3)}
    BlacksmithingRecipe() { return this.set(9,4)}
    CookingRecipe() { return this.set(9,5)}
    AlchemyRecipe() { return this.set(9,6)}
    FirstAidRecipe() { return this.set(9,7)}
    EnchantingRecipe() { return this.set(9,8)}
    FishingRecipe() { return this.set(9,9)}
    JewelcraftingRecipe() { return this.set(9,10)}

    // Quiver
    Quiver() { return this.set(11, 2)}
    AmmoPouch() { return this.set(11, 3)}

    // Quest
    Quest() { return this.set(12,0)}

    // Key
    Key() { return this.set(13,0);}
    Lockpick() { return this.set(13,1);}

    // Misc
    Junk() { return this.set(15,0);}
    Reagent() { return this.set(15,1);}
    Pet() { return this.set(15,2);}
    Holiday() { return this.set(15,3);}
    OtherMisc() { return this.set(15,4);}
    Mount() { return this.set(15,5);}

    // Class
    Warrior() { return this.set(15,1);}
    Paladin() { return this.set(15,2);}
    Hunter() { return this.set(15,3);}
    Rogue() { return this.set(15,4);}
    Priest() { return this.set(15,5);}
    DeathKnight() { return this.set(15,6);}
    Shaman() { return this.set(15,7);}
    Mage() { return this.set(15,8);}
    Warlock() { return this.set(15,9);}
    Druid() { return this.set(15,11);}
}