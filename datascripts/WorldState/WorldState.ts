import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { WorldStateZoneSoundsRow } from "wotlkdata/wotlkdata/dbc/types/WorldStateZoneSounds";
import { AreaRegistry } from "../Area/Area";
import { WMOAreaRegistry } from "../Area/WMOArea";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RefNoCreate, RefStatic, StaticRegistry } from "../Refs/Ref";
import { SoundAmbienceRegistry } from "../Sound/SoundAmbience";
import { SoundProviderPreferenceRegistry } from "../Sound/SoundProviderPreferences";
import { ZoneIntroMusicRegistry } from "../Sound/ZoneIntroMusic";
import { ZoneMusicRegistry } from "../Sound/ZoneMusic";

// Note: There is no table containing WorldStates, so we just
// pretend there is one.

export class WorldStateSound extends MainEntity<WorldStateZoneSoundsRow> {
    get WorldState() { return this.row.WorldStateID.get(); }
    get TriggerValue() { return this.wrap(this.row.WorldStateValue); }
    get Area() { return AreaRegistry.ref(this, this.row.AreaID); }
    get WMOArea() { return WMOAreaRegistry.ref(this, this.row.WMOAreaID) }
    get ZoneIntroMusic() {
        return ZoneIntroMusicRegistry.ref(this, this.row.ZoneintroMusicID)
    }
    get ZoneMusic() {
        return ZoneMusicRegistry.ref(this, this.row.ZoneMusicID);
    }
    get SoundAmbience() {
        return SoundAmbienceRegistry.ref(this, this.row.SoundAmbienceID);
    }
    get SoundProviderPreferences() {
        return SoundProviderPreferenceRegistry.ref(this,
            this.row.SoundProviderPreferencesID);
    }
}

export class WorldStateSounds extends MultiRowSystem<WorldStateSound,WorldState> {
    protected getAllRows(): WorldStateSound[] {
        return DBC.WorldStateZoneSounds
            .queryAll({WorldStateID:this.owner.ID})
            .map(x=>new WorldStateSound(x))
    }
    protected isDeleted(value: WorldStateSound): boolean {
        return value.row.isDeleted()
    }
}

export class WorldState {
    protected id: number;

    constructor(id: number) {
        this.id = id;
    }

    get Sounds() { return new WorldStateSounds(this); }

    get ID() { return this.id; }

    get() {
        return this.id;
    }

    gossip_text() {
        return `$${this.id}w`
    }

    ui_text() {
        return `%${this.id}w`
    }

    objectify() { return this.get(); }
}

export class WorldStateRegistryClass implements StaticRegistry<WorldState> {
    create(mod: string, id: string, parent?: number): WorldState {
        return new WorldState(Ids.WorldState.id(mod,id));
    }
    ID(entity: WorldState): number {
        return entity.ID
    }
    load(id: number): WorldState {
        return new WorldState(id);
    }
    Exists(num: number): boolean {
        return num > 0;
    }
    refNoCreate<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner,cell,this);
    }

    refCreate<T>(owner: T, cell: Cell<number,any>) {
        return new RefStatic(owner, cell, this);
    }
}

export const WorldStateRegistry = new WorldStateRegistryClass();