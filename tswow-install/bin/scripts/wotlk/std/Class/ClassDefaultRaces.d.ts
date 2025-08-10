export declare const DefaultClassRaces: {
    HUMAN_WARRIOR: {
        race: number;
        cls: number;
    };
    HUMAN_PALADIN: {
        race: number;
        cls: number;
    };
    HUMAN_ROGUE: {
        race: number;
        cls: number;
    };
    HUMAN_PRIEST: {
        race: number;
        cls: number;
    };
    HUMAN_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    HUMAN_MAGE: {
        race: number;
        cls: number;
    };
    HUMAN_WARLOCK: {
        race: number;
        cls: number;
    };
    ORC_WARRIOR: {
        race: number;
        cls: number;
    };
    ORC_HUNTER: {
        race: number;
        cls: number;
    };
    ORC_ROGUE: {
        race: number;
        cls: number;
    };
    ORC_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    ORC_SHAMAN: {
        race: number;
        cls: number;
    };
    ORC_WARLOCK: {
        race: number;
        cls: number;
    };
    DWARF_WARRIOR: {
        race: number;
        cls: number;
    };
    DWARF_PALADIN: {
        race: number;
        cls: number;
    };
    DWARF_HUNTER: {
        race: number;
        cls: number;
    };
    DWARF_ROGUE: {
        race: number;
        cls: number;
    };
    DWARF_PRIEST: {
        race: number;
        cls: number;
    };
    DWARF_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    NIGHT_ELF_WARRIOR: {
        race: number;
        cls: number;
    };
    NIGHT_ELF_HUNTER: {
        race: number;
        cls: number;
    };
    NIGHT_ELF_ROGUE: {
        race: number;
        cls: number;
    };
    NIGHT_ELF_PRIEST: {
        race: number;
        cls: number;
    };
    NIGHT_ELF_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    NIGHT_ELF_DRUID: {
        race: number;
        cls: number;
    };
    UNDEAD_WARRIOR: {
        race: number;
        cls: number;
    };
    UNDEAD_ROGUE: {
        race: number;
        cls: number;
    };
    UNDEAD_PRIEST: {
        race: number;
        cls: number;
    };
    UNDEAD_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    UNDEAD_MAGE: {
        race: number;
        cls: number;
    };
    UNDEAD_WARLOCK: {
        race: number;
        cls: number;
    };
    TAUREN_WARRIOR: {
        race: number;
        cls: number;
    };
    TAUREN_HUNTER: {
        race: number;
        cls: number;
    };
    TAUREN_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    TAUREN_SHAMAN: {
        race: number;
        cls: number;
    };
    TAUREN_DRUID: {
        race: number;
        cls: number;
    };
    GNOME_WARRIOR: {
        race: number;
        cls: number;
    };
    GNOME_ROGUE: {
        race: number;
        cls: number;
    };
    GNOME_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    GNOME_MAGE: {
        race: number;
        cls: number;
    };
    GNOME_WARLOCK: {
        race: number;
        cls: number;
    };
    TROLL_WARRIOR: {
        race: number;
        cls: number;
    };
    TROLL_HUNTER: {
        race: number;
        cls: number;
    };
    TROLL_ROGUE: {
        race: number;
        cls: number;
    };
    TROLL_PRIEST: {
        race: number;
        cls: number;
    };
    TROLL_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    TROLL_SHAMAN: {
        race: number;
        cls: number;
    };
    TROLL_MAGE: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_PALADIN: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_HUNTER: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_ROGUE: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_PRIEST: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_MAGE: {
        race: number;
        cls: number;
    };
    BLOOD_ELF_WARLOCK: {
        race: number;
        cls: number;
    };
    DRAENEI_WARRIOR: {
        race: number;
        cls: number;
    };
    DRAENEI_PALADIN: {
        race: number;
        cls: number;
    };
    DRAENEI_HUNTER: {
        race: number;
        cls: number;
    };
    DRAENEI_PRIEST: {
        race: number;
        cls: number;
    };
    DRAENEI_DEATH_KNIGHT: {
        race: number;
        cls: number;
    };
    DRAENEI_SHAMAN: {
        race: number;
        cls: number;
    };
    DRAENEI_MAGE: {
        race: number;
        cls: number;
    };
};
export type DefaultClassRace = keyof typeof DefaultClassRaces;
export declare function getDefaultRace(raceIn: number, clsIn: number): {
    race: number;
    cls: number;
};
export declare function getDefaultClass(raceIn: number): number;
