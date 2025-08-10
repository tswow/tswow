import { MaskCon } from "../../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { CharBaseInfoRow } from "../../../dbc/CharBaseInfo";
import { MainEntity } from "../../Misc/Entity";
import { RaceMask } from "../../Race/RaceType";
import { Class } from "../Class";
import { ClassRaceActions } from "./ClassRaceAction";
import { ClassRaceRunes } from "./ClassRaceRunes";
import { ClassRaceSpawn } from "./ClassRaceSpawn";
import { StartGearRef } from "./ClassRaceStartGear";
import { ClassRaceStats } from "./RaceClassStats";
export declare class ClassRacePair extends MainEntity<CharBaseInfoRow> {
    get Race(): import("../../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Class(): import("../../Refs/Ref").RefReadOnlyTT<this, Class, typeof import("../ClassIDs").ClassIDs>;
    get SpawnPosition(): ClassRaceSpawn;
    get Stats(): ClassRaceStats;
    get Outfits(): StartGearRef<this>;
    get Actions(): ClassRaceActions<this>;
    get HasRunes(): ClassRaceRunes;
}
export declare class ClassRaces extends MultiRowSystem<ClassRacePair, Class> {
    protected getAllRows(): ClassRacePair[];
    protected isDeleted(value: ClassRacePair): boolean;
    delete(races: MaskCon<keyof typeof RaceMask>): Class;
    add(races: MaskCon<keyof typeof RaceMask>): Class;
}
