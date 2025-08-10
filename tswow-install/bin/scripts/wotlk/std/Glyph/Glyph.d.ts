import { Cell } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { CellSystemTop, LocSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { GlyphPropertiesQuery, GlyphPropertiesRow } from "../../dbc/GlyphProperties";
import { ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { SpellIconCell } from "../Spell/SpellIcon";
export declare enum GlyphFlags {
    IS_MINOR = 1
}
export declare class GlyphItemName extends LocSystem<GlyphItem> {
    lang(lang: Language): Cell<string, GlyphItem> & PendingCell;
    get mask(): Cell<number, GlyphItem>;
    set(con: loc_constructor): GlyphItem;
}
export declare class GlyphItem extends CellSystemTop {
    protected spell: Spell;
    protected item: ItemTemplate;
    constructor(spell: Spell, item: ItemTemplate);
    get Name(): GlyphItemName;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    GetSpell(): Spell;
    GetItem(): ItemTemplate;
    delete(): this;
    undelete(): this;
}
export declare class GlyphItems extends MultiRowSystem<GlyphItem, Glyph> {
    protected getAllRows(): GlyphItem[];
    add(mod: string, id: string): GlyphItem;
    addMod(mod: string, id: string, callback?: (glyphitem: GlyphItem) => void): Glyph;
    protected isDeleted(value: GlyphItem): boolean;
}
export declare class Glyph extends MainEntity<GlyphPropertiesRow> {
    get ID(): number;
    get Icon(): SpellIconCell<this>;
    get Spell(): import("../Refs/Ref").RefStatic<this, Spell>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof GlyphFlags>;
    get Items(): GlyphItems;
}
export declare class GlyphRegistryClass extends RegistryStaticNoClone<Glyph, GlyphPropertiesRow, GlyphPropertiesQuery> {
    protected Table(): Table<any, GlyphPropertiesQuery, GlyphPropertiesRow> & {
        add: (id: number) => GlyphPropertiesRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: Glyph): void;
    protected Entity(r: GlyphPropertiesRow): Glyph;
    protected FindByID(id: number): GlyphPropertiesRow;
    protected EmptyQuery(): GlyphPropertiesQuery;
    ID(e: Glyph): number;
}
export declare const GlyphRegistry: GlyphRegistryClass;
