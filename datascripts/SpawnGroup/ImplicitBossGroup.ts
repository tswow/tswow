import { finish } from "wotlkdata";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { CreatureInstance } from "../Creature/CreatureInstance";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { GameObjectInstance } from "../GameObject/GameObjectInstance";
import { Ids } from "../Misc/Ids";
import { BossStateMask, SpawnGroupBossFlags } from "./SpawnGroupBosses";

interface ImplicitBossState {
    map: number
    boss: number
    statemask: number
    flags: number
}

export const implicitCreatureGroups
    : {[key: number]: {id: number, value: ImplicitBossState}} = {}

export const implicitGameObjectGroups
    : {[key: number]: {id: number, value: ImplicitBossState}} = {}

export class ImplicitBossStateEntity<T> extends CellSystem<T> {
    protected state: ImplicitBossState;
    constructor(owner: T, state: ImplicitBossState) {
        super(owner);
        this.state = state;
    }

    get Map() {
        return new CellBasic(
              this.owner
            , ()=>this.state.map
            , (map)=>this.state.map = map
        )
    }

    get Boss() {
        return new CellBasic(
              this.owner
            , ()=>this.state.boss
            , (boss)=>this.state.boss = boss
        )
    }

    get StateMask() {
        return makeMaskCell32(BossStateMask,this.owner,
            new CellBasic(
                this.owner
                , ()=>this.state.statemask
                , (boss)=>this.state.statemask = boss
            )
        )
    }

    get Flags() {
        return makeMaskCell32(SpawnGroupBossFlags,this.owner,
            new CellBasic(
                this.owner
                , ()=>this.state.flags
                , (flags)=>this.state.flags = flags
            )
        )
    }
}

export function implicitCreatureState(creature: CreatureInstance) {
    return new ImplicitBossStateEntity(creature,
        (
            implicitCreatureGroups[creature.ID]
            ||
            (implicitCreatureGroups[creature.ID]
                = {id:creature.ID,value:{boss:0,flags:0,map:0,statemask:0}}
            )
        ).value
    )
}

export function implicitGameObjectState(gobj: GameObjectInstance) {
    return new ImplicitBossStateEntity(gobj,
        (
            implicitGameObjectGroups[gobj.ID]
            ||
            (implicitGameObjectGroups[gobj.ID]
                = {id:gobj.ID,value:{boss:0,flags:0,map:0,statemask:0}}
            )
        ).value
    )
}

finish('implicit-boss-states', ()=>{
    const generatedGroups: {[key: string]: {
          state: ImplicitBossState,
          values: {type: number, id: number}[]
    }}= {}

    const creatureList = Object
        .values(implicitCreatureGroups)
        .map(value=>({id:value.id,type:0,value:value.value}))
    const gobjList = Object
        .values(implicitGameObjectGroups)
        .map((value)=>({id:value.id,type:1,value:value.value}))

    creatureList.concat(gobjList).forEach(x=>{
        const key = `${x.value.boss}:${x.value.flags}:${x.value.map}:${x.value.statemask}`
        let group = (generatedGroups[key]||(generatedGroups[key]
            = {state: x.value, values:[]}));
        group.values.push({type:x.type,id:x.id})
    })

    Object.values(generatedGroups)
        .forEach((x,i)=>{
            const spawnGroup = SQL.spawn_group_template
                .add(Ids.spawn_group_templates.dynamicId())
                .groupName.set(`Generated group ${i}`)
                .groupFlags.set(0)

            SQL.instance_spawn_groups
                .add(x.state.map,x.state.boss,spawnGroup.groupId.get(),x.state.statemask)
                .flags.set(x.state.flags)

            x.values.forEach(x=>{
                SQL.spawn_group.add(
                    spawnGroup.groupId.get(),x.type,x.id
                )
            })
        })
});