import { SQL } from "../../SQLFiles";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { trainerRow } from "../../sql/trainer";
import { Ids } from "../Misc/Ids";
import { TrainerPlain } from "../Trainer/Trainer";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureTrainerRef extends CellSystem<CreatureTemplate> {
    getRef() {
        let ctrow = SQL.creature_default_trainer.query({CreatureId:this.owner.ID});
        let trow : trainerRow;
        if(ctrow === undefined) {
            trow = SQL.trainer.add(Ids.Trainer.id())
            ctrow = SQL.creature_default_trainer.add(this.owner.ID)
                .TrainerId.set(trow.Id.get());
        } else {
            trow = SQL.trainer.query({Id: ctrow.TrainerId.get()});
        }
        return new TrainerPlain(trow);
    }

    modRef(callback: (trainer: TrainerPlain)=>void) {
        callback(this.getRef());
        return this.owner;
    }
}