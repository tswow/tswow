import { SQL } from "wotlkdata";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Spell } from "./Spell";

export class SpellScript extends CellSystem<Spell> {
    get(): string|undefined {
        let q1 = SQL.Databases.world_source.read(
              ` SELECT * FROM \`spell_script_names\``
            + ` WHERE         \`spell_id\` =  ${this.owner.ID}`
        )
        if(q1.length === 0) return q1[0].ScriptName;
        let fst = this.owner.Rank.getFirstSpell();
        if(fst===undefined) return undefined;
        let q2 = SQL.Databases.world_source.read(
            ` SELECT * FROM \`spell_script_names\``
          + ` WHERE         \`spell_id\` =  ${fst}`
        )
        return q2.length === 0 ? undefined : q2[0].ScriptName;
    }

    objectify() {
        return this.get();
    }
}