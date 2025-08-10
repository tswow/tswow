export declare class LightPosition {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly radiusInner: number;
    readonly radiusOuter: number;
    constructor(x: number, y: number, z: number, radiusInner: number, radiusOuter: number);
}
export declare function LightPos(x: number, y: number, z: number, radiusInner: number, radiusOuter: number): LightPosition;
