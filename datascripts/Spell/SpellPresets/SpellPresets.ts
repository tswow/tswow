import { Spells } from "../Spells"
import { Ids } from "../../Misc/Ids"
import { DBC } from "wotlkdata"

export const SpellPresets = {
    CreateBolt(mod: string, id: string) { 
        return Spells.create(mod,id,686)
            .SchoolMask.clearAll()
            .TargetType.clearAll()
            .Effects.clearAll()
            .Name.enGB.set('Bolt Spell')
            .Description.enGB.set('Bolt spell doing x damage.') 
        },

    CreateInstantCast(mod: string, id: string) { 
        return Spells.create(mod,id,172)
            .Name.enGB.set('Instant Spell')
            .Description.enGB.set('Casts instantly')
            .Effects.clearAll()
    },
    CreateSummon(mod: string, id: string, summonedCreature: number) { 
        return Spells.create(mod,id,688)
            .Name.enGB.set('Summon Spell')
            .Description.enGB.set('Summons a <?> to do your bidding.')
            .Effects
                .modifyTemplate(0,
                    eff=>eff.setSummonPet().SummonedCreature.set(summonedCreature))
            .end
    },
    CreateChain(mod: string, id: string) { 
        return Spells.create(mod,id,421)
            .SchoolMask.clearAll()
            .TargetType.clearAll()
            .Effects.clearAll()
            .Name.enGB.set('Chain Spell')
            .Description.enGB.set('Template spell with a chain effect')
    },
    CreatePaladinAura(mod: string, id: string) { 
        return Spells.create(mod,id,465)
            .Name.enGB.set('Paladin Aura')
            .Description.enGB.set('A paladin-like aura')
            .Effects.clearAll()
    },
    CreateArmor(mod: string, id: string) { 
        return Spells.create(mod,id,687)
            .Name.enGB.set('Armor Spell')
            .Description.enGB.set('A Demon skin-like armor spell')
            .Effects.clearAll()
    },
    CreateShapeshift(mod: string, id: string, shapeshiftDisplayId: number) { 
        let shapeshiftId = Ids.SpellShapeshiftForm.id();
        DBC.SpellShapeshiftForm.add(shapeshiftId)
            .CreatureDisplayID.set([shapeshiftDisplayId,0,0,0])
            .Flags.set(0)
        return Spells.create(mod,id,768)
            .Name.enGB.set('Shapeshift Spell')
            .Description.enGB.set('A druid-like shapeshifting spell')
            .Effects.clear(1)
            .Effects.modify(0,eff=>eff.MiscValueA.set(shapeshiftId))
    },
}