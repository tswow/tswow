import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { Achievement_CategoryQuery, Achievement_CategoryRow } from "wotlkdata/wotlkdata/dbc/types/Achievement_Category";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

export class AchievementCategory extends MainEntity<Achievement_CategoryRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get UIOrder() { return this.wrap(this.row.Ui_Order); }
    get Parent() {
        return AchievementCategoryRegistry.ref(this, this.row.Parent);
    }
}

export const TOP_ACHIEVEMENT_CATEGORIES = {
      'GENERAL' : 92
    , 'QUESTS' : 96
    , 'EXPLORATION' : 97
    , 'PVP' : 95
    , 'DUNGEONS' : 168
    , 'PROFESSIONS' : 169
    , 'REPUTATION' : 201
    , 'WORLD_EVENTS' : 155
    , 'FEATS_OF_STRENGTH' : 81
    , 'STATISTICS' : 1
} as const
export type TopAchievementCategory = keyof typeof TOP_ACHIEVEMENT_CATEGORIES | number;

export function resolveTopAchievementCategory(cat: TopAchievementCategory) {
    if(typeof(cat) === 'string') {
        return TOP_ACHIEVEMENT_CATEGORIES[cat];
    } else {
        return cat;
    }
}

export class AchievementCategoryRef<T> extends RefDynamic<T,AchievementCategory> {
    set(value: TopAchievementCategory) {
        return super.set(resolveTopAchievementCategory(value));
    }
}

export class AchievementCategoryRegistryClass
    extends RegistryDynamic<AchievementCategory,Achievement_CategoryRow,Achievement_CategoryQuery>
{
    nullID = () => -1

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new AchievementCategoryRef(owner, cell, this);
    }

    protected Table(): Table<any, Achievement_CategoryQuery, Achievement_CategoryRow> & { add: (id: number) => Achievement_CategoryRow; } {
        return DBC.Achievement_Category
    }
    protected ids(): DynamicIDGenerator {
        return Ids.Achievement_Category
    }
    Clear(entity: AchievementCategory): void {
        entity.Name.clear()
            .UIOrder.set(1)
            .Parent.set(this.nullID())
    }
    protected FindByID(id: number): Achievement_CategoryRow {
        return DBC.Achievement_Category.query({ID:id})
    }
    protected EmptyQuery(): Achievement_CategoryQuery {
        return {}
    }
    ID(e: AchievementCategory): number {
        return e.ID
    }
    protected Entity(r: Achievement_CategoryRow): AchievementCategory {
        return new AchievementCategory(r);
    }
}
export const AchievementCategoryRegistry = new AchievementCategoryRegistryClass();