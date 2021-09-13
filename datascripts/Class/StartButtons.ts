import { SQL } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { playercreateinfo_actionRow } from "wotlkdata/sql/types/playercreateinfo_action";
import { MainEntity } from "../Misc/Entity";
import { RaceType, resolveRaceType } from "../Race/RaceType";
import { Class } from "./Class";

export class ClassAction extends MainEntity<playercreateinfo_actionRow>{
    get Race() { return this.row.race.get(); }
    get Class() { return this.row.class.get(); }
    get Button() { return this.row.button.get(); }
    get Action() { return this.wrap(this.row.action); }
    get Type() { return this.wrap(this.row.type); }
}

export class StartButtons extends MultiRowSystem<ClassAction,Class> {
    protected getAllRows(): ClassAction[] {
        return SQL.playercreateinfo_action
            .filter({class:this.owner.ID})
            .map(x=>new ClassAction(x))
    }

    protected isDeleted(value: ClassAction): boolean {
        return value.row.isDeleted();
    }

    protected add(races: RaceType[]|undefined, button: number, action: number, type: number)
    {
        if(!races) races = this.owner.Races.get();
        races.forEach(x=>{
            SQL.playercreateinfo_action.add(resolveRaceType(x),this.owner.ID,button)
                .action.set(action)
                .type.set(type)
        });
        return this.owner;
    }

    addSpell(button: number, spellId: number, races?: RaceType[]) {
        return this.add(races,button,spellId,0);
    }

    addMacro(button: number, macroId: number, races?: RaceType[]) {
        return this.add(races,button,macroId,64);
    }

    addItem(button: number, itemId: number, races?: RaceType[]) {
        return this.add(races,button,itemId,128);
    }
}