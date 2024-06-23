local mana = {R = 0, G = 0, B = 255}
local rage = {R = 255, G = 0, B = 0}
local focus = {R = 255, G = 128, B = 64}
local energy = {R = 255, G = 255, B = 0}
local comboPoints = {R = 255, G = 245, B = 105}
local runes = {R = 128, G = 128, B = 128}
local runicPower = {R = 0, G = 209, B = 255}
local soulShards = {R = 128, G = 82, B = 105}
local lunarPower = {R = 77, G = 133, B = 230}
local holyPower = {R = 242, G = 230, B = 153}
local maelstrom = {R = 0, G = 128, B = 255}
local insanity = {R = 102, G = 0, B = 204}
local chi = {R = 181, G = 255, B = 235}
local arcaneCharges = {R = 26, G = 26, B = 250}
local fury = {R = 201, G = 66, B = 253}
local pain = {R = 255, G = 156, B = 0}
local ammoSlot = {R = 204, G = 153, B = 0}
local fuel = {R = 0, G = 140, B = 128}
local staggerLight = {R = 133, G = 255, B = 133}
local staggerMedium = {R = 255, G = 250, B = 184}
local staggerHeavy = {R = 255, G = 107, B = 107}

local PowerTypes = {
--[[Testing Only]]--
    DRUID = {
        ["ENERGY"] = {
            texture = "Interface\\AddOns\\ForgedWoWCommunication\\UI\\PowerType\\shamanmaelstrombarhorizontal",
            color = maelstrom,
            name = "Rage"
        },
    },
}


local alternateManaBarAdjusted = false
local originalPlayerPortraitTexture


local function UpdatePlayerPortrait()
    local playerPortrait = _G["PlayerFrameTexture"]
     
    if not originalPlayerPortraitTexture then
        originalPlayerPortraitTexture = {playerPortrait:GetTexCoord()}
    end

    if PlayerFrameAlternateManaBar and PlayerFrameAlternateManaBar:IsShown() then
        playerPortrait:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\PowerType\\ui-targetingframe2")
        playerPortrait:SetTexCoord(1.0, 0.09375, 0.0, 0.78125)
    else
        playerPortrait:SetTexture("Interface\\TargetingFrame\\UI-TargetingFrame")
        playerPortrait:SetTexCoord(1.0, 0.09375, 0.0, 0.78125)
    end
end
	
local function AbbreviateNumber(value)
    if value >= 1e6 then
        return string.format("%.1fM", value / 1e6):gsub("%.?0+([kM])$", "%1")
    elseif value >= 1e3 then
        return string.format("%.1fk", value / 1e3):gsub("%.?0+([kM])$", "%1")
    else
        return tostring(value)
    end
end

-- Supondo que PlayerFrameAlternateManaBarText seja o objeto de texto que você deseja modificar.
local function UpdateAlternateManaBarText()
    local value = PlayerFrameAlternateManaBar:GetValue()
    local max = select(2, PlayerFrameAlternateManaBar:GetMinMaxValues())
    local text = AbbreviateNumber(value) .. " / " .. AbbreviateNumber(max)
    PlayerFrameAlternateManaBar.TextString:SetText(text)
end

local function UpdatePowerBar(frame, unit, isAlternateBar)
    local _, class = UnitClass(unit)
    local powerType, powerToken = UnitPowerType(unit)

    if isAlternateBar and PowerTypes[class] and PowerTypes[class]["PlayerFrameAlternateManaBar"] then
        powerType = PowerTypes[class]["PlayerFrameAlternateManaBar"]
    else
        powerType = powerToken
    end

    local classConfig = PowerTypes[class]
    if classConfig and classConfig[powerType] then
        local config = classConfig[powerType]
        if config and frame then
            if config.texture and config.texture ~= "" then
                frame:SetStatusBarTexture(config.texture)
            end

            if config.color and config.color.R and config.color.G and config.color.B then
                frame:SetStatusBarColor(config.color.R / 255, config.color.G / 255, config.color.B / 255)
            end

            frame:SetScript("OnEnter", function(self)
                if config.name and config.name ~= "" then
                    GameTooltip:SetOwner(UIParent, "ANCHOR_BOTTOMRIGHT", -90, 120)
                    GameTooltip:SetText(config.name)
                    GameTooltip:Show()
                else
                    GameTooltip:Hide()
                end
            end)

            frame:SetScript("OnLeave", function()
                GameTooltip:Hide()
            end)
        end
    end
    
if not isAlternateBar and unit == "player" and PlayerFrameAlternateManaBar and not alternateManaBarAdjusted then
    local Width = PlayerFrameAlternateManaBar:GetWidth()
    local point, relativeTo, relativePoint, xOfs, yOfs = PlayerFrameAlternateManaBar:GetPoint()

    PlayerFrameAlternateManaBar:SetWidth(Width + 40)
    PlayerFrameAlternateManaBar:ClearAllPoints()
    PlayerFrameAlternateManaBar:SetPoint(point, relativeTo, relativePoint, xOfs - 6, yOfs)

    local borderTexture = _G["PlayerFrameAlternateManaBarBorder"]
    if borderTexture then
        borderTexture:Hide()
    end

    alternateManaBarAdjusted = true
end
end

	

local function UpdatePartyMemberFramePowerBar(frame, unit)
    local _, class = UnitClass(unit)
    local config = PowerTypes[class]

    if config and frame and frame:IsVisible() then
        local powerBar = _G[frame:GetName() .. "ManaBar"]
        if powerBar then
            UpdatePowerBar(powerBar, unit)
        end
    end
end

local function UpdateAllPartyMembers()
    for i = 1, 5 do
        UpdatePartyMemberFramePowerBar(_G["PartyMemberFrame" .. i], "party" .. i)
    end
end

local function OnUpdateHandler()
    local playerUnit = "player"
    local targetUnit = "target"
	local focusUnit = "focus"

    UpdatePowerBar(PlayerFrameManaBar, playerUnit)
    if TargetFrameManaBar then
        UpdatePowerBar(TargetFrameManaBar, targetUnit)
    end
	
	if 	FocusFrameManaBar then
	UpdatePowerBar(FocusFrameManaBar, focusUnit)
	end
	

    UpdateAllPartyMembers()
	UpdatePlayerPortrait()
	UpdateAlternateManaBarText()
end

local frame = CreateFrame("FRAME")
frame:SetScript("OnUpdate", OnUpdateHandler)

--[[Tooltips]]--
local function ModifyTooltipText(tooltip)
    local _, class = UnitClass("player")
    local classConfig = PowerTypes[class]
    if classConfig then
        for i = 1, tooltip:NumLines() do
            local line = _G[tooltip:GetName() .. "TextLeft" .. i]
            local text = line and line:GetText() or ""
            for powerType, config in pairs(classConfig) do
                if powerType ~= "PlayerFrameAlternateManaBar" then
                    local resourceName = _G[powerType] or powerType
                    text = text:gsub(resourceName, config.name)
                end
            end
            if line then
                line:SetText(text)
            end
        end
    end
end

local function HookTooltip(tooltip)
    tooltip:HookScript("OnTooltipSetSpell", function(self)
        ModifyTooltipText(self)
    end)
end


HookTooltip(GameTooltip)
HookTooltip(ItemRefTooltip)
