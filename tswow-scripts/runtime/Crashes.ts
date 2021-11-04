import * as chokidar from "chokidar";
import { WFile } from "../util/FileTree";
import { ipaths } from "../util/Paths";

export class Crashes {
    static initialize() {
        chokidar.watch(ipaths.modules.abs().get(),{
            ignored: [
                /build$/
              , /Buildings$/
              , /maps$/
              , /vmaps$/
              , /mmaps$/
              , /dbc$/
              , /dbc_source/
              , /datascripts$/
              , /assets$/
              , /addon$/
              , /livescripts$/
              , /addons$/
              , /shared$/
              , /luaxml$/
              , /luaxml_source/
              , /(^|[\/\\])\../
          ]
        }).on('add',sfile=>{
            let file = new WFile(sfile);
            if(file.basename(1).get() !== 'Crashes') return;
            const ctime = file.ctime();
            const [_,type] = file.basename().split('_');
            const realmPath = file.dirname().dirname()
                .relativeTo(ipaths.modules)
                .split('\\').join('/').split('/').join('.')
                .split('realms.').join('')
                .split('datasets.').join('')
            file.copy(ipaths.Crashes.join(
                    `${ctime.getFullYear()}-${ctime.getMonth()}-${ctime.getDate()}.`
                  + `${ctime.getHours()}-${ctime.getMinutes()}-${ctime.getSeconds()}.`
                  + `${type}-${realmPath}.${file.extension()}`))
            file.remove()
        })
    }
}