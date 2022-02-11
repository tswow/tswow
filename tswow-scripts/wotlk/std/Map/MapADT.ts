import child_process from "child_process";
import fs from "fs";
import path from "path";
import { SQL } from "wotlkdata";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { AllModules } from "wotlkdata/wotlkdata/Settings";
import { Ids } from "../Misc/Ids";
import { Map } from "./Map";

export type MapBounds = {minX: number, minY: number, maxX: number, maxY: number}

export class MapADT<T extends Map> extends CellSystem<T> {
    private mapsdir(mod: string) {
        return path.join(
              mod
            , 'assets'
            , 'world'
            , 'maps'
            , this.owner.Directory.get()
        )
    }

    private mapname(mod: string, x: number, y: number) {
        return path.join(
               mod
            , 'assets'
            , 'world'
            , 'maps'
            , this.owner.Directory.get()
            ,`${this.owner.Directory.get()}_${x}_${y}.adt`
        )
    }

    hasTile(x: number, y: number) {
        let mods: string[] = AllModules
            .map(x=>x.get())
            .filter((x)=>
                fs.existsSync(this.mapsdir(x))
            );
        if(mods.length === 0) return false;
        let tiles = mods.map(mod=>this.mapname(mod,x,y))
            .filter(x=>fs.existsSync(x))

        if(tiles.length > 1) {
            throw new Error(
                  `ADT ${this.owner.Directory.get()}_${x}_${y}`
                + ` found in multiple modules: ${tiles.join(',')}`
            )
        }
        return tiles.length === 1;
    }

    getBoundary(): MapBounds {
        let mods: string[] = AllModules
            .map(x=>x.get())
            .filter((x: string)=>fs.existsSync(this.mapsdir(x)))

        let adts = mods
            .reduce<string[]>((p,mod)=>{
                const mapsdir = this.mapsdir(mod);
                return p.concat(fs.readdirSync(mapsdir)
                    .map(x=>path.join(mapsdir,x))
                    .filter(x=>x.endsWith('.adt') && fs.statSync(x).isFile()))
                    .map(x=>path.basename(x))
            },[])

        let minX = 64;
        let minY = 64;
        let maxX = 0;
        let maxY = 0;

        adts.forEach(adt=>{
            const [_,x,y] = adt.substring(0,adt.indexOf('.')).split('_').map(x=>parseInt(x))
            if(x<minX) minX = x;
            if(x>maxX) maxX = x;
            if(y<minY) minY = y;
            if(y>maxY) maxY = y;
        });

        return {minX,minY,maxX,maxY};
    }

    add(mod: string, blobs: [minx: number, miny: number, maxx: number, maxy: number, teleportName?: string][]) {
        mod = mod.split('.').join(path.sep)
        if(this.owner.Directory.get().split(/[\n \r\t]/).join('').length === 0) {
            throw new Error(
                  `Tried creating map files without a valid directory name,`
                + ` please call 'map.Directory.set(...)' before you call this function`
            )
        }

        // todo: this should make a single call to adtcreator
        for(let [minx,miny,maxx,maxy,teleportName] of blobs) {
            if(teleportName !== undefined) {
                let cx = minx+(maxx-minx)/2
                let cy = miny+(maxy-miny)/2
                SQL.game_tele.add(Ids.game_tele.id())
                .map.set(this.owner.ID)
                .position_x.set(cx)
                .position_y.set(cy)
                .position_z.set(500)
                .name.set(teleportName)
            }

            const mapdir = path
                .join(
                    'modules',mod,'assets','world','maps'
                    , this.owner.Directory.get()
                );

            let missing = !fs.existsSync(
                path.join(mapdir,this.owner.Directory.get()+'.wdt')
            );

            outer:
            for(let x=minx;x<=maxx;++x) {
                for(let y=miny;y<=maxy;++y) {
                    if(!this.hasTile(x,y)) {
                        missing = true;
                        break outer;
                    }
                }
            }

            if(missing) {
                child_process.execSync(
                    `"${path.join('bin','adt-creator','adtcreator.exe')}"`
                    + ` ${path.join('bin','source.adt')}`
                    + ` ${mapdir}`
                    + ` ${this.owner.Directory.get()}`
                    + ` ${minx} ${miny} ${maxx} ${maxy}`
                    , {stdio:'inherit'});
            }
        }
        return this.owner;
    }
}