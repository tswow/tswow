import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "../Item/ItemTemplate";
import { Spell } from "../Spell/Spell";
export declare class CollectibleIcon<T> extends CellSystem<T> {
    protected values: () => {
        spell: Spell;
        items: ItemTemplate[];
    };
    constructor(owner: T, values: () => {
        spell: Spell;
        items: ItemTemplate[];
    });
    /**
     * Returns the current icon on the spell icon
     *
     * Note that this does not guarantee the same icon is set on the items
     */
    get(): number;
    /**
     * Creates copies of any ItemDisplayInfo before applying the icon
     */
    setCopy(mod: string, name: string, str: string): T;
    /**
     * Sets the icon directly on ItemDisplayInfo rows, which might break
     * if they're referenced elsewhere
     */
    setNoCopy(str: string): T;
}
