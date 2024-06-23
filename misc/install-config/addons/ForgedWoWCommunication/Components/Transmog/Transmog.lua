SLOTS_AS_PAGES = {}
CURRENT_SLOT = "0"
CURRENT_PAGE = 1
CURRENT_SET = nil
CURRENT_SET_NAME = ""

PENDING_CHANGES = {}

CHARACTER_XMOG_SETS = {}

ADD_NEW_SET = { name = "new set", setid = 99 }

local rows = 6
local columns = 6

collectionTooltip = CreateFrame("GameTooltip", "collectionTooltip", UIParent, "GameTooltipTemplate");

function createTransmogWindow() 

    TransmogWindow = CreateFrame("Frame", nil, TransmogWindow);
    TransmogWindow:SetSize(tmogsettings.width, tmogsettings.height); --- LEFT/RIGHT -- --UP/DOWN --
    TransmogWindow:SetPoint("TOPLEFT", GetScreenWidth() / 20, -GetScreenHeight() / 10); --- LEFT/RIGHT -- --UP/DOWN --
    TransmogWindow:SetFrameStrata("DIALOG")
    TransmogWindow:EnableMouse(true)
    TransmogWindow:SetMovable(true)
    TransmogWindow:SetFrameLevel(1)
    TransmogWindow:SetClampedToScreen(true)
    TransmogWindow:SetScale(1)
    TransmogWindow:RegisterEvent("VARIABLES_LOADED")
    TransmogWindow:RegisterEvent("UI_SCALE_CHANGED")
    TransmogWindow:SetScript("OnEvent", function(self)
        self:SetScale(1)
    end)

    SetTemplate(TransmogWindow);
    TransmogWindow.header = CreateFrame("BUTTON", nil, TransmogWindow)
    TransmogWindow.header:SetSize(tmogsettings.width, tmogsettings.headerheight)
    TransmogWindow.header:SetPoint("TOP", 0, 0);
    TransmogWindow.header:SetFrameLevel(4)
    TransmogWindow.header:EnableMouse(true)
    TransmogWindow.header:RegisterForClicks("AnyUp", "AnyDown")
    TransmogWindow.header:SetScript("OnMouseDown", function()
        TransmogWindow:StartMoving()
    end)
    TransmogWindow.header:SetScript("OnMouseUp", function()
        TransmogWindow:StopMovingOrSizing()
    end)
    SetTemplate(TransmogWindow.header);

    TransmogWindow.header.close = CreateFrame("BUTTON", "InstallCloseButton", TransmogWindow.header,
        "UIPanelCloseButton")
    TransmogWindow.header.close:SetSize(tmogsettings.headerheight, tmogsettings.headerheight)
    TransmogWindow.header.close:SetPoint("TOPRIGHT", TransmogWindow.header, "TOPRIGHT")
    TransmogWindow.header.close:SetScript("OnClick", function()
        TransmogWindow:Hide()
    end)
    TransmogWindow.header.close:SetFrameLevel(TransmogWindow.header:GetFrameLevel() + 1)

    TransmogWindow.header.title = TransmogWindow.header:CreateFontString("OVERLAY");
    TransmogWindow.header.title:SetPoint("CENTER", TransmogWindow.header, "CENTER");
    TransmogWindow.header.title:SetFont("Fonts\\FRIZQT__.TTF", 10);
    TransmogWindow.header.title:SetText("Transmogrification");
    TransmogWindow.header.title:SetTextColor(188 / 255, 150 / 255, 28 / 255, 1); -- rgb(188, 150, 28)

    -- MODEL AND SLOTS
    TransmogWindow.modelhub = CreateFrame("Frame", TransmogWindow.modelhub, TransmogWindow);
    TransmogWindow.modelhub:SetSize(tmogsettings.width/2.5, tmogsettings.height - tmogsettings.headerheight);
    TransmogWindow.modelhub:SetPoint("TOPLEFT", 0, -tmogsettings.headerheight);
    TransmogWindow.modelhub:SetFrameLevel(2)
    SetTemplate(TransmogWindow.modelhub);
    TransmogWindow.modelhub:SetAlpha(1);

    TransmogWindow.modelhub.accept = CreateFrame("BUTTON", TransmogWindow.modelhub.accept, TransmogWindow.modelhub, "UIPanelButtonTemplate")
    TransmogWindow.modelhub.accept:SetPoint("BOTTOMRIGHT", 0, 0)
    TransmogWindow.modelhub.accept:SetSize(4*tmogsettings.headerheight, tmogsettings.headerheight)
    TransmogWindow.modelhub.accept:SetHighlightTexture("Interface\\Buttons\\CheckButtonHilight")
    TransmogWindow.modelhub.accept:SetText("Accept")
    TransmogWindow.modelhub.accept:SetScript("OnClick", function ()
        local isNewSet = TransmogWindow.modelhub.setDropdown.choice == 99
        if isNewSet then
            StaticPopup_Show("REQUEST_XMOG_SET_NAME")
        else
            SendTransmogRequestsForPending()
        end
        TransmogWindow.modelhub.accept:Hide();
    end)
    TransmogWindow.modelhub.accept:Hide();

    TransmogWindow.modelhub.slots = {}
    ArrangeSlots(TransmogWindow.modelhub.slots)

    TransmogWindow.modelhub.model = CreateFrame("DressUpModel", TransmogWindow.modelhub.model, TransmogWindow.modelhub);
    TransmogWindow.modelhub.model:SetPoint("CENTER");
    TransmogWindow.modelhub.model:SetSize(TransmogWindow.modelhub:GetWidth(), TransmogWindow.modelhub:GetHeight())
    TransmogWindow.modelhub.model:SetAlpha(1);
    TransmogWindow.modelhub.model:SetFrameLevel(3);
    TransmogWindow.modelhub.model:SetRotation(0.61)

    -- COLLECTION VIEW
    TransmogWindow.collection = CreateFrame("Frame", TransmogWindow.collection, TransmogWindow)
    TransmogWindow.collection:SetSize(tmogsettings.width-tmogsettings.width/2.5, tmogsettings.height - tmogsettings.headerheight);
    TransmogWindow.collection:SetPoint("TOPRIGHT", 0, -tmogsettings.headerheight);
    TransmogWindow.collection:SetFrameLevel(2)

    TransmogWindow.collection.buttons = {}

    local outsidepadding = 1*tmogsettings.headerheight
    local gap = .5*tmogsettings.headerheight

    local iconHeight = (TransmogWindow.collection:GetHeight() - (2*outsidepadding + gap*(columns-1)))/columns
    local iconWidth = (TransmogWindow.collection:GetWidth() - (2*outsidepadding + gap*(rows-1)))/rows

    local depth = -outsidepadding
    for i = 1, rows do
        local length = outsidepadding
        TransmogWindow.collection.buttons[i] = {}
        for j = 1, columns do
            TransmogWindow.collection.buttons[i][j] = CreateFrame("BUTTON", TransmogWindow.collection.buttons[i][j], TransmogWindow.collection)
            TransmogWindow.collection.buttons[i][j]:SetHighlightTexture("Interface\\Buttons\\CheckButtonHilight")
            TransmogWindow.collection.buttons[i][j]:SetFrameLevel(TransmogWindow.collection:GetFrameLevel() + 2)
            TransmogWindow.collection.buttons[i][j]:SetSize(iconWidth, iconHeight)
            
            TransmogWindow.collection.buttons[i][j]:SetPoint("TOPLEFT", length, depth)
            SetTemplate(TransmogWindow.collection.buttons[i][j]);
            TransmogWindow.collection.buttons[i][j]:SetAlpha(1)

            TransmogWindow.collection.buttons[i][j]:SetScript("OnEnter", function()
                collectionTooltip:SetOwner(TransmogWindow.collection.buttons[i][j], "ANCHOR_RIGHT")
            end);

            TransmogWindow.collection.buttons[i][j]:Hide();

            length = length + iconWidth + gap
        end
        depth = depth -iconHeight -gap
    end

    TransmogWindow.collection.pagenext = CreateFrame("BUTTON", TransmogWindow.collection.pagenext, TransmogWindow.collection, "UIPanelButtonTemplate")
    TransmogWindow.collection.pagenext:SetHighlightTexture("Interface\\Buttons\\CheckButtonHilight")
    TransmogWindow.collection.pagenext:SetSize(2*tmogsettings.headerheight, tmogsettings.headerheight)
    TransmogWindow.collection.pagenext:SetText(">")
    TransmogWindow.collection.pagenext:SetPoint("BOTTOMRIGHT", 0, 0)
    TransmogWindow.collection.pagenext:SetScript("OnClick", function()
        if CURRENT_PAGE ~= #SLOTS_AS_PAGES[CURRENT_SLOT] and #SLOTS_AS_PAGES[CURRENT_SLOT] > 0 then
            SetPageNumber(CURRENT_PAGE + 1)
            UpdateCollectionView()
        end
    end);

    TransmogWindow.collection.pageback = CreateFrame("BUTTON", TransmogWindow.collection.pageback, TransmogWindow.collection, "UIPanelButtonTemplate")
    TransmogWindow.collection.pageback:SetHighlightTexture("Interface\\Buttons\\CheckButtonHilight")
    TransmogWindow.collection.pageback:SetSize(2*tmogsettings.headerheight, tmogsettings.headerheight)
    TransmogWindow.collection.pageback:SetText("<")
    TransmogWindow.collection.pageback:SetPoint("BOTTOMLEFT", 0, 0)
    TransmogWindow.collection.pageback:SetScript("OnClick", function()
        if CURRENT_PAGE > 1 then
            SetPageNumber(CURRENT_PAGE - 1)
            UpdateCollectionView()
        end
    end);

    TransmogWindow:Hide();
end

function SelectSlotFilter()
    CURRENT_PAGE = 1
    UpdateCollectionView()
end

function HideAllItems()
    for i = 1, rows do
        for j = 1, columns do
            TransmogWindow.collection.buttons[i][j]:Hide();
            TransmogWindow.collection.buttons[i][j]:SetScript("OnEnter", function()
                collectionTooltip:SetOwner(TransmogWindow.collection.buttons[i][j], "ANCHOR_RIGHT")
            end);
        end
    end
end

function UpdateCollectionView()
    HideAllItems()
    local page = SLOTS_AS_PAGES[CURRENT_SLOT][CURRENT_PAGE]
    local row = 1
    local column = 1

    for i, data in ipairs(page) do
        if (column > columns) then
            column = 1
            row = row+1
        end
        local link = "|cffffffff|Hitem:"..data.ItemId.."|h[item]|h|r"
        local _,_,_,_,_,_,_,_,invtype,icon = GetItemInfo(link);

        TransmogWindow.collection.buttons[row][column]:HookScript("OnEnter", function()
            collectionTooltip:SetHyperlink(link)
            collectionTooltip:Show()
        end);

        TransmogWindow.collection.buttons[row][column]:SetScript("OnLeave", function()
            collectionTooltip:Hide()
        end);
    
        TransmogWindow.collection.buttons[row][column]:SetScript("OnClick", function()
            SetSlotIcon(InvTypeToSlot(invtype), icon, data.ItemId)
        end);

        TransmogWindow.collection.buttons[row][column]:Show();
        column = column + 1
    end
end

function SetPageNumber(number)
    CURRENT_PAGE = number

    if not TransmogWindow.collection.pagenumber then
        TransmogWindow.collection.pagenumber = TransmogWindow.collection:CreateFontString(nil, "OVERLAY", "GameFontHighlight");
        TransmogWindow.collection.pagenumber:SetPoint("BOTTOM", TransmogWindow.collection, "BOTTOM", 0, .2*tmogsettings.headerheight);
        TransmogWindow.collection.pagenumber:SetFont("Fonts\\FRIZQT__.TTF", .6*tmogsettings.headerheight);
        TransmogWindow.collection.pagenumber:SetShadowOffset(1, -1);
    end

    TransmogWindow.collection.pagenumber:SetText("Page "..CURRENT_PAGE.." of "..#SLOTS_AS_PAGES[CURRENT_SLOT]);
end

function InitSetDropdown()
    TransmogWindow.modelhub.setDropdown = CreateFrame("Frame", "setDropdown", TransmogWindow.modelhub,
        "UIDropDownMenuTemplate")
    TransmogWindow.modelhub.setDropdown:SetPoint("TOP", 0, 0)
    TransmogWindow.modelhub.setDropdown.sets = CHARACTER_XMOG_SETS
    if (#TransmogWindow.modelhub.setDropdown.sets < MAX_SETS) then
        
    end
    TransmogWindow.modelhub.setDropdown.choice = 0

    UIDropDownMenu_Initialize(TransmogWindow.modelhub.setDropdown, function(self, level, menuList)
        for _, item in ipairs(self.sets) do
            local info = UIDropDownMenu_CreateInfo()
            info.text = item.name
            info.value = item.setid
            info.func = function(self)
                PENDING_CHANGES = {}
                if TransmogWindow.modelhub.setDropdown.choice == item.setid then
                    TransmogWindow.modelhub.setDropdown.choice = 0
                    UIDropDownMenu_SetSelectedID(TransmogWindow.modelhub.setDropdown, -1)
                    UIDropDownMenu_SetText(TransmogWindow.modelhub.setDropdown, " ")
                    CURRENT_SET = nil
                    CURRENT_SET_NAME = nil
                else
                    TransmogWindow.modelhub.setDropdown.choice = item.setid
                    UIDropDownMenu_SetSelectedID(TransmogWindow.modelhub.setDropdown, self:GetID())
                    UIDropDownMenu_SetText(TransmogWindow.modelhub.setDropdown, item.name)
                    CURRENT_SET = item.setid
                    CURRENT_SET_NAME = item.name
                    if (CURRENT_SET < 99) then
                        LoadCurrentSet()
                    end
                end
                CloseDropDownMenus()
            end
            UIDropDownMenu_AddButton(info)
        end
    end)
    ToggleDropDownMenu(1, nil, TransmogWindow.modelhub.setDropdown, "cursor", 0, 0)
    CloseDropDownMenus()

    -- TransmogWindow.collection.subSlotFilterDropdown = CreateFrame("Frame", TransmogWindow.collection.subSlotFilterDropdown, TransmogWindow.collection,
    --     "UIDropDownMenuTemplate")
    -- TransmogWindow.collection.subSlotFilterDropdown:SetPoint("TOPRIGHT", 0, 0)
end

local slotSize = 2*tmogsettings.headerheight

function ArrangeSlots(frame)
    local padding = .3*tmogsettings.headerheight
    local size = TransmogWindow.modelhub:GetHeight()/(slotSize+padding)

    for i = 0, 18 do
        local slot = nil
        if i == 0 then -- head
            slot = CreateSlot(padding, -padding, "HEADSLOT")
        elseif i == 2 then -- shoulder
            slot = CreateSlot(padding, -padding-slotSize, "SHOULDERSLOT")
        elseif i == 3 then -- shirt
            slot = CreateSlot(padding, -padding-4*slotSize, "SHIRTSLOT")
        elseif i == 4 then -- chest
            slot = CreateSlot(padding, -padding-3*slotSize, "CHESTSLOT")
        elseif i == 5 then -- waist
            slot = CreateSlot(padding, -padding-8*slotSize, "WAISTSLOT")
        elseif i == 6 then -- legs
            slot = CreateSlot(padding, -padding-9*slotSize, "LEGSLOT")
        elseif i == 7 then -- feet
            slot = CreateSlot(padding, -padding-10*slotSize, "FEETSLOT")
        elseif i == 8 then -- wrist
            slot = CreateSlot(padding, -padding-6*slotSize, "WRISTSLOT")
        elseif i == 9 then -- hands
            slot = CreateSlot(padding, -padding-7*slotSize, "HANDSLOT")
        elseif i == 14 then -- back
            slot = CreateSlot(padding, -padding-2*slotSize, "BACKSLOT")
        elseif i == 15 then -- mh
            slot = CreateSlot(padding+3*slotSize, -padding-(size)*slotSize, "MAINHANDSLOT")
        elseif i == 16 then -- oh
            slot = CreateSlot(padding+4*slotSize, -padding-(size)*slotSize, "SECONDARYHANDSLOT")
        elseif i == 17 then -- ranged
            slot = CreateSlot(padding+5*slotSize, -padding-(size)*slotSize, "RANGEDSLOT")
        elseif i == 18 then -- tabard
            slot = CreateSlot(padding, -padding-5*slotSize, "TABARDSLOT")
        end

        if slot then
            slot:SetScript("OnClick", function ()
                CURRENT_SLOT = tostring(i)
                SelectSlotFilter()
            end)
            frame[i] = slot;
        end
    end
end

function CreateSlot(x, y, name)
    local slot = CreateFrame("Button", name, TransmogWindow.modelhub);
    slot:SetPoint("TOPLEFT", x, y)
    slot:SetSize(slotSize, slotSize)
    slot:SetHighlightTexture("Interface\\Buttons\\CheckButtonHilight")

    local texture = slot:CreateTexture(nil, "ARTWORK", nil)
    SetTemplate(slot)
    slot.texture = texture;

    local reset = CreateFrame("Button", name..".reset", slot, "UIPanelCloseButton")
    reset:SetSize(slot:GetWidth()/3, slot:GetHeight()/3)
    if name == "MAINHANDSLOT" or name == "SECONDARYHANDSLOT" or name == "RANGEDSLOT" then
        reset:SetPoint("TOPRIGHT", 0, slot:GetWidth()/3);
    else
        reset:SetPoint("TOPRIGHT", slot:GetWidth()/3, 0);
    end

    slot.reset = reset
    slot.reset:Hide()

    slot.id = 0
    return slot;
end

function LoadSlotIcons()
    for i = 0, 18 do
        SetSlotToBaseline(i)
    end
end

function SetSlotToBaseline(slot)
    local slotname = GetIconSlotName(slot)
    if slotname then
        local itemID = GetInventoryItemID("player", slot+1)

        if not itemID then
            itemID = 0
        end

        TransmogWindow.modelhub.slots[slot].reset:Hide()
        TransmogWindow.modelhub.slots[slot].id = itemID
        
        if TransmogWindow.modelhub.slots[slot].appearance == 0 then
            TransmogWindow.modelhub.slots[slot].appearance = TransmogWindow.modelhub.slots[slot].id
        end

        _,link,_,_,_,_,_,_,invtype,icon = GetItemInfo(TransmogWindow.modelhub.slots[slot].appearance);
        SetSlotIcon(slot, icon, TransmogWindow.modelhub.slots[slot].appearance)
    end
end

function SetSlotIcon(slot, icon, itemid)
    TransmogWindow.modelhub.slots[slot].reset:Hide()
    TransmogWindow.modelhub.slots[slot].texture:SetTexture(icon)
    TransmogWindow.modelhub.slots[slot].texture:SetAllPoints();

    local change = TransmogWindow.modelhub.slots[slot].id == tonumber(itemid)
    if change then
        TransmogWindow.modelhub.slots[slot]:SetBackdrop(nil)
        TransmogWindow.modelhub.slots[slot].reset:Hide()
    else
        TransmogWindow.modelhub.slots[slot].appearance = itemid
        PENDING_CHANGES[slot] = itemid
    end
    
    if TransmogWindow.modelhub.slots[slot].id ~= TransmogWindow.modelhub.slots[slot].appearance then
        local backdrop = {
            edgeFile = "Interface\\Buttons\\WHITE8x8",
            tileEdge = false,
            edgeSize = 2
        }
        
        TransmogWindow.modelhub.slots[slot]:SetBackdrop(backdrop)
        TransmogWindow.modelhub.slots[slot]:SetBackdropBorderColor(147/255, 112/255, 219/255, 1)

        TransmogWindow.modelhub.slots[slot].reset:Show()
        TransmogWindow.modelhub.slots[slot].reset:SetScript("OnClick", function()
            PENDING_CHANGES[slot] = TransmogWindow.modelhub.slots[slot].id
            TransmogWindow.modelhub.slots[slot].appearance = TransmogWindow.modelhub.slots[slot].id
            SetSlotToBaseline(slot)
        end)
    end
    RedrawModel()
    ShowAcceptIfPending()
end

function GetIconSlotName(i) 
    if i == 0 then -- head
        return "HEADSLOT"
    elseif i == 2 then -- shoulder
        return "SHOULDERSLOT"
    elseif i == 3 then -- shirt
        return "SHIRTSLOT"
    elseif i == 4 then -- chest
        return "CHESTSLOT"
    elseif i == 5 then -- waist
        return "WAISTSLOT"
    elseif i == 6 then -- legs
        return "LEGSSLOT"
    elseif i == 7 then -- feet
        return "FEETSLOT"
    elseif i == 8 then -- wrist
        return "WRISTSLOT"
    elseif i == 9 then -- hands
        return "HANDSSLOT"
    elseif i == 14 then -- back
        return "BACKSLOT"
    elseif i == 15 then -- mh
        return "MAINHANDSLOT"
    elseif i == 16 then -- oh
        return "SECONDARYHANDSLOT"
    elseif i == 17 then -- ranged
        return "RANGEDSLOT"
    elseif i == 18 then -- tabard
        return "TABARDSLOT"
    end
end

function InvTypeToSlot(invType)
    if invType == "INVTYPE_HEAD" then
        return 0;
    elseif invType == "INVTYPE_SHOULDER" then
        return 2;
    elseif invType == "INVTYPE_BODY" then
        return 3;
    elseif invType == "INVTYPE_CHEST" then
        return 4;
    elseif invType == "INVTYPE_ROBE" then
        return 4;
    elseif invType == "INVTYPE_WAIST" then
        return 5;
    elseif invType == "INVTYPE_LEGS" then
        return 6;
    elseif invType == "INVTYPE_FEET" then
        return 7;
    elseif invType == "INVTYPE_WRIST" then
        return 8;
    elseif invType == "INVTYPE_HAND" then
        return 9;
    elseif invType == "INVTYPE_CLOAK" then
        return 14;
    elseif invType == "INVTYPE_WEAPON" then
        return tonumber(CURRENT_SLOT);
    elseif invType == "INVTYPE_SHIELD" then
        return 17;
    elseif invType == "INVTYPE_2HWEAPON" then
        return 16;
    elseif invType == "INVTYPE_WEAPONMAINHAND" then
        return 16;
    elseif invType == "INVTYPE_WEAPONOFFHAND" then
        return 17;
    elseif invType == "INVTYPE_HOLDABLE" then
        return 17;
    elseif invType == "INVTYPE_RANGED" then
        return 18;
    elseif invType == "INVTYPE_THROWN" then
        return 18;
    elseif invType == "INVTYPE_RANGEDRIGHT" then
        return 18;
    end
end

function ShowAcceptIfPending()
    if next(PENDING_CHANGES) then
        TransmogWindow.modelhub.accept:Show()
    else
        TransmogWindow.modelhub.accept:Hide()
    end
end

function SendTransmogRequestsForPending()
    for i = 0, 18 do
        local change = PENDING_CHANGES[i]
        if change then
            PushForgeMessage(ForgeTopic.APPLY_XMOG, i .. ";" .. change);
        end
    end
    if CURRENT_SET and CURRENT_SET_NAME then
        PushForgeMessage(ForgeTopic.SAVE_XMOG_SET, CURRENT_SET..";"..CURRENT_SET_NAME)
    end
end

StaticPopupDialogs["REQUEST_XMOG_SET_NAME"] = {
  text = "Do you want to greet the world today?",
  button1 = "Accept",
  button2 = "Cancel",
  OnShow = function(self, data)
    self.editBox:SetText("name your set")
  end,
  OnAccept = function(self, data, data2)
    local text = self.editBox:GetText()
    AcceptSetName(text)
  end,
  EditBoxOnEscapePressed  = function (self, input)
    self:GetParent():Hide();
  end,
  EditBoxOnEnterPressed = function (self, input)
    local text = self:GetParent().editBox:GetText()
    self:GetParent():Hide();
    AcceptSetName(text)
  end,
  timeout = 0,
  hideOnEscape = 1,
  hasEditBox = true,
  preferredIndex = 3,  -- avoid some UI taint, see http://www.wowace.com/announcements/how-to-avoid-some-ui-taint/
}

function AcceptSetName(name)
    CURRENT_SET_NAME = name
    SendTransmogRequestsForPending()
end

function LoadCurrentSet()
    PushForgeMessage(ForgeTopic.LOAD_XMOG_SET, tostring(CURRENT_SET))
end

function RedrawModel()
    TransmogWindow.modelhub.model:SetUnit("player");
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[0].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[2].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[3].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[4].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[5].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[6].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[7].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[8].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[9].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[14].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[15].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[16].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[17].appearance)
    TransmogWindow.modelhub.model:TryOn(TransmogWindow.modelhub.slots[18].appearance)
end