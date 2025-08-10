export declare class ColorObj {
    protected rgba: number;
    constructor(rgba: number);
    hsvShift(h: number, s?: number, v?: number): ColorObj;
    withAlpha(alpha: number): ColorObj;
    alpha(): number;
    asRGB(): number;
    asRGBA(): number;
    asRGBSplit(): [number, number, number, number];
    asHSVSplit(): [number, number, number, number];
}
export type Color = ColorObj | number | [number, number, number];
export type ColorAlpha = ColorObj | number | [number, number, number, number];
export declare function resolveColorNoAlpha(color: Color): number;
export declare function resolveColorAlpha(color: ColorAlpha): number;
export declare namespace Colors {
    function rgb(r: number, g: number, b: number, a?: number): ColorObj;
    function hsl(h: number, s: number, l: number, a?: number): ColorObj;
    function hsv(h: number, s: number, v: number, a?: number): ColorObj;
}
