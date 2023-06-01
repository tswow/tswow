export enum AuraStateType
{   // (C) used in caster aura state     (T) used in target aura state
    // (c) used in caster aura state-not (t) used in target aura state-not
    NONE                         = 0,            // C   |
    DEFENSE                      = 1,            // C   |
    HEALTHLESS_20_PERCENT        = 2,            // CcT |
    BERSERKING                   = 3,            // C T |
    FROZEN                       = 4,            //  c t| frozen target
    JUDGEMENT                    = 5,            // C   |
    //UNKNOWN6                   = 6,            //     | not used
    HUNTER_PARRY                 = 7,            // C   |
    //UNKNOWN7                   = 7,            //  c  | creature cheap shot / focused bursts spells
    //UNKNOWN8                   = 8,            //    t| test spells
    //UNKNOWN9                   = 9,            //     |
    WARRIOR_VICTORY_RUSH         = 10,           // C   | warrior victory rush
    //UNKNOWN11                  = 11,           // C  t| 60348 - Maelstrom Ready!, test spells
    FAERIE_FIRE                  = 12,           //  c t|
    HEALTHLESS_35_PERCENT        = 13,           // C T |
    CONFLAGRATE                  = 14,           //   T |
    SWIFTMEND                    = 15,           //   T |
    DEADLY_POISON                = 16,           //   T |
    ENRAGE                       = 17,           // C   |
    BLEEDING                     = 18,           //    T|
    UNKNOWN19                    = 19,           //     |
    //UNKNOWN20                  = 20,           //  c  | only (45317 Suicide)
    //UNKNOWN21                  = 21,           //     | not used
    UNKNOWN22                    = 22,           // C  t| varius spells (63884, 50240)
    HEALTH_ABOVE_75_PERCENT      = 23            // C   |
};