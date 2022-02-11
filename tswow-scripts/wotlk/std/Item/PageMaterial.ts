import { CellWrapper } from "../../../data/cell/cells/Cell";

export const DEFAULT_PAGE_MATERIALS = {
      PARCHMENT : 1
    , STONE     : 2
    , MARTBLE   : 3
    , SILVER    : 4
    , BRONZE    : 5
    , VALENTINE : 6
    , ILLIDAN   : 7

} as const;

export type PageMaterial = keyof typeof DEFAULT_PAGE_MATERIALS | number

export function resolvePageMaterial(material: PageMaterial) {
    return typeof(material) === 'string' ? DEFAULT_PAGE_MATERIALS[material] : material;
}

// Don't make this an enum in case it's possible to add new values

export class PageMaterialCell<T> extends CellWrapper<number,T> {
    set(material: PageMaterial) {
        return super.set(resolvePageMaterial(material));
    }
}