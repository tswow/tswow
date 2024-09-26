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
#endif
}

TSUnit TSMeleeDamageInfo::GetTarget()
{
#if TRINITY
    return TSUnit(_info->Target);
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetSchool1()
{
#if TRINITY
    return _info->Damages[0].DamageSchoolMask;
#endif

}

TSNumber<uint32> TSMeleeDamageInfo::GetSchool2()
{
#if TRINITY
    return _info->Damages[1].DamageSchoolMask;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetDamage1()
{
#if TRINITY
    return _info->Damages[0].Damage;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetDamage2()
{
#if TRINITY
    return _info->Damages[1].Damage;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetAbsorb1()
{
#if TRINITY
    return _info->Damages[0].Absorb;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetAbsorb2()
{
#if TRINITY
    return _info->Damages[1].Absorb;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetResist1()
{
#if TRINITY
    return _info->Damages[0].Resist;
#endif

}

TSNumber<uint32> TSMeleeDamageInfo::GetResist2()
{
#if TRINITY
    return _info->Damages[1].Resist;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetBlocked()
{
#if TRINITY
    return _info->Blocked;
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
#endif 
}

TSNumber<uint32> TSMeleeDamageInfo::GetProcAttacker()
{
#if TRINITY
    return _info->ProcAttacker;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetProcVictim()
{
#if TRINITY
    return _info->ProcVictim;
#endif
}

TSNumber<uint32> TSMeleeDamageInfo::GetCleanDamage()
{
#if TRINITY
    return _info->CleanDamage;
#endif
}

TSNumber<uint8> TSMeleeDamageInfo::GetMeleeHitOutcome()
{
#if TRINITY
    return _info->HitOutCome;
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
#endif
}
