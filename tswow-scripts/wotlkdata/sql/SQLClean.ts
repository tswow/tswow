import { SqlConnection } from "./SQLConnection";

export function cleanSQL() {
    function q(sql: string) {
        SqlConnection.world_dst.writeEarly(sql);
    }

    q('DELETE FROM smart_scripts WHERE comment = "tswow";');
    q('DELETE FROM gossip_menu_option WHERE VerifiedBuild = 17688;')
    q('DELETE FROM trainer_spell WHERE VerifiedBuild = 17688;')
    q('DELETE FROM waypoints WHERE point_comment = "tswow";')
    q('DELETE FROM npc_vendor WHERE VerifiedBuild = 17688;')
    q('DELETE FROM conditions WHERE Comment = "tswow";')
    q('DELETE FROM creature WHERE VerifiedBuild = 17688;')
    q('DELETE FROM playercreateinfo_cast_spell WHERE note = "tswow";')
    q('DELETE FROM playercreateinfo_skills WHERE comment = "tswow";')
    q('DELETE FROM playercreateinfo_spell_custom WHERE Note = "tswow";')
    q('DELETE FROM mail_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM creature_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM disenchant_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM gameobject_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM item_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM milling_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM pickpocketing_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM prospecting_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM reference_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM skinning_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM spell_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM creature_text WHERE comment = "tswow";')
    q('DELETE FROM creature_template_outfits WHERE description = "tswow";')
    q('DELETE FROM transports WHERE name = "tswow";')
    q('DELETE FROM quest_poi_points WHERE VerifiedBuild = 17688;')
    q('DELETE FROM quest_poi WHERE VerifiedBuild = 17688;')
    q('DELETE FROM lfg_dungeon_template WHERE VerifiedBuild = 17688;')
    q('DELETE FROM access_requirement WHERE comment = "tswow";')
    q('DELETE FROM game_event WHERE description = "tswow";')
}