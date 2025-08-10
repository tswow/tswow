import { Table } from "../../../data/table/Table";
import { CreatureSoundDataQuery, CreatureSoundDataRow } from "../../dbc/CreatureSoundData";
import { ArrayRefSystemStatic } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";
export declare class CreatureSoundData extends MainEntity<CreatureSoundDataRow> {
    get ID(): number;
    get Exertion(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get ExertionCritical(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Injury(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get InjuryCritical(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get InjuryCrushing(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Death(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Stun(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Stand(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Aggro(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get WingFlap(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get WingGlide(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Alert(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get FidgetDelay(): MinMaxCell<this>;
    get Fidget(): ArrayRefSystemStatic<this, import("../Sound/SoundEntry").SoundEntry>;
    get CustomAttack(): ArrayRefSystemStatic<this, import("../Sound/SoundEntry").SoundEntry>;
    get Footstep(): import("../Refs/Ref").RefDynamic<this, import("./FootstepTerrainLookup").FootstepTerrainLookup>;
    get NPC(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Loop(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get JumpStart(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get JumpEnd(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get PetAttack(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get PetOrder(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get PetDismiss(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Birth(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get SpellCastDirected(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Submerge(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Submerged(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get ImpactType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Pet(): import("../Refs/Ref").RefDynamic<this, CreatureSoundData>;
}
export declare class CreatureSoundDataRegistryClass extends RegistryDynamic<CreatureSoundData, CreatureSoundDataRow, CreatureSoundDataQuery> {
    protected Table(): Table<any, CreatureSoundDataQuery, CreatureSoundDataRow> & {
        add: (id: number) => CreatureSoundDataRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: CreatureSoundData): void;
    protected FindByID(id: number): CreatureSoundDataRow;
    ID(e: CreatureSoundData): number;
    protected EmptyQuery(): CreatureSoundDataQuery;
    protected Entity(r: CreatureSoundDataRow): CreatureSoundData;
}
export declare const CreatureSoundDataRegistry: CreatureSoundDataRegistryClass;
