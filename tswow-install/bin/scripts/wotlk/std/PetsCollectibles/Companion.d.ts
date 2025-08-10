import { MulticastLocCell } from "../../../data/cell/systems/CellSystem";
import { MultirowSystemCached } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { SpellQuery, SpellRow } from "../../dbc/Spell";
import { CreatureModels } from "../Creature/CreatureModels";
import { ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { SelfRef } from "../Refs/Ref";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { CollectibleIcon } from "./CollectibleIcon";
export declare class CompanionItems extends MultirowSystemCached<ItemTemplate, Companion> {
    protected getAllRows(): ItemTemplate[];
    protected isDeleted(value: ItemTemplate): boolean;
    add(mod: string, id: string): Companion;
    addMod(mod: string, id: string, callback: (spell: Spell, item: ItemTemplate) => void): Companion;
    addGet(mod: string, id: string): {
        spell: Spell;
        item: ItemTemplate;
    };
}
export declare class Companion extends MainEntity<SpellRow> {
    protected mountIndex(): number;
    readonly Items: CompanionItems;
    get CreatureTemplate(): import("../Refs/Ref").RefStatic<this, import("../Creature/CreatureTemplate").CreatureTemplate>;
    get AsSpell(): SelfRef<this, Spell>;
    get SpellID(): number;
    get Icon(): CollectibleIcon<this>;
    get Name(): MulticastLocCell<this>;
    get CastTime(): import("../Spell/SpellCastTime").SpellCastTimeRef<this>;
    get Models(): CreatureModels<this>;
    get SpellVisual(): import("../Refs/Ref").RefDynamic<this, import("../Spell/SpellVisual").SpellVisual>;
}
export declare class CompanionRegistryClass extends RegistryStaticNoClone<Companion, SpellRow, SpellQuery> {
    protected Table(): Table<any, SpellQuery, SpellRow> & {
        add: (id: number) => SpellRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: Companion): void;
    create(mod: string, id: string, createItem?: boolean, createCreature?: boolean): Companion;
    protected Entity(r: SpellRow): Companion;
    protected FindByID(id: number): SpellRow;
    protected EmptyQuery(): SpellQuery;
    ID(e: Companion): number;
}
export declare const CompanionRegistry: CompanionRegistryClass;
