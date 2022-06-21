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
class TSPlayer;

enum Outfit : uint32_t {
    SOUND_ID   = 0x1,
    GUILD      = 0x2,
    CLASS      = 0x4,

    HEAD       = 0x8,
    SHOULDERS  = 0x10,
    BODY       = 0x20,
    CHEST      = 0x40,
    WAIST      = 0x80,
    LEGS       = 0x100,
    FEET       = 0x200,
    WRISTS     = 0x400,
    HANDS      = 0x800,
    BACK       = 0x1000,
    MAINHAND   = 0x2000,
    OFFHAND    = 0x4000,
    RANGED     = 0x8000,

    WEAPONS = MAINHAND | OFFHAND | RANGED,
    ARMOR = HEAD | SHOULDERS | BODY | CHEST | WAIST
                 | LEGS | FEET | WRISTS | HANDS | BACK,
    GEAR = WEAPONS | ARMOR,
    EVERYTHING = GEAR | SOUND_ID | GUILD | CLASS
};

class TC_GAME_API TSOutfit {
#if TRINITY
    std::shared_ptr<CreatureOutfit> m_outfit;
    friend class TSCreature;
public:
    TSOutfit(uint32_t race, uint8_t gender);
    TSOutfit(std::shared_ptr<CreatureOutfit> outfit);

    TSOutfit* operator->() { return this; }

    operator bool() const { return m_outfit != nullptr; }
    bool operator==(TSOutfit const& rhs) { return m_outfit == rhs.m_outfit; }

    TSOutfit(
          TSPlayer player
        , uint32_t settings
        , int32_t race, int32_t gender
    );

    TSOutfit(
          TSOutfit outfit
        , uint32_t settings
        , int32_t race, int32_t gender
    );

    TSOutfit& SetClass(uint8_t Class);
    uint8_t GetClass();

    TSOutfit& SetFace(uint8_t face);
    uint8_t GetFace();

    TSOutfit& SetSkin(uint8_t face);
    uint8_t GetSkin();

    TSOutfit& SetHairStyle(uint8_t face);
    uint8_t GetHairStyle();

    TSOutfit& SetFacialStyle(uint8_t facialStyle);
    uint8_t GetFacialStyle();

    TSOutfit& SetHairColor(uint8_t face);
    uint8_t GetHairColor();

    TSOutfit& SetSoundID(uint32_t soundId);
    uint32_t GetSoundID();

    TSOutfit& SetGuild(uint64_t guild);
    uint64_t GetGuild();

    uint8_t GetGender();
    uint8_t GetRace();
    uint32_t GetDisplayID();

    void SetDisplayID(uint32 displayID);

    TSOutfit& SetItem(uint8_t slot, uint32_t entry);
    TSOutfit& ClearItem(uint8_t slot);
    TSOutfit& SetItemByDisplayID(uint8_t slot, uint32_t displayId);

    TSOutfit& SetMainhand(uint32_t mainhand);
    TSOutfit& SetOffhand(uint32_t offhand);
    TSOutfit& SetRanged(uint32_t ranged);

    TSOutfit& ClearMainhand();
    TSOutfit& ClearOffhand();
    TSOutfit& ClearRanged();

    int32_t GetMainhand();
    int32_t GetOffhand();
    int32_t GetRanged();

    uint32_t GetDisplayID(uint8_t slot);

    TSOutfit& ApplyRef(TSCreature creature);

    TSOutfit& ApplyCopy(
          TSCreature creature
        , uint32_t settings = Outfit::EVERYTHING
        , int32_t race = -1
        , int32_t gender = -1
    );

    bool IsNull();
private:
    void PItem(
          TSPlayer& player
        , uint32_t settings
        , uint32_t value
        , uint8_t slot
    );
    void OItem(
          TSOutfit& outfit
        , uint32_t settings
        , uint32_t value
        , uint8_t slot
    );

    void LApplyCopy0(TSCreature creature, uint32_t settings, int32_t race, int32_t gender);
    void LApplyCopy1(TSCreature creature, uint32_t settings, int32_t race);
    void LApplyCopy2(TSCreature creature, uint32_t settings);
    void LApplyCopy3(TSCreature creature);
    friend class TSLua;
#endif
};

#if TRINITY
TSOutfit TC_GAME_API CreateOutfit(uint32_t race, uint32_t gender);
#endif
