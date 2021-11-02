import { EnumCellReadOnly } from "wotlkdata/wotlkdata/cell/cells/EnumCell";

export enum PetTypes {
      SUMMON_PET   = 0
    , HUNTER_PET   = 1
}

export type PetType = keyof typeof PetTypes

export function resolvePetType(type: PetType) {
    return PetTypes[type];
}

export class PetTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get SUMMON_PET() { return this.value(PetTypes.SUMMON_PET); }
    get HUNTER_PET() { return this.value(PetTypes.HUNTER_PET); }
}