#include "TSGUID.h"

#include "ObjectGuid.h"

TSGUID::TSGUID()
    : m_guid(0)
{}

TSGUID::TSGUID(uint64 guid)
    : m_guid(guid)
{}

TSNumber<uint32> TSGUID::GetCounter() const
{
    return asGUID().GetCounter();
}

TSNumber<uint32> TSGUID::GetType() const
{
    return static_cast<uint32>(asGUID().GetHigh());
}

TSNumber<uint32> TSGUID::GetEntry() const
{
    return asGUID().GetEntry();
}

bool TSGUID::operator==(TSGUID const& oth) const
{
    return m_guid == oth.m_guid;
}

bool TSGUID::operator!=(TSGUID const& oth) const
{
    return m_guid != oth.m_guid;
}

ObjectGuid TSGUID::asGUID() const
{
    return ObjectGuid(m_guid);
}

bool TSGUID::IsEmpty()             const { return asGUID().IsEmpty(); }
bool TSGUID::IsCreature()          const { return asGUID().IsCreature(); }
bool TSGUID::IsPet()               const { return asGUID().IsPet(); }
bool TSGUID::IsVehicle()           const { return asGUID().IsVehicle(); }
bool TSGUID::IsCreatureOrPet()     const { return asGUID().IsCreatureOrPet(); }
bool TSGUID::IsCreatureOrVehicle() const { return asGUID().IsCreatureOrVehicle(); }
bool TSGUID::IsAnyTypeCreature()   const { return asGUID().IsAnyTypeCreature(); }
bool TSGUID::IsPlayer()            const { return asGUID().IsPlayer(); }
bool TSGUID::IsUnit()              const { return asGUID().IsUnit(); }
bool TSGUID::IsItem()              const { return asGUID().IsItem(); }
bool TSGUID::IsGameObject()        const { return asGUID().IsGameObject(); }
bool TSGUID::IsDynamicObject()     const { return asGUID().IsDynamicObject(); }
bool TSGUID::IsCorpse()            const { return asGUID().IsCorpse(); }
bool TSGUID::IsTransport()         const { return asGUID().IsTransport(); }
bool TSGUID::IsMOTransport()       const { return asGUID().IsMOTransport(); }
bool TSGUID::IsAnyTypeGameObject() const { return asGUID().IsAnyTypeGameObject(); }
bool TSGUID::IsInstance()          const { return asGUID().IsInstance(); }
bool TSGUID::IsGroup()             const { return asGUID().IsGroup(); }

TSGUID CreateGUID(TSNumber<uint32> high, TSNumber<uint32> entry)
{
    ObjectGuid guid(static_cast<HighGuid>(high), static_cast<ObjectGuid::LowType>(entry));
    return TSGUID(guid.GetRawValue());
}

TSGUID CreateGUID(TSNumber<uint32> high, TSNumber<uint32> entry, TSNumber<uint32> counter)
{
    ObjectGuid guid(static_cast<HighGuid>(high), static_cast<uint32>(entry), static_cast<ObjectGuid::LowType>(counter));
    return TSGUID(guid.GetRawValue());
}

TSGUID EmptyGUID()
{
    return CreateGUID(0, 0);
}