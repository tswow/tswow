import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SkillLineRow } from "../../dbc/SkillLine";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";
import { SpellIconCell } from "../Spell/SpellIcon";
import { SkillLineAbility } from "../Spell/SpellSkillLines";
import { SkillsAutolearn } from "./SkillAutolearn";
import { SkillCategory } from "./SkillCategory";
import { SkillRaceClassInfo, SkillRaceClassInfos } from "./SkillRaceClassInfo";
export declare class SkillLineAbilities extends MultiRowSystem<SkillLineAbility, SkillLine> {
    protected getAllRows(): SkillLineAbility[];
    protected isDeleted(value: SkillLineAbility): boolean;
}
export declare class SkillLine extends MainEntity<SkillLineRow> {
    get AlternateVerb(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get CanLink(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Category(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SkillCategory>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ID(): number;
    get SkillCosts(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Icon(): SpellIconCell<this>;
    get RaceClassInfos(): SkillRaceClassInfos;
    get Spells(): SkillLineAbilities;
    get Autolearn(): SkillsAutolearn<this>;
    clearClass(cls: MaskCon<keyof typeof ClassMask>): this;
    clearRace(race: MaskCon<keyof typeof RaceMask>): this;
    enableAutolearn(cls?: MaskCon<keyof typeof ClassMask>, race?: MaskCon<keyof typeof RaceMask>, rank?: number, callback?: (value: SkillRaceClassInfo) => void): this;
    enable(cls?: MaskCon<keyof typeof ClassMask>, race?: MaskCon<keyof typeof RaceMask>, callback?: (value: SkillRaceClassInfo) => void): this;
}
