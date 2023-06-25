import * as chokidar from "chokidar";
import * as fs from "fs";
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

            ipaths.Crashes.mkdir();

            // need to wait for tc to actually write the file
            setTimeout(()=>{
                let i = 0;
                let int = setInterval(()=>{
                    i++;
                    if(i>=10) {
                        clearInterval(int);
                    }
                    try {
                        fs.copyFileSync(file.abs().get(),ipaths.Crashes.join(
                            `${ctime.getFullYear()}-${ctime.getMonth()+1}-${ctime.getDate()+1}.`
                            + `${ctime.getHours()}-${ctime.getMinutes()}-${ctime.getSeconds()}.`
                            + `${type}-${realmPath}.${file.extension()}`).get())
                        file.remove()
                        clearInterval(int)
                    } catch(err) {}
                },500)
            },2000)


        })
    }
}