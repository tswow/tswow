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
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { CellSystemTop } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SQLCellReadOnly } from "wotlkdata/wotlkdata/sql/SQLCell";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { smart_scriptsCreator, smart_scriptsRow } from "wotlkdata/wotlkdata/sql/types/smart_scripts";
import { Condition } from "../Conditions/Condition";
import { PercentCell } from "../Misc/PercentCell";
import { ActionType } from "./ActionType";
import { EventType } from "./EventType";
import { TargetType } from "./TargetType";

function findId(type: number, entry: number) {
    let oldest = SQL.smart_scripts.queryAll(
        {source_type:type,entryorguid:entry}
    ).sort((a,b)=>b.id>a.id ? 1 : -1)[0];
    if(oldest===undefined) return 0;
    return oldest.id.get()+1;
}

export class SmartScript extends CellSystemTop {
    @Transient
    readonly row: smart_scriptsRow

    constructor(row: smart_scriptsRow) {
        super();
        this.row = row;
    }

    get ConditionSelf() {
        return new Condition(this,
            22,
            this.row.id.get()+1,
            this.row.entryorguid.get(),
            this.row.source_type.get(),
            1
        )
    }

    get ConditionInvoker() {
        return new Condition(this,
            22,
            this.row.id.get()+1,
            this.row.entryorguid.get(),
            this.row.source_type.get(),
            0
        )
    }

    get Chance() {
        return new PercentCell(this,'[0-100]', true,this.wrap(this.row.event_chance));
    }
    get Action() { return new ActionType(this, this.row); }
    get Target() { return new TargetType(this, this.row); }
    get Event() { return new EventType(this, this.row); }

    get end() { return this.owner; }

    then() {
        // Find the last part of the existing chain and append to it
        let cur = this.row;
        while(cur.link.get()!==0) {
            cur = SQL.smart_scripts.query({
                entryorguid: this.row.entryorguid.get(),
                source_type: this.row.source_type.get(),
                id: cur.link.get()
            });

            if(cur===undefined) {
                throw new Error(`Broken SmartScript link from (` +
                    `entryorguid=${this.row.entryorguid.get()}, ` +
                    `source_type=${this.row.source_type.get()}, ` +
                    `id=${this.row.id.get()})`)
            }
        }

        let id = findId(cur.source_type.get(),cur.entryorguid.get());
        SQLCellReadOnly.set(cur.link,id);
        let sc = new SmartScript(SQL.smart_scripts
            .add(cur.entryorguid.get(),cur.source_type.get(),id,0,EMPTY_SCRIPT)
            .comment.set('tswow'));
        sc.row.comment.set('tswow');
        sc.row.event_type.set(61);
        return sc;
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
    creature(entry: number) {
        let id = findId(0,entry);
        return new SmartScript(SQL.smart_scripts.add(entry,0,id,0,EMPTY_SCRIPT).comment.set('tswow'));
    },

    uniqueCreature(guid: number, isChain: boolean = false) {
        let id = findId(0,-guid);
        return new SmartScript(SQL.smart_scripts.add(-guid,0,id,isChain ? id + 1 : 0,EMPTY_SCRIPT).comment.set('tswow'))
    },

    gameObject(entry: number, link: number = 0) {
        let id = findId(1,entry);
        return new SmartScript(SQL.smart_scripts.add(entry,1,id,link,EMPTY_SCRIPT).comment.set('tswow'));
    },

    uniqueGameObject(guid: number, link: number = 0) {
        let id = findId(1,-guid);
        return new SmartScript(SQL.smart_scripts.add(-guid,1,id,link,EMPTY_SCRIPT).comment.set('tswow'))
    },

    area(entry: number, link: number = 0) {
        let id = findId(2,entry);
        return new SmartScript(SQL.smart_scripts.add(entry,2,id,link,EMPTY_SCRIPT).comment.set('tswow'));
    },

    loadCreature(creature: number) {
        return SQL.smart_scripts.queryAll({entryorguid:creature,source_type:0}).map(x=>new SmartScript(x));
    },

    printCreature(creature: number) {
        const rows = SmartScripts.loadCreature(creature);
        console.log(rows.map(x=>"ID"+x.row.id.get()+" "+x.row.link.get()))
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
            let cur : SmartScript = root;
            let chain = []
            let isBroken = false;
            while(cur.row.link.get() > 0) {
                const nxt = rows.find(x=>x.row.id.get() === cur.row.link.get());
                if(!nxt) {
                    isBroken = true;
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
            if(isBroken) {
                console.log(`MISSING LINK: ${cur.row.link.get()}`);
            }
        }

        return "";
    }

    // TODO timed
}