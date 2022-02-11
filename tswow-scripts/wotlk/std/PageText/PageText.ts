import { SQL } from "wotlkdata";
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { Language } from "wotlkdata/wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/wotlkdata/primitives";
import { page_textQuery, page_textRow } from "wotlkdata/wotlkdata/sql/types/page_text";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

export class PageTextContent extends SQLLocSystem<PageText> {
    protected getMain(): Cell<string, any> {
        return this.owner.row.Text;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        const row = SQL.page_text_locale.query({ID:this.owner.ID});
        return (
               row
            || SQL.page_text_locale.add(this.owner.ID,loc).Text.set('')
        ).Text
    }
}

export class PageText extends MainEntity<page_textRow> {
    get ID() { return this.row.ID.get(); }
    get Text() { return new PageTextContent(this); }
    get NextPage() { return this.wrap(this.row.NextPageID); }

    clone() {
        let id = Ids.page_text.id()
        let r = this.row.clone(id).Text.set('')
        SQL.page_text_locale.queryAll({ID:this.ID})
           .forEach(x=>x.clone(id,x.locale.get()))
        return new PageText(r);
    }
}

export class PageTextRef<T> extends RefDynamic<T,PageText> {
    setSimpleLoc(loc: loc_constructor|loc_constructor[], nextPage: number = 0) {
        return this.set(PageTextRegistry.createSimpleLoc(loc,nextPage).ID);
    }

    setSimple(lang: Language, text: string|string[], nextPage: number = 0) {
        return this.set(PageTextRegistry.createSimple(lang,text,nextPage).ID);
    }
}

export class PageTextRegistryClass
    extends RegistryDynamic<PageText,page_textRow,page_textQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new PageTextRef(owner, cell, this);
    }

    protected Table(): Table<any, page_textQuery, page_textRow> & { add: (id: number) => page_textRow; } {
        return SQL.page_text
    }
    protected ids(): DynamicIDGenerator {
        return Ids.PageTextMaterial
    }
    Clear(entity: PageText): void {
        entity.Text.clear()
    }
    protected FindByID(id: number): page_textRow {
        return SQL.page_text.query({ID:id});
    }
    protected EmptyQuery(): page_textQuery {
        return {}
    }
    ID(e: PageText): number {
        return e.ID
    }
    protected Entity(r: page_textRow): PageText {
        return new PageText(r);
    }

    createSimpleLoc(loc: loc_constructor|loc_constructor[], nextPage: number = 0) {
        if(!Array.isArray(loc)) {
            loc = [loc];
        }
        let first = this.create();
        let cur = first;
        loc.forEach((x,i,arr)=>{
            cur.Text.set(x)
            if(i<arr.length-1) {
                let next = this.create();
                cur.NextPage.set(next.ID)
                cur = next;
            } else {
                cur.NextPage.set(nextPage);
            }
        })
        return first;
    }

    createSimple(lang: Language, texts: string[]|string, nextPage: number = 0) {
        if(typeof(texts) === 'string') {
            texts = [texts];
        }
        return this.createSimpleLoc(texts.map(x=>{
            let obj: loc_constructor = {}
            obj[lang] = x;
            return obj;
        }),nextPage)
    }
}

export const PageTextRegistry = new PageTextRegistryClass();