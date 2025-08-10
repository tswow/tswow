import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureInstance } from "../Creature/CreatureInstance";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { GameObjectInstance } from "../GameObject/GameObjectInstance";
import { BossStateMask, SpawnGroupBossFlags } from "./SpawnGroupBosses";
interface ImplicitBossState {
    map: number;
    boss: number;
    statemask: number;
    flags: number;
}
export declare const implicitCreatureGroups: {
    [key: number]: {
        id: number;
        value: ImplicitBossState;
    };
};
export declare const implicitGameObjectGroups: {
    [key: number]: {
        id: number;
        value: ImplicitBossState;
    };
};
export declare class ImplicitBossStateEntity<T> extends CellSystem<T> {
    protected state: ImplicitBossState;
    constructor(owner: T, state: ImplicitBossState);
    get Map(): CellBasic<number, T>;
    get Boss(): CellBasic<number, T>;
    get StateMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof BossStateMask>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof SpawnGroupBossFlags>;
}
export declare function implicitCreatureState(creature: CreatureInstance): ImplicitBossStateEntity<CreatureInstance>;
export declare function implicitGameObjectState(gobj: GameObjectInstance): ImplicitBossStateEntity<GameObjectInstance>;
export {};
