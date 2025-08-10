import { Table } from "../../../data/table/Table";
import { quest_templateQuery, quest_templateRow } from "../../sql/quest_template";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { Quest } from "./Quest";
export declare class QuestRegistryClass extends RegistryStatic<Quest, quest_templateRow, quest_templateQuery> {
    protected Clone(mod: string, name: string, r: Quest, parent: Quest): void;
    protected Table(): Table<any, quest_templateQuery, quest_templateRow> & {
        add: (id: number) => quest_templateRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: quest_templateRow): Quest;
    protected FindByID(id: number): quest_templateRow;
    protected EmptyQuery(): quest_templateQuery;
    ID(e: Quest): number;
    Clear(r: Quest): void;
}
export declare const QuestRegistry: QuestRegistryClass;
