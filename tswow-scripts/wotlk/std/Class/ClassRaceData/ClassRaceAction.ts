import { EnumCellTransform } from "../../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { SQL } from "../../../SQLFiles";
import { playercreateinfo_actionRow } from "../../../sql/playercreateinfo_action";
import { ItemTemplateRegistry } from "../../Item/ItemTemplate";
import { TransformedEntity } from "../../Misc/Entity";
import { SpellRegistry } from "../../Spell/Spells";
import { ClassRegistry } from "../ClassRegistry";

export class ActionEnum extends EnumCellTransform<ClassRaceActionBase> {
    get MACRO() { return this.plain_value(64)}
    get SPELL() { return this.value(0,x=>new ClassRaceActionSpell(x.row))}
    get ITEM()  { return this.value(128,x=>new ClassRaceActionItem(x.row))}
}

export class ClassRaceActionBase extends TransformedEntity<playercreateinfo_actionRow,ClassRaceActionPlain>
{
    protected transformer(): EnumCellTransform<any> {
        return this.Type;
    }
    protected default(): ClassRaceActionPlain {
        return new ClassRaceActionPlain(this.row);
    }

    get Type() { return new ActionEnum(this, this.row.type); }
    get Race() { return this.wrapReadOnly(this.row.race); }
    get Class() { return ClassRegistry.readOnlyRef(this, this.row.class); }
    get Button() { return this.wrapReadOnly(this.row.button); }
}

export class ClassRaceActionPlain extends ClassRaceActionBase {
    get Action() { return this.wrap(this.row.action); }
}

export class ClassRaceActionSpell extends ClassRaceActionBase {
    get Spell() { return SpellRegistry.ref(this, this.row.action); }
}

export class ClassRaceActionItem extends ClassRaceActionBase {
    get Item() { return ItemTemplateRegistry.ref(this, this.row.action); }
}

export class ClassRaceActions<T> extends MultiRowSystem<ClassRaceActionPlain,T> {
    protected cls: number;
    protected race: number;

    constructor(owner: T,cls: number, race: number) {
        super(owner);
        this.cls = cls;
        this.race = race;
    }

    protected getAllRows(): ClassRaceActionPlain[] {
        return SQL.playercreateinfo_action.queryAll({class:this.cls,race:this.race})
            .map(x=>new ClassRaceActionPlain(x))
    }
    protected isDeleted(value: ClassRaceActionPlain): boolean {
        return value.row.isDeleted();
    }

    protected add(button: number, action: number, type: number) {
        SQL.playercreateinfo_action.add(this.race,this.cls,button)
           .action.set(action)
           .type.set(type)
    }

    addSpell(button: number, spell: number) {
        this.add(button,spell,0)
        return this.owner;
    }

    addMacro(button: number, macro: number) {
        this.add(button,macro,64)
        return this.owner;
    }

    addItem(button: number, item: number) {
        this.add(button,item,128)
        return this.owner;
    }
}