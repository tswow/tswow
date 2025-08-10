import { Cell } from "../../../data/cell/cells/Cell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { WorldStateZoneSoundsRow } from "../../dbc/WorldStateZoneSounds";
import { MainEntity } from "../Misc/Entity";
import { RefNoCreate, RefStatic, StaticRegistry } from "../Refs/Ref";
import { EntityTags } from "../Tags/Tags";
export declare class WorldStateSound extends MainEntity<WorldStateZoneSoundsRow> {
    get WorldState(): number;
    get TriggerValue(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Area(): RefNoCreate<this, import("../Area/Area").Area>;
    get WMOArea(): RefNoCreate<this, import("../Area/WMOArea").WMOArea>;
    get ZoneIntroMusic(): import("../Sound/ZoneIntroMusic").ZoneIntroMusicRef<this>;
    get ZoneMusic(): import("../Sound/ZoneMusic").ZoneMusicRef<this>;
    get SoundAmbience(): import("../Refs/Ref").RefDynamic<this, import("../Sound/SoundAmbience").SoundAmbience>;
    get SoundProviderPreferences(): import("../Refs/Ref").RefDynamic<this, import("../Sound/SoundProviderPreferences").SoundProviderPreferences>;
}
export declare class WorldStateSounds extends MultiRowSystem<WorldStateSound, WorldState> {
    protected getAllRows(): WorldStateSound[];
    protected isDeleted(value: WorldStateSound): boolean;
}
export declare class WorldState {
    protected id: number;
    constructor(id: number);
    get Sounds(): WorldStateSounds;
    get ID(): number;
    get(): number;
    gossip_text(): string;
    ui_text(): string;
    get Tags(): EntityTags<this>;
    objectify(): number;
}
export declare class WorldStateRegistryClass implements StaticRegistry<WorldState> {
    create(mod: string, id: string, parent?: number): WorldState;
    ID(entity: WorldState): number;
    load(id: number): WorldState;
    Exists(num: number): boolean;
    refNoCreate<T>(owner: T, cell: Cell<number, any>): RefNoCreate<T, WorldState>;
    refCreate<T>(owner: T, cell: Cell<number, any>): RefStatic<T, WorldState>;
}
export declare const WorldStateRegistry: WorldStateRegistryClass;
