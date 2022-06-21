import { finish } from "../../../../data";
import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { DBC } from "../../../DBCFiles";
import { LUAXML } from "../../../luaxml/LUAXML";
import { SQL } from "../../../SQLFiles";
import { ClassRacePair } from "./ClassRaces";

export class ClassRaceRunes extends CellSystem<ClassRacePair> {
    set(enabled: boolean) {
        console.log(`Setting ${enabled}`)
        let row = SQL.class_has_runes.query({classID:this.owner.Class.get(),raceID:this.owner.Race.get()});
        if(enabled) {
            if(!row) {
                row = SQL.class_has_runes.add(this.owner.Class.get(),this.owner.Race.get());
            }
            row.undelete();
        } else {
            if(row) {
                row.delete();
            }
        }
    }

    get() {
        let row = SQL.class_has_runes.query({classID:this.owner.Class.get(),raceID:this.owner.Race.get()});
        return row && !row.isDeleted();
    }
}

finish('class-has-runes', () => {
    LUAXML.file('Interface/FrameXML/RuneFrame.lua')
        .replace('	local _, class = UnitClass("player")'
    ,'	local _,class_id = UnitClass("player");\n	local _,race_id = UnitRace("player");')

    let classFilenameMap: {[key: number]: string} = {}
    let raceNameMap: {[key: number]: string} = {}
    
    DBC.ChrRaces.queryAll({}).forEach(x=>{
        raceNameMap[x.ID.get()] = x.Name.enGB.get()
    })

    DBC.ChrClasses.queryAll({}).forEach(x=>{
        classFilenameMap[x.ID.get()] = x.Filename.get()
    })

    let perClass: {[key: string]: string[]}= {}
    SQL.class_has_runes.queryAll({}).forEach(x=>{
        if(x.isDeleted()) {
            return;
        }
        let classFile = classFilenameMap[x.classID.get()]
        let raceName = raceNameMap[x.raceID.get()]
        if(!classFile || !raceName) {
            return;
        }
        if(!perClass[classFile]) {
            perClass[classFile] = []
        }
        perClass[classFile].push(raceName)
    })
    
    LUAXML.file('Interface/FrameXML/RuneFrame.lua')
        .replace('	if ( class ~= "DEATHKNIGHT" ) then'
        , `	if (not (${Object.entries(perClass).map(([cls,races])=>`(class_id == "${cls}" and (${races.map(race=>`race_id == "${race}"`).join(' or ')}))`).join(' or ')})) then`
        )
});