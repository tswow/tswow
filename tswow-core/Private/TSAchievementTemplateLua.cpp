#include "TSLua.h"
#include "TSAchievementTemplate.h"

#include "TSEvents.h"
#include "DBCStructure.h"
#include "DBCStores.h"
#include <vector>

void TSLuaState::load_achievement_methods(sol::state& state)
{
    auto ts_achievemententry = state.new_usertype<TSAchievementEntry>("TSAchievementEntry");
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetEntry);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetFaction);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetInstanceID);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetCategory);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetPoints);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetFlags);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetMinimumCriteria);
    LUA_FIELD(ts_achievemententry, TSAchievementEntry, GetSharesCriteria);
    ts_achievemententry.set_function("GetTitles", &TSAchievementEntry::LGetTitles);

    auto ts_achievementcriteriaentry = state.new_usertype<TSAchievementCriteriaEntry>("TSAchievementCriteriaEntry");
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetEntry);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAchievementEntry);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetType);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAssetID);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetQuantity);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalType1);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalAsset1);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalType2);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalAsset2);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetFlags);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetStartEvent);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetStartAsset);
    LUA_FIELD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetStartTimer);
    state.set_function("GetAchievementTemplate", &GetAchievementTemplate);
    state.set_function("GetAchievementCriteria", &GetAchievementCriteria);
}
