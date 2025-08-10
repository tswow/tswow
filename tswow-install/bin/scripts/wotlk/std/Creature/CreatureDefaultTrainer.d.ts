import { creature_default_trainerRow } from "../../sql/creature_default_trainer";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { TrainerPlain } from "../Trainer/Trainer";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureDefaultTrainer extends MaybeSQLEntity<CreatureTemplate, creature_default_trainerRow> {
    protected createSQL(): creature_default_trainerRow;
    protected findSQL(): creature_default_trainerRow;
    protected isValidSQL(sql: creature_default_trainerRow): boolean;
    set(value: number): CreatureTemplate;
    get(): number;
    getRef(): TrainerPlain;
    getRefCopy(): TrainerPlain;
    modRefCopy(callback: (trainer: TrainerPlain) => void): CreatureTemplate;
    modRef(callback: (trainer: TrainerPlain) => void): CreatureTemplate;
}
