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
#if TRINITY
#include "QueryPackets.h"
#endif

TSItemTemplate::TSItemTemplate(ItemTemplate const* _info)
    : TSEntityProvider(&(const_cast<ItemTemplate*>(_info)->m_tsEntity))
    , info(const_cast<ItemTemplate*>(_info))
{}

TSItemTemplate::TSItemTemplate(ItemTemplate * _info)
    : TSEntityProvider(&_info->m_tsEntity)
    , info(_info)
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
void  TSItemTemplate::SetSoundOverrideSubclass(int32 value) { info->SoundOverrideSubclass = value; };
TSString TSItemTemplate::GetName() { return JSTR(info->Name1); };
void TSItemTemplate::SetName(TSString name) { info->Name1 = name->_value; };
uint32 TSItemTemplate::GetDisplayInfoID() { return info->DisplayInfoID; };
void TSItemTemplate::SetDisplayInfoID(uint32 value) { info->DisplayInfoID = value; };
uint32 TSItemTemplate::GetQuality() { return info->Quality; };
void TSItemTemplate::SetQuality(uint32 value) { info->Quality = value; };
uint32 TSItemTemplate::GetFlags() { return info->Flags; };
void TSItemTemplate::SetFlags(uint32 value) { info->Flags = value; };
uint32 TSItemTemplate::GetFlags2() { return info->Flags2; };
void TSItemTemplate::SetFlags2(uint32 value) { info->Flags2 = value; };
uint32 TSItemTemplate::GetBuyCount() { return info->BuyCount; };
void TSItemTemplate::SetBuyCount(uint32 value) { info->BuyCount = value; };
int32  TSItemTemplate::GetBuyPrice() { return info->BuyPrice; };
void  TSItemTemplate::SetBuyPrice(int32 value) { info->BuyPrice = value; };
uint32 TSItemTemplate::GetSellPrice() { return info->SellPrice; };
void TSItemTemplate::SetSellPrice(uint32 value) { info->SellPrice = value; };
uint32 TSItemTemplate::GetInventoryType() { return info->InventoryType; };
void TSItemTemplate::SetInventoryType(uint32 value) { info->InventoryType = value; };
uint32 TSItemTemplate::GetAllowableClass() { return info->AllowableClass; };
void TSItemTemplate::SetAllowableClass(uint32 value) { info->AllowableClass = value; };
uint32 TSItemTemplate::GetAllowableRace() { return info->AllowableRace; };
void TSItemTemplate::SetAllowableRace(uint32 value) { info->AllowableRace = value; };
uint32 TSItemTemplate::GetItemLevel() { return info->ItemLevel; };
void TSItemTemplate::SetItemLevel(uint32 value) { info->ItemLevel = value; };
uint32 TSItemTemplate::GetRequiredLevel() { return info->RequiredLevel; };
void TSItemTemplate::SetRequiredLevel(uint32 value) { info->RequiredLevel = value; };
uint32 TSItemTemplate::GetRequiredSkill() { return info->RequiredSkill; };
void TSItemTemplate::SetRequiredSkill(uint32 value) { info->RequiredSkill = value; };
uint32 TSItemTemplate::GetRequiredSkillRank() { return info->RequiredSkillRank; };
void TSItemTemplate::SetRequiredSkillRank(uint32 value) { info->RequiredSkillRank = value; };
uint32 TSItemTemplate::GetRequiredSpell() { return info->RequiredSpell; };
void TSItemTemplate::SetRequiredSpell(uint32 value) { info->RequiredSpell = value; };
uint32 TSItemTemplate::GetRequiredHonorRank() { return info->RequiredHonorRank; };
void TSItemTemplate::SetRequiredHonorRank(uint32 value) { info->RequiredHonorRank = value; };
uint32 TSItemTemplate::GetRequiredCityRank() { return info->RequiredCityRank; };
void TSItemTemplate::SetRequiredCityRank(uint32 value) { info->RequiredCityRank = value; };
uint32 TSItemTemplate::GetRequiredReputationFaction() { return info->RequiredReputationFaction; };
void TSItemTemplate::SetRequiredReputationFaction(uint32 value) { info->RequiredReputationFaction = value; };
uint32 TSItemTemplate::GetRequiredReputationRank() { return info->RequiredReputationRank; };
void TSItemTemplate::SetRequiredReputationRank(uint32 value) { info->RequiredReputationRank = value; };
int32  TSItemTemplate::GetMaxCount() { return info->MaxCount; };
void  TSItemTemplate::SetMaxCount(int32 value) { info->MaxCount = value; };
int32  TSItemTemplate::GetStackable() { return info->Stackable; };
void  TSItemTemplate::SetStackable(int32 value) { info->Stackable = value; };
uint32 TSItemTemplate::GetContainerSlots() { return info->ContainerSlots; };
void  TSItemTemplate::SetContainerSlots(uint32 value) { info->ContainerSlots = value; };
uint32 TSItemTemplate::GetStatsCount() { return info->StatsCount; };
void TSItemTemplate::SetStatsCount(uint32 value) { info->StatsCount = value; };
uint32 TSItemTemplate::GetScalingStatDistribution() { return info->ScalingStatDistribution; };
void TSItemTemplate::SetScalingStatDistribution(uint32 value) { info->ScalingStatDistribution = value; };
uint32 TSItemTemplate::GetScalingStatValue() { return info->ScalingStatValue; };
void TSItemTemplate::SetScalingStatValue(uint32 value) { info->ScalingStatValue = value; };
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
void TSItemTemplate::SetAmmoType(uint32 value) { info->AmmoType = value; };
float  TSItemTemplate::GetRangedModRange() { return info->RangedModRange; };
void TSItemTemplate::SetRangedModRange(float value) { info->RangedModRange = value; };
uint32 TSItemTemplate::GetBonding() { return info->Bonding; };
void TSItemTemplate::SetBonding(uint32 value) { info->Bonding = value; };
TSString TSItemTemplate::GetDescription() { return JSTR(info->Description); };
void TSItemTemplate::SetDescription(TSString desc) { info->Description = desc->_value; };
uint32 TSItemTemplate::GetPageText() { return info->PageText; };
void TSItemTemplate::SetPageText(uint32 value) { info->PageText = value; };
uint32 TSItemTemplate::GetLanguageID() { return info->LanguageID; };
void TSItemTemplate::SetLanguageID(uint32 value) { info->LanguageID = value; };
uint32 TSItemTemplate::GetPageMaterial() { return info->PageMaterial; };
void TSItemTemplate::SetPageMaterial(uint32 value) { info->PageMaterial = value; };
uint32 TSItemTemplate::GetStartQuest() { return info->StartQuest; };
void TSItemTemplate::SetStartQuest(uint32 value) { info->StartQuest = value; };
uint32 TSItemTemplate::GetLockID() { return info->LockID; };
void TSItemTemplate::SetLockID(uint32 value) { info->LockID = value; };
int32  TSItemTemplate::GetMaterial() { return info->Material; };
void  TSItemTemplate::SetMaterial(int32 value) { info->Material = value; };
uint32 TSItemTemplate::GetSheath() { return info->Sheath; };
void TSItemTemplate::SetSheath(uint32 value) { info->Sheath = value; };
int32  TSItemTemplate::GetRandomProperty() { return info->RandomProperty; };
void  TSItemTemplate::SetRandomProperty(int32 value) { info->RandomProperty = value; };
int32  TSItemTemplate::GetRandomSuffix() { return info->RandomSuffix; };
void  TSItemTemplate::SetRandomSuffix(int32 value) { info->RandomSuffix = value; };
uint32 TSItemTemplate::GetBlock() { return info->Block; };
void TSItemTemplate::SetBlock(uint32 value) { info->Block = value; };
uint32 TSItemTemplate::GetItemSet() { return info->ItemSet; };
void TSItemTemplate::SetItemSet(uint32 value) { info->ItemSet = value; };
uint32 TSItemTemplate::GetMaxDurability() { return info->MaxDurability; };
void TSItemTemplate::SetMaxDurability(uint32 value) { info->MaxDurability = value; };
uint32 TSItemTemplate::GetArea() { return info->Area; };
void TSItemTemplate::SetArea(uint32 value) { info->Area = value; };
uint32 TSItemTemplate::GetMap() { return info->Map; };
void TSItemTemplate::SetMap(uint32 value) { info->Map = value; };
uint32 TSItemTemplate::GetBagFamily() { return info->BagFamily; };
void TSItemTemplate::SetBagFamily(uint32 value) { info->BagFamily = value; };
uint32 TSItemTemplate::GetTotemCategory() { return info->TotemCategory; };
void TSItemTemplate::SetTotemCategory(uint32 value) { info->TotemCategory = value; };
uint32 TSItemTemplate::GetSocketBonus() { return info->socketBonus; };
void TSItemTemplate::SetSocketBonus(uint32 value) { info->socketBonus = value; };
uint32 TSItemTemplate::GetGemProperties() { return info->GemProperties; };
void TSItemTemplate::SetGemProperties(uint32 value) { info->GemProperties = value; };
uint32 TSItemTemplate::GetRequiredDisenchantSkill(){ return info->RequiredDisenchantSkill; };
void TSItemTemplate::SetRequiredDisenchantSkill(uint32 value) { info->RequiredDisenchantSkill = value; };
float  TSItemTemplate::GetArmorDamageModifier() { return info->ArmorDamageModifier; };
void  TSItemTemplate::SetArmorDamageModifier(float value) { info->ArmorDamageModifier = value; };
uint32 TSItemTemplate::GetDuration() { return info->Duration; };
void TSItemTemplate::SetDuration(uint32 value) { info->Duration = value; };
uint32 TSItemTemplate::GetItemLimitCategory() { return info->ItemLimitCategory; };
void TSItemTemplate::SetItemLimitCategory(uint32 value) { info->ItemLimitCategory = value; };
uint32 TSItemTemplate::GetHolidayID() { return info->HolidayId; };
void TSItemTemplate::SetHolidayID(uint32 value) { info->HolidayId = value; };
uint32 TSItemTemplate::GetScriptID() { return info->ScriptId; };
void TSItemTemplate::SetScriptID(uint32 value) { info->ScriptId = value; };
uint32 TSItemTemplate::GetDisenchantID() { return info->DisenchantID; };
void TSItemTemplate::SetDisenchantID(uint32 value) { info->DisenchantID = value; };
uint32 TSItemTemplate::GetFoodType() { return info->FoodType; };
void TSItemTemplate::SetFoodType(uint32 value) { info->FoodType = value; };
uint32 TSItemTemplate::GetMinMoneyLoot() { return info->MinMoneyLoot; };
void TSItemTemplate::SetMinMoneyLoot(uint32 value) { info->MinMoneyLoot = value; };
uint32 TSItemTemplate::GetMaxMoneyLoot() { return info->MaxMoneyLoot; };
void TSItemTemplate::SetMaxMoneyLoot(uint32 value) { info->MaxMoneyLoot = value; };
uint32 TSItemTemplate::GetFlagsCu() { return info->FlagsCu; };
void TSItemTemplate::SetFlagsCu(uint32 value) { info->FlagsCu = value; };
uint32 TSItemTemplate::GetStatType(uint32 index) { return info->ItemStat[index].ItemStatType; }
void TSItemTemplate::SetStatType(uint32 index, uint32 value) { info->ItemStat[index].ItemStatType = value; }
int32 TSItemTemplate::GetStatValue(uint32 index) { return info->ItemStat[index].ItemStatValue; }
void TSItemTemplate::SetStatValue(uint32 index, int32 value) { info->ItemStat[index].ItemStatValue = value; }
float TSItemTemplate::GetDamageMinA() { return info->Damage[0].DamageMin; }
void TSItemTemplate::SetDamageMinA(float value) { info->Damage[0].DamageMin = value; }
float TSItemTemplate::GetDamageMinB() { return info->Damage[1].DamageMin; }
void TSItemTemplate::SetDamageMinB(float value) { info->Damage[1].DamageMin = value; }
float TSItemTemplate::GetDamageMaxA() { return info->Damage[0].DamageMax; }
void TSItemTemplate::SetDamageMaxA(float value) { info->Damage[0].DamageMax = value; }
float TSItemTemplate::GetDamageMaxB() { return info->Damage[1].DamageMax; }
void TSItemTemplate::SetDamageMaxB(float value) { info->Damage[1].DamageMax = value; }
uint32 TSItemTemplate::GetDamageTypeA() { return info->Damage[0].DamageType; }
void TSItemTemplate::SetDamageTypeA(uint32 value) { info->Damage[0].DamageType = value; }
uint32 TSItemTemplate::GetDamageTypeB() { return info->Damage[1].DamageType; }
void TSItemTemplate::SetDamageTypeB(uint32 value) { info->Damage[1].DamageType = value; }
uint32 TSItemTemplate::GetSpellCategory(uint32 index) { return info->Spells[index].SpellCategory; }
void TSItemTemplate::SetSpellCategory(uint32 index, uint32 value) { info->Spells[index].SpellCategory = value; }
uint32 TSItemTemplate::GetSpellCategoryCooldown(uint32 index) { return info->Spells[index].SpellCategoryCooldown; }
void TSItemTemplate::SetSpellCategoryCooldown(uint32 index, uint32 value) { info->Spells[index].SpellCategoryCooldown = value; }
uint32 TSItemTemplate::GetSpellCharges(uint32 index) { return info->Spells[index].SpellCharges; }
void TSItemTemplate::SetSpellCharges(uint32 index, uint32 value) { info->Spells[index].SpellCharges = value; }
uint32 TSItemTemplate::GetSpellCooldown(uint32 index) { return info->Spells[index].SpellCooldown; }
void TSItemTemplate::SetSpellCooldown(uint32 index, uint32 value) { info->Spells[index].SpellCooldown = value; }
uint32 TSItemTemplate::GetSpellID(uint32 index) { return info->Spells[index].SpellId; }
void TSItemTemplate::SetSpellID(uint32 index, uint32 value) { info->Spells[index].SpellId = value; }
uint32 TSItemTemplate::GetSpellPPMRate(uint32 index) { return info->Spells[index].SpellPPMRate; }
void TSItemTemplate::SetSpellPPMRate(uint32 index, uint32 value) { info->Spells[index].SpellPPMRate = value; }
uint32 TSItemTemplate::GetSpellTrigger(uint32 index) { return info->Spells[index].SpellTrigger; }
void TSItemTemplate::SetSpellTrigger(uint32 index, uint32 value) { info->Spells[index].SpellTrigger = value; }

//extras
bool TSItemTemplate::IsCurrencyToken() { return info->IsCurrencyToken(); }
uint32 TSItemTemplate::GetMaxStackSize() {return info->GetMaxStackSize(); };
float TSItemTemplate::GetDPS() { return info->getDPS(); };
bool TSItemTemplate::CanChangeEquipStateInCombat() { return info->CanChangeEquipStateInCombat(); };
int32 TSItemTemplate::GetFeralBonus(int32 extraDPS) { return info->getFeralBonus(extraDPS); }
int32 TSItemTemplate::GetTotalAPBonus() { 
#if TRINITY
    return info->GetTotalAPBonus(); 
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSItemTemplate::GetTotalAPBonus not implemented for AzerothCore");
    return 0;
#endif
}
float TSItemTemplate::GetItemLevelIncludingQuality() { 
#if TRINITY
    return info->GetItemLevelIncludingQuality(); 
#elif AZEROTHCORE
    return info->GetItemLevelIncludingQuality(1);
#endif
};
uint32 TSItemTemplate::GetSkill() { return info->GetSkill(); };
bool TSItemTemplate::IsPotion() { return info->IsPotion(); };
bool TSItemTemplate::IsWeaponVellum() { return info->IsWeaponVellum(); };
bool TSItemTemplate::IsArmorVellum() { return info->IsArmorVellum(); };
bool TSItemTemplate::IsConjuredConsumable() { return info->IsConjuredConsumable(); };
bool TSItemTemplate::HasSignature() { return info->HasSignature(); };
//

TSEntity * TSItemTemplate::GetData()
{
    return const_cast<TSEntity*>(&info->m_tsEntity);
}

TSItemTemplate GetItemTemplate(uint32 entry)
{
#if TRINITY
    return TSItemTemplate(sObjectMgr->GetItemTemplateMutable(entry));
#elif AZEROTHCORE
    return TSItemTemplate(sObjectMgr->GetItemTemplate(entry));
#endif
}

ItemTemplate* TSItemTemplate::_GetInfo()
{
    return info;
}

WorldPacket TSItemTemplate::BuildCustomQueryData(uint8 loc)
{
#if TRINITY
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
#elif AZEROTHCORE
        TS_LOG_ERROR("tswow.api", "TSItemTemplate::BuildCustomQueryData not implemented for AzerothCore");
#endif
}

void TSItemTemplate::Save()
{
#if TRINITY
    CharacterDatabaseTransaction trans = CharacterDatabase.BeginTransaction();

    CharacterDatabasePreparedStatement* stmt = CharacterDatabase.GetPreparedStatement(CHAR_UPD_CUSTOM_ITEM);
    stmt->setUInt32(0, info->ItemId);
    stmt->setUInt32(1, info->Class);
    stmt->setUInt32(2, info->SubClass);
    stmt->setUInt32(3, info->SoundOverrideSubclass);
    stmt->setString(4, info->Name1);
    stmt->setUInt32(5, info->DisplayInfoID);
    stmt->setUInt32(6, info->Quality);
    stmt->setUInt32(7, info->Flags);
    stmt->setUInt32(8, info->Flags2);
    stmt->setUInt32(9, info->BuyCount);
    stmt->setUInt32(10, info->BuyPrice);
    stmt->setUInt32(11, info->SellPrice);
    stmt->setUInt32(12, info->InventoryType);
    stmt->setInt32(13, info->AllowableClass);
    stmt->setInt32(14, info->AllowableRace);
    stmt->setUInt32(15, info->ItemLevel);
    stmt->setUInt32(16, info->RequiredLevel);
    stmt->setUInt32(17, info->RequiredSkill);
    stmt->setUInt32(18, info->RequiredSkillRank);
    stmt->setUInt32(19, info->RequiredSpell);
    stmt->setUInt32(20, info->RequiredHonorRank);
    stmt->setUInt32(21, info->RequiredCityRank);
    stmt->setUInt32(22, info->RequiredReputationFaction);
    stmt->setUInt32(23, info->RequiredReputationRank);
    stmt->setUInt32(24, info->MaxCount);
    stmt->setUInt32(25, info->Stackable);
    stmt->setUInt32(26, info->ContainerSlots);
    stmt->setUInt32(27, info->StatsCount);
    stmt->setUInt32(28,info->ItemStat[0].ItemStatType);
    stmt->setUInt32(29,info->ItemStat[0].ItemStatValue);
    stmt->setUInt32(30,info->ItemStat[1].ItemStatType);
    stmt->setUInt32(31,info->ItemStat[1].ItemStatValue);
    stmt->setUInt32(32,info->ItemStat[2].ItemStatType);
    stmt->setUInt32(33,info->ItemStat[2].ItemStatValue);
    stmt->setUInt32(34,info->ItemStat[3].ItemStatType);
    stmt->setUInt32(35,info->ItemStat[3].ItemStatValue);
    stmt->setUInt32(36,info->ItemStat[4].ItemStatType);
    stmt->setUInt32(37,info->ItemStat[4].ItemStatValue);
    stmt->setUInt32(38,info->ItemStat[5].ItemStatType);
    stmt->setUInt32(39,info->ItemStat[5].ItemStatValue);
    stmt->setUInt32(40,info->ItemStat[6].ItemStatType);
    stmt->setUInt32(41,info->ItemStat[6].ItemStatValue);
    stmt->setUInt32(42,info->ItemStat[7].ItemStatType);
    stmt->setUInt32(43,info->ItemStat[7].ItemStatValue);
    stmt->setUInt32(44,info->ItemStat[8].ItemStatType);
    stmt->setUInt32(45,info->ItemStat[8].ItemStatValue);
    stmt->setUInt32(46,info->ItemStat[9].ItemStatType);
    stmt->setUInt32(47,info->ItemStat[9].ItemStatValue);
    stmt->setUInt32(48, info->ScalingStatDistribution);
    stmt->setUInt32(49, info->ScalingStatValue);
    stmt->setUInt32(50, info->Damage[0].DamageMin);
    stmt->setUInt32(51, info->Damage[0].DamageMax);
    stmt->setUInt32(52, info->Damage[0].DamageType);
    stmt->setUInt32(53, info->Damage[1].DamageMin);
    stmt->setUInt32(54, info->Damage[1].DamageMax);
    stmt->setUInt32(55, info->Damage[1].DamageType);
    stmt->setUInt32(56, info->Armor);
    stmt->setUInt32(57, info->HolyRes);
    stmt->setUInt32(58, info->FireRes);
    stmt->setUInt32(59, info->NatureRes);
    stmt->setUInt32(60, info->FrostRes);
    stmt->setUInt32(61, info->ShadowRes);
    stmt->setUInt32(62, info->ArcaneRes);
    stmt->setUInt32(63, info->Delay);
    stmt->setUInt32(64, info->AmmoType);
    stmt->setUInt32(65, info->RangedModRange);
    stmt->setUInt32(66, info->Spells[0].SpellId);
    stmt->setUInt32(67, info->Spells[0].SpellTrigger);
    stmt->setUInt32(68, info->Spells[0].SpellCharges);
    stmt->setUInt32(69, info->Spells[0].SpellPPMRate);
    stmt->setUInt32(70, info->Spells[0].SpellCooldown);
    stmt->setUInt32(71, info->Spells[0].SpellCategory);
    stmt->setUInt32(72, info->Spells[0].SpellCategoryCooldown);
    stmt->setUInt32(73, info->Spells[1].SpellId);
    stmt->setUInt32(74, info->Spells[1].SpellTrigger);
    stmt->setUInt32(75, info->Spells[1].SpellCharges);
    stmt->setUInt32(76, info->Spells[1].SpellPPMRate);
    stmt->setUInt32(77, info->Spells[1].SpellCooldown);
    stmt->setUInt32(78, info->Spells[1].SpellCategory);
    stmt->setUInt32(79, info->Spells[1].SpellCategoryCooldown);
    stmt->setUInt32(80, info->Spells[2].SpellId);
    stmt->setUInt32(81, info->Spells[2].SpellTrigger);
    stmt->setUInt32(82, info->Spells[2].SpellCharges);
    stmt->setUInt32(83, info->Spells[2].SpellPPMRate);
    stmt->setUInt32(84, info->Spells[2].SpellCooldown);
    stmt->setUInt32(85, info->Spells[2].SpellCategory);
    stmt->setUInt32(86, info->Spells[2].SpellCategoryCooldown);
    stmt->setUInt32(87, info->Spells[3].SpellId);
    stmt->setUInt32(88, info->Spells[3].SpellTrigger);
    stmt->setUInt32(89, info->Spells[3].SpellCharges);
    stmt->setUInt32(90, info->Spells[3].SpellPPMRate);
    stmt->setUInt32(91, info->Spells[3].SpellCooldown);
    stmt->setUInt32(92, info->Spells[3].SpellCategory);
    stmt->setUInt32(93, info->Spells[3].SpellCategoryCooldown);
    stmt->setUInt32(94, info->Spells[4].SpellId);
    stmt->setUInt32(95, info->Spells[4].SpellTrigger);
    stmt->setUInt32(96, info->Spells[4].SpellCharges);
    stmt->setUInt32(97, info->Spells[4].SpellPPMRate);
    stmt->setUInt32(98, info->Spells[4].SpellCooldown);
    stmt->setUInt32(99, info->Spells[4].SpellCategory);
    stmt->setUInt32(100, info->Spells[4].SpellCategoryCooldown);
    stmt->setUInt32(101, info->Spells[5].SpellId);
    stmt->setUInt32(102, info->Spells[5].SpellTrigger);
    stmt->setUInt32(103, info->Spells[5].SpellCharges);
    stmt->setUInt32(104, info->Spells[5].SpellPPMRate);
    stmt->setUInt32(105, info->Spells[5].SpellCooldown);
    stmt->setUInt32(106, info->Spells[5].SpellCategory);
    stmt->setUInt32(107, info->Spells[5].SpellCategoryCooldown);
    stmt->setUInt32(108, info->Bonding);
    stmt->setString(109, info->Description);
    stmt->setUInt32(110, info->PageText);
    stmt->setUInt32(111, info->LanguageID);
    stmt->setUInt32(112, info->PageMaterial);
    stmt->setUInt32(113, info->StartQuest);
    stmt->setUInt32(114, info->LockID);
    stmt->setUInt32(115, info->Material);
    stmt->setUInt32(116, info->Sheath);
    stmt->setUInt32(117, info->RandomProperty);
    stmt->setUInt32(118, info->RandomSuffix);
    stmt->setUInt32(119, info->Block);
    stmt->setUInt32(120, info->ItemSet);
    stmt->setUInt32(121, info->MaxDurability);
    stmt->setUInt32(122, info->Area);
    stmt->setUInt32(123, info->Map);
    stmt->setUInt32(124, info->BagFamily);
    stmt->setUInt32(125, info->TotemCategory);
    stmt->setUInt32(126, info->Socket[0].Color);
    stmt->setUInt32(127, info->Socket[0].Content);
    stmt->setUInt32(128, info->Socket[1].Color);
    stmt->setUInt32(129, info->Socket[1].Content);
    stmt->setUInt32(130, info->Socket[2].Color);
    stmt->setUInt32(131, info->Socket[2].Content);
    stmt->setUInt32(132, info->socketBonus);
    stmt->setUInt32(133, info->GemProperties);
    stmt->setInt32(134, info->RequiredDisenchantSkill);
    stmt->setUInt32(135, info->ArmorDamageModifier);
    stmt->setUInt32(136, info->Duration);
    stmt->setUInt32(137, info->ItemLimitCategory);
    stmt->setUInt32(138, info->HolidayId);
    stmt->setUInt32(139, info->ScriptId);
    stmt->setUInt32(140, info->DisenchantID);
    stmt->setUInt32(141, info->FoodType);
    stmt->setUInt32(142, info->MinMoneyLoot);
    stmt->setUInt32(143, info->MaxMoneyLoot);
    stmt->setUInt32(144, info->FlagsCu);

    trans->Append(stmt);

    CharacterDatabase.CommitTransaction(trans);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSItemTemplate::SaveItemTemplate not implemented for AzerothCore");
#endif

}

//Lua functions
std::string TSItemTemplate::LGetName()
{
    return GetName().std_str();
}

std::string TSItemTemplate::LGetDescription()
{
    return GetDescription().std_str();
}
int32 TSItemTemplate::LGetFeralBonus0(int32 extraDPS)
{
    return GetFeralBonus(extraDPS);
}
int32 TSItemTemplate::LGetFeralBonus1()
{
    return GetFeralBonus();
}
