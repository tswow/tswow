--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'BuffFrame'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')

Module.buffFrame = nil

local function ReplaceBlizzardFrame(frame)
    frame.toggleButton = frame.toggleButton or CreateFrame('Button', nil, UIParent)
    local toggleButton = frame.toggleButton
    toggleButton.toggle = true
    toggleButton:SetPoint("RIGHT", frame, "RIGHT", 0, -3)
    toggleButton:SetSize(9, 17)
    toggleButton:SetHitRectInsets(0, 0, 0, 0)

    local normalTexture = toggleButton:GetNormalTexture() or toggleButton:CreateTexture(nil, "BORDER")
    normalTexture:SetAllPoints(toggleButton)
    SetAtlasTexture(normalTexture, 'CollapseButton-Right')

    toggleButton:SetNormalTexture(normalTexture)

    local highlightTexture = toggleButton:GetHighlightTexture() or toggleButton:CreateTexture(nil, "HIGHLIGHT")
    highlightTexture:SetAllPoints(toggleButton)
    SetAtlasTexture(highlightTexture, 'CollapseButton-Right')

    toggleButton:SetHighlightTexture(highlightTexture)

    toggleButton:SetScript("OnClick", function(self)
        if self.toggle then
            local normalTexture = self:GetNormalTexture()
            SetAtlasTexture(normalTexture, 'CollapseButton-Left')

            local highlightTexture = toggleButton:GetHighlightTexture()
            SetAtlasTexture(highlightTexture, 'CollapseButton-Left')

            for index = 1, BUFF_ACTUAL_DISPLAY do
                local button = _G['BuffButton' .. index]
                if button then
                    button:Hide()
                end
            end
        else
            local normalTexture = self:GetNormalTexture()
            SetAtlasTexture(normalTexture, 'CollapseButton-Right')

            local highlightTexture = toggleButton:GetHighlightTexture()
            SetAtlasTexture(highlightTexture, 'CollapseButton-Right')

            for index = 1, BUFF_ACTUAL_DISPLAY do
                local button = _G['BuffButton' .. index]
                if button then
                    button:Show()
                end
            end
        end

        self.toggle = not self.toggle
    end)

    local consolidatedBuffFrame = ConsolidatedBuffs
    consolidatedBuffFrame:SetMovable(true)
    consolidatedBuffFrame:SetUserPlaced(true)
    consolidatedBuffFrame:ClearAllPoints()
    consolidatedBuffFrame:SetPoint("RIGHT", toggleButton, "LEFT", -6, 0)
end

local function ShowToggleButtonIf(condition)
    if condition then
        Module.buffFrame.toggleButton:Show()
    else
        Module.buffFrame.toggleButton:Hide()
    end
end

local function GetUnitBuffCount(unit, range)
    local count = 0
    for index = 1, range do
        local name = UnitBuff(unit, index)
        if name then
            count = count + 1
        end
    end
    return count
end

function Module:OnEnable()
    self:RegisterEvent("PLAYER_ENTERING_WORLD")
    self:RegisterEvent("UNIT_AURA")
    self:RegisterEvent("UNIT_ENTERED_VEHICLE")
    self:RegisterEvent("UNIT_EXITED_VEHICLE")

    self.buffFrame = CreateUIFrame(BuffFrame:GetWidth(), BuffFrame:GetHeight(), "BuffFrame")
end

function Module:OnDisable()
    self:UnregisterEvent("PLAYER_ENTERING_WORLD")
    self:UnregisterEvent("UNIT_AURA")
    self:UnregisterEvent("UNIT_ENTERED_VEHICLE")
    self:UnregisterEvent("UNIT_EXITED_VEHICLE")
end

function Module:PLAYER_ENTERING_WORLD()
    ReplaceBlizzardFrame(self.buffFrame)

    ShowToggleButtonIf(GetUnitBuffCount("player", 16) > 0)

    CheckSettingsExists(Module, { 'buffs' })
end

function Module:UNIT_AURA(eventName, unit)
    if unit == 'vehicle' then
        ShowToggleButtonIf(GetUnitBuffCount("vehicle", 16) > 0)
    elseif unit == 'player' then
        ShowToggleButtonIf(GetUnitBuffCount("player", 16) > 0)
    end
end

function Module:UNIT_ENTERED_VEHICLE(eventName, unit)
    if unit ~= 'player' then return end

    ShowToggleButtonIf(GetUnitBuffCount("vehicle", 16) > 0)
end

function Module:UNIT_EXITED_VEHICLE(eventName, unit)
    if unit ~= 'player' then return end

    ShowToggleButtonIf(GetUnitBuffCount("player", 16) > 0)
end

function Module:LoadDefaultSettings()
    RUI.DB.profile.widgets.buffs = { anchor = "TOPRIGHT", posX = -260, posY = -20 }
end

function Module:UpdateWidgets()
    local widgetOptions = RUI.DB.profile.widgets.buffs
    self.buffFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
end

function Module:ShowEditorTest()
    HideUIFrame(self.buffFrame)
end

function Module:HideEditorTest(refresh)
    ShowUIFrame(self.buffFrame)
    SaveUIFramePosition(self.buffFrame, 'buffs')

    if refresh then
        self:UpdateWidgets()
    end
end
