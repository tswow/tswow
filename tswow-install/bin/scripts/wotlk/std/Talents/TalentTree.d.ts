import { MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { TalentTabRow } from "../../dbc/TalentTab";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Talent } from "./Talent";
export declare class TalentTreeTalents extends MultiRowSystem<Talent, TalentTree> {
    protected getAllRows(): Talent[];
    protected isDeleted(value: Talent): boolean;
    getPos(row: number, column: number): Talent;
    modPos(row: number, column: number, callback: (talent: Talent) => void): TalentTree;
    addGet(mod: string, id: string): Talent;
    addMod(mod: string, id: string, callback: (talent: Talent) => void): TalentTree;
    addSpellsGet(mod: string, id: string, ranks: number, parentSpell?: number): Talent;
    /**
     * @param parentSpell set to 0 for no parent
     * @returns
     */
    addSpellsMod(mod: string, id: string, ranks: number, parentSpell: number, callback: (talent: Talent) => void): TalentTree;
}
export declare class TalentTree extends MainEntity<TalentTabRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get BackgroundImage(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Icon(): SpellIconCell<this>;
    get Talents(): TalentTreeTalents;
    get ClassMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof ClassMask>;
    get OrderIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PetTalentMask(): MaskCell32<this>;
}
