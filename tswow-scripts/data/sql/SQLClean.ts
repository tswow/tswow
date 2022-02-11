import { SqlConnection } from "./SQLConnection";

export function cleanSQL() {
    function q(sql: string) {
        SqlConnection.world_dst.writeEarly(sql);
    }

    function col(table: string) {
        const exists = SqlConnection.world_dst.read(`SELECT * from
            \`INFORMATION_SCHEMA\`.\`COLUMNS\`
            WHERE table_schema = '${SqlConnection.world_dst.databaseName()}'
            AND table_name = '${table}'
            AND column_name = '__tswow_tag';
        `).length > 0;
        if(!exists) {
            console.log(`Adding tag column '__tswow_tag' to ${table}`)
            SqlConnection.world_dst.read(
                `ALTER TABLE \`${table}\`
                    ADD \`__tswow_tag\` int(1) NOT NULL default '0'`
            );
            SqlConnection.world_dst.read(
                `UPDATE \`${table}\` set \`__tswow_tag\` = 1;`
            );
        }
        q(`DELETE FROM \`${table}\` WHERE \`__tswow_tag\` = 0;`)
    }

    col('game_event_creature');
    col('game_event_creature_quest');
    col('game_event_gameobject');
    col('game_event_gameobject_quest');
    col('game_event_model_equip');
    col('game_event_npcflag');
    col('game_event_npc_vendor');
    col('game_event_quest_condition');
    col('game_event_seasonal_questrelation');
    col('game_event_prerequisite');
    col('game_event_quest_condition');
    col('holiday_dates');
    col('spell_custom_attr');
    col('spell_proc')
    col('spell_group')
    col('spell_autolearn')
    col('creature_queststarter')
    col('creature_questender')
    col('gameobject_template')
    col('areatrigger_teleport')
    col('instance_addon')
    col('instance_boss_boundary')
    col('instance_boss_creature')
    col('instance_encounter_achievement')
    col('instance_door_object')

    q('DELETE FROM graveyard_zone WHERE comment = "tswow";');
    q('DELETE FROM spell_target_position WHERE VerifiedBuild = 17688;');
    q('DELETE FROM spell_bonus_data WHERE comments = "tswow";');
    q('DELETE FROM smart_scripts WHERE comment = "tswow";');
    q('DELETE FROM gossip_menu_option WHERE VerifiedBuild = 17688;')
    q('DELETE FROM gossip_menu WHERE VerifiedBuild = 17688;')
    q('DELETE FROM trainer_spell WHERE VerifiedBuild = 17688;')
    q('DELETE FROM waypoints WHERE point_comment = "tswow";')
    q('DELETE FROM npc_vendor WHERE VerifiedBuild = 17688;')
    q('DELETE FROM conditions WHERE Comment = "tswow";')
    q('DELETE FROM creature WHERE VerifiedBuild = 17688 OR VerifiedBuild = 17689;')
    q('DELETE FROM gameobject WHERE VerifiedBuild = 17688 OR VerifiedBuild = 17689;')
    q('DELETE FROM playercreateinfo_cast_spell WHERE note = "tswow";')
    q('DELETE FROM playercreateinfo_skills WHERE comment = "tswow";')
    q('DELETE FROM playercreateinfo_spell_custom WHERE Note = "tswow";')
    q('DELETE FROM mail_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM creature_loot_template WHERE Comment = "tswow";')
    q('DELETE FROM fishing_loot_template WHERE Comment = "tswow";')
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
    q('DELETE FROM game_event_condition WHERE description = "tswow";')

    q(`SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'tbl_name' AND COLUMN_NAME = 'column_name'`)
}