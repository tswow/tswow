export type TotemType = 'EARTH' | 'AIR' | 'FIRE' | 'WATER' | number

export function resolveTotemType(type: TotemType) {
    if(typeof(type)==='number') {
        return type;
    }

    switch(type) {
        case 'EARTH': return 2;
        case 'AIR': return 3;
        case 'FIRE': return 4;
        case 'WATER': return 5;
        default: throw new Error(`Invalid TotemType, must be 'EARTH','AIR','FIRE','WATER' | number`)
    }
}