import { finish } from "../../../data";
import { loc_constructor } from "../../../data/primitives";
import { LUAXML } from "../../luaxml/LUAXML";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { LocValue } from "../Misc/LocValueCell";

export class BattlefieldStatInfoField<T> {
    constructor(owner: T)
    {
        this.owner = owner;
        this.name = new LocValue<T>(owner);
        this.tooltip = new LocValue<T>(owner);
    }

    static setOwner<T>(owner: T, field: BattlefieldStatInfoField<any>) {
        field.owner = owner;
        // @ts-ignore
        field.name.owner = owner;
        // @ts-ignore
        field.tooltip.owner = owner;
    }

    set(name: loc_constructor, icon: string | undefined, tooltip: loc_constructor)
    {
        this.icon = icon === null ? undefined : icon;
        this.name.set(name);
        this.tooltip.set(tooltip)
        return this.owner;
    }

    get Name() { return this.name; }
    get Tooltip() { return this.tooltip; }
    get Icon() { return new CellBasic(this.owner, ()=>this.icon, (val)=>this.icon = val); }

    objectify()
    {
        return { name: this.name.objectify(), icon: this.icon, tooltip: this.tooltip.objectify() }
    }

    protected owner: T
    protected icon?: string;
    protected name: LocValue<T>
    protected tooltip: LocValue<T>
}

export class BattlefieldStatInfoBase<T> {
    protected id: number;
    protected count?: number = undefined;
    protected overrides: {[key: string]: BattlefieldStatInfoField<any>} = {}
    protected owner: T
    constructor(owner: T, id: number)
    {
        this.owner = owner;
        this.id = id;
    }
    protected get_override(name: string): BattlefieldStatInfoField<T>
    {
        // @ts-ignore
        return this.overrides[name] || (this.overrides[name] = new BattlefieldStatInfoField(this.owner));
    }

    static setOwner<T>(info: BattlefieldStatInfoBase<T>, owner: T) {
        for(let value of Object.values(info.overrides))
        {
            BattlefieldStatInfoBase.setOwner(info,owner);
        }
        // @ts-ignore
        info.owner = owner;
    }

    forEach(callback: (key: string, field: BattlefieldStatInfoField<T>) => void) {
        Object.entries(this.overrides).forEach(([key,field])=> callback(key,field))
    }

    map<V>(callback: (key: string, field: BattlefieldStatInfoField<T>) => V) {
        return Object.entries(this.overrides).map(([key,value]) => callback(key,value));
    }

    get CustomAttr1() { return this.get_override('CUSTOM_ATTR_1'); }
    get CustomAttr2() { return this.get_override('CUSTOM_ATTR_2'); }
    get CustomAttr3() { return this.get_override('CUSTOM_ATTR_3'); }
    get CustomAttr4() { return this.get_override('CUSTOM_ATTR_4'); }
    get CustomAttr5() { return this.get_override('CUSTOM_ATTR_5'); }
    get CustomAttr6() { return this.get_override('CUSTOM_ATTR_6'); }
    get CustomAttr7() { return this.get_override('CUSTOM_ATTR_7'); }

    get Count() { return new CellBasic(this.owner, ()=>this.count, (val)=>this.count=val)}
    get ID() { return this.id; }

};

export class BattlefieldStatInfo extends BattlefieldStatInfoBase<BattlefieldStatInfo> {
}

let statInfoOverrides: {[key: string]: BattlefieldStatInfo} = {}
export class BattlefieldStatInfoRegistryClass {
    get(map: number): BattlefieldStatInfo {
        let info = (statInfoOverrides[map] || (statInfoOverrides[map] = new BattlefieldStatInfoBase<BattlefieldStatInfo>(undefined,map)))
        BattlefieldStatInfoBase.setOwner(info,info);
        return info;
    }
}
export const BattlefieldStatInfoRegistry = new BattlefieldStatInfoRegistryClass();

finish('stat-info-overrides', ()=>{
    let entries = Object.entries(statInfoOverrides);
    if(entries.length == 0) {
        return;
    }
    let str = 
`
local cur_map_id = "0"

local BG_SIZE_OVERRIDES = {}
local BG_VALUE_OVERRIDES = {}

${entries
    .filter(([key,value])=>value.Count.get() !== undefined)
    .map(([key,value])=>`BG_SIZE_OVERRIDES["${key}"] = ${value.Count.get()}`)
    .join('\n')
}

${entries
    .map(([key,value])=>value
        .map((fieldName,field)=>`BG_VALUE_OVERRIDES["${key}:${fieldName}"] = {\n    {${field.Name
            .map((l,v)=>`${l} = "${v.get()}"`).join(',')}},\n    ${field.Icon.get() === undefined ? 'nil' : `"${field.Icon.get()}"`},\n    {${field.Tooltip
            .map((l,v)=>`${l} = "${v.get()}"`).join(',')}}\n}`)
        .join('\n') )
    .join('\n')}\n

local _GetNumBattlefieldStats = GetNumBattlefieldStats
function GetNumBattlefieldStats()
    local val = BG_SIZE_OVERRIDES[cur_map_id]
    if val == nil then
        return _GetNumBattlefieldStats()
    end
    return val
end

local _GetBattlefieldStatInfo = GetBattlefieldStatInfo
function GetBattlefieldStatInfo(index)
    local val = BG_VALUE_OVERRIDES[cur_map_id .. ":CUSTOM_ATTR_" .. index]
    if val == nil then
        return _GetBattlefieldStatInfo(index)
    end
    return val[1][GetLocale()],val[2],val[3][GetLocale()]
end

local frame = CreateFrame("Frame")
frame:RegisterEvent("CHAT_MSG_ADDON")
frame:SetScript("OnEvent", function(self, event, prefix, message, type, sender)
    if sender == UnitName("player") and prefix == "tsmp" then
        cur_map_id = message
    end
end)
SendAddonMessage("tcmp","","WHISPER",UnitName("player"))
`
    LUAXML.file('Interface/FrameXML/WorldStateFrame.lua').before(1,str)
})