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

export enum AreaFlags {
    HAS_BREATH_PARTICLES                          = 0x00000001, // snow (only Dun Morogh, Naxxramas, Razorfen Downs and Winterspring)
    BREATH_PARTICLES_OVERRIDE_PARENT              = 0x00000002,
    ON_MAP_DUNGEON                                = 0x00000004, // Only used for areas on map 571 (development before). Named "On Map Dungeon" in TBC Classic
    ALLOW_TRADE_CHANNEL                           = 0x00000008, // city and city subsones. Allow Trade Channel
    ENEMIES_PVP_FLAGGED                           = 0x00000010, // can't find common meaning. TBC Classic : "Enemies PvP Flagged"
    ALLOW_RESTING                                 = 0x00000020, // slave capital city flag? TBC Classic : "Allow Resting"
    ALLOW_DUELING                                 = 0x00000040, // Allow Dueling. TBC Classic name : "Allow Dueling"
    FREE_FOR_ALL_PVP                              = 0x00000080, // arena, both instanced and world arenas. classic : "Free For All PvP"
    LINKED_CHAT                                   = 0x00000100, // main capital city flag. TBC Classic definition : "Linked Chat (Set in cities)"
    LINKED_CHAT_SPECIAL_AREA                      = 0x00000200, // only one, hidden area for linked capital chat. TBC Classic : "Linked Chat Special Area"
    FLYING                                        = 0x00000400, // 3.3.5 : Flag determines if flying is allowed in zone. TBC classic : "Force this area when on a Dynamic Transport"
    SANCTUARY                                     = 0x00000800, // sanctuary area (PvP disabled). TBC classic : "No PvP"
    NEED_FLY                                      = 0x00001000, // Netherwing Ledge, Socrethar's Seat, etc. TBC classic : "No Ghost on Release"
    APPLY_AMBIENT_MULTIPLIER_TO_PLAYER            = 0x00002000, // not used now. TBC Classic : "Sub-zone Ambient Multiplier"
    ENABLE_FLIGHT_BOUNDS_ON_MAP                   = 0x00004000, // expansion zones. TBC Classic : "Enable Flight Bounds on Map"
    IS_SUB_ZONE_PVP_POI                           = 0x00008000, // PvP objective area? Death's Door also has this flag.
    NO_CHAT_CHANNELS                              = 0x00010000, // used by instanced arenas only. TBC Classic : "No chat channels"
    AREA_NOT_IN_USE                               = 0x00020000, // not used now (no area/zones with this flag set in 3.0.3)
    CONTESTED_AREA                                = 0x00040000, // PvP servers consider these areas contested despite the zone's main faction.
    NO_PLAYER_SUMMONING                           = 0x00080000, // Valgarde and Acherus: The Ebon Hold. TBC Classic : "No Player Summoning"
    LOWLEVEL                                      = 0x00100000, // used for some starting areas with area_level <=15. TBC Classic : "No Dueling if Tournament Realm"
    PLAYERS_CALL_GUARDS                           = 0x00200000, // small towns with Inn. TBC Classic : "Players Call Guards"
    HORDE_RESTING                                 = 0x00400000, // Warsong Hold, Acherus: The Ebon Hold, etc.
    ALLIANCE_RESTING                              = 0x00800000, // Westguard Inn, Acherus: The Ebon Hold, Valgarde, etc.
    COMBAT_ZONE                                   = 0x01000000, // Wintergrasp and its subzones. "Combat Zone"
    FORCE_INDOORS                                 = 0x02000000, // Force Indoors
    FORCE_OUTDOORS                                = 0x04000000, // Force Outdoors
    CAN_HEARTH_AND_RESURRECT_FROM_AREA            = 0x08000000, // Wintergrasp and its subzones. Allow Hearth-and-Resurrect from Area
    CANNOT_FLY                                    = 0x20000000, // not allowed to fly, only used in Dalaran areas. TBC Classic : "No Local Defense Channel"
    USE_PARENT_FOR_WORLD_DEFENSE_VISIBILITY_CHECK = 0x40000000, // TBC Classic : Only Evaluate Ghost Bind Once
}