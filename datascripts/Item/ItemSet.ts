import { DBC } from "wotlkdata";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { ItemSetQuery, ItemSetRow } from "wotlkdata/dbc/types/ItemSet";
import { Table } from "wotlkdata/table/Table";
import { ArrayRefSystemStatic } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { SpellRegistry } from "../Spell/Spells";
import { SkillRequirement } from "./ItemRequirements";
import { ItemTemplateRegistry } from "./ItemTemplate";

export class ItemSetSpell extends ArrayEntry<ItemSet> {
    get Spell() {
        return SpellRegistry.ref(
              this
            , this.wrapIndex(this.container.row.SetSpellID, this.index)
        )
    }

    get Threshold() {
        return this.wrapIndex(this.container.row.SetThreshold, this.index
        )
    }

    clear(): this {
        return this.Spell.set(0)
            .Threshold.set(0)

    }
    isClear(): boolean {
        return this.Spell.get() <= 0;
    }
}

export class ItemSetSpells extends ArraySystem<ItemSetSpell,ItemSet> {
    get length(): number {
        return 8
    }
    get(index: number): ItemSetSpell {
        return new ItemSetSpell(this.owner, index);
    }

    add(spell: number, threshold: number) {
        this.addGet()
            .Spell.set(spell)
            .Threshold.set(threshold)
        return this.owner;
    }
}

export class ItemSet extends MainEntity<ItemSetRow> {
    get Name() { return this.wrapLoc(this.row.Name) }
    get ID() { return this.row.ID.get(); }
    get Spells() { return new ItemSetSpells(this); }
    get SkillRequirement() {
        return new SkillRequirement(this, this.row.RequiredSkill, this.row.RequiredSkillRank)
    }
    get Items() {
        return new ArrayRefSystemStatic(
              this
            , 0
            , 17
            , (index)=>ItemTemplateRegistry
                .ref(this, this.wrapIndex(this.row.ItemID,index))
        )
    }
}

export class ItemSetRegistryClass
    extends RegistryDynamic<ItemSet,ItemSetRow,ItemSetQuery>
{
    protected Table(): Table<any, ItemSetQuery, ItemSetRow> & { add: (id: number) => ItemSetRow; } {
        return DBC.ItemSet
    }
    protected ids(): DynamicIDGenerator {
        return Ids.ItemSet
    }
    Clear(entity: ItemSet): void {
        entity.Name.clear()
            .SkillRequirement.set(0,0)
            .Spells.clearAll()
            .Items.clearAll()
    }
    protected FindByID(id: number): ItemSetRow {
        return DBC.ItemSet.findById(id);
    }
    protected EmptyQuery(): ItemSetQuery {
        return {}
    }
    ID(e: ItemSet): number {
        return e.ID
    }
    protected Entity(r: ItemSetRow): ItemSet {
        return new ItemSet(r);
    }
}
export const ItemSetRegistry = new ItemSetRegistryClass();