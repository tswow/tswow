import { makeMask, MaskCon } from "wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { RaceMask } from "../Race/RaceType";
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

    add(mod: string, id: string, tabIndex: number, races?: MaskCon<keyof typeof RaceMask>) {
        let tree = TalentTreeRegistry.create(mod,id)
        tree.row.OrderIndex.set(tabIndex)
                .RaceMask.set(makeMask(RaceMask,races))
                .ClassMask.set(1<<(this.owner.ID-1))
        return tree;
    }

    addMod(mod: string, id: string, tabIndex: number, callback: (tree: TalentTree)=>void = ()=>{}) {
        callback(this.add(mod,id,tabIndex));
        return this.owner;
    }
}