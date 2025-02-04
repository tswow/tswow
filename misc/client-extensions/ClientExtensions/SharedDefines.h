#pragma once
#include "Windows.h"
#include "ClientMacros.h"

#include <functional>

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

enum SpellFamilyNames : uint32_t {
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

enum SpellAttr0Custom : uint32_t {
    SPELL_ATTR0_CU_TREAT_AS_INSTANT             = 0x00000001,   // Changes tooltip line responsible for cast time to "Instant"
    SPELL_ATTR0_CU_FORCE_HIDE_CASTBAR           = 0x00000002,   // Self-descripting, don't display castbar at all
};

static uint32_t dummy = 0;

static char* sConnectorPlus = " + ";
static char* sPluralS = "s";
static char* sSpace = " ";

// structs
struct SpellRec
{
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

// client functions
// Defs cherrypicked from StormLib: https://github.com/ladislav-zezula/StormLib
CLIENT_FUNCTION(SFileOpenFileEx, 0x424B50, __stdcall, bool, (HANDLE, const char*, uint32_t, HANDLE*))
CLIENT_FUNCTION(SFileReadFile, 0x422530, __stdcall, bool, (HANDLE handle /*likely a handle*/, void* data, uint32_t bytesToRead, uint32_t* bytesRead, uint32_t* overlap /*just set to 0*/))
CLIENT_FUNCTION(SFileCloseFile, 0x422910, __stdcall, void, (HANDLE a1))

//
CLIENT_FUNCTION(SFileOpenFile, 0x424F80, __stdcall, int, (char const* filename, HANDLE* a2 /*file handle out*/))
CLIENT_FUNCTION(SFileGetFileSize, 0x4218C0, __stdcall, DWORD /*lowest 32 bits in size*/, (HANDLE handle, DWORD* highSize /*highest 32 bits in size*/))

CLIENT_FUNCTION(SMemAlloc, 0x76E540, __stdcall, void*, (uint32_t, const char*, uint32_t, uint32_t))
CLIENT_FUNCTION(SMemFree, 0x76E5A0, __stdcall, bool, (void*, const char*, uint32_t, uint32_t))

CLIENT_FUNCTION(SErrPrepareAppFatal, 0x772A80, _cdecl, void, (uint32_t, const char*, ...))

CLIENT_FUNCTION(ClntObjMgrGetActivePlayer, 0x4D3790, __cdecl, uint64_t, ())
CLIENT_FUNCTION(ClntObjMgrObjectPtr, 0x4D4DB0, __cdecl, void*, (uint64_t, uint32_t))

CLIENT_FUNCTION(FrameScript_GetText, 0x819D40, __cdecl, char*, (char*, int, int))
CLIENT_FUNCTION(SStrPrintf, 0x76F070, __cdecl, int, (char*, uint32_t, char*, ...))
CLIENT_FUNCTION(SStrCopy_0, 0x76EF70, __stdcall, unsigned char, (char*, char*, uint32_t))
CLIENT_FUNCTION(SStrLen, 0x76EE30, __stdcall, char*, (char*))
CLIENT_FUNCTION(SStrChr, 0x76E6E0, __cdecl, char*, (char*, char))

CLIENT_FUNCTION(ClientDB__GetRow, 0x65C290, __thiscall, void*, (void*, uint32_t))
CLIENT_FUNCTION(ClientDB__GetLocalizedRow, 0x4CFD20, __thiscall, int, (void*, uint32_t, void*))

CLIENT_FUNCTION(SpellParserParseText, 0x57ABC0, __cdecl, void, (void*, void*, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))

CLIENT_FUNCTION(SpellRec__GetLevel, 0x7FF070, __cdecl, uint32_t, (SpellRec*, uint32_t, uint32_t))

// functions
static int32_t GetPlayerField(uint32_t* ActivePlayer, uint32_t field) {
    return *reinterpret_cast<int32_t*>(*(ActivePlayer + 52) + 4 * field);
};

static void OverwriteUInt32AtAddress(uint32_t position, uint32_t newValue) {
    DWORD flOldProtect = 0;

    VirtualProtect((LPVOID)position, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *reinterpret_cast<uint32_t*>(position) = newValue;
    VirtualProtect((LPVOID)position, 0x4, flOldProtect, &flOldProtect);
};

static void WriteBytesAtAddress(void* position, uint8_t byte, size_t size) {
    DWORD flOldProtect = 0;

    VirtualProtect((LPVOID)position, size, PAGE_EXECUTE_READWRITE, &flOldProtect);
    memset(position, byte, size);
    VirtualProtect((LPVOID)position, 0x4, flOldProtect, &flOldProtect);
}

// Aleist3r: use bigger number as address1
// if the jump/call address is earlier in the memory (e.g. you're jumping from dll code back to wow.exe address), use backwards = true
// TODO: investigate what I did wrong with code, math was off
static uint32_t CalculateAddress(uint32_t address1, uint32_t address2, bool backwards = false) {
    if (!backwards)
        return address1 - address2;
    else
        return address2 - address1;
}
