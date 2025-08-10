import { Args } from "../../../util/Args";
import { ipaths } from "../../../util/Paths";
import { DBC } from "../../wotlk";

export function BuildTaxiMaps() {
    const isDebug = Args.hasFlag('debug', [process.argv]);
    let taxiMapsProcessed = 0;

    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.Interface.TAXIFRAME.exists()) {
                return;
            }
            
            if(isDebug) {
                console.log(`[DATASCRIPTS] Processing taxi maps in module: ${mod.get()}`);
            }
            
            mod.assets.Interface.TAXIFRAME.iterateDef((node)=>{
                if(!node.basename().startsWith('TAXIMAP'))
                    return;
                if(node.match(/[0-9]/))
                    return;
                if(node.endsWith('.png'))
                    return;
                let mapname = node.basename().match(/TAXIMAP_(.+?)\.blp/)
                if(!mapname)
                    return;
                let map = DBC.Map.query({Directory:mapname[1]});
                if(!map)
                    return;
                
                const targetFile = `TAXIMAP_${map.ID.get()}.blp`;
                if(isDebug) {
                    console.log(`[DATASCRIPTS]   Taxi map: ${node.basename().get()} → ${targetFile} (Map ID: ${map.ID.get()})`);
                }
                node.copy(node.dirname().join(targetFile))
                taxiMapsProcessed++;
            })
        })
    })
    
    if(isDebug && taxiMapsProcessed > 0) {
        console.log(`[DATASCRIPTS] Taxi map processing complete: ${taxiMapsProcessed} maps processed`);
    }
}