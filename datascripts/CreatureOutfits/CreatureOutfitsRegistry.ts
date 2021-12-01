import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { creature_template_outfitsQuery, creature_template_outfitsRow } from "wotlkdata/wotlkdata/sql/types/creature_template_outfits";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { CreatureOutfit } from "./CreatureOutfits";

export class CreatureOutfitsRegistryClass
    extends RegistryDynamic<
          CreatureOutfit
        , creature_template_outfitsRow
        , creature_template_outfitsQuery
    >
{
    protected Table(): Table<any, creature_template_outfitsQuery, creature_template_outfitsRow> & { add: (id: number) => creature_template_outfitsRow; } {
        return SQL.creature_template_outfits
    }
    protected ids(): DynamicIDGenerator {
        return Ids.creature_template_outfits
    }
    Clear(entity: CreatureOutfit): void {
        entity.Back.set(0)
            .Chest.set(0)
            .Class.set(1)
            .Face.set(0)
            .FacialHair.set(0)
            .Feet.set(0)
            .Gender.set(0)
            .Guild.set(0)
            .Hair.set(0)
            .HairColor.set(0)
            .Hands.set(0)
            .Head.set(0)
            .Legs.set(0)
            .NPCSounds.set(0)
            .Race.set(0)
            .Shirt.set(0)
            .Shoulders.set(0)
            .Skin.set(0)
            .Tabard.set(0)
            .Waist.set(0)
            .Wrists.set(0)
    }
    protected FindByID(id: number): creature_template_outfitsRow {
        return SQL.creature_template_outfits.query({entry: id})
    }
    ID(e: CreatureOutfit): number {
        return e.ID
    }
    protected EmptyQuery(): creature_template_outfitsQuery {
        return {}
    }
    protected Entity(r: creature_template_outfitsRow): CreatureOutfit {
        return new CreatureOutfit(r);
    }
}

export const CreatureOutfitsRegistry = new CreatureOutfitsRegistryClass()