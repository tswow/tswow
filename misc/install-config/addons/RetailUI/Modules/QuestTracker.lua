--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'QuestTracker'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')

Module.questTrackerFrame = nil

local function ReplaceBlizzardFrame(frame)
    local watchFrame = WatchFrame
    watchFrame:SetMovable(true)
    watchFrame:SetUserPlaced(true)
    watchFrame:ClearAllPoints()
    watchFrame:SetPoint("TOPRIGHT", frame, "TOPRIGHT", 0, 0)

    WatchFrameLines:SetPoint("TOPLEFT", WatchFrameHeader, 'BOTTOMLEFT', 0, -15)
end

local function WatchFrame_Collapse(self)
    self:SetWidth(WATCHFRAME_EXPANDEDWIDTH)
end

local function WatchFrame_Update(self)
    local pixelsUsed = 0
    local totalOffset = WATCHFRAME_INITIAL_OFFSET
    local lineFrame = WatchFrameLines
    local maxHeight = (WatchFrame:GetTop() - WatchFrame:GetBottom())

    local maxFrameWidth = WATCHFRAME_MAXLINEWIDTH
    local maxLineWidth
    local numObjectives
    local totalObjectives = 0

    for i = 1, #WATCHFRAME_OBJECTIVEHANDLERS do
        pixelsUsed, maxLineWidth, numObjectives = WATCHFRAME_OBJECTIVEHANDLERS[i](lineFrame, totalOffset, maxHeight,
            maxFrameWidth)
        totalObjectives = totalObjectives + numObjectives
    end

    local watchFrame = WatchFrame
    watchFrame.background = watchFrame.background or watchFrame:CreateTexture(nil, 'BACKGROUND')
    local background = watchFrame.background
    background:SetPoint('RIGHT', WatchFrameCollapseExpandButton, 'RIGHT', 0, 0)
    SetAtlasTexture(background, 'QuestTracker-Header')
    background:SetSize(watchFrame:GetWidth(), 36)

    if totalObjectives > 0 then
        background:Show()
    else
        background:Hide()
    end
end

function Module:OnEnable()
    self:RegisterEvent("PLAYER_ENTERING_WORLD")

    self:SecureHook('WatchFrame_Collapse', WatchFrame_Collapse)
    self:SecureHook('WatchFrame_Update', WatchFrame_Update)

    self.questTrackerFrame = CreateUIFrame(230, 500, "QuestTrackerFrame")
end

function Module:OnDisable()
    self:UnregisterEvent("PLAYER_ENTERING_WORLD")

    self:Unhook('WatchFrame_Collapse', WatchFrame_Collapse)
    self:Unhook('WatchFrame_Update', WatchFrame_Update)
end

function Module:PLAYER_ENTERING_WORLD()
    ReplaceBlizzardFrame(self.questTrackerFrame)

    CheckSettingsExists(Module, { 'questTracker' })
end

function Module:LoadDefaultSettings()
    RUI.DB.profile.widgets.questTracker = { anchor = "RIGHT", posX = -100, posY = -37 }
end

function Module:UpdateWidgets()
    local widgetOptions = RUI.DB.profile.widgets.questTracker
    self.questTrackerFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
end

function Module:ShowEditorTest()
    HideUIFrame(self.questTrackerFrame)
end

function Module:HideEditorTest(refresh)
    ShowUIFrame(self.questTrackerFrame)
    SaveUIFramePosition(self.questTrackerFrame, 'questTracker')

    if refresh then
        self:UpdateWidgets()
    end
end
