#include "ClientLua.h"
#include "SharedDefines.h"
#include "Logger.h"

LUA_FUNCTION(FireActionBarSlotUpdateEvent, (lua_State* L)) {
    uint8_t slotID = ClientLua::GetNumber(L, 1);

    if (slotID < 144)
        FrameScript::SignalEvent(EVENT_ACTIONBAR_SLOT_CHANGED, "%d", slotID + 1);

    return 0;
}

LUA_FUNCTION(FireTalentUpdateEvent, (lua_State* L)) {
    FrameScript::SignalEvent(EVENT_PLAYER_TALENT_UPDATE, 0);

    return 0;
}

LUA_FUNCTION(FlashGameWindow, (lua_State* L)) {
    HWND activeWindow = *(HWND*)0xD41620;

    if (activeWindow && GetForegroundWindow() != activeWindow) {
        FLASHWINFO flashInfo;

        flashInfo.cbSize = sizeof(flashInfo);
        flashInfo.hwnd = activeWindow;
        flashInfo.dwFlags = FLASHW_TIMERNOFG | FLASHW_TRAY;
        flashInfo.uCount = -1;
        flashInfo.dwTimeout = 500;

        FlashWindowEx(&flashInfo);
    }

    return 0;
}

LUA_FUNCTION(FindSpellActionBarSlot, (lua_State* L)) {
    uint32_t spellID = ClientLua::GetNumber(L, 1);
    uintptr_t* actionBarSpellIDs = reinterpret_cast<uintptr_t*>(0xC1E358);
    uint8_t count = 0;

    for (uint8_t i = 0; i < 144; i++)
        if (actionBarSpellIDs[i] == spellID) {
            ClientLua::PushNumber(L, i);
            count++;
        }

    if (!count) {
        ClientLua::PushNil(L);
        return 1;
    }
    else
        return count;
}

LUA_FUNCTION(ReplaceActionBarSpell, (lua_State* L)) {
    uint32_t oldSpellID = ClientLua::GetNumber(L, 1);
    uint32_t newSpellID = ClientLua::GetNumber(L, 2);
    uintptr_t* actionBarSpellIDs = reinterpret_cast<uintptr_t*>(0xC1E358);
    uintptr_t* actionButtons = reinterpret_cast<uintptr_t*>(0xC1DED8);

    for (uint8_t i = 0; i < 144; i++)
        if (actionBarSpellIDs[i] == oldSpellID) {
            actionBarSpellIDs[i] = newSpellID;
            ClientPacket::MSG_SET_ACTION_BUTTON(i, 1, 0);

            for (uint8_t j = i + 72; j < 144; j += 12) {
                if (!actionButtons[j]) {
                    actionBarSpellIDs[i] = newSpellID;
                    actionButtons[j] = 1;
                    ClientPacket::MSG_SET_ACTION_BUTTON(j, 1, 0);
                }
            }
        }

    return 0;
}

LUA_FUNCTION(SetSpellInActionBarSlot, (lua_State* L)) {
    uint32_t spellID = ClientLua::GetNumber(L, 1);
    uint8_t slotID = ClientLua::GetNumber(L, 2);
    uintptr_t* actionBarSpellIDs = reinterpret_cast<uintptr_t*>(0xC1E358);
    uintptr_t* actionButtons = reinterpret_cast<uintptr_t*>(0xC1DED8);

    if (slotID < 144) {
        if (!actionButtons[slotID])
            actionButtons[slotID] = 1;

        actionBarSpellIDs[slotID] = spellID;
        ClientPacket::MSG_SET_ACTION_BUTTON(slotID, 1, 0);
    }

    return 0;
}
