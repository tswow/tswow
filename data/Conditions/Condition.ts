import { SQL } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { conditionsCreator } from "wotlkdata/sql/types/conditions";
import { ClassType, resolveClassType } from "../Class/ClassType";
import { RaceType, resolveRaceType } from "../Race/RaceType";

export type ReputationRanks =
    'HATED' | 'HOSTILE' | 'UNFRIENDLY' | 'NEUTRAL' | 'FRIENDLY' | 'HONORED' | 'REVERED' | 'EXALTED'

/**
 * TODO: Unfinished, finish this
 */
export class Condition<T> extends Subsystem<T> {
    protected state: conditionsCreator = {};

    private addRow(type: number, group: number, value1: number = 0, value2: number = 0, value3: number = 0) {
        SQL.conditions.add(this.sourceType, this.sourceGroup, 
            this.sourceEntry, this.sourceId, group,
            type, 0, value1, value2, value3).Comment.set('tswow')
        return this.owner;
    }

    private sourceType: number;
    private sourceGroup: number;
    private sourceEntry: number;
    private sourceId: number;

    constructor(owner: T, sourceType: number, sourceGroup: number, sourceEntry: number, sourceId: number) {
        super(owner);
        this.sourceType = sourceType;
        this.sourceGroup = sourceGroup;
        this.sourceEntry = sourceEntry;
        this.sourceId = sourceId;
    }

    addHasAura(spelLId: number, effectIndex: number, group = 0) {
        return this.addRow(1,group,spelLId,effectIndex);
    }

    addHasItem(item: number, count: number, inBank: boolean = false, group = 0) {
        return this.addRow(2,group,item,count,inBank ? 1 : 0);
    }

    addHasItemEquipped(item: number, group = 0) {
        return this.addRow(3,group,item);
    }

    addZoneId(zone: number, group = 0) {
        return this.addRow(4,group,zone);
    }

    addReputationRank(factionTemplate: number, ranks: ReputationRanks[], group = 0) {
        let num = 0;
        for(let rank of ranks) {
            switch(rank) {
                case 'HATED':
                    num+=1;
                    break;
                case 'HOSTILE':
                    num+=2;
                    break;
                case 'UNFRIENDLY':
                    num+=4;
                    break;
                case 'NEUTRAL':
                    num+=8;
                    break;
                case 'FRIENDLY':
                    num+=16;
                    break;
                case 'HONORED':
                    num+=32;
                    break;
                case 'REVERED':
                    num+=64;
                    break;
                case 'EXALTED':
                    num+=128;
                    break;
            }
        }
        return this.addRow(5, group, factionTemplate, num);
    }

    addIsTeam(team: 'HORDE'|'ALLIANCE', group = 0) {
        return this.addRow(6, group, team === 'HORDE' ? 67 : 469);
    }

    /**
     * @param skillLine DBC.SkillLine#ID
     * @param rankValue 1-450
     */
    addSkill(skillLine: number, rankValue: number, group = 0) {
        this.addRow(7, group, skillLine, rankValue);
    }

    addFinishedQuest(questId: number, group = 0) {
        return this.addRow(8, group, questId);
    }

    addStartedQuest(questId: number, group = 0) {
        return this.addRow(9, group, questId);
    }

    addIsDrunk(state : 'SOBER'|'TIPSY'|'DRUNK'|'SMASHED', group = 0) {
        switch(state) {
            case 'SOBER': return this.addRow(10,group,0);
            case 'TIPSY': return this.addRow(10,group,1);
            case 'DRUNK': return this.addRow(10,group,2);
            case 'SMASHED': return this.addRow(10,group,3);
            default: throw new Error(`Invalid drunk state ${state}`);
        }
    }

    addWorldState(index: number, value: number, group = 0) {
        return this.addRow(11, group,index, value);
    }

    /**
     * @param entry SQL.game_event#entry
     */
    addActiveEvent(entry: number, group = 0) {
        return this.addRow(12, group,entry);
    }

    addInstanceInfo(entry: number, data: number, group = 0) {
        return this.addRow(13, group, entry, data);
    }

    addQuestNone(quest: number, group = 0) {
        return this.addRow(14, group, quest);
    }

    addIsClass(cls: ClassType, group = 0) {
        return this.addRow(15, group, resolveClassType(cls));
    }

    addIsRace(race: RaceType, group = 0) {
        return this.addRow(16, group, resolveRaceType(race));
    }

    /**
     * @param id DBC.Achievement#ID
     */
    addHasAchievement(id: number, group = 0) {
        return this.addRow(17, group, id);
    }

    /**
     * @param id DBC.CharTitles#ID
     */
    addHasTitle(id: number, group = 0) {
        return this.addRow(18, group, id);
    }

    addGender(gender: 'MALE'|'FEMALE'|'NONE', group = 0) {
        switch(gender) {
            case 'MALE': return this.addRow(20, group, 0);
            case 'FEMALE': return this.addRow(20, group, 1);
            case 'NONE': return this.addRow(20, group, 2);
            default: throw new Error(`Invalid gender: ${gender}`)
        }
    }

    /**
     * @param state enum from Unit.h
     */
    addUnitState(state: number, group = 0) {
        return this.addRow(21, group, state);
    }

    addMapId(mapid: number, group = 0) {
        return this.addRow(22, group, mapid);
    }

    addAreaId(areaId: number, group = 0) {
        return this.addRow(23, group, areaId);
    }

    addCreatureType(type: number, group = 0) {
        return this.addRow(24, group, type);
    }

    addHasSpell(id: number, group = 0) {
        return this.addRow(25, group, id);
    }

    addInPhase(phasemask: number, group = 0) {
        return this.addRow(26, group, phasemask);
    }

    addLevel(level: number, group = 0) {
        return this.addRow(27, group, level);
    }

    addQuestComplete(questId: number, group = 0) {
        return this.addRow(28, group, questId);
    }

    addNearCreature(creatureId: number, group = 0) {
        return this.addRow(29, group, creatureId);
    }

    addNearGameObject(creatureId: number, group = 0) {
        return this.addRow(30, group, creatureId);
    }

    addObjectEntry(typeId: number, id: number, group = 0) {
        return this.addRow(31, group, typeId, id);
    }
}