--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'CastingBar'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')

Module.playerCastingBar = nil

local function ReplaceBlizzardCastingBarFrame(castingBarFrame, attachTo)
    local statusBar = castingBarFrame
    statusBar:SetMovable(true)
    statusBar:SetUserPlaced(true)
    statusBar:ClearAllPoints()
    statusBar:SetMinMaxValues(0.0, 1.0)
    statusBar:SetFrameLevel(statusBar:GetParent():GetFrameLevel() + 1)

    statusBar.selfInterrupt = false

    attachTo = attachTo or nil
    if attachTo then
        statusBar:SetPoint("LEFT", attachTo, "LEFT", 0, 0)
        statusBar:SetSize(attachTo:GetWidth() - 10, attachTo:GetHeight() - 5)
    end

    local statusBarTexture = statusBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(statusBar)
    statusBarTexture:SetDrawLayer('BORDER')

    local borderTexture = _G[statusBar:GetName() .. "Border"]
    borderTexture:SetAllPoints(statusBar)
    borderTexture:SetPoint("TOPLEFT", -3, 2)
    borderTexture:SetPoint("BOTTOMRIGHT", 3, -2)
    SetAtlasTexture(borderTexture, 'CastingBar-Border')

    for _, region in pairs { statusBar:GetRegions() } do
        if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'BACKGROUND' then
            region:SetAllPoints(borderTexture)
            SetAtlasTexture(region, 'CastingBar-Background')
        end
    end

    local sparkTexture = _G[statusBar:GetName() .. "Spark"]
    SetAtlasTexture(sparkTexture, 'CastingBar-Spark')
    sparkTexture:SetSize(4, statusBar:GetHeight() * 1.25)

    local castingNameText = _G[statusBar:GetName() .. "Text"]
    castingNameText:ClearAllPoints()
    castingNameText:SetPoint("BOTTOMLEFT", 5, -16)
    castingNameText:SetJustifyH("LEFT")
    castingNameText:SetWidth(statusBar:GetWidth() * 0.6)

    statusBar.backgroundInfo = statusBar.backgroundInfo or CreateFrame("Frame", nil, statusBar)
    statusBar.backgroundInfo.background = statusBar.backgroundInfo.background or
        statusBar:CreateTexture(nil, "BACKGROUND")
    local backgroundTexture = statusBar.backgroundInfo.background
    backgroundTexture:SetAllPoints(statusBar)
    backgroundTexture:SetPoint("BOTTOMRIGHT", 1, -16)
    SetAtlasTexture(backgroundTexture, 'CastingBar-MainBackground')

    local iconTexture = _G[statusBar:GetName() .. "Icon"]
    iconTexture:ClearAllPoints()
    iconTexture:SetPoint("RIGHT", backgroundTexture, "LEFT", -5, 0)
    iconTexture:SetSize(24, 24)

    statusBar.castingTime = statusBar.castingTime or statusBar:CreateFontString(nil, "BORDER", 'GameFontHighlightSmall')
    local castTimeText = statusBar.castingTime
    castTimeText:SetPoint("BOTTOMRIGHT", -4, -14)
    castTimeText:SetJustifyH("RIGHT")

    local flashTexture = _G[statusBar:GetName() .. "Flash"]
    flashTexture:SetAlpha(0)

    local borderShieldTexture = _G[statusBar:GetName() .. 'BorderShield']
    borderShieldTexture:ClearAllPoints()
    borderShieldTexture:SetPoint("CENTER", _G[statusBar:GetName() .. 'Icon'], "CENTER", 0, 0)
    SetAtlasTexture(borderShieldTexture, 'CastingBar-BorderShield')
    borderShieldTexture:SetDrawLayer("BACKGROUND")
    borderShieldTexture:SetSize(borderShieldTexture:GetWidth() / 2.5, borderShieldTexture:GetHeight() / 2.5)

    statusBar.ShowTest = function(self)
        SetAtlasTexture(self:GetStatusBarTexture(), 'CastingBar-StatusBar-Casting')
        self:GetStatusBarTexture():SetVertexColor(1, 1, 1, 1)
        self:SetValue(0.5)

        local castingNameText = _G[self:GetName() .. "Text"]
        castingNameText:SetText("Healing Wave")
        self.castingTime:SetText(string.format('%.1f/%.2f', 0.5, 1.0))

        self:SetAlpha(1.0)
        self:Show()
    end

    statusBar.HideTest = function(self)
        self:Hide()
    end
end

local function CastingBarFrame_OnUpdate(self, elapsed)
    local currentTime, value, remainingTime = GetTime(), 0, 0
    if self.channelingEx or self.castingEx then
        if self.castingEx then
            remainingTime = min(currentTime, self.endTime) - self.startTime
            value = remainingTime / (self.endTime - self.startTime)
        elseif self.channelingEx then
            remainingTime = self.endTime - currentTime
            value = remainingTime / (self.endTime - self.startTime)
        end

        self:SetValue(value)

        self.castingTime:SetText(string.format('%.1f/%.2f', abs(remainingTime),
            self.endTime - self.startTime))

        local sparkTexture = _G[self:GetName() .. "Spark"]
        sparkTexture:ClearAllPoints()
        sparkTexture:SetPoint("CENTER", self, "LEFT", value * self:GetWidth(), 0)

        if currentTime > self.endTime then
            self.castingEx, self.channelingEx = nil, nil
            self.fadeOutEx = true
        end
    elseif self.fadeOutEx then
        local sparkTexture = _G[self:GetName() .. "Spark"]
        if sparkTexture then
            sparkTexture:Hide()
        end

        if self:GetAlpha() <= 0.0 then
            self:Hide()
        end
    end
end

local function Target_Spellbar_AdjustPosition(self)
    self.SetPoint = UIParent.SetPoint
    local parentFrame = self:GetParent()
    self:ClearAllPoints()
    if parentFrame.haveToT then
        if (parentFrame.auraRows <= 1) then
            self:SetPoint("TOPLEFT", parentFrame, "BOTTOMLEFT", 25, -40)
        else
            self:SetPoint("TOPLEFT", parentFrame.spellbarAnchor, "BOTTOMLEFT", 20, -20)
        end
    elseif parentFrame.haveElite then
        if parentFrame.auraRows <= 1 then
            self:SetPoint("TOPLEFT", parentFrame, "BOTTOMLEFT", 25, -10)
        else
            self:SetPoint("TOPLEFT", parentFrame.spellbarAnchor, "BOTTOMLEFT", 20, -10)
        end
    else
        if parentFrame.auraRows > 0 then
            self:SetPoint("TOPLEFT", parentFrame.spellbarAnchor, "BOTTOMLEFT", 20, -10)
        else
            self:SetPoint("TOPLEFT", parentFrame, "BOTTOMLEFT", 25, -10)
        end
    end
    self.SetPoint = function() end
end

function Module:OnEnable()
    self:RegisterEvent("PLAYER_ENTERING_WORLD")
    self:RegisterEvent("UNIT_SPELLCAST_START")
    self:RegisterEvent("UNIT_SPELLCAST_STOP")
    self:RegisterEvent("UNIT_SPELLCAST_FAILED")
    self:RegisterEvent("UNIT_SPELLCAST_INTERRUPTED")
    self:RegisterEvent("UNIT_SPELLCAST_DELAYED")
    self:RegisterEvent("UNIT_SPELLCAST_CHANNEL_START")
    self:RegisterEvent("UNIT_SPELLCAST_CHANNEL_STOP")
    self:RegisterEvent("UNIT_SPELLCAST_CHANNEL_INTERRUPTED")
    self:RegisterEvent("UNIT_SPELLCAST_CHANNEL_UPDATE")
    self:RegisterEvent("UNIT_SPELLCAST_INTERRUPTIBLE")
    self:RegisterEvent("UNIT_SPELLCAST_NOT_INTERRUPTIBLE")
    self:RegisterEvent("PLAYER_TARGET_CHANGED")
    self:RegisterEvent("PLAYER_FOCUS_CHANGED")

    CastingBarFrame:UnregisterAllEvents()
    FocusFrameSpellBar:UnregisterAllEvents()
    TargetFrameSpellBar:UnregisterAllEvents()
    PetCastingBarFrame:UnregisterAllEvents()

    CastingBarFrame:HookScript("OnUpdate", CastingBarFrame_OnUpdate)
    TargetFrameSpellBar:HookScript("OnUpdate", CastingBarFrame_OnUpdate)
    FocusFrameSpellBar:HookScript("OnUpdate", CastingBarFrame_OnUpdate)
    PetCastingBarFrame:HookScript("OnUpdate", CastingBarFrame_OnUpdate)

    self:SecureHook('Target_Spellbar_AdjustPosition', Target_Spellbar_AdjustPosition)

    self.playerCastingBar = CreateUIFrame(228, 18, "CastingBarFrame")
end

function Module:OnDisable()
    self:UnregisterEvent("PLAYER_ENTERING_WORLD")
    self:UnregisterEvent("UNIT_SPELLCAST_START")
    self:UnregisterEvent("UNIT_SPELLCAST_STOP")
    self:UnregisterEvent("UNIT_SPELLCAST_FAILED")
    self:UnregisterEvent("UNIT_SPELLCAST_INTERRUPTED")
    self:UnregisterEvent("UNIT_SPELLCAST_DELAYED")
    self:UnregisterEvent("UNIT_SPELLCAST_CHANNEL_START")
    self:UnregisterEvent("UNIT_SPELLCAST_CHANNEL_STOP")
    self:UnregisterEvent("UNIT_SPELLCAST_CHANNEL_INTERRUPTED")
    self:UnregisterEvent("UNIT_SPELLCAST_CHANNEL_UPDATE")
    self:UnregisterEvent("UNIT_SPELLCAST_INTERRUPTIBLE")
    self:UnregisterEvent("UNIT_SPELLCAST_NOT_INTERRUPTIBLE")
    self:UnregisterEvent("PLAYER_TARGET_CHANGED")
    self:UnregisterEvent("PLAYER_FOCUS_CHANGED")

    CastingBarFrame:Unhook("OnUpdate", CastingBarFrame_OnUpdate)
    TargetFrameSpellBar:Unhook("OnUpdate", CastingBarFrame_OnUpdate)
    FocusFrameSpellBar:Unhook("OnUpdate", CastingBarFrame_OnUpdate)
    PetCastingBarFrame:Unhook("OnUpdate", CastingBarFrame_OnUpdate)

    self:Unhook('Target_Spellbar_AdjustPosition', Target_Spellbar_AdjustPosition)
end

function Module:PLAYER_ENTERING_WORLD()
    ReplaceBlizzardCastingBarFrame(CastingBarFrame, self.playerCastingBar)
    ReplaceBlizzardCastingBarFrame(TargetFrameSpellBar)
    ReplaceBlizzardCastingBarFrame(FocusFrameSpellBar)
    ReplaceBlizzardCastingBarFrame(PetCastingBarFrame)

    CheckSettingsExists(Module, { 'playerCastingBar' })
end

function Module:PLAYER_TARGET_CHANGED()
    local statusBar = TargetFrameSpellBar

    if UnitExists("target") and statusBar.unit == UnitGUID("target") then
        if GetTime() > statusBar.endTime then
            statusBar:Hide()
        else
            statusBar:Show()
        end
    else
        statusBar:Hide()
    end
end

function Module:PLAYER_FOCUS_CHANGED()
    local statusBar = FocusFrameSpellBar

    if UnitExists("focus") and statusBar.unit == UnitGUID("focus") then
        if GetTime() > statusBar.endTime then
            statusBar:Hide()
        else
            statusBar:Show()
        end
    else
        statusBar:Hide()
    end
end

function Module:UNIT_SPELLCAST_START(eventName, unit)
    local statusBar
    if unit == 'player' then
        statusBar = CastingBarFrame
    elseif unit == 'target' then
        statusBar = TargetFrameSpellBar
        statusBar.unit = UnitGUID("target")
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        statusBar.unit = UnitGUID("focus")
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    local castingNameText = _G[statusBar:GetName() .. "Text"]

    local spell, rank, displayName, icon, startTime, endTime
    if eventName == 'UNIT_SPELLCAST_START' then
        spell, rank, displayName, icon, startTime, endTime = UnitCastingInfo(unit)
        statusBar.castingEx = true

        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Casting')
    else
        spell, rank, displayName, icon, startTime, endTime = UnitChannelInfo(unit)
        statusBar.channelingEx = true

        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Channeling')
    end

    local iconTexture = _G[statusBar:GetName() .. 'Icon']
    if unit ~= 'player' then
        iconTexture:SetTexture(icon)
        iconTexture:Show()
    else
        iconTexture:Hide()
    end

    castingNameText:SetText(displayName)
    statusBar:GetStatusBarTexture():SetVertexColor(1, 1, 1, 1)

    statusBar.startTime = startTime / 1000
    statusBar.endTime = endTime / 1000

    UIFrameFadeRemoveFrame(statusBar)

    local sparkTexture = _G[statusBar:GetName() .. "Spark"]
    sparkTexture:Show()

    statusBar:SetAlpha(1.0)
    statusBar:Show()
end

Module.UNIT_SPELLCAST_CHANNEL_START = Module.UNIT_SPELLCAST_START

function Module:UNIT_SPELLCAST_STOP(eventName, unit)
    local statusBar
    if unit == 'player' then
        statusBar = CastingBarFrame
    elseif unit == 'target' then
        statusBar = TargetFrameSpellBar
        if statusBar.unit ~= UnitGUID('target') then
            return
        end
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        if statusBar.unit ~= UnitGUID('focus') then
            return
        end
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    if statusBar.castingEx then
        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Casting')
    elseif statusBar.channelingEx then
        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Channeling')
        statusBar.selfInterrupt = true
    end

    statusBar:GetStatusBarTexture():SetVertexColor(1, 1, 1, 1)

    statusBar.castingEx, statusBar.channelingEx = false, false
    statusBar.fadeOutEx = true

    UIFrameFadeOut(statusBar, 1, 1.0, 0.0)
end

Module.UNIT_SPELLCAST_CHANNEL_STOP = Module.UNIT_SPELLCAST_STOP

function Module:UNIT_SPELLCAST_FAILED(eventName, unit)
    local statusBar
    if unit == 'player' then
        statusBar = CastingBarFrame
    elseif unit == 'target' then
        statusBar = TargetFrameSpellBar
        if statusBar.unit ~= UnitGUID('target') then
            return
        end
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        if statusBar.unit ~= UnitGUID('focus') then
            return
        end
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    if statusBar.castingEx then
        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Casting')
    elseif statusBar.channelingEx then
        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Channeling')
    end

    statusBar:GetStatusBarTexture():SetVertexColor(1, 1, 1, 1)
end

function Module:UNIT_SPELLCAST_INTERRUPTED(eventName, unit)
    local statusBar
    if unit == 'player' then
        statusBar = CastingBarFrame
    elseif unit == 'target' then
        statusBar = TargetFrameSpellBar
        if statusBar.unit ~= UnitGUID('target') then
            return
        end
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        if statusBar.unit ~= UnitGUID('focus') then
            return
        end
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    if not statusBar.selfInterrupt then
        statusBar:SetValue(1.0)
        SetAtlasTexture(statusBar:GetStatusBarTexture(), 'CastingBar-StatusBar-Failed')
        statusBar:GetStatusBarTexture():SetVertexColor(1, 1, 1, 1)

        local castingNameText = _G[statusBar:GetName() .. "Text"]
        castingNameText:SetText("Interrupted")
    else
        statusBar.selfInterrupt = false
    end

    statusBar.castingEx, statusBar.channelingEx = false, false
    statusBar.fadeOutEx = true

    UIFrameFadeOut(statusBar, 1, 1.0, 0.0)
end

Module.UNIT_SPELLCAST_CHANNEL_INTERRUPTED = Module.UNIT_SPELLCAST_INTERRUPTED

function Module:UNIT_SPELLCAST_DELAYED(eventName, unit)
    local statusBar
    if unit == 'player' then
        statusBar = CastingBarFrame
    elseif unit == 'target' then
        statusBar = TargetFrameSpellBar
        if statusBar.unit ~= UnitGUID('target') then
            return
        end
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        if statusBar.unit ~= UnitGUID('focus') then
            return
        end
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    local spell, rank, displayName, icon, startTime, endTime
    if statusBar.castingEx then
        spell, rank, displayName, icon, startTime, endTime = UnitCastingInfo(unit)
    elseif statusBar.channelingEx then
        spell, rank, displayName, icon, startTime, endTime = UnitChannelInfo(unit)
    end

    if not spell then
        statusBar:Hide()
        return
    end

    statusBar.startTime = startTime / 1000
    statusBar.endTime = endTime / 1000
end

Module.UNIT_SPELLCAST_CHANNEL_UPDATE = Module.UNIT_SPELLCAST_DELAYED

function Module:UNIT_SPELLCAST_INTERRUPTIBLE(unit)
    local statusBar
    if unit == 'target' then
        statusBar = TargetFrameSpellBar
        if statusBar.unit ~= UnitGUID('target') then
            return
        end
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        if statusBar.unit ~= UnitGUID('focus') then
            return
        end
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    local borderShieldTexture = _G[statusBar:GetName() .. 'BorderShield']
    borderShieldTexture:Show()
end

function Module:UNIT_SPELLCAST_NOT_INTERRUPTIBLE(unit)
    local statusBar
    if unit == 'target' then
        statusBar = TargetFrameSpellBar
        if statusBar.unit ~= UnitGUID('target') then
            return
        end
    elseif unit == 'focus' then
        statusBar = FocusFrameSpellBar
        if statusBar.unit ~= UnitGUID('focus') then
            return
        end
    elseif unit == 'pet' then
        statusBar = PetCastingBarFrame
    else
        return
    end

    local borderShieldTexture = _G[statusBar:GetName() .. 'BorderShield']
    borderShieldTexture:Hide()
end

function Module:LoadDefaultSettings()
    RUI.DB.profile.widgets.playerCastingBar = { anchor = "BOTTOM", posX = 0, posY = 270 }
end

function Module:UpdateWidgets()
    local widgetOptions = RUI.DB.profile.widgets.playerCastingBar
    self.playerCastingBar:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
end

function Module:ShowEditorTest()
    HideUIFrame(self.playerCastingBar)
    CastingBarFrame:ShowTest()
end

function Module:HideEditorTest(refresh)
    ShowUIFrame(self.playerCastingBar)
    SaveUIFramePosition(self.playerCastingBar, 'playerCastingBar')
    CastingBarFrame:HideTest()

    if refresh then
        self:UpdateWidgets()
    end
end
