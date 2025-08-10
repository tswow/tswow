import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { Achievement_CategoryQuery, Achievement_CategoryRow } from "../../dbc/Achievement_Category";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class AchievementCategory extends MainEntity<Achievement_CategoryRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get UIOrder(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Parent(): AchievementCategoryRef<this>;
}
export declare const TOP_ACHIEVEMENT_CATEGORIES: {
    readonly GENERAL: 92;
    readonly QUESTS: 96;
    readonly EXPLORATION: 97;
    readonly PVP: 95;
    readonly DUNGEONS: 168;
    readonly PROFESSIONS: 169;
    readonly REPUTATION: 201;
    readonly WORLD_EVENTS: 155;
    readonly FEATS_OF_STRENGTH: 81;
    readonly STATISTICS: 1;
};
export type TopAchievementCategory = keyof typeof TOP_ACHIEVEMENT_CATEGORIES | number;
export declare function resolveTopAchievementCategory(cat: TopAchievementCategory): number;
export declare class AchievementCategoryRef<T> extends RefDynamic<T, AchievementCategory> {
    set(value: TopAchievementCategory): T;
}
export declare class AchievementCategoryRegistryClass extends RegistryDynamic<AchievementCategory, Achievement_CategoryRow, Achievement_CategoryQuery> {
    nullID: () => number;
    ref<T>(owner: T, cell: Cell<number, any>): AchievementCategoryRef<T>;
    protected Table(): Table<any, Achievement_CategoryQuery, Achievement_CategoryRow> & {
        add: (id: number) => Achievement_CategoryRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: AchievementCategory): void;
    protected FindByID(id: number): Achievement_CategoryRow;
    protected EmptyQuery(): Achievement_CategoryQuery;
    ID(e: AchievementCategory): number;
    protected Entity(r: Achievement_CategoryRow): AchievementCategory;
}
export declare const AchievementCategoryRegistry: AchievementCategoryRegistryClass;
