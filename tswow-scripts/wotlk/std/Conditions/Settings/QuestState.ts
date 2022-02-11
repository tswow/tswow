import { MaskCell32ReadOnly } from "wotlkdata/wotlkdata/cell/cells/MaskCell";

export enum QuestStates {
      NOT_TAKEN   = 1
    , COMPLETED   = 2
    , IN_PROGRESS = 8
    , FAILED      = 32
    , REWARDED    = 64
}

export type QuestState = keyof typeof QuestStates

export function makeQuestStateMask(states: QuestState[]) {
  return states.reduce((p,c)=>p|QuestStates[c],0);
}

export class QuestStateMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
  get NOT_TAKEN()   { return this.extract_bit(QuestStates.NOT_TAKEN);   }
  get COMPLETED()  { return this.extract_bit(QuestStates.COMPLETED);   }
  get IN_PROGRESS() { return this.extract_bit(QuestStates.IN_PROGRESS); }
  get FAILED()     { return this.extract_bit(QuestStates.FAILED);      }
  get REWARDED()   { return this.extract_bit(QuestStates.REWARDED);    }
}