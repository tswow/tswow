export type DrunkState = 'SOBER' | 'TIPSY' | 'DRUNK' | 'SMASHED';
export declare function resolveDrunkState(state: DrunkState): 2 | 0 | 1 | 3;
export declare function idToDrunkState(id: number): DrunkState;
