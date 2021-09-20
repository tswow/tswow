import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { makeRacemask, RaceType } from "../Race/RaceType";
import { TalentTreeRegistry } from "../Talents/Talents";
import { TalentTree } from "../Talents/TalentTree";
import { Class } from "./Class";

export class ClassTalents extends MultiRowSystem<TalentTree,Class> {
    protected getAllRows(): TalentTree[] {
        return TalentTreeRegistry
            .filter(x=>x.row.ClassMask.get()&(1<<(this.owner.ID-1)))
    }
    protected isDeleted(value: TalentTree): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, name: string, tabIndex: number, races?: RaceType[]) {
        let tree = TalentTreeRegistry.create(mod,name)
        tree.row.OrderIndex.set(tabIndex)
                .RaceMask.set(makeRacemask(races||[]))
                .ClassMask.set(1<<(this.owner.ID-1))
        return tree;
    }

    addMod(mod: string, name: string, tabIndex: number, callback: (tree: TalentTree)=>void = ()=>{}) {
        callback(this.add(mod,name,tabIndex));
        return this.owner;
    }
}