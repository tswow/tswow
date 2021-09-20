import { SQL } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";
import { page_textQuery, page_textRow } from "wotlkdata/sql/types/page_text";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamicNoRef } from "../Refs/Registry";

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
    get NextPage() { return this.wrap(this.row.NextPageID); }

    clone() {
        let id = Ids.page_text.id()
        let r = this.row.clone(id).Text.set('')
        SQL.page_text_locale.filter({ID:this.ID})
           .forEach(x=>x.clone(id,x.locale.get()))
        return new PageText(r);
    }
}

export class PageTextRef<T> extends RefDynamic<T,PageText> {
    setSimple(loc: loc_constructor, nextPage: number = 0) {
        this.getRefCopy()
            .Text.set(loc)
            .NextPage.set(nextPage);
        return this.owner;
    }
}

export class PageTextRegistryClass
    extends RegistryDynamicNoRef<PageText,page_textRow,page_textQuery>
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
    protected Clone(entity: PageText, parent: PageText): void {
        throw new Error("Method not implemented.");
    }
    protected FindByID(id: number): page_textRow {
        return SQL.page_text.find({ID:id});
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
}

export const PageTextRegistry = new PageTextRegistryClass();