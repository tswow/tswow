export type SummonType =
    'TIME_OR_DISAPPEAR' | 'TIME_OR_DEATH' |
    'TIME' | 'TIME_OUT_COMBAT' |
    'DEATH' | 'TIME_DEAD' | 'DISAPPEAR' | 'MANUAL'

export function resolveSummonType(summonType: SummonType) {
    switch(summonType) {
        case 'TIME_OR_DISAPPEAR': return 1;
        case 'TIME_OR_DEATH': return 2;
        case 'TIME': return 3;
        case 'TIME_OUT_COMBAT': return 4;
        case 'DEATH': return 5;
        case 'TIME_DEAD': return 6;
        case 'DISAPPEAR': return 7;
        case 'MANUAL': return 8;
        default: throw new Error(`Invalid SummonType: ${summonType}`);
    }
}

export function getSummonType(id: number) {
    switch(id) {
        case 1: return 'TIME_OR_DISAPPEAR';
        case 2: return 'TIME_OR_DEATH';
        case 3: return 'TIME';
        case 4: return 'TIME_OUT_COMBAT';
        case 5: return 'DEATH';
        case 6: return 'TIME_DEAD';
        case 7: return 'DISAPPEAR';
        case 8: return 'MANUAL';
        default: throw new Error(`Invalid SummonType id: ${id}`);
    }
}