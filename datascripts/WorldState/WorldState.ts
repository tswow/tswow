import { WorldStateZoneSoundsRow } from "wotlkdata/dbc/types/WorldStateZoneSounds";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { DBC } from "wotlkdata"
import { AreaRef } from "../Area/Area";
import { WMOAreaRef } from "../Area/WMOArea";
import { ZoneIntroMusicRef } from "../Sound/ZoneIntroMusic";
import { ZoneMusicRef } from "../Sound/ZoneMusic";
import { SoundAmbienceRef } from "../Sound/SoundAmbience";
import { SoundProviderPreferenceRef } from "../Sound/SoundProviderPreferences";
import { RefBase, RefStatic } from "../Refs/Ref";

// Note: There is no table containing WorldStates, so we just
// pretend there is one.

export class WorldStateSound extends MainEntity<WorldStateZoneSoundsRow> {
    get WorldState() { return this.row.WorldStateID.get(); }
    get TriggerValue() { return this.wrap(this.row.WorldStateValue); }
    get Area() { return new AreaRef(this, this.row.AreaID); }
    get WMOArea() { return new WMOAreaRef(this, this.row.WMOAreaID) }
    get ZoneIntroMusic() {
        return new ZoneIntroMusicRef(this, this.row.ZoneintroMusicID)
    }
    get ZoneMusic() {
        return new ZoneMusicRef(this, this.row.ZoneMusicID);
    }
    get SoundAmbience() {
        return new SoundAmbienceRef(this, this.row.SoundAmbienceID);
    }
    get SoundProviderPreferences() {
        return new SoundProviderPreferenceRef(this,
            this.row.SoundProviderPreferencesID);
    }
}

export class WorldStateSounds extends MultiRowSystem<WorldStateSound,WorldState> {
    protected getAllRows(): WorldStateSound[] {
        return DBC.WorldStateZoneSounds
            .filter({WorldStateID:this.owner.ID})
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

export const WorldStateRegistry = {
    create(mod: string, id: string) {
        return new WorldState(Ids.WorldState.id(mod,id));
    },

    load(id: number) {
        return new WorldState(id);
    }
}

export class WorldStateRef<T> extends RefBase<T,WorldState> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldState): number {
        return v.ID;
    }
    protected resolve(): WorldState {
        return new WorldState(this.cell.get());
    }
}

export class WorldStateRefCreate<T> extends RefStatic<T,WorldState> {
    protected create(mod: string, id: string): WorldState {
        return WorldStateRegistry.create(mod,id);
    }
    protected clone(mod: string, id: string): WorldState {
        // TODO: sounds
        return WorldStateRegistry.create(mod,id);
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: WorldState): number {
        return v.ID
    }
    protected resolve(): WorldState {
        return WorldStateRegistry.load(this.cell.get());
    }

}