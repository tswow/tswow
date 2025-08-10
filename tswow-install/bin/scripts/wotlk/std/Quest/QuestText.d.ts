import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Quest } from "./Quest";
interface QuestEmote {
    emote: number;
    delay: number;
}
export declare class RequestItems extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
    setEmotes(onComplete: number, onEnd: number): void;
}
export declare class Reward extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
    setEmotes(emote1?: QuestEmote, emote2?: QuestEmote, emote3?: QuestEmote, emote4?: QuestEmote): void;
}
export declare class LogTitle extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class QuestCompletionLog extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class ObjectiveDescription extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class Description extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class SubDescription extends SQLLocSystem<Quest> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
    protected index: number;
    constructor(owner: Quest, index: number);
}
export declare class QuestText extends CellSystem<Quest> {
    Reward: Reward;
    Incomplete: RequestItems;
    Title: LogTitle;
    Objective: ObjectiveDescription;
    Description: Description;
    get ID(): number;
    constructor(owner: Quest);
}
export {};
