local ForgedWoWMicrobarButton = CreateFrame("Button", "ForgedWoWMicrobarButton", MainMenuBarArtFrame, "MainMenuBarMicroButton");
LoadMicroButtonTextures(ForgedWoWMicrobarButton, "Help");
ForgedWoWMicrobarButton:SetNormalTexture(CONSTANTS.UI.NORMAL_TEXTURE_BTN)
ForgedWoWMicrobarButton:SetPushedTexture(CONSTANTS.UI.PUSHED_TEXTURE_BTN)
ForgedWoWMicrobarButton.tooltipText = MicroButtonTooltipText("Reforged Talents", "TOGGLETALENTS");
ForgedWoWMicrobarButton.newbieText = "View your Character & Reforged talents.";
ForgedWoWMicrobarButton:SetFrameLevel(1000);
ForgedWoWMicrobarButton:SetFrameLevel(1000);
ForgedWoWMicrobarButton:SetPoint("CENTER","TalentMicroButton","CENTER")
ForgedWoWMicrobarButton:SetScript("OnClick", function ()
    ToggleMainWindow();
end );

local function UpdateButtonState()
    local playerLevel = UnitLevel("player")
    if playerLevel < 10 then
        ForgedWoWMicrobarButton:Disable()
        ForgedWoWMicrobarButton:GetNormalTexture():SetVertexColor(0.5, 0.5, 0.5, 1) -- Cor cinza
        ForgedWoWMicrobarButton.tooltipText = "Unlock at Level 10"
    else
        ForgedWoWMicrobarButton:Enable()
        ForgedWoWMicrobarButton:GetNormalTexture():SetVertexColor(1, 1, 1, 1) -- Cor original
        ForgedWoWMicrobarButton.tooltipText = MicroButtonTooltipText("Reforged Talents", "TOGGLETALENTS")
    end
end

-- Define a função OnUpdate para o botão
ForgedWoWMicrobarButton:SetScript("OnUpdate", function(self, elapsed)
    UpdateButtonState()
end)

hooksecurefunc("UpdateMicroButtons", function()
   local playerLevel = UnitLevel("player")
  if playerLevel >= 10 then
    if TalentTreeWindow:IsShown() then
        PlaySound("TalentScreenOpen");
    else
        PlaySound("TalentScreenClose");
    end
   end
end);
