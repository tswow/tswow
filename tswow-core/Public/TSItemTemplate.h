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
    ItemTemplate * info;
public:
    bool IsNull() { return info == nullptr; };
    TSItemTemplate(ItemTemplate const* info);
    TSItemTemplate();
    TSItemTemplate* operator->() { return this;}
    operator bool() const { return info != nullptr; }
    bool operator==(TSItemTemplate const& rhs) { return info == rhs.info; }

    uint32 GetEntry();

    float GetDamageMinA();
    float GetDamageMinB();

    float GetDamageMaxA();
    float GetDamageMaxB();

    uint32 GetDamageTypeA();
    uint32 GetDamageTypeB();

    uint32 GetClass();
    uint32 GetSubClass();
    int32  GetSoundOverrideSubclass();
    TSString GetName();
    uint32 GetDisplayInfoID();
    uint32 GetQuality();
    uint32 GetFlags();
    uint32 GetFlags2();
    uint32 GetBuyCount();
    int32  GetBuyPrice();
    uint32 GetSellPrice();
    uint32 GetInventoryType();
    uint32 GetAllowableClass();
    uint32 GetAllowableRace();
    uint32 GetItemLevel();
    uint32 GetRequiredLevel();
    uint32 GetRequiredSkill();
    uint32 GetRequiredSkillRank();
    uint32 GetRequiredSpell();
    uint32 GetRequiredHonorRank();
    uint32 GetRequiredCityRank();
    uint32 GetRequiredReputationFaction();
    uint32 GetRequiredReputationRank();
    int32  GetMaxCount();
    int32  GetStackable();
    uint32 GetContainerSlots();
    uint32 GetStatsCount();
    uint32 GetStatType(uint32 index);
    int32 GetStatValue(uint32 index);
    uint32 GetScalingStatDistribution();
    uint32 GetScalingStatValue();
    uint32 GetArmor();
    uint32 GetHolyRes();
    uint32 GetFireRes();
    uint32 GetNatureRes();
    uint32 GetFrostRes();
    uint32 GetShadowRes();
    uint32 GetArcaneRes();
    uint32 GetDelay();
    uint32 GetAmmoType();
    float  GetRangedModRange();
    uint32 GetBonding();
    TSString GetDescription();
    uint32 GetPageText();
    uint32 GetLanguageID();
    uint32 GetPageMaterial();
    uint32 GetStartQuest();
    uint32 GetLockID();
    int32  GetMaterial();
    uint32 GetSheath();
    int32  GetRandomProperty();
    int32  GetRandomSuffix();
    uint32 GetBlock();
    uint32 GetItemSet();
    uint32 GetMaxDurability();
    uint32 GetArea();
    uint32 GetMap();
    uint32 GetBagFamily();
    uint32 GetTotemCategory();
    uint32 GetSocketBonus();
    uint32 GetGemProperties();
    uint32 GetRequiredDisenchantSkill();
    float  GetArmorDamageModifier();
    uint32 GetDuration();
    uint32 GetItemLimitCategory();
    uint32 GetHolidayID();
    uint32 GetScriptID();
    uint32 GetDisenchantID();
    uint32 GetFoodType();
    uint32 GetMinMoneyLoot();
    uint32 GetMaxMoneyLoot();
    uint32 GetFlagsCu();

    bool IsCurrencyToken();
    uint32 GetMaxStackSize();
    float GetDPS();
    bool CanChangeEquipStateInCombat();
    int32 GetFeralBonus(int32 extraDPS = 0);
    int32 GetTotalAPBonus();
    float GetItemLevelIncludingQuality();
    uint32 GetSkill();
    bool IsPotion();
    bool IsWeaponVellum();
    bool IsArmorVellum();
    bool IsConjuredConsumable();
    bool HasSignature();

    TSEntity * GetData();

    void SetStatType(uint32 index, uint32 value);
    void SetStatValue(uint32 index, int32 value);
    void SetStatCount(uint32 value);
    ItemTemplate* _GetInfo();
    WorldPacket BuildCustomQueryData(uint8 loc);
    void SaveItemTemplate();
};

TSItemTemplate TC_GAME_API GetItemTemplate(uint32 id);
