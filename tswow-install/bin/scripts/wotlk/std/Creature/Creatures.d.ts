import { Table } from "../../../data/table/Table";
import { creatureQuery, creatureRow } from "../../sql/creature";
import { creature_templateQuery, creature_templateRow } from "../../sql/creature_template";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureTemplateRegistryClass extends RegistryStatic<CreatureTemplate, creature_templateRow, creature_templateQuery> {
    protected Table(): Table<any, creature_templateQuery, creature_templateRow> & {
        add: (id: number) => creature_templateRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: CreatureTemplate): void;
    protected Clone(mod: string, id: string, child: CreatureTemplate, parent: CreatureTemplate): void;
    protected Entity(r: creature_templateRow): CreatureTemplate;
    protected FindByID(id: number): creature_templateRow;
    protected EmptyQuery(): creature_templateQuery;
    ID(e: CreatureTemplate): number;
}
export declare const CreatureTemplateRegistry: CreatureTemplateRegistryClass;
export declare class CreatureInstanceRegistryClass extends RegistryStatic<CreatureInstance, creatureRow, creatureQuery> {
    protected Table(): Table<any, creatureQuery, creatureRow> & {
        add: (id: number) => creatureRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: CreatureInstance): void;
    protected Clone(mod: string, id: string, r: CreatureInstance, parent: CreatureInstance): void;
    protected Entity(r: creatureRow): CreatureInstance;
    protected FindByID(id: number): creatureRow;
    protected EmptyQuery(): creatureQuery;
    ID(e: CreatureInstance): number;
}
export declare const CreatureInstanceRegistry: CreatureInstanceRegistryClass;
