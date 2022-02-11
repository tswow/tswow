import { DBC, SQL } from "wotlkdata";
import { getBits, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { CharBaseInfoRow } from "wotlkdata/wotlkdata/dbc/types/CharBaseInfo";
import { MainEntity } from "../../Misc/Entity";
import { Ids } from "../../Misc/Ids";
import { RaceMask } from "../../Race/RaceType";
import { Class } from "../Class";
import { DefaultClassRaces, getDefaultClass, getDefaultRace } from "../ClassDefaultRaces";
import { ClassRegistry } from "../ClassRegistry";
import { ClassRaceActions } from "./ClassRaceAction";
import { ClassRaceSpawn } from "./ClassRaceSpawn";
import { StartGearRef } from "./ClassRaceStartGear";
import { ClassRaceStats } from "./RaceClassStats";

export class ClassRacePair extends MainEntity<CharBaseInfoRow> {
    get Race() { return this.wrapReadOnly(this.row.RaceID); }
    get Class() { return ClassRegistry.readOnlyRef(this, this.row.ClassID); }
    get SpawnPosition() { return new ClassRaceSpawn(this); }
    get Stats() { return new ClassRaceStats(this); }
    get Outfits() {
        return new StartGearRef(this, this.Class.get(), this.Race.get());
    }
    get Actions() {
        return new ClassRaceActions(this, this.Class.get(),this.Race.get());
    }
}

export class ClassRaces extends MultiRowSystem<ClassRacePair,Class> {
    protected getAllRows(): ClassRacePair[] {
        return DBC.CharBaseInfo.queryAll({ClassID:this.owner.ID})
            .map(x=>new ClassRacePair(x))
    }
    protected isDeleted(value: ClassRacePair): boolean {
        return value.row.isDeleted();
    }

    delete(races: MaskCon<keyof typeof RaceMask>) {
        getBits(RaceMask,races).forEach(x=>{
            DBC.CharBaseInfo.query({ClassID:this.owner.ID,RaceID:x+1})
                .delete();
        })
        return this.owner;
    }

    add(races: MaskCon<keyof typeof RaceMask>) {
        // Is base class
        getBits(RaceMask,races).forEach(raceid=>{
            raceid = raceid + 1;
            if(this.owner.ID <= 11) {
                let found = false;
                for(const {race,cls} of Object.values(DefaultClassRaces)) {
                    if(race==raceid && cls == this.owner.ID) {
                        found = true;
                        break;
                    }
                }
                if(found) {
                    return;
                }
            }

            const {race: oldRace,cls} = getDefaultRace(raceid,this.owner.BaseClass);

            SQL.player_levelstats
                .queryAll({class: cls, race: oldRace})
                .forEach(x=>x.clone(raceid,this.owner.ID,x.level.get()));

            DBC.CharStartOutfit
                .queryAll({ClassID: cls, RaceID: oldRace})
                .forEach(x=>x.clone(Ids.CharStartOutfit.id())
                    .ClassID.set(this.owner.ID)
                    .RaceID.set(raceid))

            // By default, the classes should come from here.
            try {
                const defaultClass = getDefaultClass(raceid);
                SQL.playercreateinfo.query({race: raceid, class: defaultClass})
                    .clone(raceid, this.owner.ID)
            } catch(err) {
                try {
                    // pick a random race for this class
                    SQL.playercreateinfo.query({class: this.owner.ID})
                        .clone(raceid, this.owner.ID)
                } catch(err) {
                    try {
                        // pick a random race for our parent class
                        SQL.playercreateinfo.query({class: this.owner.BaseClass})
                            .clone(raceid, this.owner.ID)
                    } catch(err) {
                        // if parent class for some reason has no entries, just use human warrior as a base
                        SQL.playercreateinfo.query({class: 1, race: 1})
                            .clone(raceid, this.owner.ID)
                    }
                }
            }
            DBC.CharBaseInfo.add(raceid,this.owner.ID);
        })

        return this.owner;
    }
};