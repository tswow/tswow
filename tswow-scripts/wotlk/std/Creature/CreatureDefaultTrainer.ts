import { SQL } from "../../SQLFiles";
import { creature_default_trainerRow } from "../../sql/creature_default_trainer";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { TrainerPlain, TrainerRegistry } from "../Trainer/Trainer";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureDefaultTrainer extends MaybeSQLEntity
    <CreatureTemplate,creature_default_trainerRow>
{
    protected createSQL(): creature_default_trainerRow {
        return SQL.creature_default_trainer.add(this.owner.ID)
            .TrainerId.set(0)
    }
    protected findSQL(): creature_default_trainerRow {
        return SQL.creature_default_trainer.query({CreatureId:this.owner.ID})
    }
    protected isValidSQL(sql: creature_default_trainerRow): boolean {
        return sql.CreatureId.get() === this.owner.ID
    }

    set(value: number) {
        this.wrapSQL(0,sql=>sql.TrainerId).set(value);
        return this.owner;
    }

    get() {
        return this.wrapSQL(0,sql=>sql.TrainerId).get()
    }

    getRef(): TrainerPlain {
        let p = this.get();
        if(p > 0) {
            return TrainerRegistry.load(p);
        } else {
            let trainer = TrainerRegistry.create()
            this.set(trainer.ID);
            return trainer;
        }
    }

    getRefCopy(): TrainerPlain {
        let trainer = TrainerRegistry.create(this.get());
        this.set(trainer.ID);
        return trainer;
    }

    modRefCopy(callback: (trainer: TrainerPlain)=>void) {
        callback(this.getRefCopy());
        return this.owner;
    }

    modRef(callback: (trainer: TrainerPlain)=>void) {
        callback(this.getRef());
        return this.owner;
    }
}