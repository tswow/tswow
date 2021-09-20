import { Cell } from "wotlkdata/cell/cells/Cell";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { gameobject_templateQuery, gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";
import { Table } from "wotlkdata/table/Table";
import { KeyFrameCon } from "../GameObject/ElevatorKeyframes";
import { GameObjectTemplates } from "../GameObject/GameObjects";
import { GameObjectPlain, GameObjectTransport } from "../GameObject/GameObjectTemplate";
import { Position } from "../Misc/Position";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";

const DEFAULT_ELEVATOR_DISPLAY_ID = 455 // undercity
const ELEVATOR_GAMEOBJECT_TYPE = 11;

export class ElevatorRegistryClass
    extends RegistryRowBase<
          GameObjectTransport
        , gameobject_templateRow
        , gameobject_templateQuery
    >
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Entity(r: gameobject_templateRow): GameObjectTransport {
        return new GameObjectPlain(r).Type.Transport.as();
    }
    protected FindByID(id: number): gameobject_templateRow {
        return SQL.gameobject_template.find({entry:id});
    }
    protected EmptyQuery(): gameobject_templateQuery {
        return {}
    }
    protected ID(e: GameObjectTransport): number {
        return e.ID
    }
    protected Table(): Table<any, gameobject_templateQuery, gameobject_templateRow> {
        return SQL.gameobject_template
    }

    createLocalTemplate(mod: string, id: string, keyframes: KeyFrameCon[]) {
        return GameObjectTemplates.create(mod,id)
            .Type.Transport.set()
            .Flags.Transport.set(true)
            .Keyframes.addDefault(keyframes)
            .Display.set(DEFAULT_ELEVATOR_DISPLAY_ID)
    }

    createGlobalInstance(mod: string, id: string, keyframes: (Position&{time?:number})[]) {
        let origin = keyframes[0];
        keyframes = keyframes.map(x=>{
            return Object.assign({},x,{
                  x:x.x-origin.x
                , y:x.y-origin.y
                , z:x.z-origin.z
            })
        });
        let template = this.createLocalTemplate(mod,id,keyframes)
        let spawn = template.spawn(mod,id,Object.assign({x:0,y:0,z:0,map:0},origin))
        return {Template: template,Spawn: spawn};
    }
}

export const ElevatorRegistry = new ElevatorRegistryClass();