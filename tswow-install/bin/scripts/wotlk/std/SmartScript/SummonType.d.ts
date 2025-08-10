export type SummonType = 'TIME_OR_DISAPPEAR' | 'TIME_OR_DEATH' | 'TIME' | 'TIME_OUT_COMBAT' | 'DEATH' | 'TIME_DEAD' | 'DISAPPEAR' | 'MANUAL';
export declare function resolveSummonType(summonType: SummonType): 2 | 1 | 4 | 3 | 5 | 8 | 7 | 6;
export declare function getSummonType(id: number): "TIME_OR_DISAPPEAR" | "TIME_OR_DEATH" | "TIME" | "TIME_OUT_COMBAT" | "DEATH" | "TIME_DEAD" | "DISAPPEAR" | "MANUAL";
