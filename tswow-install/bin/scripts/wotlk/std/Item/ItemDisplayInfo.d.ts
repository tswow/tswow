import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { ItemDisplayInfoQuery, ItemDisplayInfoRow } from "../../dbc/ItemDisplayInfo";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
import { ItemIcon } from "./ItemIcon";
import { ItemVisualModels } from "./ItemVisualModels";
export declare class ItemDisplayInfo extends MainEntity<ItemDisplayInfoRow> {
    get ID(): number;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get GeosetGroup(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<number, this>;
    get HelmGeosetVis(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<number, this>;
    get Visuals(): import("../Refs/Ref").RefDynamic<this, import("./ItemVisualEffect").ItemVisuals>;
    get Models(): ItemVisualModels<unknown>;
    get ParticleColor(): import("../Refs/Ref").RefDynamic<this, import("../Misc/ParticleColor").ParticleColor>;
    get SpellVisual(): import("../Refs/Ref").RefDynamic<this, import("../Spell/SpellVisual").SpellVisual>;
    get Texture(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<string, this>;
    get Icon(): ItemIcon;
    get GroupSoundIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    copyFromDisplay(displayId: number): this;
    copyFromTemplate(templateId: number): this;
    codify(settings: {
        mod?: string;
        id?: string;
    } & CodegenSettings): string;
}
export declare class ItemDisplayInfoRef<T> extends RefStatic<T, ItemDisplayInfo> {
    setSimpleIcon(mod: string, name: string, icon: string): T;
}
export declare class ItemDisplayInfoRegistryClass extends RegistryStatic<ItemDisplayInfo, ItemDisplayInfoRow, ItemDisplayInfoQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): ItemDisplayInfoRef<T>;
    protected Table(): Table<any, ItemDisplayInfoQuery, ItemDisplayInfoRow> & {
        add: (id: number) => ItemDisplayInfoRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: ItemDisplayInfo): void;
    protected FindByID(id: number): ItemDisplayInfoRow;
    protected EmptyQuery(): ItemDisplayInfoQuery;
    ID(e: ItemDisplayInfo): number;
    protected Entity(r: ItemDisplayInfoRow): ItemDisplayInfo;
}
export declare const ItemDisplayinfoRegistry: ItemDisplayInfoRegistryClass;
