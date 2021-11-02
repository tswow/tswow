import { CellWrapper } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { instance_templateRow } from "wotlkdata/wotlkdata/sql/types/instance_template";
import { getInlineID } from "../InlineScript/InlineScript";
import { BoolCell } from "../Misc/BoolCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Map } from "./Map";

// also defined in TrinityCore/src/server/game/Scripting/ScriptMgr.h
export const CUSTOM_SCRIPT_NAME = 'custom_script'

export class MapInstanceScriptCell extends CellWrapper<string,Map> {
    get(): string {
        return this.cell.get();
    }
    set(value: string): Map {
        this.cell.set(value);
        return this.owner;
    }

    /**
     * Enables the default 'custom instance' for this dungeon
     */
    setCustom() {
        return this.set(CUSTOM_SCRIPT_NAME)
    }
}

export class MapInstance extends MaybeSQLEntity<Map,instance_templateRow> {
    protected createSQL(): instance_templateRow {
        return SQL.instance_template.add(this.owner.ID)
            .allowMount.set(0)
            .script.set('')
    }
    protected findSQL(): instance_templateRow {
        return SQL.instance_template.find({map:this.owner.ID})
    }
    protected isValidSQL(sql: instance_templateRow): boolean {
        return sql.map.get() === this.owner.ID
    }

    get AllowMount() {
        return new BoolCell(this.owner, this.wrapSQL(0, sql=>sql.allowMount))
    }

    get InlineScripts() {
        return getInlineID(
              this
            , this.owner.ID
            , 'InstanceID'
        ) as _hidden.Instances<this>
    }

    get Script() {
        return new MapInstanceScriptCell(
              this.owner
            , this.wrapSQL('', sql=>sql.script)
        );
    }
}