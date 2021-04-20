import { std } from "../datascripts/tswow-stdlib-data"

/**
 * Snippet: Spell::Bolt Spell
 * - Basic bolt spell based on Shadowbolt
 */
std.Spells.Presets.CreateBolt(/*@1*/"mod"/**/,/*@2*/"id"/**/)
    .Name.enGB.set('My Name')
    .Description.enGB.set('My Description')
    .SchoolMask.Physical.mark()
    .HandEffectPath.set("Spells\\Shadow_Precast_Low_Hand.mdx")
    .ImpactChest.set("Spells\\Shadowbolt_Chest_Impact.mdx")
    .MissilePath.set("Spells\\Shadowbolt_Missile.mdx")
    // Add your effects here
    .Effects.addTemplate()
        .setSchoolDamage()
        .TargetA.setUnitTargetAny()
        .BaseDamage.set(10)
    .end
/** end-snippet */

/**
 * Snippet: Spell::Summon Pet
 * - Basic warlock-style summoning spell based on Summon Imp
 */
std.Spells.Presets.CreateSummon(/*@1*/"mod"/**/,/*@2*/"id"/**/)
    .Name.enGB.set('Summon Pet')
    .SummonedCreature.set(/*@3*/416/**/)
    .HandEffectPath.set('Spells\\Summon_PreCast_Hand.mdx')
    .BaseEffectPath.set('Spells\\SummonPet_Impact_Base.mdx')
    .CastSound.Filename.set('GrellAggroA.wav')
    .ChannelSound.Filename.set('GrellAggroA.wav')
    .PrecastSound.Filename.set('ShadowPreCastHigh.wav')
/** end-snippet */

/**
 * Snippet: Spell::ChainEffect
 * - Basic chain effect based on Chain lightning
 */
std.Spells.Presets.CreateChain(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Name.enGB.set('Chain Effect')
    .SchoolMask.Arcane.mark()

    .PrecastSound.Filename.set("LifeDrainLoop.wav")
    .CastSound.Filename.set("LightningBoltImpact.wav")
    .ImpactSound.Filename.set("LightningBoltImpact.wav")

    // Edit the visual chain effect here
    .ChainEffect
        .Texture.set("Textures\\SpellChainEffects\\Lightning.blp")
    .end

    // Add your effects here
    .Effects.addTemplate()
        .setSchoolDamage()
        .BaseDamage.set(10)
        .TargetA.setUnitTargetEnemy()
        .ChainTargets.set(4)
    .end
/** end-snippet */

/**
 * Snippet: Spell::Paladin Aura
 * - Basic paladin-like aura based on Devotion Aura
 */
std.Spells.Presets.CreatePaladinAura(/*@1*/'mod'/**/,/*@2*/'id'/**/)
    .Name.enGB.set('Paladin Aura')
    .Description.enGB.set('Paladin-like aura')

    .CastEffect.set('Spells\\DevotionAura_Base.mdx')
    .ImpactEffect.set('Spells\\DevotionAura_Base.mdx')
    .ImpactSound.Filename.set('DevotionAura.wav')

    // Add your effects here
    .Effects.addTemplate()
        .setApplyAreaAuraRaid()
        .setModResistance()
        .Resistance.Shadow.mark()
        .BasePoints.set(100)
    .end
/** end-snippet */