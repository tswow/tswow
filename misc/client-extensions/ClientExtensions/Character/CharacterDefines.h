#pragma once
#include "SharedDefines.h"

#include <iostream>

namespace CharacterDefines {
    inline uint32_t activeCharSpec = 0;
    inline uint32_t masteryAmount = 0;
    inline float masteryPct = 0.f;
    inline float masteryRatingSpec[4] = { 1.f, 1.f, 1.f, 1.f };

    inline void setMasteryRatingSpec(int index, float newValue) { masteryRatingSpec[index] = newValue; }
    inline float getMasteryRatingSpec(int index) { return masteryRatingSpec[index]; }

    inline void setCharActiveSpec(uint32_t newValue) { activeCharSpec = newValue; }
    inline uint32_t getCharActiveSpec() { return activeCharSpec; }

    inline void setMasteryAmount(uint32_t newValue) { masteryAmount = newValue; }
    inline uint32_t getMasteryAmount() { return masteryAmount; }

    inline void setMasteryPct(float newValue) { masteryPct = newValue; }
    inline float getMasteryPct() { return masteryPct; }

    inline float getMasteryForSpec(int index) { return ((static_cast<float>(masteryAmount) / getMasteryRatingSpec(index)) + masteryPct); }

    struct SpellCharge {
        uint8_t currentCharges      = 0;
        uint8_t maxCharges          = 0;
        uint32_t async              = 0;
        uint32_t remainingCooldown  = 0;
        uint32_t cooldown           = 0;
    };

    inline std::unordered_map<uint32_t, SpellCharge> spellChargeMap;

    inline float ModHaste = 0;
    inline float ModHasteRegen = 0;

    inline float GetTotalAttackPowerValue(uint8_t attType, CGPlayer* activePlayer) {
        float value = 0.0f;
        if (attType == 2) {
            float ap = std::max<float>(activePlayer->PlayerData->weaponBonusAP[attType], activePlayer->PlayerData->weaponBonusAP[0]) + activePlayer->unitBase.unitData->RAP + activePlayer->unitBase.unitData->RAPMods[0] + activePlayer->unitBase.unitData->RAPMods[1];
            if (ap < 0)
                ap = 0;
            value = ap * (1.0f + activePlayer->unitBase.unitData->RAPMult);
        } else {
            float ap = activePlayer->unitBase.unitData->AP + activePlayer->unitBase.unitData->APMods[0] + activePlayer->unitBase.unitData->APMods[1];
            if (attType == 0)
                ap += std::max<float>(activePlayer->PlayerData->weaponBonusAP[attType], activePlayer->PlayerData->weaponBonusAP[2]);
            else {
                ap += activePlayer->PlayerData->weaponBonusAP[attType];
                ap /= 2;
            }
            if (ap < 0)
                ap = 0;
            value = ap * (1.0f + activePlayer->unitBase.unitData->APMult);
        }
        return value;
    }
};
