import { DBC } from "wotlkdata";
import { TalentTabRow } from "wotlkdata/dbc/types/TalentTab";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Talent } from "./Talent";

export class TalentTree extends MainEntity<TalentTabRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get BackgroundImage() { return this.wrap(this.row.BackgroundFile); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }

    /**
     * @param mod 
     * @param id 
     * @param column 
     * @param row 
     * @param spellIds 
     */
    addTalent(mod: string, id: string, column: number, row: number, spellIds: number[]) {
        const talent = DBC.Talent.add(Ids.Talent.id(mod,id))
            .TabID.set(this.ID)
            .ColumnIndex.set(column)
            .TierID.set(row)
            .PrereqTalent.set([0,0,0])
            .PrereqRank.set([0,0,0])
            .Flags.set(spellIds.length===0? 1 : 0)
            .CategoryMask.set([0,0])
            .SpellRank.set([0,0,0,0,0,0,0,0,0])

        for(let i=0;i<spellIds.length;++i) {
            talent.SpellRank.setIndex(i, spellIds[i]);
        }

        return new Talent(this, talent);
    }
}