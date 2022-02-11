import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { Transient, TransientOn } from "../../../data/cell/serialization/Transient";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { DBC } from "../../DBCFiles";
import { TransportAnimationRow } from "../../dbc/TransportAnimation";
import { TransportRotationRow } from "../../dbc/TransportRotation";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionXYZCell } from "../Misc/PositionCell";
import { GameObjectElevator } from "./GameObjectTemplate";

export class CellBasic<D extends CPrim,O> extends Cell<D,O> {
    private getter: ()=>D;
    private setter: (value:D)=>void;

    constructor(owner: O, get: ()=>D, set: (value: D)=>void) {
        super(owner);
        this.getter = get;
        this.setter = set;
    }

    get(): D {
        return this.getter();
    }
    set(value: D): O {
        this.setter(value);
        return this.owner;
    }
}

export abstract class MaybeCell<C extends CPrim,T,O> extends Cell<C,O> {
    protected accessor: (value: T)=>Cell<C,any>

    constructor(owner: O, accessor: (value: T)=>Cell<C,any>) {
        super(owner);
        this.accessor = accessor;
    }

    set(value: C) {
        this.accessor(this.get_field() || this.create()).set(value);
        return this.owner;
    }

    get(): C {
        let field = this.get_field();
        if(!field) {
            return this.default();
        }
        return this.accessor(field).get();
    }

    protected abstract get_field(): T|undefined;
    protected abstract create(): T;
    abstract default(): C;
}

export class RotationRowCell extends MaybeCell<number,TransportRotationRow,ElevatorKeyframe> {
    default(): number {
        return 0;
    }

    exists(): boolean {
        return this.owner.rotation_row !== undefined;
    }

    protected get_field(): TransportRotationRow | undefined {
        return this.owner.rotation_row;
    }

    create() {
        if(this.owner.rotation_row && this.owner.rotation_row.isDeleted()) {
            this.owner.rotation_row.undelete();
            return this.owner.rotation_row;
        }
        return DBC.TransportRotation.add(Ids.TransportRotation.id())
            .TimeIndex.set(this.owner.Time.get())
            .GameObjectsID.set(this.owner.GOTemplate.get())
            .RotW.set(1)
            .RotX.set(0)
            .RotY.set(0)
            .RotZ.set(0)
            .TimeIndex.set(this.owner.Time.get())
    }
}

export class ElevatorRotation extends CellSystem<ElevatorKeyframe> {
    get X() { return new RotationRowCell(this.owner, (x)=>x.RotX)}
    get Y() { return new RotationRowCell(this.owner, (x)=>x.RotY)}
    get Z() { return new RotationRowCell(this.owner, (x)=>x.RotZ)}
    get W() { return new RotationRowCell(this.owner, (x)=>x.RotW)}

    set(x: number, y: number, z: number, w: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        this.W.set(w);
        return this.owner;
    }
}

export class TranslationRowCell extends MaybeCell<number,TransportAnimationRow,ElevatorKeyframe> {
    default(): number {
        return 0;
    }

    protected get_field(): TransportAnimationRow | undefined {
        return this.owner.translation_row;
    }

    create() {
        if(this.owner.translation_row&& this.owner.translation_row.isDeleted()) {
            this.owner.translation_row.undelete();
            return this.owner.translation_row;
        }
        return DBC.TransportAnimation.add(Ids.TransportRotation.id())
            .TimeIndex.set(this.owner.Time.get())
            .TransportID.set(this.owner.GOTemplate.get())
            .PosX.set(0)
            .PosY.set(0)
            .PosZ.set(0)
    }
}

export class ElevatorTranslation extends CellSystem<ElevatorKeyframe> {
    get X() { return new TranslationRowCell(this.owner, (x)=>x.PosX)}
    get Y() { return new TranslationRowCell(this.owner, (x)=>x.PosY)}
    get Z() { return new TranslationRowCell(this.owner, (x)=>x.PosZ)}

    set(x: number, y: number, z: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        return this.owner;
    }
}

export class ElevatorSequenceKeyframe extends MainEntity<TransportAnimationRow> {
    get Sequence() { return this.wrap(this.row.SequenceID); }
    get GOTemplate() { return this.wrap(this.row.TransportID); }
    get Position() { return new PositionXYZCell(this, this.row.PosX, this.row.PosY,this.row.PosZ); }
    get Time() { return this.wrap(this.row.TimeIndex); }
}

export class ElevatorKeyframe extends CellSystemTop {
    @Transient
    private _rotation_row: TransportRotationRow|undefined

    @Transient
    private _translation_row: TransportAnimationRow|undefined

    @Transient
    protected gameobject: number;

    @Transient
    protected time: number;

    constructor(
            gameobject: number
            , time: number
            , rotation?: TransportRotationRow
            , translation?: TransportAnimationRow
        ) {
        super();
        this.gameobject = gameobject;
        this.time = time;
        this._rotation_row = rotation;
        this._translation_row = translation;
    }

    @Transient
    get rotation_row(): TransportRotationRow|undefined {
        return (this._rotation_row
            && this._rotation_row.TimeIndex.get() == this.time
            && this._rotation_row.GameObjectsID.get() == this.GOTemplate.get()
            )
            ? this._rotation_row
            : ( this._rotation_row =
                    DBC.TransportRotation
                        .query({GameObjectsID:this.GOTemplate.get(),TimeIndex:this.time})
            )
    }

    @Transient
    get translation_row(): TransportAnimationRow|undefined {
        return (this._translation_row
            && this._translation_row.TimeIndex.get() == this.time
            && this._translation_row.TransportID.get() == this.gameobject
            && this._translation_row.SequenceID.get() == 0
            )
            ? this._translation_row
            : ( this._translation_row =
                    DBC.TransportAnimation
                        .query({TransportID:this.GOTemplate.get(),TimeIndex:this.time,SequenceID:0})
            )
    }

    get GOTemplate() {
        return new CellBasic(this,()=>this.gameobject,(value)=>{
            this.gameobject = value;
            if(this.translation_row) {
                this.translation_row.TransportID.set(value);
            }
            if(this.rotation_row) {
                this.rotation_row.GameObjectsID.set(value);
            }
        })
    }

    get Time() {
        return new CellBasic(this,()=>this.time,(value)=>{
            this.gameobject = value;
            if(this.translation_row) {
                this.translation_row.TimeIndex.set(value);
            }
            if(this.rotation_row) {
                this.rotation_row.TimeIndex.set(value);
            }
        })
    }

    @TransientOn('translation_row',undefined)
    get Position() { return new ElevatorTranslation(this); }

    @TransientOn('rotation_row',undefined)
    get Rotation() { return new ElevatorRotation(this); }

    isDeleted() {
        let rot = this.rotation_row;
        let tra = this.translation_row;
        return (rot?rot.isDeleted():true) && (tra?tra.isDeleted():true);
    }

    delete() {
        if(this.rotation_row) {
            this.rotation_row.delete();
        }

        if(this.translation_row) {
            this.translation_row.delete();
        }
    }

    undelete() {
        if(this.rotation_row) {
            this.rotation_row.undelete();
        }

        if(this.translation_row) {
            this.translation_row.undelete();
        }
   }
}

export type SeqKeyFrameCon = {
    x?: number
    y?: number
    z?: number
    time?: number
}

export type KeyFrameCon =  SeqKeyFrameCon & {
    rotX?: number
    rotY?: number
    rotZ?: number
    rotW?: number
    o?: number
}

export class ElevatorKeyframes extends CellSystem<GameObjectElevator> {
    getDefault(): ElevatorKeyframe[] {
        let times: { [key: number]:
            {
                  translation?: TransportAnimationRow
                , rotation?: TransportRotationRow
            }
        } = {}

        DBC.TransportAnimation
            .queryAll({TransportID:this.owner.ID, SequenceID:0})
            .forEach(x=>{
                if(times[x.TimeIndex.get()] == undefined) {
                    times[x.TimeIndex.get()] = {
                        translation: x
                    }
                } else {
                    times[x.TimeIndex.get()].translation = x;
                }
            })

        DBC.TransportRotation
            .queryAll({GameObjectsID:this.owner.ID})
            .forEach(x=>{
                if(times[x.TimeIndex.get()] == undefined) {
                    times[x.TimeIndex.get()] = {
                        rotation: x
                    }
                } else {
                    times[x.TimeIndex.get()].rotation = x;
                }
            })

        return Object.entries(times)
            .map(([key,value])=>
                new ElevatorKeyframe(this.owner.ID,parseInt(key)
                    ,value.rotation,value.translation)
            )
            .filter(x=>!x.isDeleted())
    }

    clear() {
        DBC.TransportAnimation
            .queryAll({TransportID:this.owner.ID})
            .forEach(x=>x.delete())
        DBC.TransportRotation
            .queryAll({GameObjectsID:this.owner.ID})
            .forEach(x=>x.delete())
        return this.owner;
    }

    clearDefaultSequence() {
        return this.clearSequence(0);
    }

    clearSequence(sequenceId: number) {
        if(sequenceId===0) {
            DBC.TransportRotation
                .queryAll({GameObjectsID:this.owner.ID})
                .forEach(x=>x.delete())
        }
        DBC.TransportAnimation
            .queryAll({TransportID:this.owner.ID,SequenceID:sequenceId})
            .forEach(x=>x.delete())
        return this.owner;
    }

    getSequence(sequenceId: number) {
        return DBC.TransportAnimation
            .queryAll({TransportID:this.owner.ID,SequenceID:sequenceId})
            .filter(x=>!x.isDeleted())
            .map(x=>new ElevatorSequenceKeyframe(x))
            .sort((a,b)=>a.Time.get()<b.Time.get()?1:-1)
    }

    private addTimestamps<T extends SeqKeyFrameCon>(frames: T[]): (T&{time:number})[] {
        // fill out timestamps
        let timestamps = frames
            .map((x,i)=>({index:i,time:x.time===undefined?-1:x.time}))
            .filter(({time})=>time!==-1)
        timestamps.reduce((prev,{time,index})=>{
            if(time<0) {
                throw new Error(
                      `Elevator keyframe is negative:`
                    + `${time} (at index ${index})`
                )
            }
            if(time<prev) {
                throw new Error(
                    `Elevator keyframe timestamps not incremental:`
                    + `${prev} followed by ${time} (at index ${index})`
                );
            }
            return time;
        },-1);
        let revstamps = [...timestamps].reverse();
        return frames.map((x,i)=>{
            if(x.time!==undefined) return x;
            let last = revstamps.find(({index})=>index<i);
            let next = timestamps.find(({index})=>index>i);
            if(last === undefined) {
                throw new Error(
                      `First node has no timestamp`
                    + ` (first/last nodes must have 'time' attribute)`
                )
            }
            if(next === undefined) {
                throw new Error(
                      `Last node has no timestamp`
                    + ` (first/last nodes must have 'time' attribute)`
                )
            }
            let o = (i-last.index)/(next.index-last.index)

            return Object.assign({},x,
                {time:Math.round(last.time+(next.time-last.time)*o)})
        }) as (T&{time:number})[]
    }

    getAll() {
        return {
              default: this.getDefault()
            , sequences: DBC.TransportAnimation
                .queryAll({TransportID:this.owner.ID})
                .reduce((p,c)=>{
                    let sid = c.SequenceID.get()
                    if(!p[sid]) {
                        p[sid] = this.getSequence(sid)
                    }
                    return p;
                },<{[key: number]: ElevatorSequenceKeyframe[]}>{})
        }
    }

    objectify() {
        let i = this.getAll();
        let o = {
              default: i.default.map(x=>x.objectify())
            , sequences: <{[key: string]:SeqKeyFrameCon[]}> {}
        }
        Object.entries(i.sequences).forEach(([k,v])=>{
            if(k !== '0') {
                o.sequences[k] = v.map(x=>x.objectify())
            }
        })
        return o;
    }

    /**
     * Non-default sequences cannot have a rotation track (use setDefaultSequence)
     * @param sequenceId
     * @param frames
     */
    addToSequence(sequenceId: number, frames: SeqKeyFrameCon[]) {
        frames = this.addTimestamps(frames);
        this.addTimestamps(frames).forEach(frame=>{
            let row = DBC.TransportAnimation.query({
                  TransportID:this.owner.ID
                , SequenceID:sequenceId
                , TimeIndex:frame.time
            })
            if(!row) {
                row  = DBC.TransportAnimation.add(Ids.TransportAnimation.id())
            }
            new ElevatorSequenceKeyframe(row)
                .Position.setSpread(frame.x||0,frame.y||0,frame.z||0)
                .Time.set(frame.time)
                .GOTemplate.set(this.owner.ID)
                .row.undelete();
        })
    }

    /**
     * Sets the frames for sequence 0 (default)
     * - Only the default sequence can have a rotation track
     * @param frames
     * @returns
     */
    addDefault(frames: KeyFrameCon[]) {
        frames = this.addTimestamps(frames);
        const hasQuat = (x: KeyFrameCon) =>
               x.rotX !== undefined || x.rotY !== undefined
            || x.rotZ !== undefined || x.rotW !== undefined

        frames.reduce(({hasQ,hasO},cur)=>{
            if(hasQuat(cur)) {
                if(hasO) {
                    throw new Error(`Mixing quaternions and orientation is not supported yet`);
                }
                hasQ = true;
            }
            if(cur.o) {
                if(hasQ) {
                    throw new Error(`Mixing quaternions and orientation is not supported yet`);
                }
                hasO = true;
            }
            return {hasQ,hasO};
        },{hasQ:false,hasO:false})

        frames.reduce(({curQ,curO},x)=>{
            let v = new ElevatorKeyframe(this.owner.ID,x.time||0);
            v.undelete();
            if(x.x!==undefined||x.y!==undefined||x.z!==undefined) {
                v.Position.set(x.x||0,x.y||0,x.z||0);
            }

            const setQuat = (quat: {rotX?:number,rotY?:number,rotZ?:number,rotW?:number}) => {
                let rQuat = Object.assign({rotX:0,rotY:0,rotZ:0,rotW:1},quat);
                v.Rotation.set(rQuat.rotX, rQuat.rotY, rQuat.rotZ, rQuat.rotW);
                curQ = rQuat;
            }

            if(hasQuat(x)) {
                setQuat(x);
            }

            if(x.o !== undefined) {
                // orientation -> rotation
                const PI = 3.14159;
                let diff = (x.o-curO+PI)%(2*PI) - PI;
                diff = diff < (-PI) ? diff + (2*PI) : diff
                curO = x.o;

                // axis -> quaternion
                let quat = {rotZ:Math.sin(diff/2),rotW:Math.cos(diff/2)}
                const inv = 1.0 / Math.sqrt(
                    Math.pow(quat.rotZ,2) + Math.pow(quat.rotW,2)
                );
                quat = {rotZ:quat.rotZ*inv,rotW:quat.rotW*inv} // normalize

                // rotate
                quat = {
                    rotZ:+curQ.rotZ*quat.rotW+curQ.rotW*quat.rotZ,
                    rotW:-curQ.rotZ*quat.rotZ+curQ.rotW*quat.rotW
                }
                setQuat(quat);
            }
            return {curQ,curO};
        },{curQ:{rotX:0,rotY:0,rotZ:0,rotW:1},curO:0});
        return this.owner;
    }
}