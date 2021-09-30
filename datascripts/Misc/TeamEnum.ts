import { EnumCell, EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export class TeamEnum<T> extends EnumCell<T> {
    get Horde() { return this.value(67); }
    get Alliance() { return this.value(469); }
}

export class TeamEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Horde() { return this.value(67); }
    get Alliance() { return this.value(469); }
}

export const TEAMS = [
    'HORDE'
  , 'ALLIANCE'
  , 'ANY'
] as const

export type Team = typeof TEAMS[number] | number

export function resolveTeam(team: Team) {
    if(typeof(team) === 'number') {
        return team;
    }

    switch(team) {
        case 'ALLIANCE': return 469;
        case 'HORDE': return 67;
        case 'ANY': return 0;
        default: throw new Error(`Invalid team: ${team}`)
    }
}