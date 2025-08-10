import { Cell } from "../../../data/cell/cells/Cell";
import { MulticastLocCell } from "../../../data/cell/systems/CellSystem";
import { MultirowSystemCached } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { SpellQuery, SpellRow } from "../../dbc/Spell";
import { CreatureModels } from "../Creature/CreatureModels";
import { ItemBonding } from "../Item/ItemBonding";
import { SkillRequirement } from "../Item/ItemRequirements";
import { ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { RefNoCreate, SelfRef } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { CollectibleIcon } from "./CollectibleIcon";
export declare class MountItems extends MultirowSystemCached<ItemTemplate, Mount> {
    protected getAllRows(): ItemTemplate[];
    protected isDeleted(value: ItemTemplate): boolean;
    add(mod: string, id: string, mountSkillRank?: number): Mount;
    addMod(mod: string, id: string, callback: (spell: Spell, item: ItemTemplate) => void): Mount;
    addGet(mod: string, id: string, mountSkillRank?: number): {
        spell: Spell;
        item: ItemTemplate;
    };
}
export declare class Mount extends MainEntity<SpellRow> {
    protected mountIndex(): number;
    get SpellID(): number;
    /**
     * @warning Currently, tswow can only find Mount items that are implemented by specifying its spell id
     * in one of the items spells with a "learn (6)" spell item trigger.
     * This misses ~20 mounts that have a real spell to learn it instead (which may or may not have an item to trigger it),
     * and an additional ~80 mounts that have seemingly no way to learn it at all.
     */
    readonly Items: MountItems;
    get CreatureTemplate(): import("../Refs/Ref").RefStatic<this, import("../Creature/CreatureTemplate").CreatureTemplate>;
    get Models(): CreatureModels<this>;
    get Name(): MulticastLocCell<this>;
    get Bonding(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ItemBonding>;
    get SkillRequirement(): SkillRequirement<this>;
    get Icon(): CollectibleIcon<this>;
    get CastTime(): import("../Spell/SpellCastTime").SpellCastTimeRef<this>;
    get SpellVisual(): import("../Refs/Ref").RefDynamic<this, import("../Spell/SpellVisual").SpellVisual>;
    get AsSpell(): SelfRef<this, Spell>;
}
export declare class MountRegistryClass extends RegistryRowBase<Mount, SpellRow, SpellQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): RefNoCreate<T, Mount>;
    protected Entity(r: SpellRow): Mount;
    protected FindByID(id: number): SpellRow;
    protected EmptyQuery(): SpellQuery;
    ID(e: Mount): number;
    protected Table(): Table<any, SpellQuery, SpellRow>;
    create(mod: string, id: string, speed?: number, flightSpeed?: number, createItem?: boolean, createCreature?: boolean): Mount;
}
export declare const MountRegistry: MountRegistryClass;
