import { Table } from "../../../data/table/Table";
import { CreatureSoundDataQuery, CreatureSoundDataRow } from "../../dbc/CreatureSoundData";
import { DBC } from "../../DBCFiles";
import { ArrayRefSystemStatic } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";
import { FootstepTerrainLookupRegistry } from "./FootstepTerrainLookup";

export class CreatureSoundData extends MainEntity<CreatureSoundDataRow>
{
    get ID() { return this.row.ID.get(); }
    get Exertion() { return SoundEntryRegistry.ref(this, this.row.SoundExertionID); }
    get ExertionCritical() { return SoundEntryRegistry.ref(this, this.row.SoundExertionCriticalID); }
    get Injury() { return SoundEntryRegistry.ref(this, this.row.SoundInjuryID); }
    get InjuryCritical() { return SoundEntryRegistry.ref(this, this.row.SoundInjuryCriticalID); }
    get InjuryCrushing() { return SoundEntryRegistry.ref(this, this.row.SoundInjuryCrushingBlowID); }
    get Death() { return SoundEntryRegistry.ref(this, this.row.SoundDeathID); }
    get Stun() { return SoundEntryRegistry.ref(this, this.row.SoundStunID); }
    get Stand() { return SoundEntryRegistry.ref(this, this.row.SoundStandID); }
    get Aggro() { return SoundEntryRegistry.ref(this, this.row.SoundAggroID); }
    get WingFlap() { return SoundEntryRegistry.ref(this, this.row.SoundWingFlapID); }
    get WingGlide() { return SoundEntryRegistry.ref(this, this.row.SoundWingGlideID); }
    get Alert() { return SoundEntryRegistry.ref(this, this.row.SoundAlertID); }
    get FidgetDelay() { return new MinMaxCell(this, this.row.FidgetDelaySecondsMin, this.row.FidgetDelaySecondsMax)}

    get Fidget() {
        return new ArrayRefSystemStatic (
            this
            , 0
            , 5
            ,  index => SoundEntryRegistry.ref(
                      this
                    , this.wrapIndex(this.row.SoundFidget,index)
                )
            )
    }

    get CustomAttack() {
        return  new ArrayRefSystemStatic (
            this
            , 0
            , 4
            ,  index => SoundEntryRegistry.ref(
                      this
                    , this.wrapIndex(this.row.CustomAttack,index)
                )
            )
    }
    get Footstep() { return FootstepTerrainLookupRegistry.ref(this, this.row.SoundFootstepID); }
    get NPC() { return SoundEntryRegistry.ref(this, this.row.NPCSoundID); }
    get Loop() { return SoundEntryRegistry.ref(this, this.row.LoopSoundID); }
    get JumpStart() { return SoundEntryRegistry.ref(this, this.row.SoundJumpStartID); }
    get JumpEnd() { return SoundEntryRegistry.ref(this, this.row.SoundJumpEndID); }
    get PetAttack() { return SoundEntryRegistry.ref(this, this.row.SoundPetAttackID); }
    get PetOrder() { return SoundEntryRegistry.ref(this, this.row.SoundPetOrderID); }
    get PetDismiss() { return SoundEntryRegistry.ref(this, this.row.SoundPetDismissID); }
    get Birth() { return SoundEntryRegistry.ref(this, this.row.BirthSoundID); }
    get SpellCastDirected() { return SoundEntryRegistry.ref(this, this.row.SpellCastDirectedSoundID); }
    get Submerge() { return SoundEntryRegistry.ref(this, this.row.SubmergeSoundID); }
    get Submerged() { return SoundEntryRegistry.ref(this, this.row.SubmergedSoundID); }
    get ImpactType() { return this.wrap(this.row.CreatureImpactType); }
    get Pet() { return CreatureSoundDataRegistry.ref(this, this.row.CreatureSoundDataIDPet); }
}

export class CreatureSoundDataRegistryClass extends RegistryDynamic
<
    CreatureSoundData,
    CreatureSoundDataRow,
    CreatureSoundDataQuery
> {
    protected Table(): Table<any, CreatureSoundDataQuery, CreatureSoundDataRow> & { add: (id: number) => CreatureSoundDataRow; } {
        return DBC.CreatureSoundData
    }
    protected ids(): DynamicIDGenerator {
        return Ids.FootstepTerrainLookup
    }
    Clear(entity: CreatureSoundData): void {
        entity
            .Aggro.set(0)
            .Alert.set(0)
            .Birth.set(0)
            .CustomAttack.clearAll()
            .Death.set(0)
            .Exertion.set(0)
            .ExertionCritical.set(0)
            .Fidget.clearAll()
            .FidgetDelay.set(0,0)
            .Footstep.set(0)
            .ImpactType.set(0)
            .Injury.set(0)
            .InjuryCritical.set(0)
            .InjuryCrushing.set(0)
            .JumpEnd.set(0)
            .JumpStart.set(0)
            .Loop.set(0)
            .NPC.set(0)
            .Pet.set(0)
            .PetAttack.set(0)
            .PetDismiss.set(0)
            .PetOrder.set(0)
            .SpellCastDirected.set(0)
            .Stand.set(0)
            .Stun.set(0)
            .Submerge.set(0)
            .Submerged.set(0)
            .WingFlap.set(0)
            .WingGlide.set(0)
    }
    protected FindByID(id: number): CreatureSoundDataRow {
        return this.Table().query({ID:id});
    }
    ID(e: CreatureSoundData): number {
        return e.ID
    }
    protected EmptyQuery(): CreatureSoundDataQuery {
        return {}
    }
    protected Entity(r: CreatureSoundDataRow): CreatureSoundData {
        return new CreatureSoundData(r);
    }
}

export const CreatureSoundDataRegistry = new CreatureSoundDataRegistryClass();