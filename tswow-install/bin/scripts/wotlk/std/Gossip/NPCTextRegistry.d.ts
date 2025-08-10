import { Table } from "../../../data/table/Table";
import { npc_textQuery, npc_textRow } from "../../sql/npc_text";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { NPCText } from "./GossipText";
export declare class NPCTextRegistryClass extends RegistryStatic<NPCText, npc_textRow, npc_textQuery> {
    protected Table(): Table<any, npc_textQuery, npc_textRow> & {
        add: (id: number) => npc_textRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: NPCText): void;
    protected FindByID(id: number): npc_textRow;
    ID(e: NPCText): number;
    protected EmptyQuery(): npc_textQuery;
    protected Entity(r: npc_textRow): NPCText;
}
export declare const NPCTextRegistry: NPCTextRegistryClass;
