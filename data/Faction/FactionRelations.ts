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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { FactionTemplateRow } from "wotlkdata/dbc/types/FactionTemplate";
import { Faction } from "./Faction";

export type FactionGroups = 
    'PLAYERS' | 
    'HORDE' | 
    'ALLIANCE' | 
    'MONSTERS'

export class FactionRelations extends Subsystem<Faction> {
    row: FactionTemplateRow;

    constructor(owner: Faction, row: FactionTemplateRow) {
        super(owner);
        this.row = row;
    }

    addFriendGroups(...groups: FactionGroups[]) {
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
        return this.owner;
    }

    addOwnGroup(...groups : FactionGroups[]) {
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
        return this.owner;
    }

    addEnemyGroup(...groups : FactionGroups[]){
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
        return this.owner;
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
        return this.owner;
    }

    /**
     * @param factionId The faction TEMPLATE id
     */
    addEnemyFaction(factionId: number) {
        this.row.Enemies.setIndex(this.enemyId(),factionId);
        return this.owner;
    }
}