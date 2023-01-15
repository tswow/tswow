import { isTrinityCore } from "../Settings";
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
    if(isTrinityCore()) {
        col('spell_autolearn')
    }
    col('creature_queststarter')
    col('creature_questender')
    col('gameobject_template')
    col('areatrigger_teleport')
    if(isTrinityCore()) {
        col('instance_addon')
        col('instance_boss_boundary')
        col('instance_boss_creature')
        col('instance_encounter_achievement')
        col('instance_door_object')
    }
    col('graveyard_zone')
    col('spell_target_position')
    col('spell_bonus_data')
    col('smart_scripts')
    col('gossip_menu_option')
    col('gossip_menu')
    if(isTrinityCore()) {
        col('trainer_spell')
    }
    col('waypoints')
    col('npc_vendor')
    col('conditions')
    col('creature')
    col('gameobject')
    col('playercreateinfo_skills')
    col('playercreateinfo_spell_custom')
    col('playercreateinfo_action')
    col('mail_loot_template')
    col('fishing_loot_template')
    col('creature_loot_template')
    col('disenchant_loot_template')
    col('gameobject_loot_template')
    col('item_loot_template')
    col('milling_loot_template')
    col('pickpocketing_loot_template')
    col('prospecting_loot_template')
    col('reference_loot_template')
    col('skinning_loot_template')
    col('spell_loot_template')
    col('creature_text')
    if(isTrinityCore()) {
        col('creature_template_outfits')
    }
    col('transports')
    col('quest_poi_points')
    col('quest_poi')
    col('lfg_dungeon_template')
    if(isTrinityCore()) {
        col('access_requirement')
    }

    col('game_event')
    if(isTrinityCore()) {
        col('game_event_condition')
    }
}