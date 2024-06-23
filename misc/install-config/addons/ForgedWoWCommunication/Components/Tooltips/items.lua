local subnameOptions = {
    [1] = "Heroic",
    [2] = "Mythic",
    [3] = "World Tier 1",
    [4] = "World Tier 2",
    [5] = "World Tier 3",
    [6] = "World Tier 4",
    [7] = "World Tier 5",
    [8] = "World Tier 6",
    [9] = "World Tier 7",
    [10] = "World Tier 8",
    [11] = "World Tier 9",
    [12] = "World Tier 10"
}

local statOptions = {
    [17] = "+%d Thorns",
    [18] = "+%d Mastery",
    [19] = "+%d Avoidance",
    [20] = "+%d Speed",
    [21] = "+%d Leech"
}

local headerTooltipInfo = {} -- itemID:headerOptionID
customItemStatTooltipData = {} -- itemID:{{statType1,statValue1},{statType2,statValue2},}
local tooltips = {GameTooltip, ItemRefTooltip, ShoppingTooltip1, ShoppingTooltip2, ItemRefShoppingTooltip1,
                  ItemRefShoppingTooltip2}

SubscribeToForgeTopic(ForgeTopic.GET_TOOLTIPS, function(msg)
    local tt = DeserializeMessage(DeserializerDefinitions.GET_TOOLTIPS, msg);
    -- headers
    -- body
end)

local function FindTooltipLine(tooltip, itemName)
    for i = 1, tooltip:NumLines() do
        local text = _G[tooltip:GetName() .. "TextLeft" .. i]:GetText()
        if text and text == itemName then
            return (i + 1) -- line after the name
        end
    end
    return nil
end

local function addSubName(tooltip)
    local itemName, ItemLink = tooltip:GetItem();
    if ItemLink then
        local itemID = select(3, strfind(ItemLink, "item:(%d+)"))
        if (headerTooltipInfo[itemID]) then
            local tooltipName = tooltip:GetName()
            local tooltipLineID = FindTooltipLine(tooltip, itemName)
            local line = _G[tooltipName .. "TextLeft" .. tooltipLineID]
            local nextLine = _G[tooltipName .. "TextLeft" .. tooltipLineID + 1]
            if line and nextLine then
                nextLine:SetText(line:GetText() .. "\n" .. nextLine:GetText())
                line:SetText(subnameOptions[headerTooltipInfo[itemID]])
            end
        end
    end
end

local function genTertiaryStatString(itemID)
    local data = {}
    for i, v in pairs(customItemStatTooltipData[itemID]) do
        table.insert(data, string.format(statOptions[v[1]], v[2]))
    end
    return "\n|r|cff25aef7" .. table.concat(data, "\n") .. "|r"
end

local function addTertiaryStats(tooltip)
    local _, ItemLink = tooltip:GetItem();
    if ItemLink then
        local itemID = select(3, strfind(ItemLink, "item:(%d+)"))
        if (customItemStatTooltipData[itemID]) then
            for i = 2, tooltip:NumLines() do
                local prev = _G[tooltip:GetName() .. "TextLeft" .. i - 1]
                local line = _G[tooltip:GetName() .. "TextLeft" .. i]
                local prevText = prev:GetText()
                local text = line:GetText()
                if text and prevText then
                    if not string.find(prevText, "+") and string.find(text, "+") then
                        prev:SetText(prevText .. genTertiaryStatString(itemID))
                        return
                    end
                end
            end
        end
    end
end



--[[DISABLED TO RETURN DEBUFF TOOLTIPS]]--
function initializeItemTooltips()
   for i, v in pairs(tooltips) do
        v:HookScript("OnTooltipSetItem", function(tooltip)
            addSubName(tooltip);
            addTertiaryStats(tooltip)
        end)
    end
    PushForgeMessage(ForgeTopic.GET_TOOLTIPS, "1")
end


