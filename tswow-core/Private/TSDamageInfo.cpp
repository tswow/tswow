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

TSNumber<uint32> TSMeleeDamageInfo::GetSchool1()
{
#if TRINITY
    return _info->Damages[0].DamageSchoolMask;
#elif AZEROTHCORE
    return _info->damageSchoolMask;
#endif

}

TSNumber<uint32> TSMeleeDamageInfo::GetSchool2()
{
#if TRINITY
    return _info->Damages[1].DamageSchoolMask;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetSchool2 not implemented for AzerothCore.");
    return 0;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetDamage1()
{
#if TRINITY
    return _info->Damages[0].Damage;
#elif AZEROTHCORE
    return _info->damage;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetDamage2()
{
#if TRINITY
    return _info->Damages[1].Damage;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetDamage2 not implemented for AzerothCore.");
    return 0;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetAbsorb1()
{
#if TRINITY
    return _info->Damages[0].Absorb;
#elif AZEROTHCORE
    return _info->absorb;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetAbsorb2()
{
#if TRINITY
    return _info->Damages[1].Absorb;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetAbsorb2 not implemented for AzerothCore.");
    return 0;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetResist1()
{
#if TRINITY
    return _info->Damages[0].Resist;
#elif AZEROTHCORE
    return _info->resist;
#endif

}

TSNumber<uint32> TSMeleeDamageInfo::GetResist2()
{
#if TRINITY
    return _info->Damages[1].Resist;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSMeleeDamageInfo::GetResist2 not implemented for AzerothCore.");
    return 0;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetBlocked()
{
#if TRINITY
    return _info->Blocked;
#elif AZEROTHCORE
    return _info->blocked_amount;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetHitInfo()
{
    return _info->HitInfo;
}

TSNumber<uint32> TSMeleeDamageInfo::GetTargetState()
{
    return _info->TargetState;
}

TSNumber<uint32> TSMeleeDamageInfo::GetAttackType()
{
#if TRINITY
    return _info->AttackType;
#elif AZEROTHCORE
    return _info->attackType;
#endif 
}

TSNumber<uint32> TSMeleeDamageInfo::GetProcAttacker()
{
#if TRINITY
    return _info->ProcAttacker;
#elif AZEROTHCORE
    return _info->procAttacker;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetProcVictim()
{
#if TRINITY
    return _info->ProcVictim;
#elif AZEROTHCORE
    return _info->procVictim;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetCleanDamage()
{
#if TRINITY
    return _info->CleanDamage;
#elif AZEROTHCORE
    return _info->cleanDamage;
#endif
}

TSNumber<uint8> TSMeleeDamageInfo::GetMeleeHitOutcome()
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

TSNumber<uint32> TSSpellDamageInfo::GetSpellID()
{
#if TRINITY
    return _info->SpellID;
#elif AZEROTHCORE
    return _info->spellInfo ? _info->spellInfo->Id : 0;
#endif
}

TSNumber<uint32> TSSpellDamageInfo::GetDamage()
{
    return _info->damage;
}

TSNumber<uint32> TSSpellDamageInfo::GetOverkill()
{
    return _info->overkill;
}

TSNumber<uint32> TSSpellDamageInfo::GetSchoolMask()
{
    return _info->schoolMask;
}

TSNumber<uint32> TSSpellDamageInfo::GetAbsorb()
{
    return _info->absorb;
}

TSNumber<uint32> TSSpellDamageInfo::GetResist()
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

TSNumber<uint32> TSSpellDamageInfo::GetBlocked()
{
    return _info->blocked;
}

TSNumber<uint32> TSSpellDamageInfo::GetHitInfo()
{
    return _info->HitInfo;
}

TSNumber<uint32> TSSpellDamageInfo::GetCleanDamage()
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

TS_CLASS_DEFINITION(TSHealInfo, HealInfo, m_info)

void TSHealInfo::AbsorbHeal(uint32 amount)
{
    m_info->AbsorbHeal(amount);
}
void TSHealInfo::SetEffectiveHeal(uint32 amount)
{
#if TRINITY
    m_info->SetEffectiveHeal(amount);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSHealInfo::SetEffectiveHeal not implemented for AzerothCore");
#endif
}
TSUnit TSHealInfo::GetHealer()
{
    return TSUnit(m_info->GetHealer());
}

TSUnit TSHealInfo::GetTarget()
{
    return TSUnit(m_info->GetTarget());
}
TSNumber<uint32> TSHealInfo::GetHeal()
{
    return m_info->GetHeal();
}
TSNumber<uint32> TSHealInfo::GetEffectiveHeal()
{
#if TRINITY
    return m_info->GetEffectiveHeal();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSHealInfo::GetEffectiveHeal not implemented for AzerothCore");
#endif
}
TSNumber<uint32> TSHealInfo::GetAbsorb()
{
    return m_info->GetAbsorb();
}
TSSpellInfo TSHealInfo::GetSpellInfo()
{
    return TSSpellInfo(m_info->GetSpellInfo());
}
TSNumber<uint32> TSHealInfo::GetSchoolMask()
{
    return static_cast<uint32_t>(m_info->GetSchoolMask());
}
TSNumber<uint32> TSHealInfo::GetHitMask()
{
#if TRINITY
    return m_info->GetHitMask();
#elif AZEROTHCORE
    TS_LOG_INFO("tswow.api", "TSHealInfo::GetHitMask not implemented on AzerothCore");
    return 0;
#endif
}

TS_CLASS_DEFINITION(TSDamageInfo, DamageInfo, m_info)

void TSDamageInfo::ModifyDamage(int32 amount)
{
    m_info->ModifyDamage(amount);
}

void TSDamageInfo::AbsorbDamage(uint32 amount)
{
    m_info->AbsorbDamage(amount);
}
void TSDamageInfo::ResistDamage(uint32 amount)
{
    m_info->ResistDamage(amount);
}
void TSDamageInfo::BlockDamage(uint32 amount)
{
    m_info->BlockDamage(amount);
}
TSUnit TSDamageInfo::GetAttacker()
{
    return TSUnit(m_info->GetAttacker());
}
TSUnit TSDamageInfo::GetVictim()
{
    return TSUnit(m_info->GetVictim());
}
TSSpellInfo TSDamageInfo::GetSpellInfo()
{
    return TSSpellInfo(m_info->GetSpellInfo());
}
TSNumber<uint32> TSDamageInfo::GetSchoolMask()
{
    return static_cast<uint32>(m_info->GetSchoolMask());
}
TSNumber<uint32> TSDamageInfo::GetDamageType()
{
    return static_cast<uint32>(m_info->GetDamageType());
}
TSNumber<uint32> TSDamageInfo::GetAttackType()
{
    return static_cast<uint32>(m_info->GetAttackType());
}

TSNumber<uint32> TSDamageInfo::GetDamage()
{
    return m_info->GetDamage();
}
TSNumber<uint32> TSDamageInfo::GetAbsorb()
{
    return m_info->GetAbsorb();
}
TSNumber<uint32> TSDamageInfo::GetBlock()
{
    return m_info->GetBlock();
}
TSNumber<uint32> TSDamageInfo::GetHitMask()
{
#if TRINITY
    return m_info->GetHitMask();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSDamageInfo::GetHitMask not implemented on AzerothCore");
    return 0;
#endif
}
