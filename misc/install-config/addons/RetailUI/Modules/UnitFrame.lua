--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'UnitFrame'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')

Module.playerFrame = nil
Module.targetFrame = nil
Module.targetOfTargetFrame = nil
Module.focusFrame = nil
Module.petFrame = nil
Module.bossFrames = {}

local function UpdateRune(button)
    --local rune = button:GetID()
    --local runeType = GetRuneType(rune)
	--print(runeType)
    --if runeType then
    --    local runeTexture = _G[button:GetName() .. "Rune"]
    --    if runeTexture then
    --       runeTexture:SetTexture('Interface\\AddOns\\RetailUI\\Textures\\PlayerFrame\\ClassOverlayDeathKnightRunes.BLP')
    --        if runeType == 1 then     -- Blood
    --            runeTexture:SetTexCoord(0 / 128, 34 / 128, 0 / 128, 34 / 128)
    --        elseif runeType == 2 then -- Unholy
    --            runeTexture:SetTexCoord(0 / 128, 34 / 128, 68 / 128, 102 / 128)
    --        elseif runeType == 3 then -- Frost
    --            runeTexture:SetTexCoord(34 / 128, 68 / 128, 0 / 128, 34 / 128)
    --        elseif runeType == 4 then -- Death
    --            runeTexture:SetTexCoord(68 / 128, 102 / 128, 0 / 128, 34 / 128)
    --        end
    --    end
    --end
end

local function UpdateGroupIndicator()
    local playerFrame = PlayerFrame
    local groupIndicatorFrame, groupText = _G[playerFrame:GetName() .. 'GroupIndicator'],
        _G[playerFrame:GetName() .. 'GroupIndicator' .. 'Text']
    groupIndicatorFrame:Hide()
    local name, rank, subgroup
    if GetNumRaidMembers() == 0 then
        groupIndicatorFrame:Hide()
        return
    end

    local numRaidMembers = GetNumRaidMembers()
    for i = 1, MAX_RAID_MEMBERS do
        if i <= numRaidMembers then
            name, rank, subgroup = GetRaidRosterInfo(i)
            -- Set the player's group number indicator
            if (name == UnitName("player")) then
                groupText:SetText(GROUP .. " " .. subgroup)
                local backgroundTexture = _G[playerFrame:GetName() .. 'GroupIndicator' .. 'Middle']
                groupIndicatorFrame:SetSize(backgroundTexture:GetWidth(), backgroundTexture:GetHeight())
                groupIndicatorFrame:Show()
            end
        end
    end
end

local function ReplaceBlizzardPlayerFrame(frame)
    local playerFrame = PlayerFrame
    playerFrame:ClearAllPoints()
    playerFrame:SetPoint("LEFT", frame, "LEFT", 0)
    playerFrame:SetSize(frame:GetWidth(), frame:GetHeight())
    playerFrame:SetHitRectInsets(0, 0, 0, 0)

    local portraitTexture = PlayerPortrait
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint("LEFT", 14, 10)
    portraitTexture:SetSize(56, 56)
    portraitTexture:SetDrawLayer('BACKGROUND')

    local borderTexture = _G[playerFrame:GetName() .. 'Texture']
    borderTexture:ClearAllPoints()
    borderTexture:SetPoint('BOTTOMLEFT', 0, 0)
    borderTexture:SetDrawLayer('BORDER')

    borderTexture = _G[playerFrame:GetName() .. 'VehicleTexture']
    borderTexture:ClearAllPoints()
    borderTexture:SetPoint('BOTTOMLEFT', 0, 0)
    borderTexture:SetDrawLayer('BORDER')

    local healthBar = _G[playerFrame:GetName() .. 'HealthBar']
    healthBar:SetFrameLevel(playerFrame:GetFrameLevel() + 2)
    healthBar:ClearAllPoints()
    healthBar:SetPoint("TOPLEFT", 72, -15)
    healthBar:SetSize(123, 20)

    local statusBarTexture = healthBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(healthBar)
    SetAtlasTexture(statusBarTexture, 'PlayerFrame-StatusBar-Health')

    local manaBar = _G[playerFrame:GetName() .. 'ManaBar']
    manaBar:SetFrameLevel(playerFrame:GetFrameLevel() + 2)
    manaBar:ClearAllPoints()
    manaBar:SetPoint("TOPLEFT", 72, -37)
    manaBar:SetSize(123, 9)

    statusBarTexture = manaBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(manaBar)
    SetAtlasTexture(statusBarTexture, 'PlayerFrame-StatusBar-Mana')
	
	local secondaryPowerBar = _G[playerFrame:GetName() .. 'SecondaryPowerBar']
    secondaryPowerBar:SetFrameLevel(playerFrame:GetFrameLevel() + 2)
    secondaryPowerBar:ClearAllPoints()
    secondaryPowerBar:SetPoint("TOPLEFT", 72, -50)
    secondaryPowerBar:SetSize(123, 9)
	statusBarTexture = secondaryPowerBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(secondaryPowerBar)
    SetAtlasTexture(statusBarTexture, 'PlayerFrame-StatusBar-Mana')

    local nameText = PlayerName
    nameText:SetDrawLayer('OVERLAY')
    nameText:SetJustifyH("LEFT")
    nameText:SetWidth(90)

    local levelText = PlayerLevelText
    levelText:ClearAllPoints()
    levelText:SetPoint("CENTER", 88, 27)
    levelText:SetDrawLayer('OVERLAY')

    local healthText = _G[playerFrame:GetName() .. 'HealthBarText']
    healthText:SetDrawLayer('OVERLAY')

    local manaText = _G[playerFrame:GetName() .. 'ManaBarText']
    manaText:SetDrawLayer('OVERLAY')
	
	local secondaryText = _G[playerFrame:GetName() .. 'SecondaryPowerBarText']
    secondaryText:SetDrawLayer('OVERLAY')

    local restIconTexture = PlayerRestIcon
    restIconTexture:ClearAllPoints()
    restIconTexture:SetPoint("TOPLEFT", 50, 23)
    restIconTexture:SetTexture("Interface\\AddOns\\RetailUI\\Textures\\PlayerFrame\\PlayerRestFlipbook.blp")
    restIconTexture:SetDrawLayer('ARTWORK')

    local attackTexture = PlayerAttackIcon
    attackTexture:ClearAllPoints()
    attackTexture:SetPoint("BOTTOMLEFT", 50, 17)
    SetAtlasTexture(attackTexture, 'PlayerFrame-AttackIcon')

    local statusTexture = PlayerStatusTexture
    statusTexture:ClearAllPoints()
    statusTexture:SetPoint("BOTTOMLEFT", 0, 0)
    statusTexture:SetDrawLayer("OVERLAY")

    local pvpTimerText = PlayerPVPTimerText
    pvpTimerText:ClearAllPoints()
    pvpTimerText:SetPoint("CENTER", playerFrame, "BOTTOMLEFT", 12, 5)

    local flashTexture = _G[playerFrame:GetName() .. 'Flash']
    flashTexture:ClearAllPoints()
    flashTexture:SetPoint("BOTTOMLEFT", 0, 0)
    flashTexture:SetDrawLayer("OVERLAY")

    local hitText = PlayerHitIndicator
    hitText:ClearAllPoints()
    hitText:SetJustifyH("CENTER")
    hitText:SetPoint("LEFT", 5, 7)
    hitText:SetWidth(75)

    local roleIconTexture = _G[playerFrame:GetName() .. "RoleIcon"]
    roleIconTexture:ClearAllPoints()
    roleIconTexture:SetPoint("BOTTOM", playerFrame, "TOP", 88, 0)

    local groupIndicatorFrame = _G[playerFrame:GetName() .. 'GroupIndicator']
    local backgroundTexture = _G[playerFrame:GetName() .. 'GroupIndicator' .. 'Middle']
    backgroundTexture:SetAllPoints(groupIndicatorFrame)
    SetAtlasTexture(backgroundTexture, 'PlayerFrame-GroupIndicator')
    backgroundTexture:SetVertexColor(1, 1, 1, 1)

    groupIndicatorFrame:SetSize(backgroundTexture:GetWidth(), backgroundTexture:GetHeight())

    local groupText = _G['PlayerFrameGroupIndicator' .. 'Text']
    groupText:ClearAllPoints()
    groupText:SetPoint("CENTER", groupIndicatorFrame, 0, 0)
    groupText:SetJustifyH("CENTER")
end

function SecondaryPowerBar_UpdateVisibility(s)
	local self = _G[PlayerFrame:GetName() .. 'SecondaryPowerBar']
	local statusBarText = _G[self:GetName().."Text"];
	local _, class = UnitClass("player");
	local shapeshift = GetShapeshiftFormID();

	if ( class == "DRUID" ) then
		if ( (shapeshift == 1) or (shapeshift == 5) ) then
			self:Show();
			--statusBarText:Show();
		else
			self:Hide();
			--statusBarText:Hide();
		end
	end
end

local function ReplaceBlizzardRuneFrame()
    for index = 1, 6 do
        local button = _G['RuneButtonIndividual' .. index]
        button:ClearAllPoints()

        if index > 1 then
            button:SetPoint('LEFT', _G['RuneButtonIndividual' .. index - 1], 'RIGHT', 4, 0)
        else
            button:SetPoint('CENTER', PlayerFrame, 'BOTTOM', -20, 0)
        end

        UpdateRune(button)
    end
end

local function ReplaceBlizzardTotemFrame()
    for index = 1, MAX_TOTEMS do
        local button = _G['TotemFrameTotem' .. index]
        button:ClearAllPoints()
        button:SetSize(32, 32)

        local backgroundTexture = _G[button:GetName() .. "Background"]
        backgroundTexture:SetAllPoints(button)

        for _, children in pairs { button:GetChildren() } do
            for _, region in pairs { children:GetRegions() } do
                if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'OVERLAY' then
                    region:SetAllPoints(button)
                end
            end
        end

        local iconTexture = _G[button:GetName() .. "IconTexture"]
        iconTexture:SetPoint("TOPLEFT", button, "TOPLEFT", 7, -7)
        iconTexture:SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -7, 7)
        iconTexture:SetTexCoord(0.05, 0.95, 0.05, 0.95)
        iconTexture:SetDrawLayer('BACKGROUND')

        if index > 1 then
            button:SetPoint('LEFT', _G['TotemFrameTotem' .. index - 1], 'RIGHT', 2, 0)
        else
            button:SetPoint('CENTER', PlayerFrame, 'BOTTOM', -15, -4)
        end
    end
end

local function ReplaceBlizzardComboFrame()
    for index = 1, MAX_COMBO_POINTS do
		_G['NewComboPoint' .. index]:SetPoint('CENTER', -15, -15)
		_G['NewComboPoint' .. index .. "BG"]:SetPoint('CENTER', -15, -15)
		_G['NewComboPoint' .. index .. "Highlight"]:SetPoint('CENTER', -15, -15)
    end
end

local function ReplaceBlizzardTargetFrame(frame, target, isBoss)
    isBoss = isBoss or false

    local targetFrame = target
    targetFrame:ClearAllPoints()
    targetFrame:SetPoint("LEFT", frame, "LEFT", 0)
    targetFrame:SetSize(frame:GetWidth(), frame:GetHeight())
    targetFrame:SetHitRectInsets(0, 0, 0, 0)

    local borderTexture = _G[targetFrame:GetName() .. 'TextureFrame' .. 'Texture']
    borderTexture:ClearAllPoints()
    borderTexture:SetPoint("BOTTOMLEFT", 0, 0)
    if not isBoss then
        SetAtlasTexture(borderTexture, 'TargetFrame-TextureFrame-Normal')
    else
        SetAtlasTexture(borderTexture, 'TargetFrame-TextureFrame-RareElite')
    end
    borderTexture:SetDrawLayer('BORDER')

    local portraitTexture = _G[targetFrame:GetName() .. 'Portrait']
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint("RIGHT", -5, 8)
    portraitTexture:SetSize(56, 56)
    portraitTexture:SetDrawLayer('BACKGROUND')

    local backgroundTexture = _G[targetFrame:GetName() .. 'NameBackground']
    backgroundTexture:ClearAllPoints()
    backgroundTexture:SetPoint('TOPLEFT', 4, -2)
    backgroundTexture:SetPoint('BOTTOMRIGHT', -56, 44)
    backgroundTexture:SetTexture("Interface\\AddOns\\RetailUI\\Textures\\TargetFrame\\NameBackground.blp")
    backgroundTexture:SetTexCoord(0.05, 0.95, 0.05, 0.95)
    backgroundTexture:SetDrawLayer("BORDER")
    backgroundTexture:SetBlendMode('ADD')

    local healthBar = _G[targetFrame:GetName() .. 'HealthBar']
    healthBar:SetFrameLevel(targetFrame:GetFrameLevel() + 1)
    healthBar:ClearAllPoints()
    healthBar:SetPoint("TOPLEFT", 5, -15)
    healthBar:SetSize(124, 20)

    local statusBarTexture = healthBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(healthBar)
    SetAtlasTexture(statusBarTexture, 'TargetFrame-StatusBar-Health')

    local manaBar = _G[targetFrame:GetName() .. 'ManaBar']
    manaBar:SetFrameLevel(targetFrame:GetFrameLevel() + 1)
    manaBar:ClearAllPoints()
    manaBar:SetPoint("TOPLEFT", 4, -37)
    manaBar:SetSize(132, 10)

    statusBarTexture = manaBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(manaBar)
    SetAtlasTexture(statusBarTexture, 'TargetFrame-StatusBar-Mana')

    local nameText = _G[targetFrame:GetName() .. 'TextureFrame' .. 'Name']
    nameText:ClearAllPoints()
    nameText:SetPoint("CENTER", -20, 27)
    nameText:SetDrawLayer("OVERLAY")
    nameText:SetJustifyH("LEFT")
    nameText:SetWidth(80)

    local levelText = _G[targetFrame:GetName() .. 'TextureFrame' .. 'LevelText']
    levelText:ClearAllPoints()
    levelText:SetPoint("CENTER", -80, 27)
    levelText:SetJustifyH("LEFT")
    levelText:SetDrawLayer("OVERLAY")

    local highLevelTexture = _G[targetFrame:GetName() .. 'TextureFrame' .. 'HighLevelTexture']
    highLevelTexture:ClearAllPoints()
    highLevelTexture:SetPoint('CENTER', levelText, "CENTER", 0, 0)
    SetAtlasTexture(highLevelTexture, 'TargetFrame-HighLevelIcon')

    local healthText = _G[targetFrame:GetName() .. 'TextureFrame' .. 'HealthBarText']
    healthText:ClearAllPoints()
    healthText:SetPoint("CENTER", -25, 8)
    healthText:SetDrawLayer("OVERLAY")

    local deathText = _G[targetFrame:GetName() .. 'TextureFrame' .. 'DeadText']
    deathText:ClearAllPoints()
    deathText:SetPoint("CENTER", -25, 8)
    deathText:SetDrawLayer("OVERLAY")

    local manaText = _G[targetFrame:GetName() .. 'TextureFrame' .. 'ManaBarText']
    manaText:ClearAllPoints()
    manaText:SetPoint("CENTER", -25, -8)
    manaText:SetDrawLayer("OVERLAY")

    local pvpIconTexture = _G[targetFrame:GetName() .. 'TextureFrame' .. 'PVPIcon']
    pvpIconTexture:ClearAllPoints()
    pvpIconTexture:SetPoint('CENTER', targetFrame, "BOTTOMRIGHT", 6, 14)

    local leaderIconTexture = _G[targetFrame:GetName() .. 'TextureFrame' .. 'LeaderIcon']
    leaderIconTexture:ClearAllPoints()
    leaderIconTexture:SetPoint('BOTTOM', targetFrame, "TOP", 26, -3)

    local flashTexture = _G[targetFrame:GetName() .. 'Flash']
    flashTexture:SetDrawLayer("OVERLAY")

    local raidTargetIconTexture = _G['TargetFrame' .. 'TextureFrame' .. 'RaidTargetIcon']
    raidTargetIconTexture:ClearAllPoints()
    raidTargetIconTexture:SetPoint("TOPRIGHT", -20, 18)

    local numericalThreatFrame = _G[targetFrame:GetName() .. 'NumericalThreat']
    numericalThreatFrame:ClearAllPoints()
    numericalThreatFrame:SetPoint("BOTTOM", targetFrame, "TOP", -22, -2)

    for _, region in pairs { numericalThreatFrame:GetRegions() } do
        if region:GetObjectType() == 'Texture' and region:GetDrawLayer() == 'ARTWORK' then
            region:SetAllPoints(numericalThreatFrame)
            SetAtlasTexture(region, 'PlayerFrame-GroupIndicator')
            region:SetVertexColor(1, 1, 1, 1)
        end
    end

    targetFrame.ShowTest = function(self)
        local portraitTexture = _G[self:GetName() .. 'Portrait']
        SetPortraitTexture(portraitTexture, "player")

        local backgroundTexture = _G[self:GetName() .. 'NameBackground']
        backgroundTexture:SetVertexColor(UnitSelectionColor('player'))

        local deathText = _G[self:GetName() .. 'TextureFrame' .. 'DeadText']
        deathText:Hide()

        local highLevelTexture = _G[self:GetName() .. 'TextureFrame' .. 'HighLevelTexture']
        highLevelTexture:Hide()

        local nameText = _G[self:GetName() .. 'TextureFrame' .. 'Name']
        nameText:SetText(UnitName("player"))

        local levelText = _G[self:GetName() .. 'TextureFrame' .. 'LevelText']
        levelText:SetText(UnitLevel("player"))
        levelText:Show()

        local healthText = _G[self:GetName() .. 'TextureFrame' .. 'HealthBarText']
        local curHealth = UnitHealth("player")
        healthText:SetText(curHealth .. "/" .. curHealth)

        local manaText = _G[self:GetName() .. 'TextureFrame' .. 'ManaBarText']
        local curMana = UnitPower("player", Mana)
        manaText:SetText(curMana .. "/" .. curMana)

        local healthBar = _G[self:GetName() .. 'HealthBar']
        healthBar:SetMinMaxValues(0, curHealth)
        healthBar:SetStatusBarColor(0.29, 0.69, 0.07)
        healthBar:SetValue(curHealth)
        healthBar:Show()

        local manaBar = _G[self:GetName() .. 'ManaBar']
        manaBar:SetMinMaxValues(0, curMana)
        manaBar:SetValue(curMana)
        manaBar:SetStatusBarColor(0.02, 0.32, 0.71)
        manaBar:Show()

        self:Show()
    end

    targetFrame.HideTest = function(self)
        self:Hide()
    end
end

local function ReplaceBlizzardPetFrame(frame)
    local petFrame = PetFrame
    petFrame:ClearAllPoints()
    petFrame:SetPoint("LEFT", frame, "LEFT", 0)
    petFrame:SetSize(frame:GetWidth(), frame:GetHeight())
    petFrame:SetHitRectInsets(0, 0, 0, 0)

    local portraitTexture = PetPortrait
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint("LEFT", 6, 0)
    portraitTexture:SetSize(34, 34)
    portraitTexture:SetDrawLayer('BACKGROUND')

    local borderTexture = _G[petFrame:GetName() .. 'Texture']
    borderTexture:ClearAllPoints()
    borderTexture:SetPoint("BOTTOMLEFT", 0, 0)
    borderTexture:SetDrawLayer('BORDER')

    local healthBar = _G[petFrame:GetName() .. 'HealthBar']
    healthBar:SetFrameLevel(petFrame:GetFrameLevel() + 2)
    healthBar:ClearAllPoints()
    healthBar:SetPoint("TOPLEFT", 43, -16)
    healthBar:SetSize(71, 9)

    local statusBarTexture = healthBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(healthBar)
    SetAtlasTexture(statusBarTexture, 'PartyFrame-StatusBar-Health')

    local manaBar = _G[petFrame:GetName() .. 'ManaBar']
    manaBar:SetFrameLevel(petFrame:GetFrameLevel() + 2)
    manaBar:ClearAllPoints()
    manaBar:SetPoint("TOPLEFT", 41, -27)
    manaBar:SetSize(73, 7)

    statusBarTexture = manaBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(manaBar)
    SetAtlasTexture(statusBarTexture, 'PartyFrame-StatusBar-Mana')

    local flashTexture = _G[petFrame:GetName() .. 'Flash']
    flashTexture:ClearAllPoints()
    flashTexture:SetPoint("BOTTOMLEFT", 0, 0)
    SetAtlasTexture(flashTexture, 'PartyFrame-Flash')
    flashTexture:SetDrawLayer("OVERLAY")

    local attackModeTexture = PetAttackModeTexture
    attackModeTexture:ClearAllPoints()
    attackModeTexture:SetPoint("BOTTOMLEFT", 0, 0)
    SetAtlasTexture(attackModeTexture, 'PartyFrame-Status')
    attackModeTexture:SetDrawLayer("OVERLAY")

    local nameText = PetName
    nameText:ClearAllPoints()
    nameText:SetPoint("CENTER", 16, 16)
    nameText:SetJustifyH("LEFT")
    nameText:SetDrawLayer("OVERLAY")
    nameText:SetWidth(65)

    local healthText = _G[petFrame:GetName() .. 'HealthBarText']
    healthText:ClearAllPoints()
    healthText:SetPoint("CENTER", 19, 4)
    healthText:SetDrawLayer("OVERLAY")

    local manaText = _G[petFrame:GetName() .. 'ManaBarText']
    manaText:ClearAllPoints()
    manaText:SetPoint("CENTER", 19, -7)
    manaText:SetDrawLayer("OVERLAY")

    local happinessTexture = _G[petFrame:GetName() .. 'Happiness']
    happinessTexture:ClearAllPoints()
    happinessTexture:SetPoint("LEFT", petFrame, "RIGHT", 1, -2)
end

local function ReplaceBlizzardTOTFrame(frame)
    local targetFrameToT = TargetFrameToT
    targetFrameToT:ClearAllPoints()
    targetFrameToT:SetPoint("LEFT", frame, "LEFT", 0)
    targetFrameToT:SetSize(frame:GetWidth(), frame:GetHeight())
    targetFrameToT:SetHitRectInsets(0, 0, 0, 0)

    local portraitTexture = _G[targetFrameToT:GetName() .. 'Portrait']
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint("LEFT", 4, 0)
    portraitTexture:SetSize(34, 34)
    portraitTexture:SetDrawLayer('BACKGROUND')

    local borderTexture = _G[targetFrameToT:GetName() .. 'TextureFrame' .. 'Texture']
    borderTexture:ClearAllPoints()
    borderTexture:SetPoint("BOTTOMLEFT", 0, 0)
    SetAtlasTexture(borderTexture, 'PartyFrame-TextureFrame-Normal')
    borderTexture:SetDrawLayer('BORDER')

    local healthBar = _G[targetFrameToT:GetName() .. 'HealthBar']
    healthBar:SetFrameLevel(targetFrameToT:GetFrameLevel() + 2)
    healthBar:ClearAllPoints()
    healthBar:SetPoint("TOPLEFT", 43, -16)
    healthBar:SetSize(71, 9)

    local statusBarTexture = healthBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(healthBar)
    SetAtlasTexture(statusBarTexture, 'PartyFrame-StatusBar-Health')

    local manaBar = _G[targetFrameToT:GetName() .. 'ManaBar']
    manaBar:SetFrameLevel(targetFrameToT:GetFrameLevel() + 2)
    manaBar:ClearAllPoints()
    manaBar:SetPoint("TOPLEFT", 41, -27)
    manaBar:SetSize(73, 7)

    statusBarTexture = manaBar:GetStatusBarTexture()
    statusBarTexture:SetAllPoints(manaBar)
    SetAtlasTexture(statusBarTexture, 'PartyFrame-StatusBar-Mana')

    local nameText = _G[targetFrameToT:GetName() .. 'TextureFrame' .. 'Name']
    nameText:ClearAllPoints()
    nameText:SetPoint("CENTER", 16, 16)
    nameText:SetJustifyH("LEFT")
    nameText:SetDrawLayer("OVERLAY")
    nameText:SetWidth(65)
end

local function RemoveBlizzardFrames()
    local blizzFrames = {
        PlayerFrameBackground,
        PlayerAttackBackground,
        TargetFrameBackground,
        Boss1TargetFrameBackground,
        Boss2TargetFrameBackground,
        Boss3TargetFrameBackground,
        Boss4TargetFrameBackground,
        TargetFrameNumericalThreatBG,
        TargetFrameToTBackground,
        FocusFrameBackground,
        PlayerFrameRoleIcon,
        PlayerGuideIcon,
        PlayerFrameGroupIndicatorLeft,
        PlayerFrameGroupIndicatorRight
    }

    for _, frame in pairs(blizzFrames) do
        frame:SetAlpha(0)
    end
end

local function PlayerFrame_OnUpdate(self, elapsed)
    local playerRestIcon = PlayerRestIcon
    AnimateTexCoords(playerRestIcon, 512, 512, 64, 64, 42, elapsed, 0.05)
end

local function PlayerFrame_UpdateStatus()
    PlayerStatusGlow:Hide()
end

local AURA_OFFSET_Y = 3
local AURA_START_X = 6
local AURA_START_Y = 16

local function TargetFrame_UpdateBuffAnchor(self, buffName, index, numDebuffs, anchorIndex, size, offsetX, offsetY)
    local buff = _G[buffName .. index]
    if index == 1 then
        if UnitIsFriend("player", self.unit) or numDebuffs == 0 then
            -- unit is friendly or there are no debuffs...buffs start on top
            buff:SetPoint("TOPLEFT", self, "BOTTOMLEFT", AURA_START_X, AURA_START_Y)
        else
            -- unit is not friendly and we have debuffs...buffs start on bottom
            buff:SetPoint("TOPLEFT", self.debuffs, "BOTTOMLEFT", 0, -offsetY)
        end
        self.buffs:SetPoint("TOPLEFT", buff, "TOPLEFT", 0, 0);
        self.buffs:SetPoint("BOTTOMLEFT", buff, "BOTTOMLEFT", 0, -AURA_OFFSET_Y)
        self.spellbarAnchor = buff
    elseif anchorIndex ~= index - 1 then
        -- anchor index is not the previous index...must be a new row
        buff:SetPoint("TOPLEFT", _G[buffName .. anchorIndex], "BOTTOMLEFT", 0, -offsetY)
        self.buffs:SetPoint("BOTTOMLEFT", buff, "BOTTOMLEFT", 0, -AURA_OFFSET_Y)
        self.spellbarAnchor = buff
    else
        -- anchor index is the previous index
        buff:SetPoint("TOPLEFT", _G[buffName .. anchorIndex], "TOPRIGHT", offsetX, 0)
    end

    -- Resize
    buff:SetWidth(size)
    buff:SetHeight(size)
end

local function TargetFrame_UpdateDebuffAnchor(self, debuffName, index, numBuffs, anchorIndex, size, offsetX, offsetY)
    local buff = _G[debuffName .. index]
    local isFriend = UnitIsFriend("player", self.unit)
    if index == 1 then
        if isFriend and numBuffs > 0 then
            -- unit is friendly and there are buffs...debuffs start on bottom
            buff:SetPoint("TOPLEFT", self.buffs, "BOTTOMLEFT", 0, -offsetY)
        else
            -- unit is not friendly or there are no buffs...debuffs start on top
            buff:SetPoint("TOPLEFT", self, "BOTTOMLEFT", AURA_START_X, AURA_START_Y)
        end
        self.debuffs:SetPoint("TOPLEFT", buff, "TOPLEFT", 0, 0)
        self.debuffs:SetPoint("BOTTOMLEFT", buff, "BOTTOMLEFT", 0, -AURA_OFFSET_Y)
        if isFriend or (not isFriend and numBuffs == 0) then
            self.spellbarAnchor = buff
        end
    elseif anchorIndex ~= index - 1 then
        -- anchor index is not the previous index...must be a new row
        buff:SetPoint("TOPLEFT", _G[debuffName .. anchorIndex], "BOTTOMLEFT", 0, -offsetY)
        self.debuffs:SetPoint("BOTTOMLEFT", buff, "BOTTOMLEFT", 0, -AURA_OFFSET_Y)
        if isFriend or (not isFriend and numBuffs == 0) then
            self.spellbarAnchor = buff
        end
    else
        -- anchor index is the previous index
        buff:SetPoint("TOPLEFT", _G[debuffName .. (index - 1)], "TOPRIGHT", offsetX, 0)
    end

    -- Resize
    buff:SetWidth(size)
    buff:SetHeight(size)
    local debuffFrame = _G[debuffName .. index .. "Border"]
    debuffFrame:SetWidth(size + 2)
    debuffFrame:SetHeight(size + 2)
end

local function TargetFrame_CheckClassification(self, forceNormalTexture)
    local healthBar = _G[self:GetName() .. 'HealthBar']
    healthBar:SetSize(124, 20)

    local manaBar = _G[self:GetName() .. 'ManaBar']
    manaBar:SetSize(132, 10)

    local nameText = _G[self:GetName() .. 'TextureFrame' .. 'Name']
    nameText:ClearAllPoints()
    nameText:SetPoint("CENTER", -20, 27)

    local levelText = _G[self:GetName() .. 'TextureFrame' .. 'LevelText']
    levelText:ClearAllPoints()
    levelText:SetPoint("CENTER", -80, 27)

    local pvpIconTexture = _G[self:GetName() .. 'TextureFrame' .. 'PVPIcon']
    pvpIconTexture:ClearAllPoints()
    pvpIconTexture:SetPoint('CENTER', self, "BOTTOMRIGHT", 6, 14)

    local classification = UnitClassification(self.unit)
    if classification == "worldboss" or classification == "elite" then
        SetAtlasTexture(self.borderTexture, 'TargetFrame-TextureFrame-Elite')
    elseif classification == "rareelite" then
        SetAtlasTexture(self.borderTexture, 'TargetFrame-TextureFrame-RareElite')
    elseif classification == "rare" then
        SetAtlasTexture(self.borderTexture, 'TargetFrame-TextureFrame-Rare')
    else
        local isVehicle = UnitVehicleSeatCount(self.unit) > 0
        if isVehicle then
            healthBar:SetSize(116, 20)
            manaBar:SetSize(123, 10)
            nameText:SetPoint("CENTER", -20, 26)
            levelText:SetPoint("CENTER", -80, 26)
            pvpIconTexture:SetPoint('CENTER', self, "BOTTOMRIGHT", 8, 10)

            SetAtlasTexture(self.borderTexture, 'TargetFrame-TextureFrame-Vehicle')
        else
            SetAtlasTexture(self.borderTexture, 'TargetFrame-TextureFrame-Normal')
        end
    end

    self.threatIndicator:ClearAllPoints()
    self.threatIndicator:SetPoint("BOTTOMLEFT", 0, 0)
    SetAtlasTexture(self.threatIndicator, 'TargetFrame-Status')
end

local function FocusFrame_SetSmallSize(smallSize, onChange)
    ReplaceBlizzardTargetFrame(Module.focusFrame, FocusFrame)
end

local healthBarClassColors = {
    ["Death Knight"] = { r = 0.77, g = 0.12, b = 0.23 },
    ["Druid"] = { r = 1, g = 0.49, b = 0.04 },
    ["Hunter"] = { r = 0.67, g = 0.83, b = 0.45 },
    ["Mage"] = { r = 0.25, g = 0.78, b = 0.92 },
    ["Paladin"] = { r = 0.96, g = 0.55, b = 0.73 },
    ["Priest"] = { r = 1, g = 1, b = 1 },
    ["Rogue"] = { r = 1, g = 0.96, b = 0.41 },
    ["Shaman"] = { r = 0, g = 0.44, b = 0.87 },
    ["Warlock"] = { r = 0.53, g = 0.53, b = 0.93 },
    ["Warrior"] = { r = 0.78, g = 0.61, b = 0.43 },
}

local function setHealthBarColor(statusBar)
    if statusBar.unit == "target" then
        local class = UnitClass("target")
        if healthBarClassColors[class] then
            statusBar:SetStatusBarColor(healthBarClassColors[class].r, healthBarClassColors[class].g, healthBarClassColors[class].b)
        else
            statusBar:SetStatusBarColor(0.48, 0.86, 0.15) -- if it's not a class put green color
        end
    else
        statusBar:SetStatusBarColor(0.48, 0.86, 0.15)
    end
end

local function UnitFrameHealthBar_Update(statusBar, unit)
    if not statusBar or statusBar.lockValues then
        return
    end

    if unit == statusBar.unit then
        statusBar.disconnected = not UnitIsConnected(unit)

        if statusBar.disconnected then
            if not statusBar.lockColor then
                statusBar:SetStatusBarColor(0.5, 0.5, 0.5)
            end
        else
            if not statusBar.lockColor then
                setHealthBarColor(statusBar)
            end
        end
    end
end

local powerBarColor = {
    ["MANA"] = { r = 0.02, g = 0.32, b = 0.71 },
    ["RAGE"] = { r = 1.00, g = 0.00, b = 0.00 },
    ["FOCUS"] = { r = 1.00, g = 0.50, b = 0.25 },
    ["ENERGY"] = { r = 1.00, g = 1.00, b = 0.00 },
    ["HAPPINESS"] = { r = 0.00, g = 1.00, b = 1.00 },
    ["RUNES"] = { r = 0.50, g = 0.50, b = 0.50 },
    ["RUNIC_POWER"] = { r = 0.00, g = 0.82, b = 1.00 },
    ["AMMOSLOT"] = { r = 0.80, g = 0.60, b = 0.00 },
    ["FUEL"] = { r = 0.0, g = 0.55, b = 0.5 }
}

powerBarColor[0] = PowerBarColor["MANA"]
powerBarColor[1] = PowerBarColor["RAGE"]
powerBarColor[2] = PowerBarColor["FOCUS"]
powerBarColor[3] = PowerBarColor["ENERGY"]
powerBarColor[4] = PowerBarColor["HAPPINESS"]
powerBarColor[5] = PowerBarColor["RUNES"]
powerBarColor[6] = PowerBarColor["RUNIC_POWER"]

local function UnitFrameManaBar_UpdateType(manaBar)
    if not manaBar then
        return
    end
    local powerType, powerToken, altR, altG, altB = UnitPowerType(manaBar.unit)
    local info = powerBarColor[powerToken]
    if info then
        if not manaBar.lockColor then
            manaBar:SetStatusBarColor(info.r, info.g, info.b);
        end
    else
        if not altR then
            info = powerBarColor[powerType] or powerBarColor["MANA"];
        else
            if not manaBar.lockColor then
                manaBar:SetStatusBarColor(altR, altG, altB);
            end
        end
    end
end

local function HealthBar_OnValueChanged(self, value)
    setHealthBarColor(self)
end

local function PetFrame_Update(self)
    SetAtlasTexture(PetFrameTexture, 'PartyFrame-TextureFrame-Normal')
end

local function PlayerFrame_UpdateGroupIndicator()
    UpdateGroupIndicator()
end

local function PlayerFrame_ToPlayerArt(self)
    local playerFrame = PlayerFrame

    local portraitTexture = PlayerPortrait
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint("LEFT", 14, 10)
    portraitTexture:SetSize(56, 56)

    local borderTexture = _G[playerFrame:GetName() .. 'Texture']
    SetAtlasTexture(borderTexture, 'PlayerFrame-TextureFrame-Normal')

    local healthBar = _G[playerFrame:GetName() .. 'HealthBar']
    healthBar:ClearAllPoints()
    healthBar:SetPoint("TOPLEFT", 72, -15)
    healthBar:SetSize(123, 20)

    local manaBar = _G[playerFrame:GetName() .. 'ManaBar']
    manaBar:ClearAllPoints()
    manaBar:SetPoint("TOPLEFT", 72, -37)
    manaBar:SetSize(123, 9)
	
	local secondaryPower = _G[playerFrame:GetName() .. 'SecondaryPowerBar']
    secondaryPower:ClearAllPoints()
    secondaryPower:SetPoint("TOPLEFT", 72, -50)
    secondaryPower:SetSize(123, 9)

    local nameText = PlayerName
    nameText:ClearAllPoints()
    nameText:SetPoint("CENTER", 25, 27)

    local healthText = _G[playerFrame:GetName() .. 'HealthBarText']
    healthText:ClearAllPoints()
    healthText:SetPoint("CENTER", 36, 8)

    local manaText = _G[playerFrame:GetName() .. 'ManaBarText']
    manaText:ClearAllPoints()
    manaText:SetPoint("CENTER", 36, -8)
	
	local secondaryText = _G[playerFrame:GetName() .. 'SecondaryPowerBarText']
    secondaryText:ClearAllPoints()
    secondaryText:SetPoint("CENTER", 36, -20)

    local statusTexture = PlayerStatusTexture
    SetAtlasTexture(statusTexture, 'PlayerFrame-Status')

    local leaderIconTexture = PlayerLeaderIcon
    leaderIconTexture:ClearAllPoints()
    leaderIconTexture:SetPoint('BOTTOM', playerFrame, "TOP", -15, -3)

    local masterIconTexture = PlayerMasterIcon
    masterIconTexture:ClearAllPoints()
    masterIconTexture:SetPoint('BOTTOM', playerFrame, "TOP", 2, -1)

    local flashTexture = PlayerFrameFlash
    SetAtlasTexture(flashTexture, 'PlayerFrame-Flash')

    local groupIndicatorFrame = PlayerFrameGroupIndicator
    groupIndicatorFrame:ClearAllPoints()
    groupIndicatorFrame:SetPoint("BOTTOMLEFT", playerFrame, "TOP", 20, -2)

    local pvpIconTexture = PlayerPVPIcon
    pvpIconTexture:ClearAllPoints()
    pvpIconTexture:SetPoint("CENTER", playerFrame, "BOTTOMLEFT", 22, 14)

    for index = 1, 6 do
        local button = _G['RuneButtonIndividual' .. index]
        button:Show()
    end

    UpdateGroupIndicator()
end

local function PlayerFrame_ToVehicleArt(self, vehicleType)
    local playerFrame = PlayerFrame

    local portraitTexture = PlayerPortrait
    portraitTexture:ClearAllPoints()
    portraitTexture:SetPoint("LEFT", 14, 10)
    portraitTexture:SetSize(62, 62)

    local borderTexture = _G[playerFrame:GetName() .. 'VehicleTexture']
    SetAtlasTexture(borderTexture, 'PlayerFrame-TextureFrame-Vehicle')

    local healthBar = _G[playerFrame:GetName() .. 'HealthBar']
    healthBar:ClearAllPoints()
    healthBar:SetPoint("TOPLEFT", 78, -15)
    healthBar:SetSize(117, 20)

    local manaBar = _G[playerFrame:GetName() .. 'ManaBar']
    manaBar:ClearAllPoints()
    manaBar:SetPoint("TOPLEFT", 78, -37)
    manaBar:SetSize(117, 9)
	
	local secondaryPowerBar = _G[playerFrame:GetName() .. 'SecondaryPowerBar']
    secondaryPowerBar:ClearAllPoints()
    secondaryPowerBar:SetPoint("TOPLEFT", 78, -50)
    secondaryPowerBar:SetSize(117, 9)

    local nameText = PlayerName
    nameText:ClearAllPoints()
    nameText:SetPoint("CENTER", 30, 26)

    local healthText = _G[playerFrame:GetName() .. 'HealthBarText']
    healthText:ClearAllPoints()
    healthText:SetPoint("CENTER", 40, 8)

    local manaText = _G[playerFrame:GetName() .. 'ManaBarText']
    manaText:ClearAllPoints()
    manaText:SetPoint("CENTER", 40, -8)
	
	local secondaryText = _G[playerFrame:GetName() .. 'SecondaryPowerBarText']
    secondaryText:ClearAllPoints()
    secondaryText:SetPoint("CENTER", 40, -20)

    local leaderIconTexture = PlayerLeaderIcon
    leaderIconTexture:ClearAllPoints()
    leaderIconTexture:SetPoint('BOTTOM', playerFrame, "TOP", -15, -3)

    local masterIconTexture = PlayerMasterIcon
    masterIconTexture:ClearAllPoints()
    masterIconTexture:SetPoint('BOTTOM', playerFrame, "TOP", 2, -1)

    local groupIndicatorFrame = _G[playerFrame:GetName() .. 'GroupIndicator']
    groupIndicatorFrame:ClearAllPoints()
    groupIndicatorFrame:SetPoint("BOTTOMLEFT", playerFrame, "TOP", 20, 0)

    local pvpIconTexture = PlayerPVPIcon
    pvpIconTexture:ClearAllPoints()
    pvpIconTexture:SetPoint("CENTER", playerFrame, "BOTTOMLEFT", 20, 10)

    for index = 1, 6 do
        local button = _G['RuneButtonIndividual' .. index]
        button:Hide()
    end
end

local function PlayerFrame_SequenceFinished(self)
    local playerFrame = PlayerFrame
    playerFrame:ClearAllPoints()
    playerFrame:SetPoint("LEFT", Module.playerFrame, "LEFT", 0)
end

local function PlayerFrame_AnimPos(self, fraction)
    local _, _, relativePoint, posX, posY = self:GetPoint('CENTER')
    return relativePoint, posX, posY + 1000
end

local PlayerFrameAnimTable = {
    totalTime = 0.0,
    updateFunc = "SetPoint",
    getPosFunc = PlayerFrame_AnimPos,
}

local function PlayerFrame_AnimateOut(self)
    SetUpAnimation(PlayerFrame, PlayerFrameAnimTable, PlayerFrame_AnimFinished, false)
end

local function PlayerFrame_UpdateArt(self)
    if self.animFinished and self.inSeat and self.inSequence then
        SetUpAnimation(PlayerFrame, PlayerFrameAnimTable, PlayerFrame_SequenceFinished, true)
        if UnitHasVehicleUI("player") then
            PlayerFrame_ToVehicleArt(self, UnitVehicleSkin("player"))
        else
            PlayerFrame_ToPlayerArt(self)
        end
    end
end

local function PlayerFrame_UpdateRolesAssigned()
    local iconTexture = _G[PlayerFrame:GetName() .. "RoleIcon"]
    local isTank, isHealer, isDamage = UnitGroupRolesAssigned("player")

    if isTank then
        SetAtlasTexture(iconTexture, 'LFGRole-Tank')
        iconTexture:SetSize(iconTexture:GetWidth() * 0.9, iconTexture:GetHeight() * 0.9)
        iconTexture:Show()
    elseif isHealer then
        SetAtlasTexture(iconTexture, 'LFGRole-Healer')
        iconTexture:SetSize(iconTexture:GetWidth() * 0.9, iconTexture:GetHeight() * 0.9)
        iconTexture:Show()
    elseif isDamage then
        SetAtlasTexture(iconTexture, 'LFGRole-Damage')
        iconTexture:SetSize(iconTexture:GetWidth() * 0.9, iconTexture:GetHeight() * 0.9)
        iconTexture:Show()
    else
        iconTexture:Hide()
    end
end

function Module:OnEnable()
    self:RegisterEvent("PLAYER_ENTERING_WORLD")
    self:RegisterEvent("RUNE_TYPE_UPDATE")

    PlayerFrame:HookScript('OnUpdate', PlayerFrame_OnUpdate)
    PlayerFrameHealthBar:HookScript('OnValueChanged', HealthBar_OnValueChanged)
    TargetFrameHealthBar:HookScript('OnValueChanged', HealthBar_OnValueChanged)
    FocusFrameHealthBar:HookScript('OnValueChanged', HealthBar_OnValueChanged)
    PetFrameHealthBar:HookScript('OnValueChanged', HealthBar_OnValueChanged)

    self:SecureHook('PlayerFrame_UpdateStatus', PlayerFrame_UpdateStatus)
    self:SecureHook('PlayerFrame_UpdateGroupIndicator', PlayerFrame_UpdateGroupIndicator)
    self:SecureHook('PlayerFrame_ToPlayerArt', PlayerFrame_ToPlayerArt)
    self:SecureHook('PlayerFrame_ToVehicleArt', PlayerFrame_ToVehicleArt)
    self:SecureHook('PlayerFrame_UpdateArt', PlayerFrame_UpdateArt)
    self:SecureHook('PlayerFrame_SequenceFinished', PlayerFrame_SequenceFinished)
    self:SecureHook('PlayerFrame_AnimateOut', PlayerFrame_AnimateOut)
    self:SecureHook('TargetFrame_UpdateBuffAnchor', TargetFrame_UpdateBuffAnchor)
    self:SecureHook('TargetFrame_UpdateDebuffAnchor', TargetFrame_UpdateDebuffAnchor)
    self:SecureHook('TargetFrame_CheckClassification', TargetFrame_CheckClassification)
    self:SecureHook('FocusFrame_SetSmallSize', FocusFrame_SetSmallSize)
    self:SecureHook('UnitFrameHealthBar_Update', UnitFrameHealthBar_Update)
    self:SecureHook('UnitFrameManaBar_UpdateType', UnitFrameManaBar_UpdateType)
    self:SecureHook('PetFrame_Update', PetFrame_Update)
    self:SecureHook('PlayerFrame_UpdateRolesAssigned', PlayerFrame_UpdateRolesAssigned)

    self.playerFrame = CreateUIFrame(192, 68, "PlayerFrame")
    self.targetFrame = CreateUIFrame(192, 68, "TargetFrame")
    self.focusFrame = CreateUIFrame(192, 68, "FocusFrame")
    self.petFrame = CreateUIFrame(120, 47, "PetFrame")
    self.targetOfTargetFrame = CreateUIFrame(120, 47, "TOTFrame")
    for index = 1, 4 do
        self.bossFrames[index] = CreateUIFrame(192, 68, "Boss" .. index .. "Frame")
    end
end

function Module:OnDisable()
    self:UnregisterEvent("PLAYER_ENTERING_WORLD")
    self:UnregisterEvent("RUNE_TYPE_UPDATE")

    PlayerFrame:Unhook('OnUpdate', PlayerFrame_OnUpdate)
    PlayerFrameHealthBar:Unhook('OnValueChanged', HealthBar_OnValueChanged)
    TargetFrameHealthBar:Unhook('OnValueChanged', HealthBar_OnValueChanged)
    FocusFrameHealthBar:Unhook('OnValueChanged', HealthBar_OnValueChanged)
    PetFrameHealthBar:Unhook('OnValueChanged', HealthBar_OnValueChanged)

    self:Unhook('PlayerFrame_UpdateStatus', PlayerFrame_UpdateStatus)
    self:Unhook('PlayerFrame_UpdateGroupIndicator', PlayerFrame_UpdateGroupIndicator)
    self:Unhook('PlayerFrame_ToPlayerArt', PlayerFrame_ToPlayerArt)
    self:Unhook('PlayerFrame_ToVehicleArt', PlayerFrame_ToVehicleArt)
    self:Unhook('PlayerFrame_UpdateArt', PlayerFrame_UpdateArt)
    self:Unhook('PlayerFrame_SequenceFinished', PlayerFrame_SequenceFinished)
    self:Unhook('PlayerFrame_AnimateOut', PlayerFrame_AnimateOut)
    self:Unhook('TargetFrame_UpdateBuffAnchor', TargetFrame_UpdateBuffAnchor)
    self:Unhook('TargetFrame_UpdateDebuffAnchor', TargetFrame_UpdateDebuffAnchor)
    self:Unhook('TargetFrame_CheckClassification', TargetFrame_CheckClassification)
    self:Unhook('FocusFrame_SetSmallSize', FocusFrame_SetSmallSize)
    self:Unhook('UnitFrameHealthBar_Update', UnitFrameHealthBar_Update)
    self:Unhook('UnitFrameManaBar_UpdateType', UnitFrameManaBar_UpdateType)
    self:Unhook('PetFrame_Update', PetFrame_Update)
    self:Unhook('PlayerFrame_UpdateRolesAssigned', PlayerFrame_UpdateRolesAssigned)
end

function Module:RUNE_TYPE_UPDATE(eventName, rune)
    UpdateRune(_G['RuneButtonIndividual' .. rune])
end

function Module:PLAYER_ENTERING_WORLD()
    RemoveBlizzardFrames()

    ReplaceBlizzardPlayerFrame(self.playerFrame)
    ReplaceBlizzardRuneFrame()
    ReplaceBlizzardTotemFrame()
    ReplaceBlizzardTargetFrame(self.targetFrame, TargetFrame)
    ReplaceBlizzardComboFrame()
    ReplaceBlizzardTargetFrame(self.focusFrame, FocusFrame)
    ReplaceBlizzardPetFrame(self.petFrame)
    ReplaceBlizzardTOTFrame(self.targetOfTargetFrame)

    UpdateGroupIndicator()

    for index, frame in pairs(self.bossFrames) do
        ReplaceBlizzardTargetFrame(frame, _G['Boss' .. index .. 'TargetFrame'], true)
    end

    local widgets = {
        'player',
        'target',
        'focus',
        'pet',
        'targetOfTarget',
        'boss' .. 1,
        'boss' .. 2,
        'boss' .. 3,
        'boss' .. 4
    }

    CheckSettingsExists(Module, widgets)
end

function Module:LoadDefaultSettings()
    RUI.DB.profile.widgets.player = { anchor = "TOPLEFT", posX = 5, posY = -20, scale = 1 }
    RUI.DB.profile.widgets.target = { anchor = "TOPLEFT", posX = 215, posY = -20, scale = 1 }
    RUI.DB.profile.widgets.focus = { anchor = "TOPLEFT", posX = 105, posY = -165, scale = 1 }
    RUI.DB.profile.widgets.pet = { anchor = "TOPLEFT", posX = 90, posY = -105, scale = 1 }
    RUI.DB.profile.widgets.targetOfTarget = { anchor = "TOPLEFT", posX = 370, posY = -80, scale = 1 }

    RUI.DB.profile.widgets['boss' .. 1] = { anchor = "TOPRIGHT", posX = -100, posY = -270 }
    for index = 2, 4 do
        RUI.DB.profile.widgets['boss' .. index] = { anchor = "RIGHT", posX = 0, posY = 0 }
    end
end

function Module:UpdateWidgets()
    local widgetOptions = RUI.DB.profile.widgets.player
    self.playerFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
    if widgetOptions.scale == nil then
        widgetOptions.scale = 1
    end
    PlayerFrame:SetScale(widgetOptions.scale)  -- self.playerFrame is not working, maybe due to object copying 

    widgetOptions = RUI.DB.profile.widgets.target
    if widgetOptions.scale == nil then
        widgetOptions.scale = 1
    end
    self.targetFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
    TargetFrame:SetScale(widgetOptions.scale)  -- self.targetFrame is not working, maybe due to object copying 

    widgetOptions = RUI.DB.profile.widgets.focus
    if widgetOptions.scale == nil then
        widgetOptions.scale = 1
    end
    self.focusFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
    FocusFrame:SetScale(widgetOptions.scale) -- self.focusFrame is not working, maybe due to object copying 

    widgetOptions = RUI.DB.profile.widgets.pet
    if widgetOptions.scale == nil then
        widgetOptions.scale = 1
    end
    self.petFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
    PetFrame:SetScale(widgetOptions.scale)  -- self.petFrame is not working, maybe due to object copying 

    widgetOptions = RUI.DB.profile.widgets.targetOfTarget
    if widgetOptions.scale == nil then
        widgetOptions.scale = 1
    end
    self.targetOfTargetFrame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
    TargetFrameToT:SetScale(widgetOptions.scale)  -- self.targetOfTargetFrame is not working, maybe due to object copying 

    for index, frame in pairs(self.bossFrames) do
        if index > 1 then
            frame:SetPoint("TOP", self.bossFrames[index - 1], "BOTTOM", 0, -2)
        else
            widgetOptions = RUI.DB.profile.widgets['boss' .. index]
            frame:SetPoint(widgetOptions.anchor, widgetOptions.posX, widgetOptions.posY)
        end
    end
end

function Module:ShowEditorTest()
    HideUIFrame(self.playerFrame)

    HideUIFrame(self.targetFrame)
    TargetFrame:ShowTest()

    HideUIFrame(self.focusFrame)
    FocusFrame:ShowTest()

    HideUIFrame(self.petFrame)

    HideUIFrame(self.targetOfTargetFrame)

    HideUIFrame(self.bossFrames[1])
    for index, _ in pairs(self.bossFrames) do
        _G['Boss' .. index .. 'TargetFrame']:ShowTest()
    end
end

function Module:HideEditorTest(refresh)
    ShowUIFrame(self.playerFrame)
    SaveUIFramePosition(self.playerFrame, 'player')

    ShowUIFrame(self.targetFrame)
    SaveUIFramePosition(self.targetFrame, 'target')
    TargetFrame:HideTest()

    ShowUIFrame(self.focusFrame)
    SaveUIFramePosition(self.focusFrame, 'focus')
    FocusFrame:HideTest()

    ShowUIFrame(self.petFrame)
    SaveUIFramePosition(self.petFrame, 'pet')

    ShowUIFrame(self.targetOfTargetFrame)
    SaveUIFramePosition(self.targetOfTargetFrame, 'targetOfTarget')

    ShowUIFrame(self.bossFrames[1])
    SaveUIFramePosition(self.bossFrames[1], 'boss' .. 1)
    for index, _ in pairs(self.bossFrames) do
        _G['Boss' .. index .. 'TargetFrame']:HideTest()
    end

    if refresh then
        self:UpdateWidgets()
    end
end