#include "TSDamageInfo.h"
#include "TSUnit.h"
#include "Unit.h"
#include "SpellInfo.h"

TSMeleeDamageInfo::TSMeleeDamageInfo(CalcDamageInfo * info)
: _info(info)
{}

TSUnit TSMeleeDamageInfo::GetAttacker()
{
#if TRINITY
    return TSUnit(_info->Attacker);
#elif AZEROTHCORE
    return TSUnit(_info->attacker);
#endif
}

TSUnit TSMeleeDamageInfo::GetTarget()
{
#if TRINITY
    return TSUnit(_info->Target);
#elif AZEROTHCORE
    return TSUnit(_info->target);
#endif
}

uint32 TSMeleeDamageInfo::GetSchool1()
{
#if TRINITY
    return _info->Damages[0].DamageSchoolMask;
#elif AZEROTHCORE
    return _info->damageSchoolMask;
#endif

}

uint32 TSMeleeDamageInfo::GetSchool2()
{
#if TRINITY
    return _info->Damages[1].DamageSchoolMask;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetSchool2 not implemented for AzerothCore.");
    return 0;
#endif
}

uint32 TSMeleeDamageInfo::GetDamage1()
{
#if TRINITY
    return _info->Damages[0].Damage;
#elif AZEROTHCORE
    return _info->damage;
#endif
}

uint32 TSMeleeDamageInfo::GetDamage2()
{
#if TRINITY
    return _info->Damages[1].Damage;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetDamage2 not implemented for AzerothCore.");
    return 0;
#endif
}

uint32 TSMeleeDamageInfo::GetAbsorb1()
{
#if TRINITY
    return _info->Damages[0].Absorb;
#elif AZEROTHCORE
    return _info->absorb;
#endif
}

uint32 TSMeleeDamageInfo::GetAbsorb2()
{
#if TRINITY
    return _info->Damages[1].Absorb;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetAbsorb2 not implemented for AzerothCore.");
    return 0;
#endif
}

uint32 TSMeleeDamageInfo::GetResist1()
{
#if TRINITY
    return _info->Damages[0].Resist;
#elif AZEROTHCORE
    return _info->resist;
#endif

}

uint32 TSMeleeDamageInfo::GetResist2()
{
#if TRINITY
    return _info->Damages[1].Resist;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetResist2 not implemented for AzerothCore.");
    return 0;
#endif
}

uint32 TSMeleeDamageInfo::GetBlocked()
{
#if TRINITY
    return _info->Blocked;
#elif AZEROTHCORE
    return _info->blocked_amount;
#endif
}

uint32 TSMeleeDamageInfo::GetHitInfo()
{
    return _info->HitInfo;
}

uint32 TSMeleeDamageInfo::GetTargetState()
{
    return _info->TargetState;
}

uint32 TSMeleeDamageInfo::GetAttackType()
{
#if TRINITY
    return _info->AttackType;
#elif AZEROTHCORE
    return _info->attackType;
#endif 
}

uint32 TSMeleeDamageInfo::GetProcAttacker()
{
#if TRINITY
    return _info->ProcAttacker;
#elif AZEROTHCORE
    return _info->procAttacker;
#endif
}

uint32 TSMeleeDamageInfo::GetProcVictim()
{
#if TRINITY
    return _info->ProcVictim;
#elif AZEROTHCORE
    return _info->procVictim;
#endif
}

uint32 TSMeleeDamageInfo::GetCleanDamage()
{
#if TRINITY
    return _info->CleanDamage;
#elif AZEROTHCORE
    return _info->cleanDamage;
#endif
}

uint8 TSMeleeDamageInfo::GetMeleeHitOutcome()
{
#if TRINITY
    return _info->HitOutCome;
#elif AZEROTHCORE
    return _info->hitOutCome;
#endif
}

TSSpellDamageInfo::TSSpellDamageInfo(SpellNonMeleeDamage * info)
: _info(info)
{}

TSUnit TSSpellDamageInfo::GetAttacker()
{
    return TSUnit(_info->attacker);
}

TSUnit TSSpellDamageInfo::GetTarget()
{
    return TSUnit(_info->target);
}

uint32 TSSpellDamageInfo::GetSpellID()
{
#if TRINITY
    return _info->SpellID;
#elif AZEROTHCORE
    return _info->spellInfo ? _info->spellInfo->Id : 0;
#endif
}

uint32 TSSpellDamageInfo::GetDamage()
{
    return _info->damage;
}

uint32 TSSpellDamageInfo::GetOverkill()
{
    return _info->overkill;
}

uint32 TSSpellDamageInfo::GetSchoolMask()
{
    return _info->schoolMask;
}

uint32 TSSpellDamageInfo::GetAbsorb()
{
    return _info->absorb;
}

uint32 TSSpellDamageInfo::GetResist()
{
    return _info->resist;
}

bool TSSpellDamageInfo::GetPeriodicLog()
{
#if TRINITY
    return _info->periodicLog;
#elif AZEROTHCORE
    // TODO: not sure if this is the same thing
    LOG_WARN("tswow.api", "TSMeleeDamageInfo::GetPeriodicLog might not be implemented correctly for AzerothCore.");
    return _info->physicalLog;
#endif
}

bool TSSpellDamageInfo::GetUnused()
{
    return _info->unused;
}

uint32 TSSpellDamageInfo::GetBlocked()
{
    return _info->blocked;
}

uint32 TSSpellDamageInfo::GetHitInfo()
{
    return _info->HitInfo;
}

uint32 TSSpellDamageInfo::GetCleanDamage()
{
    return _info->cleanDamage;
}

bool TSSpellDamageInfo::GetFullBlock()
{
#if TRINITY
    return _info->fullBlock;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetFullBlock not implemented for AzerothCore.");
    return 0;
#endif
}