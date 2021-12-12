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
        this.owner.DBCRow.get().ClassID.set(this.cls);
        this.owner.DBCRow.get().SubclassID.set(this.subclass);
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
        this.owner.DBCRow.get().ClassID.set(cls)
        this.owner.DBCRow.get().SubclassID.set(subclass);
        return this.owner;
    }

    protected value(cls: number, id: number) {
        return new ItemClassEnumValue(this.owner,cls,id);
    }

    // Consumables
    get CONSUMABLE()               { return this.value(0,0) }
    get POTION()                   { return this.value(0,1) }
    get ELIXIR()                   { return this.value(0,2) }
    get FLASK()                    { return this.value(0,3) }
    get SCROLL()                   { return this.value(0,4) }
    get FOOD_DRINK()               { return this.value(0,5) }
    get ITEM_ENHANCEMENT()         { return this.value(0,6) }
    get BANDAGE()                  { return this.value(0,7) }
    get OTHER()                    { return this.value(0,8) }

    // Containers
    get BAG()                      { return this.value(1,0) }
    get SOUL_BAG()                 { return this.value(1,1) }
    get HERB_BAG()                 { return this.value(1,2) }
    get ENCHANTING_BAG()           { return this.value(1,3) }
    get ENGINEERING_BAG()          { return this.value(1,4) }
    get GEM_BAG()                  { return this.value(1,5) }
    get MINING_BAG()               { return this.value(1,6) }
    get LEATHERWORKING_BAG()       { return this.value(1,7) }
    get INSCRIPTION_BAG()          { return this.value(1,8) }

    // Weapon
    get AXE_1H()                   { return this.value(2,0) }
    get AXE_2H()                   { return this.value(2,1) }
    get BOW()                      { return this.value(2,2) }
    get GUN()                      { return this.value(2,3) }
    get MACE_1H()                  { return this.value(2,4) }
    get MACE_2H()                  { return this.value(2,5) }
    get POLEARM()                  { return this.value(2,6) }
    get SWORD_1H()                 { return this.value(2,7) }
    get SWORD_2H()                 { return this.value(2,8) }
    get OBSOLETE()                 { return this.value(2,9) }
    get STAFF()                    { return this.value(2,10) }
    get EXOTIC()                   { return this.value(2,11) }
    get EXOTIC_2()                 { return this.value(2,12) }
    get FIST_WEAPON()              { return this.value(2,13) }
    /** Blacksmith Hammer, Mining pick etc. */
    get MISC_WEAPON()              { return this.value(2,14) }
    get DAGGER()                   { return this.value(2,15) }
    get THROWN()                   { return this.value(2,16) }
    get SPEAR()                    { return this.value(2,17) }
    get CROSSBOW()                 { return this.value(2,18) }
    get WAND()                     { return this.value(2,19) }
    get FISHING_POLE()             { return this.value(2,20) }

    // Gem
    get RED_GEM()                  { return this.value(3,0) }
    get BLUE_GEM()                 { return this.value(3,1) }
    get YELLOW_GEM()               { return this.value(3,2) }
    get PURPLE_GEM()               { return this.value(3,3) }
    get GREEN_GEM()                { return this.value(3,4) }
    get ORANGE_GEM()               { return this.value(3,5) }
    get META_GEM()                 { return this.value(3,6) }
    get SIMPLE_GEM()               { return this.value(3,7) }
    get PRISMATIC_GEM()            { return this.value(3,8) }

    // Armor
    get MISC()                     { return this.value(4,0) }
    get CLOTH_EQUIP()              { return this.value(4,1) }
    get LEATHER_EQUIP()            { return this.value(4,2) }
    get MAIL_EQUIP()               { return this.value(4,3) }
    get PLATE_EQUIP()              { return this.value(4,4) }
    get SHIELD_EQUIP()             { return this.value(4,5) }
    get LIBRAM_EQUIP()             { return this.value(4,6) }
    get IDOL_EQUIP()               { return this.value(4,7) }
    get TOTEM_EQUIP()              { return this.value(4,8) }
    get SIGIL_EQUIP()              { return this.value(4,9) }

    // Reagent
    get REAGENT()                  { return this.value(5,0) }

    // Projectiles
    get ARROW_EQUIP()              { return this.value(6,2) }
    get BULLET_EQUIP()             { return this.value(6,3) }

    // TradeGoods
    get TRADE_GOODS()              { return this.value(7,0) }
    get TRADE_PARTS()              { return this.value(7,1) }
    get TRADE_EXPLOSIVES()         { return this.value(7,2) }
    get TRADE_DEVICES()            { return this.value(7,3) }
    get TRADE_JEWELCRAFTING()      { return this.value(7,4) }
    get TRADE_CLOTH()              { return this.value(7,5) }
    get TRADE_LEATHER()            { return this.value(7,6) }
    get TRADE_METAL_STONE()        { return this.value(7,7) }
    get TRADE_MEAT()               { return this.value(7,8) }
    get TRADE_HERB()               { return this.value(7,9) }
    get TRADE_ELEMENTAL()          { return this.value(7,10) }
    get TRADE_OTHER()              { return this.value(7,11) }
    get TRADE_ENCHANTING()         { return this.value(7,12) }
    get TRADE_MATERIALS()          { return this.value(7,13) }
    get TRADE_ARMOR_ENCHANTMENT()  { return this.value(7,14) }
    get TRADE_WEAPON_ENCHANTMENT() { return this.value(7,15) }

    // Recipes
    get BOOK()                     { return this.value(9,0) }
    get LEATHERWORKING_RECIPE()    { return this.value(9,1) }
    get TAILORING_RECIPE()         { return this.value(9,2) }
    get ENGINEERING_RECIPE()       { return this.value(9,3) }
    get BLACKSMITHING_RECIPE()     { return this.value(9,4) }
    get COOKING_RECIPE()           { return this.value(9,5) }
    get ALCHEMY_RECIPE()           { return this.value(9,6) }
    get FIRST_AID_RECIPE()         { return this.value(9,7) }
    get ENCHANTING_RECIPE()        { return this.value(9,8) }
    get FISHING_RECIPE()           { return this.value(9,9) }
    get JEWELCRAFTING_RECIPE()     { return this.value(9,10)}

    // Quiver
    get QUIVER()                   { return this.value(11, 2) }
    get AMMO_POUCH()               { return this.value(11, 3) }

    // Quest
    get QUEST()                    { return this.value(12,0) }

    // Key
    get KEY()                      { return this.value(13,0) }
    get LOCKPICK()                 { return this.value(13,1) }

    // Misc
    get JUNK()                     { return this.value(15,0) }
    get MISC_REAGENT()             { return this.value(15,1) }
    get PET()                      { return this.value(15,2) }
    get HOLIDAY()                  { return this.value(15,3) }
    get OTHER_MISC()               { return this.value(15,4) }
    get MOUNT()                    { return this.value(15,5) }

    // Class
    get WARRIOR()                  { return this.value(16,1) }
    get PALADIN()                  { return this.value(16,2) }
    get HUNTER()                   { return this.value(16,3) }
    get ROGUE()                    { return this.value(16,4) }
    get PRIEST()                   { return this.value(16,5) }
    get DEATH_KNIGHT()             { return this.value(16,6) }
    get SHAMAN()                   { return this.value(16,7) }
    get MAGE()                     { return this.value(16,8) }
    get WARLOCK()                  { return this.value(16,9) }
    get DRUID()                    { return this.value(16,11)}
}