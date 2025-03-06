#include "ClientLua.h"
#include "SharedDefines.h"
#include "Logger.h"
#include "CVar.cpp"
#include <string>

struct WorldFrame;
template <typename T> struct Vec3D { T x, y, z; };
struct VecXYZ : Vec3D<float> {
    inline VecXYZ operator-(const VecXYZ& r) { return { x - r.x, y - r.y, z - r.z }; }
    inline float distance(const VecXYZ& other)
    {
        VecXYZ diff = (*this) - other;
        return std::sqrtf(std::powf(diff.x, 2) + std::powf(diff.y, 2) + std::powf(diff.z, 2));
    }
};

CLIENT_FUNCTION(WorldFrame_3Dto2D, 0x004F6D20, __fastcall,int,(WorldFrame* This, void* edx, VecXYZ* pos3d, VecXYZ* pos2d, uint32_t* flags));

inline void WorldFrame_PercToScreenPos(float x, float y, float* resX, float* resY)
{ 
    float g_UITexCoordAlphaMultiplier1 = *(float*)0x00AC0CB4;
    float g_UITexCoordAlphaMultiplier3 = *(float*)0x00AC0CBC;
    *resX = (x * (g_UITexCoordAlphaMultiplier3 * 1024.f)) / g_UITexCoordAlphaMultiplier1;
    *resY = (y * (g_UITexCoordAlphaMultiplier3 * 1024.f)) / g_UITexCoordAlphaMultiplier1;
}

LUA_FUNCTION(ConvertCoordsToScreenSpace, (lua_State* L)) {
    float ox = ClientLua::GetNumber(L, 1);
    float oy = ClientLua::GetNumber(L, 2);
    float oz = ClientLua::GetNumber(L, 3);
    WorldFrame* worldFrame = *(WorldFrame**)0x00B7436C;
    VecXYZ pos3d = {ox, oy, oz};
    VecXYZ pos2d = {};
    uint32_t flags = 0;
    int result = WorldFrame_3Dto2D(worldFrame,nullptr,&pos3d, &pos2d, &flags);
    float x;
    float y;
    WorldFrame_PercToScreenPos(pos2d.x, pos2d.y, &x, &y);
    ClientLua::PushNumber(L, x);
    ClientLua::PushNumber(L, y);
    ClientLua::PushNumber(L, pos2d.z);
    return 3;
}

LUA_FUNCTION(ReloadMap, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint64_t activePlayer = ClntObjMgr::GetActivePlayer();

        if (activePlayer) {
            MapRow* row = 0;
            int32_t mapId = *reinterpret_cast<uint32_t*>(0xBD088C);
            CGUnit* activeObjectPtr = reinterpret_cast<CGUnit*>(ClntObjMgr::ObjectPtr(activePlayer, TYPEMASK_UNIT));
            MovementInfo* moveInfo = activeObjectPtr->movementInfo;

            if (mapId > -1) {
                row = reinterpret_cast<MapRow*>(ClientDB::GetRow(reinterpret_cast<void*>(0xAD4178), mapId));

                if (row) {
                    World::UnloadMap();
                    World::LoadMap(row->m_Directory, &moveInfo->position, mapId);

                    SStr::Printf(buffer, 512, "Map ID: %d (Directory: \"%s\", x: %f, y: %f, z: %f) reloaded.", mapId, row->m_Directory, moveInfo->position.x, moveInfo->position.y, moveInfo->position.z);
                }
            }
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleDisplayNormals, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774F);
        bool areNormalsDisplayed = renderFlags & 0x40;

        if (areNormalsDisplayed) {
            *reinterpret_cast<uint8_t*>(0xCD774F) = renderFlags - 0x40;
            SStr::Printf(buffer, 512, "Normal display turned off.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774F) = renderFlags + 0x40;
            SStr::Printf(buffer, 512, "Normal display turned on.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleGroundEffects, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774E);
        bool areGroundEffectsDisplayed = renderFlags & 0x10;

        if (areGroundEffectsDisplayed) {
            *reinterpret_cast<uint8_t*>(0xCD774E) = renderFlags - 0x10;
            SStr::Printf(buffer, 512, "Ground clutter hidden.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774E) = renderFlags + 0x10;
            SStr::Printf(buffer, 512, "Ground clutter shown.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleLiquids, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774F);
        bool areLiquidsVisible = renderFlags & 0x3;

        if (areLiquidsVisible) {
            *reinterpret_cast<uint8_t*>(0xCD774F) = renderFlags - 0x3;
            SStr::Printf(buffer, 512, "Liquids hidden.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774F) = renderFlags + 0x3;
            SStr::Printf(buffer, 512, "Liquids shown.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleM2, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774C);
        bool areM2Displayed = renderFlags & 0x1;

        if (areM2Displayed) {
            *reinterpret_cast<uint8_t*>(0xCD774C) = renderFlags - 0x1;
            SStr::Printf(buffer, 512, "Client-side M2s hidden.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774C) = renderFlags + 0x1;
            SStr::Printf(buffer, 512, "Client-side M2s shown.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleTerrain, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774C);
        bool isTerrainDisplayed = renderFlags & 0x2;

        if (isTerrainDisplayed) {
            *reinterpret_cast<uint8_t*>(0xCD774C) = renderFlags - 0x2;
            SStr::Printf(buffer, 512, "Terrain hidden.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774C) = renderFlags + 0x2;
            SStr::Printf(buffer, 512, "Terrain shown.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleTerrainCulling, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774C);
        bool isTerranCullingOn = renderFlags & 0x32;

        if (isTerranCullingOn) {
            *reinterpret_cast<uint8_t*>(0xCD774C) = renderFlags - 0x32;
            SStr::Printf(buffer, 512, "Terrain culling disabled.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774C) = renderFlags + 0x32;
            SStr::Printf(buffer, 512, "Terrain culling enabled.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleWireframeMode, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774F);
        bool isWireframeModeOn = renderFlags & 0x20;

        if (isWireframeModeOn)
        {
            *reinterpret_cast<uint8_t*>(0xCD774F) = renderFlags - 0x20;
            SStr::Printf(buffer, 512, "Wireframe mode off.");
        }
        else
        {
            *reinterpret_cast<uint8_t*>(0xCD774F) = renderFlags + 0x20;
            SStr::Printf(buffer, 512, "Wireframe mode on.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(ToggleWMO, (lua_State* L)) {
    char buffer[512];

    if (ClientLua::isInDevMode) {
        uint8_t renderFlags = *reinterpret_cast<uint8_t*>(0xCD774D);
        bool areWMOsDisplayed = renderFlags & 0x1;

        if (areWMOsDisplayed) {
            *reinterpret_cast<uint8_t*>(0xCD774D) = renderFlags - 0x1;
            SStr::Printf(buffer, 512, "WMOs hidden.");
        }
        else {
            *reinterpret_cast<uint8_t*>(0xCD774D) = renderFlags + 0x1;
            SStr::Printf(buffer, 512, "WMOs shown.");
        }
    }
    else
        SStr::Printf(buffer, 512, "This function is not available in live client.");

    CGChat::AddChatMessage(buffer, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    return 0;
}

LUA_FUNCTION(TranslateToMapCoords, (lua_State* L)) {
    C3Vector worldPos = { 0, 0, 0 };
    uint32_t continentID = (uint32_t)ClientLua::GetNumber(L, 1);
    float mapX = 0;
    float mapY = 0;

    worldPos.x = ClientLua::GetNumber(L, 2);
    worldPos.y = ClientLua::GetNumber(L, 3);
    worldPos.z = ClientLua::GetNumber(L, 4);

    CGWorldFrame::TranslateToMapCoords(&worldPos, continentID, &mapX, &mapY, 0, 0, 0);

    ClientLua::PushNumber(L, mapX);
    ClientLua::PushNumber(L, mapY);
    return 2;
}
