import { DBC, SQL } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { any, eq } from "wotlkdata/query/Relations";
import { Ids } from "../Misc/Ids";
import { getRaceType, RaceType, resolveRaceType } from "../Race/RaceType";
import { Class } from "./Class";
import { DefaultClassRaces, getDefaultClass, getDefaultRace } from "./ClassDefaultRaces";

export class ClassRaces extends CellSystem<Class> {
    get(): RaceType[] {
        return DBC.CharBaseInfo.filter({
            ClassID:this.owner.ID
        }).map(x=>getRaceType(x.RaceID.get()));
    }

    remove(races: RaceType[]) {
        DBC.CharBaseInfo.filter({
              ClassID:this.owner.ID
            , RaceID:any(...races.map(x=>eq(resolveRaceType(x))))})
            .forEach(x=>x.delete());
        return this.owner;
    }

    add(races: RaceType[]) {
        // Is base class
        for(let raceType of races) {
            const raceid = resolveRaceType(raceType);

            if(this.owner.ID <= 11) {
                let found = false;
                for(const {race,cls} of Object.values(DefaultClassRaces)) {
                    if(race==raceid && cls == this.owner.ID) {
                        found = true;
                        break;
                    }
                }
                if(found) {
                    continue;
                }
            }

            const {race: oldRace,cls} = getDefaultRace(raceid,this.owner.BaseClass);

            SQL.player_levelstats
                .filter({class: cls, race: oldRace})
                .forEach(x=>x.clone(raceid,this.owner.ID,x.level.get()));

            DBC.CharStartOutfit
                .filter({ClassID: cls, RaceID: oldRace})
                .forEach(x=>x.clone(Ids.CharStartOutfit.id())
                    .ClassID.set(this.owner.ID)
                    .RaceID.set(raceid))

            // By default, the classes should come from here.
            const defaultClass = getDefaultClass(raceid);
            SQL.playercreateinfo.find({race: raceid, class: defaultClass})
                .clone(raceid, this.owner.ID)

            DBC.CharBaseInfo.add(raceid,this.owner.ID);
        }
        return this.owner;
    }
};