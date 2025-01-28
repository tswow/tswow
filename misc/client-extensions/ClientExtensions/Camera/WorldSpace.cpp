#include "ClientLua.h"
#include "ClientDetours.h"
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