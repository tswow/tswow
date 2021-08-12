import * as pureimage from 'pureimage'
import * as fs from 'fs';
import * as path from 'path'
import * as child_process from 'child_process'
import { PNG } from 'pngjs'

export class TSImage {
    protected bitmap: any;
    protected get context() {
        return this.bitmap.getContext('2d');
    }

    get width() {
        return this.bitmap.width;
    }

    get height() {
        return this.bitmap.height;
    }

    constructor(bitmap: any) {
        this.bitmap = bitmap;
    }

    clone() {
        let tsimg = TSImage.create(this.width,this.height);
        tsimg.drawImage(this,0,0);
        return tsimg;
    }

    drawImage(image: TSImage, x: number, y: number, width = image.width, height = image.height, xIn = 0, yIn = 0, widthIn = width, heightIn = height) {
        this.context.drawImage(image.bitmap,0,0,image.width,image.height,
            xIn,yIn,widthIn,heightIn,
            x, y, width, height
        )
    }

    addFilter(callback: (color: number, x: number, y: number)=>number) {
        this.addFilterSplit((r,g,b,a,x,y)=>{
            let out = callback(r<<24|g<<16|b<<8|a,x,y);
            return [out>>24&0xff,(out>>16)&0xff,(out>>8)&0xff,(out&0xff)]
        });
    }

    addFilterSplit(callback: (r: number, g: number, b: number, a: number, x: number, y: number)=>[number,number,number,number]){
        let id = this.context.getImageData(0,0,this.width,this.height);
        for(let y=0;y<this.height;++y) {
            for(let x=0;x<this.width;++x) {
                let i = (y*this.width+x)*4;
                let r = id.data[i];
                let g = id.data[i+1];
                let b = id.data[i+2];
                let a = id.data[i+3];
                [r,g,b,a] = callback(r,g,b,a,x,y);
                id.data[i] = Math.max(Math.min(r,255),0);
                id.data[i+1] = Math.max(Math.min(g,255),0);
                id.data[i+2] = Math.max(Math.min(b,255),0);
                id.data[i+3] = Math.max(Math.min(a,255),0);
            }
        }
        this.context.putImageData(id,0,0);
    }

    write(pathIn: string, keepPng: boolean = false) {
        let pathRaw = pathIn;
        if(pathIn.endsWith('.blp') || pathIn.endsWith('.png')) {
            pathRaw = pathIn.substring(0,pathIn.length-4);
        }
        const dir = path.dirname(pathRaw);
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir,{recursive:true});
        }
        let pathPng = pathRaw+'.png';
        let pathBlp = pathRaw+'.blp';
        if(fs.existsSync(pathBlp)) {
            fs.rmSync(pathBlp);
        }
        pureimage.encodePNGToStream(this.bitmap,fs.createWriteStream(pathPng))
            .then(()=>{
                child_process.execSync(`"bin/BLPConverter/blpconverter.exe" ${pathPng}`)
                if(!keepPng) {
                    fs.rmSync(pathPng);
                }
        });
    }

    writeToAssets(mod: string, localPath: string, keepPng = false) {
        this.write(path.join('modules',mod,'assets',localPath), keepPng);
    }

    static create(width: number, height: number) {
        return new TSImage(pureimage.make(width,height));
    }

    static read(str: string) {
        let pngIn = PNG.sync.read(fs.readFileSync(str));
        const bitmap = pureimage.make(pngIn.width,pngIn.height);
        for(let i=0;i<bitmap.data.length;++i) {
            bitmap.data[i] = pngIn.data[i];
        }
        return new TSImage(bitmap);
    }
}

export const TSImages = {
    create(width: number, height: number) {
        return TSImage.create(width,height);
    },

    /**
     * Loads from any path
     * @param pathIn 
     */
    read(pathIn: string) {
        return TSImage.read(pathIn);
    },

    /**
     * Loads from the assets directory of a module
     * @param mod 
     * @param localPath 
     */
    readFromAssets(mod: string, localPath: string) {
        return TSImages.read(path.join('modules',mod,'assets',localPath));
    },
}