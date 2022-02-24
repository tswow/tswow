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
#include "ObjectMgr.h"
#include <memory.h>
#include "QueryPackets.h"

TSItemTemplate::TSItemTemplate(ItemTemplate const* info)
    : TSEntityProvider(&(const_cast<ItemTemplate*>(info)->m_tsEntity))
    , info(const_cast<ItemTemplate*>(info))
{}

TSItemTemplate::TSItemTemplate()
    : TSEntityProvider(nullptr)
    , info(nullptr)
{}

uint32 TSItemTemplate::GetEntry() { return info->ItemId; };
void TSItemTemplate::SetEntry(uint32 value) { info->ItemId = value; };
uint32 TSItemTemplate::GetClass() { return info->Class; };
void TSItemTemplate::SetClass(uint32 value) { info->Class = value; };
uint32 TSItemTemplate::GetSubClass() { return info->SubClass; };
void TSItemTemplate::SetSubClass(uint32 value) { info->SubClass = value; };
int32  TSItemTemplate::GetSoundOverrideSubclass() { return info->SoundOverrideSubclass; };
TSString TSItemTemplate::GetName() { return JSTR(info->Name1); };
void TSItemTemplate::SetName(TSString name) { info->Name1 = name->_value; };
uint32 TSItemTemplate::GetDisplayInfoID() { return info->DisplayInfoID; };
void TSItemTemplate::SetDisplayInfoID(uint32 value) { info->DisplayInfoID = value; };
uint32 TSItemTemplate::GetQuality() { return info->Quality; };
void TSItemTemplate::SetQuality(uint32 value) { info->Quality = value; };
uint32 TSItemTemplate::GetFlags() { return info->Flags; };
uint32 TSItemTemplate::GetFlags2() { return info->Flags2; };
uint32 TSItemTemplate::GetBuyCount() { return info->BuyCount; };
int32  TSItemTemplate::GetBuyPrice() { return info->BuyPrice; };
uint32 TSItemTemplate::GetSellPrice() { return info->SellPrice; };
uint32 TSItemTemplate::GetInventoryType() { return info->InventoryType; };
void TSItemTemplate::SetInventoryType(uint32 value) { info->InventoryType = value; };
uint32 TSItemTemplate::GetAllowableClass() { return info->AllowableClass; };
uint32 TSItemTemplate::GetAllowableRace() { return info->AllowableRace; };
uint32 TSItemTemplate::GetItemLevel() { return info->ItemLevel; };
void TSItemTemplate::SetItemLevel(uint32 value) { info->ItemLevel = value; };
uint32 TSItemTemplate::GetRequiredLevel() { return info->RequiredLevel; };
void TSItemTemplate::SetRequiredLevel(uint32 value) { info->RequiredLevel = value; };
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
void TSItemTemplate::SetStatsCount(uint32 value) { info->StatsCount = value; };
uint32 TSItemTemplate::GetScalingStatDistribution() { return info->ScalingStatDistribution; };
uint32 TSItemTemplate::GetScalingStatValue() { return info->ScalingStatValue; };
uint32 TSItemTemplate::GetArmor() { return info->Armor; };
void TSItemTemplate::SetArmor(int32 value) { info->Armor = value; };
uint32 TSItemTemplate::GetHolyRes() { return info->HolyRes; };
void TSItemTemplate::SetHolyRes(int32 value) { info->HolyRes = value; };
uint32 TSItemTemplate::GetFireRes() { return info->FireRes; };
void TSItemTemplate::SetFireRes(int32 value) {  info->FireRes = value; };
uint32 TSItemTemplate::GetNatureRes() { return info->NatureRes; };
void TSItemTemplate::SetNatureRes(int32 value) {  info->NatureRes = value; };
uint32 TSItemTemplate::GetFrostRes() { return info->FrostRes; };
void TSItemTemplate::SetFrostRes(int32 value) {  info->FrostRes = value; };
uint32 TSItemTemplate::GetShadowRes() { return info->ShadowRes; };
void TSItemTemplate::SetShadowRes(int32 value) {  info->ShadowRes = value; };
uint32 TSItemTemplate::GetArcaneRes() { return info->ArcaneRes; };
void TSItemTemplate::SetArcaneRes(int32 value) {  info->ArcaneRes = value; };
uint32 TSItemTemplate::GetDelay() { return info->Delay; };
void TSItemTemplate::SetDelay(uint32 value) { info->Delay = value; };
uint32 TSItemTemplate::GetAmmoType() { return info->AmmoType; };
float  TSItemTemplate::GetRangedModRange() { return info->RangedModRange; };
uint32 TSItemTemplate::GetBonding() { return info->Bonding; };
TSString TSItemTemplate::GetDescription() { return JSTR(info->Description); };
void TSItemTemplate::SetDescription(TSString desc) { info->Description = desc->_value; };
uint32 TSItemTemplate::GetPageText() { return info->PageText; };
uint32 TSItemTemplate::GetLanguageID() { return info->LanguageID; };
uint32 TSItemTemplate::GetPageMaterial() { return info->PageMaterial; };
uint32 TSItemTemplate::GetStartQuest() { return info->StartQuest; };
uint32 TSItemTemplate::GetLockID() { return info->LockID; };
int32  TSItemTemplate::GetMaterial() { return info->Material; };
void  TSItemTemplate::SetMaterial(uint32 value) { info->Material = value; };
uint32 TSItemTemplate::GetSheath() { return info->Sheath; };
void TSItemTemplate::SetSheath(uint32 value) { info->Sheath = value; };
int32  TSItemTemplate::GetRandomProperty() { return info->RandomProperty; };
int32  TSItemTemplate::GetRandomSuffix() { return info->RandomSuffix; };
uint32 TSItemTemplate::GetBlock() { return info->Block; };
void TSItemTemplate::SetBlock(int32 value) { info->Block = value; };
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
void TSItemTemplate::SetDuration(uint32 value) { info->Duration = value; };
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

uint32 TSItemTemplate::GetStatType(uint32 index)
{
    return info->ItemStat[index].ItemStatType;
}

int32 TSItemTemplate::GetStatValue(uint32 index)
{
    return info->ItemStat[index].ItemStatValue;
}

float TSItemTemplate::GetDamageMinA()
{
    return info->Damage[0].DamageMin;
}

void TSItemTemplate::SetDamageMinA(float value)
{
    info->Damage[0].DamageMin = value;
}

float TSItemTemplate::GetDamageMinB()
{
    return info->Damage[1].DamageMin;
}

void TSItemTemplate::SetDamageMinB(float value)
{
    info->Damage[1].DamageMin = value;
}

float TSItemTemplate::GetDamageMaxA()
{
    return info->Damage[0].DamageMax;
}

void TSItemTemplate::SetDamageMaxA(float value)
{
    info->Damage[0].DamageMax = value;
}

float TSItemTemplate::GetDamageMaxB()
{
    return info->Damage[1].DamageMax;
}

void TSItemTemplate::SetDamageMaxB(float value)
{
    info->Damage[1].DamageMax = value;
}

uint32 TSItemTemplate::GetDamageTypeA()
{
    return info->Damage[0].DamageType;
}

void TSItemTemplate::SetDamageTypeA(uint32 value)
{
    info->Damage[0].DamageType = value;
}

uint32 TSItemTemplate::GetDamageTypeB()
{
    return info->Damage[1].DamageType;
}

void TSItemTemplate::SetDamageTypeB(uint32 value)
{
    info->Damage[1].DamageType = value;
}

TSEntity * TSItemTemplate::GetData()
{
    return const_cast<TSEntity*>(&info->m_tsEntity);
}

TSItemTemplate GetItemTemplate(uint32 entry)
{
    return TSItemTemplate(sObjectMgr->GetItemTemplate(entry));
}

void TSItemTemplate::SetStatCount(uint32 value)
{
    info->StatsCount = value;
}


void TSItemTemplate::SetStatType(uint32 index, uint32 value)
{
    info->ItemStat[index].ItemStatType = value;
}

void TSItemTemplate::SetStatValue(uint32 index, int32 value)
{
    info->ItemStat[index].ItemStatValue = value;
}

ItemTemplate* TSItemTemplate::_GetInfo()
{
    return info;
}

WorldPacket TSItemTemplate::BuildCustomQueryData(uint8 loc)
{
    WorldPackets::Query::QueryItemSingleResponse response;

    std::string locName = info->Name1;
    std::string locDescription = info->Description;

    if (ItemLocale const* il = sObjectMgr->GetItemLocale(info->ItemId))
    {
        ObjectMgr::GetLocaleString(il->Name, static_cast<LocaleConstant>(loc), locName);
        ObjectMgr::GetLocaleString(il->Description, static_cast<LocaleConstant>(loc), locDescription);
    }

    response.ItemID = info->ItemId;
    response.Allow = true;

    response.Stats.Class = info->Class;
    response.Stats.SubClass = info->SubClass;
    response.Stats.SoundOverrideSubclass = info->SoundOverrideSubclass;
    response.Stats.Name = locName;
    response.Stats.DisplayInfoID = info->DisplayInfoID;
    response.Stats.Quality = info->Quality;
    response.Stats.Flags = info->Flags;
    response.Stats.Flags2 = info->Flags2;
    response.Stats.BuyPrice = info->BuyPrice;
    response.Stats.SellPrice = info->SellPrice;
    response.Stats.InventoryType = info->InventoryType;
    response.Stats.AllowableClass = info->AllowableClass;
    response.Stats.AllowableRace = info->AllowableRace;
    response.Stats.ItemLevel = info->ItemLevel;
    response.Stats.RequiredLevel = info->RequiredLevel;
    response.Stats.RequiredSkill = info->RequiredSkill;
    response.Stats.RequiredSkillRank = info->RequiredSkillRank;
    response.Stats.RequiredSpell = info->RequiredSpell;
    response.Stats.RequiredHonorRank = info->RequiredHonorRank;
    response.Stats.RequiredCityRank = info->RequiredCityRank;
    response.Stats.RequiredReputationFaction = info->RequiredReputationFaction;
    response.Stats.RequiredReputationRank = info->RequiredReputationRank;
    response.Stats.MaxCount = info->MaxCount;
    response.Stats.Stackable = info->Stackable;
    response.Stats.ContainerSlots = info->ContainerSlots;
    response.Stats.StatsCount = info->StatsCount;
    for (uint32 i = 0; i < info->StatsCount; ++i)
    {
        response.Stats.ItemStat[i].ItemStatType = info->ItemStat[i].ItemStatType;
        response.Stats.ItemStat[i].ItemStatValue = info->ItemStat[i].ItemStatValue;
    }

    response.Stats.ScalingStatDistribution = info->ScalingStatDistribution;
    response.Stats.ScalingStatValue = info->ScalingStatValue;

    for (uint8 i = 0; i < MAX_ITEM_PROTO_DAMAGES; ++i)
    {
        response.Stats.Damage[i].DamageMin = info->Damage[i].DamageMin;
        response.Stats.Damage[i].DamageMax = info->Damage[i].DamageMax;
        response.Stats.Damage[i].DamageType = info->Damage[i].DamageType;
    }

    response.Stats.Resistance[SPELL_SCHOOL_NORMAL] = info->Armor;
    response.Stats.Resistance[SPELL_SCHOOL_HOLY] = info->HolyRes;
    response.Stats.Resistance[SPELL_SCHOOL_FIRE] = info->FireRes;
    response.Stats.Resistance[SPELL_SCHOOL_NATURE] = info->NatureRes;
    response.Stats.Resistance[SPELL_SCHOOL_FROST] = info->FrostRes;
    response.Stats.Resistance[SPELL_SCHOOL_SHADOW] = info->ShadowRes;
    response.Stats.Resistance[SPELL_SCHOOL_ARCANE] = info->ArcaneRes;

    response.Stats.Delay = info->Delay;
    response.Stats.AmmoType = info->AmmoType;
    response.Stats.RangedModRange = info->RangedModRange;

    for (uint8 s = 0; s < MAX_ITEM_PROTO_SPELLS; ++s)
    {
        response.Stats.Spells[s].SpellId = info->Spells[s].SpellId;
        response.Stats.Spells[s].SpellTrigger = info->Spells[s].SpellTrigger;
        response.Stats.Spells[s].SpellCharges = info->Spells[s].SpellCharges;
        response.Stats.Spells[s].SpellCooldown = info->Spells[s].SpellCooldown;
        response.Stats.Spells[s].SpellCategory = info->Spells[s].SpellCategory;
        response.Stats.Spells[s].SpellCategoryCooldown = info->Spells[s].SpellCategoryCooldown;
    }

    response.Stats.Bonding = info->Bonding;
    response.Stats.Description = locDescription;
    response.Stats.PageText = info->PageText;
    response.Stats.LanguageID = info->LanguageID;
    response.Stats.PageMaterial = info->PageMaterial;
    response.Stats.StartQuest = info->StartQuest;
    response.Stats.LockID = info->LockID;
    response.Stats.Material = info->Material;
    response.Stats.Sheath = info->Sheath;
    response.Stats.RandomProperty = info->RandomProperty;
    response.Stats.RandomSuffix = info->RandomSuffix;
    response.Stats.Block = info->Block;
    response.Stats.ItemSet = info->ItemSet;
    response.Stats.MaxDurability = info->MaxDurability;
    response.Stats.Area = info->Area;
    response.Stats.Map = info->Map;
    response.Stats.BagFamily = info->BagFamily;
    response.Stats.TotemCategory = info->TotemCategory;

    for (uint8 s = 0; s < MAX_ITEM_PROTO_SOCKETS; ++s)
    {
        response.Stats.Socket[s].Color = info->Socket[s].Color;
        response.Stats.Socket[s].Content = info->Socket[s].Content;
    }

    response.Stats.SocketBonus = info->socketBonus;
    response.Stats.GemProperties = info->GemProperties;
    response.Stats.RequiredDisenchantSkill = info->RequiredDisenchantSkill;
    response.Stats.ArmorDamageModifier = info->ArmorDamageModifier;
    response.Stats.Duration = info->Duration;
    response.Stats.ItemLimitCategory = info->ItemLimitCategory;
    response.Stats.HolidayId = info->HolidayId;

    response.Write();
    response.ShrinkToFit();
    return response.Move();
}

void TSItemTemplate::SaveItemTemplate()
{
    std::ostringstream oss;
    oss << "REPLACE INTO custom_item_template VALUES(" << info->ItemId << "," << info->Class << "," << info->SubClass << "," << info->SoundOverrideSubclass
        << ",'" << info->Name1 << "'," << info->DisplayInfoID << "," << info->Quality << "," << info->Flags << "," << info->Flags2 << "," << info->BuyCount << "," << info->BuyPrice
        << "," << info->SellPrice << "," << info->InventoryType << "," << int32(info->AllowableClass) << "," << int32(info->AllowableRace) << "," << info->ItemLevel << "," << info->RequiredLevel
        << "," << info->RequiredSkill << "," << info->RequiredSkillRank << "," << info->RequiredSpell << "," << info->RequiredHonorRank << "," << info->RequiredCityRank
        << "," << info->RequiredReputationFaction << "," << info->RequiredReputationRank << "," << info->MaxCount << "," << info->Stackable << "," << info->ContainerSlots << "," << info->StatsCount
        << "," << info->ItemStat[0].ItemStatType << "," << info->ItemStat[0].ItemStatValue << "," << info->ItemStat[1].ItemStatType << "," << info->ItemStat[1].ItemStatValue
        << "," << info->ItemStat[2].ItemStatType << "," << info->ItemStat[2].ItemStatValue << "," << info->ItemStat[3].ItemStatType << "," << info->ItemStat[3].ItemStatValue
        << "," << info->ItemStat[4].ItemStatType << "," << info->ItemStat[4].ItemStatValue << "," << info->ItemStat[5].ItemStatType << "," << info->ItemStat[5].ItemStatValue
        << "," << info->ItemStat[6].ItemStatType << "," << info->ItemStat[6].ItemStatValue << "," << info->ItemStat[7].ItemStatType << "," << info->ItemStat[7].ItemStatValue
        << "," << info->ItemStat[8].ItemStatType << "," << info->ItemStat[8].ItemStatValue << "," << info->ItemStat[9].ItemStatType << "," << info->ItemStat[9].ItemStatValue
        << "," << info->ScalingStatDistribution << "," << info->ScalingStatValue
        << "," << info->Damage[0].DamageMin << "," << info->Damage[0].DamageMax << "," << info->Damage[0].DamageType << "," << info->Damage[1].DamageMin << "," << info->Damage[1].DamageMax << "," << info->Damage[1].DamageType
        << "," << info->Armor << "," << info->HolyRes << "," << info->FireRes << "," << info->NatureRes << "," << info->FrostRes << "," << info->ShadowRes << "," << info->ArcaneRes
        << "," << info->Delay << "," << info->AmmoType << "," << info->RangedModRange
        << "," << info->Spells[0].SpellId << "," << info->Spells[0].SpellTrigger << "," << info->Spells[0].SpellCharges << "," << info->Spells[0].SpellPPMRate << "," << info->Spells[0].SpellCooldown << "," << info->Spells[0].SpellCategory << "," << info->Spells[0].SpellCategoryCooldown
        << "," << info->Spells[1].SpellId << "," << info->Spells[1].SpellTrigger << "," << info->Spells[1].SpellCharges << "," << info->Spells[1].SpellPPMRate << "," << info->Spells[1].SpellCooldown << "," << info->Spells[1].SpellCategory << "," << info->Spells[1].SpellCategoryCooldown
        << "," << info->Spells[2].SpellId << "," << info->Spells[2].SpellTrigger << "," << info->Spells[2].SpellCharges << "," << info->Spells[2].SpellPPMRate << "," << info->Spells[2].SpellCooldown << "," << info->Spells[2].SpellCategory << "," << info->Spells[2].SpellCategoryCooldown
        << "," << info->Spells[3].SpellId << "," << info->Spells[3].SpellTrigger << "," << info->Spells[3].SpellCharges << "," << info->Spells[3].SpellPPMRate << "," << info->Spells[3].SpellCooldown << "," << info->Spells[3].SpellCategory << "," << info->Spells[3].SpellCategoryCooldown
        << "," << info->Spells[4].SpellId << "," << info->Spells[4].SpellTrigger << "," << info->Spells[4].SpellCharges << "," << info->Spells[4].SpellPPMRate << "," << info->Spells[4].SpellCooldown << "," << info->Spells[4].SpellCategory << "," << info->Spells[4].SpellCategoryCooldown
        << "," << info->Bonding << ",'" << info->Description << "'," << info->PageText << "," << info->LanguageID << "," << info->PageMaterial << "," << info->StartQuest
        << "," << info->LockID << "," << info->Material << "," << info->Sheath << "," << info->RandomProperty << "," << info->RandomSuffix << "," << info->Block
        << "," << info->ItemSet << "," << info->MaxDurability << "," << info->Area << "," << info->Map << "," << info->BagFamily << "," << info->TotemCategory
        << "," << info->Socket[0].Color << "," << info->Socket[0].Content
        << "," << info->Socket[1].Color << "," << info->Socket[1].Content
        << "," << info->Socket[2].Color << "," << info->Socket[2].Content
        << "," << info->socketBonus << "," << info->GemProperties << "," << int32(info->RequiredDisenchantSkill) << "," << info->ArmorDamageModifier << "," << info->Duration
        << "," << info->ItemLimitCategory << "," << info->HolidayId << "," << info->ScriptId << "," << info->DisenchantID << "," << info->FoodType << "," << info->MinMoneyLoot
        << "," << info->MaxMoneyLoot << "," << info->FlagsCu << ")";

    //TC_LOG_ERROR("sql.sql", "query: `%s`", oss.str().c_str());
    CharacterDatabase.PExecute("%s", oss.str().c_str());

}