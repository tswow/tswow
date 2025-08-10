import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { LoadingScreensQuery, LoadingScreensRow } from "../../dbc/LoadingScreens";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class LoadingScreen extends MainEntity<LoadingScreensRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get FileName(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get HasWidescreen(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LoadingScreenRef<T> extends RefDynamic<T, LoadingScreen> {
    setSimple(path: string, widescreen?: boolean): T;
}
export declare class LoadingScreenRegistryClass extends RegistryDynamic<LoadingScreen, LoadingScreensRow, LoadingScreensQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): LoadingScreenRef<T>;
    protected Table(): Table<any, LoadingScreensQuery, LoadingScreensRow> & {
        add: (id: number) => LoadingScreensRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: LoadingScreen): void;
    protected Entity(r: LoadingScreensRow): LoadingScreen;
    protected FindByID(id: number): LoadingScreensRow;
    protected EmptyQuery(): LoadingScreensQuery;
    ID(e: LoadingScreen): number;
    load(id: number | string): LoadingScreen;
}
export declare const LoadingScreens: LoadingScreenRegistryClass;
