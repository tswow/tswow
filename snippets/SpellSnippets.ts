import { std } from "../datascripts/tswow-stdlib-data"

/**
 * Snippet: Spell::Bolt Spell
 * - Basic bolt spell based on Shadowbolt
 */
std.Spells.create(/*@1*/"mod"/**/,/*@2*/"id"/**/)
    .Attributes.notShapeshifted.mark()
    .Icon.set('Interface\\Icons\\Spell_Fire_FlameBolt')
    .Name.enGB.set('Bolt Spell')
    .Subtext.enGB.set('Rank 1')
    .Description.enGB.set('My Description')
    .PowerDisplay.setNone()
    .FacingCasterFlags.set(1)
    .Range.setSimple(0,1000)
    .Speed.set(20)
    .Power.setMana(100)
    .Cooldown.set(10)
    .CastTime.setSimple(1000)
    .SchoolMask.Physical.mark()
    .InterruptFlags.OnMovement.mark()
    .InterruptFlags.OnPushback.mark()
    .InterruptFlags.OnInterruptCast.mark()
    .InterruptFlags.mark(3)
    .Effects.addMod(eff=>{
        eff.EffectType.setSchoolDamage()
        .BaseDamage.set(10)
        .BonusMultiplier.set(0.14)
        .TargetA.setUnitTargetEnemy()
    })
    .Visual.modRefCopy(visual=>{
        visual.PrecastKit.getRefCopy()
            .Animation.setReadySpellDirected()
            .LeftHandEffect.setSimple("Spells\\Fire_Precast_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Fire_Precast_Hand.mdx")
            .Sound.setSimple('Sound\\Spells',['PreCastFireLow.wav'])
        visual.CastKit.getRefCopy()
            .Animation.setSpellCastDirected()
            .LeftHandEffect.setSimple("Spells\\Fire_Cast_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Fire_Cast_Hand.mdx")
            .Sound.setSimple('Sound\\Spells\\Cast',['FireCast.wav'])
        visual.ImpactKit.getRefCopy()
            .ChestEffect.setSimple("Spells\\MoltenBlast_Impact_Chest.mdx")
            .Animation.setCombatWound()
            .Sound.setSimple('Sound\\Spells',['MoltenBlastImpact.wav'])
        visual.Missile.HasMissile.set(1)
            .Missile.FollowGround.Height.set(100)
            .Missile.FollowGround.DropSpeed.set(300)
            .Missile.FollowGround.Approach.set(750)
            .Missile.FollowGround.Flags.set(6)
            .Missile.Model.setSimple('Spells\\Fireball_Missile_Low.mdx')
            .Missile.DestinationAttachment.set(1)
            .Missile.Sound.setSimple('Sound\\Spells\\Missile'
                , ['FireMissileLoop.wav'])
    })
/** end-snippet */

/**
 * Snippet: Spell::Instant
 * - Basic instant cast spell
 */
std.Spells.create(/*@1*/"mod"/**/,/*@2*/"id"/**/)
    .Attributes.notShapeshifted.mark()
    .Name.enGB.set('Instant Cast')
    .Description.enGB.set('Description')
    .TargetType.UnitEnemy.mark()
    .PowerDisplay.setNone()
    .SchoolMask.Arcane.mark()
    .SchoolMask.Fire.mark()
    .Range.setSimple(0,1000)
    .Power.setMana(100)
    .CastTime.setSimple(0)
    .Cooldown.set(1000)
    .Icon.set(`Interface\\Icons\\Spell_Shadow_AbominationExplosion`)
    .Effects.addMod(effect=>{
        effect.EffectType
            .setSchoolDamage()
            .BaseDamage.set(1000)
            .TargetA.setUnitTargetEnemy()
    })
    .Visual.modRefCopy(visual=>{
        visual.CastKit.getRefCopy()
            .Animation.setSpellCastOmni()
            .LeftHandEffect.setSimple("Spells\\Fire_Cast_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Fire_Cast_Hand.mdx")
            .Sound.setSimple('Sound\\Spells\\Cast',['FireCast.wav'])
        visual.ImpactKit.getRefCopy()
            .ChestEffect.setSimple("Spells\\MoltenBlast_Impact_Chest.mdx")
            .Animation.setCombatWound()
            .Sound.setSimple('Sound\\Spells',['MoltenBlastImpact.wav'])
    })
/** end-snippet */

/**
 * Snippet: Spell::Summon Pet
 * - Basic warlock-style summoning spell based on Summon Imp
 */
std.Spells.create(/*@1*/"mod"/**/,/*@2*/"id"/**/)
    .Attributes.notShapeshifted.mark()
    .Attributes.dismissPet.mark()
    .Icon.set('Interface\\Icons\\Spell_Shadow_SummonImp')
    .Name.enGB.set('Summon Pet')
    .Subtext.enGB.set('Summon')
    .Description.enGB.set('Description')
    .Effects.addMod(effect=>{
        effect.EffectType.setSummonPet()
            .SummonedCreature.set(/*@3*/416/**/)
    })
    .Range.setSimple(0,0)
    .Power.setMana(100)
    .Cooldown.set(1000)
    .CastTime.setSimple(1000)
    .InterruptFlags.OnMovement.mark()
    .InterruptFlags.OnPushback.mark()
    .InterruptFlags.OnInterruptCast.mark()
    .Visual.modRefCopy(visual=>{
        visual.CastKit.getRefCopy()
            .Animation.setSpellCastOmni()
            .Sound.setSimple("Sound\\Creature\\Grell",["GrellAggroA.wav"])
            .BaseEffect.setSimple("Spells\\SummonPet_Cast_Impact_Base.mdx")
            .LeftHandEffect.setSimple("Spells\\Summon_PreCast_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Summon_PreCast_Hand.mdx")
        visual.PrecastKit.getRefCopy()
            .Animation.setReadySpellOmni()
            .Sound.setSimpleLoop("Sound\\Spells",["ShadowPreCastHigh.wav"])
            .BaseEffect.setSimple("Spells\\SummonPet_Impact_Base.mdx")
            .LeftHandEffect.setSimple("Spells\\Summon_PreCast_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Summon_PreCast_Hand.mdx")
    })
/** end-snippet */

/**
 * Snippet: Spell::ChainEffect
 * - Basic chain effect based on Chain lightning
 */
std.Spells.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Icon.set('Interface\\Icons\\Spell_Nature_ChainLightning')
    .Name.enGB.set('Chain Spell')
    .Subtext.enGB.set('Rank 1')
    .Description.enGB.set('Description')
    .Effects.addMod(effect=>{
        effect.EffectType.setSchoolDamage()
            .BaseDamage.set(190)
            .RandomDamage.set(27)
            .BonusMultiplier.set(0.57)
            .ChainTargets.set(3)
            .ChainAmplitude.set(0.69)
            .TargetA.setUnitTargetEnemy()
    })
    .SchoolMask.Nature.mark()
    .Range.setSimple(0,30)
    .Power.setMana(100)
    .Cooldown.set(1000)
    .CastTime.setSimple(2000)
    .InterruptFlags.OnMovement.mark()
    .InterruptFlags.OnPushback.mark()
    .InterruptFlags.OnInterruptCast.mark()
    .Visual.modRefCopy(visual=>{
        visual.CastKit.getRefCopy()
            .Sound.setSimple("Sound\\Spells"
                , ["LightningBoltImpact.wav"])
            .Animation.setSpellCastDirected()
            .LeftHandEffect.setSimple("Spells\\Lightning_Cast_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Lightning_Cast_Hand.mdx")
            .CharProcedures.addMod(procedure=>{
                procedure.SetChain()
                    .TargetCount.set(1)
                    .Forever.set(0)
                    .ChainEffect.getRefCopy()
                            .Texture.set("Textures\\SpellChainEffects\\ShockLightning.blp")
                            .AvgSegLen.set(0.33)
                            .Width.set(0.375)
                            .TexCoordScale.set(1399)
                            .SegDuration.set(1000)
                            .JointCount.set(27)
                            .JointOffsetRadius.set(0.07)
                            .JointsPerMinorJoin.set(3)
                            .MinorJointsPerMajorJoint.set(4)
                            .MinorJointScale.set(3.7)
                            .MajorJointScale.set(8.44)
                            .JointMoveSpeed.set(0.27)
                            .MinDurationBetweenJointJumps.set(0.23)
                            .MaxDurationBetweenJointJumps.set(0.72)
                            .MinFlickerOnDuration.set(0.26)
                            .MinFlickerOffDuration.set(0.25)
                            .PulseSpeed.set(150)
                            .PulseOnLength.set(900)
                            .Alpha.set(255)
                            .Red.set(255)
                            .Green.set(255)
                            .Blue.set(255)
                            .BlendMode.set(3)
                            .DelayBetweenEffects.set(0)
                            .SegDelay.set(0)
            })

        visual.ImpactKit.getRefCopy()
            .Animation.setCombatWound()
            .ChestEffect.setSimple("Spells\\ChainLightning_Impact_Chest.mdx")
            .Sound.setSimple("Sound\\Spells",["LightningBoltImpact.wav"])

        visual.PrecastKit.getRefCopy()
            .Animation.setReadySpellDirected()
            .LeftHandEffect.setSimple("Spells\\Lightning_PreCast_Low_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Lightning_PreCast_Low_Hand.mdx")
            .Sound.setSimpleLoop("Sound\\Spells",["LifeDrainLoop.wav"])
})
/** end-snippet */

/**
 * Snippet: Spell::Armor
 * - Basic armor spell (like Demon Skin or Frost Armor)
 */
std.Spells.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Icon.set('Interface\\Icons\\Spell_Shadow_RagingScream')
    .Name.enGB.set('Armor Spell')
    .Subtext.enGB.set('Rank 1')
    .Description.enGB.set('Description')
    .AuraDescription.enGB.set('Aura Description')
    .Duration.setSimple(1800000)
    .Power.setMana(100)
    .Cooldown.set(1000)
    .Effects.addMod(effect=>{
        effect.EffectType
                .setApplyAura()
                .setModResistance()
                .Resistance.Physical.mark()
                .BasePoints.set(89)
                .TargetA.setUnitCaster()
    })
    .Visual.modRefCopy(effect=>{
        effect.CastKit.getRefCopy()
            .Animation.setSpellCastOmni()
            .Sound.setSimple("Sound\\Spells\\Cast",["ShadowCast.wav"])
            .LeftHandEffect.setSimple("Spells\\Shadow_Precast_Low_Hand.mdx")
            .RightHandEffect.setSimple("Spells\\Shadow_Precast_Low_Hand.mdx")
            .HeadEffect.setSimple("Spells\\DemonArmor_Impact_Head.mdx")
    })
/** end-snippet */

/**
 * Snippet: Spell::Shapeshift
 * - Basic druid-like shapeshifting spell
 */
std.Spells.create(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Icon.set('Interface\\Icons\\Ability_Druid_CatForm')
    .ActiveIcon.set('Interface\\Icons\\Spell_Nature_WispSplode')
    .Name.enGB.set('Shapeshift Spell')
    .Subtext.enGB.set('Shapeshift')
    .Description.enGB.set('Description')
    .AuraDescription.enGB.set('Aura Description')
    .Duration.setSimple(-1,0,-1)
    .Power.setMana(100)
    .Cooldown.set(1000)
    .Effects.addMod(effect=>{
        effect.EffectType.setApplyAura()
            .setModShapeshift()
            .Form.setDisplayId(26)
            .TargetA.setUnitCaster()
    })
    .Visual.modRefCopy(visual=>{
        visual.CastKit.getRefCopy()
            .LeftHandEffect.setSimple('Spells\\Nature_PreCast_Low_Hand.mdx')
            .RightHandEffect.setSimple('Spells\\Nature_PreCast_Low_Hand.mdx')
            .BaseEffect.setSimple('Spells\\DruidMorph_Impact_Base.mdx')
            .Sound.setSimple('Sound\\Creature\\Tiger',['mTigerAttackA.wav'])
    })
/** end-snippet */