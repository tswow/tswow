import { SQL } from "../../SQLFiles";
import { npc_textQuery, npc_textRow } from "../../sql/npc_text";
import { Table } from "../../../data/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { NPCText } from "./GossipText";

export class NPCTextRegistryClass extends RegistryStatic<NPCText,npc_textRow,npc_textQuery> {
    protected Table(): Table<any, npc_textQuery, npc_textRow> & { add: (id: number) => npc_textRow; } {
        return SQL.npc_text
    }
    protected IDs(): StaticIDGenerator {
        return Ids.NPCText
    }
    Clear(r: NPCText) {
        r.clearAll();
    }
    protected FindByID(id: number): npc_textRow {
        return SQL.npc_text.query({ID:id})
    }
    ID(e: NPCText): number {
        return e.ID
    }
    protected EmptyQuery(): npc_textQuery {
        return {}
    }
    protected Entity(r: npc_textRow): NPCText {
        return new NPCText(r);
    }
}
export const NPCTextRegistry = new NPCTextRegistryClass();