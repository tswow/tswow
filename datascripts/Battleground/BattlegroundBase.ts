import { DBC, finish, LUAXML, SQL } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { DummyCell } from "wotlkdata/cell/cells/DummyCell";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";
import { PendingCell } from "wotlkdata/cell/cells/PendingCell";
import { CellSystemTop, LocSystem } from "wotlkdata/cell/systems/CellSystem";
import { Language, Languages } from "wotlkdata/dbc/Localization";
import { BattlemasterListQuery, BattlemasterListRow } from "wotlkdata/dbc/types/BattlemasterList";
import { iterLocConstructor, loc_constructor } from "wotlkdata/primitives";
import { all, gt, neq } from "wotlkdata/query/Relations";
import { battleground_templateRow } from "wotlkdata/sql/types/battleground_template";
import { Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";

export class BattlegroundType<T> extends EnumCell<T> {
    get Battleground() { return this.value(3)}
    get Arena()        { return this.value(4)}
}

export class DescriptionCell<T extends BattlegroundBase> extends Cell<string,T> {
    protected lang: Language;

    constructor(owner: T, lang: Language) {
        super(owner);
        this.lang = lang;
    }

    exists() {
        let descs = descriptions[this.owner.ID];
        return descs !== undefined && descs[this.lang] !== undefined;
    }
    get(): string {
        let descs = descriptions[this.owner.ID];
        if(!descs) return '';
        let localized = descs[this.lang];
        return localized || '';
    }

    set(value: string) {
        if(!descriptions[this.owner.ID]) {
            descriptions[this.owner.ID] = {}
        }
        descriptions[this.owner.ID][this.lang] = value;
        return this.owner;
    }
}

export class BattlegroundDescription<T extends BattlegroundBase> extends LocSystem<T> {
    lang(lang: Language): Cell<string, T> & PendingCell {
        return new DescriptionCell(this.owner, lang);
    }
    get mask(): Cell<number, T> {
        return new DummyCell(this.owner,0);
    }
    set(con: loc_constructor): T {
        iterLocConstructor(con,(lang,value)=>{
            this.lang(lang).set(value);
        })
        return this.owner;
    }
}

export class BattlegroundBase extends CellSystemTop {
    dbc_row: BattlemasterListRow
    sql_row: battleground_templateRow;
    get ID() { return this.sql_row.ID.get(); }
    get Name() { return this.wrapLoc(this.dbc_row.Name); }
    get Description() { return new BattlegroundDescription(this); }
    get Type() { return new BattlegroundType(this, this.dbc_row.InstanceType); }
    get MaxGroupSize() { return this.wrap(this.dbc_row.MaxGroupSize); }
    get HolidayWorldState() { return this.wrap(this.dbc_row.HolidayWorldState); }
    get Weight() { return this.wrap(this.sql_row.Weight); }
    get PlayersPerTeam() { return new MinMaxCell(this,
              this.sql_row.MinPlayersPerTeam
            , this.sql_row.MaxPlayersPerTeam
        ); }
    get Level() {
        return new MinMaxCell(this,
          new MulticastCell(this,
            [this.sql_row.MinLvl, this.dbc_row.Minlevel])
        , new MulticastCell(this,
            [this.sql_row.MaxLvl, this.dbc_row.Maxlevel])
        );
    }

    constructor(dbc_row: BattlemasterListRow, sql_row: battleground_templateRow) {
        super();
        this.dbc_row = dbc_row;
        this.sql_row = sql_row;
    }
}

export function filterBgsBase(query: BattlemasterListQuery) {
    return DBC.BattlemasterList
        .filter(query)
        .map(dbc=>
            ({dbc,sql:SQL.battleground_template.find({ID:dbc.ID.get()})})
        )
        .filter(({sql,dbc})=>sql!==undefined)
}

export function createBgBase(mod: string, id: string) {
    let nid = Ids.BattleMasterList.id(mod,id)
    let bg = new BattlegroundBase(
           DBC.BattlemasterList.add(nid)
        ,  SQL.battleground_template.add(nid)
    )
    .MaxGroupSize.set(5)
    .PlayersPerTeam.set(1,10)
    .Level.set(1,80)
    .Type.Battleground.set()
    .HolidayWorldState.set(0)
    bg.dbc_row.MapID.set([-1,-1,-1,-1,-1,-1,-1,-1])
    bg.sql_row
        .HordeStartLoc.set(0)
        .HordeStartO.set(0)
        .AllianceStartLoc.set(0)
        .AllianceStartO.set(0)
    return {dbc:bg.dbc_row,sql:bg.sql_row};
}

const descriptions: {[key: number]: /*description:*/ loc_constructor}= {}
finish('bg-descriptions',()=>{
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