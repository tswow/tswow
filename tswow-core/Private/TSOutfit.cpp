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
#if TRINITY
#include "TSOutfit.h"
#include "TSPlayer.h"
#include "TSItem.h"
#include "TSCreature.h"
#include "CreatureOutfit.h"
#include "Player.h"

TSOutfit::TSOutfit(uint32_t race, uint8_t gender)
    : m_outfit(std::make_shared<CreatureOutfit>(race,static_cast<Gender>(gender)))
{}

TSOutfit::TSOutfit(std::shared_ptr<CreatureOutfit> outfit)
    : m_outfit(outfit)
{}

TSOutfit & TSOutfit::SetClass(uint8_t Class)
{
    m_outfit->Class = Class;
    return *this;
}
uint8_t TSOutfit::GetClass()
{
    return m_outfit->Class;
}

TSOutfit & TSOutfit::SetFace(uint8_t face)
{
    m_outfit->face = face;
    return *this;
}
uint8_t TSOutfit::GetFace()
{
    return m_outfit->face;
}

TSOutfit & TSOutfit::SetSkin(uint8_t skin)
{
    m_outfit->skin = skin;
    return *this;
}
uint8_t TSOutfit::GetSkin()
{
    return m_outfit->skin;
}

TSOutfit & TSOutfit::SetHairStyle(uint8_t hair)
{
    m_outfit->hair = hair;
    return *this;
}
uint8_t TSOutfit::GetHairStyle()
{
    return m_outfit->hair;
}

TSOutfit & TSOutfit::SetHairColor(uint8_t hairColor)
{
    m_outfit->haircolor = hairColor;
    return *this;
}
uint8_t TSOutfit::GetHairColor()
{
    return m_outfit->haircolor;
}

TSOutfit & TSOutfit::SetSoundID(uint32_t soundId)
{
    m_outfit->npcsoundsid = soundId;
    return *this;
}
uint32_t TSOutfit::GetSoundID()
{
    return m_outfit->npcsoundsid;
}

TSOutfit & TSOutfit::SetGuild(uint64_t guild)
{
    m_outfit->guild = guild;
    return *this;
}
uint64_t TSOutfit::GetGuild()
{
    return m_outfit->guild;
}

uint8_t TSOutfit::GetGender()
{
    return m_outfit->GetGender();
}
uint8_t TSOutfit::GetRace()
{
    return m_outfit->GetRace();
}
uint32_t TSOutfit::GetDisplayID()
{
    return m_outfit->GetDisplayId();
}
    void TSOutfit::SetDisplayID(uint32 displayID)
    {
        m_outfit->SetDisplayId(displayID);
    }

TSOutfit & TSOutfit::SetItem(uint8_t slot, uint32_t entry)
{
    if (slot == EquipmentSlots::EQUIPMENT_SLOT_MAINHAND)
    {
        return SetMainhand(entry);
    }

    if (slot == EquipmentSlots::EQUIPMENT_SLOT_OFFHAND)
    {
        return SetMainhand(entry);
    }

    if (slot == EquipmentSlots::EQUIPMENT_SLOT_RANGED)
    {
        return SetRanged(entry);
    }

    m_outfit->SetItemEntry(static_cast<EquipmentSlots>(slot), entry);
    return *this;
}

TSOutfit & TSOutfit::SetItemByDisplayID(uint8_t slot, uint32_t displayId)
{
    m_outfit->SetItemDisplay(static_cast<EquipmentSlots>(slot), displayId);
    return *this;
}
uint32_t TSOutfit::GetDisplayID(uint8_t slot)
{
    return m_outfit->outfitdisplays[slot];
}

TSOutfit& TSOutfit::SetFacialStyle(uint8_t facialStyle)
{
    m_outfit->facialhair = facialStyle;
    return *this;
}

uint8_t TSOutfit::GetFacialStyle()
{
    return m_outfit->facialhair;
}

bool TSOutfit::IsNull()
{
    return m_outfit == nullptr;
}

TSOutfit& TSOutfit::ApplyCopy(
      TSCreature creature
    , uint32_t settings
    , int32_t race
    , int32_t gender
)
{
    creature.SetOutfit(TSOutfit(*this, settings, race, gender));
    return *this;
}

TSOutfit& TSOutfit::ApplyRef(TSCreature creature)
{
    creature.SetOutfit(*this);
    return *this;
}


TSOutfit::TSOutfit(TSPlayer p, uint32_t s, int32_t race, int32_t gender)
    : m_outfit(std::make_shared<CreatureOutfit>(
          race>0 ? race : p.GetRace()
        , Gender(gender>=0 ? gender: p.GetGender())
    ))
{
    if (race<=0 && gender<0)
    {
        SetFace(p.GetFace());
        SetHairStyle(p.GetHairStyle());
        SetHairColor(p.GetHairColor());
        SetSkin(p.GetSkinColor());
        SetFacialStyle(p.GetFacialStyle());
    }

    if (s & Outfit::GUILD)
    {
        SetGuild(p.GetGuildID());
    }

    if (s & Outfit::CLASS)
    {
        SetClass(p.GetClass());
    }

    PItem(p, s, Outfit::BACK, EquipmentSlots::EQUIPMENT_SLOT_BACK);
    PItem(p, s, Outfit::BODY, EquipmentSlots::EQUIPMENT_SLOT_BODY);
    PItem(p, s, Outfit::CHEST, EquipmentSlots::EQUIPMENT_SLOT_CHEST);
    PItem(p, s, Outfit::FEET, EquipmentSlots::EQUIPMENT_SLOT_FEET);
    PItem(p, s, Outfit::HANDS, EquipmentSlots::EQUIPMENT_SLOT_HANDS);
    PItem(p, s, Outfit::HEAD, EquipmentSlots::EQUIPMENT_SLOT_HEAD);
    PItem(p, s, Outfit::LEGS, EquipmentSlots::EQUIPMENT_SLOT_LEGS);
    PItem(p, s, Outfit::MAINHAND, EquipmentSlots::EQUIPMENT_SLOT_MAINHAND);
    PItem(p, s, Outfit::OFFHAND, EquipmentSlots::EQUIPMENT_SLOT_OFFHAND);
    PItem(p, s, Outfit::RANGED, EquipmentSlots::EQUIPMENT_SLOT_RANGED);
    PItem(p, s, Outfit::SHOULDERS, EquipmentSlots::EQUIPMENT_SLOT_SHOULDERS);
    PItem(p, s, Outfit::WAIST, EquipmentSlots::EQUIPMENT_SLOT_WAIST);
    PItem(p, s, Outfit::WRISTS, EquipmentSlots::EQUIPMENT_SLOT_WRISTS);
}

TSOutfit::TSOutfit(
      TSOutfit o
    , uint32_t s
    , int32_t race, int32_t gender
) : m_outfit(std::make_shared<CreatureOutfit>(
      race > 0 ? race : o.GetRace()
    , Gender(gender > 0 ? gender : o.GetGender())
)) {
    if (race <= 0 && gender <= 0)
    {
        SetFace(o.GetFace());
        SetHairStyle(o.GetHairStyle());
        SetHairColor(o.GetHairColor());
        SetSkin(o.GetHairStyle());
        SetFacialStyle(o.GetFacialStyle());
    }

    OItem(o, s, Outfit::BACK, EquipmentSlots::EQUIPMENT_SLOT_BACK);
    OItem(o, s, Outfit::BODY, EquipmentSlots::EQUIPMENT_SLOT_BODY);
    OItem(o, s, Outfit::CHEST, EquipmentSlots::EQUIPMENT_SLOT_CHEST);
    OItem(o, s, Outfit::FEET, EquipmentSlots::EQUIPMENT_SLOT_FEET);
    OItem(o, s, Outfit::HANDS, EquipmentSlots::EQUIPMENT_SLOT_HANDS);
    OItem(o, s, Outfit::HEAD, EquipmentSlots::EQUIPMENT_SLOT_HEAD);
    OItem(o, s, Outfit::LEGS, EquipmentSlots::EQUIPMENT_SLOT_LEGS);
    OItem(o, s, Outfit::MAINHAND, EquipmentSlots::EQUIPMENT_SLOT_MAINHAND);
    OItem(o, s, Outfit::OFFHAND, EquipmentSlots::EQUIPMENT_SLOT_OFFHAND);
    OItem(o, s, Outfit::RANGED, EquipmentSlots::EQUIPMENT_SLOT_RANGED);
    OItem(o, s, Outfit::SHOULDERS, EquipmentSlots::EQUIPMENT_SLOT_SHOULDERS);
    OItem(o, s, Outfit::WAIST, EquipmentSlots::EQUIPMENT_SLOT_WAIST);
    OItem(o, s, Outfit::WRISTS, EquipmentSlots::EQUIPMENT_SLOT_WRISTS);

    if (s & Outfit::GUILD)
    {
        SetGuild(o.GetGuild());
    }

    if (s & Outfit::CLASS)
    {
        SetClass(o.GetClass());
    }

    if (s & Outfit::SOUND_ID)
    {
        SetSoundID(o.GetSoundID());
    }
}

TSOutfit& TSOutfit::SetMainhand(uint32_t mainhand)
{
    m_outfit->mainhand = mainhand;
    return *this;
}
TSOutfit& TSOutfit::SetOffhand(uint32_t offhand)
{
    m_outfit->offhand = offhand;
    return *this;
}
TSOutfit& TSOutfit::SetRanged(uint32_t ranged)
{
    m_outfit->ranged = ranged;
    return *this;
}

TSOutfit& TSOutfit::ClearItem(uint8_t slot)
{
    if (slot == EquipmentSlots::EQUIPMENT_SLOT_MAINHAND)
    {
        return ClearMainhand();
    }

    if (slot == EquipmentSlots::EQUIPMENT_SLOT_OFFHAND)
    {
        return ClearOffhand();
    }

    if (slot == EquipmentSlots::EQUIPMENT_SLOT_RANGED)
    {
        return ClearRanged();
    }

    return SetItemByDisplayID(slot, 0);
}

TSOutfit& TSOutfit::ClearMainhand()
{
    m_outfit->mainhand = -1;
    return *this;
}
TSOutfit& TSOutfit::ClearOffhand()
{
    m_outfit->offhand = -1;
    return *this;
}
TSOutfit& TSOutfit::ClearRanged()
{
    m_outfit->ranged = -1;
    return *this;
}

void TSOutfit::OItem(TSOutfit& player, uint32_t settings, uint32_t value, uint8_t slot)
{
    if (settings & value)
    {
        SetItemByDisplayID(slot, player.GetDisplayID(slot));
    }
}

void TSOutfit::PItem(TSPlayer& player, uint32_t settings, uint32_t value, uint8_t slot)
{
    if (settings & value)
    {
        TSItem item = player.GetEquippedItemBySlot(slot);
        SetItem(slot, item.IsNull() ? 0 : item.GetEntry());
    }
}

int32_t TSOutfit::GetMainhand()
{
    return m_outfit->mainhand;
}

int32_t TSOutfit::GetOffhand()
{
    return m_outfit->offhand;
}

int32_t TSOutfit::GetRanged()
{
    return m_outfit->ranged;
}

TSOutfit CreateOutfit(uint32_t race, uint32_t gender)
{
    return TSOutfit(race,gender);
}

void TSOutfit::LApplyCopy0(TSCreature creature, uint32_t settings, int32_t race, int32_t gender)
{
    ApplyCopy(creature, settings, race, gender);
}

void TSOutfit::LApplyCopy1(TSCreature creature, uint32_t settings, int32_t race)
{
    ApplyCopy(creature, settings, race);
}

void TSOutfit::LApplyCopy2(TSCreature creature, uint32_t settings)
{
    ApplyCopy(creature, settings);
}

void TSOutfit::LApplyCopy3(TSCreature creature)
{
    ApplyCopy(creature);
}

#endif
