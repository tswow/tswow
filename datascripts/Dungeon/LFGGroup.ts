import { LfgDungeonGroupQuery, LfgDungeonGroupRow } from "wotlkdata/dbc/types/LfgDungeonGroup";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class LFGDungeonGroup extends MainEntity<LfgDungeonGroupRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get OrderIndex() { return this.wrap(this.row.Order_Index); }
    get Type() { return this.wrap(this.row.Parent_Group_Id); }
}

export const LFGDungeonGroupRegistry = {
    create(parent = 0) {
        return new LFGDungeonGroup(
            parent 
            ? DBC.LfgDungeonGroup
                .find({ID:parent})
                .clone(Ids.LfgDungeonGroup.id())
            : DBC.LfgDungeonGroup.add(Ids.LfgDungeonGroup.id())
        )
    },

    load(id: number) {
        let v = DBC.LfgDungeonGroup.find({ID:id});
        return (v ? new LFGDungeonGroup(v) : undefined) as LFGDungeonGroup
    },

    filter(query: LfgDungeonGroupQuery) {
        return DBC.LfgDungeonGroup
            .filter(query)
            .map(x=>new LFGDungeonGroup(x))
    },

    find(query: LfgDungeonGroupQuery) {
        let v = DBC.LfgDungeonGroup
            .find(query)
        return (v ? new LFGDungeonGroup(v) : undefined) as LFGDungeonGroup
    },
}

export class LFGDungeonGroupRef<T> extends Ref<T,LFGDungeonGroup> {
    protected create(): LFGDungeonGroup {
        return LFGDungeonGroupRegistry.create();
    }

    protected clone(): LFGDungeonGroup {
        return LFGDungeonGroupRegistry.create(this.cell.get());
    }

    exists(): boolean {
        return this.cell.get() > 0;
    }

    protected id(v: LFGDungeonGroup): number {
        return v.ID;
    }

    protected resolve(): LFGDungeonGroup {
        return LFGDungeonGroupRegistry.load(this.cell.get())
    }
}