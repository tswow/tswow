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
    'Grand Master' | number

export function resolveProfessionRank(tier: ProfessionTier|number) {
    if(typeof(tier)=='number') return tier;
    switch(tier) {
        case 'Apprentice': return 0;
        case 'Journeyman': return 1;
        case 'Expert': return 2;
        case 'Artisan': return 3;
        case 'Master': return 4;
        case 'Grand Master': return 5;
        default: throw new Error(`Invalid profession tier: ${tier}`)
    }
}

export function getProfessionRank(rank: number) {
    switch(rank) {
        case 1: return 'Apprentice';
        case 2: return 'Journeyman';
        case 3: return 'Expert';
        case 4: return 'Artisan';
        case 5: return 'Master';
        case 6: return 'Grand Master';
        default: throw new Error(`Invalid profession tier: ${rank}`)
    }
}

export function isTradeskillSpell(spell: Spell) {
    const types = [
          spell.Effects.get(0).Type.objectify()
        , spell.Effects.get(1).Type.objectify()
        , spell.Effects.get(2).Type.objectify()
    ]
    return types.includes('Skill');
}