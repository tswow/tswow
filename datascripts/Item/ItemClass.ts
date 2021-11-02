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
import { Objects } from "wotlkdata/wotlkdata/cell/serialization/ObjectIteration";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ItemClassEnumValue {
    protected owner: ItemTemplate;

    protected cls: number;
    protected subclass: number;

    constructor(owner: ItemTemplate, cls: number, subclass: number) {
        this.owner    = owner;
        this.cls      = cls;
        this.subclass = subclass;
    }

    protected get isEnum() { return true; }

    is() {
        return this.owner.row.class.get() === this.cls
        && this.owner.row.subclass.get() === this.subclass;
    }

    on(callback: (value: ItemTemplate)=>void) {
        if(this.is()) callback(this.owner);
        return this.owner;
    }

    set() {
        this.owner.row
            .class.set(this.cls)
            .subclass.set(this.subclass)
        this.owner.createDbc().ClassID.set(this.cls);
        this.owner.createDbc().SubclassID.set(this.subclass);
        return this.owner;
    }
}

export class ItemClass extends CellSystem<ItemTemplate> {
    objectify() {
        let enums = Objects.mapObject(this,['object'],(k,v)=>v.isEnum);
        for(const [key,value] of Object.entries(enums)) {
            if(value.is()) {
                return key;
            }
        }
        return {
              class:this.owner.row.class.get()
            , subclass:this.owner.row.subclass.get()
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
        this.owner.createDbc().ClassID.set(cls)
        this.owner.createDbc().SubclassID.set(subclass);
        return this.owner;
    }

    protected value(cls: number, id: number) {
        return new ItemClassEnumValue(this.owner,cls,id);
    }

    // Consumables
    get Consumable()             { return this.value(0,0) }
    get Potion()                 { return this.value(0,1) }
    get Elixir()                 { return this.value(0,2) }
    get Flask()                  { return this.value(0,3) }
    get Scroll()                 { return this.value(0,4) }
    get FoodDrink()              { return this.value(0,5) }
    get ItemEnhancement()        { return this.value(0,6) }
    get Bandage()                { return this.value(0,7) }
    get Other()                  { return this.value(0,8) }

    // Containers
    get Bag()                    { return this.value(1,0) }
    get SoulBag()                { return this.value(1,1) }
    get HerbBag()                { return this.value(1,2) }
    get EnchantingBag()          { return this.value(1,3) }
    get EngineeringBag()         { return this.value(1,4) }
    get GemBag()                 { return this.value(1,5) }
    get MiningBag()              { return this.value(1,6) }
    get LeatherworkingBag()      { return this.value(1,7) }
    get InscriptionBag()         { return this.value(1,8) }

    // Weapon
    get Axe1H()                  { return this.value(2,0) }
    get Axe2H()                  { return this.value(2,1) }
    get Bow()                    { return this.value(2,2) }
    get Gun()                    { return this.value(2,3) }
    get Mace1H()                 { return this.value(2,4) }
    get Mace2H()                 { return this.value(2,5) }
    get Polearm()                { return this.value(2,6) }
    get Sword1H()                { return this.value(2,7) }
    get Sword2H()                { return this.value(2,8) }
    get Obsolete()               { return this.value(2,9) }
    get Staff()                  { return this.value(2,10) }
    get Exotic()                 { return this.value(2,11) }
    get Exotic2()                { return this.value(2,12) }
    get FistWeapon()             { return this.value(2,13) }
    /** Blacksmith Hammer, Mining pick etc. */
    get MiscWeapon()             { return this.value(2,14) }
    get Dagger()                 { return this.value(2,15) }
    get Thrown()                 { return this.value(2,16) }
    get Spear()                  { return this.value(2,17) }
    get Crossbow()               { return this.value(2,18) }
    get Wand()                   { return this.value(2,19) }
    get FishingPole()            { return this.value(2,20) }

    // Gem
    get RedGem()                 { return this.value(3,0) }
    get BlueGem()                { return this.value(3,1) }
    get YellowGem()              { return this.value(3,2) }
    get PurpleGem()              { return this.value(3,3) }
    get GreenGem()               { return this.value(3,4) }
    get OrangeGem()              { return this.value(3,5) }
    get MetaGem()                { return this.value(3,6) }
    get SimpleGem()              { return this.value(3,7) }
    get PrismaticGem()           { return this.value(3,8) }

    // Armor
    get Misc()                   { return this.value(4,0) }
    get ClothEquip()             { return this.value(4,1) }
    get LeatherEquip()           { return this.value(4,2) }
    get MailEquip()              { return this.value(4,3) }
    get PlateEquip()             { return this.value(4,4) }
    get ShieldEquip()            { return this.value(4,5) }
    get LibramEquip()            { return this.value(4,6) }
    get IdolEquip()              { return this.value(4,7) }
    get TotemEquip()             { return this.value(4,8) }
    get SigilEquip()             { return this.value(4,9) }

    // Reagent
    get ReagentReagent()         { return this.value(5,0) }

    // Projectiles
    get ArrowEquip()             { return this.value(6,2) }
    get BulletEquip()            { return this.value(6,3) }

    // TradeGoods
    get TradeGoods()             { return this.value(7,0) }
    get TradeParts()             { return this.value(7,1) }
    get TradeExplosives()        { return this.value(7,2) }
    get TradeDevices()           { return this.value(7,3) }
    get TradeJewelcrafting()     { return this.value(7,4) }
    get TradeCloth()             { return this.value(7,5) }
    get TradeLeather()           { return this.value(7,6) }
    get TradeMetalStone()        { return this.value(7,7) }
    get TradeMeat()              { return this.value(7,8) }
    get TradeHerb()              { return this.value(7,9) }
    get TradeElemental()         { return this.value(7,10) }
    get TradeOther()             { return this.value(7,11) }
    get TradeEnchanting()        { return this.value(7,12) }
    get TradeMaterials()         { return this.value(7,13) }
    get TradeArmorEnchantment()  { return this.value(7,14) }
    get TradeWeaponEnchantment() { return this.value(7,15) }

    // Recipes
    get Book()                   { return this.value(9,0) }
    get LeatherworkingRecipe()   { return this.value(9,1) }
    get TailoringRecipe()        { return this.value(9,2) }
    get EngineeringRecipe()      { return this.value(9,3) }
    get BlacksmithingRecipe()    { return this.value(9,4) }
    get CookingRecipe()          { return this.value(9,5) }
    get AlchemyRecipe()          { return this.value(9,6) }
    get FirstAidRecipe()         { return this.value(9,7) }
    get EnchantingRecipe()       { return this.value(9,8) }
    get FishingRecipe()          { return this.value(9,9) }
    get JewelcraftingRecipe()    { return this.value(9,10)}

    // Quiver
    get Quiver()                 { return this.value(11, 2) }
    get AmmoPouch()              { return this.value(11, 3) }

    // Quest
    get Quest()                  { return this.value(12,0) }

    // Key
    get Key()                    { return this.value(13,0) }
    get Lockpick()               { return this.value(13,1) }

    // Misc
    get Junk()                   { return this.value(15,0) }
    get Reagent()                { return this.value(15,1) }
    get Pet()                    { return this.value(15,2) }
    get Holiday()                { return this.value(15,3) }
    get OtherMisc()              { return this.value(15,4) }
    get Mount()                  { return this.value(15,5) }

    // Class
    get Warrior()                { return this.value(16,1) }
    get Paladin()                { return this.value(16,2) }
    get Hunter()                 { return this.value(16,3) }
    get Rogue()                  { return this.value(16,4) }
    get Priest()                 { return this.value(16,5) }
    get DeathKnight()            { return this.value(16,6) }
    get Shaman()                 { return this.value(16,7) }
    get Mage()                   { return this.value(16,8) }
    get Warlock()                { return this.value(16,9) }
    get Druid()                  { return this.value(16,11)}
}