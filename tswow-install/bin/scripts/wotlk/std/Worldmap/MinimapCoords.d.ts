export type ADTBounds = [
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
];
export declare function setMinimapCoords(map: ADTBounds, minX: number, minY: number, maxX: number, maxY: number): {
    worldMinX: number;
    worldMinY: number;
    worldMaxX: number;
    worldMaxY: number;
};
