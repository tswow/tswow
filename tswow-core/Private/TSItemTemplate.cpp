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

TSNumber<uint32> TSItemTemplate::GetEntry() { return info->ItemId; };
void TSItemTemplate::SetEntry(uint32 value) {
    info->ItemId = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetClass() { return info->Class; };
void TSItemTemplate::SetClass(uint32 value) {
    info->Class = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetSubClass() { return info->SubClass; };
void  TSItemTemplate::SetSubClass(uint32 value) {
    info->SubClass = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetSoundOverrideSubclass() { return info->SoundOverrideSubclass; };
void  TSItemTemplate::SetSoundOverrideSubclass(int32 value) {
    info->SoundOverrideSubclass = value;
    info->m_isDirty = true;
};
std::string TSItemTemplate::GetName() { return info->Name1; };
void TSItemTemplate::SetName(std::string const& name) {
    info->Name1 = name;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetDisplayInfoID() { return info->DisplayInfoID; };
void TSItemTemplate::SetDisplayInfoID(uint32 value) {
    info->DisplayInfoID = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetQuality() { return info->Quality; };
void TSItemTemplate::SetQuality(uint32 value) {
    info->Quality = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetFlags() { return info->Flags; };
void TSItemTemplate::SetFlags(uint32 value) {
    info->Flags = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetFlags2() { return info->Flags2; };
void TSItemTemplate::SetFlags2(uint32 value) {
    info->Flags2 = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetBuyCount() { return info->BuyCount; };
void TSItemTemplate::SetBuyCount(uint32 value) {
    info->BuyCount = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetBuyPrice() { return info->BuyPrice; };
void  TSItemTemplate::SetBuyPrice(int32 value) {
    info->BuyPrice = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetSellPrice() { return info->SellPrice; };
void TSItemTemplate::SetSellPrice(uint32 value) {
    info->SellPrice = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetInventoryType() { return info->InventoryType; };
void TSItemTemplate::SetInventoryType(uint32 value) {
    info->InventoryType = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetAllowableClass() { return info->AllowableClass; };
void TSItemTemplate::SetAllowableClass(uint32 value) {
    info->AllowableClass = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetAllowableRace() { return info->AllowableRace; };
void TSItemTemplate::SetAllowableRace(uint32 value) {
    info->AllowableRace = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetItemLevel() { return info->ItemLevel; };
void TSItemTemplate::SetItemLevel(uint32 value) {
    info->ItemLevel = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredLevel() { return info->RequiredLevel; };
void TSItemTemplate::SetRequiredLevel(uint32 value) {
    info->RequiredLevel = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredSkill() { return info->RequiredSkill; };
void TSItemTemplate::SetRequiredSkill(uint32 value) {
    info->RequiredSkill = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredSkillRank() { return info->RequiredSkillRank; };
void TSItemTemplate::SetRequiredSkillRank(uint32 value) {
    info->RequiredSkillRank = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredSpell() { return info->RequiredSpell; };
void TSItemTemplate::SetRequiredSpell(uint32 value) {
    info->RequiredSpell = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredHonorRank() { return info->RequiredHonorRank; };
void TSItemTemplate::SetRequiredHonorRank(uint32 value) {
    info->RequiredHonorRank = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredCityRank() { return info->RequiredCityRank; };
void TSItemTemplate::SetRequiredCityRank(uint32 value) {
    info->RequiredCityRank = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredReputationFaction() { return info->RequiredReputationFaction; };
void TSItemTemplate::SetRequiredReputationFaction(uint32 value) {
    info->RequiredReputationFaction = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredReputationRank() { return info->RequiredReputationRank; };
void TSItemTemplate::SetRequiredReputationRank(uint32 value) {
    info->RequiredReputationRank = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetMaxCount() { return info->MaxCount; };
void  TSItemTemplate::SetMaxCount(int32 value) {
    info->MaxCount = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetStackable() { return info->Stackable; };
void  TSItemTemplate::SetStackable(int32 value) {
    info->Stackable = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetContainerSlots() { return info->ContainerSlots; };
void  TSItemTemplate::SetContainerSlots(uint32 value) {
    info->ContainerSlots = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetStatsCount() { return info->StatsCount; };
void TSItemTemplate::SetStatsCount(uint32 value) {
    info->StatsCount = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetScalingStatDistribution() { return info->ScalingStatDistribution; };
void TSItemTemplate::SetScalingStatDistribution(uint32 value) {
    info->ScalingStatDistribution = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetScalingStatValue() { return info->ScalingStatValue; };
void TSItemTemplate::SetScalingStatValue(uint32 value) {
    info->ScalingStatValue = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetArmor() { return info->Armor; };
void TSItemTemplate::SetArmor(int32 value) {
    info->Armor = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetHolyRes() { return info->HolyRes; };
void TSItemTemplate::SetHolyRes(int32 value) {
    info->HolyRes = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetFireRes() { return info->FireRes; };
void TSItemTemplate::SetFireRes(int32 value) {
    info->FireRes = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetNatureRes() { return info->NatureRes; };
void TSItemTemplate::SetNatureRes(int32 value) {
    info->NatureRes = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetFrostRes() { return info->FrostRes; };
void TSItemTemplate::SetFrostRes(int32 value) {
    info->FrostRes = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetShadowRes() { return info->ShadowRes; };
void TSItemTemplate::SetShadowRes(int32 value) {
    info->ShadowRes = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetArcaneRes() { return info->ArcaneRes; };
void TSItemTemplate::SetArcaneRes(int32 value) {
    info->ArcaneRes = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetDelay() { return info->Delay; };
void TSItemTemplate::SetDelay(uint32 value) {
    info->Delay = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetAmmoType() { return info->AmmoType; };
void TSItemTemplate::SetAmmoType(uint32 value) {
    info->AmmoType = value;
    info->m_isDirty = true;
};
TSNumber<float> TSItemTemplate::GetRangedModRange() { return info->RangedModRange; };
void TSItemTemplate::SetRangedModRange(float value) {
    info->RangedModRange = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetBonding() { return info->Bonding; };
void TSItemTemplate::SetBonding(uint32 value) {
    info->Bonding = value;
    info->m_isDirty = true;
};
std::string TSItemTemplate::GetDescription() { return info->Description; };
void TSItemTemplate::SetDescription(std::string const& desc) {
    info->Description = desc;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetPageText() { return info->PageText; };
void TSItemTemplate::SetPageText(uint32 value) {
    info->PageText = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetLanguageID() { return info->LanguageID; };
void TSItemTemplate::SetLanguageID(uint32 value) {
    info->LanguageID = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetPageMaterial() { return info->PageMaterial; };
void TSItemTemplate::SetPageMaterial(uint32 value) {
    info->PageMaterial = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetStartQuest() { return info->StartQuest; };
void TSItemTemplate::SetStartQuest(uint32 value) {
    info->StartQuest = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetLockID() { return info->LockID; };
void TSItemTemplate::SetLockID(uint32 value) {
    info->LockID = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetMaterial() { return info->Material; };
void  TSItemTemplate::SetMaterial(int32 value) {
    info->Material = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetSheath() { return info->Sheath; };
void TSItemTemplate::SetSheath(uint32 value) {
    info->Sheath = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetRandomProperty() { return info->RandomProperty; };
void  TSItemTemplate::SetRandomProperty(int32 value) {
    info->RandomProperty = value;
    info->m_isDirty = true;
};
TSNumber<int32> TSItemTemplate::GetRandomSuffix() { return info->RandomSuffix; };
void  TSItemTemplate::SetRandomSuffix(int32 value) {
    info->RandomSuffix = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetBlock() { return info->Block; };
void TSItemTemplate::SetBlock(uint32 value) {
    info->Block = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetItemSet() { return info->ItemSet; };
void TSItemTemplate::SetItemSet(uint32 value) {
    info->ItemSet = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetMaxDurability() { return info->MaxDurability; };
void TSItemTemplate::SetMaxDurability(uint32 value) {
    info->MaxDurability = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetArea() { return info->Area; };
void TSItemTemplate::SetArea(uint32 value) {
    info->Area = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetMap() { return info->Map; };
void TSItemTemplate::SetMap(uint32 value) {
    info->Map = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetBagFamily() { return info->BagFamily; };
void TSItemTemplate::SetBagFamily(uint32 value) {
    info->BagFamily = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetTotemCategory() { return info->TotemCategory; };
void TSItemTemplate::SetTotemCategory(uint32 value) {
    info->TotemCategory = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetSocketBonus() { return info->socketBonus; };
void TSItemTemplate::SetSocketBonus(uint32 value) {
    info->socketBonus = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetGemProperties() { return info->GemProperties; };
void TSItemTemplate::SetGemProperties(uint32 value) {
    info->GemProperties = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetRequiredDisenchantSkill() { return info->RequiredDisenchantSkill; };
void TSItemTemplate::SetRequiredDisenchantSkill(uint32 value) {
    info->RequiredDisenchantSkill = value;
    info->m_isDirty = true;
};
TSNumber<float> TSItemTemplate::GetArmorDamageModifier() { return info->ArmorDamageModifier; };
void  TSItemTemplate::SetArmorDamageModifier(float value) {
    info->ArmorDamageModifier = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetDuration() { return info->Duration; };
void TSItemTemplate::SetDuration(uint32 value) {
    info->Duration = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetItemLimitCategory() { return info->ItemLimitCategory; };
void TSItemTemplate::SetItemLimitCategory(uint32 value) {
    info->ItemLimitCategory = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetHolidayID() { return info->HolidayId; };
void TSItemTemplate::SetHolidayID(uint32 value) {
    info->HolidayId = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetScriptID() { return info->ScriptId; };
void TSItemTemplate::SetScriptID(uint32 value) {
    info->ScriptId = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetDisenchantID() { return info->DisenchantID; };
void TSItemTemplate::SetDisenchantID(uint32 value) {
    info->DisenchantID = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetFoodType() { return info->FoodType; };
void TSItemTemplate::SetFoodType(uint32 value) {
    info->FoodType = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetMinMoneyLoot() { return info->MinMoneyLoot; };
void TSItemTemplate::SetMinMoneyLoot(uint32 value) {
    info->MinMoneyLoot = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetMaxMoneyLoot() { return info->MaxMoneyLoot; };
void TSItemTemplate::SetMaxMoneyLoot(uint32 value) {
    info->MaxMoneyLoot = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetFlagsCu() { return info->FlagsCu; };
void TSItemTemplate::SetFlagsCu(uint32 value) {
    info->FlagsCu = value;
    info->m_isDirty = true;
};
TSNumber<uint32> TSItemTemplate::GetStatType(uint32 index) { return info->ItemStat[index].ItemStatType; }
void TSItemTemplate::SetStatType(uint32 index, uint32 value) {
    info->ItemStat[index].ItemStatType = value;
    info->m_isDirty = true;
}
TSNumber<int32> TSItemTemplate::GetStatValue(uint32 index) { return info->ItemStat[index].ItemStatValue; }
void TSItemTemplate::SetStatValue(uint32 index, int32 value) {
    info->ItemStat[index].ItemStatValue = value;
    info->m_isDirty = true;
}
TSNumber<float> TSItemTemplate::GetDamageMinA() { return info->Damage[0].DamageMin; }
void TSItemTemplate::SetDamageMinA(float value) {
    info->Damage[0].DamageMin = value;
    info->m_isDirty = true;
}
TSNumber<float> TSItemTemplate::GetDamageMinB() { return info->Damage[1].DamageMin; }
void TSItemTemplate::SetDamageMinB(float value) {
    info->Damage[1].DamageMin = value;
    info->m_isDirty = true;
}
TSNumber<float> TSItemTemplate::GetDamageMaxA() { return info->Damage[0].DamageMax; }
void TSItemTemplate::SetDamageMaxA(float value) {
    info->Damage[0].DamageMax = value;
    info->m_isDirty = true;
}
TSNumber<float> TSItemTemplate::GetDamageMaxB() { return info->Damage[1].DamageMax; }
void TSItemTemplate::SetDamageMaxB(float value) {
    info->Damage[1].DamageMax = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetDamageTypeA() { return info->Damage[0].DamageType; }
void TSItemTemplate::SetDamageTypeA(uint32 value) {
    info->Damage[0].DamageType = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetDamageTypeB() { return info->Damage[1].DamageType; }
void TSItemTemplate::SetDamageTypeB(uint32 value) {
    info->Damage[1].DamageType = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellCategory(uint32 index) { return info->Spells[index].SpellCategory; }
void TSItemTemplate::SetSpellCategory(uint32 index, uint32 value) {
    info->Spells[index].SpellCategory = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellCategoryCooldown(uint32 index) { return info->Spells[index].SpellCategoryCooldown; }
void TSItemTemplate::SetSpellCategoryCooldown(uint32 index, uint32 value) {
    info->Spells[index].SpellCategoryCooldown = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellCharges(uint32 index) { return info->Spells[index].SpellCharges; }
void TSItemTemplate::SetSpellCharges(uint32 index, uint32 value) {
    info->Spells[index].SpellCharges = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellCooldown(uint32 index) { return info->Spells[index].SpellCooldown; }
void TSItemTemplate::SetSpellCooldown(uint32 index, uint32 value) {
    info->Spells[index].SpellCooldown = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellID(uint32 index) { return info->Spells[index].SpellId; }
void TSItemTemplate::SetSpellID(uint32 index, uint32 value) {
    info->Spells[index].SpellId = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellPPMRate(uint32 index) { return info->Spells[index].SpellPPMRate; }
void TSItemTemplate::SetSpellPPMRate(uint32 index, uint32 value) {
    info->Spells[index].SpellPPMRate = value;
    info->m_isDirty = true;
}
TSNumber<uint32> TSItemTemplate::GetSpellTrigger(uint32 index) { return info->Spells[index].SpellTrigger; }
void TSItemTemplate::SetSpellTrigger(uint32 index, uint32 value) {
    info->Spells[index].SpellTrigger = value;
    info->m_isDirty = true;
}

//extras
bool TSItemTemplate::IsCurrencyToken() { return info->IsCurrencyToken(); }
TSNumber<uint32> TSItemTemplate::GetMaxStackSize() {return info->GetMaxStackSize(); };
TSNumber<float> TSItemTemplate::GetDPS() { return info->getDPS(); };
bool TSItemTemplate::CanChangeEquipStateInCombat() { return info->CanChangeEquipStateInCombat(); };
TSNumber<int32> TSItemTemplate::GetFeralBonus(int32 extraDPS) { return info->getFeralBonus(extraDPS); }
TSNumber<int32> TSItemTemplate::GetTotalAPBonus() {
#if TRINITY
    return info->GetTotalAPBonus(); 
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSItemTemplate::GetTotalAPBonus not implemented for AzerothCore");
    return 0;
#endif
}
TSNumber<float> TSItemTemplate::GetItemLevelIncludingQuality() {
#if TRINITY
    return info->GetItemLevelIncludingQuality(); 
#elif AZEROTHCORE
    return info->GetItemLevelIncludingQuality(1);
#endif
};
TSNumber<uint32> TSItemTemplate::GetSkill() { return info->GetSkill(); };
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

void TSItemTemplate::Save()
{
#if TRINITY
    CharacterDatabaseTransaction trans = CharacterDatabase.BeginTransaction();

    CharacterDatabasePreparedStatement* stmt = CharacterDatabase.GetPreparedStatement(CHAR_UPD_CUSTOM_ITEM);
    stmt->setUInt32(0, info->ItemId);
    stmt->setUInt32(1, info->Class);
    stmt->setUInt32(2, info->SubClass);
    stmt->setInt32(3, info->SoundOverrideSubclass);
    stmt->setString(4, info->Name1);
    stmt->setUInt32(5, info->DisplayInfoID);
    stmt->setUInt32(6, info->Quality);
    stmt->setUInt32(7, info->Flags);
    stmt->setUInt32(8, info->Flags2);
    stmt->setUInt32(9, info->BuyCount);
    stmt->setInt32(10, info->BuyPrice);
    stmt->setUInt32(11, info->SellPrice);
    stmt->setUInt32(12, info->InventoryType);
    stmt->setInt32(13, int32(info->AllowableClass));
    stmt->setInt32(14, int32(info->AllowableRace));
    stmt->setUInt32(15, info->ItemLevel);
    stmt->setUInt32(16, info->RequiredLevel);
    stmt->setUInt32(17, info->RequiredSkill);
    stmt->setUInt32(18, info->RequiredSkillRank);
    stmt->setUInt32(19, info->RequiredSpell);
    stmt->setUInt32(20, info->RequiredHonorRank);
    stmt->setUInt32(21, info->RequiredCityRank);
    stmt->setUInt32(22, info->RequiredReputationFaction);
    stmt->setUInt32(23, info->RequiredReputationRank);
    stmt->setInt32(24, info->MaxCount);
    stmt->setInt32(25, info->Stackable);
    stmt->setUInt32(26, info->ContainerSlots);
    stmt->setUInt32(27, info->StatsCount);
    stmt->setUInt32(28,info->ItemStat[0].ItemStatType);
    stmt->setInt32(29,info->ItemStat[0].ItemStatValue);
    stmt->setUInt32(30,info->ItemStat[1].ItemStatType);
    stmt->setInt32(31,info->ItemStat[1].ItemStatValue);
    stmt->setUInt32(32,info->ItemStat[2].ItemStatType);
    stmt->setInt32(33,info->ItemStat[2].ItemStatValue);
    stmt->setUInt32(34,info->ItemStat[3].ItemStatType);
    stmt->setInt32(35,info->ItemStat[3].ItemStatValue);
    stmt->setUInt32(36,info->ItemStat[4].ItemStatType);
    stmt->setInt32(37,info->ItemStat[4].ItemStatValue);
    stmt->setUInt32(38,info->ItemStat[5].ItemStatType);
    stmt->setInt32(39,info->ItemStat[5].ItemStatValue);
    stmt->setUInt32(40,info->ItemStat[6].ItemStatType);
    stmt->setInt32(41,info->ItemStat[6].ItemStatValue);
    stmt->setUInt32(42,info->ItemStat[7].ItemStatType);
    stmt->setInt32(43,info->ItemStat[7].ItemStatValue);
    stmt->setUInt32(44,info->ItemStat[8].ItemStatType);
    stmt->setInt32(45,info->ItemStat[8].ItemStatValue);
    stmt->setUInt32(46,info->ItemStat[9].ItemStatType);
    stmt->setInt32(47,info->ItemStat[9].ItemStatValue);
    stmt->setUInt32(48, info->ScalingStatDistribution);
    stmt->setUInt32(49, info->ScalingStatValue);
    stmt->setFloat(50, info->Damage[0].DamageMin);
    stmt->setFloat(51, info->Damage[0].DamageMax);
    stmt->setFloat(52, info->Damage[0].DamageType);
    stmt->setFloat(53, info->Damage[1].DamageMin);
    stmt->setFloat(54, info->Damage[1].DamageMax);
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
    stmt->setFloat(65, info->RangedModRange);

    for (int i = 0; i < 5; ++i)
    {
        stmt->setInt32 ( 66 + i * 7, info->Spells[i].SpellId);
        stmt->setUInt32( 67 + i * 7, info->Spells[i].SpellTrigger);
        stmt->setInt32 ( 68 + i * 7, info->Spells[i].SpellCharges);
        stmt->setFloat ( 69 + i * 7, info->Spells[i].SpellPPMRate);
        stmt->setInt32 ( 70 + i * 7, info->Spells[i].SpellCooldown);
        stmt->setUInt32( 71 + i * 7, info->Spells[i].SpellCategory);
        stmt->setInt32 ( 72 + i * 7, info->Spells[i].SpellCategoryCooldown);
    }
    stmt->setUInt32(101, info->Bonding);
    stmt->setString(102, info->Description);
    stmt->setUInt32(103, info->PageText);
    stmt->setUInt32(104, info->LanguageID);
    stmt->setUInt32(105, info->PageMaterial);
    stmt->setUInt32(106, info->StartQuest);
    stmt->setUInt32(107, info->LockID);
    stmt->setInt32(108, info->Material);
    stmt->setUInt32(109, info->Sheath);
    stmt->setInt32(110, info->RandomProperty);
    stmt->setInt32(111, info->RandomSuffix);
    stmt->setUInt32(112, info->Block);
    stmt->setUInt32(113, info->ItemSet);
    stmt->setUInt32(114, info->MaxDurability);
    stmt->setUInt32(115, info->Area);
    stmt->setUInt32(116, info->Map);
    stmt->setUInt32(117, info->BagFamily);
    stmt->setUInt32(118, info->TotemCategory);
    stmt->setUInt32(119, info->Socket[0].Color);
    stmt->setUInt32(120, info->Socket[0].Content);
    stmt->setUInt32(121, info->Socket[1].Color);
    stmt->setUInt32(122, info->Socket[1].Content);
    stmt->setUInt32(123, info->Socket[2].Color);
    stmt->setUInt32(124, info->Socket[2].Content);
    stmt->setUInt32(125, info->socketBonus);
    stmt->setUInt32(126, info->GemProperties);
    stmt->setInt32(127, int32(info->RequiredDisenchantSkill));
    stmt->setFloat(128, info->ArmorDamageModifier);
    stmt->setUInt32(129, info->Duration);
    stmt->setUInt32(130, info->ItemLimitCategory);
    stmt->setUInt32(131, info->HolidayId);
    stmt->setUInt32(132, info->ScriptId);
    stmt->setUInt32(133, info->DisenchantID);
    stmt->setUInt32(134, info->FoodType);
    stmt->setUInt32(135, info->MinMoneyLoot);
    stmt->setUInt32(136, info->MaxMoneyLoot);
    stmt->setUInt32(137, info->FlagsCu);
    trans->Append(stmt);

    CharacterDatabase.CommitTransaction(trans);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSItemTemplate::SaveItemTemplate not implemented for AzerothCore");
#endif

}

void TSItemTemplate::InitializeQueryData()
{
#if TRINITY
    if(sWorld->getBoolConfig(CONFIG_CACHE_DATA_QUERIES))
    {
        info->InitializeQueryData();
    }
#endif
}
