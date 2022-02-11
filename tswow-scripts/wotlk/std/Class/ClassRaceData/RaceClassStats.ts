import { SQL } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { player_levelstatsRow } from "wotlkdata/wotlkdata/sql/types/player_levelstats";
import { MainEntity } from "../../Misc/Entity";
import { ClassRegistry } from "../ClassRegistry";
import { ClassRacePair } from "./ClassRaces";

export class ClassRaceStatsEntry extends MainEntity<player_levelstatsRow> {
    get Race() { return this.wrapReadOnly(this.row.race); }
    get Class() { return ClassRegistry.readOnlyRef(this, this.row.class); }
    get Level() { return this.row.level.get(); }
    get Strength() { return this.wrap(this.row.str); }
    get Agility() { return this.wrap(this.row.agi); }
    get Stamina() { return this.wrap(this.row.sta); }
    get Intellect() { return this.wrap(this.row.inte); }
    get Spirit() { return this.wrap(this.row.spi); }
}

export class ClassRaceStats extends MultiRowSystem<ClassRaceStatsEntry,ClassRacePair> {
    protected getAllRows(): ClassRaceStatsEntry[] {
        return SQL.player_levelstats
            .queryAll({race:this.owner.Race.get(),class:this.owner.Class.get()})
            .map(x=>new ClassRaceStatsEntry(x))
    }
    protected isDeleted(value: ClassRaceStatsEntry): boolean {
        return value.row.isDeleted();
    }
}
