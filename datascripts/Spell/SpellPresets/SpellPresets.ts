import { SummonSpell } from "./SummonSpell"
import { BoltSpell } from "./BoltSpell"
import { InstantCastSpell } from "./InstantCastSpell"
import { ChainSpell } from "./ChainSpell"
import { PaladinAura } from "./PaladinAura"
import { ArmorSpell } from "./ArmorSpell"
import { ShapeshiftSpell } from "./ShapeshiftSpell"

export const SpellPresets = {
    CreateBolt(mod: string, id: string) { return BoltSpell.create(mod,id)},
    CreateInstantCast(mod: string, id: string) { return InstantCastSpell.create(mod,id)},
    CreateSummon(mod: string, id: string) { return SummonSpell.create(mod,id)},
    CreateChain(mod: string, id: string) { return ChainSpell.create(mod,id)},
    CreatePaladinAura(mod: string, id: string) { return PaladinAura.create(mod,id)},
    CreateArmor(mod: string, id: string) { return ArmorSpell.create(mod, id); },
    CreateShapeshift(mod: string, id: string) { return ShapeshiftSpell.create(mod, id); },
}