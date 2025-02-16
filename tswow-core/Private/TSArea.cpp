#include <memory.h>
#include "Object.h"

#include "TSIncludes.h"
#include "TSArea.h"

TS_CLASS_DEFINITION_ENTITY_PROVIDER(TSArea, Area, area)

class AreaScript;

TSArea::TSArea(Area *area)
    : TSEntityProvider(&area->m_tsEntity)
    , area(area)
{
}

uint32 TSArea::GetId() {
    return area->GetId();
}

TSArea TSArea::GetParent()
{
    return TSArea(area->GetParent());
}

TSMap TSArea::GetMap()
{
    return TSMap(area->GetMap());
}

TSArray<TSPlayer> TSArea::GetPlayers() {
    TSArray<TSPlayer> out;
    auto players = area->GetPlayers();

    out.vec->reserve(players.size());
    for (auto P : players) {
        if (!P)
            continue;

        if (P->GetSession())
            out.push(TSPlayer(P));
    }

    return out;
}
