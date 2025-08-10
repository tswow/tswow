import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { SpellVisualQuery, SpellVisualRow } from "../../dbc/SpellVisual";
import { SpellVisualKitQuery, SpellVisualKitRow } from "../../dbc/SpellVisualKit";
import { SpellVisualKitModelAttachRow } from "../../dbc/SpellVisualKitModelAttach";
import { Attachment } from "../Misc/Attachment";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { PositionXYZCell } from "../Misc/PositionCell";
import { Substruct } from "../Misc/Substruct";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { SpellAnimation } from "./SpellAnimation";
import { SpellCharacterProcedures } from "./SpellCharacterProcedure";
import { SpellVisualEffect, SpellVisualEffectRef, SpellVisualEffects } from "./SpellVisualEffect";
export declare enum SpellVisualKitFlags {
    LOOP_ANIMATION = 64
}
export declare class SpellVisualKitModelAttach extends CellSystemTop {
    readonly row: SpellVisualKitModelAttachRow;
    constructor(row: SpellVisualKitModelAttachRow);
    get Attachment(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof Attachment>;
    get Offset(): PositionXYZCell<this>;
    get Yaw(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Pitch(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Roll(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Effect(): SpellVisualEffectRef<this>;
}
export declare class SpellVisualKitModels extends MultiRowSystem<SpellVisualKitModelAttach, SpellVisualKit> {
    protected getAllRows(): SpellVisualKitModelAttach[];
    protected isDeleted(value: SpellVisualKitModelAttach): boolean;
    constructor(owner: SpellVisualKit);
    add(): SpellVisualKitModelAttach;
}
export declare class SpellVisualKit extends MainEntity<SpellVisualKitRow> {
    clear(): this;
    readonly name: string;
    constructor(row: SpellVisualKitRow, name: string);
    get ID(): number;
    get BaseEffect(): SpellVisualEffectRef<this>;
    get BreathEffect(): SpellVisualEffectRef<this>;
    get CharProcedures(): SpellCharacterProcedures<this>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellVisualKitFlags>;
    get CameraShake(): RefDynamic<this, import("./SpellEffectCameraShakes").SpellEffectCameraShakes>;
    get Sound(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get StartAnimation(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get WorldEffect(): SpellVisualEffectRef<this>;
    get Animation(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get ChestEffect(): SpellVisualEffectRef<this>;
    get HeadEffect(): SpellVisualEffectRef<this>;
    get LeftHandEffect(): SpellVisualEffectRef<this>;
    get RightHandEffect(): SpellVisualEffectRef<this>;
    addBothHands(callback: (eff: SpellVisualEffect) => void): this;
    addBothWeapons(callback: (eff: SpellVisualEffect) => void): this;
    get RightWeaponEffect(): SpellVisualEffectRef<this>;
    get LeftWeaponEffect(): SpellVisualEffectRef<this>;
    get SpellEffects(): SpellVisualEffects<this>;
    get Models(): SpellVisualKitModels;
    codify(settings: CodegenSettings): string;
}
export declare class SpellVisualKitRegistryClass extends RegistryDynamic<SpellVisualKit, SpellVisualKitRow, SpellVisualKitQuery> {
    protected Table(): Table<any, SpellVisualKitQuery, SpellVisualKitRow> & {
        add: (id: number) => SpellVisualKitRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellVisualKit): void;
    protected Clone(entity: SpellVisualKit, parent: SpellVisualKit): void;
    protected FindByID(id: number): SpellVisualKitRow;
    protected EmptyQuery(): SpellVisualKitQuery;
    ID(e: SpellVisualKit): number;
    protected Entity(r: SpellVisualKitRow): SpellVisualKit;
}
export declare const SpellVisualKitRegistry: SpellVisualKitRegistryClass;
export declare class MissileFollowGround<T> extends Substruct<T, SpellVisual> {
    get Height(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get DropSpeed(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Approach(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(height: number, dropSpeed: number, groundApproach: number, groundFlags: number): T;
    mod(callback: (ent: MissileFollowGroundCB) => void): T;
}
export declare class MissileFollowGroundCB extends MissileFollowGround<MissileFollowGroundCB> {
    constructor(owner: SpellVisual);
}
export declare class SpellVisualMissile<T> extends Substruct<T, SpellVisual> {
    get DestinationAttachment(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Sound(): import("../Sound/SoundEntry").SoundEntryRef<T>;
    get FollowGround(): MissileFollowGround<T>;
    get HasMissile(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Model(): SpellVisualEffectRef<T>;
    get Attachment(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get CastOffset(): PositionXYZCell<T>;
    get ImpactOffset(): PositionXYZCell<T>;
    mod(callback: (vis: SpellVisualMissileCB) => void): T;
}
export declare class SpellVisualMissileCB extends SpellVisualMissile<SpellVisualMissileCB> {
    constructor(vis: SpellVisual);
}
export declare class SpellVisual extends MainEntity<SpellVisualRow> {
    clear(): this;
    private kit;
    AllKits(): {
        name: string;
        ref: RefDynamic<SpellVisual, SpellVisualKit>;
    }[];
    get ID(): number;
    get CastKit(): RefDynamic<this, SpellVisualKit>;
    get StateKit(): RefDynamic<this, SpellVisualKit>;
    get ImpactKit(): RefDynamic<this, SpellVisualKit>;
    get ChannelKit(): RefDynamic<this, SpellVisualKit>;
    get PrecastKit(): RefDynamic<this, SpellVisualKit>;
    get StateDoneKit(): RefDynamic<this, SpellVisualKit>;
    get ImpactAreaKit(): RefDynamic<this, SpellVisualKit>;
    get InstantAreaKit(): RefDynamic<this, SpellVisualKit>;
    get CasterImpactKit(): RefDynamic<this, SpellVisualKit>;
    get TargetImpactKit(): RefDynamic<this, SpellVisualKit>;
    get PersistentAreaKit(): RefDynamic<this, SpellVisualKit>;
    get MissileTargetingKit(): RefDynamic<this, SpellVisualKit>;
    get Missile(): SpellVisualMissile<this>;
    cloneFromVisual(visualId: number): undefined;
    cloneFromSpell(spellId: number): undefined;
    codify(settings: CodegenSettings): string;
}
export declare class SpellVisualRegistryClass extends RegistryDynamic<SpellVisual, SpellVisualRow, SpellVisualQuery> {
    protected Table(): Table<any, any, SpellVisualRow> & {
        add: (id: number) => SpellVisualRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellVisual): void;
    protected Clone(entity: SpellVisual, parent: SpellVisual): void;
    protected FindByID(id: number): SpellVisualRow;
    protected EmptyQuery(): {};
    ID(e: SpellVisual): number;
    protected Entity(r: SpellVisualRow): SpellVisual;
}
export declare const SpellVisualRegistry: SpellVisualRegistryClass;
