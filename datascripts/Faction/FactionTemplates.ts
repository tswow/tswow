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
import { Cell } from "wotlkdata/cell/cells/Cell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { FactionTemplateQuery, FactionTemplateRow } from "wotlkdata/dbc/types/FactionTemplate";
import { Table } from "wotlkdata/table/Table";
import { ArrayRefSystemNoCreate } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { Faction } from "./Faction";

export const FACTION_GROUPS = {
      PLAYERS  : 0
    , ALLIANCE : 1
    , HORDE    : 2
    , MONSTERS : 3
} as const

export class FactionFlags extends MaskCell32<FactionTemplate> {

    // Note: most of these are very recent, so tc hasn't implemented
    // them. Don't enable them here without core support

    //get RespondsToCallForHelp()  { return this.bit(0); }
    //get BroadcastToEnemiesLow()  { return this.bit(1); }
    //get BroadcastToEnemiesMed()  { return this.bit(2); }
    //get BroadcastToEnemiesHigh() { return this.bit(3); }

    //get SearchForEnemiesLow()    { return this.bit(4); }
    //get SearchForEnemiesMed()    { return this.bit(5); }
    //get SearchForEnemiesHigh()   { return this.bit(6); }

    //get SearchForFriendsLow()    { return this.bit(7); }
    //get SearchForFriendsMed()    { return this.bit(8); }
    //get SearchForFriendsHigh()   { return this.bit(9); }

    //get FleeFromCallToHelp()     { return this.bit(10); }

    get AssistPlayers()          { return this.bit(11); }
    get AttackPVPActive()        { return this.bit(12); }
    get HatesAllExceptFriends()  { return this.bit(13); }
}

export class FactionTemplateGroup extends MaskCell32<FactionTemplate> {
    get Players()  { return this.bit(0) }
    get Alliance() { return this.bit(1); }
    get Horde()    { return this.bit(2); }
    get Monsters() { return this.bit(3); }
}

export class FactionTemplate extends MainEntity<FactionTemplateRow> {
    get ID() { return this.row.ID.get() }

    get Flags() { return new FactionFlags(this, this.row.Flags); }

    get FriendGroup() { return new FactionTemplateGroup(this, this.row.FriendGroup); }
    get EnemyGroup() { return new FactionTemplateGroup(this, this.row.EnemyGroup); }
    get FactionGroup() { return new FactionTemplateGroup(this, this.row.FactionGroup); }

    get FriendFactions() {
        return new ArrayRefSystemNoCreate(this, 0, 4,
            (x)=>FactionTemplateRegistry.ref(this,this.wrapIndex(this.row.Friend,x))
        )
    }

    get EnemyFactions() {
        return new ArrayRefSystemNoCreate(this, 0, 4,
            (x)=>FactionTemplateRegistry.ref(this,this.wrapIndex(this.row.Enemies,x))
        )
    }
}

export class FactionTemplateRef<T> extends RefNoCreate<T,FactionTemplate> {}

export class FactionTemplateRegistryClass
    extends RegistryRowBase<
          FactionTemplate
        , FactionTemplateRow
        , FactionTemplateQuery
    >
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Table(): Table<any, FactionTemplateQuery, FactionTemplateRow> & { add: (id: number) => FactionTemplateRow; } {
        return DBC.FactionTemplate
    }
    protected ids(): DynamicIDGenerator {
        return Ids.FactionTemplate
    }
    Clear(entity: FactionTemplate): void {
        entity.EnemyGroup.clearAll()
            .FactionGroup.clearAll()
            .FriendFactions.clearAll()
            .FriendGroup.clearAll()
    }
    protected FindByID(id: number): FactionTemplateRow {
        return DBC.FactionTemplate.findById(id);
    }
    ID(e: FactionTemplate): number {
        return e.ID
    }
    protected EmptyQuery(): FactionTemplateQuery {
        return {}
    }
    protected Entity(r: FactionTemplateRow): FactionTemplate {
        return new FactionTemplate(r)
    }

    create(faction: number) {
        return new FactionTemplate(
                DBC.FactionTemplate.add(Ids.FactionTemplate.id())
                    .Faction.set(faction)
            )
            .EnemyGroup.clearAll()
            .FriendGroup.clearAll()
            .FactionGroup.clearAll()
            .EnemyFactions.clearAll()
            .FriendFactions.clearAll()
    }
}

export const FactionTemplateRegistry = new FactionTemplateRegistryClass();

export class FactionTemplates extends MultiRowSystem<FactionTemplate,Faction> {
    protected getAllRows(): FactionTemplate[] {
        return FactionTemplateRegistry.queryAll({Faction:this.owner.ID})
    }
    protected isDeleted(value: FactionTemplate): boolean {
        return value.row.isDeleted()
    }

    addGet() {
        return FactionTemplateRegistry.create(this.owner.ID)
    }

    addMod(callback: (faction: FactionTemplate)=>void = ()=>{}) {
        callback(this.addGet());
        return this.owner;
    }

    addHordeGet(hostileToMonsters: boolean = true) {
        return this.addGet()
            .FactionGroup.Horde.set(true)
            .EnemyGroup.Alliance.set(true)
            .EnemyGroup.Monsters.set(hostileToMonsters)
    }

    addAllianceGet(hostileToMonsters: boolean = true) {
        return this.addGet()
            .FactionGroup.Alliance.set(true)
            .EnemyGroup.Horde.set(true)
            .EnemyGroup.Monsters.set(hostileToMonsters)
    }

    addNeutralPassiveGet() {
        return this.addGet()
            .FriendGroup.Alliance.set(true)
            .FriendGroup.Horde.set(true)
            .FriendGroup.Players.set(true)
    }

    addNeutralHostileGet() {
        return this.addGet()
            .FactionGroup.Monsters.set(true)
            .EnemyGroup.Horde.set(true)
            .EnemyGroup.Alliance.set(true)
    }
}