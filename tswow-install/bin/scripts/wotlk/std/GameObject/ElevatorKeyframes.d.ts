import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { TransportAnimationRow } from "../../dbc/TransportAnimation";
import { TransportRotationRow } from "../../dbc/TransportRotation";
import { MainEntity } from "../Misc/Entity";
import { PositionXYZCell } from "../Misc/PositionCell";
import { GameObjectElevator } from "./GameObjectTemplate";
export declare class CellBasic<D extends CPrim, O> extends Cell<D, O> {
    private getter;
    private setter;
    constructor(owner: O, get: () => D, set: (value: D) => void);
    get(): D;
    set(value: D): O;
}
export declare abstract class MaybeCell<C extends CPrim, T, O> extends Cell<C, O> {
    protected accessor: (value: T) => Cell<C, any>;
    constructor(owner: O, accessor: (value: T) => Cell<C, any>);
    set(value: C): O;
    get(): C;
    protected abstract get_field(): T | undefined;
    protected abstract create(): T;
    abstract default(): C;
}
export declare class RotationRowCell extends MaybeCell<number, TransportRotationRow, ElevatorKeyframe> {
    default(): number;
    exists(): boolean;
    protected get_field(): TransportRotationRow | undefined;
    create(): TransportRotationRow;
}
export declare class ElevatorRotation extends CellSystem<ElevatorKeyframe> {
    get X(): RotationRowCell;
    get Y(): RotationRowCell;
    get Z(): RotationRowCell;
    get W(): RotationRowCell;
    set(x: number, y: number, z: number, w: number): ElevatorKeyframe;
}
export declare class TranslationRowCell extends MaybeCell<number, TransportAnimationRow, ElevatorKeyframe> {
    default(): number;
    protected get_field(): TransportAnimationRow | undefined;
    create(): TransportAnimationRow;
}
export declare class ElevatorTranslation extends CellSystem<ElevatorKeyframe> {
    get X(): TranslationRowCell;
    get Y(): TranslationRowCell;
    get Z(): TranslationRowCell;
    set(x: number, y: number, z: number): ElevatorKeyframe;
}
export declare class ElevatorSequenceKeyframe extends MainEntity<TransportAnimationRow> {
    get Sequence(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get GOTemplate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Position(): PositionXYZCell<this>;
    get Time(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ElevatorKeyframe extends CellSystemTop {
    private _rotation_row;
    private _translation_row;
    protected gameobject: number;
    protected time: number;
    constructor(gameobject: number, time: number, rotation?: TransportRotationRow, translation?: TransportAnimationRow);
    get rotation_row(): TransportRotationRow | undefined;
    get translation_row(): TransportAnimationRow | undefined;
    get GOTemplate(): CellBasic<number, this>;
    get Time(): CellBasic<number, this>;
    get Position(): ElevatorTranslation;
    get Rotation(): ElevatorRotation;
    isDeleted(): boolean;
    delete(): void;
    undelete(): void;
}
export type SeqKeyFrameCon = {
    x?: number;
    y?: number;
    z?: number;
    time?: number;
};
export type KeyFrameCon = SeqKeyFrameCon & {
    rotX?: number;
    rotY?: number;
    rotZ?: number;
    rotW?: number;
    o?: number;
};
export declare class ElevatorKeyframes extends CellSystem<GameObjectElevator> {
    getDefault(): ElevatorKeyframe[];
    clear(): GameObjectElevator;
    clearDefaultSequence(): GameObjectElevator;
    clearSequence(sequenceId: number): GameObjectElevator;
    getSequence(sequenceId: number): ElevatorSequenceKeyframe[];
    private addTimestamps;
    getAll(): {
        default: ElevatorKeyframe[];
        sequences: {
            [key: number]: ElevatorSequenceKeyframe[];
        };
    };
    objectify(options?: ObjectifyOptions): {
        default: any[];
        sequences: {
            [key: string]: SeqKeyFrameCon[];
        };
    };
    /**
     * Non-default sequences cannot have a rotation track (use setDefaultSequence)
     * @param sequenceId
     * @param frames
     */
    addToSequence(sequenceId: number, frames: SeqKeyFrameCon[]): void;
    /**
     * Sets the frames for sequence 0 (default)
     * - Only the default sequence can have a rotation track
     * @param frames
     * @returns
     */
    addDefault(frames: KeyFrameCon[]): GameObjectElevator;
}
