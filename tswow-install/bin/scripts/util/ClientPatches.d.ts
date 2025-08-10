export interface ClientPatch {
    address: number;
    values: number[];
}
export interface ClientPatchCat {
    name: string;
    patches: ClientPatch[];
}
export declare function patch(name: string, patches: [number, number[]][]): ClientPatchCat;
export declare const EXTENSION_DLL_PATCH_NAME = "client-extensions";
export declare const ITEM_DBC_DISABLER_PATCH_NAME = "item-dbc-disabler";
export declare const FIX_COMBO_POINT_PATCH_NAME = "fix-combo-points";
export declare function ClientPatches(gamebuild: number, roles: {
    class: number;
    tank: number;
    healer: number;
    damage: number;
    leader: number;
}[]): ClientPatchCat[];
