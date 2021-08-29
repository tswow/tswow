import { DBC, finish, SQL } from "wotlkdata";
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { MapCreator } from "wotlkdata/dbc/types/Map";
import { Ids } from "../Misc/Ids";
import { Settings } from "wotlkdata/Settings";

finish('build-maps',()=>{
    let localeDirs = [
          'frFR','deDE','enGB','enUS','itIT','koKR'
        , 'zhCN','zhTW','ruRU','esES','esMX','ptBR'
    ]

    function mapIdExists(id: string) {
        for(const map of DBC.Map.filter({})) {
            if(map.Directory.get() === id) {
                return true;
            }
        }
        return false;
    }

    function readMpq(mpqDir: string) {
        let mapdir = path.join(mpqDir,'world','maps');
        if(!fs.existsSync(mapdir)) return;

        fs.readdirSync(mapdir)
            .map(x=>[x,path.join(mapdir,x)])
            .filter(([id,p])=>!mapIdExists(id) && fs.lstatSync(p).isDirectory())
            .forEach(([id,p])=>{
                let mapfile = path.join(p,'map.yaml');
                if(fs.existsSync(mapfile)) {
                    let settings: MapCreator = yaml.load(fs.readFileSync(mapfile,'utf-8'));
                    settings.Directory = id;
                    let map = DBC.Map.add(Ids.Map.id('tswow-stdlib',id),settings);

                    let minX = 99999;
                    let minY = 99999;
                    let maxX = -99999;
                    let maxY = -99999;

                    fs.readdirSync(p).filter(x=>x.endsWith('.adt')).forEach(file=>{
                        let v = file.split('.adt')[0].split('_');
                        let [x,y] = v.slice(v.length-2).map(x=>parseInt(x))
                        if(x<minX) minX = x;
                        if(x>maxX) maxX = x;
                        if(y<minY) minY = y;
                        if(y>maxY) maxY = y;
                    });

                    let transform = (v: number) => 17066.7 - (v * 533.333);
                    minX = transform(minX);
                    minY = transform(minY);
                    maxX = transform(maxX);
                    maxY = transform(maxY);

                    let cX = minX+(maxX-minX)/2;
                    let cY = minY+(maxY-minY)/2;

                    SQL.game_tele.add(Ids.game_tele.id())
                        .map.set(map.ID.get())
                        .name.set(`map:${id}`)
                        .position_x.set(cX)
                        .position_y.set(cY)
                        .position_z.set(500)
                }
            });
        }

    function readPatchDir(dir: string) {
        fs.readdirSync(dir).forEach(x=>{
            let filepath = path.join(dir,x);
            if(filepath.toUpperCase().endsWith('.MPQ') && fs.lstatSync(filepath).isDirectory())
            {
                readMpq(filepath);
            }

            if(localeDirs.includes(x) && fs.lstatSync(filepath).isDirectory()) {
                readPatchDir(path.join(dir,x));
            }
        });
    }

    readPatchDir(path.join(Settings.CLIENT_PATH,'Data'));

    // also read modules
    let modulesDir = path.join(process.cwd(),'modules');
    if(fs.existsSync(modulesDir)) {
        fs.readdirSync(modulesDir)
            .map(x=>path.join(modulesDir,x,'assets'))
            .filter(x=>fs.existsSync(x))
            .forEach(x=>{
                readMpq(x);
            });
    }
});