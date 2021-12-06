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
#include "TSIncludes.h"
#include "TSItemTemplate.h"
#include "ItemTemplate.h"
#include "ObjectMgr.h"
#include <memory.h>

TSItemTemplate::TSItemTemplate(ItemTemplate const* info)
    : TSEntityProvider(&(const_cast<ItemTemplate*>(info)->m_tsEntity))
    , info(const_cast<ItemTemplate*>(info))
{}

TSItemTemplate::TSItemTemplate()
    : TSEntityProvider(nullptr)
    , info(nullptr)
{}

uint32 TSItemTemplate::ID()  {
    return info->ItemId;
}

uint32 TSItemTemplate::GetClass() { return info->Class; }
uint32 TSItemTemplate::GetSubClass() { return info->SubClass; };
int32  TSItemTemplate::GetSoundOverrideSubclass() { return info->SoundOverrideSubclass; };
TSString TSItemTemplate::GetName() { return JSTR(info->Name1); };
uint32 TSItemTemplate::GetDisplayInfoID() { return info->DisplayInfoID; };
uint32 TSItemTemplate::GetQuality() { return info->Quality; };
uint32 TSItemTemplate::GetFlags() { return info->Flags; };
uint32 TSItemTemplate::GetFlags2() { return info->Flags2; };
uint32 TSItemTemplate::GetBuyCount() { return info->BuyCount; };
int32  TSItemTemplate::GetBuyPrice() { return info->BuyPrice; };
uint32 TSItemTemplate::GetSellPrice() { return info->SellPrice; };
uint32 TSItemTemplate::GetInventoryType() { return info->InventoryType; };
uint32 TSItemTemplate::GetAllowableClass() { return info->AllowableClass; };
uint32 TSItemTemplate::GetAllowableRace() { return info->AllowableRace; };
uint32 TSItemTemplate::GetItemLevel() { return info->ItemLevel; };
uint32 TSItemTemplate::GetRequiredLevel() { return info->RequiredLevel; };
uint32 TSItemTemplate::GetRequiredSkill() { return info->RequiredSkill; };
uint32 TSItemTemplate::GetRequiredSkillRank() { return info->RequiredSkillRank; };
uint32 TSItemTemplate::GetRequiredSpell() { return info->RequiredSpell; };
uint32 TSItemTemplate::GetRequiredHonorRank() { return info->RequiredHonorRank; };
uint32 TSItemTemplate::GetRequiredCityRank() { return info->RequiredCityRank; };
uint32 TSItemTemplate::GetRequiredReputationFaction() { return info->RequiredReputationFaction; };
uint32 TSItemTemplate::GetRequiredReputationRank() { return info->RequiredReputationRank; };
int32  TSItemTemplate::GetMaxCount() { return info->MaxCount; };
int32  TSItemTemplate::GetStackable() { return info->Stackable; };
uint32 TSItemTemplate::GetContainerSlots() { return info->ContainerSlots; };
uint32 TSItemTemplate::GetStatsCount() { return info->StatsCount; };
uint32 TSItemTemplate::GetScalingStatDistribution() { return info->ScalingStatDistribution; };
uint32 TSItemTemplate::GetScalingStatValue() { return info->ScalingStatValue; };
uint32 TSItemTemplate::GetArmor() { return info->Armor; };
uint32 TSItemTemplate::GetHolyRes() { return info->HolyRes; };
uint32 TSItemTemplate::GetFireRes() { return info->FireRes; };
uint32 TSItemTemplate::GetNatureRes() { return info->NatureRes; };
uint32 TSItemTemplate::GetFrostRes() { return info->FrostRes; };
uint32 TSItemTemplate::GetShadowRes() { return info->ShadowRes; };
uint32 TSItemTemplate::GetArcaneRes() { return info->ArcaneRes; };
uint32 TSItemTemplate::GetDelay() { return info->Delay; };
uint32 TSItemTemplate::GetAmmoType() { return info->AmmoType; };
float  TSItemTemplate::GetRangedModRange() { return info->RangedModRange; };
uint32 TSItemTemplate::GetBonding() { return info->Bonding; };
TSString TSItemTemplate::GetDescription() { return JSTR(info->Description); };
uint32 TSItemTemplate::GetPageText() { return info->PageText; };
uint32 TSItemTemplate::GetLanguageID() { return info->LanguageID; };
uint32 TSItemTemplate::GetPageMaterial() { return info->PageMaterial; };
uint32 TSItemTemplate::GetStartQuest() { return info->StartQuest; };
uint32 TSItemTemplate::GetLockID() { return info->LockID; };
int32  TSItemTemplate::GetMaterial() { return info->Material; };
uint32 TSItemTemplate::GetSheath() { return info->Sheath; };
int32  TSItemTemplate::GetRandomProperty() { return info->RandomProperty; };
int32  TSItemTemplate::GetRandomSuffix() { return info->RandomSuffix; };
uint32 TSItemTemplate::GetBlock() { return info->Block; };
uint32 TSItemTemplate::GetItemSet() { return info->ItemSet; };
uint32 TSItemTemplate::GetMaxDurability() { return info->MaxDurability; };
uint32 TSItemTemplate::GetArea() { return info->Area; };
uint32 TSItemTemplate::GetMap() { return info->Map; };
uint32 TSItemTemplate::GetBagFamily() { return info->BagFamily; };
uint32 TSItemTemplate::GetTotemCategory() { return info->TotemCategory; };
uint32 TSItemTemplate::GetSocketBonus() { return info->socketBonus; };
uint32 TSItemTemplate::GetGemProperties() { return info->GemProperties; };
uint32 TSItemTemplate::GetRequiredDisenchantSkill(){ return info->RequiredDisenchantSkill; };
float  TSItemTemplate::GetArmorDamageModifier() { return info->ArmorDamageModifier; };
uint32 TSItemTemplate::GetDuration() { return info->Duration; };
uint32 TSItemTemplate::GetItemLimitCategory() { return info->ItemLimitCategory; };
uint32 TSItemTemplate::GetHolidayID() { return info->HolidayId; };
uint32 TSItemTemplate::GetScriptID() { return info->ScriptId; };
uint32 TSItemTemplate::GetDisenchantID() { return info->DisenchantID; };
uint32 TSItemTemplate::GetFoodType() { return info->FoodType; };
uint32 TSItemTemplate::GetMinMoneyLoot() { return info->MinMoneyLoot; };
uint32 TSItemTemplate::GetMaxMoneyLoot() { return info->MaxMoneyLoot; };
uint32 TSItemTemplate::GetFlagsCu() { return info->FlagsCu; };

bool TSItemTemplate::IsCurrencyToken() { return info->IsCurrencyToken(); }
uint32 TSItemTemplate::GetMaxStackSize() {return info->GetMaxStackSize(); };
float TSItemTemplate::GetDPS() { return info->getDPS(); };
bool TSItemTemplate::CanChangeEquipStateInCombat() { return info->CanChangeEquipStateInCombat(); };
int32 TSItemTemplate::GetFeralBonus(int32 extraDPS) { return info->getFeralBonus(extraDPS); }
int32 TSItemTemplate::GetTotalAPBonus() { return info->GetTotalAPBonus(); }
float TSItemTemplate::GetItemLevelIncludingQuality() { return info->GetItemLevelIncludingQuality(); };
uint32 TSItemTemplate::GetSkill() { return info->GetSkill(); };
bool TSItemTemplate::IsPotion() { return info->IsPotion(); };
bool TSItemTemplate::IsWeaponVellum() { return info->IsWeaponVellum(); };
bool TSItemTemplate::IsArmorVellum() { return info->IsArmorVellum(); };
bool TSItemTemplate::IsConjuredConsumable() { return info->IsConjuredConsumable(); };
bool TSItemTemplate::HasSignature() { return info->HasSignature(); };

float TSItemTemplate::GetDamageMinA()
{
    return info->Damage[0].DamageMin;
}

float TSItemTemplate::GetDamageMinB()
{
    return info->Damage[1].DamageMin;
}

float TSItemTemplate::GetDamageMaxA()
{
    return info->Damage[0].DamageMax;
}

float TSItemTemplate::GetDamageMaxB()
{
    return info->Damage[1].DamageMax;
}

uint32 TSItemTemplate::GetDamageTypeA()
{
    return info->Damage[0].DamageType;
}

uint32 TSItemTemplate::GetDamageTypeB()
{
    return info->Damage[1].DamageType;
}

TSEntity * TSItemTemplate::GetData()
{
    return const_cast<TSEntity*>(&info->m_tsEntity);
}

TSItemTemplate GetItemTemplate(uint32 entry)
{
    return TSItemTemplate(sObjectMgr->GetItemTemplate(entry));
}
