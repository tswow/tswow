import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Ids } from "../Misc/Ids";
import { Faction } from "./Faction";

export class FactionReputationIndex extends CellSystem<Faction> {
    exists() {
        return this.owner.row.ReputationIndex.get() >= 0;
    }

    assign(mod: string, id: string) {
        if(this.owner.row.ReputationIndex.get() !== -1) {
            throw new Error(`Faction ${this.owner.ID} already has a reputation ID`)
        }
        this.owner.row.ReputationIndex.set(Ids.ReputationIndex.id(mod, id));
        return this.owner;
    }

    get() {
        return this.owner.row.ReputationIndex.get();
    }
}