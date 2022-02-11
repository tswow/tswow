import { DBC } from "../../DBCFiles";
import { SpellChainEffectsQuery, SpellChainEffectsRow } from "../../dbc/SpellChainEffects";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class SpellChainEffect extends MainEntity<SpellChainEffectsRow>  {
    clear(): this {
        // TODO: Implement!!
        return this;
    }

    get AvgSegLen() { return this.wrap(this.row.AvgSegLen); }
    get Width() { return this.wrap(this.row.Width); }
    get NoiseScale() { return this.wrap(this.row.NoiseScale); }
    get TexCoordScale() { return this.wrap(this.row.TexCoordScale); }
    get SegDuration() { return this.wrap(this.row.SegDuration); }
    get SegDelay() {return this.wrap(this.row.SegDelay); }
    get Texture() { return this.wrap(this.row.Texture); }
    get Flags() { return this.wrap(this.row.Flags); }
    get JointCount() { return this.wrap(this.row.JointCount); }
    get JointOffsetRadius() { return this.wrap(this.row.JointOffsetRadius); }
    get JointsPerMinorJoin() { return this.wrap(this.row.JointsPerMinorJoint); }
    get MinorJointsPerMajorJoint() { return this.wrap(this.row.MinorJointsPerMajorJoint); }
    get MinorJointScale() { return this.wrap(this.row.MinorJointScale); }
    get MajorJointScale() { return this.wrap(this.row.MajorJointScale); }
    get JointMoveSpeed() { return this.wrap(this.row.JointMoveSpeed); }
    get JointSmoothness() { return this.wrap(this.row.JointSmoothness); }
    get MinDurationBetweenJointJumps() { return this.wrap(this.row.MinDurationBetweenJointJumps); }
    get MaxDurationBetweenJointJumps() { return this.wrap(this.row.MaxDurationBetweenJointJumps); }
    get WaveHeight() { return this.wrap(this.row.WaveHeight); }
    get MinWaveAngle() { return this.wrap(this.row.MinWaveAngle); }
    get MaxWaveAngle() { return this.wrap(this.row.MaxWaveAngle); }
    get MinWaveSpin() { return this.wrap(this.row.MinWaveSpin); }
    get MaxWaveSpin() { return this.wrap(this.row.MaxWaveSpin); }
    get ArcHeight() { return this.wrap(this.row.ArcHeight); }
    get MinArcAngle() { return this.wrap(this.row.MinArcAngle); }
    get MaxArcAngle() { return this.wrap(this.row.MaxArcAngle); }
    get MinArcSpin() { return this.wrap(this.row.MinArcSpin); }
    get MaxArcSpin() { return this.wrap(this.row.MaxArcSpin); }
    get DelayBetweenEffects() { return this.wrap(this.row.DelayBetweenEffects); }
    get MinFlickerOnDuration() { return this.wrap(this.row.MinFlickerOnDuration)}
    get MinFlickerOffDuration() { return this.wrap(this.row.MinFlickerOffDuration)}

    get PulseSpeed() { return this.wrap(this.row.PulseSpeed)}
    get PulseOnLength() { return this.wrap(this.row.PulseOnLength)}

    get PulseFadeLength() { return this.wrap(this.row.PulseFadeLength)}

    get Alpha() { return this.wrap(this.row.Alpha)}
    get Red() { return this.wrap(this.row.Red)}
    get Green() { return this.wrap(this.row.Green)}
    get Blue() { return this.wrap(this.row.Blue)}
    get BlendMode() { return this.wrap(this.row.BlendMode)}

    get Combo() { return this.wrap(this.row.Combo)}

    get RenderLayer() { return this.wrap(this.row.RenderLayer)}

    get TextureLength() { return this.wrap(this.row.TextureLength)}
    get WavePhase() { return this.wrap(this.row.WavePhase)}

    get ID() { return this.row.ID.get(); }
}

export class SpellChainEffectRegistryClass
    extends RegistryDynamic<
          SpellChainEffect
        , SpellChainEffectsRow
        , SpellChainEffectsQuery
    >
{
    protected Table(): Table<any, SpellChainEffectsQuery, SpellChainEffectsRow> & { add: (id: number) => SpellChainEffectsRow; } {
        return DBC.SpellChainEffects
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellChainEffects
    }
    Clear(entity: SpellChainEffect): void {
        // TODO: need to specify this
    }
    protected FindByID(id: number): SpellChainEffectsRow {
        return DBC.SpellChainEffects.findById(id);
    }
    protected EmptyQuery(): SpellChainEffectsQuery {
        return {}
    }
    ID(e: SpellChainEffect): number {
        return e.ID
    }
    protected Entity(r: SpellChainEffectsRow): SpellChainEffect {
        return new SpellChainEffect(r);
    }
}

export const SpellChainEffectRegistry = new SpellChainEffectRegistryClass();