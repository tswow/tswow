import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SQL } from "../../SQLFiles";
import { gameobject_template_addonRow } from "../../sql/gameobject_template_addon";
import { MinMaxCell } from "../Misc/LimitCells";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { GameObjectFlags } from "./GameObjectFlags";
import { GameObjectTemplate } from "./GameObjectTemplate";

export class ArtKits<T extends GameObjectTemplate> extends CellSystem<GameObjectTemplateAddon<T>> {
    add(id: number) {
        for(let i=0;i<this.length;++i) {
            let c = this.cell(i);
            if(c.get() === 0) {
                c.set(id);
                return this.owner;
            }
        }
        throw new Error(`GameObject artkit array is full: cannot hold more than 4 entries`)
    }

    protected cell(index: number): Cell<number,T> {
        switch(index) {
            case 0: return GameObjectTemplateAddon.wrapSQL(this.owner,0,(sql)=>sql.artkit0);
            case 1: return GameObjectTemplateAddon.wrapSQL(this.owner,0,(sql)=>sql.artkit1);
            case 2: return GameObjectTemplateAddon.wrapSQL(this.owner,0,(sql)=>sql.artkit2);
            case 3: return GameObjectTemplateAddon.wrapSQL(this.owner,0,(sql)=>sql.artkit3);
            default: throw new Error(`GameObject artkits index out of range: ${index}`);
        }
    }

    get(index: number): number {
        return this.cell(index).get();
    }

    set(index: number, id: number): T {
        return this.cell(index).set(id);
    }

    forEach(callback: (id: number, index: number)=>void) {
        for(let i=0;i<this.length;++i) {
            let v = this.get(i);
            if(v > 0 ) callback(v,i);
        }
        return GameObjectTemplateAddon.owner(this.owner);
    }

    get length() { return 4;}
}



export class GameObjectTemplateAddon<T extends GameObjectTemplate> extends MaybeSQLEntity<T,gameobject_template_addonRow> {
    static owner<T extends GameObjectTemplate>(addon: GameObjectTemplateAddon<T>) {
        return addon.owner;
    }
    static wrapSQL<O extends GameObjectTemplate,T extends CPrim>(
          addon: GameObjectTemplateAddon<O>
        , defValue: T, safe: (sql: gameobject_template_addonRow)=>Cell<T,any>
    ) {
        return addon.wrapSQL(defValue,safe);
    }

    protected createSQL(): gameobject_template_addonRow {
        return SQL.gameobject_template_addon.add(this.owner.ID)
            .artkit0.set(0)
            .artkit1.set(0)
            .artkit2.set(0)
            .artkit3.set(0)
            .faction.set(0)
            .flags.set(0)
            .maxgold.set(0)
            .mingold.set(0)
    }
    protected findSQL(): gameobject_template_addonRow {
        return SQL.gameobject_template_addon.query({entry:this.owner.ID});
    }
    protected isValidSQL(sql: gameobject_template_addonRow): boolean {
        return sql.entry.get() === this.owner.ID;
    }

    get ArtKits(): ArtKits<T> { return new ArtKits(this); }
    get Faction() { return this.wrapSQL(0,sql=>sql.faction); }
    get Flags() {
        return makeMaskCell32(GameObjectFlags,this.owner, this.wrapSQL(0,sql=>sql.flags));
    }
    get Gold() {
        return new MinMaxCell(
              this.owner
            , this.wrapSQL(0,sql=>sql.mingold)
            , this.wrapSQL(0,sql=>sql.maxgold)
        )
    }
}