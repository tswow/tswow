import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { spell_target_positionRow } from "wotlkdata/sql/types/spell_target_position";
import { MapRegistry } from "../Map/Maps";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";
import { SpellEffect } from "./SpellEffect";

export class SpellTargetPosition extends MaybeSQLEntity<SpellEffect,spell_target_positionRow> {
    @Transient
    private spell: Spell;

    constructor(owner: SpellEffect, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    protected createSQL(): spell_target_positionRow {
        return SQL.spell_target_position
            .add(this.spell.ID,this.owner.index)
            .MapID.set(0)
            .Orientation.set(0)
            .PositionX.set(0)
            .PositionY.set(0)
            .PositionZ.set(0)
            .VerifiedBuild.set(17688)
    }
    protected findSQL(): spell_target_positionRow {
        return SQL.spell_target_position.find({
              ID:this.spell.ID
            , EffectIndex:this.owner.index
        });
    }

    protected isValidSQL(sql: spell_target_positionRow): boolean {
        return sql.ID.get() === this.spell.ID
            && sql.EffectIndex.get() === this.owner.index;
    }

    get Map() {
        return MapRegistry.ref(this.owner, this.wrapSQL(0, sql=>sql.MapID))
    }
    get X() { return this.wrapSQL(0,sql=>sql.PositionX) }
    get Y() { return this.wrapSQL(0,sql=>sql.PositionY) }
    get Z() { return this.wrapSQL(0,sql=>sql.PositionZ) }
    get O() { return this.wrapSQL(0,sql=>sql.Orientation) }

    setSpread(map: number, x: number, y: number, z: number, o: number) {
        this.X.set(x);
        this.Y.set(y);
        this.Z.set(z);
        this.O.set(o);
        this.Map.set(map);
        return this.owner;
    }

    set(obj: {x: number, y: number, z: number, o: number, map: number}) {
        return this.setSpread(obj.x,obj.y,obj.z,obj.o,obj.map);
    }
}