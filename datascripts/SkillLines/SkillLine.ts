import { SkillLineRow } from "wotlkdata/dbc/types/SkillLine";
import { MainEntity } from "../Misc/Entity";
import { RefReadOnly, RefStatic } from "../Refs/Ref";
import { Spell } from "../Spell/Spell";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Spells } from "../Spell/Spells";
import { SkillLines } from "./SkillLines";
import { SkillRaceClassInfos } from "./SkillRaceClassInfo";

export class SkillLine extends MainEntity<SkillLineRow> {
    get AlternateVerb() { return this.wrapLoc(this.row.AlternateVerb); }
    get CanLink() { return this.wrap(this.row.CanLink); }
    get Category() { return this.wrap(this.row.CategoryID); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Name() { return this.wrapLoc(this.row.DisplayName); }
    get ID() { return this.row.ID.get(); }
    get SkillCosts() { return this.wrap(this.row.SkillCostsID); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get RaceClassInfos() { return new SkillRaceClassInfos(this); }

    modCreateSpell(mod: string, id: string, autolearn: boolean, parent?: number, callback: (spell: Spell)=>void = ()=>{}) {
        callback(this.getCreateSpell(mod,id,autolearn,parent));
        return this;
    }

    getCreateSpell(mod: string, id: string, autolearn: boolean, parent?: number) {
        return Spells.create(mod,id,parent)
            .SkillLines.addMod(this.ID,autolearn)
    }
}

export class SkillLineRefReadOnly<T> extends RefReadOnly<T,SkillLine> {
    getRef(): SkillLine {
        return SkillLines.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}

export class SkillLineRef<T> extends RefStatic<T,SkillLine> {
    protected create(mod: string, id: string): SkillLine {
        return SkillLines.create(mod,id);
    }
    protected clone(mod: string, id: string): SkillLine {
        throw new Error(`SkillLines cannot be cloned yet`);
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: SkillLine): number {
        return v.ID;
    }
    protected resolve(): SkillLine {
        return SkillLines.load(this.cell.get());
    }
}