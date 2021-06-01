import { AutoIdGenerator } from "../Misc/Ids";
import { AttachedLootSet } from "../Loot/Loot";
import { Cell } from "wotlkdata/cell/cells/Cell";

function shouldClone(gen: AutoIdGenerator, holder: any, cell: Cell<number,any>) {
    return !AutoIdGenerator.isCustom(gen, cell.get()) && holder.uniqueRefs;
}

export const SharedRefs = {
    getOrCreateLoot<T>(holder: any, set: AttachedLootSet<T>) {
        let cell = AttachedLootSet.cell(set);
        let idgen = AttachedLootSet.idgen(set);

        if(cell.get()==0) {
            cell.set(idgen.id());
            return set;
        }

        if(shouldClone(idgen,holder,cell)) {
            set.makeUnique(true);
        }

        return set;
    },
}