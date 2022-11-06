/*
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * Copyright (C) 2010 - 2016 Eluna Lua Engine <http://emudevs.com/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

#include <memory.h>
#include "Object.h"
#include "Spell.h"
#include "TSIncludes.h"
#include "TSSpell.h"
#include "SpellInfo.h"
#include "Corpse.h"
#include "Item.h"
#include "Unit.h"
#include "TSObject.h"
#include "TSUnit.h"
#include "TSWorldObject.h"
#include "TSSpellInfo.h"
#include "SpellMgr.h"
#include "Player.h"

TSSpell::TSSpell(Spell *spell)
    : TSEntityProvider(&spell->m_tsEntity)
    , spell(spell)
{}

TSSpell::TSSpell()
    : TSEntityProvider(nullptr)
    , spell(nullptr)
{
}

/**
 * Returns `true` if the [Spell] is automatically repeating, `false` otherwise.
 *
 * @return bool isAutoRepeating
 */
bool TSSpell::IsAutoRepeat()
{
    return spell->IsAutoRepeat();
}

/**
 * Returns the [Unit] that casted the [Spell].
 *
 * @return [Unit] caster
 */
TSWorldObject TSSpell::GetCaster()
{
    return TSWorldObject(spell->GetCaster());
}

TSWorldObject TSSpell::GetOriginalCaster()
{
    if (Unit* const origCaster = spell->GetOriginalCaster())
    {
        return TSWorldObject(origCaster);
    }

    if (WorldObject* const caster = spell->GetCaster())
    {
        if (caster->GetGUID() == spell->m_originalCasterGUID)
        {
            return TSWorldObject(caster);
        }
    }
    return TSWorldObject(nullptr);
}

TSWorldObject TSSpell::GetOriginalOrCurrentCaster()
{
    return spell->m_originalCaster
        ? TSWorldObject(spell->m_originalCaster)
        : TSWorldObject(spell->m_caster);
}

/**
 * Returns the cast time of the [Spell].
 *
 * @return int32 castTime
 */
TSNumber<int32> TSSpell::GetCastTime()
{
    return spell->GetCastTime();
}

/**
 * Returns the entry ID of the [Spell].
 *
 * @return uint32 entryId
 */
TSNumber<uint32> TSSpell::GetEntry()
{
    return spell->m_spellInfo->Id;
}

/**
 * Returns the power cost of the [Spell].
 *
 * @return uint32 powerCost
 */
TSNumber<uint32> TSSpell::GetPowerCost()
{
    return spell->GetPowerCost();
}

/**
 * Returns the spell duration of the [Spell].
 *
 * @return int32 duration
 */
TSNumber<int32> TSSpell::GetDuration()
{
#if defined TRINITY || AZEROTHCORE
    return spell->GetSpellInfo()->GetDuration();
#else
    return GetSpellDuration(spell->m_spellInfo);
#endif
}

/**
 * Returns the target destination coordinates of the [Spell].
 *
 * @return float x : x coordinate of the [Spell]
 * @return float y : y coordinate of the [Spell]
 * @return float z : z coordinate of the [Spell]
 */
TSPosition TSSpell::GetTargetDest()
{
#if defined TRINITY || AZEROTHCORE
    float x, y, z;
    spell->m_targets.GetDstPos()->GetPosition(x, y, z);
#else
    float x, y, z;
    spell->m_targets.getDestination(x, y, z);
#endif
    return TSPosition(0,x,y,z,0);
}

/**
 * Returns the target [Object] of the [Spell].
 *
 * The target can be any of the following [Object] types:
 * - [Player]
 * - [Creature]
 * - [GameObject]
 * - [Item]
 * - [Corpse]
 *
 * @return [Object] target
 */
TSObject  TSSpell::GetTarget()
{
#if defined TRINITY || AZEROTHCORE
    if (GameObject* target = spell->m_targets.GetGOTarget())
         return TSObject(target);
    else if (Item* target = spell->m_targets.GetItemTarget())
         return TSObject(target);
    else if (Corpse* target = spell->m_targets.GetCorpseTarget())
         return TSObject(target);
    else if (Unit* target = spell->m_targets.GetUnitTarget())
         return TSObject(target);
    else if (WorldObject* target = spell->m_targets.GetObjectTarget())
         return TSObject(target);
#else
    if (GameObject* target = spell->m_targets.getGOTarget())
         return TSObject(target);
    else if (Item* target = spell->m_targets.getItemTarget())
         return TSObject(target);
    else if (Corpse* target = spell->GetCaster()->GetMap()->GetCorpse(spell->m_targets.getCorpseTargetGuid()))
         return TSObject(target);
    else if (Unit* target = spell->m_targets.getUnitTarget())
         return TSObject(target);
#endif
    return TSObject(nullptr);
}

TSSpellInfo TSSpell::GetSpellInfo()
{
    return TSSpellInfo(spell->GetSpellInfo());
}

/**
 * Sets the [Spell] to automatically repeat.
 *
 * @param bool repeat : set variable to 'true' for spell to automatically repeat
 */
void TSSpell::SetAutoRepeat(bool repeat)
{
    spell->SetAutoRepeat(repeat);
}

/**
 * Casts the [Spell].
 *
 * @param bool skipCheck = false : skips initial checks to see if the [Spell] can be casted or not, this is optional
 */
void TSSpell::Cast(bool skipCheck)
{
    spell->cast(skipCheck);
}

/**
 * Cancels the [Spell].
 */
void TSSpell::Cancel()
{
    spell->cancel();
}

/**
 * Finishes the [Spell].
 */
void TSSpell::Finish()
{
    spell->finish();
}

TSNumber<uint32> TSSpell::GetTriggeredCastFlags()
{
    return static_cast<uint32>(spell->_triggeredCastFlags);
}

bool TSSpell::IsTriggered()
{
    return spell->IsTriggered();
}

bool TSSpell::IsTriggeredByAura(uint32 aura)
{
#if TRINITY
    return spell->IsTriggeredByAura(sSpellMgr->GetSpellInfo(aura));
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSSpell::IsTriggeredByAura not implemented for AzerothCore");
    return false;
#endif
}

TSNumber<uint32> TSSpell::GetGlyphSlot()
{
    return spell->m_glyphIndex;
}

TS_CLASS_DEFINITION(TSSpellModifier, SpellModifier, m_mod)

TSNumber<uint32> TSSpellModifier::GetOp()
{
    return m_mod->op;
}
void TSSpellModifier::SetOp(uint32 op)
{
    m_mod->op = static_cast<SpellModOp>(op);
}
TSNumber<uint32> TSSpellModifier::GetType()
{
    return m_mod->op;
}
void TSSpellModifier::SetType(uint32 type)
{
    m_mod->type = static_cast<SpellModType>(type);
}
TSNumber<int32> TSSpellModifier::GetValue()
{
    return m_mod->value;
}
void TSSpellModifier::SetValue(int32 value)
{
    m_mod->value = value;
}
TSNumber<uint32> TSSpellModifier::GetMaskA()
{
    return m_mod->mask.part[0];
}
void TSSpellModifier::SetMaskA(uint32 mask)
{
    m_mod->mask.part[0] = mask;
}
TSNumber<uint32> TSSpellModifier::GetMaskB()
{
    return m_mod->mask.part[1];
}
void TSSpellModifier::SetMaskB(uint32 mask)
{
    m_mod->mask.part[1] = mask;
}
TSNumber<uint32> TSSpellModifier::GetMaskC()
{
    return m_mod->mask.part[2];
}
void TSSpellModifier::SetMaskC(uint32 mask)
{
    m_mod->mask.part[2] = mask;
}
TSNumber<uint32> TSSpellModifier::GetSpellID()
{
    return m_mod->spellId;
}
void TSSpellModifier::SetSpellID(uint32 spell)
{
    m_mod->spellId = spell;
}
TSAura TSSpellModifier::GetOwnerAura()
{
    return TSAura(m_mod->ownerAura);
}

TS_CLASS_DEFINITION(TSSpellDestination, SpellDestination, m_dest)

TSNumber<float> TSSpellDestination::GetX()
{
    return m_dest->_position.m_positionX;
}

TSNumber<float> TSSpellDestination::GetY()
{
    return m_dest->_position.m_positionY;
}

TSNumber<float> TSSpellDestination::GetZ()
{
    return m_dest->_position.m_positionZ;
}

TSNumber<float> TSSpellDestination::GetO()
{
    return m_dest->_position.GetOrientation();
}

TSNumber<float> TSSpellDestination::GetMap()
{
    return m_dest->_position.m_mapId;
}


TSNumber<float> TSSpellDestination::GetOffsetX()
{
    return m_dest->_transportOffset.m_positionX;
}

TSNumber<float> TSSpellDestination::GetOffsetY()
{
    return m_dest->_transportOffset.m_positionY;
}

TSNumber<float> TSSpellDestination::GetOffsetZ()
{
    return m_dest->_transportOffset.m_positionZ;
}

TSNumber<float> TSSpellDestination::GetOffsetO()
{
    return m_dest->_transportOffset.GetOrientation();
}

TSNumber<uint64> TSSpellDestination::GetTransportGUID()
{
    return m_dest->_transportGUID.GetRawValue();
}

void TSSpellDestination::Relocate(float x, float y, float z, float o)
{
    m_dest->Relocate(Position(x,y,z,o));
}

void TSSpellDestination::RelocateOffset(float x, float y, float z, float o)
{
    m_dest->RelocateOffset(Position(x, y, z, o));
}


TS_CLASS_DEFINITION(TSSpellImplicitTargetInfo, SpellImplicitTargetInfo, m_info)
bool TSSpellImplicitTargetInfo::IsArea()
{
    return m_info->IsArea();
}

TSNumber<uint32> TSSpellImplicitTargetInfo::GetSelectionCategory()
{
    return m_info->GetSelectionCategory();
}
TSNumber<uint32> TSSpellImplicitTargetInfo::GetReferenceType()
{
    return m_info->GetReferenceType();
}
TSNumber<uint32> TSSpellImplicitTargetInfo::GetObjectType()
{
    return m_info->GetObjectType();
}
TSNumber<uint32> TSSpellImplicitTargetInfo::GetCheckType()
{
    return m_info->GetCheckType();
}
TSNumber<uint32> TSSpellImplicitTargetInfo::GetDirectionType()
{
    return m_info->GetDirectionType();
}
TSNumber<float> TSSpellImplicitTargetInfo::CalcDirectionAngle()
{
    return m_info->CalcDirectionAngle();
}
TSNumber<uint32> TSSpellImplicitTargetInfo::GetTarget()
{
    return m_info->GetTarget();
}
TSNumber<uint32> TSSpellImplicitTargetInfo::GetExplicitTargetMask()
{
    bool a;
    bool b;
    return m_info->GetExplicitTargetMask(a,b);
}

bool TSSpellImplicitTargetInfo::IsSourceSet()
{
    bool a;
    bool b;
    m_info->GetExplicitTargetMask(a,b);
    return a;
}

bool TSSpellImplicitTargetInfo::IsTargetSet()
{
    bool a;
    bool b;
    m_info->GetExplicitTargetMask(a,b);
    return b;
}

TS_CLASS_DEFINITION(TSDispelInfo, DispelInfo, m_info)

TSWorldObject TSDispelInfo::GetDispeller()
{
    return TSWorldObject(m_info->GetDispeller());
}

TSNumber<uint32> TSDispelInfo::GetDispellerSpellId()
{
    return m_info->GetDispellerSpellId();
}

TSNumber<uint8> TSDispelInfo::GetRemovedCharges()
{
    return m_info->GetRemovedCharges();
}

void TSDispelInfo::SetRemovedCharges(uint8 amount)
{
    m_info->SetRemovedCharges(amount);
}

TSPlayerSpell::TSPlayerSpell(uint8 state, bool active, bool dependent, bool disabled)
    : m_state(state), m_active(active), m_dependent(dependent), m_disabled(disabled)
{}


TSNumber<uint8> TSPlayerSpell::GetState()
{
    return m_state;
}

bool TSPlayerSpell::GetActive()
{
    return m_active;
}

bool TSPlayerSpell::GetDependent()
{
    return m_dependent;
}

bool TSPlayerSpell::GetDisabled()
{
    return m_disabled;
}

