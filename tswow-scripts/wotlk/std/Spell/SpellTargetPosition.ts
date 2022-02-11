import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { spell_target_positionRow } from "wotlkdata/wotlkdata/sql/types/spell_target_position";
import { MapRegistry } from "../Map/Maps";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";

export class SpellTargetPosition<T> extends MaybeSQLEntity<T,spell_target_positionRow> {
    protected spell: number;
    protected effect: number;

    constructor(owner: T, spell: number, effect: number) {
        super(owner);
        this.spell = spell;
        this.effect = effect;
    }

    protected createSQL(): spell_target_positionRow {
        return SQL.spell_target_position
            .add(this.spell,this.effect)
            .MapID.set(0)
            .Orientation.set(0)
            .PositionX.set(0)
            .PositionY.set(0)
            .PositionZ.set(0)
            .VerifiedBuild.set(17688)
    }
    protected findSQL(): spell_target_positionRow {
        return SQL.spell_target_position.query({
              ID:this.spell
            , EffectIndex:this.effect
        });
    }

    protected isValidSQL(sql: spell_target_positionRow): boolean {
        return sql.ID.get() === this.spell
            && sql.EffectIndex.get() === this.effect
    }

    get Map() {
        return MapRegistry.ref(this.owner, this.wrapSQL(0, sql=>sql.MapID))
    }
    get X() { return this.wrapSQL(0,sql=>sql.PositionX) }
    get Y() { return this.wrapSQL(0,sql=>sql.PositionY) }
    get Z() { return this.wrapSQL(0,sql=>sql.PositionZ) }
    get O() { return this.wrapSQL(0,sql=>sql.Orientation) }

    setSpread(map: number, x: number, y: number, z: number, o: number) {
        return this.set({x,y,z,o,map});
    }

    set(obj: {x: number, y: number, z: number, o: number, map: number}) {
        this.X.set(obj.x);
        this.Y.set(obj.y);
        this.Z.set(obj.z);
        this.O.set(obj.o);
        this.Map.set(obj.map);
        return this.owner;
    }
}