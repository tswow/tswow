#pragma once

#include "TSMain.h"

class ObjectGuid;

class TC_GAME_API TSGUID
{
public:
    explicit TSGUID(uint64 guid);
    TSGUID();
    TSNumber<uint32> GetCounter() const;
    TSNumber<uint32> GetType() const;
    TSNumber<uint32> GetEntry() const;
    bool operator==(TSGUID const& oth) const;
    bool operator!=(TSGUID const& oth) const;
    TSGUID* operator->() { return this; }
    bool IsEmpty()             const;
    bool IsCreature()          const;
    bool IsPet()               const;
    bool IsVehicle()           const;
    bool IsCreatureOrPet()     const;
    bool IsCreatureOrVehicle() const;
    bool IsAnyTypeCreature()   const;
    bool IsPlayer()            const;
    bool IsUnit()              const;
    bool IsItem()              const;
    bool IsGameObject()        const;
    bool IsDynamicObject()     const;
    bool IsCorpse()            const;
    bool IsTransport()         const;
    bool IsMOTransport()       const;
    bool IsAnyTypeGameObject() const;
    bool IsInstance()          const;
    bool IsGroup()             const;
    ObjectGuid asGUID() const;

    std::string stringify(int indention = 0) { return std::to_string(m_guid); };
private:
    uint64 m_guid;
};

TC_GAME_API TSGUID CreateGUID(TSNumber<uint32> high, TSNumber<uint32> entry);
TC_GAME_API TSGUID CreateGUID(TSNumber<uint32> high, TSNumber<uint32> entry, TSNumber<uint32> counter);
TC_GAME_API TSGUID EmptyGUID();