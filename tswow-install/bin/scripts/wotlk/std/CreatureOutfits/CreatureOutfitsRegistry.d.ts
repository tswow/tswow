import { Table } from "../../../data/table/Table";
import { creature_template_outfitsQuery, creature_template_outfitsRow } from "../../sql/creature_template_outfits";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { CreatureOutfit } from "./CreatureOutfits";
export declare class CreatureOutfitsRegistryClass extends RegistryDynamic<CreatureOutfit, creature_template_outfitsRow, creature_template_outfitsQuery> {
    protected Table(): Table<any, creature_template_outfitsQuery, creature_template_outfitsRow> & {
        add: (id: number) => creature_template_outfitsRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: CreatureOutfit): void;
    protected FindByID(id: number): creature_template_outfitsRow;
    ID(e: CreatureOutfit): number;
    protected EmptyQuery(): creature_template_outfitsQuery;
    protected Entity(r: creature_template_outfitsRow): CreatureOutfit;
}
export declare const CreatureOutfitsRegistry: CreatureOutfitsRegistryClass;
