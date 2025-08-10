import { EnumCellReadOnly } from "../../../../data/cell/cells/EnumCell";
export declare enum PetTypes {
    SUMMON_PET = 0,
    HUNTER_PET = 1
}
export type PetType = keyof typeof PetTypes;
export declare function resolvePetType(type: PetType): PetTypes;
export declare class PetTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get SUMMON_PET(): import("../../../../data/cell/cells/EnumCell").EnumValueReadOnly<T>;
    get HUNTER_PET(): import("../../../../data/cell/cells/EnumCell").EnumValueReadOnly<T>;
}
