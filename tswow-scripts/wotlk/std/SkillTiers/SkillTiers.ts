import { DBC } from "../../DBCFiles";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { SkillTiersQuery, SkillTiersRow } from "../../dbc/SkillTiers";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class SkillTier extends ArrayEntry<SkillTiers> {

    get Cost() { return this.wrapIndex(this.container.row.Cost, this.index); }
    get Value() { return this.wrapIndex(this.container.row.Value, this.index); }

    clear(): this {
        return this.Cost.set(0)
                   .Value.set(0)
    }
    isClear(): boolean {
        return this.Value.get() <= 0;
    }
}

export class SkillTiersTiers extends ArraySystem<SkillTier,SkillTiers> {
    get length(): number {
        return 16;
    }
    get(index: number): SkillTier {
        return new SkillTier(this.owner, index);
    }
}

export class SkillTiers extends MainEntity<SkillTiersRow> {
    get Tiers() { return new SkillTiersTiers(this); }
    get ID() { return this.row.ID.get(); }
}

export class SkillTiersRegistryClass
    extends RegistryDynamic<SkillTiers,SkillTiersRow,SkillTiersQuery>
{
    protected Table(): Table<any, SkillTiersQuery, SkillTiersRow> & { add: (id: number) => SkillTiersRow; } {
        return DBC.SkillTiers
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SkillTiers
    }
    Clear(entity: SkillTiers): void {
        entity.Tiers.clearAll()
    }
    protected Entity(r: SkillTiersRow): SkillTiers {
        return new SkillTiers(r);
    }
    protected FindByID(id: number): SkillTiersRow {
        return DBC.SkillTiers.findById(id);
    }
    protected EmptyQuery(): SkillTiersQuery {
        return {}
    }
    ID(e: SkillTiers): number {
        return e.ID
    }
}

export const SkillTiersRegistry = new SkillTiersRegistryClass();