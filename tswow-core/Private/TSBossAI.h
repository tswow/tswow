#pragma once
//class TSBossAI : public ScriptedAI
#include "ScriptedCreature.h"
#include "Creature.h"

class TSBossAI {
public:
    void OnJustEngage(Creature* creature, Unit* who);
    void OnJustDied(Creature* creature, Unit* attacker);

    static TSBossAI* instance()
    {
        static TSBossAI ai;
        return &ai;
    }
};
#define sTSBossAI TSBossAI::instance()
