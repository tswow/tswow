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
    TSItemTemplate(ItemTemplate const* info);
    TSItemTemplate();
    TSItemTemplate* operator->() { return this; }
    operator bool() const { return info != nullptr; }
    bool operator==(TSItemTemplate const& rhs) { return info == rhs.info; }

    uint32 GetEntry();

    void SetEntry(uint32 value);

    float GetDamageMinA();
    void SetDamageMinA(float value);
    float GetDamageMinB();
    void SetDamageMinB(float value);
    float GetDamageMaxA();
    void SetDamageMaxA(float value);
    float GetDamageMaxB();
    void SetDamageMaxB(float value);
    uint32 GetDamageTypeA();
    void SetDamageTypeA(uint32 value);
    uint32 GetDamageTypeB();
    void SetDamageTypeB(uint32 value);

    uint32 GetClass();
    void SetClass(uint32 value);
    uint32 GetSubClass();
    void SetSubClass(uint32 value);
    int32  GetSoundOverrideSubclass();
    TSString GetName();
    void SetName(TSString name);
    uint32 GetDisplayInfoID();
    void SetDisplayInfoID(uint32 value);
    uint32 GetQuality();
    void SetQuality(uint32 value);
    uint32 GetFlags();
    uint32 GetFlags2();
    uint32 GetBuyCount();
    int32  GetBuyPrice();
    uint32 GetSellPrice();
    uint32 GetInventoryType();
    void SetInventoryType(uint32 value);
    uint32 GetAllowableClass();
    uint32 GetAllowableRace();
    uint32 GetItemLevel();
    void SetItemLevel(uint32 value);
    uint32 GetRequiredLevel();
    void SetRequiredLevel(uint32 value);
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
    void SetStatsCount(uint32 value);
    uint32 GetStatType(uint32 index);
    int32 GetStatValue(uint32 index);
    uint32 GetScalingStatDistribution();
    uint32 GetScalingStatValue();
    uint32 GetArmor();
    void SetArmor(int32 value);
    uint32 GetHolyRes();
    void SetHolyRes(int32 value);
    uint32 GetFireRes();
    void SetFireRes(int32 value);
    uint32 GetNatureRes();
    void SetNatureRes(int32 value);
    uint32 GetFrostRes();
    void SetFrostRes(int32 value);
    uint32 GetShadowRes();
    void SetShadowRes(int32 value);
    uint32 GetArcaneRes();
    void SetArcaneRes(int32 value);
    uint32 GetDelay();
    void SetDelay(uint32 value);
    uint32 GetAmmoType();
    float  GetRangedModRange();
    uint32 GetBonding();
    TSString GetDescription();
    void SetDescription(TSString value);
    uint32 GetPageText();
    uint32 GetLanguageID();
    uint32 GetPageMaterial();
    uint32 GetStartQuest();
    uint32 GetLockID();
    int32  GetMaterial();
    void SetMaterial(uint32 value);
    uint32 GetSheath();
    void SetSheath(uint32 value);
    int32  GetRandomProperty();
    int32  GetRandomSuffix();
    uint32 GetBlock();
    void SetBlock(int32 value);
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
    void SetDuration(uint32 value);
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

    TSEntity* GetData();

    void SetStatType(uint32 index, uint32 value);
    void SetStatValue(uint32 index, int32 value);
    void SetStatCount(uint32 value);
    ItemTemplate* _GetInfo();
    WorldPacket BuildCustomQueryData(uint8 loc);
    void SaveItemTemplate();
};

TSItemTemplate TC_GAME_API GetItemTemplate(uint32 id);
