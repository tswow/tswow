import { createCanvas, loadImage, Image, Canvas, CanvasRenderingContext2D } from 'canvas';
import * as fs from 'fs';
import deasync from 'deasync';
import path from 'path';
import * as child_process from 'child_process'

function loadImagePromise(path: string, cb: (err: any, image: Image)=>void) {
    loadImage(path).then((value)=>{
        cb(undefined,value);
    // @ts-ignore
    }).catch((err)=>cb(err,undefined));
}

const loadImageSync : (path: string) => Image = deasync(loadImagePromise);
const hexstr = (num: number) => `#${num.toString(16).toUpperCase().padStart(6,'0')}`

export class TSImage {
    protected img: Image;
    protected canvas: Canvas;
    // @ts-ignore
    protected ctx: CanvasRenderingContext2D;

    protected constructor(img: Image, canvas: Canvas) {
        this.img = img;
        this.canvas = canvas;
    }

    protected get either() { return this.img === undefined ? this.canvas : this.img; }

    protected getCanvas() {
        if(this.canvas===undefined) {
            this.canvas = createCanvas(this.img.width,this.img.height);
            this.canvas.getContext('2d').drawImage(this.img,0,0,this.img.width,this.img.height);
        }
        return this.canvas;
    }

    protected getContext() {
        if(this.ctx!==undefined) {
            return this.ctx;
        }
        return this.getCanvas().getContext('2d');
    }

    static load(path: string) {
        // @ts-ignore
        return new TSImage(loadImageSync(path),undefined);
    }

    static create(width: number, height: number, bg: number) {
        // @ts-ignore
        let img = new TSImage(undefined,createCanvas(width,height));
        img.drawBox(0,0,width,height,bg);
        return img;
    }

    drawBox(x: number, y: number, width: number, height: number, color: number) {
        const ctx = this.getContext()
        ctx.fillStyle = hexstr(color);
        ctx.fillRect(x,y,width,height);
    }

    drawPixel(x: number, y: number, color: number) {
        let r = color >> 24;
        let g = (color >> 16) & 0xff;
        let b = (color >> 8) & 0xff; 
        let a = (color & 0xff); // TODO: Is this correct?
        console.log("a is ",a);
        let data = this.getContext().createImageData(1,1);
        data.data[0] = r;
        data.data[1] = g;
        data.data[2] = b;
        data.data[3] = a;
        this.getContext().putImageData(data,x,y);
    }

    getPixel(x: number, y: number, color: number) {
        let id = this.getContext().getImageData(x,y,1,1);
        return id.data[0]<<24 | id.data[1] << 16 | id.data[2] << 8 | id.data[3];
    }

    get width() { return this.either.height; }
    get height() { return this.either.width; }

    drawImage(x: number, y: number, image: TSImage) {
        this.getContext().drawImage(image,x,y,image.width,image.height);
    }

    addFilter(cb: (num: number, x: number, y: number)=>number) {
        this.addFilterSplit((r,g,b,a,x,y)=>{
            let out = cb(r<<24|g<<16|b<<8|a,x,y);
            return [out>>24,(out>>16)&0xff,(out>>8)&0xff,(out&0xff)]
        });
    }

    addFilterSplit(cb: (r: number, g: number, b: number, a: number, x: number, y: number) => [number,number,number,number]) {
        let id = this.getContext().getImageData(0,0,this.width,this.height);
        for(let y=0;y<this.height;++y) {
            for(let x=0;x<this.width;++x) {
                let i = (y*this.width+x)*4;
                let r = id.data[i];
                let g = id.data[i+1];
                let b = id.data[i+2];
                let a = id.data[i+3];
                [r,g,b,a] = cb(r,g,b,a,x,y);
                id.data[i] = Math.max(Math.min(r,255),0);
                id.data[i+1] = Math.max(Math.min(g,255),0);
                id.data[i+2] = Math.max(Math.min(b,255),0);
                id.data[i+3] = Math.max(Math.min(a,255),0);
            }
        }
        this.getContext().putImageData(id,0,0);
    }

    /**
     * Saves to any filepath
     * @param pathIn 
     */
    saveRaw(pathIn: string) {
        if(pathIn.endsWith('.blp')) {
            pathIn = pathIn.substring(0,pathIn.length-3)+'png'
        }

        if(!pathIn.endsWith('.png')) {
            pathIn = pathIn+'.png'
        }

        const dn = path.dirname(pathIn);
        if(!fs.existsSync(dn)) {
            fs.mkdirSync(dn);
        }
        fs.writeFileSync(pathIn,this.getCanvas().toBuffer());
        child_process.execSync(`"bin/BLPConverter/blpconverter.exe" ${pathIn}`)
    }

    /**
     * Saves to the assets directory of a mod
     * @param mod 
     * @param localPath 
     */
    saveToMod(mod: string, localPath: string) {
        this.saveRaw(path.join('modules',mod,'assets',localPath));
    }

    /**
     * Saves directly to the client
     * @param pathIn 
     */
    save(pathIn: string) {
        this.save(path.join('coredata','luaxml',pathIn));
    }
}

export const TSImages = {
    create(width: number, height: number, color: number) {
        return TSImage.create(width,height,color);
    },

    /**
     * Loads from any path
     * @param pathIn 
     */
    load(pathIn: string) {
        return TSImage.load(pathIn);
    },

    /**
     * Loads from the assets directory of a module
     * @param mod 
     * @param localPath 
     */
    loadFromMod(mod: string, localPath: string) {
        return TSImages.load(path.join('modules',mod,'assets',localPath));
    },
}