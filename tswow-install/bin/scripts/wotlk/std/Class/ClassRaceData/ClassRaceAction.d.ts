import { EnumCellTransform } from "../../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { playercreateinfo_actionRow } from "../../../sql/playercreateinfo_action";
import { TransformedEntity } from "../../Misc/Entity";
export declare class ActionEnum extends EnumCellTransform<ClassRaceActionBase> {
    get MACRO(): import("../../../../data/cell/cells/EnumCell").EnumValueTransform<ClassRaceActionBase, ClassRaceActionBase>;
    get SPELL(): import("../../../../data/cell/cells/EnumCell").EnumValueTransform<ClassRaceActionBase, ClassRaceActionSpell>;
    get ITEM(): import("../../../../data/cell/cells/EnumCell").EnumValueTransform<ClassRaceActionBase, ClassRaceActionItem>;
}
export declare class ClassRaceActionBase extends TransformedEntity<playercreateinfo_actionRow, ClassRaceActionPlain> {
    protected transformer(): EnumCellTransform<any>;
    protected default(): ClassRaceActionPlain;
    get Type(): ActionEnum;
    get Race(): import("../../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Class(): import("../../Refs/Ref").RefReadOnlyTT<this, import("../Class").Class, typeof import("../ClassIDs").ClassIDs>;
    get Button(): import("../../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
}
export declare class ClassRaceActionPlain extends ClassRaceActionBase {
    get Action(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ClassRaceActionSpell extends ClassRaceActionBase {
    get Spell(): import("../../Refs/Ref").RefStatic<this, import("../../Spell/Spell").Spell>;
}
export declare class ClassRaceActionItem extends ClassRaceActionBase {
    get Item(): import("../../Refs/Ref").RefStatic<this, import("../../Item/ItemTemplate").ItemTemplate>;
}
export declare class ClassRaceActions<T> extends MultiRowSystem<ClassRaceActionPlain, T> {
    protected cls: number;
    protected race: number;
    constructor(owner: T, cls: number, race: number);
    protected getAllRows(): ClassRaceActionPlain[];
    protected isDeleted(value: ClassRaceActionPlain): boolean;
    protected add(button: number, action: number, type: number): void;
    addSpell(button: number, spell: number): T;
    addMacro(button: number, macro: number): T;
    addItem(button: number, item: number): T;
}
