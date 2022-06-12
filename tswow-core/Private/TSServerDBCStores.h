/*
 * This file is part of the TrinityCore Project. See AUTHORS file for Copyright information
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
#pragma once

#include "SharedDefines.h"
#include "Errors.h"

#include <string>
#include <filesystem>
#include <fstream>

#define SDBC_BROADCAST_TEXT "BroadcastText.dbc"
#define SDBC_CREATURE_TEMPLATE "CreatureTemplate.dbc"
#define SDBC_CREATURE "Creature.dbc"
#define SDBC_GAMEOBJECT_TEMPLATE "GameObjectTemplate.dbc"
#define SDBC_GAMEOBJECT "GameObject.dbc"
#define SDBC_ITEM_TEMPLATE "ItemTemplate.dbc"

class SDBC;

class SDBCRow
{
private:
    SDBCRow() = delete;
    SDBCRow(SDBCRow const& row) = delete;
};

struct SDBCString
{
    uint32 ref;
    char* read(SDBC* dbc);
    bool valid();
};

struct SDBCHeader
{
    uint32 m_magic;
    uint32 m_rowCount;
    uint32 m_fieldCount_unused;
    uint32 m_rowSize;
    uint32 m_stringSize;
};

SDBC* GetSDBC(char const* name);
void UnloadAllSDBC();

class SDBC
{
public:
    SDBC(SDBC const&) = delete;
    SDBC(char const* name);
    bool IsLoaded();
    SDBCHeader m_header;
    uint32 RowCount();
    template <typename T>
    T& GetRow(uint32 index)
    {
        return *reinterpret_cast<T*>(m_rows.data() + index * m_header.m_rowSize);
    }
private:
    std::vector<char> m_strings;
    std::vector<char> m_rows;
    char const* m_name;
    bool m_loaded;
    friend struct SDBCString;
    friend class ServerDBCs;
};

struct SDBCLoc 
{
    SDBCString enUS;
    SDBCString enGB;
    SDBCString koKR;
    SDBCString frFR;
    SDBCString deDE;
    SDBCString enCN;
    SDBCString zhCN;
    SDBCString enTW;
    SDBCString zhTW;
    SDBCString esES;
    SDBCString esMX;
    SDBCString ruRU;
    SDBCString ptPT;
    SDBCString ptBR;
    SDBCString itIT;
    SDBCString Unk;
    SDBCString mask;
    void write(SDBC* dbc, std::vector<std::string>& target, bool writeDef);
};

struct SDBCBroadcastText : public SDBCRow
{
    uint32 ID;
    uint32 LanguageID;
    SDBCLoc Text;
    SDBCLoc Text1;
    uint32 EmoteID1;
    uint32 EmoteID2;
    uint32 EmoteID3;
    uint32 EmoteDelay1;
    uint32 EmoteDelay2;
    uint32 EmoteDelay3;
    uint32 SoundEntriesID;
    uint32 EmotesID;
    uint32 Flags;
};

struct SDBCCreature : public SDBCRow
{
    uint32 guid;
    uint32 id;
    uint32 map;
    uint32 zoneId;
    uint32 areaId;
    uint32 spawnMask;
    uint32 phaseMask;
    uint32 modelid;
    int32 equipment_id;
    float position_x;
    float position_y;
    float position_z;
    float orientation;
    uint32 spawntimesecs;
    float wander_distance;
    uint32 currentwaypoint;
    uint32 curhealth;
    uint32 curmana;
    uint32 MovementType;
    uint32 npcflag;
    uint32 unit_flags;
    uint32 dynamicflags;
    SDBCString ScriptName;
};

struct SDBCCreatureTemplate : public SDBCRow
{
    uint32 entry;
    uint32 difficulty_entry_1;
    uint32 difficulty_entry_2;
    uint32 difficulty_entry_3;
    uint32 KillCredit1;
    uint32 KillCredit2;
    uint32 modelid1;
    uint32 modelid2;
    uint32 modelid3;
    uint32 modelid4;
    SDBCLoc name;
    SDBCLoc subname;
    SDBCString IconName;
    uint32 gossip_menu_id;
    uint32 minlevel;
    uint32 maxlevel;
    int32 exp;
    uint32 faction;
    uint32 npcflag;
    float speed_walk;
    float speed_run;
    float scale;
    uint32 rank;
    int32 dmgschool;
    uint32 BaseAttackTime;
    uint32 RangeAttackTime;
    float BaseVariance;
    float RangeVariance;
    uint32 unit_class;
    uint32 unit_flags;
    uint32 unit_flags2;
    uint32 dynamicflags;
    int32 family;
    uint32 type;
    uint32 type_flags;
    uint32 lootid;
    uint32 pickpocketloot;
    uint32 skinloot;
    uint32 PetSpellDataId;
    uint32 VehicleId;
    uint32 mingold;
    uint32 maxgold;
    SDBCString AIName;
    uint32 MovementType;
    float HoverHeight;
    float HealthModifier;
    float ManaModifier;
    float ArmorModifier;
    float DamageModifier;
    float ExperienceModifier;
    uint32 RacialLeader;
    uint32 movementId;
    uint32 RegenHealth;
    uint32 mechanic_immune_mask;
    uint32 spell_school_immune_mask;
    uint32 flags_extra;
    SDBCString ScriptName;
};

struct SDBCGameObject : public SDBCRow
{
    uint32 guid;
    uint32 id;
    uint32 map;
    uint32 zoneId;
    uint32 areaId;
    uint32 spawnMask;
    uint32 phaseMask;
    float position_x;
    float position_y;
    float position_z;
    float orientation;
    float rotation0;
    float rotation1;
    float rotation2;
    float rotation3;
    uint32 spawntimesecs;
    uint32 animprogress;
    uint32 state;
    SDBCString ScriptName;
};

struct SDBCGameObjectTemplate : public SDBCRow
{
    uint32 entry;
    uint32 type;
    uint32 displayId;
    SDBCLoc name;
    SDBCString IconName;
    SDBCLoc castBarCaption;
    SDBCString unk1;
    float size;
    int32 Data[24];
    SDBCString AIName;
    SDBCString ScriptName;
};

struct SDBCItemTemplate : public SDBCRow
{
    uint32 entry;
    uint32 clazz;
    uint32 subclass;
    uint32 SoundOverrideSubclass;
    SDBCLoc name;
    uint32 displayid;
    uint32 Quality;
    uint32 Flags;
    uint32 FlagsExtra;
    uint32 BuyCount;
    uint32 BuyPrice;
    uint32 SellPrice;
    uint32 InventoryType;
    uint32 AllowableClass;
    uint32 AllowableRace;
    uint32 ItemLevel;
    uint32 RequiredLevel;
    uint32 RequiredSkill;
    uint32 RequiredSkillRank;
    uint32 requiredspell;
    uint32 requiredhonorrank;
    uint32 RequiredCityRank;
    uint32 RequiredReputationFaction;
    uint32 RequiredReputationRank;
    uint32 maxcount;
    uint32 stackable;
    uint32 ContainerSlots;
    uint32 StatsCount;
    struct ItemStats
    {
        uint32 stat_type;
        uint32 stat_value;
    } Stats[10];
    uint32 ScalingStatDistribution;
    uint32 ScalingStatValue;
    struct ItemDamage
    {
        float min;
        float max;
        uint32 type;
    } Damage[MAX_ITEM_PROTO_DAMAGES];
    uint32 armor;
    uint32 holy_res;
    uint32 fire_res;
    uint32 nature_res;
    uint32 frost_res;
    uint32 shadow_res;
    uint32 arcane_res;
    uint32 delay;
    uint32 ammo_type;
    float RangedModRange;

    struct ItemSpell
    {
        uint32 spellid;
        uint32 spelltrigger;
        uint32 spellcharges;
        float spellppmRate;
        uint32 spellcooldown;
        uint32 spellcategory;
        uint32 spellcategorycooldown;
    } Spells[5];

    uint32 bonding;
    SDBCLoc description;
    uint32 PageText;
    uint32 LanguageID;
    uint32 PageMaterial;
    uint32 startquest;
    uint32 lockid;
    uint32 Material;
    uint32 sheath;
    uint32 RandomProperty;
    uint32 RandomSuffix;
    uint32 block;
    uint32 itemset;
    uint32 MaxDurability;
    uint32 area;
    uint32 Map;
    uint32 BagFamily;
    uint32 TotemCategory;
    struct ItemSocket
    {
        uint32 color;
        uint32 content;
    } Sockets[3];
    uint32 socketBonus;
    uint32 GemProperties;
    uint32 RequiredDisenchantSkill;
    uint32 ArmorDamageModifier;
    uint32 duration;
    uint32 ItemLimitCategory;
    uint32 HolidayId;
    SDBCString ScriptName;
    uint32 DisenchantID;
    uint32 FoodType;
    uint32 minMoneyLoot;
    uint32 maxMoneyLoot;
    uint32 flagsCustom;
};
