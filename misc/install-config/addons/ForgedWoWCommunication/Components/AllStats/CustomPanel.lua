local tertiaryStatLabel = {
    [17] = "Thorns",
    [18] = "Mastery",
    [19] = "Avoidance",
    [20] = "Speed",
    [21] = "Leech"
}

local tertiaryStatDescription = {
    [17] = "Applies damage of %d to any melee attackers.",
    [18] = "Increases Mastery value by %d%%",
    [19] = "Reduce damage from Area of Effect spells by %d%%.",
    [20] = "Increases movespeed by %d%%.",
    [21] = "Heals you for %d%% of damage dealt."
}

curTertiaryStatValue = {}
customStatHeaderNames = {"New Stats"}
customFrameStatNames = {{"AllStatsFrameStatThorns", "AllStatsFrameStatMastery", "AllStatsFrameStatAvoidance",
                         "AllStatsFrameStatSpeed", "AllStatsFrameStatLeech"}}

customStatToFunction = {}
function initializeCustomStatFunctions()
    customStatToFunction = {{AllStatsFrameStatThorns, SetTertiaryStat, 17},
                            {AllStatsFrameStatMastery, SetTertiaryStat, 18},
                            {AllStatsFrameStatAvoidance, SetTertiaryStat, 19},
                            {AllStatsFrameStatSpeed, SetTertiaryStat, 20}, {AllStatsFrameStatLeech, SetTertiaryStat, 21}}
end

function SetTertiaryStat(statFrame, statID)
    _G[statFrame:GetName() .. "Label"]:SetText(tertiaryStatLabel[statID])
    PaperDollFormatStat(tertiaryStatLabel[statID], 0, curTertiaryStatValue[statID], 0, statFrame,
        _G[statFrame:GetName() .. "StatText"]);
    statFrame.tooltip2 = format(tertiaryStatDescription[statID], curTertiaryStatValue[statID])
end

local f = CreateFrame("Frame")

f:RegisterEvent("PLAYER_ENTERING_WORLD")
f:RegisterEvent("PLAYER_EQUIPMENT_CHANGED")

local function iterateGear()
    curTertiaryStatValue = {
        [17] = 0,
        [18] = 0,
        [19] = 0,
        [20] = 0,
        [21] = 0
    }
    for i = 1, 18 do -- 23 if bags
        local link = GetInventoryItemLink("player", i)
        if link then
            local itemID = select(3, strfind(link, "item:(%d+)"))
            if (customItemStatTooltipData[itemID]) then
                for i, v in pairs(customItemStatTooltipData[itemID]) do
                    curTertiaryStatValue[v[1]] = curTertiaryStatValue[v[1]] + v[2]
                end
            end
        end
    end
    PrintStats()
end
f:SetScript("OnEvent", iterateGear)
