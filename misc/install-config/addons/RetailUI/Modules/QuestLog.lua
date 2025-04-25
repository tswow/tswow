--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'QuestLog'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')

Module.questLogFrame = nil

local function ReplaceBlizzardFrame(frame)
    local watchFrame = WatchFrame
    watchFrame:SetMovable(true)
    watchFrame:SetUserPlaced(true)
    watchFrame:ClearAllPoints()
    watchFrame:SetPoint("TOPRIGHT", frame, "TOPRIGHT", 0, 0)
end

function Module:OnEnable()
    self:RegisterEvent("PLAYER_ENTERING_WORLD")

    self.questLogFrame = CreateUIFrame(230, 500, "QuestLogFrame")
end

function Module:OnDisable()
    self:UnregisterEvent("PLAYER_ENTERING_WORLD")
end

function Module:PLAYER_ENTERING_WORLD()
    ReplaceBlizzardFrame(self.questLogFrame)

    CheckSettingsExists(Module, { 'questLog' })
end

function Module:LoadDefaultSettings()
    RUI.DB.profile.widgets.questLog = { anchor = "RIGHT", posX = -100, posY = -37 }
end

function Module:UpdateWidgets()
    local widgetOptions = RUI.DB.profile.widgets.questLog
    self.questLogFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
end

function Module:ShowEditorTest()
    HideUIFrame(self.questLogFrame)
end

function Module:HideEditorTest(refresh)
    ShowUIFrame(self.questLogFrame)
    SaveUIFramePosition(self.questLogFrame, 'questLog')

    if refresh then
        self:UpdateWidgets()
    end
end
