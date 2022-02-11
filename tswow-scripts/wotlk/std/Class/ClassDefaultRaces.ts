const HUMAN = 1;
const ORC = 2;
const DWARF = 3;
const NIGHT_ELF = 4;
const UNDEAD = 5;
const TAUREN = 6;
const GNOME = 7;
const TROLL = 8;
const BLOOD_ELF = 10;
const DRAENEI = 11;

const WARRIOR = 1;
const PALADIN = 2;
const HUNTER = 3;
const ROGUE = 4;
const PRIEST = 5;
const DEATH_KNIGHT = 6;
const SHAMAN = 7;
const MAGE = 8;
const WARLOCK = 9;
const DRUID = 11;

export const DefaultClassRaces = {
    HUMAN_WARRIOR: {race: HUMAN, cls: WARRIOR},
    HUMAN_PALADIN: {race: HUMAN, cls: PALADIN},
    HUMAN_ROGUE: {race: HUMAN, cls: ROGUE},
    HUMAN_PRIEST: {race: HUMAN, cls: PRIEST},
    HUMAN_DEATH_KNIGHT: {race: HUMAN, cls: DEATH_KNIGHT},
    HUMAN_MAGE: {race: HUMAN, cls: MAGE},
    HUMAN_WARLOCK: {race: HUMAN, cls: WARLOCK},

    ORC_WARRIOR: {race: ORC, cls: WARRIOR},
    ORC_HUNTER: {race: ORC, cls: HUNTER},
    ORC_ROGUE: {race: ORC, cls: ROGUE},
    ORC_DEATH_KNIGHT: {race: ORC, cls: DEATH_KNIGHT},
    ORC_SHAMAN: {race: ORC, cls: SHAMAN},
    ORC_WARLOCK: {race: ORC, cls: WARLOCK},

    DWARF_WARRIOR: {race: DWARF, cls: WARRIOR},
    DWARF_PALADIN: {race: DWARF, cls: PALADIN},
    DWARF_HUNTER: {race: DWARF, cls: HUNTER},
    DWARF_ROGUE: {race: DWARF, cls: ROGUE},
    DWARF_PRIEST: {race: DWARF, cls: PRIEST},
    DWARF_DEATH_KNIGHT: {race: DWARF, cls: DEATH_KNIGHT},

    NIGHT_ELF_WARRIOR: {race: NIGHT_ELF, cls: WARRIOR},
    NIGHT_ELF_HUNTER: {race: NIGHT_ELF, cls: HUNTER},
    NIGHT_ELF_ROGUE: {race: NIGHT_ELF, cls: ROGUE},
    NIGHT_ELF_PRIEST: {race: NIGHT_ELF, cls: PRIEST},
    NIGHT_ELF_DEATH_KNIGHT: {race: NIGHT_ELF, cls: DEATH_KNIGHT},
    NIGHT_ELF_DRUID: {race: NIGHT_ELF, cls: DRUID},

    UNDEAD_WARRIOR: {race: UNDEAD, cls: WARRIOR},
    UNDEAD_ROGUE: {race: UNDEAD, cls: ROGUE},
    UNDEAD_PRIEST: {race: UNDEAD, cls: PRIEST},
    UNDEAD_DEATH_KNIGHT: {race: UNDEAD, cls: DEATH_KNIGHT},
    UNDEAD_MAGE: {race: UNDEAD, cls: MAGE},
    UNDEAD_WARLOCK: {race: UNDEAD, cls: WARLOCK},

    TAUREN_WARRIOR: {race: TAUREN, cls: WARRIOR},
    TAUREN_HUNTER: {race: TAUREN, cls: HUNTER},
    TAUREN_DEATH_KNIGHT: {race: TAUREN, cls: DEATH_KNIGHT},
    TAUREN_SHAMAN: {race: TAUREN, cls: SHAMAN},
    TAUREN_DRUID: {race: TAUREN, cls: DRUID},

    GNOME_WARRIOR: {race: GNOME, cls: WARRIOR},
    GNOME_ROGUE: {race: GNOME, cls: ROGUE},
    GNOME_DEATH_KNIGHT: {race: GNOME, cls: DEATH_KNIGHT},
    GNOME_MAGE: {race: GNOME, cls: MAGE},
    GNOME_WARLOCK: {race: GNOME, cls: WARLOCK},

    TROLL_WARRIOR: {race: TROLL, cls: WARRIOR},
    TROLL_HUNTER: {race: TROLL, cls: HUNTER},
    TROLL_ROGUE: {race: TROLL, cls: ROGUE},
    TROLL_PRIEST: {race: TROLL, cls: PRIEST},
    TROLL_DEATH_KNIGHT: {race: TROLL, cls: DEATH_KNIGHT},
    TROLL_SHAMAN: {race: TROLL, cls: SHAMAN},
    TROLL_MAGE: {race: TROLL, cls: MAGE},

    BLOOD_ELF_PALADIN: {race: BLOOD_ELF, cls: PALADIN},
    BLOOD_ELF_HUNTER: {race: BLOOD_ELF, cls: HUNTER},
    BLOOD_ELF_ROGUE: {race: BLOOD_ELF, cls: ROGUE},
    BLOOD_ELF_PRIEST: {race: BLOOD_ELF, cls: PRIEST},
    BLOOD_ELF_DEATH_KNIGHT: {race: BLOOD_ELF, cls: DEATH_KNIGHT},
    BLOOD_ELF_MAGE: {race: BLOOD_ELF, cls: MAGE},
    BLOOD_ELF_WARLOCK: {race: BLOOD_ELF, cls: WARLOCK},

    DRAENEI_WARRIOR: {race: DRAENEI, cls: WARRIOR},
    DRAENEI_PALADIN: {race: DRAENEI, cls: PALADIN},
    DRAENEI_HUNTER: {race: DRAENEI, cls: HUNTER},
    DRAENEI_PRIEST: {race: DRAENEI, cls: PRIEST},
    DRAENEI_DEATH_KNIGHT: {race: DRAENEI, cls: DEATH_KNIGHT},
    DRAENEI_SHAMAN: {race: DRAENEI, cls: SHAMAN},
    DRAENEI_MAGE: {race: DRAENEI, cls: MAGE},
}

export type DefaultClassRace = keyof typeof DefaultClassRaces;

export function getDefaultRace(raceIn: number, clsIn: number) : {race: number, cls: number} {
    for(const {race,cls} of Object.values(DefaultClassRaces)) {
        if(race===raceIn&&cls===clsIn) {
            return {race,cls};
        }
    }

    for(const {race,cls} of Object.values(DefaultClassRaces)) {
        if(cls===clsIn) {
            return {race,cls};
        }
    }

    throw new Error(`Default class ${clsIn} has no races!`);
}

export function getDefaultClass(raceIn: number) : number {
    for(const {race,cls} of Object.values(DefaultClassRaces)) {
        if(cls!==6 && race === raceIn) {
            return cls;
        }
    }
    throw new Error(`Race ${raceIn} has no non-death knight classes!`)
}