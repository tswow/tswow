local hooksecurefunc, select, UnitBuff, UnitDebuff, UnitAura, UnitGUID,
      GetGlyphSocketInfo, tonumber, strfind
    = hooksecurefunc, select, UnitBuff, UnitDebuff, UnitAura, UnitGUID,
      GetGlyphSocketInfo, tonumber, strfind

local kinds = {
  spell = "Spell",
  item = "item_template",
  unit = "creature_template",
  achievement = "AchievementID",
  criteria = "CriteriaID",
  ability = "SkillLine",
  enchant = "EnchantID",
  gem = "GemID",
  macro = "MacroID",
  equipmentset = "EquipmentSetID",
}

local isClassicWow = select(4,GetBuildInfo()) < 20000

local is_gm = false
local itemExtra = {}
local creatureExtra = {}
local QueryFrame = CreateFrame("frame")
QueryFrame:RegisterEvent("CHAT_MSG_ADDON")
QueryFrame:RegisterEvent("PLAYER_ENTERING_WORLD")

-- https://stackoverflow.com/a/22831842
function string.starts(String,Start)
  return string.sub(String,1,string.len(Start))==Start
end

-- https://stackoverflow.com/a/1579673
function split(pString, pPattern)
  local Table = {}  -- NOTE: use {n = 0} in Lua-5.0
  local fpat = "(.-)" .. pPattern
  local last_end = 1
  local s, e, cap = pString:find(fpat, 1)
  while s do
     if s ~= 1 or cap ~= "" then
    table.insert(Table,cap)
     end
     last_end = e+1
     s, e, cap = pString:find(fpat, last_end)
  end
  if last_end <= #pString then
     cap = pString:sub(last_end)
     table.insert(Table, cap)
  end
  return Table
end

local function contains(table, element)
  for _, value in pairs(table) do
    if value == element then return true end
  end
  return false
end

local function addLine(tooltip, id, kind)
  if not id or id == "" then return end
  if type(id) == "table" and #id == 1 then id = id[1] end

  if (_G['tooltipInfo'][kind] ~= null) then
    if (_G['tooltipInfo'][kind][tonumber(id)] ~= null) then
        id = _G['tooltipInfo'][kind][tonumber(id)]
    end
end
  -- Check if we already added to this tooltip. Happens on the talent frame
  local frame, text
  for i = 1,15 do
    frame = _G[tooltip:GetName() .. "TextLeft" .. i]
    if frame then text = frame:GetText() end
    if text and string.find(text, kind .. ":") then return end
  end



  local left, right
  if type(id) == "table" then
    left = NORMAL_FONT_COLOR_CODE .. kind .. "s:" .. FONT_COLOR_CODE_CLOSE
    right = HIGHLIGHT_FONT_COLOR_CODE .. table.concat(id, ", ") .. FONT_COLOR_CODE_CLOSE
  else
    left = NORMAL_FONT_COLOR_CODE .. kind .. ":" .. FONT_COLOR_CODE_CLOSE
    right = HIGHLIGHT_FONT_COLOR_CODE .. id .. FONT_COLOR_CODE_CLOSE
  end

  tooltip:AddDoubleLine(left, right)
  tooltip:Show()
end

local curItemTooltip = nil
QueryFrame:SetScript("OnEvent", function(_,evt,_,wht,_,sender)
  -- don't accidentally spam other servers
  if evt == 'PLAYER_ENTERING_WORLD' then
    SendAddonMessage('','tswow_am_i_gm','WHISPER',UnitName('PLAYER'))
    return
  end

  -- don't allow other players to send these messages
  if sender ~= UnitName('PLAYER') then 
    return 
  end

  if wht == 'tswow_you_are_gm' then
    is_gm = true
  end

  local o = split(wht,":")
  if o[1] == "tswow_creature_response" then
    local id = tonumber(o[2])
    local faction = tonumber(o[3])


    local displayIds = {}
    for i=4,7 do
      local id = tonumber(o[i])
      if id ~= 0 then
        table.insert(displayIds,id)
      end
    end

    if creatureExtra[id] == nil then
      local unit = select(2, GameTooltip:GetUnit())
      if unit then
        local sel_id = tonumber(string.sub(UnitGUID("mouseover") or 0, 6, 12), 16)
        if sel_id == id then
          for k,v in ipairs(displayIds) do
            addLine(GameTooltip,v,"DisplayID "..k)
          end
          addLine(GameTooltip,faction,"Faction")
        end
      end
    end
    creatureExtra[id] = {faction = faction, displayids = displayIds}
  end

  if o[1] == "tswow_item_response" then
    local id = tonumber(o[2])
    local displayid = tonumber(o[3])

    if curItemTooltip ~= nil and itemExtra[id] == nil then
      local link = select(2, curItemTooltip:GetItem())
      if link then
        local link_id = string.match(link, "item:(%d*)") 
        if link_id and tonumber(link_id) == id then
          addLine(curItemTooltip, displayid, "DisplayID") 
        end
      end
    end

    itemExtra[id] = {displayid = displayid}
  end
end)

local function addLineByKind(self, id, kind)
  if not kind or not id then return end
  if kind == "spell" or kind == "enchant" or kind == "trade" then
    addLine(self, id, kinds.spell)
  elseif kind == "achievement" then
    addLine(self, id, kinds.achievement)
  elseif kind == "item" then
    addLine(self, id, kinds.item)
  elseif kind == "macro" then
    addLine(self, id, kinds.macro)
  end
end

-- All kinds
local function onSetHyperlink(self, link)
  local kind, id = string.match(link,"^(%a+):(%d+)")
  addLineByKind(self, id, kind)
end

hooksecurefunc(GameTooltip, "SetAction", function(self, slot)
  local kind, id = GetActionInfo(slot)
  addLineByKind(self, id, kind)
end)

hooksecurefunc(ItemRefTooltip, "SetHyperlink", onSetHyperlink)
hooksecurefunc(GameTooltip, "SetHyperlink", onSetHyperlink)
hooksecurefunc(firstRankToolTip, "SetHyperlink", onSetHyperlink)
hooksecurefunc(secondRankToolTip, "SetHyperlink", onSetHyperlink)

-- Spells
hooksecurefunc(GameTooltip, "SetUnitBuff", function(self,...)
	local id = select(11,UnitBuff(...))
	if id then addLine(self,id,kinds.spell) end
end)

hooksecurefunc(GameTooltip, "SetUnitDebuff", function(self,...)
	local id = select(11,UnitDebuff(...))
	if id then addLine(self,id,kinds.spell) end
end)

hooksecurefunc(GameTooltip, "SetUnitAura", function(self,...)
	local id = select(11,UnitAura(...))
	if id then addLine(self,id,kinds.spell) end
end)

GameTooltip:HookScript("OnTooltipSetSpell", function(self)
	local id = select(3,self:GetSpell())
	if id then addLine(self,id,kinds.spell) end
end)

hooksecurefunc("SetItemRef", function(link, ...)
  local id = tonumber(link:match("spell:(%d+)"))
  addLine(ItemRefTooltip, id, kinds.spell)
end)

GameTooltip:HookScript("OnTooltipSetSpell", function(self)
  local id = select(2, self:GetSpell())
  addLine(self, id, kinds.spell)
end)

-- NPCs
GameTooltip:HookScript("OnTooltipSetUnit", function(self)
  local unit = select(2, self:GetUnit())

  if unit then
    local guid = UnitGUID(unit) or ""
    local id = tonumber(string.sub(UnitGUID("mouseover") or 0, 6, 12), 16)
    
    if id ~= 0 and guid:match("%a+") ~= "Player" then addLine(GameTooltip, id, kinds.unit) end

    if id ~= nil then
      if creatureExtra[id] == nil then
        if is_gm then
          SendAddonMessage('','tswow_creature:'..id,"WHISPER",UnitName("PLAYER"))
        end
      else
        for k,v in ipairs(creatureExtra[id].displayids) do
          addLine(GameTooltip,v,"DisplayID "..k)
        end
        addLine(GameTooltip,creatureExtra[id].faction,"Faction")
      end
    end
  end
end)

-- Items
local function attachItemTooltip(self)
  curItemTooltip = self
  local link = select(2, self:GetItem())
  if not link then return end
  local itemString = string.match(link, "item:([%-?%d:]+)")
  if not itemString then return end
  local enchantid = ""
  --local bonusid = ""
  local gemid = ""
  local itemSplit = {}

  for v in string.gmatch(itemString, "(%d*:?)") do
    if v == ":" then
      itemSplit[#itemSplit + 1] = 0
    else
      itemSplit[#itemSplit + 1] = string.gsub(v, ":", "")
    end
  end
  local gems = {}
  if not isClassicWow then
      for i=1, 4 do
      local _,gemLink = GetItemGem(link, i)
      if gemLink then
        local gemDetail = string.match(gemLink, "item[%-?%d:]+")
        gems[#gems + 1] = string.match(gemDetail, "item:(%d+):")
      elseif flags == 256 then
        gems[#gems + 1] = "0"
      end
    end
  end
  local id = string.match(link, "item:(%d*)")
  if (id == "" or id == "0") and TradeSkillFrame ~= nil and TradeSkillFrame:IsVisible() and GetMouseFocus().reagentIndex then
    local selectedRecipe = TradeSkillFrame.RecipeList:GetSelectedRecipeID()
    for i = 1, 8 do
      if GetMouseFocus().reagentIndex == i then
        id = C_TradeSkillUI.GetRecipeReagentItemLink(selectedRecipe, i):match("item:(%d*)") or nil
        break
      end
    end
  end

  if id then
    addLine(self, id, kinds.item)
    if itemSplit[2] ~= 0 then
      enchantid = itemSplit[2]
     if itemSplit[2] ~= "0" then addLine(self, enchantid, kinds.enchant) end
    end
	
    if #gems ~= 0 then addLine(self, gems, kinds.gem) end

    if(itemExtra[tonumber(id)] == nil) then
      if is_gm then
        SendAddonMessage('','tswow_item:'..id,"WHISPER",UnitName("PLAYER"))
      end
    else
      addLine(self, itemExtra[tonumber(id)].displayid, "DisplayID")
    end
  end
end

GameTooltip:HookScript("OnTooltipSetItem", attachItemTooltip)
ItemRefTooltip:HookScript("OnTooltipSetItem", attachItemTooltip)
ItemRefShoppingTooltip1:HookScript("OnTooltipSetItem", attachItemTooltip)
ItemRefShoppingTooltip2:HookScript("OnTooltipSetItem", attachItemTooltip)
ShoppingTooltip1:HookScript("OnTooltipSetItem", attachItemTooltip)
ShoppingTooltip2:HookScript("OnTooltipSetItem", attachItemTooltip)

-- Achievement Frame Tooltips
local f = CreateFrame("frame")
f:RegisterEvent("ADDON_LOADED")
f:SetScript("OnEvent", function(_, _, what)
  if what == "Blizzard_AchievementUI" then
    for i,button in ipairs(AchievementFrameAchievementsContainer.buttons) do
      button:HookScript("OnEnter", function()
        GameTooltip:SetOwner(button, "ANCHOR_NONE")
        GameTooltip:SetPoint("TOPLEFT", button, "TOPRIGHT", 0, 0)
        addLine(GameTooltip, button.id, kinds.achievement)
        GameTooltip:Show()
      end)
      button:HookScript("OnLeave", function()
        GameTooltip:Hide()
      end)

      local hooked = {}
      hooksecurefunc("AchievementButton_GetCriteria", function(index, renderOffScreen)
        local frame = _G["AchievementFrameCriteria" .. (renderOffScreen and "OffScreen" or "") .. index]
        if frame and not hooked[frame] then
          frame:HookScript("OnEnter", function(self)
            local button = self:GetParent() and self:GetParent():GetParent()
            if not button or not button.id then return end
            local criteriaid = select(10, GetAchievementCriteriaInfo(button.id, index))
            if criteriaid then
              GameTooltip:SetOwner(button:GetParent(), "ANCHOR_NONE")
              GameTooltip:SetPoint("TOPLEFT", button, "TOPRIGHT", 0, 0)
              addLine(GameTooltip, button.id, kinds.achievement)
              addLine(GameTooltip, criteriaid, kinds.criteria)
              GameTooltip:Show()
            end
          end)
          frame:HookScript("OnLeave", function()
            GameTooltip:Hide()
          end)
          hooked[frame] = true
        end
      end)
    end
  end
end)
