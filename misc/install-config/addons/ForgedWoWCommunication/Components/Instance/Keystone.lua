KEYINFO = {
    NAME = nil,
    LVL = 0,
    TIMER = 1800,

    AFFIXES = 1,
}

BASE = {
    AFFIXES = {},
    TIMER = 1800
}

CURRENT_TRAY = nil

keysetupsettings = {
    width = GetScreenWidth() / 6,
    height = GetScreenHeight() / 4
}

CURRENT_AFFIXES = {}
CURRENT_TIMER = 0
DEATHCOUNT = 0

DG_COMPLETE = false

affixTT = CreateFrame("GameTooltip", "affixTT", UIParent, "GameTooltipTemplate");

function createKeySetupWindow()
    PushForgeMessage(ForgeTopic.MYTHIC_GET_AFFIXES_LIST, "0");

    KeySetupWindow = CreateFrame("Frame", "KeySetupWindow", KeySetupWindow);
    KeySetupWindow:SetSize(keysetupsettings.width, keysetupsettings.height); --- LEFT/RIGHT -- --UP/DOWN --
    KeySetupWindow:SetPoint("TOPLEFT", GetScreenWidth() / 20, -GetScreenHeight() / 10); --- LEFT/RIGHT -- --UP/DOWN --
    KeySetupWindow:SetFrameStrata("LOW")
    KeySetupWindow:EnableMouse(true)
    KeySetupWindow:SetMovable(true)
    KeySetupWindow:SetFrameLevel(1)
    KeySetupWindow:SetClampedToScreen(true)
    KeySetupWindow:SetScale(1)
    KeySetupWindow:RegisterEvent("VARIABLES_LOADED")
    KeySetupWindow:RegisterEvent("UI_SCALE_CHANGED")
    KeySetupWindow:SetScript("OnEvent", function(self)
        self:SetScale(1)
    end)
    KeySetupWindow:Hide()

    KeySetupWindow.header = CreateFrame("BUTTON", "KeySetupWindow.header", KeySetupWindow)
    KeySetupWindow.header:SetSize(keysetupsettings.width, tmogsettings.headerheight)
    KeySetupWindow.header:SetPoint("TOP", 0, 0);
    KeySetupWindow.header:SetFrameLevel(4)
    KeySetupWindow.header:EnableMouse(true)
    KeySetupWindow.header:RegisterForClicks("AnyUp", "AnyDown")
    KeySetupWindow.header:SetScript("OnMouseDown", function()
        KeySetupWindow:StartMoving()
    end)
    KeySetupWindow.header:SetScript("OnMouseUp", function()
        KeySetupWindow:StopMovingOrSizing()
    end)
    SetTemplate(KeySetupWindow.header);

    KeySetupWindow.header.close = CreateFrame("BUTTON", "InstallCloseButton", KeySetupWindow.header,
        "UIPanelCloseButton")
    KeySetupWindow.header.close:SetSize(tmogsettings.headerheight, tmogsettings.headerheight)
    KeySetupWindow.header.close:SetPoint("TOPRIGHT", KeySetupWindow.header, "TOPRIGHT")
    KeySetupWindow.header.close:SetScript("OnClick", function()
        KeySetupWindow:Hide()
    end)
    KeySetupWindow.header.close:SetFrameLevel(KeySetupWindow.header:GetFrameLevel() + 1)

    KeySetupWindow.header.title = KeySetupWindow.header:CreateFontString("OVERLAY");
    KeySetupWindow.header.title:SetPoint("CENTER", KeySetupWindow.header, "CENTER");
    KeySetupWindow.header.title:SetFont("Fonts\\FRIZQT__.TTF", 10);
    KeySetupWindow.header.title:SetText("Keystone Creation");
    KeySetupWindow.header.title:SetTextColor(188 / 255, 150 / 255, 28 / 255, 1);

    KeySetupWindow.body = CreateFrame("Frame", KeySetupWindow.body, KeySetupWindow);
    KeySetupWindow.body:SetSize(keysetupsettings.width, keysetupsettings.height - tmogsettings.headerheight); -- Talent Tree Window's Background --
    KeySetupWindow.body:SetPoint("TOP", 0, -tmogsettings.headerheight);

    KeySetupWindow.body.bg = CreateFrame("Frame", KeySetupWindow.body.bg, KeySetupWindow.body);
    KeySetupWindow.body.bg:SetSize(KeySetupWindow.body:GetWidth(), KeySetupWindow.body:GetHeight()); -- Talent Tree Window's Background --
    KeySetupWindow.body.bg:SetPoint("TOP", 0, 0);
    SetTemplate(KeySetupWindow.body.bg)

    -- TOP SECTION OF SETUP
    KeySetupWindow.body.display = CreateFrame("Frame", KeySetupWindow.body.display, KeySetupWindow.body);
    KeySetupWindow.body.display:SetSize(KeySetupWindow.body:GetWidth(), KeySetupWindow.body:GetHeight()/5); -- Talent Tree Window's Background --
    KeySetupWindow.body.display:SetPoint("TOP", 0, 0);

    KeySetupWindow.body.display.name = KeySetupWindow.body.display:CreateFontString("OVERLAY");
    KeySetupWindow.body.display.name:SetPoint("CENTER", KeySetupWindow.body.display, "CENTER");
    KeySetupWindow.body.display.name:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight);
    KeySetupWindow.body.display.name:SetTextColor(255 / 255, 128 / 255, 0 / 255, 1);

    KeySetupWindow.body.display.level = KeySetupWindow.body.display:CreateFontString("OVERLAY");
    KeySetupWindow.body.display.level:SetPoint("BOTTOM", KeySetupWindow.body.display, "BOTTOM");
    KeySetupWindow.body.display.level:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight/2);
    KeySetupWindow.body.display.level:SetText("Dungeon Level: ");
    KeySetupWindow.body.display.level:SetTextColor(0 / 255, 255 / 255, 0 / 255, 1);

    -- SETTINGS
    KeySetupWindow.body.affixes = CreateFrame("Frame", KeySetupWindow.body.display, KeySetupWindow.body);
    KeySetupWindow.body.affixes:SetSize(KeySetupWindow.body:GetWidth(), KeySetupWindow.body:GetHeight()/2.5); -- Talent Tree Window's Background --
    KeySetupWindow.body.affixes:SetPoint("TOP", 0, -1*KeySetupWindow.body:GetHeight()/5);

    KeySetupWindow.body.affixes.title = KeySetupWindow.body.affixes:CreateFontString("OVERLAY");
    KeySetupWindow.body.affixes.title:SetPoint("TOP", KeySetupWindow.body.affixes, "TOP", 0, -tmogsettings.headerheight/2);
    KeySetupWindow.body.affixes.title:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight/1.5);
    KeySetupWindow.body.affixes.title:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);
    KeySetupWindow.body.affixes.title:SetText("Affixes")
    KeySetupWindow.body.affixes.tiles = {}

    -- TIMER
    KeySetupWindow.body.time = CreateFrame("Frame", KeySetupWindow.body.time, KeySetupWindow.body);
    KeySetupWindow.body.time:SetSize(KeySetupWindow.body:GetWidth(), KeySetupWindow.body:GetHeight()/2.5); -- Talent Tree Window's Background --
    KeySetupWindow.body.time:SetPoint("BOTTOM", 0, 0);

    KeySetupWindow.body.time.bronze = KeySetupWindow.body.time:CreateFontString("OVERLAY");
    KeySetupWindow.body.time.bronze:SetPoint("CENTER", KeySetupWindow.body.time, "LEFT", KeySetupWindow:GetWidth()/5, tmogsettings.headerheight/2);
    KeySetupWindow.body.time.bronze:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight);
    KeySetupWindow.body.time.bronze:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);

    KeySetupWindow.body.time.silver = KeySetupWindow.body.time:CreateFontString("OVERLAY");
    KeySetupWindow.body.time.silver:SetPoint("CENTER", KeySetupWindow.body.time, "CENTER", 0, tmogsettings.headerheight/2);
    KeySetupWindow.body.time.silver:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight);
    KeySetupWindow.body.time.silver:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);

    KeySetupWindow.body.time.gold = KeySetupWindow.body.time:CreateFontString("OVERLAY");
    KeySetupWindow.body.time.gold:SetPoint("CENTER", KeySetupWindow.body.time, "RIGHT", -KeySetupWindow:GetWidth()/5, tmogsettings.headerheight/2);
    KeySetupWindow.body.time.gold:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight);
    KeySetupWindow.body.time.gold:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);

    KeySetupWindow.body.time.start = CreateFrame("Button", keyStart, KeySetupWindow.body.time, "UIPanelButtonTemplate")
    KeySetupWindow.body.time.start:SetSize(KeySetupWindow:GetWidth()/5, tmogsettings.headerheight) -- Set the size of the button
    KeySetupWindow.body.time.start:SetPoint("BOTTOM", 0, tmogsettings.headerheight/2)
    KeySetupWindow.body.time.start:SetText("Start") -- Set the text of the button
    KeySetupWindow.body.time.start:Hide()

    KeySetupWindow.body.time.start:SetScript("OnClick", function() 
        local out = ""
        local delim = ""
        for i = 1, KEYINFO.AFFIXES do
            if i > 1 then
                delim = "~"
            end
            out = out .. delim .. tostring(CURRENT_AFFIXES[i]);
        end
        print(out)
        PushForgeMessage(ForgeTopic.MYTHIC_SET_AFFIXES_AND_START, out)
    end)
end

function createMythicProgress()
    KeyProgress = CreateFrame("Frame", nil, KeyProgress);
    KeyProgress:SetSize(keysetupsettings.width/1.5, keysetupsettings.height); --- LEFT/RIGHT -- --UP/DOWN --
    KeyProgress:SetPoint("TOPRIGHT", -GetScreenWidth() / 20, -GetScreenHeight() / 20); --- LEFT/RIGHT -- --UP/DOWN --
    KeyProgress:SetFrameStrata("DIALOG")
    KeyProgress:EnableMouse(true)
    KeyProgress:SetMovable(true)
    KeyProgress:SetFrameLevel(1)
    KeyProgress:SetClampedToScreen(true)
    KeyProgress:SetScale(1)

    KeyProgress.title = KeyProgress:CreateFontString("OVERLAY");
    KeyProgress.title:SetPoint("TOPLEFT", KeyProgress, "TOPLEFT", 0, 0);
    KeyProgress.title:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight/1.5);
    KeyProgress.title:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);

    KeyProgress.deaths = KeyProgress:CreateFontString("OVERLAY");
    KeyProgress.deaths:SetPoint("TOPRIGHT", KeyProgress, "TOPRIGHT", 0, 0);
    KeyProgress.deaths:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight/1.5);
    KeyProgress.deaths:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);

    KeyProgress.timer = KeyProgress:CreateFontString("OVERLAY");
    KeyProgress.timer:SetPoint("TOPLEFT", KeyProgress, "TOPLEFT", 0, -tmogsettings.headerheight);
    KeyProgress.timer:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight/2);
    KeyProgress.timer:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);

    KeyProgress.objectives = KeyProgress:CreateFontString("OVERLAY");
    KeyProgress.objectives:SetPoint("TOPLEFT", KeyProgress, "TOPLEFT", 0, -tmogsettings.headerheight*2);
    KeyProgress.objectives:SetFont("Fonts\\FRIZQT__.TTF", tmogsettings.headerheight/2);
    KeyProgress.objectives:SetTextColor(255 / 255, 255 / 255, 255 / 255, 1);
    KeyProgress.objectives:SetJustifyH("LEFT");
end

local function SecondsToClock(secondsLeft)
    local minutes = math.floor( secondsLeft / 60 )
    local seconds = secondsLeft % 60
    return string.format( "%02d:%02d", minutes, seconds )
end

local function RedrawTimer()
    KeySetupWindow.body.time.bronze:SetText(SecondsToClock(KEYINFO.TIMER));
    KeySetupWindow.body.time.silver:SetText(SecondsToClock(KEYINFO.TIMER*.8));
    KeySetupWindow.body.time.gold:SetText(SecondsToClock(KEYINFO.TIMER*.6));
end

local function CheckAffixes()
    if CURRENT_AFFIXES then
        if #CURRENT_AFFIXES == KEYINFO.AFFIXES then
            KeySetupWindow.body.time.start:Show()
        end
    end
end

local function initAffixIconsForTier(tray, affixlist, iconSize, target)
    for i = 1, #affixlist do
        local affix = CreateFrame("BUTTON", "affix"..i, tray)
        affix:SetSize(iconSize, iconSize)
        affix:SetPoint("LEFT", (i-1)*iconSize, 0);
        affix:SetAlpha(1)

        affix.spell = affixlist[i]
        local name, _, icon = GetSpellInfo(affix.spell);

        local texture = affix:CreateTexture(nil, "ARTWORK")
        texture:SetAllPoints(affix)
        texture:SetPoint("CENTER")
        texture:SetTexture(icon)
        texture:SetAlpha(1)

        affix:SetScript("OnEnter", function()
            affixTT:SetOwner(target, "ANCHOR_TOP")
            affixTT:SetHyperlink('spell:' .. affix.spell)
            affixTT:Show()
        end);

        affix:SetScript("OnLeave", function()
            affixTT:Hide()
        end);

        affix:SetScript("OnClick", function()
            CURRENT_AFFIXES[tray.tier] = affix.spell
            KEYINFO.TIMER = BASE.TIMER + #CURRENT_AFFIXES*300
            affixTT:Hide()
            tray:Hide()
            target.tex:SetTexture(icon)
            RedrawTimer()
            CheckAffixes()
        end);
    end
end

local function CreateAffixSelectTile(tier, of)
    local affixlist = BASE.AFFIXES[tier];
    local iconSize = KeySetupWindow:GetWidth()/7
    local _, _, placeholder = GetSpellInfo(1);

    -- position of the leftmost tile
    local posX = 0;
    local posY = -iconSize/2;
    if of == 2 then
        posX = -iconSize;
    elseif of == 3 then
        posX = -1.5*iconSize
    end

    if tier == 2 then
        posX = posX+1.5*iconSize
    end
    if tier == 3 then
        posX = posX+3*iconSize
    end

    local affixFrame = CreateFrame("BUTTON", "affixFrame" .. tier, KeySetupWindow.body.affixes)
    affixFrame:SetHighlightTexture("Interface\\Buttons\\CheckButtonHilight")
    affixFrame:SetFrameLevel(KeySetupWindow.body:GetFrameLevel() + 2)
    affixFrame:SetSize(iconSize, iconSize)
    affixFrame:SetPoint("CENTER", posX, posY)
    affixFrame:SetScript("OnEnter", function() 
        if CURRENT_AFFIXES then
            if CURRENT_AFFIXES[tier] then
                affixTT:SetOwner(affixFrame, "ANCHOR_TOP")
                affixTT:SetHyperlink('spell:' .. CURRENT_AFFIXES[tier])
                affixTT:Show()
            end
        end
    end)
    affixFrame:SetScript("OnLeave", function()
        affixTT:Hide()
    end);

    local tex = affixFrame:CreateTexture(nil, "ARTWORK")
    tex:SetAllPoints(affixFrame)
    tex:SetPoint("CENTER")
    tex:SetTexture(placeholder)
    affixFrame.tex = tex;

    local tray = CreateFrame("Frame", "tray"..tier, affixFrame)
    tray:SetSize(#affixlist*iconSize, iconSize);
    tray:SetPoint("LEFT", 0, -iconSize)
    tray.tier = tier;
    initAffixIconsForTier(tray, affixlist, iconSize, affixFrame)
    tray:Hide()

    affixFrame:SetScript("OnClick", function()
        if tray:IsVisible() then
            CURRENT_TRAY = nil
            tray:Hide()
        else
            if CURRENT_TRAY then
                CURRENT_TRAY:Hide()
            end
            CURRENT_TRAY = tray
            tray:Show()
        end
    end)

    return affixFrame;
end

local function InitAffixSlotsAndReqs(level)
    KeySetupWindow.body.affixes.tiles = {}
    if level > 3 then
        KEYINFO.AFFIXES = 2;
    end
    if level > 6 then
        KEYINFO.AFFIXES = 3;
    end

    for i = 1, KEYINFO.AFFIXES do
        KeySetupWindow.body.affixes.tiles[i] = CreateAffixSelectTile(i, KEYINFO.AFFIXES)
    end
end

SubscribeToForgeTopic(ForgeTopic.MYTHIC_OPEN_WINDOW, function(msg)
    --print(msg)
    if msg == "0" then
        KeySetupWindow:Hide()
    else
        local split = ForgeSplit(";", msg);
        KEYINFO.LVL = split[1]
        KEYINFO.NAME = split[2] -- todo pull base timer
        CURRENT_AFFIXES = {}
        KEYINFO.AFFIXES = 1

        KeySetupWindow.body.display.level:SetText("Dungeon Level: "..KEYINFO.LVL);
        KeySetupWindow.body.display.name:SetText(KEYINFO.NAME);
        RedrawTimer()

        InitAffixSlotsAndReqs(tonumber(KEYINFO.LVL));

        KeySetupWindow:Show()
        CheckAffixes()
    end
end);

SubscribeToForgeTopic(ForgeTopic.MYTHIC_SET_AFFIXES_AND_START, function(msg)
    --print(msg)
    local split = ForgeSplit("*", msg);
    DG_COMPLETE = false
    KEYINFO.NAME = split[1];
    KEYINFO.LVL = tonumber(split[2]);
    KEYINFO.TIMER = tonumber(split[3])
    KeyProgress.title:SetText(KEYINFO.NAME.." +"..tostring(KEYINFO.LVL));
    KeyProgress:Show()
end);

SubscribeToForgeTopic(ForgeTopic.MYTHIC_GET_AFFIXES_LIST, function(msg)
    --print(msg)
    for i, entry in ipairs(DeserializeMessage(DeserializerDefinitions.GET_AFFIXES, msg)) do
        BASE.AFFIXES[i] = {}
        table.insert(BASE.AFFIXES[i], entry.SpellId)
    end
end);

SubscribeToForgeTopic(ForgeTopic.MYTHIC_UPDATE_CRITERIA, function(msg)
    --print(msg)
    local minionStr = "Minions: "
    local baseStr = ""
    for i, entry in ipairs(DeserializeMessage(DeserializerDefinitions.GET_MYTHIC_OBJS, msg)) do
        if entry.ID == "0" then
            minionStr = minionStr..entry.count.."%"
        else
            baseStr = baseStr..entry.count.."/1 "..tostring(entry.ID).."\n"
        end
    end
    KeyProgress.objectives:SetText(baseStr..minionStr);
end);

SubscribeToForgeTopic(ForgeTopic.MYTHIC_UPDATE_DEATHS, function(msg)
    DEATHCOUNT = tonumber(msg)
    KeyProgress.deaths:SetText(ICON_LIST[8].."0|t "..DEATHCOUNT)
end);

SubscribeToForgeTopic(ForgeTopic.MYTHIC_UPDATE_TIMER, function(msg)
    --print(msg)
    CURRENT_TIMER = tonumber(msg);
    local t = 1
    KeyProgress:SetScript("OnUpdate", function(self, elapsed) 
        if not DG_COMPLETE then
            t = t - elapsed
            if t <= 0 then
                KeyProgress.timer:SetText(SecondsToClock(CURRENT_TIMER).."/"..SecondsToClock(KEYINFO.TIMER))
                CURRENT_TIMER = CURRENT_TIMER + 1
                t = 1
            end
        end
    end)
end);

SubscribeToForgeTopic(ForgeTopic.MYTHIC_KEY_DG_COMPLETED, function(msg)
    DG_COMPLETE = true
    KeyProgress:SetScript("OnUpdate", function(self, elapsed) end) -- kill script for count down
    KeyProgress.objectives:SetText("DG_COMPLETE!");
    KeyProgress.objectives:SetTextColor(0 / 255, 255 / 255, 0 / 255, 1);
end);