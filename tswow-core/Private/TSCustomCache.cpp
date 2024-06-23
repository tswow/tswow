#include "TSCustomCache.h"

TSJumpChargeParams const* TSCustomCache::GetJumpChargeParams(int32 id) const {
    return new TSJumpChargeParams(sObjectMgr->GetJumpChargeParams(id));
}

TSNPCSoundsEntry* TSCustomCache::GetNpcSounds(uint32 id) {
    return new TSNPCSoundsEntry(sObjectMgr->GetNpcSounds(id));
}

TSNumber<uint32> TSCustomCache::TryGetTabIdForSpell(Player* player, uint32 spellId) {
    return sObjectMgr->TryGetTabIdForSpell(player, spellId);
}

TSNumber<uint32> TSCustomCache::TryGetSpellIdForTab(Player* player, uint32 tabId) {
    return sObjectMgr->TryGetSpellIdForTab(player, tabId);
}

TSDictionary<TSNumber<uint32>, TSCustomCharacterTalent*> TSCustomCache::TryGetCharacterTalents(Player* player, uint32 tabId) {
    TSDictionary<TSNumber<uint32>, TSCustomCharacterTalent*> out = {};
    std::unordered_map<uint32, CustomCharacterTalent*> talents = sObjectMgr->TryGetCharacterTalents(player, tabId);

    for (auto talent : talents)
        out[talent.first] = new TSCustomCharacterTalent(talent.second);

    return out;
}

TSArray<TSCustomPlayerSpec*> TSCustomCache::TryGetAllCharacterSpecs(Player* player) {
    TSArray<TSCustomPlayerSpec*> out = {};
    std::list<CustomPlayerSpec*> specs = sObjectMgr->TryGetAllCharacterSpecs(player);

    for (auto spec : specs)
        out.push(new TSCustomPlayerSpec(spec));

    return out;
}

TSCustomPlayerSpec* TSCustomCache::TryGetCharacterActiveSpec(Player* player) {
    return new TSCustomPlayerSpec(sObjectMgr->TryGetCharacterActiveSpec(player));
}

TSCustomPlayerSpec* TSCustomCache::TryGetCharacterSpec(Player* player, uint32 specId) {
    return new TSCustomPlayerSpec(sObjectMgr->TryGetCharacterSpec(player, specId));
}

TSCustomCharacterTalent* TSCustomCache::GetTalent(Player* player, uint32 spellId) {
    return new TSCustomCharacterTalent(sObjectMgr->GetTalent(player, spellId));
}

TSCustomCharacterPoint* TSCustomCache::GetSpecPoints(Player* player, CustomCharacterPointType pointType, uint32 specId) {
    return new TSCustomCharacterPoint(sObjectMgr->GetSpecPoints(player, pointType, specId));
}

TSCustomCharacterPoint* TSCustomCache::UpdateCharPoints(Player* player, TSCustomCharacterPoint* fp) {
    return new TSCustomCharacterPoint(sObjectMgr->UpdateCharPoints(player, fp->ToCustomCharacterPoint()));
}

void TSCustomCache::UpdateCharacterSpec(Player* player, TSCustomPlayerSpec* spec) {
    sObjectMgr->UpdateCharacterSpec(player, spec->ToCustomPlayerSpec());
}

TSCustomCharacterPoint* TSCustomCache::GetCommonCharacterPoint(Player* player, CustomCharacterPointType pointType) {
    return new TSCustomCharacterPoint(sObjectMgr->GetCommonCharacterPoint(player, pointType));
}

TSCustomCharacterPoint* TSCustomCache::GetMaxPointDefaults(CustomCharacterPointType cpt) {
    return new TSCustomCharacterPoint(sObjectMgr->GetMaxPointDefaults(cpt));
}

CustomCharacterPointType TSCustomCache::TryGetTabPointType(uint32 tabId) {
    return sObjectMgr->TryGetTabPointType(tabId);
}

TSCustomTalentTab* TSCustomCache::TryGetTalentTab(Player* player, uint32 tabId) {
    return new TSCustomTalentTab(sObjectMgr->TryGetTalentTab(player, tabId));
}

TSArray<TSCustomTalentTab*> TSCustomCache::TryGetCustomTalentTabs(Player* player, CustomCharacterPointType cpt) {
    TSArray<TSCustomTalentTab*> out = {};
    std::list<CustomTalentTab*> tabs = sObjectMgr->TryGetCustomTalentTabs(player, cpt);

    for (auto tab : tabs)
        out.push(new TSCustomTalentTab(tab));
    
    return out;
}

void TSCustomCache::AddCharacterSpecSlot(Player* player) {
    return sObjectMgr->AddCharacterSpecSlot(player);
}

TSCustomCharacterPoint* TSCustomCache::GetSpecPoints(Player* player, CustomCharacterPointType pointType) {
    return new TSCustomCharacterPoint(sObjectMgr->GetSpecPoints(player, pointType));
}

TSNumber<uint32> TSCustomCache::GetChoiceNodeFromindex(uint8 index) {
    return sObjectMgr->GetChoiceNodeFromindex(index);
}

TSCustomCache GetCacheManager() {
    return TSCustomCache();
}