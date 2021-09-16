import { MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

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
  get NotTaken()   { return this.extract_bit(QuestStates.NOT_TAKEN);   }
  get Completed()  { return this.extract_bit(QuestStates.COMPLETED);   }
  get InProgress() { return this.extract_bit(QuestStates.IN_PROGRESS); }
  get Failed()     { return this.extract_bit(QuestStates.FAILED);      }
  get Rewarded()   { return this.extract_bit(QuestStates.REWARDED);    }
}