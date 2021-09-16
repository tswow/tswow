import { EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export enum PetTypes {
      SUMMON_PET   = 0
    , HUNTER_PET   = 1
}

export type PetType = keyof typeof PetTypes

export function resolvePetType(type: PetType) {
    return PetTypes[type];
}

export class PetTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get SummonPet() { return this.value(PetTypes.SUMMON_PET); }
    get HunterPet() { return this.value(PetTypes.HUNTER_PET); }
}