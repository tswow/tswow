import * as fs from 'fs';
import * as path from 'path';
import { finish } from "wotlkdata";
import { BuildArgs, dataset } from 'wotlkdata/wotlkdata/Settings';
import { TSImage, TSImages } from "../Images/Image";
import { ClassRegistry } from './ClassRegistry';

const SQUARES_LOCAL = "Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES.BLP"
const CIRCLES_LOCAL = "Interface\\TARGETINGFRAME\\UI-Classes-Circles.blp"
const SQUARES_PATH = dataset.luaxml_source.join(SQUARES_LOCAL)
const CIRCLES_PATH = dataset.luaxml_source.join(CIRCLES_LOCAL)

let stitchedSquares: TSImage;
let stitchedCircles: TSImage;

let stitchIndex = 10;

function setupImages() {
    let sqBlpExist = fs.existsSync(SQUARES_PATH.get());
    let crBlpExist = fs.existsSync(CIRCLES_PATH.get());

    if(!sqBlpExist || !crBlpExist) {
        return false;
    }

    stitchedSquares = TSImages.read(SQUARES_PATH.get())
    stitchedCircles = TSImages.read(CIRCLES_PATH.get())

    const resizeImage = (image: TSImage) =>
        TSImages.create(512,512)
            .drawImage(image,0,0,256,64,0,0,256,64)
            .drawImage(image,256,0,256,64,0,64,256,64)
            .drawImage(image,0,64,256,64,0,128,256,64)
    stitchedSquares = resizeImage(stitchedSquares)
    stitchedCircles = resizeImage(stitchedCircles)

    ClassRegistry.load('WARRIOR').UI.TCoords.set(0,0.125,0,0.125)
    ClassRegistry.load('MAGE').UI.TCoords.set(0.125,0.25,0,0.125)
    ClassRegistry.load('ROGUE').UI.TCoords.set(0.25,0.375,0,0.125)
    ClassRegistry.load('DRUID').UI.TCoords.set(0.375,0.5,0,0.125)
    ClassRegistry.load('HUNTER').UI.TCoords.set(0.5,0.625,0,0.125)
    ClassRegistry.load('SHAMAN').UI.TCoords.set(0.625,0.75,0,0.125)
    ClassRegistry.load('PRIEST').UI.TCoords.set(0.75,0.875,0,0.125)
    ClassRegistry.load('WARLOCK').UI.TCoords.set(0.875,1,0,0.125)
    ClassRegistry.load('PALADIN').UI.TCoords.set(0,0.125,0.125,0.25)
    ClassRegistry.load('DEATH_KNIGHT').UI.TCoords.set(0.125,0.25,0.125,0.25)
    return true;
}

let hasStitched = false;
export function stitchClassIcon(image: TSImage, index: number = -1) {
    if(index<0) {
        index = stitchIndex++;
    }
    hasStitched = true;

    if(stitchedSquares===undefined || stitchedCircles===undefined) {
        if(!setupImages())
        {
            throw new Error(
                `Class icon images have not been exported.`
                + `Try the command "build luaxml"`
                )
        }
    }

    let xpos = (index%8)*64;
    let ypos = Math.floor(index/8)*64;

    stitchedSquares?.drawImage(image,xpos,ypos,64,64)
    stitchedCircles?.drawImage(image,xpos,ypos,64,64)
    // carve out the circle shape
    stitchedCircles?.addFilter((c,x,y)=>{
        if(x>=xpos && y >= ypos && x <= xpos+64 && y <= ypos+64) {
            let dst = Math.sqrt(Math.pow(x-(xpos+32),2)+Math.pow(y-(ypos+32),2))
            if(dst>32) {
                return 0;
            }
        }
        return c;
    });
    return index;
}

finish('build-class-icons',()=>{
    if(!hasStitched || BuildArgs.NO_CLIENT) return;
    if(stitchedSquares===undefined || stitchedCircles === undefined) {
        if(!setupImages()) {
            return;
        }
    }
    stitchedSquares?.writeToModule('tswow-stdlib',path.join('assets',SQUARES_LOCAL))
    stitchedCircles?.writeToModule('tswow-stdlib',path.join('assets',CIRCLES_LOCAL))
})