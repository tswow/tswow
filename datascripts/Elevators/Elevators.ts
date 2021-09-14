import { gameobject_templateQuery } from "wotlkdata/sql/types/gameobject_template";
import { KeyFrameCon } from "../GameObject/ElevatorKeyframes";
import { GameObjectTemplates } from "../GameObject/GameObjects";
import { Position } from "../Misc/Position";

const DEFAULT_ELEVATOR_DISPLAY_ID = 455 // undercity
const ELEVATOR_GAMEOBJECT_TYPE = 11;

export const ElevatorRegistry = {
    createLocalTemplate(mod: string, id: string, keyframes: KeyFrameCon[]) {
        return GameObjectTemplates.create(mod,id)
            .Type.Transport.set()
            .Flags.Transport.set(true)
            .Keyframes.addDefault(keyframes)
            .Display.set(DEFAULT_ELEVATOR_DISPLAY_ID)
    },

    createGlobalInstance(mod: string, id: string, keyframes: (Position&{time?:number})[]) {
        let origin = keyframes[0];
        keyframes = keyframes.map(x=>{
            return Object.assign({},x,{
                  x:x.x-origin.x
                , y:x.y-origin.y
                , z:x.z-origin.z
            })
        });
        let template = ElevatorRegistry.createLocalTemplate(mod,id,keyframes)
        let spawn = template.spawn(mod,id,Object.assign({x:0,y:0,z:0,map:0},origin))
        return {Template: template,Spawn: spawn};
    },

    load(id: number) {
        return GameObjectTemplates.find({entry:id,type:ELEVATOR_GAMEOBJECT_TYPE})
            .Type.Transport.as()
    },

    filter(query: gameobject_templateQuery) {
        return GameObjectTemplates
            .filter({...query,type:ELEVATOR_GAMEOBJECT_TYPE})
            .map(x=>x.Type.Transport.set())
    },

    find(query: gameobject_templateQuery) {
        return GameObjectTemplates.find({...query,type:ELEVATOR_GAMEOBJECT_TYPE})
            .Type.Transport.set()
    }
}