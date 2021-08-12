import { ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { Spell } from "../Spell/Spell";

export type DefaultProfession = 
        'SKINNING' | 'HERBALISM' | 'MINING' | 'FISHING' | 'JEWELCRAFTING'
    |   'COOKING' | 'ALCHEMY' | 'LEATHERWORKING' | 'INSCRIPTION' | 'ENGINEERING'
    |   'TAILORING' | 'BLACKSMITHING' | 'ENCHANTING' | 'FISHING' | 'FIRSTAID'

export const DefaultProfessions: DefaultProfession[] = [
        'SKINNING' , 'HERBALISM' , 'MINING' , 'FISHING' , 'JEWELCRAFTING'
    ,   'COOKING' , 'ALCHEMY' , 'LEATHERWORKING' , 'INSCRIPTION' , 'ENGINEERING'
    ,   'TAILORING' , 'BLACKSMITHING' , 'ENCHANTING' , 'FISHING' , 'FIRSTAID']

export type ProfessionType = 'PROFESSION' | 'SECONDARY'

export function resolveProfessionType(type: ProfessionType | number) {
    if(typeof(type)=='number') {
        return type;
    }

    switch(type) {
        case 'PROFESSION': return 11;
        case 'SECONDARY': return 9;
        default: throw new Error(`Invalid profession`)
    }
}

export function resolveProfession(type: DefaultProfession|number) {
    if(typeof(type)=='number') return type;
    switch(type) {
        case 'SKINNING': return 393
        case 'HERBALISM': return 182
        case 'MINING': return 186
        case 'FISHING': return 356
        case 'SKINNING': return 393
        case 'JEWELCRAFTING': return 755
        case 'COOKING': return 185
        case 'ALCHEMY': return 171
        case 'LEATHERWORKING': return 165
        case 'INSCRIPTION': return 773
        case 'ENGINEERING': return 202
        case 'TAILORING': return 197
        case 'BLACKSMITHING': return 164
        case 'ENCHANTING': return 333
        case 'FISHING': return 356
        case 'FIRSTAID': return  129
        default:
            throw new Error(`Invalid profession type: ${type}`);
    }
}

export type ProfessionTier = 
    'Apprentice' | 
    'Journeyman' | 
    'Expert' | 
    'Artisan' | 
    'Master' | 
    'Grand Master'

export function resolveProfessionTier(tier: ProfessionTier|number) {
    if(typeof(tier)=='number') return tier;
    switch(tier) {
        case 'Apprentice': return 1;
        case 'Journeyman': return 2;
        case 'Expert': return 3;
        case 'Artisan': return 4;
        case 'Master': return 5;
        case 'Grand Master': return 6;
        default: throw new Error(`Invalid profession tier: ${tier}`)
    }
}

export function isTradeskillSpell(spell: Spell) {
    const types = [
        ArraySystem.get(spell.Effects,0).EffectType.objectify(),
        ArraySystem.get(spell.Effects,1).EffectType.objectify(),
        ArraySystem.get(spell.Effects,2).EffectType.objectify(),
    ]
    return types.includes('Skill');
}