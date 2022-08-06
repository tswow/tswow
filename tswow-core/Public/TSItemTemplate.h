/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#pragma once

#include "TSClasses.h"
#include "TSEntity.h"

struct ItemTemplate;

class TC_GAME_API TSItemTemplate : public TSEntityProvider {
private:
    ItemTemplate* info;
public:
    bool IsNull() { return info == nullptr; };
    TSItemTemplate(ItemTemplate* info);
    TSItemTemplate(ItemTemplate const* info);
    TSItemTemplate();
    TSItemTemplate* operator->() { return this; }
    operator bool() const { return info != nullptr; }
    bool operator==(TSItemTemplate const& rhs) { return info == rhs.info; }

    TSNumber<uint32> GetEntry();
    void SetEntry(uint32 value);
    TSNumber<uint32> GetClass();
    void SetClass(uint32 value);
    TSNumber<uint32> GetSubClass();
    void SetSubClass(uint32 value);
    TSNumber<int32> GetSoundOverrideSubclass();
    void SetSoundOverrideSubclass(int32 value);
    std::string GetName();
    void SetName(std::string const& name);
    TSNumber<uint32> GetDisplayInfoID();
    void SetDisplayInfoID(uint32 value);
    TSNumber<uint32> GetQuality();
    void SetQuality(uint32 value);
    TSNumber<uint32> GetFlags();
    void SetFlags(uint32 value);
    TSNumber<uint32> GetFlags2();
    void SetFlags2(uint32 value);
    TSNumber<uint32> GetBuyCount();
    void SetBuyCount(uint32 value);
    TSNumber<int32> GetBuyPrice();
    void SetBuyPrice(int32 value);
    TSNumber<uint32> GetSellPrice();
    void SetSellPrice(uint32 value);
    TSNumber<uint32> GetInventoryType();
    void SetInventoryType(uint32 value);
    TSNumber<uint32> GetAllowableClass();
    void SetAllowableClass(uint32 value);
    TSNumber<uint32> GetAllowableRace();
    void SetAllowableRace(uint32 value);
    TSNumber<uint32> GetItemLevel();
    void SetItemLevel(uint32 value);
    TSNumber<uint32> GetRequiredLevel();
    void SetRequiredLevel(uint32 value);
    TSNumber<uint32> GetRequiredSkill();
    void SetRequiredSkill(uint32 value);
    TSNumber<uint32> GetRequiredSkillRank();
    void SetRequiredSkillRank(uint32 value);
    TSNumber<uint32> GetRequiredSpell();
    void SetRequiredSpell(uint32 value);
    TSNumber<uint32> GetRequiredHonorRank();
    void SetRequiredHonorRank(uint32 value);
    TSNumber<uint32> GetRequiredCityRank();
    void SetRequiredCityRank(uint32 value);
    TSNumber<uint32> GetRequiredReputationFaction();
    void SetRequiredReputationFaction(uint32 value);
    TSNumber<uint32> GetRequiredReputationRank();
    void SetRequiredReputationRank(uint32 value);
    TSNumber<int32> GetMaxCount();
    void SetMaxCount(int32 value);
    TSNumber<int32> GetStackable();
    void SetStackable(int32 value);
    TSNumber<uint32> GetContainerSlots();
    void SetContainerSlots(uint32 value);
    TSNumber<uint32> GetStatsCount();
    void SetStatsCount(uint32 value);
    TSNumber<uint32> GetStatType(uint32 index);
    void SetStatType(uint32 index, uint32 value);
    TSNumber<int32> GetStatValue(uint32 index);
    void SetStatValue(uint32 index, int32 value);
    TSNumber<uint32> GetScalingStatDistribution();
    void SetScalingStatDistribution(uint32 value);
    TSNumber<uint32> GetScalingStatValue();
    void SetScalingStatValue(uint32 value);
    TSNumber<uint32> GetArmor();
    void SetArmor(int32 value);
    TSNumber<uint32> GetHolyRes();
    void SetHolyRes(int32 value);
    TSNumber<uint32> GetFireRes();
    void SetFireRes(int32 value);
    TSNumber<uint32> GetNatureRes();
    void SetNatureRes(int32 value);
    TSNumber<uint32> GetFrostRes();
    void SetFrostRes(int32 value);
    TSNumber<uint32> GetShadowRes();
    void SetShadowRes(int32 value);
    TSNumber<uint32> GetArcaneRes();
    void SetArcaneRes(int32 value);
    TSNumber<uint32> GetDelay();
    void SetDelay(uint32 value);
    TSNumber<uint32> GetAmmoType();
    void SetAmmoType(uint32 value);
    TSNumber<float> GetRangedModRange();
    void SetRangedModRange(float value);
    TSNumber<uint32> GetBonding();
    void SetBonding(uint32 value);
    std::string GetDescription();
    void SetDescription(std::string const& value);
    TSNumber<uint32> GetPageText();
    void SetPageText(uint32 value);
    TSNumber<uint32> GetLanguageID();
    void SetLanguageID(uint32 value);
    TSNumber<uint32> GetPageMaterial();
    void SetPageMaterial(uint32 value);
    TSNumber<uint32> GetStartQuest();
    void SetStartQuest(uint32 value);
    TSNumber<uint32> GetLockID();
    void SetLockID(uint32 value);
    TSNumber<int32> GetMaterial();
    void SetMaterial(int32 value);
    TSNumber<uint32> GetSheath();
    void SetSheath(uint32 value);
    TSNumber<int32> GetRandomProperty();
    void SetRandomProperty(int32 value);
    TSNumber<int32> GetRandomSuffix();
    void SetRandomSuffix(int32 value);
    TSNumber<uint32> GetBlock();
    void SetBlock(uint32 value);
    TSNumber<uint32> GetItemSet();
    void SetItemSet(uint32 value);
    TSNumber<uint32> GetMaxDurability();
    void SetMaxDurability(uint32 value);
    TSNumber<uint32> GetArea();
    void SetArea(uint32 value);
    TSNumber<uint32> GetMap();
    void SetMap(uint32 value);
    TSNumber<uint32> GetBagFamily();
    void SetBagFamily(uint32 value);
    TSNumber<uint32> GetTotemCategory();
    void SetTotemCategory(uint32 value);
    TSNumber<uint32> GetSocketBonus();
    void SetSocketBonus(uint32 value);
    TSNumber<uint32> GetGemProperties();
    void SetGemProperties(uint32 value);
    TSNumber<uint32> GetRequiredDisenchantSkill();
    void SetRequiredDisenchantSkill(uint32 value);
    TSNumber<float> GetArmorDamageModifier();
    void SetArmorDamageModifier(float value);
    TSNumber<uint32> GetDuration();
    void SetDuration(uint32 value);
    TSNumber<uint32> GetItemLimitCategory();
    void SetItemLimitCategory(uint32 value);
    TSNumber<uint32> GetHolidayID();
    void SetHolidayID(uint32 value);
    TSNumber<uint32> GetScriptID();
    void SetScriptID(uint32 value);
    TSNumber<uint32> GetDisenchantID();
    void SetDisenchantID(uint32 value);
    TSNumber<uint32> GetFoodType();
    void SetFoodType(uint32 value);
    TSNumber<uint32> GetMinMoneyLoot();
    void SetMinMoneyLoot(uint32 value);
    TSNumber<uint32> GetMaxMoneyLoot();
    void SetMaxMoneyLoot(uint32 value);
    TSNumber<uint32> GetFlagsCu();
    void SetFlagsCu(uint32 value);
    TSNumber<float> GetDamageMinA();
    void SetDamageMinA(float value);
    TSNumber<float> GetDamageMinB();
    void SetDamageMinB(float value);
    TSNumber<float> GetDamageMaxA();
    void SetDamageMaxA(float value);
    TSNumber<float> GetDamageMaxB();
    void SetDamageMaxB(float value);
    TSNumber<uint32> GetDamageTypeA();
    void SetDamageTypeA(uint32 value);
    TSNumber<uint32> GetDamageTypeB();
    void SetDamageTypeB(uint32 value);
    TSNumber<uint32> GetSpellCategory(uint32 index);
    void SetSpellCategory(uint32 index, uint32 value);
    TSNumber<uint32> GetSpellCategoryCooldown(uint32 index);
    void SetSpellCategoryCooldown(uint32 index, uint32 value);
    TSNumber<uint32> GetSpellCharges(uint32 index);
    void SetSpellCharges(uint32 index, uint32 value);
    TSNumber<uint32> GetSpellCooldown(uint32 index);
    void SetSpellCooldown(uint32 index, uint32 value);
    TSNumber<uint32> GetSpellID(uint32 index);
    void SetSpellID(uint32 index, uint32 value);
    TSNumber<uint32> GetSpellPPMRate(uint32 index);
    void SetSpellPPMRate(uint32 index, uint32 value);
    TSNumber<uint32> GetSpellTrigger(uint32 index);
    void SetSpellTrigger(uint32 index, uint32 value);

    bool IsCurrencyToken();
    TSNumber<uint32> GetMaxStackSize();
    TSNumber<float> GetDPS();
    bool CanChangeEquipStateInCombat();
    TSNumber<int32> GetFeralBonus(int32 extraDPS = 0);
    TSNumber<int32> GetTotalAPBonus();
    TSNumber<float> GetItemLevelIncludingQuality();
    TSNumber<uint32> GetSkill();
    bool IsPotion();
    bool IsWeaponVellum();
    bool IsArmorVellum();
    bool IsConjuredConsumable();
    bool HasSignature();

    TSEntity* GetData();
    ItemTemplate* _GetInfo();
    void InitializeQueryData();
    void Save();
};

TSItemTemplate TC_GAME_API GetItemTemplate(uint32 id);
