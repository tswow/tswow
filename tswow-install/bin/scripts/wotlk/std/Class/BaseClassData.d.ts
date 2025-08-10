type map = {
    [key: string]: number;
};
type arrmap = {
    [key: string]: number[];
};
/** Descripes all lua/xml rows of settings for base classes */
export declare const BaseClassData: {
    CHARACTERCREATE_ICON_TCOORD_ROWS: map;
    WORLDSTATEFRAME_TCOORDS_ROWS: map;
    CONSTANT_ICON_TCOORDS_ROWS: map;
    XML_ROWS: map;
    CLASS_COLOR_ROWS: map;
    CLASS_SORT_ORDER_ROWS: map;
    /** Remale rows are row+1 */
    CLASS_DESCRIPTION_ROW: map;
    /** No gendered difference, second number is row count */
    CLASS_INFO_ROW: arrmap;
    CLASS_DISABLED_ROW: map;
};
export {};
