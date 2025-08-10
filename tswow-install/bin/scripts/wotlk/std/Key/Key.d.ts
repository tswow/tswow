import { CellSystemTop, MulticastLocCell } from "../../../data/cell/systems/CellSystem";
import { MultirowSystemCached } from "../../../data/cell/systems/MultiRowSystem";
import { SpellRow } from "../../dbc/Spell";
import { item_templateRow } from "../../sql/item_template";
import { ChargesSystem } from "../Item/ItemSpells";
import { ItemTemplate } from "../Item/ItemTemplate";
import { Lock } from "../Locks/Lock";
import { SelfRef } from "../Refs/Ref";
import { Spell } from "../Spell/Spell";
export declare class KeyLocks extends MultirowSystemCached<Lock, Key> {
    protected getAllRows(): Lock[];
    protected isDeleted(value: Lock): boolean;
    addGet(mod: string, name: string, lockType?: number, lockSkill?: number): Lock;
}
export declare class Key extends CellSystemTop {
    readonly spellRow: SpellRow;
    readonly itemRow: item_templateRow;
    readonly Locks: KeyLocks;
    get AsSpell(): SelfRef<this, Spell>;
    get AsItem(): SelfRef<this, ItemTemplate>;
    get SpellID(): number;
    get ItemID(): number;
    get Name(): MulticastLocCell<this>;
    get Charges(): ChargesSystem<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    constructor(spell: SpellRow, item: item_templateRow);
}
export declare const KeyRegistry: {
    create(mod: string, id: string, type: "GAMEOBJECT"): Key;
};
