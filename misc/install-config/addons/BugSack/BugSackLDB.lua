--[[

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

]]

if not BugSack then return end
if not LibStub then return end
local ldb = LibStub:GetLibrary("LibDataBroker-1.1", true)
if not ldb then return end

local BugSack = BugSack
local BugGrabber = BugGrabber
local L = LibStub("AceLocale-3.0"):GetLocale("BugSack")

BugSackLDB = ldb:NewDataObject("BugSack", {
	type = "data source",
	text = "0",
	icon = "Interface\\AddOns\\BugSack\\Media\\icon",
})
local BugSackLDB = BugSackLDB

function BugSackLDB.OnClick(self, button)
	if button == "RightButton" then
		InterfaceOptionsFrame_OpenToCategory("BugSack")
	else
		if IsShiftKeyDown() then
			ReloadUI()
		elseif IsAltKeyDown() then
			BugSack:Reset()
		elseif BugSackFrame and BugSackFrame:IsShown() then
			BugSack:CloseSack()
		else
			BugSack:OpenSack()
		end
	end
end

-- Invoked from BugSack
function BugSackLDB:Update()
	local count = #BugSack:GetErrors(BugGrabber:GetSessionId())
	self.text = count
	self.icon = count == 0 and "Interface\\AddOns\\BugSack\\Media\\icon" or "Interface\\AddOns\\BugSack\\Media\\icon_red"
end

do
	local hint = L["|cffeda55fClick|r to open BugSack with the last bug. |cffeda55fShift-Click|r to reload the user interface. |cffeda55fAlt-Click|r to clear the sack."]
	local line = "%d. %s (x%d)"
	function BugSackLDB.OnTooltipShow(tt)
		local errs = BugSack:GetErrors(BugGrabber:GetSessionId())
		if #errs == 0 then
			tt:AddLine(L["You have no bugs, yay!"])
		else
			tt:AddLine("BugSack")
			local pattern = "^(.-)\n"
			local counter = 1
			for i, err in next, errs do
				if not BugSack.db.filterAddonMistakes or (BugSack.db.filterAddonMistakes and err.type == "error") then
					local m = err.message
					if type(m) == "table" then m = table.concat(m, "") end
					m = select(3, m:find(pattern))
					tt:AddLine(line:format(counter, BugSack:ColorError(m), err.counter))
					counter = counter + 1
					if counter > 10 then break end
				end
			end
		end
		tt:AddLine(" ")
		tt:AddLine(hint, 0.2, 1, 0.2, 1)
	end
end

local f = CreateFrame("Frame")
f:SetScript("OnEvent", function()
	local icon = LibStub("LibDBIcon-1.0", true)
	if not icon then return end
	if not BugSackLDBIconDB then BugSackLDBIconDB = {} end
	icon:Register("BugSack", BugSackLDB, BugSackLDBIconDB)
end)
f:RegisterEvent("PLAYER_LOGIN")

-- vim:set ts=4:
