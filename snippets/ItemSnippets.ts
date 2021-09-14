import { std } from "../datascripts/tswow-stdlib-data";

/**
 * Snippet: Item::Junk
 * - Basic junk item
 */
std.Items.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Name.enGB.set('Junk Item')
    .DisplayInfo.set(7048)
    .Class.setJunk()
    .InventoryType.setNonEquippable()
/** end-snippet */

/**
 * Snippet: Item::Weapon
 * - Basic weapon
 */
std.Items.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Name.enGB.set('Weapon')
    .Description.enGB.set('Weapon Description')
    .DisplayInfo.set(2380)
    .Quality.setWhite()
    .Class.setSword2H()
    .InventoryType.setTwohand()

    .Damage.addPhysical(1,10)
    .Delay.set(1000)
    .Stats.addAttackPower(10)
/** end-snippet */

/**
 * Snippet: Item::Armor
 * - Basic Armor
 */
std.Items.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Name.enGB.set('Armor')
    .Description.enGB.set('Armor Description')
    .DisplayInfo.set(33352)
    .Quality.setWhite()
    .Class.setClothEquip()
    .InventoryType.setShirt()

    .Armor.set(25)
    .Stats.addAgility(2)
/** end-snippet */

/**
 * Snippet: Item::Quest Item
 * - Basic Quest Item
 */
std.Items.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Name.enGB.set('Quest Item')
    .DisplayInfo.set(6700)
    .Quality.setWhite()
    .Class.setQuest()
    .Bonding.setQuestItem()
/** end-snippet */