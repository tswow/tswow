import { ipaths } from "../../../util/Paths";
import { DBC } from "../../wotlk";

export function BuildTaxiMaps() {

    ipaths.modules.module.all().forEach(basemod=>{
        basemod.endpoints().forEach(mod=>{
            if(!mod.assets.Interface.TAXIFRAME.exists()) {
                return;
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
                console.log("Found non-numerical minimap:",mapname[1])
                let map = DBC.Map.query({Directory:mapname[1]});
                if(!map)
                    return;
                node.copy(node.dirname().join(`TAXIMAP_${map.ID.get()}.blp`))
            })
        })
    })
}