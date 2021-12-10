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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { FactionTemplateQuery, FactionTemplateRow } from "wotlkdata/wotlkdata/dbc/types/FactionTemplate";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { ArrayRefSystemNoCreate } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { makeRefNoCreate, RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { Faction } from "./Faction";

export enum FactionGroups {
      PLAYERS  = 0
    , ALLIANCE = 1
    , HORDE    = 2
    , MONSTERS = 3
}

export enum FactionFlags {
    // note: most of these are very recent and not implemented in core
    // do not add them until there is core support for them
    //RESPONDS_TO_CALL_FOR_HELP = 0x1,
    //BROADCAST_TO_ENEMIES_LOW  = 0x2,
    //BROADCAST_TO_ENEMIES_MED  = 0x4,
    //BROADCAST_TO_ENEMIES_HIGH = 0x8,
    //SEARCH_FOR_ENEMIES_LOW    = 0x10,
    //SEARCH_FOR_ENEMIES_MED    = 0x20,
    //SEARCH_FOR_ENEMIES_HIGH   = 0x40,
    //SEARCH_FOR_FRIENDS_LOW    = 0x80,
    //SEARCH_FOR_FRIENDS_MED    = 0x100,
    //SEARCH_FOR_FRIENDS_HIGH   = 0x200,
    //FLEE_FROM_CALL_TO_HELP    = 0x400,
    ASSIST_PLAYERS            = 0x800,
    ATTACK_PVP_ACTIVE       = 0x1000,
    HATES_ALL_EXCEPT_FRIENDS  = 0x2000,
}

export enum FactionTemplateValues {
    NEUTRAL_NON_AGGRESSIVE = 7,
    STORMWIND              = 11,
    NEUTRAL_HOSTILE        = 21,
    NEUTRAL_PASSIVE        = 35,
    IRONFORGE              = 57,
    GNOMEREGAN             = 64,
    RATCHET                = 69,
    UNDERCITY              = 71,
    DARNASSUS              = 79,
    ORGRIMMAR              = 85,
    THUNDER_BLUFF          = 105,
    BLOODSAIL_BUCCANEERS   = 119,
    BOOTY_BAY              = 121,
    DARKSPEAR_TROLLS       = 126,
    GADGETZAN              = 474,
    CENARION_CIRCLE        = 994,
    SILVERMOON             = 1604,
    EXODAR                 = 1639,
    SHATAR                 = 1741,
    KIRIN_TOR              = 2007,
}

export enum FactionTemplateGroupMask {
    PLAYERS  = 0x1,
    ALLIANCE = 0x2,
    HORDE    = 0x4,
    MONSTERS = 0x8,
}

export class FactionTemplate extends MainEntity<FactionTemplateRow> {
    get ID() { return this.row.ID.get() }

    get Flags() {
        return makeMaskCell32(FactionFlags,this, this.row.Flags);
    }

    get FriendGroup() {
        return makeMaskCell32(FactionTemplateGroupMask,this, this.row.FriendGroup);
    }

    get EnemyGroup() {
        return makeMaskCell32(FactionTemplateGroupMask,this, this.row.EnemyGroup);
    }

    get FactionGroup() {
        return makeMaskCell32(FactionTemplateGroupMask,this, this.row.FactionGroup);
    }

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
        return makeRefNoCreate(FactionTemplateValues,owner,cell,this);
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
            .FactionGroup.HORDE.set(true)
            .EnemyGroup.ALLIANCE.set(true)
            .EnemyGroup.MONSTERS.set(hostileToMonsters)
    }

    addAllianceGet(hostileToMonsters: boolean = true) {
        return this.addGet()
            .FactionGroup.ALLIANCE.set(true)
            .EnemyGroup.HORDE.set(true)
            .EnemyGroup.MONSTERS.set(hostileToMonsters)
    }

    addNeutralPassiveGet() {
        return this.addGet()
            .FriendGroup.ALLIANCE.set(true)
            .FriendGroup.HORDE.set(true)
            .FriendGroup.PLAYERS.set(true)
    }

    addNeutralHostileGet() {
        return this.addGet()
            .FactionGroup.MONSTERS.set(true)
            .EnemyGroup.HORDE.set(true)
            .EnemyGroup.ALLIANCE.set(true)
    }
}