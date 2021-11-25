import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { DummyCell } from "wotlkdata/wotlkdata/cell/cells/DummyCell";
import { PendingCell } from "wotlkdata/wotlkdata/cell/cells/PendingCell";
import { LocSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/wotlkdata/dbc/Localization";
import { iterLocConstructor, loc_constructor } from "wotlkdata/wotlkdata/primitives";

export const descriptions: {[key: number]: /*description:*/ loc_constructor}= {}

export class DescriptionCell<T extends { ID: number }> extends Cell<string,T> {
    protected lang: Language;

    constructor(owner: T, lang: Language) {
        super(owner);
        this.lang = lang;
    }

    exists() {
        let descs = descriptions[this.owner.ID];
        return descs !== undefined && descs[this.lang] !== undefined;
    }
    get(): string {
        let descs = descriptions[this.owner.ID];
        if(!descs) return '';
        let localized = descs[this.lang];
        return localized || '';
    }

    set(value: string) {
        if(!descriptions[this.owner.ID]) {
            descriptions[this.owner.ID] = {}
        }
        descriptions[this.owner.ID][this.lang] = value;
        return this.owner;
    }
}

export class BattlegroundDescription<T extends { ID: number }> extends LocSystem<T> {
    lang(lang: Language): Cell<string, T> & PendingCell {
        return new DescriptionCell(this.owner, lang);
    }
    get mask(): Cell<number, T> {
        return new DummyCell(this.owner,0);
    }
    set(con: loc_constructor): T {
        iterLocConstructor(con,(lang,value)=>{
            this.lang(lang).set(value);
        })
        return this.owner;
    }
}