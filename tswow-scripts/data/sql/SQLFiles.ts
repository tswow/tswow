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
import { Connection, SqlConnection } from './SQLConnection'
import { SqlTable } from './SQLTable'
import { SQL_access_requirement } from './types/access_requirement'
import { SQL_achievement_criteria_data } from './types/achievement_criteria_data'
import { SQL_achievement_dbc } from './types/achievement_dbc'
import { SQL_achievement_reward } from './types/achievement_reward'
import { SQL_achievement_reward_locale } from './types/achievement_reward_locale'
import { SQL_areatrigger_involvedrelation } from './types/areatrigger_involvedrelation'
import { SQL_areatrigger_scripts } from './types/areatrigger_scripts'
import { SQL_areatrigger_tavern } from './types/areatrigger_tavern'
import { SQL_areatrigger_teleport } from './types/areatrigger_teleport'
import { SQL_battleground_door_object } from './types/battleground_door_object'
import { SQL_battleground_sets } from './types/battleground_sets'
import { SQL_battleground_template } from './types/battleground_template'
import { SQL_battlemaster_entry } from './types/battlemaster_entry'
import { SQL_broadcast_text } from './types/broadcast_text'
import { SQL_broadcast_text_locale } from './types/broadcast_text_locale'
import { SQL_class_stat_formulas } from './types/class_stat_formulas'
import { SQL_class_stat_values } from './types/class_stat_values'
import { SQL_command } from './types/command'
import { SQL_conditions } from './types/conditions'
import { SQL_creature } from './types/creature'
import { SQL_creature_addon } from './types/creature_addon'
import { SQL_creature_classlevelstats } from './types/creature_classlevelstats'
import { SQL_creature_default_trainer } from './types/creature_default_trainer'
import { SQL_creature_equip_template } from './types/creature_equip_template'
import { SQL_creature_formations } from './types/creature_formations'
import { SQL_creature_loot_template } from './types/creature_loot_template'
import { SQL_creature_model_info } from './types/creature_model_info'
import { SQL_creature_movement_override } from './types/creature_movement_override'
import { SQL_creature_onkill_reputation } from './types/creature_onkill_reputation'
import { SQL_creature_questender } from './types/creature_questender'
import { SQL_creature_questitem } from './types/creature_questitem'
import { SQL_creature_queststarter } from './types/creature_queststarter'
import { SQL_creature_template } from './types/creature_template'
import { SQL_creature_template_addon } from './types/creature_template_addon'
import { SQL_creature_template_locale } from './types/creature_template_locale'
import { SQL_creature_template_movement } from './types/creature_template_movement'
import { SQL_creature_template_outfits } from './types/creature_template_outfits'
import { SQL_creature_template_resistance } from './types/creature_template_resistance'
import { SQL_creature_template_spell } from './types/creature_template_spell'
import { SQL_creature_text } from './types/creature_text'
import { SQL_creature_text_locale } from './types/creature_text_locale'
import { SQL_disables } from './types/disables'
import { SQL_disenchant_loot_template } from './types/disenchant_loot_template'
import { SQL_exploration_basexp } from './types/exploration_basexp'
import { SQL_fishing_loot_template } from './types/fishing_loot_template'
import { SQL_gameobject } from './types/gameobject'
import { SQL_gameobject_addon } from './types/gameobject_addon'
import { SQL_gameobject_loot_template } from './types/gameobject_loot_template'
import { SQL_gameobject_overrides } from './types/gameobject_overrides'
import { SQL_gameobject_questender } from './types/gameobject_questender'
import { SQL_gameobject_questitem } from './types/gameobject_questitem'
import { SQL_gameobject_queststarter } from './types/gameobject_queststarter'
import { SQL_gameobject_template } from './types/gameobject_template'
import { SQL_gameobject_template_addon } from './types/gameobject_template_addon'
import { SQL_gameobject_template_locale } from './types/gameobject_template_locale'
import { SQL_game_event } from './types/game_event'
import { SQL_game_event_battleground_holiday } from './types/game_event_battleground_holiday'
import { SQL_game_event_condition } from './types/game_event_condition'
import { SQL_game_event_creature } from './types/game_event_creature'
import { SQL_game_event_creature_quest } from './types/game_event_creature_quest'
import { SQL_game_event_gameobject } from './types/game_event_gameobject'
import { SQL_game_event_gameobject_quest } from './types/game_event_gameobject_quest'
import { SQL_game_event_model_equip } from './types/game_event_model_equip'
import { SQL_game_event_npcflag } from './types/game_event_npcflag'
import { SQL_game_event_npc_vendor } from './types/game_event_npc_vendor'
import { SQL_game_event_pool } from './types/game_event_pool'
import { SQL_game_event_prerequisite } from './types/game_event_prerequisite'
import { SQL_game_event_quest_condition } from './types/game_event_quest_condition'
import { SQL_game_event_seasonal_questrelation } from './types/game_event_seasonal_questrelation'
import { SQL_game_tele } from './types/game_tele'
import { SQL_game_weather } from './types/game_weather'
import { SQL_gossip_menu } from './types/gossip_menu'
import { SQL_gossip_menu_option } from './types/gossip_menu_option'
import { SQL_gossip_menu_option_locale } from './types/gossip_menu_option_locale'
import { SQL_graveyard_zone } from './types/graveyard_zone'
import { SQL_holiday_dates } from './types/holiday_dates'
import { SQL_instance_addon } from './types/instance_addon'
import { SQL_instance_boss_boundary } from './types/instance_boss_boundary'
import { SQL_instance_boss_creature } from './types/instance_boss_creature'
import { SQL_instance_door_object } from './types/instance_door_object'
import { SQL_instance_encounters } from './types/instance_encounters'
import { SQL_instance_encounter_achievement } from './types/instance_encounter_achievement'
import { SQL_instance_spawn_groups } from './types/instance_spawn_groups'
import { SQL_instance_template } from './types/instance_template'
import { SQL_item_enchantment_template } from './types/item_enchantment_template'
import { SQL_item_loot_template } from './types/item_loot_template'
import { SQL_item_set_names } from './types/item_set_names'
import { SQL_item_set_names_locale } from './types/item_set_names_locale'
import { SQL_item_template } from './types/item_template'
import { SQL_item_template_locale } from './types/item_template_locale'
import { SQL_lfg_dungeon_rewards } from './types/lfg_dungeon_rewards'
import { SQL_lfg_dungeon_template } from './types/lfg_dungeon_template'
import { SQL_linked_respawn } from './types/linked_respawn'
import { SQL_mail_level_reward } from './types/mail_level_reward'
import { SQL_mail_loot_template } from './types/mail_loot_template'
import { SQL_milling_loot_template } from './types/milling_loot_template'
import { SQL_npc_spellclick_spells } from './types/npc_spellclick_spells'
import { SQL_npc_text } from './types/npc_text'
import { SQL_npc_text_locale } from './types/npc_text_locale'
import { SQL_npc_vendor } from './types/npc_vendor'
import { SQL_outdoorpvp_template } from './types/outdoorpvp_template'
import { SQL_page_text } from './types/page_text'
import { SQL_page_text_locale } from './types/page_text_locale'
import { SQL_pet_levelstats } from './types/pet_levelstats'
import { SQL_pet_name_generation } from './types/pet_name_generation'
import { SQL_pickpocketing_loot_template } from './types/pickpocketing_loot_template'
import { SQL_playercreateinfo } from './types/playercreateinfo'
import { SQL_playercreateinfo_action } from './types/playercreateinfo_action'
import { SQL_playercreateinfo_item } from './types/playercreateinfo_item'
import { SQL_playercreateinfo_skills } from './types/playercreateinfo_skills'
import { SQL_playercreateinfo_spell_custom } from './types/playercreateinfo_spell_custom'
import { SQL_player_classlevelstats } from './types/player_classlevelstats'
import { SQL_player_class_roles } from './types/player_class_roles'
import { SQL_player_factionchange_achievement } from './types/player_factionchange_achievement'
import { SQL_player_factionchange_items } from './types/player_factionchange_items'
import { SQL_player_factionchange_quests } from './types/player_factionchange_quests'
import { SQL_player_factionchange_reputations } from './types/player_factionchange_reputations'
import { SQL_player_factionchange_spells } from './types/player_factionchange_spells'
import { SQL_player_factionchange_titles } from './types/player_factionchange_titles'
import { SQL_player_levelstats } from './types/player_levelstats'
import { SQL_player_totem_model } from './types/player_totem_model'
import { SQL_player_xp_for_level } from './types/player_xp_for_level'
import { SQL_points_of_interest } from './types/points_of_interest'
import { SQL_points_of_interest_locale } from './types/points_of_interest_locale'
import { SQL_pool_members } from './types/pool_members'
import { SQL_pool_template } from './types/pool_template'
import { SQL_prospecting_loot_template } from './types/prospecting_loot_template'
import { SQL_quest_details } from './types/quest_details'
import { SQL_quest_greeting } from './types/quest_greeting'
import { SQL_quest_greeting_locale } from './types/quest_greeting_locale'
import { SQL_quest_mail_sender } from './types/quest_mail_sender'
import { SQL_quest_offer_reward } from './types/quest_offer_reward'
import { SQL_quest_offer_reward_locale } from './types/quest_offer_reward_locale'
import { SQL_quest_poi } from './types/quest_poi'
import { SQL_quest_poi_points } from './types/quest_poi_points'
import { SQL_quest_pool_members } from './types/quest_pool_members'
import { SQL_quest_pool_template } from './types/quest_pool_template'
import { SQL_quest_request_items } from './types/quest_request_items'
import { SQL_quest_request_items_locale } from './types/quest_request_items_locale'
import { SQL_quest_template } from './types/quest_template'
import { SQL_quest_template_addon } from './types/quest_template_addon'
import { SQL_quest_template_locale } from './types/quest_template_locale'
import { SQL_reference_loot_template } from './types/reference_loot_template'
import { SQL_reputation_reward_rate } from './types/reputation_reward_rate'
import { SQL_reputation_spillover_template } from './types/reputation_spillover_template'
import { SQL_script_spline_chain_meta } from './types/script_spline_chain_meta'
import { SQL_script_spline_chain_waypoints } from './types/script_spline_chain_waypoints'
import { SQL_script_waypoint } from './types/script_waypoint'
import { SQL_skill_discovery_template } from './types/skill_discovery_template'
import { SQL_skill_extra_item_template } from './types/skill_extra_item_template'
import { SQL_skill_fishing_base_level } from './types/skill_fishing_base_level'
import { SQL_skill_perfect_item_template } from './types/skill_perfect_item_template'
import { SQL_skinning_loot_template } from './types/skinning_loot_template'
import { SQL_smart_scripts } from './types/smart_scripts'
import { SQL_spawn_group } from './types/spawn_group'
import { SQL_spawn_group_template } from './types/spawn_group_template'
import { SQL_spelldifficulty_dbc } from './types/spelldifficulty_dbc'
import { SQL_spell_area } from './types/spell_area'
import { SQL_spell_autolearn } from './types/spell_autolearn'
import { SQL_spell_bonus_data } from './types/spell_bonus_data'
import { SQL_spell_custom_attr } from './types/spell_custom_attr'
import { SQL_spell_dbc } from './types/spell_dbc'
import { SQL_spell_enchant_proc_data } from './types/spell_enchant_proc_data'
import { SQL_spell_group } from './types/spell_group'
import { SQL_spell_group_stack_rules } from './types/spell_group_stack_rules'
import { SQL_spell_learn_spell } from './types/spell_learn_spell'
import { SQL_spell_loot_template } from './types/spell_loot_template'
import { SQL_spell_pet_auras } from './types/spell_pet_auras'
import { SQL_spell_proc } from './types/spell_proc'
import { SQL_spell_ranks } from './types/spell_ranks'
import { SQL_spell_required } from './types/spell_required'
import { SQL_spell_target_position } from './types/spell_target_position'
import { SQL_spell_threat } from './types/spell_threat'
import { SQL_trainer } from './types/trainer'
import { SQL_trainer_locale } from './types/trainer_locale'
import { SQL_trainer_spell } from './types/trainer_spell'
import { SQL_transports } from './types/transports'
import { SQL_trinity_string } from './types/trinity_string'
import { SQL_updates } from './types/updates'
import { SQL_updates_include } from './types/updates_include'
import { SQL_vehicle_accessory } from './types/vehicle_accessory'
import { SQL_vehicle_seat_addon } from './types/vehicle_seat_addon'
import { SQL_vehicle_template_accessory } from './types/vehicle_template_accessory'
import { SQL_version } from './types/version'
import { SQL_waypoints } from './types/waypoints'
import { SQL_waypoint_data } from './types/waypoint_data'
import { SQL_waypoint_scripts } from './types/waypoint_scripts'

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
