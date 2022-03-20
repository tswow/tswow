#include "TSLua.h"
#include "TSItemTemplate.h"

void TSLuaState::load_itemtemplate_methods(uint32_t modid)
{
    auto ts_itemtemplate = new_usertype < TSItemTemplate>("TSItemTemplate");
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetEntry);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDamageMinA);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDamageMinB);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDamageMaxA);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDamageMaxB);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDamageTypeA);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDamageTypeB);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetClass);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetSubClass);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetSoundOverrideSubclass);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDisplayInfoID);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetQuality);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetFlags);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetFlags2);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetBuyCount);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetBuyPrice);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetSellPrice);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetInventoryType);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetAllowableClass);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetAllowableRace);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetItemLevel);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredLevel);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredSkill);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredSkillRank);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredSpell);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredHonorRank);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredCityRank);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredReputationFaction);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredReputationRank);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMaxCount);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetStackable);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetContainerSlots);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetStatsCount);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetStatType);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetStatValue);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetScalingStatDistribution);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetScalingStatValue);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetArmor);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetHolyRes);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetFireRes);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetNatureRes);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetFrostRes);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetShadowRes);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetArcaneRes);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDelay);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetAmmoType);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRangedModRange);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetBonding);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetPageText);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetLanguageID);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetPageMaterial);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetStartQuest);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetLockID);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMaterial);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetSheath);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRandomProperty);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRandomSuffix);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetBlock);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetItemSet);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMaxDurability);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetArea);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMap);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetBagFamily);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetTotemCategory);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetSocketBonus);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetGemProperties);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetRequiredDisenchantSkill);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetArmorDamageModifier);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDuration);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetItemLimitCategory);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetHolidayID);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetScriptID);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDisenchantID);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetFoodType);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMinMoneyLoot);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMaxMoneyLoot);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetFlagsCu);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, IsCurrencyToken);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetMaxStackSize);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetDPS);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, CanChangeEquipStateInCombat);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetTotalAPBonus);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetItemLevelIncludingQuality);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, GetSkill);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, IsPotion);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, IsWeaponVellum);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, IsArmorVellum);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, IsConjuredConsumable);
    LUA_FIELD(ts_itemtemplate, TSItemTemplate, HasSignature);

    ts_itemtemplate.set_function("GetFeralBonus", sol::overload(
        &TSItemTemplate::LGetFeralBonus0
        , &TSItemTemplate::LGetFeralBonus1
    ));
    ts_itemtemplate.set_function("GetName", &TSItemTemplate::LGetName);
    ts_itemtemplate.set_function("GetDescription", &TSItemTemplate::LGetDescription);
    set_function("GetItemTemplate", &GetItemTemplate);
}
