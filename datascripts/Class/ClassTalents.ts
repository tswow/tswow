import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { TalentTrees } from "../Talents/Talents";
import { TalentTree } from "../Talents/TalentTree";
import { Class } from "./Class";

export class ClassTalents extends MultiRowSystem<TalentTree,Class> {
    protected getAllRows(): TalentTree[] {
        return TalentTrees.filter({})
            .filter(x=>x.row.ClassMask.get()&(1<<(this.owner.ID-1)))
    }
    protected isDeleted(value: TalentTree): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, name: string, tabIndex: number) {
        return TalentTrees.create(mod,name,tabIndex,[this.owner.ID]);
    }

    addMod(mod: string, name: string, tabIndex: number, callback: (tree: TalentTree)=>void = ()=>{}) {
        callback(this.add(mod,name,tabIndex));
        return this.owner;
    }
}