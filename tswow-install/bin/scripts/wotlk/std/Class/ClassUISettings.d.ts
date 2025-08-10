import { FunctionalCell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Edit, EditSystem } from "../../../data/luaxml/TextFile";
import { TSImage } from "../Images/Image";
import { AnchorRow } from "../UI/Components/AnchorRow";
import { Class } from "./Class";
declare class TCoordSystem extends CellSystem<Class> {
    private _tCoordsCCEdit;
    private _tCoordsEdit;
    private _tCoordsWSEdit;
    constructor(owner: Class, tcoords: Edit, tcoordsCC: Edit, tcoordsWS: Edit);
    set(x1: number, y1: number, x2: number, y2: number): Class;
    get(): [number, number, number, number];
    objectify(options?: ObjectifyOptions): [number, number, number, number];
}
declare class ClassColor extends EditSystem<Class> {
    set(rgb: number): Class;
    get(): number;
}
declare class ClassInfoRows extends CellSystem<Class> {
    private rows;
    constructor(owner: Class, rows: Edit[]);
    private descPayload;
    private makeInfo;
    get(index: number): string;
    set(index: number, value: string): Class;
    add(value: string): Class;
}
declare class ClassDescription extends CellSystem<Class> {
    private male;
    private female;
    constructor(owner: Class, male: Edit, female: Edit);
    get Male(): FunctionalCell<string, Class>;
    get Female(): FunctionalCell<string, Class>;
    private descPayload;
    set(text: string): Class;
}
export declare class ClassDisabledText extends CellSystem<Class> {
    private edit;
    constructor(owner: Class, edit: Edit);
    set(value: string): Class;
    get(): string;
}
export declare class ClassUISettings extends CellSystem<Class> {
    readonly Color: ClassColor;
    /**
     * Texture coordinates for this class button
     * on the character creation screen.
     *
     * @deprecated - don't modify this directly, use
     *               'setIcon' to set an image instead.
     */
    readonly ButtonTCoords: TCoordSystem;
    /**
     * The position of this class button on the
     * character creation screen.
     */
    readonly ButtonPos: AnchorRow<Class>;
    readonly Info: ClassInfoRows;
    readonly Description: ClassDescription;
    readonly DisabledText: ClassDisabledText;
    setIcon(image: TSImage, oldIndex?: number): Class;
    constructor(cls: Class, tCoordsCC: Edit, tCoordsWS: Edit, classColor: Edit, sortOrder: Edit, tCoords: Edit, xmlEdit: Edit, maleDescription: Edit, femaleDescription: Edit, infoRows: Edit[], disabled: Edit);
}
export {};
