import { CellIndexWrapper } from "../../../data/cell/cells/CellArray";
import { GameObjectDisplayInfoRow } from "../../dbc/GameObjectDisplayInfo";
import { BoundingBox } from "../Misc/BoundingBox";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { ChildEntity, MainEntity } from "../Misc/Entity";
import { GeoBox } from "../Misc/GeoBox";
import { SoundEntryRegistry } from "../Sound/SoundEntry";

export class GameObjectSounds extends ChildEntity<GameObjectDisplayInfoRow,GameObjectDisplay> {
    get length(): number { return 10; }

    getId(index: number) {
        return this.row.Sound.getIndex(index);
    }

    setId(index: number, id: number) {
        this.row.Sound.setIndex(index,id);
        return this.owner;
    }

    freeIndex() {
        for(let i=0;i<this.length;++i) {
            if(this.row.Sound.getIndex(i)===0) {
                return i;
            }
        }
        throw new Error(`No space for more SoundIDs`+
            `in GameObjectDisplay ${this.owner.ID}`)
    }

    addId(id: number) {
        let index = this.freeIndex();
        this.row.Sound.setIndex(index,id);
        return this.owner;
    }

    get(index: number) {
        return SoundEntryRegistry.ref(this.owner, new CellIndexWrapper(this.owner, this.row.Sound, index));
    }

    add() {
        return this.get(this.freeIndex());
    }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.row.Sound.setIndex(i,0);
        }
        return this.owner;
    }
}


export function cleanGameObjectDisplayRow(row: GameObjectDisplayInfoRow) {
    row
        .GeoBoxMaxX.set(0)
        .GeoBoxMaxY.set(0)
        .GeoBoxMaxZ.set(0)
        .GeoBoxMinX.set(0)
        .GeoBoxMinY.set(0)
        .GeoBoxMinZ.set(0)
        .ModelName.set("")
        .ObjectEffectPackageID.set(0)
        .Sound.set([0,0,0,0,0,0,0,0,0,0])
}

export class GameObjectDisplay extends MainEntity<GameObjectDisplayInfoRow> {
    clear(): this {
        this.ModelName.set("")
            .Sound.clearAll()
            .ObjectEffectPackage.set(0)
            .GeoBox.set(new BoundingBox(0,0,0,0,0,0))
        return this;
    }
    get ID() { return this.row.ID.get(); }
    get ModelName() { return this.wrap(this.row.ModelName); }
    get Sound() {
        return new GameObjectSounds(this);
    }
    get ObjectEffectPackage() {
        return this.wrap(this.row.ObjectEffectPackageID);
    }
    get GeoBox(): GeoBox<this> {
        return new GeoBox(
            this,
            this.row.GeoBoxMinX,
            this.row.GeoBoxMaxX,
            this.row.GeoBoxMinY,
            this.row.GeoBoxMaxY,
            this.row.GeoBoxMinZ,
            this.row.GeoBoxMaxZ
        )
    }

    codify(settings: CodegenSettings & {mod?: string, id?: string})
    {
        const mod = settings.mod || 'mod';
        const id = settings.id || 'id';
        return GenerateCode(settings,`std.GameObjectDisplays.set('${mod}','${id}')`,(gen)=>{
            if(this.ModelName.get().length > 0)
            {
                gen.line(`.ModelName.set('${this.ModelName.get().split('\\').join('\\\\')}')`)
            }
            for(let i = 0; i < this.Sound.length; ++i)
            {
                if(this.Sound.getId(i))
                {
                    gen.line(`.Sound.setId(${i},${this.Sound.getId(i)})`)
                }
            }
            gen.non_def_num('ObjectEffectPackage',this.ObjectEffectPackage);
            gen.line(`.GeoBox.set({minX:${this.GeoBox.MinX.get()}, minY:${this.GeoBox.MinY.get()}, minZ:${this.GeoBox.MinZ.get()},maxX:${this.GeoBox.MaxX.get()},maxY:${this.GeoBox.MaxY.get()},maxZ:${this.GeoBox.MaxZ.get()}})`)
        })
    }
}