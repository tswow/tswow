import { ObjectifyOptions } from '../../../../data/cell/serialization/ObjectIteration';
import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { Edit } from "../../../../data/luaxml/TextFile";
export type Points = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';
export type RelativePoint = Points | 'TOPLEFT' | 'TOPRIGHT' | 'BOTTOMLEFT' | 'BOTTOMRIGHT';
export declare class AnchorRow<T> extends CellSystem<T> {
    protected edit: Edit;
    protected getXml(): any;
    protected build(xml: any): string;
    protected apply(fields: {
        [key: string]: any;
    }): void;
    constructor(owner: T, edit: Edit);
    setPos(x: number, y: number): T;
    setPoint(point: Points): T;
    setRelativeTo(relativeTo: string): T;
    setRelativePoint(relativePoint: string): T;
    objectify(options?: ObjectifyOptions): any;
}
