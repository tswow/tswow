import { DBC, finish, LUAXML } from "wotlkdata";
import { Languages } from "wotlkdata/wotlkdata/dbc/Localization";
import { all, gt, neq } from "wotlkdata/wotlkdata/query/Relations";
import { BuildArgs } from "wotlkdata/wotlkdata/Settings";
import { descriptions } from "./BattleroundDescriptions";

finish('bg-descriptions',()=>{
    if(!BuildArgs.WRITE_CLIENT) return;
    LUAXML.file('Interface/FrameXML/PVPBattlegroundFrame.lua')
        .before(
            'function PVPBattleground_UpdateBattlegrounds'
        ,
`local custom_battlegrounds = {
    ${
        DBC.BattlemasterList.filter({ID:all(neq(30),neq(32),gt(11)),InstanceType:3})
           .map(x=>
                `[${x.ID.get()}]={`
                + `["description"]={${Languages.map(lang=>
                      `["${lang}"]="`
                    + `${(descriptions[x.ID.get()]||{})[lang]||"No Description"}"`
                )},["enUS"]="${(descriptions[x.ID.get()]||{})['enGB']||'No Description'}"},`
                + `["min_level"]=${x.Minlevel.get()},`
                + `["max_level"]=${x.Maxlevel.get()},`
                //+ `["is_arena"]=${DBC.Map.findById(x.MapID.getIndex(0)).InstanceType.get() == 4}`
                + `}`
            )
            .join(',\n    ')
    }
}
_GetBattlegroundInfo = GetBattlegroundInfo
function GetBattlegroundInfo(index)
	local player_level = UnitLevel("player")
	local localizedName,canEnter,isHoliday,isRandom,BattleGroundID = _GetBattlegroundInfo(index)
    if BattleGroundID == nil then return _GetBattlegroundInfo(index) end
	local custom_data = custom_battlegrounds[BattleGroundID]
    if custom_data ~= nil then
        if      player_level >= custom_data["min_level"]
            and player_level <= custom_data["max_level"]
        then
            canEnter = 1
        else
            canEnter = nil
        end
    end
    -- todo: we don't yet support custom bgs to have holiday bonuses or be random
	if custom_data ~= nil and isHoliday == nil then isHoliday = false end
	if custom_data ~= nil and isRandom == nil then isRandom = false end
	return localizedName,canEnter,isHoliday,isRandom,BattleGroundID
end

_GetBattlefieldInfo = GetBattlefieldInfo
function GetBattlefieldInfo()
	local index = PVPBattlegroundFrame.selectedBG
	local BGname, canEnter, isHoliday, isRandom, BattleGroundID = GetBattlegroundInfo(index);
	if BattleGroundID == nil then return _GetBattlefieldInfo() end
	local custom_data = custom_battlegrounds[BattleGroundID]
	local mapName, mapDescription, maxGroup = _GetBattlefieldInfo()
	if custom_data ~= nil then mapDescription = custom_data["description"][GetLocale()] end
	return mapName, mapDescription, maxGroup
end
`
)
});