#pragma once
#include "SharedDefines.h"

#include <iostream>

namespace CharacterDefines {
    inline uint32_t activeCharSpec = 0;
    inline uint32_t masteryAmount = 0;
    inline float masteryPct = 0;
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
};
