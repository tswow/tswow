import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { AreaTableQuery, AreaTableRow } from "../../dbc/AreaTable";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { AreaFishingSkill } from "./AreaFishingSkill";
import { AreaFlags } from "./AreaFlags";
import { AreaWorldStateSounds, AreaWorldStateUIs } from "./AreaWorldStates";
export declare class AreaSoundProviderPreferences extends CellSystem<Area> {
    get Normal(): import("../Refs/Ref").RefDynamic<Area, import("../Sound/SoundProviderPreferences").SoundProviderPreferences>;
    get Underwater(): import("../Refs/Ref").RefDynamic<Area, import("../Sound/SoundProviderPreferences").SoundProviderPreferences>;
}
export declare class Area extends MainEntity<AreaTableRow> {
    get ExploreBit(): number;
    get ID(): number;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get ParentArea(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SoundProviderPreferences(): AreaSoundProviderPreferences;
    get SoundAmbience(): import("../Refs/Ref").RefDynamic<this, import("../Sound/SoundAmbience").SoundAmbience>;
    get ZoneMusic(): import("../Sound/ZoneMusic").ZoneMusicRef<this>;
    get IntroMusic(): import("../Sound/ZoneIntroMusic").ZoneIntroMusicRef<this>;
    get ExplorationLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get MinElevation(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AmbientMultiplier(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Light(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WorldStateUIs(): AreaWorldStateUIs;
    get WorldStateSounds(): AreaWorldStateSounds;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof AreaFlags>;
    get Children(): AreaChildren;
    get Fishing(): AreaFishingSkill;
}
export declare class AreaChildren extends MultiRowSystem<Area, Area> {
    protected getAllRows(): Area[];
    protected isDeleted(value: Area): boolean;
    protected recurse(curDepth: number, cur: Area[]): Area[];
    get(depth?: number): Area[];
}
export declare const registeredAreas: {
    [key: string]: number;
};
export declare class AreaRegistryClass extends RegistryStaticNoClone<Area, AreaTableRow, AreaTableQuery> {
    protected Table(): Table<any, AreaTableQuery, AreaTableRow> & {
        add: (id: number) => AreaTableRow;
    };
    protected IDs(): StaticIDGenerator;
    /**
     * Creates an area entry from a numeric id instead of mod/id string pair.
     *
     * @deprecated - Do not use this unless you know exactly what you are doing.
     *
     * @warn - You can NOT currently use this together with calls to "create" in the same table safely.
     *         It's your own responsibility to make sure your custom ids do not clash with the ones tswow
     *         assigns normally.
     *
     * @warn - This signature might be renamed/changed in the future.
     */
    createId(id: number): Area;
    Clear(r: Area, mod: string, id: string): void;
    protected Entity(r: AreaTableRow): Area;
    protected FindByID(id: number): AreaTableRow;
    protected EmptyQuery(): AreaTableQuery;
    ID(e: Area): number;
}
export declare const AreaRegistry: AreaRegistryClass;
