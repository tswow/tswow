--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'ActionBar'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')

Module.actionBars = {}
Module.repExpBar = nil
Module.bagsBar = nil
Module.microMenuBar = nil

local function verticalString(str)
    local _, len = str:gsub("[^\128-\193]", "")
    if (len == #str) then
        return str:gsub(".", "%1\n")
    else
        return str:gsub("([%z\1-\127\194-\244][\128-\191]*)", "%1\n")
    end
end

local MainMenuBarNineSlice = nil

local function CreateActionFrameBar(barID, buttonCount, buttonSize, gap, vertical, frameName)
    if buttonCount > 12 then
        assert(nil, "The Action Bar cannot contain more than 12 buttons")
    end

    local width, height

    if vertical then
        width = (buttonSize - 2)
        height = gap * (buttonCount - 1) + ((buttonSize - 2) * buttonCount)
    else
        width = gap * (buttonCount - 1) + ((buttonSize - 2) * buttonCount)
        height = (buttonSize - 2)
    end

    frameName = frameName or ('ActionBar' .. barID)

    local frameBar = CreateUIFrame(width, height, frameName)

    if vertical then
        frameBar.editorText:SetText(verticalString(frameBar.editorText:GetText()))
    end

    if barID == MAIN_ACTION_BAR_ID then
        local nineSliceFrame = CreateNineSliceFrame(width, height, {
            TOP = 'ActionMainBar-Top',
            BOTTOM = 'ActionMainBar-Bottom',
            TOPLEFT = 'ActionMainBar-TopLeft',
            TOPRIGHT = 'ActionMainBar-TopRight',
            BOTTOMRIGHT = 'ActionMainBar-BottomRight',
            BOTTOMLEFT = 'ActionMainBar-BottomLeft',
            LEFT = 'ActionMainBar-Left',
            RIGHT = 'ActionMainBar-Right'
        }, 0.5)
        nineSliceFrame:SetParent(MainMenuBar)
        nineSliceFrame:SetPoint("LEFT", frameBar, "LEFT", -1, 1)

        for index = 1, buttonCount - 1 do
            -- Up
            do
                local texture = nineSliceFrame:CreateTexture(nil, "BORDER")
                texture:SetPoint("TOPLEFT", 37 + (index - 1) * (buttonSize - 2) + (index - 1) * gap, 3)
                SetAtlasTexture(texture, 'ActionMainBar-GapUp')
                texture:SetSize(texture:GetWidth() * 0.5, texture:GetHeight() * 0.5)
            end

            -- Center
            do
                local texture = nineSliceFrame:CreateTexture(nil, "BORDER")
                texture:SetPoint("LEFT", 40 + (index - 1) * (buttonSize - 2) + (index - 1) * gap, 0)
                SetAtlasTexture(texture, 'ActionMainBar-GapCenter')
                texture:SetSize(texture:GetWidth() * 0.5, buttonSize * 0.75 - texture:GetHeight())
            end

            -- Down
            do
                local texture = nineSliceFrame:CreateTexture(nil, "BORDER")
                texture:SetPoint("BOTTOMLEFT", 37 + (index - 1) * (buttonSize - 2) + (index - 1) * gap, -3)
                SetAtlasTexture(texture, 'ActionMainBar-GapDown')
                texture:SetSize(texture:GetWidth() * 0.5, texture:GetHeight() * 0.5)
            end
        end

        MainMenuBarNineSlice = nineSliceFrame
    end

    frameBar.ID = barID
    frameBar.buttonSize = buttonSize
    frameBar.buttonCount = buttonCount
    frameBar.gap = gap
    frameBar.vertical = vertical

    return frameBar
end

MAIN_ACTION_BAR_ID = 1
BONUS_ACTION_BAR_ID = 6
SHAPESHIFT_ACTION_BAR_ID = 7
PET_ACTION_BAR_ID = 8
POSSESS_ACTION_BAR_ID = 9
VEHICLE_ACTION_BAR_ID = 10
MULTICAST_ACTION_BAR_ID = 11

local function ReplaceBlizzardActionBarFrame(frameBar)
    local blizzActionBars = {
        'ActionButton',
        'MultiBarBottomLeftButton',
        'MultiBarBottomRightButton',
        'MultiBarRightButton',
        'MultiBarLeftButton',
        'BonusActionButton',
        'ShapeshiftButton',
        'PetActionButton',
        'PossessButton',
        'VehicleMenuBarActionButton'
    }

    if frameBar.ID == MAIN_ACTION_BAR_ID then
        local faction = UnitFactionGroup('player')

        local leftEndCapTexture = MainMenuBarLeftEndCap
        leftEndCapTexture:ClearAllPoints()
        leftEndCapTexture:SetPoint("RIGHT", frameBar, "LEFT", 6, 4)
		leftEndCapTexture:Hide()
		
        local rightEndCapTexture = MainMenuBarRightEndCap
        rightEndCapTexture:ClearAllPoints()
        rightEndCapTexture:SetPoint("LEFT", frameBar, "RIGHT", -6, 4)
		rightEndCapTexture:Hide()
		
        SetAtlasTexture(leftEndCapTexture, 'ActionBar-LeftCap-' .. faction)
        leftEndCapTexture:SetSize(leftEndCapTexture:GetWidth() * 0.28, leftEndCapTexture:GetHeight() * 0.28)

        SetAtlasTexture(rightEndCapTexture, 'ActionBar-RightCap-' .. faction)
        rightEndCapTexture:SetSize(rightEndCapTexture:GetWidth() * 0.28, rightEndCapTexture:GetHeight() * 0.28)

        local pageNumberText = _G['MainMenuBarPageNumber']
        pageNumberText:SetPoint("CENTER", frameBar, "LEFT", -18, 0)
        pageNumberText:SetFontObject(GameFontNormal)

        local barUpButton = _G['ActionBarUpButton']
        barUpButton:SetPoint("CENTER", pageNumberText, "CENTER", 0, 15)

        local normalTexture = barUpButton:GetNormalTexture()
        normalTexture:SetPoint("TOPLEFT", 7, -6)
        normalTexture:SetPoint("BOTTOMRIGHT", -7, 6)
        SetAtlasTexture(normalTexture, 'ActionBar-ButtonUp-Normal')

        local pushedTexture = barUpButton:GetPushedTexture()
        pushedTexture:SetPoint("TOPLEFT", 7, -6)
        pushedTexture:SetPoint("BOTTOMRIGHT", -7, 6)
        SetAtlasTexture(pushedTexture, 'ActionBar-ButtonUp-Pushed')

        local highlightTexture = barUpButton:GetHighlightTexture()
        highlightTexture:SetPoint("TOPLEFT", 7, -6)
        highlightTexture:SetPoint("BOTTOMRIGHT", -7, 6)
        SetAtlasTexture(highlightTexture, 'ActionBar-ButtonUp-Highlight')

        local barDownButton = _G['ActionBarDownButton']
        barDownButton:SetPoint("CENTER", pageNumberText, "CENTER", 0, -15)

        normalTexture = barDownButton:GetNormalTexture()
        normalTexture:SetPoint("TOPLEFT", 7, -6)
        normalTexture:SetPoint("BOTTOMRIGHT", -7, 6)
        SetAtlasTexture(normalTexture, 'ActionBar-ButtonDown-Normal')

        pushedTexture = barDownButton:GetPushedTexture()
        pushedTexture:SetPoint("TOPLEFT", 7, -6)
        pushedTexture:SetPoint("BOTTOMRIGHT", -7, 6)
        SetAtlasTexture(pushedTexture, 'ActionBar-ButtonDown-Pushed')

        highlightTexture = barDownButton:GetHighlightTexture()
        highlightTexture:SetPoint("TOPLEFT", 7, -6)
        highlightTexture:SetPoint("BOTTOMRIGHT", -7, 6)
        SetAtlasTexture(highlightTexture, 'ActionBar-ButtonDown-Highlight')
    end

    for index = 1, frameBar.buttonCount do
        local button = _G[blizzActionBars[frameBar.ID] .. index]
        button:ClearAllPoints()

        if index > 1 then
            if frameBar.vertical then
                button:SetPoint("TOP", _G[blizzActionBars[frameBar.ID] .. index - 1], "BOTTOM", 0, -frameBar.gap)
            else
                button:SetPoint("LEFT", _G[blizzActionBars[frameBar.ID] .. index - 1], "RIGHT", frameBar.gap, 0)
            end
        else
            if frameBar.vertical then
                button:SetPoint("TOP", frameBar, "TOP", 0, 0)
            else
                button:SetPoint("LEFT", frameBar, "LEFT", 0, 0)
            end
        end

        button:SetSize(frameBar.buttonSize - 2, frameBar.buttonSize - 2)

        local normalTexture = button:GetNormalTexture()
        normalTexture:SetAllPoints(button)
        normalTexture:SetPoint("TOPLEFT", -2, 2)
        normalTexture:SetPoint("BOTTOMRIGHT", 2, -2)
        normalTexture:SetDrawLayer("BACKGROUND")
        normalTexture:SetAlpha(0)

        button.background = button.background or button:CreateTexture(nil, "BACKGROUND")
        local backgroundTexture = button.background
        backgroundTexture:SetAllPoints(button)
        backgroundTexture:SetPoint("TOPLEFT", -2, 2)
        backgroundTexture:SetPoint("BOTTOMRIGHT", 2, -2)
        SetAtlasTexture(backgroundTexture, 'ActionBar-ActionButton-Background')

        if frameBar.ID == MAIN_ACTION_BAR_ID or frameBar.ID == BONUS_ACTION_BAR_ID then
            backgroundTexture:Show()
        else
            backgroundTexture:Hide()
        end

        local highlightTexture = button:GetHighlightTexture()
        highlightTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
        highlightTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
        SetAtlasTexture(highlightTexture, 'ActionBar-ActionButton-Highlight')

        local pushedTexture = button:GetPushedTexture()
        pushedTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
        pushedTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
        SetAtlasTexture(pushedTexture, 'ActionBar-ActionButton-Pushed')

        local checkedTexture = button:GetCheckedTexture()
        checkedTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
        checkedTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
        SetAtlasTexture(checkedTexture, 'ActionBar-ActionButton-Highlight')

        local iconTexture = _G[button:GetName() .. "Icon"]
        iconTexture:SetPoint("TOPLEFT", button, "TOPLEFT", 1, -1)
        iconTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -3, 1)
        iconTexture:SetTexCoord(0.05, 0.95, 0.05, 0.95)
        iconTexture:SetDrawLayer('BORDER')

        local borderTexture = _G[button:GetName() .. "Border"]
        borderTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, -1)
        borderTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -1, 1)
        SetAtlasTexture(borderTexture, 'ActionBar-ActionButton-Pushed')
        borderTexture:SetDrawLayer("OVERLAY")

        local flashTexture = _G[button:GetName() .. "Flash"]
        flashTexture:SetAllPoints(button)
        SetAtlasTexture(flashTexture, 'ActionBar-ActionButton-Flash')

        local macroText = _G[button:GetName() .. "Name"]
        macroText:SetPoint("BOTTOM", 0, 5)

        local countText = _G[button:GetName() .. "Count"]
        countText:SetPoint("BOTTOMRIGHT", -4, 3)

        local hotKeyText = _G[button:GetName() .. "HotKey"]
        hotKeyText:SetPoint("TOPLEFT", 1, -3)

        local cooldown = _G[button:GetName() .. "Cooldown"]
        cooldown:SetPoint("TOPLEFT", button, "TOPLEFT", 0, -1)
        cooldown:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -2, 2)

        button.border = button.border or button:CreateTexture(nil, "ARTWORK")
        borderTexture = button.border
        borderTexture:SetAllPoints(button)
        borderTexture:SetPoint("TOPLEFT", -2, 2)
        borderTexture:SetPoint("BOTTOMRIGHT", 2, -2)
        SetAtlasTexture(borderTexture, 'ActionBar-ActionButton-Border')
    end
end

local function ReplaceBlizzardMultiSlotButton(button, frameBar)
    button:SetSize(frameBar.buttonSize - 2, frameBar.buttonSize - 2)

    for _, region in pairs { button:GetRegions() } do
        if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'OVERLAY' then
            region:Hide()
        end
    end

    button.border = button.border or button:CreateTexture(nil, "ARTWORK")
    local borderTexture = button.border
    borderTexture:SetAllPoints(button)
    borderTexture:SetPoint("TOPLEFT", -2, 2)
    borderTexture:SetPoint("BOTTOMRIGHT", 2, -2)
    SetAtlasTexture(borderTexture, 'ActionBar-ActionButton-Border')
end

local function ReplaceBlizzardMultiActionButton(button, frameBar)
    button:SetSize(frameBar.buttonSize - 2, frameBar.buttonSize - 2)

    for _, region in pairs { button:GetRegions() } do
        if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'OVERLAY' then
            region:Hide()
        end
    end

    local normalTexture = button:GetNormalTexture()
    normalTexture:SetAllPoints(button)
    normalTexture:SetPoint("TOPLEFT", -2, 2)
    normalTexture:SetPoint("BOTTOMRIGHT", 2, -2)
    normalTexture:SetDrawLayer("BACKGROUND")
    normalTexture:SetAlpha(0)

    local highlightTexture = button:GetHighlightTexture()
    highlightTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
    highlightTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
    SetAtlasTexture(highlightTexture, 'ActionBar-ActionButton-Highlight')

    local pushedTexture = button:GetPushedTexture()
    pushedTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
    pushedTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
    SetAtlasTexture(pushedTexture, 'ActionBar-ActionButton-Pushed')

    local checkedTexture = button:GetCheckedTexture()
    checkedTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
    checkedTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
    SetAtlasTexture(checkedTexture, 'ActionBar-ActionButton-Pushed')

    local iconTexture = _G[button:GetName() .. "Icon"]
    iconTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, -1)
    iconTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -1, 1)
    iconTexture:SetTexCoord(0.05, 0.95, 0.05, 0.95)
    iconTexture:SetDrawLayer('BACKGROUND')

    local borderTexture = _G[button:GetName() .. "Border"]
    borderTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, -1)
    borderTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -1, 1)
    SetAtlasTexture(borderTexture, 'ActionBar-ActionButton-Border')
    borderTexture:SetDrawLayer("OVERLAY")

    local flashTexture = _G[button:GetName() .. "Flash"]
    flashTexture:SetAllPoints(button)
    SetAtlasTexture(flashTexture, 'ActionBar-ActionButton-Flash')

    local macroText = _G[button:GetName() .. "Name"]
    macroText:SetPoint("BOTTOM", 0, 5)

    local countText = _G[button:GetName() .. "Count"]
    countText:SetPoint("BOTTOMRIGHT", -4, 3)

    local hotKeyText = _G[button:GetName() .. "HotKey"]
    hotKeyText:SetPoint("TOPLEFT", 1, -3)

    local cooldown = _G[button:GetName() .. "Cooldown"]
    cooldown:SetPoint("TOPLEFT", button, "TOPLEFT", 0, -1)
    cooldown:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -2, 2)

    button.border = button.border or button:CreateTexture(nil, "ARTWORK")
    borderTexture = button.border
    borderTexture:SetAllPoints(button)
    borderTexture:SetPoint("TOPLEFT", -2, 2)
    borderTexture:SetPoint("BOTTOMRIGHT", 2, -2)
    SetAtlasTexture(borderTexture, 'ActionBar-ActionButton-Border')
end

local function ReplaceBlizzardMultiActionBarFrame(frameBar)
    local button = MultiCastSummonSpellButton
    button:ClearAllPoints()
    button:SetPoint("LEFT", frameBar, "LEFT", 0, 0)

    ReplaceBlizzardMultiActionButton(button, frameBar)

    local flyoutOpenButton = MultiCastFlyoutFrameOpenButton
    flyoutOpenButton:SetSize(24, 13)
    flyoutOpenButton:SetHitRectInsets(0, 0, 0, 0)

    local normalTexture = flyoutOpenButton:GetNormalTexture()
    normalTexture:SetAllPoints(flyoutOpenButton)
    SetAtlasTexture(normalTexture, 'CollapseButton-Up')

    local highlightTexture = flyoutOpenButton:GetHighlightTexture()
    highlightTexture:SetAllPoints(flyoutOpenButton)
    SetAtlasTexture(highlightTexture, 'CollapseButton-Up')

    local flyoutCloseButton = MultiCastFlyoutFrameCloseButton
    flyoutCloseButton:SetSize(24, 13)
    flyoutCloseButton:SetHitRectInsets(0, 0, 0, 0)

    normalTexture = flyoutCloseButton:GetNormalTexture()
    normalTexture:SetAllPoints(flyoutCloseButton)
    SetAtlasTexture(normalTexture, 'CollapseButton-Down')

    highlightTexture = flyoutCloseButton:GetHighlightTexture()
    highlightTexture:SetAllPoints(flyoutCloseButton)
    SetAtlasTexture(highlightTexture, 'CollapseButton-Down')

    for index = 1, NUM_MULTI_CAST_BUTTONS_PER_PAGE do
        local button = _G['MultiCastSlotButton' .. index]
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint("LEFT", _G['MultiCastSlotButton' .. index - 1], "RIGHT", frameBar.gap, 0)
        else
            button:SetPoint("LEFT", MultiCastSummonSpellButton, "RIGHT", frameBar.gap, 0)
        end

        ReplaceBlizzardMultiSlotButton(button, frameBar)
    end

    for page = 1, NUM_MULTI_CAST_PAGES do
        for index = 1, NUM_MULTI_CAST_BUTTONS_PER_PAGE do
            local button = _G['MultiCastActionButton' .. (page - 1) * NUM_MULTI_CAST_BUTTONS_PER_PAGE + index]
            button:ClearAllPoints()

            if index > 1 then
                button:SetPoint("LEFT",
                    _G['MultiCastActionButton' .. (page - 1) * NUM_MULTI_CAST_BUTTONS_PER_PAGE + index - 1], "RIGHT",
                    frameBar.gap, 0)
            else
                button:SetPoint("LEFT", MultiCastSummonSpellButton, "RIGHT", frameBar.gap, 0)
            end

            ReplaceBlizzardMultiActionButton(button, frameBar)
        end
    end

    button = MultiCastRecallSpellButton
    button:ClearAllPoints()
    local activeSlots = MultiCastActionBarFrame.numActiveSlots
    if activeSlots > 0 then
        button:SetPoint("LEFT", _G['MultiCastActionButton' .. activeSlots], "RIGHT", frameBar.gap, 0)
    end

    ReplaceBlizzardMultiActionButton(button, frameBar)

    local flyoutFrame = MultiCastFlyoutFrame
    for _, region in pairs { flyoutFrame:GetRegions() } do
        if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'BACKGROUND' then
            region:Hide()
        end
    end
end

local function ReplaceBlizzardRepExpBarFrame(frameBar)
    local mainMenuExpBar = MainMenuExpBar
    mainMenuExpBar:ClearAllPoints()
    mainMenuExpBar:SetWidth(frameBar:GetWidth())

    for _, region in pairs { mainMenuExpBar:GetRegions() } do
        if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'BACKGROUND' then
            SetAtlasTexture(region, 'ExperienceBar-Background')
        end
    end

    local exhaustionLevelBar = ExhaustionLevelFillBar
    exhaustionLevelBar:SetHeight(frameBar:GetHeight())

    local borderTexture = MainMenuXPBarTexture0
    borderTexture:SetAllPoints(mainMenuExpBar)
    borderTexture:SetPoint("TOPLEFT", mainMenuExpBar, "TOPLEFT", -3, 3)
    borderTexture:SetPoint("BOTTOMRIGHT", mainMenuExpBar, "BOTTOMRIGHT", 3, -6)
    SetAtlasTexture(borderTexture, 'ExperienceBar-Border')

    local expText = MainMenuBarExpText
    expText:SetPoint("CENTER", mainMenuExpBar, "CENTER", 0, 2)

    local repWatchBar = ReputationWatchBar
    repWatchBar:ClearAllPoints()

    repWatchBar:SetWidth(frameBar:GetWidth())

    local repStatusBar = ReputationWatchStatusBar
    repStatusBar:SetAllPoints(repWatchBar)

    repStatusBar:SetWidth(repWatchBar:GetWidth())

    local backgroundTexture = _G[repStatusBar:GetName() .. "Background"]
    backgroundTexture:SetAllPoints(repStatusBar)
    SetAtlasTexture(backgroundTexture, 'ExperienceBar-Background')

    borderTexture = ReputationXPBarTexture0
    borderTexture:SetAllPoints(repStatusBar)
    borderTexture:SetPoint("TOPLEFT", repStatusBar, "TOPLEFT", -3, 2)
    borderTexture:SetPoint("BOTTOMRIGHT", repStatusBar, "BOTTOMRIGHT", 3, -7)
    SetAtlasTexture(borderTexture, 'ExperienceBar-Border')

    borderTexture = ReputationWatchBarTexture0
    borderTexture:SetAllPoints(repStatusBar)
    borderTexture:SetPoint("TOPLEFT", repStatusBar, "TOPLEFT", -3, 2)
    borderTexture:SetPoint("BOTTOMRIGHT", repStatusBar, "BOTTOMRIGHT", 3, -7)
    SetAtlasTexture(borderTexture, 'ExperienceBar-Border')
end

local function ReplaceBlizzardMicroMenuBarFrame(frameBar)
    local microMenu = {
        'Character',
        'Spellbook',
        'Talent',
        'Achievement',
        'QuestLog',
        'Socials',
        'PVP',
        'LFD',
        'MainMenu',
        'Help'
    }

    for index, element in pairs(microMenu) do
        local button = _G[element .. 'MicroButton']
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint("LEFT", _G[microMenu[index - 1] .. 'MicroButton'], "RIGHT", frameBar.gap, 0)
        else
            button:SetPoint("LEFT", frameBar, "LEFT", 0, 0)
        end

        button:SetSize(21, 29)
        button:SetHitRectInsets(0, 0, 0, 0)

        if element == 'Character' or element == 'PVP' then
            local normalTexture = button:GetNormalTexture()
            normalTexture:SetAllPoints(button)
            SetAtlasTexture(normalTexture, 'MicroMenu-Empty')

            local highlightTexture = button:GetHighlightTexture()
            highlightTexture:SetAllPoints(button)
            SetAtlasTexture(highlightTexture, 'MicroMenu-Empty')

            local pushedTexture = button:GetPushedTexture()
            pushedTexture:SetAllPoints(button)
            SetAtlasTexture(pushedTexture, 'MicroMenu-Empty')
        else
            local normalTexture = button:GetNormalTexture()
            normalTexture:SetAllPoints(button)
            SetAtlasTexture(normalTexture, 'MicroMenu-' .. element .. '-Normal')

            local highlightTexture = button:GetHighlightTexture()
            highlightTexture:SetAllPoints(button)
            SetAtlasTexture(highlightTexture, 'MicroMenu-' .. element .. '-Highlight')

            local pushedTexture = button:GetPushedTexture()
            pushedTexture:SetAllPoints(button)
            SetAtlasTexture(pushedTexture, 'MicroMenu-' .. element .. '-Pushed')

            if element == 'LFD' or element == 'Talent' or element == 'Achievement' then
                local disabledTexture = button:GetDisabledTexture()
                disabledTexture:SetAllPoints(button)
                SetAtlasTexture(disabledTexture, 'MicroMenu-' .. element .. '-Disabled')
            end
        end
    end

    local portraitTexture = MicroButtonPortrait
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint('CENTER', CharacterMicroButton, 'CENTER', 0, 0)
    portraitTexture:SetSize(15, 20)

    local pvpButtonTexture = _G['PVPMicroButton' .. "Texture"]
    pvpButtonTexture:SetAllPoints(PVPMicroButton)
    pvpButtonTexture:SetPoint('TOPLEFT', 1, -5)
    pvpButtonTexture:SetPoint('BOTTOMRIGHT', 9, -7)

    local helpButton = HelpMicroButton
    helpButton.performanceFrame = helpButton.performanceFrame or CreateFrame('Frame', nil, helpButton)
    local performanceFrame = helpButton.performanceFrame
    performanceFrame.updateInterval = 0
    performanceFrame.texture = performanceFrame.texture or performanceFrame:CreateTexture(nil, "OVERLAY")
    local performanceTexture = performanceFrame.texture
    performanceTexture:SetTexture('Interface\\MainMenuBar\\UI-MainMenuBar-PerformanceBar.blp')
    performanceTexture:SetPoint('TOP', HelpMicroButton, "BOTTOM", 4, -2)
    performanceTexture:SetSize(16, 5)

    performanceFrame:SetScript('OnUpdate', function(self, elapsed)
        local PERFORMANCEBAR_LOW_LATENCY = 300
        local PERFORMANCEBAR_MEDIUM_LATENCY = 600
        local PERFORMANCEBAR_UPDATE_INTERVAL = 10

        if self.updateInterval > 0 then
            self.updateInterval = self.updateInterval - elapsed
        else
            self.updateInterval = PERFORMANCEBAR_UPDATE_INTERVAL
            local bandwidthIn, bandwidthOut, latency = GetNetStats()
            if latency > PERFORMANCEBAR_MEDIUM_LATENCY then
                self.texture:SetVertexColor(1, 0, 0)
            elseif latency > PERFORMANCEBAR_LOW_LATENCY then
                self.texture:SetVertexColor(1, 1, 0)
            else
                self.texture:SetVertexColor(0, 1, 0)
            end
        end
    end)
end

local function ReplaceBlizzardBagsBarFrame(frameBar)
    local bagSlotButtons = {
        KeyRingButton,
        CharacterBag3Slot,
        CharacterBag2Slot,
        CharacterBag1Slot,
        CharacterBag0Slot
    }

    for index, button in pairs(bagSlotButtons) do
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint("LEFT", bagSlotButtons[index - 1], "RIGHT", frameBar.gap, 0)
        else
            button:SetPoint("LEFT", frameBar, "LEFT", 0, 0)
        end

        button:SetSize(32, 32)

        button:SetNormalTexture('')
        button:SetPushedTexture(nil)

        local highlightTexture = button:GetHighlightTexture()
        highlightTexture:SetAllPoints(button)
        SetAtlasTexture(highlightTexture, 'BagsBar-SlotButton-Highlight')

        local checkedTexture = button:GetCheckedTexture() or button:CreateTexture(nil, 'OVERLAY')
        checkedTexture:SetAllPoints(button)
        SetAtlasTexture(checkedTexture, 'BagsBar-SlotButton-Highlight')

        button:SetCheckedTexture(checkedTexture)

        local iconTexture = _G[button:GetName() .. 'IconTexture']
        if iconTexture then
            iconTexture:ClearAllPoints()
            iconTexture:SetPoint('TOPLEFT', 6, -5)
            iconTexture:SetPoint('BOTTOMRIGHT', -7, 7)
            iconTexture:SetTexCoord(.08, .92, .08, .92)
            iconTexture:SetDrawLayer('BACKGROUND')
        end

        button.border = button.border or button:CreateTexture(nil, "BORDER")
        local borderTexture = button.border
        borderTexture:SetAllPoints(button)

        if index == 1 then -- Keys
            SetAtlasTexture(borderTexture, 'BagsBar-KeySlot-Normal')
        else               -- Bags
            SetAtlasTexture(borderTexture, 'BagsBar-SlotButton-Border')

            local slotsText = _G[button:GetName() .. 'Count']
            slotsText:ClearAllPoints()
            slotsText:SetPoint("BOTTOM", 0, 2)
        end

        button:Hide()
    end

    frameBar.toggleButton = frameBar.toggleButton or CreateFrame('Button', nil, UIParent)
    local toggleButton = frameBar.toggleButton
    toggleButton.toggle = false
    toggleButton:SetPoint("LEFT", CharacterBag0Slot, "RIGHT", frameBar.gap, 1)
    toggleButton:SetSize(9, 17)
    toggleButton:SetHitRectInsets(0, 0, 0, 0)

    local normalTexture = toggleButton:GetNormalTexture() or toggleButton:CreateTexture(nil, "BORDER")
    normalTexture:SetAllPoints(toggleButton)
    SetAtlasTexture(normalTexture, 'CollapseButton-Left')

    toggleButton:SetNormalTexture(normalTexture)

    local highlightTexture = toggleButton:GetHighlightTexture() or toggleButton:CreateTexture(nil, "HIGHLIGHT")
    highlightTexture:SetAllPoints(toggleButton)
    SetAtlasTexture(highlightTexture, 'CollapseButton-Left')

    toggleButton:SetHighlightTexture(highlightTexture)

    toggleButton:SetScript("OnClick", function(self)
        if self.toggle then
            local normalTexture = self:GetNormalTexture()
            SetAtlasTexture(normalTexture, 'CollapseButton-Left')

            local highlightTexture = toggleButton:GetHighlightTexture()
            SetAtlasTexture(highlightTexture, 'CollapseButton-Left')

            for _, button in pairs(bagSlotButtons) do
                button:Hide()
            end
        else
            local normalTexture = self:GetNormalTexture()
            SetAtlasTexture(normalTexture, 'CollapseButton-Right')

            local highlightTexture = toggleButton:GetHighlightTexture()
            SetAtlasTexture(highlightTexture, 'CollapseButton-Right')

            for _, button in pairs(bagSlotButtons) do
                button:Show()
            end
        end

        self.toggle = not self.toggle
    end)

    local backpackButton = MainMenuBarBackpackButton
    backpackButton:ClearAllPoints()
    backpackButton:SetPoint("LEFT", toggleButton, "RIGHT", frameBar.gap, 0)
    backpackButton:SetSize(50, 50)

    backpackButton:SetNormalTexture(nil)
    backpackButton:SetPushedTexture(nil)

    highlightTexture = backpackButton:GetHighlightTexture()
    highlightTexture:SetAllPoints(backpackButton)
    SetAtlasTexture(highlightTexture, 'BagsBar-MainSlot-Highlight')

    local checkedTexture = backpackButton:GetCheckedTexture()
    checkedTexture:SetAllPoints(backpackButton)
    SetAtlasTexture(checkedTexture, 'BagsBar-MainSlot-Highlight')

    local iconTexture = _G[backpackButton:GetName() .. 'IconTexture']
    iconTexture:SetAllPoints(backpackButton)
    SetAtlasTexture(iconTexture, 'BagsBar-MainSlot-Normal')

    local backpackSlotsText = MainMenuBarBackpackButtonCount
    backpackSlotsText:ClearAllPoints()
    backpackSlotsText:SetPoint("BOTTOM", 0, 8)
end

local function RemoveBlizzardFrames()
    local blizzFrames = {
        MainMenuBarPerformanceBar,
        MainMenuBarTexture0,
        MainMenuBarTexture1,
        MainMenuBarTexture2,
        MainMenuBarTexture3,
        MainMenuBarMaxLevelBar,
        ReputationXPBarTexture1,
        ReputationXPBarTexture2,
        ReputationXPBarTexture3,
        ReputationWatchBarTexture1,
        ReputationWatchBarTexture2,
        ReputationWatchBarTexture3,
        MainMenuXPBarTexture1,
        MainMenuXPBarTexture2,
        MainMenuXPBarTexture3,
        SlidingActionBarTexture0,
        SlidingActionBarTexture1,
        BonusActionBarTexture0,
        BonusActionBarTexture1,
        ShapeshiftBarLeft,
        ShapeshiftBarMiddle,
        ShapeshiftBarRight,
        PossessBackground1,
        PossessBackground2
    }

    for _, frame in pairs(blizzFrames) do
        frame:SetAlpha(0)
    end

    MainMenuBar:EnableMouse(false)
    ShapeshiftBarFrame:EnableMouse(false)
    PossessBarFrame:EnableMouse(false)
    PetActionBarFrame:EnableMouse(false)
    MultiCastActionBarFrame:EnableMouse(false)
end

local function ShowBackgroundActionButton(button)
    local normalTexture = button:GetNormalTexture()
    normalTexture:SetAlpha(0)
end

local function ActionButton_UpdateHotkeys(self, actionButtonType)
    local id
    if not actionButtonType then
        actionButtonType = "ACTIONBUTTON"
        id = self:GetID()
    else
        if actionButtonType == "MULTICASTACTIONBUTTON" then
            id = self.buttonIndex
        else
            id = self:GetID()
        end
    end

    local hotKeyText = _G[self:GetName() .. "HotKey"]
    local key = GetBindingKey(actionButtonType .. id) or GetBindingKey("CLICK " .. self:GetName() .. ":LeftButton")

    local text = GetBindingText(key, "KEY_", 1)
    if text == "" then
        hotKeyText:SetText(RANGE_INDICATOR);
        hotKeyText:SetPoint("TOPLEFT", 1, -3)
        hotKeyText:Hide()
    else
        hotKeyText:SetText(text)
        hotKeyText:SetPoint("TOPLEFT", 1, -3)
        hotKeyText:Show()
    end
end

local function ActionButton_ShowGrid(button)
    ShowBackgroundActionButton(button)
    button:Show()
end

local function ActionButton_Update(button)
    ShowBackgroundActionButton(button)
end

local function ReputationWatchBar_Update()
    local factionInfo = GetWatchedFactionInfo()
    if factionInfo then
        local repWatchBar = ReputationWatchBar
        repWatchBar:ClearAllPoints()
        repWatchBar:SetHeight(Module.repExpBar:GetHeight())
        repWatchBar:SetPoint("LEFT", Module.repExpBar, "LEFT", 0, 0)
    end
end

local function MainMenuExpBar_Update()
    local mainMenuExpBar = MainMenuExpBar
    mainMenuExpBar:ClearAllPoints()
    mainMenuExpBar:SetWidth(Module.repExpBar:GetWidth())
    mainMenuExpBar:SetHeight(Module.repExpBar:GetHeight())
    mainMenuExpBar:SetPoint("LEFT", Module.repExpBar, "LEFT", 0, 0)

    local repWatchBar = ReputationWatchBar
    if repWatchBar:IsShown() then
        mainMenuExpBar:SetPoint("LEFT", repWatchBar, "LEFT", 0, -22)
    else
        mainMenuExpBar:SetPoint("LEFT", Module.repExpBar, "LEFT", 0, 0)
    end
end

local function ShapeshiftBar_Update()
    local button = _G['ShapeshiftButton' .. 1]
    button:ClearAllPoints()
    button:SetPoint("LEFT", Module.actionBars[SHAPESHIFT_ACTION_BAR_ID], "LEFT", 0)

    if GetNumShapeshiftForms() > 0 then
        button = _G['ShapeshiftButton' .. GetNumShapeshiftForms()]
        Module.actionBars[PET_ACTION_BAR_ID]:SetPoint("LEFT", button, "RIGHT", 10, 0)
    else
        Module.actionBars[PET_ACTION_BAR_ID]:SetPoint("LEFT", Module.actionBars[SHAPESHIFT_ACTION_BAR_ID], "LEFT", 0, 0)
    end

    Module.actionBars[POSSESS_ACTION_BAR_ID]:SetPoint("LEFT", Module.actionBars[SHAPESHIFT_ACTION_BAR_ID], "LEFT", 0, 0)
    Module.actionBars[MULTICAST_ACTION_BAR_ID]:SetPoint("LEFT", Module.actionBars[SHAPESHIFT_ACTION_BAR_ID], "LEFT", 0, 0)
end

local function MultiCastFlyoutFrameOpenButton_Show(self, type, parent)
    self:ClearAllPoints()
    self:SetPoint("BOTTOM", parent, "TOP", -1, 0)
    self:GetNormalTexture():SetTexCoord(31 / 64, 63 / 64, 10 / 64, 27 / 64)
end

local function MultiCastFlyoutFrame_ToggleFlyout(self, type, parent)
    local button = MultiCastFlyoutFrameCloseButton
    button:ClearAllPoints()
    button:SetPoint("BOTTOM", parent, "TOP", -1, 0)
    button:GetNormalTexture():SetTexCoord(31 / 64, 62 / 64, 37 / 64, 54 / 64)

    self:SetPoint("BOTTOM", parent, "TOP", 0, 15)
end

local function ReplaceBlizzardFlyoutButton(button, buttonSize, replaceUV)
    button:SetSize(buttonSize - 2, buttonSize - 2)

    local iconTexture = _G[button:GetName() .. "Icon"]
    iconTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, -1)
    iconTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -1, 1)
    if replaceUV then
        iconTexture:SetTexCoord(0.05, 0.95, 0.05, 0.95)
    end
    iconTexture:SetDrawLayer('BACKGROUND')

    local highlightTexture = button:GetHighlightTexture()
    highlightTexture:SetPoint("TOPLEFT", button, "TOPLEFT", -1, 1)
    highlightTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", 1, -1)
    SetAtlasTexture(highlightTexture, 'ActionBar-ActionButton-Highlight')

    button.border = button.border or button:CreateTexture(nil, "ARTWORK")
    local borderTexture = button.border
    borderTexture:SetAllPoints(button)
    borderTexture:SetPoint("TOPLEFT", -2, 2)
    borderTexture:SetPoint("BOTTOMRIGHT", 2, -2)
    SetAtlasTexture(borderTexture, 'ActionBar-ActionButton-Border')
end

local function MultiCastFlyoutFrame_LoadPageSpells(self)
    local buttons = self.buttons
    local numButtons = #buttons

    for index = 1, numButtons do
        local button = _G["MultiCastFlyoutButton" .. index]
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint("BOTTOM", _G["MultiCastFlyoutButton" .. index - 1], "TOP", 0, 6)
        else
            button:SetPoint("BOTTOM", self, "BOTTOM", 0, 0)
        end

        ReplaceBlizzardFlyoutButton(button, 28, true)
    end
end

local function MultiCastFlyoutFrame_LoadSlotSpells(self, slot, ...)
    local buttons = self.buttons
    local numButtons = #buttons

    for index = 1, numButtons do
        local button = _G["MultiCastFlyoutButton" .. index]
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint("BOTTOM", _G["MultiCastFlyoutButton" .. index - 1], "TOP", 0, 6)
        else
            button:SetPoint("BOTTOM", self, "BOTTOM", 0, 0)
        end

        ReplaceBlizzardFlyoutButton(button, 28, index ~= 1)
    end
end

local function MultiCastSummonSpellButton_Update(self)
    for index = 1, NUM_MULTI_CAST_BUTTONS_PER_PAGE do
        local button = _G['MultiCastSlotButton' .. index]
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint("LEFT", _G['MultiCastSlotButton' .. index - 1], "RIGHT",
                Module.actionBars[MULTICAST_ACTION_BAR_ID].gap, 0)
        else
            button:SetPoint("LEFT", MultiCastSummonSpellButton, "RIGHT", Module.actionBars[MULTICAST_ACTION_BAR_ID].gap,
                0)
        end
    end
end

local function MultiCastRecallSpellButton_Update(self)
    local activeSlots = MultiCastActionBarFrame.numActiveSlots
    if activeSlots > 0 then
        self:ClearAllPoints()
        self:SetPoint("LEFT", _G["MultiCastSlotButton" .. activeSlots], "RIGHT",
            Module.actionBars[MULTICAST_ACTION_BAR_ID].gap, 0)
    end
end

local function VehicleMenuBar_MoveMicroButtons(skinName)
    local microMenuButtons = {
        CharacterMicroButton,
        SpellbookMicroButton,
        TalentMicroButton,
        AchievementMicroButton,
        QuestLogMicroButton,
        SocialsMicroButton,
        PVPMicroButton,
        LFDMicroButton,
        MainMenuMicroButton,
        HelpMicroButton
    }

    if not skinName then
        for index, button in pairs(microMenuButtons) do
            button:ClearAllPoints()

            if index > 1 then
                button:SetPoint("LEFT", microMenuButtons[index - 1], "RIGHT", Module.microMenuBar.gap, 0)
            else
                button:SetPoint("LEFT", Module.microMenuBar, "LEFT", 0, 0)
            end
        end

        UpdateMicroButtons()
    elseif skinName == "Mechanical" then
        for _, frame in pairs(microMenuButtons) do
            frame:SetParent(VehicleMenuBarArtFrame)
            frame:Show();
        end
        CharacterMicroButton:ClearAllPoints()
        CharacterMicroButton:SetPoint("BOTTOMLEFT", VehicleMenuBar, "BOTTOMRIGHT", -340, 41)
        SocialsMicroButton:ClearAllPoints()
        SocialsMicroButton:SetPoint("TOPLEFT", CharacterMicroButton, "BOTTOMLEFT", 0, 20)

        UpdateMicroButtons()
    elseif skinName == "Natural" then
        for _, frame in pairs(microMenuButtons) do
            frame:SetParent(VehicleMenuBarArtFrame)
            frame:Show()
        end
        CharacterMicroButton:ClearAllPoints()
        CharacterMicroButton:SetPoint("BOTTOMLEFT", VehicleMenuBar, "BOTTOMRIGHT", -360, 41)
        SocialsMicroButton:ClearAllPoints()
        SocialsMicroButton:SetPoint("TOPLEFT", CharacterMicroButton, "BOTTOMLEFT", 0, -4)

        UpdateMicroButtons()
    end
end

local function MainMenuBar_ToVehicleArt()
    Module.bagsBar.toggleButton:Hide()
end

local function MainMenuBar_ToPlayerArt()
    Module.bagsBar.toggleButton:Show()
end

function Module:OnEnable()
    self:RegisterEvent("PLAYER_ENTERING_WORLD")
    self:RegisterEvent("PET_BAR_UPDATE")

    self:SecureHook('ActionButton_UpdateHotkeys', ActionButton_UpdateHotkeys)
    self:SecureHook('ActionButton_ShowGrid', ActionButton_ShowGrid)
    self:SecureHook('ActionButton_Update', ActionButton_Update)
    self:SecureHook('ReputationWatchBar_Update', ReputationWatchBar_Update)
    self:SecureHook('MainMenuExpBar_Update', MainMenuExpBar_Update)
    self:SecureHook('ShapeshiftBar_Update', ShapeshiftBar_Update)
    self:SecureHook('MultiCastFlyoutFrameOpenButton_Show', MultiCastFlyoutFrameOpenButton_Show)
    self:SecureHook('MultiCastFlyoutFrame_ToggleFlyout', MultiCastFlyoutFrame_ToggleFlyout)
    self:SecureHook('MultiCastFlyoutFrame_LoadPageSpells', MultiCastFlyoutFrame_LoadPageSpells)
    self:SecureHook('MultiCastFlyoutFrame_LoadSlotSpells', MultiCastFlyoutFrame_LoadSlotSpells)
    self:SecureHook('MultiCastSummonSpellButton_Update', MultiCastSummonSpellButton_Update)
    self:SecureHook('MultiCastRecallSpellButton_Update', MultiCastRecallSpellButton_Update)
    self:SecureHook('VehicleMenuBar_MoveMicroButtons', VehicleMenuBar_MoveMicroButtons)
    self:SecureHook('MainMenuBar_ToVehicleArt', MainMenuBar_ToVehicleArt)
    self:SecureHook('MainMenuBar_ToPlayerArt', MainMenuBar_ToPlayerArt)

    -- Main
    self.actionBars[MAIN_ACTION_BAR_ID] = CreateActionFrameBar(MAIN_ACTION_BAR_ID, 12, 42, 4, false)

    for index = 1, NUM_ACTIONBAR_BUTTONS do
        local button = _G['ActionButton' .. index]
        button:SetAttribute('showgrid', 1)
        ActionButton_ShowGrid(button)
    end

    -- RepExp
    self.repExpBar = CreateUIFrame(self.actionBars[MAIN_ACTION_BAR_ID]:GetWidth(), 10, "RepExpBar")

    -- Bottom Side
    for index = 2, 3 do
        self.actionBars[index] = CreateActionFrameBar(index, 12, 42, 4, false)
    end

    -- Right Side
    for index = 4, 5 do
        self.actionBars[index] = CreateActionFrameBar(index, 12, 42, 6, true)
    end

    -- Bonus
    self.actionBars[BONUS_ACTION_BAR_ID] = CreateActionFrameBar(BONUS_ACTION_BAR_ID, 12, 42, 4, false)

    for index = 1, NUM_ACTIONBAR_BUTTONS do
        local button = _G['BonusActionButton' .. index]
        button:SetAttribute('showgrid', 1)
        ActionButton_ShowGrid(button)
    end

    -- Stance (Shapeshift)
    self.actionBars[SHAPESHIFT_ACTION_BAR_ID] = CreateActionFrameBar(SHAPESHIFT_ACTION_BAR_ID, 10, 32, 4, false)

    -- Possess
    self.actionBars[POSSESS_ACTION_BAR_ID] = CreateActionFrameBar(POSSESS_ACTION_BAR_ID, 2, 32, 4, false)

    -- Pet
    self.actionBars[PET_ACTION_BAR_ID] = CreateActionFrameBar(PET_ACTION_BAR_ID, 10, 32, 4, false)

    -- Vehicle
    self.actionBars[VEHICLE_ACTION_BAR_ID] = CreateActionFrameBar(VEHICLE_ACTION_BAR_ID, 6, 60, 4, false)

    -- MultiCast
    self.actionBars[MULTICAST_ACTION_BAR_ID] = CreateActionFrameBar(MULTICAST_ACTION_BAR_ID, 6, 32, 6, false)

    -- Micro Menu
    self.microMenuBar = CreateActionFrameBar(nil, 10, 29, 2, false, 'MicroMenuBar')

    -- Bags
    self.bagsBar = CreateActionFrameBar(nil, 5, 50, 2, false, 'BagsBar')
end

function Module:OnDisable()
    self:UnregisterEvent("PLAYER_ENTERING_WORLD")
    self:UnregisterEvent("PET_BAR_UPDATE")

    self:Unhook('ActionButton_ShowGrid', ActionButton_ShowGrid)
    self:Unhook('ActionButton_Update', ActionButton_Update)
    self:Unhook('ReputationWatchBar_Update', ReputationWatchBar_Update)
    self:Unhook('MainMenuExpBar_Update', MainMenuExpBar_Update)
    self:Unhook('ShapeshiftBar_Update', ShapeshiftBar_Update)
    self:Unhook('MultiCastFlyoutFrameOpenButton_Show', MultiCastFlyoutFrameOpenButton_Show)
    self:Unhook('MultiCastFlyoutFrame_ToggleFlyout', MultiCastFlyoutFrame_ToggleFlyout)
    self:Unhook('MultiCastFlyoutFrame_LoadPageSpells', MultiCastFlyoutFrame_LoadPageSpells)
    self:Unhook('MultiCastFlyoutFrame_LoadSlotSpells', MultiCastFlyoutFrame_LoadSlotSpells)
    self:Unhook('MultiCastSummonSpellButton_Update', MultiCastSummonSpellButton_Update)
    self:Unhook('MultiCastRecallSpellButton_Update', MultiCastRecallSpellButton_Update)
    self:Unhook('VehicleMenuBar_MoveMicroButtons', VehicleMenuBar_MoveMicroButtons)
    self:Unhook('MainMenuBar_ToVehicleArt', MainMenuBar_ToVehicleArt)
    self:Unhook('MainMenuBar_ToPlayerArt', MainMenuBar_ToPlayerArt)
end

function Module:PLAYER_ENTERING_WORLD()
    RemoveBlizzardFrames()

    for _, actionBar in pairs(self.actionBars) do
        if actionBar.ID ~= PET_ACTION_BAR_ID and actionBar.ID ~= SHAPESHIFT_ACTION_BAR_ID and actionBar.ID ~= MULTICAST_ACTION_BAR_ID then
            ReplaceBlizzardActionBarFrame(actionBar)
        end
    end

    ReplaceBlizzardMultiActionBarFrame(self.actionBars[MULTICAST_ACTION_BAR_ID])
    ReplaceBlizzardRepExpBarFrame(self.repExpBar)
    ReplaceBlizzardMicroMenuBarFrame(self.microMenuBar)
    ReplaceBlizzardBagsBarFrame(self.bagsBar)

    local widgets = {
        'actionBar' .. 1,
        'actionBar' .. 2,
        'actionBar' .. 3,
        'actionBar' .. 4,
        'actionBar' .. 5,
        'actionBar' .. 6,
        'actionBar' .. 7,
        'actionBar' .. 8,
        'actionBar' .. 9,
        'actionBar' .. 10,
        'actionBar' .. 11,
        'bagsBar',
        'microMenuBar',
        'repExpBar'
    }

    CheckSettingsExists(Module, widgets)
end

local petBarInitialized = false

function Module:PET_BAR_UPDATE()
    if not petBarInitialized then
        ReplaceBlizzardActionBarFrame(self.actionBars[SHAPESHIFT_ACTION_BAR_ID])
        ReplaceBlizzardActionBarFrame(self.actionBars[PET_ACTION_BAR_ID])
    end

    petBarInitialized = true
end

function Module:LoadDefaultSettings()
    RUI.DB.profile.widgets.actionBar = {}

    for index = 1, 3 do
        RUI.DB.profile.widgets['actionBar' .. index] = {
            anchor = "BOTTOM",
            posX = 0,
            posY = 60 + 4 * (index - 1) +
                42 * (index - 1)
        }
    end

    for index = 4, 5 do
        RUI.DB.profile.widgets['actionBar' .. index] = {
            anchor = "RIGHT",
            posX = -4 * (index - 4) - 42 * (index - 4),
            posY = -60
        }
    end

    RUI.DB.profile.widgets['actionBar' .. SHAPESHIFT_ACTION_BAR_ID] = {
        anchor = "BOTTOM",
        posX = -94,
        posY = 200
    }

    RUI.DB.profile.widgets.microMenuBar = { anchor = "BOTTOMRIGHT", posX = 50, posY = 10 }
    RUI.DB.profile.widgets.bagsBar = { anchor = "BOTTOMRIGHT", posX = 13, posY = 45 }
    RUI.DB.profile.widgets.repExpBar = { anchor = "BOTTOM", posX = 0, posY = 35 }

    -- Static
    RUI.DB.profile.widgets['actionBar' .. PET_ACTION_BAR_ID] = {
        anchor = "CENTER",
        posX = 0,
        posY = 0
    }

    RUI.DB.profile.widgets['actionBar' .. BONUS_ACTION_BAR_ID] = {
        anchor = "CENTER",
        posX = 0,
        posY = 0
    }

    RUI.DB.profile.widgets['actionBar' .. POSSESS_ACTION_BAR_ID] = {
        anchor = "CENTER",
        posX = 0,
        posY = 0
    }

    RUI.DB.profile.widgets['actionBar' .. VEHICLE_ACTION_BAR_ID] = {
        anchor = "CENTER",
        posX = 0,
        posY = 0
    }

    RUI.DB.profile.widgets['actionBar' .. MULTICAST_ACTION_BAR_ID] = {
        anchor = "CENTER",
        posX = 0,
        posY = 0
    }
end

function Module:UpdateWidgets()
    for index, actionBar in pairs(self.actionBars) do
        local widgetOptions = RUI.DB.profile.widgets['actionBar' .. index]
        actionBar:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
    end

    local widgetOptions = RUI.DB.profile.widgets.microMenuBar
    self.microMenuBar:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)

    widgetOptions = RUI.DB.profile.widgets.bagsBar
    self.bagsBar:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)

    widgetOptions = RUI.DB.profile.widgets.repExpBar
    self.repExpBar:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)

    self.actionBars[BONUS_ACTION_BAR_ID]:SetPoint('LEFT', self.actionBars[MAIN_ACTION_BAR_ID], 'LEFT', 0, 0)

    self.actionBars[VEHICLE_ACTION_BAR_ID]:SetPoint('LEFT', VehicleMenuBarActionButtonFrame, 'LEFT', 0, 25)
end

function Module:ShowEditorTest()
    local hideMainActionBarFrames = {
        MainMenuBarNineSlice,
        MainMenuBarPageNumber,
        MainMenuBarLeftEndCap,
        MainMenuBarRightEndCap,
        ActionBarUpButton,
        ActionBarDownButton
    }

    HideUIFrame(self.actionBars[MAIN_ACTION_BAR_ID], hideMainActionBarFrames)

    for index, actionBar in pairs(self.actionBars) do
        if index ~= MAIN_ACTION_BAR_ID and index ~= BONUS_ACTION_BAR_ID and index ~= PET_ACTION_BAR_ID and index ~= POSSESS_ACTION_BAR_ID and
            index ~= MULTICAST_ACTION_BAR_ID and index ~= VEHICLE_ACTION_BAR_ID then
            HideUIFrame(actionBar)
        end
    end

    HideUIFrame(self.bagsBar)
    HideUIFrame(self.microMenuBar)
    HideUIFrame(self.repExpBar)
end

function Module:HideEditorTest(refresh)
    for index, actionBar in pairs(self.actionBars) do
        if index ~= BONUS_ACTION_BAR_ID and index ~= PET_ACTION_BAR_ID and index ~= POSSESS_ACTION_BAR_ID and index ~= MULTICAST_ACTION_BAR_ID and
            index ~= VEHICLE_ACTION_BAR_ID then
            ShowUIFrame(actionBar)
            SaveUIFramePosition(actionBar, 'actionBar' .. index)
        end
    end

    ShowUIFrame(self.bagsBar)
    SaveUIFramePosition(self.bagsBar, 'bagsBar')

    ShowUIFrame(self.microMenuBar)
    SaveUIFramePosition(self.microMenuBar, 'microMenuBar')

    ShowUIFrame(self.repExpBar)
    SaveUIFramePosition(self.repExpBar, 'repExpBar')

    if refresh then
        self:UpdateWidgets()
    end
end
