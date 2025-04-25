
local RUI = LibStub('AceAddon-3.0'):GetAddon('RetailUI')
local moduleName = 'OptionsFrame'
local Module = RUI:NewModule(moduleName, 'AceConsole-3.0', 'AceHook-3.0', 'AceEvent-3.0')
-- Create a table to define the frames and their labels
local frames = {
    { name = "player", label = "Player Frame", scale = 1.0},
    { name = "target", label = "Target Frame" , scale = 1.0},
    { name = "focus", label = "Focus Frame", scale = 1.0},
    { name = "targetOfTarget", label = "Target of Target Frame", scale = 1.0},
    { name = "pet", label = "Pet Frame", scale = 1.0},
}

-- Create the main options panel frame
local ScaleOptionsPanel = CreateFrame("Frame", "ScaleOptionsPanel", UIParent)
ScaleOptionsPanel.name = "RetailUI Options" -- Name in Interface Options

-- Title for the options panel
local title = ScaleOptionsPanel:CreateFontString(nil, "ARTWORK", "GameFontNormalLarge")
title:SetPoint("TOPLEFT", 16, -16)
title:SetText("Frame Scale Options")



local function CreateSlider(parent, label, x, y, defaultValue, onChange)
    local slider = CreateFrame("Slider", nil, parent, "OptionsSliderTemplate")
    slider:SetSize(150, 20)
    slider:SetPoint("TOPLEFT", x, y)
    slider:SetMinMaxValues(0.2, 4.0) -- Set scale range from 0.5x to 3.0x
    slider:SetValueStep(0.1) -- Increment step
    slider:SetValue(defaultValue or 1.0) -- Default scale value

    -- Label for the slider
    local sliderLabel = parent:CreateFontString(nil, "ARTWORK", "GameFontNormal")
    sliderLabel:SetPoint("BOTTOM", slider, "TOP", 0, 0)
    sliderLabel:SetText(label)

    -- Current value display
    local valueLabel = parent:CreateFontString(nil, "ARTWORK", "GameFontHighlightSmall")
    valueLabel:SetPoint("TOP", slider, "BOTTOM", 0, -5)
    valueLabel:SetText(string.format("%.1f", slider:GetValue()))

    -- OnValueChanged handler
    slider:SetScript("OnValueChanged", function(self, value)
        value = math.floor(value * 10 + 0.5) / 10 -- Round to 1 decimal place
        valueLabel:SetText(string.format("%.1f", value)) -- Update display
        onChange(value)
    end)

    return slider
end

-- Add sliders for each frame
local offsetY = -60
for _, frame in ipairs(frames) do
    CreateSlider(ScaleOptionsPanel, frame.label, 16, offsetY, frame.scale, function(newScale)
        frame.scale = newScale
        SaveUIFrameScale(newScale,frame.name)
    end)
    offsetY = offsetY - 60
end

local btn = CreateFrame("Button", "editButton", ScaleOptionsPanel, "UIPanelButtonTemplate")
btn:SetPoint("TOPLEFT", 16, -350)
btn:SetText("Edit Position")
btn:SetSize(100,20)
btn:SetScript("OnClick", function()
    local EditorMode = RUI:GetModule('EditorMode')
    if EditorMode:IsShown() then
        EditorMode:Hide()
    else
        EditorMode:Show()
    end
end)

-- Register the panel with the Interface Options
InterfaceOptions_AddCategory(ScaleOptionsPanel)