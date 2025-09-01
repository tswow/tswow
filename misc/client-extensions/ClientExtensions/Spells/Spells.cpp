#include "Spells.h"
#include "ClientDetours.h"
#include "ClientLua.h"

void Spells::Apply() {
    
}

CLIENT_DETOUR(CastSpell, 0x00540310, __cdecl, int, (lua_State* L))
{
    if (!SStrCmpI(ClientLua::ToLString(L, 2, 0), "cursor", 6))
    {
        ClientLua::SetTop(L, -2);
        Spells::s_castAtCursor = true;
    }
    else if (!SStrCmpI(ClientLua::ToLString(L, 2, 0), "self", 4))
    {
        ClientLua::SetTop(L, -2);
        CastSpell(L);

        CGPlayer* activeObjectPtr = ClntObjMgr::GetActivePlayerObj();
        if (activeObjectPtr)
        {
            C3Vector position = activeObjectPtr->unitBase.movementInfo->position;

            TerrainClickEvent terrainClickEvent = {};
            terrainClickEvent.GUID              = 0;
            terrainClickEvent.x                 = position.x;
            terrainClickEvent.y                 = position.y;
            terrainClickEvent.z                 = position.z;
            terrainClickEvent.button            = 1;
            TerrainClick(&terrainClickEvent);
        }

        return 0;
    }
    return CastSpell(L);
}

CLIENT_DETOUR_THISCALL(OnLayerTrackTerrain, 0x004F66C0, int, (uint32_t* a2))
{
    if (Spells::s_castAtCursor)
    {
        Spells::s_castAtCursor              = false;
        TerrainClickEvent terrainClickEvent = {};
        terrainClickEvent.GUID              = 0;
        terrainClickEvent.x                 = *(float*)&a2[2];
        terrainClickEvent.y                 = *(float*)&a2[3];
        terrainClickEvent.z                 = *(float*)&a2[4];
        terrainClickEvent.button            = 1;
        TerrainClick(&terrainClickEvent);
        return 0;
    }
    return OnLayerTrackTerrain(self, a2);
}
