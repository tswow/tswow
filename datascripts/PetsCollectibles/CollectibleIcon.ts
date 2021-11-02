import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { ItemTemplate } from "../Item/ItemTemplate";
import { Spell } from "../Spell/Spell";

export class CollectibleIcon<T> extends CellSystem<T> {
    protected values: ()=>{spell: Spell, items: ItemTemplate[]};

    constructor(owner: T, values: ()=>{spell: Spell, items: ItemTemplate[]}) {
        super(owner);
        this.values = values;
    }

    /**
     * Returns the current icon on the spell icon
     *
     * Note that this does not guarantee the same icon is set on the items
     */
    get() {
        return this.values().spell.Icon.get();
    }

    /**
     * Creates copies of any ItemDisplayInfo before applying the icon
     */
    setCopy(str: string) {
        let v = this.values();
        v.spell.Icon.setPath(str);
        v.items.map(x=>x.DisplayInfo)
            .filter((x,i,a)=>a.findIndex(y=>y.get()===x.get()) === i)
            .forEach(x=>x.getRefCopy().Icon.set(str))
        return this.owner;
    }

    /**
     * Sets the icon directly on ItemDisplayInfo rows, which might break
     * if they're referenced elsewhere
     */
    setNoCopy(str: string) {
        let v = this.values();
        v.spell.Icon.setPath(str);
        v.items.map(x=>x.DisplayInfo)
            .filter((x,i,a)=>a.findIndex(y=>y.get()===x.get()) === i)
            .forEach(x=>x.getRef().Icon.set(str))
        return this.owner;
    }
}