import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Achievement_CriteriaCreator, Achievement_CriteriaRow } from "wotlkdata/dbc/types/Achievement_Criteria";
import { Ids } from "../Misc/Ids";
import { Achievement } from "./Achievement";

export class AchievementCriteria extends CellSystem<Achievement> {
    protected criteria: Achievement_CriteriaRow[] = [];

    protected addCriteria(mod : string,criteriaId: string, c?: Achievement_CriteriaCreator) {
        const crit = DBC.Achievement_Criteria
            .add(Ids.Achievement_Criteria.id(mod,criteriaId),c)
        crit.Achievement_Id.set(this.owner.row.ID.get());
        this.criteria.push(crit);
        return crit;
    }

    protected addSimpleCriteria(mod : string, id : string, type : number,assetId : number, quantity : number) {
        const idgen = Ids.Achievement_Criteria.id(mod,id);
        const crit = DBC.Achievement_Criteria.add(idgen,{
            Achievement_Id: this.owner.row.ID.get(),
            Timer_Asset_Id:0,
            Timer_Time:0,
            Fail_Asset:0,
            Fail_Event:0,
            Flags:0,
            Start_Asset:0,
            Start_Event:0,
            Description:{},
            Timer_Start_Event:0,
            Ui_Order:0,
            Asset_Id:assetId,
            Type:type,
            Quantity:quantity
        });
        this.criteria.push(crit);
        return this.owner;
    }

    constructor(owner: Achievement) {
        super(owner);
        this.criteria = DBC.Achievement_Criteria
            .filter({Achievement_Id:this.owner.row.ID.get()})
    }

        /** TODO: UNTESTED */
        addCharacterLevel(mod : string, id: string, level : number) {
            return this.addSimpleCriteria(mod,id,0,5,level);
        }
        
        /** TODO: UNTESTED */
        addZoneQuestCount(mod: string, id: string, areaId : number,questCount : number) {
            return this.addSimpleCriteria(mod,id,11,areaId,questCount);
        }
    
        /** TODO: UNTESTED */
        addQuestCount(mod : string, id : string, questCount : number) {
            return this.addSimpleCriteria(mod,id,9,0,questCount);
        }
    
        /** TODO: UNTESTED */
        addDailyQuestCount(mod : string, id : string, questCount : number) {
            return this.addSimpleCriteria(mod,id,10,0,questCount);
        }
    
        /** TODO: UNTESTED */
        addDieInMap(mod : string, id : string, mapId : number) {
            return this.addSimpleCriteria(mod,id,16,mapId,0);
        }
    
        /** TODO: UNTESTED */
        addDieInDungeon(mod : string, id : string, manLimit : number) {
            return this.addSimpleCriteria(mod,id,16,manLimit,0);
        }
    
        /** TODO: UNTESTED */
        addCompleteQuest(mod : string, id : string, questId : number) {
            return this.addSimpleCriteria(mod,id,27,questId,1);
        }
        
        /** TODO: UNTESTED */    
        addHonorableKills(mod : string, id : string, area : number, killCount : number) {
            return this.addSimpleCriteria(mod,id,31,area,killCount);
        }
    
        /** TODO: UNTESTED */
        learnSpell(mod : string, id : string, spell: number) {
            return this.addSimpleCriteria(mod,id,34,spell,0);
        }
    
        /**
         * TODO: UNTESTED
         * @param level Not total skill level, but the TYPE of upgrade (Apprentice=1, Journeyman=2 etc.)
         */
        learnSkilllevel(mod : string, id : string, skillId : number, level : 'Apprentice'|'Journeyman'|'Expert'|'Artisan'|'Master'|'Grandmaster'|number) {
            if(typeof(level)=='string') {
                level = {
                    'Apprentice':1,
                    'Journeyman':2,
                    'Expert':3,
                    'Artisan':4,
                    'Master':5,
                    'Grandmaster':6
                }[level];
            }
            return this.addSimpleCriteria(mod,id,40,skillId,level);
        }
        
        /**
         * TODO: UNTESTED
         * @param area ref to WorldMapOverlay.dbc
         */
        exploreArea(mod : string, id : string, area : number) {
            return this.addSimpleCriteria(mod,id,43,area,0);
        }
    
        /**
         * TODO: UNTESTED
         * @param title NOT a ref to CharTitles.dbc
         */
        ownRank(mod : string, id : string, title : number) {
            return this.addSimpleCriteria(mod,id,44,title,0);
        }
    
        /**
         * TODO: UNTESTED
         * @param faction Ref to Factions.dbc
         * @param amount total amount of reputation
         */
        gainReputation(mod : string, id : string, faction : number, amount : number) {
            return this.addSimpleCriteria(mod,id,45,faction,amount);
        }
    
        /** TODO: UNTESTED */
        gainExaltedReputation(mod : string, id : string, amount : number) {
            return this.addSimpleCriteria(mod,id,45,0,amount);
        }
    
        /** TODO: UNTESTED */
        honorableKillsAgainstClass(mod : string, id : string, clazz : number, amount : number) {
            return this.addSimpleCriteria(mod,id,52,clazz,amount);
        }
    
        /** TODO: UNTESTED */
        honorableKillsAgainstRace(mod : string, id : string, race: number, amount : number) {
            return this.addSimpleCriteria(mod,id,53,race,amount);
        }
    
        /** TODO: UNTESTED */
        equipItem(mod: string, id: string, itemId : number, itemCount : number) {
            return this.addSimpleCriteria(mod,id,57,itemId,itemCount);
        }
    
        /** TODO: UNTESTED */
        lootMoney(mod : string, id : string, copper : number) {
            return this.addSimpleCriteria(mod,id,67,0,copper);
        }
    
        /** TODO: UNTESTED */
        useGameObject(mod:  string, id: string, gameObjectId : number, useCount : number) {
            return this.addSimpleCriteria(mod,id,68,gameObjectId,useCount);
        }
    
        /** TODO: UNTESTED */
        fishInGameObject(mod: string, id: string, gameObjectEntry: number, lootCount: number) {
            return this.addSimpleCriteria(mod,id,72,gameObjectEntry,lootCount);
        }
    
        /** TODO: UNTESTED */
        learnSkillineSpells(mod: string, id: string, skillLine: number, spellCount: number) {
            return this.addSimpleCriteria(mod,id,75,skillLine,spellCount);
        }
    
        /** TODO: UNTESTED */
        winDuels(mod: string, id: string, count: number) {
            return this.addSimpleCriteria(mod,id,75,0,count);
        }
    
        /** TODO: UNTESTED */
        highestPower(mod : string, id : string, powerType : number, count : number) {
            return this.addSimpleCriteria(mod,id,96,powerType,count);
        }
    
        /** TODO: UNTESTED */
        highestStat(mod : string, id : string, statType: 'spirit'|'int'|'stamina'|'agi'|'str'|number, count : number) {
            if(typeof(statType)=='string') {
                statType = {
                    'str':0,
                    'agi':1,
                    'stamina':2,
                    'int':3,
                    'spirit':4
                }[statType];
            }
            return this.addSimpleCriteria(mod,id,97,statType,count);
        }
    
        /**
         * TODO: UNTESTED 
         * @param school TODO what ref?
         */
        highestSpellPower(mod : string, id : string, school: number, count : number) {
            return this.addSimpleCriteria(mod,id,98,school,count);
        }
    
        /**
         * TODO: UNTESTED
         * @param ratingType TODO: Ref to what?
         */
        highestRating(mod: string, id: string, ratingType: number, count : number) {
            return this.addSimpleCriteria(mod,id,100,ratingType,count);
        }
    
        /** TODO: UNTESTED */
        lootType(mod: string, id: string, lootType: 'fishing'|'pickpocket'|'disenchant', count : number) {
            const lootId = {
                'fishing':3,
                'pickpocket':2,
                'disenchant':1
            }[lootType]
            return this.addSimpleCriteria(mod,id,109,lootId,count);
        }
    
        /** TODO: UNTESTED */
        learnSkillLine(mod: string, id: string, skillLine: number, spellCount: number) {
            return this.addSimpleCriteria(mod,id,112,skillLine,spellCount);
        }
    
        /** TODO: UNTESTED */
        earnHonorableKill(mod: string, id: string, count: number) {
            return this.addSimpleCriteria(mod,id,113,0,count);
        }
    
        /** TODO: UNTESTED */
        addKillCreature(mod : string, criteriaId : string, creatureId : number, killCount : number) {
            this.addCriteria(mod,criteriaId,{Type:0,Asset_Id:creatureId,Quantity:killCount});
            return this.owner;
        }
    
        /** TODO: UNTESTED */
        addWinBG(mod : string, criteriaId : string, map : number, winCount : number) {
            this.addCriteria(mod,criteriaId,{Type:1,Asset_Id:map,Quantity:winCount});
            return this.owner;
        }
}