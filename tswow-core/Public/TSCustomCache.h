#pragma once

#include "TSMain.h"
#include "TSBase.h"
#include "MovementDefines.h"
#include "ObjectMgr.h"

struct TC_GAME_API TSJumpChargeParams
{
    union
    {
        float Speed;
        float MoveTimeInSec;
    };

    bool TreatSpeedAsMoveTimeSeconds = false;

    float JumpGravity = 0.0f;

    TSJumpChargeParams(JumpChargeParams const* params) {
        this->Speed = params->Speed;
        this->MoveTimeInSec = params->MoveTimeInSec;
        this->TreatSpeedAsMoveTimeSeconds = params->TreatSpeedAsMoveTimeSeconds;
        this->JumpGravity = params->JumpGravity;
    }
};

struct TC_GAME_API TSNPCSoundsEntry
{
    uint32 Id;
    uint32 hello;
    uint32 goodbye;
    uint32 pissed;
    uint32 ack;

    TSNPCSoundsEntry(NPCSoundsEntry* entry) {
        this->ack = entry->ack;
        this->goodbye = entry->goodbye;
        this->hello = entry->hello;
        this->Id = entry->Id;
        this->pissed = entry->pissed;
    }
};

struct TC_GAME_API TSCustomCharacterPoint
{
    CustomCharacterPointType PointType;
    uint32 SpecId;
    uint32 Sum;
    uint32 Max;

    TSCustomCharacterPoint(CustomCharacterPoint* point) {
        this->PointType = point->PointType;
        this->SpecId = point->SpecId;
        this->Sum = point->Sum;
        this->Max = point->Max;
    }

    CustomCharacterPoint* ToCustomCharacterPoint() {
        CustomCharacterPoint* out = new CustomCharacterPoint();
        out->PointType = this->PointType;
        out->SpecId = this->SpecId;
        out->Sum = this->Sum;
        out->Max = this->Max;

        return out;
    }
};

struct TC_GAME_API TSCustomClassSpecDetail
{
    std::string Name;
    uint32 SpellIconId;
    uint32 SpecId;

    TSCustomClassSpecDetail(CustomClassSpecDetail* detail) {
        this->Name = detail->Name;
        this->SpellIconId = detail->SpellIconId;
        this->SpecId = detail->SpecId;
    }
};

struct TC_GAME_API TSCustomCharacterTalent
{
    uint32 SpellId;
    uint32 TabId;
    uint8 CurrentRank;
    uint8 type;

    TSCustomCharacterTalent(CustomCharacterTalent* talent) {
        this->SpellId = talent->SpellId;
        this->TabId = talent->TabId;
        this->CurrentRank = talent->CurrentRank;
        this->type = talent->type;
    }

    CustomCharacterTalent* ToCustomCharacterTalent() {
        CustomCharacterTalent* out = new CustomCharacterTalent();
        out->SpellId = this->SpellId;
        out->TabId = this->TabId;
        out->CurrentRank = this->CurrentRank;
        out->type = this->type;
        return out;
    }
};

struct TC_GAME_API TSCustomTalentPrereq
{
    uint32 reqId;
    uint32 Talent;
    uint32 TalentTabId;
    uint32 RequiredRank;

    TSCustomTalentPrereq(CustomTalentPrereq* prereq) {
        this->reqId = prereq->reqId;
        this->RequiredRank = prereq->RequiredRank;
        this->Talent = prereq->Talent;
        this->TalentTabId = prereq->TalentTabId;
    }
};

struct TC_GAME_API TSCustomPlayerSpec {
    uint32 Id;
    ObjectGuid CharacterGuid;
    std::string Name;
    std::string Description;
    bool Active;
    uint32 SpellIconId;
    uint32 SpecTabId;
    std::unordered_map<uint32 /*tabId*/, std::unordered_map<uint32 /*spellId*/, TSCustomCharacterTalent*>> Talents;
    std::unordered_map<uint32 /*tabId*/, uint8> PointsSpent;
    std::unordered_map<uint32 /*node id*/, uint32/*spell picked*/> ChoiceNodesChosen;

    TSCustomPlayerSpec(CustomPlayerSpec* spec) {
        this->Id = spec->Id;
        this->CharacterGuid = spec->CharacterGuid;
        this->Name = spec->Name;
        this->Description = spec->Description;
        this->Active = spec->Active;
        this->SpellIconId = spec->SpellIconId;
        this->SpecTabId = spec->SpecTabId;
        for (auto tabId : spec->Talents)
            for (auto spell : tabId.second)
                this->Talents[tabId.first][spell.first] = new TSCustomCharacterTalent(spell.second);

        this->PointsSpent = spec->PointsSpent;
        this->ChoiceNodesChosen = spec->ChoiceNodesChosen;
    }

    CustomPlayerSpec* ToCustomPlayerSpec() {
        CustomPlayerSpec* out = new CustomPlayerSpec();
        out->Id = this->Id;
        out->CharacterGuid = this->CharacterGuid;
        out->Name = this->Name;
        out->Description = this->Description;
        out->Active = this->Active;
        out->SpellIconId = this->SpellIconId;
        out->SpecTabId = this->SpecTabId;
        for (auto tabId : this->Talents)
            for (auto spell : tabId.second)
                out->Talents[tabId.first][spell.first] = spell.second->ToCustomCharacterTalent();

        out->PointsSpent = this->PointsSpent;
        out->ChoiceNodesChosen = this->ChoiceNodesChosen;
       
    }
};

struct TC_GAME_API TSCustomTalentChoice
{
    uint32 spellId;
    bool active;

    TSCustomTalentChoice(CustomTalentChoice* choice) {
        this->spellId = choice->spellId;
        this->active = choice->active;
    }
};

struct TC_GAME_API TSCustomTalent
{
    uint32 SpellId;
    uint32 TalentTabId;
    uint32 ColumnIndex;
    uint32 RowIndex;
    uint8 RankCost;
    uint16 TabPointReq;
    uint8 RequiredLevel;
    CustomCharacterPointType TalentType;
    CustomNodeType nodeType;
    uint8 nodeIndex;

    uint8 NumberOfRanks;
    CustomPereqReqirementType PreReqType;
    std::list<TSCustomTalentPrereq*> Prereqs;
    std::map<uint8 /*index*/, TSCustomTalentChoice*> Choices;
    std::list<uint32> UnlearnSpells;
    std::unordered_map<uint8 /*rank*/, uint32 /*spellId*/> Ranks;
    std::unordered_map<uint32 /*spellId*/, uint8 /*rank*/> RanksRev;

    TSCustomTalent(CustomTalent* talent) {
        this->SpellId = talent->SpellId;
        this->TalentTabId = talent->TalentTabId;
        this->ColumnIndex = talent->ColumnIndex;
        this->RowIndex = talent->RowIndex;
        this->RankCost = talent->RankCost;
        this->TabPointReq = talent->TabPointReq;
        this->RequiredLevel = talent->RequiredLevel;
        this->TalentType = talent->TalentType;
        this->nodeType = talent->nodeType;
        this->nodeIndex = talent->nodeIndex;
        this->NumberOfRanks = talent->NumberOfRanks;
        this->PreReqType = talent->PreReqType;
        for (auto prereq : talent->Prereqs)
            this->Prereqs.push_back(new TSCustomTalentPrereq(prereq));

        for (auto choice : talent->Choices)
            this->Choices[choice.first] = new TSCustomTalentChoice(choice.second);

        this->UnlearnSpells = talent->UnlearnSpells;
        this->Ranks = talent->Ranks;
        this->RanksRev = talent->RanksRev;
    }
};

struct TC_GAME_API TSCustomTalentTab
{
    uint32 Id;
    uint32 ClassMask;
    uint32 RaceMask;
    std::string Name;
    uint32 SpellIconId;
    std::string Background;
    std::string Description;
    uint8 Role;
    std::string SpellString;
    CustomCharacterPointType TalentType;
    uint32 TabIndex;
    std::unordered_map<uint32 /*spellId*/, TSCustomTalent*> Talents;

    TSCustomTalentTab(CustomTalentTab* tab) {
        this->Id = tab->Id;
        this->ClassMask = tab->ClassMask;
        this->RaceMask = tab->RaceMask;
        this->Name = tab->Name;
        this->SpellIconId = tab->SpellIconId;
        this->Background = tab->Background;
        this->Description = tab->Description;
        this->Role = tab->Role;
        this->SpellString = tab->SpellString;
        this->TalentType = tab->TalentType;
        this->TabIndex = tab->TabIndex;
        for (auto talent : tab->Talents)
            this->Talents[talent.first] = new TSCustomTalent(talent.second);
    }
};

struct TC_GAME_API TSPlayerLoadout {
    bool active;
    uint8 id;
    uint32 tabId;
    std::string name;
    std::string talentString;

    TSPlayerLoadout(PlayerLoadout* loadout) {
        this->active = loadout->active;
        this->id = loadout->id;
        this->tabId = loadout->tabId;
        this->name = loadout->name;
        this->talentString = loadout->talentString;
    }
};

struct TC_GAME_API TSNodeMetaData {
    uint32 spellId;
    uint8 row;
    uint8 col;
    uint8 pointReq;
    uint8 nodeIndex;
    std::vector<TSNodeMetaData*> unlocks;
    
    TSNodeMetaData(NodeMetaData* data) {
        this->spellId = data->spellId;
        this->row = data->row;
        this->col = data->col;
        this->pointReq = data->pointReq;
        this->nodeIndex = data->nodeIndex;

        for (auto unlock : data->unlocks)
            this->unlocks.push_back(new TSNodeMetaData(unlock));
    }
};

struct TC_GAME_API TSTreeMetaData {
    uint32 TabId;
    uint8 MaxXDim = 0;
    uint8 MaxYDim = 0;
    std::unordered_map<uint8/*row*/, std::unordered_map<uint8 /*col*/, TSNodeMetaData*>> nodes;
    std::unordered_map<uint32/*spellId*/, TSNodeMetaData*> nodeLocation;

    TSTreeMetaData(TreeMetaData* data) {
        this->TabId = data->TabId;
        this->MaxXDim = data->MaxXDim;
        this->MaxYDim = data->MaxYDim;

        for (auto row : data->nodes)
            for (auto col : row.second)
            this->nodes[row.first][col.first] = new TSNodeMetaData(col.second);

        for (auto loc : data->nodeLocation)
            this->nodeLocation[loc.first] = new TSNodeMetaData(loc.second);
    }
};

class TC_GAME_API TSCustomCache {
public:
    TSCustomCache* operator->() { return this; }
    TSCustomCache() {};

    TSJumpChargeParams const* GetJumpChargeParams(int32 id) const;
    TSNPCSoundsEntry* GetNpcSounds(uint32 id);
    TSNumber<uint32> TryGetTabIdForSpell(Player* player, uint32 spellId);
    TSNumber<uint32> TryGetSpellIdForTab(Player* player, uint32 tabId);
    TSDictionary<TSNumber<uint32>, TSCustomCharacterTalent*> TryGetCharacterTalents(Player* player, uint32 tabId);
    TSArray<TSCustomPlayerSpec*> TryGetAllCharacterSpecs(Player* player);
    TSCustomPlayerSpec* TryGetCharacterActiveSpec(Player* player);
    TSCustomPlayerSpec* TryGetCharacterSpec(Player* player, uint32 specId);
    TSCustomCharacterTalent* GetTalent(Player* player, uint32 spellId);
    TSCustomCharacterPoint* GetSpecPoints(Player* player, CustomCharacterPointType pointType, uint32 specId);
    TSCustomCharacterPoint* UpdateCharPoints(Player* player, TSCustomCharacterPoint* points);
    void UpdateCharacterSpec(Player* player, TSCustomPlayerSpec* spec);
    TSCustomCharacterPoint* GetCommonCharacterPoint(Player* player, CustomCharacterPointType pointType);
    TSCustomCharacterPoint* GetMaxPointDefaults(CustomCharacterPointType cpt);
    CustomCharacterPointType TryGetTabPointType(uint32 tabId);
    TSCustomTalentTab* TryGetTalentTab(Player* player, uint32 tabId);
    TSArray<TSCustomTalentTab*> TryGetCustomTalentTabs(Player* player, CustomCharacterPointType cpt);
    void AddCharacterSpecSlot(Player* player);
    TSCustomCharacterPoint* GetSpecPoints(Player* player, CustomCharacterPointType pointType);
    TSNumber<uint32> GetChoiceNodeFromindex(uint8 index);

    TSNumber<uint8> Ping() {
        return 4;
    }
};

TC_GAME_API TSCustomCache GetCacheManager();