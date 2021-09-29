export class ColorObj {
    protected rgba: number;
    constructor(rgba: number) {
        this.rgba = rgba;
    }

    hsvShift(h: number, s: number = 0, v: number = 0) {
        let [oh,os,ov,oa] = this.asHSVSplit();
        h+=oh;
        h = h - Math.floor(h);
        if(h<0) h = 1 + h;
        s+=os;
        s = s - Math.floor(s);
        if(s<0) s = 1 + s;
        v+=ov;
        v = v - Math.floor(v);
        if(v<0) v = 1 + v;
        return Colors.hsv(h,s,v,oa);
    }

    withAlpha(alpha: number) {
        return new ColorObj((this.rgba & ~0xff) | alpha)
    }

    alpha() {
        return this.rgba&0xff;
    }

    asRGB() {
        return this.rgba >> 8;
    }

    asRGBA() {
        return this.rgba;
    }

    asRGBSplit(): [number,number,number,number] {
        const rgba = this.asRGB();
        return [(rgba>>24)&0xff,(rgba>>16)&0xff,(rgba>>8)&0xff,rgba&0xff];
    }

    asHSVSplit(): [number,number,number,number] {
        let [r,g,b] = this.asRGBSplit();
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max == 0 ? 0 : d / max;
        h = 0;
        if (max != min) {
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }

          h /= 6;
        }

        return [ h, s, v, this.rgba&0xff ];
    }
}

export type Color = ColorObj | number | [number,number,number]
export type ColorAlpha = ColorObj | number | [number,number,number,number]
export function resolveColorNoAlpha(color: Color) {
    if(Array.isArray(color)) {
        return Colors.rgb(color[0],color[1],color[2]).asRGB();
    }

    if(typeof(color) === 'object') {
        return color.asRGB();
    }

    return color;
}

export function resolveColorAlpha(color: ColorAlpha) {
    if(Array.isArray(color)) {
        return Colors.rgb(color[0],color[1],color[2],color[3]).asRGBA();
    }
    if(typeof(color) === 'object') {
        return color.asRGBA();
    }
    return color;
}

export module Colors {
    // most of these from https://gist.github.com/mjackson/5311256
    export function rgb(r: number, g: number, b: number, a: number = 255) {
        return new ColorObj(r << 24 | g << 16 | b << 8 | a);
    }

    export function hsl(h: number, s:number, l: number, a: number = 255){
        var r, g, b;
        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p: number, q: number, t: number){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return rgb(Math.round(r * 255),Math.round(g * 255),Math.round(b * 255),a);
    }

    export function hsv(h: number, s: number, v: number, a: number = 255) {
        if(h>1) h = h-Math.floor(h);
        let r = 0;
        let g = 0;
        let b = 0;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return rgb(r*255,g*255,b*255,a);
    }
}