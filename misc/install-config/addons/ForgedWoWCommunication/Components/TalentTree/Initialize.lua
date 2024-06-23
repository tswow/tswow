Util = {
    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
}

function ToggleTalentFrame(openPet)
    if openPet and HasPetUI() and PetCanBeAbandoned() then
        TalentFrame_LoadUI();
        if (PlayerTalentFrame_Toggle) then
            PlayerTalentFrame_Toggle(true, 3);
        end
    else
        ToggleMainWindow();
    end
end

local function printTable(t, indent)
    indent = indent or ""
    for key, value in pairs(t) do
        if type(value) == "table" then
            print(indent .. tostring(key) .. ": ")
            printTable(value, indent .. "  ")
        else
            print(indent .. tostring(key) .. ": " .. tostring(value))
        end
    end
end

function GetClassTree(classString)
    if classString == "Warrior" then
        return "33";
    elseif classString == "Paladin" then
        return "34";
    elseif classString == "Hunter" then
        return "35";
    elseif classString == "Rogue" then
        return "36";
    elseif classString == "Priest" then
        return "37";
    elseif classString == "Death Knight" then
        return "38";
    elseif classString == "Shaman" then
        return "39";
    elseif classString == "Mage" then
        return "40";
    elseif classString == "Warlock" then
        return "41";
    else
        return "42";
    end
end

function InitializeTalentTree()
    TalentTree.ClassTree = GetClassTree(UnitClass("player"))

    InitializeGridForTalent()
    FirstRankToolTip = CreateFrame("GameTooltip", "firstRankToolTip", WorldFrame, "GameTooltipTemplate");
    SecondRankToolTip = CreateFrame("GameTooltip", "secondRankToolTip", WorldFrame, "GameTooltipTemplate");
    PushForgeMessage(ForgeTopic.TalentTree_LAYOUT, "-1")
    SubscribeToForgeTopic(ForgeTopic.TalentTree_LAYOUT, function(msg)
        GetTalentTreeLayout(msg)
    end);
    SubscribeToForgeTopic(ForgeTopic.GET_CHARACTER_SPECS, function(msg)
        GetCharacterSpecs(msg);
    end);
end

function GetTalentTreeLayout(msg)
    local listOfObjects = DeserializeMessage(DeserializerDefinitions.TalentTree_LAYOUT, msg);
    for i, tab in ipairs(listOfObjects) do
        if tab.TalentType == CharacterPointType.TALENT_SKILL_TREE or tab.TalentType == CharacterPointType.RACIAL_TREE or
            tab.TalentType == CharacterPointType.PRESTIGE_TREE or tab.TalentType == CharacterPointType.SKILL_PAGE then
            table.insert(TalentTree.FORGE_TABS, tab);
        elseif tab.TalentType == CharacterPointType.CLASS_TREE then
            TalentTree.CLASS_TAB = tab;
        end
    end
    
    table.sort(TalentTree.FORGE_TABS, function(left, right)
        return left.Id < right.Id
    end)

    PushForgeMessage(ForgeTopic.GET_CHARACTER_SPECS, "-1")
end

function GetCharacterSpecs(msg)
    local listOfObjects = DeserializeMessage(DeserializerDefinitions.GET_CHARACTER_SPECS, msg);
    for i, spec in ipairs(listOfObjects) do
        if spec.Active == "1" then

            SELECTED_SPEC = spec.CharacterSpecTabId
            TalentTree.FORGE_ACTIVE_SPEC = spec;

            for _, pointStruct in ipairs(spec.TalentPoints) do
                TreeCache.Points[pointStruct.CharacterPointType] = pointStruct.AvailablePoints
                TalentTree.MaxPoints[pointStruct.CharacterPointType] = pointStruct.Earned
            end
        else
            table.insert(TalentTree.FORGE_SPEC_SLOTS, spec)
        end
    end

    if TalentTree.INITIALIZED and TalentTree.FORGE_SELECTED_TAB then
        ShowTypeTalentPoint(TalentTree.FORGE_SELECTED_TAB.TalentType, TalentTree.FORGE_SELECTED_TAB.Id)
    else
        InitializeTalentLeft();
        InitializeForgePoints();
        local firstTab = TalentTree.FORGE_TABS[1];
        if SELECTED_SPEC then
            for i, tab in ipairs(TalentTree.FORGE_TABS) do
                if tab.Id == SELECTED_SPEC then
                    firstTab = tab
                end
            end
        end

        SelectTab(firstTab)
    end
    TalentTree.INITIALIZED = true
    PushForgeMessage(ForgeTopic.GET_TALENTS, "-1");
    PushForgeMessage(ForgeTopic.GET_LOADOUTS, "-1")
end

SubscribeToForgeTopic(ForgeTopic.LEARN_TALENT_ERROR, function(msg)
    print("Talent Learn Error: " .. msg);
end)

local onUpdateFrame = CreateFrame("Frame")
SubscribeToForgeTopic(ForgeTopic.GET_TALENTS, function(msg)
    LoadTalentString(msg);
end)

function RevertAllTalents ()
    -- only here to make sure no one presses anything during (somehow)
    ClassSpecWindow.Lockout:Show()

    local nodeInd = #TreeCache.Spells[tostring(SELECTED_SPEC)]
    for i = #TreeCache.Spells[tostring(SELECTED_SPEC)], 1, -1 do
        local rank = tonumber(TreeCache.Spells[tostring(SELECTED_SPEC)][i])
        if rank > 0 then
            for i = 1, rank, 1 do
                local location = TreeCache.IndexToFrame[tostring(SELECTED_SPEC)][nodeInd]
                local frame = TalentTreeWindow.GridTalent.Talents[location.row][location.col]
                frame:GetScript("OnMouseDown")(frame, 'RightButton');
                frame:GetScript("OnUpdate")();
            end
        end
        nodeInd = nodeInd - 1
    end

    nodeInd = #TreeCache.Spells[TalentTree.ClassTree]
    for i = nodeInd, 1, -1 do
        local rank = tonumber(TreeCache.Spells[TalentTree.ClassTree][i])
        if rank > 0 then
            for i = 1, rank, 1 do
                local location = TreeCache.IndexToFrame[TalentTree.ClassTree][nodeInd]
                local frame = TalentTreeWindow.GridTalent.Talents[location.row][location.col]
                frame:GetScript("OnMouseDown")(frame, 'RightButton');
                frame:GetScript("OnUpdate")();
            end
        end
        nodeInd = nodeInd - 1
    end

    ClassSpecWindow.Lockout:Hide()
end

SubscribeToForgeTopic(ForgeTopic.ACTIVATE_CLASS_SPEC, function(msg)
    ClassSpecWindow.Lockout:Hide()
    TalentTreeWindow:Show()
    ClassSpecWindow:Hide()
end)

function LoadTalentString(msg)
    local type, _ = string.find(Util.alpha, string.sub(msg, 1, 1))
    local spec, _ = string.find(Util.alpha, string.sub(msg, 2, 2))
    local class, _ = string.find(Util.alpha, string.sub(msg, 3, 3))
    if type-1 == tonumber(CharacterPointType.TALENT_SKILL_TREE) and string.len(msg) > 3 and tonumber(spec) == tonumber(TalentTree.FORGE_SELECTED_TAB.Id) then
        if not TreeCache.PreviousString[type] then
            TreeCache.PreviousString[type] = "empty :)"
        end
        if TreeCache.PreviousString[type] ~= msg then
            RevertAllTalents()
            if not TalentTree.FORGE_TALENTS then
                TalentTree.FORGE_TALENTS = {};
            end

            local specTreeLen = 0
            if TreeCache.Spells[tostring(spec)] then
                specTreeLen = #TreeCache.Spells[tostring(spec)]
            end

            local classTreeLen = 0
            classTreeLen = #TreeCache.Spells[TalentTree.ClassTree]
            -- ZERO EVERY STRUCT
            TreeCache.Points[tostring(type-1)] = TalentTree.MaxPoints[tostring(type-1)]
            TreeCache.PointsSpent[tostring(spec)] = 0

            if type - 1 == 0 then
                TreeCache.Points["7"] = TalentTree.MaxPoints["7"]
                TreeCache.PointsSpent["7"] = 0
            end

            for i = 0, 50, 5 do
                TreeCache.Investments[tostring(spec)][i] = 0
                TreeCache.Investments[TalentTree.ClassTree][i] = 0
                TreeCache.TotalInvests[i] = 0
            end

            for i = 1, #TalentTree.FORGE_TABS, 1 do
                local id = TalentTree.FORGE_TABS[i].Id
                if (tonumber(id) == spec) then
                    SelectTab(TalentTree.FORGE_TABS[i])
                end
            end

            local nodeInd = 1
            local classBlock = 3 + classTreeLen
            local classString = string.sub(msg, 4, classBlock)
            for i = 1, classTreeLen, 1 do
                TreeCache.Spells[TalentTree.ClassTree][nodeInd] = 0;
                local rank = string.find(Util.alpha, string.sub(classString, i, i)) - 1
                if TreeCache.ChoiceNodes[nodeInd] then
                    if rank and TreeCache.ChoiceNodes[nodeInd][rank] then
                        TreeCache.ChoiceNodes[nodeInd][rank]:GetScript("OnMouseDown")(TreeCache.ChoiceNodes[nodeInd][rank], 'LeftButton');
                    end
                else
                    for click = 1, rank, 1 do
                        local location = TreeCache.IndexToFrame[TalentTree.ClassTree][nodeInd]
                        local frame = TalentTreeWindow.GridTalent.Talents[location.row][location.col]
                        frame:GetScript("OnUpdate")();
                        frame:GetScript("OnMouseDown")(frame, 'LeftButton');
                    end
                end
                nodeInd = nodeInd + 1
            end

            local specBlock = classBlock + specTreeLen
            --print("starts: "..(classBlock+1).." ends: "..specBlock)
            local nodeInd = 1
            local specString = string.sub(msg, classBlock+1, specBlock)
            for i = 1, specTreeLen, 1 do
                TreeCache.Spells[tostring(spec)][nodeInd] = 0;
                local rank = string.find(Util.alpha, string.sub(specString, i, i)) - 1
                for click = 1, rank, 1 do
                    local location = TreeCache.IndexToFrame[tostring(spec)][nodeInd]
                    local frame = TalentTreeWindow.GridTalent.Talents[location.row][location.col]
                    frame:GetScript("OnUpdate")();
                    frame:GetScript("OnMouseDown")(frame, 'LeftButton');
                end
                nodeInd = nodeInd + 1
            end

            TreeCache.PreviousString[type] = msg
        end
    end
end

SubscribeToForgeTopic(ForgeTopic.GET_LOADOUTS, function(msg)
    local listOfObjects = DeserializeMessage(DeserializerDefinitions.GET_LOADOUTS, msg);
    for _, obj in ipairs(listOfObjects) do
        if not TalentTree.TalentLoadoutCache[obj.spec] then
            TalentTree.TalentLoadoutCache[obj.spec] = {}
        end

        for _, loadout in ipairs(obj.loadouts) do
            local item = {
                name = loadout.name,
                loadout = loadout.talents,
            }

            TalentTree.TalentLoadoutCache[obj.spec][loadout.id] = item
            if loadout.active > 0 and obj.spec == TalentTree.FORGE_SELECTED_TAB.Id then
                ApplyLoadoutAndUpdateCurrent(loadout.id)
            end
        end
    end
end)

function GetClassId (classString)
    if classString == "Warrior" then
        return 1;
    elseif classString == "Paladin" then
        return 2;
    elseif classString == "Hunter" then
        return 3;
    elseif classString == "Rogue" then
        return 4;
    elseif classString == "Priest" then
        return 5;
    elseif classString == "Death Knight" then
        return 6;
    elseif classString == "Shaman" then
        return 7;
    elseif classString == "Mage" then
        return 8;
    elseif classString == "Warlock" then
        return 9;
    else
        return 11;
    end
end