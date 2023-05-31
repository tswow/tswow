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
import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { quest_offer_rewardRow } from "../../sql/quest_offer_reward";
import { quest_request_itemsRow } from "../../sql/quest_request_items";
import { SQL } from "../../SQLFiles";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Quest } from "./Quest";

interface QuestEmote {
    emote : number,
    delay : number
}

function requestRow(id: number, lang: Language) {
    if(lang==='enGB') {
        let row = SQL.quest_request_items.query({ID:id});
        if(row!==undefined) {
            return row;
        }
        return SQL.quest_request_items.add(id)
    } else {
        let localeRow = SQL.quest_request_items_locale.query({ID:id, locale: lang});
        if(localeRow!==undefined) {
            return localeRow;
        }
        return SQL.quest_request_items_locale.add(id, lang);
    }
}

function rewardRow(id: number, lang: Language) {
    if(lang==='enGB') {
        let row = SQL.quest_offer_reward.query({ID:id});
        if(row!==undefined) {
            return row;
        }
        return SQL.quest_offer_reward.add(id);
    } else {
        let localeRow = SQL.quest_offer_reward_locale.query({ID:id, locale:lang});
        if(localeRow!==undefined)  {
            return localeRow;
        }
        return SQL.quest_offer_reward_locale.add(id, lang);
    }
}

function localeRow(id: number, lang: Language) {
    let row = SQL.quest_template_locale.query({ID:id,locale:lang});
    if(row!==undefined) return row;
    return SQL.quest_template_locale.add(id, lang)
        .Title.set('')
        .Objectives.set('')
        .EndText.set('')
        .CompletedText.set('')
        .ObjectiveText1.set('')
        .ObjectiveText2.set('')
        .ObjectiveText3.set('')
        .ObjectiveText4.set('')
        ;
}

export class RequestItems extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        return requestRow(this.owner.ID, 'enGB').CompletionText;
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return requestRow(this.owner.ID, loc).CompletionText;
    }

    setEmotes(onComplete: number, onEnd: number) {
        (requestRow(this.owner.ID,'enGB') as quest_request_itemsRow)
            .EmoteOnComplete.set(onComplete)
            .EmoteOnIncomplete.set(onEnd)
    }
}

export class Reward extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        return rewardRow(this.owner.ID,'enGB').RewardText;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return rewardRow(this.owner.ID,loc).RewardText;
    }

    setEmotes(emote1? : QuestEmote, emote2? : QuestEmote, emote3? : QuestEmote, emote4?: QuestEmote) {
        const base = rewardRow(this.owner.ID,'enGB') as quest_offer_rewardRow;
        if(emote1) {
            base.Emote1.set(emote1.emote);
            base.EmoteDelay1.set(emote1.delay);
        } else if(emote2) {
            base.Emote2.set(emote2.emote);
            base.EmoteDelay2.set(emote2.delay);
        } else if(emote3) {
            base.Emote3.set(emote3.emote);
            base.EmoteDelay3.set(emote3.delay);
        } else if(emote4) {
            base.Emote4.set(emote4.emote);
            base.EmoteDelay4.set(emote4.delay);
        }
    }
}

export class LogTitle extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.LogTitle;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return localeRow(this.owner.ID,loc).Title;
    }
}

export class QuestCompletionLog extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.QuestCompletionLog;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return localeRow(this.owner.ID,loc).CompletedText;
    }
}

export class ObjectiveDescription extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.LogDescription;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return localeRow(this.owner.ID,loc).Objectives;
    }
}

export class Description extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.QuestDescription;
    }

    protected getLoc(loc: Language): Cell<string, any> {
        return localeRow(this.owner.ID,loc).Details;
    }
}

export class SubDescription extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any> {
        switch(this.index) {
            case 1: return this.owner.row.ObjectiveText1;
            case 2: return this.owner.row.ObjectiveText2;
            case 3: return this.owner.row.ObjectiveText3;
            case 4: return this.owner.row.ObjectiveText4;
            default: throw new Error(`Internal error: Too high Objective text`)
        }
    }
    protected getLoc(loc: Language): Cell<string, any> {
        let row = localeRow(this.owner.ID, loc);
        switch(this.index) {
            case 1: return row.ObjectiveText1;
            case 2: return row.ObjectiveText2;
            case 3: return row.ObjectiveText3;
            case 4: return row.ObjectiveText4;
            default: throw new Error(`Internal error: Too high Objective text`);
        }
    }

    protected index : number;
    constructor(owner : Quest, index : number) {
        super(owner);
        this.index = index;
    }
}

export class QuestText extends CellSystem<Quest> {
    Reward : Reward;
    Incomplete : RequestItems;
    Title : LogTitle;
    Objective: ObjectiveDescription;
    Description : Description;

    get ID() {
        return this.owner.ID;
    }

    constructor(owner : Quest) {
        super(owner);
        this.Reward = new Reward(this.owner);
        this.Incomplete = new RequestItems(this.owner);
        this.Title = new LogTitle(this.owner);
        this.Objective= new ObjectiveDescription(this.owner);
        this.Description = new Description(this.owner);
    }
}