/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { SQL } from "wotlkdata/sql/SQLFiles";
import { smart_scriptsCreator, smart_scriptsRow } from "wotlkdata/sql/types/smart_scripts";
import { MainEntity } from "../Base/MainEntity";
import { ActionType } from "./ActionType";
import { AttachedScript } from "./AttachedScript";
import { EventType } from "./EventType";
import { TargetType } from "./TargetType";

function findId(type: number, entry: number) {
    let oldest = SQL.smart_scripts.filter(
        {source_type:type,entryorguid:entry}
    ).sort((a,b)=>b.id>a.id ? 1 : -1)[0];
    if(oldest===undefined) return 0;
    return oldest.id.get()+1;
}

export class SmartScript<T> extends MainEntity<smart_scriptsRow> {
    protected owner: T

    constructor(owner: T, row: smart_scriptsRow) {
        super(row);
        this.owner = owner;
    }

    static owner<T>(script: SmartScript<T>) : T {
        return script.owner;
    }

    get Chance() { return this.wrap(this.row.event_chance); }
    get Action() { return new ActionType<T>(this, this.row); }
    get Target() { return new TargetType<T>(this, this.row); }
    get Event() { return new EventType<T>(this, this.row); }

    up() { return this.owner; }

    get then() {
        let id = findId(this.row.source_type.get(),this.row.entryorguid.get());
        // @ts-ignore - Don't change name 'link'
        this.row._link = id;
        let sc = new SmartScript(this.owner, SQL.smart_scripts.add(this.row.entryorguid.get(),this.row.source_type.get(),id,0,EMPTY_SCRIPT));
        sc.row.event_type.set(61);
        return sc;
    }

    get free() : AttachedScript<T> {
        return new AttachedScript(()=>{
            let id = findId(this.row.source_type.get(),this.row.entryorguid.get());
            let sc = new SmartScript(this.owner, SQL.smart_scripts.add(this.row.entryorguid.get(),this.row.source_type.get(),id,0,EMPTY_SCRIPT));
            return sc;
        })
    }

    objectify() {
        return {
            action: this.Action.objectify(),
            target: this.Target.objectify(),
            event: this.Event.objectify(),
        }
    }
}

const EMPTY_SCRIPT : smart_scriptsCreator = {
    action_param1: 0,
    action_param2: 0,
    action_param3: 0,
    action_param4: 0,
    action_param5: 0,
    action_param6: 0,
    action_type: 0,
    comment: "",
    event_chance: 100,
    event_flags: 0,
    event_param1: 0,
    event_param2: 0,
    event_param3: 0,
    event_param4: 0,
    event_param5: 0,
    event_phase_mask:0,
    event_type: 0,
    target_o: 0,
    target_param1: 0,
    target_param2: 0,
    target_param3: 0,
    target_param4: 0,
    target_type: 0,
    target_x: 0,
    target_y: 0,
    target_z: 0,
}

export const SmartScripts = {
    creature<T>(entry: number, owner?: T) {
        let id = findId(0,entry);
        let sc = new SmartScript(owner, SQL.smart_scripts.add(entry,0,id,0,EMPTY_SCRIPT));
        return sc as SmartScript<T>;
    },

    uniqueCreature(guid: number, isChain: boolean = false) {
        let id = findId(0,-guid);
        return new SmartScript(undefined, SQL.smart_scripts.add(-guid,0,id,isChain ? id + 1 : 0,EMPTY_SCRIPT))
    },

    gameObject(entry: number, link: number = 0) {
        let id = findId(1,entry);
        return new SmartScript(undefined, SQL.smart_scripts.add(entry,1,id,link,EMPTY_SCRIPT));
    },

    uniqueGameObject(guid: number, link: number = 0) {
        let id = findId(1,-guid);
        return new SmartScript(undefined, SQL.smart_scripts.add(-guid,1,id,link,EMPTY_SCRIPT))
    },

    area(entry: number, link: number = 0) {
        let id = findId(2,entry);
        return new SmartScript(undefined, SQL.smart_scripts.add(entry,2,id,link,EMPTY_SCRIPT));
    },

    loadCreature(creature: number) {
        return SQL.smart_scripts.filter({entryorguid:creature,source_type:0}).map(x=>new SmartScript(undefined, x));
    },

    printCreature(creature: number) {
        const rows = SmartScripts.loadCreature(creature);
        if(rows.length===0) {
            console.log(`Creature has no script rots!`);
            return;
        }
        const roots = rows.filter(x=>x.Event.getType()!=='Link');

        if(roots.length===0) {
            console.log(`Creature has no root rows!`);
            return;
        }

        console.log(`\n == Scripts for ${creature} ==`)
        for(const root of roots) {
            let cur : SmartScript<any> = root;
            let chain = []
            while(cur.row.link.get() > 0) {
                const nxt = rows.find(x=>x.row.id === cur.row.link);
                if(!nxt) {
                    console.log(`Broken link!`);
                    break;
                }
                chain.push(nxt);
                cur = nxt;
            }

            console.log(``)
            console.log(`${root.Event.getType()}(${JSON.stringify(root.Event.getArguments())})`)
            console.log(`    target:${root.Target.getType()}(${JSON.stringify(root.Target.getArguments())})`)
            console.log(`    action:${root.Action.getType()}(${JSON.stringify(root.Action.getArguments())})`)
            chain.forEach((x)=>{
                console.log(`then`);
                console.log(`    target:${x.Target.getType()}(${JSON.stringify(x.Target.getArguments())})`)
                console.log(`    action:${x.Action.getType()}(${JSON.stringify(x.Action.getArguments())})`)
            });
        }

        return "";
    }

    // TODO timed
}