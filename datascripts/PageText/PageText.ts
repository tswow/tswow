import { SQL } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { Language } from "wotlkdata/dbc/Localization";
import { page_textQuery, page_textRow } from "wotlkdata/sql/types/page_text";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Ref } from "../Refs/Ref";

export class PageTextContent extends SQLLocSystem<PageText> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.Text;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        const row = SQL.page_text_locale.find({ID:this.owner.ID});
        return (
               row
            || SQL.page_text_locale.add(this.owner.ID,loc).Text.set('')
        ).Text
    }
}

export class PageText extends MainEntity<page_textRow> {
    get ID() { return this.row.ID.get(); }
    get Text() { return new PageTextContent(this); }

    clone() {
        let id = Ids.page_text.id()
        let r = this.row.clone(id).Text.set('')
        SQL.page_text_locale.filter({ID:this.ID})
           .forEach(x=>x.clone(id,x.locale.get()))
        return new PageText(r);
    }
}

export const PageTextRegistry = {
    create(parent = 0) {
        return new PageText(
            parent > 0
            ? this.load(parent).clone().row
            : SQL.page_text.add(Ids.page_text.id())
        );
    },

    load(id: number) {
        return this.find({ID:id});
    },

    filter(query: page_textQuery) {
        return SQL.page_text
            .filter(query)
            .map(x=> new PageText(x))
    },

    find(query: page_textQuery) {
        let v = SQL.page_text.find(query);
        return ( v ? new PageText(v) : undefined) as PageText;
    }
}

export class PageTextRef<T> extends Ref<T,PageText> {
    protected create(): PageText {
        return PageTextRegistry.create();
    }
    protected clone(): PageText {
        return PageTextRegistry.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: PageText): number {
        return v.ID;
    }
    protected resolve(): PageText {
        return PageTextRegistry.load(this.cell.get());
    }
}