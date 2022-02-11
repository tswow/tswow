/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
/* tslint:disable */
import { Connection, SqlConnection } from '../data/sql/SQLConnection'
import { SqlTable } from '../data/sql/SQLTable'
import { SQL_access_requirement } from './sql/access_requirement'
import { SQL_achievement_criteria_data } from './sql/achievement_criteria_data'
import { SQL_achievement_dbc } from './sql/achievement_dbc'
import { SQL_achievement_reward } from './sql/achievement_reward'
import { SQL_achievement_reward_locale } from './sql/achievement_reward_locale'
import { SQL_areatrigger_involvedrelation } from './sql/areatrigger_involvedrelation'
import { SQL_areatrigger_scripts } from './sql/areatrigger_scripts'
import { SQL_areatrigger_tavern } from './sql/areatrigger_tavern'
import { SQL_areatrigger_teleport } from './sql/areatrigger_teleport'
import { SQL_battleground_door_object } from './sql/battleground_door_object'
import { SQL_battleground_sets } from './sql/battleground_sets'
import { SQL_battleground_template } from './sql/battleground_template'
import { SQL_battlemaster_entry } from './sql/battlemaster_entry'
import { SQL_broadcast_text } from './sql/broadcast_text'
import { SQL_broadcast_text_locale } from './sql/broadcast_text_locale'
import { SQL_class_stat_formulas } from './sql/class_stat_formulas'
import { SQL_class_stat_values } from './sql/class_stat_values'
import { SQL_command } from './sql/command'
import { SQL_conditions } from './sql/conditions'
import { SQL_creature } from './sql/creature'
import { SQL_creature_addon } from './sql/creature_addon'
import { SQL_creature_classlevelstats } from './sql/creature_classlevelstats'
import { SQL_creature_default_trainer } from './sql/creature_default_trainer'
import { SQL_creature_equip_template } from './sql/creature_equip_template'
import { SQL_creature_formations } from './sql/creature_formations'
import { SQL_creature_loot_template } from './sql/creature_loot_template'
import { SQL_creature_model_info } from './sql/creature_model_info'
import { SQL_creature_movement_override } from './sql/creature_movement_override'
import { SQL_creature_onkill_reputation } from './sql/creature_onkill_reputation'
import { SQL_creature_questender } from './sql/creature_questender'
import { SQL_creature_questitem } from './sql/creature_questitem'
import { SQL_creature_queststarter } from './sql/creature_queststarter'
import { SQL_creature_template } from './sql/creature_template'
import { SQL_creature_template_addon } from './sql/creature_template_addon'
import { SQL_creature_template_locale } from './sql/creature_template_locale'
import { SQL_creature_template_movement } from './sql/creature_template_movement'
import { SQL_creature_template_outfits } from './sql/creature_template_outfits'
import { SQL_creature_template_resistance } from './sql/creature_template_resistance'
import { SQL_creature_template_spell } from './sql/creature_template_spell'
import { SQL_creature_text } from './sql/creature_text'
import { SQL_creature_text_locale } from './sql/creature_text_locale'
import { SQL_disables } from './sql/disables'
import { SQL_disenchant_loot_template } from './sql/disenchant_loot_template'
import { SQL_exploration_basexp } from './sql/exploration_basexp'
import { SQL_fishing_loot_template } from './sql/fishing_loot_template'
import { SQL_gameobject } from './sql/gameobject'
import { SQL_gameobject_addon } from './sql/gameobject_addon'
import { SQL_gameobject_loot_template } from './sql/gameobject_loot_template'
import { SQL_gameobject_overrides } from './sql/gameobject_overrides'
import { SQL_gameobject_questender } from './sql/gameobject_questender'
import { SQL_gameobject_questitem } from './sql/gameobject_questitem'
import { SQL_gameobject_queststarter } from './sql/gameobject_queststarter'
import { SQL_gameobject_template } from './sql/gameobject_template'
import { SQL_gameobject_template_addon } from './sql/gameobject_template_addon'
import { SQL_gameobject_template_locale } from './sql/gameobject_template_locale'
import { SQL_game_event } from './sql/game_event'
import { SQL_game_event_battleground_holiday } from './sql/game_event_battleground_holiday'
import { SQL_game_event_condition } from './sql/game_event_condition'
import { SQL_game_event_creature } from './sql/game_event_creature'
import { SQL_game_event_creature_quest } from './sql/game_event_creature_quest'
import { SQL_game_event_gameobject } from './sql/game_event_gameobject'
import { SQL_game_event_gameobject_quest } from './sql/game_event_gameobject_quest'
import { SQL_game_event_model_equip } from './sql/game_event_model_equip'
import { SQL_game_event_npcflag } from './sql/game_event_npcflag'
import { SQL_game_event_npc_vendor } from './sql/game_event_npc_vendor'
import { SQL_game_event_pool } from './sql/game_event_pool'
import { SQL_game_event_prerequisite } from './sql/game_event_prerequisite'
import { SQL_game_event_quest_condition } from './sql/game_event_quest_condition'
import { SQL_game_event_seasonal_questrelation } from './sql/game_event_seasonal_questrelation'
import { SQL_game_tele } from './sql/game_tele'
import { SQL_game_weather } from './sql/game_weather'
import { SQL_gossip_menu } from './sql/gossip_menu'
import { SQL_gossip_menu_option } from './sql/gossip_menu_option'
import { SQL_gossip_menu_option_locale } from './sql/gossip_menu_option_locale'
import { SQL_graveyard_zone } from './sql/graveyard_zone'
import { SQL_holiday_dates } from './sql/holiday_dates'
import { SQL_instance_addon } from './sql/instance_addon'
import { SQL_instance_boss_boundary } from './sql/instance_boss_boundary'
import { SQL_instance_boss_creature } from './sql/instance_boss_creature'
import { SQL_instance_door_object } from './sql/instance_door_object'
import { SQL_instance_encounters } from './sql/instance_encounters'
import { SQL_instance_encounter_achievement } from './sql/instance_encounter_achievement'
import { SQL_instance_spawn_groups } from './sql/instance_spawn_groups'
import { SQL_instance_template } from './sql/instance_template'
import { SQL_item_enchantment_template } from './sql/item_enchantment_template'
import { SQL_item_loot_template } from './sql/item_loot_template'
import { SQL_item_set_names } from './sql/item_set_names'
import { SQL_item_set_names_locale } from './sql/item_set_names_locale'
import { SQL_item_template } from './sql/item_template'
import { SQL_item_template_locale } from './sql/item_template_locale'
import { SQL_lfg_dungeon_rewards } from './sql/lfg_dungeon_rewards'
import { SQL_lfg_dungeon_template } from './sql/lfg_dungeon_template'
import { SQL_linked_respawn } from './sql/linked_respawn'
import { SQL_mail_level_reward } from './sql/mail_level_reward'
import { SQL_mail_loot_template } from './sql/mail_loot_template'
import { SQL_milling_loot_template } from './sql/milling_loot_template'
import { SQL_npc_spellclick_spells } from './sql/npc_spellclick_spells'
import { SQL_npc_text } from './sql/npc_text'
import { SQL_npc_text_locale } from './sql/npc_text_locale'
import { SQL_npc_vendor } from './sql/npc_vendor'
import { SQL_outdoorpvp_template } from './sql/outdoorpvp_template'
import { SQL_page_text } from './sql/page_text'
import { SQL_page_text_locale } from './sql/page_text_locale'
import { SQL_pet_levelstats } from './sql/pet_levelstats'
import { SQL_pet_name_generation } from './sql/pet_name_generation'
import { SQL_pickpocketing_loot_template } from './sql/pickpocketing_loot_template'
import { SQL_playercreateinfo } from './sql/playercreateinfo'
import { SQL_playercreateinfo_action } from './sql/playercreateinfo_action'
import { SQL_playercreateinfo_item } from './sql/playercreateinfo_item'
import { SQL_playercreateinfo_skills } from './sql/playercreateinfo_skills'
import { SQL_playercreateinfo_spell_custom } from './sql/playercreateinfo_spell_custom'
import { SQL_player_classlevelstats } from './sql/player_classlevelstats'
import { SQL_player_class_roles } from './sql/player_class_roles'
import { SQL_player_factionchange_achievement } from './sql/player_factionchange_achievement'
import { SQL_player_factionchange_items } from './sql/player_factionchange_items'
import { SQL_player_factionchange_quests } from './sql/player_factionchange_quests'
import { SQL_player_factionchange_reputations } from './sql/player_factionchange_reputations'
import { SQL_player_factionchange_spells } from './sql/player_factionchange_spells'
import { SQL_player_factionchange_titles } from './sql/player_factionchange_titles'
import { SQL_player_levelstats } from './sql/player_levelstats'
import { SQL_player_totem_model } from './sql/player_totem_model'
import { SQL_player_xp_for_level } from './sql/player_xp_for_level'
import { SQL_points_of_interest } from './sql/points_of_interest'
import { SQL_points_of_interest_locale } from './sql/points_of_interest_locale'
import { SQL_pool_members } from './sql/pool_members'
import { SQL_pool_template } from './sql/pool_template'
import { SQL_prospecting_loot_template } from './sql/prospecting_loot_template'
import { SQL_quest_details } from './sql/quest_details'
import { SQL_quest_greeting } from './sql/quest_greeting'
import { SQL_quest_greeting_locale } from './sql/quest_greeting_locale'
import { SQL_quest_mail_sender } from './sql/quest_mail_sender'
import { SQL_quest_offer_reward } from './sql/quest_offer_reward'
import { SQL_quest_offer_reward_locale } from './sql/quest_offer_reward_locale'
import { SQL_quest_poi } from './sql/quest_poi'
import { SQL_quest_poi_points } from './sql/quest_poi_points'
import { SQL_quest_pool_members } from './sql/quest_pool_members'
import { SQL_quest_pool_template } from './sql/quest_pool_template'
import { SQL_quest_request_items } from './sql/quest_request_items'
import { SQL_quest_request_items_locale } from './sql/quest_request_items_locale'
import { SQL_quest_template } from './sql/quest_template'
import { SQL_quest_template_addon } from './sql/quest_template_addon'
import { SQL_quest_template_locale } from './sql/quest_template_locale'
import { SQL_reference_loot_template } from './sql/reference_loot_template'
import { SQL_reputation_reward_rate } from './sql/reputation_reward_rate'
import { SQL_reputation_spillover_template } from './sql/reputation_spillover_template'
import { SQL_script_spline_chain_meta } from './sql/script_spline_chain_meta'
import { SQL_script_spline_chain_waypoints } from './sql/script_spline_chain_waypoints'
import { SQL_script_waypoint } from './sql/script_waypoint'
import { SQL_skill_discovery_template } from './sql/skill_discovery_template'
import { SQL_skill_extra_item_template } from './sql/skill_extra_item_template'
import { SQL_skill_fishing_base_level } from './sql/skill_fishing_base_level'
import { SQL_skill_perfect_item_template } from './sql/skill_perfect_item_template'
import { SQL_skinning_loot_template } from './sql/skinning_loot_template'
import { SQL_smart_scripts } from './sql/smart_scripts'
import { SQL_spawn_group } from './sql/spawn_group'
import { SQL_spawn_group_template } from './sql/spawn_group_template'
import { SQL_spelldifficulty_dbc } from './sql/spelldifficulty_dbc'
import { SQL_spell_area } from './sql/spell_area'
import { SQL_spell_autolearn } from './sql/spell_autolearn'
import { SQL_spell_bonus_data } from './sql/spell_bonus_data'
import { SQL_spell_custom_attr } from './sql/spell_custom_attr'
import { SQL_spell_dbc } from './sql/spell_dbc'
import { SQL_spell_enchant_proc_data } from './sql/spell_enchant_proc_data'
import { SQL_spell_group } from './sql/spell_group'
import { SQL_spell_group_stack_rules } from './sql/spell_group_stack_rules'
import { SQL_spell_learn_spell } from './sql/spell_learn_spell'
import { SQL_spell_loot_template } from './sql/spell_loot_template'
import { SQL_spell_pet_auras } from './sql/spell_pet_auras'
import { SQL_spell_proc } from './sql/spell_proc'
import { SQL_spell_ranks } from './sql/spell_ranks'
import { SQL_spell_required } from './sql/spell_required'
import { SQL_spell_target_position } from './sql/spell_target_position'
import { SQL_spell_threat } from './sql/spell_threat'
import { SQL_trainer } from './sql/trainer'
import { SQL_trainer_locale } from './sql/trainer_locale'
import { SQL_trainer_spell } from './sql/trainer_spell'
import { SQL_transports } from './sql/transports'
import { SQL_trinity_string } from './sql/trinity_string'
import { SQL_updates } from './sql/updates'
import { SQL_updates_include } from './sql/updates_include'
import { SQL_vehicle_accessory } from './sql/vehicle_accessory'
import { SQL_vehicle_seat_addon } from './sql/vehicle_seat_addon'
import { SQL_vehicle_template_accessory } from './sql/vehicle_template_accessory'
import { SQL_version } from './sql/version'
import { SQL_waypoints } from './sql/waypoints'
import { SQL_waypoint_data } from './sql/waypoint_data'
import { SQL_waypoint_scripts } from './sql/waypoint_scripts'

export class Databases {
    private isDatabase = true;
    get world_source() { return SqlConnection.world_src; }
    get world_dest() { return SqlConnection.world_dst; }
    get auth() { return SqlConnection.auth; }

    connect(config: any) {
        let con = new Connection(config);
        SqlConnection.additional.push(con);
        Connection.connect(con);
        return con;
    }
}

export const SQL = {
    Databases : new Databases(),

    /**
     * No comment (yet!)
     */
    access_requirement : SQL_access_requirement,

    /**
     * No comment (yet!)
     */
    achievement_criteria_data : SQL_achievement_criteria_data,

    /**
     * SQL table of DBC data. Populating this table makes the server ignore the corresponding DBC file.
     *
     * Only use this table if AzerothCore already does, very few are actually used.
     */
    achievement_dbc : SQL_achievement_dbc,

    /**
     * No comment (yet!)
     */
    achievement_reward : SQL_achievement_reward,

    /**
     * No comment (yet!)
     */
    achievement_reward_locale : SQL_achievement_reward_locale,

    /**
     * No comment (yet!)
     */
    areatrigger_involvedrelation : SQL_areatrigger_involvedrelation,

    /**
     * No comment (yet!)
     */
    areatrigger_scripts : SQL_areatrigger_scripts,

    /**
     * No comment (yet!)
     */
    areatrigger_tavern : SQL_areatrigger_tavern,

    /**
     * No comment (yet!)
     */
    areatrigger_teleport : SQL_areatrigger_teleport,

    /**
     * No comment (yet!)
     */
    battleground_door_object : SQL_battleground_door_object,

    /**
     * No comment (yet!)
     */
    battleground_sets : SQL_battleground_sets,

    /**
     * No comment (yet!)
     */
    battleground_template : SQL_battleground_template,

    /**
     * No comment (yet!)
     */
    battlemaster_entry : SQL_battlemaster_entry,

    /**
     * No comment (yet!)
     */
    broadcast_text : SQL_broadcast_text,

    /**
     * No comment (yet!)
     */
    broadcast_text_locale : SQL_broadcast_text_locale,

    /**
     * No comment (yet!)
     */
    class_stat_formulas : SQL_class_stat_formulas,

    /**
     * No comment (yet!)
     */
    class_stat_values : SQL_class_stat_values,

    /**
     * No comment (yet!)
     */
    command : SQL_command,

    /**
     * No comment (yet!)
     */
    conditions : SQL_conditions,

    /**
     * No comment (yet!)
     */
    creature : SQL_creature,

    /**
     * No comment (yet!)
     */
    creature_addon : SQL_creature_addon,

    /**
     * No comment (yet!)
     */
    creature_classlevelstats : SQL_creature_classlevelstats,

    /**
     * No comment (yet!)
     */
    creature_default_trainer : SQL_creature_default_trainer,

    /**
     * No comment (yet!)
     */
    creature_equip_template : SQL_creature_equip_template,

    /**
     * No comment (yet!)
     */
    creature_formations : SQL_creature_formations,

    /**
     * No comment (yet!)
     */
    creature_loot_template : SQL_creature_loot_template,

    /**
     * No comment (yet!)
     */
    creature_model_info : SQL_creature_model_info,

    /**
     * No comment (yet!)
     */
    creature_movement_override : SQL_creature_movement_override,

    /**
     * No comment (yet!)
     */
    creature_onkill_reputation : SQL_creature_onkill_reputation,

    /**
     * No comment (yet!)
     */
    creature_questender : SQL_creature_questender,

    /**
     * No comment (yet!)
     */
    creature_questitem : SQL_creature_questitem,

    /**
     * No comment (yet!)
     */
    creature_queststarter : SQL_creature_queststarter,

    /**
     * No comment (yet!)
     */
    creature_template : SQL_creature_template,

    /**
     * No comment (yet!)
     */
    creature_template_addon : SQL_creature_template_addon,

    /**
     * No comment (yet!)
     */
    creature_template_locale : SQL_creature_template_locale,

    /**
     * No comment (yet!)
     */
    creature_template_movement : SQL_creature_template_movement,

    /**
     * No comment (yet!)
     */
    creature_template_outfits: SQL_creature_template_outfits,

    /**
     * No comment (yet!)
     */
    creature_template_resistance : SQL_creature_template_resistance,

    /**
     * No comment (yet!)
     */
    creature_template_spell : SQL_creature_template_spell,

    /**
     * No comment (yet!)
     */
    creature_text : SQL_creature_text,

    /**
     * No comment (yet!)
     */
    creature_text_locale : SQL_creature_text_locale,

    /**
     * No comment (yet!)
     */
    disables : SQL_disables,

    /**
     * No comment (yet!)
     */
    disenchant_loot_template : SQL_disenchant_loot_template,

    /**
     * No comment (yet!)
     */
    exploration_basexp : SQL_exploration_basexp,

    /**
     * No comment (yet!)
     */
    fishing_loot_template : SQL_fishing_loot_template,

    /**
     * No comment (yet!)
     */
    game_event : SQL_game_event,

    /**
     * No comment (yet!)
     */
    game_event_battleground_holiday : SQL_game_event_battleground_holiday,

    /**
     * No comment (yet!)
     */
    game_event_condition : SQL_game_event_condition,

    /**
     * No comment (yet!)
     */
    game_event_creature : SQL_game_event_creature,

    /**
     * No comment (yet!)
     */
    game_event_creature_quest : SQL_game_event_creature_quest,

    /**
     * No comment (yet!)
     */
    game_event_gameobject : SQL_game_event_gameobject,

    /**
     * No comment (yet!)
     */
    game_event_gameobject_quest : SQL_game_event_gameobject_quest,

    /**
     * No comment (yet!)
     */
    game_event_model_equip : SQL_game_event_model_equip,

    /**
     * No comment (yet!)
     */
    game_event_npc_vendor : SQL_game_event_npc_vendor,

    /**
     * No comment (yet!)
     */
    game_event_npcflag : SQL_game_event_npcflag,

    /**
     * No comment (yet!)
     */
    game_event_pool : SQL_game_event_pool,

    /**
     * No comment (yet!)
     */
    game_event_prerequisite : SQL_game_event_prerequisite,

    /**
     * No comment (yet!)
     */
    game_event_quest_condition : SQL_game_event_quest_condition,

    /**
     * No comment (yet!)
     */
    game_event_seasonal_questrelation : SQL_game_event_seasonal_questrelation,

    /**
     * No comment (yet!)
     */
    game_tele : SQL_game_tele,

    /**
     * No comment (yet!)
     */
    game_weather : SQL_game_weather,

    /**
     * No comment (yet!)
     */
    gameobject : SQL_gameobject,

    /**
     * No comment (yet!)
     */
    gameobject_addon : SQL_gameobject_addon,

    /**
     * No comment (yet!)
     */
    gameobject_loot_template : SQL_gameobject_loot_template,

    /**
     * No comment (yet!)
     */
    gameobject_overrides : SQL_gameobject_overrides,

    /**
     * No comment (yet!)
     */
    gameobject_questender : SQL_gameobject_questender,

    /**
     * No comment (yet!)
     */
    gameobject_questitem : SQL_gameobject_questitem,

    /**
     * No comment (yet!)
     */
    gameobject_queststarter : SQL_gameobject_queststarter,

    /**
     * No comment (yet!)
     */
    gameobject_template : SQL_gameobject_template,

    /**
     * No comment (yet!)
     */
    gameobject_template_addon : SQL_gameobject_template_addon,

    /**
     * No comment (yet!)
     */
    gameobject_template_locale : SQL_gameobject_template_locale,

    /**
     * No comment (yet!)
     */
    gossip_menu : SQL_gossip_menu,

    /**
     * No comment (yet!)
     */
    gossip_menu_option : SQL_gossip_menu_option,

    /**
     * No comment (yet!)
     */
    gossip_menu_option_locale : SQL_gossip_menu_option_locale,

    /**
     * No comment (yet!)
     */
    graveyard_zone : SQL_graveyard_zone,

    /**
     * No comment (yet!)
     */
    holiday_dates : SQL_holiday_dates,

    /**
     * No comment (yet!)
     */
    instance_addon: SQL_instance_addon,

    /**
     * No comment (yet!)
     */
    instance_boss_boundary : SQL_instance_boss_boundary,

    /**
     * No comment (yet!)
     */
    instance_boss_creature : SQL_instance_boss_creature,

    /**
     * No comment (yet!)
     */
    instance_door_object: SQL_instance_door_object,

    /**
     * No comment (yet!)
     */
    instance_encounter_achievement: SQL_instance_encounter_achievement,

    /**
     * No comment (yet!)
     */
    instance_encounters : SQL_instance_encounters,

    /**
     * No comment (yet!)
     */
    instance_spawn_groups : SQL_instance_spawn_groups,

    /**
     * No comment (yet!)
     */
    instance_template : SQL_instance_template,

    /**
     * No comment (yet!)
     */
    item_enchantment_template : SQL_item_enchantment_template,

    /**
     * No comment (yet!)
     */
    item_loot_template : SQL_item_loot_template,

    /**
     * No comment (yet!)
     */
    item_set_names : SQL_item_set_names,

    /**
     * No comment (yet!)
     */
    item_set_names_locale : SQL_item_set_names_locale,

    /**
     * No comment (yet!)
     */
    item_template : SQL_item_template,

    /**
     * No comment (yet!)
     */
    item_template_locale : SQL_item_template_locale,

    /**
     * No comment (yet!)
     */
    lfg_dungeon_rewards : SQL_lfg_dungeon_rewards,

    /**
     * No comment (yet!)
     */
    lfg_dungeon_template : SQL_lfg_dungeon_template,

    /**
     * No comment (yet!)
     */
    linked_respawn : SQL_linked_respawn,

    /**
     * No comment (yet!)
     */
    mail_level_reward : SQL_mail_level_reward,

    /**
     * No comment (yet!)
     */
    mail_loot_template : SQL_mail_loot_template,

    /**
     * No comment (yet!)
     */
    milling_loot_template : SQL_milling_loot_template,

    /**
     * No comment (yet!)
     */
    npc_spellclick_spells : SQL_npc_spellclick_spells,

    /**
     * No comment (yet!)
     */
    npc_text : SQL_npc_text,

    /**
     * No comment (yet!)
     */
    npc_text_locale : SQL_npc_text_locale,

    /**
     * No comment (yet!)
     */
    npc_vendor : SQL_npc_vendor,

    /**
     * No comment (yet!)
     */
    outdoorpvp_template : SQL_outdoorpvp_template,

    /**
     * No comment (yet!)
     */
    page_text : SQL_page_text,

    /**
     * No comment (yet!)
     */
    page_text_locale : SQL_page_text_locale,

    /**
     * No comment (yet!)
     */
    pet_levelstats : SQL_pet_levelstats,

    /**
     * No comment (yet!)
     */
    pet_name_generation : SQL_pet_name_generation,

    /**
     * No comment (yet!)
     */
    pickpocketing_loot_template : SQL_pickpocketing_loot_template,

    /**
     * No comment (yet!)
     */
    player_classlevelstats : SQL_player_classlevelstats,

    /**
     * No comment (yet!)
     */
    player_class_roles : SQL_player_class_roles,

    /**
     * No comment (yet!)
     */
    player_factionchange_achievement : SQL_player_factionchange_achievement,

    /**
     * No comment (yet!)
     */
    player_factionchange_items : SQL_player_factionchange_items,

    /**
     * No comment (yet!)
     */
    player_factionchange_quests : SQL_player_factionchange_quests,

    /**
     * No comment (yet!)
     */
    player_factionchange_reputations : SQL_player_factionchange_reputations,

    /**
     * No comment (yet!)
     */
    player_factionchange_spells : SQL_player_factionchange_spells,

    /**
     * No comment (yet!)
     */
    player_factionchange_titles : SQL_player_factionchange_titles,

    /**
     * No comment (yet!)
     */
    player_levelstats : SQL_player_levelstats,

    /**
     * No comment (yet!)
     */
    player_totem_model : SQL_player_totem_model,

    /**
     * No comment (yet!)
     */
    player_xp_for_level : SQL_player_xp_for_level,

    /**
     * No comment (yet!)
     */
    playercreateinfo : SQL_playercreateinfo,

    /**
     * No comment (yet!)
     */
    playercreateinfo_action : SQL_playercreateinfo_action,

    /**
     * No comment (yet!)
     */
    playercreateinfo_item : SQL_playercreateinfo_item,

    /**
     * No comment (yet!)
     */
    playercreateinfo_skills : SQL_playercreateinfo_skills,

    /**
     * No comment (yet!)
     */
    playercreateinfo_spell_custom : SQL_playercreateinfo_spell_custom,

    /**
     * No comment (yet!)
     */
    points_of_interest : SQL_points_of_interest,

    /**
     * No comment (yet!)
     */
    points_of_interest_locale : SQL_points_of_interest_locale,

    /**
     * No comment (yet!)
     */
    pool_members : SQL_pool_members,

    /**
     * No comment (yet!)
     */
    pool_template : SQL_pool_template,

    /**
     * No comment (yet!)
     */
    prospecting_loot_template : SQL_prospecting_loot_template,

    /**
     * No comment (yet!)
     */
    quest_details : SQL_quest_details,

    /**
     * No comment (yet!)
     */
    quest_greeting : SQL_quest_greeting,

    /**
     * No comment (yet!)
     */
    quest_greeting_locale : SQL_quest_greeting_locale,

    /**
     * No comment (yet!)
     */
    quest_mail_sender : SQL_quest_mail_sender,

    /**
     * No comment (yet!)
     */
    quest_offer_reward : SQL_quest_offer_reward,

    /**
     * No comment (yet!)
     */
    quest_offer_reward_locale : SQL_quest_offer_reward_locale,

    /**
     * No comment (yet!)
     */
    quest_poi : SQL_quest_poi,

    /**
     * No comment (yet!)
     */
    quest_poi_points : SQL_quest_poi_points,

    /**
     * No comment (yet!)
     */
    quest_pool_members : SQL_quest_pool_members,

    /**
     * No comment (yet!)
     */
    quest_pool_template : SQL_quest_pool_template,

    /**
     * No comment (yet!)
     */
    quest_request_items : SQL_quest_request_items,

    /**
     * No comment (yet!)
     */
    quest_request_items_locale : SQL_quest_request_items_locale,

    /**
     * No comment (yet!)
     */
    quest_template : SQL_quest_template,

    /**
     * No comment (yet!)
     */
    quest_template_addon : SQL_quest_template_addon,

    /**
     * No comment (yet!)
     */
    quest_template_locale : SQL_quest_template_locale,

    /**
     * No comment (yet!)
     */
    reference_loot_template : SQL_reference_loot_template,

    /**
     * No comment (yet!)
     */
    reputation_reward_rate : SQL_reputation_reward_rate,

    /**
     * No comment (yet!)
     */
    reputation_spillover_template : SQL_reputation_spillover_template,

    /**
     * No comment (yet!)
     */
    script_spline_chain_meta : SQL_script_spline_chain_meta,

    /**
     * No comment (yet!)
     */
    script_spline_chain_waypoints : SQL_script_spline_chain_waypoints,

    /**
     * No comment (yet!)
     */
    script_waypoint : SQL_script_waypoint,

    /**
     * No comment (yet!)
     */
    skill_discovery_template : SQL_skill_discovery_template,

    /**
     * No comment (yet!)
     */
    skill_extra_item_template : SQL_skill_extra_item_template,

    /**
     * No comment (yet!)
     */
    skill_fishing_base_level : SQL_skill_fishing_base_level,

    /**
     * No comment (yet!)
     */
    skill_perfect_item_template : SQL_skill_perfect_item_template,

    /**
     * No comment (yet!)
     */
    skinning_loot_template : SQL_skinning_loot_template,

    /**
     * No comment (yet!)
     */
    smart_scripts : SQL_smart_scripts,

    /**
     * No comment (yet!)
     */
    spawn_group : SQL_spawn_group,

    /**
     * No comment (yet!)
     */
    spawn_group_template : SQL_spawn_group_template,

    /**
     * No comment (yet!)
     */
    spell_area : SQL_spell_area,

    /**
     * No comment (yet!)
     */
    spell_autolearn : SQL_spell_autolearn,

    /**
     * No comment (yet!)
     */
    spell_bonus_data : SQL_spell_bonus_data,

    /**
     * No comment (yet!)
     */
    spell_custom_attr : SQL_spell_custom_attr,

    /**
     * SQL table of DBC data. Populating this table makes the server ignore the corresponding DBC file.
     *
     * Only use this table if AzerothCore already does, very few are actually used.
     */
    spell_dbc : SQL_spell_dbc,

    /**
     * No comment (yet!)
     */
    spell_enchant_proc_data : SQL_spell_enchant_proc_data,

    /**
     * No comment (yet!)
     */
    spell_group : SQL_spell_group,

    /**
     * No comment (yet!)
     */
    spell_group_stack_rules : SQL_spell_group_stack_rules,

    /**
     * No comment (yet!)
     */
    spell_learn_spell : SQL_spell_learn_spell,

    /**
     * No comment (yet!)
     */
    spell_loot_template : SQL_spell_loot_template,

    /**
     * No comment (yet!)
     */
    spell_pet_auras : SQL_spell_pet_auras,

    /**
     * No comment (yet!)
     */
    spell_proc : SQL_spell_proc,

    /**
     * No comment (yet!)
     */
    spell_ranks : SQL_spell_ranks,

    /**
     * No comment (yet!)
     */
    spell_required : SQL_spell_required,

    /**
     * No comment (yet!)
     */
    spell_target_position : SQL_spell_target_position,

    /**
     * No comment (yet!)
     */
    spell_threat : SQL_spell_threat,

    /**
     * SQL table of DBC data. Populating this table makes the server ignore the corresponding DBC file.
     *
     * Only use this table if AzerothCore already does, very few are actually used.
     */
    spelldifficulty_dbc : SQL_spelldifficulty_dbc,

    /**
     * No comment (yet!)
     */
    trainer : SQL_trainer,

    /**
     * No comment (yet!)
     */
    trainer_locale : SQL_trainer_locale,

    /**
     * No comment (yet!)
     */
    trainer_spell : SQL_trainer_spell,

    /**
     * No comment (yet!)
     */
    transports : SQL_transports,

    /**
     * No comment (yet!)
     */
    trinity_string : SQL_trinity_string,

    /**
     * No comment (yet!)
     */
    updates : SQL_updates,

    /**
     * No comment (yet!)
     */
    updates_include : SQL_updates_include,

    /**
     * No comment (yet!)
     */
    vehicle_accessory : SQL_vehicle_accessory,

    /**
     * No comment (yet!)
     */
    vehicle_seat_addon : SQL_vehicle_seat_addon,

    /**
     * No comment (yet!)
     */
    vehicle_template_accessory : SQL_vehicle_template_accessory,

    /**
     * No comment (yet!)
     */
    version : SQL_version,

    /**
     * No comment (yet!)
     */
    waypoint_data : SQL_waypoint_data,

    /**
     * No comment (yet!)
     */
    waypoint_scripts : SQL_waypoint_scripts,

    /**
     * No comment (yet!)
     */
    waypoints : SQL_waypoints,
}

export type SQLNames = 'access_requirement' | 'achievement_criteria_data' | 'achievement_dbc' | 'achievement_reward' | 'achievement_reward_locale' | 'areatrigger_involvedrelation' | 'areatrigger_scripts' | 'areatrigger_tavern' | 'areatrigger_teleport' | 'battleground_template' | 'battleground_sets' | 'battlemaster_entry' | 'broadcast_text' | 'broadcast_text_locale' | 'command' | 'class_stat_formulas' | 'class_stat_values' | 'conditions' | 'creature' | 'creature_addon' | 'creature_classlevelstats' | 'creature_default_trainer' | 'creature_equip_template' | 'creature_formations' | 'creature_loot_template' | 'creature_model_info' | 'creature_movement_override' | 'creature_onkill_reputation' | 'creature_questender' | 'creature_questitem' | 'creature_queststarter' | 'creature_template' | 'creature_template_addon' | 'creature_template_locale' | 'creature_template_movement' | 'creature_template_resistance' | 'creature_template_spell' | 'creature_text' | 'creature_text_locale' | 'disables' | 'disenchant_loot_template' | 'exploration_basexp' | 'fishing_loot_template' | 'game_event' | 'game_event_battleground_holiday' | 'game_event_condition' | 'game_event_creature' | 'game_event_creature_quest' | 'game_event_gameobject' | 'game_event_gameobject_quest' | 'game_event_model_equip' | 'game_event_npc_vendor' | 'game_event_npcflag' | 'game_event_pool' | 'game_event_prerequisite' | 'game_event_quest_condition' | 'game_event_seasonal_questrelation' | 'game_tele' | 'game_weather' | 'gameobject' | 'gameobject_addon' | 'gameobject_loot_template' | 'gameobject_overrides' | 'gameobject_questender' | 'gameobject_questitem' | 'gameobject_queststarter' | 'gameobject_template' | 'gameobject_template_addon' | 'gameobject_template_locale' | 'gossip_menu' | 'gossip_menu_option' | 'gossip_menu_option_locale' | 'graveyard_zone' | 'holiday_dates' | 'instance_addon' | 'instance_boss_boundary' | 'instance_boss_creature' | 'instance_encounter_achievement' | 'instance_encounters' | 'instance_spawn_groups' | 'instance_template' | 'item_enchantment_template' | 'item_loot_template' | 'item_set_names' | 'item_set_names_locale' | 'item_template' | 'item_template_locale' | 'lfg_dungeon_rewards' | 'lfg_dungeon_template' | 'linked_respawn' | 'mail_level_reward' | 'mail_loot_template' | 'milling_loot_template' | 'npc_spellclick_spells' | 'npc_text' | 'npc_text_locale' | 'npc_vendor' | 'outdoorpvp_template' | 'page_text' | 'page_text_locale' | 'pet_levelstats' | 'pet_name_generation' | 'pickpocketing_loot_template' | 'player_classlevelstats' | 'player_factionchange_achievement' | 'player_factionchange_items' | 'player_factionchange_quests' | 'player_factionchange_reputations' | 'player_factionchange_spells' | 'player_factionchange_titles' | 'player_levelstats' | 'player_totem_model' | 'player_xp_for_level' | 'playercreateinfo' | 'playercreateinfo_action' | 'playercreateinfo_item' | 'playercreateinfo_skills' | 'playercreateinfo_spell_custom' | 'points_of_interest' | 'points_of_interest_locale' | 'pool_members' | 'pool_template' | 'prospecting_loot_template' | 'quest_details' | 'quest_greeting' | 'quest_greeting_locale' | 'quest_mail_sender' | 'quest_offer_reward' | 'quest_offer_reward_locale' | 'quest_poi' | 'quest_poi_points' | 'quest_pool_members' | 'quest_pool_template' | 'quest_request_items' | 'quest_request_items_locale' | 'quest_template' | 'quest_template_addon' | 'quest_template_locale' | 'reference_loot_template' | 'reputation_reward_rate' | 'reputation_spillover_template' | 'script_spline_chain_meta' | 'script_spline_chain_waypoints' | 'script_waypoint' | 'skill_discovery_template' | 'skill_extra_item_template' | 'skill_fishing_base_level' | 'skill_perfect_item_template' | 'skinning_loot_template' | 'smart_scripts' | 'spawn_group' | 'spawn_group_template' | 'spell_area' | 'spell_autolearn' | 'spell_bonus_data' | 'spell_custom_attr' | 'spell_dbc' | 'spell_enchant_proc_data' | 'spell_group' | 'spell_group_stack_rules' | 'spell_learn_spell' | 'spell_loot_template' | 'spell_pet_auras' | 'spell_proc' | 'spell_ranks' | 'spell_required' | 'spell_target_position' | 'spell_threat' | 'spelldifficulty_dbc' | 'trainer' | 'trainer_locale' | 'trainer_spell' | 'transports' | 'trinity_string' | 'updates' | 'updates_include' | 'vehicle_accessory' | 'vehicle_seat_addon' | 'vehicle_template_accessory' | 'version' | 'warden_checks' | 'waypoint_data' | 'waypoint_scripts' | 'waypoints' | 'creature_template_outfits'

export const SQLTables : SqlTable<any,any,any>[] = Object.values(SQL)
    .filter(x=>(x as any).isDatabase===undefined) as any as SqlTable<any,any,any>[];
