-- Fix gossips with code entry prompt not correctly submitting said code if closed by pressing Enter
do
    StaticPopupDialogs["GOSSIP_ENTER_CODE"].EditBoxOnEnterPressed = function(self, data)
        local parent = self:GetParent();
        SelectGossipOption(data, parent.editBox:GetText(), true);
        parent:Hide();
    end
end
