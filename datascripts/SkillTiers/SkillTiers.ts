import { DBC } from "wotlkdata";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { SkillTiersQuery, SkillTiersRow } from "wotlkdata/dbc/types/SkillTiers";
import { Ids } from "../Misc/Ids";

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

export class SkillTiers extends ArraySystem<SkillTier,SkillTiers> {
    readonly row: SkillTiersRow;
    get(index: number): SkillTier {
        return new SkillTier(this, index);
    }

    constructor(row: SkillTiersRow) {
        // TODO: hacky
        super(undefined as any);
        this.owner = this;
        this.row = row;
    }

    get length(): number {
        return 16;
    }

    get ID() { return this.row.ID.get(); }
}

export const SkillTiersRegistry = {
    create() {
        return new SkillTiers(DBC.SkillTiers.add(Ids.SkillTiers.id()))
            .clearAll()
    },

    load(id: number) {
        return new SkillTiers(DBC.SkillTiers.findById(id));
    },

    filter(query: SkillTiersQuery) {
        return DBC.SkillTiers.filter(query).map(x=>new SkillTiers(x));
    },

    find(query: SkillTiersQuery) {
        return new SkillTiers(DBC.SkillTiers.find(query));
    }
}