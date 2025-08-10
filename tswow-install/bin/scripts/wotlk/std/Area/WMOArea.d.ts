import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { WMOAreaTableQuery, WMOAreaTableRow } from "../../dbc/WMOAreaTable";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
export declare class WMOAreaSoundProviderPrefs extends CellSystem<WMOArea> {
    get Normal(): import("../Refs/Ref").RefDynamic<WMOArea, import("../Sound/SoundProviderPreferences").SoundProviderPreferences>;
    get Underwater(): import("../Refs/Ref").RefDynamic<WMOArea, import("../Sound/SoundProviderPreferences").SoundProviderPreferences>;
}
export declare class WMOArea extends MainEntity<WMOAreaTableRow> {
    get ID(): number;
    get WMO(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NameSet(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Group(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SoundProviderPreferences(): WMOAreaSoundProviderPrefs;
    get Ambience(): import("../Refs/Ref").RefDynamic<this, import("../Sound/SoundAmbience").SoundAmbience>;
    get ZoneMusic(): import("../Sound/ZoneMusic").ZoneMusicRef<this>;
    get IntroSound(): import("../Sound/ZoneIntroMusic").ZoneIntroMusicRef<this>;
    get AreaTable(): import("../Refs/Ref").RefNoCreate<this, import("./Area").Area>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
}
export declare class WMOAreaRegistryClass extends RegistryStaticNoClone<WMOArea, WMOAreaTableRow, WMOAreaTableQuery> {
    protected Table(): Table<any, WMOAreaTableQuery, WMOAreaTableRow> & {
        add: (id: number) => WMOAreaTableRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: WMOArea): void;
    protected FindByID(id: number): WMOAreaTableRow;
    protected EmptyQuery(): WMOAreaTableQuery;
    ID(e: WMOArea): number;
    protected Entity(r: WMOAreaTableRow): WMOArea;
}
export declare const WMOAreaRegistry: WMOAreaRegistryClass;
