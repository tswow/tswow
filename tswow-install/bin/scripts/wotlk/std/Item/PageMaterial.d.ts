import { CellWrapper } from "../../../data/cell/cells/Cell";
export declare const DEFAULT_PAGE_MATERIALS: {
    readonly PARCHMENT: 1;
    readonly STONE: 2;
    readonly MARTBLE: 3;
    readonly SILVER: 4;
    readonly BRONZE: 5;
    readonly VALENTINE: 6;
    readonly ILLIDAN: 7;
};
export type PageMaterial = keyof typeof DEFAULT_PAGE_MATERIALS | number;
export declare function resolvePageMaterial(material: PageMaterial): number;
export declare class PageMaterialCell<T> extends CellWrapper<number, T> {
    set(material: PageMaterial): T;
}
