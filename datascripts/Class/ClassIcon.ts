import * as fs from 'fs';
import { finish, luaxml } from "wotlkdata";
import { BuildArgs, dataset, ipaths } from 'wotlkdata/wotlkdata/Settings';
import { TSImage, TSImages } from "../Images/Image";
import { ClassRegistry } from './ClassRegistry';

const SQUARES_LOCAL = "Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES.BLP"
const CIRCLES_LOCAL = "Interface\\TARGETINGFRAME\\UI-Classes-Circles.blp"
const WORLDSTATE_LOCAL = "Interface\\WorldStateFrame\\ICONS-CLASSES.BLP"
const SQUARES_PATH = dataset.luaxml_source.join(SQUARES_LOCAL)
const CIRCLES_PATH = dataset.luaxml_source.join(CIRCLES_LOCAL)
const WORLDSTATE_PATH = dataset.luaxml_source.join(WORLDSTATE_LOCAL)

let stitchedSquares: TSImage;
let stitchedCircles: TSImage;
let stitchedWorldstates: TSImage

let stitchIndex = 10;

function setupImages() {
    let sqBlpExist = fs.existsSync(SQUARES_PATH.get());
    let crBlpExist = fs.existsSync(CIRCLES_PATH.get());
    let wsBlpExists = fs.existsSync(WORLDSTATE_PATH.get());

    if(!sqBlpExist || !crBlpExist || !wsBlpExists) {
        return false;
    }

    stitchedSquares = TSImages.read(SQUARES_PATH.get())
    stitchedCircles = TSImages.read(CIRCLES_PATH.get())
    stitchedWorldstates = TSImages.read(WORLDSTATE_PATH.get())

    const resizeImage = (image: TSImage) =>
        TSImages.create(512,512)
            .drawImage(image,0,0,256,64,0,0,256,64)
            .drawImage(image,256,0,256,64,0,64,256,64)
            .drawImage(image,0,64,256,64,0,128,256,64)
    stitchedSquares = resizeImage(stitchedSquares)
    stitchedCircles = resizeImage(stitchedCircles)
    stitchedWorldstates = resizeImage(stitchedWorldstates)

    ClassRegistry.load('WARRIOR').UI.ButtonTCoords.set(0,0.125,0,0.125)
    ClassRegistry.load('MAGE').UI.ButtonTCoords.set(0.125,0.25,0,0.125)
    ClassRegistry.load('ROGUE').UI.ButtonTCoords.set(0.25,0.375,0,0.125)
    ClassRegistry.load('DRUID').UI.ButtonTCoords.set(0.375,0.5,0,0.125)
    ClassRegistry.load('HUNTER').UI.ButtonTCoords.set(0.5,0.625,0,0.125)
    ClassRegistry.load('SHAMAN').UI.ButtonTCoords.set(0.625,0.75,0,0.125)
    ClassRegistry.load('PRIEST').UI.ButtonTCoords.set(0.75,0.875,0,0.125)
    ClassRegistry.load('WARLOCK').UI.ButtonTCoords.set(0.875,1,0,0.125)
    ClassRegistry.load('PALADIN').UI.ButtonTCoords.set(0,0.125,0.125,0.25)
    ClassRegistry.load('DEATH_KNIGHT').UI.ButtonTCoords.set(0.125,0.25,0.125,0.25)
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
    stitchedWorldstates?.drawImage(image,xpos,ypos,64,64)
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
    stitchedWorldstates?.addFilter((c,x,y)=>{
        if(x>=xpos && y >= ypos && x <= xpos+64 && y <= ypos+64) {
            if(x>=xpos+4 && x<=xpos+64-4 && y>=ypos+4 && y<=ypos+64-4) {
                return c
            } else {
                return 0;
            }
        }
        return c
    })
    return index;
}

// clear out old stdlib asset files (where we used to put icons)
// - we don't just remove it because that breaks current symlinks
// - this should be removed by 0.15
finish('finish', ()=> {
    const oldAssets = ipaths.modules.module.pick('tswow-stdlib').join('assets');
    if(oldAssets.exists()) {
        oldAssets.iterate('FLAT','DIRECTORIES','ABSOLUTE',node=>{
            node.remove();
        })
    }
})

luaxml('build-class-icons',()=>{
    if(!hasStitched || !BuildArgs.WRITE_CLIENT) return;
    if(stitchedSquares===undefined || stitchedCircles === undefined) {
        if(!setupImages()) {
            return;
        }
    }

    stitchedSquares?.write(dataset.luaxml.join(SQUARES_LOCAL).get(),'PNG+BLP')
    stitchedCircles?.write(dataset.luaxml.join(CIRCLES_LOCAL).get(),'PNG+BLP')
    stitchedWorldstates?.write(dataset.luaxml.join(WORLDSTATE_LOCAL).get(),'PNG+BLP')
})