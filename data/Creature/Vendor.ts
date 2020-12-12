import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { npc_vendorRow } from "wotlkdata/sql/types/npc_vendor";
import { CreatureTemplate } from "./CreatureTemplate";

export class Vendor extends Subsystem<CreatureTemplate> {
    protected rows() {
        return SQL.npc_vendor.filter({entry: this.owner.ID});
    }

    get length() { return this.rows().length; }

    addItem(item: number, maxcount = 0, incrTime = 0, extendedCostId = 0) {
        // We must always have vendor flag if we sell items
        this.owner.NPCFlags.Vendor.mark();
        SQL.npc_vendor.add(this.owner.ID, item, extendedCostId)
            .maxcount.set(maxcount)
            .incrtime.set(incrTime)
        return this.owner;
    }

    copyFrom(creatureTemplate: number, filter?: (row: npc_vendorRow)=>boolean) {
        // We must always have vendor flag if we sell items
        this.owner.NPCFlags.Vendor.mark();
        SQL.npc_vendor.filter({entry: creatureTemplate}).forEach((x)=>{
            if(filter && !filter(x)) {
                return;
            }
            SQL.npc_vendor.add(
                this.owner.ID,x.item.get(),x.ExtendedCost.get()
            ).maxcount.set(x.maxcount.get())
            .incrtime.set(x.incrtime.get())
        });
        return this.owner;
    }
}