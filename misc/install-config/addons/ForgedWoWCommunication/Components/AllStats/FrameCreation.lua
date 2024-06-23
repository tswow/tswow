local frameData = {}
frameStatHeaderNames = {"Base Stats", "Melee", "Ranged", "Spell", "Defenses"}
local lengths = {}
frameStatNames = { --
{"AllStatsFrameStat1", "AllStatsFrameStat2", "AllStatsFrameStat3", "AllStatsFrameStat4", "AllStatsFrameStat5"},
{"AllStatsFrameStatMeleeDamage", "AllStatsFrameStatMeleeSpeed", "AllStatsFrameStatMeleePower",
 "AllStatsFrameStatMeleeHit", "AllStatsFrameStatMeleeCrit", "AllStatsFrameStatMeleeExpert"},
{"AllStatsFrameStatRangeDamage", "AllStatsFrameStatRangeSpeed", "AllStatsFrameStatRangePower",
 "AllStatsFrameStatRangeHit", "AllStatsFrameStatRangeCrit"},
{"AllStatsFrameStatSpellDamage", "AllStatsFrameStatSpellHeal", "AllStatsFrameStatSpellHit",
 "AllStatsFrameStatSpellCrit", "AllStatsFrameStatSpellHaste", "AllStatsFrameStatSpellRegen"},
{"AllStatsFrameStatDefense", "AllStatsFrameStatArmor", "AllStatsFrameStatDodge", "AllStatsFrameStatParry",
 "AllStatsFrameStatBlock", "AllStatsFrameStatResil"}}

for i, v in pairs(customFrameStatNames) do
    table.insert(frameStatNames, v)
end
for i, v in pairs(customStatHeaderNames) do
    table.insert(frameStatHeaderNames, v)
end

local AllStatsFrame = CreateFrame("Frame", "AllStatsFrame", PaperDollFrame)
AllStatsFrame:SetToplevel(true)
AllStatsFrame:SetSize(140, CharacterFrame:GetHeight() - 100)
AllStatsFrame:SetPoint("TOPLEFT", PaperDollFrame, "TOPRIGHT", -35, -20)
AllStatsFrame:SetScript("OnLoad", function(self)
    AllStats_OnLoad();
end)
AllStatsFrame:SetScript("OnShow", function(self)
    PrintStats();
    CharacterAttributesFrame:Hide()
    CharacterModelFrame:SetHeight(300);
end)
AllStatsFrame:RegisterEvent("UNIT_AURA")
AllStatsFrame:RegisterEvent("UNIT_DAMAGE")
AllStatsFrame:RegisterEvent("PLAYER_DAMAGE_DONE_MODS")
AllStatsFrame:RegisterEvent("UNIT_ATTACK_SPEED")
AllStatsFrame:RegisterEvent("UNIT_RANGEDDAMAGE")
AllStatsFrame:RegisterEvent("UNIT_ATTACK")
AllStatsFrame:RegisterEvent("UNIT_STATS")
AllStatsFrame:RegisterEvent("UNIT_RANGED_ATTACK_POWER")
AllStatsFrame:RegisterEvent("UNIT_RESISTANCES")
AllStatsFrame:SetScript("OnEvent", function(self, event, ...)
    local unit = ...;
    if (unit == "player") then
        PrintStats();
    end
end)

--AllStatsFrame:Hide()

local AllStatsFrameBG = CreateFrame("Frame", "AllStatsFrameBG", AllStatsFrame)
AllStatsFrameBG:SetSize(AllStatsFrame:GetWidth(), AllStatsFrame:GetHeight() + 15)
AllStatsFrameBG:SetPoint("CENTER", AllStatsFrame, "CENTER")
AllStatsFrameBG:SetBackdrop({
    bgFile = "Interface/TutorialFrame/TutorialFrameBackground",
    edgeFile = "Interface/Tooltips/UI-Tooltip-Border",
    tile = true,
    edgeSize = 22,
    tileSize = 22,
    insets = {
        left = 4,
        right = 4,
        top = 4,
        bottom = 4
    }
})
AllStatsFrame.scrollframe = CreateFrame("ScrollFrame", "AllStatsScrollFrame", AllStatsFrame,
    "UIPanelScrollFrameTemplate");
AllStatsFrame.scrollchild = CreateFrame("Frame")
local scrollbarName = AllStatsFrame.scrollframe:GetName()

AllStatsFrame.scrollbar = _G[scrollbarName .. "ScrollBar"];
AllStatsFrame.scrollupbutton = _G[scrollbarName .. "ScrollBarScrollUpButton"];
AllStatsFrame.scrolldownbutton = _G[scrollbarName .. "ScrollBarScrollDownButton"];
AllStatsFrame.scrollupbutton:ClearAllPoints();
AllStatsFrame.scrollupbutton:SetPoint("TOPRIGHT", AllStatsFrame.scrollframe, "TOPRIGHT", -7, 0);
AllStatsFrame.scrolldownbutton:ClearAllPoints();
AllStatsFrame.scrolldownbutton:SetPoint("BOTTOMRIGHT", AllStatsFrame.scrollframe, "BOTTOMRIGHT", -7, 0);
AllStatsFrame.scrollbar:ClearAllPoints();
AllStatsFrame.scrollbar:SetPoint("TOP", AllStatsFrame.scrollupbutton, "BOTTOM", 0, 0);
AllStatsFrame.scrollbar:SetPoint("BOTTOM", AllStatsFrame.scrolldownbutton, "TOP", 0, 0);

AllStatsFrame.scrollframe:SetScrollChild(AllStatsFrame.scrollchild);
AllStatsFrame.scrollframe:SetAllPoints(AllStatsFrame);
AllStatsFrame.scrollchild:SetSize(1, 1);

AllStatsFrame.scrollFrameParent = CreateFrame("Frame", nil, AllStatsFrame.scrollchild);
AllStatsFrame.scrollFrameParent:SetAllPoints(AllStatsFrame.scrollchild);

function initializeFrameCreation()
    for i, v in pairs(frameStatNames) do
        lengths[i] = #v
    end

    for statGroup = 1, #frameStatNames do
        local prevFrame
        for i, frameName in ipairs(frameStatNames[statGroup]) do
            local frame = CreateFrame("Frame", frameName, AllStatsFrame.scrollFrameParent, "StatFrameTemplate")
            if i == 1 then
                local indexChange = 0
                local inCheck = statGroup
                while (inCheck > 1) do
                    inCheck = inCheck - 1
                    indexChange = indexChange + (15 * lengths[inCheck])

                end
                frame:SetPoint("TOPLEFT", AllStatsFrame.scrollFrameParent, 6, -15 - indexChange)
                local labelFontString = frame:CreateFontString(nil, "BACKGROUND", "GameFontHighlightSmall")
                labelFontString:SetText(frameStatHeaderNames[statGroup])
                labelFontString:SetPoint("BOTTOM", frame, "TOP", 0, 5)
                frameData[statGroup] = {}
                frameData[statGroup]["text"] = labelFontString
            else
                frame:SetPoint("TOPLEFT", prevFrame, "BOTTOMLEFT", 0, 1)
            end
            prevFrame = frame
            frameData[statGroup][i] = frame
        end
    end
end
