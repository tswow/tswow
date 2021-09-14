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
import { DBC } from "wotlkdata";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { FactionTemplateRow } from "wotlkdata/dbc/types/FactionTemplate";
import { Ids } from "../Misc/Ids";
import { Faction } from "./Faction";

export type FactionGroups =
    'PLAYERS' |
    'HORDE' |
    'ALLIANCE' |
    'MONSTERS'

export class FactionTemplate extends CellSystemTop {
    @Transient
    readonly row: FactionTemplateRow;

    constructor(row: FactionTemplateRow) {
        super();
        this.row = row;
    }

    addFriendGroups(groups: FactionGroups[]) {
        for(const group of groups) {
            switch(group) {
                case 'PLAYERS':
                    this.row.FriendGroup
                        .set(this.row.FriendGroup.get() | 1);
                    break;
                case 'ALLIANCE':
                    this.row.FriendGroup
                        .set(this.row.FriendGroup.get() | 2);
                    break;
                case 'HORDE':
                    this.row.FriendGroup
                        .set(this.row.FriendGroup.get() | 4);
                    break;
                case 'MONSTERS':
                    this.row.FriendGroup
                        .set(this.row.FriendGroup.get() | 8);
                    break
            }
        }
        return this;
    }

    addOwnGroup(groups : FactionGroups[]) {
        for(const group of groups) {
            switch(group) {
                case 'PLAYERS':
                    this.row.FactionGroup
                        .set(this.row.FactionGroup.get() | 1);
                    break;
                case 'ALLIANCE':
                    this.row.FactionGroup
                        .set(this.row.FactionGroup.get() | 2);
                    break;
                case 'HORDE':
                    this.row.FactionGroup
                        .set(this.row.FactionGroup.get() | 4);
                    break;
                case 'MONSTERS':
                    this.row.FactionGroup
                        .set(this.row.FactionGroup.get() | 8);
                    break
            }
        }
        return this;
    }

    addEnemyGroup(groups : FactionGroups[]){
        for(const group of groups) {
            switch(group) {
                case 'PLAYERS':
                    this.row.EnemyGroup.set(this.row.EnemyGroup.get() | 1);
                    break;
                case 'ALLIANCE':
                    this.row.EnemyGroup.set(this.row.EnemyGroup.get() | 2);
                    break;
                case 'HORDE':
                    this.row.EnemyGroup.set(this.row.EnemyGroup.get() | 4);
                    break;
                case 'MONSTERS':
                    this.row.EnemyGroup.set(this.row.EnemyGroup.get() | 8);
                    break
            }
        }
        return this;
    }

    protected friendId() {
        for(let i=0;i<4;++i) {
            if(this.row.Friend.getIndex(i)===0) return i;
        }
        throw new Error(`No more free friend slots!`);
    }

    protected enemyId() {
        for(let i=0;i<4;++i) {
            if(this.row.Enemies.getIndex(i)===0) return i;
        }
        throw new Error(`No more free enemy slots!`);
    }

    /**
     * @param factionId The faction TEMPLATE id
     */
    addFriendFaction(factionId: number) {
        this.row.Friend.setIndex(this.friendId(),factionId);
        return this;
    }

    /**
     * @param factionId The faction TEMPLATE id
     */
    addEnemyFaction(factionId: number) {
        this.row.Enemies.setIndex(this.enemyId(),factionId);
        return this;
    }

    clear() {
        this.row
            .Flags.set(0)
            .Friend.set([0,0,0,0])
            .Enemies.set([0,0,0,0])
            .FriendGroup.set(0)
            .EnemyGroup.set(0)
        return this;
    }
}

export class FactionTemplates extends MultiRowSystem<FactionTemplate,Faction> {
    protected getAllRows(): FactionTemplate[] {
        return DBC.FactionTemplate.filter({Faction:this.owner.ID})
            .map(x=>new FactionTemplate(x))
    }
    protected isDeleted(value: FactionTemplate): boolean {
        return value.row.isDeleted()
    }

    addGet() {
        return new FactionTemplate(
            DBC.FactionTemplate.add(Ids.FactionTemplate.id()).Faction.set(this.owner.ID)
        )
        .clear()
    }

    addMod(callback: (faction: FactionTemplate)=>void = ()=>{}) {
        callback(this.addGet());
        return this.owner;
    }
}