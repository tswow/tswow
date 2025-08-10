import { creature_template_outfitsRow } from "../../sql/creature_template_outfits";
import { ClassIDs } from "../Class/ClassIDs";
import { Genders } from "../Conditions/Settings/Gender";
import { MainEntity } from "../Misc/Entity";
import { RaceIDs } from "../Race/RaceType";
export type RangedType = 'MAINHAND_RANGED_ONLY' | 'OFFHAND_RANGED_ONLY' | 'MAINHAND_RANGED_AND_MAINHAND' | 'OFFHAND_RANGED_AND_OFFHAND' | 'NO_RANGED';
export declare class CreatureOutfit extends MainEntity<creature_template_outfitsRow> {
    get ID(): number;
    get NPCSounds(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Race(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof RaceIDs>;
    get Class(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ClassIDs>;
    get Gender(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof Genders>;
    get Skin(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Face(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Hair(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HairColor(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FacialHair(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Head(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Shirt(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Shoulders(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Chest(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Waist(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Legs(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Feet(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Wrists(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Hands(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Back(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Tabard(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Guild(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Mainhand(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Offhand(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Ranged(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    private texture;
    fromFile(filepath: string, ranged?: RangedType, emptyWeaponOverride?: boolean): this;
    fromModuleFile(mod: string, filepath: string, ranged?: RangedType, emptyWeaponOverride?: boolean): this;
    write(filepath: string): this;
    /**
     * @param charStr
     * @param emptyWeaponOverride if true, an empty weapon will
     * @returns
     */
    fromString(charStr: string, ranged?: RangedType, emptyWeaponOverride?: boolean): this;
    private bakeModel;
    /**
     * Adds a baked texture to the model
     * @param texture file name of the .blp texture in Textures/BakedNpcTextures
     * @returns
     */
    addBakedTexture(texture: string): this;
    /**
     * Returns the ID of the baked creature model
     */
    getBakedModelID(): number;
}
