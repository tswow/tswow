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

#include <memory>
#include <cstdint>

class CreatureOutfit;
class TSCreature;

class TSOutfit {
    std::shared_ptr<CreatureOutfit> m_outfit;
    friend class TSCreature;
public:
    TSOutfit(uint32_t race, uint8_t gender);
    TSOutfit(std::shared_ptr<CreatureOutfit> outfit);

    void SetClass(uint8_t Class);
    uint8_t GetClass();

    void SetFace(uint8_t face);
    uint8_t GetFace();

    void SetSkin(uint8_t face);
    uint8_t GetSkin();

    void SetHair(uint8_t face);
    uint8_t GetHair();

    void SetHairColor(uint8_t face);
    uint8_t GetHairColor();

    void SetSoundID(uint32_t soundId);
    uint32_t GetSoundID();

    void SetGuild(uint64_t guild);
    uint64_t GetGuild();

    uint8_t GetGender();
    uint8_t GetRace();
    uint32_t GetDisplayID();

    void SetItemByEntry(uint8_t slot, uint32_t entry);
    void SetItemByDisplayID(uint8_t slot, uint32_t displayId);
    uint32_t GetDisplayID(uint8_t slot);
};
