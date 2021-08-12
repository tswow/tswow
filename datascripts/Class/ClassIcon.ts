import { Settings } from "wotlkdata/Settings";
import { TSImage, TSImages } from "../Images/Image";
import { finish } from "wotlkdata";
import { Classes } from "./Class";
import * as path from 'path'
import * as fs from 'fs';

const SQUARES_LOCAL = "Interface\\GLUES\\CHARACTERCREATE\\UI-CHARACTERCREATE-CLASSES.BLP"
const CIRCLES_LOCAL = "Interface\\TARGETINGFRAME\\UI-Classes-Circles.blp"
const SQUARES_PATH = path.join(Settings.LUAXML_SOURCE,SQUARES_LOCAL)
const CIRCLES_PATH = path.join(Settings.LUAXML_SOURCE,CIRCLES_LOCAL)

let stitchedSquares: TSImage|undefined = undefined;
let stitchedCircles: TSImage|undefined = undefined;

let stitchIndex = 10;

export function stitchClassIcon(image: TSImage, index: number = -1) {
    if(index<0) {
        index = stitchIndex++;
    }

    if(stitchedSquares===undefined || stitchedCircles===undefined) {
        let sqBlpExist = fs.existsSync(SQUARES_PATH);
        let crBlpExist = fs.existsSync(CIRCLES_PATH);

        if(!sqBlpExist || !crBlpExist) {
            throw new Error(
                `Class icon images have not been exported.`
                + `Try the command "build luaxml"`
                )
        }

        stitchedSquares = TSImages.read(SQUARES_PATH)
        stitchedCircles = TSImages.read(CIRCLES_PATH)

        const resizeImage = (image: TSImage) =>
            TSImages.create(512,512)
                .drawImage(image,0,0,256,64,0,0,256,64)
                .drawImage(image,256,0,256,64,0,64,256,64)
                .drawImage(image,0,64,256,64,0,128,256,64)
        stitchedSquares = resizeImage(stitchedSquares)
        stitchedCircles = resizeImage(stitchedCircles)

        Classes.load('WARRIOR').UI.TCoords.set(0,0.125,0,0.125)
        Classes.load('MAGE').UI.TCoords.set(0.125,0.25,0,0.125)
        Classes.load('ROGUE').UI.TCoords.set(0.25,0.375,0,0.125)
        Classes.load('DRUID').UI.TCoords.set(0.375,0.5,0,0.125)
        Classes.load('HUNTER').UI.TCoords.set(0.5,0.625,0,0.125)
        Classes.load('SHAMAN').UI.TCoords.set(0.625,0.75,0,0.125)
        Classes.load('PRIEST').UI.TCoords.set(0.75,0.875,0,0.125)
        Classes.load('WARLOCK').UI.TCoords.set(0.875,1,0,0.125)
        Classes.load('PALADIN').UI.TCoords.set(0,0.125,0.125,0.25)
        Classes.load('DEATH_KNIGHT').UI.TCoords.set(0.125,0.25,0.125,0.25)
    }

    let xpos = (index%8)*64;
    let ypos = Math.floor(index/8)*64;

    stitchedSquares.drawImage(image,xpos,ypos,64,64)
    stitchedCircles.drawImage(image,xpos,ypos,64,64)
    // carve out the circle shape
    stitchedCircles.addFilter((c,x,y)=>{
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
    if(stitchedSquares && stitchedCircles) {
        stitchedSquares.writeToAssets('tswow-stdlib',SQUARES_LOCAL)
        stitchedCircles.writeToAssets('tswow-stdlib',CIRCLES_LOCAL)
    }
})