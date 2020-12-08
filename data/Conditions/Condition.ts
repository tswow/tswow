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

    private addRow(type: number, value1: number = 0, value2: number = 0, value3: number = 0) {
        SQL.conditions.add(this.sourceType, this.sourceGroup, 
            this.sourceEntry, this.sourceId, this.elseGroup,
            type, 0, value1, value2, value3)
        return this.owner;
    }

    private sourceType: number;
    private sourceGroup: number;
    private sourceEntry: number;
    private sourceId: number;
    private elseGroup: number;

    constructor(owner: T, sourceType: number, sourceGroup: number, sourceEntry: number, sourceId: number, elseGroup: number) {
        super(owner);
        this.sourceType = sourceType;
        this.sourceGroup = sourceGroup;
        this.sourceEntry = sourceEntry;
        this.sourceId = sourceId;
        this.elseGroup = elseGroup;
    }

    addHasAura(spelLId: number, effectIndex: number) {
        return this.addRow(1,spelLId,effectIndex);
    }

    addHasItem(item: number, count: number, inBank: boolean = false) {
        return this.addRow(2,item,count,inBank ? 1 : 0);
    }

    addHasItemEquipped(item: number) {
        return this.addRow(3,item);
    }

    addZoneId(zone: number) {
        return this.addRow(4,zone);
    }

    addReputationRank(factionTemplate: number, ranks: ReputationRanks[]) {
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
        return this.addRow(5, factionTemplate, num);
    }

    addIsTeam(team: 'HORDE'|'ALLIANCE') {
        return this.addRow(6, team === 'HORDE' ? 67 : 469);
    }

    /**
     * @param skillLine DBC.SkillLine#ID
     * @param rankValue 1-450
     */
    addSkill(skillLine: number, rankValue: number) {
        this.addRow(7, skillLine, rankValue);
    }

    addFinishedQuest(questId: number) {
        return this.addRow(8, questId);
    }

    addStartedQuest(questId: number) {
        return this.addRow(9, questId);
    }

    addIsDrunk(state : 'SOBER'|'TIPSY'|'DRUNK'|'SMASHED') {
        switch(state) {
            case 'SOBER': return this.addRow(10,0);
            case 'TIPSY': return this.addRow(10,1);
            case 'DRUNK': return this.addRow(10,2);
            case 'SMASHED': return this.addRow(10,3);
            default: throw new Error(`Invalid drunk state ${state}`);
        }
    }

    addWorldState(index: number, value: number) {
        return this.addRow(11,index, value);
    }

    /**
     * @param entry SQL.game_event#entry
     */
    addActiveEvent(entry: number) {
        return this.addRow(12,entry);
    }

    addInstanceInfo(entry: number, data: number) {
        return this.addRow(13, entry, data);
    }

    addQuestNone(quest: number) {
        return this.addRow(14, quest);
    }

    addIsClass(cls: ClassType) {
        return this.addRow(15, resolveClassType(cls));
    }

    addIsRace(race: RaceType) {
        return this.addRow(16, resolveRaceType(race));
    }

    /**
     * @param id DBC.Achievement#ID
     */
    addHasAchievement(id: number) {
        return this.addRow(17, id);
    }

    /**
     * @param id DBC.CharTitles#ID
     */
    addHasTitle(id: number) {
        return this.addRow(18, id);
    }

    /**
     * @param mask Creature#spawnMask | Gameobject#spawnMask
     */
    addSpawnMask(mask: number) {
        return this.addRow(19);
    }

    addGender(gender: 'MALE'|'FEMALE'|'NONE') {
        switch(gender) {
            case 'MALE': return this.addRow(20, 0);
            case 'FEMALE': return this.addRow(20, 1);
            case 'NONE': return this.addRow(20, 2);
            default: throw new Error(`Invalid gender: ${gender}`)
        }
    }

    /**
     * @param state enum from Unit.h
     */
    addUnitState(state: number) {
        return this.addRow(21, state);
    }

    addMapId(mapid: number) {
        return this.addRow(22, mapid);
    }

    addAreaId(areaId: number) {
        return this.addRow(23, areaId);
    }

    addCreatureType(type: number) {
        return this.addRow(24, type);
    }

    addHasSpell(id: number) {
        return this.addRow(25, id);
    }

    addInPhase(phasemask: number) {
        return this.addRow(26, phasemask);
    }

    addLevel(level: number) {
        return this.addRow(27, level);
    }

    addQuestComplete(questId: number) {
        return this.addRow(28, questId);
    }

    addNearCreature(creatureId: number) {
        return this.addRow(29, creatureId);
    }

    addNearGameObject(creatureId: number) {
        return this.addRow(30, creatureId);
    }

    addObjectEntry(typeId: number, id: number) {
        return this.addRow(31, typeId, id);
    }
}
