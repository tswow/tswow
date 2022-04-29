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
uint32 TSHealInfo::GetHeal()
{
    return m_info->GetHeal();
}
uint32 TSHealInfo::GetEffectiveHeal()
{
#if TRINITY
    return m_info->GetEffectiveHeal();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSHealInfo::GetEffectiveHeal not implemented for AzerothCore");
#endif
}
uint32 TSHealInfo::GetAbsorb()
{
    return m_info->GetAbsorb();
}
TSSpellInfo TSHealInfo::GetSpellInfo()
{
    return TSSpellInfo(m_info->GetSpellInfo());
}
uint32 TSHealInfo::GetSchoolMask()
{
    return static_cast<uint32_t>(m_info->GetSchoolMask());
}
uint32 TSHealInfo::GetHitMask()
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
uint32 TSDamageInfo::GetSchoolMask()
{
    return static_cast<uint32>(m_info->GetSchoolMask());
}
uint32 TSDamageInfo::GetDamageType()
{
    return static_cast<uint32>(m_info->GetDamageType());
}
uint32 TSDamageInfo::GetAttackType()
{
    return static_cast<uint32>(m_info->GetAttackType());
}

uint32 TSDamageInfo::GetDamage()
{
    return m_info->GetDamage();
}
uint32 TSDamageInfo::GetAbsorb()
{
    return m_info->GetAbsorb();
}
uint32 TSDamageInfo::GetBlock()
{
    return m_info->GetBlock();
}
uint32 TSDamageInfo::GetHitMask()
{
#if TRINITY
    return m_info->GetHitMask();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSDamageInfo::GetHitMask not implemented on AzerothCore");
    return 0;
#endif
}
