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
import { ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { Ids } from "../Misc/Ids";
import { resolveTotemType, TotemType } from "../Totem/TotemType";
import { Spell } from "./Spell";
import { Spells } from "./Spells"

const created = [0,0,0,0];

export type CreatureControlType =
    'Attack'|'Stay'|'Follow'|'Aggressive'|'Passive'|'Defensive'

const ControllerValues : CreatureControlType[] = 
    ['Attack','Stay','Follow','Aggressive','Passive','Defensive']

export class CreatureControllers {
    Attack?: Spell;
    Follow?: Spell;
    Stay?: Spell;

    Aggressive?: Spell;
    Defensive?: Spell;
    Passive?: Spell;

    forEach(callback: (spell: Spell, type: CreatureControlType) => any) {
        if(this.Attack) callback(this.Attack,'Attack');
        if(this.Follow) callback(this.Follow,'Follow');
        if(this.Stay) callback(this.Stay,'Stay');
        if(this.Aggressive) callback(this.Aggressive,'Aggressive');
        if(this.Defensive) callback(this.Defensive,'Defensive');
        if(this.Passive) callback(this.Passive,'Passive');
    }
}

export const TotemCreatures = {
    createSummon(mod: string, id: string, totem: TotemType, creature: number){
        const cat = DBC.TotemCategory.findById(resolveTotemType(totem));
        let slot = 0;
        const mask = cat.TotemCategoryMask.get();
        switch(mask) {
            case 1:
                slot = 0;
                break;
            case 2:
                slot = 1;
                break;
            case 4:
                slot = 2;
                break;
            case 8:
                slot= 3;
                break;
            default:
                throw new Error(`Using non-totem TotemCategory. TotemCategoryMask was ${mask}, must be any of {1,2,4,8}`)
        }

        if(!created[slot]) {
            created[slot] = Ids.SummonProperties.id();
            DBC.SummonProperties.add(created[slot])
                .Control.set(1)
                .Faction.set(0)
                .Title.set(4)
                .Slot.set(1+slot)
                .Flags.set(512)
        }

        const spell = Spells.create(mod, id, 2484)
            .Effects.modify(0,eff=>{
                eff.MiscValueA.set(creature)
                   .MiscValueB.set(created[slot])
                   .ImplicitTargetA.set(41+slot)
            })
            .RequiredTotems.setIndex(0,resolveTotemType(totem))
        return spell;
    },

    createControllers(mod: string, id: string, slots: number[], 
        controllers: CreatureControlType[] = ControllerValues) {
            let bitmask = 0;
            slots.forEach((x)=>{
                bitmask |= (1<<(x+1))
            });

            const controlOut = new CreatureControllers();

            for(const controller of controllers) {
                const spell = Spells.create(mod, id+'_'+controller.toLowerCase())
                    .Effects.add(eff=>
                        eff.EffectType.setControlTotemCreature()
                            .AsRawEffect()
                            .MiscValueA.set(bitmask
                    ))
                switch(controller) {
                    case 'Aggressive':
                        ArraySystem.get(spell.Effects,0).MiscValueB.set(2)
                        controlOut.Aggressive = 
                            spell.Icon.set('Interface\\Icons\\Ability_Racial_BloodRage.blp')
                        break
                    case 'Attack':
                        ArraySystem.get(spell.Effects,0).MiscValueB.set(5)
                        controlOut.Attack = 
                            spell.Icon.set('Interface\\Icons\\Ability_GhoulFrenzy.blp')
                        break
                    case 'Defensive':
                        ArraySystem.get(spell.Effects,0).MiscValueB.set(1)
                        controlOut.Defensive = 
                            spell.Icon.set('Interface\\Icons\\Ability_Defend.blp')
                        break
                    case 'Follow':
                        ArraySystem.get(spell.Effects,0).MiscValueB.set(4)
                        controlOut.Follow = 
                            spell.Icon.set('Interface\\Icons\\Ability_Tracking.blp')
                        break
                    case 'Passive':
                        ArraySystem.get(spell.Effects,0).MiscValueB.set(0)
                        controlOut.Passive = 
                            spell.Icon.set('Interface\\Icons\\AbilitySeal.blp')
                        break
                    case 'Stay':
                        ArraySystem.get(spell.Effects,0).MiscValueB.set(0)
                        controlOut.Stay = 
                            spell.Icon.set('Interface\\Icons\\Spell_Nature_TimeStop.blp')
                        break
                }
            }
            return controlOut;
    },
}