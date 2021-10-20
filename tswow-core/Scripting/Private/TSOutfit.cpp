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
#include "TSOutfit.h"
#include "CreatureOutfit.h"

TSOutfit::TSOutfit(uint32_t race, uint8_t gender)
    : m_outfit(std::make_shared<CreatureOutfit>(race,static_cast<Gender>(gender)))
{}

TSOutfit::TSOutfit(std::shared_ptr<CreatureOutfit> outfit)
    : m_outfit(outfit)
{}

void TSOutfit::SetClass(uint8_t Class)
{
    m_outfit->Class = Class;
}
uint8_t TSOutfit::GetClass()
{
    return m_outfit->Class;
}

void TSOutfit::SetFace(uint8_t face)
{
    m_outfit->face = face;
}
uint8_t TSOutfit::GetFace()
{
    return m_outfit->face;
}

void TSOutfit::SetSkin(uint8_t skin)
{
    m_outfit->skin = skin;
}
uint8_t TSOutfit::GetSkin()
{
    return m_outfit->skin;
}

void TSOutfit::SetHair(uint8_t hair)
{
    m_outfit->hair = hair;
}
uint8_t TSOutfit::GetHair()
{
    return m_outfit->hair;
}

void TSOutfit::SetHairColor(uint8_t hairColor)
{
    m_outfit->haircolor = hairColor;
}
uint8_t TSOutfit::GetHairColor()
{
    return m_outfit->haircolor;
}

void TSOutfit::SetSoundID(uint32_t soundId)
{
    m_outfit->npcsoundsid = soundId;
}
uint32_t TSOutfit::GetSoundID()
{
    return m_outfit->npcsoundsid;
}

void TSOutfit::SetGuild(uint64_t guild)
{
    m_outfit->guild = guild;
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

void TSOutfit::SetItemByEntry(uint8_t slot, uint32_t entry)
{
    m_outfit->SetItemEntry(static_cast<EquipmentSlots>(slot), entry);
}

void TSOutfit::SetItemByDisplayID(uint8_t slot, uint32_t displayId)
{
    m_outfit->SetItemDisplay(static_cast<EquipmentSlots>(slot), displayId);
}
uint32_t TSOutfit::GetDisplayID(uint8_t slot)
{
    return m_outfit->outfitdisplays[slot];
}
