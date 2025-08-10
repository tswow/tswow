import { Connection } from '../data/sql/SQLConnection';
import { SqlTable } from '../data/sql/SQLTable';
export declare class Databases {
    private isDatabase;
    get world_source(): Connection;
    get world_dest(): Connection;
    get auth(): Connection;
    connect(config: any): Connection;
}
export declare const SQL: {
    Databases: Databases;
    /**
     * No comment (yet!)
     */
    access_requirement: import("./sql/access_requirement").access_requirementTable;
    /**
     * No comment (yet!)
     */
    achievement_criteria_data: import("./sql/achievement_criteria_data").achievement_criteria_dataTable;
    /**
     * SQL table of DBC data. Populating this table makes the server ignore the corresponding DBC file.
     */
    achievement_dbc: import("./sql/achievement_dbc").achievement_dbcTable;
    /**
     * No comment (yet!)
     */
    achievement_reward: import("./sql/achievement_reward").achievement_rewardTable;
    /**
     * No comment (yet!)
     */
    achievement_reward_locale: import("./sql/achievement_reward_locale").achievement_reward_localeTable;
    /**
     * No comment (yet!)
     */
    areatrigger_involvedrelation: import("./sql/areatrigger_involvedrelation").areatrigger_involvedrelationTable;
    /**
     * No comment (yet!)
     */
    areatrigger_scripts: import("./sql/areatrigger_scripts").areatrigger_scriptsTable;
    /**
     * No comment (yet!)
     */
    areatrigger_tavern: import("./sql/areatrigger_tavern").areatrigger_tavernTable;
    /**
     * No comment (yet!)
     */
    areatrigger_teleport: import("./sql/areatrigger_teleport").areatrigger_teleportTable;
    /**
     * No comment (yet!)
     */
    battleground_door_object: import("./sql/battleground_door_object").battleground_door_objectTable;
    /**
     * No comment (yet!)
     */
    battleground_sets: import("./sql/battleground_sets").battleground_setsTable;
    /**
     * No comment (yet!)
     */
    battleground_template: import("./sql/battleground_template").battleground_templateTable;
    /**
     * No comment (yet!)
     */
    battlemaster_entry: import("./sql/battlemaster_entry").battlemaster_entryTable;
    /**
     * No comment (yet!)
     */
    broadcast_text: import("./sql/broadcast_text").broadcast_textTable;
    /**
     * No comment (yet!)
     */
    broadcast_text_locale: import("./sql/broadcast_text_locale").broadcast_text_localeTable;
    /**
     * No comment (yet!)
     */
    class_stat_formulas: import("./sql/class_stat_formulas").class_stat_formulaTable;
    /**
     * No comment (yet!)
     */
    class_stat_values: import("./sql/class_stat_values").class_stat_formulaTable;
    /**
     * No comment (yet!)
     */
    class_has_runes: import("./sql/class_has_runes").class_has_runesTable;
    /**
     * No comment (yet!)
     */
    command: import("./sql/command").commandTable;
    /**
     * No comment (yet!)
     */
    conditions: import("./sql/conditions").conditionsTable;
    /**
     * No comment (yet!)
     */
    creature: import("./sql/creature").creatureTable;
    /**
     * No comment (yet!)
     */
    creature_addon: import("./sql/creature_addon").creature_addonTable;
    /**
     * No comment (yet!)
     */
    creature_classlevelstats: import("./sql/creature_classlevelstats").creature_classlevelstatsTable;
    /**
     * No comment (yet!)
     */
    creature_default_trainer: import("./sql/creature_default_trainer").creature_default_trainerTable;
    /**
     * No comment (yet!)
     */
    creature_equip_template: import("./sql/creature_equip_template").creature_equip_templateTable;
    /**
     * No comment (yet!)
     */
    creature_formations: import("./sql/creature_formations").creature_formationsTable;
    /**
     * No comment (yet!)
     */
    creature_loot_template: import("./sql/creature_loot_template").creature_loot_templateTable;
    /**
     * No comment (yet!)
     */
    creature_model_info: import("./sql/creature_model_info").creature_model_infoTable;
    /**
     * No comment (yet!)
     */
    creature_movement_override: import("./sql/creature_movement_override").creature_movement_overrideTable;
    /**
     * No comment (yet!)
     */
    creature_onkill_reputation: import("./sql/creature_onkill_reputation").creature_onkill_reputationTable;
    /**
     * No comment (yet!)
     */
    creature_questender: import("./sql/creature_questender").creature_questenderTable;
    /**
     * No comment (yet!)
     */
    creature_questitem: import("./sql/creature_questitem").creature_questitemTable;
    /**
     * No comment (yet!)
     */
    creature_queststarter: import("./sql/creature_queststarter").creature_queststarterTable;
    /**
     * No comment (yet!)
     */
    creature_template: import("./sql/creature_template").creature_templateTable;
    /**
     * No comment (yet!)
     */
    creature_template_addon: import("./sql/creature_template_addon").creature_template_addonTable;
    /**
     * No comment (yet!)
     */
    creature_template_locale: import("./sql/creature_template_locale").creature_template_localeTable;
    /**
     * No comment (yet!)
     */
    creature_template_movement: import("./sql/creature_template_movement").creature_template_movementTable;
    /**
     * No comment (yet!)
     */
    creature_template_outfits: import("./sql/creature_template_outfits").creature_template_outfitsTable;
    /**
     * No comment (yet!)
     */
    creature_template_resistance: import("./sql/creature_template_resistance").creature_template_resistanceTable;
    /**
     * No comment (yet!)
     */
    creature_template_spell: import("./sql/creature_template_spell").creature_template_spellTable;
    /**
     * No comment (yet!)
     */
    creature_text: import("./sql/creature_text").creature_textTable;
    /**
     * No comment (yet!)
     */
    creature_text_locale: import("./sql/creature_text_locale").creature_text_localeTable;
    /**
     * No comment (yet!)
     */
    disables: import("./sql/disables").disablesTable;
    /**
     * No comment (yet!)
     */
    disenchant_loot_template: import("./sql/disenchant_loot_template").disenchant_loot_templateTable;
    /**
     * No comment (yet!)
     */
    exploration_basexp: import("./sql/exploration_basexp").exploration_basexpTable;
    /**
     * No comment (yet!)
     */
    fishing_loot_template: import("./sql/fishing_loot_template").fishing_loot_templateTable;
    /**
     * No comment (yet!)
     */
    game_event: import("./sql/game_event").game_eventTable;
    /**
     * No comment (yet!)
     */
    game_event_battleground_holiday: import("./sql/game_event_battleground_holiday").game_event_battleground_holidayTable;
    /**
     * No comment (yet!)
     */
    game_event_condition: import("./sql/game_event_condition").game_event_conditionTable;
    /**
     * No comment (yet!)
     */
    game_event_creature: import("./sql/game_event_creature").game_event_creatureTable;
    /**
     * No comment (yet!)
     */
    game_event_creature_quest: import("./sql/game_event_creature_quest").game_event_creature_questTable;
    /**
     * No comment (yet!)
     */
    game_event_gameobject: import("./sql/game_event_gameobject").game_event_gameobjectTable;
    /**
     * No comment (yet!)
     */
    game_event_gameobject_quest: import("./sql/game_event_gameobject_quest").game_event_gameobject_questTable;
    /**
     * No comment (yet!)
     */
    game_event_model_equip: import("./sql/game_event_model_equip").game_event_model_equipTable;
    /**
     * No comment (yet!)
     */
    game_event_npc_vendor: import("./sql/game_event_npc_vendor").game_event_npc_vendorTable;
    /**
     * No comment (yet!)
     */
    game_event_npcflag: import("./sql/game_event_npcflag").game_event_npcflagTable;
    /**
     * No comment (yet!)
     */
    game_event_pool: import("./sql/game_event_pool").game_event_poolTable;
    /**
     * No comment (yet!)
     */
    game_event_prerequisite: import("./sql/game_event_prerequisite").game_event_prerequisiteTable;
    /**
     * No comment (yet!)
     */
    game_event_quest_condition: import("./sql/game_event_quest_condition").game_event_quest_conditionTable;
    /**
     * No comment (yet!)
     */
    game_event_seasonal_questrelation: import("./sql/game_event_seasonal_questrelation").game_event_seasonal_questrelationTable;
    /**
     * No comment (yet!)
     */
    game_tele: import("./sql/game_tele").game_teleTable;
    /**
     * No comment (yet!)
     */
    game_weather: import("./sql/game_weather").game_weatherTable;
    /**
     * No comment (yet!)
     */
    gameobject: import("./sql/gameobject").gameobjectTable;
    /**
     * No comment (yet!)
     */
    gameobject_addon: import("./sql/gameobject_addon").gameobject_addonTable;
    /**
     * No comment (yet!)
     */
    gameobject_loot_template: import("./sql/gameobject_loot_template").gameobject_loot_templateTable;
    /**
     * No comment (yet!)
     */
    gameobject_overrides: import("./sql/gameobject_overrides").gameobject_overridesTable;
    /**
     * No comment (yet!)
     */
    gameobject_questender: import("./sql/gameobject_questender").gameobject_questenderTable;
    /**
     * No comment (yet!)
     */
    gameobject_questitem: import("./sql/gameobject_questitem").gameobject_questitemTable;
    /**
     * No comment (yet!)
     */
    gameobject_queststarter: import("./sql/gameobject_queststarter").gameobject_queststarterTable;
    /**
     * No comment (yet!)
     */
    gameobject_template: import("./sql/gameobject_template").gameobject_templateTable;
    /**
     * No comment (yet!)
     */
    gameobject_template_addon: import("./sql/gameobject_template_addon").gameobject_template_addonTable;
    /**
     * No comment (yet!)
     */
    gameobject_template_locale: import("./sql/gameobject_template_locale").gameobject_template_localeTable;
    /**
     * No comment (yet!)
     */
    gossip_menu: import("./sql/gossip_menu").gossip_menuTable;
    /**
     * No comment (yet!)
     */
    gossip_menu_option: import("./sql/gossip_menu_option").gossip_menu_optionTable;
    /**
     * No comment (yet!)
     */
    gossip_menu_option_locale: import("./sql/gossip_menu_option_locale").gossip_menu_option_localeTable;
    /**
     * No comment (yet!)
     */
    graveyard_zone: import("./sql/graveyard_zone").graveyard_zoneTable;
    /**
     * No comment (yet!)
     */
    holiday_dates: import("./sql/holiday_dates").holiday_datesTable;
    /**
     * No comment (yet!)
     */
    instance_addon: import("./sql/instance_addon").instance_addonTable;
    /**
     * No comment (yet!)
     */
    instance_boss_boundary: import("./sql/instance_boss_boundary").instance_boss_boundaryTable;
    /**
     * No comment (yet!)
     */
    instance_boss_creature: import("./sql/instance_boss_creature").instance_boss_creatureTable;
    /**
     * No comment (yet!)
     */
    instance_door_object: import("./sql/instance_door_object").instance_door_objectTable;
    /**
     * No comment (yet!)
     */
    instance_encounter_achievement: import("./sql/instance_encounter_achievement").instance_encounter_achievementTable;
    /**
     * No comment (yet!)
     */
    instance_encounters: import("./sql/instance_encounters").instance_encountersTable;
    /**
     * No comment (yet!)
     */
    instance_spawn_groups: import("./sql/instance_spawn_groups").instance_spawn_groupsTable;
    /**
     * No comment (yet!)
     */
    instance_template: import("./sql/instance_template").instance_templateTable;
    /**
     * No comment (yet!)
     */
    item_enchantment_template: import("./sql/item_enchantment_template").item_enchantment_templateTable;
    /**
     * No comment (yet!)
     */
    item_loot_template: import("./sql/item_loot_template").item_loot_templateTable;
    /**
     * No comment (yet!)
     */
    item_set_names: import("./sql/item_set_names").item_set_namesTable;
    /**
     * No comment (yet!)
     */
    item_set_names_locale: import("./sql/item_set_names_locale").item_set_names_localeTable;
    /**
     * No comment (yet!)
     */
    item_template: import("./sql/item_template").item_templateTable;
    /**
     * No comment (yet!)
     */
    item_template_locale: import("./sql/item_template_locale").item_template_localeTable;
    /**
     * No comment (yet!)
     */
    lfg_dungeon_rewards: import("./sql/lfg_dungeon_rewards").lfg_dungeon_rewardsTable;
    /**
     * No comment (yet!)
     */
    lfg_dungeon_template: import("./sql/lfg_dungeon_template").lfg_dungeon_templateTable;
    /**
     * No comment (yet!)
     */
    linked_respawn: import("./sql/linked_respawn").linked_respawnTable;
    /**
     * No comment (yet!)
     */
    mail_level_reward: import("./sql/mail_level_reward").mail_level_rewardTable;
    /**
     * No comment (yet!)
     */
    mail_loot_template: import("./sql/mail_loot_template").mail_loot_templateTable;
    /**
     * No comment (yet!)
     */
    milling_loot_template: import("./sql/milling_loot_template").milling_loot_templateTable;
    /**
     * No comment (yet!)
     */
    npc_spellclick_spells: import("./sql/npc_spellclick_spells").npc_spellclick_spellsTable;
    /**
     * No comment (yet!)
     */
    npc_text: import("./sql/npc_text").npc_textTable;
    /**
     * No comment (yet!)
     */
    npc_text_locale: import("./sql/npc_text_locale").npc_text_localeTable;
    /**
     * No comment (yet!)
     */
    npc_vendor: import("./sql/npc_vendor").npc_vendorTable;
    /**
     * No comment (yet!)
     */
    outdoorpvp_template: import("./sql/outdoorpvp_template").outdoorpvp_templateTable;
    /**
     * No comment (yet!)
     */
    page_text: import("./sql/page_text").page_textTable;
    /**
     * No comment (yet!)
     */
    page_text_locale: import("./sql/page_text_locale").page_text_localeTable;
    /**
     * No comment (yet!)
     */
    pet_levelstats: import("./sql/pet_levelstats").pet_levelstatsTable;
    /**
     * No comment (yet!)
     */
    pet_name_generation: import("./sql/pet_name_generation").pet_name_generationTable;
    /**
     * No comment (yet!)
     */
    pickpocketing_loot_template: import("./sql/pickpocketing_loot_template").pickpocketing_loot_templateTable;
    /**
     * No comment (yet!)
     */
    player_classlevelstats: import("./sql/player_classlevelstats").player_classlevelstatsTable;
    /**
     * No comment (yet!)
     */
    player_class_roles: import("./sql/player_class_roles").player_class_rolesTable;
    /**
     * No comment (yet!)
     */
    player_factionchange_achievement: import("./sql/player_factionchange_achievement").player_factionchange_achievementTable;
    /**
     * No comment (yet!)
     */
    player_factionchange_items: import("./sql/player_factionchange_items").player_factionchange_itemsTable;
    /**
     * No comment (yet!)
     */
    player_factionchange_quests: import("./sql/player_factionchange_quests").player_factionchange_questsTable;
    /**
     * No comment (yet!)
     */
    player_factionchange_reputations: import("./sql/player_factionchange_reputations").player_factionchange_reputationsTable;
    /**
     * No comment (yet!)
     */
    player_factionchange_spells: import("./sql/player_factionchange_spells").player_factionchange_spellsTable;
    /**
     * No comment (yet!)
     */
    player_factionchange_titles: import("./sql/player_factionchange_titles").player_factionchange_titlesTable;
    /**
     * No comment (yet!)
     */
    player_levelstats: import("./sql/player_levelstats").player_levelstatsTable;
    /**
     * No comment (yet!)
     */
    player_totem_model: import("./sql/player_totem_model").player_totem_modelTable;
    /**
     * No comment (yet!)
     */
    player_xp_for_level: import("./sql/player_xp_for_level").player_xp_for_levelTable;
    /**
     * No comment (yet!)
     */
    playercreateinfo: import("./sql/playercreateinfo").playercreateinfoTable;
    /**
     * No comment (yet!)
     */
    playercreateinfo_action: import("./sql/playercreateinfo_action").playercreateinfo_actionTable;
    /**
     * No comment (yet!)
     */
    playercreateinfo_item: import("./sql/playercreateinfo_item").playercreateinfo_itemTable;
    /**
     * No comment (yet!)
     */
    playercreateinfo_skills: import("./sql/playercreateinfo_skills").playercreateinfo_skillsTable;
    /**
     * No comment (yet!)
     */
    playercreateinfo_spell_custom: import("./sql/playercreateinfo_spell_custom").playercreateinfo_spell_customTable;
    /**
     * No comment (yet!)
     */
    points_of_interest: import("./sql/points_of_interest").points_of_interestTable;
    /**
     * No comment (yet!)
     */
    points_of_interest_locale: import("./sql/points_of_interest_locale").points_of_interest_localeTable;
    /**
     * No comment (yet!)
     */
    pool_members: import("./sql/pool_members").pool_membersTable;
    /**
     * No comment (yet!)
     */
    pool_template: import("./sql/pool_template").pool_templateTable;
    /**
     * No comment (yet!)
     */
    prospecting_loot_template: import("./sql/prospecting_loot_template").prospecting_loot_templateTable;
    /**
     * No comment (yet!)
     */
    quest_details: import("./sql/quest_details").quest_detailsTable;
    /**
     * No comment (yet!)
     */
    quest_greeting: import("./sql/quest_greeting").quest_greetingTable;
    /**
     * No comment (yet!)
     */
    quest_greeting_locale: import("./sql/quest_greeting_locale").quest_greeting_localeTable;
    /**
     * No comment (yet!)
     */
    quest_mail_sender: import("./sql/quest_mail_sender").quest_mail_senderTable;
    /**
     * No comment (yet!)
     */
    quest_offer_reward: import("./sql/quest_offer_reward").quest_offer_rewardTable;
    /**
     * No comment (yet!)
     */
    quest_offer_reward_locale: import("./sql/quest_offer_reward_locale").quest_offer_reward_localeTable;
    /**
     * No comment (yet!)
     */
    quest_poi: import("./sql/quest_poi").quest_poiTable;
    /**
     * No comment (yet!)
     */
    quest_poi_points: import("./sql/quest_poi_points").quest_poi_pointsTable;
    /**
     * No comment (yet!)
     */
    quest_pool_members: import("./sql/quest_pool_members").quest_pool_membersTable;
    /**
     * No comment (yet!)
     */
    quest_pool_template: import("./sql/quest_pool_template").quest_pool_templateTable;
    /**
     * No comment (yet!)
     */
    quest_request_items: import("./sql/quest_request_items").quest_request_itemsTable;
    /**
     * No comment (yet!)
     */
    quest_request_items_locale: import("./sql/quest_request_items_locale").quest_request_items_localeTable;
    /**
     * No comment (yet!)
     */
    quest_template: import("./sql/quest_template").quest_templateTable;
    /**
     * No comment (yet!)
     */
    quest_template_addon: import("./sql/quest_template_addon").quest_template_addonTable;
    /**
     * No comment (yet!)
     */
    quest_template_locale: import("./sql/quest_template_locale").quest_template_localeTable;
    /**
     * No comment (yet!)
     */
    reference_loot_template: import("./sql/reference_loot_template").reference_loot_templateTable;
    /**
     * No comment (yet!)
     */
    reputation_reward_rate: import("./sql/reputation_reward_rate").reputation_reward_rateTable;
    /**
     * No comment (yet!)
     */
    reputation_spillover_template: import("./sql/reputation_spillover_template").reputation_spillover_templateTable;
    /**
     * No comment (yet!)
     */
    script_spline_chain_meta: import("./sql/script_spline_chain_meta").script_spline_chain_metaTable;
    /**
     * No comment (yet!)
     */
    script_spline_chain_waypoints: import("./sql/script_spline_chain_waypoints").script_spline_chain_waypointsTable;
    /**
     * No comment (yet!)
     */
    script_waypoint: import("./sql/script_waypoint").script_waypointTable;
    /**
     * No comment (yet!)
     */
    skill_discovery_template: import("./sql/skill_discovery_template").skill_discovery_templateTable;
    /**
     * No comment (yet!)
     */
    skill_extra_item_template: import("./sql/skill_extra_item_template").skill_extra_item_templateTable;
    /**
     * No comment (yet!)
     */
    skill_fishing_base_level: import("./sql/skill_fishing_base_level").skill_fishing_base_levelTable;
    /**
     * No comment (yet!)
     */
    skill_perfect_item_template: import("./sql/skill_perfect_item_template").skill_perfect_item_templateTable;
    /**
     * No comment (yet!)
     */
    skinning_loot_template: import("./sql/skinning_loot_template").skinning_loot_templateTable;
    /**
     * No comment (yet!)
     */
    smart_scripts: import("./sql/smart_scripts").smart_scriptsTable;
    /**
     * No comment (yet!)
     */
    spawn_group: import("./sql/spawn_group").spawn_groupTable;
    /**
     * No comment (yet!)
     */
    spawn_group_template: import("./sql/spawn_group_template").spawn_group_templateTable;
    /**
     * No comment (yet!)
     */
    spell_area: import("./sql/spell_area").spell_areaTable;
    /**
     * No comment (yet!)
     */
    spell_autolearn: import("./sql/spell_autolearn").spell_autolearnTable;
    /**
     * No comment (yet!)
     */
    spell_bonus_data: import("./sql/spell_bonus_data").spell_bonus_dataTable;
    /**
     * No comment (yet!)
     */
    spell_custom_attr: import("./sql/spell_custom_attr").spell_custom_attrTable;
    /**
     * SQL table of DBC data. Populating this table makes the server ignore the corresponding DBC file.
     */
    spell_dbc: import("./sql/spell_dbc").spell_dbcTable;
    /**
     * No comment (yet!)
     */
    spell_enchant_proc_data: import("./sql/spell_enchant_proc_data").spell_enchant_proc_dataTable;
    /**
     * No comment (yet!)
     */
    spell_group: import("./sql/spell_group").spell_groupTable;
    /**
     * No comment (yet!)
     */
    spell_group_stack_rules: import("./sql/spell_group_stack_rules").spell_group_stack_rulesTable;
    /**
     * No comment (yet!)
     */
    spell_learn_spell: import("./sql/spell_learn_spell").spell_learn_spellTable;
    /**
     * No comment (yet!)
     */
    spell_linked_spell: import("./sql/spell_linked_spell").spell_linked_spellTable;
    /**
     * No comment (yet!)
     */
    spell_loot_template: import("./sql/spell_loot_template").spell_loot_templateTable;
    /**
     * No comment (yet!)
     */
    spell_pet_auras: import("./sql/spell_pet_auras").spell_pet_aurasTable;
    /**
     * No comment (yet!)
     */
    spell_proc: import("./sql/spell_proc").spell_procTable;
    /**
     * No comment (yet!)
     */
    spell_ranks: import("./sql/spell_ranks").spell_ranksTable;
    /**
     * No comment (yet!)
     */
    spell_required: import("./sql/spell_required").spell_requiredTable;
    /**
     * No comment (yet!)
     */
    spell_target_position: import("./sql/spell_target_position").spell_target_positionTable;
    /**
     * No comment (yet!)
     */
    spell_threat: import("./sql/spell_threat").spell_threatTable;
    /**
     * SQL table of DBC data. Populating this table makes the server ignore the corresponding DBC file.
     */
    spelldifficulty_dbc: import("./sql/spelldifficulty_dbc").spelldifficulty_dbcTable;
    /**
     * No comment (yet!)
     */
    trainer: import("./sql/trainer").trainerTable;
    /**
     * No comment (yet!)
     */
    trainer_locale: import("./sql/trainer_locale").trainer_localeTable;
    /**
     * No comment (yet!)
     */
    trainer_spell: import("./sql/trainer_spell").trainer_spellTable;
    /**
     * No comment (yet!)
     */
    transports: import("./sql/transports").transportsTable;
    /**
     * No comment (yet!)
     */
    trinity_string: import("./sql/trinity_string").trinity_stringTable;
    /**
     * No comment (yet!)
     */
    updates: import("./sql/updates").updatesTable;
    /**
     * No comment (yet!)
     */
    updates_include: import("./sql/updates_include").updates_includeTable;
    /**
     * No comment (yet!)
     */
    vehicle_accessory: import("./sql/vehicle_accessory").vehicle_accessoryTable;
    /**
     * No comment (yet!)
     */
    vehicle_seat_addon: import("./sql/vehicle_seat_addon").vehicle_seat_addonTable;
    /**
     * No comment (yet!)
     */
    vehicle_template_accessory: import("./sql/vehicle_template_accessory").vehicle_template_accessoryTable;
    /**
     * No comment (yet!)
     */
    version: import("./sql/version").versionTable;
    /**
     * No comment (yet!)
     */
    waypoint_data: import("./sql/waypoint_data").waypoint_dataTable;
    /**
     * No comment (yet!)
     */
    waypoint_scripts: import("./sql/waypoint_scripts").waypoint_scriptsTable;
    /**
     * No comment (yet!)
     */
    waypoints: import("./sql/waypoints").waypointsTable;
};
export type SQLNames = 'access_requirement' | 'achievement_criteria_data' | 'achievement_dbc' | 'achievement_reward' | 'achievement_reward_locale' | 'areatrigger_involvedrelation' | 'areatrigger_scripts' | 'areatrigger_tavern' | 'areatrigger_teleport' | 'battleground_template' | 'battleground_sets' | 'battlemaster_entry' | 'broadcast_text' | 'broadcast_text_locale' | 'command' | 'class_has_runes' | 'class_stat_formulas' | 'class_stat_values' | 'conditions' | 'creature' | 'creature_addon' | 'creature_classlevelstats' | 'creature_default_trainer' | 'creature_equip_template' | 'creature_formations' | 'creature_loot_template' | 'creature_model_info' | 'creature_movement_override' | 'creature_onkill_reputation' | 'creature_questender' | 'creature_questitem' | 'creature_queststarter' | 'creature_template' | 'creature_template_addon' | 'creature_template_locale' | 'creature_template_movement' | 'creature_template_resistance' | 'creature_template_spell' | 'creature_text' | 'creature_text_locale' | 'disables' | 'disenchant_loot_template' | 'exploration_basexp' | 'fishing_loot_template' | 'game_event' | 'game_event_battleground_holiday' | 'game_event_condition' | 'game_event_creature' | 'game_event_creature_quest' | 'game_event_gameobject' | 'game_event_gameobject_quest' | 'game_event_model_equip' | 'game_event_npc_vendor' | 'game_event_npcflag' | 'game_event_pool' | 'game_event_prerequisite' | 'game_event_quest_condition' | 'game_event_seasonal_questrelation' | 'game_tele' | 'game_weather' | 'gameobject' | 'gameobject_addon' | 'gameobject_loot_template' | 'gameobject_overrides' | 'gameobject_questender' | 'gameobject_questitem' | 'gameobject_queststarter' | 'gameobject_template' | 'gameobject_template_addon' | 'gameobject_template_locale' | 'gossip_menu' | 'gossip_menu_option' | 'gossip_menu_option_locale' | 'graveyard_zone' | 'holiday_dates' | 'instance_addon' | 'instance_boss_boundary' | 'instance_boss_creature' | 'instance_encounter_achievement' | 'instance_encounters' | 'instance_spawn_groups' | 'instance_template' | 'item_enchantment_template' | 'item_loot_template' | 'item_set_names' | 'item_set_names_locale' | 'item_template' | 'item_template_locale' | 'lfg_dungeon_rewards' | 'lfg_dungeon_template' | 'linked_respawn' | 'mail_level_reward' | 'mail_loot_template' | 'milling_loot_template' | 'npc_spellclick_spells' | 'npc_text' | 'npc_text_locale' | 'npc_vendor' | 'outdoorpvp_template' | 'page_text' | 'page_text_locale' | 'pet_levelstats' | 'pet_name_generation' | 'pickpocketing_loot_template' | 'player_classlevelstats' | 'player_factionchange_achievement' | 'player_factionchange_items' | 'player_factionchange_quests' | 'player_factionchange_reputations' | 'player_factionchange_spells' | 'player_factionchange_titles' | 'player_levelstats' | 'player_totem_model' | 'player_xp_for_level' | 'playercreateinfo' | 'playercreateinfo_action' | 'playercreateinfo_item' | 'playercreateinfo_skills' | 'playercreateinfo_spell_custom' | 'points_of_interest' | 'points_of_interest_locale' | 'pool_members' | 'pool_template' | 'prospecting_loot_template' | 'quest_details' | 'quest_greeting' | 'quest_greeting_locale' | 'quest_mail_sender' | 'quest_offer_reward' | 'quest_offer_reward_locale' | 'quest_poi' | 'quest_poi_points' | 'quest_pool_members' | 'quest_pool_template' | 'quest_request_items' | 'quest_request_items_locale' | 'quest_template' | 'quest_template_addon' | 'quest_template_locale' | 'reference_loot_template' | 'reputation_reward_rate' | 'reputation_spillover_template' | 'script_spline_chain_meta' | 'script_spline_chain_waypoints' | 'script_waypoint' | 'skill_discovery_template' | 'skill_extra_item_template' | 'skill_fishing_base_level' | 'skill_perfect_item_template' | 'skinning_loot_template' | 'smart_scripts' | 'spawn_group' | 'spawn_group_template' | 'spell_area' | 'spell_autolearn' | 'spell_bonus_data' | 'spell_custom_attr' | 'spell_dbc' | 'spell_enchant_proc_data' | 'spell_group' | 'spell_group_stack_rules' | 'spell_learn_spell' | 'spell_linked_spell' | 'spell_loot_template' | 'spell_pet_auras' | 'spell_proc' | 'spell_ranks' | 'spell_required' | 'spell_target_position' | 'spell_threat' | 'spelldifficulty_dbc' | 'trainer' | 'trainer_locale' | 'trainer_spell' | 'transports' | 'trinity_string' | 'updates' | 'updates_include' | 'vehicle_accessory' | 'vehicle_seat_addon' | 'vehicle_template_accessory' | 'version' | 'warden_checks' | 'waypoint_data' | 'waypoint_scripts' | 'waypoints' | 'creature_template_outfits';
export declare const SQLTables: SqlTable<any, any, any>[];
