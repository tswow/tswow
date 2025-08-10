import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { graveyard_zoneRow } from "../../sql/graveyard_zone";
import { MainEntity } from "../Misc/Entity";
import { Team } from "../Misc/TeamEnum";
import { WorldSafeLoc } from "./WorldSafeLocs";
export declare class Graveyard extends MainEntity<graveyard_zoneRow> {
    get WorldSafeLoc(): import("../Refs/Ref").RefReadOnly<this, WorldSafeLoc>;
    get Area(): import("../Refs/Ref").RefReadOnly<this, WorldSafeLoc>;
    get Faction(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof Team>;
}
export declare class Graveyards extends MultiRowSystem<Graveyard, WorldSafeLoc> {
    protected getAllRows(): Graveyard[];
    protected isDeleted(value: Graveyard): boolean;
    add(area: number, faction: Team): WorldSafeLoc;
}
