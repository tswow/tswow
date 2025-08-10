export interface Position {
    map: number;
    x: number;
    y: number;
    z: number;
    o: number;
}
export declare function Pos(map: number, x: number, y: number, z: number, o: number): {
    map: number;
    x: number;
    y: number;
    z: number;
    o: number;
    delay: number;
};
export declare function distance2d(pos1: Position, pos2: Position): number;
export declare function distance3d(pos1: Position, pos2: Position): number;
