#pragma once

#include "ClientMacros.h"
#include "Util.h"

enum GameError : uint32_t {
    GERR_LEARN_SPELL_S      = 59,
    GERR_LEARN_ABILITY_S    = 60,
    GERR_SPELL_UNLEARNED_S  = 352,
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

enum SpellAttr0Custom : uint32_t {
    SPELL_ATTR0_CU_TREAT_AS_INSTANT             = 0x00000001,   // Changes tooltip line responsible for cast time to "Instant"
    SPELL_ATTR0_CU_FORCE_HIDE_CASTBAR           = 0x00000002,   // Does not display cast bar
    SPELL_ATTR0_CU_DO_NOT_DISPLAY_POWER_COST    = 0x00000004,   // Does not display power cost in tooltip
    SPELL_ATTR0_CU_SUPPRESS_LEARN_MSG           = 0x00000008,   // Does not display "You have learned a new spell:" message
    SPELL_ATTR0_CU_SUPPRESS_UNLEARN_MSG         = 0x00000010,   // Does not display "You have unlearned" message
    //SPELL_ATTR0_CU_INVERT_CASTBAR               = 0x00000020,   // NYI;
    SPELL_ATTR0_CU_LOW_TIME_TREAT_AS_INSTANT    = 0x00000040,   // If cast time <= 250ms, changes tooltip line responsible to "Instant"
    SPELL_ATTR0_CU_LOW_TIME_FORCE_HIDE_CASTBAR  = 0x00000080,   // If cast time <= 250ms, does not display cast bar
};

enum SpellFamilyNames
{
    SPELLFAMILY_GENERIC     = 0,
    SPELLFAMILY_UNK1        = 1,
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
    SPELLFAMILY_PET         = 17
};

static char* sSpace = " ";

// structs
struct UnitFields {
    uint64_t padding[8];    // not defining those until we need them
    uint32_t channelSpell;
    uint8_t unitBytes0[4];
    uint32_t unitCurrHealth;
    uint32_t unitCurrPowers[7];
    uint32_t unitMaxHealth;
    uint32_t unitMaxPowers[7];
    // TODO: add rest at some point, most likely when needed
};

struct CGUnit {
    uint32_t objBase[52];
    UnitFields* UnitData;
    uint32_t padding34[614];
    uint32_t currentCastId;
    uint32_t padding[4];
    uint32_t currentChannelId;
    // TODO: add rest, currently not needed
};

struct PowerDisplayRow {
    uint32_t m_ID;
    uint32_t m_actualType;
    char* m_globalStringBaseTag;
    uint8_t m_red;
    uint8_t m_green;
    uint8_t m_blue;
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

struct SpellRuneCostRow {
    uint32_t m_ID;
    int32_t m_blood;
    int32_t m_unholy;
    int32_t m_frost;
    int32_t m_runicPower;
};

// client functions
namespace CGGameUI {
    CLIENT_FUNCTION(DisplayError, 0x5216F0, __cdecl, void, (uint32_t, ...))
}

namespace ClientDB {
    CLIENT_FUNCTION(GetRow, 0x65C290, __thiscall, void*, (void*, uint32_t))
    CLIENT_FUNCTION(GetLocalizedRow, 0x4CFD20, __thiscall, int, (void*, uint32_t, void*))
}

namespace ClntObjMgr {
    CLIENT_FUNCTION(GetActivePlayer, 0x4D3790, __cdecl, uint64_t, ())
    CLIENT_FUNCTION(GetUnitFromName, 0x60C1F0, __cdecl, CGUnit*, (char*))
    CLIENT_FUNCTION(ObjectPtr, 0x4D4DB0, __cdecl, void*, (uint64_t, uint32_t))
}

namespace FrameScript {
    CLIENT_FUNCTION(GetText, 0x819D40, __cdecl, char*, (char*, int, int))
}

namespace SErr {
    CLIENT_FUNCTION(PrepareAppFatal, 0x772A80, _cdecl, void, (uint32_t, const char*, ...))
}

namespace SFile {
    // Defs cherrypicked from StormLib: https://github.com/ladislav-zezula/StormLib
    CLIENT_FUNCTION(CloseFile, 0x422910, __stdcall, void, (HANDLE a1))
    CLIENT_FUNCTION(OpenFileEx, 0x424B50, __stdcall, bool, (HANDLE, const char*, uint32_t, HANDLE*))
    CLIENT_FUNCTION(ReadFile, 0x422530, __stdcall, bool, (HANDLE handle /*likely a handle*/, void* data, uint32_t bytesToRead, uint32_t* bytesRead, uint32_t* overlap /*just set to 0*/))

    //
    CLIENT_FUNCTION(OpenFile, 0x424F80, __stdcall, int, (char const* filename, HANDLE* a2 /*file handle out*/))
    CLIENT_FUNCTION(GetFileSize, 0x4218C0, __stdcall, DWORD /*lowest 32 bits in size*/, (HANDLE handle, DWORD* highSize /*highest 32 bits in size*/))
}

namespace SMem {
    CLIENT_FUNCTION(Alloc, 0x76E540, __stdcall, void*, (uint32_t, const char*, uint32_t, uint32_t))
    CLIENT_FUNCTION(Free, 0x76E5A0, __stdcall, bool, (void*, const char*, uint32_t, uint32_t))
}

namespace SStr {
    CLIENT_FUNCTION(Copy, 0x76ED20, __stdcall, char*, (char*, char*, uint32_t))
    CLIENT_FUNCTION(Copy_0, 0x76EF70, __stdcall, unsigned char, (char*, char*, uint32_t))
    CLIENT_FUNCTION(Printf, 0x76F070, __cdecl, uint32_t, (char*, uint32_t, char*, ...))
}

namespace SpellParser {
    CLIENT_FUNCTION(ParseText, 0x57ABC0, __cdecl, void, (void*, void*, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))
}

namespace SpellRec {
    CLIENT_FUNCTION(GetCastTime, 0x7FF180, __cdecl, uint32_t, (SpellRow*, uint32_t, uint32_t, uint32_t))
}

CLIENT_FUNCTION(sub_61FEC0, 0x61FEC0, __thiscall, void, (void*, char*, char*, void*, void*, uint32_t))
