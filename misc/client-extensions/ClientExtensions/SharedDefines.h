#pragma once

#include "ClientMacros.h"
#include "Util.h"

struct lua_State;

enum ObjectTypeMask : uint32_t {
    TYPEMASK_OBJECT         = 0x0001,
    TYPEMASK_ITEM           = 0x0002,
    TYPEMASK_CONTAINER      = 0x0004,
    TYPEMASK_UNIT           = 0x0008,
    TYPEMASK_PLAYER         = 0x0010,
    TYPEMASK_GAMEOBJECT     = 0x0020,
    TYPEMASK_DYNAMICOBJECT  = 0x0040,
    TYPEMASK_CORPSE         = 0x0080,
};

enum Field : uint32_t {
    CURRENT_HP              = 18,
    CURRENT_MANA            = 19,
    CURRENT_RAGE            = 20,
    CURRENT_FOCUS           = 21,
    CURRENT_ENERGY          = 22,
    CURRENT_HAPPINESS       = 23,
    CURRENT_RUNES           = 24,
    CURRENT_RUNIC_POWER     = 25,
    MAX_HP                  = 26,
    MAX_MANA                = 27,
    MAX_RAGE                = 28,
    MAX_FOCUS               = 29,
    MAX_ENERGY              = 30,
    MAX_HAPPINESS           = 31,
    MAX_RUNES               = 32,
    MAX_RUNIC_POWER         = 33,
};

enum FrameXMLEvent : uint32_t {
    EVENT_ACTIONBAR_SLOT_CHANGED                = 176,
    EVENT_LFG_ROLE_UPDATE                       = 506,
    EVENT_PLAYER_TALENT_UPDATE                  = 625,
};

enum GameError : uint32_t {
    GERR_LEARN_SPELL_S      = 59,
    GERR_LEARN_ABILITY_S    = 60,
    GERR_SPELL_UNLEARNED_S  = 352,
};

enum Powers : int32_t {
    POWER_MANA              = 0,
    POWER_RAGE              = 1,
    POWER_FOCUS             = 2,
    POWER_ENERGY            = 3,
    POWER_HAPPINESS         = 4,
    POWER_RUNES             = 5,
    POWER_RUNIC_POWER       = 7
};

enum SpellCastResult : uint32_t {
    SPELL_FAILED_MOVING     = 51,
};

enum SpellFamilyNames : uint32_t {
    SPELLFAMILY_GENERIC     = 0,
    SPELLFAMILY_UNK1        = 1,
    SPELLFAMILY_CRAFTING    = 2,
    SPELLFAMILY_MAGE        = 3,
    SPELLFAMILY_WARRIOR     = 4,
    SPELLFAMILY_WARLOCK     = 5,
    SPELLFAMILY_PRIEST      = 6,
    SPELLFAMILY_DRUID       = 7,
    SPELLFAMILY_ROGUE       = 8,
    SPELLFAMILY_HUNTER      = 9,
    SPELLFAMILY_PALADIN     = 10,
    SPELLFAMILY_SHAMAN      = 11,
    SPELLFAMILY_UNK2        = 12,
    SPELLFAMILY_POTION      = 13,
    SPELLFAMILY_DEATHKNIGHT = 15,
    SPELLFAMILY_PET         = 17,
};

enum SpellEffect : uint32_t {
    SPELL_EFFECT_TRADE_SKILL                    = 47,
    SPELL_EFFECT_ATTACK                         = 78,
    SPELL_EFFECT_TITAN_GRIP                     = 155,
};

enum SpellAttr0 : uint32_t {
    SPELL_ATTR0_REQ_AMMO                        = 0x00000002,
    SPELL_ATTR0_ON_NEXT_SWING                   = 0x00000004,
    SPELL_ATTR0_ABILITY                         = 0x00000010,
    SPELL_ATTR0_TRADESPELL                      = 0x00000020,
    SPELL_ATTR0_PASSIVE                         = 0x00000040,
    SPELL_ATTR0_HIDDEN_CLIENTSIDE               = 0x00000080,
    SPELL_ATTR0_ON_NEXT_SWING_2                 = 0x00000400,
};

enum SpellAttr1 : uint32_t {
    SPELL_ATTR1_CHANNELED_1                     = 0x00000004,
    SPELL_ATTR1_CHANNELED_2                     = 0x00000040,
};

enum SpellAttr2 : uint32_t {
    SPELL_ATTR2_AUTOREPEAT_FLAG                 = 0x00000020,
};

enum SpellAttr3 : uint32_t {
    SPELL_ATTR3_MAIN_HAND                       = 0x00000400,
    SPELL_ATTR3_REQ_OFFHAND                     = 0x01000000,
};

enum SpellAttr0Custom : uint32_t {
    SPELL_ATTR0_CU_TREAT_AS_INSTANT             = 0x00000001,   // Changes tooltip line responsible for cast time to "Instant"
    SPELL_ATTR0_CU_FORCE_HIDE_CASTBAR           = 0x00000002,   // Does not display cast bar
    SPELL_ATTR0_CU_DO_NOT_DISPLAY_POWER_COST    = 0x00000004,   // Does not display power cost in tooltip
    SPELL_ATTR0_CU_SUPPRESS_LEARN_MSG           = 0x00000008,   // Does not display "You have learned a new spell:" message
    SPELL_ATTR0_CU_SUPPRESS_UNLEARN_MSG         = 0x00000010,   // Does not display "You have unlearned" message
    SPELL_ATTR0_CU_INVERT_CASTBAR               = 0x00000020,   // NYI; will cost me some sanity it seems
    SPELL_ATTR0_CU_LOW_TIME_TREAT_AS_INSTANT    = 0x00000040,   // If cast time <= 250ms, changes tooltip line responsible to "Instant"
    SPELL_ATTR0_CU_LOW_TIME_FORCE_HIDE_CASTBAR  = 0x00000080,   // If cast time <= 250ms, does not display cast bar
    SPELL_ATTR0_CU_LOW_CAST_TIME_DONT_INTERRUPT = 0x00000100,   // If cast time <= 250ms, does not interrupt
};

enum SpellSchools : uint32_t {
    SPELL_SCHOOL_NORMAL = 0, // TITLE Physical
    SPELL_SCHOOL_HOLY   = 1, // TITLE Holy
    SPELL_SCHOOL_FIRE   = 2, // TITLE Fire
    SPELL_SCHOOL_NATURE = 3, // TITLE Nature
    SPELL_SCHOOL_FROST  = 4, // TITLE Frost
    SPELL_SCHOOL_SHADOW = 5, // TITLE Shadow
    SPELL_SCHOOL_ARCANE = 6, // TITLE Arcane
    MAX_SPELL_SCHOOL    = 7  // SKIP
};

static uint32_t dummy = 0;

static char* sConnectorPlus = " + ";
static char* sPluralS = "s";
static char* sSpace = " ";

// structs
struct C2Vector {
    float x;
    float y;
};

struct C3Vector {
    float x;
    float y;
    float z;
};

struct MovementInfo {
    uint32_t padding[2];
    uint64_t moverGUID;
    C3Vector position;
    float padding1C;
    float orientation;
    float pitch;
    uint32_t padding28[7];
    uint32_t movementFlags;
    uint32_t movementFlags2;
    uint32_t padding4C[65];
    // TODO: add rest, probably when needed
};

struct ObjectFields {
    uint64_t OBJECT_FIELD_GUID;
    uint32_t OBJECT_FIELD_TYPE;
    uint32_t OBJECT_FIELD_ENTRY;
    float OBJECT_FIELD_SCALE_X;
    uint32_t OBJECT_FIELD_PADDING;
};

struct PlayerFields {
    uint32_t padding0x00[876];
    float blockPct;
    float dodgePct;
    float parryPct;
    uint32_t expertise;
    uint32_t offhandExperise;
    float critPct;
    float rangedCritPct;
    float offhandCritPct;
    float spellCritPct[7];
    float shieldBlock;
    float shieldBlockCritPct;
    uint32_t exploredzones[128];
    uint32_t restedXP;
    uint32_t coinage;
    int32_t SPPos[7];
    int32_t SPNeg[7];
    float SPBonus[7];
    uint32_t healingPower;
    float healingTakenMult;
    float healingDoneMult;
    uint32_t padding0x0DEC[36];
    int32_t crWeaponSkill;
    int32_t crDefenseSkill;
    int32_t crDodge;
    int32_t crParry;
    int32_t crBlock;
    int32_t crSpeed;        // crHitMelee
    int32_t crLifesteal;    // crHitRanged
    int32_t crAvoidance;    // crHitSpell
    int32_t crCrit;         // crCritMelee
    int32_t crCritRanged;
    int32_t crCritSpell;
    int32_t crHitTakenMelee;
    int32_t crHitTakenRanged;
    int32_t crHitTakenSpell;
    int32_t crCritTakenMelee;
    int32_t crCritTakenRanged;
    int32_t crCritTakenSpell;
    int32_t crHaste;        // crHasteMelee
    int32_t crHasteRanged;
    int32_t crHasteSpell;
    int32_t crWeaponSkillMainhand;
    int32_t crWeaponSkillOffhand;
    int32_t crWeaponSkillRanged;
    int32_t crMastery;      // crExpertise
    int32_t crThorns;       // crArmorPenetration
    uint32_t padding0x1120[56];
    uint32_t glyphslots[6];
    uint32_t glyphs[3];
    int32_t weaponBonusAP[3];
    uint32_t glyphsEnabled; // can reuse, glyphs are disabled
    int32_t petSpellPower;
    // TODO: add rest when needed
};

struct UnitBytes0 {
    uint8_t raceID;
    uint8_t classID;
    uint8_t genderID;
    uint8_t powerTypeID;
};

struct UnitBytes1 {
    uint8_t standState;
    uint8_t petTalents;
    uint8_t visFlags;
    uint8_t animTier;
};

struct UnitBytes2 {
    uint8_t sheathState;
    uint8_t pvpFlag;
    uint8_t petFlags;
    uint8_t shapeshift;
};

struct UnitFields {
    uint64_t padding0x00[8];    // not defining those until we need them
    uint32_t channelSpell;
    UnitBytes0 unitBytes0;
    uint32_t unitCurrHealth;
    uint32_t unitCurrPowers[7];
    uint32_t unitMaxHealth;
    uint32_t unitMaxPowers[7];
    float padding0x88[14];
    uint32_t level;
    uint32_t factionTemplate;
    uint32_t virtualItemSlotID[3];
    uint32_t unitFlags;
    uint32_t unitFlags2;
    uint32_t auraState;
    uint32_t baseAttackTime[3];
    float boundingRadius;
    float combatReach;
    uint32_t displayId;
    uint32_t nativeDisplayId;
    uint32_t mountDisplayId;
    float mainHandMinDamage;
    float mainHandMaxDamage;
    float offHandMinDamage;
    float offHandMaxDamage;
    UnitBytes1 unitBytes1;
    uint32_t petNumber;
    uint32_t padding0x011C[4];
    float modCastSpell;
    uint32_t createdBySpell;
    uint32_t npcFlags;
    uint32_t emoteState;
    int32_t strength;
    int32_t agility;
    int32_t stamina;
    int32_t intellect;
    int32_t spirit;
    float strengthPos;
    float agilityPos;
    float staminaPos;
    float intellectPos;
    float spiritPos;
    float strengthNeg;
    float agilityNeg;
    float staminaNeg;
    float intellectNeg;
    float spiritNeg;
    uint32_t resistances[7];
    uint32_t resistancesPos[7];
    uint32_t resistancesNeg[7];
    uint32_t baseMana;
    uint32_t basehealth;
    UnitBytes2 unitBytes2;
    uint32_t AP;
    uint16_t APMods[2];
    float APMult;
    uint32_t RAP;
    uint16_t RAPMods[2];
    float RAPMult;
    // TODO: add rest at some point, most likely when needed
};

struct CGObject {
    void* vtable;
    uint32_t padding;
    ObjectFields* ObjectData;
    DWORD objectClass[49];
};

struct CGUnit {
    CGObject objectBase;
    UnitFields* unitData;
    uint32_t paddingD4;
    MovementInfo* movementInfo;
    uint32_t padding34[612];
    uint32_t currentCastId;
    uint32_t padding[4];
    uint32_t currentChannelId;
    uint32_t padding2[353];
    // TODO: add rest, currently not needed
};

struct CGPlayer {
    CGUnit unitBase;
    PlayerFields* PlayerData;
    uint32_t playerClass[1024];
};

struct ChrClassesRow {
    uint32_t m_ID;
    uint32_t m_DisplayPower;
    char* m_petNameToken;
    char* m_name_lang;
    char* m_name_female_lang;
    char* m_name_male_lang;
    char* m_filename;
    uint32_t m_spellClassSet;
    uint32_t m_flags;
    uint32_t m_cinematicSequenceID;
    uint32_t m_required_expansion;
    uint32_t m_attackPowerPerStrength;
    uint32_t m_attackPowerPerAgility;
    uint32_t m_rangedAttackPowerPerAgility;
};

struct gtCombatRatingsRow {
    uint32_t ID;
    float data;
};

struct gtOCTClassCombatRatingScalarRow {
    uint32_t ID;
    float data;
};

struct MapRow {
    uint32_t m_ID;
    char* m_Directory;
    uint32_t m_InstanceType;
    uint32_t m_Flags;
    uint32_t m_PVP;
    char* m_MapName_lang;
    uint32_t m_areaTableID;
    char* m_MapDescription0_lang;
    char* m_MapDescription1_lang;
    uint32_t m_LoadingScreenID;
    float m_minimapIconScale;
    uint32_t m_corpseMapID;
    float m_corpseX;
    float m_corpseY;
    uint32_t m_timeOfDayOverride;
    uint32_t m_expansionID;
    uint32_t m_raidOffset;
    uint32_t m_maxPlayers;
    uint32_t m_parentMapID;
};

struct PowerDisplayRow {
    uint32_t m_ID;
    uint32_t m_actualType;
    char* m_globalStringBaseTag;
    uint8_t m_red;
    uint8_t m_green;
    uint8_t m_blue;
};

struct SkillLineAbilityRow {
    uint32_t m_ID;
    uint32_t m_skillLine;
    uint32_t m_spell;
    uint32_t m_raceMask;
    uint32_t m_classMask;
    uint32_t m_excludeRace;
    uint32_t m_excludeClass;
    uint32_t m_minSkillLineRank;
    uint32_t m_supercededBySpell;
    uint32_t m_acquireMethod;
    uint32_t m_trivialSkillLineRankHigh;
    uint32_t m_trivialSkillLineRankLow;
    uint32_t m_characterPoints[2];
    uint32_t m_numSkillUps;
};

struct SkillLineRow {
    uint32_t m_ID;
    uint32_t m_categoryID;
    uint32_t m_skillCostsID;
    char* m_displayName_lang;
    char* m_description_lang;
    uint32_t m_spellIconID;
    char* m_alternateVerb_lang;
    uint32_t m_canLink;
};

struct SpellRow {
    uint32_t m_ID;
    uint32_t m_category;
    uint32_t m_dispelType;
    uint32_t m_mechanic;
    uint32_t m_attributes;
    uint32_t m_attributesEx;
    uint32_t m_attributesExB;
    uint32_t m_attributesExC;
    uint32_t m_attributesExD;
    uint32_t m_attributesExE;
    uint32_t m_attributesExF;
    uint32_t m_attributesExG;
    uint32_t m_shapeshiftMask[2];
    uint32_t m_shapeshiftExclude[2];
    uint32_t m_targets;
    uint32_t m_targetCreatureType;
    uint32_t m_requiresSpellFocus;
    uint32_t m_facingCasterFlags;
    uint32_t m_casterAuraState;
    uint32_t m_targetAuraState;
    uint32_t m_excludeCasterAuraState;
    uint32_t m_excludeTargetAuraState;
    uint32_t m_casterAuraSpell;
    uint32_t m_targetAuraSpell;
    uint32_t m_excludeCasterAuraSpell;
    uint32_t m_excludeTargetAuraSpell;
    uint32_t m_castingTimeIndex;
    uint32_t m_recoveryTime;
    uint32_t m_categoryRecoveryTime;
    uint32_t m_interruptFlags;
    uint32_t m_auraInterruptFlags;
    uint32_t m_channelInterruptFlags;
    uint32_t m_procTypeMask;
    uint32_t m_procChance;
    uint32_t m_procCharges;
    uint32_t m_maxLevel;
    uint32_t m_baseLevel;
    uint32_t m_spellLevel;
    uint32_t m_durationIndex;
    uint32_t m_powerType;
    uint32_t m_manaCost;
    uint32_t m_manaCostPerLevel;
    uint32_t m_manaPerSecond;
    uint32_t m_manaPerSecondPerLevel;
    uint32_t m_rangeIndex;
    float m_speed;
    uint32_t m_modalNextSpell;
    uint32_t m_cumulativeAura;
    uint32_t m_totem0[2];
    uint32_t m_reagent[8];
    uint32_t m_reagentCount[8];
    uint32_t m_equippedItemClass;
    uint32_t m_equippedItemSubclass;
    uint32_t m_equippedItemInvTypes;
    uint32_t m_effect[3];
    uint32_t m_effectDieSides[3];
    float m_effectRealPointsPerLevel[3];
    uint32_t m_effectBasePoints[3];
    uint32_t m_effectMechanic[3];
    uint32_t m_implicitTargetA[3];
    uint32_t m_implicitTargetB[3];
    uint32_t m_effectRadiusIndex[3];
    uint32_t m_effectAura[3];
    uint32_t m_effectAuraPeriod[3];
    float m_effectAmplitude[3];
    uint32_t m_effectChainTargets[3];
    uint32_t m_effectItemType[3];
    uint32_t m_effectMiscValue[3];
    uint32_t m_effectMiscValueB[3];
    uint32_t m_effectTriggerSpell[3];
    float m_effectPointsPerCombo[3];
    uint32_t m_effectSpellClassMaskA[3];
    uint32_t m_effectSpellClassMaskB[3];
    uint32_t m_effectSpellClassMaskC[3];
    uint32_t m_spellVisualID[2];
    uint32_t m_spellIconID;
    uint32_t m_activeIconID;
    uint32_t m_spellPriority;
    char* m_name_lang;
    char* m_nameSubtext_lang;
    char* m_description_lang;
    char* m_auraDescription_lang;
    uint32_t m_manaCostPct;
    uint32_t m_startRecoveryCategory;
    uint32_t m_startRecoveryTime;
    uint32_t m_maxTargetLevel;
    uint32_t m_spellClassSet;
    uint32_t m_spellClassMask[3];
    uint32_t m_maxTargets;
    uint32_t m_defenseType;
    uint32_t m_preventionType;
    uint32_t m_stanceBarOrder;
    float m_effectChainAmplitude[3];
    uint32_t m_minFactionID;
    uint32_t m_minReputation;
    uint32_t m_requiredAuraVision;
    uint32_t m_requiredTotemCategoryID[2];
    uint32_t m_requiredAreasID;
    uint32_t m_schoolMask;
    uint32_t m_runeCostID;
    uint32_t m_spellMissileID;
    uint32_t m_powerDisplayID;
    float m_effectBonusCoefficient[3];
    uint32_t m_descriptionVariablesID;
    uint32_t m_difficulty;
};

struct SpellIconRow {
    uint32_t m_ID;
    char* m_textureFilename;
};

struct SpellRuneCostRow {
    uint32_t m_ID;
    int32_t m_blood;
    int32_t m_unholy;
    int32_t m_frost;
    int32_t m_runicPower;
};

// Aleist3r: this is not a full struct afaik but that's what's needed in dll
// will update if more fields are required
struct WoWTime {
    int32_t minute;
    int32_t hour;
    int32_t weekDay;
    int32_t monthDay;
    int32_t month;
    int32_t year;
    int32_t flags;
};

struct ZoneLightData {
    int32_t mapID;
    int32_t lightID;
    void* pointData;
    int32_t pointNum;
    float minX;
    float minY;
    float maxX;
    float maxY;
};

struct TerrainClickEvent
{
    uint64_t GUID;
    float x, y, z;
    uint32_t button;
};

// client functions
namespace CGChat {
    CLIENT_FUNCTION(AddChatMessage, 0x509DD0, __cdecl, bool, (char*, uint32_t, uint32_t, uint32_t, uint32_t*, uint32_t, char*, uint64_t, uint32_t, uint64_t, uint32_t, uint32_t, uint32_t*))
}

namespace CGGameUI {
    CLIENT_FUNCTION(DisplayError, 0x5216F0, __cdecl, void, (uint32_t, ...))
}

namespace CGPetInfo_C {
    CLIENT_FUNCTION(GetPet, 0x5D3390, __cdecl, uint64_t, (uint32_t))
}

namespace CGUnit_C {
    CLIENT_FUNCTION(GetShapeshiftFormId, 0x71AF70, __thiscall, uint32_t, (CGUnit*))
    CLIENT_FUNCTION(HasAuraBySpellId, 0x7282A0, __thiscall, bool, (CGUnit*, uint32_t))
    CLIENT_FUNCTION(HasAuraMatchingSpellClass, 0x7283A0, __thiscall, bool, (CGUnit*, uint32_t, SpellRow*))
    CLIENT_FUNCTION(ShouldFadeIn, 0x716650, __thiscall, bool, (CGUnit*))
}

namespace CGWorldFrame {
    CLIENT_FUNCTION(TranslateToMapCoords, 0x544140, __cdecl, bool, (C3Vector*, uint32_t, float*, float*, uint32_t, bool, uint32_t))
}

namespace ClientDB {
    CLIENT_FUNCTION(GetRow, 0x65C290, __thiscall, void*, (void*, uint32_t))
    CLIENT_FUNCTION(GetLocalizedRow, 0x4CFD20, __thiscall, int, (void*, uint32_t, void*))
}

namespace ClientPacket {
    CLIENT_FUNCTION(MSG_SET_ACTION_BUTTON, 0x5AA390, __cdecl, void, (uint32_t, bool, bool))
}

namespace ClntObjMgr {
    CLIENT_FUNCTION(GetActivePlayer, 0x4D3790, __cdecl, uint64_t, ())
    CLIENT_FUNCTION(GetActivePlayerObj, 0x004038F0, __cdecl, CGPlayer*, ())
    CLIENT_FUNCTION(GetUnitFromName, 0x60C1F0, __cdecl, CGUnit*, (char*))
    CLIENT_FUNCTION(ObjectPtr, 0x4D4DB0, __cdecl, void*, (uint64_t, uint32_t))
}

namespace CVar_C {
    CLIENT_FUNCTION(sub_766940, 0x766940, __thiscall, void, (void*, int, char, char, char, char))
}

namespace DNInfo {
    CLIENT_FUNCTION(AddZoneLight, 0x7ED150, __thiscall, void, (void*, int32_t, float))
    CLIENT_FUNCTION(GetDNInfoPtr, 0x7ECEF0, __stdcall, void*, ())
}

namespace FrameScript {
    CLIENT_FUNCTION(GetParam, 0x815500, __cdecl, bool, (lua_State*, int, int))
    CLIENT_FUNCTION(GetText, 0x819D40, __cdecl, char*, (char*, int, int))
    CLIENT_FUNCTION(SignalEvent, 0x81B530, __cdecl, int, (uint32_t, char*, ...))
}

namespace NTempest {
    CLIENT_FUNCTION(DistanceSquaredFromEdge, 0x7F9C90, __cdecl, bool, (int32_t, void*, C2Vector*, float*))
}

namespace SpellParser {
    CLIENT_FUNCTION(ParseText, 0x57ABC0, __cdecl, void, (void*, void*, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))
}

namespace Spell_C {
    CLIENT_FUNCTION(SpellFailed, 0x808200, __cdecl, void, (void*, SpellRow*, uint32_t, int32_t, int32_t, uint32_t))
}

namespace SpellRec_C {
    CLIENT_FUNCTION(GetLevel, 0x7FF070, __cdecl, uint32_t, (SpellRow*, uint32_t, uint32_t))
    CLIENT_FUNCTION(GetCastTime, 0x7FF180, __cdecl, uint32_t, (SpellRow*, uint32_t, uint32_t, uint32_t))
    CLIENT_FUNCTION(ModifySpellValueInt, 0x7FDB50, __cdecl, void, (SpellRow*, uint32_t*, uint32_t))
}

namespace SErr {
    CLIENT_FUNCTION(PrepareAppFatal, 0x772A80, _cdecl, void, (uint32_t, const char*, ...))
}

namespace SFile {
    // Defs cherrypicked from StormLib: https://github.com/ladislav-zezula/StormLib
    CLIENT_FUNCTION(OpenFileEx, 0x424B50, __stdcall, bool, (HANDLE, const char*, uint32_t, HANDLE*))
    CLIENT_FUNCTION(ReadFile, 0x422530, __stdcall, bool, (HANDLE handle /*likely a handle*/, void* data, uint32_t bytesToRead, uint32_t* bytesRead, uint32_t* overlap /*just set to 0*/, uint32_t unk))
    CLIENT_FUNCTION(CloseFile, 0x422910, __stdcall, void, (HANDLE a1))

    //
    CLIENT_FUNCTION(OpenFile, 0x424F80, __stdcall, int, (char const* filename, HANDLE* a2 /*file handle out*/))
    CLIENT_FUNCTION(GetFileSize, 0x4218C0, __stdcall, DWORD /*lowest 32 bits in size*/, (HANDLE handle, DWORD* highSize /*highest 32 bits in size*/))
}

namespace SMem {
    CLIENT_FUNCTION(Alloc, 0x76E540, __stdcall, void*, (uint32_t, const char*, uint32_t, uint32_t))
    CLIENT_FUNCTION(Free, 0x76E5A0, __stdcall, bool, (void*, const char*, uint32_t, uint32_t))
}

namespace SStr {
    CLIENT_FUNCTION(Printf, 0x76F070, __cdecl, int, (char*, uint32_t, char*, ...))
    CLIENT_FUNCTION(Copy, 0x76ED20, __stdcall, char*, (char*, char*, uint32_t))
    CLIENT_FUNCTION(Copy_0, 0x76EF70, __stdcall, char*, (char*, char*, uint32_t))
    CLIENT_FUNCTION(Len, 0x76EE30, __stdcall, char*, (char*))
    CLIENT_FUNCTION(Chr, 0x76E6E0, __cdecl, char*, (char*, char))
}

namespace SysMsg {
    CLIENT_FUNCTION(Printf, 0x4B5040, __cdecl, int, (uint32_t, uint32_t, char*, ...))
}

namespace World {
    CLIENT_FUNCTION(LoadMap, 0x781430, __cdecl, void, (char*, C3Vector*, uint32_t))
    CLIENT_FUNCTION(UnloadMap, 0x783180, __cdecl, void, ())
}

CLIENT_FUNCTION(OsGetAsyncTimeMs, 0x86AE20, __cdecl, uint64_t, ())

CLIENT_FUNCTION(sub_61FEC0, 0x61FEC0, __thiscall, void, (void*, char*, char*, void*, void*, uint32_t))
CLIENT_FUNCTION(sub_6B1080, 0x6B1080, __cdecl, uint8_t, ())
CLIENT_FUNCTION(sub_6E22C0, 0x6E22C0, __thiscall, uint32_t, (void*, uint32_t))
CLIENT_FUNCTION(sub_812410, 0x812410, __cdecl, SkillLineAbilityRow*, (uint32_t, uint32_t, uint32_t))
CLIENT_FUNCTION(TerrainClick, 0x00527830, __cdecl, void, (TerrainClickEvent*))
CLIENT_FUNCTION(SStrCmpI, 0x0076E780, __stdcall, int, (char* text1, const char* text2, int length))
