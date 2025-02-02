/*
 * MIT License
 * Copyright (c) 2019 Oliver Level <dev@qhun.de>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 /**
  * Modified by TSWoW
  */

declare type LuaMultiReturn<T extends any[]> = T & LuaExtension<"__luaMultiReturnBrand">;
type uint8 = number;
type uint16 = number;
type uint32 = number;
type uint64 = number;
type int8 = number;
type int16 = number;
type int32 = number;
type int64 = number;
type float = number;
type bool = boolean;
type double = number;
type TSArray<T> = T[];
type TSString = string;

declare function Message(classTarget: any): any
declare function MsgClass(classTarget: any, name: string): any
declare function MsgClassArray(size: number): (field: any, name: any)=>void
declare function MsgPrimitive(classTarget: any, name: string): any
declare function MsgPrimitiveArray(capacity: number): (field: any, name: any)=>void;
declare function MsgString(size: number): (field: any, name: any)=>void
declare function MsgStringArray(arrSize: number, stringSize: number): (field: any, name: any)=>void

declare function __TS__StringLen(str: string): number

declare function __TS__Unpack(args: any[]): any;

declare function __TS__New(target: any): any;

declare function base64_decode(str: string): string;
declare function base64_encode(str: string): string;

// dll additions
declare function GetSpellDescription(spellID: number): string;

/**
 * Returns the highest expansion id the current account has been flagged for.
 */
declare function GetAccountExpansionLevel(): EXPANSION_CLASSIC | EXPANSION_BURNING_CRUSADE | EXPANSION_WRATH_OF_THE_LICH_KING | EXPANSION_CATACLYSM |
    EXPANSION_MISTS_OF_PANDARIA | EXPANSION_WARLORDS_OF_DRAENOR | EXPANSION_LEGION | EXPANSION_BATTLE_FOR_AZEROTH;

/**
 * Returns the time spent logged in in current billing unit. This function is to limit players from playing the game for too long
 * @return Amount of time left in seconds to play as rested. See details below for clarification. Returns nil for EU and US accounts
 */
declare function GetBillingTimeRested(): number;

/**
 * Returns whether the player is using a trial (free-to-play) account
 */
declare function IsTrialAccount(): boolean;


/// <reference path="global.d.ts" />
/// <reference path="unit.d.ts" />

declare namespace WoWAPI {
    /**
     * Achievement links are returned by GetAchievementLink().
     * @example |cffffff00|Hachievement:2186:00000000002FDDE9:1:12:19:8:4294967295:4294967295:4294967295:4294967295|h[The Immortal]|h|r
     */
    type AchievementLink = Hyperlink;
}

/**
 * Marks an achievement for tracking in the WatchFrame.
 *
 * @param achivementId ID of the achievement to add to tracking
 * @event TRACKED_ACHIEVEMENT_UPDATE
 */
declare function AddTrackedAchievement(achivementId: number): void;

/**
 * Returns whether account-wide achievements are hidden from other players
 *
 * @returns true if other players cannot view your account-level achievements; false otherwise
 */
declare function AreAccountAchievementsHidden(): boolean;

/**
 * Returns if the AchievementUI can be displayed
 *
 * @returns true if the achievement data is available (and hence the AchievementUI can be displayed), false otherwise
 */
declare function CanShowAchievementUI(): boolean;

/**
 * Returns the category number the requested achievement belongs to
 *
 * @param achivementId ID of the achievement to retrieve information for
 * @returns ID of the achievement's category.
 */
declare function GetAchievementCategory(achivementId: number): number;

/**
 * Returns information about the comparison unit's achievements
 *
 * @param achivementId ID of the achievement to retrieve information for
 * @see https://wow.gamepedia.com/API_GetAchievementComparisonInfo
 */
declare function GetAchievementComparisonInfo(achivementId: number): LuaMultiReturn<[boolean, number, number, number]>;

/**
 * Returns information about the given Achievement's specified criteria
 *
 * @param achivementId Achievement ID the queried criteria belongs to
 * @param criteriaIndex Index of the criteria to query, ascending from 1 up to GetAchievementNumCriteria(achievementID).
 * @see https://wow.gamepedia.com/API_GetAchievementCriteriaInfo
 */
// tslint:disable-next-line max-line-length
declare function GetAchievementCriteriaInfo(achivementId: number, criteriaIndex: number): LuaMultiReturn<[string, number, boolean, number, number, string, number, number, string, number, boolean]>;

/**
 * Returns information about the given Achievement's specified criteria
 *
 * @param achivementId Achievement ID the queried criteria belongs to
 * @param criteriaId Index of the criteria to query, ascending from 1 up to GetAchievementNumCriteria(achievementID).
 * @see https://wow.gamepedia.com/API_GetAchievementCriteriaInfoByID
 */
// tslint:disable-next-line max-line-length
declare function GetAchievementCriteriaInfoByID(achivementId: number, criteriaId: number): LuaMultiReturn<[string, number, boolean, number, string, number, number, string, number, boolean]>;

/**
 * Returns information about the given Achievement
 *
 * @param achivementId ID of the achievement to retrieve information for
 * @param index An offset into the achievement category, between 1 and GetCategoryNumAchievements(categoryID)
 * @see https://wow.gamepedia.com/API_GetAchievementInfo
 */
// tslint:disable-next-line max-line-length
declare function GetAchievementInfo(achivementId: number, index: number): LuaMultiReturn<[number, string, number, boolean, number, number, number, string, number, number, string, boolean, boolean, string]>;
declare function GetAchievementInfo(categoryId: number, index: number): LuaMultiReturn<[number, string, number, boolean, number, number, number, string, number, number, string, boolean, boolean, string]>;

/**
 * Returns a achievementLink for the specified Achievement
 *
 * @param achivementId The ID of the Achievement
 * @see https://wow.gamepedia.com/API_GetAchievementLink
 */
declare function GetAchievementLink(achivementId: number): WoWAPI.AchievementLink;

/**
 * Returns the number of criteria for the given Achievement
 *
 * @param achivementId The ID of the Achievement
 * @see https://wow.gamepedia.com/API_GetAchievementNumCriteria
 */
declare function GetAchievementNumCriteria(achivementId: number): number;

/**
 * Returns information about the given Category
 *
 * @param categoryId The ID of the category to get the info for.
 * @see https://wow.gamepedia.com/API_GetCategoryInfo
 */
declare function GetCategoryInfo(categoryId: number): LuaMultiReturn<[string, number, number]>;

/**
 * Returns the list of Achievement categories
 *
 * @returns array containing achievement category IDs, in no particular order
 * @see https://wow.gamepedia.com/API_GetCategoryList
 */
declare function GetCategoryList(): number[];

/**
 * Returns the total, completed and incompleted number of achievements in a specific category
 *
 * @param categoryId Achievement category ID, as returned by GetCategoryList.
 * @param includeAll If true-equivalent, include all achievements, otherwise, only includes those currently visible
 * @see https://wow.gamepedia.com/API_GetCategoryNumAchievements
 */
declare function GetCategoryNumAchievements(categoryId: number, includeAll?: boolean): LuaMultiReturn<[number, number, number]>;

/**
 * Return the value of the requested Statistic from the comparison unit
 *
 * @param achivementId The ID of the Achievement
 * @returns The value of the requested Statistic from the comparison unit
 * @see https://wow.gamepedia.com/API_GetComparisonStatistic
 */
declare function GetComparisonStatistic(achivementId: number): string;

/**
 * Return the next achievement in a chain
 *
 * @param achivementId The ID of the Achievement
 * @returns The ID of the next Achievement in chain or nil
 * @see https://wow.gamepedia.com/API_GetNextAchievement
 */
declare function GetNextAchievement(achivementId: number): number | null;

/**
 * Returns the number of completed achievements for the comparison player
 *
 * @param achivementId ID of the achievement to retrieve information for
 * @see https://wow.gamepedia.com/API_GetNumComparisonCompletedAchievements
 */
declare function GetNumComparisonCompletedAchievements(achivementId: number): LuaMultiReturn<[number, number]>;

/**
 * Return the total number of Achievements, and number completed
 *
 * @see https://wow.gamepedia.com/API_GetNumCompletedAchievements
 */
declare function GetNumCompletedAchievements(): LuaMultiReturn<[number, number]>;

/**
 * Return the previous achievement in a chain
 *
 * @param achivementId The ID of the Achievement
 * @returns The ID of the previous Achievement in chain or nil
 * @see https://wow.gamepedia.com/API_GetPreviousAchievement
 */
declare function GetPreviousAchievement(achivementId: number): number | null;

/**
 * Return the value of the requested Statistic
 *
 * @param achievementId The ID of the Achievement
 * @returns The value of the requested Statistic
 * @see https://wow.gamepedia.com/API_GetStatistic
 */
declare function GetStatistic(achievementId: number): WoWAPI.UnknownStringKeyTable;

/**
 * Returns a table of achievement categories
 *
 * @returns list of all the categories
 * @see https://wow.gamepedia.com/API_GetStatisticsCategoryList
 */
declare function GetStatisticsCategoryList(): WoWAPI.UnknownNumberKeyTable;

/**
 * Returns the total number of Achievement Points earned
 *
 * @returns Total points earned
 * @see https://wow.gamepedia.com/API_GetTotalAchievementPoints
 */
declare function GetTotalAchievementPoints(): number;

/**
 * Returns a list of (up to 10) currently tracked achievements
 *
 * @returns achievementId(s) of achievements you are currently tracking
 * @see https://wow.gamepedia.com/API_GetTrackedAchievements
 * @since 3.0.2
 */
declare function GetTrackedAchievements(): LuaMultiReturn<[number, number, number, number, number, number, number, number, number, number]>;

/**
 * Returns the total number of tracked achievements
 *
 * @returns number of achievements you are currently tracking, up to 10.
 * @see https://wow.gamepedia.com/API_GetNumTrackedAchievements
 * @since 3.1.0
 */
declare function GetNumTrackedAchievements(): number;

/**
 * Un-marks an achievement for tracking in the WatchFrame
 *
 * @param achievementId ID of the achievement to add to tracking
 * @see https://wow.gamepedia.com/API_RemoveTrackedAchievement
 * @event TRACKED_ACHIEVEMENT_UPDATE
 * @since 3.1.0
 */
declare function RemoveTrackedAchievement(achievementId: number): void;

/**
 * Sets the unit to be compared to.
 *
 * @param unit unit to query, e.g. "target"
 * @returns Returns true/false depending on whether the unit is valid
 * @see https://wow.gamepedia.com/API_SetAchievementComparisonUnit
 * @event INSPECT_ACHIEVEMENT_READY
 */
declare function SetAchievementComparisonUnit(unit: WoWAPI.UnitId): boolean;



/// <reference path="global.d.ts" />
/// <reference path="ui/ui.d.ts" />

/**
 * Presses the specified FrameXML action button
 *
 * @param buttonId The button ID of the button to push
 * @see https://wow.gamepedia.com/API_ActionButtonDown
 * @private PROTECTED UI
 */
declare function ActionButtonDown(buttonId: number): void;

/**
 * Releases the specified action button
 *
 * @param buttonId The button ID of the button to release (Integers from 1 to 12)
 * @see https://wow.gamepedia.com/API_ActionButtonUp
 * @private PROTECTED UI
 */
declare function ActionButtonUp(buttonId: number): void;

/**
 * Returns true if the action has a numeric range requirement.
 *
 * @param slotId The slot ID to test
 * @returns True if the specified slot contains an action which has a numeric range requirement
 * @see https://wow.gamepedia.com/API_ActionHasRange
 */
declare function ActionHasRange(slotId: ActionBarSlotId): boolean;

/**
 * Begin "Left click" in the 3D world
 *
 * @see https://wow.gamepedia.com/API_CameraOrSelectOrMoveStart
 * @private PROTECTED
 */
declare function CameraOrSelectOrMoveStart(): void;

/**
 * End "Left click" in the 3D game world
 *
 * @param stickyFlag If present and set then any camera offset is 'sticky' and remains until explicitly cancelled
 * @see https://wow.gamepedia.com/API_CameraOrSelectOrMoveStop
 * @private PROTECTED
 */
declare function CameraOrSelectOrMoveStop(stickyFlag?: WoWAPI.Unknown): void;

/**
 * Changes the current action button to the one specified in the arguments
 *
 * @param actionBarPage Which page of your action bar to switch to. Expects an integer 1-6.
 * @see https://wow.gamepedia.com/API_ChangeActionBarPage
 * @private NOCOMBAT
 */
declare function ChangeActionBarPage(actionBarPage: ActionBarPage): void;

/**
 * Returns the index of the currently-selected action bar page
 *
 * @returns integer index of the current action bar page, ascending from 1.
 * @see https://wow.gamepedia.com/API_GetActionBarPage
 */
declare function GetActionBarPage(): ActionBarPage;

/**
 * Gets the toggle states of the extra action bars.
 *
 * @returns bottomLeftState, bottomRightState, sideRightState, sideRight2State
 * @see https://wow.gamepedia.com/API_GetActionBarToggles
 */
declare function GetActionBarToggles(): LuaMultiReturn<[boolean, boolean, boolean, boolean]>;

/**
 * Returns information about the charges of a charge-accumulating player ability
 *
 * @param slotId The action slot to retrieve data from
 * @returns currentCharges, maxCharges, cooldownStart, cooldownDuration, chargeModRate
 * @see https://wow.gamepedia.com/API_GetActionCharges
 */
declare function GetActionCharges(slotId: ActionBarSlotId): LuaMultiReturn<[number, number, number, number, number]>;

/**
 * Retrieves the cooldown data of the action specified
 *
 * @param slotId The action slot to retrieve data from
 * @returns start, duration, enable, modRate
 * @see https://wow.gamepedia.com/API_GetActionCooldown
 */
declare function GetActionCooldown(slotId: ActionBarSlotId): LuaMultiReturn<[number, number, number, number]>;

/**
 * Gets the available count for an action, if applicable
 *
 * @param slotId The action slot to retrieve data from
 * @returns The action's count as displayed on the action's icon; e.g. for a potion action, returns the number of potions left.
 * 0, if the action has no count or if the specified action slot is empty
 * @see https://wow.gamepedia.com/API_GetActionCount
 */
declare function GetActionCount(slotId: ActionBarSlotId): string | number;

/**
 * Returns information about a specific action
 *
 * @param slotId Action slot to retrieve information about.
 * @returns actionType, id, subType
 * @see https://wow.gamepedia.com/API_GetActionInfo
 */
declare function GetActionInfo(slotId: ActionBarSlotId): LuaMultiReturn<[string, WoWAPI.Unknown, WoWAPI.Unknown]>;

/**
 * Gets the text label for an action
 *
 * @param slotId Action slot to retrieve information about
 * @returns The action's text, if present. Macro actions use their names for their action text. nil, if the slot has no action text,
 * or is empty. Most standard WoW action icons don't have action text
 * @see https://wow.gamepedia.com/API_GetActionText
 */
declare function GetActionText(slotId: ActionBarSlotId): string | null;

/**
 * Returns the filepath for an action's texture
 *
 * @param slotId Action slot to retrieve information about
 * @returns The texture filepath for the action's icon image. nil, if the slot is empty
 * @see https://wow.gamepedia.com/API_GetActionTexture
 */
declare function GetActionTexture(slotId: ActionBarSlotId): WoWAPI.TexturePath | null;

/**
 * Returns the current bonus action bar index
 *
 * @returns The current bonus action bar index
 * @see https://wow.gamepedia.com/API_GetBonusBarOffset
 */
declare function GetBonusBarOffset(): number;

/**
 * Returns the name of the button responsible causing the OnClick handler to fire
 *
 * @returns name of the button responsible for the innermost OnClick event. For example, "LeftButton"
 * @see https://wow.gamepedia.com/API_GetMouseButtonClicked
 */
declare function GetMouseButtonClicked(): WoWAPI.MouseButton;

/**
 * Tests if an action slot is occupied
 *
 * @param slotId The tested action slot
 * @returns 1, if the slot contains an action. nil, if the slot is empty
 * @see https://wow.gamepedia.com/API_HasAction
 */
declare function HasAction(slotId: ActionBarSlotId): WoWAPI.Flag | null;

/**
 * Returns whether an action is in range for use
 *
 * @param slotId The action slot to test
 * @returns nil if the slot has no action, or if the action cannot be used on the current target; 0 if the action is out of range, and 1 otherwise
 * @see https://wow.gamepedia.com/API_IsActionInRange
 */
declare function IsActionInRange(slotId: ActionBarSlotId): WoWAPI.Flag | null;

/**
 * Determine whether action slot is an attack action
 *
 * @param slotId The action slot to test
 * @returns nil if the specified slot is not an attack action, or is empty. 1 if the slot is an attack action and should flash red during combat
 * @see https://wow.gamepedia.com/API_IsAttackAction
 */
declare function IsAttackAction(slotId: ActionBarSlotId): WoWAPI.Flag | null;

/**
 * Determine whether action slot is auto repeating
 *
 * @param slotId The action slot to test
 * @returns 1 if the action in the slot is currently auto-repeating, nil if it is not auto-repeating or the slot is empty
 * @see https://wow.gamepedia.com/API_IsAutoRepeatAction
 */
declare function IsAutoRepeatAction(slotId: ActionBarSlotId): WoWAPI.Flag | null;

/**
 * Determine whether an action is currently executing
 *
 * @param slotId action slot ID to query.
 * @returns 1 if the action in the slot is currently executing, nil otherwise
 * @see https://wow.gamepedia.com/API_IsCurrentAction
 */
declare function IsCurrentAction(slotId: ActionBarSlotId): WoWAPI.Flag | null;

/**
 * Tests if the action is linked to a consumable item
 *
 * @param slotId The tested action slot
 * @returns True if the action in the specified slot is linked to a consumable, e.g. a potion action. Consumable actions have a small number
 * displayed in the bottom right corner of their action icon. False if the action is not consumable or if the action is empty
 * @see https://wow.gamepedia.com/API_IsConsumableAction
 */
declare function IsConsumableAction(slotId: ActionBarSlotId): boolean;

/**
 * An equip action is created if you drag a weapon from the Inventory to an action bar slot. If you click this action to
 * equip the weapon, the action icon will obtain a green outline. It is in this case that IsEquippedAction() returns 1.
 * All other cases (e.g. empty slot, non-equip action, equip action is of the current weapon but hasn't been used yet) will return nil.
 *
 * @param slotId The tested action
 * @returns 1 if the specified action is an action that equips a weapon and if the action has been used to equip the current weapon. nil otherwise
 * @see https://wow.gamepedia.com/API_IsEquippedAction
 */
declare function IsEquippedAction(slotId: ActionBarSlotId): WoWAPI.Flag | null;

/**
 * Determine if an action can be used (you have sufficient mana, reagents and the action is not on cooldown).
 *
 * @param slotId Action slot to query
 * @returns isUsable, notEnoughMana
 * @see https://wow.gamepedia.com/API_IsUsableAction
 */
declare function IsUsableAction(slotId: ActionBarSlotId): LuaMultiReturn<[boolean, boolean]>;

/**
 * Determine if player has a pet with an action bar.
 *
 * @returns nil if the player has no pet (or the pet has no action bar), 1 if a pet action bar should be shown
 * @see https://wow.gamepedia.com/API_PetHasActionBar
 */
declare function PetHasActionBar(): WoWAPI.Flag | null;

/**
 * Pick up an action for drag-and-drop
 *
 * @param slotId The action slot to pick the action up from
 * @see https://wow.gamepedia.com/API_PickupAction
 * @private PROTECTED NOCOMBAT
 */
declare function PickupAction(slotId: ActionBarSlotId): void;

/**
 * Pick up a pet action for drag-and-drop
 *
 * @param petSlotId The pet action slot to pick the action up from (1-10).
 * @see https://wow.gamepedia.com/API_PickupPetAction
 * @private PROTECTED NOCOMBAT
 */
declare function PickupPetAction(petSlotId: SlotActionBarPet): void;

/**
 * Place the drag-and-drop item as an action
 *
 * @param slotId The action slot to place the action into.
 * @see https://wow.gamepedia.com/API_PlaceAction
 */
declare function PlaceAction(slotId: ActionBarSlotId): void;

/**
 * Set the desired state of the extra action bars
 *
 * @param bottomLeftState 1 if the left-hand bottom action bar is to be shown, 0 or nil otherwise.
 * @param bottomRightState 1 if the right-hand bottom action bar is to be shown, 0 or nil otherwise.
 * @param sideRightState 1 if the first (outer) right side action bar is to be shown, 0 or nil otherwise.
 * @param sideRight2State 1 if the second (inner) right side action bar is to be shown, 0 or nil otherwise
 * @param alwaysShow 1 if the bars are always shown, 0 or nil otherwise.
 * @see https://wow.gamepedia.com/API_SetActionBarToggles
 */
// tslint:disable-next-line max-line-length
declare function SetActionBarToggles(bottomLeftState: WoWAPI.Flag, bottomRightState: WoWAPI.Flag, sideRightState: WoWAPI.Flag, sideRight2State: WoWAPI.Flag, alwaysShow: WoWAPI.Flag): void;

/**
 * Begin "Right click" in the 3D game world.
 *
 * @see https://wow.gamepedia.com/API_TurnOrActionStart
 * @private PROTECTED
 */
declare function TurnOrActionStart(): void;

/**
 * End "Right click" in the 3D game world
 *
 * @see https://wow.gamepedia.com/API_TurnOrActionStop
 * @private PROTECTED
 */
declare function TurnOrActionStop(): void;

/**
 * Perform the action in the specified action slot
 *
 * @param slot The action action slot to use
 * @param checkCursor Can be 0, 1, or nil. Appears to indicate whether the action button was clicked (1) or used via hotkey (0);
 * probably involved in placing skills/items in the action bar after they've been picked up. I can confirm this. If you pass 0 for checkCursor,
 * it will use the action regardless of whether another item/skill is on the cursor. If you pass 1 for checkCursor,
 * it will replace the spell/action on the slot with the new one.
 * @param onSelf Can be 0, 1, or nil. If present and 1, then the action is performed on the player, not the target. If "true" is passed instead
 * of 1, Blizzard produces a Lua error.
 * @private PROTECTED
 */
declare function UseAction(slot: ActionBarSlotId, checkCursor?: WoWAPI.Flag, onSelf?: WoWAPI.Flag): void;


/// <reference path="global.d.ts" />

/**
 * Accept the challenge to a duel.
 *
 * @see https://wow.gamepedia.com/API_AcceptDuel
 */
declare function AcceptDuel(): void;

/**
 * Toggles auto-attacking of the player's current target
 *
 * @see https://wow.gamepedia.com/API_AttackTarget
 * @private PROTECTED
 */
declare function AttackTarget(): void;

/**
 * Forfeits the current duel, or declines an invitation to duel
 *
 * @see https://wow.gamepedia.com/API_CancelDuel
 */
declare function CancelDuel(): void;

/**
 * Cancels the logout timer (from camping or quitting).
 *
 * @see https://wow.gamepedia.com/API_CancelLogout
 * @private PROTECTED
 */
declare function CancelLogout(): void;

/**
 * Rejects a summon request
 *
 * @see https://wow.gamepedia.com/API_CancelSummon
 */
declare function CancelSummon(): void;

/**
 * Accepts a summon request (only works during the two minutes the summon is available).
 *
 * @see https://wow.gamepedia.com/API_ConfirmSummon
 */
declare function ConfirmSummon(): void;

/**
 * The player stops descending (while flying or swimming).
 *
 * @see https://wow.gamepedia.com/API_DescendStop
 * @private PROTECTED
 */
declare function DescendStop(): void;

/**
 * Dismounts the player if the player was mounted
 *
 * @see https://wow.gamepedia.com/API_Dismount
 * @since 2.0.3
 */
declare function Dismount(): void;

/**
 * Instantly quits the game, bypassing the usual 20 seconds countdown
 *
 * @see https://wow.gamepedia.com/API_ForceQuit
 * @private PROTECTED
 */
declare function ForceQuit(): void;

/**
 * Returns the amount of time left on your PVP flag
 *
 * @returns Amount of time (in milliseconds) until your PVP flag wears off.
 * @see https://wow.gamepedia.com/API_GetPVPTimer
 */
declare function GetPVPTimer(): number;

/**
 * Returns the name of the area you're being summoned to
 *
 * @see https://wow.gamepedia.com/API_GetSummonConfirmAreaName
 */
declare function GetSummonConfirmAreaName(): WoWAPI.Unknown;

/**
 * Get the name of the unit which initiated the players summon
 *
 * @returns Name of the player summoning you, or nil if no summon is currently pending
 * @see https://wow.gamepedia.com/API_GetSummonConfirmSummoner
 */
declare function GetSummonConfirmSummoner(): string;

/**
 * Returns the amount of time left before the pending summon expires
 *
 * @see https://wow.gamepedia.com/API_GetSummonConfirmTimeLeft
 */
declare function GetSummonConfirmTimeLeft(): WoWAPI.Unknown;

/**
 * Logs the player character out of the game.
 *
 * @see https://wow.gamepedia.com/API_Logout
 * @event PLAYER_CAMPING
 * @private PROTECTED
 */
declare function Logout(): void;

/**
 * Quits the game.
 *
 * @see https://wow.gamepedia.com/API_Quit
 * @event PLAYER_QUITING
 * @private PROTECTED
 */
declare function Quit(): void;

/**
 * Performs a random roll between two numbers
 *
 * @param low lowest number (default 1)
 * @param high highest number (default 100)
 * @description Yield: <Your name> rolls. <number> (1-10)
 * @see https://wow.gamepedia.com/API_RandomRoll
 */
declare function RandomRoll(low?: number, high?: number): void;

/**
 * Used to toggle PVP on or Off
 *
 * @param flag 0 or 1; 0 Toggles PVP off, 1 Toggles PVP on.
 * @see https://wow.gamepedia.com/API_SetPVP
 */
declare function SetPVP(flag: WoWAPI.Flag | null): void;

/**
 * The player sits, stands, or begins to descend (while swimming or flying)
 *
 * @see https://wow.gamepedia.com/API_SitStandOrDescendStart
 * @since 2.1.0
 * @private PROTECTED
 */
declare function SitStandOrDescendStart(): void;

/**
 * Invites the specified player to a duel
 *
 * @param playerName The name of the player you wish to duel
 * @see https://wow.gamepedia.com/API_StartDuel
 */
declare function StartDuel(playerName: string): void;

/**
 * Toggles PvP setting on or off
 *
 * @see https://wow.gamepedia.com/API_TogglePVP
 */
declare function TogglePVP(): void;

/**
 * Toggles sheathed or unsheathed weapons
 *
 * @see https://wow.gamepedia.com/API_ToggleSheath
 * @event UNIT_MODEL_CHANGED
 */
declare function ToggleSheath(): void;

/**
 * Use an active soulstone to resurrect yourself after death. Also works for Shamans with Reincarnation available
 *
 * @see https://wow.gamepedia.com/API_UseSoulstone
 */
declare function UseSoulstone(): void;


/// <reference path="global.d.ts" />

declare namespace WoWAPI {
    /**
     * Addon is banned by the client
     */
    type ADDON_LOAD_REASON_BANNED = "BANNED";

    /**
     * The addon's file(s) are corrupt
     */
    type ADDON_LOAD_REASON_CORRUPT = "CORRUPT";

    /**
     * Addon's dependency is banned by the client
     */
    type ADDON_LOAD_REASON_DEP_BANNED = "DEP_BANNED";

    /**
     * The addon's dependency cannot load because its file(s) are corrupt
     */
    type ADDON_LOAD_REASON_DEP_CORRUPT = "DEP_CORRUPT";

    /**
     * The addon cannot load without its dependency enabled
     */
    type ADDON_LOAD_REASON_DEP_DISABLED = "DEP_DISABLED";

    /**
     * The addon cannot load if its dependency cannot load
     */
    type ADDON_LOAD_REASON_DEP_INCOMPATIBLE = "DEP_INCOMPATIBLE";

    /**
     * The addon's dependency is physically not there
     */
    type ADDON_LOAD_REASON_DEP_MISSING = "DEP_MISSING";

    /**
     * The addon's dependency must be loadable on demand too
     */
    type ADDON_LOAD_REASON_DEP_NOT_DEMAND_LOADED = "DEP_NOT_DEMAND_LOADED";

    /**
     * Addon is disabled on the character select screen
     */
    type ADDON_LOAD_REASON_DISABLED = "DISABLED";

    /**
     * The addon is too old.
     */
    type ADDON_LOAD_REASON_INCOMPATIBLE = "INCOMPATIBLE";

    /**
     * The addon is physically not there
     */
    type ADDON_LOAD_REASON_MISSING = "MISSING";

    /**
     * As of 1.8 only addons marked as LoadOnDemand can be loaded via this function
     */
    type ADDON_LOAD_REASON_NOT_DEMAND_LOADED = "NOT_DEMAND_LOADED";

    /**
     * Unknown, presumably the interface version in the .toc file is incorrect
     */
    type ADDON_LOAD_REASON_INTERFACE_VERSION = "INTERFACE_VERSION";

    /**
     * all possible load error reasons
     */
    type ADDON_LOAD_REASON = ADDON_LOAD_REASON_BANNED | ADDON_LOAD_REASON_CORRUPT | ADDON_LOAD_REASON_DEP_BANNED | ADDON_LOAD_REASON_DEP_CORRUPT |
        ADDON_LOAD_REASON_DEP_DISABLED | ADDON_LOAD_REASON_DEP_INCOMPATIBLE | ADDON_LOAD_REASON_DEP_MISSING |
        ADDON_LOAD_REASON_DEP_NOT_DEMAND_LOADED | ADDON_LOAD_REASON_DISABLED | ADDON_LOAD_REASON_INCOMPATIBLE | ADDON_LOAD_REASON_MISSING |
        ADDON_LOAD_REASON_NOT_DEMAND_LOADED | ADDON_LOAD_REASON_INTERFACE_VERSION;
}

/**
 * Disable an AddOn for subsequent sessions
 *
 * @param index The index of the AddOn to disable in the user's AddOn list, from 1 to GetNumAddOns().
 * @see https://wow.gamepedia.com/API_DisableAddOn
 */
declare function DisableAddOn(index: number): void;

/**
 * Disable an AddOn for subsequent sessions
 *
 * @param name The name of the AddOn to be disabled
 * @param character The name of the character (without realm) for whom to disable the addon. Defaults to the current character
 * @see https://wow.gamepedia.com/API_DisableAddOn
 */
declare function DisableAddOn(name: string, character?: string): void;

/**
 * Disable all AddOns for subsequent sessions
 *
 * @see https://wow.gamepedia.com/API_DisableAllAddOns
 */
declare function DisableAllAddOns(): void;

/**
 * Enable an AddOn for subsequent sessions
 *
 * @param indexOrName The index of the AddOn to enable in the user's AddOn list OR The name of the AddOn to be enabled
 * @see https://wow.gamepedia.com/API_EnableAddOn
 */
declare function EnableAddOn(indexOrName: number | string): void;

/**
 * Enable all AddOns for subsequent sessions
 *
 * @see https://wow.gamepedia.com/API_EnableAllAddOns
 */
declare function EnableAllAddOns(): void;

/**
 * Get the required dependencies for an AddOn
 *
 * @param indexOrName The index of the AddOn in the user's AddOn list. Note that you cannot access Blizzard-provided AddOns through this mechanism.
 * OR The name of the AddOn to be queries. You can access Blizzard-provided AddOns through this mechanism
 * @returns Name of an addon the specified addon lists as a required dependency
 * @see https://wow.gamepedia.com/API_GetAddOnDependencies
 */
declare function GetAddOnDependencies(indexOrName: number | string): LuaMultiReturn<[...string[]]>;

/**
 * Unknown
 *
 * @param character Unknown
 * @param addonIndex Unknown
 * @see https://wow.gamepedia.com/API_GetAddOnEnableState
 */
declare function GetAddOnEnableState(character: WoWAPI.Unknown, addonIndex: WoWAPI.Unknown): WoWAPI.Unknown;

/**
 * Get information about an AddOn
 *
 * @param indexOrName The index of the AddOn in the user's AddOn list. Note that you cannot access Blizzard-provided AddOns through this
 * mechanism OR The name of the AddOn to be queried. You can access Blizzard-provided AddOns through this mechanism
 * @returns name, title, notes, loadable, reason, security, newVersion
 * @see https://wow.gamepedia.com/API_GetAddOnInfo
 */
declare function GetAddOnInfo(indexOrName: number | string): LuaMultiReturn<[string, string, string, boolean, WoWAPI.ADDON_LOAD_REASON, string, boolean]>;

/**
 * get addon metadata from the toc file
 *
 * @param addonNameOrIndex Addon name to look up metadata for
 * @param field Field name. May be Title, Notes, Author, Version, or anything starting with X-
 * @returns The value of the field, nil if not defined.
 * @see https://wow.gamepedia.com/API_GetAddOnMetadata
 */
declare function GetAddOnMetadata(addonNameOrIndex: string | number, field: string): string | null;

/**
 * Returns a list of optional dependencies
 *
 * @param indexOrName The index of the AddOn in the user's AddOn list. Note that you cannot access Blizzard-provided AddOns through this mechanism.
 * OR The name of the AddOn to be queries. You can access Blizzard-provided AddOns through this mechanism
 * @see https://wow.gamepedia.com/API_GetAddOnOptionalDependencies
 */
declare function GetAddOnOptionalDependencies(indexOrName: number | string): LuaMultiReturn<[...string[]]>;

/**
 * Get the number of user supplied AddOns
 *
 * @see https://wow.gamepedia.com/API_GetNumAddOns
 */
declare function GetNumAddOns(): number;

/**
 * Returns whether an addon has been loaded
 *
 * @param indexOrName The index of the addon in the user's addon list. You cannot query Blizzard-provided AddOns using this parameter OR
 * The name of the addon to be queried. You can query Blizzard-provided addon using this parameter
 * @returns loaded, finished
 * @see https://wow.gamepedia.com/API_IsAddOnLoaded
 */
declare function IsAddOnLoaded(indexOrName: number | string): LuaMultiReturn<[WoWAPI.Flag, WoWAPI.Flag]>;

/**
 * Determine if an AddOn is loaded on demand (via .toc file dependencies or LoadAddOn) rather than at startup
 *
 * @param indexOrName The index of the AddOn in the user's AddOn list. Note that you cannot access Blizzard-provided AddOns through this mechanism.
 * OR The name of the AddOn to be queries. You can access Blizzard-provided AddOns through this mechanism
 * @returns Indicates if the AddOn is loaded on demand, 1 if it is, nil if it is loaded on startup
 * @see https://wow.gamepedia.com/API_IsAddOnLoadOnDemand
 */
declare function IsAddOnLoadOnDemand(indexOrName: number | string): WoWAPI.Flag;

/**
 * Request the loading of an On-Demand AddOn
 *
 * @param indexOrName The index of the AddOn in the user's AddOn list. Note that you cannot access Blizzard-provided AddOns through this mechanism.
 * OR The name of the AddOn to be queries. You can access Blizzard-provided AddOns through this mechanism
 * @returns loaded, reason
 * @see https://wow.gamepedia.com/API_LoadAddOn
 */
declare function LoadAddOn(indexOrName: number | string): LuaMultiReturn<[WoWAPI.Flag, WoWAPI.ADDON_LOAD_REASON]>;


/// <reference path="global.d.ts" />
/// <reference path="ui/ui.d.ts" />

declare namespace WoWAPI {
    type ARCHAELOLOGY_RARITY_COMMON = 0;
    type ARCHAELOLOGY_RARITY_RARE = 1;
    type ARCHAELOLOGY_RARITY = ARCHAELOLOGY_RARITY_COMMON | ARCHAELOLOGY_RARITY_RARE;

    type ARCHAELOLOGY_BRANCH_DWARF = 1;
    type ARCHAELOLOGY_BRANCH_DRAENEI = 2;
    type ARCHAELOLOGY_BRANCH_FOSSIL = 3;
    type ARCHAELOLOGY_BRANCH_NIGHT_ELF = 4;
    type ARCHAELOLOGY_BRANCH_NERUBIAN = 5;
    type ARCHAELOLOGY_BRANCH_ORC = 6;
    type ARCHAELOLOGY_BRANCH_TOL_VIR = 7;
    type ARCHAELOLOGY_BRANCH_TROLL = 8;
    type ARCHAELOLOGY_BRANCH_VRYKUL = 27;
    type ARCHAELOLOGY_BRANCH_MANTID = 29;
    type ARCHAELOLOGY_BRANCH_PANDAREN = 229;
    type ARCHAELOLOGY_BRANCH_MOGU = 231;
    type ARCHAELOLOGY_BRANCH_ARAKKOA = 315;
    type ARCHAELOLOGY_BRANCH_DRAENOR_CLANS = 350;
    type ARCHAELOLOGY_BRANCH_OGRE = 382;
    type ARCHAELOLOGY_BRANCH_HIGHBORNE = 404;
    type ARCHAELOLOGY_BRANCH_HIGHMOUNTAIN_TAUREN = 406;
    type ARCHAELOLOGY_BRANCH_DEMONIC = 408;

    /**
     * all currently known branches
     */
    type ARCHAELOLOGY_BRANCH = ARCHAELOLOGY_BRANCH_DWARF | ARCHAELOLOGY_BRANCH_DRAENEI | ARCHAELOLOGY_BRANCH_FOSSIL |
        ARCHAELOLOGY_BRANCH_NIGHT_ELF | ARCHAELOLOGY_BRANCH_NERUBIAN | ARCHAELOLOGY_BRANCH_ORC | ARCHAELOLOGY_BRANCH_TOL_VIR |
        ARCHAELOLOGY_BRANCH_TROLL | ARCHAELOLOGY_BRANCH_VRYKUL | ARCHAELOLOGY_BRANCH_MANTID | ARCHAELOLOGY_BRANCH_PANDAREN |
        ARCHAELOLOGY_BRANCH_MOGU | ARCHAELOLOGY_BRANCH_ARAKKOA | ARCHAELOLOGY_BRANCH_DRAENOR_CLANS | ARCHAELOLOGY_BRANCH_OGRE |
        ARCHAELOLOGY_BRANCH_HIGHBORNE | ARCHAELOLOGY_BRANCH_HIGHMOUNTAIN_TAUREN | ARCHAELOLOGY_BRANCH_DEMONIC;

}

/// <reference path="global.d.ts" />

declare namespace WoWAPI {
    type ARENA_TEAM_GREEN = 0;
    type ARENA_TEAM_GOLD = 1;
    type ARENA_TEAM = ARENA_TEAM_GREEN | ARENA_TEAM_GOLD;

    type ARENA_ID_2VS2 = 4;
    type ARENA_ID_3VS3 = 5;
    type ARENA_ID = ARENA_ID_2VS2 | ARENA_ID_3VS3;
}

/**
 * Returns information regarding an Arena team
 *
 * @param index Which team to get information on, 0 is Green team and 1 is Gold Team
 * @returns teamName, oldTeamRating, newTeamRating, teamRating
 * @see https://wow.gamepedia.com/API_GetBattlefieldTeamInfo
 */
declare function GetBattlefieldTeamInfo(index: WoWAPI.ARENA_TEAM): LuaMultiReturn<[string, number, number, number]>;

/**
 * Returns the current arena season. Returns 0 when there is no active season
 *
 * @returns Current arena season
 * @see https://wow.gamepedia.com/API_GetCurrentArenaSeason
 */
declare function GetCurrentArenaSeason(): number;

/**
 * Gets the previous Arena season
 *
 * @see https://wow.gamepedia.com/API_GetPreviousArenaSeason
 */
declare function GetPreviousArenaSeason(): WoWAPI.Unknown;

/**
 * Used for checking if the player is inside an arena or if it's a rated match. If you are in waiting room and/or countdown is going on, it will return false
 *
 * @returns isArena, isRegistered
 * @see https://wow.gamepedia.com/API_IsActiveBattlefieldArena
 */
declare function IsActiveBattlefieldArena(): LuaMultiReturn<[boolean, boolean]>;

/**
 * Returns a value based on whether the player is the arena team captain
 *
 * @param index The team index
 * @see https://wow.gamepedia.com/API_IsArenaTeamCaptain
 */
declare function IsArenaTeamCaptain(index: WoWAPI.ARENA_TEAM): boolean;

/**
 * Returns true if you are a member of an arena team.
 *
 * @see https://wow.gamepedia.com/API_IsInArenaTeam
 */
declare function IsInArenaTeam(): boolean;

/**
 * Queue for a arena either solo or as a group
 *
 * @param arenaId The arena id
 * @param joinAsGroup Unknown
 * @see https://wow.gamepedia.com/API_JoinSkirmish
 */
declare function JoinSkirmish(arenaId: WoWAPI.ARENA_ID, joinAsGroup?: boolean): void;


// @todo: write declarations!


/// <reference path="global.d.ts" />
/// <reference path="item.d.ts" />

declare namespace WoWAPI {

    type AUCTION_RUNTIME_12H = 1;
    type AUCTION_RUNTIME_24H = 2;
    type AUCTION_RUNTIME_48H = 3;
    type AUCTION_RUNTIME = AUCTION_RUNTIME_12H | AUCTION_RUNTIME_24H | AUCTION_RUNTIME_48H;

    type AUCTION_SALE_STATUS_UNSOLD = 0;
    type AUCTION_SALE_STATUS_SOLD = 1;
    type AUCTION_SALE_STATUS = AUCTION_SALE_STATUS_UNSOLD | AUCTION_SALE_STATUS_SOLD;

    /**
     * short (less than 30 minutes)
     */
    type AUCTION_TIMELEFT_SHORT = 0;

    /**
     * medium (30 minutes - 2 hours)
     */
    type AUCTION_TIMELEFT_MEDIUM = 1;

    /**
     * long (2 - 12 hours)
     */
    type AUCTION_TIMELEFT_LONG = 2;

    /**
     * very long (more than 12 hours)
     */
    type AUCTION_TIMELEFT_VERY_LONG = 3;

    /**
     * all currently known time left values
     */
    type AUCTION_TIMELEFT = AUCTION_TIMELEFT_SHORT | AUCTION_TIMELEFT_MEDIUM | AUCTION_TIMELEFT_LONG | AUCTION_TIMELEFT_VERY_LONG;

    /**
     * An item up for auction, the "Browse" tab in the dialog
     */
    type AUCTION_TYPE_LIST = "list";

    /**
     * An item the player has bid on, the "Bids" tab in the dialog
     */
    type AUCTION_TYPE_BIDDER = "bidder";

    /**
     * An item the player has up for auction, the "Auctions" tab in the dialog
     */
    type AUCTION_TYPE_OWNER = "owner";

    /**
     * the currently known auction types
     */
    type AUCTION_TYPE = AUCTION_TYPE_LIST | AUCTION_TYPE_BIDDER | AUCTION_TYPE_OWNER;

    /**
     * The itemLink of one item in the current retrieved list of items from the Auction House
     */
    type AuctionLink = Hyperlink;

    type AUCTION_HOUSE_FILTER_CATEGORY_UNCATEGORIZED = 0;
    type AUCTION_HOUSE_FILTER_CATEGORY_EQUIPMENT = 1;
    type AUCTION_HOUSE_FILTER_CATEGORY_RARITY = 2;
    type AUCTION_HOUSE_FILTER_CATEGORY = AUCTION_HOUSE_FILTER_CATEGORY_UNCATEGORIZED |
        AUCTION_HOUSE_FILTER_CATEGORY_EQUIPMENT | AUCTION_HOUSE_FILTER_CATEGORY_RARITY;

    type AUCTION_HOUSE_FILTER_UNCOLLECTED_ONLY = 0;
    type AUCTION_HOUSE_FILTER_USABLE_ONLY = 1;
    type AUCTION_HOUSE_FILTER_UPGRADES_ONLY = 2;
    type AUCTION_HOUSE_FILTER_EXACT_MATCH = 3;
    type AUCTION_HOUSE_FILTER_POOR_QUALITY = 4;
    type AUCTION_HOUSE_FILTER_COMMON_QUALITY = 5;
    type AUCTION_HOUSE_FILTER_UNCOMMON_QUALITY = 6;
    type AUCTION_HOUSE_FILTER_RARE_QUALITY = 7;
    type AUCTION_HOUSE_FILTER_EPIC_QUALITY = 8;
    type AUCTION_HOUSE_FILTER_LEGENDARY_QUALITY = 9;
    type AUCTION_HOUSE_FILTER_ARTIFACT_QUALITY = 10;
    type AUCTION_HOUSE_FILTER = AUCTION_HOUSE_FILTER_UNCOLLECTED_ONLY |
        AUCTION_HOUSE_FILTER_USABLE_ONLY |
        AUCTION_HOUSE_FILTER_UPGRADES_ONLY |
        AUCTION_HOUSE_FILTER_EXACT_MATCH |
        AUCTION_HOUSE_FILTER_POOR_QUALITY |
        AUCTION_HOUSE_FILTER_COMMON_QUALITY |
        AUCTION_HOUSE_FILTER_UNCOMMON_QUALITY |
        AUCTION_HOUSE_FILTER_RARE_QUALITY |
        AUCTION_HOUSE_FILTER_EPIC_QUALITY |
        AUCTION_HOUSE_FILTER_LEGENDARY_QUALITY |
        AUCTION_HOUSE_FILTER_ARTIFACT_QUALITY;

    type AUCTION_HOUSE_SORT_ORDER_PRICE = 0;
    type AUCTION_HOUSE_SORT_ORDER_NAME = 1;
    type AUCTION_HOUSE_SORT_ORDER_LEVEL = 2;
    type AUCTION_HOUSE_SORT_ORDER_BID = 3;
    type AUCTION_HOUSE_SORT_ORDER_BUYOUT = 4;
    type AUCTION_HOUSE_SORT_ORDER = AUCTION_HOUSE_SORT_ORDER_PRICE | AUCTION_HOUSE_SORT_ORDER_NAME | AUCTION_HOUSE_SORT_ORDER_LEVEL |
        AUCTION_HOUSE_SORT_ORDER_BID | AUCTION_HOUSE_SORT_ORDER_BUYOUT;

    type ITEM_COMMODITY_STATUS_UNKNOWN = 0;
    type ITEM_COMMODITY_STATUS_ITEM = 1;
    type ITEM_COMMODITY_STATUS_COMMODITY = 2;
    type ITEM_COMMODITY_STATUS = ITEM_COMMODITY_STATUS_UNKNOWN | ITEM_COMMODITY_STATUS_ITEM | ITEM_COMMODITY_STATUS_COMMODITY;

    interface AuctionHouseBrowseQuery {
        searchString: string;
        sorts: AuctionHouseSortType[];
        minLevel?: number;
        maxLevel?: number;
        filters?: AUCTION_HOUSE_FILTER[];
        itemClassFilters?: AuctionHouseItemClassFilter[];
    }

    interface AuctionHouseFilterGroup {
        category: AUCTION_HOUSE_FILTER_CATEGORY;
        filters: AUCTION_HOUSE_FILTER[];
    }

    interface AuctionHouseItemClassFilter {
        classID: number;
        subClassID?: number;
        inventoryType?: number;
    }

    interface AuctionHouseSortType {
        sortOrder: AUCTION_HOUSE_SORT_ORDER;
        reverseSort: boolean;
    }

    interface BidInfo {
        auctionID: number;
        itemKey: ItemKey;
        itemLink?: ItemLink;
        timeLeft: AUCTION_TIMELEFT;
        bidAmount?: number;
        buyoutAmount?: number;
        bidder?: string;
    }

    interface BrowseResultInfo {
        itemKey: ItemKey;
        appearanceLink?: string;
        totalQuantity: number;
        minPrice: number;
        containsOwnerItem: boolean;
    }

    interface CommoditySearchResultInfo {
        itemID: number;
        quantity: number;
        unitPrice: number;
        auctionID: number;
        owners: string[];
        timeLeftSeconds?: number;
        numOwnerItems: number;
        containsOwnerItem: boolean;
        containsAccountItem: boolean;
    }

    interface ItemSearchResultInfo {
        itemKey: ItemKey;
        owners: string[];
        timeLeft: AUCTION_TIMELEFT;
        auctionID: number;
        quantity: number;
        itemLink: ItemLink;
        containsOwnerItem: boolean;
        containsAccountItem: boolean;
        containsSocketedItem: boolean;
        bidder?: string;
        minBid?: number;
        bidAmount?: number;
        buyoutAmount?: number;
        timeLeftSeconds?: number;
    }

    interface OwnedAutionInfo {
        auctionID: number;
        itemKey: ItemKey;
        itemLink: ItemLink;
        status: AUCTION_SALE_STATUS;
        quantity: number;
        timeLeftSeconds?: number;
        timeLeft: AUCTION_TIMELEFT;
        bidAmount?: number | null;
        buyoutAmount?: number;
        bidder?: string;
    }

    interface C_AuctionHouse {

        /**
         *
         * @param itemId
         * @param duration
         * @param quantity
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CalculateCommodityDeposit
         */
        CalculateCommodityDeposit(itemId: number, duration: AUCTION_RUNTIME, quantity: number): number | null;

        /**
         *
         * @param table
         * @param duration
         * @param quantity
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CalculateItemDeposit
         */
        CalculateItemDeposit(table: ItemLocationMixin, duration: AUCTION_RUNTIME, quantity: number): number | null;

        /**
         *
         * @param ownedAuctionId
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CanCancelAuction
         */
        CanCancelAuction(ownedAuctionId: number): boolean;

        /**
         *
         * @param ownedAuctionId
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CancelAuction
         */
        CancelAuction(ownedAuctionId: number): void;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CancelCommoditiesPurchase
         */
        CancelCommoditiesPurchase(): void;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CancelSell
         */
        CancelSell(): void;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.CloseAuctionHouse
         */
        CloseAuctionHouse(): void;

        /**
         *
         * @param itemId
         * @param quantity
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.ConfirmCommoditiesPurchase
         */
        ConfirmCommoditiesPurchase(itemId: number, quantity: number): void;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.FavoritesAreAvailable
         */
        FavoritesAreAvailable(): boolean;

        /**
         *
         * @param classId
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetAuctionItemSubClasses
         */
        GetAuctionItemSubClasses(classId: number): number[];

        /**
         *
         * @param item
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetAvailablePostCount
         */
        GetAvailablePostCount(item: ItemLocationMixin): number;

        /**
         *
         * @param bidIndex
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetBidInfo
         */
        GetBidInfo(bidIndex: number): BidInfo | null;

        /**
         *
         * @param bidTypeIndex
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetBidType
         */
        GetBidType(bidTypeIndex: number): ItemKey | null;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetBrowseResults
         */
        GetBrowseResults(): BrowseResultInfo[];

        /**
         *
         * @param ownedAuctionID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetCancelCost
         */
        GetCancelCost(ownedAuctionId: number): number;

        /**
         *
         * @param itemId
         * @param commoditySearchIndex
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetCommoditySearchResultInfo
         */
        GetCommoditySearchResultInfo(itemId: number, commoditySearchIndex: number): CommoditySearchResultInfo | null;

        /**
         *
         * @param itemID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetCommoditySearchResultsQuantity
         */
        GetCommoditySearchResultsQuantity(itemID: number): number;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetExtraBrowseInfo
         */
        GetExtraBrowseInfo(itemKey: ItemKey): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetFilterGroups
         */
        GetFilterGroups(): AuctionHouseFilterGroup[];

        /**
         *
         * @param item
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetItemCommodityStatus
         */
        GetItemCommodityStatus(item: ItemLocationMixin): ITEM_COMMODITY_STATUS;

        /**
         *
         * @param item
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetItemKeyFromItem
         */
        GetItemKeyFromItem(item: ItemLocationMixin): ItemKey;

        /**
         *
         * @param itemKey
         * @param restrictQualityToFilter
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetItemKeyInfo
         */
        GetItemKeyInfo(itemKey: ItemKey, restrictQualityToFilter?: boolean): ItemKeyInfo | null;

        /**
         *
         * @param itemKey
         * @param itemSearchResultIndex
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetItemSearchResultInfo
         */
        GetItemSearchResultInfo(itemKey: ItemKey, itemSearchResultIndex: number): ItemSearchResultInfo | null;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetItemSearchResultsQuantity
         */
        GetItemSearchResultsQuantity(itemKey: ItemKey): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxBidItemBid
         */
        GetMaxBidItemBid(): number | null;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxBidItemBuyout
         */
        GetMaxBidItemBuyout(): number | null;

        /**
         *
         * @param itemID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxCommoditySearchResultPrice
         */
        GetMaxCommoditySearchResultPrice(itemID: number): number | null;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxItemSearchResultBid
         */
        GetMaxItemSearchResultBid(itemKey: ItemKey): number | null;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxItemSearchResultBuyout
         */
        GetMaxItemSearchResultBuyout(itemKey: ItemKey): number | null;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxOwnedAuctionBid
         */
        GetMaxOwnedAuctionBid(): number | null;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetMaxOwnedAuctionBuyout
         */
        GetMaxOwnedAuctionBuyout(): number | null;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumBidTypes
         */
        GetNumBidTypes(): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumBids
         */
        GetNumBids(): number;

        /**
         *
         * @param itemID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumCommoditySearchResults
         */
        GetNumCommoditySearchResults(itemID: number): number;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumItemSearchResults
         */
        GetNumItemSearchResults(itemKey: ItemKey): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumOwnedAuctionTypes
         */
        GetNumOwnedAuctionTypes(): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumOwnedAuctions
         */
        GetNumOwnedAuctions(): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetNumReplicateItems
         */
        GetNumReplicateItems(): number;

        /**
         *
         * @param ownedAuctionIndex
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetOwnedAuctionInfo
         */
        GetOwnedAuctionInfo(ownedAuctionIndex: number): OwnedAutionInfo | null;

        /**
         *
         * @param ownedAuctionTypeIndex
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetOwnedAuctionType
         */
        GetOwnedAuctionType(ownedAuctionTypeIndex: number): ItemKey | null;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetQuoteDurationRemaining
         */
        GetQuoteDurationRemaining(): number;

        /**
         *
         * @param index
         * @returns
         * - **creatureID**
         * - **displayID**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetReplicateItemBattlePetInfo
         */
        GetReplicateItemBattlePetInfo(index: number): LuaMultiReturn<[number, number]>;

        /**
         *
         * @param index
         * @returns
         * - **name**
         * - **texture**
         * - **count**
         * - **qualityID**
         * - **usable**
         * - **level**
         * - **levelType**
         * - **minBid**
         * - **minIncrement**
         * - **buyoutPrice**
         * - **bidAmount**
         * - **highBidder**
         * - **bidderFullName**
         * - **owner**
         * - **ownerFullName**
         * - **saleStatus**
         * - **itemID**
         * - **hasAllInfo**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetReplicateItemInfo
         */
        GetReplicateItemInfo(index: number): LuaMultiReturn<[string | null, number | null, number, number, boolean | null, number, string | null, number, number, number,
            number, string | null, string | null, string | null, string | null, number, number, boolean | null]>;

        /**
         *
         * @param index
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetReplicateItemLink
         */
        GetReplicateItemLink(index: number): string | null;

        /**
         *
         * @param index
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetReplicateItemTimeLeft
         */
        GetReplicateItemTimeLeft(index: number): number;

        /**
         *
         * @param timeLeftBand
         * @returns
         * - **timeLeftMinSeconds**
         * - **timeLeftMaxSeconds**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.GetTimeLeftBandInfo
         */
        GetTimeLeftBandInfo(timeLeftBand: AUCTION_TIMELEFT): LuaMultiReturn<[number, number]>;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasFavorites
         */
        HasFavorites(): boolean;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasFullBidResults
         */
        HasFullBidResults(): boolean;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasFullBrowseResults
         */
        HasFullBrowseResults(): boolean;

        /**
         *
         * @param itemID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasFullCommoditySearchResults
         */
        HasFullCommoditySearchResults(itemID: number): boolean;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasFullItemSearchResults
         */
        HasFullItemSearchResults(itemKey: ItemKey): boolean;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasFullOwnedAuctionResults
         */
        HasFullOwnedAuctionResults(): boolean;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasMaxFavorites
         */
        HasMaxFavorites(): boolean;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.HasSearchResults
         */
        HasSearchResults(itemKey: ItemKey): boolean;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.IsFavoriteItem
         */
        IsFavoriteItem(itemKey: ItemKey): boolean;

        /**
         *
         * @param item
         * @param displayError
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.IsSellItemValid
         */
        IsSellItemValid(item: ItemLocationMixin, displayError?: boolean): boolean;

        /**
         *
         * @param specificSearch
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.IsThrottledMessageSystemReady
         */
        IsThrottledMessageSystemReady(specificSearch?: boolean): boolean;

        /**
         *
         * @param itemID
         * @param itemLevel
         * @param itemSuffix
         * @param battlePetSpeciesID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.MakeItemKey
         */
        MakeItemKey(itemID: number, itemLevel?: number, itemSuffix?: number, battlePetSpeciesID?: number): ItemKey;

        /**
         *
         * @param auctionID
         * @param bidAmount
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.PlaceBid
         */
        PlaceBid(auctionID: number, bidAmount: number): void;

        /**
         *
         * @param item
         * @param duration
         * @param quantity
         * @param unitPrice
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.PostCommodity
         */
        PostCommodity(item: ItemLocationMixin, duration: AUCTION_RUNTIME, quantity: number, unitPrice: number): void;

        /**
         *
         * @param item
         * @param duration
         * @param quantity
         * @param bid
         * @param buyout
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.PostItem
         */
        PostItem(item: ItemLocationMixin, duration: AUCTION_RUNTIME, quantity: number, bid?: number, buyout?: number): void;

        /**
         *
         * @param sorts
         * @param auctionIDs
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.QueryBids
         */
        QueryBids(sorts: AuctionHouseSortType[], auctionIDs: number[]): void;

        /**
         *
         * @param sorts
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.QueryOwnedAuctions
         */
        QueryOwnedAuctions(sorts: AuctionHouseSortType[]): void;

        /**
         *
         * @param itemID
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.RefreshCommoditySearchResults
         */
        RefreshCommoditySearchResults(itemID: number): void;

        /**
         *
         * @param itemKey
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.RefreshItemSearchResults
         */
        RefreshItemSearchResults(itemKey: ItemKey): void;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.ReplicateItems
         */
        ReplicateItems(): void;

        /**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.RequestMoreBrowseResults
         */
        RequestMoreBrowseResults(): void;

        /**
         *
         * @param itemID
         * @returns **hasFullResults**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.RequestMoreCommoditySearchResults
         */
        RequestMoreCommoditySearchResults(itemID: number): boolean;

        /**
         *
         * @param itemKey
         * @returns **hasFullResults**
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.RequestMoreItemSearchResults
         */
        RequestMoreItemSearchResults(itemKey: ItemKey): boolean;

        /**
         *
         * @param sorts
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.SearchForFavorites
         */
        SearchForFavorites(sorts: AuctionHouseSortType[]): void;

        /**
         *
         * @param itemKeys
         * @param sorts
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.SearchForItemKeys
         */
        SearchForItemKeys(itemKeys: ItemKey[], sorts: AuctionHouseSortType[]): void;

        /**
         *
         * @param query
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.SendBrowseQuery
         */
        SendBrowseQuery(query: AuctionHouseBrowseQuery): void;

        /**
         *
         * @param itemKey
         * @param sorts
         * @param separateOwnerItems
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.SendSearchQuery
         */
        SendSearchQuery(itemKey: ItemKey, sorts: AuctionHouseSortType[], separateOwnerItems: boolean): void;

        /**
         *
         * @param itemKey
         * @param sorts
         * @param separateOwnerItems
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.SendSellSearchQuery
         */
        SendSellSearchQuery(itemKey: ItemKey, sorts: AuctionHouseSortType[], separateOwnerItems: boolean): void;

        /**
         *
         * @param itemKey
         * @param setFavorite
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.SetFavoriteItem
         */
        SetFavoriteItem(itemKey: ItemKey, setFavorite: boolean): void;

        /**
         *
         * @param itemID
         * @param quantity
         * @see https://wow.gamepedia.com/API_C_AuctionHouse.StartCommoditiesPurchase
         */
        StartCommoditiesPurchase(itemID: number, quantity: number): void;
    }
}

declare const C_AuctionHouse: WoWAPI.C_AuctionHouse;

/**
 * Retrieves the itemLink of one item in the current retrieved list of items from the Auction House
 *
 * @param type the type to query
 * @param index The index of the item in the list to retrieve info from (normally 1-50, inclusive)
 * @see https://wow.gamepedia.com/API_GetAuctionWowItemLink
 */
declare function GetAuctionWowItemLink(type: WoWAPI.AUCTION_TYPE, index: number): WoWAPI.AuctionLink;


/**
 * Map a bank item button or bag to an inventory slot button for use in inventory functions
 * @param buttodId bank item/bag ID.
 * @param isBag 1 if buttonID is a bag, nil otherwise. Same result as ContainerIDToInventoryID, except this one only works for
 * bank bags and is more awkward to use
 * @see https://wow.gamepedia.com/API_BankButtonIDToInvSlotID
 */
declare function BankButtonIDToInvSlotID(buttodId: number, isBag: WoWAPI.Flag): WoWAPI.INVENTORY_SLOT_ID;

/**
 * Will Close the Bank Frame if opened
 * @see https://wow.gamepedia.com/API_CloseBankFrame
 */
declare function CloseBankFrame(): void;

/**
 * Returns the price of a particular bank slot
 * @param numSlot Number of slots already purchased
 * @return Price of the next bank slot in copper
 * @see https://wow.gamepedia.com/API_GetBankSlotCost
 */
declare function GetBankSlotCost(numSlot: number): number;

/**
 * Returns information about the number of purchased bank bag slots
 * @see https://wow.gamepedia.com/API_GetNumBankSlots
 */
declare function GetNumBankSlots(): LuaMultiReturn<[number, WoWAPI.Flag]>;


declare namespace WoWAPI {
    type FacialHairCustomizationGlobalType = "EARRINGS" | "FEATURES" | "HAIR" | "HORNS" | "MARKINGS" | "NORMAL" | "PIERCINGS" | "TUSKS";
    type FacialHairCustomizationType = "HORNS" | "NORMAL";
}

/**
 * Purchases currently selected customizations from the barber shop
 * @see https://wow.gamepedia.com/API_ApplyBarberShopStyle
 */
declare function ApplyBarberShopStyle(): void;

/**
 * Resets all customization categories to original styles
 * @see https://wow.gamepedia.com/API_BarberShopReset
 */
declare function BarberShopReset(): void;

/**
 * Exits the barber shop without applying selected customizations
 * @see https://wow.gamepedia.com/API_CancelBarberShop
 */
declare function CancelBarberShop(): void;

/**
 * Returns information about the current selection for a barber shop customization
 * @see https://wow.gamepedia.com/API_GetBarberShopStyleInfo
 */
declare function GetBarberShopStyleInfo(catId: number): LuaMultiReturn<[string, WoWAPI.Unknown, WoWAPI.Unknown, WoWAPI.Flag]>;

/**
 * Returns the total costs of the cosmetic changes
 * @see https://wow.gamepedia.com/API_GetBarberShopTotalCost
 */
declare function GetBarberShopTotalCost(): number;

/**
 * Returns the type of facial hair customization available to the character
 * @see https://wow.gamepedia.com/API_GetFacialHairCustomization
 */
declare function GetFacialHairCustomization(): WoWAPI.FacialHairCustomizationGlobalType;

/**
 * https://wow.gamepedia.com/API_GetHairCustomization
 * @see https://wow.gamepedia.com/API_GetHairCustomization
 */
declare function GetHairCustomization(): WoWAPI.FacialHairCustomizationType;

/**
 * Alters style selection in a particular customization category
 * @param catId Ascending index of the customization category that should be changed to the next/previous style
 * @param reverse 1 if the selection should be changed to the previous style, nil if to the next
 */
declare function SetNextBarberShopStyle(catId: number, reverse?: WoWAPI.Flag): void;


declare namespace WoWAPI {
    type BattlefieldStatusType = "queued" | "confirm" | "active" | "none" | "error";
    type BattlefieldTeamSize = 0 | 2 | 3 | 5;
    type BattlefieldType = "ARENA" | "BATTLEGROUND" | "WARGAME";
    type BattlefieldWinType = null | 0 | 1 | 255;
    type BattlefieldUiStateType = 0 | 1 | 2;
    type BattlefieldFaction = null | undefined | void | 0 | 1;
}

/**
 * Acccept the area Spirit Healer's resurrection in battlegrounds
 * @see https://wow.gamepedia.com/API_AcceptAreaSpiritHeal
 */
declare function AcceptAreaSpiritHeal(): void;

/**
 * Confirms entry into a Battleground you are queued for that is ready
 * @param index The battlefield in queue to enter
 * @param accept Whether or not to accept entry to the battlefield
 * @protected HARDWARE_EVENT
 * @see https://wow.gamepedia.com/API_AcceptBattlefieldPort
 */
declare function AcceptBattlefieldPort(index: number, accept: boolean): void;

/**
 * Cancels the area Spirit Healer's resurrection in battlegrounds
 * @see https://wow.gamepedia.com/API_CancelAreaSpiritHeal
 */
declare function CancelAreaSpiritHeal(): void;

/**
 * Returns, whether the player can join a battlefield as group or not
 * @return returns true, if the player can join the battlefield as group
 * @see https://wow.gamepedia.com/API_CanJoinBattlefieldAsGroup
 */
declare function CanJoinBattlefieldAsGroup(): boolean;

/**
 * Gets the time left until the next resurrection cast.
 * @return Seconds until the Spirit Guide casts its next Area Resurrection. Returns 0 if player is not dead
 * @see https://wow.gamepedia.com/API_GetAreaSpiritHealerTime
 */
declare function GetAreaSpiritHealerTime(): number;

/**
 * Returns the unix time
 */
declare function time(): number

/**
 * Get estimated wait time for a Battlefield's availability
 * @returns Milliseconds until Battlefield opening is available (estimated)
 * @see https://wow.gamepedia.com/API_GetBattlefieldEstimatedWaitTime
 */
declare function GetBattlefieldEstimatedWaitTime(): number;

/**
 * Used to position the flag icon on the world map and the battlefield minimap
 * @param index Index to get the flag position from
 * @see https://wow.gamepedia.com/API_GetBattlefieldFlagPosition
 */
declare function GetBattlefieldFlagPosition(index: number): LuaMultiReturn<[number, number, string]>;

/**
 * Get shutdown timer for the battlefield instance
 * @returns the number of milliseconds before the Battlefield will close after a battle is finished. This is 0 before the battle is finished
 * @see https://wow.gamepedia.com/API_GetBattlefieldInstanceExpiration
 */
declare function GetBattlefieldInstanceExpiration(): number;

/**
 * Returns the time passed since the battleground started
 * @returns miliseconds passed since the battle started
 * @see https://wow.gamepedia.com/API_GetBattlefieldInstanceRunTime
 */
declare function GetBattlefieldInstanceRunTime(): number;

/**
 * Returns the remaining seconds of a battlefield port
 * @param index Index of queue to get the expiration from
 * @returns Remaining time of battlefield port in seconds
 * @see https://wow.gamepedia.com/API_GetBattlefieldPortExpiration
 */
declare function GetBattlefieldPortExpiration(index: number): number;

/**
 * Returns information about a player's score in battlegrounds
 * @param playerIndex The characters index in battlegrounds, going from 1 to GetNumBattlefieldScores().
 * @see https://wow.gamepedia.com/API_GetBattlefieldScore
 */
declare function GetBattlefieldScore(playerIndex: number): LuaMultiReturn<[string, number, number, number, number, number, string, string, string, number, number, string]>;

/**
 * Get data from the custom battlefield scoreboard columns
 * @param playerIndex Player you want to grab the data for
 * @param columnIndex Column you want to grab the data from
 * @description Used to retrieve data from battleground specific scoreboard columns like flag captures in Warsong Gulch.
 * If you want to make sure you have the most recent data you will have to call RequestBattlefieldScoreData and then wait for UPDATE_BATTLEFIELD_SCORE
 * @see https://wow.gamepedia.com/API_GetBattlefieldStatData
 */
declare function GetBattlefieldStatData(playerIndex: number, columnIndex: number): WoWAPI.Unknown;

/**
 * Get list of battleground specific columns on the scoreboard
 * @param columnIndex Column to get data for
 * @see https://wow.gamepedia.com/API_GetBattlefieldStatInfo
 */
declare function GetBattlefieldStatInfo(columnIndex: number): LuaMultiReturn<[string, string, string]>;

/**
 * Get the status of the arena, battleground, or wargame that the player is either queued for or inside
 * @param battlefieldIndex Index of the battlefield you wish to view, in the range of 1 to GetMaxBattlefieldID()
 * @see https://wow.gamepedia.com/API_GetBattlefieldStatus
 */
// tslint:disable-next-line max-line-length
declare function GetBattlefieldStatus(battlefieldIndex: number): LuaMultiReturn<[WoWAPI.BattlefieldStatusType, string, WoWAPI.BattlefieldTeamSize, number, WoWAPI.Unknown, WoWAPI.BattlefieldType, WoWAPI.Unknown, WoWAPI.UnitRoleType]>;

/**
 * Get time this player's been in the queue in milliseconds
 * @param battlegroundQueuePosition The queue position
 * @see https://wow.gamepedia.com/API_GetBattlefieldTimeWaited
 */
declare function GetBattlefieldTimeWaited(battlegroundQueuePosition: number): number;

/**
 * Get the winner of the battlefield
 * @returns Faction/team that has won the battlefield. Results are: nil if nobody has won, 0 for Horde, 1 for Alliance and 255
 * for a draw in a battleground, 0 for Green Team and 1 for Yellow in an arena
 * @see https://wow.gamepedia.com/API_GetBattlefieldWinner
 */
declare function GetBattlefieldWinner(): WoWAPI.BattlefieldWinType;

/**
 * Returns information about a battleground type
 * @param battlegroundTypeIndex battleground type index, 1 to GetNumBattlegroundTypes().
 * @see https://wow.gamepedia.com/API_GetBattlegroundInfo
 */
declare function GetBattlegroundInfo(battlegroundTypeIndex: number): LuaMultiReturn<[string, WoWAPI.Flag, WoWAPI.Flag, WoWAPI.Flag, number, string]>;

/**
 * Appears to return the number of scores in the battleground/field scoreboard
 * @see https://wow.gamepedia.com/API_GetNumBattlefieldScores
 */
declare function GetNumBattlefieldScores(): WoWAPI.Unknown;

/**
 * Appears to return the number of columns in the battleground/field scoreboard, other than the common ones (Killing Blows, Kills, Deaths, Bonus Honour):
 * @returns Number of columns available for the battleground (2 for Warsong Gulch and Arathi Basin, 7 for Alterac Valley)
 * @see https://wow.gamepedia.com/API_GetNumBattlefieldStats
 */
declare function GetNumBattlefieldStats(): number;

/**
 * Returns the number of world state UI elements. These are displayed in the WorldStateFrame at the top center of the screen
 * @see https://wow.gamepedia.com/API_GetNumWorldStateUI
 */
declare function GetNumWorldStateUI(): number;

/**
 * Get score and flag status within a battlefield
 * @param worldUiStateIndex between 1 and GetNumWorldStateUI().
 * @see https://wow.gamepedia.com/API_GetWorldStateUIInfo
 */
// tslint:disable-next-line max-line-length
declare function GetWorldStateUIInfo(worldUiStateIndex: number): LuaMultiReturn<[number, WoWAPI.BattlefieldUiStateType, boolean, string, string, string, string, string, string, number, number, number]>;

/**
 * Queues the player, or the player's group, for a battlefield instance
 * @param battlefieldIndex Which battlefield instance to queue for (0 for first available), or which arena bracket to queue for
 * @param asGroup If true-equivalent, the player's group is queued for the battlefield, otherwise, only the player is queued
 * @param isRated If true-equivalent, and queueing for an arena bracket, the group is queued for a rated match as opposed to a skirmish
 * @deprecated
 * @protected Protected functions can only be called from a secure execution path.
 */
declare function JoinBattlefield(battlefieldIndex: number, asGroup?: boolean, isRated?: boolean): void;

/**
 * Leaves the current battlefield
 * @description Leaves the current battlefield the player is inside, pre-2.0.1 this would only leave the battlefield if it had been won or
 * lost this was changed in 2.0.1 to exit you from the battlefield regardless if it was finished or not and will give you deserter.
 * @see https://wow.gamepedia.com/API_LeaveBattlefield
 */
declare function LeaveBattlefield(): void;

/**
 * Requests the lastest battlefield score data from the server
 * @event UPDATE_BATTLEFIELD_SCORE
 * @see https://wow.gamepedia.com/API_RequestBattlefieldScoreData
 */
declare function RequestBattlefieldScoreData(): void;

/**
 * Requests information about the available instances of a particular battleground
 * @param instanceIndex Index of the battleground type to request instance information for; valid indices start from 1 and go up to GetNumBattlegroundTypes().
 * @event PVPQUEUE_ANYWHERE_SHOW
 * @description Calling JoinBattlefield after calling this function, but before PVPQUEUE_ANYWHERE_SHOW, will fail silently; you must wait for
 * the instance list to become available before you can queue for an instance.
 * @see https://wow.gamepedia.com/API_RequestBattlegroundInstanceInfo
 */
declare function RequestBattlegroundInstanceInfo(instanceIndex: number): void;

/**
 * Set the faction to show on the battlefield scoreboard
 * @param faction nil = All, 0 = Horde, 1 = Alliance
 * @see https://wow.gamepedia.com/API_SetBattlefieldScoreFaction
 */
declare function SetBattlefieldScoreFaction(faction?: WoWAPI.BattlefieldFaction): void;


declare namespace WoWAPI {
    type CurrentBindingWhich = 1 | 2;
    type BindingSetType = 0 | CurrentBindingWhich;
}

/**
 * Returns the command name and all keys currently bound to the specified binding
 * @param bindingIndex index of the binding to query, from 1 to GetNumBindings().
 * @param mode Unknown, defaults to 1
 * @see https://wow.gamepedia.com/API_GetBinding
 */
declare function GetBinding(bindingIndex: number, mode?: WoWAPI.Unknown): LuaMultiReturn<[string, string, string]>;

/**
 * Returns the name of the action performed by the specified binding
 * @param binding The name of the key (eg. "BUTTON1", "1", "CTRL-G")
 * @param checkOverride if true, override bindings will be checked, otherwise, only default (bindings.xml/SetBinding) bindings are consulted
 * @returns action command performed by the binding. If no action is bound to the key, an empty string is returned
 * @see https://wow.gamepedia.com/API_GetBindingAction
 */
declare function GetBindingAction(binding: string, checkOverride?: boolean): string;

/**
 * Returns all keys currently bound to the command specified by command. This function is almost identical to GetBinding(index)
 * except it takes the command name as an argument instead of the index and doesn't return the command name along with the key bindings
 * @param command The name of the command to get key bindings for (e.g. MOVEFORWARD, TOGGLEFRIENDSTAB)
 * @returns The string representation(s) of all the key(s) bound to this command (e.g. W, CTRL-F)
 * @see https://wow.gamepedia.com/API_GetBindingKey
 */
declare function GetBindingKey(command: string): LuaMultiReturn<[...string[]]>;

/**
 * Returns the localized string value for the given key and prefix. Essentially a glorified getglobal() function
 * @param key The name of the key (e.g. "UP", "SHIFT-PAGEDOWN")
 * @param prefix The prefix of the variable name you're looking for. Usually "KEY_" or "BINDING_NAME_"
 * @param abbreviate Whether to return an abbreviated version of the modifier keys
 * @returns The value of the global variable derived from the prefix and key name you specified. For example, "UP" and "KEY_"
 * would return the value of the global variable KEY_UP which is "Up Arrow" in the english locale. If the global variable doesn't exist for
 * the combination specified, it appears to just return the key name you specified. Modifier key prefixes are stripped from the input and added
 * back in to the output
 * @see https://wow.gamepedia.com/API_GetBindingText
 */
declare function GetBindingText(key: string, prefix: string, abbreviate?: boolean): string;

/**
 * Returns whether account- or character-specific bindings are active.
 * @returns ACCOUNT_BINDINGS = 1 (indicates that account-wide bindings are currently active), CHARACTER_BINDINGS = 2
 * (indicates that per-character bindings are currently active)
 * @see https://wow.gamepedia.com/API_GetCurrentBindingSet
 */
declare function GetCurrentBindingSet(): WoWAPI.CurrentBindingWhich;

/**
 * Returns the total number of key bindings listed in the key bindings window. This includes not only actions that can be bound,
 * but also the category headers in the window. This would generally be used in conjunction with GetBinding to loop through and set/get
 * all of the key bindings available
 * @returns The total number of key bindings (including headers) listed in the key bindings window.
 * @see https://wow.gamepedia.com/API_GetNumBindings
 */
declare function GetNumBindings(): WoWAPI.Unknown;

/**
 * Loads a binding set into memory, activating those bindings
 * @param bindingSet Which binding set to load; one of the following three numeric constants: DEFAULT_BINDINGS (0), ACCOUNT_BINDINGS (1), CHARACTER_BINDINGS (2)
 * @event UPDATE_BINDINGS
 * @see https://wow.gamepedia.com/API_LoadBindings
 */
declare function LoadBindings(bindingSet: WoWAPI.BindingSetType): void;

/**
 * Executes a key binding as if a key was pressed
 * @param command Name of the key binding to be executed
 * @param up if "up", the binding is run as if the key was released
 * @description The "command" argument must match one of the (usually capitalized) binding names in a Bindings.xml file.
 * This can be a name that appears in the Blizzard FrameXML Bindings.xml, or one that is specified in an AddOn. RunBinding cannot be used
 * to call a Protected Function from insecure execution paths. By default, the key binding is executed as if the key was pressed down, in other
 * words the keystate variable will have value "down" during the binding's execution. By specifying the optional second argument
 * (the actual string "up"), the binding is instead executed as if the key was released, in other words the keystate variable will have value
 * "up" during the binding's execution
 * @see https://wow.gamepedia.com/API_RunBinding
 */
declare function RunBinding(command: string, up?: string): void;

/**
 * Writes the current in-memory key bindings to disk
 * @param bindingSafeType Can be the values 1 or 2. This value indicates whether the current key bindings set should be saved as account or character specific
 * @event UPDATE_BINDINGS
 * @see https://wow.gamepedia.com/API_SaveBindings
 */
declare function SaveBindings(bindingSafeType: WoWAPI.CurrentBindingWhich): void;

/**
 * @todo: SetBinding() ...
 */

declare namespace WoWAPI {
    type BuffFilterType = "HELPFUL" | "HARMFUL" | "PLAYER" | "RAID" | "CANCELABLE" | "NOT_CANCELABLE";
    type BuffWeaponHandType = 1 | 2;
    type DebuffType = "Magic" | "Disease" | "Poison" | "Curse" | "";
}

/**
 * Removes a specific buff from the unit
 * @param unitId Unit to cancel the buff from, must be under the player's control
 * @param spellName Name of the buff to cancel
 * @param spellRank Spell rank
 * @requires NO_COMBAT
 * @see https://wow.gamepedia.com/API_CancelUnitBuff
 */
declare function CancelUnitBuff(unitId: WoWAPI.UnitId, spellName: string, spellRank?: string): void;

/**
 * Removes a specific buff from the unit
 * @param unitId Unit to cancel the buff from, must be under the player's control
 * @param buffIndex index of the buff to cancel, ascending from 1.
 * @param filter any of combination of "HELPFUL|HARMFUL|PLAYER|RAID|CANCELABLE|NOT_CANCELABLE".
 * @requires NO_COMBAT
 * @see https://wow.gamepedia.com/API_CancelUnitBuff
 */
declare function CancelUnitBuff(unitId: WoWAPI.UnitId, buffIndex: number, filter?: WoWAPI.BuffFilterType & string): void;

/**
 * Cancels a druid's shapeshift buff
 * @deprecated
 * @protected
 * @see https://wow.gamepedia.com/API_CancelShapeshiftForm
 */
declare function CancelShapeshiftForm(): void;

/**
 * Removes temporary item buffs, such as Rogue poisons, Shaman weapon buffs, and sharpening stones from either the Main Hand or Off Hand equipment slots
 * @param weaponHand 1 for Main Hand, 2 for Off Hand
 * @deprecated
 * @protected
 * @see https://wow.gamepedia.com/API_CancelItemTempEnchantment
 */
declare function CancelItemTempEnchantment(weaponHand: WoWAPI.BuffWeaponHandType): void;

/**
 * Returns information about the player's current temporary enchants, such as fishing lures or sharpening stones and weightstones produced by blacksmiths
 * @see https://wow.gamepedia.com/API_GetWeaponEnchantInfo
 */
declare function GetWeaponEnchantInfo(): LuaMultiReturn<[boolean, number, number, number, boolean, number, number, number]>;

declare function UnitName(unitId: WoWAPI.UnitId): string;
declare function UnitPower(unitId: WoWAPI.UnitId, powerType: number): number;
declare function UnitPowerMax(unitId: WoWAPI.UnitId, powerType: number): number;

/**
 * Returns information about a buff or debuff on the specified unit
 * @param unitId unit whose auras to query
 * @param index index (from 1 to 40)
 * @param filter list of filters, separated by spaces or pipes. "HELPFUL" by default
 * @see https://wow.gamepedia.com/API_UnitAura
 */
// tslint:disable-next-line max-line-length
declare function UnitAura(unitId: WoWAPI.UnitId, index: number, rank?: number, filter?: WoWAPI.BuffFilterType & string): LuaMultiReturn<[string, string, WoWAPI.TexturePath, number, WoWAPI.DebuffType, number, number, WoWAPI.UnitId, boolean, boolean, number]>;

/**
 * Retrieve info about a certain buff on a certain unit
 * @param unitId unit whose buffs to query
 * @param index index (from 1 to 40)
 * @param filter list of filters, separated by spaces or pipes ("|"). "HELPFUL" by default
 * @see https://wow.gamepedia.com/API_UnitBuff
 */
// tslint:disable-next-line max-line-length
declare function UnitBuff(unitId: WoWAPI.UnitId, index: number, filter?: WoWAPI.BuffFilterType & string): LuaMultiReturn<[string, WoWAPI.TexturePath, number, WoWAPI.DebuffType, number, number, WoWAPI.UnitId, boolean, boolean, number, boolean, boolean, boolean, number, number, number, number]>;

/**
 * Retrieve info about a specified debuff on a certain unit
 * @param unitId unit whose buffs to query
 * @param index index (from 1 to 40)
 * @param filter list of filters, separated by spaces or pipes ("|"). "HELPFUL" by default
 * @see https://wow.gamepedia.com/API_UnitBuff
 */
// tslint:disable-next-line max-line-length
declare function UnitDebuff(unitId: WoWAPI.UnitId, index: number, filter?: WoWAPI.BuffFilterType & string): LuaMultiReturn<[string, WoWAPI.TexturePath, number, WoWAPI.DebuffType, number, number, WoWAPI.UnitId, boolean, boolean, number, boolean, boolean, boolean, number, number, number, number]>;


declare namespace WoWAPI {
    type CalendarEventType = "PLAYER" | "GUILD" | "ARENA" | "HOLIDAY" | "RAID_LOCKOUT";
}


/**
 * Begin "Left click" in the 3D world
 * @protected
 * @deprecated
 * @see https://wow.gamepedia.com/API_CameraOrSelectOrMoveStart
 */
declare function CameraOrSelectOrMoveStart(): void;

/**
 * End "Left click" in the 3D game world
 * @param stickyFlag If present and set then any camera offset is 'sticky' and remains until explicitly cancelled
 * @protected
 * @deprecated
 * @see https://wow.gamepedia.com/API_CameraOrSelectOrMoveStop
 */
declare function CameraOrSelectOrMoveStop(stickyFlag?: boolean): void;

/**
 * Zooms the camera into the viewplane
 * @param increment float increment
 * @description Zooms the camera into the viewplane by increment. The increment must be between 0.0 and 50 with 0.0 indicating no
 * zoom relative to current view and 50 being maximum zoom. From a completely zoomed out position, an increment of 50 will result in
 * a first person camera angle
 * @see https://wow.gamepedia.com/API_CameraZoomIn
 */
declare function CameraZoomIn(increment: number): void;

/**
 * Zooms the camera out of the viewplane
 * @param increment float increment
 * @description Zooms the camera out of the viewplane by increment. The increment must be between 0.0 and the max camera distance.
 * As of patch 1.9.0 if the 'Interface Options > Advanced Options > Max Camera Distance' setting is set to Low, then the largest
 * value for increment is 15. If this setting is set to High, then the largest value for increment is 30. You can test for the max camera
 * distance by zooming in to first person and counting the number of times you can call this function with increment set to 1.0 and still zoom out
 * @see https://wow.gamepedia.com/API_CameraZoomOut
 */
declare function CameraZoomOut(increment: number): void;

/**
 * Rotates the camera about the Z-axis
 * @param angle float angle
 * @description Rotates the camera about the Z-axis by the angle amount specified in degrees
 * @see https://wow.gamepedia.com/API_FlipCameraYaw
 */
declare function FlipCameraYaw(angle: number): void;

/**
 * Gets the current zoom level of the camera
 * @returns float, the currently set zoom level
 * @description Doesn't take camera collisions with the environment into account and will return what the camera would be at. If the
 * camera is in motion, the zoom level that is set that frame is used, not the zoom level that the camera is traveling to.
 * @see https://wow.gamepedia.com/API_GetCameraZoom
 */
declare function GetCameraZoom(): number;

/**
 * For checking whether mouselook mode is currently active
 * @returns true if mouselook mode is active, false otherwise
 * @see https://wow.gamepedia.com/API_IsMouselooking
 */
declare function IsMouselooking(): boolean;

/**
 * Enters mouse look mode, during which mouse movement is used to alter the character's movement/facing direction
 * @see https://wow.gamepedia.com/API_MouselookStart
 */
declare function MouselookStart(): void;

/**
 * Exits mouse look mode; allows mouse input to move the mouse cursor
 * @see https://wow.gamepedia.com/API_MouselookStop
 */
declare function MouselookStop(): void;

declare function ReloadUI(): void;

declare function IsModifierKeyDown(): boolean;
declare function IsShiftKeyDown(): boolean;
declare function IsAltKeyDown(): boolean;
declare function IsControlKeyDown(): boolean;
declare function IsLeftShiftKeyDown(): boolean;
declare function IsLeftAltKeyDown(): boolean;
declare function IsLeftControlKeyDown(): boolean;
declare function IsRightShiftKeyDown(): boolean;
declare function IsRightAltKeyDown(): boolean;
declare function IsRightControlKeyDown(): boolean;

declare function DressUpItemLink(itemLink:string):void;
declare function DressUpMountLink(itemLink:string):void;
declare function DressUpTransmogLink(transmogLink:string):void;
declare function SetDressUpBackground(frame:WoWAPI.Frame,raceFilename:string,classFilename :string):void;

declare function GetMouseFocus(): WoWAPI.Frame;
/**
 * Returns the WorldMapAreaID of the currently displayed area map, and whether quest objectives should be shown.
 * @returns mapID,isContinent
 */
declare function GetCurrentMapAreaID(): LuaMultiReturn<[number, boolean]>;

/**
 * Returns the WorldMapAreaID of the currently displayed area map, and whether quest objectives should be shown.
 * @returns posX,posY
 */
 declare function GetPlayerMapPosition(unit:WoWAPI.UnitId): LuaMultiReturn<[number, number]>;

/**
 * Exits mouse look mode; allows mouse input to move the mouse cursor
 * @see https://wow.gamepedia.com/API_MouselookStop
 */
declare function MouselookStop(): void;

/**
 * Begins rotating the camera down around your character
 * - Speed is a multiplier on the CVar 'cameraPitchMoveSpeed', which is in degrees/second
 * - If speed is omitted, it is assumed to be 1.0.
 * - Negative numbers go the opposite way, a speed of 0.0 will stop it.
 * - This is not canceled by moving your character or interacting with the camera
 * - Applying a negative speed is not the same as using the other function to go the opposite way, both vectors are applied
 * simultaneously. If you rotate both ways equally, it will appear to stop, but the rotations are still being applied, though canceling each other
 * @param speed Speed at which to begin rotating
 * @see https://wow.gamepedia.com/API_MoveViewDownStart
 */
declare function MoveViewDownStart(speed: number): void;

/**
 * Stops rotating the camera Down
 * @see https://wow.gamepedia.com/API_MoveViewDownStop
 */
declare function MoveViewDownStop(): void;

/**
 * Begins zooming the camera in
 * - Speed is a multiplier on the CVar 'cameraZoomSpeed', which is in increments/second. A zoom increment appears to be about a yard from the character
 * - If speed is omitted, it is assumed to be 1.0
 * - Negative numbers go the opposite way, a speed of 0.0 will stop it.
 * - This is not canceled by moving your character, but is canceled by using the mousewheel to zoom
 * - Applying a negative speed is not the same as using the other function to go the opposite way, both vectors are applied
 * simultaneously. If you zoom both ways equally, it will appear to stop, but the rotations are still being applied, though canceling each other
 * @param speed Speed at which to begin zooming
 * @see https://wow.gamepedia.com/API_MoveViewInStart
 */
declare function MoveViewInStart(speed: number): void;

/**
 * Stops moving the camera In
 * @see https://wow.gamepedia.com/API_MoveViewInStop
 */
declare function MoveViewInStop(): void;

/**
 * Begins rotating the camera to the left around your character
 * - Speed is a multiplier on the CVar 'cameraYawMoveSpeed', which is in degrees/second
 * - If speed is omitted, it is assumed to be 1.0
 * - Negative numbers go the opposite way, a speed of 0.0 will stop it.
 * - This is not canceled by moving your character or interacting with the camera
 * - Applying a negative speed is not the same as using the other function to go the opposite way, both vectors are applied simultaneously.
 * If you zoom both ways equally, it will appear to stop, but the rotations are still being applied, though canceling each other
 * @param speed Speed at which to begin rotating
 * @see https://wow.gamepedia.com/API_MoveViewLeftStart
 */
declare function MoveViewLeftStart(speed: number): void;

/**
 * Stops rotating the camera to the Left
 * @see https://wow.gamepedia.com/API_MoveViewLeftStop
 */
declare function MoveViewLeftStop(): void;

/**
 * Begins zooming the camera out
 * - Speed is a multiplier on the CVar 'cameraZoomSpeed', which is in increments/second. A zoom increment appears to be about a yard from the character
 * - If speed is omitted, it is assumed to be 1.0
 * - Negative numbers go the opposite way, a speed of 0.0 will stop it
 * - This is not canceled by moving your character, but is canceled by using the mousewheel to zoom
 * - Applying a negative speed is not the same as using the other function to go the opposite way, both vectors are applied simultaneously.
 * If you zoom both ways equally, it will appear to stop, but the rotations are still being applied, though canceling each other
 * @param speed Speed at which to begin zooming
 * @see https://wow.gamepedia.com/API_MoveViewOutStart
 */
declare function MoveViewOutStart(speed: number): void;

/**
 * Stops moving the camera out
 * @see https://wow.gamepedia.com/API_MoveViewOutStop
 */
declare function MoveViewOutStop(): void;

/**
 * Begins rotating the camera to the right around your character
 * - Speed is a multiplier on the CVar 'cameraYawMoveSpeed', which is in degrees/second
 * - If speed is omitted, it is assumed to be 1.0.
 * - Negative numbers go the opposite way, a speed of 0.0 will stop it
 * - This is not canceled by moving your character or interacting with the camera
 * - Applying a negative speed is not the same as using the other function to go the opposite way, both vectors are applied simultaneously.
 * If you rotate both ways equally, it will appear to stop, but the rotations are still being applied, though canceling each other
 * @param speed Speed at which to begin rotating
 * @see https://wow.gamepedia.com/API_MoveViewRightStart
 */
declare function MoveViewRightStart(speed: number): void;

/**
 * Stops rotating the camera to the Right
 * @see https://wow.gamepedia.com/API_MoveViewRightStop
 */
declare function MoveViewRightStop(): void;

/**
 * Begins rotating the camera up around your character
 * - Speed is a multiplier on the CVar 'cameraPitchMoveSpeed', which is in degrees/second
 * - If speed is omitted, it is assumed to be 1.0
 * - Negative numbers go the opposite way, a speed of 0.0 will stop it
 * - This is not canceled by moving your character or interacting with the camera
 * - Applying a negative speed is not the same as using the other function to go the opposite way, both vectors are applied simultaneously.
 * If you rotate both ways equally, it will appear to stop, but the rotations are still being applied, though canceling each other
 * @param speed Speed at which to begin rotating
 * @see https://wow.gamepedia.com/API_MoveViewUpStart
 */
declare function MoveViewUpStart(speed: number): void;

/**
 * Stops rotating the camera Up
 * @see https://wow.gamepedia.com/API_MoveViewUpStop
 */
declare function MoveViewUpStop(): void;

/**
 * unknown
 * @param args unknown
 * @protected
 * @deprecated
 */
declare function PitchDownStart(...args: WoWAPI.Unknown[]): void;

/**
 * unknown
 * @param args unknown
 * @protected
 * @deprecated
 */
declare function PitchDownStop(...args: WoWAPI.Unknown[]): void;

/**
 * unknown
 * @param args unknown
 * @protected
 * @deprecated
 */
declare function PitchUpStart(...args: WoWAPI.Unknown[]): void;

/**
 * unknown
 * @param args unknown
 * @protected
 * @deprecated
 */
declare function PitchUpStop(...args: WoWAPI.Unknown[]): void;

/**
 * Cycles forward through the five predefined camera positions
 */
declare function NextView(): void;

/**
 * Cycles backward through the five predefined camera positions
 */
declare function PrevView(): void;

/**
 * Resets the specified (1-5) predefined camera position to it's default if it was changed using SaveView(index)
 * @param index the index set to
 */
declare function ResetView(index: 1 | 2 | 3 | 4 | 5): void;

/**
 * Saves a camera angle for later retrieval with SetView. The last position loaded is stored in the CVar cameraView
 * @param viewIndex The index (2-5) to save the camera angle to. (1 is reserved for first person view)
 * @see https://wow.gamepedia.com/API_SaveView
 */
declare function SaveView(viewIndex: 2 | 3 | 4 | 5): void;

/**
 * Sets a camera perspective from one previously saved with SaveView. The last position loaded is stored in the CVar cameraView
 * @param viewIndex The view index (1-5) to return to (1 is always first person, and cannot be saved with SaveView)
 * @see https://wow.gamepedia.com/API_SetView
 */
declare function SetView(viewIndex: 1 | 2 | 3 | 4 | 5): void;


declare namespace WoWAPI {
    type ChannelChatType = "SAY" | "EMOTE" | "YELL" | "PARTY" | "GUILD" | "OFFICER" | "RAID" | "RAID_WARNING" | "INSTANCE_CHAT" | "WHISPER" | "CHANNEL" |
                           "AFK" | "DND";
    type ChannelLanguageId = 1 | 2 | 3 | 6 | 7 | 8 | 10 | 13 | 14 | 33 | 35 | 40 | 43 | 44;
}

/**
 * Makes messages from a specified chat channel output in a specific chat frame
 * - A single channel may be configured to display in multiple chat windows/frames
 * - Chat output architecture has changed since release; calling this function alone is no longer sufficient to add a channel
 * to a particular frame in the default UI. Use ChatFrame_AddChannel(chatFrame, "channelName") instead, like so
 * @param windowId index of the chat window/frame (ascending from 1) to add the channel to
 * @param channelName name of the chat channel to add to the frame
 * @see https://wow.gamepedia.com/API_AddChatWindowChannel
 */
declare function AddChatWindowChannel(windowId: number, channelName: string): void;

/**
 * Bans a player from the specified channel
 * @param channelName The name of the channel to ban on
 * @param playerName The name of the player to ban
 * @see https://wow.gamepedia.com/API_ChannelBan
 */
declare function ChannelBan(channelName: string, playerName: string): void;

/**
 * Invites the specified user to the channel
 * @param channelName The name of the channel to invite to
 * @param playerName The name of the player to invite
 * @see https://wow.gamepedia.com/API_ChannelInvite
 */
declare function ChannelInvite(channelName: string, playerName: string): void;

/**
 * Kicks the specified user to the channel
 * @param channelName The name of the channel to kick from
 * @param playerName The name of the player to kick
 * @see https://wow.gamepedia.com/API_ChannelKick
 */
declare function ChannelKick(channelName: string, playerName: string): void;

/**
 * Sets the specified player as the channel moderator
 * @param channelName The name of the channel to set moderator status on
 * @param playerName The name of the player to set as a moderator
 * @see https://wow.gamepedia.com/API_ChannelModerator
 */
declare function ChannelModerator(channelName: string, playerName: string): void;

/**
 * Turns off the specified player's ability to speak in a channel
 * @param channelName The name of the channel to mute on
 * @param playerName The name of the player to mute
 * @see https://wow.gamepedia.com/API_ChannelMute
 */
declare function ChannelMute(channelName: string, playerName: string): void;

/**
 * Toggles the channel to display announcements either on or off
 * @param channelName The name of the channel to toggle announcements on
 * @param name unknown
 * @see https://wow.gamepedia.com/API_ChannelToggleAnnouncements
 */
declare function ChannelToggleAnnouncements(channelName: string, name: string): void;

/**
 * Unbans a player from the specified channel
 * @param channelName The name of the channel to remove the ban on
 * @param playerName The name of the player to unban
 * @see https://wow.gamepedia.com/API_ChannelUnban
 */
declare function ChannelUnban(channelName: string, playerName: string): void;

/**
 * Takes the specified user away from the moderator status
 * @param channelName The name of the channel to remove moderator status on
 * @param playerName The name of the player to remove moderator status from
 * @see https://wow.gamepedia.com/API_ChannelUnmoderator
 */
declare function ChannelUnmoderator(channelName: string, playerName: string): void;

/**
 * Unmutes the specified user on the channel
 * @param channelName The name of the channel to remove mute on
 * @param playerName The name of the player to remove mute from (allow to speak)
 * @see https://wow.gamepedia.com/API_ChannelUnmute
 */
declare function ChannelUnmute(channelName: string, playerName: string): void;

/**
 * Displays the name of the owner of the specified channel in the Default Chat Frame. Same as typing "/owner <channel>" in chat
 * @param channelName The name of the channel
 * @see https://wow.gamepedia.com/API_DisplayChannelOwner
 */
declare function DisplayChannelOwner(channelName: string): void;

/**
 * Retrieves all available server channels (zone dependent).
 * @returns channel1, channel2, ...
 * @see https://wow.gamepedia.com/API_EnumerateServerChannels
 */
declare function EnumerateServerChannels(): LuaMultiReturn<[...string[]]>;

/**
 * Retrieves joined channels
 * @returns id1, name1, disabled1, ...
 * @see https://wow.gamepedia.com/API_GetChannelList
 */
// tslint:disable-next-line max-line-length
declare function GetChannelList(): LuaMultiReturn<[number, string, boolean, number, string, boolean, number, string, boolean, number, string, boolean, number, string, boolean, number, string, boolean]>;

/**
 * Returns information about the specified channel
 * - **return1**: the id of the channel, or 0 if the channel is not found
 * - **return2**: the name of the channel, e.g. "Trade - Stormwind", or nil if the player is not in the queried channel
 * - **return3**: ?, usually 0
 * @param channelIdOrName Channel id to query, e.g. 1 for the chat channel currently addressable using /1 or Name of the channel to query, e.g. "Trade - City".
 * @see https://wow.gamepedia.com/API_GetChannelName
 */
declare function GetChannelName(channelIdOrName: number | string): LuaMultiReturn<[number, string, number]>;

/**
 * Get the channels received by a chat window
 * @param frameId The frame number of the chat frame to be queried (starts at 1).
 * @returns name1, zone1, name2, zone2, ...
 * @see https://wow.gamepedia.com/API_GetChatWindowChannels
 */
// tslint:disable-next-line max-line-length
declare function GetChatWindowChannels(frameId: number): LuaMultiReturn<[string, number, string, number, string, number, string, number, string, number, string, number, string, number]>;

/**
 * Joins the channel with the specified name. A player can be in a maximum of 10 chat channels. In opposite to API_JoinTemporaryChannel
 * the channel will be re-joined after relogging
 * @param channelName The name of the channel to join
 * @param password The channel password, nil if none
 * @param frameId The chat frame ID number to add the channel to. Use Frame:GetID() to retrieve it for chat frame objects
 * @param hasVoice Enable voice chat for this channel
 * @returns **
 *  - The type of channel. 0 for a undefined channel, 1 for the zone General channel, etc
 *  - The name of the channel (Ohklus: seems to be nil for most channels)
 * @see https://wow.gamepedia.com/API_JoinChannelByName
 */
declare function JoinChannelByName(channelName: string, password?: string, frameId?: number, hasVoice?: boolean): LuaMultiReturn<[number, string]>;

/**
 * Joins the channel with the specified name. A player can be in a maximum of 10 chat channels. In opposite to API_JoinTemporaryChannel
 * the channel will be re-joined after relogging
 * @param channelName The name of the channel to join
 * @param password The channel password, nil if none
 * @param frameId The chat frame ID number to add the channel to. Use Frame:GetID() to retrieve it for chat frame objects
 * @param hasVoice Enable voice chat for this channel
 * @returns **
 *  - The type of channel. 0 for a undefined channel, 1 for the zone General channel, etc
 *  - The name of the channel (Ohklus: seems to be nil for most channels)
 * @see https://wow.gamepedia.com/API_JoinPermanentChannel
 */
declare function JoinPermanentChannel(channelName: string, password?: string, frameId?: number, hasVoice?: boolean): LuaMultiReturn<[number, string]>;

/**
 * Joins the channel with the specified name. A player can be in a maximum of 10 chat channels. In opposite to API_JoinPermanentChannel
 * the channel will be left at logout
 * @param channelName The name of the channel to join
 * @param password The channel password, nil if none
 * @param frameId The chat frame ID number to add the channel to. Use Frame:GetID() to retrieve it for chat frame objects
 * @param hasVoice Enable voice chat for this channel
 * @returns **
 *  - The type of channel. 0 for a undefined channel, 1 for the zone General channel, etc
 *  - The name of the channel (Ohklus: seems to be nil for most channels)
 * @see https://wow.gamepedia.com/API_JoinTemporaryChannel
 */
declare function JoinTemporaryChannel(channelName: string, password?: string, frameId?: number, hasVoice?: boolean): LuaMultiReturn<[number, string]>;

/**
 * Leaves the channel with the specified name
 * @param channelName The name of the channel to leave
 * @see https://wow.gamepedia.com/API_LeaveChannelByName
 */
declare function LeaveChannelByName(channelName: string): void;

/**
 * Lists members in the given channel to the chat window
 * @param channelName Case-insensitive channel name or channel number from which to list the members, e.g. "trade - city". If no argument
 * is given, list all of the numbered channels you are a member of
 * @see https://wow.gamepedia.com/API_ListChannelByName
 */
declare function ListChannelByName(channelName?: string | number): WoWAPI.Unknown;

/**
 * Lists all of the channels
 * @see https://wow.gamepedia.com/API_ListChannels
 */
declare function ListChannels(): void;

/**
 * Blocks further messages from a specified chat channel from appearing in a specific chat frame
 * @param windowId index of the chat window/frame (ascending from 1) to remove the channel from
 * @param channelName name of the chat channel to remove from the frame
 * @description Chat output architecture has changed since release; calling this function alone is no longer sufficient to block a channel
 * from a particular frame in the default UI. Use ChatFrame_RemoveChannel(chatFrame, "channelName") instead
 * @see https://wow.gamepedia.com/API_RemoveChatWindowChannel
 */
declare function RemoveChatWindowChannel(windowId: number, channelName: string): void;

/**
 * Sends a chat message
 * @param message The message to be sent, maximum length of 255 characters. (Not all characters in this string are allowed: See list of valid
 * chat message characters)
 * @param chatType The type of chat message to be sent, "SAY", "PARTY", etc. See the list of chatTypeIds. If chatType is nil or omitted then "SAY" will be used
 * @param languageId The languageID used to translate the message. If languageID is nil or omitted the default language will be used:
 * Orcish for the Horde, and Common for the Alliance, as returned by GetDefaultLanguage("player").
 * @param channelOrName The channel or player receiving the message for "CHANNEL"/"WHISPER" communication. If sending to a channel you must
 * use the number (eg. "1"); obtain it using GetChannelName("channelName"). This field is required for the "CHANNEL"/"WHISPER" chat types and
 * ignored for any other chat type
 * @see https://wow.gamepedia.com/API_SendChatMessage
 */
declare function SendChatMessage(message: string, chatType?: WoWAPI.ChannelChatType, languageId?: WoWAPI.ChannelLanguageId, channelOrName?: string): void;

/**
 * Sets the channel owner
 * @param channelName channel name to be changed
 * @param newOwner the new owner of the channel
 * @see https://wow.gamepedia.com/API_SetChannelOwner
 */
declare function SetChannelOwner(channelName: string, newOwner: string): void;

/**
 * Changes the password of the current channel
 * @param channelName The name of the channel
 * @param password The password to assign to the channel
 * @see https://wow.gamepedia.com/API_SetChannelPassword
 */
declare function SetChannelPassword(channelName: string, password: string): void;


declare namespace WoWAPI {
    type CharacterTotemElementType = 1 | 2 | 3 | 4;
    type CharacterRestState = 0 | 1;
    type CharacterDeathkightRuneType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Accepts a resurrection, returning the character to life
 * @description Most player-sponsored resurrection offers expire automatically after 60 seconds
 * @see https://wow.gamepedia.com/API_AcceptResurrect
 */
declare function AcceptResurrect(): void;

/**
 * Accept the durability loss / resurrection sickness when being resurrected by the spirit healer
 * @description Name is misleading: you no longer lose XP when you use the spirit healer. You're really accepting 25% durability penalty
 * and (if over level 10) resurrection sickness
 * @see https://wow.gamepedia.com/API_AcceptXPLoss
 */
declare function AcceptXPLoss(): void;

/**
 * Declines a resurrection offer
 * @see https://wow.gamepedia.com/API_DeclineResurrect
 */
declare function DeclineResurrect(): void;

/**
 * Destroys a totem/minion
 * @param slot The totem type to be destroyed, where Fire is 1, Earth is 2, Water is 3 and Air is 4.
 * @event PLAYER_TOTEM_UPDATE
 * @protected
 * @deprecated
 * @see https://wow.gamepedia.com/API_DestroyTotem
 */
declare function DestroyTotem(slot: WoWAPI.CharacterTotemElementType): void;

/**
 * Finds the subzone the player's Hearthstone is set to
 * @returns Returns the String name of the subzone the player's Hearthstone is set to, e.g. "Tarren Mill", "Crossroads", or "Brill".
 * @see https://wow.gamepedia.com/API_GetBindLocation
 */
declare function GetBindLocation(): string;

/**
 * Retrieves the number of combo points gained by a player
 * @param unitId Either "player" or "vehicle".
 * @param target Normally "target", but can be any valid UnitId
 * @deprecated Combo Points for rogues are now shared across all targets and they are no longer lost when switching targets. GetComboPoints
 * will return 0 if target is friendly or not found. Use UnitPower(unitId, 4) to get combo points without an enemy targeted
 * @see https://wow.gamepedia.com/API_GetComboPoints
 */
declare function GetComboPoints(unitId: WoWAPI.UnitId, target: WoWAPI.UnitId): number;

/**
 * Returns the integer of the title currently selected by the player
 * @see https://wow.gamepedia.com/API_GetCurrentTitle
 */
declare function GetCurrentTitle(): number;

/**
 * Gives information about the mirror bar. (Spirit release, exhaustion/fatigue, etc)
 * @param timerIndex timer index, from 1 to MIRRORTIMER_NUMTIMERS (3 as of 3.2). In general, the following correspondence holds:
 * 1 = Fatigue, 2 = Breath, 3 = Feign Death
 * @see https://wow.gamepedia.com/API_GetMirrorTimerInfo
 */
declare function GetMirrorTimerInfo(timerIndex: number): LuaMultiReturn<[string, number, number, number, WoWAPI.Flag, string]>;

/**
 * Returns the current value of a mirror timer (fatigue, breath, feign death etc).
 * @param timerIndex the first return value from GetMirrorTimerInfo, identifying the timer queried. Valid values include "EXHAUSTION", "BREATH"
 * and "FEIGNDEATH".
 * @returns current value of the timer. If the timer is not active, 0 is returned
 * @see https://wow.gamepedia.com/API_GetMirrorTimerProgress
 */
declare function GetMirrorTimerProgress(timerIndex: number): number;

/**
 * Returns an integer value of your held money
 * @returns The amount of money the player's character has, in copper
 * @see https://wow.gamepedia.com/API_GetMoney
 */
declare function GetMoney(): number;

/**
 * Gets the highest number in the Title index
 * @returns The last number in the TitleId index
 * @see https://wow.gamepedia.com/API_GetNumTitles
 */
declare function GetNumTitles(): number;

/**
 * Checks to see if the player has enabled PvP ("Permaflagged")
 * @returns 1 if the player has selected to be PvP flagged, 0 otherwise
 * @see https://wow.gamepedia.com/API_GetPVPDesired
 */
declare function GetPVPDesired(): WoWAPI.Flag;

/**
 * retrieve the ranged crit chance as a two-decimal float
 * @returns The players critical strike chance with the currently equipped range weapon as a floating point figure
 * @see https://wow.gamepedia.com/API_GetRangedCritChance
 */
declare function GetRangedCritChance(): number;

/**
 * Returns whether the player is in a rested (earning double XP for kills) or normal state
 * @see https://wow.gamepedia.com/API_GetRestState
 */
declare function GetRestState(): LuaMultiReturn<[WoWAPI.CharacterRestState, string, number]>;

/**
 * Gets the cooldown information about a Death Knight's Rune
 * @param runeId A number between 1 and 6 denoting which rune to be queried
 * @see https://wow.gamepedia.com/API_GetRuneCooldown
 */
declare function GetRuneCooldown(runeId: WoWAPI.CharacterDeathkightRuneType): LuaMultiReturn<[number, number, boolean]>;

/**
 * Gets the name of the title associated with a title index
 * @param titleId Title ID to return the name of
 * @since 2.0.1
 * @see https://wow.gamepedia.com/API_GetTitleName
 */
declare function GetTitleName(titleId: number): LuaMultiReturn<[string, boolean]>;

/**
 * Returns the number of XP gained from killing mobs until "player" goes from rest state to normal state
 * @returns Number (if player is "rested"), null (if player is "normal")
 * @see https://wow.gamepedia.com/API_GetXPExhaustion
 */
declare function GetXPExhaustion(): number | null;

/**
 * Checks whether you have full control over your character (i.e. you are not feared, etc)
 * @see https://wow.gamepedia.com/API_HasFullControl
 */
declare function HasFullControl(): boolean;

/**
 * Returns whether or not, and how, your character can self-resurrect
 * @returns the type of self-resurrect available to your character (known values are "Use Soulstone", "Reincarnate", and "Twisting Nether")
 * or nil if none are available
 * @see https://wow.gamepedia.com/API_HasSoulstone
 */
declare function HasSoulstone(): string | null;

/**
 * Checks if the character is currently falling
 * @returns true if the character is currently falling, false otherwise
 * @see https://wow.gamepedia.com/API_IsFalling
 */
declare function IsFalling(): boolean;

/**
 * Checks whether the player is currently flying
 * @returns true if the character is currently flying, false otherwise
 * @since 2.0.1
 * @see https://wow.gamepedia.com/API_IsFlying
 */
declare function IsFlying(): boolean;

/**
 * Checks if the character's current location is classified as being a flyable area
 * @returns true if the area is classified as flyable, false otherwise
 * @see https://wow.gamepedia.com/API_IsFlyableArea
 */
declare function IsFlyableArea(): boolean;

/**
 * Returns whether the player's character is currently indoors. Most mounts are not usable indoors
 * @returns true if the character is currently indoors, false otherwise
 * @see https://wow.gamepedia.com/API_IsIndoors
 */
declare function IsIndoors(): boolean;

/**
 * Checks to see if the player is mounted or not
 * @returns true if the character is currently mounted, false otherwise
 * @see https://wow.gamepedia.com/API_IsMounted
 */
declare function IsMounted(): boolean;

/**
 * Returns whether the player's character is currently outdoors
 * @returns true if the character is currently outdoors, false otherwise.
 * @see https://wow.gamepedia.com/API_IsOutdoors
 */
declare function IsOutdoors(): boolean;

/**
 * Returns whether the player's character is currently outside of the map
 * @returns 1 if the player's character is currently outside of the map, nil otherwise
 * @description Players may end up outside of a map's bounds (and therefore dead) both as a consequence of geometry errors and normal world
 * design: for instance, falling off the Eye of the Storm, or being dropped off the top of Icecrown Citadel by the Lich King's val'kyrs
 * @see https://wow.gamepedia.com/API_IsOutOfBounds
 */
declare function IsOutOfBounds(): boolean;

/**
 * Checks to see if Player is resting
 * @returns Whether the player is resting
 * @see https://wow.gamepedia.com/API_IsResting
 */
declare function IsResting(): boolean;

/**
 * Checks to see if Player is stealthed
 * @returns true if stealthed, otherwise false
 * @see https://wow.gamepedia.com/API_IsStealthed
 */
declare function IsStealthed(): boolean;

/**
 * Returns whether the player character is swimming
 * @returns 1 if the player is swimming, nil otherwise.
 * @see https://wow.gamepedia.com/API_IsSwimming
 */
declare function IsSwimming(): boolean;

/**
 * Generates an error message saying you cannot do that while dead
 * @event UI_ERROR_MESSAGE
 * @see https://wow.gamepedia.com/API_NotWhileDeadError
 */
declare function NotWhileDeadError(): void;

/**
 * Resurrects when the player is standing near its corpse
 * @see https://wow.gamepedia.com/API_RetrieveCorpse
 */
declare function RetrieveCorpse(): void;

/**
 * Changes your character's displayed title
 * @param titleId ID of the title you want to set. The identifiers are global and therefore do not depend on which titles you have learned.
 * Invalid or unlearned values clear your title. See TitleId for a list
 * @requires HARDWARE_EVENT
 * @see https://wow.gamepedia.com/API_SetCurrentTitle
 */
declare function SetCurrentTitle(titleId: number): void;


declare const CR_DEFENSE_SKILL = 2;
declare const CR_DODGE = 3;
declare const CR_PARRY = 4;
declare const CR_BLOCK = 5;
declare const CR_HIT_MELEE = 6;
declare const CR_HIT_RANGED = 7;
declare const CR_HIT_SPELL = 8;
declare const CR_CRIT_MELEE = 9;
declare const CR_CRIT_RANGED = 10;
declare const CR_CRIT_SPELL = 11;
declare const CR_MULTISTRIKE = 12;
declare const CR_READINESS = 13;
declare const CR_SPEED = 14;
declare const COMBAT_RATING_RESILIENCE_CRIT_TAKEN = 15;
declare const COMBAT_RATING_RESILIENCE_PLAYER_DAMAGE_TAKEN = 16;
declare const CR_LIFESTEAL = 17;
declare const CR_HASTE_MELEE = 18;
declare const CR_HASTE_RANGED = 19;
declare const CR_HASTE_SPELL = 20;
declare const CR_AVOIDANCE = 21;
declare const CR_WEAPON_SKILL_RANGED = 23;
declare const CR_EXPERTISE = 24;
declare const CR_ARMOR_PENETRATION = 25;
declare const CR_MASTERY = 26;
declare const CR_VERSATILITY_DAMAGE_DONE = 29;
declare const CR_VERSATILITY_DAMAGE_TAKEN = 31;

declare namespace WoWAPI {
    type CombatRatingIdentifier = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 23 | 24 | 25 | 26 | 29 | 31;
}

/**
 * Returns attack power granted by particular amount of a particular stat
 * @param statIndex Index of the stat (Strength, Agility, ...) to check the bonus AP of
 * @param amount Amount of the stat to check the AP value of
 * @returns Amount of attack power granted by the specified amount of the specified stat
 * @see https://wow.gamepedia.com/API_GetAttackPowerForStat
 */
declare function GetAttackPowerForStat(statIndex: number, amount: number): number;

/**
 * Player's block chance in percentage
 * @see https://wow.gamepedia.com/API_GetBlockChance
 */
declare function GetBlockChance(): number;

/**
 * Returns the number of points of a specific combat rating the player has
 * @param combatRatingIdentifier A combat rating identifier from PaperDollFrame.lua
 * @see https://wow.gamepedia.com/API_GetCombatRating
 */
declare function GetCombatRating(combatRatingIdentifier: WoWAPI.CombatRatingIdentifier): number;

/**
 * Returns the bonus, in percent (or other converted units, such as skill points), of a specific combat rating for the player
 * @param combatRatingIdentifier A combat rating identifier from PaperDollFrame.lua
 * @see https://wow.gamepedia.com/API_GetCombatRatingBonus
 */
declare function GetCombatRatingBonus(combatRatingIdentifier: WoWAPI.CombatRatingIdentifier): number;

/**
 * Returns the player's critical hit chance
 * @returns The player's melee critical hit chance, as a percentage; e.g. 5.3783211 corresponding to a ~5.38% crit chance
 * @see https://wow.gamepedia.com/API_GetCritChance
 */
declare function GetCritChance(): number;

/**
 * Returns the player's dodge change
 * @see https://wow.gamepedia.com/API_GetDodgeChance
 */
declare function GetDodgeChance(): number;

/**
 * Returns the player's expertise percentage for main hand, offhand and ranged attacks
 * - **arg1**: Expertise percentage for swings with your main hand weapon
 * - **arg2**: Expertise percentage for swings with your offhand weapon
 * - **arg3**: Expertise percentage for your ranged weapon
 * @description Expertise reduces the chance that the player's attacks are dodged or parried by an enemy.
 * This function returns the amount of percentage points Experise reduces the dodge/parry chance by (e.g. a return value of 3.5 means a
 * 3.5% reduction to both dodge and parry probabilities).
 * @see https://wow.gamepedia.com/API_GetExpertise
 */
declare function GetExpertise(): LuaMultiReturn<[number, number, number]>;

/**
 * Returns the player's haste
 */
declare function GetHaste(): number;

/**
 * Returns the amount of Melee Hit %, not from Melee Hit Rating, that your character has
 * @returns hit modifier (e.g. 16 for 16%)
 * @see https://wow.gamepedia.com/API_GetHitModifier
 */
declare function GetHitModifier(): number;

/**
 * Gets the player's current mana regeneration rates (in mana per 1 seconds).
 * - **arg1**: mana regeneration when not casting spells
 * - **arg2**: mana regeneration while casting spells
 * @see https://wow.gamepedia.com/API_GetManaRegen
 */
declare function GetManaRegen(): LuaMultiReturn<[number, number]>;

/**
 * Returns the (raw) mastery of the player
 * @returns sum of player's base and rating bonus mastery
 * @description Mastery does not suffer diminishing returns, but the value returns by GetMastery is not, necessarily, your final Mastery value.
 * Different classes, in different forms, can have a multiplier performed against the value returned by GetMastery. To find your true Mastery,
 * and the multiplier factor used to calculate it, see GetMasteryEffect
 * @see https://wow.gamepedia.com/API_GetMastery
 */
declare function GetMastery(): number;

/**
 * unknown
 * @param combatRatingIdentifier unknown
 */
declare function GetMaxCombatRatingBonus(combatRatingIdentifier: WoWAPI.CombatRatingIdentifier): WoWAPI.Unknown;

/**
 * Returns player's Melee attack haste
 */
declare function GetMeleeHaste(): WoWAPI.Unknown;

/**
 * unknown
 */
declare function GetModResilienceDamageReduction(): WoWAPI.Unknown;

/**
 * unknown
 */
declare function GetOverrideAPBySpellPower(): WoWAPI.Unknown;

/**
 * unknown
 */
declare function GetOverrideSpellPowerByAP(...args: WoWAPI.Unknown[]): WoWAPI.Unknown;

/**
 * Player's parry chance in percentage
 * @see https://wow.gamepedia.com/API_GetParryChance
 */
declare function GetParryChance(): number;

/**
 * unknown
 */
declare function GetPetMeleeHaste(): WoWAPI.Unknown;

/**
 * unknown
 */
declare function GetPetSpellBonusDamage(): WoWAPI.Unknown;

/**
 * unknown
 */
declare function GetPowerRegenForPowerType(powerType: WoWAPI.UnitPowerType): WoWAPI.Unknown;

/**
 * The players critical strike chance with the currently equipped range weapon as a floating point figure
 * @description If you are displaying this figure in a UI element and want it to update, hook to the UNIT_INVENTORY_CHANGED and
 * SPELLS_CHANGED events as well as any other that effect equipment and buffs
 * @see https://wow.gamepedia.com/API_GetRangedCritChance
 */
declare function GetRangedCritChance(): number;

/**
 * Returns the percentage of damage blocked by your shield
 * @returns the percentage of damage reduced your shield
 * @see https://wow.gamepedia.com/API_GetShieldBlock
 */
declare function GetShieldBlock(): number;

/**
 * Returns the raw spell damage bonus of the player for a given spell tree
 * @param spellTreeId the spell tree
 * - 1 for Physical
 * - 2 for Holy
 * - 3 for Fire
 * - 4 for Nature
 * - 5 for Frost
 * - 6 for Shadow
 * - 7 for Arcane
 * @see https://wow.gamepedia.com/API_GetSpellBonusDamage
 */
declare function GetSpellBonusDamage(spellTreeId: WoWAPI.SpellTreeId): number;

/**
 * Returns the raw bonus healing of the player
 * @returns The raw bonus healing of the player
 * @see https://wow.gamepedia.com/API_GetSpellBonusHealing
 */
declare function GetSpellBonusHealing(): number;

/**
 * unknown
 */
declare function GetSpellPenetration(): WoWAPI.Unknown;

type AddonMessageType = "PARTY" | "RAID" | "GUILD" | "BATTLEGROUND" | "WHISPER" | "CHANNEL";
type ChatFlag = "AFK" | "DND" | "GM";
type ChatJoinLeftType = "YOU_JOINED" | "YOU_LEFT" | "THROTTLED";
type ChatUserNoticeType = "ANNOUNCEMENTS_OFF" | "ANNOUNCEMENTS_ON" | "BANNED" |
    "OWNER_CHANGED" | "INVALID_NAME" | "INVITE" | "MODERATION_OFF" | "MODERATION_ON" |
    "MUTED" | "NOT_MEMBER" | "NOT_MODERATED" | "SET_MODERATOR" | "UNSET_MODERATOR";
/**
 * Registers an addon message prefix, allowing messages sent over addon channels with that prefix to be received by the client
 * @param prefix The message prefix to register for delivery
 * @see https://wow.gamepedia.com/API_RegisterAddonMessagePrefix
 */
declare function RegisterAddonMessagePrefix(prefix: string): void;

/**
 * Sends a message to the hidden addon channel
 * @param prefix Message prefix, can be used as your addon identifier; at most 15 characters
 * @param text Text to send, at most 250 characters
 * @param type AddOn channel to send to. Valid types are "PARTY", "RAID", "GUILD", "BATTLEGROUND", "WHISPER", and "CHANNEL".
 * @since 1.12.0
 */
declare function SendAddonMessage(prefix: string, text: string, type: Exclude<AddonMessageType, "WHISPER" | "CHANNEL">): void;

/**
 * Sends a message to the hidden addon channel
 * @param prefix Message prefix, can be used as your addon identifier; at most 15 characters
 * @param text Text to send, at most 250 characters
 * @param type AddOn channel to send to. Valid types are "PARTY", "RAID", "GUILD", "BATTLEGROUND", "WHISPER", and "CHANNEL".
 * @param target sed only for "WHISPER" and "CHANNEL" communications - the player to whisper to for "WHISPER" or the channel name to
 * broadcast to for "CHANNEL"
 * @since 2.1.0
 */
declare function SendAddonMessage(prefix: string, text: string, type: "WHISPER" | "CHANNEL", target: string): void;

declare const AUTOCOMPLETE_FLAG_NONE = 0x00000000;
declare const AUTOCOMPLETE_FLAG_IN_GROUP = 0x00000001;
declare const AUTOCOMPLETE_FLAG_IN_GUILD = 0x00000002;
declare const AUTOCOMPLETE_FLAG_FRIEND = 0x00000004;
declare const AUTOCOMPLETE_FLAG_INTERACTED_WITH = 0x00000010;
declare const AUTOCOMPLETE_FLAG_ONLINE = 0x00000020;
declare const AUTOCOMPLETE_FLAG_ALL = 0xffffffff;

declare namespace WoWAPI {
    type ChatTypeInfoBody = { r: number, g: number, b: number, id: string, sticky: boolean };

    type ChatTypeInfo = {
        SYSTEM: ChatTypeInfoBody,
        SAY: ChatTypeInfoBody,
        PARTY: ChatTypeInfoBody,
        RAID: ChatTypeInfoBody,
        GUILD: ChatTypeInfoBody,
        OFFICER: ChatTypeInfoBody,
        YELL: ChatTypeInfoBody,
        WHISPER: ChatTypeInfoBody,
        WHISPER_INFORM: ChatTypeInfoBody,
        REPLY: ChatTypeInfoBody,
        EMOTE: ChatTypeInfoBody,
        TEXT_EMOTE: ChatTypeInfoBody,
        MONSTER_SAY: ChatTypeInfoBody,
        MONSTER_PARTY: ChatTypeInfoBody,
        MONSTER_YELL: ChatTypeInfoBody,
        MONSTER_WHISPER: ChatTypeInfoBody,
        MONSTER_EMOTE: ChatTypeInfoBody,
        CHANNEL: ChatTypeInfoBody,
        CHANNEL_JOIN: ChatTypeInfoBody,
        CHANNEL_LEAVE: ChatTypeInfoBody,
        CHANNEL_LIST: ChatTypeInfoBody,
        CHANNEL_NOTICE: ChatTypeInfoBody,
        CHANNEL_NOTICE_USER: ChatTypeInfoBody,
        AFK: ChatTypeInfoBody,
        DND: ChatTypeInfoBody,
        IGNORED: ChatTypeInfoBody,
        SKILL: ChatTypeInfoBody,
        LOOT: ChatTypeInfoBody,
        MONEY: ChatTypeInfoBody,
        OPENING: ChatTypeInfoBody,
        TRADESKILLS: ChatTypeInfoBody,
        PET_INFO: ChatTypeInfoBody,
        COMBAT_MISC_INFO: ChatTypeInfoBody,
        COMBAT_XP_GAIN: ChatTypeInfoBody,
        COMBAT_HONOR_GAIN: ChatTypeInfoBody,
        COMBAT_FACTION_CHANGE: ChatTypeInfoBody,
        BG_SYSTEN_NEUTRAL: ChatTypeInfoBody,
        BG_SYSTEM_ALLIANCE: ChatTypeInfoBody,
        BG_SYSTEN_HORDE: ChatTypeInfoBody,
        RAID_LEADER: ChatTypeInfoBody,
        RAID_WARNING: ChatTypeInfoBody,
        RAID_BOSS_WHISPER: ChatTypeInfoBody,
        RAID_BOSS_EMOTE: ChatTypeInfoBody,
        FILTERED: ChatTypeInfoBody,
        BATTLEGROUND: ChatTypeInfoBody,
        BATTLEGROUND_LEADER: ChatTypeInfoBody,
        RESTRICTED: ChatTypeInfoBody,
        CHANNEL1: ChatTypeInfoBody,
        CHANNEL2: ChatTypeInfoBody,
        CHANNEL3: ChatTypeInfoBody,
        CHANNEL4: ChatTypeInfoBody,
        CHANNEL5: ChatTypeInfoBody,
        CHANNEL6: ChatTypeInfoBody,
        CHANNEL7: ChatTypeInfoBody,
        CHANNEL8: ChatTypeInfoBody,
        CHANNEL9: ChatTypeInfoBody,
        CHANNEL10: ChatTypeInfoBody,
        ACHIVEMENT: ChatTypeInfoBody,
        GUILD_ACHIVEMENT: ChatTypeInfoBody
    };

    /**
     * the chat frame instance
     */
    interface ChatFrame {

        /**
         * add the given message to the frame
         * @param message the message to add
         */
        AddMessage(message: string): void;
    }
}

declare const ChatTypeInfo: WoWAPI.ChatTypeInfo;

/**
 * Retrieves configuration information about a chat window
 * @param frameIndex The index of the chat window to get information for (starts at 1 to NUM_CHAT_WINDOWS).
 * @see https://wow.gamepedia.com/API_GetChatWindowInfo
 */
declare function GetChatWindowInfo(frameIndex: number): LuaMultiReturn<[string, number, number, number, number, WoWAPI.Flag, WoWAPI.Flag, number]>;

/**
 * Get the channels received by a chat window.
 * @param frameIndex The frame number of the chat frame to be queried (starts at 1).
 * @see https://wow.gamepedia.com/API_GetChatWindowChannels
 */
declare function GetChatWindowChannels(frameIndex: number): LuaMultiReturn<[string, number, string, number, string, number]>;

/**
 * Blocks further messages from a specified chat channel from appearing in a specific chat frame
 * @param frameIndex index of the chat window/frame (ascending from 1) to remove the channel from
 * @param channelName name of the chat channel to remove from the frame
 * @see https://wow.gamepedia.com/API_RemoveChatWindowChannel
 */
declare function RemoveChatWindowChannel(frameIndex: number, channelName: string): void;

/**
 * Returns chat types received by a chat window
 * @param frameIndex Chat window index, ascending from 1
 * @see https://wow.gamepedia.com/API_GetChatWindowMessages
 */
declare function GetChatWindowMessages(frameIndex: number): LuaMultiReturn<[...string[]]>;

/**
 * Stops the specified chat window from displaying a specified type of messages
 * @param frameIndex chat window index, ascending from 1.
 * @param messageGroup message type the chat window should no longer receive, e.g. "EMOTE", "SAY", "RAID".
 */
declare function RemoveChatWindowMessages(frameIndex: number, messageGroup: string): void;

/**
 * Changes the text color of the specified chat channel. The "color wheel" popup calls this function to do the actual work, once the user is done with the popup
 * @param channelName Name of the channel as given in chat-cache.txt files
 * @param red red value 0-1
 * @param green green value 0-1
 * @param blue blue value 0-1
 * @see https://wow.gamepedia.com/API_ChangeChatColor
 */
declare function ChangeChatColor(channelName: string, red: number, green: number, blue: number): void;

/**
 * Returns possible player names matching a given prefix string and specified requirements
 * @param text first characters of the possible names to be autocompleted
 * @param include bit mask of filters that the results must match at least one of
 * @param exclude bit mask of filters that the results must not match any of
 * @param maxResults number of results desired
 * @param cursorPosition position of the cursor within the editbox (i.e. how much of the text string should be matching)
 * @see https://wow.gamepedia.com/API_GetAutoCompleteResults
 */
declare function GetAutoCompleteResults(text: string, include: number, exclude: number, maxResults: number, cursorPosition?: number): LuaMultiReturn<[...string[]]>;

/**
 * Return the numeric type index for a specific chat type
 * @param typeCode The type code for the chat type (One of the key values of the ChatTypeInfo table)
 * @returns The numeric type index for that chat type, used as the ID number for coloring
 * @see https://wow.gamepedia.com/API_GetChatTypeIndex
 */
declare function GetChatTypeIndex(typeCode: keyof WoWAPI.ChatTypeInfo): number;

/**
 * Toggles the chat logging and returns the current state
 * @param newState toggles chat logging
 * @returns current state of logging
 * @see https://wow.gamepedia.com/API_LoggingChat
 */
declare function LoggingChat(newState?: boolean): boolean;

/**
 * Toggles logging for the combat log and returns the current state
 * @param newState Toggles combat logging
 * @returns current state of logging
 * @see https://wow.gamepedia.com/API_LoggingCombat
 */
declare function LoggingCombat(newState?: boolean): boolean;
declare namespace WoWAPI {
    type CLASSES = "WARRIOR" | "DEATHKNIGHT" | "PALADIN" | "MONK" | "PRIEST" | "SHAMAN" | "DRUID" |
        "ROGUE" | "MAGE" | "WARLOCK" | "HUNTER" | "DEMONHUNTER";
}

/**
 * Returns the color value associated with a given class
 * @param englishClass  the localization-independent name of the class, e.g., 'WARLOCK'. See ClassId for the list of acceptable arguments
 * @returns r,g,b,hex
 * - **rPerc, gPerc, bPerc**: Number - the value, between 0 and 1, associated with the red, green, and blue - respectively - coordinate in the RGB space
 * - **argbHex**: the ARGB hex code of the color, e.g., 'ff8788ee' for 'WARLOCK'.
 * @see https://wow.gamepedia.com/API_GetClassColor
 */
declare function GetClassColor(englishClass: WoWAPI.CLASSES): LuaMultiReturn<[number, number, number, string]>;


declare namespace WoWAPI {
    type EmoteToken = "AGREE" | "AMAZE" | "ANGRY" | "APOLOGIZE" | "APPLAUD" | "ATTACKMYTARGET" | "BARK" | "BASHFUL" | "BECKON" |
        "BEG" | "BURP" | "BITE" | "BLEED" | "BLINK" | "KISS" | "BLUSH" | "BOGGLE" | "BONK" | "BORED" | "BOUNCE" | "BOW" | "BRB" | "BYE" | "CACKLE" |
        "CALM" | "SCRATCH" | "CHARGE" | "CHEER" | "EAT" | "CHICKEN" | "CHUCKLE" | "CLAP" | "COLD" | "COMFORT" | "COMMEND" | "CONFUSED" |
        "CONGRATULATE" | "COUGH" | "COWER" | "CRACK" | "CRINGE" | "CRY" | "CUDDLE" | "CURIOUS" | "CURTSEY" | "DANCE" | "FROWN" | "BONK" |
        "THREATEN" | "DRINK" | "DROOL" | "DUCK" | "EAT" | "TALKEX" | "EYE" | "FART" | "FIDGET" | "FLEE" | "FLEX" | "FLIRT" | "FLOP" | "FOLLOW" |
        "HUNGRY" | "GASP" | "GAZE" | "GIGGLE" | "HAPPY" | "GLARE" | "GLOAT" | "GOLFCAP" | "GREET" | "GRIN" | "GROAN" | "GROVEL" | "GROWL" |
        "GUFFAW" | "HAIL" | "HEALME" | "HELLO" | "HELPME" | "HUG" | "INCOMING" | "INSULT" | "INTRODUCE" | "JK" | "KNEEL" | "LAUGH" | "PRAISE" |
        "LAYDOWN" | "LICK" | "LISTEN" | "LOST" | "LOVE" | "MASSAGE" | "MOAN" | "MOCK" | "MOO" | "MOON" | "MOURN" | "NO" | "NOD" | "NOSEPICK" |
        "OOM" | "OPENFIRE" | "PANIC" | "PAT" | "PEER" | "SHOO" | "PITY" | "PLEAD" | "POINT" | "POKE" | "PONDER" | "POUNCE" | "PRAY" | "PURR" |
        "PUZZLE" | "TALKQ" | "RAISE" | "RASP" | "READY" | "SHAKE" | "ROAR" | "ROFL" | "RUDE" | "SALUTE" | "SCARED" | "SCRATCH" | "SEXY" | "SHAKE" |
        "SHIMMY" | "SHIVER" | "SHRUG" | "SHY" | "SIGH" | "JOKE" | "SLAP" | "SLEEP" | "STINK" | "SMILE" | "SMIRK" | "SNARL" | "SNICKER" | "SNIFF" |
        "SNUB" | "SOOTHE" | "SPIT" | "STARE" | "STAND" | "SURPRISED" | "SURRENDER" | "TAP" | "TALK" | "TAUNT" | "TEASE" | "THANK" | "THIRSTY" |
        "TICKLE" | "TIRED" | "TRAIN" | "VETO" | "VICTORY" | "VIOLIN" | "WAIT" | "WAVE" | "WELCOME" | "WHINE" | "WHISTLE" | "WINK" | "WORK" | "YAWN";
}

/**
 * Executes one of the emotes based on the given token, including vocal emotes and animations. The list of currently valid emotes is
 * given in ChatFrame.lua, defined as one of the EMOTEx_TOKEN constants. x starts at 1 and goes up to ChatFrame.lua's local variable
 * MAXEMOTEINDEX (which is 452 in WotLK 3.3.0).
 * @param emote the token that describes which emote is being used. See Emotes Tokens
 * @param target UnitId of who the emote will be performed on. If nil, then it performs the emote on your current target, or yourself
 * if you don't have a target. If the specified target does not exist or is out of range, then it performs the emote on yourself.
 * @see https://wow.gamepedia.com/API_DoEmote
 */
declare function DoEmote(emote: WoWAPI.EmoteToken, target?: WoWAPI.UnitId): void;

/**
 * Returns the Language used by the indicated Player
 * @param unit unit whose default language you wish to query
 * @returns the default language of the indicated object, usually the faction's common language (i.e. "Common" and "Orcish").
 * @see https://wow.gamepedia.com/API_GetDefaultLanguage
 */
declare function GetDefaultLanguage(unit: WoWAPI.UnitId): string;

/**
 * Returns the language specified by the index that your character can speak
 * @param index The index starting at 1.
 * @returns Returns the LanguageID
 * @see https://wow.gamepedia.com/API_GetLanguageByIndex
 */
declare function GetLanguageByIndex(index: number): WoWAPI.ChannelLanguageId;

/**
 * Returns the number of languages your character can speak
 * @returns Returns the number of languages your character can speak
 * @see https://wow.gamepedia.com/API_GetNumLanguages
 */
declare function GetNumLanguages(): number;

/**
 * Performs a random roll between two numbers
 * @param low lowest number (default 1)
 * @param high highest number (default 100)
 * @see https://wow.gamepedia.com/API_RandomRoll
 */
declare function RandomRoll(low?: number, high?: number): void;


declare namespace WoWAPI {
    type CompanionType = "CRITTER" | "MOUNT";
    type MountType = 0x1 | 0x2 | 0x4 | 0x8 | 0x10;
}

/**
 * Summons the specified companion
 * @param type The type of companion to summon or dismiss: "CRITTER" or "MOUNT"
 * @param id The companion index to summon or dismiss, ascending from 1
 * @see https://wow.gamepedia.com/API_CallCompanion
 * @since 3.0.2
 */
declare function CallCompanion(type: WoWAPI.CompanionType, companionIndex: number): void;

/**
 * Dismisses a currently-summoned mount or non-combat pet
 * @param type type of companion to dismiss, either "MOUNT" or "CRITTER".
 * @see https://wow.gamepedia.com/API_DismissCompanion
 * @since 3.0.2
 */
declare function DismissCompanion(type: WoWAPI.CompanionType): void;

/**
 * Returns information about the companions you have
 * @param type Companion type to query: "CRITTER" or "MOUNT".
 * @param companionIndex Index of the slot to query. Starting at 1 and going up to GetNumCompanions("type").
 * @returns **
 * - **creatureID**: The NPC ID of the companion
 * - **creatureName**: The name of the companion
 * - **creatureSpellID**: The spell ID to cast the companion. This is not passed to CallCompanion, but can be used with, e.g., GetSpellInfo
 * - **icon**: The texture of the icon for the companion
 * - **issummoned**: 1 if the companion is summoned, nil if it's not
 * - **mountType**: Bitfield for air/ground/water mounts
 *  - 0x1: Ground
 *  - 0x2: Can fly
 *  - 0x4: ? (set for most mounts)
 *  - 0x8: Underwater
 *  - 0x10: Can jump (turtles cannot)
 * @deprecated use C_MountJournal.GetMountInfoByID()
 * @see https://wow.gamepedia.com/API_GetCompanionInfo
 * @since 3.0.2
 */
// tslint:disable-next-line max-line-length
declare function GetCompanionInfo(type: WoWAPI.CompanionType, companionIndex: number): LuaMultiReturn<[number, string, number, WoWAPI.TexturePath, WoWAPI.Flag, WoWAPI.MountType]>;

/**
 * Returns the number of companions you have
 * @param type Type of companions to count: "CRITTER", or "MOUNT".
 * @returns The number of companions of a specific type
 * @see https://wow.gamepedia.com/API_GetNumCompanions
 * @since 3.0.2
 */
declare function GetNumCompanions(type: WoWAPI.CompanionType): number;

/**
 * Places a companion onto the mouse cursor
 * @param type companion type, either "MOUNT" or "CRITTER"
 * @param companionIndex index of the companion of the specified type to place on the cursor, ascending from 1.
 * @protected NOCOMBAT
 * @see https://wow.gamepedia.com/API_PickupCompanion
 * @since 3.0.2
 */
declare function PickupCompanion(type: WoWAPI.CompanionType, companionIndex: number): void;

/**
 * Summons a random non-combat pet companion
 * @description This function is part of the companions API that was deprecated for battle-pets with the introduction of the Pet Journal.
 * Calling it will result in UI_ERROR_MESSAGE being fired
 * @deprecated Use C_PetJournal.SummonRandomPet instead
 * @since 3.3.3
 * @see https://wow.gamepedia.com/API_SummonRandomCritter
 */
declare function SummonRandomCritter(): void;

declare function BuyMerchantItem(index:number, quantity?: number):void;
declare function BuybackItem(index:number):void;
declare function CanMerchantRepair():boolean;
declare function CloseMerchant():void;
  
/**
 * Returns name, texture, price and quantity
 *
 * @param index for the item
 * @see https://wowwiki-archive.fandom.com/wiki/API_GetBuybackItemInfo
 */
declare function GetBuybackItemInfo(index:number): LuaMultiReturn<[ string, string, number, number]>;
declare function GetBuybackItemLink(index:number): string;
declare function GetMerchantItemCostInfo (index:number): number;

/**
 * Returns information about an "alternative currency" component of the price for a purchasable item. 
 * Returns texture, value and link
 *
 * @param index for the item
 * @see https://wowwiki-archive.fandom.com/wiki/API_GetMerchantItemCostItem
 */
declare function GetMerchantItemCostItem(index:number, itemIndex:number): LuaMultiReturn<[string, number, string]>
  
/**
 * Returns information about a merchant's item.
 * Returns texture, value and link
 *
 * @param index for the item
 * @see https://wowwiki-archive.fandom.com/wiki/API_GetMerchantItemInfo
 */
declare function GetMerchantItemInfo(index:number): LuaMultiReturn<[string, string, number, number, number, number, number]>
declare function GetMerchantItemLink(index:number): string;
declare function GetMerchantItemMaxStack(index:number):number;
declare function GetMerchantNumItems():number;
declare function GetRepairAllCost():number;
declare function HideRepairCursor():void;
declare function InRepairMode():boolean;
declare function PickupMerchantItem(index:number):void;
declare function RepairAllItems(guildBankRepair?:boolean):void;
declare function ShowMerchantSellCursor(index:number):void;
declare function ShowRepairCursor():void;
declare function GetNumBuybackItems():number;

declare function SetPortraitToTexture(texture:WoWAPI.Texture,path:string):void;
declare function SetPortraitTexture(texture:WoWAPI.Texture,unitToken:WoWAPI.UnitId,disableMasking?:boolean):void;

declare const MAX_PLAYER_LEVEL_TABLE: {
    LE_EXPANSION_CLASSIC: 60,
    LE_EXPANSION_BURNING_CRUSADE: 70,
    LE_EXPANSION_WRATH_OF_THE_LICH_KING: 80,
    LE_EXPANSION_CATACLYSM: 85,
    LE_EXPANSION_MISTS_OF_PANDARIA: 90,
    LE_EXPANSION_WARLORDS_OF_DRAENOR: 100,
    LE_EXPANSION_LEGION: 110,
    LE_EXPANSION_BATTLE_FOR_AZEROTH: 120,
    LE_EXPANSION_9_0: 120,
    LE_EXPANSION_10_0: 120,
    LE_EXPANSION_11_0: 120
};

declare const NPE_TUTORIAL_COMPLETE_LEVEL = 10;

declare const NORMAL_FONT_COLOR_CODE = "|cffffd200";
declare const HIGHLIGHT_FONT_COLOR_CODE = "|cffffffff";
declare const RED_FONT_COLOR_CODE = "|cffff2020";
declare const GREEN_FONT_COLOR_CODE = "|cff20ff20";
declare const GRAY_FONT_COLOR_CODE = "|cff808080";
declare const YELLOW_FONT_COLOR_CODE = "|cffffff00";
declare const LIGHTYELLOW_FONT_COLOR_CODE = "|cffffff9a";
declare const ORANGE_FONT_COLOR_CODE = "|cffff7f3f";
declare const ACHIEVEMENT_COLOR_CODE = "|cffffff00";
declare const BATTLENET_FONT_COLOR_CODE = "|cff82c5ff";
declare const DISABLED_FONT_COLOR_CODE = "|cff7f7f7f";
declare const FONT_COLOR_CODE_CLOSE = "|r";

declare const FACTION_BAR_COLORS: {
    1: { r: .8, g: .3, b: .22 },
    2: { r: .8, g: .3, b: .22 },
    3: { r: .75, g: .27, b: 0 },
    4: { r: .9, g: .7, b: 0 },
    5: { r: 0, g: .6, b: .1 },
    6: { r: 0, g: .7, b: .1 },
    7: { r: 0, g: .7, b: .1 },
    8: { r: 0, g: .7, b: .1 }
};

declare const WORLD_QUEST_ICONS_BY_PROFESSION: {
    129: "worldquest-icon-firstaid",
    164: "worldquest-icon-blacksmithing",
    165: "worldquest-icon-leatherworking",
    171: "worldquest-icon-alchemy",
    182: "worldquest-icon-herbalism",
    186: "worldquest-icon-mining",
    202: "worldquest-icon-engineering",
    333: "worldquest-icon-enchanting",
    755: "worldquest-icon-jewelcrafting",
    773: "worldquest-icon-inscription",
    794: "worldquest-icon-archaeology",
    356: "worldquest-icon-fishing",
    185: "worldquest-icon-cooking",
    197: "worldquest-icon-tailoring",
    393: "worldquest-icon-skinning"
};

declare const CHAT_FONT_HEIGHTS: {
    1: 12,
    2: 14,
    3: 16,
    4: 18
};

declare const MATERIAL_TEXT_COLOR_TABLE: {
    "Default": [.18, .12, .06],
    "Stone": [1, 1, 1],
    "Parchment": [.18, .12, .06],
    "Marble": [0, 0, 0],
    "Silver": [.12, .12, .12],
    "Bronze": [.18, .12, .06],
    "ParchmentLarge": [.141, 0, 0]
};

declare const MATERIAL_TITLETEXT_COLOR_TABLE: {
    "Default": [0, 0, 0],
    "Stone": [.93, .82, 0],
    "Parchment": [0, 0, 0],
    "Marble": [.93, .82, 0],
    "Silver": [.93, .82, 0],
    "Bronze": [.93, .82, 0],
    "ParchmentLarge": [.208, 0, 0]
};

declare const CLASS_SORT_ORDER: [
    "WARRIOR", "DEATHKNIGHT", "PALADIN", "MONK", "PRIEST", "SHAMAN", "DRUID",
    "ROGUE", "MAGE", "WARLOCK", "HUNTER", "DEMONHUNTER"
];

declare const SCHOOL_MASK_NONE = 0x00;
declare const SCHOOL_MASK_PHYSICAL = 0x01;
declare const SCHOOL_MASK_HOLY = 0x02;
declare const SCHOOL_MASK_FIRE = 0x04;
declare const SCHOOL_MASK_NATURE = 0x08;
declare const SCHOOL_MASK_FROST = 0x10;
declare const SCHOOL_MASK_SHADOW = 0x20;
declare const SCHOOL_MASK_ARCANE = 0x40;

declare const LOOT_ROLL_TYPE_PASS = 0;
declare const LOOT_ROLL_TYPE_NEED = 1;
declare const LOOT_ROLL_TYPE_GREED = 2;
declare const LOOT_ROLL_TYPE_DISENCHANT = 3;

declare const INVSLOT_AMMO = 0;
declare type INVSLOT_AMMO = 0;
declare const INVSLOT_HEAD = 1;
declare type INVSLOT_HEAD = 1;
declare const INVSLOT_NECK = 2;
declare type INVSLOT_NECK = 2;
declare const INVSLOT_SHOULDER = 3;
declare type INVSLOT_SHOULDER = 3;
declare const INVSLOT_BODY = 4;
declare type INVSLOT_BODY = 4;
declare const INVSLOT_CHEST = 5;
declare type INVSLOT_CHEST = 5;
declare const INVSLOT_WAIST = 6;
declare type INVSLOT_WAIST = 6;
declare const INVSLOT_LEGS = 7;
declare type INVSLOT_LEGS = 7;
declare const INVSLOT_FEET = 8;
declare type INVSLOT_FEET = 8;
declare const INVSLOT_WRIST = 9;
declare type INVSLOT_WRIST = 9;
declare const INVSLOT_HAND = 10;
declare type INVSLOT_HAND = 10;
declare const INVSLOT_FINGER1 = 11;
declare type INVSLOT_FINGER1 = 11;
declare const INVSLOT_FINGER2 = 12;
declare type INVSLOT_FINGER2 = 12;
declare const INVSLOT_TRINKET1 = 13;
declare type INVSLOT_TRINKET1 = 13;
declare const INVSLOT_TRINKET2 = 14;
declare type INVSLOT_TRINKET2 = 14;
declare const INVSLOT_BACK = 15;
declare type INVSLOT_BACK = 15;
declare const INVSLOT_MAINHAND = 16;
declare type INVSLOT_MAINHAND = 16;
declare const INVSLOT_OFFHAND = 17;
declare type INVSLOT_OFFHAND = 17;
declare const INVSLOT_RANGED = 18;
declare type INVSLOT_RANGED = 18;
declare const INVSLOT_TABARD = 19;
declare type INVSLOT_TABARD = 19;

declare const DIFFICULTY_DUNGEON_NORMAL = 1;
declare const DIFFICULTY_DUNGEON_HEROIC = 2;
declare const DIFFICULTY_RAID10_NORMAL = 3;
declare const DIFFICULTY_RAID25_NORMAL = 4;
declare const DIFFICULTY_RAID10_HEROIC = 5;
declare const DIFFICULTY_RAID25_HEROIC = 6;
declare const DIFFICULTY_RAID_LFR = 7;
declare const DIFFICULTY_DUNGEON_CHALLENGE = 8;
declare const DIFFICULTY_RAID40 = 9;
declare const DIFFICULTY_PRIMARYRAID_NORMAL = 14;
declare const DIFFICULTY_PRIMARYRAID_HEROIC = 15;
declare const DIFFICULTY_PRIMARYRAID_MYTHIC = 16;
declare const DIFFICULTY_PRIMARYRAID_LFR = 17;

declare const NUM_CHAT_WINDOWS: number;

declare namespace WoWAPI {
    type InventoryId = INVSLOT_AMMO | INVSLOT_HEAD | INVSLOT_NECK | INVSLOT_SHOULDER | INVSLOT_BODY | INVSLOT_CHEST |
        INVSLOT_WAIST | INVSLOT_LEGS | INVSLOT_FEET | INVSLOT_WRIST | INVSLOT_HAND | INVSLOT_FINGER1 | INVSLOT_FINGER2 | INVSLOT_TRINKET1 |
        INVSLOT_TRINKET2 | INVSLOT_BACK | INVSLOT_MAINHAND | INVSLOT_OFFHAND | INVSLOT_RANGED | INVSLOT_TABARD;
}


/// <reference path="global.d.ts" />
/// <reference path="item.d.ts" />
/// <reference path="ui/ui.d.ts" />
/// <reference path="unit.d.ts" />

declare namespace WoWAPI {

    type CONTAINER_ID_BACKPACK = 0;
    type CONTAINER_ID_BAG_1 = 1;
    type CONTAINER_ID_BAG_2 = 2;
    type CONTAINER_ID_BAG_3 = 3;
    type CONTAINER_ID_BAG_4 = 4;
    type CONTAINER_ID_BANK_GLOBAL = -1;
    type CONTAINER_ID_BANK_BAG_1 = 5;
    type CONTAINER_ID_BANK_BAG_2 = 6;
    type CONTAINER_ID_BANK_BAG_3 = 7;
    type CONTAINER_ID_BANK_BAG_4 = 8;
    type CONTAINER_ID_BANK_BAG_5 = 9;
    type CONTAINER_ID_BANK_BAG_6 = 10;
    type CONTAINER_ID_BANK_BAG_7 = 11;
    type CONTAINER_ID_REAGENTBANK = -3;
    type CONTAINER_ID_BANK_BAG_WRAPPER = -4;

    type CONTAINER_ID_BANK = CONTAINER_ID_BANK_GLOBAL | CONTAINER_ID_BANK_BAG_1 | CONTAINER_ID_BANK_BAG_2 | CONTAINER_ID_BANK_BAG_3 |
        CONTAINER_ID_BANK_BAG_4 | CONTAINER_ID_BANK_BAG_5 | CONTAINER_ID_BANK_BAG_6 | CONTAINER_ID_BANK_BAG_7 | CONTAINER_ID_REAGENTBANK |
        CONTAINER_ID_BANK_BAG_WRAPPER;
    type CONTAINER_ID_BAG = CONTAINER_ID_BACKPACK | CONTAINER_ID_BAG_1 | CONTAINER_ID_BAG_2 | CONTAINER_ID_BAG_3 |
        CONTAINER_ID_BAG_4;
    type CONTAINER_ID = CONTAINER_ID_BAG | CONTAINER_ID_BANK;

    type BAG_TYPE_UNSPECIFIED = 0;
    type BAG_TYPE_QUIVER = 1;
    type BAG_TYPE_AMMO_POUCH = 2;
    type BAG_TYPE_SOUL_BAG = 4;
    type BAG_TYPE_LEATHERWORKING_BAG = 8;
    type BAG_TYPE_INSCRIPTION_BAG = 16;
    type BAG_TYPE_HERB_BAG = 32;
    type BAG_TYPE_ENCHANTING_BAG = 64;
    type BAG_TYPE_ENGINEERING_BAG = 128;
    type BAG_TYPE_KEYRING = 256;
    type BAG_TYPE_GEM_BAG = 512;
    type BAG_TYPE_MINING = 1024;
    type BAG_TYPE_UNKNOWN = 2048;
    type BAG_TYPE_VANTY_PETS = 4096;

    type INVENTORY_SLOT_CONTAINER_1 = 20;
    type INVENTORY_SLOT_CONTAINER_2 = 21;
    type INVENTORY_SLOT_CONTAINER_3 = 22;
    type INVENTORY_SLOT_CONTAINER_4 = 23;

    type INVENTORY_SLOT_CONTAINER = INVENTORY_SLOT_CONTAINER_1 | INVENTORY_SLOT_CONTAINER_2 |
        INVENTORY_SLOT_CONTAINER_3 | INVENTORY_SLOT_CONTAINER_4;

    type INVENTORY_SLOT_ID_CONTAINERS = INVENTORY_SLOT_CONTAINER_1 | INVENTORY_SLOT_CONTAINER_2 |
        INVENTORY_SLOT_CONTAINER_3 | INVENTORY_SLOT_CONTAINER_4;
    type INVENTORY_SLOT_ID = INVSLOT_AMMO | INVSLOT_HEAD | INVSLOT_NECK | INVSLOT_SHOULDER | INVSLOT_BODY | INVSLOT_CHEST |
        INVSLOT_WAIST | INVSLOT_LEGS | INVSLOT_FEET | INVSLOT_WRIST | INVSLOT_HAND | INVSLOT_FINGER1 | INVSLOT_FINGER2 |
        INVSLOT_TRINKET1 | INVSLOT_TRINKET2 | INVSLOT_BACK | INVSLOT_MAINHAND | INVSLOT_OFFHAND | INVSLOT_RANGED | INVSLOT_TABARD |
        INVENTORY_SLOT_ID_CONTAINERS;

    /**
     * all currently known bag types
     */
    type BAG_TYPE = BAG_TYPE_UNSPECIFIED | BAG_TYPE_QUIVER | BAG_TYPE_AMMO_POUCH | BAG_TYPE_SOUL_BAG | BAG_TYPE_LEATHERWORKING_BAG |
        BAG_TYPE_INSCRIPTION_BAG | BAG_TYPE_HERB_BAG | BAG_TYPE_ENCHANTING_BAG | BAG_TYPE_ENGINEERING_BAG | BAG_TYPE_KEYRING | BAG_TYPE_GEM_BAG |
        BAG_TYPE_MINING | BAG_TYPE_UNKNOWN | BAG_TYPE_VANTY_PETS;

}

/**
 * convert a bagId to an inventoryId
 *
 * @param bagId number of the bag ( between 1 and NUM_BAG_SLOTS + NUM_BANKBAGSLOTS ) to get the inventoryID for
 * @returns the bag's inventory ID used in functions like PutItemInBag(inventoryId) and GetInventoryWowItemLink("player",inventoryId)
 * @see https://wow.gamepedia.com/API_ContainerIDToInventoryID
 */
declare function ContainerIDToInventoryID(bagId: WoWAPI.CONTAINER_ID): number;

/**
 * bagName will contain the name of the specified bag if the bag number is 0-4 otherwise it will be nil, unless when the bank is opened,
 * in which case GetBagName(-1) (for the bank) is nil and GetBagName(6) will give the name of the first bank bag, GetBagName(7) the name of
 * the second bank bag, etc ...
 *
 * @param bagId number of the bag the item is in, 0 is your backpack, 1-4 are the four additional bags, numbered right to left.
 * Actually, for this method, this parameter is valid as API_ContainerIDToInventoryID
 * @returns the name of the specified bag (example "Green Woolen Bag")
 * @see https://wow.gamepedia.com/API_GetBagName
 */
declare function GetBagName(bagId: WoWAPI.CONTAINER_ID): string;

/**
 * Returns cooldown information for an item in your inventory
 *
 * @param bagId number of the bag the item is in, 0 is your backpack, 1-4 are the four additional bags
 * @param slot slot number of the bag item you want the info for
 * @returns startTime, duration, isEnabled
 * @see https://wow.gamepedia.com/API_GetContainerItemCooldown
 */
declare function GetContainerItemCooldown(bagId: WoWAPI.CONTAINER_ID, slot: number): LuaMultiReturn<[number, number, WoWAPI.Flag]>;

/**
 * Returns current and maximum durability of an item in the character's bags
 *
 * @param bagId Index of the bag slot the bag storing the item is in
 * @param slot Index of the bag slot containing the item to query durability of
 * @returns current, maximum
 * @see https://wow.gamepedia.com/API_GetContainerItemDurability
 */
declare function GetContainerItemDurability(bagId: WoWAPI.CONTAINER_ID, slot: number): LuaMultiReturn<[number, number]>;

/**
 * Returns the item id of the item in a particular container slot.
 *
 * @param bagId Index of the bag to query
 * @param slot Index of the slot within the bag to query; ascending from 1.
 * @returns item ID of the item held in the container slot, nil if there is no item in the container slot
 * @see https://wow.gamepedia.com/API_GetContainerItemID
 */
declare function GetContainerItemID(bagId: WoWAPI.CONTAINER_ID, slot: number): number | null;

/**
 * Get information about a specific item in your container
 *
 * @param bagId number of the bag the item is in, e.g. 0 for your backpack
 * @param slot index of the slot inside the bag to look up
 * @returns texture, itemCount, locked, quality, readable, lootable, itemLink, isFiltered, noValue, itemID
 * @see https://wow.gamepedia.com/API_GetContainerItemInfo
 */
// tslint:disable-next-line max-line-length
declare function GetContainerItemInfo(bagId: WoWAPI.CONTAINER_ID, slot: number): LuaMultiReturn<[WoWAPI.TexturePath, number, boolean, WoWAPI.ITEM_QUALITY, boolean, boolean, WoWAPI.ItemLink, boolean, boolean, number]>;

/**
 * Returns a link of the object located in the specified slot of a specified bag
 *
 * @param bagId number of the bag the item is in, e.g. 0 for your backpack
 * @param slot Slot index within the specified bag, ascending from 1. Slot 1 is typically the leftmost topmost slot
 * @returns a chat link for the object in the specified bag slot; nil if there is no such object. This is typically, but not always an WoWAPI.ItemLink.
 * @see https://wow.gamepedia.com/API_GetContainerWowItemLink
 */
declare function GetContainerWowItemLink(bagId: WoWAPI.CONTAINER_ID, slot: number): WoWAPI.ItemLink;

/**
 * Returns the total number of slots in the bag specified by the index
 *
 * @param bagId the slot containing the bag, e.g. 0 for backpack, etc
 * @returns the number of slots in the specified bag, or 0 if there is no bag in the given slot
 * @see https://wow.gamepedia.com/API_GetContainerNumSlots
 */
declare function GetContainerNumSlots(bagId: WoWAPI.CONTAINER_ID): number;

/**
 * Returns whether the item in the slot is a quest item
 *
 * @param bagId Index of the bag to query
 * @param slot Index of the slot within the bag (ascending from 1) to query
 * @returns isQuestItem, questId, isActive
 * @see https://wow.gamepedia.com/API_GetContainerItemQuestInfo
 */
declare function GetContainerItemQuestInfo(bagId: WoWAPI.CONTAINER_ID, slot: number): LuaMultiReturn<[WoWAPI.Flag, number | null, WoWAPI.Flag]>;

/**
 * Returns the total number of free slots in the bag an the type of items that can go into it specified by the index
 *
 * @param bagId the slot containing the bag, e.g. 0 for backpack, etc.
 * @returns numberOfFreeSlots, BagType
 * @see https://wow.gamepedia.com/API_GetContainerNumFreeSlots
 */
declare function GetContainerNumFreeSlots(bagId: WoWAPI.CONTAINER_ID): LuaMultiReturn<[number, WoWAPI.BAG_TYPE]>;

/**
 * Open all bag frames
 *
 * @param frame The frame that is responsible for opening the bags. Doesn't affect the operation of this function but sets an internal
 * variable that affects other container frame functions. Can be nil
 * @see https://wow.gamepedia.com/API_OpenAllBags
 */
declare function OpenAllBags(frame?: WoWAPI.Frame): void;

/**
 * Closes all open bags
 *
 * @see https://wow.gamepedia.com/API_CloseAllBags
 */
declare function CloseAllBags(): void;

/**
 * Picks up the bag from the specified slot, placing it in the cursor
 *
 * @param inventorySlotId the slot containing the bag.
 * @see https://wow.gamepedia.com/API_PickupBagFromSlot
 */
declare function PickupBagFromSlot(inventorySlotId: WoWAPI.INVENTORY_SLOT_ID_CONTAINERS): void;

/**
 * The function behaves differently depending on what is currently on the cursor:
 * - If the cursor currently has nothing, calling this will pick up an item from your backpack.
 * - If the cursor currently contains an item (check with CursorHasItem()), calling this will place the item currently on the cursor
 * into the specified bag slot. If there is already an item in that bag slot, the two items will be exchanged.
 * - If the cursor is set to a spell (typically enchanting and poisons, check with SpellIsTargeting()), calling this specifies that
 * you want to cast the spell on the item in that bag slot.
 *
 * @param bagId id of the bag the slot is located in.
 * @param slot slot inside the bag (top left slot is 1, slot to the right of it is 2).
 * @event ITEM_LOCK_CHANGED
 * @see https://wow.gamepedia.com/API_PickupContainerItem
 */
declare function PickupContainerItem(bagId: WoWAPI.CONTAINER_ID, slot: number): void;

/**
 * Places the item currently on the cursor into the player's backpack otherwise it has no effect. If there is already a partial stack of
 * the item in the backpack, it will attempt to stack them together
 *
 * @see https://wow.gamepedia.com/API_PutItemInBackpack
 */
declare function PutItemInBackpack(): void;

/**
 * Puts the item on the cursor into the specified bag slot on the main bar, if it's a bag. Otherwise, attempts to place the item inside the
 * bag in that slot. Note that to place an item in the backpack, you must use PutItemInBackpack.
 *
 * @param inventorySlotId Inventory slot id containing the bag in which you wish to put the item. Values 20 to 23 correspond to the player's
 * bag slots, right-to-left from the first bag after the backpack
 * @see https://wow.gamepedia.com/API_PutItemInBag
 */
declare function PutItemInBag(inventorySlotId: WoWAPI.INVENTORY_SLOT_ID_CONTAINERS): void;

/**
 * Picks up part of a stack of items from a container, placing them on the cursor
 *
 * @param bagId id of the bag the slot is located in
 * @param slot slot inside the bag (top left slot is 1, slot to the right of it is 2).
 * @param count Quantity to pick up
 * @see https://wow.gamepedia.com/API_SplitContainerItem
 */
declare function SplitContainerItem(bagId: WoWAPI.CONTAINER_ID, slot: number, count: number): void;

/**
 * Toggles your backpage open/closed
 *
 * @see https://wow.gamepedia.com/API_ToggleBackpack
 */
declare function ToggleBackpack(): void;

/**
 * Opens or closes the specified bag
 *
 * @param bagId the bagId you want to toggle open or close
 */
declare function ToggleBag(bagId: WoWAPI.CONTAINER_ID): void;

/**
 * Use an item from a container. If Merchant window is open, this will sell the item
 *
 * @param bagId The bag id, where the item to use is located
 * @param slot The slot in the bag, where the item to use is located
 * @param target unit the item should be used on. If omitted, defaults to "target" if a the item must target someone.
 * @param reagentBankAccessible This indicates, for cases where no target is given, if the item reagent bank is accessible (so bank frame
 * is shown and switched to the reagent bank tab).
 * @see https://wow.gamepedia.com/API_UseContainerItem
 * @protected PROTECTED (situational)
 */
declare function UseContainerItem(bagId: WoWAPI.CONTAINER_ID, slot: number, target?: WoWAPI.UnitId, reagentBankAccessible?: boolean): void;


declare namespace WoWAPI {
    type CurrencyLink = Hyperlink;
}

/**
 * Breaks down an amount of money into gold/silver/copper, inserts separator strings, and returns the resulting string
 *
 * @param amount the amount of money in copper (for example, the return value from GetMoney)
 * @param separator a string to insert between the formatted amounts of currency, if there is more than one type
 * @returns a (presumably localized) string suitable for printing or displaying
 * @see https://wow.gamepedia.com/API_GetCoinText
 * @since 3.0.2
 */
declare function GetCoinText(amount: number, separator: string): string;

/**
 * Breaks down an amount of money into gold/silver/copper, inserts appropriate "|T" texture strings for coin icons, and returns the resulting string
 *
 * @param amount the amount of money in copper (for example, the return value from GetMoney)
 * @param fontHeight the height of the coin icon; if not specified, defaults to 14
 * @returns a string suitable for printing or displaying
 * @see https://wow.gamepedia.com/API_GetCoinTextureString
 * @since 3.0.2
 */
declare function GetCoinTextureString(amount: number, fontHeight?: number): string;

/**
 * Retrieve Information about a currency at index including it's amount
 *
 * @param currencyId ID of the currency to retrieve
 * @returns name, currentAmount, texture, earnedThisWeek, weeklyMax, totalMax, isDiscovered, rarity
 * @see https://wow.gamepedia.com/API_GetCurrencyInfo
 * @since 3.0.2
 */
declare function GetCurrencyInfo(currencyId: number): LuaMultiReturn<[string, number, WoWAPI.TexturePath, number, number, number, boolean, WoWAPI.ITEM_QUALITY]>;

/**
 * Retrieve Information about a currency at index including it's amount
 *
 * @param currencyId The full currencyLink as found with GetCurrencyLink() or GetCurrencyListLink(). OR A fragment of the currencyLink string
 * for the item, e.g. "currency:396" for Valor Points.
 * @returns name, currentAmount, texture, earnedThisWeek, weeklyMax, totalMax, isDiscovered, rarity
 * @see https://wow.gamepedia.com/API_GetCurrencyInfo
 * @since 3.0.2
 */
// tslint:disable-next-line unified-signatures max-line-length
declare function GetCurrencyInfo(currencyLinkOrString: WoWAPI.CurrencyLink | string): LuaMultiReturn<[string, number, WoWAPI.TexturePath, number, number, number, boolean, WoWAPI.ITEM_QUALITY]>;

/**
 * Get the currencyLink for the specified currencyID
 *
 * @param currencyId currency index - see table at GetCurrencyInfo for a list
 * @param currencyAmount currency amount
 * @returns The currency link (similar to itemLink) for the specified index (e.g. "|cffa335ee|Hcurrency:396:0|h[Valor Points]|h|r" for Valor
 * Points) or nil if the index is for a header
 * @see https://wow.gamepedia.com/API_GetCurrencyLink
 * @since 3.0.2
 */
declare function GetCurrencyLink(currencyId: number, currencyAmount: number): WoWAPI.CurrencyLink;

/**
 * Returns the number of entries in the currency list.
 *
 * @returns number of entries in the player's currency list
 * @see https://wow.gamepedia.com/API_GetCurrencyListSize
 * @since 3.0.2
 */
declare function GetCurrencyListSize(): number;

/**
 * Returns information about an entry in the currency list
 *
 * @param currencyIndex index, ascending from 1 to GetCurrencyListSize().
 * @returns name, isHeader, isExpanded, isUnused, isWatched, count, icon, maximum, hasWeeklyLimit, currentWeeklyAmount, unknown, itemID
 * @see https://wow.gamepedia.com/API_GetCurrencyListInfo
 * @since 3.0.2
 */
// tslint:disable-next-line max-line-length
declare function GetCurrencyListInfo(currencyIndex: number): LuaMultiReturn<[string, boolean, boolean, boolean, boolean, number, WoWAPI.TexturePath, number, number, number, WoWAPI.Unknown, number]>;

/**
 * Alters the expanded state of a currency list header.
 *
 * @param currencyHeaderIndex Index of the header in the currency list to expand/collapse.
 * @param expanded 0 to set to collapsed state; 1 to set to expanded state
 * @see https://wow.gamepedia.com/API_ExpandCurrencyList
 * @since 3.0.2
 */
declare function ExpandCurrencyList(currencyHeaderIndex: number, expanded: WoWAPI.Flag): void;

/**
 * Check to see if chosen unit utilizes a relic slot
 */
 declare function UnitHasRelicSlot(unitType: WoWAPI.UnitId):boolean

/**
 * Marks/unmarks a currency as unused
 *
 * @param currencyIndex Index of the currency in the currency list to alter unused status of.
 * @param unused 1 to mark the currency as unused; 0 to mark the currency as used
 * @see https://wow.gamepedia.com/API_SetCurrencyUnused
 * @since 3.0.2
 */
declare function SetCurrencyUnused(currencyIndex: number, unused: WoWAPI.Flag): void;

/**
 * Returns the number of currencies currently watched on the player's backpack
 *
 * @returns the number of watched currencies
 * @see https://wow.gamepedia.com/API_GetNumWatchedTokens
 * @since 3.0.2
 */
declare function GetNumWatchedTokens(): number;

/**
 * Returns information about a currency item currently being shown as part of the backpack
 *
 * @param watchedIndex Index, ascending from 1 to GetNumWatchedTokens().
 * @returns name, count, icon, currencyID
 * @see https://wow.gamepedia.com/API_GetBackpackCurrencyInfo
 * @since 3.0.2
 */
declare function GetBackpackCurrencyInfo(watchedIndex: number): LuaMultiReturn<[string, number, WoWAPI.TexturePath, number]>;

/**
 * Alters the backpack tracking state of a currency
 *
 * @param currencyIndex Index of the currency in the currency list to alter tracking of
 * @param track 1 to track; 0 to clear tracking
 * @see https://wow.gamepedia.com/API_SetCurrencyBackpack
 * @since 3.0.2
 */
declare function SetCurrencyBackpack(currencyIndex: number, track: WoWAPI.Flag): void;


declare namespace WoWAPI {
    type CursorInfoType = "item" | "spell" | "macro" | "mount" | "money" | "merchant" | "battlepet";
}

/**
 * Automatically equips the item currently held on the cursor
 * @see https://wow.gamepedia.com/API_AutoEquipCursorItem
 */
declare function AutoEquipCursorItem(): void;

/**
 * Clears the in-game cursor, returning the object held to its original position (equivalent to right-clicking while holding something on the cursor).
 * @see https://wow.gamepedia.com/API_ClearCursor
 */
declare function ClearCursor(): void;

/**
 * Determines if the item in the cursor can be equipped in the specified inventory slot. Always returns 1 for bank bag slots
 * @param inventorySlot Inventory slot to query
 * @returns 1 if the thing currently on the cursor can go into the specified slot, nil otherwise
 * @see https://wow.gamepedia.com/API_CursorCanGoInSlot
 */
declare function CursorCanGoInSlot(inventorySlot: WoWAPI.INVENTORY_SLOT_ID): WoWAPI.Flag;

/**
 * Returns 1 if the cursor currently holds an item, nil otherwise
 * @see https://wow.gamepedia.com/API_CursorHasItem
 */
declare function CursorHasItem(): boolean;

/**
 * Returns true if the cursor currently holds money
 */
declare function CursorHasMoney(): boolean;

/**
 * Returns true if the cursor currently holds a spell.
 */
declare function CursorHasSpell(): boolean;

/**
 * Destroys the item currently held by the cursor
 * @description This does not deselect the item, this destroys it. Use ClearCursor to drop an item from the cursor without destroying it.
 * @see https://wow.gamepedia.com/API_DeleteCursorItem
 */
declare function DeleteCursorItem(): void;

/**
 * Drops the money currently attached to your cursor back into your bag
 * @see https://wow.gamepedia.com/API_DropCursorMoney
 */
declare function DropCursorMoney(): void;

/**
 * Drops an item from the cursor onto the specified target. Can be used to initiate a trade session (though see Trade functions) or feeding pets
 * @param unit Unit to which you want to give the item on the cursor
 * @see https://wow.gamepedia.com/API_DropItemOnUnit
 */
declare function DropItemOnUnit(unit: WoWAPI.UnitId): void;

/**
 * Equips the currently picked up item to a specific inventory slot
 * @param inventorySlot The slot ID to place the item into. Use GetInventorySlotInfo(slotname) to resolve an inventory slot name to its ID
 * @see https://wow.gamepedia.com/API_EquipCursorItem
 */
declare function EquipCursorItem(inventorySlot: WoWAPI.INVENTORY_SLOT_ID): void;

/**
 * Returns information about what the mouse cursor is holding
 * @see https://wow.gamepedia.com/API_GetCursorInfo
 */
declare function GetCursorInfo(): LuaMultiReturn<[WoWAPI.CursorInfoType, ...WoWAPI.Unknown[]]>;

/**
 * @returns **item**
 * - **itemId**: Item ID of the item on the cursor
 * - **itemLink**: ItemLink of the item on the cursor
 */
declare function GetCursorInfo(): LuaMultiReturn<["item", number, WoWAPI.ItemLink]>;

/**
 * @returns **spell**
 * - **spellIndex**: The index of the spell in the spell book
 * - **bookType**: The spell book id. Only works for player spells, so this always returns BOOKTYPE_SPELL
 * - **spellId**: Spell ID of the spell on the cursor
 */
declare function GetCursorInfo(): LuaMultiReturn<["spell", number, string, number]>;

/**
 * @returns **macro**
 * - **index**: The index of the macro on the cursor
 */
declare function GetCursorInfo(): LuaMultiReturn<["macro", number]>;

/**
 * @returns **money**
 * - **amount**: The amount of money in copper
 */
declare function GetCursorInfo(): LuaMultiReturn<["money", number]>;

/**
 * @returns **mount**
 * - **useless_index**: this index is not useful since no other API receives it as a parameter
 * - **C_MountJournal index**: index in the C_MountJournal (used by C_MountJournal API functions). These indexes varies with game locale
 */
declare function GetCursorInfo(): LuaMultiReturn<["mount", number, number]>;

/**
 * @returns **merchant**
 * - **index**: The index of the merchant item
 */
declare function GetCursorInfo(): LuaMultiReturn<["merchant", number]>;

/**
 * @returns **battlepet**
 * - **petGUID**: GUID of a battle pet in your collection
 */
declare function GetCursorInfo(): LuaMultiReturn<["battlepet", WoWAPI.Guid]>;

/**
 * Returns the amount of copper held on the cursor
 * @see https://wow.gamepedia.com/API_GetCursorMoney
 */
declare function GetCursorMoney(): number;

/**
 * Returns the cursor's position on the screen
 * @returns **position**
 * - x coordinate unaffected by UI scale; 0 at the left edge of the screen.
 * - y coordinate unaffected by UI scale; 0 at the bottom edge of the screen.
 * @description Returns scale-independent coordinates similar to Cursor:GetCenter() if 'Cursor' was a valid frame not affected by scaling.
 * Assuming UIParent spans the entire screen, you can convert these coordinates to UIParent offsets by dividing by its effective scale.
 * The following snippet positions a small texture at the cursor's location.
 * @see https://wow.gamepedia.com/API_GetCursorPosition
 */
declare function GetCursorPosition(): LuaMultiReturn<[number, number]>;

/**
 * Takes the cursor out of repair mode
 * @see https://wow.gamepedia.com/API_HideRepairCursor
 */
declare function HideRepairCursor(): void;

/**
 * Lets you know if your cursor is in repair mode. When your cursor is in repair mode, you can click on equipped items as well as items in your
 * inventory to repair them
 * @see https://wow.gamepedia.com/API_InRepairMode
 */
declare function InRepairMode(): boolean;

/**
 * Pick up an action for drag-and-drop
 * @param actionSlot The action slot to pick the action up from
 * @description If the slot is empty, nothing happens, otherwise the action from the slot is placed on the cursor, and the slot is filled with
 * whatever action was currently being drag-and-dropped (The slot is emptied if the cursor was empty). If you wish to empty the cursor without
 * putting the item into another slot, try ClearCursor.
 * @requires NO_COMBAT
 * @see https://wow.gamepedia.com/API_PickupAction
 */
declare function PickupAction(actionSlot: ActionBarSlotId): void;

/**
 * Picks up the bag from the specified slot, placing it in the cursor
 * @param inventorySlot the slot containing the bag
 * @description Valid slot numbers are 20-23, numbered from left to right starting after the backpack. inventoryID ,the result of
 * ContainerIDtoInventoryID(BagID), can help to compute the slot number and bag numbers can be viewed in the InventorySlotID page
 * @see https://wow.gamepedia.com/API_PickupBagFromSlot
 */
declare function PickupBagFromSlot(inventorySlot: WoWAPI.INVENTORY_SLOT_CONTAINER): void;

/**
 * Wildcard function usually called when a player left clicks on a slot in their bags. Functionality includes picking up the item from a specific
 * bag slot, putting the item into a specific bag slot, and applying enchants (including poisons and sharpening stones) to the item in a specific
 * bag slot, except if one of the Modifier Keys is pressed
 * @param bagId id of the bag the slot is located in
 * @param slot slot inside the bag (top left slot is 1, slot to the right of it is 2)
 * @description The function behaves differently depending on what is currently on the cursor
 * - If the cursor currently has nothing, calling this will pick up an item from your backpack
 * - If the cursor currently contains an item (check with CursorHasItem()), calling this will place the item currently on the cursor into the
 * specified bag slot. If there is already an item in that bag slot, the two items will be exchanged
 * - If the cursor is set to a spell (typically enchanting and poisons, check with SpellIsTargeting()), calling this specifies that you want to
 * cast the spell on the item in that bag slot
 * - Trying to pickup the same item twice in the same "time tick" does not work (client seems to flag the item as "locked" and waits for the server
 * to sync). This is only a problem if you might move a single item multiple times (i.e., if you are changing your character's equipped armor, you
 * are not likely to move a single piece of armor more than once). If you might move an object multiple times in rapid succession, you can check the
 * item's 'locked' flag by calling GetContainerItemInfo. If you want to do this, you should leverage OnUpdate to help you. Avoid constantly checking
 * the lock status inside a tight loop. If you do, you risk getting into a race condition. Once the repeat loop starts running, the client will not
 * get any communication from the server until it finishes. However, it will not finish until the server tells it that the item is unlocked.
 * Here is some sample code that illustrates the problem
 * @see https://wow.gamepedia.com/API_PickupContainerItem
 */
declare function PickupContainerItem(bagId: WoWAPI.CONTAINER_ID, slot: number): void;

/**
 * "Picks up" an item from the player's worn inventory. This appears to be a kind of catch-all "pick up/activate" function
 * @param inventorySlot the slot ID of the worn inventory slot
 * @description
 * - If the cursor is empty, then it will attempt to pick up the item in the slotId
 * - If the cursor has an item, then it will attempt to equip the item to the slotId and place the previous slotId item (if any) where the
 * item on cursor orginated
 * - If the cursor is in repair or spell-casting mode, it will attempt the action on the slotId
 * - You can use GetInventorySlotInfo to get the slotId
 */
declare function PickupInventoryItem(inventorySlot: WoWAPI.INVENTORY_SLOT_ID): void;

/**
 * Place the item on the cursor
 * @param itemIdentifier
 * - **itemId**: The numeric ID of the item. ie. 12345
 * - **itemString**: The full item ID in string format, e.g. "item:12345:0:0:0:0:0:0:0"
 * - **itemName**: The Name of the Item, ex: "Hearthstone"
 * - **itemLink**: The itemLink, when Shift-Clicking items
 * @see https://wow.gamepedia.com/API_PickupItem
 */
declare function PickupItem(itemIdentifier: number | string | WoWAPI.ItemLink): void;

/**
 * Pick up a macro from the macro frame and place it on the cursor
 * @param macroNameOrId the name of the macro or the position of the macro in the macro frame
 * @requires NO_COMBAT
 * @see https://wow.gamepedia.com/API_PickupMacro
 */
declare function PickupMacro(macroNameOrId: number | string): void;

/**
 * Places the specified merchant item on the cursor
 * @param merchantIndex The index of the item in the merchant's inventory
 * @description Interesting thing is this function can be used to drop an item to the merchant as well. This will happen if the cursor
 * already holds an item from player's bag
 * @see https://wow.gamepedia.com/API_PickupMerchantItem
 */
declare function PickupMerchantItem(merchantIndex: number): void;

/**
 * Pick up a pet action for drag-and-drop
 * @param petActionSlot The pet action slot to pick the action up from (1-10).
 * @description If the slot is empty, nothing happens, otherwise the action from the slot is placed on the cursor, and the slot is filled with
 * whatever action was currently being drag-and-dropped (The slot is emptied if the cursor was empty). Be very careful about picking up the pet
 * control actions (Attack/Follow/Stay/Aggressive/Defensive/Passive), because if you lose them, there's no way to get them back
 * @requires NO_COMBAT
 * @see https://wow.gamepedia.com/API_PickupPetAction
 */
declare function PickupPetAction(petActionSlot: number): void;

/**
 * Picks up an amount of money from the player's bags, placing it on the cursor
 * @param copper The amount of money, in copper, to place on the cursor
 * @see https://wow.gamepedia.com/API_PickupPlayerMoney
 */
declare function PickupPlayerMoney(copper: number): void;

/**
 * Puts the specified spell onto the mouse cursor
 * @param spell Name of the spell to pick up
 * @requires NO_COMBAT
 * @see https://wow.gamepedia.com/API_PickupSpell
 */
declare function PickupSpell(spellName: string): void;

/**
 * Attaches a pet in your stable to your cursor. 1 for the pet in the slot on the left, and 2 for the pet in the slot on the right
 * @param slotDirection 1 for left, 2 for right
 * @see https://wow.gamepedia.com/API_PickupStablePet
 */
declare function PickupStablePet(slotDirection: 1 | 2): void;

/**
 * Picks up an amount of money from the player's trading offer, placing it on the cursor
 * @param copper amount of money, in copper, to pick up
 * @see https://wow.gamepedia.com/API_PickupTradeMoney
 */
declare function PickupTradeMoney(copper: number): void;

/**
 * Place the drag-and-drop item as an action
 * @param actionSlot The action slot to place the action into.
 * @see https://wow.gamepedia.com/API_PlaceAction
 */
declare function PlaceAction(actionSlot: number): void;

/**
 * Places the item currently on the cursor into the player's backpack otherwise it has no effect. If there is already a partial stack of the
 * item in the backpack, it will attempt to stack them together
 * @see https://wow.gamepedia.com/API_PutItemInBackpack
 */
declare function PutItemInBackpack(): void;

/**
 * Puts the item on the cursor into the specified bag slot on the main bar, if it's a bag. Otherwise, attempts to place the item inside the bag
 * in that slot. Note that to place an item in the backpack, you must use PutItemInBackpack
 * @param slotId Inventory slot id containing the bag in which you wish to put the item. Values 20 to 23 correspond to the player's bag slots,
 * right-to-left from the first bag after the backpack
 * @see https://wow.gamepedia.com/API_PutItemInBag
 */
declare function PutItemInBag(slotId: number): void;

/**
 * Resets mouse cursor
 * @description Function resets mouse cursor into its default shape, if it has been previously altered by SetCursor(cursor).
 * Calling ResetCursor() is equivalent to calling SetCursor(nil)
 * @see https://wow.gamepedia.com/API_ResetCursor
 */
declare function ResetCursor(): void;

/**
 * Changes the current cursor graphic
 * @param cursor cursor to switch to; either a built-in cursor identifier (like "ATTACK_CURSOR"), path to a cursor texture
 * (e.g. "Interface/Cursor/Taxi"), or nil to reset to a default cursor
 * @description If the cursor is hovering over WorldFrame, the SetCursor function will have no effect - cursor is locked to reflect what
 * the player is currently pointing at. If called with an invalid argument, the cursor is replaced by a black square
 * @see https://wow.gamepedia.com/API_SetCursor
 */
declare function SetCursor(cursor: string | WoWAPI.TexturePath | null): boolean;

/**
 * Makes a Texture display as grayscale.
 * @param texture Texture
 * @param makeGrayscale: boolean
 */
declare function SetDesaturation(texture: WoWAPI.Texture, makeGrayscale: boolean): void;

/**
 * unknown
 * @param index unknown
 * @param slot unknown
 */
declare function ShowContainerSellCursor(index: number, slot: number): WoWAPI.Unknown;

/**
 * Change the cursor to the magnifying glass inventory inspection cursor
 * @see https://wow.gamepedia.com/API_ShowInspectCursor
 */
declare function ShowInspectCursor(): void;

/**
 * unknown
 * @param args unknown
 */
declare function ShowInventorySellCursor(...args: WoWAPI.Unknown[]): WoWAPI.Unknown;

/**
 * Puts the cursor in repair mode
 * @see https://wow.gamepedia.com/API_ShowRepairCursor
 */
declare function ShowRepairCursor(): void;

/**
 * Picks up part of a stack of items from a container, placing them on the cursor
 * @param bagId id of the bag the slot is located in
 * @param slot slot inside the bag (top left slot is 1, slot to the right of it is 2)
 * @param count Quantity to pick up
 * @description This function always puts the requested item(s) on the cursor (unlike PickupContainerItem() which can pick up items,
 * place items, or cast spells on items based on what's already on the cursor). Passing a larger count than is in the requested bag and slot
 * will pick up nothing
 * @see https://wow.gamepedia.com/API_SplitContainerItem
 */
declare function SplitContainerItem(bagId: WoWAPI.CONTAINER_ID, slot: number, count: number): void;


/**
 * Passes its arguments to the current print output handler. By default, this will output them all to the default chat frame
 *
 * @param args any number of any type of values
 * @see https://wow.gamepedia.com/API_print
 */
declare function print(...args: any[]): void;

/**
 * Returns the function currently handling print() output
 *
 * @returns Current function responsible for outputting values passed to the print() function
 * @see https://wow.gamepedia.com/API_getprinthandler
 */
declare function getprinthandler(): (...args: any[]) => any;

/**
 * Sets a new print() output handler function
 *
 * @param handler The function that will be called with all of print(...)'s arguments when print(...) is called.
 * This function is responsible for converting the values into a form it can present to the user
 * @see https://wow.gamepedia.com/API_setprinthandler
 */
declare function setprinthandler(handler: (...args: any[]) => any): void;

/**
 * Wipes a table of all contents
 *
 * @param table The table to be cleared
 * @see https://wow.gamepedia.com/API_wipe
 */
declare function wipe<T extends object>(table: T): T;

/**
 * Returns the hyperlink for a spell.
 *
 * @returns link, spellID
 * @see https://wowpedia.fandom.com/wiki/API_GetSpellLink
 * @description Returns the hyperlink for a spell.
 */
 declare function GetSpellLink(spell:number|string, bookType?:string): LuaMultiReturn<[string,number]>;


declare namespace WoWAPI {
    type TypedEvents = {

        /**
         * Fired when an achievement is gained
         * - **arg1**: The id of the achievement gained
         * @since 3.0.3
         * @see https://wow.gamepedia.com/ACHIEVEMENT_EARNED
         */
        ACHIEVEMENT_EARNED: number;

        /**
         * unknown
         */
        ACHIEVEMENT_SEARCH_UPDATED: Unknown[];

        /**
         * Fired when the actionbar numbers disappear, typically when you finish dragging something to the actionbar
         * - **arg1**: the mouse button used to click the button. Known values: "LeftButton", "RightButton"
         * - **arg2**: true or false for unknown reason
         * @see https://wow.gamepedia.com/ACTIONBAR_HIDEGRID
         */
        ACTIONBAR_HIDEGRID: [MouseButton, boolean];

        /**
         * Fired when the actionbar page changes, typically when you press the pageup or pagedown button
         * - **arg1**: the mouse button used to click the button. Known values: "LeftButton", "RightButton"
         * - **arg2**: true or false for unknown reason
         * @see https://wow.gamepedia.com/ACTIONBAR_PAGE_CHANGED
         */
        ACTIONBAR_PAGE_CHANGED: [MouseButton, boolean];

        /**
         * Fired when the actionbar numbers appear, typically when you drag a spell to the actionbar
         * @see https://wow.gamepedia.com/ACTIONBAR_SHOWGRID
         */
        ACTIONBAR_SHOWGRID: null;

        /**
         * unknown
         */
        ACTIONBAR_SHOW_BOTTOMLEFT: Unknown[];

        /**
         * Fired when any actionbar slot's contents change; typically the picking up and dropping of buttons
         * - **arg1**: the number of the slot that changed
         * - **arg2**: true or false for unknown reason.
         * @see https://wow.gamepedia.com/ACTIONBAR_SLOT_CHANGED
         */
        ACTIONBAR_SLOT_CHANGED: [number, boolean];

        /**
         * Fired when the cooldown for an actionbar or inventory slot starts or stops. Also fires when you log into a new area
         * - **arg1**: if the cooldown is starting, the mouse button used to click the button. Known values: "leftButton". if the cooldown
         * is stopping or you are logging into a new zone, this is nil
         * @see https://wow.gamepedia.com/ACTIONBAR_UPDATE_COOLDOWN
         */
        ACTIONBAR_UPDATE_COOLDOWN: [MouseButton | null];

        /**
         * Fired when the state of anything on the actionbar changes. This includes cooldown and disabling
         * - **arg1**: the mouse button used to click the button. Known values: "LeftButton", "RightButton" can also be nil
         * @see https://wow.gamepedia.com/ACTIONBAR_UPDATE_STATE
         */
        ACTIONBAR_UPDATE_STATE: [MouseButton | null];

        /**
         * Fired when something in the actionbar or your inventory becomes usable (after eating or drinking a potion, or entering/leaving
         * stealth; for example). This is affected by rage/mana/energy available, but not by range
         * @see https://wow.gamepedia.com/ACTIONBAR_UPDATE_USABLE
         */
        ACTIONBAR_UPDATE_USABLE: null;

        /**
         * unknown
         */
        ACTION_WILL_BIND_ITEM: Unknown[];

        /**
         * unknown
         */
        ACTIVATE_GLYPH: Unknown[];

        /**
         * Fired when a player switches changes which talent group (dual specialization) is active
         * - **arg1**: Index of the talent group that is now active
         * - **arg2**: Index of the talent group that was active before changing. Upon logging in this returns 0.
         * @see https://wow.gamepedia.com/ACTIVE_TALENT_GROUP_CHANGED
         */
        ACTIVE_TALENT_GROUP_CHANGED: [number, number];

        /**
         * Addon unload event with unknown payload
         */
        ADDONS_UNLOADING: Unknown[];

        /**
         * (this event doesn't seem to be used anymore, use ADDON_ACTION_FORBIDDEN instead)
         * @deprecated
         * @see https://wow.gamepedia.com/ADDON_ACTION_BLOCKED
         */
        ADDON_ACTION_BLOCKED: null;

        /**
         * Fires when an AddOn tries use actions that are always forbidden (movement, targeting, etc.)
         * - **arg1**: Name of the AddOn that was last involved in the execution path
         * - **arg2**: The protected function that was called
         * @see https://wow.gamepedia.com/ADDON_ACTION_FORBIDDEN
         */
        ADDON_ACTION_FORBIDDEN: [string, string];

        /**
         * Fires when one addon load
         * - **arg1**: addon name that has been loaded
         */
        ADDON_LOADED: [string];

        /**
         * unknown
         */
        ADVENTURE_MAP_CLOSE: Unknown[];

        /**
         * unknown
         */
        ADVENTURE_MAP_OPEN: Unknown[];

        /**
         * unknown
         */
        ADVENTURE_MAP_QUEST_UPDATE: Unknown[];

        /**
         * unknown
         */
        ADVENTURE_MAP_UPDATE_INSETS: Unknown[];

        /**
         * unknown
         */
        ADVENTURE_MAP_UPDATE_POIS: Unknown[];

        /**
         * unknown
         */
        AJ_DUNGEON_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_OPEN: Unknown[];

        /**
         * unknown
         */
        AJ_PVE_LFG_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_PVP_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_PVP_LFG_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_PVP_RBG_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_PVP_SKIRMISH_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_QUEST_LOG_OPEN: Unknown[];

        /**
         * unknown
         */
        AJ_RAID_ACTION: Unknown[];

        /**
         * unknown
         */
        AJ_REFRESH_DISPLAY: Unknown[];

        /**
         * unknown
         */
        AJ_REWARD_DATA_RECEIVED: Unknown[];

        /**
         * unknown
         */
        ALLIED_RACE_CLOSE: Unknown[];

        /**
         * unknown
         */
        ALLIED_RACE_OPEN: Unknown[];

        /**
         * unknown
         */
        ALTERNATIVE_DEFAULT_LANGUAGE_CHANGED: Unknown[];

        /**
         * This event fires whenever the Archaeology window is closed, no matter
         * the method (Clicking on the X, pressing Esc, pressing the Archaeology
         * button, etc)
         * @see https://wow.gamepedia.com/ARCHAEOLOGY_CLOSED
         */
        ARCHAEOLOGY_CLOSED: null;

        /**
         * unknown
         */
        ARCHAEOLOGY_FIND_COMPLETE: Unknown[];

        /**
         * unknown
         */
        ARCHAEOLOGY_SURVEY_CAST: Unknown[];

        /**
         * This event fires whenever the Archaeology button from the spellbook is used. This includes if closing the window by pressing the button again
         * @see https://wow.gamepedia.com/ARCHAEOLOGY_TOGGLE
         */
        ARCHAEOLOGY_TOGGLE: null;

        /**
         * unknown
         */
        AREA_SPIRIT_HEALER_IN_RANGE: Unknown[];

        /**
         * unknown
         */
        AREA_SPIRIT_HEALER_OUT_OF_RANGE: Unknown[];

        /**
         * unknown
         */
        ARENA_COOLDOWNS_UPDATE: Unknown[];

        /**
         * unknown
         */
        ARENA_CROWD_CONTROL_SPELL_UPDATE: Unknown[];

        /**
         * unknown
         */
        ARENA_OPPONENT_UPDATE: Unknown[];

        /**
         * unknown
         */
        ARENA_PREP_OPPONENT_SPECIALIZATIONS: Unknown[];

        /**
         * unknown
         */
        ARENA_SEASON_WORLD_STATE: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_CLOSE: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_DIGSITE_COMPLETE: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_ENDGAME_REFUND: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_RELIC_FORGE_CLOSE: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_RELIC_FORGE_PREVIEW_RELIC_CHANGED: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_RELIC_FORGE_UPDATE: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_RELIC_INFO_RECEIVED: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_RESPEC_PROMPT: Unknown[];

        /**
         * unknown
         */
        ARTIFACT_TIER_CHANGED: Unknown[];

        /**
         * This event fires whenever the data for an artifact has been updated, such as after completing a new one
         * @see https://wow.gamepedia.com/ARTIFACT_UPDATE
         */
        ARTIFACT_UPDATE: null;

        /**
         * Event fired when gaining artifact power for the current equipped artifact weapon
         * @see https://wow.gamepedia.com/ARTIFACT_XP_UPDATE
         */
        ARTIFACT_XP_UPDATE: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_CANCELED
         */
        AUCTION_CANCELED: [number];

        /**
         * unknown
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_AUCTION_CREATED
         */
        AUCTION_HOUSE_AUCTION_CREATED: [number];

        /**
         * unknown
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_BROWSE_FAILURE
         */
        AUCTION_HOUSE_BROWSE_FAILURE: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_BROWSE_RESULTS_ADDED
         */
        AUCTION_HOUSE_BROWSE_RESULTS_ADDED: Unknown[];

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_BROWSE_RESULTS_UPDATED
         */
        AUCTION_HOUSE_BROWSE_RESULTS_UPDATED: null;

        /**
         * This event is fired when the auction interface is closed. It appears to fire twice, but the reason is unknown
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_CLOSED
         */
        AUCTION_HOUSE_CLOSED: null;

        /**
         * Fired when the auction house is not operational
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_DISABLED
         */
        AUCTION_HOUSE_DISABLED: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_FAVORITES_UPDATED
         */
        AUCTION_HOUSE_FAVORITES_UPDATED: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_NEW_BID_RECEIVED
         */
        AUCTION_HOUSE_NEW_BID_RECEIVED: [number];

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_NEW_RESULTS_RECEIVED
         */
        AUCTION_HOUSE_NEW_RESULTS_RECEIVED: Unknown[];

        /**
         * This event is fired when the auction interface is first displayed. This is generally done by right-clicking an auctioneer in a major city
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_SHOW
         */
        AUCTION_HOUSE_SHOW: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_THROTTLED_MESSAGE_DROPPED
         */
        AUCTION_HOUSE_THROTTLED_MESSAGE_DROPPED: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_THROTTLED_MESSAGE_QUEUED
         */
        AUCTION_HOUSE_THROTTLED_MESSAGE_QUEUED: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_THROTTLED_MESSAGE_RESPONSE_RECEIVED
         */
        AUCTION_HOUSE_THROTTLED_MESSAGE_RESPONSE_RECEIVED: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_THROTTLED_MESSAGE_SENT
         */
        AUCTION_HOUSE_THROTTLED_MESSAGE_SENT: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_THROTTLED_SPECIFIC_SEARCH_READY
         */
        AUCTION_HOUSE_THROTTLED_SPECIFIC_SEARCH_READY: null;

        /**
         * @see https://wow.gamepedia.com/AUCTION_HOUSE_THROTTLED_SYSTEM_READY
         */
        AUCTION_HOUSE_THROTTLED_SYSTEM_READY: null;

        /**
         * Fired when listing of multiple stacks fails (or is aborted?).
         * @see https://wow.gamepedia.com/AUCTION_MULTISELL_FAILURE
         */
        AUCTION_MULTISELL_FAILURE: null;

        /**
         * Fired when the client begins listing of multiple stacks
         * - **arg1**: total number of stacks the client has to list
         * @see https://wow.gamepedia.com/AUCTION_MULTISELL_START
         */
        AUCTION_MULTISELL_START: [number];

        /**
         * Fired when the client lists a stack as part of listing multiple stacks
         * - **arg1**: number of stacks listed so far
         * - **arg2**: total number of stacks in the current mass-listing operation
         * @see https://wow.gamepedia.com/AUCTION_MULTISELL_UPDATE
         */
        AUCTION_MULTISELL_UPDATE: [number, number];

        /**
         * unknown
         */
        AUTH_CHALLENGE_FINISHED: Unknown[];

        /**
         * unknown
         */
        AUTH_CHALLENGE_UI_INVALID: Unknown[];

        /**
         * Fired when you begin automatically following an ally
         * - **arg1**: The unit you are following. Not necessarily your target
         *     (in case of right-clicking a group member's portrait or using the
         *     "/follow" command)
         * @see https://wow.gamepedia.com/AUTOFOLLOW_BEGIN
         */
        AUTOFOLLOW_BEGIN: [UnitId];

        /**
         * Fired when the player ceases following an ally
         * @see https://wow.gamepedia.com/AUTOFOLLOW_END
         */
        AUTOFOLLOW_END: null;

        /**
         * unknown
         */
        AVOIDANCE_UPDATE: Unknown[];

        /**
         * Fired when a bag is (re)moved from its bagslot. Fires both for player bags and bank bags
         * - **arg1**: container ID
         * @see https://wow.gamepedia.com/BAG_CLOSED
         */
        BAG_CLOSED: [number];

        /**
         * unknown
         */
        BAG_NEW_ITEMS_UPDATED: Unknown[];

        /**
         * Fired when a lootable container (not an equipped bag) is opened
         * - **arg1**: container ID
         * @see https://wow.gamepedia.com/BAG_OPEN
         */
        BAG_OPEN: [number];

        /**
         * unknown
         */
        BAG_OVERFLOW_WITH_FULL_INVENTORY: Unknown[];

        /**
         * unknown
         */
        BAG_SLOT_FLAGS_UPDATED: Unknown[];

        /**
         * Fired when a bags inventory changes. Bag zero, the sixteen slot default backpack, may not fire on login. Upon login (or reloading the console)
         * this event fires even for bank bags. When moving an item in your inventory, this fires multiple times: once each for the source and destination
         * bag. If the bag involved is the default backpack, this event will also fire with a container ID of "-2" (twice if you are moving the item inside
         * the same bag).
         * - **arg1**: container ID
         * @see https://wow.gamepedia.com/BAG_UPDATE
         */
        BAG_UPDATE: [number];

        /**
         * Fired when a cooldown update call is sent to a bag
         * - **arg1**: container ID (may also be nil)
         * @see https://wow.gamepedia.com/BAG_UPDATE_COOLDOWN
         */
        BAG_UPDATE_COOLDOWN: [number | null];

        /**
         * Fired after all applicable BAG_UPDATE events for a specific action have been fired
         * @see https://wow.gamepedia.com/BAG_UPDATE_DELAYED
         */
        BAG_UPDATE_DELAYED: null;

        /**
         * Fired twice when the bank window is closed. Only at the first one of them the bank data is still available (GetNumBankSlots(),
         * GetContainerItemLink(), ...)
         * @see https://wow.gamepedia.com/BANKFRAME_CLOSED
         */
        BANKFRAME_CLOSED: null;

        /**
         * Fired when the bank frame is opened
         * @see https://wow.gamepedia.com/BANKFRAME_OPENED
         */
        BANKFRAME_OPENED: null;

        /**
         * unknown
         */
        BANK_BAG_SLOT_FLAGS_UPDATED: Unknown[];

        /**
         * unknown
         */
        BARBER_SHOP_APPEARANCE_APPLIED: Unknown[];

        /**
         * unknown
         */
        BARBER_SHOP_CLOSE: Unknown[];

        /**
         * unknown
         */
        BARBER_SHOP_COST_UPDATE: Unknown[];

        /**
         * unknown
         */
        BARBER_SHOP_OPEN: Unknown[];

        /**
         * Fired when the battlegrounds signup window is closed
         * @see https://wow.gamepedia.com/BATTLEFIELDS_CLOSED
         */
        BATTLEFIELDS_CLOSED: null;

        /**
         * Fired when the battlegrounds signup window is opened
         * @see https://wow.gamepedia.com/BATTLEFIELDS_SHOW
         */
        BATTLEFIELDS_SHOW: null;

        /**
         * unknown
         */
        BATTLEFIELD_MGR_DROP_TIMER_CANCELED: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_DROP_TIMER_STARTED: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_EJECTED: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_EJECT_PENDING: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_ENTERED: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_ENTRY_INVITE: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_QUEUE_INVITE: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_QUEUE_REQUEST_RESPONSE: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_QUEUE_STATUS_UPDATE: Unknown[];

        /**
         * unknown
         */
        BATTLEFIELD_MGR_STATE_CHANGE: Unknown[];

        /**
         * unknown
         */
        BATTLEGROUND_OBJECTIVES_UPDATE: Unknown[];

        /**
         * unknown
         */
        BATTLEGROUND_POINTS_UPDATE: Unknown[];

        /**
         * unknown
         */
        BATTLEPET_FORCE_NAME_DECLENSION: Unknown[];

        /**
         * unknown
         */
        BATTLETAG_INVITE_SHOW: Unknown[];

        /**
         * unknown
         */
        BATTLE_PET_CURSOR_CLEAR: Unknown[];

        /**
         * @see https://wow.gamepedia.com/BIDS_UPDATED
         */
        BIDS_UPDATED: null;

        /**
         * @see https://wow.gamepedia.com/BID_ADDED
         */
        BID_ADDED: [number];

        /**
         * unknown
         */
        BILLING_NAG_DIALOG: Unknown[];

        /**
         * Fired when Enchanting an unbound item
         * @see https://wow.gamepedia.com/BIND_ENCHANT
         */
        BIND_ENCHANT: null;

        /**
         * unknown
         */
        BLACK_MARKET_BID_RESULT: Unknown[];

        /**
         * unknown
         */
        BLACK_MARKET_CLOSE: Unknown[];

        /**
         * unknown
         */
        BLACK_MARKET_ITEM_UPDATE: Unknown[];

        /**
         * unknown
         */
        BLACK_MARKET_OPEN: Unknown[];

        /**
         * unknown
         */
        BLACK_MARKET_OUTBID: Unknown[];

        /**
         * unknown
         */
        BLACK_MARKET_UNAVAILABLE: Unknown[];

        /**
         * unknown
         */
        BLACK_MARKET_WON: Unknown[];

        /**
         * unknown
         */
        BN_BLOCK_LIST_UPDATED: Unknown[];

        /**
         * unknown
         */
        BN_CHAT_MSG_ADDON: Unknown[];

        /**
         * unknown
         */
        BN_CHAT_WHISPER_UNDELIVERABLE: Unknown[];

        /**
         * unknown
         */
        BN_CONNECTED: Unknown[];

        /**
         * unknown
         */
        BN_CUSTOM_MESSAGE_CHANGED: Unknown[];

        /**
         * unknown
         */
        BN_CUSTOM_MESSAGE_LOADED: Unknown[];

        /**
         * unknown
         */
        BN_DISCONNECTED: Unknown[];

        /**
         * unknown
         */
        BN_FRIEND_INFO_CHANGED: Unknown[];

        /**
         * unknown
         */
        BN_FRIEND_INVITE_ADDED: Unknown[];

        /**
         * unknown
         */
        BN_FRIEND_INVITE_LIST_INITIALIZED: Unknown[];

        /**
         * unknown
         */
        BN_FRIEND_INVITE_REMOVED: Unknown[];

        /**
         * unknown
         */
        BN_FRIEND_INVITE_SEND_RESULT: Unknown[];

        /**
         * unknown
         */
        BN_FRIEND_LIST_SIZE_CHANGED: Unknown[];

        /**
         * unknown
         */
        BN_INFO_CHANGED: Unknown[];

        /**
         * unknown
         */
        BN_NEW_PRESENCE: Unknown[];

        /**
         * unknown
         */
        BN_REQUEST_FOF_FAILED: Unknown[];

        /**
         * unknown
         */
        BN_REQUEST_FOF_SUCCEEDED: Unknown[];

        /**
         * unknown
         */
        BN_SELF_OFFLINE: Unknown[];

        /**
         * unknown
         */
        BN_SELF_ONLINE: Unknown[];

        /**
         * unknown
         */
        BN_SYSTEM_MESSAGE: Unknown[];

        /**
         * unknown
         */
        BONUS_ROLL_ACTIVATE: Unknown[];

        /**
         * unknown
         */
        BONUS_ROLL_DEACTIVATE: Unknown[];

        /**
         * unknown
         */
        BONUS_ROLL_FAILED: Unknown[];

        /**
         * unknown
         */
        BONUS_ROLL_RESULT: Unknown[];

        /**
         * unknown
         */
        BONUS_ROLL_STARTED: Unknown[];

        /**
         * Fired when the calendar API is busy or free
         * - **arg1**: busyFlag
         * @see https://wow.gamepedia.com/CALENDAR_ACTION_PENDING
         */
        CALENDAR_ACTION_PENDING: [boolean];

        /**
         * unknown
         */
        CALENDAR_CLOSE_EVENT: Unknown[];

        /**
         * unknown
         */
        CALENDAR_EVENT_ALARM: Unknown[];

        /**
         * unknown
         */
        CALENDAR_NEW_EVENT: Unknown[];

        /**
         * Fired after calling CalendarOpenEvent once the event data has been retrieved from the server
         * - **arg1**: calendar event types ("PLAYER", "GUILD", "ARENA", "HOLIDAY", "RAID_LOCKOUT")
         * @see https://wow.gamepedia.com/CALENDAR_OPEN_EVENT
         */
        CALENDAR_OPEN_EVENT: [CalendarEventType];

        /**
         * unknown
         */
        CALENDAR_UPDATE_ERROR: Unknown[];

        /**
         * unknown
         */
        CALENDAR_UPDATE_EVENT: Unknown[];

        /**
         * unknown
         */
        CALENDAR_UPDATE_EVENT_LIST: Unknown[];

        /**
         * Fired after CalendarEventSortInvites once the invite list has been sorted
         * @see https://wow.gamepedia.com/CALENDAR_UPDATE_INVITE_LIST
         */
        CALENDAR_UPDATE_INVITE_LIST: null;

        /**
         * unknown
         */
        CALENDAR_UPDATE_PENDING_INVITES: Unknown[];

        /**
         * unknown
         */
        CANCEL_GLYPH_CAST: Unknown[];

        /**
         * Fired when a player cancels a roll on an item
         * - **arg1**: rollID
         * @see https://wow.gamepedia.com/CANCEL_LOOT_ROLL
         */
        CANCEL_LOOT_ROLL: [number];

        /**
         * unknown
         */
        CANCEL_SUMMON: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_COMPLETED: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_DEATH_COUNT_UPDATED: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_KEYSTONE_RECEPTABLE_OPEN: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_KEYSTONE_SLOTTED: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_LEADERS_UPDATE: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_MAPS_UPDATE: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_NEW_RECORD: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_RESET: Unknown[];

        /**
         * unknown
         */
        CHALLENGE_MODE_START: Unknown[];

        /**
         * Fired when number of players in a channel changes but only if this channel is visible in ChannelFrame (it mustn't be hidden by a
         * collapsed category header)
         * - **arg1**: channel id (item number in Blizzards ChannelFrame -> quod vide API GetChannelDisplayInfo)
         * - **arg2**: number of players in channel
         * @see https://wow.gamepedia.com/CHANNEL_COUNT_UPDATE
         */
        CHANNEL_COUNT_UPDATE: [number, number];

        /**
         * Fired when user changes selected channel in Blizzards ChannelFrame
         * - **arg1**: channel id (item number in Blizzards ChannelFrame -> quod vide API GetChannelDisplayInfo)
         * @see https://wow.gamepedia.com/CHANNEL_FLAGS_UPDATED
         */
        CHANNEL_FLAGS_UPDATED: [number];

        /**
         * unknown
         */
        CHANNEL_INVITE_REQUEST: Unknown[];

        /**
         * Fired when user is asked for a password (normally after trying to join a channel without a password or with a wrong one)
         * - **arg1**: channel name
         * @see https://wow.gamepedia.com/CHANNEL_PASSWORD_REQUEST
         */
        CHANNEL_PASSWORD_REQUEST: [string];

        /**
         * Fired when user changes selected channel in Blizzards ChannelFrame or number of players in currently selected channel changes
         * - **arg1**: channel id (item number in Blizzards ChannelFrame -> quod vide API GetChannelDisplayInfo)
         * - **arg2**: number of players in channel
         * @see https://wow.gamepedia.com/CHANNEL_ROSTER_UPDATE
         */
        CHANNEL_ROSTER_UPDATE: [number, number];

        /**
         * Fired when Channel UI should change (e.g. joining / leaving a channel causes this event to fire)
         * @see https://wow.gamepedia.com/CHANNEL_UI_UPDATE
         */
        CHANNEL_UI_UPDATE: null;

        /**
         * unknown
         */
        CHANNEL_VOICE_UPDATE: Unknown[];

        /**
         * unknown
         */
        CHARACTER_ITEM_FIXUP_NOTIFICATION: Unknown[];

        /**
         * Fired when the player's available talent points change
         * - **arg1**: indicates number of talent points changed: -1 indicates one used (learning a talent), 1 indicates one gained (leveling)
         * @see https://wow.gamepedia.com/CHARACTER_POINTS_CHANGED
         */
        CHARACTER_POINTS_CHANGED: [number];

        /**
         * unknown
         */
        CHARACTER_UPGRADE_SPELL_TIER_SET: Unknown[];

        /**
         * unknown
         */
        CHAT_COMBAT_MSG_ARENA_POINTS_GAIN: Unknown[];

        /**
         * Fired when a player in your vicinity completes an achievement
         * - **arg1**: The full body of the broadcast message
         * - **arg2-5**: The name of player who has just completed the achievement
         * - **arg7-8...**: Some integer
         * @see https://wow.gamepedia.com/CHAT_MSG_ACHIEVEMENT
         */
        CHAT_MSG_ACHIEVEMENT: [string, string, string, string, string, Unknown, ...number[]];

        /**
         * Fired when the client receives a message from SendAddonMessage
         * - **arg1**: prefix
         * - **arg2**: message
         * - **arg3**: distribution type ("PARTY", "RAID", "GUILD", "BATTLEGROUND" or "WHISPER")
         * - **arg4**: sender (e.g. "Arthas-Silvermoon")
         * @see https://wow.gamepedia.com/CHAT_MSG_ADDON
         */
        CHAT_MSG_ADDON: [string, string, AddonMessageType, string];

        /**
         * Fired when the client receives an AFK auto-response
         * - **arg1**: AFK response message
         * - **arg2**: author
         * - **arg3**: chat lineId
         * - **arg4**: sender guid
         * @see https://wow.gamepedia.com/CHAT_MSG_AFK
         */
        CHAT_MSG_AFK: [string, string, number, Guid];

        /**
         * Fired for battleground-event messages that are in blue by default because they are about Alliance actions, e.g. assaulting a
         * graveyard or capture point, or picking up a flag
         * - **arg1**: Battleground Message (eg. "The Alliance has taken the Blacksmith!")
         * @see https://wow.gamepedia.com/CHAT_MSG_BG_SYSTEM_ALLIANCE
         */
        CHAT_MSG_BG_SYSTEM_ALLIANCE: [string];

        /**
         * Fired for battleground-event messages that are in red by default because they are about Horde actions
         * - **arg1**: Battleground Message (eg. "The Horde has taken the Blacksmith!")
         * @see https://wow.gamepedia.com/CHAT_MSG_BG_SYSTEM_HORDE
         */
        CHAT_MSG_BG_SYSTEM_HORDE: [string];

        /**
         * Fired for battleground-event messages that are displayed in a faction-neutral color by default
         * - **arg1**: Battleground Message (eg. "Let the battle for Warsong Gulch begin.")
         */
        CHAT_MSG_BG_SYSTEM_NEUTRAL: [string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_BN_INLINE_TOAST_ALERT: Unknown[];

        /**
         * unknown
         */
        CHAT_MSG_BN_INLINE_TOAST_BROADCAST: Unknown[];

        /**
         * Fired when the client receives a channel message
         *
         * - **arg1**: chat message
         * - **arg2**: author
         * - **arg3**: language
         * - **arg4**: channel name with number ex: "1. General - Stormwind City"
         * - **arg5**: target
         * - **arg6**: AFK/DND/GM "CHAT_FLAG_"..arg6 flags
         * - **arg7**: zone ID used for generic system channels (1 for General, 2 for Trade, 22 for LocalDefense, 23 for WorldDefense and 26 for LFG)
         * - **arg8**: channel number
         * - **arg9**: channel name without number (this is _sometimes_ in lowercase)
         * - **arg11**: Chat lineID used for reporting the chat message
         * - **arg12**: Sender GUID
         * @see https://wow.gamepedia.com/CHAT_MSG_CHANNEL
         */
        CHAT_MSG_CHANNEL: [string, string, string, string, string, ChatFlag, number, number, string, Unknown, number, Guid];

        /**
         * Fired when someone joins a chat channel you are in
         *
         * - **arg1**: seems to be empty
         * - **arg2**: Name of the player that joined
         * - **arg3**: seems to be empty again
         * - **arg4**: Number and name of the channel (e.g. "5. MyOwnChannel")
         * - **arg5**: Channel number
         * - **arg6**: channel name without number (this is sometimes in lowercase)
         * @see https://wow.gamepedia.com/CHAT_MSG_CHANNEL_JOIN
         */
        CHAT_MSG_CHANNEL_JOIN: [Unknown, string, Unknown, string, number, string];

        /**
         * Fired when a player leaves a channel that you are currently inside
         *
         * - **arg1**: Appears to be left blank
         * - **arg2**: Player name that left
         * - **arg3**: Channel name with number
         * - **arg4**: Appears to be left zero and no longer the channel number
         * - **arg5**: Channel number
         * - **arg6**: Channel name without number
         * @see https://wow.gamepedia.com/CHAT_MSG_CHANNEL_LEAVE
         */
        CHAT_MSG_CHANNEL_LEAVE: [Unknown, string, string, 0, number, string];

        /**
         * Fired when ListChannels() or ListChannelByName() is called, and the message is displayed in the chat frame
         * - **arg1**: The list of values displayed by ListChannels() or ListChannelByName() in one string
         * - **arg4**: The number and name of the channel the message came from. ie: "1. General"
         * @see https://wow.gamepedia.com/CHAT_MSG_CHANNEL_LIST
         */
        CHAT_MSG_CHANNEL_LIST: [string, Unknown, Unknown, string];

        /**
         * Fired when you enter or leave a chat channel (or a channel was recently throttled)
         * - **arg1**: type ( "YOU_JOINED" if you joined a channel, or "YOU_LEFT" if you left, or "THROTTLED" if channel was throttled )
         * - **arg4**: Channel name with number (e.g. "6. TestChannel")
         * - **arg7**: Channel Type (e.g. 0 for any user channel, 1 for system-channel "General", 2 for "Trade")
         * - **arg8**: Channel Number
         * - **arg9**: Channel name without number
         * @see https://wow.gamepedia.com/CHAT_MSG_CHANNEL_NOTICE
         */
        CHAT_MSG_CHANNEL_NOTICE: [ChatJoinLeftType, Unknown, Unknown, string, Unknown, Unknown, number, number, string];

        /**
         * Fired when something changes in the channel like moderation enabled, user is kicked, announcements changed and so on. CHAT_*_NOTICE in
         * GlobalStrings.lua has a full list of available types
         * - **arg1**: type ("ANNOUNCEMENTS_OFF", "ANNOUNCEMENTS_ON", "BANNED", "OWNER_CHANGED", "INVALID_NAME", "INVITE", "MODERATION_OFF",
         * "MODERATION_ON", "MUTED", "NOT_MEMBER", "NOT_MODERATED", "SET_MODERATOR", "UNSET_MODERATOR" )
         * - **arg2**: If arg5 has a value then this is the user affected ( eg: "Player Foo has been kicked by Bar" ), if arg5 has no value then it's
         * the person who caused the event ( eg: "Channel Moderation has been enabled by Bar" )
         * - **arg3**: Channel name with number
         * - **arg4**: Player that caused the event (eg "Player Foo has been kicked by Bar" )
         * @see https://wow.gamepedia.com/CHAT_MSG_CHANNEL_NOTICE_USER
         */
        CHAT_MSG_CHANNEL_NOTICE_USER: [ChatUserNoticeType, string, Unknown, string, string];

        /**
         * Fires when player's faction changes. i.e.: "Your reputation with Timbermaw Hold has very slightly increased."
         * - **arg1**: chat message
         * @since 1.9
         * @see https://wow.gamepedia.com/CHAT_MSG_COMBAT_FACTION_CHANGE
         */
        CHAT_MSG_COMBAT_FACTION_CHANGE: [string, ...Unknown[]];

        /**
         * Fires when the player gains any amount of honor, anything from an honorable kill to bonus honor awarded
         * - **arg1**: chat message (format: "%s dies, honorable kill Rank: %s (Estimated Honor Points: %d)" or "You have been awarded %d honor.")
         * @see https://wow.gamepedia.com/CHAT_MSG_COMBAT_HONOR_GAIN
         */
        CHAT_MSG_COMBAT_HONOR_GAIN: [string];

        /**
         * Fires when your equipment takes durability loss from death, and likely other situations as well.(no longer fires on reputation changes as of 1.9)
         * @see https://wow.gamepedia.com/CHAT_MSG_COMBAT_MISC_INFO
         */
        CHAT_MSG_COMBAT_MISC_INFO: null;

        /**
         * Fires when you gain XP from killing a creature or finishing a quest. Does not fire if you gain no XP from killing a creature
         * - **arg1**: chat message
         * @see https://wow.gamepedia.com/CHAT_MSG_COMBAT_XP_GAIN
         */
        CHAT_MSG_COMBAT_XP_GAIN: [string];

        /**
         * Fires when you gain currency other than money (for example Chef's Awards or Champion's Seals).
         * - **arg1**: chat message (for example, "You receive currency: Chef's Award x1.").
         * @see https://wow.gamepedia.com/CHAT_MSG_CURRENCY
         */
        CHAT_MSG_CURRENCY: [string];

        /**
         * Fired when the client receives a Do-Not-Disturb auto-response
         * - **arg1**: DND response message
         * - **arg2**: author
         * @see https://wow.gamepedia.com/CHAT_MSG_DND
         */
        CHAT_MSG_DND: [string, string, ...Unknown[]];

        /**
         * Fired on sending or receiving a custom emote (one used by /e, /emote or a send chat message command with the emote flag)
         * - **arg1**: Message that was sent/received
         * - **arg2**: Name of the player who sent the message
         * @see https://wow.gamepedia.com/CHAT_MSG_DND
         */
        CHAT_MSG_EMOTE: [string, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_FILTERED: Unknown[];

        /**
         * Fired when a message is sent or received in the Guild channel
         * - **arg1**: Message that was sent
         * - **arg2**: Author
         * - **arg3**: Language that the message was sent in
         * @see https://wow.gamepedia.com/CHAT_MSG_GUILD
         */
        CHAT_MSG_GUILD: [string, string, string, ...Unknown[]];

        /**
         * Fired when a guild member completes an achievement
         * - **arg1**: The full body of the achievement broadcast message
         * - **arg2, arg5**: Guildmember Name
         * @see https://wow.gamepedia.com/CHAT_MSG_GUILD_ACHIEVEMENT
         */
        CHAT_MSG_GUILD_ACHIEVEMENT: [string, string, Unknown, Unknown, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_GUILD_ITEM_LOOTED: Unknown[];

        /**
         * Fired when you whisper a player that is ignoring you When testing this event the character name is sent twice as arg1 and arg2,
         * Blizzard appears to use arg2 and ignores arg1.
         * - **arg1**: Character name of who you tried to message
         * - **arg2**: Character name of who you tried to message
         * @see https://wow.gamepedia.com/CHAT_MSG_IGNORED
         */
        CHAT_MSG_IGNORED: [string, string];

        /**
         * unknown
         */
        CHAT_MSG_INSTANCE_CHAT: Unknown[];

        /**
         * unknown
         */
        CHAT_MSG_INSTANCE_CHAT_LEADER: Unknown[];

        /**
         * Fired when loot text is sent to the chat window (someone selects need, greed, passes, rolls, receives). This also fires messages like
         * "Person creates <item>" via tradeskills, and "Person receives <item>" via a trade window. Does not fire for receiving currency
         * (use CHAT_MSG_CURRENCY for this).
         * - **arg1**: chat message
         * - **arg2**: name of the player who received the loot
         * @see https://wow.gamepedia.com/CHAT_MSG_LOOT
         */
        CHAT_MSG_LOOT: [string, Unknown, Unknown, Unknown, string, ...Unknown[]];

        /**
         * Fired when a unit loots money
         * - **arg1**: chat message
         * @see https://wow.gamepedia.com/CHAT_MSG_MONEY
         */
        CHAT_MSG_MONEY: [string];

        /**
         * Fired for emotes from a monster, such as 'Murloc Forager attempts to run away in fear!'
         * - **arg1**: The body of the emote: '%s attempts to run away in fear!'
         * - **arg2**: The name of the monster: 'Murloc Forager'
         * @see https://wow.gamepedia.com/CHAT_MSG_MONSTER_EMOTE
         */
        CHAT_MSG_MONSTER_EMOTE: [string, string];

        /**
         * unknown
         */
        CHAT_MSG_MONSTER_PARTY: Unknown[];

        /**
         * Fired when a NPC says something
         * - **arg1**: message
         * - **arg2**: NPC name
         * - **arg3**: Language used
         * - **arg4**: unused
         * - **arg5**: Receiver
         * @see https://wow.gamepedia.com/CHAT_MSG_MONSTER_SAY
         */
        CHAT_MSG_MONSTER_SAY: [string, string, string, Unknown, string];

        /**
         * Fired when a NPC whispers you something
         * @see https://wow.gamepedia.com/CHAT_MSG_MONSTER_WHISPER
         */
        CHAT_MSG_MONSTER_WHISPER: null;

        /**
         * Fired when a NPC yells, example would be the yells during an Alterac Valley from the Herald or a raid boss
         * - **arg1**: message
         * - **arg2**: NPC Name (eg: Onyxia)
         * @see https://wow.gamepedia.com/CHAT_MSG_MONSTER_YELL
         */
        CHAT_MSG_MONSTER_YELL: [string, string];

        /**
         * Fired when a message is sent or received in the Guild Officer channel
         * - **arg1**: Message that was received
         * - **arg2**: Author
         * - **arg3**: Language used
         * @see https://wow.gamepedia.com/CHAT_MSG_OFFICER
         */
        CHAT_MSG_OFFICER: [string, string, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_OPENING: Unknown[];

        /**
         * Fired when a message is sent or received in the Party channel
         * - **arg1**: Message that was received
         * - **arg2**: Author
         * - **arg3**: Language used
         * @see https://wow.gamepedia.com/CHAT_MSG_PARTY
         */
        CHAT_MSG_PARTY: [string, string, string, ...Unknown[]];

        /**
         * Fired when a message is sent or received by the party leader
         * - **arg1**: The message that was received
         * - **arg2**: Author
         * - **arg3**: Language used
         * @see https://wow.gamepedia.com/CHAT_MSG_PARTY_LEADER
         */
        CHAT_MSG_PARTY_LEADER: [string, string, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_PET_BATTLE_COMBAT_LOG: Unknown[];

        /**
         * unknown
         */
        CHAT_MSG_PET_BATTLE_INFO: Unknown[];

        /**
         * unknown
         */
        CHAT_MSG_PET_INFO: Unknown[];

        /**
         * Fired when a message is sent or received in the Raid
         * - **arg1**: message
         * - **arg2**: author
         * - **arg3**: language
         * @see https://wow.gamepedia.com/CHAT_MSG_RAID
         */
        CHAT_MSG_RAID: [string, string, string, ...Unknown[]];

        /**
         * Emote message
         * - **arg2**: name of the boss
         * - **arg5**: name of the targeted player
         * @see https://wow.gamepedia.com/CHAT_MSG_RAID_BOSS_EMOTE
         */
        CHAT_MSG_RAID_BOSS_EMOTE: [Unknown, string, Unknown, Unknown, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_RAID_BOSS_WHISPER: Unknown[];

        /**
         * Fired when a message is sent or received from the raid leader
         * - **arg1**: message
         * - **arg2**: author
         * - **arg3**: language
         * @see https://wow.gamepedia.com/CHAT_MSG_RAID_LEADER
         */
        CHAT_MSG_RAID_LEADER: [string, string, string, ...Unknown[]];

        /**
         * Fired when a warning message is sent or received from the raid leader
         * - **arg1**: message
         * - **arg2**: author
         * - **arg3**: language
         * @see https://wow.gamepedia.com/CHAT_MSG_RAID_WARNING
         */
        CHAT_MSG_RAID_WARNING: [string, string, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_RESTRICTED: Unknown[];

        /**
         * Fired when a message is sent or received in the Say channel
         * - **arg1**: message
         * - **arg2**: author
         * - **arg3**: language
         * @see https://wow.gamepedia.com/CHAT_MSG_SAY
         */
        CHAT_MSG_SAY: [string, string, string, ...Unknown[]];

        /**
         * Fired when some chat messages about skills are displayed
         * - **arg1**: The content of the chat message
         * @see https://wow.gamepedia.com/CHAT_MSG_SKILL
         */
        CHAT_MSG_SKILL: [string];

        /**
         * Fired when a system chat message (they are displayed in yellow) is received
         * - **arg1**: The content of the chat message
         * @see https://wow.gamepedia.com/CHAT_MSG_SYSTEM
         */
        CHAT_MSG_SYSTEM: [string];

        /**
         * Fired when a raid target icon is set. This is used by the chat filter, if the player is watching raid icons in chat output
         * (in the Filters right-click menu, under Other, look for Target Icons).
         * - **arg1**: The formatted message to be displayed in the chat window. arg1 is formatted from the global variable TARGET_ICON_SET,
         * which by default in an English client is set to the string "|Hplayer:%s|h[%s]|h sets |TInterface\\TargetingFrame\\UI-RaidTargetingIcon_%d:0|t
         * on %s."
         * @see https://wow.gamepedia.com/CHAT_MSG_SYSTEM
         */
        CHAT_MSG_TARGETICONS: [string, ...Unknown[]];

        /**
         * Fired for emotes with an emote token. /dance, /healme, etc
         * - **arg1**: Emote Message
         * - **arg2**: Name of person who emoted
         * @see https://wow.gamepedia.com/CHAT_MSG_TEXT_EMOTE
         */
        CHAT_MSG_TEXT_EMOTE: [string, string, ...Unknown[]];

        /**
         * unknown
         */
        CHAT_MSG_TRADESKILLS: Unknown[];

        /**
         * Fired when a whisper is received from another player
         *
         * - **arg1**: Message received
         * - **arg2**: Author (e.g. "Arthas-Silvermoon")
         * - **arg3**: Language (or nil if universal, like messages from GM) (always seems to be an empty string; argument may have been kicked
         * because whispering in non-standard language doesn't seem to be possible [any more?])
         * - **arg6**: status (like "DND" or "GM")
         * - **arg7**: message id (for reporting spam purposes?) (default: 0)
         * - **arg8**: unknown (default: 0)
         * @see https://wow.gamepedia.com/CHAT_MSG_WHISPER
         */
        CHAT_MSG_WHISPER: [string, string, string, Unknown, Unknown, ChatFlag, number, number, ...Unknown[]];

        /**
         * Fired when the player sends a whisper to another player
         * - **arg1**: Message sent
         * - **arg2**: Player who was sent the whisper
         * - **arg3**: Language
         * @see https://wow.gamepedia.com/CHAT_MSG_WHISPER_INFORM
         */
        CHAT_MSG_WHISPER_INFORM: [string, string, string, ...Unknown[]];

        /**
         * Fired when a message is sent or received in the Yell channel
         * - **arg1**: Message that was received
         * - **arg2**: Author
         * - **arg3**: Language used
         * @see https://wow.gamepedia.com/https://wow.gamepedia.com/CHAT_MSG_YELL
         */
        CHAT_MSG_YELL: [string, string, string, ...Unknown[]];

        /**
         * unknown
         */
        CINEMATIC_START: Unknown[];

        /**
         * unknown
         */
        CINEMATIC_STOP: Unknown[];

        /**
         * unknown
         */
        CLEAR_BOSS_EMOTES: Unknown[];

        /**
         * unknown
         */
        CLOSE_INBOX_ITEM: Unknown[];

        /**
         * Fired when the guild dress frame is closed
         * @see https://wow.gamepedia.com/CLOSE_TABARD_FRAME
         */
        CLOSE_TABARD_FRAME: null;

        /**
         * Supposed to fire whenever the world map is closed/hidden, though it doesn't. A workaround for this is to use "WORLD_MAP_UPDATE" to
         * set a global variable to use elsewhere with an OnUpdate function
         * @see https://wow.gamepedia.com/CLOSE_WORLD_MAP
         */
        CLOSE_WORLD_MAP: null;

        /**
         * COMBAT_LOG_EVENT and COMBAT_LOG_EVENT_UNFILTERED no longer have any payload. To retrieve the information previously carried in the payload,
         * use CombatLogGetCurrentEventInfo(). The data structure is unchanged
         * @see https://wow.gamepedia.com/COMBAT_LOG_EVENT
         */
        COMBAT_LOG_EVENT: null;

        /**
         * COMBAT_LOG_EVENT and COMBAT_LOG_EVENT_UNFILTERED no longer have any payload. To retrieve the information previously carried in the payload,
         * use CombatLogGetCurrentEventInfo(). The data structure is unchanged
         * @see https://wow.gamepedia.com/COMBAT_LOG_EVENT_UNFILTERED
         */
        COMBAT_LOG_EVENT_UNFILTERED: null;

        /**
         * unknown
         */
        COMBAT_RATING_UPDATE: Unknown[];

        /**
         * Fired when the currently watched entity (as set by the CombatTextSetActiveUnit function) takes or avoids damage, receives heals, gains
         * mana/energy/rage, etc. This event is used by Blizzard's floating combat text addon
         * - **arg1**: Combat message type
         * - **arg2**: For damage, power gain and honor gains, this is the amount taken/gained. For heals, this is the healer name. For auras, the
         * aura name. For block/resist/absorb messages where arg3 is not nil (indicating a partial block/resist/absorb) this is the amount taken.
         * For faction gain, this is the faction name. For the SPELL_ACTIVE message, the name of the spell (abilities like Overpower and Riposte
         * becoming active will trigger this message).
         * - **arg3**: For heals, the amount healed. For block/resist/absorb messages, this is the amount blocked/resisted/absorbed, or nil if all
         * damage was avoided. For faction gain, the amount of reputation gained
         * @see https://wow.gamepedia.com/COMBAT_TEXT_UPDATE
         */
        COMBAT_TEXT_UPDATE: [CombatTextType, number | string, number | string];

        /**
         * Fired when the character logs in and the server sends the greeting text. (Currently "Scammers are trying harder than ever to phish for your
         * account information!...") This is not fired when reloading the UI
         * @see https://wow.gamepedia.com/COMMENTATOR_ENTER_WORLD
         */
        COMMENTATOR_ENTER_WORLD: null;

        /**
         * @see https://wow.gamepedia.com/COMMENTATOR_IMMEDIATE_FOV_UPDATE
         */
        COMMENTATOR_IMMEDIATE_FOV_UPDATE: [number];

        /**
         * unknown
         */
        COMMENTATOR_MAP_UPDATE: Unknown[];

        /**
         * unknown
         */
        COMMENTATOR_PARTY_INFO_REQUEST: Unknown[];

        /**
         * unknown
         */
        COMMENTATOR_PLAYER_NAME_OVERRIDE_UPDATE: Unknown[];

        /**
         * unknown
         */
        COMMENTATOR_PLAYER_UPDATE: Unknown[];

        /**
         * @see https://wow.gamepedia.com/COMMODITY_PRICE_UNAVAILABLE
         */
        COMMODITY_PRICE_UNAVAILABLE: null;

        /**
         * - **arg1**: Updated unit price
         * - **arg2**: Updated total price
         * @see https://wow.gamepedia.com/COMMODITY_PRICE_UPDATED
         */
        COMMODITY_PRICE_UPDATED: [number, number];

        /**
         * - **arg1**: Item ID
         * - **arg2**: Quantity
         * @see https://wow.gamepedia.com/COMMODITY_PURCHASED
         */
        COMMODITY_PURCHASED: [number, number];

        /**
         * @see https://wow.gamepedia.com/COMMODITY_PURCHASE_FAILED
         */
        COMMODITY_PURCHASE_FAILED: null;

        /**
         * @see https://wow.gamepedia.com/COMMODITY_PURCHASE_SUCCEEDED
         */
        COMMODITY_PURCHASE_SUCCEEDED: null;

        /**
         * @see https://wow.gamepedia.com/COMMODITY_SEARCH_RESULTS_ADDED
         */
        COMMODITY_SEARCH_RESULTS_ADDED: [number];

        /**
         * @see https://wow.gamepedia.com/COMMODITY_SEARCH_RESULTS_UPDATED
         */
        COMMODITY_SEARCH_RESULTS_UPDATED: [number];

        /**
         * unknown
         */
        COMPACT_UNIT_FRAME_PROFILES_LOADED: Unknown[];

        /**
         * unknown
         */
        COMPANION_LEARNED: Unknown[];

        /**
         * unknown
         */
        COMPANION_UNLEARNED: Unknown[];

        /**
         * If the type is nil, the UI should update if it's visible, regardless of which type it's managing. If the type is non-nil, then it will be
         * either "CRITTER" or "MOUNT" and that signifies that the active companion has changed and the UI should update if it's currently showing
         * that type
         * @since 3.0.3
         * @see https://wow.gamepedia.com/COMPANION_UPDATE
         */
        COMPANION_UPDATE: null;

        /**
         * unknown
         */
        CONFIRM_BEFORE_USE: Unknown[];

        /**
         * unknown
         */
        CONFIRM_BINDER: Unknown[];

        /**
         * Fires when you try to roll "disenchant" for and item which Binds on Pickup
         * - **arg1**: RollId
         * - **arg2**: roll (Need: 1, Greed: 2, Disenchant: 3; as in RollOnLoot(RollID, roll))
         * @since 3.3.0
         * @see https://wow.gamepedia.com/CONFIRM_DISENCHANT_ROLL
         */
        CONFIRM_DISENCHANT_ROLL: [number, DisenchantRollType];

        /**
         * Fires when you try to roll "need" or "greed" for and item which Binds on Pickup
         * - **arg1**: RollId
         * - **arg2**: roll (Need: 1, Greed: 2, Disenchant: 3; as in RollOnLoot(RollID, roll))
         * @see https://wow.gamepedia.com/CONFIRM_LOOT_ROLL
         */
        CONFIRM_LOOT_ROLL: [number, DisenchantRollType];

        /**
         * unknown
         */
        CONFIRM_SUMMON: Unknown[];

        /**
         * Fires when the user selects the "Yes, I do." confirmation prompt after speaking to a class trainer and choosing to unlearn their talents
         * - **arg1**: Cost (260000 is equivalent to 26g). This value is then passed to different frames, depending on where the event is
         * being handled, by calling the MoneyFrame_Update() function. In the case of this event, the cost of the transaction is displayed in
         * a small static popup, and the user prompted for confirmation one final time
         * @see https://wow.gamepedia.com/CONFIRM_TALENT_WIPE
         */
        CONFIRM_TALENT_WIPE: [number];

        /**
         * Accept durability(!) loss in exchange for his body back
         * @description History: Way back before WoW was released, you lost experience rather than durability when you resurrected at a spirit healer
         * @see https://wow.gamepedia.com/CONFIRM_XP_LOSS
         */
        CONFIRM_XP_LOSS: null;

        /**
         * unknown
         */
        CONSOLE_CLEAR: Unknown[];

        /**
         * unknown
         */
        CONSOLE_COLORS_CHANGED: Unknown[];

        /**
         * unknown
         */
        CONSOLE_FONT_SIZE_CHANGED: Unknown[];

        /**
         * unknown
         */
        CONSOLE_MESSAGE: Unknown[];

        /**
         * unknown
         */
        CONTRIBUTION_COLLECTOR_CLOSE: Unknown[];

        /**
         * unknown
         */
        CONTRIBUTION_COLLECTOR_OPEN: Unknown[];

        /**
         * unknown
         */
        CONTRIBUTION_COLLECTOR_PENDING: Unknown[];

        /**
         * unknown
         */
        CONTRIBUTION_COLLECTOR_UPDATE: Unknown[];

        /**
         * unknown
         */
        CONTRIBUTION_COLLECTOR_UPDATE_SINGLE: Unknown[];

        /**
         * unknown
         */
        CORPSE_IN_INSTANCE: Unknown[];

        /**
         * Fired when the player is in range of his body
         * @see https://wow.gamepedia.com/CORPSE_IN_RANGE
         */
        CORPSE_IN_RANGE: null;

        /**
         * Fired when the player is out of range of his body
         * @see https://wow.gamepedia.com/CORPSE_OUT_OF_RANGE
         */
        CORPSE_OUT_OF_RANGE: null;

        /**
         * unknown
         */
        CRITERIA_COMPLETE: Unknown[];

        /**
         * unknown
         */
        CRITERIA_EARNED: Unknown[];

        /**
         * Fired when the criteria for an achievement has changed. Fires several times at once, presumably for different levels of achievements
         * and yet-unknown feats of strength, but this has yet to be confirmed and there may be another use for this Event
         * @see https://wow.gamepedia.com/CRITERIA_UPDATE
         */
        CRITERIA_UPDATE: null;

        /**
         * Fired every time the UI need to draw the currencies list. So it fire on login, on every loading screen and on reloadui, this is usefull
         * to be sure that currencies informations are available after login, even on a crowded server in the evening with a lot of addons loaded
         * @description As of 5.0.5 this is no longer true. After some testing it seems currencies are available sooner than in Cataclysm, so when
         * PLAYER_ENTERING_WORLD fire your can gather currencies informations
         * @see https://wow.gamepedia.com/CURRENCY_DISPLAY_UPDATE
         */
        CURRENCY_DISPLAY_UPDATE: null;

        /**
         * Fired when the spell being cast is changed
         * @see https://wow.gamepedia.com/CURRENT_SPELL_CAST_CHANGED
         */
        CURRENT_SPELL_CAST_CHANGED: null;

        /**
         * Fired when the player right-clicks terrain, and on mouseover before UPDATE_MOUSEOVER_UNIT and on mouseout after UPDATE_MOUSEOVER_UNIT.
         * This excludes doodads, player characters, and NPCs that lack interaction
         * @see https://wow.gamepedia.com/CURSOR_UPDATE
         */
        CURSOR_UPDATE: null;

        /**
         * Fired when a CVar is changed
         * - **arg1**: cvarname
         * - **arg2**: value
         * @see https://wow.gamepedia.com/CVAR_UPDATE
         */
        CVAR_UPDATE: [string, any];

        /**
         * unknown
         */
        DEBUG_MENU_TOGGLED: Unknown[];

        /**
         * Fired when the player attempts to destroy an item
         * - **arg1**: item name
         * @see https://wow.gamepedia.com/DELETE_ITEM_CONFIRM
         */
        DELETE_ITEM_CONFIRM: [string];

        /**
         * Fired when SetAllowLowLevelRaid is used to disable low-level raids on the character
         * @see https://wow.gamepedia.com/DISABLE_LOW_LEVEL_RAID
         */
        DISABLE_LOW_LEVEL_RAID: null;

        /**
         * unknown
         */
        DISABLE_TAXI_BENCHMARK: Unknown[];

        /**
         * unknown
         */
        DISABLE_XP_GAIN: Unknown[];

        /**
         * unknown
         */
        DISPLAY_SIZE_CHANGED: Unknown[];

        /**
         * Fired when a duel is finished
         * @see https://wow.gamepedia.com/DUEL_FINISHED
         */
        DUEL_FINISHED: null;

        /**
         * Fired when the player returns in bounds after being out of bounds during a duel
         * @see https://wow.gamepedia.com/DUEL_INBOUNDS
         */
        DUEL_INBOUNDS: null;

        /**
         * Fired when the player leaves the bounds of the duel
         * @see https://wow.gamepedia.com/DUEL_OUTOFBOUNDS
         */
        DUEL_OUTOFBOUNDS: null;

        /**
         * Fired when the player is challenged to a duel
         * - **arg1**: opponent name
         * @see https://wow.gamepedia.com/DUEL_REQUESTED
         */
        DUEL_REQUESTED: [string];

        /**
         * Encounter Journal: Fires when the Difficulty Index changes
         * - **arg1**: newDifficulty
         * @see https://wow.gamepedia.com/EJ_DIFFICULTY_UPDATE
         */
        EJ_DIFFICULTY_UPDATE: [Difficulty];

        /**
         * Encounter Journal: Fires when Item Loot Data is available
         * - **arg1**: itemId
         * @see https://wow.gamepedia.com/EJ_LOOT_DATA_RECIEVED
         */
        EJ_LOOT_DATA_RECIEVED: [number];

        /**
         * unknown
         */
        ENABLE_DECLINE_GUILD_INVITE: Unknown[];

        /**
         * Fired when SetAllowLowLevelRaid is used to enable low-level raids on the character
         * @see https://wow.gamepedia.com/ENABLE_LOW_LEVEL_RAID
         */
        ENABLE_LOW_LEVEL_RAID: null;

        /**
         * unknown
         */
        ENABLE_TAXI_BENCHMARK: Unknown[];

        /**
         * unknown
         */
        ENABLE_XP_GAIN: Unknown[];

        /**
         * Fires at the end of an instanced encounter
         * - **arg1**: ID for the specific encounter that ended (Does not match the encounterIDs used in the Encounter Journal)
         * - **arg2**: Name of the encounter that ended
         * - **arg3**: ID representing the difficulty of the encounter (DifficultyID)
         * - **arg4**: Group size for the encounter. For example, 5 for a Dungeon encounter, 20 for a Mythic raid. The number of raiders
         * participating is reflected in "flex" raids
         * - **arg5**: 1 for a successful kill. 0 for a wipe
         * @see https://wow.gamepedia.com/ENCOUNTER_END
         */
        ENCOUNTER_END: [number, string, Difficulty, number, Flag];

        /**
         * unknown
         */
        ENCOUNTER_LOOT_RECEIVED: Unknown[];

        /**
         * Fires at the start of an instanced encounter
         * - **arg1**: ID for the specific encounter started (Does not match the encounterIDs used in the Encounter Journal)
         * - **arg2**: Name of the encounter started
         * - **arg3**: ID representing the difficulty of the encounter (DifficultyID)
         * - **arg4**: Group size for the encounter. For example, 5 for a Dungeon encounter, 20 for a Mythic raid. The number of raiders
         * participating is reflected in "flex" raids
         * @see https://wow.gamepedia.com/ENCOUNTER_START
         */
        ENCOUNTER_START: [number, string, Difficulty, number];

        /**
         * unknown
         */
        END_BOUND_TRADEABLE: Unknown[];

        /**
         * unknown
         */
        ENTERED_DIFFERENT_INSTANCE_FROM_PARTY: Unknown[];

        /**
         * Fired when a new equipment set is created, an equipment set is deleted or an equipment set has changed
         * @see https://wow.gamepedia.com/EQUIPMENT_SETS_CHANGED
         */
        EQUIPMENT_SETS_CHANGED: null;

        /**
         * Fired when an equipment set has finished equipping
         * - **arg1**: True if the set change was successful
         * - **arg2**: The name of the set that was changed
         */
        EQUIPMENT_SWAP_FINISHED: [boolean, string];

        /**
         * unknown
         */
        EQUIPMENT_SWAP_PENDING: Unknown[];

        /**
         * Fired when the player attempts to equip bind on equip loot
         * @see https://wow.gamepedia.com/EQUIP_BIND_CONFIRM
         */
        EQUIP_BIND_CONFIRM: null;

        /**
         * unknown
         */
        EQUIP_BIND_TRADEABLE_CONFIRM: Unknown[];

        /**
         * unknown
         */
        EVENT_CLASS_TRIAL_TIMER_START: Unknown[];

        /**
         * unknown
         */
        EVENT_CLASS_TRIAL_UPGRADE_COMPLETE: Unknown[];

        /**
         * unknown
         */
        EVENT_TUTORIAL_HIGHLIGHT_SPELL: Unknown[];

        /**
         * unknown
         */
        EVENT_TUTORIAL_UNHIGHLIGHT_SPELL: Unknown[];

        /**
         * Fired to execute macro commands
         * - **arg1**: The "chat line" (macro command line) to execute
         * @see https://wow.gamepedia.com/EXECUTE_CHAT_LINE
         */
        EXECUTE_CHAT_LINE: [string];

        /**
         * unknown
         */
        EXPERIMENTAL_CVAR_CONFIRMATION_NEEDED: Unknown[];

        /**
         * @see https://wow.gamepedia.com/EXTRA_BROWSE_INFO_RECEIVED
         */
        EXTRA_BROWSE_INFO_RECEIVED: [number];

        /**
         * unknown
         */
        FORBIDDEN_NAME_PLATE_CREATED: Unknown[];

        /**
         * unknown
         */
        FORBIDDEN_NAME_PLATE_UNIT_ADDED: Unknown[];

        /**
         * unknown
         */
        FORBIDDEN_NAME_PLATE_UNIT_REMOVED: Unknown[];

        /**
         * Fired when, You log in
         * - Open the friends window (twice)
         * - Switch from the ignore list to the friend's list
         * - Switch from the guild, raid, or who tab back to the friends tab (twice)
         * - Add a friend
         * - Remove a friend
         * - Friend comes online
         * - Friend goes offline
         */
        FRIENDLIST_UPDATE: null;

        /**
         * unknown
         */
        GARRISON_BUILDINGS_SWAPPED: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_ACTIVATABLE: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_ACTIVATED: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_ERROR: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_LIST_UPDATE: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_PLACED: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_REMOVED: Unknown[];

        /**
         * unknown
         */
        GARRISON_BUILDING_UPDATE: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_ADDED: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_CATEGORIES_UPDATED: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_DURABILITY_CHANGED: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_LIST_UPDATE: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_REMOVED: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_UPGRADED: Unknown[];

        /**
         * unknown
         */
        GARRISON_FOLLOWER_XP_CHANGED: Unknown[];

        /**
         * unknown
         */
        GARRISON_HIDE_LANDING_PAGE: Unknown[];

        /**
         * unknown
         */
        GARRISON_INVASION_AVAILABLE: Unknown[];

        /**
         * unknown
         */
        GARRISON_INVASION_UNAVAILABLE: Unknown[];

        /**
         * unknown
         */
        GARRISON_LANDINGPAGE_SHIPMENTS: Unknown[];

        /**
         * unknown
         */
        GARRISON_MISSION_AREA_BONUS_ADDED: Unknown[];

        /**
         * unknown
         */
        GARRISON_MISSION_FINISHED: Unknown[];

        /**
         * unknown
         */
        GARRISON_MISSION_LIST_UPDATE: Unknown[];

        /**
         * unknown
         */
        GARRISON_MISSION_REWARD_INFO: Unknown[];

        /**
         * unknown
         */
        GARRISON_MONUMENT_CLOSE_UI: Unknown[];

        /**
         * unknown
         */
        GARRISON_MONUMENT_LIST_LOADED: Unknown[];

        /**
         * unknown
         */
        GARRISON_MONUMENT_REPLACED: Unknown[];

        /**
         * unknown
         */
        GARRISON_MONUMENT_SELECTED_TROPHY_ID_LOADED: Unknown[];

        /**
         * unknown
         */
        GARRISON_MONUMENT_SHOW_UI: Unknown[];

        /**
         * unknown
         */
        GARRISON_RANDOM_MISSION_ADDED: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECALL_PORTAL_LAST_USED_TIME: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECALL_PORTAL_USED: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECRUITMENT_FOLLOWERS_GENERATED: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECRUITMENT_NPC_CLOSED: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECRUITMENT_NPC_OPENED: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECRUITMENT_READY: Unknown[];

        /**
         * unknown
         */
        GARRISON_RECRUIT_FOLLOWER_RESULT: Unknown[];

        /**
         * unknown
         */
        GARRISON_SHIPMENT_RECEIVED: Unknown[];

        /**
         * unknown
         */
        GARRISON_SHIPYARD_NPC_CLOSED: Unknown[];

        /**
         * unknown
         */
        GARRISON_SHIPYARD_NPC_OPENED: Unknown[];

        /**
         * unknown
         */
        GARRISON_SHOW_LANDING_PAGE: Unknown[];

        /**
         * unknown
         */
        GARRISON_TALENT_COMPLETE: Unknown[];

        /**
         * unknown
         */
        GARRISON_TALENT_NPC_CLOSED: Unknown[];

        /**
         * unknown
         */
        GARRISON_TALENT_NPC_OPENED: Unknown[];

        /**
         * unknown
         */
        GARRISON_TALENT_UPDATE: Unknown[];

        /**
         * unknown
         */
        GARRISON_TRADESKILL_NPC_CLOSED: Unknown[];

        /**
         * unknown
         */
        GARRISON_UPDATE: Unknown[];

        /**
         * unknown
         */
        GARRISON_UPGRADEABLE_RESULT: Unknown[];

        /**
         * unknown
         */
        GARRISON_USE_PARTY_GARRISON_CHANGED: Unknown[];

        /**
         * Fired when a GetItemInfo call causes the client to query the server for data about an item and that data has arrived.
         * (May or may not fire for item data that is queried automatically by client when seen in world, auction house, chat link etc)
         * - **arg1**: The Item ID of received item info
         * @see https://wow.gamepedia.com/GET_ITEM_INFO_RECEIVED
         */
        GET_ITEM_INFO_RECEIVED: [number];

        /**
         * Fires whenever you press a mouse button.
         * - **arg1**: The mouse button pressed
         * @see https://wow.gamepedia.com/GLOBAL_MOUSE_DOWN
         */
        GLOBAL_MOUSE_DOWN: [MouseButton];

        /**
         * Fires whenever a mouse button gets released.
         * - **arg1**: The mouse button pressed
         * @see https://wow.gamepedia.com/GLOBAL_MOUSE_DOWN
         */
        GLOBAL_MOUSE_UP: [MouseButton];

        /**
         * Fired when a glyph is added to a socket. Also fires for a socket when changing the talent group causes that socket to change from an
         * empty to a used state
         * @see https://wow.gamepedia.com/GLYPH_ADDED
         */
        GLYPH_ADDED: null;

        /**
         * ? Probably fired when a glyph slot becomes locked? ?? (How exactly would this happen, anyway?)
         * @see https://wow.gamepedia.com/GLYPH_DISABLED
         */
        GLYPH_DISABLED: null;

        /**
         * ? Probably fired when a glyph slot becomes unlocked?
         * @see https://wow.gamepedia.com/GLYPH_ENABLED
         */
        GLYPH_ENABLED: null;

        /**
         * Fired when a glyph is removed from a socket. This can be done with either shift-right-clicking the socket, or by repalcing it with another
         * glyph. If another glyph replaces this one, this is fired at the start of (before) the cast. Also fired when changing the active talent group
         * changes a socket to empty
         * @see https://wow.gamepedia.com/GLYPH_REMOVED
         */
        GLYPH_REMOVED: null;

        /**
         * Fired for each slot that changes when the active talent group changes. Does not fire when a glyph slot retains the same glyph in the same slot
         * @see https://wow.gamepedia.com/GLYPH_UPDATED
         */
        GLYPH_UPDATED: null;

        /**
         * unknown
         */
        GMRESPONSE_RECEIVED: Unknown[];

        /**
         * unknown
         */
        GMSURVEY_DISPLAY: Unknown[];

        /**
         * unknown
         */
        GM_PLAYER_INFO: Unknown[];

        /**
         * Fired when you close the talk window for an npc
         * - **arg1**: The mouse button used to close the window (nil if closed when you go out of range)
         * @see https://wow.gamepedia.com/GOSSIP_CLOSED
         */
        GOSSIP_CLOSED: [MouseButton | null];

        /**
         * unknown
         */
        GOSSIP_CONFIRM: Unknown[];

        /**
         * unknown
         */
        GOSSIP_CONFIRM_CANCEL: Unknown[];

        /**
         * unknown
         */
        GOSSIP_ENTER_CODE: Unknown[];

        /**
         * Fired when you talk to an npc
         * @description This event typically fires when you are given several choices, including choosing to sell item, select available and active
         * quests, just talk about something, or bind to a location. Even when the the only available choices are quests, this event is often used
         * instead of QUEST_GREETING
         * @see https://wow.gamepedia.com/GOSSIP_SHOW
         */
        GOSSIP_SHOW: null;

        /**
         * unknown
         */
        GROUP_INVITE_CONFIRMATION: Unknown[];

        /**
         * unknown
         */
        GROUP_JOINED: Unknown[];

        /**
         * unknown
         */
        GROUP_LEFT: Unknown[];

        /**
         * Fired when the guild-bank contents change
         * @see https://wow.gamepedia.com/GUILDBANKBAGSLOTS_CHANGED
         */
        GUILDBANKBAGSLOTS_CHANGED: null;

        /**
         * Fired when the guild-bank frame is closed
         * @see https://wow.gamepedia.com/GUILDBANKFRAME_CLOSED
         */
        GUILDBANKFRAME_CLOSED: null;

        /**
         * Fired when the guild-bank frame is opened
         * @see https://wow.gamepedia.com/GUILDBANKFRAME_OPENED
         */
        GUILDBANKFRAME_OPENED: null;

        /**
         * Fired when the guild-bank log is updated
         * @see https://wow.gamepedia.com/GUILDBANKLOG_UPDATE
         */
        GUILDBANKLOG_UPDATE: null;

        /**
         * unknown
         */
        GUILDBANK_ITEM_LOCK_CHANGED: Unknown[];

        /**
         * unknown
         */
        GUILDBANK_TEXT_CHANGED: Unknown[];

        /**
         * unknown
         */
        GUILDBANK_UPDATE_MONEY: Unknown[];

        /**
         * unknown
         */
        GUILDBANK_UPDATE_TABS: Unknown[];

        /**
         * unknown
         */
        GUILDBANK_UPDATE_TEXT: Unknown[];

        /**
         * unknown
         */
        GUILDBANK_UPDATE_WITHDRAWMONEY: Unknown[];

        /**
         * unknown
         */
        GUILDTABARD_UPDATE: Unknown[];

        /**
         * unknown
         */
        GUILD_EVENT_LOG_UPDATE: Unknown[];

        /**
         * Fired when the guild invitation is declined
         * @see https://wow.gamepedia.com/GUILD_INVITE_CANCEL
         */
        GUILD_INVITE_CANCEL: null;

        /**
         * Fired when you are invited to join a guild
         * - **arg1**: guild inviter
         * - **arg2**: guild name
         * @see https://wow.gamepedia.com/GUILD_INVITE_REQUEST
         */
        GUILD_INVITE_REQUEST: [string, string];

        /**
         * Fired when the guild messages of the day is shown
         * - **arg1**: guild message of the day
         * @see https://wow.gamepedia.com/GUILD_MOTD
         */
        GUILD_MOTD: [string];

        /**
         * unknown
         */
        GUILD_NEWS_UPDATE: Unknown[];

        /**
         * unknown
         */
        GUILD_PARTY_STATE_UPDATED: Unknown[];

        /**
         * unknown
         */
        GUILD_PERK_UPDATE: Unknown[];

        /**
         * Fired when any changes are made to ranks or rank permission flags
         * @see https://wow.gamepedia.com/GUILD_RANKS_UPDATE
         */
        GUILD_RANKS_UPDATE: null;

        /**
         * unknown
         */
        GUILD_RECIPE_KNOWN_BY_MEMBERS: Unknown[];

        /**
         * unknown
         */
        GUILD_REGISTRAR_CLOSED: Unknown[];

        /**
         * unknown
         */
        GUILD_REGISTRAR_SHOW: Unknown[];

        /**
         * unknown
         */
        GUILD_RENAME_REQUIRED: Unknown[];
        /**
         * unknown
         */
        GUILD_REP_UPDATED: Unknown[];

        /**
         * unknown
         */
        GUILD_REWARDS_LIST: Unknown[];

        /**
         * Fired when the client's guild info cache has been updated after a call to GuildRoster() or after any data change in any of the guild's
         * data, excluding the Guild Information window
         * - **arg1**: nil if this event was triggered by the client cache being updated after a call to GuildRoster, 1 if there was a local change
         * to Guild roster data
         * @see https://wow.gamepedia.com/GUILD_ROSTER_UPDATE
         */
        GUILD_ROSTER_UPDATE: [Flag | null];

        /**
         * unknown
         */
        GUILD_TRADESKILL_UPDATE: Unknown[];

        /**
         * unknown
         */
        GUILD_XP_UPDATE: Unknown[];

        /**
         * unknown
         */
        HEARTHSTONE_BOUND: Unknown[];

        /**
         * unknown
         */
        HEIRLOOMS_UPDATED: Unknown[];

        /**
         * unknown
         */
        HEIRLOOM_UPGRADE_TARGETING_CHANGED: Unknown[];

        /**
         * unknown
         */
        HONOR_LEVEL_UPDATE: Unknown[];

        /**
         * unknown
         */
        HONOR_PRESTIGE_UPDATE: Unknown[];

        /**
         * unknown
         */
        HONOR_XP_UPDATE: Unknown[];

        /**
         * Fired when a player is added or removed from the ignore list. Event is called twice. Not certain why it is called twice
         * @see https://wow.gamepedia.com/IGNORELIST_UPDATE
         */
        IGNORELIST_UPDATE: null;

        /**
         * unknown
         */
        IGR_BILLING_NAG_DIALOG: Unknown[];

        /**
         * unknown
         */
        INCOMING_RESURRECT_CHANGED: Unknown[];

        /**
         * unknown
         */
        INITIAL_HOTFIXES_APPLIED: Unknown[];

        /**
         * unknown
         */
        INSPECT_ACHIEVEMENT_READ: Unknown[];

        /**
         * unknown
         */
        INSPECT_HONOR_UPDATE: Unknown[];

        /**
         * After a NotifyInspect(unit) is called, this is fired, indicating the Inspected player's information has been loaded
         * - **arg1**: Unit GUID
         * @see https://wow.gamepedia.com/INSPECT_READY
         */
        INSPECT_READY: [Guid];

        /**
         * Fired when the countdown to boot a player from an instance starts
         * @see https://wow.gamepedia.com/INSTANCE_BOOT_START
         */
        INSTANCE_BOOT_START: null;

        /**
         * Fired when the countdown to boot a player from an instance stops
         * @see https://wow.gamepedia.com/INSTANCE_BOOT_STOP
         */
        INSTANCE_BOOT_STOP: null;

        /**
         * unknown
         */
        INSTANCE_ENCOUNTER_ENGAGE_UNIT: Unknown[];

        /**
         * unknown
         */
        INSTANCE_GROUP_SIZE_CHANGED: Unknown[];

        /**
         * unknown
         */
        INSTANCE_LOCK_START: Unknown[];

        /**
         * Fired when quitting the game
         * @see https://wow.gamepedia.com/INSTANCE_LOCK_STOP
         */
        INSTANCE_LOCK_STOP: null;

        /**
         * unknown
         */
        INSTANCE_LOCK_WARNING: Unknown[];

        /**
         * @see https://wow.gamepedia.com/ITEM_INTERACTION_CLOSE
         */
        ITEM_INTERACTION_CLOSE: null;

        /**
         * @see https://wow.gamepedia.com/ITEM_INTERACTION_ITEM_SELECTION_UPDATED
         */
        ITEM_INTERACTION_ITEM_SELECTION_UPDATED: Unknown[];

        /**
         * @see https://wow.gamepedia.com/ITEM_INTERACTION_OPEN
         */
        ITEM_INTERACTION_OPEN: null;

        /**
         * @see https://wow.gamepedia.com/ITEM_KEY_ITEM_INFO_RECEIVED
         */
        ITEM_KEY_ITEM_INFO_RECEIVED: [number];

        /**
         * Fires when an item gets "locked" in the inventory or a container
         * - **arg1**: Bag of item
         * - **arg2**: Slot of item
         * @see https://wow.gamepedia.com/ITEM_LOCKED
         */
        ITEM_LOCKED: [CONTAINER_ID, INVENTORY_SLOT_ID];

        /**
         * Fires when the "locked" status on a container or inventory item changes, usually from but not limited to Pickup functions to move items
         * - If arg2 is non-nil
         *  - **arg1**: Bag of updated item
         *  - **arg2**: Slot of updated item
         * - If arg2 is nil
         *  - **arg1**: Equipment slot of item
         *  - **arg2**: unused
         * @see https://wow.gamepedia.com/ITEM_LOCK_CHANGED
         */
        ITEM_LOCK_CHANGED: [CONTAINER_ID | INVENTORY_SLOT_ID, INVENTORY_SLOT_ID?];

        /**
         * @see https://wow.gamepedia.com/ITEM_PURCHASED
         */
        ITEM_PURCHASED: [number];

        /**
         * Fired when an item is pushed onto the "inventory-stack". For instance when you manufacture something with your trade skills or picks something up
         * - **arg1**: the bag that has received the new item
         * - **arg2**: the path to the item's icon
         * @see https://wow.gamepedia.com/ITEM_PUSH
         */
        ITEM_PUSH: [CONTAINER_ID, TexturePath];

        /**
         * unknown
         */
        ITEM_RESTORATION_BUTTON_STATUS: Unknown[];

        /**
         * @see https://wow.gamepedia.com/ITEM_SEARCH_RESULTS_ADDED
         */
        ITEM_SEARCH_RESULTS_ADDED: Unknown[];

        /**
         * @see https://wow.gamepedia.com/ITEM_SEARCH_RESULTS_UPDATED
         */
        ITEM_SEARCH_RESULTS_UPDATED: Unknown[];

        /**
         * Fired when an items text begins displaying
         * @see https://wow.gamepedia.com/ITEM_TEXT_BEGIN
         */
        ITEM_TEXT_BEGIN: null;

        /**
         * Fired when the items text has completed its viewing and is done
         * @see https://wow.gamepedia.com/ITEM_TEXT_CLOSED
         */
        ITEM_TEXT_CLOSED: null;

        /**
         * Fired when the item's text can continue and is ready to be scrolled
         * @see https://wow.gamepedia.com/ITEM_TEXT_READY
         */
        ITEM_TEXT_READY: null;

        /**
         * Fired when an item is in the process of being translated
         * @see https://wow.gamepedia.com/ITEM_TEXT_TRANSLATION
         */
        ITEM_TEXT_TRANSLATION: null;

        /**
         * unknown
         */
        ITEM_UNLOCKED: Unknown[];

        /**
         * unknown
         */
        ITEM_UPGRADE_MASTER_CLOSED: Unknown[];

        /**
         * unknown
         */
        ITEM_UPGRADE_MASTER_OPENED: Unknown[];

        /**
         * unknown
         */
        ITEM_UPGRADE_MASTER_SET_ITEM: Unknown[];

        /**
         * unknown
         */
        ITEM_UPGRADE_MASTER_UPDATE: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_ARTICLE_LOAD_FAILURE: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_ARTICLE_LOAD_SUCCESS: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_QUERY_LOAD_FAILURE: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_QUERY_LOAD_SUCCESS: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_SERVER_MESSAGE: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_SETUP_LOAD_FAILURE: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_SETUP_LOAD_SUCCESS: Unknown[];

        /**
         * unknown
         */
        KNOWLEDGE_BASE_SYSTEM_MOTD_UPDATED: Unknown[];

        /**
         * unknown
         */
        KNOWN_TITLES_UPDATE: Unknown[];

        /**
         * unknown
         */
        LANGUAGE_LIST_CHANGED: Unknown[];

        /**
         * Fired when a new spell/ability is added to the spellbook. e.g. When training a new or a higher level spell/ability
         * - **arg1**: Spell ID
         * - **arg2**: Number of the tab which the spell/ability is added to
         * @see https://wow.gamepedia.com/LEARNED_SPELL_IN_TAB
         */
        LEARNED_SPELL_IN_TAB: [number, number];

        /**
         * unknown
         */
        LEVEL_GRANT_PROPOSED: Unknown[];

        /**
         * unknown
         */
        LFG_BOOT_PROPOSAL_UPDATE: Unknown[];

        /**
         * Fired when a random dungeon (picked by the Dungeon Finder) is completed. This event causes a window similar to the achievement alert to
         * appear, with the details of your Dungeon Finder rewards
         * @see https://wow.gamepedia.com/LFG_COMPLETION_REWARD
         */
        LFG_COMPLETION_REWARD: null;

        /**
         * unknown
         */
        LFG_INVALID_ERROR_MESSAGE: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_ACTIVE_ENTRY_UPDATE: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_APPLICANT_LIST_UPDATED: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_APPLICANT_UPDATED: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_APPLICATION_STATUS_UPDATED: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_AVAILABILITY_UPDATE: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_ENTRY_CREATION_FAILED: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_ENTRY_EXPIRED_TIMEOUT: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_ENTRY_EXPIRED_TOO_MANY_PLAYERS: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_JOINED_GROUP: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_SEARCH_FAILED: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_SEARCH_RESULTS_RECEIVED: Unknown[];

        /**
         * unknown
         */
        LFG_LIST_SEARCH_RESULT_UPDATED: Unknown[];

        /**
         * Fired when Dungeon Lock info is received
         * @see https://wow.gamepedia.com/LFG_LOCK_INFO_RECEIVED
         */
        LFG_LOCK_INFO_RECEIVED: null;

        /**
         * unknown
         */
        LFG_OFFER_CONTINUE: Unknown[];

        /**
         * Fired when a gossip option is used to initiate a Looking-for-Dungeon interaction
         * - **arg1**: index of the dungeon the NPC wants us to queue for (index to GetLFGDungeonInfo(id)).
         * @see https://wow.gamepedia.com/LFG_OPEN_FROM_GOSSIP
         */
        LFG_OPEN_FROM_GOSSIP: [number];

        /**
         * unknown
         */
        LFG_PROPOSAL_DONE: Unknown[];

        /**
         * Fired when someone decline or don't make a choice within time in the dungeon queue invite
         * @see https://wow.gamepedia.com/LFG_PROPOSAL_FAILED
         */
        LFG_PROPOSAL_FAILED: null;

        /**
         * Fired when a dungeon group was found and the dialog to accept or decline it appears
         * @see https://wow.gamepedia.com/LFG_PROPOSAL_SHOW
         */
        LFG_PROPOSAL_SHOW: null;

        /**
         * Fired when everyone in the dungeon queue accepted the invite
         * @see https://wow.gamepedia.com/LFG_PROPOSAL_SUCCEEDED
         */
        LFG_PROPOSAL_SUCCEEDED: null;

        /**
         * Fired when someone either accept or decline the dungeon queue invite
         * @see https://wow.gamepedia.com/LFG_PROPOSAL_UPDATE
         */
        LFG_PROPOSAL_UPDATE: null;

        /**
         * unknown
         */
        LFG_QUEUE_STATUS_UPDATE: Unknown[];

        /**
         * unknown
         */
        LFG_READY_CHECK_DECLINED: Unknown[];

        /**
         * unknown
         */
        LFG_READY_CHECK_HIDE: Unknown[];

        /**
         * unknown
         */
        LFG_READY_CHECK_PLAYER_IS_READY: Unknown[];

        /**
         * unknown
         */
        LFG_READY_CHECK_SHOW: Unknown[];

        /**
         * unknown
         */
        LFG_READY_CHECK_UPDATE: Unknown[];

        /**
         * unknown
         */
        LFG_ROLE_CHECK_DECLINED: Unknown[];

        /**
         * unknown
         */
        LFG_ROLE_CHECK_HIDE: Unknown[];

        /**
         * unknown
         */
        LFG_ROLE_CHECK_ROLE_CHOSEN: Unknown[];

        /**
         * unknown
         */
        LFG_ROLE_CHECK_SHOW: Unknown[];

        /**
         * unknown
         */
        LFG_ROLE_CHECK_UPDATE: Unknown[];

        /**
         * unknown
         */
        LFG_ROLE_UPDATE: Unknown[];

        /**
         * When fired prompts the LFG UI to update the list of available LFG categories and objectives (i.e. new quests, zones, instances available
         * to LFG). See API GetLFGTypes
         * @see https://wow.gamepedia.com/LFG_UPDATE
         */
        LFG_UPDATE: null;

        /**
         * unknown
         */
        LFG_UPDATE_RANDOM_INFO: Unknown[];

        /**
         * unknown
         */
        LF_GUILD_BROWSE_UPDATED: Unknown[];

        /**
         * unknown
         */
        LF_GUILD_MEMBERSHIP_LIST_CHANGED: Unknown[];

        /**
         * unknown
         */
        LF_GUILD_MEMBERSHIP_LIST_UPDATED: Unknown[];

        /**
         * unknown
         */
        LF_GUILD_POST_UPDATED: Unknown[];

        /**
         * unknown
         */
        LF_GUILD_RECRUITS_UPDATED: Unknown[];

        /**
         * unknown
         */
        LF_GUILD_RECRUIT_LIST_CHANGED: Unknown[];

        /**
         * unknown
         */
        LIFESTEAL_UPDATE: Unknown[];

        /**
         * unknown
         */
        LOADING_SCREEN_DISABLED: Unknown[];

        /**
         * unknown
         */
        LOADING_SCREEN_ENABLED: Unknown[];

        /**
         * unknown
         */
        LOCALPLAYER_PET_RENAMED: Unknown[];

        /**
         * unknown
         */
        LOGOUT_CANCEL: Unknown[];

        /**
         * Fired when the player attempts to take 'bind-on-pickup' loot
         * @see https://wow.gamepedia.com/LOOT_BIND_CONFIRM
         */
        LOOT_BIND_CONFIRM: null;

        /**
         * Fired when a player ceases looting a corpse. Note that this will fire before the last CHAT_MSG_LOOT event for that loot
         * @see https://wow.gamepedia.com/LOOT_CLOSED
         */
        LOOT_CLOSED: null;

        /**
         * unknown
         */
        LOOT_HISTORY_AUTO_SHOW: Unknown[];

        /**
         * unknown
         */
        LOOT_HISTORY_FULL_UPDATE: Unknown[];

        /**
         * unknown
         */
        LOOT_HISTORY_ROLL_CHANGED: Unknown[];

        /**
         * unknown
         */
        LOOT_HISTORY_ROLL_COMPLETE: Unknown[];

        /**
         * unknown
         */
        LOOT_ITEM_AVAILABLE: Unknown[];

        /**
         * unknown
         */
        LOOT_ITEM_ROLL_WON: Unknown[];

        /**
         * unknown
         */
        LOOT_JOURNAL_LIST_UPDATE: Unknown[];

        /**
         * Fired when a corpse is looted
         * - **arg1**: 1 if autolooting, otherwise 0 (not nil!)
         * @see https://wow.gamepedia.com/LOOT_OPENED
         */
        LOOT_OPENED: [Flag];

        /**
         * unknown
         */
        LOOT_READY: Unknown[];

        /**
         * unknown
         */
        LOOT_ROLLS_COMPLETE: Unknown[];

        /**
         * unknown
         */
        LOOT_SLOT_CHANGED: Unknown[];

        /**
         * Fired when loot is removed from a corpse
         * - **arg1**: Slot number
         * @see https://wow.gamepedia.com/LOOT_SLOT_CLEARED
         */
        LOOT_SLOT_CLEARED: [number];

        /**
         * unknown
         */
        LOSS_OF_CONTROL_ADDED: Unknown[];

        /**
         * unknown
         */
        LOSS_OF_CONTROL_UPDATE: Unknown[];

        /**
         * unknown
         */
        LUA_WARNING: Unknown[];

        /**
         * (this event doesn't seem to be used anymore, use MACRO_ACTION_FORBIDDEN)
         * @deprecated
         * @see https://wow.gamepedia.com/MACRO_ACTION_BLOCKED
         */
        MACRO_ACTION_BLOCKED: null;

        /**
         * Sent when a macro tries use actions that are always forbidden (movement, targeting, etc.).
         * - **arg1**: As of 3.0.2 (possibly sooner) this argument appears to always be "UNKNOWN()"
         * @see https://wow.gamepedia.com/MACRO_ACTION_FORBIDDEN
         */
        MACRO_ACTION_FORBIDDEN: [string];

        /**
         * Fired when the mailbox window is closed
         * @see https://wow.gamepedia.com/MAIL_CLOSED
         */
        MAIL_CLOSED: null;

        /**
         * unknown
         */
        MAIL_FAILED: Unknown[];

        /**
         * This event is fired when the inbox changes in any way, including
         * - when the inbox list is loaded while the frame is open
         * - when a mail item changes from new to read
         * - when a mail item is opened for the first time in a session
         * -----------------
         * - **arg1**: the mouse button clicked when opening a mail item; otherwise arg1 is nil.
         * - **arg2**: always false
         * @see https://wow.gamepedia.com/MAIL_INBOX_UPDATE
         */
        MAIL_INBOX_UPDATE: [MouseButton | null, false];

        /**
         * Fired when you send an item that needs a confirmation (e.g. Heirlooms that are still refundable)
         * - **arg1**: Mail Slot
         * - **arg2**: itemLink
         * @see https://wow.gamepedia.com/MAIL_LOCK_SEND_ITEMS
         */
        MAIL_LOCK_SEND_ITEMS: [number, ItemLink];

        /**
         * Fired when an item is dragged to or from the Send Item box in an outgoing mail message
         * @see https://wow.gamepedia.com/MAIL_SEND_INFO_UPDATE
         */
        MAIL_SEND_INFO_UPDATE: null;

        /**
         * Fired when a mail has been successfully sent to the mailbox of the recipient, it is also called when the mailbox is opened for some reason ... bug?
         * @see https://wow.gamepedia.com/MAIL_SEND_SUCCESS
         */
        MAIL_SEND_SUCCESS: null;

        /**
         * Fired when the mailbox is first opened
         * - **arg1**: returns "up"
         * @see https://wow.gamepedia.com/MAIL_SHOW
         */
        MAIL_SHOW: [string];

        /**
         * unknown
         */
        MAIL_SUCCESS: Unknown[];

        /**
         * Fires when the mail confirmation is cancelled and the concerned item(s) need to be unlocked
         * @see https://wow.gamepedia.com/MAIL_UNLOCK_SEND_ITEMS
         */
        MAIL_UNLOCK_SEND_ITEMS: null;

        /**
         * unknown
         */
        MAP_BAR_UPDATE: Unknown[];

        /**
         * unknown
         */
        MASTERY_UPDATE: Unknown[];

        /**
         * unknown
         */
        MAX_EXPANSION_LEVEL_UPDATED: Unknown[];

        /**
         * unknown
         */
        MAX_SPELL_START_RECOVERY_OFFSET_CHANGED: Unknown[];

        /**
         * Fired when a merchant frame closes. (Called twice)
         * - **arg1**: button used to close the window
         * @see https://wow.gamepedia.com/MERCHANT_CLOSED
         */
        MERCHANT_CLOSED: [MouseButton | null];

        /**
         * unknown
         */
        MERCHANT_CONFIRM_TRADE_TIMER_REMOVAL: Unknown[];

        /**
         * unknown
         */
        MERCHANT_FILTER_ITEM_UPDATE: Unknown[];

        /**
         * Fired when the merchant frame is shown
         * @see https://wow.gamepedia.com/MERCHANT_SHOW
         */
        MERCHANT_SHOW: null;

        /**
         * Fired when a merchant updates
         * @see https://wow.gamepedia.com/MERCHANT_UPDATE
         */
        MERCHANT_UPDATE: null;

        /**
         * Fired when the minimap is pinged
         * - **arg1**: UnitId of the one that created the ping (ie "player" or any of the group members)
         * - **arg2**: x coordinate
         * - **arg3**: y coordinate
         * @see https://wow.gamepedia.com/MINIMAP_PING
         */
        MINIMAP_PING: [UnitId, number, number];

        /**
         * Fired when the player selects a different tracking type from the menu attached to the mini map. There seems to be no useful arguments
         * as of the time of this writing
         * - **arg1**: Mouse button used to click the tracking button (i.e. "LEFTBUTTON")
         * @since 2.3.0
         * @see https://wow.gamepedia.com/MINIMAP_UPDATE_TRACKING
         */
        MINIMAP_UPDATE_TRACKING: [MouseButton];

        /**
         * Fired when the minimap scaling factor is changed. This happens, generally, whenever the player moves indoors from outside, or vice versa.
         * There are no arguments to this event. To test the player's location, compare the minimapZoom and minimapInsideZoom CVars with the current
         * minimap zoom level (see GetZoom)
         * @description This event does not relate to the + and - minimap zoom buttons
         * @see https://wow.gamepedia.com/MINIMAP_UPDATE_ZOOM
         */
        MINIMAP_UPDATE_ZOOM: null;

        /**
         * unknown
         */
        MIN_EXPANSION_LEVEL_UPDATED: Unknown[];

        /**
         * Fired when the mirror timer is paused.
         * - **arg1**: pause duration
         * @see https://wow.gamepedia.com/MIRROR_TIMER_PAUSE
         */
        MIRROR_TIMER_PAUSE: [number];

        /**
         * Fired when some sort of timer starts
         * - **arg1**: timer ( for ex. "BREATH" )
         * - **arg2**: value ( start-time in ms, for ex. 180000 )
         * - **arg3**: maxvalue ( max-time in ms, for ex. 180000 )
         * - **arg4**:  ( time added per second in seconds, for ex. -1 )
         * - **arg5**: paused
         * - **arg6**: label ( for ex. "Breath" )
         */
        MIRROR_TIMER_START: [string, number, number, number, boolean, string];

        /**
         * Fired when a mirror timer is stopped
         * - **arg1**: timer ( for ex. "BREATH" )
         * @see https://wow.gamepedia.com/MIRROR_TIMER_STOP
         */
        MIRROR_TIMER_STOP: [string];

        /**
         * Fired when shift/ctrl/alt keys are pressed or released. Does not fire when an EditBox has keyboard focus
         * - **arg1**: "LSHIFT", "RSHIFT", "LCTRL", "RCTRL", "LALT", "RALT"
         * - **arg2**: 1 for pressed, 0 (not nil!) for released
         * @see https://wow.gamepedia.com/MODIFIER_STATE_CHANGED
         */
        MODIFIER_STATE_CHANGED: [string, Flag];

        /**
         * unknown
         */
        MOUNT_CURSOR_CLEAR: Unknown[];

        /**
         * unknown
         */
        MOUNT_JOURNAL_SEARCH_UPDATED: Unknown[];

        /**
         * unknown
         */
        MOUNT_JOURNAL_USABILITY_CHANGED: Unknown[];

        /**
         * unknown
         */
        MOVIE_COMPRESSING_PROGRESS: Unknown[];

        /**
         * unknown
         */
        MOVIE_RECORDING_PROGRESS: Unknown[];

        /**
         * unknown
         */
        MOVIE_UNCOMPRESSED_MOVIE: Unknown[];

        /**
         * unknown
         */
        MUTELIST_UPDATE: Unknown[];

        /**
         * unknown
         */
        NAME_PLATE_CREATED: Unknown[];

        /**
         * unknown
         */
        NAME_PLATE_UNIT_ADDED: Unknown[];

        /**
         * unknown
         */
        NAME_PLATE_UNIT_REMOVED: Unknown[];

        /**
         * unknown
         */
        NEUTRAL_FACTION_SELECT_RESULT: Unknown[];

        /**
         * unknown
         */
        NEW_MOUNT_ADDED: Unknown[];

        /**
         * unknown
         */
        NEW_PET_ADDED: Unknown[];

        /**
         * unknown
         */
        NEW_RECIPE_LEARNED: Unknown[];

        /**
         * unknown
         */
        NEW_TITLE_EARNED: Unknown[];

        /**
         * unknown
         */
        NEW_WMO_CHUNK: Unknown[];

        /**
         * unknown
         */
        NPC_PVPQUEUE_ANYWHERE: Unknown[];

        /**
         * unknown
         */
        NPE_TUTORIAL_UPDATE: Unknown[];

        /**
         * unknown
         */
        OBLITERUM_FORGE_CLOSE: Unknown[];

        /**
         * unknown
         */
        OBLITERUM_FORGE_PENDING_ITEM_CHANGED: Unknown[];

        /**
         * unknown
         */
        OBLITERUM_FORGE_SHOW: Unknown[];

        /**
         * unknown
         */
        OLD_TITLE_LOST: Unknown[];

        /**
         * unknown
         */
        OPEN_MASTER_LOOT_LIST: Unknown[];

        /**
         * Fired when interacting with an NPC allowing guild tabard customization
         */
        OPEN_TABARD_FRAME: null;

        /**
         * @see https://wow.gamepedia.com/OWNED_AUCTIONS_UPDATED
         */
        OWNED_AUCTIONS_UPDATED: null;

        /**
         * unknown
         */
        PARTY_CONVERTED_TO_RAID: Unknown[];

        /**
         * Fired when you decline a party invite
         * @see https://wow.gamepedia.com/PARTY_INVITE_CANCEL
         */
        PARTY_INVITE_CANCEL: null;

        /**
         * Fired when a player invite you to party
         * - **arg1**: player that invited you
         * - **arg2**: tank slot available
         * - **arg3**: healer slot available
         * - **arg4**: DPS slot available
         * - **arg5**: invite is cross realm
         * - **arg6**: unknown
         * @see https://wow.gamepedia.com/PARTY_INVITE_REQUEST
         */
        PARTY_INVITE_REQUEST: [string, boolean, boolean, boolean, boolean, Unknown];

        /**
         * Fired when the player's leadership changed
         * @see https://wow.gamepedia.com/PARTY_LEADER_CHANGED
         */
        PARTY_LEADER_CHANGED: null;

        /**
         * unknown
         */
        PARTY_LFG_RESTRICTED: Unknown[];

        /**
         * Fired when the party's loot method changes
         * @see https://wow.gamepedia.com/PARTY_LOOT_METHOD_CHANGED
         */
        PARTY_LOOT_METHOD_CHANGED: null;

        /**
         * In Mists of Pandaria, this event is no longer generated. It has been replaced by GROUP_ROSTER_UPDATE
         * @deprecated
         * @see https://wow.gamepedia.com/PARTY_MEMBERS_CHANGED
         */
        PARTY_MEMBERS_CHANGED: null;

        /**
         * Fired when a specific party member is offline or dead
         * - **arg1**: Player Name
         * @see https://wow.gamepedia.com/PARTY_MEMBER_DISABLE
         */
        PARTY_MEMBER_DISABLE: [string];

        /**
         * Fired when a specific party member is still connected
         * - **arg1**: Player Name
         * @see https://wow.gamepedia.com/PARTY_MEMBER_ENABLE
         */
        PARTY_MEMBER_ENABLE: [string];

        /**
         * unknown
         */
        PARTY_REFER_A_FRIEND_UPDATED: Unknown[];

        /**
         * Fired when a petition is closed, e.g. by you signing it. See PETITION_SHOW
         * @see https://wow.gamepedia.com/PETITION_CLOSED
         */
        PETITION_CLOSED: null;

        /**
         * Fired when you are shown a petition to create a guild or arena team. This can be due to someone offering you to sign it, or because of
         * you clicking your own charter in your inventory. GetPetitionInfo() will tell you more
         * @see https://wow.gamepedia.com/PETITION_SHOW
         */
        PETITION_SHOW: null;

        /**
         * unknown
         */
        PETITION_VENDOR_CLOSED: Unknown[];

        /**
         * unknown
         */
        PETITION_VENDOR_SHOW: Unknown[];

        /**
         * unknown
         */
        PETITION_VENDOR_UPDATE: Unknown[];

        /**
         * Fired when the player's pet begins attacking
         * @see https://wow.gamepedia.com/PET_ATTACK_START
         */
        PET_ATTACK_START: null;

        /**
         * Fired when the player's pet ceases attack
         * @see https://wow.gamepedia.com/PET_ATTACK_STOP
         */
        PET_ATTACK_STOP: null;

        /**
         * unknown
         */
        PET_BAR_HIDE: Unknown[];

        /**
         * Fired when pet spells are dropped into the PetActionBar
         * @see https://wow.gamepedia.com/PET_BAR_HIDEGRID
         */
        PET_BAR_HIDEGRID: null;

        /**
         * Fired when pet spells are dragged from the pet spellbook or the PetActionBar
         * - **arg1**: MouseButton used (e.g. "LeftButton","RightButton")
         * @see https://wow.gamepedia.com/PET_BAR_SHOWGRID
         */
        PET_BAR_SHOWGRID: [MouseButton];

        /**
         * Fired when the pet bar is updates
         * @see https://wow.gamepedia.com/PET_BAR_UPDATE
         */
        PET_BAR_UPDATE: null;

        /**
         * Fired when a pet spell cooldown starts. It is not called when cooldown ends
         * @see https://wow.gamepedia.com/PET_BAR_UPDATE_COOLDOWN
         */
        PET_BAR_UPDATE_COOLDOWN: null;

        /**
         * unknown
         */
        PET_BAR_UPDATE_USABLE: null;

        /**
         * unknown
         */
        PET_BATTLE_ABILITY_CHANGED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_ACTION_SELECTED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_AURA_APPLIED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_AURA_CANCELED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_AURA_CHANGED: Unknown[];

        /**
         * Fired when a pet battle ends, if the player successfully captured a battle pet
         * - **arg1**: fromPlayer
         * - **arg2**: activePetSlot
         * @description This event does not fire when a trap successfully snares a pet during a battle. This event is meant to signify when a
         * player snares a pet, wins the battle, and is able to add the pet to their Pet Journal
         * @see https://wow.gamepedia.com/PET_BATTLE_CAPTURED
         */
        PET_BATTLE_CAPTURED: [number, number];

        /**
         * unknown
         */
        PET_BATTLE_HEALTH_CHANGED: Unknown[];

        /**
         * Fired when a battle pet levels
         * - **arg1**: Active player the battle pet belongs to
         * - **arg2**: Active slot the battle pet is in
         * - **arg3**: New level for the battle pet
         * @see https://wow.gamepedia.com/PET_BATTLE_LEVEL_CHANGED
         */
        PET_BATTLE_LEVEL_CHANGED: [string, number, number];

        /**
         * unknown
         */
        PET_BATTLE_LOOT_RECEIVED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_MAX_HEALTH_CHANGED: Unknown[];

        /**
         * Event fired at the end of camera transitioning for the pet battle
         * @description The transition is started with PET_BATTLE_OPENING_START. After this event the player is able to pet fight
         * @see https://wow.gamepedia.com/PET_BATTLE_OPENING_DONE
         */
        PET_BATTLE_OPENING_DONE: null;

        /**
         * Begins the transition between the current UI to the Pet Battle one
         * @description The payer is able to battle after PET_BATTLE_OPENING_DONE
         * @see https://wow.gamepedia.com/PET_BATTLE_OPENING_START
         */
        PET_BATTLE_OPENING_START: null;

        /**
         * unknown
         */
        PET_BATTLE_PET_ROUND_PLAYBACK_COMPLETE: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_PET_ROUND_RESULTS: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_PET_TYPE_CHANGED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_PVP_DUEL_REQUESTED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_PVP_DUEL_REQUEST_CANCEL: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_QUEUE_PROPOSAL_ACCEPTED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_QUEUE_PROPOSAL_DECLINED: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_QUEUE_PROPOSE_MATCH: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_QUEUE_STATUS: Unknown[];

        /**
         * unknown
         */
        PET_BATTLE_TURN_STARTED: Unknown[];

        /**
         * unknown
         */
        PET_DISMISS_START: Unknown[];

        /**
         * unknown
         */
        PET_FORCE_NAME_DECLENSION: Unknown[];

        /**
         * unknown
         */
        PET_JOURNAL_AUTO_SLOTTED_PET: Unknown[];

        /**
         * unknown
         */
        PET_JOURNAL_CAGE_FAILED: Unknown[];

        /**
         * Fired when the pet journal is updated
         * @description Fired whenever the information returned by C_PetJournal.GetPetInfoByIndex might have been updated, for instance by the
         * user changing the pet journal filters. Also fired when the player learns, cages or releases a battle pet, even if that pet is currently
         * filtered out of the displayed pet list.
         * @see https://wow.gamepedia.com/PET_JOURNAL_LIST_UPDATE
         */
        PET_JOURNAL_LIST_UPDATE: null;

        /**
         * unknown
         */
        PET_JOURNAL_NEW_BATTLE_SLOT: Unknown[];

        /**
         * unknown
         */
        PET_JOURNAL_PETS_HEALED: Unknown[];

        /**
         * Fired when a pet in the journal is caged
         * - **arg1**: GUID of the pet removed from the journal
         * @description Does not fire when a pet is released
         * @see https://wow.gamepedia.com/PET_JOURNAL_PET_DELETED
         */
        PET_JOURNAL_PET_DELETED: [Guid];

        /**
         * unknown
         */
        PET_JOURNAL_PET_RESTORED: Unknown[];

        /**
         * unknown
         */
        PET_JOURNAL_PET_REVOKED: Unknown[];

        /**
         * unknown
         */
        PET_JOURNAL_TRAP_LEVEL_SET: Unknown[];

        /**
         * unknown
         */
        PET_RENAMEABLE: Unknown[];

        /**
         * unknown
         */
        PET_SPECIALIZATION_CHANGED: Unknown[];

        /**
         * Fires when the pet's spell power bonus changes. Use GetPetSpellBonusDamage() to retrieve the new value
         * @see https://wow.gamepedia.com/PET_SPELL_POWER_UPDATE
         */
        PET_SPELL_POWER_UPDATE: null;

        /**
         * unknown
         */
        PET_STABLE_CLOSED: Unknown[];

        /**
         * unknown
         */
        PET_STABLE_SHOW: Unknown[];

        /**
         * unknown
         */
        PET_STABLE_UPDATE: Unknown[];

        /**
         * unknown
         */
        PET_STABLE_UPDATE_PAPERDOLL: Unknown[];

        /**
         * unknown
         */
        PET_UI_CLOSE: Unknown[];

        /**
         * unknown
         */
        PET_UI_UPDATE: Unknown[];

        /**
         * This event only fires when bank bags slots are purchased. It no longer fires when bags in the slots are changed. Instead, when the
         * bags are changed, PLAYERBANKSLOTS_CHANGED will fire, and arg1 will be NUM_BANKGENERIC_SLOTS + BagIndex
         * @see https://wow.gamepedia.com/PLAYERBANKBAGSLOTS_CHANGED
         */
        PLAYERBANKBAGSLOTS_CHANGED: null;

        /**
         * Fired when the One of the slots in the player's 24 bank slots has changed, or when any of the equipped bank bags have changed. Does not
         * fire when an item is added to or removed from a bank bag
         * - **arg1**: When (arg1 <= NUM_BANKGENERIC_SLOTS), arg1 is the index of the generic bank slot that changed. When (arg1 > NUM_BANKGENERIC_SLOTS)
         * , (arg1 - NUM_BANKGENERIC_SLOTS) is the index of the equipped bank bag that changed
         * @see https://wow.gamepedia.com/PLAYERBANKSLOTS_CHANGED
         */
        PLAYERBANKSLOTS_CHANGED: [number];

        /**
         * unknown
         */
        PLAYERREAGENTBANKSLOTS_CHANGED: Unknown[];

        /**
         * Fired when the player
         * - Releases from death to a graveyard
         * - Accepts a resurrect before releasing their spirit
         * @description Does not fire when the player is alive after being a ghost. PLAYER_UNGHOST is triggered in that case
         * @see https://wow.gamepedia.com/PLAYER_ALIVE
         */
        PLAYER_ALIVE: null;

        /**
         * unknown
         */
        PLAYER_AVG_ITEM_LEVEL_UPDATE: Unknown[];

        /**
         * Fired when the player is camping
         * @see https://wow.gamepedia.com/PLAYER_CAMPING
         */
        PLAYER_CAMPING: null;

        /**
         * unknown
         */
        PLAYER_CHARACTER_UPGRADE_TALENT_COUNT_CHANGED: Unknown[];

        /**
         * Fires after the PLAYER_CONTROL_LOST event, when control has been restored to the player
         * @see https://wow.gamepedia.com/PLAYER_CONTROL_GAINED
         */
        PLAYER_CONTROL_GAINED: null;

        /**
         * Fires whenever the player is unable to control the character. Examples are when afflicted by fear, mind controlled, or when using a taxi
         * @see https://wow.gamepedia.com/PLAYER_CONTROL_LOST
         */
        PLAYER_CONTROL_LOST: null;

        /**
         * Known to fire when Spell Healing (e.g. Earthliving Weapon effect) changes (4.3.4)
         * @see https://wow.gamepedia.com/PLAYER_DAMAGE_DONE_MODS
         */
        PLAYER_DAMAGE_DONE_MODS: null;

        /**
         * Fired when the player has died
         * @see https://wow.gamepedia.com/PLAYER_DEAD
         */
        PLAYER_DEAD: null;

        /**
         * unknown
         */
        PLAYER_DIFFICULTY_CHANGED: Unknown[];

        /**
         * unknown
         */
        PLAYER_ENTERING_BATTLEGROUND: Unknown[];

        /**
         * Fired when the player enters the world, enters/leaves an instance, or respawns at a graveyard. Also fires any other time the player sees a loading
         * screen. To check if the player is entering an instance, check GetPlayerMapPosition to see if both X and Y are zero. Correction on the above
         * comment: When PLAYER_ENTERING_WORLD fires, you'll notice that WORLD_MAP_UPDATE fires just before it. My instincts tell that leaving an instance puts
         * the player in void space momentarily. So for the case that you are entering AND leaving an instance, GetPlayerMapPosition always returns the
         * coordinates [0,0] and hence there is no way to determine using the event PLAYER_ENTERING_WORLD if the player is entering an instance or not. When
         * leaving an instance the following events fire (ignoring party/raid events).
         *
         * - WORLD_MAP_UPDATE
         * - PLAYER_ENTERING_WORLD
         * - WORLD_MAP_UPDATE <--- Player coordinates are non-zero here
         *
         * Instances do have coordinates for units once the second WORLD_MAP_UPDATE event has fired. For the case of entering a battleground such as * WSG,
         * WORLD_MAP_UPDATE won't fire until you leave Silverwing Hold or Warsong Lumber Mill and you are outside.
         * @see https://wow.gamepedia.com/PLAYER_ENTERING_WORLD
         */
        PLAYER_ENTERING_WORLD: null;

        /**
         * Fired when a player engages auto-attack. Note that firing a gun or a spell, or getting aggro, does NOT trigger this event
         * @see https://wow.gamepedia.com/PLAYER_ENTER_COMBAT
         */
        PLAYER_ENTER_COMBAT: null;

        /**
         * unknown
         */
        PLAYER_FARSIGHT_FOCUS_CHANGED: Unknown[];

        /**
         * This event fires when a Unit's flags change (eg: due to /afk, /dnd, etc.)
         * - **arg1**: The UnitId affected, eg: "player"
         * @see https://wow.gamepedia.com/PLAYER_FLAGS_CHANGED
         */
        PLAYER_FLAGS_CHANGED: [UnitId];

        /**
         * This event is fired whenever the player's focus target (/focus) is changed, including when the focus target is lost or cleared
         * @see https://wow.gamepedia.com/PLAYER_FOCUS_CHANGED
         */
        PLAYER_FOCUS_CHANGED: null;

        /**
         * unknown
         */
        PLAYER_GAINS_VEHICLE_DATA: Unknown[];

        /**
         * This appears to be fired when a player is gkicked, gquits, etc
         * @see https://wow.gamepedia.com/PLAYER_GUILD_UPDATE
         */
        PLAYER_GUILD_UPDATE: null;

        /**
         * unknown
         */
        PLAYER_LEARN_PVP_TALENT_FAILED: Unknown[];

        /**
         * unknown
         */
        PLAYER_LEARN_TALENT_FAILED: Unknown[];

        /**
         * Fired when the player leaves combat through death, defeat of opponents, or an ability. Does not fire if a player flees from combat on foot
         * @see https://wow.gamepedia.com/PLAYER_LEAVE_COMBAT
         */
        PLAYER_LEAVE_COMBAT: null;

        /**
         * Fired when a player logs out and possibly at other situations as well
         * @see https://wow.gamepedia.com/PLAYER_LEAVING_WORLD
         */
        PLAYER_LEAVING_WORLD: null;

        /**
         * Fired when a player levels up.
         * - **arg1**: New player level. Note that UnitLevel("player") will most likely return an incorrect value when called in this event handler
         * or shortly after, so use this value
         * - **arg2**: Hit points gained from leveling
         * - **arg3**: Mana points gained from leveling
         * - **arg4**: Talent points gained from leveling
         * - **arg5-9**: Attribute score increases from leveling. Strength (5) / Agility (6) / Stamina (7) / Intellect (8) / Spirit (9)
         * @see https://wow.gamepedia.com/PLAYER_LEVEL_UP
         */
        PLAYER_LEVEL_UP: [number, number, number, number, number, number, number, number, number];

        /**
         * Triggered immediately before PLAYER_ENTERING_WORLD on login and UI Reload, but NOT when entering/leaving instances
         * @see https://wow.gamepedia.com/PLAYER_LOGIN
         */
        PLAYER_LOGIN: null;

        /**
         * Sent when the player logs out or the UI is reloaded, just before SavedVariables are saved. The event fires after PLAYER_LEAVING_WORLD
         * @see https://wow.gamepedia.com/PLAYER_LOGOUT
         */
        PLAYER_LOGOUT: null;

        /**
         * unknown
         */
        PLAYER_LOOT_SPEC_UPDATED: Unknown[];

        /**
         * unknown
         */
        PLAYER_LOSES_VEHICLE_DATA: Unknown[];

        /**
         * Fired whenever the player gains or loses money
         * @see https://wow.gamepedia.com/PLAYER_MONEY
         */
        PLAYER_MONEY: null;

        /**
         * unknown
         */
        PLAYER_MOUNT_DISPLAY_CHANGED: Unknown[];

        /**
         * Fired when you get credit for killing an enemy player. According to wowprogramming.com, only honorable kills will trigger this event
         * @see https://wow.gamepedia.com/PLAYER_PVP_KILLS_CHANGED
         */
        PLAYER_PVP_KILLS_CHANGED: null;

        /**
         * unknown
         */
        PLAYER_PVP_RANK_CHANGED: Unknown[];

        /**
         * unknown
         */
        PLAYER_PVP_TALENT_UPDATE: Unknown[];

        /**
         * Fired when the player tries to quit, as opposed to logout, while outside an inn. This event does not indicate that the "player has quit",
         * but instead that the "player has the quitting option"
         * @see https://wow.gamepedia.com/PLAYER_QUITING
         */
        PLAYER_QUITING: null;

        /**
         * Fired whenever you enter combat, as normal regen rates are disabled during combat. This means that either you are in the hate list of a NPC
         * or that you've been taking part in a pvp action (either as attacker or victim).
         * @see https://wow.gamepedia.com/PLAYER_REGEN_DISABLED
         */
        PLAYER_REGEN_DISABLED: null;

        /**
         * Fired after ending combat, as regen rates return to normal. Useful for determining when a player has left combat. This occurs when you are
         * not on the hate list of any NPC, or a few seconds after the latest pvp attack that you were involved with
         * @see https://wow.gamepedia.com/PLAYER_REGEN_ENABLED
         */
        PLAYER_REGEN_ENABLED: null;

        /**
         * unknown
         */
        PLAYER_REPORT_SUBMITTED: Unknown[];

        /**
         * unknown
         */
        PLAYER_ROLES_ASSIGNED: Unknown[];

        /**
         * Fired when the player's insignia is removed in a Battleground
         * @see https://wow.gamepedia.com/PLAYER_SKINNED
         */
        PLAYER_SKINNED: null;

        /**
         * Fired after unlearning a profession, learning a talent
         * @see https://wow.gamepedia.com/PLAYER_SPECIALIZATION_CHANGED
         */
        PLAYER_SPECIALIZATION_CHANGED: null;

        /**
         * unknown
         */
        PLAYER_STARTED_MOVING: Unknown[];

        /**
         * unknown
         */
        PLAYER_STOPPED_MOVING: Unknown[];

        /**
         * Fired when the player changes between dual talent specs, and possibly when learning or unlearning talents(?). The event is also fired when
         * a player levels up, before PLAYER_LEVEL_UP is fired
         * @see https://wow.gamepedia.com/PLAYER_TALENT_UPDATE
         */
        PLAYER_TALENT_UPDATE: null;

        /**
         * This event fires whenever a totem is dropped (cast) or destroyed (either recalled or killed)
         * - **arg1**: The number of the totem slot (1-4) affected by the update. See for example GetTotemInfo() for the uses of the totem slot number
         * @see https://wow.gamepedia.com/PLAYER_TOTEM_UPDATE
         */
        PLAYER_TOTEM_UPDATE: [number];

        /**
         * unknown
         */
        PLAYER_TRADE_CURRENCY: Unknown[];

        /**
         * Fired when the player trades money
         */
        PLAYER_TRADE_MONEY: null;

        /**
         * unknown
         */
        PLAYER_TRIAL_XP_UPDATE: Unknown[];

        /**
         * Fired when the player is alive after being a ghost. Called after one of
         * - Performing a successful corpse run and the player accepts the 'Resurrect Now' box
         * - Accepting a resurrect from another player after releasing from a death
         * - Zoning into an instance where the player is dead
         * - When the player accept a resurrect from a Spirit Healer
         * @description The player is alive when this event happens. Does not fire when the player is resurrected before releasing. PLAYER_ALIVE
         * is triggered in that case
         * @see https://wow.gamepedia.com/PLAYER_UNGHOST
         */
        PLAYER_UNGHOST: null;

        /**
         * Fired when the player starts or stops resting, i.e. when entering/leaving inns/major towns
         * @see https://wow.gamepedia.com/PLAYER_UPDATE_RESTING
         */
        PLAYER_UPDATE_RESTING: null;

        /**
         * Fired when the player's XP is updated (due quest completion or killing)
         * - **arg1**: The UnitId affected, eg: "player"
         * @see https://wow.gamepedia.com/PLAYER_XP_UPDATE
         */
        PLAYER_XP_UPDATE: [UnitId];

        /**
         * Fired when the playtime state changes
         * @see https://wow.gamepedia.com/PLAYTIME_CHANGED
         */
        PLAYTIME_CHANGED: null;

        /**
         * movie plays
         * - **arg1**: File name (without extension) & path, eg: "INTERFACE\CINEMATICS\FOTLK_1024"
         * - **arg2**: Sound volume (0-150)
         * @see https://wow.gamepedia.com/PLAY_MOVIE
         */
        PLAY_MOVIE: [string, number];

        /**
         * unknown
         */
        PRESTIGE_AND_HONOR_INVOLUNTARILY_CHANGED: Unknown[];

        /**
         * unknown
         */
        PREVIEW_TALENT_POINTS_CHANGED: Unknown[];

        /**
         * unknown
         */
        PREVIEW_TALENT_PRIMARY_TREE_CHANGED: Unknown[];

        /**
         * unknown
         */
        PRODUCT_ASSIGN_TO_TARGET_FAILED: Unknown[];

        /**
         * unknown
         */
        PRODUCT_CHOICE_UPDATE: Unknown[];

        /**
         * unknown
         */
        PRODUCT_DISTRIBUTIONS_UPDATED: Unknown[];

        /**
         * unknown
         */
        PROVING_GROUNDS_SCORE_UPDATE: Unknown[];

        /**
         * unknown
         */
        PVPQUEUE_ANYWHERE_SHOW: Unknown[];

        /**
         * unknown
         */
        PVPQUEUE_ANYWHERE_UPDATE_AVAILABLE: Unknown[];

        /**
         * unknown
         */
        PVP_BRAWL_INFO_UPDATED: Unknown[];

        /**
         * unknown
         */
        PVP_POWER_UPDATE: Unknown[];

        /**
         * unknown
         */
        PVP_RATED_STATS_UPDATE: Unknown[];

        /**
         * unknown
         */
        PVP_REWARDS_UPDATE: Unknown[];

        /**
         * unknown
         */
        PVP_ROLE_UPDATE: Unknown[];

        /**
         * unknown
         */
        PVP_TIMER_UPDATE: Unknown[];

        /**
         * unknown
         */
        PVP_TYPES_ENABLED: Unknown[];

        /**
         * unknown
         */
        PVP_WORLDSTATE_UPDATE: Unknown[];

        /**
         * unknown
         */
        QUESTLINE_UPDATE: Unknown[];

        /**
         * This event fires whenever the player accepts a quest
         * - **arg1**: Quest log index. You may pass this to GetQuestLogTitle() for information about the accepted quest
         * - **arg2**: QuestID of the quest accepted
         * @see https://wow.gamepedia.com/QUEST_ACCEPTED
         */
        QUEST_ACCEPTED: [number, number];

        /**
         * This event fires when an escort quest is started by another player. A dialog appears asking if the player also wants to start the quest
         * - **arg1**: Name of player who is starting escort quest
         * - **arg2**: Title of escort quest. Eg. "Protecting the Shipment"
         * @see https://wow.gamepedia.com/QUEST_ACCEPT_CONFIRM
         */
        QUEST_ACCEPT_CONFIRM: [string, string];

        /**
         * unknown
         */
        QUEST_BOSS_EMOTE: Unknown[];

        /**
         * unknown
         */
        QUEST_CHOICE_CLOSE: Unknown[];

        /**
         * unknown
         */
        QUEST_CHOICE_UPDATE: Unknown[];

        /**
         * Fired after the player hits the "Continue" button in the quest-information page, before the "Complete Quest" button. In other words it
         * fires when you are given the option to complete a quest, but just before you actually complete the quest (as stated above).
         * @see https://wow.gamepedia.com/QUEST_COMPLETE
         */
        QUEST_COMPLETE: null;

        /**
         * Fired when the player is given a more detailed view of his quest
         * - **arg1**: questStartItemID. If not nil or zero, the ItemID of the item which begins the quest displayed in the quest detail view
         * @see https://wow.gamepedia.com/QUEST_DETAIL
         */
        QUEST_DETAIL: [number];

        /**
         * Fired whenever the quest frame changes (Detail to Progress to Reward, etc.) or is closed
         * @see https://wow.gamepedia.com/QUEST_FINISHED
         */
        QUEST_FINISHED: null;

        /**
         * Fired when talking to an NPC that offers or accepts more than one quest, i.e. has more than one active or available quest
         * @see https://wow.gamepedia.com/QUEST_GREETING
         */
        QUEST_GREETING: null;

        /**
         * Fired when the quest items are updated
         * @see https://wow.gamepedia.com/QUEST_ITEM_UPDATE
         */
        QUEST_ITEM_UPDATE: null;

        /**
         * unknown
         */
        QUEST_LOG_CRITERIA_UPDATE: Unknown[];

        /**
         * This event is fired very often. This includes, but is not limited to: viewing a quest for the first time in a session in the Quest Log;
         * (once for each quest?) every time the player changes zones across an instance boundary; every time the player picks up a non-grey item;
         * every time after the player completes a quest goal, such as killing a mob for a quest. It also fires whenever the player (or addon using
         * the CollapseQuestHeader or ExpandQuestHeader() functions) collapses or expands any zone header in the quest log
         * @see https://wow.gamepedia.com/QUEST_LOG_UPDATE
         */
        QUEST_LOG_UPDATE: null;

        /**
         * Fired whenever Quest POIs change. For example after accepting an quest
         * @see https://wow.gamepedia.com/QUEST_POI_UPDATE
         */
        QUEST_POI_UPDATE: null;

        /**
         * Fired when a player is talking to an NPC about the status of a quest and has not yet clicked the complete button
         * @see https://wow.gamepedia.com/QUEST_PROGRESS
         */
        QUEST_PROGRESS: null;

        /**
         * Fired when a quest is removed from your quest log by abandoning it.
         * - **arg1**: QuestID of the quest accepted
         * @see https://wow.gamepedia.com/QUEST_REMOVED
         */
        QUEST_REMOVED: [number];

        /**
         * unknown
         */
        QUEST_WATCH_LIST_CHANGED: Unknown[];

        /**
         * unknown
         */
        QUEST_WATCH_OBJECTIVES_CHANGED: Unknown[];

        /**
         * Fired just before a quest goal was completed. At this point the game client's quest data is not yet updated, but will be after a subsequent
         * QUEST_LOG_UPDATE event
         * - **arg1**: questIndex (not watch index)
         * @see https://wow.gamepedia.com/QUEST_WATCH_UPDATE
         */
        QUEST_WATCH_UPDATE: [number];

        /**
         * unknown
         */
        QUICK_TICKET_SYSTEM_STATUS: Unknown[];

        /**
         * unknown
         */
        QUICK_TICKET_THROTTLE_CHANGED: Unknown[];

        /**
         * unknown
         */
        RAID_BOSS_EMOTE: Unknown[];

        /**
         * unknown
         */
        RAID_BOSS_WHISPER: Unknown[];

        /**
         * Fired when the player enters an instance that saves raid members after a boss is killed
         * - **arg1**: instance name
         * - **arg2**: seconds until reset
         * @see https://wow.gamepedia.com/RAID_INSTANCE_WELCOME
         */
        RAID_INSTANCE_WELCOME: [string, number];

        /**
         * Fired whenever a raid is formed or disbanded, players are leaving or joining a raid (unsure if rejected join requests also fire the event),
         * or when looting rules are changed (regardless of being in raid or party!)
         * @see https://wow.gamepedia.com/RAID_ROSTER_UPDATE
         */
        RAID_ROSTER_UPDATE: null;

        /**
         * Fired when a raid target icon is changed or removed. Also fired when player join or leave a party or raid. arg1 is who gets updated
         * @since 1.11
         * @see https://wow.gamepedia.com/RAID_TARGET_UPDATE
         */
        RAID_TARGET_UPDATE: null;

        /**
         * unknown
         */
        RAISED_AS_GHOUL: Unknown[];

        /**
         * Fired when a Ready Check is performed by the raid (or party) leader
         * - **arg1**: name of character requesting ready check (ie., "Ansu")
         * - **arg2**: variable number (usually 30). Denotes time before automatic check completion
         * @see https://wow.gamepedia.com/READY_CHECK
         */
        READY_CHECK: [string, number];

        /**
         * Fired when a player confirms ready status
         * - **arg1**: UnitID (raid1, party1). Fires twice if the confirming player is in your raid sub-group
         * - **arg2**: status (1=ready, 0=not ready)
         * @see https://wow.gamepedia.com/READY_CHECK_CONFIRM
         */
        READY_CHECK_CONFIRM: [UnitId, 1 | 0];

        /**
         * Fired when the ready check completes
         * @see https://wow.gamepedia.com/READY_CHECK_FINISHED
         */
        READY_CHECK_FINISHED: null;

        /**
         * unknown
         */
        REAGENTBANK_PURCHASED: Unknown[];

        /**
         * unknown
         */
        REAGENTBANK_UPDATE: Unknown[];

        /**
         * unknown
         */
        RECEIVED_ACHIEVEMENT_LIST: Unknown[];

        /**
         * unknown
         */
        RECEIVED_ACHIEVEMENT_MEMBER_LIST: Unknown[];

        /**
         * unknown
         */
        RECRUIT_A_FRIEND_CAN_EMAIL: Unknown[];

        /**
         * unknown
         */
        RECRUIT_A_FRIEND_INVITATION_FAILED: Unknown[];

        /**
         * unknown
         */
        RECRUIT_A_FRIEND_INVITER_FRIEND_ADDED: Unknown[];

        /**
         * unknown
         */
        RECRUIT_A_FRIEND_SYSTEM_STATUS: Unknown[];

        /**
         * Fired when the player must confirm an enchantment replacement
         * - **arg1**: new enchantment
         * - **arg2**: current enchantment
         * @see https://wow.gamepedia.com/REPLACE_ENCHANT
         */
        REPLACE_ENCHANT: Unknown[];

        /**
         * @see https://wow.gamepedia.com/REPLICATE_ITEM_LIST_UPDATE
         */
        REPLICATE_ITEM_LIST_UPDATE: null;

        /**
         * unknown
         */
        REQUEST_CEMETERY_LIST_RESPONSE: Unknown[];

        /**
         * unknown
         */
        REQUIRED_GUILD_RENAME_RESULT: Unknown[];

        /**
         * Fired when an item is solved via Archaeology
         * - **arg1**: the name of the completed artifact
         * @see https://wow.gamepedia.com/RESEARCH_ARTIFACT_COMPLETE
         */
        RESEARCH_ARTIFACT_COMPLETE: [string];

        /**
         * unknown
         */
        RESEARCH_ARTIFACT_DIG_SITE_UPDATED: Unknown[];

        /**
         * unknown
         */
        RESEARCH_ARTIFACT_HISTORY_READY: Unknown[];

        /**
         * unknown
         */
        RESEARCH_ARTIFACT_UPDATE: Unknown[];

        /**
         * unknown
         */
        RESTRICTED_ACCOUNT_WARNING: Unknown[];

        /**
         * Fired when another player resurrects you
         * - **arg1**: player name
         * @see https://wow.gamepedia.com/RESURRECT_REQUEST
         */
        RESURRECT_REQUEST: [string];

        /**
         * triggered when the role chanes
         * - **arg1**: player name
         * - **arg2**: source of change
         * - **arg3**: previous role
         * - **arg4**: new role
         * @see https://wow.gamepedia.com/ROLE_CHANGED_INFORM
         */
        ROLE_CHANGED_INFORM: [string, string, string, string];

        /**
         * unknown
         */
        ROLE_POLL_BEGIN: Unknown[];

        /**
         * Fired when a rune's state switches from usable to un-usable or visa-versa
         * - **arg1**: the rune that it's referencing to
         * - **arg2**: is the rune usable (if usable, it's not cooling, if not usable it's cooling)
         * @since 3.0.1
         * @see https://wow.gamepedia.com/RUNE_POWER_UPDATE
         */
        RUNE_POWER_UPDATE: [string, boolean];

        /**
         * Fired when a rune's type is changed / updated
         * - **arg1**: the rune that it's referencing to
         * @since 3.0.1
         * @see https://wow.gamepedia.com/RUNE_TYPE_UPDATE
         */
        RUNE_TYPE_UPDATE: [string];

        /**
         * Fired immediately after ADDON_LOADED if either its Account or Character SavedVariables file failed to load due to an out-of-memory error.
         * See Saved Variables Loading for more details
         * - **arg1**: name of the AddOn whose SavedVariables failed to load
         * @see https://wow.gamepedia.com/SAVED_VARIABLES_TOO_LARGE
         */
        SAVED_VARIABLES_TOO_LARGE: [string];

        /**
         * unknown
         */
        SCENARIO_COMPLETED: Unknown[];

        /**
         * unknown
         */
        SCENARIO_CRITERIA_SHOW_STATE_UPDATE: Unknown[];

        /**
         * unknown
         */
        SCENARIO_CRITERIA_UPDATE: Unknown[];

        /**
         * unknown
         */
        SCENARIO_POI_UPDATE: Unknown[];

        /**
         * unknown
         */
        SCENARIO_SPELL_UPDATE: Unknown[];

        /**
         * unknown
         */
        SCENARIO_UPDATE: Unknown[];

        /**
         * Fired when a screenshot fails
         * @see https://wow.gamepedia.com/SCREENSHOT_FAILED
         */
        SCREENSHOT_FAILED: null;

        /**
         * unknown
         */
        SCREENSHOT_STARTED: Unknown[];

        /**
         * Fired when a screenshot is successfully taken
         * @see https://wow.gamepedia.com/SCREENSHOT_SUCCEEDED
         */
        SCREENSHOT_SUCCEEDED: null;

        /**
         * unknown
         */
        SCRIPT_ACHIEVEMENT_PLAYER_NAME: Unknown[];

        /**
         * unknown
         */
        SEARCH_DB_LOADED: Unknown[];

        /**
         * unknown
         */
        SECURE_TRANSFER_CANCEL: Unknown[];

        /**
         * unknown
         */
        SECURE_TRANSFER_CONFIRM_SEND_MAIL: Unknown[];

        /**
         * unknown
         */
        SECURE_TRANSFER_CONFIRM_TRADE_ACCEPT: Unknown[];

        /**
         * unknown
         */
        SELF_RES_SPELL_CHANGED: Unknown[];

        /**
         * unknown
         */
        SEND_MAIL_COD_CHANGED: Unknown[];

        /**
         * unknown
         */
        SEND_MAIL_MONEY_CHANGED: Unknown[];

        /**
         * unknown
         */
        SESSION_TIME_ALERT: Unknown[];

        /**
         * unknown
         */
        SHIPMENT_CRAFTER_CLOSED: Unknown[];

        /**
         * unknown
         */
        SHIPMENT_CRAFTER_INFO: Unknown[];

        /**
         * unknown
         */
        SHIPMENT_CRAFTER_OPENED: Unknown[];

        /**
         * unknown
         */
        SHIPMENT_CRAFTER_REAGENT_UPDATE: Unknown[];

        /**
         * unknown
         */
        SHIPMENT_UPDATE: Unknown[];

        /**
         * unknown
         */
        SHOW_FACTION_SELECT_UI: Unknown[];

        /**
         * Fired upon receiving fancy loot (LFR, bonus rolls, certain containers like pet battle supplies in 5.3).
         * - **arg1**: either "item" or "money"
         * - **arg2**: item link of the item received
         * - **arg3**: quantity of item/money (in copper) received
         * @see https://wow.gamepedia.com/SHOW_LOOT_TOAST
         */
        SHOW_LOOT_TOAST: [string, ItemLink, number, 0];

        /**
         * unknown
         */
        SHOW_LOOT_TOAST_LEGENDARY_LOOTED: Unknown[];

        /**
         * unknown
         */
        SHOW_LOOT_TOAST_UPGRADE: Unknown[];

        /**
         * unknown
         */
        SHOW_PVP_FACTION_LOOT_TOAST: Unknown[];

        /**
         * unknown
         */
        SHOW_RATED_PVP_REWARD_TOAST: Unknown[];

        /**
         * unknown
         */
        SIMPLE_BROWSER_WEB_ERROR: Unknown[];

        /**
         * unknown
         */
        SIMPLE_BROWSER_WEB_PROXY_FAILED: Unknown[];

        /**
         * unknown
         */
        SIMPLE_CHECKOUT_CLOSED: Unknown[];

        /**
         * Fired when the content of the player's skill list changes. It only fires for major changes to the list, such as learning or unlearning a
         * skill or raising one's level from Journeyman to Master. It doesn't fire for skill rank increases. Using 'RegisterUnitEvent' to register for
         * this event does not appear to work
         * @see https://wow.gamepedia.com/SKILL_LINES_CHANGED
         */
        SKILL_LINES_CHANGED: null;

        /**
         * unknown
         */
        SOCIAL_ITEM_RECEIVED: Unknown[];

        /**
         * unknown
         */
        SOCIAL_QUEUE_CONFIG_UPDATED: Unknown[];

        /**
         * unknown
         */
        SOCIAL_QUEUE_UPDATE: Unknown[];

        /**
         * unknown
         */
        SOCKET_INFO_ACCEPT: Unknown[];

        /**
         * unknown
         */
        SOCKET_INFO_CLOSE: Unknown[];

        /**
         * unknown
         */
        SOCKET_INFO_FAILURE: Unknown[];

        /**
         * unknown
         */
        SOCKET_INFO_SUCCESS: Unknown[];

        /**
         * unknown
         */
        SOCKET_INFO_UPDATE: Unknown[];

        /**
         * unknown
         */
        SOR_BY_TEXT_UPDATED: Unknown[];

        /**
         * unknown
         */
        SOR_COUNTS_UPDATED: Unknown[];

        /**
         * unknown
         */
        SOR_START_EXPERIENCE_INCOMPLETE: Unknown[];

        /**
         * unknown
         */
        SOUNDKIT_FINISHED: Unknown[];

        /**
         * unknown
         */
        SOUND_DEVICE_UPDATE: Unknown[];

        /**
         * unknown
         */
        SPEC_INVOLUNTARILY_CHANGED: Unknown[];

        /**
         * unknown
         */
        SPEED_UPDATE: Unknown[];

        /**
         * No arguments. Fires when spells in the spellbook change in any way. Can be trivial (eg: icon changes only)
         * @see https://wow.gamepedia.com/SPELLS_CHANGED
         */
        SPELLS_CHANGED: null;

        /**
         * unknown
         */
        SPELL_ACTIVATION_OVERLAY_GLOW_HIDE: Unknown[];

        /**
         * unknown
         */
        SPELL_ACTIVATION_OVERLAY_GLOW_SHOW: Unknown[];

        /**
         * Added in 4.0 for the Spell Alert overlay feature
         * - **arg1**: spellId
         * @see https://wow.gamepedia.com/SPELL_ACTIVATION_OVERLAY_HIDE
         */
        SPELL_ACTIVATION_OVERLAY_HIDE: [number];

        /**
         * Added in 4.0 for the Spell Alert overlay feature
         * - **arg1**: spellID
         * - **arg2**: texture
         * - **arg3**: position, Possible values include simple points such as "CENTER" or "LEFT", or complex positions such as "RIGHT (FLIPPED)"
         * or "TOP + BOTTOM (FLIPPED)", which are defined in a local table in SpellActivationOverlay.lua
         * - **arg4**: scale
         * - **arg5**: red
         * - **arg6**: green
         * - **arg7**: blue
         * @see https://wow.gamepedia.com/SPELL_ACTIVATION_OVERLAY_SHOW
         */
        SPELL_ACTIVATION_OVERLAY_SHOW: [number, TexturePath, string, number, number, number, number];

        /**
         * Fires when a spell confirmation prompt might be presented to the player. After this event has fired, the client can respond with the functions
         * AcceptSpellConfirmationPrompt and DeclineSpellConfirmationPrompt. Notably, the event does not guarantee that the player can actually cast the
         * spell
         * - **arg1**: Spell ID for the Confirmation Prompt Spell. These are very specific spells that only appear during this event
         * - **arg2**: The possible values for this are not entirely known, however, 1 does seem to be the confirmType when the prompt triggers a bonus roll
         * - **arg3**: So far, I've only seen this value be a blank string of "". Presumably, it will contain text if text is needed, but with bonus rolls,
         * it is not needed
         * - **arg4**: This number is in seconds. Typically, it is 180 seconds
         * - **arg5**: The ID of the currency required if the prompt requires a currency (it does for bonus rolls)
         * @see https://wow.gamepedia.com/SPELL_CONFIRMATION_PROMPT
         */
        SPELL_CONFIRMATION_PROMPT: [number, number, string, number, number];

        /**
         * Fires when a spell confirmation prompt was not accepted via AcceptSpellConfirmationPrompt or declined via DeclineSpellConfirmationPrompt within
         * the allotted time (usually 3 minutes).
         * @see https://wow.gamepedia.com/SPELL_CONFIRMATION_TIMEOUT
         */
        SPELL_CONFIRMATION_TIMEOUT: null;

        /**
         * unknown
         */
        SPELL_FLYOUT_UPDATE: Unknown[];

        /**
         * unknown
         */
        SPELL_PUSHED_TO_ACTIONBAR: Unknown[];

        /**
         * unknown
         */
        SPELL_UPDATE_CHARGES: Unknown[];

        /**
         * This event is fired every three seconds for no apparent reason (correct as of patch 3.3.3).
         * @see https://wow.gamepedia.com/SPELL_UPDATE_COOLDOWN
         */
        SPELL_UPDATE_COOLDOWN: null;

        /**
         * unknown
         */
        SPELL_UPDATE_ICON: Unknown[];

        /**
         * This event is fired when a spell becomes useable or unusable. However the definition of useable and unusable is somewhat confusing. Firstly, range is
         * not taken into account. Secondly if a spell requires a valid target and doesn't have one it gets marked as useable. If it requires mana or rage and
         * there isn't enough then it gets marked as unusable. This results in the following behaviour:
         * - Start) Feral druid in bear form out of combat, no target selected
         * - 1) Target enemy. Event is fired as some spells that require rage become marked as unusable. On the action bar the spell is marked in red as
         *   unusable.
         * - 2) Use Enrage to gain rage. Event is fired as we now have enough rage. On the action bar the spell is marked unusable as out of range.
         * - 3) Move into range. Event is not fired. On the action bar the spell is marked usable.
         * - 4) Rage runs out. Event is fired as we no longer have enough rage.
         * - 5) Remove target. Event is fired and spell is marked as useable on action bar.
         * @description It appears that the definition of useable is a little inaccurate and relates more to how it is displayed on the action bar than
         * whether you can use the spell. Also after being attacked the event started firing every two seconds and this continued until well after the
         * attacker was dead. Targetting a fresh enemy seemed to stop it.
         * @see https://wow.gamepedia.com/SPELL_UPDATE_USABLE
         */
        SPELL_UPDATE_USABLE: null;

        /**
         * unknown
         */
        START_AUTOREPEAT_SPELL: Unknown[];

        /**
         * Fired when a group loot item is being rolled on
         * - **arg1**: The rollID of the item being rolled on.
         * - **arg2**: The roll time
         * @see https://wow.gamepedia.com/START_LOOT_ROLL
         */
        START_LOOT_ROLL: [number, number];

        /**
         * unknown
         */
        START_TIMER: Unknown[];

        /**
         * unknown
         */
        STOP_AUTOREPEAT_SPELL: Unknown[];

        /**
         * unknown
         */
        STORE_BOOST_AUTO_CONSUMED: Unknown[];

        /**
         * unknown
         */
        STORE_CHARACTER_LIST_RECEIVED: Unknown[];

        /**
         * unknown
         */
        STORE_CLOSE_SIMPLE_CHECKOUT: Unknown[];

        /**
         * unknown
         */
        STORE_CONFIRM_PURCHASE: Unknown[];

        /**
         * unknown
         */
        STORE_OPEN_SIMPLE_CHECKOUT: Unknown[];

        /**
         * unknown
         */
        STORE_ORDER_INITIATION_FAILED: Unknown[];

        /**
         * unknown
         */
        STORE_PRODUCTS_UPDATED: Unknown[];

        /**
         * unknown
         */
        STORE_PRODUCT_DELIVERED: Unknown[];

        /**
         * unknown
         */
        STORE_PURCHASE_ERROR: Unknown[];

        /**
         * unknown
         */
        STORE_PURCHASE_LIST_UPDATED: Unknown[];

        /**
         * unknown
         */
        STORE_REFRESH: Unknown[];

        /**
         * unknown
         */
        STORE_STATUS_CHANGED: Unknown[];

        /**
         * unknown
         */
        STORE_VAS_PURCHASE_COMPLETE: Unknown[];

        /**
         * unknown
         */
        STORE_VAS_PURCHASE_ERROR: Unknown[];

        /**
         * unknown
         */
        STURDINESS_UPDATE: Unknown[];

        /**
         * unknown
         */
        SUBSCRIPTION_CHANGED_KICK_IMMINENT: Unknown[];

        /**
         * unknown
         */
        SUPER_TRACKED_QUEST_CHANGED: Unknown[];

        /**
         * unknown
         */
        SYNCHRONIZE_SETTINGS: Unknown[];

        /**
         * Fired when a system message occurs. Gets displayed in the UI error frame (the default red text in the top half of the screen) in the default UI
         * - **arg1**: message
         * - **arg2**: red
         * - **arg3**: green
         * - **arg4**: blue
         * @see https://wow.gamepedia.com/SYSMSG
         */
        SYSMSG: null;

        /**
         * Fired when it is possible to save a tabard
         * @see https://wow.gamepedia.com/TABARD_CANSAVE_CHANGED
         */
        TABARD_CANSAVE_CHANGED: null;

        /**
         * unknown
         */
        TABARD_SAVE_PENDING: Unknown[];

        /**
         * unknown
         */
        TALENTS_INVOLUNTARILY_RESET: Unknown[];

        /**
         * unknown
         */
        TALKINGHEAD_CLOSE: Unknown[];

        /**
         * unknown
         */
        TALKINGHEAD_REQUESTED: Unknown[];

        /**
         * unknown
         */
        TASK_PROGRESS_UPDATE: Unknown[];

        /**
         * Fired when the taxi frame is closed
         * @see https://wow.gamepedia.com/TAXIMAP_CLOSED
         */
        TAXIMAP_CLOSED: null;

        /**
         * Fired when the taxi viewer is opened
         * @see https://wow.gamepedia.com/TAXIMAP_OPENED
         */
        TAXIMAP_OPENED: null;

        /**
         * Fired when the client received a time played message
         * - **arg1**: total time
         * - **arg2**: current time at this level
         * @see https://wow.gamepedia.com/TIME_PLAYED_MSG
         */
        TIME_PLAYED_MSG: [number, number];

        /**
         * unknown
         */
        TOGGLE_CONSOLE: Unknown[];

        /**
         * unknown
         */
        TOKEN_AUCTION_SOLD: Unknown[];

        /**
         * unknown
         */
        TOKEN_BUY_CONFIRM_REQUIRED: Unknown[];

        /**
         * unknown
         */
        TOKEN_BUY_RESULT: Unknown[];

        /**
         * unknown
         */
        TOKEN_DISTRIBUTIONS_UPDATED: Unknown[];

        /**
         * unknown
         */
        TOKEN_MARKET_PRICE_UPDATED: Unknown[];

        /**
         * unknown
         */
        TOKEN_REDEEM_BALANCE_UPDATED: Unknown[];

        /**
         * unknown
         */
        TOKEN_REDEEM_CONFIRM_REQUIRED: Unknown[];

        /**
         * unknown
         */
        TOKEN_REDEEM_FRAME_SHOW: Unknown[];

        /**
         * unknown
         */
        TOKEN_REDEEM_GAME_TIME_UPDATED: Unknown[];

        /**
         * unknown
         */
        TOKEN_REDEEM_RESULT: Unknown[];

        /**
         * @see https://wow.gamepedia.com/TOKEN_SELL_CONFIRMED
         */
        TOKEN_SELL_CONFIRMED: null;

        /**
         * unknown
         */
        TOKEN_SELL_CONFIRM_REQUIRED: Unknown[];

        /**
         * unknown
         */
        TOKEN_SELL_RESULT: Unknown[];

        /**
         * unknown
         */
        TOKEN_STATUS_CHANGED: Unknown[];

        /**
         * unknown
         */
        TOYS_UPDATED: Unknown[];

        /**
         * unknown
         */
        TRACKED_ACHIEVEMENT_LIST_CHANGED: Unknown[];

        /**
         * Fired when a timed event for an achievement begins or ends. The achievement does not have to be actively tracked for this to trigger
         * - **arg1**: achievmentID
         * - **arg2**: criteriaID
         * - **arg3**: Actual time
         * - **arg4**: Time limit
         * @see https://wow.gamepedia.com/TRACKED_ACHIEVEMENT_UPDATE
         */
        TRACKED_ACHIEVEMENT_UPDATE: [number, number, number, number];

        /**
         * Fired when the status of the player and target accept buttons has changed. Target agree status only shown when he has done it first.
         * By this, player and target agree status is only shown together (arg1 == 1 and arg2 == 1), when player agreed after target
         * - **arg1**: Player has agreed to the trade (1) or not (0)
         * - **arg2**: Target has agreed to the trade (1) or not (0)
         * @see https://wow.gamepedia.com/TRADE_ACCEPT_UPDATE
         */
        TRADE_ACCEPT_UPDATE: [Flag, Flag];

        /**
         * Fired when the trade window is closed by the trade being accepted, or the player or target closes the window
         * @see https://wow.gamepedia.com/TRADE_CLOSED
         */
        TRADE_CLOSED: null;

        /**
         * unknown
         */
        TRADE_CURRENCY_CHANGED: Unknown[];

        /**
         * Fired when the trade window's money value is changed
         * @see https://wow.gamepedia.com/TRADE_MONEY_CHANGED
         */
        TRADE_MONEY_CHANGED: null;

        /**
         * Fired when an item in the target's trade window is changed (items added or removed from trade). First call not fired when start trading
         * by dropping item on target
         * - **arg1**: index of the trade slot changed
         * @see https://wow.gamepedia.com/TRADE_PLAYER_ITEM_CHANGED
         */
        TRADE_PLAYER_ITEM_CHANGED: [number];

        /**
         * unknown
         */
        TRADE_POTENTIAL_BIND_ENCHANT: Unknown[];

        /**
         * unknown
         */
        TRADE_POTENTIAL_REMOVE_TRANSMOG: Unknown[];

        /**
         * Fired when the player must confirm an enchantment replacement in the trade window
         * - **arg1**: new enchantment
         * - **arg2**: current enchantment
         * @see https://wow.gamepedia.com/TRADE_REPLACE_ENCHANT
         */
        TRADE_REPLACE_ENCHANT: [Unknown, Unknown];

        /**
         * It appears that this event was removed from the game. It was once used to ask you if you wanted to accept or reject a trade. It no longer
         * triggers, not even when "Block Trades" is enabled. Fired when another player wishes to trade with you
         * - **arg1**: player name
         * @see https://wow.gamepedia.com/TRADE_REQUEST
         */
        TRADE_REQUEST: [string];

        /**
         * Fired when a trade attempt is cancelled. Fired after TRADE_CLOSE when aborted by player, before TRADE_CLOSE when done by target
         * @see https://wow.gamepedia.com/TRADE_REQUEST_CANCEL
         */
        TRADE_REQUEST_CANCEL: null;

        /**
         * Fired when the Trade window appears after a trade request has been accepted or auto-accepted
         * @see https://wow.gamepedia.com/TRADE_SHOW
         */
        TRADE_SHOW: null;

        /**
         * Fired when a trade skill window is closed
         * @see https://wow.gamepedia.com/TRADE_SKILL_CLOSE
         */
        TRADE_SKILL_CLOSE: null;

        /**
         * unknown
         */
        TRADE_SKILL_DATA_SOURCE_CHANGED: Unknown[];

        /**
         * unknown
         */
        TRADE_SKILL_DATA_SOURCE_CHANGING: Unknown[];

        /**
         * unknown
         */
        TRADE_SKILL_DETAILS_UPDATE: Unknown[];

        /**
         * unknown
         */
        TRADE_SKILL_FILTER_UPDATE: Unknown[];

        /**
         * unknown
         */
        TRADE_SKILL_LIST_UPDATE: Unknown[];

        /**
         * unknown
         */
        TRADE_SKILL_NAME_UPDATE: Unknown[];

        /**
         * Fired when a trade skill window is opened
         * @see https://wow.gamepedia.com/TRADE_SKILL_SHOW
         */
        TRADE_SKILL_SHOW: null;

        /**
         * Fired when an item in the target's trade window is changed (items added or removed from trade).
         * - **arg1**: index of the trade slot changed
         * @see https://wow.gamepedia.com/TRADE_TARGET_ITEM_CHANGED
         */
        TRADE_TARGET_ITEM_CHANGED: [number];

        /**
         * Fired when the trade window is changed
         * @see https://wow.gamepedia.com/TRADE_UPDATE
         */
        TRADE_UPDATE: null;

        /**
         * Fired when the trainer is closed
         * @see https://wow.gamepedia.com/TRAINER_CLOSED
         */
        TRAINER_CLOSED: null;

        /**
         * unknown
         */
        TRAINER_DESCRIPTION_UPDATE: Unknown[];

        /**
         * Fired when the class trainer frame is shown
         * @see https://wow.gamepedia.com/TRAINER_SHOW
         */
        TRAINER_SHOW: null;

        /**
         * Fired when the trainer window needs to update
         * @see https://wow.gamepedia.com/TRAINER_UPDATE
         */
        TRAINER_UPDATE: null;

        /**
         * Fired when the TransmogrifyFrame is closed
         * @see https://wow.gamepedia.com/TRANSMOGRIFY_CLOSE
         */
        TRANSMOGRIFY_CLOSE: null;

        /**
         * unknown
         */
        TRANSMOGRIFY_ITEM_UPDATE: Unknown[];

        /**
         * Fired when the TransmogrifyFrame is opened
         * @see https://wow.gamepedia.com/TRANSMOGRIFY_OPEN
         */
        TRANSMOGRIFY_OPEN: null;

        /**
         * Fired when an item has been successfully tranmogrified
         * - **arg1**: slotId
         * @see https://wow.gamepedia.com/TRANSMOGRIFY_SUCCESS
         */
        TRANSMOGRIFY_SUCCESS: [INVENTORY_SLOT_ID];

        /**
         * Fired when an item is set for (de)transmogrification
         * - **arg1**: slotId
         * @see https://wow.gamepedia.com/TRANSMOGRIFY_UPDATE
         */
        TRANSMOGRIFY_UPDATE: [INVENTORY_SLOT_ID];

        /**
         * unknown
         */
        TRANSMOG_COLLECTION_CAMERA_UPDATE: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_COLLECTION_ITEM_UPDATE: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_COLLECTION_LOADED: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_COLLECTION_SOURCE_ADDED: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_COLLECTION_SOURCE_REMOVED: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_COLLECTION_UPDATED: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_OUTFITS_CHANGED: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_SEARCH_UPDATED: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_SETS_UPDATE_FAVORITE: Unknown[];

        /**
         * unknown
         */
        TRANSMOG_SOURCE_COLLECTABILITY_UPDATE: Unknown[];

        /**
         * unknown
         */
        TRIAL_CAP_REACHED_LEVEL: Unknown[];

        /**
         * unknown
         */
        TRIAL_CAP_REACHED_MONEY: Unknown[];

        /**
         * unknown
         */
        TRIAL_STATUS_UPDATE: Unknown[];

        /**
         * Fired when the tutorial/tips are shown. Will not fire if tutorials are turned off
         * @see https://wow.gamepedia.com/TUTORIAL_TRIGGER
         */
        TUTORIAL_TRIGGER: null;

        /**
         * unknown
         */
        TWITTER_LINK_RESULT: Unknown[];

        /**
         * unknown
         */
        TWITTER_POST_RESULT: Unknown[];

        /**
         * unknown
         */
        TWITTER_STATUS_UPDATE: Unknown[];

        /**
         * Fired when the interface creates an error message. These are the red messages that show in the top middle of the screen.
         * "Your inventory is full." is one example
         * - **arg1**: message_string
         * - **arg2**: message_type, see GetGameMessageInfo
         * - **arg3**: message_string
         * @see https://wow.gamepedia.com/UI_ERROR_MESSAGE
         */
        UI_ERROR_MESSAGE: [string, string, string];

        /**
         * Fired when the interface generates a message. These are the yellow messages in the top middle of the window. "No fish are hooked." is one example
         * - **arg1**: message_string
         * - **arg2**: message_type, see GetGameMessageInfo
         * - **arg3**: message_string
         * @see https://wow.gamepedia.com/UI_INFO_MESSAGE
         */
        UI_INFO_MESSAGE: [string, string, string];

        /**
         * unknown
         */
        UI_MODEL_SCENE_INFO_UPDATED: Unknown[];

        /**
         * unknown
         */
        UI_SCALE_CHANGED: Unknown[];

        /**
         * Fired when a unit's absorb amount changes (for example, when he gains/loses an absorb effect such as Power Word: Shield, or when he
         * gains/loses some of his absorb via getting hit or through an ability).Will only fire for existing units, and not for targets of units
         * (focustarget, targettarget, etc)
         * @see https://wow.gamepedia.com/UNIT_ABSORB_AMOUNT_CHANGED
         */
        UNIT_ABSORB_AMOUNT_CHANGED: null;

        /**
         * Fired when a units attack is affected (such as the weapon being swung). First argument returned appears to be which unit this event applies
         * to (for example, 'player')
         * @see https://wow.gamepedia.com/UNIT_ATTACK
         */
        UNIT_ATTACK: null;

        /**
         * Fired when a unit's attack power changes
         * @see https://wow.gamepedia.com/UNIT_ATTACK_POWER
         */
        UNIT_ATTACK_POWER: null;

        /**
         * Fired when your attack speed is being listed or affected
         * @see https://wow.gamepedia.com/UNIT_ATTACK_SPEED
         */
        UNIT_ATTACK_SPEED: null;

        /**
         * Fired when a buff, debuff, status, or item bonus was gained by or faded from an entity (player, pet, NPC, or mob.)
         * - **arg1**: the UnitID of the entity
         * @see https://wow.gamepedia.com/UNIT_AURA
         */
        UNIT_AURA: [UnitId];

        /**
         * unknown
         */
        UNIT_CLASSIFICATION_CHANGED: Unknown[];

        /**
         * Fired when an npc or player participates in combat and takes damage
         * - **arg1**: the UnitID of the entity
         * - **arg2**: Action,Damage,etc (e.g. HEAL, DODGE, BLOCK, WOUND, MISS, PARRY, RESIST, ...)
         * - **arg3**: Critical/Glancing indicator (e.g. CRITICAL, CRUSHING, GLANCING)
         * - **arg4**: The numeric damage
         * - **arg5**: Damage type in numeric value (1 - physical; 2 - holy; 4 - fire; 8 - nature; 16 - frost; 32 - shadow; 64 - arcane)
         * @see https://wow.gamepedia.com/UNIT_COMBAT
         */
        UNIT_COMBAT: [UnitId, CombatTextType, CombatCriticalIndicator, number, CombatDamageType];

        /**
         * unknown
         */
        UNIT_CONNECTION: Unknown[];

        /**
         * Fired when the units melee damage changes. Be warned that this often gets fired multiple times, for example when you change weapons
         * @see https://wow.gamepedia.com/UNIT_DAMAGE
         */
        UNIT_DAMAGE: null;

        /**
         * Fired when a units defense is affected
         * @see https://wow.gamepedia.com/UNIT_DEFENSE
         */
        UNIT_DEFENSE: null;

        /**
         * Fired when the unit's mana stype is changed. Occurs when a druid shapeshifts as well as in certain other cases
         * - **arg1**: unitId
         * @see https://wow.gamepedia.com/UNIT_DISPLAYPOWER
         */
        UNIT_DISPLAYPOWER: [UnitId];

        /**
         * Fired when a unit enters a vehicle
         * - **arg1**: the UnitID of the entity entering a vehicle
         * - **arg2**: Vehicle has vehicle UI boolean
         * - **arg3**: Unknown string
         * - **arg4**: vehicleType (possible values are 'Natural' and 'Mechanical' and 'VehicleMount' and 'VehicleMount_Organic' or empty string)
         * - **arg5**: Vehicle can attack boolean
         * - **arg6**: Vehicle ID
         * - **arg7**: Vehicle GUID
         * - **arg8**: Vehicle is player controlled boolean
         * - **arg9**: Vehicle can aim boolean
         * @see https://wow.gamepedia.com/UNIT_ENTERED_VEHICLE
         */
        UNIT_ENTERED_VEHICLE: [UnitId, boolean, string, VehicleType, boolean, number, Guid, boolean, boolean];

        /**
         * unknown
         */
        UNIT_ENTERING_VEHICLE: Unknown[];

        /**
         * Fired when a unit exited a vehicle
         * - **arg1**: the UnitID of the entity exited a vehicle
         * @see https://wow.gamepedia.com/UNIT_EXITED_VEHICLE
         */
        UNIT_EXITED_VEHICLE: [UnitId];

        /**
         * unknown
         */
        UNIT_EXITING_VEHICLE: Unknown[];

        /**
         * Fired when a target's faction is announced
         * - **arg1**: the name of the unit whose faction changed
         * @see https://wow.gamepedia.com/UNIT_FACTION
         */
        UNIT_FACTION: [string];

        /**
         * unknown
         */
        UNIT_FLAGS: Unknown[];

        /**
         * Fired whenever a units health is affected. This event may be sent more than once to represent the same change if the affected entity
         * can be accessed through multiple UnitIDs. For example, two UNIT_HEALTH events will be sent for raid party members who are also in your party
         * group. UNIT_HEALTH events are sent for raid and party members regardless of their distance from the character of the host. This makes
         * UNIT_HEALTH extremely valuable to monitor party and raid members
         * - **arg1**: the UnitID of the unit whose health is affected
         * @see https://wow.gamepedia.com/UNIT_HEALTH
         */
        UNIT_HEALTH: [UnitId];

        /**
         * unknown
         */
        UNIT_HEAL_ABSORB_AMOUNT_CHANGED: Unknown[];

        /**
         * unknown
         */
        UNIT_HEAL_PREDICTION: Unknown[];

        /**
         * Fired when the player equips or unequips an item. This can also be called if your target, mouseover or party member changes equipment
         * (untested for hostile targets).
         * - This event is also raised when a new item is placed in the player's containers, taking up a new slot. If the new item(s) are placed onto
         * an existing stack or when two stacks already in the containers are merged, the event is not raised. When an item is moved inside the container
         * or to the bank, the event is not raised. The event is raised when an existing stack is split inside the player's containers.
         * - This event is also raised when a temporary enhancement (poison, lure, etc..) is applied to the player's weapon (untested for other units).
         * It will again be raised when that enhancement is removed, including by manual cancellation or buff expiration.
         * - If multiple slots are equipped/unequipped at once it only fires once now.
         * - This event is no longer triggered when changing zones or logging in. Inventory information is available when PLAYER_ENTERING_WORLD is triggered
         * ------
         * - **arg1**: the UnitID of the entity
         * @see https://wow.gamepedia.com/UNIT_INVENTORY_CHANGED
         */
        UNIT_INVENTORY_CHANGED: [UnitId];

        /**
         * Fired whenever the level of a unit is submitted (e.g. when clicking a unit or someone joins the party)
         * - **arg1**: the UnitID of the entity whose level is submitted
         * @see https://wow.gamepedia.com/UNIT_LEVEL
         */
        UNIT_LEVEL: [UnitId];

        /**
         * Fired whenever a unit's mana changes. Removed in Patch 4.0, use UNIT_POWER instead
         * @deprecated
         * @see https://wow.gamepedia.com/UNIT_MANA
         */
        UNIT_MANA: [UnitId];
		UNIT_RAGE: [UnitId];
		UNIT_FOCUS: [UnitId];
		UNIT_ENERGY: [UnitId];
		UNIT_HAPPINESS: [UnitId];
		UNIT_RUNIC_POWER: [UnitId];
		UNIT_HEALTH: [UnitId];
		
		UNIT_MAXMANA: [UnitId];
		UNIT_MAXRAGE: [UnitId];
		UNIT_MAXFOCUS: [UnitId];
		UNIT_MAXENERGY: [UnitId];
		UNIT_MAXHAPPINESS: [UnitId];
		UNIT_MAXRUNIC_POWER: [UnitId];
		UNIT_MAXHEALTH: [UnitId];

        /**
         * Fired when a unit's maximum health changes
         * - **arg1**: unitID of the unit whose health is affected
         * @see https://wow.gamepedia.com/UNIT_MAXHEALTH
         */
        UNIT_MAXHEALTH: [UnitId];

        /**
         * Fired when the unit's 3d model changes
         * @see https://wow.gamepedia.com/UNIT_MODEL_CHANGED
         */
        UNIT_MODEL_CHANGED: null;

        /**
         * Fired when a unit's name changes
         * - **arg1**: the UnitID of the entity whose name changed
         * @see https://wow.gamepedia.com/UNIT_NAME_UPDATE
         */
        UNIT_NAME_UPDATE: [UnitId];

        /**
         * unknown
         */
        UNIT_OTHER_PARTY_CHANGED: Unknown[];

        /**
         * Fired when a unit's pet changes
         * - **arg1**: The UnitID of the entity whose pet changed
         * @see https://wow.gamepedia.com/UNIT_PET
         */
        UNIT_PET: [UnitId];

        /**
         * Fired when the pet's experience changes
         * @see https://wow.gamepedia.com/UNIT_PET_EXPERIENCE
         */
        UNIT_PET_EXPERIENCE: null;

        /**
         * unknown
         */
        UNIT_PHASE: Unknown[];

        /**
         * Fired when a units portrait changes
         * - **arg1**: Unit name
         * @see https://wow.gamepedia.com/UNIT_PORTRAIT_UPDATE
         */
        UNIT_PORTRAIT_UPDATE: [string];

        /**
         * Fired when a unit's current power (mana, rage, focus, energy, runic power, holy power, ...) changes
         * - **arg1**: UnitId whose resource value changed
         * - **arg2**: String representation of the resource whose value changed: "MANA", "RAGE", "ENERGY", "FOCUS", "HAPPINESS", "RUNIC_POWER", "HOLY_POWER"
         * @deprecated Renamed from UNIT_POWER to UNIT_POWER_UPDATE
         * @see https://wow.gamepedia.com/UNIT_POWER
         */
        UNIT_POWER: [UnitId, UnitPowerType];

        /**
         * unknown
         */
        UNIT_POWER_BAR_HIDE: Unknown[];

        /**
         * unknown
         */
        UNIT_POWER_BAR_SHOW: Unknown[];

        /**
         * unknown
         */
        UNIT_POWER_BAR_TIMER_UPDATE: Unknown[];

        /**
         * unknown
         */
        UNIT_POWER_FREQUENT: Unknown[];

        /**
         * Fired whenever the quest log changes. (Frequently, but not as frequently as QUEST_LOG_UPDATE)
         * - **arg1**: unit name
         * @see https://wow.gamepedia.com/UNIT_QUEST_LOG_CHANGED
         */
        UNIT_QUEST_LOG_CHANGED: [string];

        /**
         * Fired when a unit's ranged damage changes
         * @see https://wow.gamepedia.com/UNIT_RANGEDDAMAGE
         */
        UNIT_RANGEDDAMAGE: null;

        /**
         * Fired when a unit's ranged attack power changes
         * @see https://wow.gamepedia.com/UNIT_RANGED_ATTACK_POWER
         */
        UNIT_RANGED_ATTACK_POWER: null;

        /**
         * Fired when the units resistance changes
         * @see https://wow.gamepedia.com/UNIT_RESISTANCES
         */
        UNIT_RESISTANCES: null;

        /**
         * Fired when a unit begins channeling in the course of casting a spell. Received for party/raid members as well as the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         * @see https://wow.gamepedia.com/UNIT_SPELLCAST_CHANNEL_START
         */
        UNIT_SPELLCAST_CHANNEL_START: [UnitId, number, number];

        /**
         * Fired when a unit stops channeling. Received for party/raid members as well as the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_CHANNEL_STOP: [UnitId, number, number];

        /**
         * Received for party/raid members, as well as the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_CHANNEL_UPDATE: [UnitId, number, number];

        /**
         * Fired when a unit's spellcast is delayed, including party/raid members or the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_DELAYED: [UnitId, number, number];

        /**
         * Fired when a unit's spellcast fails, including party/raid members or the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_FAILED: [UnitId, number, number];

        /**
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_FAILED_QUIET: [UnitId, number, number];

        /**
         * Fired when a unit's spellcast is interrupted, including party/raid members or the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_INTERRUPTED: [UnitId, number, number];

        /**
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_INTERRUPTIBLE: [UnitId, number, number];

        /**
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_NOT_INTERRUPTIBLE: [UnitId, number, number];

        /**
         * Fired when a unit attempts to cast a spell regardless of the success of the cast. Fired when a unit tries to cast an instant, non-instant,
         * or channeling spell even if out of range or out of line-of-sight (unless the unit is attempting to cast a non-instant spell while already
         * casting or attempting to cast a spell that is on cooldown).
         * - **arg1**: Unit casting the spell
         * - **arg2**: unused
         * - **arg3**: Complex string similar to a GUID. For Flare this appeared: Cast-3-3783-1-7-1543-000197DD84. 1543 is the SpellID. Identification
         * of the rest of that string is needed
         * - **arg4**: Varies. Occasionally the Spell ID, but not always. Occasionally the target, but not always
         * @since 2.0.1
         */
        UNIT_SPELLCAST_SENT: [UnitId, Unknown, string, number | UnitId];

        /**
         * Fired when a unit begins casting a non-instant cast spell, including party/raid members or the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_START: [UnitId, number, number];

        /**
         * Fired when a unit begins casting a non-instant cast spell, including party/raid members or the player
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_STOP: [UnitId, number, number];

        /**
         * Fired when a spell is cast successfully. Event is received even if spell is resisted
         * - **arg1**: Unit casting the spell
         * - **arg2**: Spell lineID counter
         * - **arg3**: Spell ID
         * @since 2.0.1
         */
        UNIT_SPELLCAST_SUCCEEDED: [UnitId, number, number];

        /**
         * unknown
         */
        UNIT_SPELL_HASTE: Unknown[];

        /**
         * Fired when a units stats are being passed to the player/thing
         * - **arg1**: Unit Name
         * @see https://wow.gamepedia.com/UNIT_STATS
         */
        UNIT_STATS: [string];

        /**
         * Fired when the target of yourself, raid, and party members change: 'target', 'party1target', 'raid1target', etc.. Should also work for
         * 'pet' and 'focus'. This event only fires when the triggering unit is within the player's visual range
         * - **arg1**: unitId of the unit which changed targets
         * @see https://wow.gamepedia.com/UNIT_TARGET
         */
        UNIT_TARGET: [UnitId];

        /**
         * unknown
         */
        UNIT_TARGETABLE_CHANGED: Unknown[];

        /**
         * Fired when the client receives updated threat information from the server, if an available mob's threat list has changed at all
         * (ie anybody in combat with it has done anything).
         * - **arg1**: unitId of the mob whose threat list changed
         * @see https://wow.gamepedia.com/UNIT_THREAT_LIST_UPDATE
         */
        UNIT_THREAT_LIST_UPDATE: [UnitId];

        /**
         * Fired when an available unit on an available mob's threat list moves past another unit on that list
         * - **arg1**: unitId of the unit whose threat situation changed
         * @see https://wow.gamepedia.com/UNIT_THREAT_SITUATION_UPDATE
         */
        UNIT_THREAT_SITUATION_UPDATE: [UnitId];

        /**
         * unknown
         */
        UPDATE_ACTIVE_BATTLEFIELD: Unknown[];

        /**
         * Fired whenever new battlefield score data has been recieved, this is usually fired after RequestBattlefieldScoreData() is called
         * @see https://wow.gamepedia.com/UPDATE_BATTLEFIELD_SCORE
         */
        UPDATE_BATTLEFIELD_SCORE: null;

        /**
         * Fired whenever joining a queue, leaving a queue, battlefield to join is changed, when you can join a battlefield, or if somebody wins the
         * battleground
         * @see https://wow.gamepedia.com/UPDATE_BATTLEFIELD_STATUS
         */
        UPDATE_BATTLEFIELD_STATUS: null;

        /**
         * Fired when the keybindings are changed. Fired after completion of LoadBindings(), SaveBindings(), and SetBinding() (and its derivatives)
         * @see https://wow.gamepedia.com/UPDATE_BINDINGS
         */
        UPDATE_BINDINGS: null;

        /**
         * unknown
         */
        UPDATE_BONUS_ACTIONBAR: Unknown[];

        /**
         * Fired when the chat colour needs to be updated. Refer to the ChangeChatColor API call for details on the parameters
         * - **arg1**: chat type
         * - **arg2**: red
         * - **arg3**: green
         * - **arg4**: blue
         * @see https://wow.gamepedia.com/UPDATE_CHAT_COLOR
         */
        UPDATE_CHAT_COLOR: [string, number, number, number];

        /**
         * unknown
         */
        UPDATE_CHAT_COLOR_NAME_BY_CLASS: Unknown[];

        /**
         * Fired on load when chat settings are available for chat windows
         * @see https://wow.gamepedia.com/UPDATE_CHAT_WINDOWS
         */
        UPDATE_CHAT_WINDOWS: null;

        /**
         * Fired when your character's XP exhaustion (i.e. the amount of your character's rested bonus) changes. Use GetXPExhaustion() to query the current
         * value
         * @see https://wow.gamepedia.com/UPDATE_EXHAUSTION
         */
        UPDATE_EXHAUSTION: null;

        /**
         * unknown
         */
        UPDATE_EXPANSION_LEVEL: Unknown[];

        /**
         * unknown
         */
        UPDATE_EXTRA_ACTIONBAR: Unknown[];

        /**
         * Fired when your character's reputation of some faction has changed
         * @see https://wow.gamepedia.com/UPDATE_FACTION
         */
        UPDATE_FACTION: null;

        /**
         * Fired on load when chat settings are available for a certain chat window
         * @see https://wow.gamepedia.com/UPDATE_FLOATING_CHAT_WINDOWS
         */
        UPDATE_FLOATING_CHAT_WINDOWS: null;

        /**
         * unknown
         */
        UPDATE_GM_STATUS: Unknown[];

        /**
         * Fired when data from RequestRaidInfo() is available
         * @see https://wow.gamepedia.com/UPDATE_INSTANCE_INFO
         */
        UPDATE_INSTANCE_INFO: null;

        /**
         * Fires whenever an item's durability status becomes yellow (low) or red (broken). Signals that the durability frame needs to be updated.
         * May also fire on any durability status change, even if that change doesn't require an update to the durability frame
         * @see https://wow.gamepedia.com/UPDATE_INVENTORY_ALERTS
         */
        UPDATE_INVENTORY_ALERTS: null;

        /**
         * Should fire whenever the durability of an item in the character's possession changes
         * @see https://wow.gamepedia.com/UPDATE_INVENTORY_DURABILITY
         */
        UPDATE_INVENTORY_DURABILITY: null;

        /**
         * When fired prompts the LFG UI to update the list of LFG players. Signals LFG query results are available. See API LFGQuery
         * @see https://wow.gamepedia.com/UPDATE_LFG_LIST
         */
        UPDATE_LFG_LIST: null;

        /**
         * unknown
         */
        UPDATE_LFG_LIST_INCREMENTAL: Unknown[];

        /**
         * unknown
         */
        UPDATE_LFG_TYPES: Unknown[];

        /**
         * unknown
         */
        UPDATE_MACROS: Unknown[];

        /**
         * unknown
         */
        UPDATE_MASTER_LOOT_LIST: Unknown[];

        /**
         * Fired when the mouseover object needs to be updated
         * @see https://wow.gamepedia.com/UPDATE_MOUSEOVER_UNIT
         */
        UPDATE_MOUSEOVER_UNIT: null;

        /**
         * Fired when the shaman totem multicast bar needs an update
         * @see https://wow.gamepedia.com/UPDATE_MULTI_CAST_ACTIONBAR
         */
        UPDATE_MULTI_CAST_ACTIONBAR: null;

        /**
         * unknown
         */
        UPDATE_OVERRIDE_ACTIONBAR: Unknown[];

        /**
         * - Fired when the player enters the world and enters/leaves an instance, if there is mail in the player's mailbox
         * - Fired when new mail is received
         * - Fired when mailbox window is closed if the number of mail items in the inbox changed (I.E. you deleted mail)
         * - Does not appear to trigger when auction outbid mail is received... may not in other cases as well
         * @see https://wow.gamepedia.com/UPDATE_PENDING_MAIL
         */
        UPDATE_PENDING_MAIL: null;

        /**
         * unknown
         */
        UPDATE_POSSESS_BAR: Unknown[];

        /**
         * unknown
         */
        UPDATE_SHAPESHIFT_COOLDOWN: Unknown[];

        /**
         * Fired when the current form changes
         * @see https://wow.gamepedia.com/UPDATE_SHAPESHIFT_FORM
         */
        UPDATE_SHAPESHIFT_FORM: null;

        /**
         * Fired when the available set of forms changes (i.e. on skill gain)
         * @see https://wow.gamepedia.com/UPDATE_SHAPESHIFT_FORMS
         */
        UPDATE_SHAPESHIFT_FORMS: null;

        /**
         * unknown
         */
        UPDATE_SHAPESHIFT_USABLE: Unknown[];

        /**
         * unknown
         */
        UPDATE_STEALTH: Unknown[];

        /**
         * Fired when a battle pet-summoning action might need to be updated
         * - Fired when the player learns a new battle pet
         * - Fired when the player's battle pets die or are healed outside a pet battle
         * @see https://wow.gamepedia.com/UPDATE_SUMMONPETS_ACTION
         */
        UPDATE_SUMMONPETS_ACTION: null;

        /**
         * unknown
         */
        UPDATE_TICKET: Unknown[];

        /**
         * unknown
         */
        UPDATE_TRADESKILL_RECAST: Unknown[];

        /**
         * unknown
         */
        UPDATE_VEHICLE_ACTIONBAR: Unknown[];

        /**
         * unknown
         */
        UPDATE_WEB_TICKET: Unknown[];

        /**
         * Fired within Battlefields when certain things occur such as a flag being captured
         * @see https://wow.gamepedia.com/UPDATE_WORLD_STATES
         */
        UPDATE_WORLD_STATES: null;

        /**
         * unknown
         */
        USE_BIND_CONFIRM: Unknown[];

        /**
         * unknown
         */
        USE_GLYPH: Unknown[];

        /**
         * unknown
         */
        USE_NO_REFUND_CONFIRM: Unknown[];

        /**
         * Fired in response to the CVars, Keybindings and other associated "Blizzard" variables being loaded. Since key bindings and macros in
         * particular may be stored on the server they event may be delayed a bit beyond the original loading sequence
         * - Previously (prior to 3.0.1) this event was part of the loading sequence. Although it still occurs within the same general timeframe
         * as the other events, it no longer has a guaranteed order that can be relied on. This may be problematic to addons that relied on the order
         * of VARIABLES_LOADED, specifically that it would fire before PLAYER_ENTERING_WORLD
         * - Addons should not use this event to check if their addon's saved variables have loaded. They can use ADDON_LOADED (testing for arg1
         * being the name of the addon) or another appropriate event to initialize, ensuring that the addon works when loaded on demand
         * @see https://wow.gamepedia.com/VARIABLES_LOADED
         */
        VARIABLES_LOADED: null;

        /**
         * unknown
         */
        VEHICLE_ANGLE_SHOW: Unknown[];

        /**
         * unknown
         */
        VEHICLE_ANGLE_UPDATE: Unknown[];

        /**
         * unknown
         */
        VEHICLE_PASSENGERS_CHANGED: Unknown[];

        /**
         * unknown
         */
        VEHICLE_POWER_SHOW: Unknown[];

        /**
         * unknown
         */
        VEHICLE_UPDATE: Unknown[];

        /**
         * unknown
         */
        VOICE_CHANNEL_STATUS_UPDATE: Unknown[];

        /**
         * Fired when you enable or disable voice chat
         * @see https://wow.gamepedia.com/VOICE_CHAT_ENABLED_UPDATE
         */
        VOICE_CHAT_ENABLED_UPDATE: null;

        /**
         * unknown
         */
        VOICE_LEFT_SESSION: Unknown[];

        /**
         * unknown
         */
        VOICE_PLATE_START: Unknown[];

        /**
         * unknown
         */
        VOICE_PLATE_STOP: Unknown[];

        /**
         * Fired when you click the Push-To-Talk hotkey to activate voice chat
         * @see https://wow.gamepedia.com/VOICE_PUSH_TO_TALK_START
         */
        VOICE_PUSH_TO_TALK_START: null;

        /**
         * Fired when you release the Push-To-Talk hotkey
         * @see https://wow.gamepedia.com/VOICE_PUSH_TO_TALK_STOP
         */
        VOICE_PUSH_TO_TALK_STOP: null;

        /**
         * unknown
         */
        VOICE_SELF_MUTE: Unknown[];

        /**
         * unknown
         */
        VOICE_SESSIONS_UPDATE: Unknown[];

        /**
         * Fired when someone starts using Voice Chat
         * - **arg1**: The UnitId of the person who started talking
         * @see https://wow.gamepedia.com/VOICE_START
         */
        VOICE_START: [UnitId];

        /**
         * Fired when someone in your group or raid updates their voice status. Triggers extremely frequently
         * @see https://wow.gamepedia.com/VOICE_STATUS_UPDATE
         */
        VOICE_STATUS_UPDATE: null;

        /**
         * Fired when someone stops using Voice Chat
         * - **arg1**: The UnitId of the person who stopped talking
         * @see https://wow.gamepedia.com/VOICE_STOP
         */
        VOICE_STOP: [UnitId];

        /**
         * Fired when attempting to deposit an item with enchants/gems/reforges/etc into the Void Storage
         * - **arg1**: slotIndex
         * - **arg2**: itemLink
         * @see https://wow.gamepedia.com/VOID_DEPOSIT_WARNING
         */
        VOID_DEPOSIT_WARNING: [number, ItemLink];

        /**
         * unknown
         */
        VOID_STORAGE_CLOSE: Unknown[];

        /**
         * Fired when one the Void Storage slots is changed
         * @see https://wow.gamepedia.com/VOID_STORAGE_CONTENTS_UPDATE
         */
        VOID_STORAGE_CONTENTS_UPDATE: null;

        /**
         * Fired when one the Void Transfer deposit slots is changed
         * - **arg1**: slotIndex
         * @see https://wow.gamepedia.com/VOID_STORAGE_DEPOSIT_UPDATE
         */
        VOID_STORAGE_DEPOSIT_UPDATE: [number];

        /**
         * unknown
         */
        VOID_STORAGE_OPEN: Unknown[];

        /**
         * Fired when the Void Storage "tutorial" is progressed, or when the Void Storage hasn't been activated yet
         * @see https://wow.gamepedia.com/VOID_STORAGE_UPDATE
         */
        VOID_STORAGE_UPDATE: null;

        /**
         * Fired when an item has been successfully deposited or withdrawn from the Void Storage
         * @see https://wow.gamepedia.com/VOID_TRANSFER_DONE
         */
        VOID_TRANSFER_DONE: null;

        /**
         * Fires when you need to supply a reason for the kick vote you wish to initiate. Use UninviteUnit("name", "reason") to provide the reason
         * - **arg1**: name of the player you wanted to initiate a kick vote for
         * @see https://wow.gamepedia.com/VOTE_KICK_REASON_NEEDED
         */
        VOTE_KICK_REASON_NEEDED: [string];

        /**
         * unknown
         */
        WARGAME_REQUESTED: Unknown[];

        /**
         * unknown
         */
        WEAR_EQUIPMENT_SET: Unknown[];

        /**
         * unknown
         */
        WEIGHTED_SPELL_UPDATED: Unknown[];

        /**
         * Fired when the client receives the result of a SendWho() request from the server. use API SetWhoToUI to manipulate this functionality.
         * This event is only triggered if the Who panel was open at the time the Who data was received (this includes the case where the Blizzard
         * UI opens it automatically because the return data was too big to display in the chat frame).
         * @see https://wow.gamepedia.com/WHO_LIST_UPDATE
         */
        WHO_LIST_UPDATE: null;

        /**
         * @see https://wow.gamepedia.com/WORLD_MAP_CLOSE
         */
        WORLD_MAP_CLOSE: null;

        /**
         * @see https://wow.gamepedia.com/WORLD_MAP_OPEN
         */
        WORLD_MAP_OPEN: [number];

        /**
         * Fired when the world map should be updated. When entering a battleground, this event won't fire until the zone is changed (i.e. in
         *  WSG when you walk outside of Warsong Lumber Mill or Silverwing Hold
         * @see https://wow.gamepedia.com/WORLD_MAP_UPDATE
         */
        WORLD_MAP_UPDATE: null;

        /**
         * unknown
         */
        WORLD_QUEST_COMPLETED_BY_SPELL: Unknown[];

        /**
         * unknown
         */
        WORLD_STATE_TIMER_START: Unknown[];

        /**
         * unknown
         */
        WORLD_STATE_TIMER_STOP: Unknown[];

        /**
         * unknown
         */
        WORLD_STATE_UI_TIMER_UPDATE: Unknown[];

        /**
         * Possibly fired after failing to DetectWowMouse()
         * @see https://wow.gamepedia.com/MOUSE_NOT_FOUND
         */
        MOUSE_NOT_FOUND: null;

        /**
         * Fired when the player enters a new subzone. e.g. While in Vale of Eternal Blossoms, moving from "The Summer Fields" to "The Golden Padoga"
         * @see https://wow.gamepedia.com/ZONE_CHANGED
         */
        ZONE_CHANGED: null;

        /**
         * Fired when a player enters a new zone within a city. e.g. While in Shrine of the Two Moons, moving from "Hall of the Crescent Moon" to "Summer's
         * Rest"
         * @see https://wow.gamepedia.com/ZONE_CHANGED_INDOORS
         */
        ZONE_CHANGED_INDOORS: null;

        /**
         * Fired when the user enters a new zone or city. e.g. moving from Duskwood to Stranglethorn Vale or Durotar into Orgrimmar. In interface
         * terms, this is anytime you get a new set of channels
         * @description Note: When this event fires, the UI may still think you're in the zone you just left. Don't depend on GetRealZoneText()
         * and similar functions to report the new zone in reaction to ZONE_CHANGED_NEW_AREA. (untested for similar events)
         * @see https://wow.gamepedia.com/ZONE_CHANGED_NEW_AREA
         */
        ZONE_CHANGED_NEW_AREA: null;

    };

    type Event = keyof TypedEvents;
}


declare type EXPANSION_CLASSIC = 0;
declare type EXPANSION_BURNING_CRUSADE = 1;
declare type EXPANSION_WRATH_OF_THE_LICH_KING = 2;
declare type EXPANSION_CATACLYSM = 3;
declare type EXPANSION_MISTS_OF_PANDARIA = 4;
declare type EXPANSION_WARLORDS_OF_DRAENOR = 5;
declare type EXPANSION_LEGION = 6;
declare type EXPANSION_BATTLE_FOR_AZEROTH = 7;

declare namespace WoWAPI {
    type Unknown = any;
    type UnknownStringKeyTable = { [anyKey: string]: any };
    type UnknownNumberKeyTable = { [anyKey: number]: any };

    type Flag = 0 | 1;

    /**
     * a texture can be a path to a blp file or a number as fileID
     */
    type TexturePath = string | number;

    /**
     * the base type for all clickable ingame links in the chat
     */
    type Hyperlink = string;

    /**
     * TYPES THAT SHOULD BE STORED SEPERATLY!!!!
     */

    type CombatTextType = "DAMAGE" | "SPELL_DAMAGE" | "DAMAGE_CRIT" | "HEAL" | "PERIODIC_HEAL" | "HEAL_CRIT" | "MISS" |
        "DODGE" | "PARRY" | "BLOCK" | "RESIST" | "SPELL_RESISTED" | "ABSORB" | "SPELL_ABSORBED" | "MANA" | "ENERGY" | "RAGE" | "FOCUS" |
        "SPELL_ACTIVE" | "COMBO_POINTS" | "AURA_START" | "AURA_END" | "AURA_START_HARMFUL" | "AURA_END_HARMFUL" | "HONOR_GAINED" | "FACTION";

    type CombatCriticalIndicator = "CRITICAL" | "CRUSHING" | "GLANCING";

    type CombatDamageType = 1 | 2 | 4 | 8 | 16 | 32 | 64;

    type DisenchantRollType = 1 | 2 | 3;

    type Difficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22
        | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34;

    type StreamingState = 0 | 1 | 2 | 3;

    type VehicleType = "Natural" | "Mechanical" | "VehicleMount" | "VehicleMount_Organic" | "";

    type UnitPowerType = "MANA" | "RAGE" | "ENERGY" | "FOCUS" | "HAPPINESS" | "RUNIC_POWER" | "HOLY_POWER";

    type SpellTreeId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

declare type ActionBarPage1 = 1;
declare type ActionBarPage2 = 2;
declare type ActionBarPage3 = 3;
declare type ActionBarPage4 = 4;
declare type ActionBarPage5 = 5;
declare type ActionBarPage6 = 6;
declare type ActionBarPage = ActionBarPage1 | ActionBarPage2 | ActionBarPage3 | ActionBarPage4 | ActionBarPage5 | ActionBarPage6;

declare type SlotActionBarPet = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
declare type SlotActionBarPage1 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
declare type SlotActionBarPage2 = 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
declare type SlotActionBarPage3 = 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;
declare type SlotActionBarPage4 = 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
declare type SlotActionBarPage5 = 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;
declare type SlotActionBarPage6 = 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72;
declare type SlotActionBarMisc = 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 |
                                 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 |
                                 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120;
declare type SlotActionBarPossess = 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132;
declare type ActionBarSlotId = SlotActionBarPage1 | SlotActionBarPage2 | SlotActionBarPage3 | SlotActionBarPage4 |
                               SlotActionBarPage5 | SlotActionBarPage6 | SlotActionBarMisc | SlotActionBarPossess;


declare type QUEST_FREQUENCY_NORMAL = 1;
declare type QUEST_FREQUENCY_DAILY = 2;
declare type QUEST_FREQUENCY_WEEKLY = 3;
declare type QUEST_FREQUENCY = QUEST_FREQUENCY_NORMAL | QUEST_FREQUENCY_DAILY | QUEST_FREQUENCY_WEEKLY;

declare type GOSSIP_TYPE_BANKER = "banker";
declare type GOSSIP_TYPE_BATTLEMASTER = "battlemaster";
declare type GOSSIP_TYPE_BINDER = "binder";
declare type GOSSIP_TYPE_GOSSIP = "gossip";
declare type GOSSIP_TYPE_HEALER = "healer";
declare type GOSSIP_TYPE_PETITION = "petition";
declare type GOSSIP_TYPE_TABARD = "tabard";
declare type GOSSIP_TYPE_TAXI = "taxi";
declare type GOSSIP_TYPE_TRAINER = "trainer";
declare type GOSSIP_TYPE_UNLEARN = "unlearn";
declare type GOSSIP_TYPE_VENDOR = "vendor";
declare type GOSSIP_TYPE_WORKORDER = "workorder";

/**
 * all currently known gossip types
 */
declare type GOSSIP_TYPE = GOSSIP_TYPE_BANKER | GOSSIP_TYPE_BATTLEMASTER | GOSSIP_TYPE_BINDER | GOSSIP_TYPE_GOSSIP | GOSSIP_TYPE_HEALER |
    GOSSIP_TYPE_PETITION | GOSSIP_TYPE_TABARD | GOSSIP_TYPE_TAXI | GOSSIP_TYPE_TRAINER | GOSSIP_TYPE_UNLEARN | GOSSIP_TYPE_VENDOR |
    GOSSIP_TYPE_WORKORDER;

/**
 * Dismiss the gossip dialog
 *
 * @see https://wow.gamepedia.com/API_CloseGossip
 */
declare function CloseGossip(): void;

/**
 * Returns whether the gossip text must be displayed
 *
 * @returns 1 if the client should display the gossip text for this NPC, nil if it is okay to skip directly to the only interaction option available
 * @see https://wow.gamepedia.com/API_ForceGossip
 */
declare function ForceGossip(): WoWAPI.Flag;

/**
 * Get the list of active quests from an NPC.
 *
 * @returns title1, level1, isLowLevel1, isComplete1, isLegendary1, isIgnored1, title2, level2, isLowLevel2, isComplete2, isLegendary2, isIgnored2
 * @see https://wow.gamepedia.com/API_GetGossipActiveQuests
 * @description The number of returned values per quest has increased again to 6
 */
declare function GetGossipActiveQuests(): LuaMultiReturn<[string, string, boolean, boolean, boolean]>;

/**
 * Returns a list of available quests from an NPC
 *
 * @returns title1, level1, isTrivial1, frequency1, isRepeatable1, isLegendary1, isIgnored1 ...
 * @see https://wow.gamepedia.com/API_GetGossipAvailableQuests
 */
declare function GetGossipAvailableQuests(): LuaMultiReturn<[string, number, boolean, QUEST_FREQUENCY, boolean, boolean, boolean]>;

/**
 * Get the available gossip items on an NPC (possibly stuff like the BWL and MC orbs too).
 *
 * @returns title1, gossip1, ...
 * @see https://wow.gamepedia.com/API_GetGossipOptions
 */
declare function GetGossipOptions(): LuaMultiReturn<[string, GOSSIP_TYPE]>;

/**
 * Get the gossip text
 *
 * @returns The text of the gossip
 * @see https://wow.gamepedia.com/API_GetGossipText
 */
declare function GetGossipText(): string;

/**
 * Returns the number of active quests that you should eventually turn in to this NPC
 *
 * @returns Number of quests you're on that should be turned in to the NPC you're gossiping with
 * @see https://wow.gamepedia.com/API_GetNumGossipActiveQuests
 */
declare function GetNumGossipActiveQuests(): number;

/**
 * Returns the number of quests (that you are not already on) offered by this NPC
 *
 * @returns Number of quests you can pick up from this NPC
 * @see https://wow.gamepedia.com/API_GetNumGossipAvailableQuests
 */
declare function GetNumGossipAvailableQuests(): number;

/**
 * Returns the number of conversation options available with this NPC
 *
 * @returns Number of conversation options you can select
 * @see https://wow.gamepedia.com/API_GetNumGossipOptions
 */
declare function GetNumGossipOptions(): number;

/**
 * Selects an active quest from a gossip list
 *
 * @param gossipIndex Index of the active quest to select, from 1 to GetNumGossipActiveQuests(); order corresponds to the order of return
 * values from GetGossipActiveQuests().
 * @event QUEST_PROGRESS
 * @see https://wow.gamepedia.com/API_SelectGossipActiveQuest
 */
declare function SelectGossipActiveQuest(gossipIndex: number): void;

/**
 * Selects an available quest from a gossip list.
 *
 * @param gossipIndex Index of the available quest to select, from 1 to GetNumGossipAvailableQuests(); order corresponds to the order of return
 * values from GetGossipAvailableQuests().
 * @event QUEST_PROGRESS
 * @see https://wow.gamepedia.com/API_SelectGossipAvailableQuest
 */
declare function SelectGossipAvailableQuest(gossipIndex: number): void;

/**
 * Selects a gossip (conversation) option
 *
 * @param gossipIndex Index of the gossip option to select, from 1 to GetNumGossipOptions(); order corresponds to the order of return values from
 * GetGossipOptions().
 * @see https://wow.gamepedia.com/API_SelectGossipOption
 */
declare function SelectGossipOption(gossipIndex: number): void;

/**
 * Get cooldown information for an inventory item.
 *
 * @see https://wow.gamepedia.com/API_GetInventoryItemCooldown
 * @returns start, duration, isEnabled
 */
declare function GetInventoryItemCooldown(unit: WoWAPI.UnitId, slotId: number): LuaMultiReturn<[number, number, WoWAPI.Flag]>;

/**
 * Return the texture for an inventory item.
 *
 * @see https://wow.gamepedia.com/API_GetInventoryItemTexture
 * @returns The texture path for the item in the specified slot, or nil if the slot is empty.
 */
declare function GetInventoryItemTexture(unit: WoWAPI.UnitId, slotId: number): WoWAPI.TexturePath;

/**
 * Return information about a specific inventory slot
 *
 * @see https://wow.gamepedia.com/API_GetInventorySlotInfo
 * @returns slotId, textureName
 */
declare function GetInventorySlotInfo(slotName: string): LuaMultiReturn<[number, WoWAPI.TexturePath]>;


/// <reference path="auction.d.ts" />

declare namespace WoWAPI {
    type ITEM_QUALITY_GENERIC = -1;
    type ITEM_QUALITY_POOR = 0;
    type ITEM_QUALITY_COMMON = 1;
    type ITEM_QUALITY_UNCOMMON = 2;
    type ITEM_QUALITY_RARE = 3;
    type ITEM_QUALITY_EPIC = 4;
    type ITEM_QUALITY_LEGENDARY = 5;
    type ITEM_QUALITY_ARTIFACT = 6;
    type ITEM_QUALITY_HEIRLOOM = 7;

    /**
     * all currently known item qualities
     */
    type ITEM_QUALITY = ITEM_QUALITY_GENERIC | ITEM_QUALITY_POOR | ITEM_QUALITY_COMMON | ITEM_QUALITY_UNCOMMON |
        ITEM_QUALITY_RARE | ITEM_QUALITY_EPIC | ITEM_QUALITY_LEGENDARY | ITEM_QUALITY_ARTIFACT | ITEM_QUALITY_HEIRLOOM;

    type BIND_TYPE_NONE = 0;
    type BIND_TYPE_PICKUP = 1;
    type BIND_TYPE_EQUIP = 2;
    type BIND_TYPE_USE = 3;
    type BIND_TYPE_QUEST = 4;

    /**
     * all currently known bind types
     */
    type BIND_TYPE = BIND_TYPE_NONE | BIND_TYPE_PICKUP | BIND_TYPE_EQUIP | BIND_TYPE_USE | BIND_TYPE_QUEST;

    type EquippableItemType = "Miscellaneous" | "Cloth" | "Leather" | "Mail" | "Plate" | "Shields" | "Librams" | "Idols" | "Totems" | "Sigils";

    /**
     * a clickable ingame item link
     */
    type ItemLink = Hyperlink;

    interface ItemLocationMixin {
        bagID: number | null;
        slotIndex: number | null;
        equipmentSlotIndex: number | null;
        IsValid: boolean;

        Clear(): void;
        GetBagAndSlot(): LuaMultiReturn<[number | null, number | null]>;
        SetEquipmentSlot(equipmentSlotIndex: number | null): void;
        GetEquipmentSlot(): number | null;
        IsEquipmentSlot(): boolean;
        IsBagAndSlot(): boolean;
        HasAnyLocation(): boolean;
        IsEqualToBagAndSlot(otherBagID: number, otherSlotIndex: number): boolean;
        IsEqualToEquipmentSlot(otherEquipmentSlotIndex: number): boolean;
        IsEqualTo(otherItemLocation: ItemLocationMixin): boolean;
    }

    /**
     * Output table for the AuctionHouse system.
     */
    interface ItemKey {
        itemID: number;
        itemLevel: number;
        itemSuffix: number;
        battlePetSpeciesID: number;
    }

    interface ItemKeyInfo {
        itemName: string;
        battlePetLink: string | null;
        quality: ITEM_QUALITY;
        iconFileID: number; // FileID
        isPet: boolean;
        isCommodity: boolean;
        isEquipment: boolean;
    }

    interface C_AzeriteItem {
        /**
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.FindActiveAzeriteItem
         */
        FindActiveAzeriteItem(): ItemLocationMixin;

        /**
         *
         * @param azeriteItemLocation
         * @returns
         * - **xp**
         * - **totalLevelXP**
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.GetAzeriteItemXPInfo
         */
        GetAzeriteItemXPInfo(azeriteItemLocation: ItemLocationMixin): LuaMultiReturn<[number, number]>;

        /**
         *
         * @param azeriteItemLocation
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.GetPowerLevel
         */
        GetPowerLevel(azeriteItemLocation: ItemLocationMixin): number;

        /**
         *
         * @param azeriteItemLocation
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.GetUnlimitedPowerLevel
         */
        GetUnlimitedPowerLevel(azeriteItemLocation: ItemLocationMixin): number;

        /**
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.HasActiveAzeriteItem
         */
        HasActiveAzeriteItem(): boolean;

        /**
         *
         * @param itemLocation
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.IsAzeriteItem
         */
        IsAzeriteItem(itemLocation: ItemLocationMixin): boolean;

        /**
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.IsAzeriteItemAtMaxLevel
         */
        IsAzeriteItemAtMaxLevel(): boolean;

        /**
         *
         * @param itemInfo
         * @see https://wow.gamepedia.com/API_C_AzeriteItem.IsAzeriteItemByID
         */
        IsAzeriteItemByID(itemInfo: string): boolean;
    }
}

declare const C_AzeriteItem: WoWAPI.C_AzeriteItem;

/**
 * Equips an item, optionally into a specified slot
 * @param itemIdentifier itemId or "itemName" or "itemLink"
 * - **itemId**: The numeric ID of the item. ie. 12345
 * - **itemName**: The name of the item, ie "Worn Dagger". Partial names are valid inputs as well, ie "Worn". If several items with same piece
 * of name exists, the first one found will be equipped
 * - **itemLink**: The itemLink, when Shift-Clicking items
 * @param slot The inventory slot to put the item in, obtained via GetInventorySlotInfo().
 * @description When in combat this function now "picks up" the item instead of equipping it, similar to PickupInventoryItem. Out of combat, the
 * function behaves as expected. This change was made to address the issue of rogues using "poison swapping" addons to increase their DPS
 * @see https://wow.gamepedia.com/API_EquipItemByName
 */
declare function EquipItemByName(itemIdentifier: string | number | WoWAPI.ItemLink, slot?: WoWAPI.INVENTORY_SLOT_ID): void;

/**
 * Returns a link of the object located in the specified slot of a specified bag.
 * @param bagId Bag index (bagID). Valid indices are integers -2 through 11. 0 is the backpack
 * @param slotIndex Slot index within the specified bag, ascending from 1. Slot 1 is typically the leftmost topmost slot
 * @returns a chat link for the object in the specified bag slot; nil if there is no such object. This is typically, but not always an ItemLink
 * @see https://wow.gamepedia.com/API_GetContainerItemLink
 */
declare function GetContainerItemLink(bagId: WoWAPI.CONTAINER_ID, slotIndex: number): WoWAPI.ItemLink | null;

/**
 * Returns cooldown information for the item
 * @param itemId The numeric ID of the item. ie. 12345
 * @returns **startTime, duration, enable**
 * - **startTime**: The time when the cooldown started (as returned by GetTime()) or zero if no cooldown
 * - **duration**: The number of seconds the cooldown will last, or zero if no cooldown
 * - **enable**: 1 if the item is ready or on cooldown, 0 if the item is used, but the cooldown didn't start yet (e.g. potion in combat)
 * @see https://wow.gamepedia.com/API_GetItemCooldown
 */
declare function GetItemCooldown(itemId: number): LuaMultiReturn<[number, number, WoWAPI.Flag]>;

/**
 * Returns count information for the item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @param includeBank count includes bank items
 * @param includeCharges count is charges if any, otherwise number of items
 * @returns The number of items in your possesion, or charges if includeCharges is true and the item has charges
 * @see https://wow.gamepedia.com/API_GetItemCount
 */
declare function GetItemCount(itemIdentifier: string | number | WoWAPI.ItemLink, includeBank?: boolean, includeCharges?: boolean): number;

/**
 * Gets the bitfield of what types of bags an item can go into or contain
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns What type of bags an item can go into or if the item is a container what it can contain
 * @see https://wow.gamepedia.com/API_GetItemFamily
 */
declare function GetItemFamily(itemIdentifier: string | number | WoWAPI.ItemLink): WoWAPI.BAG_TYPE;

/**
 * Returns an item's icon texture
 * @param itemId The numeric ID of the item to query e.g. 23405 for [Farstrider's Tunic].
 * @returns Icon texture used by the item
 * @see https://wow.gamepedia.com/API_GetItemIcon
 */
declare function GetItemIcon(itemId: number): WoWAPI.TexturePath;

/**
 * Return information about a specific item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns
 * - **itemName**: The localized name of the item
 * - **itemLink**: The localized item link of the item
 * - **itemRarity**: The quality of the item. The value is 0 to 7, which represents Poor to Heirloom. This appears to include gains from upgrades/bonuses
 * - **itemLevel**: The base item level of this item, not including item levels gained from upgrades. Use GetDetailedItemLevelInfo to get the
 * actual current level of the item
 * - **itemMinLevel**: The minimum level required to use the item, 0 meaning no level requirement
 * - **itemType**: The localized type of the item: Armor, Weapon, Quest, Key, etc
 * - **itemSubType**: The localized sub-type of the item: Enchanting, Cloth, Sword, etc. See itemType
 * - **itemStackCount**: How many of the item per stack: 20 for Runecloth, 1 for weapon, 100 for Alterac Ram Hide, etc
 * - **itemEquipLocation**: The type of inventory equipment location in which the item may be equipped, or "" if it can't be equippable. The
 * string returned is also the name of a global string variable e.g. if "INVTYPE_WEAPONMAINHAND" is returned, _G["INVTYPE_WEAPONMAINHAND"] will
 * be the localized, displayable name of the location
 * - **itemIcon**: The icon texture for the item
 * - **itemSellPrice**: The price, in copper, a vendor is willing to pay for this item, 0 for items that cannot be sold
 * - **itemClassId**: This is the numerical value that determines the string to display for 'itemType'
 * - **itemSubClassId**: This is the numerical value that determines the string to display for 'itemSubType'
 * - **bindType**: Item binding type: 0 - none; 1 - on pickup; 2 - on equip; 3 - on use; 4 - quest
 * - **expactId**: unknown
 * - **itemSetId**: unknown
 * - **isCraftingReagent**: unknown
 * @see https://wow.gamepedia.com/API_GetItemInfo
 */
// tslint:disable-next-line max-line-length
declare function GetItemInfo(itemIdentifier: string | number | WoWAPI.ItemLink): LuaMultiReturn<[string, WoWAPI.ItemLink, WoWAPI.ITEM_QUALITY, number, number, string, string, number, WoWAPI.INVENTORY_SLOT_ID, WoWAPI.TexturePath, number, number, number, WoWAPI.BIND_TYPE, number, number, boolean]>;

/**
 * Returns RGB color codes for an item quality
 * @param quality The numeric ID of the quality from 0 (Poor) to 7 (Heirloom)
 * @returns
 *  - **red**: The Red component of the color (0 to 1, inclusive)
 *  - **green**: The Green component of the color (0 to 1, inclusive)
 *  - **blue**: The Blue component of the color (0 to 1, inclusive)
 *  - **hex**: The UI escape sequence for this color, without the leading "|c".
 * @see https://wow.gamepedia.com/API_GetItemQualityColor
 */
declare function GetItemQualityColor(quality: WoWAPI.ITEM_QUALITY): LuaMultiReturn<[number, number, number, string]>;

/**
 * Return spell information about a specific item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @returns
 * - **spellName**: The name of the spell
 * - **spellRank**: The secondary text of the spell, displayed in the top right-hand corner of the spell's tooltip
 * - **spellId**: The spell's unique identifier
 * @see https://wow.gamepedia.com/API_GetItemSpell
 */
declare function GetItemSpell(itemIdentifier: string | number | WoWAPI.ItemLink): LuaMultiReturn<[string, string, number]>;

/**
 * Returns a table of stats for an item
 * @param itemLink An item link for which to get stats
 * @param statTable An optional, empty table that will be filled with stats and returned. If this parameter is omitted, a new table is returned
 * @see https://wow.gamepedia.com/API_GetItemStats
 */
declare function GetItemStats(itemLink: WoWAPI.ItemLink, statTable?: {}): { [index: string]: number };

/**
 * Returns a link to the indexed item in the merchant's inventory
 * @param merchantIndex The index of the item in the merchant's inventory
 * @returns returns a string that will show as a clickable link to the item
 * @see https://wow.gamepedia.com/API_GetMerchantWoWAPI.ItemLink
 */
declare function GetMerchantItemLink(merchantIndex: number): WoWAPI.ItemLink;

/**
 * Returns link to the quest item
 * @param type "required", "reward" or "choice"
 * @param index Quest reward item index
 * @returns The link to the quest item specified
 * @see https://wow.gamepedia.com/API_GetQuestWoWAPI.ItemLink
 */
declare function GetQuestItemLink(type: WoWAPI.QuestType, index: number): WoWAPI.ItemLink;

/**
 * Returns link to the quest item
 * @param type "required", "reward" or "choice"
 * @param index Quest reward item index (starts with 1)
 * @returns The link to the quest item specified or nil, if the type and/or index is invalid, there is no active quest at the moment or if the
 * server did not transmit the item information until the timeout (which can happen, if the item is not in the local item cache yet)
 * @see https://wow.gamepedia.com/API_GetQuestLogWoWAPI.ItemLink
 */
declare function GetQuestLogItemLink(type: WoWAPI.QuestType, index: number): WoWAPI.ItemLink;

/**
 * Returns a single value: chat-ready item link
 * @param tradeSlotIndex index value of the "player's" (your character) trade slots (starts at 1 and proceeds to 6. 7 may be used for the
 * will-not-be-traded-slot.)
 * @returns a string that can be used to link items in the chat log
 * @see https://wow.gamepedia.com/API_GetTradePlayerWoWAPI.ItemLink
 */
declare function GetTradePlayerItemLink(tradeSlotIndex: number): WoWAPI.ItemLink;

/**
 * Gets the link string for a trade skill item
 * @param skillId The Id specifying which trade skill's link to get. Trade Skill window must be open for this to work. Indexes start at 1 which
 * is the general category of the tradeskill, if you have selected a sub-group of trade skills then 1 will be the name of that sub-group
 * @see https://wow.gamepedia.com/API_GetTradeSkillWoWAPI.ItemLink
 */
declare function GetTradeSkillItemLink(skillId: number): WoWAPI.ItemLink;

/**
 * Gets the link string for a trade skill reagent
 * @param skillId The Id specifying which trade skill's reagent to link
 * @param reagentId The Id specifying which of the skill's reagents to link
 * @see https://wow.gamepedia.com/API_GetTradeSkillReagentWoWAPI.ItemLink
 */
declare function GetTradeSkillReagentItemLink(skillId: number, reagentId: number): WoWAPI.ItemLink;

/**
 * Simply view, except this function is for your trading partner, ie, the other side of the trade window
 * @param tradeIndex index value of the "player's" (your character) trade slots (starts at 1 and proceeds to 6. 7 may be used for the will-not-be-traded-slot.)
 * @see https://wow.gamepedia.com/API_GetTradeTargetWoWAPI.ItemLink
 */
declare function GetTradeTargetItemLink(tradeIndex: number): WoWAPI.ItemLink;

/**
 * Returns usable, noMana
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 */
declare function IsUsableItem(itemIdentifier: string | number | WoWAPI.ItemLink): LuaMultiReturn<[boolean, boolean]>;

/**
 * Returns whether an item is consumed when used
 * @param itemIdentifier An item ID (number), item link or item name (string) to query
 * @returns 1 if the item is consumed when used, nil otherwise
 * @see https://wow.gamepedia.com/API_IsConsumableItem
 */
declare function IsConsumableItem(itemIdentifier: string | number | WoWAPI.ItemLink): WoWAPI.Flag;

/**
 *
 * @param itemIdentifier An item ID (number), item link or item name (string) to query
 * @see https://wow.gamepedia.com/API_IsCorruptedItem
 */
declare function IsCorruptedItem(itemIdentifier: string | number | WoWAPI.ItemLink): boolean;

/**
 * unknown
 * @param itemIdentifier An item ID (number), item link or item name (string) to query
 */
declare function IsCurrentItem(itemIdentifier: string | number | WoWAPI.ItemLink): WoWAPI.Flag;

/**
 * Determines if an item is equipped
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @see https://wow.gamepedia.com/API_IsEquippedItem
 */
declare function IsEquippedItem(itemIdentifier: string | number | WoWAPI.ItemLink): boolean;

/**
 * Returns 1 if item is an equip-able one at all, your character notwithstanding, or nil if not
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @see https://wow.gamepedia.com/API_IsEquippableItem
 */
declare function IsEquippableItem(itemIdentifier: string | number | WoWAPI.ItemLink): boolean;

/**
 * Determines if an item of a given type is equipped
 * @param itemType any valid inventory type, item class, or item subclass
 * @see https://wow.gamepedia.com/API_IsEquippedItemType
 */
declare function IsEquippedItemType(itemType: WoWAPI.EquippableItemType): boolean;

/**
 * Returns if you are in range of the specified unit to use the specified item
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 * @param unit which unit the range should be checked to
 * @returns
 * - If the item is not in range, false; if the item is in range, true; if the query is invalid, nil
 * - If the item is not in range, 0; if the item is in range, 1; if the query is invalid, nil
 * @see https://wow.gamepedia.com/API_IsItemInRange
 */
declare function IsItemInRange(itemIdentifier: string | number | WoWAPI.ItemLink, unit?: WoWAPI.UnitId): LuaMultiReturn<[boolean, WoWAPI.Flag]>;

/**
 * unknown
 * @param itemIdentifier Number/String/String - Numeric ID of the item, name of the item, or itemLink of the item to query
 */
declare function ItemHasRange(itemIdentifier: string | number | WoWAPI.ItemLink): boolean;

/**
 * Called to handle clicks on Blizzard hyperlinks in chat
 * @param link Link to Use, (eg 'item:3577:0:0:0:0:0:0:276308480' is a [Gold Bar], 'player:Kaso' is [Kaso]).
 * @param text The Text of the link, including Text Colour Infomation and itemlinks (eg The previous two examples
 * : '|cff1eff00|Hitem:3577:0:0:0:0:0:0:276308480|h[Gold Bar]|h|r' '|Hplayer:Kaso|h[Kaso]|h'
 * @param button The button used to click the notes 'LeftButton' or 'RightButton' Apparently, See Notes
 * @description
 *  - Do not insecurely hook this function to add your own link types; hook ChatFrame_OnHyperlinkShow(frame, link, text, button) instead.
 * Hooking this function insecurely will end up tainting Blizzard's combat log, which will taint UIParent's update routines and result in
 * "action has been blocked" messages
 *  - This function is affected by Shift and Ctrl keys, and depends on what is being clicked, according to the below table
 * @see https://wow.gamepedia.com/API_SetItemRef
 */
declare function SetItemRef(link: WoWAPI.ItemLink, text: string, button: WoWAPI.MouseButton): void;

/**
 * Uses an item, optionally on a specified target
 * @param itemName name of the item to use
 * @param target unit to use the item on, defaults to "target" for items that can be used on others
 * @protected
 * @see https://wow.gamepedia.com/API_UseItemByName
 */
declare function UseItemByName(itemName: string, target?: WoWAPI.UnitId): void;


declare namespace WoWAPI {
    type QuestType = "required" | "reward" | "choice";
    type QuestState = "OFFER" | "COMPLETE";
}

/**
 * Abandons the quest specified by SetAbandonQuest
 * @see https://wow.gamepedia.com/API_AbandonQuest
 */
declare function AbandonQuest(): void;

/**
 * Accepts the currently offered quest
 * @description You can call this function once the QUEST_DETAIL event fires
 * @see https://wow.gamepedia.com/API_AcceptQuest
 */
declare function AcceptQuest(): void;

/**
 * Adds a popup notification to the objectives tracker, showing that a quest is available or completed
 * @param questId the quest id
 * @param type popup type, one of "OFFER" or "COMPLETE"
 * @see https://wow.gamepedia.com/API_AddAutoQuestPopUp
 */
declare function AddAutoQuestPopUp(questId: number, type: WoWAPI.QuestState): void;

/**
 * Adds a quest to the list of quests being watched with an optional time to watch it
 * @param questIndex The index of the quest in the quest log
 * @param watchTime The amount of time to watch the quest in seconds
 * @see https://wow.gamepedia.com/API_AddQuestWatch
 */
declare function AddQuestWatch(questIndex: number, watchTime: number): void;

/**
 * Unknown
 * @param questId the quest id
 */
declare function AddWorldQuestWatch(questId: number): WoWAPI.Unknown;

/**
 * Returns whether the player can abandon a specific quest
 * @param questId quest ID of the quest to query, e.g. 5944 for N [60G] In Dreams
 * @returns 1 if the player is currently on the specified quest and can abandon it, nil otherwise
 * @see https://wow.gamepedia.com/API_CanAbandonQuest
 */
declare function CanAbandonQuest(questId: number): WoWAPI.Flag;

/**
 * Unknown
 */
declare function ClearAutoAcceptQuestSound(): WoWAPI.Unknown;

/**
 * Closes the shown quest
 */
declare function CloseQuest(): WoWAPI.Unknown;

/**
 * Collapses the quest header
 * @param questId The quest ID of the header you wish to collapse - 0 to collapse all quest headers
 * @see https://wow.gamepedia.com/API_CollapseQuestHeader
 */
declare function CollapseQuestHeader(questId: number): void;

/**
 * Advances the quest completion dialog to the reward selection step
 * - Unlike the name would suggest, this does not finalize the completion of a quest. Instead it is called when you press the continue button,
 * and is used to continue from the progress dialog to the completion dialog
 * - If you're interested in hooking the function called when completing a quest, check out QuestRewardCompleteButton_OnClick
 * (in FrameXML\QuestFrame.lua) instead
 * @see https://wow.gamepedia.com/API_CompleteQuest
 */
declare function CompleteQuest(): void;

/**
 * Accept an escort quest being started by a player nearby
 * - Can be used after the QUEST_ACCEPT_CONFIRM event has fired
 * @see https://wow.gamepedia.com/API_ConfirmAcceptQuest
 */
declare function ConfirmAcceptQuest(): void;

/**
 * Declines the currently offered quest.
 * - You can call this function once the QUEST_DETAIL event fires
 * @see https://wow.gamepedia.com/API_DeclineQuest
 */
declare function DeclineQuest(): void;

/**
 * Expands the quest header
 * - Expands the first quest header (questID = 1 is always yields a header if you have quests) if it was collapsed; if not, does nothing.
 * Also fires a QUEST_LOG_UPDATE event so be careful when calling this while processing a QUEST_LOG_UPDATE event
 * @param questId The index of the header you wish to expand. - 0 to expand all quest headers
 * @see https://wow.gamepedia.com/API_ExpandQuestHeader
 */
declare function ExpandQuestHeader(questId: number): void;

/**
 * Unknown
 */
declare function GetAbandonQuestItems(): WoWAPI.Unknown;

/**
 * Returns the name of a quest that will be abandoned if AbandonQuest is called
 * - The FrameXML-provided quest log calls SetAbandonQuest whenever a quest entry is selected, so this function will usually return the name of
 * the currently selected quest
 * @returns Name of the quest that will be abandoned
 * @see https://wow.gamepedia.com/API_GetAbandonQuestName
 */
declare function GetAbandonQuestName(): string;

/**
 * Returns true if a quest is possible to complete
 * @see https://wow.gamepedia.com/API_IsQuestCompletable
 */
declare function IsQuestCompletable(): boolean;

/**
 * Returns the number of items nessecary to complete a particular quest
 * @see https://wow.gamepedia.com/API_GetNumQuestItems
 */
declare function GetNumQuestItems(): number;


/// <reference path="global.d.ts" />

/**
 * Determines whether the current execution path is secure
 *
 * @returns 1 if the current path is secure (and able to call protected functions), nil otherwise.
 * @see https://wow.gamepedia.com/API_issecure
 */
declare function issecure(): WoWAPI.Flag;

/**
 * Taints the current execution path.
 *
 * @see https://wow.gamepedia.com/API_forceinsecure
 * @since 3.0.2
 */
declare function forceinsecure(): void;

/**
 * Determines whether the given table key is secure
 *
 * @param table table to check the the key in; if omitted, defaults to the globals table (_G).
 * @param variableName string key to check the taint of. Numbers will be converted to a string; other types will throw an error
 * @returns isSecure, taint
 * @see https://wow.gamepedia.com/API_issecurevariable
 */
declare function issecurevariable(table?: object, variableName?: string): LuaMultiReturn<[boolean, string]>;

/**
 * Calls the specified function without propagating taint to the caller
 *
 * @param call function to call, either a direct reference or a string used as a key into _G.
 * @param args any number of arguments to pass the function
 * @returns the function's return values
 * @see https://wow.gamepedia.com/API_securecall
 */
declare function securecall(call: string | ((...args: any[]) => any), ...args: any[]): any;

/**
 * Creates a secure "post hook" for the specified function. Your hook will be called with the same arguments after the original call is performed
 *
 * @param table Table to hook the functionName key in; if omitted, defaults to the global table (_G).
 * @param functionName name of the function being hooked
 * @param handler your hook function
 * @see https://wow.gamepedia.com/API_hooksecurefunc
 */
declare function hooksecurefunc(table?: object, functionName?: string, handler?: (...args: any[]) => any): void;

/**
 * Determines whether in-combat lockdown restrictions are active
 *
 * @returns true if lockdown restrictions are currently in effect, false otherwise
 * @see https://wow.gamepedia.com/API_InCombatLockdown
 */
declare function InCombatLockdown(): boolean;


declare const BOOKTYPE_SPELL = "spell";
declare const BOOKTYPE_PET = "pet";

declare namespace WoWAPI {
    type BookType = typeof BOOKTYPE_SPELL | typeof BOOKTYPE_PET;
}

/**
 * Retrieves the cooldown data of the spell specified.
 *
 * @see https://wow.gamepedia.com/API_GetSpellCooldown
 * @returns start, duration, enabled, modRate
 */
declare function GetSpellCooldown(spellId: number, type: WoWAPI.BookType): LuaMultiReturn<[number, number, WoWAPI.Flag, number]>;

/**
 * Returns the icon of the specified spell.
 *
 * @see https://wow.gamepedia.com/API_GetSpellTexture
 */
declare function GetSpellTexture(spellId: number, type: WoWAPI.BookType): WoWAPI.TexturePath;

/**
 * Get information about a spell.
 * @return MultipleReturnValues:
 *  name: The Name of the spell.
 *  rank: The rank line from the tooltip of the spell.
 *  icon: The interface path to the icon texture.
 *  castTime: The cast time, in milliseconds.
 * minRange: The minimum range of the spell.
 * maxRange: The maximum range of the spell.
 *
 * @see https://wow.gamepedia.com/API_GetSpellInfo
 */
declare function GetSpellInfo(spell: number | string): LuaMultiReturn<[string,string,string,number,number,number]>;

/**
 * Execute a console command
 *
 * @param command The console command to execute
 * @see https://wow.gamepedia.com/API_ConsoleExec
 */
declare function ConsoleExec(command: string): WoWAPI.Unknown;

/**
 * Attempts to detect the world of warcraft MMO mouse.
 *
 * @see https://wow.gamepedia.com/API_DetectWowMouse
 */
declare function DetectWowMouse(): WoWAPI.Unknown;

/**
 * Returns information about current client build
 *
 * @returns version, build, date, tocversion
 * @see https://wow.gamepedia.com/API_GetBuildInfo
 */
declare function GetBuildInfo(): LuaMultiReturn<[string, string, string, number]>;

/**
 * Returns the currently set error handler
 *
 * @returns Unknown
 * @see https://wow.gamepedia.com/API_geterrorhandler
 */
declare function geterrorhandler(): (...args: any[]) => any | null;

/**
 * Retrieve the current framerate (frames / second).
 *
 * @returns The current framerate in frames per second
 * @see https://wow.gamepedia.com/API_GetFramerate
 */
declare function GetFramerate(): number;

/**
 * Returns the current server time in hours and minutes
 *
 * @returns hours, minutes
 * @see https://wow.gamepedia.com/API_GetGameTime
 */
declare function GetGameTime(): LuaMultiReturn<[number, number]>;

/**
 * Returns the system uptime of your computer in seconds, with millisecond
 * precision.
 *
 * @returns hours, minutes
 * @see https://wow.gamepedia.com/API_GetTime
 */
declare function GetTime(): number;

/**
 * Returns information about the client locale
 *
 * @returns
 * - deDE: German (Germany)
 * - enGB: English (United Kingdom)
 * - enGB clients return enUS
 * - enUS: English (United States)
 * - esES: Spanish (Spain)
 * - esMX: Spanish (Mexico)
 * - frFR: French (France)
 * - itIT: Italian (Italy)
 * - koKR: Korean (Korea)
 * - ptBR: Portuguese (Brazil)
 * - ruRU: Russian (Russia) - UI AddOn
 * - zhCN: Chinese (Simplified, PRC)
 * - zhTW: Chinese (Traditional, Taiwan)
 */
declare function GetLocale(): string;

/**
 * Returns the name of the character's realm
 * @see https://wow.gamepedia.com/API_GetRealmName
 */
declare function GetRealmName(): string;
/// <reference path="ui.d.ts" />
/// <reference path="../auction.d.ts" />

declare namespace WoWAPI {
    interface GameTooltip extends UIObject, Frame, GameTooltipHookScript, GameTooltipSetScript {

        /**
         * Adds Line to tooltip with textLeft on left side of line and textRight on right side
         * @param textLeft string which will show on left
         * @param textRight string which will show on right
         * @param textLeftRed range 0 to 1 - red color value for left string
         * @param textLeftGreen range 0 to 1 - green color value for left string
         * @param textLeftBlue range 0 to 1 - blue color value for left string
         * @param textRightRed range 0 to 1 - red color value for right string
         * @param textRightGreen range 0 to 1 - green color value for right string
         * @param textRightBlue range 0 to 1 - blue color value for right string
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_AddDoubleLine
         */
        // tslint:disable-next-line max-line-length
        AddDoubleLine(textLeft: string, textRight: string, textLeftRed: number, textLeftGreen: number, textLeftBlue: number, textRightRed: number, textRightGreen: number, textRightBlue: number): void;

        /**
         * Hides this tooltip
         */
        Hide(): void;

        /**
         * Dynamically expands the size of a tooltip
         * @param leftString unknown
         * @param rightString unknown
         */
        AddFontStrings(leftString: Unknown, rightString: Unknown): Unknown;

        /**
         * Appends a line of text to tooltip
         * @param text text which will appear in new tooltip line
         * @param red range 0 to 1 - red color value for text string
         * @param green range 0 to 1 - green color value for text string
         * @param blue range 0 to 1 - blue color value for text string
         * @param wrapText 'true' to wrap text
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_AddLine
         */
        AddLine(text: string, red?: number, green?: number, blue?: number, wrapText?: boolean): void;

        /**
         * Adds a texture (icon) to the beginning of the last line added by AddLine(), AddDoubleLine(), etc
         * @param texturePath the texture to add
         * @description There is a limit of 10 textures per tooltip (as seen in GameTooltipTemplate.xml)
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_AddTexture
         */
        AddTexture(texturePath: TexturePath): void;
		
		/**
         * Sets an attachment point of an UI component.
         *
         * @param point Point of the object to adjust based on the anchor.
         * @param relativeTo Name or reference to a Region to attach obj to. If not specified in the call's signature, defaults to obj's parent (or, if obj has
         * no parent, the entire screen), or if specified in the signature and passed nil, defaults to the entire screen.
         * @param relativePoint point of the relativeTo Region to attach point of obj to. If not specified, defaults to the value of point.
         * @param offsetX x-offset (negative values will move obj left, positive values will move obj right), defaults to 0 if not specified,
         * if ofsy is not specified, or if both relativeTo and relativePoint are specified and nil.
         * @param offsetY y-offset (negative values will move obj down, positive values will move obj up), defaults to 0 if not specified,
         * if ofsx is not specified, or if both relativeTo and relativePoint are specified and nil.
         */
        SetPoint(point: Point, relativeTo: Region | string, relativePoint: Point, offsetX: number, offsetY: number): void;
        SetPoint(point: Point): void;
        SetPoint(point: Point, offsetX: number, offsetY: number): void;
        SetPoint(point: Point, relativeTo: Region | string, relativePoint: Point): void;


        /**
         * Append text to the end of the first line of the tooltip
         * @param text the text to add
         */
        AppendText(text: string): void;

        /**
         * Clear all 30 lines of tooltip (both left and right ones)
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_ClearLines
         */
        ClearLines(): void;

        /**
         * Initiates fading out of the GameTooltip over the next few seconds
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_FadeOut
         */
        FadeOut(): void;

        /**
         * Returns the current anchoring type
         */
        GetAnchorType(): Anchor;

        /**
         * Returns the name and link of the item displayed on a GameTooltip
         * @returns **itemName, ItemLink**
         * - **itemName**: Plain text item name (e.g. "Broken Fang")
         * - **itemLink**: Formatted item link (e.g. "|cff9d9d9d|Hitem:7073:0:0:0:0:0:0:0|h[Broken Fang]|h|r")
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_GetItem
         */
        GetItem(): LuaMultiReturn<[string, ItemLink]>;

        /**
         * Get the text for the Tooltip
         */
        GetText(): string;

        /**
         * unknown
         */
        GetMinimumWidth(): Unknown;

        /**
         * Returns the name and link of the spell displayed on a GameTooltip
         * @returns **itemName, spellId**
         * - **spellName**: Plain text spell name (e.g. "Explosive Shot")
         * - **spellId**: Integer spell ID (e.g. "60053")
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_GetSpell
         */
        GetSpell(): LuaMultiReturn<[string, number]>;

        /**
         * Returns owner frame, anchor
         *
         */
        GetOwner(): LuaMultiReturn<[UIObject, Point]>;

        /**
         * Returns unit name, unit id
         */
        GetUnit(): LuaMultiReturn<[string, UnitId]>;

        /**
         * unknown
         * @param unit unknown
         */
        IsUnit(unit: UnitId): boolean;

        /**
         * Return the number of text lines which comprise a tooltip object
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_NumLines
         */
        NumLines(): number;

        /**
         * Shows the tooltip for the specified action button
         * @param slot id of the action button to load the tooltip for
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetAction
         */
        SetAction(slot: ActionBarSlotId): void;

        /**
         * unknown
         * @param type unknown
         * @param index unknown
         * @param offset unknown
         */
        SetAuctionCompareItem(type: AUCTION_TYPE, index: number, offset: number): Unknown;

        /**
         * unknown
         * @param id unknown
         */
        SetBackpackToken(id: Unknown): Unknown;

        /**
         * Sets the GameTooltip to contain text information about the specified item,
         * as well as returning whether the item is "cooling down" and the cost to repair the item (which may be 0 (or nil?) if non-applicable).
         * @param bag the ID of the bag
         * @param slot the ID of the slot
         * @returns **hasCooldown, repairCost**
         * - **hasCooldown**: if the item currently has a cooldown
         * - **repairCost**: the cost to repair the item, may be 0 or nil if the item cannot be repaired
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetBagItem
         */
        SetBagItem(bag: WoWAPI.CONTAINER_ID, slot: number): LuaMultiReturn<[boolean, number]>;

        /**
         * unknown
         */
        SetBuybackItem(): Unknown;

        /**
         * Shows the tooltip for the specified token type
         * @param tokenId id of the token type to load the tooltip for
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetCurrencyToken
         */
        SetCurrencyToken(tokenId: number): void;

        /**
         * Displays the frame stack of the mouse cursor's current position on the tooltip.
         * This is not intended to be used in typical addons, but is part of the Blizzard_DebugTools "builtin addon" inspired by DevTools
         * @param showHidden If true, includes in the display those frames which are currently hidden
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetFrameStack
         */
        SetFrameStack(showHidden?: boolean): void;

        /**
         * unknown
         * @param glyphId unknown
         */
        SetGlyph(glyphId: Unknown): Unknown;

        /**
         * Shows the tooltip for the specified guild bank item
         * @param tabId the tab id
         * @param slot the slot id
         */
        SetGuildBankItem(tabId: WoWAPI.CONTAINER_ID_BANK, slot: number): void;

        /**
         * Changes the item which is displayed in the tooltip according to the passed argument
         * @param itemIdentifier Representing an in-game item, enchant or spell or A clickable string of an in-game item
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetHyperlink
         */
        SetHyperlink(itemIdentifier: string | ItemLink): void;

        /**
         * unknown
         * @param args unknown
         */
        SetHyperlinkCompareItem(...args: Unknown[]): Unknown;

        /**
         * Shows the tooltip for the specified mail inbox item
         * @param index The index of the message to get information from
         * @param attachmentIndex The index of the attachment to get information from. In the range of [1,ATTACHMENTS_MAX_RECEIVE(16)]
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetInboxItem
         */
        SetInboxItem(index: number, attachmentIndex: number): Unknown;

        /**
         * This function sets a tooltip widget to display information for the given unit's given inventory slot
         * @param unit the unit whose inventory should be searched
         * @param slot the inventory slot number to search
         * @param nameOnly unknown argument
         * @returns **hasItem, hasCooldown, repairCost**
         * - **hasItem**: is there an item at the given slot
         * - **hasCooldown**: unknown
         * - **repairCost**: cost of repairing item
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetInventoryItem
         */
        SetInventoryItem(unit: UnitId, slot: number, nameOnly?: Unknown): LuaMultiReturn<[boolean, boolean, number]>;

        /**
         * Sets the GameTooltip to show a loot item
         * @param lootIndex The index of the loot item to show (from 1 to GetNumLootItems())
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetLootItem
         */
        SetLootItem(lootIndex: number): void;

        /**
         * Shows the tooltip for the specified loot roll item
         * @param rollId the roll id for the item
         */
        SetLootRollItem(rollId: number): void;

        /**
         * unknown
         * @param slot unknown
         * @param offset unknown
         */
        SetMerchantCompareItem(slot: number, offset?: number): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetMerchantItem(...args: Unknown[]): Unknown;

        /**
         * unknown
         * @param width unknown
         */
        SetMinimumWidth(width: number): void;

        /**
         * Moves the game tooltip to a location based on the "owner" frame
         * @param owner Owner frame, which defines the element where the tooltip is centered on.
         * A pointer to the frame is required, not the frame name itself (use _G['MyFrame'] to get the pointer from the frame name)
         * @param anchor a string that describes the anchor point as it would be set via the SetPoint() function
         * @param offsetX offset horizontal
         * @param offsetY offset vertical
         * @description This will set the owner for tooltip:IsOwned(frame). For instance, first call GameTooltip:SetOwner(UIParent).
         * Then GameTooltip:IsOwned(UIParent) will return 1.
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetOwner
         */
        SetOwner(owner: UIObject, anchor: Anchor, offsetX?: number, offsetY?: number): void;

        /**
         * Sets the amount of padding on the righthand side of the GameTooltip
         * @param amount The amount of padding (black space) to put on the right hand side of the tooltip
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetPadding
         */
        SetPadding(amount: number): void;

        /**
         * Shows the tooltip for the specified pet action
         * @param slot the pet action slot id
         */
        SetPetAction(slot: number): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetQuestItem(...args: Unknown[]): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetQuestLogItem(...args: Unknown[]): Unknown;

        /**
         * Shows the tooltip for the spell reward of the currently selected quest
         * @param args unknown
         */
        SetQuestLogRewardSpell(...args: Unknown[]): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetQuestRewardSpell(...args: Unknown[]): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetSendMailItem(...args: Unknown[]): Unknown;

        /**
         * Shows the tooltip for the specified shapeshift form
         * @param slot the slot id
         */
        SetShapeshift(slot: number): Unknown;

        /**
         * Shows the tooltip for the specified spell
         * @param spellBookId the id of the spell on the tab from the spellbook - not the same as SpellId
         * @param bookType Either BOOKTYPE_SPELL ("spell") or BOOKTYPE_PET ("pet")
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetSpell
         */
        SetSpell(spellBookId: number, bookType: "pet" | "spell"): void;

        /**
         * Shows the tooltip for the specified spell
         * @param spellID the id of the spell
         * @see https://wowpedia.fandom.com/wiki/UIOBJECT_GameTooltip
         */
        SetSpellByID(spellID: number): void;

        /**
         * Shows the tooltip for the specified talent
         * @param tabIndex the index of the talent tab
         * @param talentIndex the index of the talent on the tab
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetTalent
         */
        SetTalent(tabIndex: number, talentIndex: number): Unknown;

        /**
         * Sets the text of the tooltip
         * @param text The text of the new tooltip. Variable can be used inplace of a string
         * @param red number range 0 to 1 - red color value for text string
         * @param green number range 0 to 1 - green color value for text string
         * @param blue number range 0 to 1 - blue color value for text string
         * @param alpha number range 0 to 1 - specifies the opacity of text. Default is 1
         * @param textWrap 'true' to wrap the text string to fit the tooltip box. Default is 'false'
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetText
         */
        SetText(text: string, red?: number, green?: number, blue?: number, alpha?: number, textWrap?: boolean): void;

        /**
         * unknown
         * @param args unknown
         */
        SetTracking(...args: Unknown[]): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetTradePlayerItem(...args: Unknown[]): Unknown;

        /**
         * This method opens the tooltip window when you hover over objects in the tradeskill window
         * @param tradeItemIndex The index of the selected item in the recipe list
         * @param reagentIndex Index of the selected reagent
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetTradeSkillItem
         */
        SetTradeSkillItem(tradeItemIndex: number, reagentIndex?: number): void;

        /**
         * unknown
         * @param args unknown
         */
        SetTradeTargetItem(...args: Unknown[]): Unknown;

        /**
         * unknown
         * @param args unknown
         */
        SetTrainerService(...args: Unknown[]): Unknown;

        /**
         * Sets the UnitID for the tooltip
         * @param unitId the unit id
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetUnit
         */
        SetUnit(unitId: UnitId): void;

        /**
         * shows the tooltip for a unit's aura
         * @param unitId the unitId of the unit whose aura is to be shown
         * @param auraIndex the index of the aura to be shown
         * @param filter same as UnitAura(...) "HARMFUL" for debuffs, "HELP" for buffs, "RAID" for raid specific, etc
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetUnitAura
         */
        SetUnitAura(unitId: UnitId, auraIndex: number, filter?: BuffFilterType): Unknown;

        /**
         * Shows the tooltip for a unit's buff
         * @param unitId the unitId of the unit whose buff is to be shown
         * @param buffIndex the index of the buff to be shown
         * @param filter same as UnitAura(...) "HARMFUL" for debuffs, "HELP" for buffs, "RAID" for raid specific, etc
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetUnitBuff
         */
        SetUnitBuff(unitId: UnitId, buffIndex: number, filter?: BuffFilterType): Unknown;

        /**
         * shows the tooltip for a unit's debuff
         * @param unitId the unitId of the unit whose debuff is to be shown
         * @param buffIndex the index of the debuff to be shown
         * @param filter same as UnitAura(...) "HARMFUL" for debuffs, "HELP" for buffs, "RAID" for raid specific, etc
         * @see http://wowwiki.wikia.com/wiki/API_GameTooltip_SetUnitAura
         */
        SetUnitDebuff(unitId: UnitId, buffIndex: number, filter?: BuffFilterType): Unknown;

        /**
         * shows the configured tooltip
         */
        Show(): void;
    }
}

declare const GameTooltip: WoWAPI.GameTooltip;


/// <reference path="../global.d.ts" />

declare namespace WoWAPI {

    type HorizontalAlign = "LEFT" | "CENTER" | "RIGHT";
    type VerticalAlign = "TOP" | "MIDDLE" | "BUTTOM";
    type Point = "TOP" | "RIGHT" | "BOTTOM" | "LEFT" | "TOPRIGHT" | "TOPLEFT" | "BOTTOMLEFT" | "BOTTOMRIGHT" | "CENTER";
    type Anchor = "ANCHOR_TOP" | "ANCHOR_RIGHT" | "ANCHOR_BOTTOM" | "ANCHOR_LEFT" | "ANCHOR_TOPRIGHT" | "ANCHOR_BOTTOMRIGHT" | "ANCHOR_TOPLEFT" | "ANCHOR_BOTTOMLEFT" | "ANCHOR_CURSOR" | "ANCHOR_PRESERVE" | "ANCHOR_NONE"
    type Layer = "BACKGROUND" | "BORDER" | "ARTWORK" | "OVERLAY" | "HIGHLIGHT";
    type FrameStrata = "WORLD" | "BACKGROUND" | "LOW" | "MEDIUM" | "HIGH" | "DIALOG" | "FULLSCREEN" | "FULLSCREEN_DIALOG" | "TOOLTIP";
    type Wrap = "CLAMP" | "CLAMPTOBLACK" | "CLAMPTOBLACKADDITIVE" | "CLAMPTOSHITE" | "REPEAT" | true | "MIRROR";
    type MouseButton = "LeftButton" | "RightButton" | "Middle" | "Button4" | "Button5";
    type FilterMode = "LINEAR" | "BILINEAR" | "TRILINEAR" | "NEAREST";
    type MouseWheelDelta = 1 | -1;
    type Align = "HORIZONTAL" | "VERTICAL";
    type BlendMode = "DISABLE" | "BLEND" | "ALPHAKEY" | "ADD" | "MOD";

    namespace Event {
        type OnEvent = "OnEvent";
        type OnLoad = "OnLoad";
        type OnUpdate = "OnUpdate";
        type OnClick = "OnClick";
        type OnEnter = "OnEnter";
        type OnLeave = "OnLeave";
        type OnHide = "OnHide";
        type OnShow = "OnShow";
        type OnMouseDown = "OnMouseDown";
        type OnMouseUp = "OnMouseUp";
        type OnMouseWheel = "OnMouseWheel";
        type OnValueChanged = "OnValueChanged";
        type OnTextChanged = "OnTextChanged";
        type OnDragStart = "OnDragStart";
        type OnDragStop = "OnDragStop";
        type OnKeyDown = "OnKeyDown";
        type OnKeyUp = "OnKeyUp";

        type PlayerLogin = "PLAYER_LOGIN";
        type PlayerLogout = "PLAYER_LOGOUT";
        type UnitHealth = "UNIT_HEALTH";
        type UnitPowerUpdate = "UNIT_POWER_UPDATE";
        type UnitDisplaypower = "UNIT_DISPLAYPOWER";
        type PlayerTargetChanged = "PLAYER_TARGET_CHANGED";
        type UnitMaxhealth = "UNIT_MAXHEALTH";
        type UnitMaxpower = "UNIT_MAXPOWER";
        type GroupRosterUpdate = "GROUP_ROSTER_UPDATE";
        type PlayerEnteringWorld = "PLAYER_ENTERING_WORLD";
        type PlayerFocusChanged = "PLAYER_FOCUS_CHANGED";
        type UnitEnteredVehicle = "UNIT_ENTERED_VEHICLE";
        type UnitExitedVehicle = "UNIT_EXITED_VEHICLE";

        type OnAny = OnEvent | OnLoad | OnUpdate | OnClick | OnEnter |
            OnLeave | OnHide | OnShow | OnMouseDown | OnMouseUp | OnMouseWheel |
            OnValueChanged | OnTextChanged | OnDragStart | OnDragStop | OnKeyDown | OnKeyUp;
    }

    type UIDropdownInfo = {
        text: string,
        icon?: string,
        value?: any,
        func?: () => void,
        arg1?: any,
        arg2?: any,
        isTitle?: boolean,
        disabled?: boolean,
        checked?: boolean,
        hasArrow?: boolean,
        hasColorSwatch?: boolean,
        r?: number,
        g?: number,
        b?: number,
        colorCode?: string,
        swatchFunc?: () => void,
        hasOpacity?: boolean,
        opacity?: number,
        opacityFunc?: () => void,
        cancelFunc?: () => void,
        notClickable?: boolean,
        notCheckable?: boolean,
        keepShownOnClick?: boolean,
        tooltipTitle?: string,
        tooltipText?: string,
        justifyH?: WoWAPI.HorizontalAlign,
        menuList?: object
    };

    type UIDropDownMenuDisplayMode = "" | "MENU";

    /**
     * The Frame type
     */
    type FrameType = "Frame" | "Button" | "Cooldown"
        | "ColorSelect" | "EditBox" | "GameTooltip" | "MessageFrame"
        | "Minimap" | "Model" | "ScrollFrame" | "ScrollingMessageFrame"
        | "SimpleHTML" | "Slider" | "StatusBar";

    interface Object {
        /**
         * get the type of this object
         */
        GetObjectType(): FrameType;

        /**
         * Return the name of the object.
         */
        GetName(): string;

        /**
         * Determine if this object is of the specified type, or a subclass of that type.
         *
         * @param type the type to check for
         */
        IsObjectType(type: FrameType): boolean;
    }

    /**
     * the generic UIObject type
     */
    interface UIObject extends Object {
        /**
         * get the parent UIObject
         */
        GetParent(): UIObject;

        /**
         * Returns whether insecure interaction with a widget is forbidden.
         */
        IsForbidden(): boolean;
    }

    interface AnimationGroup extends UIObject, AnimationGroupHookScript, AnimationGroupSetScript {
        Play(): void;
        Pause(): void;
        Stop(): void;
        Finish(): void;
        GetProgress(): number;
        IsDone(): boolean;
        IsPlaying(): boolean;
        IsPaused(): boolean;
        GetDuration(): number;
        SetLooping(loopType: LoopType): void;
        GetLooping(): LoopType;
        GetLoopState(): loopState;
        CreateAnimation(frameType: "Alpha", frameName?: string, inheritFrom?: WoWAPI.UIObject): WoWAPI.Alpha;
        CreateAnimation(frameType: "Path", frameName?: string, inheritFrom?: WoWAPI.UIObject): WoWAPI.Path;
        CreateAnimation(frameType: "Rotation", frameName?: string, inheritFrom?: WoWAPI.UIObject): WoWAPI.Rotation;
        CreateAnimation(frameType: "Scale", frameName?: string, inheritFrom?: WoWAPI.UIObject): WoWAPI.Scale;
        CreateAnimation(frameType: "Translation", frameName?: string, inheritFrom?: WoWAPI.UIObject): WoWAPI.Translation;
    }

    interface Animation extends UIObject, AnimationHookScript, AnimationSetScript {
        Play(): void;
        Pause(): void;
        Stop(): void;
        IsDone(): boolean;
        IsPlaying(): boolean;
        IsPaused(): boolean;
        IsStopped(): boolean;
        IsDelaying(): boolean;
        GetElapsed(): number;
        SetStartDelay(delaySec: number): boolean;
        GetStartDelay(): number;
        SetEndDelay(delaySec: number): void;
        GetEndDelay(): number;
        SetDuration(durationSec: number): void;
        GetDuration(): number;
        GetProgress(): number;
        GetSmoothProgress(): number;
        GetProgressWithDelay(): number;
        SetMaxFramerate(framerate: number): void;
        GetMaxFramerate(): number;
        SetOrder(order: number): void;
        GetOrder(): number;
        SetSmoothing(smoothType: SmoothType)
        GetSmoothing(): SmoothType;
        SetParent(animGroup: AnimationGroup): void;
        GetRegionParent(): Region;
    }

    interface Alpha extends UIObject, Animation {
        SetChange(change: number): void;
        GetChange(): number;
    }

    interface Path extends UIObject, Animation {
        CreateControlPoint(name?: string, template?: string, order?: number): void;
        GetCurve(): CurveType;
        GetMaxOrder(): number;
        SetCurve(curveType: CurveType): void;
    }

    interface Rotation extends UIObject, Animation {
        SetDegrees(degrees): void;
        GetDegrees(): number;
        SetRadians(radians: number): void;
        GetRadians(): number;
        SetOrigin(point: Point, offsetX: number, offsetY: number): void;
        GetOrigin(): LuaMultiReturn<[Point,number,number]>
    }

    interface Scale extends UIObject, Animation {
        SetScale(x: number, y: number)
        GetScale(): LuaMultiReturn<[number,number]>
        SetOrigin(point: Point, offsetX: number, offsetY: number): void;
        GetOrigin(): LuaMultiReturn<[Point,number,number]>
    }

    interface Translation extends UIObject, Animation {
        SetOffset(x: number, y: number)
        GetOffset(): LuaMultiReturn<[number,number]>
    }

    /**
     * This is another abstract object type that groups together a number of font related methods that are used by multiple other widget types.
     * This doesn't have a direct correlation to a UI object. See FontInstance object information for details.
     */
    interface FontInstance extends UIObject {

        /**
         * Returns detailed information on a font object.
         * @returns MultipleReturnValues:
         *  - **fontName**: Path to font file
         *  - **fontHeight**: Font height in pixels. Due to internal graphics engine workings, this will be ridiculously close to an integer number,
         *  but not quite ever fully.
         *  - **fontFlags**: See FontInstance:SetFont().
         */
        GetFont(): LuaMultiReturn<[string, number, string]>;

        /**
         * Gets the text color of of a Font Instance.
         * @return MultipleReturnValues:
         *  r: The red color
         *  g: The green color
         *  b: The blue color
         *  a?: the alpha (opacity)
         */
        GetTextColor(): LuaMultiReturn<[number, number, number, number?]>;

        /**
         * The function is used to set the font to use for displaying text.
         *
         * @param font path to the font file, relative to the WoW base directory.
         * @param size size in points.
         * @param flags any comma-delimited combination of "OUTLINE", "THICKOUTLINE" and "MONOCHROME".
         */
        SetFont(font: string, size: number, flags?: FontInstanceFlags | string): void;

        /**
         * Sets horizontal text justification
         *
         * @param align the new align
         */
        SetJustifyH(align: HorizontalAlign): void;

        /**
         * Sets vertical text justification
         *
         * @param align the new align
         */
        SetJustifyV(align: VerticalAlign): void;

        /**
         * Sets the default text color.
         *
         * @param r red color
         * @param g green color
         * @param b blue color
         * @param a alpha (opacity)
         */
        SetTextColor(r: number, g: number, b: number, a?: number): void;

        SetShadowOffset(x: number, y: number): void;
    }

    /**
     * This is an abstract object type which cannot actually be created.
     * It gathers together a number of common methods which have identical behaviours across all widget types.
     * This object contains a collection of methods that are related to the size, location and visibility of a widget.
     * Note that it is not directly related to Frame:GetRegions() et al. See Region object information for details.
     */
    interface Region extends UIObject {

        /**
         * Clear all attachment points for this object.
         */
        ClearAllPoints(): void;

        /**
         * Set this object to hidden (it and all of its children will disappear).
         */
        Hide(): void;

        /**
         * Set this object to shown (it will appear if its parent is visible).
         */
        Show(): void;

        /**
         * Get the current alpha value
         */
        GetAlpha(): number;

        /**
         * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
         */
        GetBottom(): number;

        /**
         * Returns the distance from the bottom-left corner of the screen to the center of a Region, using the region's own coordinate space (ie, dependent on effective scale).
         *
         * @see https://wow.gamepedia.com/API_Region_GetPoint
         * @returns number, number
         */
        GetCenter(): LuaMultiReturn<[number, number]>;

        /**
         * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
         */
        GetTop(): number;

        /**
         * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
         */
        GetLeft(): number;

        /**
         * Returns the distance from the bottom/left edge of the screen to the requested edge of an object, scaled with the objects's effective scale.
         */
        GetRight(): number;

        /**
         * Get the width of this object.
         */
        GetWidth(): number;

        /**
         * Get the height of this object.
         */
        GetHeight(): number;

        /**
         * Returns information about the anchor point for a region.
         *
         * @see https://wow.gamepedia.com/API_Region_GetPoint
         * @returns point, relativeTo, relativePoint, xOfs, yOfs
         */
        GetPoint(index?: number): LuaMultiReturn<[Point, Region, Point, number, number]>;

        /**
         * Set the object's alpha (opacity) value.
         *
         * @param alpha the new alpha value
         */
        SetAlpha(alpha: number): void;

        /**
         * Set the parent UIObject
         */
        SetParent(parent: UIObject | null): void;

        /**
         * Sets an attachment point of an UI component.
         *
         * @param point Point of the object to adjust based on the anchor.
         * @param relativeTo Name or reference to a Region to attach obj to. If not specified in the call's signature, defaults to obj's parent (or, if obj has
         * no parent, the entire screen), or if specified in the signature and passed nil, defaults to the entire screen.
         * @param relativePoint point of the relativeTo Region to attach point of obj to. If not specified, defaults to the value of point.
         * @param offsetX x-offset (negative values will move obj left, positive values will move obj right), defaults to 0 if not specified,
         * if ofsy is not specified, or if both relativeTo and relativePoint are specified and nil.
         * @param offsetY y-offset (negative values will move obj down, positive values will move obj up), defaults to 0 if not specified,
         * if ofsx is not specified, or if both relativeTo and relativePoint are specified and nil.
         */
        SetPoint(point: Point, relativeTo: Region | string, relativePoint: Point, offsetX: number, offsetY: number): void;
        SetPoint(point: Point): void;
        SetPoint(point: Point, offsetX: number, offsetY: number): void;
        SetPoint(point: Point, relativeTo: Region | string, relativePoint: Point): void;

        /**
         * Sets an object to be positioned and sized exactly the same as another object.
         */
        SetAllPoints(relativeRegion?: Region | string): void;

        /**
         * Sets the desired height of a frame-based object.
         *
         * @param height The desired height to set the frame-based object to (use 0 to clear the desired height).
         * Note that a frame whose height is determined based on its anchors will not use this height.
         */
        SetHeight(height: number): void;

        /**
         * Sets the width of a frame-based object.
         *
         * @param width The width to set the frame-based object to (use 0 to clear the desired width).
         * Note that a frame whose width is determined based on its anchors will not use this width.
         */
        SetWidth(width: number): void;

        /**
         * Set the size (width and height) of the object with one function
         *
         * @param width The new width
         * @param height The new height
         */
        SetSize(width: number, height: number): void;

        /**
         * Checks if mouse is over a given region.
         *
         * @return True if the mouse cursor is currently over the region (as modified by the offset arguments); false otherwise.
         */
        IsMouseOver(): boolean;
        IsMouseOver(top: number, bottom: number, left: number, right: number): boolean;

        /**
         * Determine if this object can be manipulated in certain ways by tainted code in combat or not
         */
        IsProtected(): boolean;

        /**
         * Determine if this object is shown (would be visible if its parent was visible).
         */
        IsShown(): boolean;

        /**
         * Get whether the object is visible on screen (logically (IsShown() and GetParent():IsVisible()));
         */
        IsVisible(): boolean;

        CreateAnimationGroup(name?: string, inheritsFrom?: string): AnimationGroup;

        /**
        *this 1 probably isn't done right...idk how this 1 works.
        */
        GetAnimationGroups(): AnimationGroup;

        StopAnimating(): void;
    }

    /**
     * Another abstract type, for objects that represent only a rendering process onto the screen, rather than a full blown frame.
     * (See LayeredRegion object information for details)
     */
    interface LayeredRegion extends Region {

        /**
         * Returns the draw layer for the Region.
         */
        GetDrawLayer(): number;

        /**
         * Sets the layer in which the LayeredRegion is drawn.
         *
         * @param layer coarse layer to draw the region in, e.g. "BACKGROUND" or "ARTWORK".
         * @param sublevel Integer between -8 and 7 (inclusive), controls rendering order within the specified layer.
         * Regions with lower sublevel values are drawn below those with higher ones.
         */
        SetDrawLayer(layer: Layer, sublevel?: number): void;

        /**
         * Sets the color of an object.
         *
         * @param r The red color value to set the object to. The range is 0 to 1.
         * @param g The green color value to set the object to. The range is 0 to 1.
         * @param b The blue color value to set the object to. The range is 0 to 1.
         * @param a The alpha value to set the object to. The range is 0 to 1.
         */
        SetVertexColor(r: number, g: number, b: number, a?: number): void;
    }

    /**
     * See Texture object information for details.
     */
    interface Texture extends LayeredRegion {

        /**
         * Returns the texture string from any Texture object.
         *
         * @returns The path/filename without extension of the texture
         */
        GetTexture(): string;

        /**
         * Applies a counter-clockwise rotation to the texture.
         *
         * @param angle Rotation angle in radians. Positive values rotate the texture counter-clockwise.
         * @param cx Horizontal coordinate of the rotation "center" point, defaults to 0.5.
         * @param cy Vertical coordinate of the rotation "center" point, defaults to 0.5.
         */
        SetRotation(angle: number, cx: number, cy: number): void;
        SetRotation(angle: number): void;

        /**
         * Modifies the region of a texture drawn by the Texture widget.
         */
        SetTexCoord(left: number, right: number, top: number, bottom: number): void;
        SetTexCoord(ULx: number, ULy: number, LLx: number, LLy: number, URx: number, URy: number, LRx: number, LRy: number): void;

        /**
         * Changes the texture of a Texture widget.
         *
         * @param file Path to a texture image. | ID number specifying a Blizzard texture file. Returned by various API functions.
         * @param horizWrap Wrap behavior specifying what should appear when sampling pixels with an x coordinate outside the (0, 1)
         * region of the texture coordinate space
         * @param vertWrap Wrap behavior specifying what should appear when sampling pixels with a y coordinate outside the (0, 1)
         * region of the texture coordinate space.
         * @param filterMode Texture filtering mode to use
         */
        SetTexture(file: string | number, horizWrap?: Wrap, vertWrap?: Wrap, filterMode?: FilterMode): void;
		SetTexture(r:number,g:number,b:number,a:number): void;

        /**
         * Changes the color of a texture.
         *
         * @param r Red component.
         * @param g Green component.
         * @param b Blue component.
         * @param a Alpha component (1.0 is opaque, 0.0 is transparent). The default value is 1.0.
         */
        SetColorTexture(r: number, g: number, b: number, a?: number): void;

        /**
         * Sets the blend mode of the texture.
         *
         * @param mode Blend mode to use.
         * 
         * "DISABLE" - Ignores the alpha channel completely when rendering the texture.
         * 
         * "BLEND" - Uses the alpha channel with a normal blending overlay.
         * 
         * "ALPHAKEY" - Interprets the alpha with any black value being transparent, and any non-black value being opaque.
         * 
         * "ADD" - Uses the alpha channel with an additive blending overlay.
         * 
         * "MOD" - Ignores the alpha channel, multiplying the image against the back-ground.
         */
        SetBlendMode(mode: WoWAPI.BlendMode): void;

        /**
         * 
         * @param desaturated 1 to make the image grayscale, 0/nil for the original colors
         * @returns shaderSupported - returns nil if desaturation isn't supported by the user's graphics card
         */
        SetDesaturated(desaturated: number): boolean;
    }

    /**
     * a font string object
     */
    interface FontString extends FontInstance, LayeredRegion {

        /**
         * Returns the text from any FontString UI object.
         *
         * @returns The text of the FontString. Returns nil if the FontString is an empty string.
         */
        GetText(): string;

        /**
         * Sets the text to be displayed in the fontstring. The text will have the color given to it via the fontinstance definition
         * (or a FontString:SetTextColor call). You may however use escape sequences to modify the string's appearance.
         *
         * @param text The text to set
         */
        SetText(text: string): void;

        /**
         * Sets the text displayed in the font string using format specifiers. Equivalent to :SetText(string.format("format", value)), but does not create a throwaway Lua string object, resulting in greater memory-usage efficiency.
         * @param format A string containing format specifiers (as with string.format()).
         * @param args A list of values to be included in the formatted string.
         */
        SetFormattedText(format: string, ...args: string[]): void;

        /**
         * Returns how wide the string would be, in pixels, without wrapping
         * @see https://wow.gamepedia.com/API_FontString_GetStringWidth
         */
        GetStringWidth(): number;

        /**
         * Sets whether a frame's text should wrap
         * @param wrap true to allow text wrapping for children, false to disallow
         * @see https://warcraft.wiki.gg/wiki/API_FontString_SetWordWrap
         */
        SetWordWrap(wrap: boolean): void;
    }

    /**
     * a generic hook script interface for reuse in other objects
     */
    interface ObjectHookScript<T extends UIObject> {

        /**
         * Securely post-hooks a script handler.
         *
         * @param event The handler to hook to, e.g. "OnShow". See Widget handlers.
         * @param handler The function to call; will be passed all arguments relevant for the hooked widget handler type. May not be nil.
         */
        HookScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        HookScript(event: "OnClick", handler: (frame: T, button: MouseButton, down: boolean) => void): void;
        HookScript(event: "OnEnter" | "OnLeave", handler: (frame: T, motion: Unknown) => void): void;
        HookScript(event: "OnEvent", handler: (frame: T, eventName: Event.OnAny & Event, ...args: any[]) => void): void;
        HookScript(event: "OnHide" | "OnShow" | "OnLoad", handler: (frame: T) => void): void;
        HookScript(event: "OnMouseDown" | "OnMouseUp", handler: (frame: T, button: MouseButton) => void): void;
        HookScript(event: "OnMouseWheel", handler: (frame: T, delta: MouseWheelDelta) => void): void;
        HookScript(event: "OnUpdate", handler: (frame: T, elapsed: number) => void): void;
        HookScript(event: "OnValueChanged", handler: (frame: T, changed: any) => void): void;
        HookScript(event: "OnTextChanged", handler: (frame: T, text: string) => void): void;
        HookScript(event: "OnDragStart", handler: (frame: T, button: MouseButton) => void): void;
        HookScript(event: "OnDragStop", handler: (frame: T) => void): void;
        HookScript(event: "OnKeyDown", handler: (frame: T, key: string) => void): void;
        HookScript(event: "OnKeyUp", handler: (frame: T, key: string) => void): void;
        HookScript(event: Event.OnAny, handler?: (Frame: T, ...args: any[]) => void): void;
    }

    /**
     * a generoc set script interface for reuse in other objects
     */
    interface ObjectSetScript<T extends UIObject> {

        /**
         * Changes the specified widget script handler.
         *
         * @param event Name of the widget script handler to modify (OnShow, OnEvent, etc).
         * @param handler The function to call when handling the specified widget event, or nil to remove the handler.
         */
        SetScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        SetScript(event: "OnClick", handler: (frame: T, button: MouseButton, down: boolean) => void): void;
        SetScript(event: "OnEnter" | "OnLeave", handler: (frame: T, motion: Unknown) => void): void;
        SetScript(event: "OnEvent", handler: (frame: T, eventName: Event.OnAny | Event, ...args: any[]) => void): void;
        SetScript(event: "OnHide" | "OnShow" | "OnLoad", handler: (frame: T) => void): void;
        SetScript(event: "OnMouseDown" | "OnMouseUp", handler: (frame: T, button: MouseButton) => void): void;
        SetScript(event: "OnMouseWheel", handler: (frame: T, delta: MouseWheelDelta) => void): void;
        SetScript(event: "OnUpdate", handler: (frame: T, elapsed: number) => void): void;
        SetScript(event: "OnValueChanged", handler: (frame: T, changed: any) => void): void;
        SetScript(event: "OnTextChanged", handler: (frame: T, isUserInput: boolean) => void): void;
        SetScript(event: "OnDragStart", handler: (frame: T, button: MouseButton) => void): void;
        SetScript(event: "OnDragStop", handler: (frame: T) => void): void;
        SetScript(event: "OnKeyDown", handler: (frame: T, key: string) => void): void;
        SetScript(event: "OnKeyUp", handler: (frame: T, key: string) => void): void;
        SetScript(event: Event.OnAny, handler?: (Frame: T, ...args: any[]) => void): void;
    }

    interface GameTooltipHookScript extends ObjectHookScript {
        HookScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        HookScript(event: "OnTooltipAddMoney", handler: (tooltip: GameTooltip,cost: number,maxcost: number) => void): void;
        HookScript(event: "OnTooltipCleared", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetAchievement", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetDefaultAnchor", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetEquipmentSet", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetFramestack", handler: (tooltip: GameTooltip, highlightFrame: Frame) => void): void;
        HookScript(event: "OnTooltipSetItem", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetQuest", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetSpell", handler: (tooltip: GameTooltip) => void): void;
        HookScript(event: "OnTooltipSetUnit", handler: (tooltip: GameTooltip) => void): void;
    }

    interface GameTooltipSetScript extends ObjectSetScript {
        SetScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        SetScript(event: "OnTooltipAddMoney", handler: (tooltip: GameTooltip,cost: number,maxcost: number) => void): void;
        SetScript(event: "OnTooltipCleared", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetAchievement", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetDefaultAnchor", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetEquipmentSet", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetFramestack", handler: (tooltip: GameTooltip, highlightFrame: Frame) => void): void;
        SetScript(event: "OnTooltipSetItem", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetQuest", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetSpell", handler: (tooltip: GameTooltip) => void): void;
        SetScript(event: "OnTooltipSetUnit", handler: (tooltip: GameTooltip) => void): void;
    }
	
	interface ScriptObjectHookScript {
        HookScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        HookScript(event: "OnLoad", handler: (self: T) => void): void;
		HookScript(event: "OnUpdate", handler: (self: T, elapsed:number) => void): void;
    }
	interface ScriptObjectSetScript {
        SetScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        SetScript(event: "OnLoad", handler: (self: T) => void): void;
		SetScript(event: "OnUpdate", handler: (self: T, elapsed:number) => void): void;
    }
	
	interface AnimationHookScript extends ScriptObjectHookScript {
		HookScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
		HookScript(event: "OnFinished", handler: (self: T, requested: boolean) => void): void;
		HookScript(event: "OnPause", handler: (self: T) => void): void;
		HookScript(event: "OnPlay", handler: (self: T) => void): void;
		HookScript(event: "OnStop", handler: (self: T, requested:boolean) => void): void;
		
	}
	
	interface AnimationSetScript extends ScriptObjectSetScript {
	    SetScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        SetScript(event: "OnFinished", handler: (self: T, requested: boolean) => void): void;
		SetScript(event: "OnPause", handler: (self: T) => void): void;
		SetScript(event: "OnPlay", handler: (self: T) => void): void;
		SetScript(event: "OnStop", handler: (self: T, requested:boolean) => void): void;
	}
	
	interface AnimationGroupHookScript extends ScriptObjectHookScript {
		HookScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
		HookScript(event: "OnFinished", handler: (self: T, requested: boolean) => void): void;
		HookScript(event: "OnPause", handler: (self: T) => void): void;
		HookScript(event: "OnPlay", handler: (self: T) => void): void;
		HookScript(event: "OnStop", handler: (self: T, requested:boolean) => void): void;
		HookScript(event: "OnLoop", handler: (self: T, loopState:number) => void): void;
		
	}
	
	interface AnimationGroupSetScript extends ScriptObjectSetScript {
	    SetScript(event: Event.OnAny, handler: (frame: T, ...args: any[]) => void): void;
        SetScript(event: "OnFinished", handler: (self: T, requested: boolean) => void): void;
		SetScript(event: "OnPause", handler: (self: T) => void): void;
		SetScript(event: "OnPlay", handler: (self: T) => void): void;
		SetScript(event: "OnStop", handler: (self: T, requested:boolean) => void): void;
		SetScript(event: "OnLoop", handler: (self: T, loopState:number) => void): void;
	}
	
	
    interface Backdrop {
        /**
         * Which texture file to use as frame background (.blp or .tga format)
         */
        bgFile?: string;

        /**
         * Which texture file to use as frame edge blp or .tga format)
         */
        edgeFile?: string;

        /**
         * whether background texture is tiled or streched
         */
        tile?: boolean;

        /**
         * Control how large each copy of the bgFile becomes on-screen
         */
        tileSize?: number;

        /**
         * Control how large each copy of the edgeFile becomes on-screen (i.e. border thickness and corner size)
         */
        edgeSize?: number;

        /**
         * Controls how far into the frame the background will be drawn (use higher values the thicker the edges are)
         */
        insets: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
    }

    /**
     * The main wow frame object
     */
    interface Frame extends Region, ObjectHookScript<Frame>, ObjectSetScript<Frame> {

        /**
         * Creates a new FontString as a child of a frame.
         *
         * @param name The name for a global variable that points to the newly created font string.
         * If nil, the texture is anonymous and no global variable will be created.
         * @param layer The layer the font should be drawn in, e.g. "ARTWORK".
         * @param inheritsFrom The name of a virtual font string, created in XML, to inherit from. if nil, the font string does not inherit any properties.
         */
        CreateFontString(name?: string, layer?: Layer, inheritsFrom?: string): FontString;

        RegisterForClicks(...clickType: ClickType[]): void;

        /**
         * Creates a Texture object within the specified widget.
         *
         * @param name Name of the newly created texture; the function will create a global variable mapping this value to the created texture.
         * If nil, the texture is anonymous and no global variable is created.
         * @param layer The layer to the texture should be drawn in, e.g. "ARTWORK".
         * @param inheritsFrom a comma-delimited list of names of virtual textures (created in XML) to inherit from; if nil,
         * the texture does not inherit any properties.
         * @param subLayer The order in which the texture should be drawn, within the same layer.
         */
        CreateTexture(name?: string, layer?: Layer, inheritsFrom?: string, subLayer?: number): Texture;

        /**
         * Allows this frame to receive keyboard input via OnKeyUp and OnKeyDown script handlers.
         *
         * @param enableFlag Whether to enable (true, default) or disable (false).
         */
        EnableKeyboard(enableFlag: boolean): void;

        /**
         * Allows a frame to receive mouse input via OnMouseDown, OnMouseUp or OnClick. The frame must be shown to receive mouse events.
         *
         * @param enableFlag Whether to enable (true, default) or disable (false).
         */
        EnableMouse(enableFlag: boolean): void;

        /**
         * Allows a frame to receive mouse wheel input.
         *
         * @param enableFlag Whether to enable (true, default) or disable (false).
         */
        EnableMouseWheel(enableFlag: boolean): void;

        /**
         * Gets the children of a frame
         */
        GetChildren(): LuaMultiReturn<[...UIObject[]]>;

        /**
         * Returns the Frame Strata the frame is in.
         */
        GetFrameStrata(): FrameStrata;
        
        /**
         * Returns the region's scale relative to its immediate parent (if it has one)
         * 3.3.5a Frame:GetScale() and Frame:GetEffectiveScale not Region:
         * @see https://wowpedia.fandom.com/wiki/API_Region_GetScale
         * @returns number
         */
        GetScale()

        /**
         * Returns the region's net scale, inclusive of its parent's effective scale
         * 3.3.5a Frame:GetScale() and Frame:GetEffectiveScale not Region:
         * @see https://wowpedia.fandom.com/wiki/API_Region_GetScale
         * @returns number
         */
        GetEffectiveScale()

        /**
         * returns whether the flag is enabled or not
         */
        IsKeyboardEnabled(): boolean;

        /**
         * returns whether the flag is enabled or not
         */
        IsMouseEnabled(): boolean;

        /**
         * returns whether the flag is enabled or not
         */
        IsMouseWheelEnabled(): boolean;

        /**
         * Registers which events the object would like to monitor.
         *
         * @param eventName The name of the event to register the object as monitoring.
         */
        RegisterEvent(eventName: Event): void;

        /**
         * Sets the Frame Strata of the frame.
         *
         * @param frameStrata The Frame Strata the frame will be put in
         */
        SetFrameStrata(frameStrata: FrameStrata): void;

        /**
         * Specified a size scaling to be applied to the object (and its children).
         *
         * @param scale New scale applied to this object and its children; must be greater than 0, 1 indicates no additional scaling.
         */
        SetScale(scale: number): void;

        /**
         * set an attribute on the frame
         *
         * @param name the name of the attribute to set
         * @param value the value of the attribute
         */
        SetAttribute(name: string, value: any): void;

        /**
         * Unregisters the widget from receiving OnEvent notifications for a particular event.
         *
         * @param eventName The name of the event the object wishes to no longer monitor. See Events.
         */
        UnregisterEvent(eventName: Event): void;

        /**
         * Unregisters all events that the object is currently monitoring.
         */
        UnregisterAllEvents(): void;

        /**
         * Applies a tint to the background component of a frame's backdrop
         * @param red red tint component, from 0 to 1 (red)
         * @param green green tint component, from 0 to 1 (green).
         * @param blue blue tint component, from 0 to 1 (blue)
         * @param alpha alpha value to apply to the backdrop's background, from 0 to 1 (opaque)
         * @see https://wow.gamepedia.com/API_Frame_SetBackdropColor
         */
        SetBackdropColor(red: number, green: number, blue: number, alpha: number): void;

        /**
         * Using 'nil' as the only parameter will remove the backdrop on the indicated frame
         * @param options
         */
        SetBackdrop(options: Backdrop | void): void;

        /**
         * Sets whether a frame widget can be moved
         * @param movable true to allow the frame to be moved using Frame:StartMoving(), false to disallow
         * @see https://wow.gamepedia.com/API_Frame_SetMovable
         */
        SetMovable(movable: boolean): void;

        /**
         * Sets whether a frame's children can be clipped
         * @param clipsChildren true to allow clipping for children, false to disallow
         * @see https://warcraft.wiki.gg/wiki/API_Frame_SetClipsChildren
         */
        SetClipsChildren(clipsChildren: boolean): void;

        /**
         * Starts moving the frame-inheriting widget as the user moves the mouse cursor
         * @see https://wow.gamepedia.com/API_Frame_StartMoving
         */
        StartMoving(): void;

        /**
         * Stops moving or resizing the widget
         * @see https://wow.gamepedia.com/API_Frame_StopMovingOrSizing
         */
        StopMovingOrSizing(): void;

        /**
         * Sets the Frame Level of the frame, within its Frame Strata
         * @param level the new strata level
         * @see https://wow.gamepedia.com/API_Frame_SetFrameLevel
         */
        SetFrameLevel(level: number): void;

        /**
         * Modifies the size of the frame's hit rectangle - the area in which clicks are sent to the frame in question
         * @param left pixels to move the frame's left hit edge to the right by
         * @param right pixels to move the frame's right hit edge to the left by
         * @param top pixels to move the frame's top hit edge down by
         * @param bottom pixels to move the frame's bottom hit edge up by
         * @see https://wowpedia.fandom.com/wiki/API_Frame_SetHitRectInsets
         */
        SetHitRectInsets(left: number, right: number, top: number, bottom: number): void;

        RegisterForDrag(button: WoWAPI.MouseButton): void;

        SetID(id: number): void;
        
        GetID(): number;
    }

    /**
     * a normal WoWAPI.Frame but with all given E properties
     */
    type AdvancedFrame<F extends UIObject, E extends object> = {

        [P in keyof (E & F)]: (E & F)[P]
    };

    /**
     * The InterfaceOptions framework requires an addon to supply its own configuration frame (panel).
     * The supplied panel will be repositioned by FrameXML and displayed when the addon's configuration category is selected.
     * When the user presses the Okay, Cancel or Defaults buttons on the Interface Options frame, the panels will be notified by
     * calling specific functions in the supplied frame table.
     */
    interface FrameInterfaceCategory extends Frame {

        /**
         * name displayed in the Interface Options category list (your addon name, or a panel-specific name)
         */
        name: string;

        /**
         * the panel.name value of the parent configuration panel, used to display a hierarchical category tree.
         * If the parent panel is not specified or does not exist, the panel is displayed as a top-level panel.
         */
        parent?: string;

        /**
         * called when the frame is initially displayed, and after requesting the default values to be restored.
         */
        refresh?: () => void;

        /**
         * called when the player presses the Okay button, indicating that settings should be saved.
         */
        okay?: () => void;

        /**
         * called when the player presses the Cancel button, indicating that changes made should be discarded.
         */
        cancel?: () => void;

        /**
         * called when the player presses the Defaults button, indicating that default settings for the addon should be restored.
         */
        default?: () => void;
    }

    /**
     * A slider for wow
     */
    interface Slider extends Frame {

        /**
         * Disables the slider
         */
        Disable(): void;

        /**
         * Enables the slider
         */
        Enable(): void;

        /**
         * Returns the minimum and maximum values of a slider
         */
        GetMinMaxValues(): LuaMultiReturn<[number, number]>;

        /**
         * Get the current value of the slider
         */
        GetValue(): number;

        /**
         * Get the current step size of the slider
         */
        GetValueStep(): number;

        /**
         * set the minimun and maximum value of the slider
         *
         * @param min the min value
         * @param max the max value
         */
        SetMinMaxValues(min: number, max: number): void;

        /**
         * set the current value of the slider
         *
         * @param value the new value
         */
        SetValue(value: number): void;

        /**
         * set the new step value for the slider
         *
         * @param stepValue the new step value
         */
        SetValueStep(stepValue: number): void;

        /**
         * set the orientation of the slider
         *
         * @param orientation the orientation to set
         */
        SetOrientation(orientation: Align): void;

        /**
         * set the texture for the slider thumb
         *
         * @param filename filename
         * @param texture reference to an existing Texture object
         * @param layer path to a texture image file
         */
        SetThumbTexture(filename: string, layer?: WoWAPI.Layer): void;
        SetThumbTexture(texture: WoWAPI.Texture, layer?: WoWAPI.Layer): void;

        /**
         * returns the texture for the slider thumb
         */
        GetThumbTexture(): WoWAPI.Texture;
    }

    interface EditBox extends Frame, FontInstance {
        /**
         * Clears the input text focus out of the EditBox. After this call EditBox will no longer receive input from keyboard.
         */
        ClearFocus(): void;

        /**
         * Returns the position of the editbox cursor.
         */
        GetCursorPosition(): number;

        /**
         * This function reads text entered into the editBox, tries to convert it into a number, and returns corresponding numerical value,
         * or 0 if text didn't look like a number.
         */
        GetNumber(): number;

        /**
         * Returns the String that is currently entered in the EditBox.
         */
        GetText(): string;

        /**
         * Inserts text at the current cursor position.
         *
         * @param text text to insert at the current cursor position.
         */
        Insert(text: string): void;

        /**
         * Sets the position of the cursor in the edit box.
         *
         * @param position New editing cursor position; the cursor is set after position'th character of the string
         */
        SetCursorPosition(position: number): void;

        /**
         * Sets editBox's text to the specified string
         *
         * @param text the string you want to appear in the EditBox
         */
        SetText(text: string): void;

        /**
         * Sets whether the cursor should automatically focus on the EditBox when it is shown
         *
         * @param state Whether autofocus should be enabled
         */

        AddHistoryLine(text: string): void;

        /**
         * Returns value of ignoreArrows attribute, 1/nil format
         */
        GetAltArrowKeyMode(): number;

        /**
         * Returns value of blinkSpeed attribute
         */
        GetBlinkSpeed(): number;

        /**
         * Get the number of history lines for this edit box
         */
        GetHistoryLines(): number;

        /**
         * Get the input language (the locale, not the in-game language)
         */
        GetInputLanguage(): string;

        /**
         * Returns the value of bytes attribute
         */
        GetMaxBytes(): number;

        /**
         * GetsReturns the value of letters attribute
         */
        GetMaxLetters(): number;

        /**
         * Gets the number of letters in the box
         */
        GetNumLetters(): number;

        /**
         * Returns list of left, right, top, bottom text insets
         * @returns ?
         */
        GetTextInsets(): any[];

        /**
         * Returns true if the edit box has the focus
         */
        HasFocus(): boolean;

        /**
         * Set the highlight to all or some of the edit box text
         * @param startPos
         * @param endPos
         */
        HighlightText(startPos: number, endPos: number): void;

        /**
         * Returns value of autoFocus attribute, in 1/nil format
         */
        IsAutoFocus(): number;

        /**
         * Returns value of multiline attribute, in 1/nil format
         */
        IsMultiLine(): number;

        /**
         * Returns value of numeric attribute, in 1/nil format.
         */
        IsNumeric(): number;

        /**
         * Returns value of password attribute, in 1/nil format.
         */
        IsPassword(): number;

        SetAutoFocus(state: boolean): void;

        SetAltArrowKeyMode(): void;

        SetBlinkSpeed(speed: number): void;

        SetFocus(): void;

        /**
         * Sets the number of history lines to remember
         * @param lines
         */
        SetHistoryLines(lines: number): void;

        /**
         * Sets the maximum byte size for entered text
         * @param bytes
         */
        SetMaxBytes(bytes: number): void;

        /**
         * Sets the maximum number of letters for entered text
         * @param letters
         */
        SetMaxLetters(letters: number): void;

        SetNumber(num: number): void;

        SetNumeric(): void;

        SetPassword(): void;

        /**
         * Sets the spacing between multiple lines
         * @param spacing
         */
        SetSpacing(spacing: number): void;

        ToggleInputLanguage(): void;

        SetMultiLine(state: boolean): void;

        SetFontObject(fontObject: string): void;

        SetTextInsets(l: any, r: any, t: any, b: any): void;

        SetScript(event: "OnCursorChanged", handler: (frame: EditBox, x: number, y: number, w: number, h: number) => void): void;
        SetScript(event: "OnArrowPressed", handler: (frame: EditBox, key: string) => void): void;
        SetScript(event: "OnEditFocusGain", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnEditFocusLost", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnEnterPressed", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnEscapePressed", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnHyperlinkClick", handler: (frame: EditBox, link: string, text: string, button: any) => void): void;
        SetScript(event: "OnHyperlinkEnter", handler: (frame: EditBox, link: string, text: string) => void): void;
        SetScript(event: "OnHyperlinkLeave", handler: (frame: EditBox, link: string, text: string) => void): void;
        SetScript(event: "OnInputLanguageChanged", handler: (frame: EditBox, language: string) => void): void;
        SetScript(event: "OnSpacePressed", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnTabPressed", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnTextChanged", handler: (frame: EditBox) => void): void;
        SetScript(event: "OnTextSet", handler: (frame: EditBox) => void): void;
    }


    /**
     * a wow button
     */
    interface Button extends Frame {

        /**
         * Execute the click action of the button.
         */
        Click(): void;

        /**
         * Disable the Button so that it cannot be clicked
         */
        Disable(): void;

        /**
         * Enable to the Button so that it may be clicked
         */
        Enable(): void;

        /**
         * Get the text label for the Button
         */
        GetText(): string;

        /**
         * Get the height of the Button's text
         */
        GetTextHeight(): number;

        /**
         * Get the width of the Button's text
         */
        GetTextWidth(): number;

        /**
         * Determine whether the Button is enabled
         */
        IsEnabled(): boolean;

        /**
         * Sets the Button's text to the specified string
         *
         * @param text The text that will be written on the Button
         */
        SetText(text: string): void;

        GetButtonState(): string;
        GetDisabledFontObject(): string;
        GetDisabledTexture(): WoWAPI.Texture;
        GetFontString(): FontString;
        GetHighlightFontObject(): FontObject;
        GetHighlightTexture(): WoWAPI.Texture;
        //GetMotionScriptsWhileDisabled() - Get whether the button is allowed to run its OnEnter and OnLeave scripts even while disabled - New in 3.3.
        GetNormalFontObject(): FontObject;
        GetNormalTexture(): WoWAPI.Texture;
        //GetPushedTextOffset() - Get the text offset when this button is pushed (x, y) - New in 1.11.
        GetPushedTexture(): WoWAPI.Texture;
        GetText(): string;
        GetTextHeight(): number;
        GetTextWidth(): number;
        IsEnabled(): bool;
        LockHighlight(): void;
        RegisterForClicks(...clickType: ClickType[]): void;
        RegisterForMouse(): void;
        SetButtonState(state: string): void;
        SetDisabledAtlas(atlasName: string): void;
        SetDisabledFontObject(fontObject: FontObject): void;
        SetDisabledTexture(texture: string): void;
        SetEnabled(isEnable: bool): void;
        SetFontString(fontString: string|FontObject): void;
		SetFontString(fontString: string): void;
        SetFormattedText(formatstring: string): void;
        SetHighlightAtlas(atlasName: string): void;
        SetHighlightFontObject(fontObject: FontObject): void;
        SetHighlightTexture(texture: string): void;
        SetMotionScriptsWhileDisabled(shouldFire: bool): void;
        SetNormalAtlas(atlasName: string): void;
        SetNormalFontObject(fontObject: FontObject): void;
        SetNormalTexture(texture: string): void;
        SetPushedAtlas(atlasName: string): void;
        SetPushedTextOffset(x: number, y: number): void;
        SetPushedTexture(texture: string): void;
        SetText(textLabel:string): void;
        UnlockHighlight(): void;
    }

    interface CheckButton extends Button {
        GetChecked(): bool;
        GetCheckedTexture(): string;
        GetDisabledCheckedTexture(): string;
        SetChecked(state: bool): void;
        SetCheckedTexture(texture: string): void;
        SetDisabledCheckedTexture(texture: string): void;
    }

	interface LootButton extends Button {
        SetSlot(index: number): void;
    }

    interface Model extends Frame {
        AdvanceTime(): void;
        ClearFog(): void;
        ClearModel(): void;
        GetFacing(): number;
        GetFogColor(): LuaMultiReturn<[number, number, number, number]>
        GetFogFar(): number;
        GetFogNear(): number;
        GetLight(): LuaMultiReturn<[boolean, boolean, number, number, number, number, number, number, number, number, number, number, number]>;
        GetModel(): string;
        GetModelScale(): number;
        GetPosition(): LuaMultiReturn<[number,number,number]>;
        ReplaceIconTexture(texture: string): void;
        SetCamera(index: number): void;
        SetFacing(facing: number): void;
        SetFogColor(r: number, g: number, b: number,a: number): void;
        SetFogFar(value: number): void;
        SetFogNear(value: number): void;
        //SetGlow(..): void;
        SetLight(enabled: boolean, omni: boolean, dirX: number, dirY: number, dirZ: number, ambIntensity: number, ambR: number, ambG: number, ambB: number, dirIntensity: number, dirR: number, dirG: number, dirB: number): void;
        SetModel(file: string): void;
        SetModelScale(scale: number): void;
        SetPosition(x: number, y: number, z: number) : void;
        SetSequence(sequence: number): void;
        SetSequenceTime(sequence: number, time: number): void;
    }

    interface PlayerModel extends Model {
        RefreshUnit(): void;
        SetCreature(creatureID: number): void;
        SetRotation(roationradians: number): void;
        SetUnit(unitid: string): void;
    }

    interface DressUpModel extends PlayerModel {
        Dress(): void;
        TryOn(item: string): void;
        Undress(): void;
    }

    interface StatusBar extends Frame, UIObject, Region {
        GetMinMaxValues(): LuaMultiReturn<[number,number]>;
        GetOrientation: Align;
        GetStatusBarColor: number;
        GetStatusBarTexture(): Texture;
        GetValue(): number;
        SetMinMaxValues(min: number, max: number): void;
        SetOrientation(orientation: Align): void;
        SetStatusBarColor(r: number, g: number, b: number, alpha: number): void;
        SetStatusBarTexture(file: string): void;
        SetValue(value: number): void;
    }

    interface ScrollFrame extends Frame {
        GetHorizontalScroll(): number;
        GetHorizontalScrollRange(): number;
        GetScrollChild(): frame;
        GetVerticalScroll(): number;
        GetVerticalScrollRange(): number;
        SetHorizontalScroll(offset: number): void;
        SetScrollChild(Frame:frame): void;
        SetVerticalScroll(offset: number): void;
    }

    interface MessageFrame extends FontInstance {
        AddMessage(text: string, r: number, g: number, b: number, id: number, addToStart: boolean)
        Clear(): void;
        GetFadeDuration(): number;
        GetFading(): boolean;
        GetInsertMode(): string;
        GetTimeVisible(): number;
        SetFadeDuration(seconds: number): void;
        SetFading(isEnabled: boolean): void;
        SetInsertMode(mode: string): void;
        SetTimeVisible(seconds: number): void;
    }
    interface ScrollingMessageFrame extends FontInstance {
        AddMessage(text: string, r: number, g: number, b: number, id: number, addToStart: boolean)
        AtBottom(): boolean;
        AtTop(): boolean;
        Clear(): void;
        GetCurrentLine(): number;
        GetCurrentScroll(): number;
        GetFadeDuration(): number;
        GetFading(): boolean;
        GetHyperlinksEnabled(): boolean;
        GetInsertMode(): string;
        GetMaxLines(): number;
        GetNumLinesDisplayed(): number;
        GetNumMessages(): number;
        GetScrollOffset(): number;
        GetTimeVisible(): number;
        PageDown(): void;
        PageUp(): void;
        ScrollDown(): void;
        ScrollToBottom(): void;
        ScrollToTop(): void;
        ScrollUp(): void;
        SetFadeDuration(seconds: number): void;
        SetFading(isEnabled: boolean): void;
        SetHyperlinksEnabled(enableFlag: boolean): void;
        SetInsertMode(mode: string): void;
        SetMaxLines(lines: number): void;
        SetScrollOffset(offset: number): void;
        SetTimeVisible(seconds: number): void;
        UpdateColorByID(id: number, r: number, g: number, b: number): void;
    }

    interface Cooldown {
        GetReverse(): boolean
        SetCooldown(Start: number, Duration: number)
        SetReverse(bool: boolean)
    }

    interface Minimap{
        GetPingPosition(): number;
        GetZoom(): number;
        GetZoomLevels(): number;
        PingLocation(x: number, y: number): void;
        SetArrowModel(file: string): void;
        SetBlipTexture(file: string): void;
        SetIconTexture(file: string): void;
        SetMaskTexture(file: string): void;
        SetPlayerModel(file: string): void;
        SetZoom(level): void;
    }

    interface ColorSelect {
        GetColorHSV(): LuaMultiReturn<[number,number,number]>
        GetColorRGB(): LuaMultiReturn<[number,number,number]>
        GetColorValueTexture(): WoWAPI.Texture
        GetColorValueThumbTexture(): WoWAPI.Texture
        GetColorWheelTexture(): WoWAPI.Texture
        GetColorWheelThumbTexture(): WoWAPI.Texture
        SetColorHSV(h: number, s: number, v: number)
        SetColorRGB(r: number, g: number, b: number)
        SetColorValueTexture(texture: string)
        SetColorValueThumbTexture(texture: string)
        SetColorWheelTexture(ttexture: string)
        SetColorWheelThumbTexture(texture: string)
        SetColorValueTexture(texture: WoWAPI.Texture)
        SetColorValueThumbTexture(texture: WoWAPI.Texture)
        SetColorWheelTexture(ttexture: WoWAPI.Texture)
        SetColorWheelThumbTexture(texture: WoWAPI.Texture)
    }

    interface SimpleHTML extends Frame,FontInstance {
        GetContentHeight(): number;
        GetHyperlinkFormat(): string;
        GetTextData(): string;
        SetHyperlinkFormat(format: string): void;
        SetText(text: string): void;
    }
}

/**
 * global lua namespace
 */

declare const _G: { [prop: string]: any };
declare const SlashCmdList:{[msg:string]: (message: string) => void};
declare const InterfaceOptionsFramePanelContainer: WoWAPI.Region;
declare const UIParent: WoWAPI.Frame;
declare const PaperDollFrame: WoWAPI.Frame;
declare const SpellBookFrame: WoWAPI.Frame;
declare const CharacterFrame: WoWAPI.Frame;
declare const Minimap: WoWAPI.Frame;
declare const MainMenuBar: WoWAPI.Frame;
declare const PlayerTalentFrame: WoWAPI.Frame;
declare const AchievementFrame: WoWAPI.Frame;
declare const QuestLogFrame: WoWAPI.Frame;
declare const FriendsFrame: WoWAPI.Frame;
declare const PVPFrame: WoWAPI.Frame;
declare const LFDQueueFrame: WoWAPI.Frame;
declare const GameMenuFrame: WoWAPI.Frame;
declare const HelpFrame: WoWAPI.Frame;
declare const MinimapCluster: WoWAPI.Frame;
declare const WatchFrame: WoWAPI.Frame;
declare const PlayerFrame: WoWAPI.Frame;
declare const TargetFrame: WoWAPI.Frame;
declare const FocusFrame: WoWAPI.Frame;
declare const WorldFrame: WoWAPI.Frame;
declare const WorldMapFrame: WoWAPI.Frame;
declare const ChatFrame1: WoWAPI.Frame;
declare const UISpecialFrames: string[];

declare function loadstring(code: string, name?: string): ()=>void;
declare function assert(code: ()=>void):() => string;
declare function type(thing: any): string;
declare function tonumber(value: string|number, radix?:number): number;
declare function format(pattern: string, ...any:any): string;

interface String {
    format(...any:any): string;
};

 /**
  * global strings
  */
 
 declare const ABANDON_PET: string;
 declare const ABANDON_QUEST: string;
 declare const ABANDON_QUEST_ABBREV: string;
 declare const ABANDON_QUEST_CONFIRM: string;
 declare const ABANDON_QUEST_CONFIRM_WITH_ITEMS: string;
 declare const ABILITIES: string;
 declare const ABSORB: string;
 declare const ABSORB_TRAILER: string;
 declare const ACCEPT: string;
 declare const ACCEPT_ALT: string;
 declare const ACCEPT_COMMENT: string;
 declare const ACHIEVEMENT: string;
 declare const ACHIEVEMENTFRAME_FILTER_ALL: string;
 declare const ACHIEVEMENTFRAME_FILTER_COMPLETED: string;
 declare const ACHIEVEMENTFRAME_FILTER_INCOMPLETE: string;
 declare const ACHIEVEMENTS: string;
 declare const ACHIEVEMENTS_COMPLETED: string;
 declare const ACHIEVEMENTS_COMPLETED_CATEGORY: string;
 declare const ACHIEVEMENT_BROADCAST: string;
 declare const ACHIEVEMENT_BROADCAST_SELF: string;
 declare const ACHIEVEMENT_BUTTON: string;
 declare const ACHIEVEMENT_CATEGORY_PROGRESS: string;
 declare const ACHIEVEMENT_META_COMPLETED_DATE: string;
 declare const ACHIEVEMENT_SUMMARY_CATEGORY: string;
 declare const ACHIEVEMENT_TITLE: string;
 declare const ACHIEVEMENT_TOOLTIP_COMPLETE: string;
 declare const ACHIEVEMENT_TOOLTIP_IN_PROGRESS: string;
 declare const ACHIEVEMENT_UNLOCKED: string;
 declare const ACHIEVEMENT_UNLOCKED_CHAT_MSG: string;
 declare const ACHIEVEMENT_WATCH_TOO_MANY: string;
 declare const ACTIONBARS_LABEL: string;
 declare const ACTIONBARS_SUBTEXT: string;
 declare const ACTIONBAR_LABEL: string;
 declare const ACTION_DAMAGE_SHIELD: string;
 declare const ACTION_DAMAGE_SHIELD_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_BLOCK: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_BLOCK_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_BLOCK_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_BLOCK_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DEFLECT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DEFLECT_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DEFLECT_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DEFLECT_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DODGE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DODGE_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DODGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_DODGE_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_EVADED: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_EVADED_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_EVADED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_EVADED_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_IMMUNE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_IMMUNE_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_IMMUNE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_IMMUNE_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_MISS: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_MISS_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_MISS_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_MISS_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_PARRY: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_PARRY_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_PARRY_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_PARRY_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_RESIST: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_RESIST_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_RESIST_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_DAMAGE_SHIELD_MISSED_RESIST_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SHIELD_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SPLIT: string;
 declare const ACTION_DAMAGE_SPLIT_ABSORBED_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SPLIT_FULL_TEXT: string;
 declare const ACTION_DAMAGE_SPLIT_POSSESSIVE: string;
 declare const ACTION_DAMAGE_SPLIT_RESULT_FULL_TEXT: string;
 declare const ACTION_ENCHANT_APPLIED: string;
 declare const ACTION_ENCHANT_APPLIED_FULL_TEXT: string;
 declare const ACTION_ENCHANT_APPLIED_POSSESSIVE: string;
 declare const ACTION_ENCHANT_REMOVED: string;
 declare const ACTION_ENCHANT_REMOVED_FULL_TEXT: string;
 declare const ACTION_ENCHANT_REMOVED_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_DROWNING: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_DROWNING_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_DROWNING_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FALLING: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FALLING_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FALLING_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FATIGUE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FATIGUE_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FATIGUE_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FIRE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FIRE_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FIRE_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_LAVA: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_LAVA_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_LAVA_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_POSSESSIVE: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_SLIME: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_SLIME_FULL_TEXT: string;
 declare const ACTION_ENVIRONMENTAL_DAMAGE_SLIME_POSSESSIVE: string;
 declare const ACTION_PARTY_KILL: string;
 declare const ACTION_PARTY_KILL_FULL_TEXT: string;
 declare const ACTION_PARTY_KILL_POSSESSIVE: string;
 declare const ACTION_RANGED: string;
 declare const ACTION_RANGE_DAMAGE: string;
 declare const ACTION_RANGE_DAMAGE_FULL_TEXT: string;
 declare const ACTION_RANGE_DAMAGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_RANGE_DAMAGE_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED: string;
 declare const ACTION_RANGE_MISSED_ABSORB: string;
 declare const ACTION_RANGE_MISSED_ABSORB_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_ABSORB_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_BLOCK: string;
 declare const ACTION_RANGE_MISSED_BLOCK_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_BLOCK_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_DEFLECT: string;
 declare const ACTION_RANGE_MISSED_DEFLECT_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_DEFLECT_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_DODGE: string;
 declare const ACTION_RANGE_MISSED_DODGE_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_DODGE_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_EVADE: string;
 declare const ACTION_RANGE_MISSED_EVADE_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_EVADE_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_IMMUNE: string;
 declare const ACTION_RANGE_MISSED_IMMUNE_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_IMMUNE_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_MISS: string;
 declare const ACTION_RANGE_MISSED_MISS_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_MISS_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_PARRY: string;
 declare const ACTION_RANGE_MISSED_PARRY_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_PARRY_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_POSSESSIVE: string;
 declare const ACTION_RANGE_MISSED_RESIST: string;
 declare const ACTION_RANGE_MISSED_RESIST_FULL_TEXT: string;
 declare const ACTION_RANGE_MISSED_RESIST_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_APPLIED: string;
 declare const ACTION_SPELL_AURA_APPLIED_BUFF: string;
 declare const ACTION_SPELL_AURA_APPLIED_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_APPLIED_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_APPLIED_BUFF_MASTER: string;
 declare const ACTION_SPELL_AURA_APPLIED_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DEBUFF: string;
 declare const ACTION_SPELL_AURA_APPLIED_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_APPLIED_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DEBUFF_MASTER: string;
 declare const ACTION_SPELL_AURA_APPLIED_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_BUFF: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_DEBUFF: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_APPLIED_DOSE_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_APPLIED_MASTER: string;
 declare const ACTION_SPELL_AURA_APPLIED_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_BROKEN: string;
 declare const ACTION_SPELL_AURA_BROKEN_BUFF: string;
 declare const ACTION_SPELL_AURA_BROKEN_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_BROKEN_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_BROKEN_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_BROKEN_DEBUFF: string;
 declare const ACTION_SPELL_AURA_BROKEN_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_BROKEN_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_BROKEN_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_BUFF: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_DEBUFF: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_BROKEN_SPELL_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REFRESH: string;
 declare const ACTION_SPELL_AURA_REFRESH_BUFF: string;
 declare const ACTION_SPELL_AURA_REFRESH_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REFRESH_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REFRESH_BUFF_MASTER: string;
 declare const ACTION_SPELL_AURA_REFRESH_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REFRESH_DEBUFF: string;
 declare const ACTION_SPELL_AURA_REFRESH_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REFRESH_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REFRESH_DEBUFF_MASTER: string;
 declare const ACTION_SPELL_AURA_REFRESH_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REFRESH_MASTER: string;
 declare const ACTION_SPELL_AURA_REMOVED: string;
 declare const ACTION_SPELL_AURA_REMOVED_BUFF: string;
 declare const ACTION_SPELL_AURA_REMOVED_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REMOVED_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REMOVED_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DEBUFF: string;
 declare const ACTION_SPELL_AURA_REMOVED_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REMOVED_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_BUFF: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_DEBUFF: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REMOVED_DOSE_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_AURA_REMOVED_FULL_TEXT: string;
 declare const ACTION_SPELL_AURA_REMOVED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_AURA_REMOVED_POSSESSIVE: string;
 declare const ACTION_SPELL_BUILDING_DAMAGE: string;
 declare const ACTION_SPELL_BUILDING_DAMAGE_FULL_TEXT: string;
 declare const ACTION_SPELL_BUILDING_DAMAGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_BUILDING_DAMAGE_MASTER: string;
 declare const ACTION_SPELL_BUILDING_DAMAGE_POSSESSIVE: string;
 declare const ACTION_SPELL_BUILDING_HEAL: string;
 declare const ACTION_SPELL_BUILDING_HEAL_FULL_TEXT: string;
 declare const ACTION_SPELL_BUILDING_HEAL_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_BUILDING_HEAL_POSSESSIVE: string;
 declare const ACTION_SPELL_CAST_FAILED: string;
 declare const ACTION_SPELL_CAST_FAILED_FULL_TEXT: string;
 declare const ACTION_SPELL_CAST_FAILED_MASTER: string;
 declare const ACTION_SPELL_CAST_FAILED_POSSESSIVE: string;
 declare const ACTION_SPELL_CAST_START: string;
 declare const ACTION_SPELL_CAST_START_FULL_TEXT: string;
 declare const ACTION_SPELL_CAST_START_FULL_TEXT_NO_DEST: string;
 declare const ACTION_SPELL_CAST_START_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_CAST_START_MASTER: string;
 declare const ACTION_SPELL_CAST_START_POSSESSIVE: string;
 declare const ACTION_SPELL_CAST_SUCCESS: string;
 declare const ACTION_SPELL_CAST_SUCCESS_FULL_TEXT: string;
 declare const ACTION_SPELL_CAST_SUCCESS_FULL_TEXT_NO_DEST: string;
 declare const ACTION_SPELL_CAST_SUCCESS_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_CAST_SUCCESS_MASTER: string;
 declare const ACTION_SPELL_CAST_SUCCESS_POSSESSIVE: string;
 declare const ACTION_SPELL_CREATE: string;
 declare const ACTION_SPELL_CREATE_FULL_TEXT: string;
 declare const ACTION_SPELL_CREATE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_CREATE_POSSESSIVE: string;
 declare const ACTION_SPELL_DAMAGE: string;
 declare const ACTION_SPELL_DAMAGE_FULL_TEXT: string;
 declare const ACTION_SPELL_DAMAGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_DAMAGE_MASTER: string;
 declare const ACTION_SPELL_DAMAGE_POSSESSIVE: string;
 declare const ACTION_SPELL_DISPEL: string;
 declare const ACTION_SPELL_DISPEL_BUFF: string;
 declare const ACTION_SPELL_DISPEL_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_DISPEL_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_DISPEL_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_DISPEL_DEBUFF: string;
 declare const ACTION_SPELL_DISPEL_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_DISPEL_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_DISPEL_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_DISPEL_FAILED: string;
 declare const ACTION_SPELL_DISPEL_FAILED_FULL_TEXT: string;
 declare const ACTION_SPELL_DISPEL_FAILED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_DISPEL_FAILED_POSSESSIVE: string;
 declare const ACTION_SPELL_DISPEL_POSSESSIVE: string;
 declare const ACTION_SPELL_DRAIN: string;
 declare const ACTION_SPELL_DRAIN_FULL_TEXT: string;
 declare const ACTION_SPELL_DRAIN_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_DRAIN_POSSESSIVE: string;
 declare const ACTION_SPELL_DURABILITY_DAMAGE: string;
 declare const ACTION_SPELL_DURABILITY_DAMAGE_ALL: string;
 declare const ACTION_SPELL_DURABILITY_DAMAGE_ALL_FULL_TEXT: string;
 declare const ACTION_SPELL_DURABILITY_DAMAGE_ALL_POSSESSIVE: string;
 declare const ACTION_SPELL_DURABILITY_DAMAGE_FULL_TEXT: string;
 declare const ACTION_SPELL_DURABILITY_DAMAGE_POSSESSIVE: string;
 declare const ACTION_SPELL_ENERGIZE: string;
 declare const ACTION_SPELL_ENERGIZE_FULL_TEXT: string;
 declare const ACTION_SPELL_ENERGIZE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_ENERGIZE_POSSESSIVE: string;
 declare const ACTION_SPELL_ENERGIZE_RESULT: string;
 declare const ACTION_SPELL_EXTRA_ATTACKS: string;
 declare const ACTION_SPELL_EXTRA_ATTACKS_FULL_TEXT: string;
 declare const ACTION_SPELL_EXTRA_ATTACKS_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_EXTRA_ATTACKS_POSSESSIVE: string;
 declare const ACTION_SPELL_HEAL: string;
 declare const ACTION_SPELL_HEAL_FULL_TEXT: string;
 declare const ACTION_SPELL_HEAL_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_HEAL_POSSESSIVE: string;
 declare const ACTION_SPELL_INSTAKILL: string;
 declare const ACTION_SPELL_INSTAKILL_FULL_TEXT: string;
 declare const ACTION_SPELL_INSTAKILL_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_INSTAKILL_POSSESSIVE: string;
 declare const ACTION_SPELL_INTERRUPT: string;
 declare const ACTION_SPELL_INTERRUPT_FULL_TEXT: string;
 declare const ACTION_SPELL_INTERRUPT_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_INTERRUPT_POSSESSIVE: string;
 declare const ACTION_SPELL_LEECH: string;
 declare const ACTION_SPELL_LEECH_FULL_TEXT: string;
 declare const ACTION_SPELL_LEECH_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_LEECH_POSSESSIVE: string;
 declare const ACTION_SPELL_LEECH_RESULT: string;
 declare const ACTION_SPELL_MISSED: string;
 declare const ACTION_SPELL_MISSED_ABSORB: string;
 declare const ACTION_SPELL_MISSED_ABSORB_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_ABSORB_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_ABSORB_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_BLOCK: string;
 declare const ACTION_SPELL_MISSED_BLOCK_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_BLOCK_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_BLOCK_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_DEFLECT: string;
 declare const ACTION_SPELL_MISSED_DEFLECT_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_DEFLECT_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_DEFLECT_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_DODGE: string;
 declare const ACTION_SPELL_MISSED_DODGE_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_DODGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_DODGE_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_EVADE: string;
 declare const ACTION_SPELL_MISSED_EVADE_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_EVADE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_EVADE_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_IMMUNE: string;
 declare const ACTION_SPELL_MISSED_IMMUNE_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_IMMUNE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_MISS: string;
 declare const ACTION_SPELL_MISSED_MISS_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_MISS_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_MISS_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_PARRY: string;
 declare const ACTION_SPELL_MISSED_PARRY_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_PARRY_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_PARRY_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_POSSESSIVE: string;
 declare const ACTION_SPELL_MISSED_REFLECT: string;
 declare const ACTION_SPELL_MISSED_REFLECT_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_REFLECT_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_RESIST: string;
 declare const ACTION_SPELL_MISSED_RESIST_FULL_TEXT: string;
 declare const ACTION_SPELL_MISSED_RESIST_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_MISSED_RESIST_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_DAMAGE: string;
 declare const ACTION_SPELL_PERIODIC_DAMAGE_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_DAMAGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_DAMAGE_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_DRAIN: string;
 declare const ACTION_SPELL_PERIODIC_DRAIN_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_DRAIN_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_DRAIN_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_ENERGIZE: string;
 declare const ACTION_SPELL_PERIODIC_ENERGIZE_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_ENERGIZE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_ENERGIZE_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_ENERGIZE_RESULT: string;
 declare const ACTION_SPELL_PERIODIC_HEAL: string;
 declare const ACTION_SPELL_PERIODIC_HEAL_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_HEAL_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_HEAL_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_LEECH: string;
 declare const ACTION_SPELL_PERIODIC_LEECH_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_LEECH_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_LEECH_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_LEECH_RESULT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_ABSORB: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_ABSORB_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_ABSORB_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_ABSORB_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_BLOCK: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_BLOCK_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_BLOCK_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_BLOCK_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DEFLECTED: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DEFLECTED_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DEFLECTED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DEFLECTED_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DODGE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DODGE_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DODGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_DODGE_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_EVADED: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_EVADED_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_EVADED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_EVADED_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_IMMUNE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_IMMUNE_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_IMMUNE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_IMMUNE_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_MISS: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_MISS_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_MISS_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_MISS_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_PARRY: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_PARRY_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_PARRY_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_PARRY_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_POSSESSIVE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_RESIST: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_RESIST_FULL_TEXT: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_RESIST_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_PERIODIC_MISSED_RESIST_POSSESSIVE: string;
 declare const ACTION_SPELL_RESURRECT: string;
 declare const ACTION_SPELL_RESURRECT_FULL_TEXT: string;
 declare const ACTION_SPELL_RESURRECT_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_RESURRECT_POSSESSIVE: string;
 declare const ACTION_SPELL_STOLEN: string;
 declare const ACTION_SPELL_STOLEN_BUFF: string;
 declare const ACTION_SPELL_STOLEN_BUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_STOLEN_BUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_STOLEN_BUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_STOLEN_BUFF__POSSESSIVE: string;
 declare const ACTION_SPELL_STOLEN_DEBUFF: string;
 declare const ACTION_SPELL_STOLEN_DEBUFF_FULL_TEXT: string;
 declare const ACTION_SPELL_STOLEN_DEBUFF_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_STOLEN_DEBUFF_POSSESSIVE: string;
 declare const ACTION_SPELL_STOLEN_FULL_TEXT: string;
 declare const ACTION_SPELL_STOLEN_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_STOLEN_POSSESSIVE: string;
 declare const ACTION_SPELL_SUMMON: string;
 declare const ACTION_SPELL_SUMMON_FULL_TEXT: string;
 declare const ACTION_SPELL_SUMMON_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SPELL_SUMMON_POSSESSIVE: string;
 declare const ACTION_SWING: string;
 declare const ACTION_SWING_DAMAGE: string;
 declare const ACTION_SWING_DAMAGE_FULL_TEXT: string;
 declare const ACTION_SWING_DAMAGE_FULL_TEXT_NO_SOURCE: string;
 declare const ACTION_SWING_DAMAGE_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED: string;
 declare const ACTION_SWING_MISSED_ABSORB: string;
 declare const ACTION_SWING_MISSED_ABSORB_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_ABSORB_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_BLOCK: string;
 declare const ACTION_SWING_MISSED_BLOCK_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_BLOCK_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_DEFLECT: string;
 declare const ACTION_SWING_MISSED_DEFLECT_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_DEFLECT_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_DODGE: string;
 declare const ACTION_SWING_MISSED_DODGE_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_DODGE_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_EVADE: string;
 declare const ACTION_SWING_MISSED_EVADE_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_EVADE_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_IMMUNE: string;
 declare const ACTION_SWING_MISSED_IMMUNE_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_IMMUNE_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_MISS: string;
 declare const ACTION_SWING_MISSED_MISS_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_MISS_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_PARRY: string;
 declare const ACTION_SWING_MISSED_PARRY_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_PARRY_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_POSSESSIVE: string;
 declare const ACTION_SWING_MISSED_RESIST: string;
 declare const ACTION_SWING_MISSED_RESIST_FULL_TEXT: string;
 declare const ACTION_SWING_MISSED_RESIST_POSSESSIVE: string;
 declare const ACTION_UNIT_DESTROYED: string;
 declare const ACTION_UNIT_DESTROYED_FULL_TEXT: string;
 declare const ACTION_UNIT_DESTROYED_POSSESSIVE: string;
 declare const ACTION_UNIT_DIED: string;
 declare const ACTION_UNIT_DIED_FULL_TEXT: string;
 declare const ACTION_UNIT_DIED_POSSESSIVE: string;
 declare const ACTION_UNIT_DISSIPATES: string;
 declare const ACTION_UNIT_DISSIPATES_FULL_TEXT: string;
 declare const ACTION_UNIT_DISSIPATES_POSSESSIVE: string;
 declare const ACTIVATE: string;
 declare const ADD: string;
 declare const ADDITIONAL_COMMENTS: string;
 declare const ADDITIONAL_FILTERS: string;
 declare const ADDMEMBER: string;
 declare const ADDMEMBER_TEAM: string;
 declare const ADDONS: string;
 declare const ADDON_ACTION_FORBIDDEN: string;
 declare const ADDON_BANNED: string;
 declare const ADDON_CORRUPT: string;
 declare const ADDON_DEMAND_LOADED: string;
 declare const ADDON_DEP_BANNED: string;
 declare const ADDON_DEP_CORRUPT: string;
 declare const ADDON_DEP_DEMAND_LOADED: string;
 declare const ADDON_DEP_DISABLED: string;
 declare const ADDON_DEP_INCOMPATIBLE: string;
 declare const ADDON_DEP_INSECURE: string;
 declare const ADDON_DEP_INTERFACE_VERSION: string;
 declare const ADDON_DEP_MISSING: string;
 declare const ADDON_DISABLED: string;
 declare const ADDON_INCOMPATIBLE: string;
 declare const ADDON_INSECURE: string;
 declare const ADDON_INTERFACE_VERSION: string;
 declare const ADDON_LOAD_FAILED: string;
 declare const ADDON_MEM_KB_ABBR: string;
 declare const ADDON_MEM_MB_ABBR: string;
 declare const ADDON_MISSING: string;
 declare const ADDON_UNKNOWN_ERROR: string;
 declare const ADD_ANOTHER: string;
 declare const ADD_CHANNEL: string;
 declare const ADD_CHAT_CHANNEL: string;
 declare const ADD_FILTER: string;
 declare const ADD_FRIEND: string;
 declare const ADD_FRIEND_LABEL: string;
 declare const ADD_GUILDMEMBER_LABEL: string;
 declare const ADD_GUILDRANK_LABEL: string;
 declare const ADD_IGNORE_LABEL: string;
 declare const ADD_MUTE_LABEL: string;
 declare const ADD_RAIDMEMBER_LABEL: string;
 declare const ADD_RAID_MEMBER: string;
 declare const ADD_TEAMMEMBER_LABEL: string;
 declare const ADVANCED_OBJECTIVES_TEXT: string;
 declare const ADVANCED_OPTIONS: string;
 declare const ADVANCED_OPTIONS_TOOLTIP: string;
 declare const ADVANCED_WATCHFRAME_OPTION_ENABLE_INTERRUPT: string;
 declare const ADVANCED_WORLD_MAP_TEXT: string;
 declare const AFK: string;
 declare const AGGRO_WARNING_DISPLAY: string;
 declare const AGGRO_WARNING_IN_INSTANCE: string;
 declare const AGGRO_WARNING_IN_PARTY: string;
 declare const AGI: string;
 declare const AGILITY_COLON: string;
 declare const AGILITY_TOOLTIP: string;
 declare const AIM_DOWN: string;
 declare const AIM_UP: string;
 declare const ALL: string;
 declare const ALLIED: string;
 declare const ALL_BOSSES_ALIVE: string;
 declare const ALL_INVENTORY_SLOTS: string;
 declare const ALL_SETTINGS: string;
 declare const ALL_SUBCLASSES: string;
 declare const ALREADY_BOUND: string;
 declare const ALREADY_LEARNED: string;
 declare const ALT_KEY: string;
 declare const ALWAYS: string;
 declare const ALWAYS_SHOW_MULTIBARS_TEXT: string;
 declare const AMBIENCE_VOLUME: string;
 declare const AMMOSLOT: string;
 declare const AMMO_DAMAGE_TEMPLATE: string;
 declare const AMMO_SCHOOL_DAMAGE_TEMPLATE: string;
 declare const AMOUNT_PAID_COLON: string;
 declare const AMOUNT_RECEIVED_COLON: string;
 declare const AMOUNT_TO_SEND: string;
 declare const ANIMATION: string;
 declare const ANISOTROPIC: string;
 declare const APPEARANCE_LABEL: string;
 declare const APPEARANCE_SUBTEXT: string;
 declare const APPLY: string;
 declare const AREA_SPIRIT_HEAL: string;
 declare const ARENA: string;
 declare const ARENA_BANNER_VENDOR_GREETING: string;
 declare const ARENA_BATTLES: string;
 declare const ARENA_CASUAL: string;
 declare const ARENA_CHARTER_PURCHASE: string;
 declare const ARENA_CHARTER_TEMPLATE: string;
 declare const ARENA_CHARTER_TURN_IN: string;
 declare const ARENA_COMPLETE_MESSAGE: string;
 declare const ARENA_MASTER_NO_SEASON_TEXT: string;
 declare const ARENA_MASTER_TEXT: string;
 declare const ARENA_OFF_SEASON_TEXT: string;
 declare const ARENA_PETITION_LEADER_INSTRUCTIONS: string;
 declare const ARENA_PETITION_MEMBER_INSTRUCTIONS: string;
 declare const ARENA_POINTS: string;
 declare const ARENA_PRACTICE_BATTLE: string;
 declare const ARENA_RATED: string;
 declare const ARENA_RATED_BATTLE: string;
 declare const ARENA_RATED_MATCH: string;
 declare const ARENA_REGISTRAR_PURCHASE_TEXT: string;
 declare const ARENA_SPECTATOR: string;
 declare const ARENA_TEAM: string;
 declare const ARENA_TEAM_2V2: string;
 declare const ARENA_TEAM_3V3: string;
 declare const ARENA_TEAM_5V5: string;
 declare const ARENA_TEAM_CAPTAIN: string;
 declare const ARENA_TEAM_INVITATION: string;
 declare const ARENA_TEAM_LEAD_IN: string;
 declare const ARENA_TEAM_RATING: string;
 declare const ARENA_THIS_SEASON: string;
 declare const ARENA_THIS_SEASON_TOGGLE: string;
 declare const ARENA_THIS_WEEK: string;
 declare const ARENA_THIS_WEEK_TOGGLE: string;
 declare const ARMOR: string;
 declare const ARMOR_TEMPLATE: string;
 declare const ARMOR_TOOLTIP: string;
 declare const ASSEMBLING_GROUP: string;
 declare const ASSIGNED_COLON: string;
 declare const ASSIST_ATTACK: string;
 declare const ATTACHMENT_TEXT: string;
 declare const ATTACK: string;
 declare const ATTACK_COLON: string;
 declare const ATTACK_POWER: string;
 declare const ATTACK_POWER_TOOLTIP: string;
 declare const ATTACK_SPEED: string;
 declare const ATTACK_SPEED_SECONDS: string;
 declare const ATTACK_SPEED_TOOLTIP1: string;
 declare const ATTACK_TOOLTIP: string;
 declare const ATTACK_TOOLTIP_SUBTEXT: string;
 declare const AT_WAR: string;
 declare const AUCTIONS: string;
 declare const AUCTION_BUYOUT_ERROR: string;
 declare const AUCTION_CREATING: string;
 declare const AUCTION_CREATOR: string;
 declare const AUCTION_DURATION: string;
 declare const AUCTION_DURATION_ERROR: string;
 declare const AUCTION_DURATION_ONE: string;
 declare const AUCTION_DURATION_THREE: string;
 declare const AUCTION_DURATION_TWO: string;
 declare const AUCTION_EXPIRED_MAIL_SUBJECT: string;
 declare const AUCTION_HOUSE_CUT_COLON: string;
 declare const AUCTION_INVOICE_FUNDS_DELAY: string;
 declare const AUCTION_INVOICE_FUNDS_NOT_YET_SENT: string;
 declare const AUCTION_INVOICE_MAIL_SUBJECT: string;
 declare const AUCTION_INVOICE_PENDING_FUNDS_COLON: string;
 declare const AUCTION_ITEM: string;
 declare const AUCTION_ITEM_INCOMING_AMOUNT: string;
 declare const AUCTION_ITEM_SOLD: string;
 declare const AUCTION_ITEM_TEXT: string;
 declare const AUCTION_ITEM_TIME_UNTIL_DELIVERY: string;
 declare const AUCTION_NUM_STACKS: string;
 declare const AUCTION_OUTBID_MAIL_SUBJECT: string;
 declare const AUCTION_PRICE: string;
 declare const AUCTION_PRICE_PER_ITEM: string;
 declare const AUCTION_PRICE_PER_STACK: string;
 declare const AUCTION_REMOVED_MAIL_SUBJECT: string;
 declare const AUCTION_SOLD_MAIL_SUBJECT: string;
 declare const AUCTION_STACK_SIZE: string;
 declare const AUCTION_TIME_LEFT1: string;
 declare const AUCTION_TIME_LEFT1_DETAIL: string;
 declare const AUCTION_TIME_LEFT2: string;
 declare const AUCTION_TIME_LEFT2_DETAIL: string;
 declare const AUCTION_TIME_LEFT3: string;
 declare const AUCTION_TIME_LEFT3_DETAIL: string;
 declare const AUCTION_TIME_LEFT4: string;
 declare const AUCTION_TIME_LEFT4_DETAIL: string;
 declare const AUCTION_TITLE: string;
 declare const AUCTION_TOOLTIP_BID_PREFIX: string;
 declare const AUCTION_TOOLTIP_BUYOUT_PREFIX: string;
 declare const AUCTION_WON_MAIL_SUBJECT: string;
 declare const AURAS: string;
 declare const AURAS_COMBATLOG_TOOLTIP: string;
 declare const AURA_END: string;
 declare const AUTOFOLLOWSTART: string;
 declare const AUTOFOLLOWSTOP: string;
 declare const AUTOFOLLOWSTOPCOMBAT: string;
 declare const AUTO_ADD_DISABLED_GROUPED_TOOLTIP: string;
 declare const AUTO_ADD_DISABLED_QUEUED_TOOLTIP: string;
 declare const AUTO_ADD_MEMBERS: string;
 declare const AUTO_ADD_TOOLTIP: string;
 declare const AUTO_DISMOUNT_FLYING_TEXT: string;
 declare const AUTO_FOLLOW_SPEED: string;
 declare const AUTO_JOIN: string;
 declare const AUTO_JOIN_DISABLED_TOOLTIP: string;
 declare const AUTO_JOIN_GUILD_CHANNEL: string;
 declare const AUTO_JOIN_TOOLTIP: string;
 declare const AUTO_JOIN_VOICE: string;
 declare const AUTO_LOOT_DEFAULT_TEXT: string;
 declare const AUTO_LOOT_KEY_TEXT: string;
 declare const AUTO_QUEST_PROGRESS_TEXT: string;
 declare const AUTO_QUEST_WATCH_TEXT: string;
 declare const AUTO_RANGED_COMBAT_TEXT: string;
 declare const AUTO_SELF_CAST_KEY_TEXT: string;
 declare const AUTO_SELF_CAST_TEXT: string;
 declare const AVAILABLE: string;
 declare const AVAILABLE_QUESTS: string;
 declare const AVAILABLE_SERVICES: string;
 declare const AVERAGE_WAIT_TIME: string;
 declare const A_RANDOM_DUNGEON: string;
 declare const BACK: string;
 declare const BACKGROUND: string;
 declare const BACKPACK_TOOLTIP: string;
 declare const BACKSLOT: string;
 declare const BAGSLOT: string;
 declare const BAGSLOTTEXT: string;
 declare const BAGS_ONLY: string;
 declare const BANKSLOTPURCHASE: string;
 declare const BANKSLOTPURCHASE_LABEL: string;
 declare const BANK_BAG: string;
 declare const BANK_BAG_PURCHASE: string;
 declare const BARBERSHOP: string;
 declare const BASIC_OPTIONS_TOOLTIP: string;
 declare const BATTLEFIELDMINIMAP_OPACITY_LABEL: string;
 declare const BATTLEFIELDMINIMAP_OPTIONS_LABEL: string;
 declare const BATTLEFIELDS: string;
 declare const BATTLEFIELD_ALERT: string;
 declare const BATTLEFIELD_CONFIRM_STATUS: string;
 declare const BATTLEFIELD_FULL: string;
 declare const BATTLEFIELD_GROUP_JOIN: string;
 declare const BATTLEFIELD_IN_BATTLEFIELD: string;
 declare const BATTLEFIELD_IN_QUEUE: string;
 declare const BATTLEFIELD_IN_QUEUE_SIMPLE: string;
 declare const BATTLEFIELD_JOIN: string;
 declare const BATTLEFIELD_LEVEL: string;
 declare const BATTLEFIELD_MINIMAP: string;
 declare const BATTLEFIELD_MINIMAP_SHOW_ALWAYS: string;
 declare const BATTLEFIELD_MINIMAP_SHOW_BATTLEGROUNDS: string;
 declare const BATTLEFIELD_MINIMAP_SHOW_NEVER: string;
 declare const BATTLEFIELD_NAME: string;
 declare const BATTLEFIELD_QUEUE_CONFIRM: string;
 declare const BATTLEFIELD_QUEUE_CONFIRM_SIMPLE: string;
 declare const BATTLEFIELD_QUEUE_PENDING_REMOVAL: string;
 declare const BATTLEFIELD_QUEUE_STATUS: string;
 declare const BATTLEGROUND: string;
 declare const BATTLEGROUNDS: string;
 declare const BATTLEGROUND_COMPLETE_MESSAGE: string;
 declare const BATTLEGROUND_HOLIDAY: string;
 declare const BATTLEGROUND_HOLIDAY_EXPLANATION: string;
 declare const BATTLEGROUND_INSTANCE: string;
 declare const BATTLEGROUND_INSTANCE_TOOLTIP: string;
 declare const BATTLEGROUND_LEADER: string;
 declare const BATTLEGROUND_MESSAGE: string;
 declare const BATTLEGROUND_REQUIRED_LEVEL_TOOLTIP: string;
 declare const BATTLEGROUND_SILENCE: string;
 declare const BATTLEGROUND_UNSILENCE: string;
 declare const BATTLENET_FRIEND: string;
 declare const BATTLENET_FRIEND_INFO: string;
 declare const BATTLENET_FRIEND_LABEL: string;
 declare const BATTLENET_NAME_FORMAT: string;
 declare const BATTLENET_OPTIONS_LABEL: string;
 declare const BATTLENET_OPTIONS_SUBTEXT: string;
 declare const BATTLENET_UNAVAILABLE: string;
 declare const BATTLENET_UNAVAILABLE_ALERT: string;
 declare const BENCHMARK_TAXI_AVERAGE_FPS: string;
 declare const BENCHMARK_TAXI_MAX_FPS: string;
 declare const BENCHMARK_TAXI_MIN_FPS: string;
 declare const BENCHMARK_TAXI_MODE_OFF: string;
 declare const BENCHMARK_TAXI_MODE_ON: string;
 declare const BENCHMARK_TAXI_RESULTS: string;
 declare const BENCHMARK_TAXI_TOTAL_TIME: string;
 declare const BENEFICIAL: string;
 declare const BENEFICIAL_AURA_COMBATLOG_TOOLTIP: string;
 declare const BF_NOT_IN: string;
 declare const BG_SYSTEM_ALLIANCE: string;
 declare const BG_SYSTEM_HORDE: string;
 declare const BG_SYSTEM_NEUTRAL: string;
 declare const BID: string;
 declare const BIDS: string;
 declare const BID_AUCTION_CONFIRMATION: string;
 declare const BID_STATUS: string;
 declare const BILLING_NAG_DIALOG: string;
 declare const BILLING_NAG_WARNING: string;
 declare const BINDING_HEADER_ACTIONBAR: string;
 declare const BINDING_HEADER_BLANK: string;
 declare const BINDING_HEADER_CAMERA: string;
 declare const BINDING_HEADER_CHAT: string;
 declare const BINDING_HEADER_INTERFACE: string;
 declare const BINDING_HEADER_ITUNES_REMOTE: string;
 declare const BINDING_HEADER_MISC: string;
 declare const BINDING_HEADER_MOVEMENT: string;
 declare const BINDING_HEADER_MOVIE_RECORDING_SECTION: string;
 declare const BINDING_HEADER_MULTIACTIONBAR: string;
 declare const BINDING_HEADER_MULTICASTFUNCTIONS: string;
 declare const BINDING_HEADER_RAID_TARGET: string;
 declare const BINDING_HEADER_TARGETING: string;
 declare const BINDING_HEADER_VEHICLE: string;
 declare const BINDING_HEADER_VOICE_CHAT: string;
 declare const BINDING_NAME_ACTIONBUTTON1: string;
 declare const BINDING_NAME_ACTIONBUTTON10: string;
 declare const BINDING_NAME_ACTIONBUTTON11: string;
 declare const BINDING_NAME_ACTIONBUTTON12: string;
 declare const BINDING_NAME_ACTIONBUTTON2: string;
 declare const BINDING_NAME_ACTIONBUTTON3: string;
 declare const BINDING_NAME_ACTIONBUTTON4: string;
 declare const BINDING_NAME_ACTIONBUTTON5: string;
 declare const BINDING_NAME_ACTIONBUTTON6: string;
 declare const BINDING_NAME_ACTIONBUTTON7: string;
 declare const BINDING_NAME_ACTIONBUTTON8: string;
 declare const BINDING_NAME_ACTIONBUTTON9: string;
 declare const BINDING_NAME_ACTIONPAGE1: string;
 declare const BINDING_NAME_ACTIONPAGE2: string;
 declare const BINDING_NAME_ACTIONPAGE3: string;
 declare const BINDING_NAME_ACTIONPAGE4: string;
 declare const BINDING_NAME_ACTIONPAGE5: string;
 declare const BINDING_NAME_ACTIONPAGE6: string;
 declare const BINDING_NAME_ACTIONWINDOW1: string;
 declare const BINDING_NAME_ACTIONWINDOW2: string;
 declare const BINDING_NAME_ACTIONWINDOW3: string;
 declare const BINDING_NAME_ACTIONWINDOW4: string;
 declare const BINDING_NAME_ACTIONWINDOWDECREMENT: string;
 declare const BINDING_NAME_ACTIONWINDOWINCREMENT: string;
 declare const BINDING_NAME_ACTIONWINDOWMOVE: string;
 declare const BINDING_NAME_ALLNAMEPLATES: string;
 declare const BINDING_NAME_ASSISTTARGET: string;
 declare const BINDING_NAME_ATTACKTARGET: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON1: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON10: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON2: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON3: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON4: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON5: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON6: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON7: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON8: string;
 declare const BINDING_NAME_BONUSACTIONBUTTON9: string;
 declare const BINDING_NAME_CAMERAZOOMIN: string;
 declare const BINDING_NAME_CAMERAZOOMOUT: string;
 declare const BINDING_NAME_CHATBOTTOM: string;
 declare const BINDING_NAME_CHATPAGEDOWN: string;
 declare const BINDING_NAME_CHATPAGEUP: string;
 declare const BINDING_NAME_COMBATLOGBOTTOM: string;
 declare const BINDING_NAME_COMBATLOGPAGEDOWN: string;
 declare const BINDING_NAME_COMBATLOGPAGEUP: string;
 declare const BINDING_NAME_DISMOUNT: string;
 declare const BINDING_NAME_FLIPCAMERAYAW: string;
 declare const BINDING_NAME_FOCUSTARGET: string;
 declare const BINDING_NAME_FOLLOWTARGET: string;
 declare const BINDING_NAME_FRIENDNAMEPLATES: string;
 declare const BINDING_NAME_INTERACTMOUSEOVER: string;
 declare const BINDING_NAME_INTERACTTARGET: string;
 declare const BINDING_NAME_INVERTBINDINGMODE1: string;
 declare const BINDING_NAME_INVERTBINDINGMODE2: string;
 declare const BINDING_NAME_INVERTBINDINGMODE3: string;
 declare const BINDING_NAME_ITUNES_BACKTRACK: string;
 declare const BINDING_NAME_ITUNES_NEXTTRACK: string;
 declare const BINDING_NAME_ITUNES_PLAYPAUSE: string;
 declare const BINDING_NAME_ITUNES_VOLUMEDOWN: string;
 declare const BINDING_NAME_ITUNES_VOLUMEUP: string;
 declare const BINDING_NAME_JUMP: string;
 declare const BINDING_NAME_MASTERVOLUMEDOWN: string;
 declare const BINDING_NAME_MASTERVOLUMEUP: string;
 declare const BINDING_NAME_MINIMAPZOOMIN: string;
 declare const BINDING_NAME_MINIMAPZOOMOUT: string;
 declare const BINDING_NAME_MOVEANDSTEER: string;
 declare const BINDING_NAME_MOVEBACKWARD: string;
 declare const BINDING_NAME_MOVEFORWARD: string;
 declare const BINDING_NAME_MOVEVIEWIN: string;
 declare const BINDING_NAME_MOVEVIEWOUT: string;
 declare const BINDING_NAME_MOVIE_RECORDING_CANCEL: string;
 declare const BINDING_NAME_MOVIE_RECORDING_COMPRESS: string;
 declare const BINDING_NAME_MOVIE_RECORDING_GUI: string;
 declare const BINDING_NAME_MOVIE_RECORDING_STARTSTOP: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON1: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON10: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON11: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON12: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON2: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON3: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON4: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON5: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON6: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON7: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON8: string;
 declare const BINDING_NAME_MULTIACTIONBAR1BUTTON9: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON1: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON10: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON11: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON12: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON2: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON3: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON4: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON5: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON6: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON7: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON8: string;
 declare const BINDING_NAME_MULTIACTIONBAR2BUTTON9: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON1: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON10: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON11: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON12: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON2: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON3: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON4: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON5: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON6: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON7: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON8: string;
 declare const BINDING_NAME_MULTIACTIONBAR3BUTTON9: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON1: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON10: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON11: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON12: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON2: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON3: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON4: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON5: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON6: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON7: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON8: string;
 declare const BINDING_NAME_MULTIACTIONBAR4BUTTON9: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON1: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON10: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON11: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON12: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON2: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON3: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON4: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON5: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON6: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON7: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON8: string;
 declare const BINDING_NAME_MULTICASTACTIONBUTTON9: string;
 declare const BINDING_NAME_MULTICASTRECALLBUTTON1: string;
 declare const BINDING_NAME_MULTICASTSUMMONBUTTON1: string;
 declare const BINDING_NAME_MULTICASTSUMMONBUTTON2: string;
 declare const BINDING_NAME_MULTICASTSUMMONBUTTON3: string;
 declare const BINDING_NAME_NAMEPLATES: string;
 declare const BINDING_NAME_NEXTACTIONPAGE: string;
 declare const BINDING_NAME_NEXTVIEW: string;
 declare const BINDING_NAME_OPENALLBAGS: string;
 declare const BINDING_NAME_OPENCHAT: string;
 declare const BINDING_NAME_OPENCHATSLASH: string;
 declare const BINDING_NAME_PETATTACK: string;
 declare const BINDING_NAME_PITCHDECREMENT: string;
 declare const BINDING_NAME_PITCHDOWN: string;
 declare const BINDING_NAME_PITCHINCREMENT: string;
 declare const BINDING_NAME_PITCHUP: string;
 declare const BINDING_NAME_PREVIOUSACTIONPAGE: string;
 declare const BINDING_NAME_PREVVIEW: string;
 declare const BINDING_NAME_PUSHTOTALK: string;
 declare const BINDING_NAME_RAIDTARGET1: string;
 declare const BINDING_NAME_RAIDTARGET2: string;
 declare const BINDING_NAME_RAIDTARGET3: string;
 declare const BINDING_NAME_RAIDTARGET4: string;
 declare const BINDING_NAME_RAIDTARGET5: string;
 declare const BINDING_NAME_RAIDTARGET6: string;
 declare const BINDING_NAME_RAIDTARGET7: string;
 declare const BINDING_NAME_RAIDTARGET8: string;
 declare const BINDING_NAME_RAIDTARGETNONE: string;
 declare const BINDING_NAME_REPLY: string;
 declare const BINDING_NAME_REPLY2: string;
 declare const BINDING_NAME_RESETVIEW1: string;
 declare const BINDING_NAME_RESETVIEW2: string;
 declare const BINDING_NAME_RESETVIEW3: string;
 declare const BINDING_NAME_RESETVIEW4: string;
 declare const BINDING_NAME_RESETVIEW5: string;
 declare const BINDING_NAME_SAVEVIEW1: string;
 declare const BINDING_NAME_SAVEVIEW2: string;
 declare const BINDING_NAME_SAVEVIEW3: string;
 declare const BINDING_NAME_SAVEVIEW4: string;
 declare const BINDING_NAME_SAVEVIEW5: string;
 declare const BINDING_NAME_SCREENSHOT: string;
 declare const BINDING_NAME_SETVIEW1: string;
 declare const BINDING_NAME_SETVIEW2: string;
 declare const BINDING_NAME_SETVIEW3: string;
 declare const BINDING_NAME_SETVIEW4: string;
 declare const BINDING_NAME_SETVIEW5: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON1: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON10: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON2: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON3: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON4: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON5: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON6: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON7: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON8: string;
 declare const BINDING_NAME_SHAPESHIFTBUTTON9: string;
 declare const BINDING_NAME_SITORSTAND: string;
 declare const BINDING_NAME_STARTATTACK: string;
 declare const BINDING_NAME_STOPATTACK: string;
 declare const BINDING_NAME_STOPCASTING: string;
 declare const BINDING_NAME_STRAFELEFT: string;
 declare const BINDING_NAME_STRAFERIGHT: string;
 declare const BINDING_NAME_SWINGCAMERA: string;
 declare const BINDING_NAME_SWINGCAMERAANDPLAYER: string;
 declare const BINDING_NAME_TARGETENEMYDIRECTIONAL: string;
 declare const BINDING_NAME_TARGETFOCUS: string;
 declare const BINDING_NAME_TARGETFRIENDDIRECTIONAL: string;
 declare const BINDING_NAME_TARGETLASTHOSTILE: string;
 declare const BINDING_NAME_TARGETLASTTARGET: string;
 declare const BINDING_NAME_TARGETMOUSEOVER: string;
 declare const BINDING_NAME_TARGETNEARESTENEMY: string;
 declare const BINDING_NAME_TARGETNEARESTENEMYPLAYER: string;
 declare const BINDING_NAME_TARGETNEARESTFRIEND: string;
 declare const BINDING_NAME_TARGETNEARESTFRIENDPLAYER: string;
 declare const BINDING_NAME_TARGETPARTYMEMBER1: string;
 declare const BINDING_NAME_TARGETPARTYMEMBER2: string;
 declare const BINDING_NAME_TARGETPARTYMEMBER3: string;
 declare const BINDING_NAME_TARGETPARTYMEMBER4: string;
 declare const BINDING_NAME_TARGETPARTYPET1: string;
 declare const BINDING_NAME_TARGETPARTYPET2: string;
 declare const BINDING_NAME_TARGETPARTYPET3: string;
 declare const BINDING_NAME_TARGETPARTYPET4: string;
 declare const BINDING_NAME_TARGETPET: string;
 declare const BINDING_NAME_TARGETPREVIOUSENEMY: string;
 declare const BINDING_NAME_TARGETPREVIOUSENEMYPLAYER: string;
 declare const BINDING_NAME_TARGETPREVIOUSFRIEND: string;
 declare const BINDING_NAME_TARGETPREVIOUSFRIENDPLAYER: string;
 declare const BINDING_NAME_TARGETSELF: string;
 declare const BINDING_NAME_TARGETTALKER: string;
 declare const BINDING_NAME_TOGGLEABILITYBOOK: string;
 declare const BINDING_NAME_TOGGLEACHIEVEMENT: string;
 declare const BINDING_NAME_TOGGLEACTIONBARLOCK: string;
 declare const BINDING_NAME_TOGGLEAUTORUN: string;
 declare const BINDING_NAME_TOGGLEAUTOSELFCAST: string;
 declare const BINDING_NAME_TOGGLEBACKPACK: string;
 declare const BINDING_NAME_TOGGLEBAG1: string;
 declare const BINDING_NAME_TOGGLEBAG2: string;
 declare const BINDING_NAME_TOGGLEBAG3: string;
 declare const BINDING_NAME_TOGGLEBAG4: string;
 declare const BINDING_NAME_TOGGLEBAG5: string;
 declare const BINDING_NAME_TOGGLEBATTLEFIELDMINIMAP: string;
 declare const BINDING_NAME_TOGGLEBINDINGMODE1: string;
 declare const BINDING_NAME_TOGGLEBINDINGMODE2: string;
 declare const BINDING_NAME_TOGGLEBINDINGMODE3: string;
 declare const BINDING_NAME_TOGGLECHANNELPULLOUT: string;
 declare const BINDING_NAME_TOGGLECHANNELTAB: string;
 declare const BINDING_NAME_TOGGLECHARACTER0: string;
 declare const BINDING_NAME_TOGGLECHARACTER1: string;
 declare const BINDING_NAME_TOGGLECHARACTER2: string;
 declare const BINDING_NAME_TOGGLECHARACTER3: string;
 declare const BINDING_NAME_TOGGLECHARACTER4: string;
 declare const BINDING_NAME_TOGGLECHATTAB: string;
 declare const BINDING_NAME_TOGGLECOMBATLOG: string;
 declare const BINDING_NAME_TOGGLECURRENCY: string;
 declare const BINDING_NAME_TOGGLEFPS: string;
 declare const BINDING_NAME_TOGGLEFRIENDSTAB: string;
 declare const BINDING_NAME_TOGGLEGAMEMENU: string;
 declare const BINDING_NAME_TOGGLEGUILDTAB: string;
 declare const BINDING_NAME_TOGGLEIGNORETAB: string;
 declare const BINDING_NAME_TOGGLEINSCRIPTION: string;
 declare const BINDING_NAME_TOGGLEKEYRING: string;
 declare const BINDING_NAME_TOGGLELFGPARENT: string;
 declare const BINDING_NAME_TOGGLELFRPARENT: string;
 declare const BINDING_NAME_TOGGLEMINIMAP: string;
 declare const BINDING_NAME_TOGGLEMINIMAPROTATION: string;
 declare const BINDING_NAME_TOGGLEMOUSE: string;
 declare const BINDING_NAME_TOGGLEMUSIC: string;
 declare const BINDING_NAME_TOGGLEPETBOOK: string;
 declare const BINDING_NAME_TOGGLEPVP: string;
 declare const BINDING_NAME_TOGGLEQUESTLOG: string;
 declare const BINDING_NAME_TOGGLERAIDTAB: string;
 declare const BINDING_NAME_TOGGLERUN: string;
 declare const BINDING_NAME_TOGGLESELFMUTE: string;
 declare const BINDING_NAME_TOGGLESHEATH: string;
 declare const BINDING_NAME_TOGGLESOCIAL: string;
 declare const BINDING_NAME_TOGGLESOUND: string;
 declare const BINDING_NAME_TOGGLESPELLBOOK: string;
 declare const BINDING_NAME_TOGGLESTATISTICS: string;
 declare const BINDING_NAME_TOGGLETALENTS: string;
 declare const BINDING_NAME_TOGGLEUI: string;
 declare const BINDING_NAME_TOGGLEWHOTAB: string;
 declare const BINDING_NAME_TOGGLEWORLDMAP: string;
 declare const BINDING_NAME_TOGGLEWORLDMAPSIZE: string;
 declare const BINDING_NAME_TOGGLEWORLDSTATESCORES: string;
 declare const BINDING_NAME_TURNLEFT: string;
 declare const BINDING_NAME_TURNRIGHT: string;
 declare const BINDING_NAME_VEHICLEAIMDECREMENT: string;
 declare const BINDING_NAME_VEHICLEAIMDOWN: string;
 declare const BINDING_NAME_VEHICLEAIMINCREMENT: string;
 declare const BINDING_NAME_VEHICLEAIMUP: string;
 declare const BINDING_NAME_VEHICLECAMERAZOOMIN: string;
 declare const BINDING_NAME_VEHICLECAMERAZOOMOUT: string;
 declare const BINDING_NAME_VEHICLEEXIT: string;
 declare const BINDING_NAME_VEHICLENEXTSEAT: string;
 declare const BINDING_NAME_VEHICLEPREVSEAT: string;
 declare const BIND_ENCHANT: string;
 declare const BIND_KEY_TO_COMMAND: string;
 declare const BIND_TRADE_TIME_REMAINING: string;
 declare const BIND_ZONE_DISPLAY: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_BOTH: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_EVERYTHING: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_INCOMING: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_OUTGOING: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_OUTGOING_ME: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_RESET: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_REVERT: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_SAVE: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_SPELL_HIDE: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_SPELL_LINK: string;
 declare const BLIZZARD_COMBAT_LOG_MENU_SPELL_TYPE_HEADER: string;
 declare const BLOCK: string;
 declare const BLOCKED_COMMUNICATION: string;
 declare const BLOCKED_INVITES: string;
 declare const BLOCK_CHANCE: string;
 declare const BLOCK_COMMUNICATION: string;
 declare const BLOCK_INVITES: string;
 declare const BLOCK_INVITES_CONFIRMATION: string;
 declare const BLOCK_INVITES_TOOLTIP: string;
 declare const BLOCK_TRADES: string;
 declare const BLOCK_TRAILER: string;
 declare const BLUE_GEM: string;
 declare const BNET_BROADCAST_SENT_TIME: string;
 declare const BNET_INVITE_SENT_TIME: string;
 declare const BNET_LAST_ONLINE_TIME: string;
 declare const BNET_REPORT: string;
 declare const BNET_REPORT_ABUSE: string;
 declare const BNET_REPORT_ABUSE_BUTTON: string;
 declare const BNET_REPORT_ABUSE_LABEL: string;
 declare const BNET_REPORT_ABUSE_PROMPT: string;
 declare const BNET_REPORT_CONFIRM_ABUSE: string;
 declare const BNET_REPORT_CONFIRM_NAME: string;
 declare const BNET_REPORT_CONFIRM_SPAM: string;
 declare const BNET_REPORT_NAME: string;
 declare const BNET_REPORT_PLAYER: string;
 declare const BNET_REPORT_PLAYER_TOOLTIP: string;
 declare const BNET_REPORT_SENT: string;
 declare const BNET_REPORT_SPAM: string;
 declare const BN_BROADCAST_TOOLTIP: string;
 declare const BN_CONVERSATION: string;
 declare const BN_INLINE_TOAST_ALERT: string;
 declare const BN_INLINE_TOAST_BROADCAST: string;
 declare const BN_INLINE_TOAST_BROADCAST_INFORM: string;
 declare const BN_INLINE_TOAST_CONVERSATION: string;
 declare const BN_INLINE_TOAST_FRIEND_ADDED: string;
 declare const BN_INLINE_TOAST_FRIEND_OFFLINE: string;
 declare const BN_INLINE_TOAST_FRIEND_ONLINE: string;
 declare const BN_INLINE_TOAST_FRIEND_PENDING: string;
 declare const BN_INLINE_TOAST_FRIEND_REMOVED: string;
 declare const BN_INLINE_TOAST_FRIEND_REQUEST: string;
 declare const BN_TOAST_CONVERSATION: string;
 declare const BN_TOAST_NEW_INVITE: string;
 declare const BN_TOAST_OFFLINE: string;
 declare const BN_TOAST_ONLINE: string;
 declare const BN_TOAST_PENDING_INVITES: string;
 declare const BN_UNABLE_TO_RESOLVE_NAME: string;
 declare const BN_WHISPER: string;
 declare const BONUS_ARENA_POINTS: string;
 declare const BONUS_DAMAGE: string;
 declare const BONUS_DAMAGE_ABBR: string;
 declare const BONUS_HEALING: string;
 declare const BONUS_HEALING_ABBR: string;
 declare const BONUS_HEALING_TOOLTIP: string;
 declare const BONUS_HONOR: string;
 declare const BONUS_TALENTS: string;
 declare const BOSS: string;
 declare const BOSSES: string;
 declare const BOSSES_KILLED: string;
 declare const BOSS_ALIVE: string;
 declare const BOSS_DEAD: string;
 declare const BREATH_LABEL: string;
 declare const BROWSE: string;
 declare const BROWSE_AUCTIONS: string;
 declare const BROWSE_NO_RESULTS: string;
 declare const BROWSE_SEARCH_TEXT: string;
 declare const BROWSING: string;
 declare const BUFFERING: string;
 declare const BUFFER_DOUBLE: string;
 declare const BUFFOPTIONS_LABEL: string;
 declare const BUFFOPTIONS_SUBTEXT: string;
 declare const BUG_BUTTON: string;
 declare const BUG_CATEGORY1: string;
 declare const BUG_CATEGORY2: string;
 declare const BUG_CATEGORY3: string;
 declare const BUG_CATEGORY4: string;
 declare const BUG_CATEGORY5: string;
 declare const BUG_CATEGORY6: string;
 declare const BUG_CATEGORY7: string;
 declare const BUG_CATEGORY8: string;
 declare const BUG_CATEGORY9: string;
 declare const BUG_CATEGORY10: string;
 declare const BUG_CATEGORY11: string;
 declare const BUG_CATEGORY12: string;
 declare const BUG_CATEGORY13: string;
 declare const BUG_CATEGORY14: string;
 declare const BUG_CATEGORY15: string;
 declare const BUG_CATEGORY_CHOOSE: string;
 declare const BUG_CATEGORY_ERROR: string;
 declare const BUG_SUBMITTED: string;
 declare const BUG_SUBMIT_FAILED: string;
 declare const BUILDING_DAMAGE: string;
 declare const BUILDING_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const BUILDING_HEAL: string;
 declare const BUILDING_HEAL_COMBATLOG_TOOLTIP: string;
 declare const BUTTON_LAG_AUCTIONHOUSE: string;
 declare const BUTTON_LAG_AUCTIONHOUSE_NEWBIE: string;
 declare const BUTTON_LAG_AUCTIONHOUSE_TOOLTIP: string;
 declare const BUTTON_LAG_CHAT: string;
 declare const BUTTON_LAG_CHAT_NEWBIE: string;
 declare const BUTTON_LAG_CHAT_TOOLTIP: string;
 declare const BUTTON_LAG_LOOT: string;
 declare const BUTTON_LAG_LOOT_NEWBIE: string;
 declare const BUTTON_LAG_LOOT_TOOLTIP: string;
 declare const BUTTON_LAG_MAIL: string;
 declare const BUTTON_LAG_MAIL_NEWBIE: string;
 declare const BUTTON_LAG_MAIL_TOOLTIP: string;
 declare const BUTTON_LAG_MOVEMENT: string;
 declare const BUTTON_LAG_MOVEMENT_NEWBIE: string;
 declare const BUTTON_LAG_MOVEMENT_TOOLTIP: string;
 declare const BUTTON_LAG_SPELL: string;
 declare const BUTTON_LAG_SPELL_NEWBIE: string;
 declare const BUTTON_LAG_SPELL_TOOLTIP: string;
 declare const BUYBACK: string;
 declare const BUYBACK_THIS_ITEM: string;
 declare const BUYOUT: string;
 declare const BUYOUT_AUCTION_CONFIRMATION: string;
 declare const BUYOUT_COST: string;
 declare const BUYOUT_PRICE: string;
 declare const BUY_GUILDBANK_TAB: string;
 declare const BY_SOURCE: string;
 declare const BY_SOURCE_COMBATLOG_TOOLTIP: string;
 declare const BY_TARGET: string;
 declare const BY_TARGET_COMBATLOG_TOOLTIP: string;
 declare const CALENDAR_ACCEPT_INVITATION: string;
 declare const CALENDAR_ANNOUNCEMENT_CREATEDBY_PLAYER: string;
 declare const CALENDAR_ANNOUNCEMENT_CREATEDBY_YOURSELF: string;
 declare const CALENDAR_AUTO_APPROVE: string;
 declare const CALENDAR_COPY_EVENT: string;
 declare const CALENDAR_CREATE: string;
 declare const CALENDAR_CREATE_ANNOUNCEMENT: string;
 declare const CALENDAR_CREATE_ARENATEAM_EVENT: string;
 declare const CALENDAR_CREATE_EVENT: string;
 declare const CALENDAR_CREATE_GUILD_ANNOUNCEMENT: string;
 declare const CALENDAR_CREATE_GUILD_EVENT: string;
 declare const CALENDAR_DECLINE_INVITATION: string;
 declare const CALENDAR_DELETE_ANNOUNCEMENT_CONFIRM: string;
 declare const CALENDAR_DELETE_EVENT: string;
 declare const CALENDAR_DELETE_EVENT_CONFIRM: string;
 declare const CALENDAR_DELETE_GUILD_EVENT_CONFIRM: string;
 declare const CALENDAR_EDIT_ANNOUNCEMENT: string;
 declare const CALENDAR_EDIT_EVENT: string;
 declare const CALENDAR_EDIT_GUILD_EVENT: string;
 declare const CALENDAR_ERROR: string;
 declare const CALENDAR_ERROR_ALREADY_INVITED_TO_EVENT_S: string;
 declare const CALENDAR_ERROR_ARENA_EVENTS_EXCEEDED: string;
 declare const CALENDAR_ERROR_CREATEDATE_AFTER_MAX: string;
 declare const CALENDAR_ERROR_CREATEDATE_BEFORE_TODAY: string;
 declare const CALENDAR_ERROR_DELETE_CREATOR_FAILED: string;
 declare const CALENDAR_ERROR_EVENTS_EXCEEDED: string;
 declare const CALENDAR_ERROR_EVENT_INVALID: string;
 declare const CALENDAR_ERROR_EVENT_LOCKED: string;
 declare const CALENDAR_ERROR_EVENT_PASSED: string;
 declare const CALENDAR_ERROR_EVENT_THROTTLED: string;
 declare const CALENDAR_ERROR_EVENT_TIME_PASSED: string;
 declare const CALENDAR_ERROR_EVENT_WRONG_SERVER: string;
 declare const CALENDAR_ERROR_GUILD_EVENTS_EXCEEDED: string;
 declare const CALENDAR_ERROR_IGNORED: string;
 declare const CALENDAR_ERROR_INTERNAL: string;
 declare const CALENDAR_ERROR_INVALID_DATE: string;
 declare const CALENDAR_ERROR_INVALID_SIGNUP: string;
 declare const CALENDAR_ERROR_INVALID_TIME: string;
 declare const CALENDAR_ERROR_INVITES_DISABLED: string;
 declare const CALENDAR_ERROR_INVITES_EXCEEDED: string;
 declare const CALENDAR_ERROR_INVITE_THROTTLED: string;
 declare const CALENDAR_ERROR_INVITE_WRONG_SERVER: string;
 declare const CALENDAR_ERROR_NEEDS_TITLE: string;
 declare const CALENDAR_ERROR_NOT_ALLIED: string;
 declare const CALENDAR_ERROR_NOT_INVITED: string;
 declare const CALENDAR_ERROR_NO_GUILD_INVITES: string;
 declare const CALENDAR_ERROR_NO_INVITE: string;
 declare const CALENDAR_ERROR_NO_MODERATOR: string;
 declare const CALENDAR_ERROR_OTHER_INVITES_EXCEEDED: string;
 declare const CALENDAR_ERROR_PERMISSIONS: string;
 declare const CALENDAR_ERROR_RESTRICTED_LEVEL: string;
 declare const CALENDAR_ERROR_SELF_INVITES_EXCEEDED: string;
 declare const CALENDAR_EVENTNAME_FORMAT_END: string;
 declare const CALENDAR_EVENTNAME_FORMAT_RAID_LOCKOUT: string;
 declare const CALENDAR_EVENTNAME_FORMAT_RAID_RESET: string;
 declare const CALENDAR_EVENTNAME_FORMAT_START: string;
 declare const CALENDAR_EVENT_ALARM_MESSAGE: string;
 declare const CALENDAR_EVENT_CREATORNAME: string;
 declare const CALENDAR_EVENT_DESCRIPTION: string;
 declare const CALENDAR_EVENT_INVITEDBY_PLAYER: string;
 declare const CALENDAR_EVENT_INVITEDBY_YOURSELF: string;
 declare const CALENDAR_EVENT_NAME: string;
 declare const CALENDAR_EVENT_PICKER_TITLE: string;
 declare const CALENDAR_EVENT_REMOVED_MAIL_BODY: string;
 declare const CALENDAR_EVENT_REMOVED_MAIL_SUBJECT: string;
 declare const CALENDAR_FILTERS: string;
 declare const CALENDAR_FILTER_BATTLEGROUND: string;
 declare const CALENDAR_FILTER_DARKMOON: string;
 declare const CALENDAR_FILTER_RAID_LOCKOUTS: string;
 declare const CALENDAR_FILTER_RAID_RESETS: string;
 declare const CALENDAR_FILTER_WEEKLY_HOLIDAYS: string;
 declare const CALENDAR_GUILDEVENT_INVITEDBY_YOURSELF: string;
 declare const CALENDAR_INVITELIST_CLEARMODERATOR: string;
 declare const CALENDAR_INVITELIST_CREATORNAME: string;
 declare const CALENDAR_INVITELIST_INVITETORAID: string;
 declare const CALENDAR_INVITELIST_MODERATORNAME: string;
 declare const CALENDAR_INVITELIST_SETINVITESTATUS: string;
 declare const CALENDAR_INVITELIST_SETMODERATOR: string;
 declare const CALENDAR_INVITE_ALL: string;
 declare const CALENDAR_INVITE_CONFIRMED: string;
 declare const CALENDAR_INVITE_LABEL: string;
 declare const CALENDAR_INVITE_MEMBERS: string;
 declare const CALENDAR_INVITE_PLAYER: string;
 declare const CALENDAR_INVITE_REMOVED_MAIL_BODY: string;
 declare const CALENDAR_INVITE_REMOVED_MAIL_SUBJECT: string;
 declare const CALENDAR_LOCK_EVENT: string;
 declare const CALENDAR_MASSINVITE_ARENA_HELP: string;
 declare const CALENDAR_MASSINVITE_GUILD_HELP: string;
 declare const CALENDAR_MASSINVITE_GUILD_MINRANK: string;
 declare const CALENDAR_MASS_INVITE: string;
 declare const CALENDAR_NOT_SIGNEDUP_FOR_GUILDEVENT: string;
 declare const CALENDAR_PASTE_EVENT: string;
 declare const CALENDAR_PLAYER_NAME: string;
 declare const CALENDAR_RAID_LOCKOUT_DESCRIPTION: string;
 declare const CALENDAR_RAID_RESET_DESCRIPTION: string;
 declare const CALENDAR_REMOVE_INVITATION: string;
 declare const CALENDAR_REMOVE_SIGNUP: string;
 declare const CALENDAR_REPEAT_BIWEEKLY: string;
 declare const CALENDAR_REPEAT_MONTHLY: string;
 declare const CALENDAR_REPEAT_NEVER: string;
 declare const CALENDAR_REPEAT_WEEKLY: string;
 declare const CALENDAR_SET_DESCRIPTION_LABEL: string;
 declare const CALENDAR_SIGNEDUP_FOR_GUILDEVENT_WITH_STATUS: string;
 declare const CALENDAR_SIGNUP: string;
 declare const CALENDAR_SIGNUP_FOR_GUILDEVENT: string;
 declare const CALENDAR_STATUS_ACCEPTED: string;
 declare const CALENDAR_STATUS_CONFIRMED: string;
 declare const CALENDAR_STATUS_DECLINED: string;
 declare const CALENDAR_STATUS_INVITED: string;
 declare const CALENDAR_STATUS_NOT_SIGNEDUP: string;
 declare const CALENDAR_STATUS_OUT: string;
 declare const CALENDAR_STATUS_SIGNEDUP: string;
 declare const CALENDAR_STATUS_STANDBY: string;
 declare const CALENDAR_STATUS_TENTATIVE: string;
 declare const CALENDAR_TENTATIVE_INVITATION: string;
 declare const CALENDAR_TEXTURE_PICKER_TITLE_DUNGEON: string;
 declare const CALENDAR_TEXTURE_PICKER_TITLE_RAID: string;
 declare const CALENDAR_TOOLTIP_AUTOAPPROVE: string;
 declare const CALENDAR_TOOLTIP_AVAILABLEBUTTON: string;
 declare const CALENDAR_TOOLTIP_DECLINEBUTTON: string;
 declare const CALENDAR_TOOLTIP_INVITEMEMBERS_BUTTON_PARTY: string;
 declare const CALENDAR_TOOLTIP_INVITEMEMBERS_BUTTON_RAID: string;
 declare const CALENDAR_TOOLTIP_INVITE_RESPONDED: string;
 declare const CALENDAR_TOOLTIP_INVITE_TOTALS: string;
 declare const CALENDAR_TOOLTIP_LOCKEVENT: string;
 declare const CALENDAR_TOOLTIP_MASSINVITE: string;
 declare const CALENDAR_TOOLTIP_REMOVEBUTTON: string;
 declare const CALENDAR_TOOLTIP_REMOVESIGNUPBUTTON: string;
 declare const CALENDAR_TOOLTIP_SIGNUPBUTTON: string;
 declare const CALENDAR_TOOLTIP_TENTATIVEBUTTON: string;
 declare const CALENDAR_TYPE_DUNGEON: string;
 declare const CALENDAR_TYPE_MEETING: string;
 declare const CALENDAR_TYPE_OTHER: string;
 declare const CALENDAR_TYPE_PVP: string;
 declare const CALENDAR_TYPE_RAID: string;
 declare const CALENDAR_UPDATE: string;
 declare const CALENDAR_VIEW_ANNOUNCEMENT: string;
 declare const CALENDAR_VIEW_EVENT: string;
 declare const CALENDAR_VIEW_EVENTTITLE_LOCKED: string;
 declare const CALENDAR_VIEW_EVENTTYPE: string;
 declare const CALENDAR_VIEW_EVENT_REMOVE: string;
 declare const CALENDAR_VIEW_EVENT_SETSTATUS: string;
 declare const CALENDAR_VIEW_EVENT_TENTATIVE: string;
 declare const CALENDAR_VIEW_GUILD_EVENT: string;
 declare const CALIBRATION_TEXT: string;
 declare const CAMERA_ALWAYS: string;
 declare const CAMERA_FOLLOWING_STYLE: string;
 declare const CAMERA_LABEL: string;
 declare const CAMERA_LOCKED: string;
 declare const CAMERA_MODE: string;
 declare const CAMERA_NEVER: string;
 declare const CAMERA_SMART: string;
 declare const CAMERA_SMARTER: string;
 declare const CAMERA_SUBTEXT: string;
 declare const CAMP_NOW: string;
 declare const CAMP_TIMER: string;
 declare const CANCEL: string;
 declare const CANCEL_AUCTION: string;
 declare const CANCEL_AUCTION_CONFIRMATION: string;
 declare const CANCEL_AUCTION_CONFIRMATION_MONEY: string;
 declare const CANNOT_COOPERATE_LABEL: string;
 declare const CANT_AFFORD_ITEM: string;
 declare const CANT_USE_ITEM: string;
 declare const CAN_BIND_PTT: string;
 declare const CAPSLOCK_KEY_TEXT: string;
 declare const CASH_ON_DELIVERY: string;
 declare const CAST_WHILE_MOVING: string;
 declare const CATEGORIES: string;
 declare const CATEGORY: string;
 declare const CHANCE_TO_BLOCK: string;
 declare const CHANCE_TO_CRIT: string;
 declare const CHANCE_TO_DODGE: string;
 declare const CHANCE_TO_PARRY: string;
 declare const CHANGE_INSTANCE: string;
 declare const CHANGE_MACRO_NAME_ICON: string;
 declare const CHANGE_OPACITY: string;
 declare const CHANNEL: string;
 declare const CHANNELING: string;
 declare const CHANNELPULLOUT_OPACITY_LABEL: string;
 declare const CHANNELPULLOUT_OPTIONS_LABEL: string;
 declare const CHANNELS: string;
 declare const CHANNEL_CATEGORY_CUSTOM: string;
 declare const CHANNEL_CATEGORY_GROUP: string;
 declare const CHANNEL_CATEGORY_WORLD: string;
 declare const CHANNEL_CHANNEL_NAME: string;
 declare const CHANNEL_INVITE: string;
 declare const CHANNEL_JOIN_CHANNEL: string;
 declare const CHANNEL_NEW_CHANNEL: string;
 declare const CHANNEL_PASSWORD: string;
 declare const CHANNEL_ROSTER: string;
 declare const CHARACTER: string;
 declare const CHARACTER_BUTTON: string;
 declare const CHARACTER_FRIEND: string;
 declare const CHARACTER_FRIEND_INFO: string;
 declare const CHARACTER_FRIEND_LABEL: string;
 declare const CHARACTER_INFO: string;
 declare const CHARACTER_KEY_BINDINGS: string;
 declare const CHARACTER_POINTS2_COLON: string;
 declare const CHARACTER_POINTS_CHANGED: string;
 declare const CHARACTER_SHADOWS: string;
 declare const CHARACTER_SPECIFIC_KEYBINDINGS: string;
 declare const CHARACTER_SPECIFIC_KEYBINDING_TOOLTIP: string;
 declare const CHARACTER_SPECIFIC_MACROS: string;
 declare const CHAT: string;
 declare const CHATCONFIG_HEADER: string;
 declare const CHATLOGDISABLED: string;
 declare const CHATLOGENABLED: string;
 declare const CHAT_AFK_GET: string;
 declare const CHAT_ANNOUNCE: string;
 declare const CHAT_ANNOUNCEMENTS_OFF_NOTICE: string;
 declare const CHAT_ANNOUNCEMENTS_OFF_NOTICE_BN: string;
 declare const CHAT_ANNOUNCEMENTS_ON_NOTICE: string;
 declare const CHAT_ANNOUNCEMENTS_ON_NOTICE_BN: string;
 declare const CHAT_AUTO_JOIN: string;
 declare const CHAT_BAN: string;
 declare const CHAT_BANNED_NOTICE: string;
 declare const CHAT_BATTLEGROUND_GET: string;
 declare const CHAT_BATTLEGROUND_LEADER_GET: string;
 declare const CHAT_BATTLEGROUND_SEND: string;
 declare const CHAT_BN_CONVERSATION_GET: string;
 declare const CHAT_BN_CONVERSATION_GET_LINK: string;
 declare const CHAT_BN_CONVERSATION_LIST: string;
 declare const CHAT_BN_CONVERSATION_SEND: string;
 declare const CHAT_BN_WHISPER_GET: string;
 declare const CHAT_BN_WHISPER_INFORM_GET: string;
 declare const CHAT_BN_WHISPER_SEND: string;
 declare const CHAT_BUBBLES_TEXT: string;
 declare const CHAT_CHANNELS: string;
 declare const CHAT_CHANNEL_GET: string;
 declare const CHAT_CHANNEL_JOIN_GET: string;
 declare const CHAT_CHANNEL_LEAVE_GET: string;
 declare const CHAT_CHANNEL_LIST_GET: string;
 declare const CHAT_CHANNEL_OWNER_NOTICE: string;
 declare const CHAT_CHANNEL_OWNER_NOTICE_BN: string;
 declare const CHAT_CHANNEL_SEND: string;
 declare const CHAT_COMBAT_MISC_INFO_GET: string;
 declare const CHAT_CONFIGURATION: string;
 declare const CHAT_CONVERSATION_CONVERSATION_CONVERTED_TO_WHISPER_NOTICE: string;
 declare const CHAT_CONVERSATION_MEMBER_JOINED_NOTICE: string;
 declare const CHAT_CONVERSATION_MEMBER_LEFT_NOTICE: string;
 declare const CHAT_CONVERSATION_YOU_JOINED_CONVERSATION_NOTICE: string;
 declare const CHAT_CONVERSATION_YOU_LEFT_CONVERSATION_NOTICE: string;
 declare const CHAT_DEFAULT: string;
 declare const CHAT_DEFAULTS: string;
 declare const CHAT_DEMOTE: string;
 declare const CHAT_DND_GET: string;
 declare const CHAT_EMOTE_GET: string;
 declare const CHAT_EMOTE_SEND: string;
 declare const CHAT_EMOTE_UNKNOWN: string;
 declare const CHAT_FILTERED: string;
 declare const CHAT_FLAG_AFK: string;
 declare const CHAT_FLAG_DND: string;
 declare const CHAT_FLAG_GM: string;
 declare const CHAT_GUILD_DEMOTE_SEND: string;
 declare const CHAT_GUILD_GET: string;
 declare const CHAT_GUILD_INVITE_SEND: string;
 declare const CHAT_GUILD_LEADER_SEND: string;
 declare const CHAT_GUILD_MOTD_SEND: string;
 declare const CHAT_GUILD_PROMOTE_SEND: string;
 declare const CHAT_GUILD_SEND: string;
 declare const CHAT_GUILD_UNINVITE_SEND: string;
 declare const CHAT_HELP_TEXT_LINE1: string;
 declare const CHAT_HELP_TEXT_LINE2: string;
 declare const CHAT_HELP_TEXT_LINE3: string;
 declare const CHAT_HELP_TEXT_LINE4: string;
 declare const CHAT_HELP_TEXT_LINE5: string;
 declare const CHAT_HELP_TEXT_LINE6: string;
 declare const CHAT_HELP_TEXT_LINE7: string;
 declare const CHAT_HELP_TEXT_LINE8: string;
 declare const CHAT_HELP_TEXT_LINE9: string;
 declare const CHAT_HELP_TEXT_LINE10: string;
 declare const CHAT_HELP_TEXT_LINE11: string;
 declare const CHAT_HELP_TEXT_LINE12: string;
 declare const CHAT_HELP_TEXT_LINE13: string;
 declare const CHAT_HELP_TEXT_LINE14: string;
 declare const CHAT_HELP_TEXT_LINE15: string;
 declare const CHAT_HELP_TEXT_LINE16: string;
 declare const CHAT_IGNORED: string;
 declare const CHAT_INVALID_NAME_NOTICE: string;
 declare const CHAT_INVITE_NOTICE: string;
 declare const CHAT_INVITE_NOTICE_POPUP: string;
 declare const CHAT_INVITE_SEND: string;
 declare const CHAT_INVITE_WRONG_FACTION_NOTICE: string;
 declare const CHAT_JOIN: string;
 declare const CHAT_JOIN_HELP: string;
 declare const CHAT_KICK: string;
 declare const CHAT_LABEL: string;
 declare const CHAT_LEAVE: string;
 declare const CHAT_LOCKED_TEXT: string;
 declare const CHAT_MODERATE: string;
 declare const CHAT_MODERATION_OFF_NOTICE: string;
 declare const CHAT_MODERATION_OFF_NOTICE_BN: string;
 declare const CHAT_MODERATION_ON_NOTICE: string;
 declare const CHAT_MODERATION_ON_NOTICE_BN: string;
 declare const CHAT_MONSTER_EMOTE_GET: string;
 declare const CHAT_MONSTER_PARTY_GET: string;
 declare const CHAT_MONSTER_SAY_GET: string;
 declare const CHAT_MONSTER_WHISPER_GET: string;
 declare const CHAT_MONSTER_YELL_GET: string;
 declare const CHAT_MOUSE_WHEEL_SCROLL: string;
 declare const CHAT_MSG_ACHIEVEMENT: string;
 declare const CHAT_MSG_AFK: string;
 declare const CHAT_MSG_BATTLEGROUND: string;
 declare const CHAT_MSG_BATTLEGROUND_LEADER: string;
 declare const CHAT_MSG_BG_SYSTEM_ALLIANCE: string;
 declare const CHAT_MSG_BG_SYSTEM_HORDE: string;
 declare const CHAT_MSG_BG_SYSTEM_NEUTRAL: string;
 declare const CHAT_MSG_BN_CONVERSATION: string;
 declare const CHAT_MSG_BN_WHISPER: string;
 declare const CHAT_MSG_CHANNEL_LIST: string;
 declare const CHAT_MSG_COMBAT_HONOR_GAIN: string;
 declare const CHAT_MSG_EMOTE: string;
 declare const CHAT_MSG_FILTERED: string;
 declare const CHAT_MSG_GUILD: string;
 declare const CHAT_MSG_GUILD_ACHIEVEMENT: string;
 declare const CHAT_MSG_LOOT: string;
 declare const CHAT_MSG_MONEY: string;
 declare const CHAT_MSG_MONSTER_EMOTE: string;
 declare const CHAT_MSG_MONSTER_PARTY: string;
 declare const CHAT_MSG_MONSTER_SAY: string;
 declare const CHAT_MSG_MONSTER_WHISPER: string;
 declare const CHAT_MSG_MONSTER_YELL: string;
 declare const CHAT_MSG_OFFICER: string;
 declare const CHAT_MSG_PARTY: string;
 declare const CHAT_MSG_PARTY_LEADER: string;
 declare const CHAT_MSG_RAID: string;
 declare const CHAT_MSG_RAID_BOSS_EMOTE: string;
 declare const CHAT_MSG_RAID_LEADER: string;
 declare const CHAT_MSG_RAID_WARNING: string;
 declare const CHAT_MSG_RESTRICTED: string;
 declare const CHAT_MSG_SAY: string;
 declare const CHAT_MSG_SKILL: string;
 declare const CHAT_MSG_SYSTEM: string;
 declare const CHAT_MSG_TEXT_EMOTE: string;
 declare const CHAT_MSG_WHISPER: string;
 declare const CHAT_MSG_WHISPER_INFORM: string;
 declare const CHAT_MSG_YELL: string;
 declare const CHAT_MUTED_NOTICE: string;
 declare const CHAT_MUTED_NOTICE_BN: string;
 declare const CHAT_NAME_TEMPLATE: string;
 declare const CHAT_NOT_IN_AREA_NOTICE: string;
 declare const CHAT_NOT_MEMBER_NOTICE: string;
 declare const CHAT_NOT_MODERATED_NOTICE: string;
 declare const CHAT_NOT_MODERATOR_NOTICE: string;
 declare const CHAT_NOT_MODERATOR_NOTICE_BN: string;
 declare const CHAT_NOT_OWNER_NOTICE: string;
 declare const CHAT_NOT_OWNER_NOTICE_BN: string;
 declare const CHAT_OFFICER_GET: string;
 declare const CHAT_OFFICER_SEND: string;
 declare const CHAT_OPTIONS_LABEL: string;
 declare const CHAT_OVERFLOW_LABEL: string;
 declare const CHAT_OWNER: string;
 declare const CHAT_OWNER_CHANGED_NOTICE: string;
 declare const CHAT_OWNER_CHANGED_NOTICE_BN: string;
 declare const CHAT_PARTY_GET: string;
 declare const CHAT_PARTY_GUIDE_GET: string;
 declare const CHAT_PARTY_LEADER_GET: string;
 declare const CHAT_PARTY_SEND: string;
 declare const CHAT_PASSWORD: string;
 declare const CHAT_PASSWORD_CHANGED_NOTICE: string;
 declare const CHAT_PASSWORD_CHANGED_NOTICE_BN: string;
 declare const CHAT_PASSWORD_NOTICE_POPUP: string;
 declare const CHAT_PLAYER_ALREADY_MEMBER_NOTICE: string;
 declare const CHAT_PLAYER_ALREADY_MEMBER_NOTICE_BN: string;
 declare const CHAT_PLAYER_BANNED_NOTICE: string;
 declare const CHAT_PLAYER_BANNED_NOTICE_BN: string;
 declare const CHAT_PLAYER_INVITED_NOTICE: string;
 declare const CHAT_PLAYER_INVITED_NOTICE_BN: string;
 declare const CHAT_PLAYER_INVITE_BANNED_NOTICE: string;
 declare const CHAT_PLAYER_INVITE_BANNED_NOTICE_BN: string;
 declare const CHAT_PLAYER_KICKED_NOTICE: string;
 declare const CHAT_PLAYER_KICKED_NOTICE_BN: string;
 declare const CHAT_PLAYER_NOT_BANNED_NOTICE: string;
 declare const CHAT_PLAYER_NOT_BANNED_NOTICE_BN: string;
 declare const CHAT_PLAYER_NOT_FOUND_NOTICE: string;
 declare const CHAT_PLAYER_NOT_FOUND_NOTICE_BN: string;
 declare const CHAT_PLAYER_UNBANNED_NOTICE: string;
 declare const CHAT_PLAYER_UNBANNED_NOTICE_BN: string;
 declare const CHAT_PROMOTE: string;
 declare const CHAT_PROMOTE_SEND: string;
 declare const CHAT_RAID_BOSS_EMOTE_GET: string;
 declare const CHAT_RAID_BOSS_WHISPER_GET: string;
 declare const CHAT_RAID_GET: string;
 declare const CHAT_RAID_LEADER_GET: string;
 declare const CHAT_RAID_SEND: string;
 declare const CHAT_RAID_WARNING_GET: string;
 declare const CHAT_RAID_WARNING_SEND: string;
 declare const CHAT_RESTRICTED: string;
 declare const CHAT_SAY_GET: string;
 declare const CHAT_SAY_SEND: string;
 declare const CHAT_SAY_UNKNOWN: string;
 declare const CHAT_SET_MODERATOR_NOTICE: string;
 declare const CHAT_SET_MODERATOR_NOTICE_BN: string;
 declare const CHAT_SET_SPEAK_NOTICE: string;
 declare const CHAT_SET_SPEAK_NOTICE_BN: string;
 declare const CHAT_SET_VOICE_NOTICE: string;
 declare const CHAT_SET_VOICE_NOTICE_BN: string;
 declare const CHAT_SILENCE: string;
 declare const CHAT_STYLE: string;
 declare const CHAT_SUSPENDED_NOTICE: string;
 declare const CHAT_SUSPENDED_NOTICE_BN: string;
 declare const CHAT_THROTTLED_NOTICE: string;
 declare const CHAT_THROTTLED_NOTICE_BN: string;
 declare const CHAT_UNINVITE_SEND: string;
 declare const CHAT_UNSET_MODERATOR_NOTICE: string;
 declare const CHAT_UNSET_MODERATOR_NOTICE_BN: string;
 declare const CHAT_UNSET_SPEAK_NOTICE: string;
 declare const CHAT_UNSET_SPEAK_NOTICE_BN: string;
 declare const CHAT_UNSET_VOICE_NOTICE: string;
 declare const CHAT_UNSET_VOICE_NOTICE_BN: string;
 declare const CHAT_UNSILENCE: string;
 declare const CHAT_VOICE: string;
 declare const CHAT_VOICE_OFF: string;
 declare const CHAT_VOICE_OFF_NOTICE: string;
 declare const CHAT_VOICE_OFF_NOTICE_BN: string;
 declare const CHAT_VOICE_ON: string;
 declare const CHAT_VOICE_ON_NOTICE: string;
 declare const CHAT_VOICE_ON_NOTICE_BN: string;
 declare const CHAT_WHISPER_GET: string;
 declare const CHAT_WHISPER_INFORM_GET: string;
 declare const CHAT_WHISPER_SEND: string;
 declare const CHAT_WHOLE_WINDOW_CLICKABLE: string;
 declare const CHAT_WINDOWS_COUNT: string;
 declare const CHAT_WRONG_FACTION_NOTICE: string;
 declare const CHAT_WRONG_PASSWORD_NOTICE: string;
 declare const CHAT_YELL_GET: string;
 declare const CHAT_YELL_SEND: string;
 declare const CHAT_YELL_UNKNOWN: string;
 declare const CHAT_YELL_UNKNOWN_FEMALE: string;
 declare const CHAT_YOU_CHANGED_NOTICE: string;
 declare const CHAT_YOU_CHANGED_NOTICE_BN: string;
 declare const CHAT_YOU_JOINED_NOTICE: string;
 declare const CHAT_YOU_JOINED_NOTICE_BN: string;
 declare const CHAT_YOU_LEFT_NOTICE: string;
 declare const CHAT_YOU_LEFT_NOTICE_BN: string;
 declare const CHESTSLOT: string;
 declare const CHOOSE_BOX: string;
 declare const CHOOSE_RAID: string;
 declare const CHOOSE_STATIONERY: string;
 declare const CHOOSE_YOUR_DUNGEON: string;
 declare const CHOSEN_FOR_GMSURVEY: string;
 declare const CINEMATIC_SUBTITLES: string;
 declare const CLASS: string;
 declare const CLASSIC_STYLE: string;
 declare const CLASS_COLORS: string;
 declare const CLASS_SKILLS: string;
 declare const CLEARED_AFK: string;
 declare const CLEARED_DND: string;
 declare const CLEAR_AFK: string;
 declare const CLEAR_ALL: string;
 declare const CLEAR_FOCUS: string;
 declare const CLICK_CAMERA_STYLE: string;
 declare const CLICK_FOR_ADDITIONAL_QUEST_LOCATIONS: string;
 declare const CLICK_FOR_DETAILS: string;
 declare const CLICK_HERE_FOR_MORE_INFO: string;
 declare const CLICK_TO_ENTER_COMMENT: string;
 declare const CLICK_TO_INVITE_TO_CONVERSATION: string;
 declare const CLICK_TO_LEARN: string;
 declare const CLICK_TO_MOVE: string;
 declare const CLICK_TO_REMOVE_ADDITIONAL_QUEST_LOCATIONS: string;
 declare const CLICK_TO_START_CONVERSATION: string;
 declare const CLIENT_LOGOUT_ALERT: string;
 declare const CLIENT_RESTART_ALERT: string;
 declare const CLOSE: string;
 declare const CLOSES_IN: string;
 declare const CLOSE_AND_LEAVE_CHAT_CONVERSATION_WINDOW: string;
 declare const CLOSE_CHAT: string;
 declare const CLOSE_CHAT_CONVERSATION_WINDOW: string;
 declare const CLOSE_CHAT_WHISPER_WINDOW: string;
 declare const CLOSE_CHAT_WINDOW: string;
 declare const CLOSE_LOG: string;
 declare const COD: string;
 declare const COD_AMOUNT: string;
 declare const COD_CONFIRMATION: string;
 declare const COD_INSUFFICIENT_MONEY: string;
 declare const COD_PAYMENT: string;
 declare const COINPICKUP_CANCEL: string;
 declare const COLOR: string;
 declare const COLORBLIND_NAMEWRAPPER_ENEMY: string;
 declare const COLORBLIND_NAMEWRAPPER_FRIENDLY: string;
 declare const COLORBLIND_NAMEWRAPPER_NEUTRAL: string;
 declare const COLORIZE: string;
 declare const COLORS: string;
 declare const COLOR_BY_SCHOOL: string;
 declare const COLOR_PICKER: string;
 declare const COMBAT: string;
 declare const COMBATLOGDISABLED: string;
 declare const COMBATLOGENABLED: string;
 declare const COMBATLOG_ARENAPOINTSAWARD: string;
 declare const COMBATLOG_DEFAULTS: string;
 declare const COMBATLOG_DISHONORGAIN: string;
 declare const COMBATLOG_FILTER_STRING_CUSTOM_UNIT: string;
 declare const COMBATLOG_FILTER_STRING_FRIENDLY_UNITS: string;
 declare const COMBATLOG_FILTER_STRING_HOSTILE_PLAYERS: string;
 declare const COMBATLOG_FILTER_STRING_HOSTILE_UNITS: string;
 declare const COMBATLOG_FILTER_STRING_ME: string;
 declare const COMBATLOG_FILTER_STRING_MY_PET: string;
 declare const COMBATLOG_FILTER_STRING_NEUTRAL_UNITS: string;
 declare const COMBATLOG_FILTER_STRING_UNKNOWN_UNITS: string;
 declare const COMBATLOG_HIGHLIGHT_ABILITY: string;
 declare const COMBATLOG_HIGHLIGHT_DAMAGE: string;
 declare const COMBATLOG_HIGHLIGHT_KILL: string;
 declare const COMBATLOG_HIGHLIGHT_SCHOOL: string;
 declare const COMBATLOG_HONORAWARD: string;
 declare const COMBATLOG_HONORGAIN: string;
 declare const COMBATLOG_HONORGAIN_NO_RANK: string;
 declare const COMBATLOG_UNKNOWN_UNIT: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION1: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION1_GROUP: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION1_RAID: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION2: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION2_GROUP: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION2_RAID: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION4: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION4_GROUP: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION4_RAID: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION5: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION5_GROUP: string;
 declare const COMBATLOG_XPGAIN_EXHAUSTION5_RAID: string;
 declare const COMBATLOG_XPGAIN_FIRSTPERSON: string;
 declare const COMBATLOG_XPGAIN_FIRSTPERSON_GROUP: string;
 declare const COMBATLOG_XPGAIN_FIRSTPERSON_RAID: string;
 declare const COMBATLOG_XPGAIN_FIRSTPERSON_UNNAMED: string;
 declare const COMBATLOG_XPGAIN_FIRSTPERSON_UNNAMED_GROUP: string;
 declare const COMBATLOG_XPGAIN_FIRSTPERSON_UNNAMED_RAID: string;
 declare const COMBATLOG_XPGAIN_QUEST: string;
 declare const COMBATLOG_XPLOSS_FIRSTPERSON_UNNAMED: string;
 declare const COMBATTEXT_LABEL: string;
 declare const COMBATTEXT_SUBTEXT: string;
 declare const COMBAT_ENEMY: string;
 declare const COMBAT_ERROR: string;
 declare const COMBAT_FACTION_CHANGE: string;
 declare const COMBAT_HONOR_GAIN: string;
 declare const COMBAT_LABEL: string;
 declare const COMBAT_LOG: string;
 declare const COMBAT_LOG_MENU_BOTH: string;
 declare const COMBAT_LOG_MENU_EVERYTHING: string;
 declare const COMBAT_LOG_MENU_INCOMING: string;
 declare const COMBAT_LOG_MENU_OUTGOING: string;
 declare const COMBAT_LOG_MENU_OUTGOING_ME: string;
 declare const COMBAT_LOG_MENU_REVERT: string;
 declare const COMBAT_LOG_MENU_SAVE: string;
 declare const COMBAT_LOG_MENU_SPELL_HIDE: string;
 declare const COMBAT_LOG_MENU_SPELL_LINK: string;
 declare const COMBAT_LOG_MENU_SPELL_TYPE_HEADER: string;
 declare const COMBAT_LOG_UNIT_YOU_ENABLED: string;
 declare const COMBAT_MESSAGES: string;
 declare const COMBAT_MISC: string;
 declare const COMBAT_MISC_INFO: string;
 declare const COMBAT_PARTY: string;
 declare const COMBAT_RATING_NAME1: string;
 declare const COMBAT_RATING_NAME10: string;
 declare const COMBAT_RATING_NAME11: string;
 declare const COMBAT_RATING_NAME15: string;
 declare const COMBAT_RATING_NAME2: string;
 declare const COMBAT_RATING_NAME24: string;
 declare const COMBAT_RATING_NAME3: string;
 declare const COMBAT_RATING_NAME4: string;
 declare const COMBAT_RATING_NAME5: string;
 declare const COMBAT_RATING_NAME6: string;
 declare const COMBAT_RATING_NAME7: string;
 declare const COMBAT_RATING_NAME8: string;
 declare const COMBAT_RATING_NAME9: string;
 declare const COMBAT_SELF: string;
 declare const COMBAT_SUBTEXT: string;
 declare const COMBAT_TEXT_ABSORB: string;
 declare const COMBAT_TEXT_ARENA_POINTS_GAINED: string;
 declare const COMBAT_TEXT_BLOCK: string;
 declare const COMBAT_TEXT_COMBO_POINTS: string;
 declare const COMBAT_TEXT_DEFLECT: string;
 declare const COMBAT_TEXT_DODGE: string;
 declare const COMBAT_TEXT_EVADE: string;
 declare const COMBAT_TEXT_FLOAT_MODE_LABEL: string;
 declare const COMBAT_TEXT_HONOR_GAINED: string;
 declare const COMBAT_TEXT_IMMUNE: string;
 declare const COMBAT_TEXT_LABEL: string;
 declare const COMBAT_TEXT_MISS: string;
 declare const COMBAT_TEXT_NONE: string;
 declare const COMBAT_TEXT_PARRY: string;
 declare const COMBAT_TEXT_REFLECT: string;
 declare const COMBAT_TEXT_RESIST: string;
 declare const COMBAT_TEXT_RUNE_BLOOD: string;
 declare const COMBAT_TEXT_RUNE_DEATH: string;
 declare const COMBAT_TEXT_RUNE_FROST: string;
 declare const COMBAT_TEXT_RUNE_UNHOLY: string;
 declare const COMBAT_TEXT_SCROLL_ARC: string;
 declare const COMBAT_TEXT_SCROLL_DOWN: string;
 declare const COMBAT_TEXT_SCROLL_DOWN_TEXT: string;
 declare const COMBAT_TEXT_SCROLL_UP: string;
 declare const COMBAT_TEXT_SHOW_AURAS_TEXT: string;
 declare const COMBAT_TEXT_SHOW_AURA_FADE_TEXT: string;
 declare const COMBAT_TEXT_SHOW_COMBAT_STATE_TEXT: string;
 declare const COMBAT_TEXT_SHOW_COMBO_POINTS_TEXT: string;
 declare const COMBAT_TEXT_SHOW_DODGE_PARRY_MISS_TEXT: string;
 declare const COMBAT_TEXT_SHOW_ENERGIZE_TEXT: string;
 declare const COMBAT_TEXT_SHOW_FRIENDLY_NAMES_TEXT: string;
 declare const COMBAT_TEXT_SHOW_HONOR_GAINED_TEXT: string;
 declare const COMBAT_TEXT_SHOW_LOW_HEALTH_MANA_TEXT: string;
 declare const COMBAT_TEXT_SHOW_PERIODIC_ENERGIZE_TEXT: string;
 declare const COMBAT_TEXT_SHOW_REACTIVES_TEXT: string;
 declare const COMBAT_TEXT_SHOW_REPUTATION_TEXT: string;
 declare const COMBAT_TEXT_SHOW_RESISTANCES_TEXT: string;
 declare const COMBAT_THREAT_DECREASE_0: string;
 declare const COMBAT_THREAT_DECREASE_1: string;
 declare const COMBAT_THREAT_DECREASE_2: string;
 declare const COMBAT_THREAT_INCREASE_1: string;
 declare const COMBAT_THREAT_INCREASE_3: string;
 declare const COMBAT_XP_GAIN: string;
 declare const COMBAT_ZONE: string;
 declare const COMMAND: string;
 declare const COMMENT: string;
 declare const COMMENTS_COLON: string;
 declare const COMPANIONS: string;
 declare const COMPARE_ACHIEVEMENTS: string;
 declare const COMPLAINT_ADDED: string;
 declare const COMPLETE: string;
 declare const COMPLETE_QUEST: string;
 declare const CONFIRM_ACCEPT_PVP_QUEST: string;
 declare const CONFIRM_ACCEPT_SOCKETS: string;
 declare const CONFIRM_BATTLEFIELD_ENTRY: string;
 declare const CONFIRM_BINDER: string;
 declare const CONFIRM_BUY_BANK_SLOT: string;
 declare const CONFIRM_BUY_GUILDBANK_TAB: string;
 declare const CONFIRM_BUY_STABLE_SLOT: string;
 declare const CONFIRM_COMBAT_FILTER_DEFAULTS: string;
 declare const CONFIRM_COMBAT_FILTER_DELETE: string;
 declare const CONFIRM_COMPLETE_EXPENSIVE_QUEST: string;
 declare const CONFIRM_DELETE_EQUIPMENT_SET: string;
 declare const CONFIRM_DELETING_CHARACTER_SPECIFIC_BINDINGS: string;
 declare const CONFIRM_GLYPH_PLACEMENT: string;
 declare const CONFIRM_GUILD_DISBAND: string;
 declare const CONFIRM_GUILD_LEAVE: string;
 declare const CONFIRM_GUILD_PROMOTE: string;
 declare const CONFIRM_HIGH_COST_ITEM: string;
 declare const CONFIRM_LEARN_PREVIEW_TALENTS: string;
 declare const CONFIRM_LEAVE_QUEUE: string;
 declare const CONFIRM_LOOT_DISTRIBUTION: string;
 declare const CONFIRM_LOSE_BINDING_CHANGES: string;
 declare const CONFIRM_OVERWRITE_EQUIPMENT_SET: string;
 declare const CONFIRM_PET_UNLEARN: string;
 declare const CONFIRM_PURCHASE_TOKEN_ITEM: string;
 declare const CONFIRM_REFUND_MAX_ARENA_POINTS: string;
 declare const CONFIRM_REFUND_MAX_HONOR: string;
 declare const CONFIRM_REFUND_MAX_HONOR_AND_ARENA: string;
 declare const CONFIRM_REFUND_TOKEN_ITEM: string;
 declare const CONFIRM_REMOVE_GLYPH: string;
 declare const CONFIRM_RESET_INSTANCES: string;
 declare const CONFIRM_RESET_INTERFACE_SETTINGS: string;
 declare const CONFIRM_RESET_SETTINGS: string;
 declare const CONFIRM_SUMMON: string;
 declare const CONFIRM_TALENT_WIPE: string;
 declare const CONFIRM_TEAM_DISBAND: string;
 declare const CONFIRM_TEAM_KICK: string;
 declare const CONFIRM_TEAM_LEAVE: string;
 declare const CONFIRM_TEAM_PROMOTE: string;
 declare const CONFIRM_XP_LOSS: string;
 declare const CONFIRM_XP_LOSS_AGAIN: string;
 declare const CONFIRM_XP_LOSS_AGAIN_NO_DURABILITY: string;
 declare const CONFIRM_XP_LOSS_AGAIN_NO_SICKNESS: string;
 declare const CONFIRM_XP_LOSS_NO_DURABILITY: string;
 declare const CONFIRM_XP_LOSS_NO_SICKNESS: string;
 declare const CONFIRM_XP_LOSS_NO_SICKNESS_NO_DURABILITY: string;
 declare const CONFIRM_YOUR_ROLE: string;
 declare const CONSOLIDATE_BUFFS_TEXT: string;
 declare const CONTAINER_SLOTS: string;
 declare const CONTESTED_TERRITORY: string;
 declare const CONTINENT: string;
 declare const CONTINUE: string;
 declare const CONTINUED: string;
 declare const CONTROLS_LABEL: string;
 declare const CONTROLS_SUBTEXT: string;
 declare const CONVERSATION_MODE: string;
 declare const CONVERSATION_MODE_INLINE: string;
 declare const CONVERSATION_MODE_POPOUT: string;
 declare const CONVERSATION_NAME: string;
 declare const CONVERT_TO_RAID: string;
 declare const COOLDOWN_ON_LEAVE_COMBAT: string;
 declare const COOLDOWN_REMAINING: string;
 declare const COPPER_AMOUNT: string;
 declare const COPPER_AMOUNT_SYMBOL: string;
 declare const COPPER_AMOUNT_TEXTURE: string;
 declare const COPY_FILTER: string;
 declare const COPY_NAME: string;
 declare const CORPSE: string;
 declare const CORPSE_RED: string;
 declare const CORPSE_TOOLTIP: string;
 declare const COSTS_LABEL: string;
 declare const CRAFT_IS_MAKEABLE: string;
 declare const CRAFT_IS_MAKEABLE_TOOLTIP: string;
 declare const CREATE: string;
 declare const CREATED_ITEM: string;
 declare const CREATED_ITEM_MULTIPLE: string;
 declare const CREATE_ALL: string;
 declare const CREATE_AUCTION: string;
 declare const CREATE_CONVERSATION_WITH: string;
 declare const CREATE_MACROS: string;
 declare const CREATURE: string;
 declare const CREATURE_MESSAGES: string;
 declare const CRIT_ABBR: string;
 declare const CRUSHING_TRAILER: string;
 declare const CR_BLOCK_TOOLTIP: string;
 declare const CR_CRIT_MELEE_TOOLTIP: string;
 declare const CR_CRIT_RANGED_TOOLTIP: string;
 declare const CR_DODGE_TOOLTIP: string;
 declare const CR_EXPERTISE_TOOLTIP: string;
 declare const CR_HASTE_RATING_TOOLTIP: string;
 declare const CR_HIT_MELEE_TOOLTIP: string;
 declare const CR_HIT_RANGED_TOOLTIP: string;
 declare const CR_HIT_SPELL_TOOLTIP: string;
 declare const CR_PARRY_TOOLTIP: string;
 declare const CTRL_KEY: string;
 declare const CTRL_KEY_TEXT: string;
 declare const CURRENCY: string;
 declare const CURRENCY_AMOUNT_REFUND_FORMAT: string;
 declare const CURRENTLY_EQUIPPED: string;
 declare const CURRENT_BID: string;
 declare const CURRENT_PET: string;
 declare const CURRENT_QUESTS: string;
 declare const CURRENT_SETTINGS: string;
 declare const CUSTOM: string;
 declare const DAILY: string;
 declare const DAILY_QUESTS_REMAINING: string;
 declare const DAILY_QUEST_TAG_TEMPLATE: string;
 declare const DAMAGE: string;
 declare const DAMAGER: string;
 declare const DAMAGE_BONUS_TOOLTIP: string;
 declare const DAMAGE_DONE_TOOLTIP: string;
 declare const DAMAGE_NUMBER: string;
 declare const DAMAGE_PER_SECOND: string;
 declare const DAMAGE_SCHOOL2: string;
 declare const DAMAGE_SCHOOL3: string;
 declare const DAMAGE_SCHOOL4: string;
 declare const DAMAGE_SCHOOL5: string;
 declare const DAMAGE_SCHOOL6: string;
 declare const DAMAGE_SCHOOL7: string;
 declare const DAMAGE_SCHOOL_TEXT: string;
 declare const DAMAGE_SHIELD: string;
 declare const DAMAGE_SHIELD_COMBATLOG_TOOLTIP: string;
 declare const DAMAGE_TEMPLATE: string;
 declare const DAMAGE_TEMPLATE_WITH_SCHOOL: string;
 declare const DAMAGE_TOOLTIP: string;
 declare const DATE_COMPLETED: string;
 declare const DAYS: string;
 declare const DAYS_ABBR: string;
 declare const DAY_ONELETTER_ABBR: string;
 declare const DEAD: string;
 declare const DEATHBINDALREADYBOUND: string;
 declare const DEATHBIND_SUCCESSFUL: string;
 declare const DEATHS: string;
 declare const DEATHS_COMBATLOG_TOOLTIP: string;
 declare const DEATHS_TOOLTIP: string;
 declare const DEATH_CORPSE_SKINNED: string;
 declare const DEATH_EFFECT: string;
 declare const DEATH_RELEASE: string;
 declare const DEATH_RELEASE_NOTIMER: string;
 declare const DEATH_RELEASE_SPECTATOR: string;
 declare const DEATH_RELEASE_TIMER: string;
 declare const DEBUFF_SYMBOL_CURSE: string;
 declare const DEBUFF_SYMBOL_DISEASE: string;
 declare const DEBUFF_SYMBOL_MAGIC: string;
 declare const DEBUFF_SYMBOL_POISON: string;
 declare const DEBUG_FRAMESTACK: string;
 declare const DECLENSION_SET: string;
 declare const DECLINE: string;
 declare const DEDE: string;
 declare const DEFAULT: string;
 declare const DEFAULTS: string;
 declare const DEFAULT_AFK_MESSAGE: string;
 declare const DEFAULT_AGILITY_TOOLTIP: string;
 declare const DEFAULT_COMBATLOG_FILTER_NAME: string;
 declare const DEFAULT_DND_MESSAGE: string;
 declare const DEFAULT_INTELLECT_TOOLTIP: string;
 declare const DEFAULT_SPIRIT_TOOLTIP: string;
 declare const DEFAULT_STAMINA_TOOLTIP: string;
 declare const DEFAULT_STAT1_TOOLTIP: string;
 declare const DEFAULT_STAT2_TOOLTIP: string;
 declare const DEFAULT_STAT3_TOOLTIP: string;
 declare const DEFAULT_STAT4_TOOLTIP: string;
 declare const DEFAULT_STAT5_TOOLTIP: string;
 declare const DEFAULT_STATARMOR_TOOLTIP: string;
 declare const DEFAULT_STATDEFENSE_TOOLTIP: string;
 declare const DEFAULT_STATSPELLBONUS_TOOLTIP: string;
 declare const DEFENSE: string;
 declare const DEFENSE_ABBR: string;
 declare const DEFENSE_TOOLTIP: string;
 declare const DEFLECT: string;
 declare const DELETE: string;
 declare const DELETE_GOOD_ITEM: string;
 declare const DELETE_ITEM: string;
 declare const DELETE_ITEM_CONFIRM_string; string;
 declare const DELETE_MAIL_CONFIRMATION: string;
 declare const DELETE_MONEY_CONFIRMATION: string;
 declare const DEMOTE: string;
 declare const DEPOSIT: string;
 declare const DEPOSIT_COLON: string;
 declare const DEPTH_CONVERGENCE: string;
 declare const DESERTER: string;
 declare const DESKTOP_GAMMA: string;
 declare const DESTROY_GEM: string;
 declare const DISABLE: string;
 declare const DISABLE_ADDONS: string;
 declare const DISABLE_SPAM_FILTER: string;
 declare const DISGUISE: string;
 declare const DISHONORABLE_KILLS: string;
 declare const DISPELS: string;
 declare const DISPEL_AURA_COMBATLOG_TOOLTIP: string;
 declare const DISPLAY: string;
 declare const DISPLAY_ACTIVE_CHANNEL: string;
 declare const DISPLAY_CHANNEL_PULLOUT: string;
 declare const DISPLAY_FREE_BAG_SLOTS: string;
 declare const DISPLAY_LABEL: string;
 declare const DISPLAY_ON_CHARACTER: string;
 declare const DISPLAY_ON_CHAR_TOOLTIP: string;
 declare const DISPLAY_OPTIONS: string;
 declare const DISPLAY_SUBTEXT: string;
 declare const DK: string;
 declare const DMG: string;
 declare const DND: string;
 declare const DODGE: string;
 declare const DODGE_CHANCE: string;
 declare const DONE: string;
 declare const DONE_BY: string;
 declare const DONE_TO: string;
 declare const DPS_TEMPLATE: string;
 declare const DRAINS: string;
 declare const DRESSUP_FRAME: string;
 declare const DRESSUP_FRAME_INSTRUCTIONS: string;
 declare const DRUID_INTELLECT_TOOLTIP: string;
 declare const DRUNK_MESSAGE_ITEM_OTHER1: string;
 declare const DRUNK_MESSAGE_ITEM_OTHER2: string;
 declare const DRUNK_MESSAGE_ITEM_OTHER3: string;
 declare const DRUNK_MESSAGE_ITEM_OTHER4: string;
 declare const DRUNK_MESSAGE_ITEM_SELF1: string;
 declare const DRUNK_MESSAGE_ITEM_SELF2: string;
 declare const DRUNK_MESSAGE_ITEM_SELF3: string;
 declare const DRUNK_MESSAGE_ITEM_SELF4: string;
 declare const DRUNK_MESSAGE_OTHER1: string;
 declare const DRUNK_MESSAGE_OTHER2: string;
 declare const DRUNK_MESSAGE_OTHER3: string;
 declare const DRUNK_MESSAGE_OTHER4: string;
 declare const DRUNK_MESSAGE_SELF1: string;
 declare const DRUNK_MESSAGE_SELF2: string;
 declare const DRUNK_MESSAGE_SELF3: string;
 declare const DRUNK_MESSAGE_SELF4: string;
 declare const DUEL: string;
 declare const DUEL_COUNTDOWN: string;
 declare const DUEL_OUTOFBOUNDS_TIMER: string;
 declare const DUEL_REQUESTED: string;
 declare const DUEL_WINNER_KNOCKOUT: string;
 declare const DUEL_WINNER_RETREAT: string;
 declare const DUNGEONS_BUTTON: string;
 declare const DUNGEON_COMPLETED: string;
 declare const DUNGEON_DIFFICULTY: string;
 declare const DUNGEON_DIFFICULTY1: string;
 declare const DUNGEON_DIFFICULTY2: string;
 declare const DUNGEON_DIFFICULTY3: string;
 declare const DUNGEON_DIFFICULTY_5PLAYER: string;
 declare const DUNGEON_DIFFICULTY_5PLAYER_HEROIC: string;
 declare const DUNGEON_FLOOR_AHNKAHET1: string;
 declare const DUNGEON_FLOOR_AZJOLNERUB1: string;
 declare const DUNGEON_FLOOR_AZJOLNERUB2: string;
 declare const DUNGEON_FLOOR_AZJOLNERUB3: string;
 declare const DUNGEON_FLOOR_COTSTRATHOLME0: string;
 declare const DUNGEON_FLOOR_COTSTRATHOLME1: string;
 declare const DUNGEON_FLOOR_DALARAN1: string;
 declare const DUNGEON_FLOOR_DALARAN2: string;
 declare const DUNGEON_FLOOR_DRAKTHARONKEEP1: string;
 declare const DUNGEON_FLOOR_DRAKTHARONKEEP2: string;
 declare const DUNGEON_FLOOR_GUNDRAK1: string;
 declare const DUNGEON_FLOOR_HALLSOFLIGHTNING1: string;
 declare const DUNGEON_FLOOR_HALLSOFLIGHTNING2: string;
 declare const DUNGEON_FLOOR_HALLSOFREFLECTION1: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL1: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL2: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL3: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL4: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL5: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL6: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL7: string;
 declare const DUNGEON_FLOOR_ICECROWNCITADEL8: string;
 declare const DUNGEON_FLOOR_NAXXRAMAS1: string;
 declare const DUNGEON_FLOOR_NAXXRAMAS2: string;
 declare const DUNGEON_FLOOR_NAXXRAMAS3: string;
 declare const DUNGEON_FLOOR_NAXXRAMAS4: string;
 declare const DUNGEON_FLOOR_NAXXRAMAS5: string;
 declare const DUNGEON_FLOOR_NAXXRAMAS6: string;
 declare const DUNGEON_FLOOR_NEXUS801: string;
 declare const DUNGEON_FLOOR_NEXUS802: string;
 declare const DUNGEON_FLOOR_NEXUS803: string;
 declare const DUNGEON_FLOOR_NEXUS804: string;
 declare const DUNGEON_FLOOR_PITOFSARON1: string;
 declare const DUNGEON_FLOOR_THEARGENTCOLISEUM1: string;
 declare const DUNGEON_FLOOR_THEARGENTCOLISEUM2: string;
 declare const DUNGEON_FLOOR_THEEYEOFETERNITY1: string;
 declare const DUNGEON_FLOOR_THEFORGEOFSOULS1: string;
 declare const DUNGEON_FLOOR_THENEXUS1: string;
 declare const DUNGEON_FLOOR_THEOBSIDIANSANCTUM1: string;
 declare const DUNGEON_FLOOR_ULDUAR0: string;
 declare const DUNGEON_FLOOR_ULDUAR1: string;
 declare const DUNGEON_FLOOR_ULDUAR2: string;
 declare const DUNGEON_FLOOR_ULDUAR3: string;
 declare const DUNGEON_FLOOR_ULDUAR4: string;
 declare const DUNGEON_FLOOR_ULDUAR5: string;
 declare const DUNGEON_FLOOR_ULDUAR771: string;
 declare const DUNGEON_FLOOR_UTGARDEKEEP1: string;
 declare const DUNGEON_FLOOR_UTGARDEKEEP2: string;
 declare const DUNGEON_FLOOR_UTGARDEKEEP3: string;
 declare const DUNGEON_FLOOR_UTGARDEPINNACLE1: string;
 declare const DUNGEON_FLOOR_UTGARDEPINNACLE2: string;
 declare const DUNGEON_FLOOR_VAULTOFARCHAVON1: string;
 declare const DUNGEON_FLOOR_VIOLETHOLD1: string;
 declare const DUNGEON_GROUP_FOUND_TOOLTIP: string;
 declare const DUNGEON_NAME_WITH_DIFFICULTY: string;
 declare const DURABILITY: string;
 declare const DURABILITYDAMAGE_DEATH: string;
 declare const DURABILITY_ABBR: string;
 declare const DURABILITY_TEMPLATE: string;
 declare const DYNAMIC: string;
 declare const D_DAYS: string;
 declare const D_HOURS: string;
 declare const D_MINUTES: string;
 declare const D_SECONDS: string;
 declare const EDIT_TICKET: string;
 declare const EFFECTS_LABEL: string;
 declare const EFFECTS_SUBTEXT: string;
 declare const EJECT_PASSENGER: string;
 declare const ELITE: string;
 declare const EMBLEM_BACKGROUND: string;
 declare const EMBLEM_BORDER: string;
 declare const EMBLEM_BORDER_COLOR: string;
 declare const EMBLEM_SYMBOL: string;
 declare const EMBLEM_SYMBOL_COLOR: string;
 declare const EMOTE: string;
 declare const EMOTE100_CMD1: string;
 declare const EMOTE100_CMD2: string;
 declare const EMOTE101_CMD: string;
 declare const EMOTE101_CMD1: string;
 declare const EMOTE101_CMD2: string;
 declare const EMOTE101_CMD3: string;
 declare const EMOTE102_CMD1: string;
 declare const EMOTE102_CMD2: string;
 declare const EMOTE103_CMD1: string;
 declare const EMOTE103_CMD2: string;
 declare const EMOTE104_CMD1: string;
 declare const EMOTE104_CMD2: string;
 declare const EMOTE105_CMD1: string;
 declare const EMOTE105_CMD2: string;
 declare const EMOTE106_CMD1: string;
 declare const EMOTE106_CMD2: string;
 declare const EMOTE107_CMD1: string;
 declare const EMOTE107_CMD2: string;
 declare const EMOTE107_CMD3: string;
 declare const EMOTE108_CMD1: string;
 declare const EMOTE108_CMD2: string;
 declare const EMOTE109_CMD1: string;
 declare const EMOTE109_CMD2: string;
 declare const EMOTE109_CMD3: string;
 declare const EMOTE10_CMD1: string;
 declare const EMOTE10_CMD2: string;
 declare const EMOTE10_CMD3: string;
 declare const EMOTE10_CMD4: string;
 declare const EMOTE110_CMD1: string;
 declare const EMOTE110_CMD2: string;
 declare const EMOTE111_CMD1: string;
 declare const EMOTE111_CMD2: string;
 declare const EMOTE112_CMD1: string;
 declare const EMOTE112_CMD2: string;
 declare const EMOTE112_CMD3: string;
 declare const EMOTE112_CMD4: string;
 declare const EMOTE113_CMD1: string;
 declare const EMOTE113_CMD2: string;
 declare const EMOTE114_CMD1: string;
 declare const EMOTE114_CMD2: string;
 declare const EMOTE114_CMD3: string;
 declare const EMOTE115_CMD1: string;
 declare const EMOTE115_CMD2: string;
 declare const EMOTE116_CMD1: string;
 declare const EMOTE116_CMD2: string;
 declare const EMOTE117_CMD1: string;
 declare const EMOTE117_CMD2: string;
 declare const EMOTE118_CMD1: string;
 declare const EMOTE118_CMD2: string;
 declare const EMOTE119_CMD1: string;
 declare const EMOTE119_CMD2: string;
 declare const EMOTE11_CMD1: string;
 declare const EMOTE11_CMD2: string;
 declare const EMOTE120_CMD1: string;
 declare const EMOTE120_CMD2: string;
 declare const EMOTE121_CMD1: string;
 declare const EMOTE121_CMD2: string;
 declare const EMOTE122_CMD1: string;
 declare const EMOTE122_CMD2: string;
 declare const EMOTE123_CMD1: string;
 declare const EMOTE123_CMD2: string;
 declare const EMOTE123_CMD3: string;
 declare const EMOTE123_CMD4: string;
 declare const EMOTE124_CMD1: string;
 declare const EMOTE124_CMD2: string;
 declare const EMOTE125_CMD1: string;
 declare const EMOTE125_CMD2: string;
 declare const EMOTE126_CMD1: string;
 declare const EMOTE126_CMD2: string;
 declare const EMOTE126_CMD3: string;
 declare const EMOTE126_CMD4: string;
 declare const EMOTE127_CMD1: string;
 declare const EMOTE127_CMD2: string;
 declare const EMOTE127_CMD3: string;
 declare const EMOTE127_CMD4: string;
 declare const EMOTE128_CMD1: string;
 declare const EMOTE128_CMD2: string;
 declare const EMOTE129_CMD1: string;
 declare const EMOTE129_CMD2: string;
 declare const EMOTE12_CMD1: string;
 declare const EMOTE12_CMD2: string;
 declare const EMOTE130_CMD1: string;
 declare const EMOTE130_CMD2: string;
 declare const EMOTE130_CMD3: string;
 declare const EMOTE130_CMD4: string;
 declare const EMOTE131_CMD1: string;
 declare const EMOTE131_CMD2: string;
 declare const EMOTE132_CMD1: string;
 declare const EMOTE132_CMD2: string;
 declare const EMOTE133_CMD1: string;
 declare const EMOTE133_CMD2: string;
 declare const EMOTE134_CMD1: string;
 declare const EMOTE134_CMD2: string;
 declare const EMOTE135_CMD1: string;
 declare const EMOTE135_CMD2: string;
 declare const EMOTE136_CMD1: string;
 declare const EMOTE136_CMD2: string;
 declare const EMOTE136_CMD3: string;
 declare const EMOTE136_CMD4: string;
 declare const EMOTE137_CMD1: string;
 declare const EMOTE137_CMD2: string;
 declare const EMOTE138_CMD1: string;
 declare const EMOTE138_CMD2: string;
 declare const EMOTE139_CMD1: string;
 declare const EMOTE139_CMD2: string;
 declare const EMOTE13_CMD1: string;
 declare const EMOTE13_CMD2: string;
 declare const EMOTE13_CMD3: string;
 declare const EMOTE13_CMD4: string;
 declare const EMOTE140_CMD1: string;
 declare const EMOTE140_CMD2: string;
 declare const EMOTE141_CMD1: string;
 declare const EMOTE141_CMD2: string;
 declare const EMOTE142_CMD1: string;
 declare const EMOTE142_CMD2: string;
 declare const EMOTE143_CMD1: string;
 declare const EMOTE143_CMD2: string;
 declare const EMOTE144_CMD1: string;
 declare const EMOTE144_CMD2: string;
 declare const EMOTE145_CMD1: string;
 declare const EMOTE145_CMD2: string;
 declare const EMOTE146_CMD1: string;
 declare const EMOTE146_CMD2: string;
 declare const EMOTE147_CMD1: string;
 declare const EMOTE147_CMD2: string;
 declare const EMOTE148_CMD1: string;
 declare const EMOTE148_CMD2: string;
 declare const EMOTE149_CMD1: string;
 declare const EMOTE149_CMD2: string;
 declare const EMOTE14_CMD1: string;
 declare const EMOTE14_CMD2: string;
 declare const EMOTE150_CMD1: string;
 declare const EMOTE150_CMD2: string;
 declare const EMOTE151_CMD1: string;
 declare const EMOTE151_CMD2: string;
 declare const EMOTE152_CMD1: string;
 declare const EMOTE152_CMD2: string;
 declare const EMOTE153_CMD1: string;
 declare const EMOTE153_CMD2: string;
 declare const EMOTE154_CMD1: string;
 declare const EMOTE154_CMD2: string;
 declare const EMOTE155_CMD1: string;
 declare const EMOTE155_CMD2: string;
 declare const EMOTE156_CMD1: string;
 declare const EMOTE156_CMD2: string;
 declare const EMOTE157_CMD1: string;
 declare const EMOTE157_CMD2: string;
 declare const EMOTE158_CMD1: string;
 declare const EMOTE158_CMD2: string;
 declare const EMOTE159_CMD1: string;
 declare const EMOTE159_CMD2: string;
 declare const EMOTE15_CMD1: string;
 declare const EMOTE15_CMD2: string;
 declare const EMOTE160_CMD1: string;
 declare const EMOTE160_CMD2: string;
 declare const EMOTE161_CMD1: string;
 declare const EMOTE161_CMD2: string;
 declare const EMOTE162_CMD1: string;
 declare const EMOTE162_CMD2: string;
 declare const EMOTE163_CMD1: string;
 declare const EMOTE163_CMD2: string;
 declare const EMOTE164_CMD1: string;
 declare const EMOTE164_CMD2: string;
 declare const EMOTE165_CMD1: string;
 declare const EMOTE165_CMD2: string;
 declare const EMOTE166_CMD1: string;
 declare const EMOTE166_CMD2: string;
 declare const EMOTE167_CMD1: string;
 declare const EMOTE167_CMD2: string;
 declare const EMOTE168_CMD1: string;
 declare const EMOTE168_CMD2: string;
 declare const EMOTE169_CMD1: string;
 declare const EMOTE169_CMD2: string;
 declare const EMOTE16_CMD1: string;
 declare const EMOTE16_CMD2: string;
 declare const EMOTE170_CMD1: string;
 declare const EMOTE170_CMD2: string;
 declare const EMOTE171_CMD1: string;
 declare const EMOTE171_CMD2: string;
 declare const EMOTE17_CMD1: string;
 declare const EMOTE17_CMD2: string;
 declare const EMOTE18_CMD1: string;
 declare const EMOTE18_CMD2: string;
 declare const EMOTE18_CMD3: string;
 declare const EMOTE18_CMD4: string;
 declare const EMOTE19_CMD1: string;
 declare const EMOTE19_CMD2: string;
 declare const EMOTE19_CMD3: string;
 declare const EMOTE19_CMD4: string;
 declare const EMOTE19_CMD5: string;
 declare const EMOTE19_CMD6: string;
 declare const EMOTE1_CMD1: string;
 declare const EMOTE1_CMD2: string;
 declare const EMOTE20_CMD1: string;
 declare const EMOTE20_CMD2: string;
 declare const EMOTE21_CMD1: string;
 declare const EMOTE21_CMD2: string;
 declare const EMOTE21_CMD3: string;
 declare const EMOTE21_CMD4: string;
 declare const EMOTE22_CMD1: string;
 declare const EMOTE22_CMD2: string;
 declare const EMOTE22_CMD3: string;
 declare const EMOTE22_CMD4: string;
 declare const EMOTE22_CMD5: string;
 declare const EMOTE22_CMD6: string;
 declare const EMOTE23_CMD1: string;
 declare const EMOTE23_CMD2: string;
 declare const EMOTE24_CMD1: string;
 declare const EMOTE24_CMD2: string;
 declare const EMOTE25_CMD1: string;
 declare const EMOTE25_CMD2: string;
 declare const EMOTE26_CMD1: string;
 declare const EMOTE26_CMD2: string;
 declare const EMOTE26_CMD3: string;
 declare const EMOTE26_CMD4: string;
 declare const EMOTE26_CMD5: string;
 declare const EMOTE26_CMD6: string;
 declare const EMOTE27_CMD1: string;
 declare const EMOTE27_CMD2: string;
 declare const EMOTE28_CMD1: string;
 declare const EMOTE28_CMD2: string;
 declare const EMOTE29_CMD1: string;
 declare const EMOTE29_CMD2: string;
 declare const EMOTE29_CMD3: string;
 declare const EMOTE29_CMD4: string;
 declare const EMOTE2_CMD1: string;
 declare const EMOTE2_CMD2: string;
 declare const EMOTE304_CMD1: string;
 declare const EMOTE304_CMD3: string;
 declare const EMOTE304_CMD4: string;
 declare const EMOTE306_CMD1: string;
 declare const EMOTE306_CMD2: string;
 declare const EMOTE306_CMD3: string;
 declare const EMOTE306_CMD4: string;
 declare const EMOTE30_CMD1: string;
 declare const EMOTE30_CMD2: string;
 declare const EMOTE30_CMD3: string;
 declare const EMOTE30_CMD4: string;
 declare const EMOTE31_CMD1: string;
 declare const EMOTE31_CMD2: string;
 declare const EMOTE32_CMD1: string;
 declare const EMOTE32_CMD2: string;
 declare const EMOTE32_CMD3: string;
 declare const EMOTE32_CMD4: string;
 declare const EMOTE32_CMD5: string;
 declare const EMOTE32_CMD6: string;
 declare const EMOTE33_CMD1: string;
 declare const EMOTE33_CMD2: string;
 declare const EMOTE34_CMD1: string;
 declare const EMOTE34_CMD2: string;
 declare const EMOTE35_CMD1: string;
 declare const EMOTE35_CMD2: string;
 declare const EMOTE368_CMD1: string;
 declare const EMOTE368_CMD2: string;
 declare const EMOTE369_CMD1: string;
 declare const EMOTE369_CMD2: string;
 declare const EMOTE36_CMD1: string;
 declare const EMOTE36_CMD2: string;
 declare const EMOTE36_CMD3: string;
 declare const EMOTE36_CMD4: string;
 declare const EMOTE370_CMD1: string;
 declare const EMOTE370_CMD2: string;
 declare const EMOTE371_CMD1: string;
 declare const EMOTE371_CMD2: string;
 declare const EMOTE372_CMD1: string;
 declare const EMOTE372_CMD2: string;
 declare const EMOTE373_CMD1: string;
 declare const EMOTE373_CMD2: string;
 declare const EMOTE374_CMD1: string;
 declare const EMOTE374_CMD2: string;
 declare const EMOTE375_CMD1: string;
 declare const EMOTE375_CMD2: string;
 declare const EMOTE376_CMD1: string;
 declare const EMOTE376_CMD2: string;
 declare const EMOTE377_CMD1: string;
 declare const EMOTE377_CMD2: string;
 declare const EMOTE377_CMD3: string;
 declare const EMOTE377_CMD4: string;
 declare const EMOTE37_CMD1: string;
 declare const EMOTE37_CMD2: string;
 declare const EMOTE380_CMD1: string;
 declare const EMOTE380_CMD2: string;
 declare const EMOTE381_CMD1: string;
 declare const EMOTE381_CMD2: string;
 declare const EMOTE382_CMD1: string;
 declare const EMOTE382_CMD2: string;
 declare const EMOTE383_CMD1: string;
 declare const EMOTE383_CMD2: string;
 declare const EMOTE384_CMD1: string;
 declare const EMOTE384_CMD2: string;
 declare const EMOTE384_CMD3: string;
 declare const EMOTE384_CMD4: string;
 declare const EMOTE385_CMD1: string;
 declare const EMOTE385_CMD2: string;
 declare const EMOTE385_CMD3: string;
 declare const EMOTE385_CMD4: string;
 declare const EMOTE386_CMD1: string;
 declare const EMOTE386_CMD2: string;
 declare const EMOTE387_CMD1: string;
 declare const EMOTE387_CMD2: string;
 declare const EMOTE389_CMD1: string;
 declare const EMOTE389_CMD2: string;
 declare const EMOTE38_CMD1: string;
 declare const EMOTE38_CMD2: string;
 declare const EMOTE38_CMD3: string;
 declare const EMOTE38_CMD4: string;
 declare const EMOTE38_CMD5: string;
 declare const EMOTE38_CMD6: string;
 declare const EMOTE390_CMD1: string;
 declare const EMOTE390_CMD2: string;
 declare const EMOTE390_CMD3: string;
 declare const EMOTE390_CMD4: string;
 declare const EMOTE391_CMD1: string;
 declare const EMOTE391_CMD2: string;
 declare const EMOTE392_CMD1: string;
 declare const EMOTE392_CMD2: string;
 declare const EMOTE393_CMD1: string;
 declare const EMOTE393_CMD2: string;
 declare const EMOTE394_CMD1: string;
 declare const EMOTE394_CMD2: string;
 declare const EMOTE395_CMD1: string;
 declare const EMOTE395_CMD2: string;
 declare const EMOTE396_CMD1: string;
 declare const EMOTE396_CMD2: string;
 declare const EMOTE398_CMD1: string;
 declare const EMOTE398_CMD2: string;
 declare const EMOTE399_CMD1: string;
 declare const EMOTE399_CMD2: string;
 declare const EMOTE39_CMD1: string;
 declare const EMOTE39_CMD2: string;
 declare const EMOTE3_CMD1: string;
 declare const EMOTE3_CMD2: string;
 declare const EMOTE3_CMD3: string;
 declare const EMOTE3_CMD4: string;
 declare const EMOTE401_CMD1: string;
 declare const EMOTE401_CMD2: string;
 declare const EMOTE402_CMD1: string;
 declare const EMOTE402_CMD2: string;
 declare const EMOTE403_CMD1: string;
 declare const EMOTE403_CMD2: string;
 declare const EMOTE404_CMD1: string;
 declare const EMOTE404_CMD2: string;
 declare const EMOTE405_CMD1: string;
 declare const EMOTE405_CMD2: string;
 declare const EMOTE406_CMD1: string;
 declare const EMOTE406_CMD2: string;
 declare const EMOTE407_CMD1: string;
 declare const EMOTE407_CMD2: string;
 declare const EMOTE408_CMD1: string;
 declare const EMOTE408_CMD2: string;
 declare const EMOTE409_CMD1: string;
 declare const EMOTE409_CMD2: string;
 declare const EMOTE40_CMD1: string;
 declare const EMOTE40_CMD2: string;
 declare const EMOTE410_CMD1: string;
 declare const EMOTE410_CMD2: string;
 declare const EMOTE411_CMD1: string;
 declare const EMOTE411_CMD2: string;
 declare const EMOTE413_CMD1: string;
 declare const EMOTE413_CMD2: string;
 declare const EMOTE414_CMD1: string;
 declare const EMOTE414_CMD2: string;
 declare const EMOTE415_CMD1: string;
 declare const EMOTE415_CMD2: string;
 declare const EMOTE416_CMD1: string;
 declare const EMOTE416_CMD2: string;
 declare const EMOTE417_CMD1: string;
 declare const EMOTE417_CMD2: string;
 declare const EMOTE418_CMD1: string;
 declare const EMOTE418_CMD2: string;
 declare const EMOTE41_CMD1: string;
 declare const EMOTE41_CMD2: string;
 declare const EMOTE41_CMD3: string;
 declare const EMOTE41_CMD4: string;
 declare const EMOTE420_CMD1: string;
 declare const EMOTE420_CMD2: string;
 declare const EMOTE421_CMD1: string;
 declare const EMOTE421_CMD2: string;
 declare const EMOTE421_CMD3: string;
 declare const EMOTE421_CMD4: string;
 declare const EMOTE422_CMD1: string;
 declare const EMOTE422_CMD2: string;
 declare const EMOTE423_CMD1: string;
 declare const EMOTE423_CMD2: string;
 declare const EMOTE424_CMD1: string;
 declare const EMOTE424_CMD2: string;
 declare const EMOTE425_CMD1: string;
 declare const EMOTE425_CMD2: string;
 declare const EMOTE426_CMD1: string;
 declare const EMOTE426_CMD2: string;
 declare const EMOTE427_CMD1: string;
 declare const EMOTE427_CMD2: string;
 declare const EMOTE428_CMD1: string;
 declare const EMOTE428_CMD2: string;
 declare const EMOTE428_CMD3: string;
 declare const EMOTE428_CMD4: string;
 declare const EMOTE429_CMD1: string;
 declare const EMOTE429_CMD2: string;
 declare const EMOTE42_CMD1: string;
 declare const EMOTE42_CMD2: string;
 declare const EMOTE42_CMD3: string;
 declare const EMOTE42_CMD4: string;
 declare const EMOTE430_CMD1: string;
 declare const EMOTE430_CMD2: string;
 declare const EMOTE431_CMD1: string;
 declare const EMOTE431_CMD2: string;
 declare const EMOTE432_CMD1: string;
 declare const EMOTE432_CMD2: string;
 declare const EMOTE432_CMD3: string;
 declare const EMOTE432_CMD4: string;
 declare const EMOTE433_CMD1: string;
 declare const EMOTE433_CMD2: string;
 declare const EMOTE434_CMD1: string;
 declare const EMOTE434_CMD2: string;
 declare const EMOTE435_CMD1: string;
 declare const EMOTE435_CMD2: string;
 declare const EMOTE436_CMD1: string;
 declare const EMOTE436_CMD2: string;
 declare const EMOTE437_CMD1: string;
 declare const EMOTE437_CMD2: string;
 declare const EMOTE438_CMD1: string;
 declare const EMOTE438_CMD2: string;
 declare const EMOTE43_CMD1: string;
 declare const EMOTE43_CMD2: string;
 declare const EMOTE43_CMD3: string;
 declare const EMOTE43_CMD4: string;
 declare const EMOTE43_CMD5: string;
 declare const EMOTE43_CMD6: string;
 declare const EMOTE440_CMD1: string;
 declare const EMOTE440_CMD2: string;
 declare const EMOTE441_CMD1: string;
 declare const EMOTE441_CMD2: string;
 declare const EMOTE442_CMD1: string;
 declare const EMOTE442_CMD2: string;
 declare const EMOTE443_CMD1: string;
 declare const EMOTE443_CMD2: string;
 declare const EMOTE444_CMD1: string;
 declare const EMOTE444_CMD2: string;
 declare const EMOTE445_CMD1: string;
 declare const EMOTE445_CMD2: string;
 declare const EMOTE446_CMD1: string;
 declare const EMOTE446_CMD2: string;
 declare const EMOTE447_CMD1: string;
 declare const EMOTE447_CMD2: string;
 declare const EMOTE448_CMD1: string;
 declare const EMOTE448_CMD2: string;
 declare const EMOTE449_CMD1: string;
 declare const EMOTE449_CMD2: string;
 declare const EMOTE44_CMD1: string;
 declare const EMOTE44_CMD2: string;
 declare const EMOTE44_CMD3: string;
 declare const EMOTE450_CMD1: string;
 declare const EMOTE450_CMD2: string;
 declare const EMOTE450_CMD3: string;
 declare const EMOTE450_CMD4: string;
 declare const EMOTE450_CMD5: string;
 declare const EMOTE450_CMD6: string;
 declare const EMOTE451_CMD1: string;
 declare const EMOTE451_CMD2: string;
 declare const EMOTE452_CMD1: string;
 declare const EMOTE452_CMD2: string;
 declare const EMOTE45_CMD1: string;
 declare const EMOTE45_CMD2: string;
 declare const EMOTE46_CMD1: string;
 declare const EMOTE46_CMD2: string;
 declare const EMOTE47_CMD1: string;
 declare const EMOTE47_CMD2: string;
 declare const EMOTE48_CMD1: string;
 declare const EMOTE48_CMD2: string;
 declare const EMOTE49_CMD1: string;
 declare const EMOTE49_CMD2: string;
 declare const EMOTE49_CMD3: string;
 declare const EMOTE49_CMD4: string;
 declare const EMOTE4_CMD1: string;
 declare const EMOTE4_CMD2: string;
 declare const EMOTE4_CMD3: string;
 declare const EMOTE4_CMD4: string;
 declare const EMOTE50_CMD1: string;
 declare const EMOTE50_CMD2: string;
 declare const EMOTE50_CMD3: string;
 declare const EMOTE50_CMD4: string;
 declare const EMOTE50_CMD5: string;
 declare const EMOTE50_CMD6: string;
 declare const EMOTE51_CMD1: string;
 declare const EMOTE51_CMD2: string;
 declare const EMOTE52_CMD1: string;
 declare const EMOTE52_CMD2: string;
 declare const EMOTE52_CMD3: string;
 declare const EMOTE52_CMD4: string;
 declare const EMOTE53_CMD1: string;
 declare const EMOTE53_CMD2: string;
 declare const EMOTE54_CMD1: string;
 declare const EMOTE54_CMD2: string;
 declare const EMOTE55_CMD1: string;
 declare const EMOTE55_CMD2: string;
 declare const EMOTE55_CMD3: string;
 declare const EMOTE55_CMD4: string;
 declare const EMOTE55_CMD5: string;
 declare const EMOTE55_CMD6: string;
 declare const EMOTE56_CMD1: string;
 declare const EMOTE56_CMD2: string;
 declare const EMOTE56_CMD3: string;
 declare const EMOTE56_CMD4: string;
 declare const EMOTE57_CMD1: string;
 declare const EMOTE57_CMD2: string;
 declare const EMOTE58_CMD1: string;
 declare const EMOTE58_CMD2: string;
 declare const EMOTE58_CMD3: string;
 declare const EMOTE58_CMD4: string;
 declare const EMOTE58_CMD5: string;
 declare const EMOTE58_CMD6: string;
 declare const EMOTE59_CMD1: string;
 declare const EMOTE59_CMD2: string;
 declare const EMOTE59_CMD3: string;
 declare const EMOTE59_CMD4: string;
 declare const EMOTE5_CMD1: string;
 declare const EMOTE5_CMD2: string;
 declare const EMOTE5_CMD3: string;
 declare const EMOTE5_CMD4: string;
 declare const EMOTE5_CMD5: string;
 declare const EMOTE5_CMD6: string;
 declare const EMOTE60_CMD1: string;
 declare const EMOTE60_CMD2: string;
 declare const EMOTE60_CMD3: string;
 declare const EMOTE61_CMD1: string;
 declare const EMOTE61_CMD2: string;
 declare const EMOTE61_CMD3: string;
 declare const EMOTE61_CMD4: string;
 declare const EMOTE62_CMD1: string;
 declare const EMOTE62_CMD2: string;
 declare const EMOTE62_CMD3: string;
 declare const EMOTE62_CMD4: string;
 declare const EMOTE62_CMD5: string;
 declare const EMOTE62_CMD6: string;
 declare const EMOTE62_CMD7: string;
 declare const EMOTE62_CMD8: string;
 declare const EMOTE63_CMD1: string;
 declare const EMOTE63_CMD2: string;
 declare const EMOTE64_CMD1: string;
 declare const EMOTE64_CMD2: string;
 declare const EMOTE65_CMD1: string;
 declare const EMOTE65_CMD2: string;
 declare const EMOTE66_CMD1: string;
 declare const EMOTE66_CMD2: string;
 declare const EMOTE67_CMD1: string;
 declare const EMOTE67_CMD2: string;
 declare const EMOTE68_CMD1: string;
 declare const EMOTE68_CMD2: string;
 declare const EMOTE68_CMD3: string;
 declare const EMOTE68_CMD4: string;
 declare const EMOTE69_CMD1: string;
 declare const EMOTE69_CMD2: string;
 declare const EMOTE69_CMD3: string;
 declare const EMOTE69_CMD4: string;
 declare const EMOTE6_CMD1: string;
 declare const EMOTE6_CMD2: string;
 declare const EMOTE70_CMD1: string;
 declare const EMOTE70_CMD2: string;
 declare const EMOTE71_CMD1: string;
 declare const EMOTE71_CMD2: string;
 declare const EMOTE72_CMD1: string;
 declare const EMOTE72_CMD2: string;
 declare const EMOTE73_CMD1: string;
 declare const EMOTE73_CMD2: string;
 declare const EMOTE74_CMD1: string;
 declare const EMOTE74_CMD2: string;
 declare const EMOTE75_CMD1: string;
 declare const EMOTE75_CMD2: string;
 declare const EMOTE76_CMD1: string;
 declare const EMOTE76_CMD2: string;
 declare const EMOTE76_CMD3: string;
 declare const EMOTE76_CMD4: string;
 declare const EMOTE77_CMD1: string;
 declare const EMOTE77_CMD2: string;
 declare const EMOTE78_CMD1: string;
 declare const EMOTE78_CMD2: string;
 declare const EMOTE79_CMD1: string;
 declare const EMOTE79_CMD2: string;
 declare const EMOTE7_CMD1: string;
 declare const EMOTE7_CMD2: string;
 declare const EMOTE80_CMD1: string;
 declare const EMOTE80_CMD2: string;
 declare const EMOTE80_CMD3: string;
 declare const EMOTE80_CMD4: string;
 declare const EMOTE80_CMD5: string;
 declare const EMOTE80_CMD6: string;
 declare const EMOTE81_CMD1: string;
 declare const EMOTE81_CMD2: string;
 declare const EMOTE82_CMD1: string;
 declare const EMOTE82_CMD2: string;
 declare const EMOTE82_CMD3: string;
 declare const EMOTE82_CMD4: string;
 declare const EMOTE83_CMD1: string;
 declare const EMOTE83_CMD2: string;
 declare const EMOTE83_CMD3: string;
 declare const EMOTE84_CMD1: string;
 declare const EMOTE84_CMD2: string;
 declare const EMOTE85_CMD1: string;
 declare const EMOTE85_CMD2: string;
 declare const EMOTE86_CMD1: string;
 declare const EMOTE86_CMD2: string;
 declare const EMOTE87_CMD1: string;
 declare const EMOTE87_CMD2: string;
 declare const EMOTE88_CMD1: string;
 declare const EMOTE88_CMD2: string;
 declare const EMOTE89_CMD1: string;
 declare const EMOTE89_CMD2: string;
 declare const EMOTE8_CMD1: string;
 declare const EMOTE8_CMD2: string;
 declare const EMOTE90_CMD1: string;
 declare const EMOTE90_CMD2: string;
 declare const EMOTE91_CMD1: string;
 declare const EMOTE91_CMD2: string;
 declare const EMOTE92_CMD1: string;
 declare const EMOTE92_CMD2: string;
 declare const EMOTE93_CMD1: string;
 declare const EMOTE93_CMD2: string;
 declare const EMOTE94_CMD1: string;
 declare const EMOTE94_CMD2: string;
 declare const EMOTE95_CMD1: string;
 declare const EMOTE95_CMD2: string;
 declare const EMOTE95_CMD3: string;
 declare const EMOTE95_CMD4: string;
 declare const EMOTE96_CMD1: string;
 declare const EMOTE96_CMD2: string;
 declare const EMOTE96_CMD3: string;
 declare const EMOTE96_CMD4: string;
 declare const EMOTE97_CMD1: string;
 declare const EMOTE97_CMD2: string;
 declare const EMOTE98_CMD1: string;
 declare const EMOTE98_CMD2: string;
 declare const EMOTE98_CMD3: string;
 declare const EMOTE98_CMD4: string;
 declare const EMOTE98_CMD5: string;
 declare const EMOTE98_CMD6: string;
 declare const EMOTE99_CMD1: string;
 declare const EMOTE99_CMD2: string;
 declare const EMOTE99_CMD3: string;
 declare const EMOTE99_CMD4: string;
 declare const EMOTE99_CMD5: string;
 declare const EMOTE99_CMD6: string;
 declare const EMOTE99_CMD7: string;
 declare const EMOTE99_CMD8: string;
 declare const EMOTE9_CMD1: string;
 declare const EMOTE9_CMD2: string;
 declare const EMOTE_MESSAGE: string;
 declare const EMOTE_STATE_KNEEL: string;
 declare const EMPTY: string;
 declare const EMPTY_SOCKET: string;
 declare const EMPTY_SOCKET_BLUE: string;
 declare const EMPTY_SOCKET_META: string;
 declare const EMPTY_SOCKET_NO_COLOR: string;
 declare const EMPTY_SOCKET_RED: string;
 declare const EMPTY_SOCKET_YELLOW: string;
 declare const EMPTY_STABLE_SLOT: string;
 declare const ENABLE: string;
 declare const ENABLE_ALL_SHADERS: string;
 declare const ENABLE_AMBIENCE: string;
 declare const ENABLE_BGSOUND: string;
 declare const ENABLE_DSP_EFFECTS: string;
 declare const ENABLE_EMOTE_SOUNDS: string;
 declare const ENABLE_ERROR_SPEECH: string;
 declare const ENABLE_GROUP_SPEECH: string;
 declare const ENABLE_HARDWARE: string;
 declare const ENABLE_MICROPHONE: string;
 declare const ENABLE_MUSIC: string;
 declare const ENABLE_MUSIC_LOOPING: string;
 declare const ENABLE_PET_SOUNDS: string;
 declare const ENABLE_REVERB: string;
 declare const ENABLE_SOFTWARE_HRTF: string;
 declare const ENABLE_SOUND: string;
 declare const ENABLE_SOUNDFX: string;
 declare const ENABLE_SOUND_AT_CHARACTER: string;
 declare const ENABLE_STEREO_VIDEO: string;
 declare const ENABLE_TUTORIAL_TEXT: string;
 declare const ENABLE_VOICECHAT: string;
 declare const ENCHANTS: string;
 declare const ENCHANT_AURA_COMBATLOG_TOOLTIP: string;
 declare const ENCHANT_CONDITION_AND: string;
 declare const ENCHANT_CONDITION_EQUAL_COMPARE: string;
 declare const ENCHANT_CONDITION_EQUAL_VALUE: string;
 declare const ENCHANT_CONDITION_LESS_VALUE: string;
 declare const ENCHANT_CONDITION_MORE_COMPARE: string;
 declare const ENCHANT_CONDITION_MORE_EQUAL_COMPARE: string;
 declare const ENCHANT_CONDITION_MORE_VALUE: string;
 declare const ENCHANT_CONDITION_NOT_EQUAL_COMPARE: string;
 declare const ENCHANT_CONDITION_NOT_EQUAL_VALUE: string;
 declare const ENCHANT_CONDITION_REQUIRES: string;
 declare const ENCHANT_ITEM_MIN_SKILL: string;
 declare const ENCHANT_ITEM_REQ_LEVEL: string;
 declare const ENCHANT_ITEM_REQ_SKILL: string;
 declare const ENCHANT_SLOT: string;
 declare const ENCHSLOT_2HWEAPON: string;
 declare const ENCHSLOT_WEAPON: string;
 declare const ENCLOSED_MONEY: string;
 declare const ENCN: string;
 declare const ENCRYPTED: string;
 declare const END_BOUND_TRADEABLE: string;
 declare const END_REFUND: string;
 declare const ENEMY: string;
 declare const ENERGY: string;
 declare const ENERGY_COST: string;
 declare const ENERGY_COST_PER_TIME: string;
 declare const ENGB: string;
 declare const ENSCRIBE: string;
 declare const ENTERING_COMBAT: string;
 declare const ENTER_BATTLE: string;
 declare const ENTER_CODE: string;
 declare const ENTER_DUNGEON: string;
 declare const ENTER_FILTER_NAME: string;
 declare const ENTER_INVITE_NOTE: string;
 declare const ENTER_MACRO_LABEL: string;
 declare const ENTER_NAME_OR_EMAIL: string;
 declare const ENTIRE_LINE: string;
 declare const ENTIRE_LINE_COMBATLOG_TOOLTIP: string;
 declare const ENTW: string;
 declare const ENUS: string;
 declare const ENVIRONMENTAL_DAMAGE: string;
 declare const ENVIRONMENTAL_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const ENVIRONMENT_DETAIL: string;
 declare const EQUIPMENT_MANAGER: string;
 declare const EQUIPMENT_MANAGER_BAGS_FULL: string;
 declare const EQUIPMENT_MANAGER_COMBAT_SWAP: string;
 declare const EQUIPMENT_MANAGER_IGNORE_SLOT: string;
 declare const EQUIPMENT_MANAGER_IS_DISABLED: string;
 declare const EQUIPMENT_MANAGER_ITEMS_MISSING_TOOLTIP: string;
 declare const EQUIPMENT_MANAGER_MISSING_ITEM: string;
 declare const EQUIPMENT_MANAGER_PLACE_IN_BAGS: string;
 declare const EQUIPMENT_MANAGER_UNIGNORE_SLOT: string;
 declare const EQUIPMENT_SETS: string;
 declare const EQUIPMENT_SETS_TOO_MANY: string;
 declare const EQUIPSET_EQUIP: string;
 declare const EQUIP_CONTAINER: string;
 declare const EQUIP_NO_DROP: string;
 declare const ERRORS: string;
 declare const ERROR_CANNOT_BIND: string;
 declare const ERROR_CAPS: string;
 declare const ERROR_SLASH_CHANGEACTIONBAR: string;
 declare const ERROR_SLASH_EQUIP_TO_SLOT: string;
 declare const ERROR_SLASH_LOOT_SETTHRESHOLD: string;
 declare const ERROR_SLASH_SWAPACTIONBAR: string;
 declare const ERROR_SLASH_TEAM_CAPTAIN: string;
 declare const ERROR_SLASH_TEAM_DISBAND: string;
 declare const ERROR_SLASH_TEAM_INVITE: string;
 declare const ERROR_SLASH_TEAM_QUIT: string;
 declare const ERROR_SLASH_TEAM_UNINVITE: string;
 declare const ERR_2HANDED_EQUIPPED: string;
 declare const ERR_2HSKILLNOTFOUND: string;
 declare const ERR_ABILITY_COOLDOWN: string;
 declare const ERR_ACHIEVEMENT_WATCH_COMPLETED: string;
 declare const ERR_ALREADY_INVITED_TO_ARENA_TEAM_S: string;
 declare const ERR_ALREADY_INVITED_TO_GUILD_S: string;
 declare const ERR_ALREADY_IN_ARENA_TEAM: string;
 declare const ERR_ALREADY_IN_ARENA_TEAM_S: string;
 declare const ERR_ALREADY_IN_GROUP_S: string;
 declare const ERR_ALREADY_IN_GUILD: string;
 declare const ERR_ALREADY_IN_GUILD_S: string;
 declare const ERR_ALREADY_PICKPOCKETED: string;
 declare const ERR_ALREADY_QUEUED_FOR_SOMETHING_ELSE: string;
 declare const ERR_ALREADY_TRADING: string;
 declare const ERR_AMMO_ONLY: string;
 declare const ERR_APPROACHING_NO_PLAY_TIME: string;
 declare const ERR_APPROACHING_NO_PLAY_TIME_2: string;
 declare const ERR_APPROACHING_PARTIAL_PLAY_TIME: string;
 declare const ERR_APPROACHING_PARTIAL_PLAY_TIME_2: string;
 declare const ERR_ARENA_EXPIRED_CAIS: string;
 declare const ERR_ARENA_NO_TEAM_II: string;
 declare const ERR_ARENA_TEAMS_LOCKED: string;
 declare const ERR_ARENA_TEAM_CHANGE_FAILED_QUEUED: string;
 declare const ERR_ARENA_TEAM_CREATE_S: string;
 declare const ERR_ARENA_TEAM_DISBANDED_S: string;
 declare const ERR_ARENA_TEAM_FOUNDER_S: string;
 declare const ERR_ARENA_TEAM_INTERNAL: string;
 declare const ERR_ARENA_TEAM_INVITE_SS: string;
 declare const ERR_ARENA_TEAM_JOIN_SS: string;
 declare const ERR_ARENA_TEAM_LEADER_CHANGED_SSS: string;
 declare const ERR_ARENA_TEAM_LEADER_IS_SS: string;
 declare const ERR_ARENA_TEAM_LEADER_LEAVE_S: string;
 declare const ERR_ARENA_TEAM_LEAVE_SS: string;
 declare const ERR_ARENA_TEAM_LEVEL_TOO_LOW_I: string;
 declare const ERR_ARENA_TEAM_NAME_EXISTS_S: string;
 declare const ERR_ARENA_TEAM_NAME_INVALID: string;
 declare const ERR_ARENA_TEAM_NOT_ALLIED: string;
 declare const ERR_ARENA_TEAM_NOT_FOUND: string;
 declare const ERR_ARENA_TEAM_PARTY_SIZE: string;
 declare const ERR_ARENA_TEAM_PERMISSIONS: string;
 declare const ERR_ARENA_TEAM_PLAYER_NOT_FOUND_S: string;
 declare const ERR_ARENA_TEAM_PLAYER_NOT_IN_TEAM: string;
 declare const ERR_ARENA_TEAM_PLAYER_NOT_IN_TEAM_SS: string;
 declare const ERR_ARENA_TEAM_QUIT_S: string;
 declare const ERR_ARENA_TEAM_REMOVE_SSS: string;
 declare const ERR_ARENA_TEAM_TARGET_TOO_HIGH_S: string;
 declare const ERR_ARENA_TEAM_TARGET_TOO_LOW_S: string;
 declare const ERR_ARENA_TEAM_TOO_MANY_MEMBERS_S: string;
 declare const ERR_ARENA_TEAM_YOU_JOIN_S: string;
 declare const ERR_ATTACK_CHANNEL: string;
 declare const ERR_ATTACK_CHARMED: string;
 declare const ERR_ATTACK_CONFUSED: string;
 declare const ERR_ATTACK_DEAD: string;
 declare const ERR_ATTACK_FLEEING: string;
 declare const ERR_ATTACK_MOUNTED: string;
 declare const ERR_ATTACK_PACIFIED: string;
 declare const ERR_ATTACK_PREVENTED_BY_MECHANIC_S: string;
 declare const ERR_ATTACK_STUNNED: string;
 declare const ERR_AUCTION_BAG: string;
 declare const ERR_AUCTION_BID_INCREMENT: string;
 declare const ERR_AUCTION_BID_OWN: string;
 declare const ERR_AUCTION_BID_PLACED: string;
 declare const ERR_AUCTION_BOUND_ITEM: string;
 declare const ERR_AUCTION_CONJURED_ITEM: string;
 declare const ERR_AUCTION_DATABASE_ERROR: string;
 declare const ERR_AUCTION_ENOUGH_ITEMS: string;
 declare const ERR_AUCTION_EXPIRED_S: string;
 declare const ERR_AUCTION_HIGHER_BID: string;
 declare const ERR_AUCTION_HOUSE_DISABLED: string;
 declare const ERR_AUCTION_LIMITED_DURATION_ITEM: string;
 declare const ERR_AUCTION_LOOT_ITEM: string;
 declare const ERR_AUCTION_MIN_BID: string;
 declare const ERR_AUCTION_OUTBID_S: string;
 declare const ERR_AUCTION_QUEST_ITEM: string;
 declare const ERR_AUCTION_REMOVED: string;
 declare const ERR_AUCTION_REMOVED_S: string;
 declare const ERR_AUCTION_REPAIR_ITEM: string;
 declare const ERR_AUCTION_SOLD_S: string;
 declare const ERR_AUCTION_STARTED: string;
 declare const ERR_AUCTION_USED_CHARGES: string;
 declare const ERR_AUCTION_WON_S: string;
 declare const ERR_AUCTION_WRAPPED_ITEM: string;
 declare const ERR_AUTOFOLLOW_TOO_FAR: string;
 declare const ERR_AUTOLOOT_MONEY_S: string;
 declare const ERR_BADATTACKFACING: string;
 declare const ERR_BADATTACKPOS: string;
 declare const ERR_BAD_ON_USE_ENCHANT: string;
 declare const ERR_BAD_PLAYER_NAME_S: string;
 declare const ERR_BAG_FULL: string;
 declare const ERR_BAG_IN_BAG: string;
 declare const ERR_BANKSLOT_FAILED_TOO_MANY: string;
 declare const ERR_BANKSLOT_INSUFFICIENT_FUNDS: string;
 declare const ERR_BANKSLOT_NOTBANKER: string;
 declare const ERR_BANK_FULL: string;
 declare const ERR_BATTLEDGROUND_QUEUED_FOR_RATED: string;
 declare const ERR_BATTLEGROUND_ALREADY_IN: string;
 declare const ERR_BATTLEGROUND_CANNOT_QUEUE_FOR_RATED: string;
 declare const ERR_BATTLEGROUND_INFO_THROTTLED: string;
 declare const ERR_BATTLEGROUND_JOIN_FAILED: string;
 declare const ERR_BATTLEGROUND_JOIN_RANGE_INDEX: string;
 declare const ERR_BATTLEGROUND_JOIN_TIMED_OUT: string;
 declare const ERR_BATTLEGROUND_NOT_IN_BATTLEGROUND: string;
 declare const ERR_BATTLEGROUND_NOT_IN_TEAM: string;
 declare const ERR_BATTLEGROUND_TEAM_LEFT_QUEUE: string;
 declare const ERR_BATTLEGROUND_TOO_MANY_QUEUES: string;
 declare const ERR_BG_PLAYER_JOINED_SS: string;
 declare const ERR_BG_PLAYER_LEFT_S: string;
 declare const ERR_BN_BROADCAST_THROTTLE: string;
 declare const ERR_BN_FRIEND_ALREADY: string;
 declare const ERR_BN_FRIEND_BLOCKED: string;
 declare const ERR_BN_FRIEND_REQUEST_SENT: string;
 declare const ERR_BN_FRIEND_SELF: string;
 declare const ERR_BUTTON_LOCKED: string;
 declare const ERR_CANNOTCREATEDIRECTORY: string;
 declare const ERR_CANNOTCREATEFILE: string;
 declare const ERR_CANNOT_IGNORE_BN_FRIEND: string;
 declare const ERR_CANTATTACK_NOTSTANDING: string;
 declare const ERR_CANT_DO_THAT_IN_A_GROUP: string;
 declare const ERR_CANT_DO_THAT_WHILE_LFM: string;
 declare const ERR_CANT_EQUIP_EVER: string;
 declare const ERR_CANT_EQUIP_LEVEL_I: string;
 declare const ERR_CANT_EQUIP_NEED_TALENT: string;
 declare const ERR_CANT_EQUIP_RANK: string;
 declare const ERR_CANT_EQUIP_RATING: string;
 declare const ERR_CANT_EQUIP_REPUTATION: string;
 declare const ERR_CANT_EQUIP_SKILL: string;
 declare const ERR_CANT_INTERACT_SHAPESHIFTED: string;
 declare const ERR_CANT_SPEAK_LANGAGE: string;
 declare const ERR_CANT_STACK: string;
 declare const ERR_CANT_SWAP: string;
 declare const ERR_CANT_USE_DISARMED: string;
 declare const ERR_CANT_USE_ITEM: string;
 declare const ERR_CANT_USE_ITEM_IN_ARENA: string;
 declare const ERR_CANT_WRAP_BAGS: string;
 declare const ERR_CANT_WRAP_BOUND: string;
 declare const ERR_CANT_WRAP_EQUIPPED: string;
 declare const ERR_CANT_WRAP_STACKABLE: string;
 declare const ERR_CANT_WRAP_UNIQUE: string;
 declare const ERR_CANT_WRAP_WRAPPED: string;
 declare const ERR_CHAT_PLAYER_AMBIGUOUS_S: string;
 declare const ERR_CHAT_PLAYER_NOT_FOUND_S: string;
 declare const ERR_CHAT_RESTRICTED: string;
 declare const ERR_CHAT_THROTTLED: string;
 declare const ERR_CHAT_WHILE_DEAD: string;
 declare const ERR_CHAT_WRONG_FACTION: string;
 declare const ERR_CHEST_IN_USE: string;
 declare const ERR_CLICK_ON_ITEM_TO_FEED: string;
 declare const ERR_CLIENT_LOCKED_OUT: string;
 declare const ERR_COMBAT_DAMAGE_SSI: string;
 declare const ERR_COMMAND_NEEDS_TARGET: string;
 declare const ERR_COMPLAINT_IN_SAME_GUILD: string;
 declare const ERR_COMSAT_CONNECT_FAIL: string;
 declare const ERR_COMSAT_DISCONNECT: string;
 declare const ERR_COMSAT_RECONNECT_ATTEMPT: string;
 declare const ERR_CORPSE_IS_NOT_IN_INSTANCE: string;
 declare const ERR_CURRENCY_FULL: string;
 declare const ERR_DANCE_CREATE_DUPLICATE: string;
 declare const ERR_DANCE_DELETE_FAILED: string;
 declare const ERR_DANCE_SAVE_FAILED: string;
 declare const ERR_DEATHBINDALREADYBOUND: string;
 declare const ERR_DEATHBIND_SUCCESS_S: string;
 declare const ERR_DECLINE_GROUP_S: string;
 declare const ERR_DESTROY_NONEMPTY_BAG: string;
 declare const ERR_DIFFICULTY_CHANGE_ALREADY_STARTED: string;
 declare const ERR_DIFFICULTY_CHANGE_COMBAT: string;
 declare const ERR_DIFFICULTY_CHANGE_COOLDOWN_S: string;
 declare const ERR_DIFFICULTY_CHANGE_ENCOUNTER: string;
 declare const ERR_DIFFICULTY_CHANGE_PLAYER_BUSY: string;
 declare const ERR_DIFFICULTY_CHANGE_WORLDSTATE: string;
 declare const ERR_DISMOUNT_NOPET: string;
 declare const ERR_DISMOUNT_NOTMOUNTED: string;
 declare const ERR_DISMOUNT_NOTYOURPET: string;
 declare const ERR_DOOR_LOCKED: string;
 declare const ERR_DROP_BOUND_ITEM: string;
 declare const ERR_DUEL_CANCELLED: string;
 declare const ERR_DUEL_REQUESTED: string;
 declare const ERR_DUNGEON_DIFFICULTY_CHANGED_S: string;
 declare const ERR_DUNGEON_DIFFICULTY_FAILED: string;
 declare const ERR_EAT_WHILE_MOVNG: string;
 declare const ERR_EMBLEMERROR_NOTABARDGEOSET: string;
 declare const ERR_EQUIP_TRADE_ITEM: string;
 declare const ERR_EXHAUSTION_EXHAUSTED: string;
 declare const ERR_EXHAUSTION_NORMAL: string;
 declare const ERR_EXHAUSTION_RESTED: string;
 declare const ERR_EXHAUSTION_TIRED: string;
 declare const ERR_EXHAUSTION_WELLRESTED: string;
 declare const ERR_FEIGN_DEATH_RESISTED: string;
 declare const ERR_FILTERING_YOU_S: string;
 declare const ERR_FISH_ESCAPED: string;
 declare const ERR_FISH_NOT_HOOKED: string;
 declare const ERR_FOOD_COOLDOWN: string;
 declare const ERR_FRIEND_ADDED_S: string;
 declare const ERR_FRIEND_ALREADY_S: string;
 declare const ERR_FRIEND_DB_ERROR: string;
 declare const ERR_FRIEND_DELETED: string;
 declare const ERR_FRIEND_ERROR: string;
 declare const ERR_FRIEND_LIST_FULL: string;
 declare const ERR_FRIEND_NOT_FOUND: string;
 declare const ERR_FRIEND_OFFLINE_S: string;
 declare const ERR_FRIEND_ONLINE_SS: string;
 declare const ERR_FRIEND_REMOVED_S: string;
 declare const ERR_FRIEND_SELF: string;
 declare const ERR_FRIEND_WRONG_FACTION: string;
 declare const ERR_GENERIC_NO_TARGET: string;
 declare const ERR_GENERIC_NO_VALID_TARGETS: string;
 declare const ERR_GENERIC_STUNNED: string;
 declare const ERR_GMRESPONSE_DB_ERROR: string;
 declare const ERR_GROUP_ACTION_THROTTLED: string;
 declare const ERR_GROUP_DISBANDED: string;
 declare const ERR_GROUP_FULL: string;
 declare const ERR_GROUP_JOIN_BATTLEGROUND_DESERTERS: string;
 declare const ERR_GROUP_JOIN_BATTLEGROUND_FAIL: string;
 declare const ERR_GROUP_JOIN_BATTLEGROUND_S: string;
 declare const ERR_GROUP_JOIN_BATTLEGROUND_TOO_MANY: string;
 declare const ERR_GROUP_SWAP_FAILED: string;
 declare const ERR_GUILDEMBLEM_COLORSPRESENT: string;
 declare const ERR_GUILDEMBLEM_INVALIDVENDOR: string;
 declare const ERR_GUILDEMBLEM_INVALID_TABARD_COLORS: string;
 declare const ERR_GUILDEMBLEM_NOGUILD: string;
 declare const ERR_GUILDEMBLEM_NOTENOUGHMONEY: string;
 declare const ERR_GUILDEMBLEM_NOTGUILDMASTER: string;
 declare const ERR_GUILDEMBLEM_SAME: string;
 declare const ERR_GUILDEMBLEM_SUCCESS: string;
 declare const ERR_GUILD_ACCEPT: string;
 declare const ERR_GUILD_BANK_BOUND_ITEM: string;
 declare const ERR_GUILD_BANK_CONJURED_ITEM: string;
 declare const ERR_GUILD_BANK_EQUIPPED_ITEM: string;
 declare const ERR_GUILD_BANK_FULL: string;
 declare const ERR_GUILD_BANK_QUEST_ITEM: string;
 declare const ERR_GUILD_BANK_WRAPPED_ITEM: string;
 declare const ERR_GUILD_CREATE_S: string;
 declare const ERR_GUILD_DECLINE_S: string;
 declare const ERR_GUILD_DEMOTE_SSS: string;
 declare const ERR_GUILD_DISBANDED: string;
 declare const ERR_GUILD_DISBAND_S: string;
 declare const ERR_GUILD_DISBAND_SELF: string;
 declare const ERR_GUILD_FOUNDER_S: string;
 declare const ERR_GUILD_INTERNAL: string;
 declare const ERR_GUILD_INVITE_S: string;
 declare const ERR_GUILD_JOIN_S: string;
 declare const ERR_GUILD_LEADER_CHANGED_SS: string;
 declare const ERR_GUILD_LEADER_IS_S: string;
 declare const ERR_GUILD_LEADER_LEAVE: string;
 declare const ERR_GUILD_LEADER_S: string;
 declare const ERR_GUILD_LEADER_SELF: string;
 declare const ERR_GUILD_LEAVE_RESULT: string;
 declare const ERR_GUILD_LEAVE_S: string;
 declare const ERR_GUILD_NAME_EXISTS_S: string;
 declare const ERR_GUILD_NOT_ALLIED: string;
 declare const ERR_GUILD_NOT_ENOUGH_MONEY: string;
 declare const ERR_GUILD_PERMISSIONS: string;
 declare const ERR_GUILD_PLAYER_NOT_FOUND_S: string;
 declare const ERR_GUILD_PLAYER_NOT_IN_GUILD: string;
 declare const ERR_GUILD_PLAYER_NOT_IN_GUILD_S: string;
 declare const ERR_GUILD_PROMOTE_SSS: string;
 declare const ERR_GUILD_QUIT_S: string;
 declare const ERR_GUILD_RANKS_LOCKED: string;
 declare const ERR_GUILD_RANK_IN_USE: string;
 declare const ERR_GUILD_RANK_TOO_HIGH_S: string;
 declare const ERR_GUILD_RANK_TOO_LOW_S: string;
 declare const ERR_GUILD_REMOVE_SELF: string;
 declare const ERR_GUILD_REMOVE_SS: string;
 declare const ERR_GUILD_WITHDRAW_LIMIT: string;
 declare const ERR_IGNORE_ADDED_S: string;
 declare const ERR_IGNORE_ALREADY_S: string;
 declare const ERR_IGNORE_AMBIGUOUS: string;
 declare const ERR_IGNORE_DELETED: string;
 declare const ERR_IGNORE_FULL: string;
 declare const ERR_IGNORE_NOT_FOUND: string;
 declare const ERR_IGNORE_REMOVED_S: string;
 declare const ERR_IGNORE_SELF: string;
 declare const ERR_IGNORING_YOU_S: string;
 declare const ERR_INITIATE_TRADE_S: string;
 declare const ERR_INSPECT_S: string;
 declare const ERR_INTERNAL_BAG_ERROR: string;
 declare const ERR_INVALID_ATTACK_TARGET: string;
 declare const ERR_INVALID_FOLLOW_TARGET: string;
 declare const ERR_INVALID_GLYPH_SLOT: string;
 declare const ERR_INVALID_INSPECT_TARGET: string;
 declare const ERR_INVALID_ITEM_TARGET: string;
 declare const ERR_INVALID_PROMOTION_CODE: string;
 declare const ERR_INVALID_RAID_TARGET: string;
 declare const ERR_INVALID_TELEPORT_LOCATION: string;
 declare const ERR_INVITED_ALREADY_IN_GROUP_SS: string;
 declare const ERR_INVITED_TO_ARENA_TEAM: string;
 declare const ERR_INVITED_TO_GROUP_SS: string;
 declare const ERR_INVITED_TO_GUILD: string;
 declare const ERR_INVITED_TO_GUILD_SSS: string;
 declare const ERR_INVITE_IN_COMBAT: string;
 declare const ERR_INVITE_NO_PARTY_SERVER: string;
 declare const ERR_INVITE_PARTY_BUSY: string;
 declare const ERR_INVITE_PLAYER_S: string;
 declare const ERR_INVITE_RESTRICTED: string;
 declare const ERR_INVITE_SELF: string;
 declare const ERR_INVITE_UNKNOWN_REALM: string;
 declare const ERR_INV_FULL: string;
 declare const ERR_IN_NON_RANDOM_BG: string;
 declare const ERR_IN_RANDOM_BG: string;
 declare const ERR_ITEM_CANT_BE_DESTROYED: string;
 declare const ERR_ITEM_COOLDOWN: string;
 declare const ERR_ITEM_INVENTORY_FULL_SATCHEL: string;
 declare const ERR_ITEM_LOCKED: string;
 declare const ERR_ITEM_MAX_COUNT: string;
 declare const ERR_ITEM_MAX_COUNT_EQUIPPED_SOCKETED: string;
 declare const ERR_ITEM_MAX_COUNT_SOCKETED: string;
 declare const ERR_ITEM_MAX_LIMIT_CATEGORY_COUNT_EXCEEDED_IS: string;
 declare const ERR_ITEM_MAX_LIMIT_CATEGORY_EQUIPPED_EXCEEDED_IS: string;
 declare const ERR_ITEM_MAX_LIMIT_CATEGORY_SOCKETED_EXCEEDED_IS: string;
 declare const ERR_ITEM_NOT_FOUND: string;
 declare const ERR_ITEM_UNIQUE_EQUIPABLE: string;
 declare const ERR_ITEM_UNIQUE_EQUIPPABLE: string;
 declare const ERR_ITEM_UNIQUE_EQUIPPABLE_SOCKETED: string;
 declare const ERR_JOINED_GROUP_S: string;
 declare const ERR_KILLED_BY_S: string;
 declare const ERR_LEARN_ABILITY_S: string;
 declare const ERR_LEARN_COMPANION_S: string;
 declare const ERR_LEARN_RECIPE_S: string;
 declare const ERR_LEARN_SPELL_S: string;
 declare const ERR_LEFT_GROUP_S: string;
 declare const ERR_LEFT_GROUP_YOU: string;
 declare const ERR_LFG_CANT_USE_BATTLEGROUND: string;
 declare const ERR_LFG_CANT_USE_DUNGEONS: string;
 declare const ERR_LFG_DESERTER_PARTY: string;
 declare const ERR_LFG_DESERTER_PLAYER: string;
 declare const ERR_LFG_GET_INFO_TIMEOUT: string;
 declare const ERR_LFG_GROUP_FULL: string;
 declare const ERR_LFG_INVALID_SLOT: string;
 declare const ERR_LFG_JOINED_LIST: string;
 declare const ERR_LFG_JOINED_QUEUE: string;
 declare const ERR_LFG_LEADER_IS_LFM_S: string;
 declare const ERR_LFG_LEFT_LIST: string;
 declare const ERR_LFG_LEFT_QUEUE: string;
 declare const ERR_LFG_MEMBERS_NOT_PRESENT: string;
 declare const ERR_LFG_MISMATCHED_SLOTS: string;
 declare const ERR_LFG_NO_LFG_OBJECT: string;
 declare const ERR_LFG_NO_ROLES_SELECTED: string;
 declare const ERR_LFG_NO_SLOTS_PARTY: string;
 declare const ERR_LFG_NO_SLOTS_PLAYER: string;
 declare const ERR_LFG_NO_SLOTS_SELECTED: string;
 declare const ERR_LFG_PARTY_PLAYERS_FROM_DIFFERENT_REALMS: string;
 declare const ERR_LFG_PENDING: string;
 declare const ERR_LFG_PLAYER_DECLINED_ROLE_CHECK: string;
 declare const ERR_LFG_PROPOSAL_DECLINED_PARTY: string;
 declare const ERR_LFG_PROPOSAL_DECLINED_SELF: string;
 declare const ERR_LFG_PROPOSAL_FAILED: string;
 declare const ERR_LFG_RANDOM_COOLDOWN_PARTY: string;
 declare const ERR_LFG_RANDOM_COOLDOWN_PLAYER: string;
 declare const ERR_LFG_ROLE_CHECK_ABORTED: string;
 declare const ERR_LFG_ROLE_CHECK_FAILED: string;
 declare const ERR_LFG_ROLE_CHECK_FAILED_NOT_VIABLE: string;
 declare const ERR_LFG_ROLE_CHECK_FAILED_TIMEOUT: string;
 declare const ERR_LFG_ROLE_CHECK_INITIATED: string;
 declare const ERR_LFG_TOO_MANY_MEMBERS: string;
 declare const ERR_LOGGING_OUT: string;
 declare const ERR_LOGOUT_FAILED: string;
 declare const ERR_LOOT_BAD_FACING: string;
 declare const ERR_LOOT_CANT_LOOT_THAT: string;
 declare const ERR_LOOT_CANT_LOOT_THAT_NOW: string;
 declare const ERR_LOOT_DIDNT_KILL: string;
 declare const ERR_LOOT_GONE: string;
 declare const ERR_LOOT_LOCKED: string;
 declare const ERR_LOOT_MASTER_INV_FULL: string;
 declare const ERR_LOOT_MASTER_OTHER: string;
 declare const ERR_LOOT_MASTER_UNIQUE_ITEM: string;
 declare const ERR_LOOT_NOTSTANDING: string;
 declare const ERR_LOOT_NO_UI: string;
 declare const ERR_LOOT_PLAYER_NOT_FOUND: string;
 declare const ERR_LOOT_ROLL_PENDING: string;
 declare const ERR_LOOT_STUNNED: string;
 declare const ERR_LOOT_TOO_FAR: string;
 declare const ERR_LOOT_WHILE_INVULNERABLE: string;
 declare const ERR_MAIL_ATTACHMENT_EXPIRED: string;
 declare const ERR_MAIL_BAG: string;
 declare const ERR_MAIL_BOUND_ITEM: string;
 declare const ERR_MAIL_CONJURED_ITEM: string;
 declare const ERR_MAIL_DATABASE_ERROR: string;
 declare const ERR_MAIL_INVALID_ATTACHMENT: string;
 declare const ERR_MAIL_INVALID_ATTACHMENT_SLOT: string;
 declare const ERR_MAIL_LIMITED_DURATION_ITEM: string;
 declare const ERR_MAIL_QUEST_ITEM: string;
 declare const ERR_MAIL_REACHED_CAP: string;
 declare const ERR_MAIL_SENT: string;
 declare const ERR_MAIL_TARGET_NOT_FOUND: string;
 declare const ERR_MAIL_TOO_MANY_ATTACHMENTS: string;
 declare const ERR_MAIL_TO_SELF: string;
 declare const ERR_MAIL_WRAPPED_COD: string;
 declare const ERR_MAX_SOCKETS: string;
 declare const ERR_MEETING_STONE_GROUP_FULL: string;
 declare const ERR_MEETING_STONE_INVALID_LEVEL: string;
 declare const ERR_MEETING_STONE_INVALID_TARGET: string;
 declare const ERR_MEETING_STONE_IN_PROGRESS: string;
 declare const ERR_MEETING_STONE_IN_QUEUE_S: string;
 declare const ERR_MEETING_STONE_LEFT_QUEUE_S: string;
 declare const ERR_MEETING_STONE_MEMBER_ADDED_S: string;
 declare const ERR_MEETING_STONE_MEMBER_STILL_IN_QUEUE: string;
 declare const ERR_MEETING_STONE_MUST_BE_LEADER: string;
 declare const ERR_MEETING_STONE_NEED_PARTY: string;
 declare const ERR_MEETING_STONE_NOT_FOUND: string;
 declare const ERR_MEETING_STONE_NOT_LEADER: string;
 declare const ERR_MEETING_STONE_NO_RAID_GROUP: string;
 declare const ERR_MEETING_STONE_OTHER_MEMBER_LEFT: string;
 declare const ERR_MEETING_STONE_SUCCESS: string;
 declare const ERR_MEETING_STONE_TARGET_INVALID_LEVEL: string;
 declare const ERR_MEETING_STONE_TARGET_NOT_IN_PARTY: string;
 declare const ERR_MOUNT_ALREADYMOUNTED: string;
 declare const ERR_MOUNT_FORCEDDISMOUNT: string;
 declare const ERR_MOUNT_INVALIDMOUNTEE: string;
 declare const ERR_MOUNT_LOOTING: string;
 declare const ERR_MOUNT_NOTMOUNTABLE: string;
 declare const ERR_MOUNT_NOTYOURPET: string;
 declare const ERR_MOUNT_OTHER: string;
 declare const ERR_MOUNT_RACECANTMOUNT: string;
 declare const ERR_MOUNT_SHAPESHIFTED: string;
 declare const ERR_MOUNT_TOOFARAWAY: string;
 declare const ERR_MULTI_CAST_ACTION_TOTEM_S: string;
 declare const ERR_MUST_EQUIP_ITEM: string;
 declare const ERR_MUST_REPAIR_DURABILITY: string;
 declare const ERR_NAME_CONSECUTIVE_SPACES: string;
 declare const ERR_NAME_DECLENSION_DOESNT_MATCH_BASE_NAME: string;
 declare const ERR_NAME_INVALID: string;
 declare const ERR_NAME_INVALID_SPACE: string;
 declare const ERR_NAME_MIXED_LANGUAGES: string;
 declare const ERR_NAME_NO_NAME: string;
 declare const ERR_NAME_PROFANE: string;
 declare const ERR_NAME_RESERVED: string;
 declare const ERR_NAME_RUSSIAN_CONSECUTIVE_SILENT_CHARACTERS: string;
 declare const ERR_NAME_RUSSIAN_SILENT_CHARACTER_AT_BEGINNING_OR_END: string;
 declare const ERR_NAME_THREE_CONSECUTIVE: string;
 declare const ERR_NAME_TOO_LONG: string;
 declare const ERR_NAME_TOO_LONG2: string;
 declare const ERR_NAME_TOO_SHORT: string;
 declare const ERR_NEWTAXIPATH: string;
 declare const ERR_NEW_GUIDE_S: string;
 declare const ERR_NEW_GUIDE_YOU: string;
 declare const ERR_NEW_LEADER_S: string;
 declare const ERR_NEW_LEADER_YOU: string;
 declare const ERR_NEW_LOOT_MASTER_S: string;
 declare const ERR_NOAMMO_S: string;
 declare const ERR_NOEMOTEWHILERUNNING: string;
 declare const ERR_NOTYOURPET: string;
 declare const ERR_NOT_A_BAG: string;
 declare const ERR_NOT_BARBER_SITTING: string;
 declare const ERR_NOT_DURING_ARENA_MATCH: string;
 declare const ERR_NOT_ENOUGH_ARENA_POINTS: string;
 declare const ERR_NOT_ENOUGH_GOLD: string;
 declare const ERR_NOT_ENOUGH_HONOR_POINTS: string;
 declare const ERR_NOT_ENOUGH_MONEY: string;
 declare const ERR_NOT_EQUIPPABLE: string;
 declare const ERR_NOT_IN_BATTLEGROUND: string;
 declare const ERR_NOT_IN_COMBAT: string;
 declare const ERR_NOT_IN_GROUP: string;
 declare const ERR_NOT_IN_RAID: string;
 declare const ERR_NOT_LEADER: string;
 declare const ERR_NOT_OWNER: string;
 declare const ERR_NOT_SAME_ACCOUNT: string;
 declare const ERR_NOT_WHILE_DISARMED: string;
 declare const ERR_NOT_WHILE_FALLING: string;
 declare const ERR_NOT_WHILE_FATIGUED: string;
 declare const ERR_NOT_WHILE_MOUNTED: string;
 declare const ERR_NOT_WHILE_SHAPESHIFTED: string;
 declare const ERR_NO_ARENA_CHARTER: string;
 declare const ERR_NO_ATTACK_TARGET: string;
 declare const ERR_NO_BANK_HERE: string;
 declare const ERR_NO_BANK_SLOT: string;
 declare const ERR_NO_GUILD_CHARTER: string;
 declare const ERR_NO_ITEMS_WHILE_SHAPESHIFTED: string;
 declare const ERR_NO_PET: string;
 declare const ERR_NO_REPLY_TARGET: string;
 declare const ERR_NO_SLOT_AVAILABLE: string;
 declare const ERR_NULL_PETNAME: string;
 declare const ERR_OBJECT_IS_BUSY: string;
 declare const ERR_ONLY_ONE_AMMO: string;
 declare const ERR_ONLY_ONE_BOLT: string;
 declare const ERR_ONLY_ONE_QUIVER: string;
 declare const ERR_OUT_OF_ENERGY: string;
 declare const ERR_OUT_OF_FOCUS: string;
 declare const ERR_OUT_OF_HEALTH: string;
 declare const ERR_OUT_OF_MANA: string;
 declare const ERR_OUT_OF_POWER_DISPLAY: string;
 declare const ERR_OUT_OF_RAGE: string;
 declare const ERR_OUT_OF_RANGE: string;
 declare const ERR_OUT_OF_RUNES: string;
 declare const ERR_OUT_OF_RUNIC_POWER: string;
 declare const ERR_PARTY_LFG_BOOT_COOLDOWN_S: string;
 declare const ERR_PARTY_LFG_BOOT_DUNGEON_COMPLETE: string;
 declare const ERR_PARTY_LFG_BOOT_IN_COMBAT: string;
 declare const ERR_PARTY_LFG_BOOT_IN_PROGRESS: string;
 declare const ERR_PARTY_LFG_BOOT_LIMIT: string;
 declare const ERR_PARTY_LFG_BOOT_LOOT_ROLLS: string;
 declare const ERR_PARTY_LFG_BOOT_NOT_ELIGIBLE_S: string;
 declare const ERR_PARTY_LFG_BOOT_TOO_FEW_PLAYERS: string;
 declare const ERR_PARTY_LFG_BOOT_VOTE_FAILED: string;
 declare const ERR_PARTY_LFG_BOOT_VOTE_SUCCEEDED: string;
 declare const ERR_PARTY_LFG_INVITE_RAID_LOCKED: string;
 declare const ERR_PARTY_LFG_TELEPORT_IN_COMBAT: string;
 declare const ERR_PARTY_TARGET_AMBIGUOUS: string;
 declare const ERR_PASSIVE_ABILITY: string;
 declare const ERR_PETITION_ALREADY_SIGNED: string;
 declare const ERR_PETITION_ALREADY_SIGNED_OTHER: string;
 declare const ERR_PETITION_CREATOR: string;
 declare const ERR_PETITION_DECLINED_S: string;
 declare const ERR_PETITION_FULL: string;
 declare const ERR_PETITION_IN_GUILD: string;
 declare const ERR_PETITION_NOT_ENOUGH_SIGNATURES: string;
 declare const ERR_PETITION_NOT_SAME_SERVER: string;
 declare const ERR_PETITION_OFFERED_S: string;
 declare const ERR_PETITION_RESTRICTED_ACCOUNT: string;
 declare const ERR_PETITION_SIGNED: string;
 declare const ERR_PETITION_SIGNED_S: string;
 declare const ERR_PET_BROKEN: string;
 declare const ERR_PET_LEARN_ABILITY_S: string;
 declare const ERR_PET_LEARN_SPELL_S: string;
 declare const ERR_PET_NOT_RENAMEABLE: string;
 declare const ERR_PET_SPELL_AFFECTING_COMBAT: string;
 declare const ERR_PET_SPELL_ALREADY_KNOWN_S: string;
 declare const ERR_PET_SPELL_DEAD: string;
 declare const ERR_PET_SPELL_NOT_BEHIND: string;
 declare const ERR_PET_SPELL_OUT_OF_RANGE: string;
 declare const ERR_PET_SPELL_ROOTED: string;
 declare const ERR_PET_SPELL_TARGETS_DEAD: string;
 declare const ERR_PET_SPELL_UNLEARNED_S: string;
 declare const ERR_PLAYERLIST_JOINED_BATTLE: string;
 declare const ERR_PLAYERLIST_LEFT_BATTLE: string;
 declare const ERR_PLAYERS_JOINED_BATTLE_D: string;
 declare const ERR_PLAYERS_LEFT_BATTLE_D: string;
 declare const ERR_PLAYER_BUSY_S: string;
 declare const ERR_PLAYER_DEAD: string;
 declare const ERR_PLAYER_DIED_S: string;
 declare const ERR_PLAYER_DIFFICULTY_CHANGED_S: string;
 declare const ERR_PLAYER_JOINED_BATTLE_D: string;
 declare const ERR_PLAYER_LEFT_BATTLE_D: string;
 declare const ERR_PLAYER_SILENCED: string;
 declare const ERR_PLAYER_SILENCED_ECHO: string;
 declare const ERR_PLAYER_UNSILENCED: string;
 declare const ERR_PLAYER_UNSILENCED_ECHO: string;
 declare const ERR_PLAYER_WRONG_FACTION: string;
 declare const ERR_PLAY_TIME_EXCEEDED: string;
 declare const ERR_POTION_COOLDOWN: string;
 declare const ERR_PROFANE_CHAT_NAME: string;
 declare const ERR_PROFICIENCY_GAINED_S: string;
 declare const ERR_PROFICIENCY_NEEDED: string;
 declare const ERR_PURCHASE_LEVEL_TOO_LOW: string;
 declare const ERR_PVP_TOGGLE_OFF: string;
 declare const ERR_PVP_TOGGLE_ON: string;
 declare const ERR_QUEST_ACCEPTED_S: string;
 declare const ERR_QUEST_ADD_FOUND_SII: string;
 declare const ERR_QUEST_ADD_ITEM_SII: string;
 declare const ERR_QUEST_ADD_KILL_SII: string;
 declare const ERR_QUEST_ADD_PLAYER_KILL_SII: string;
 declare const ERR_QUEST_ALREADY_DONE: string;
 declare const ERR_QUEST_ALREADY_DONE_DAILY: string;
 declare const ERR_QUEST_ALREADY_ON: string;
 declare const ERR_QUEST_COMPLETE_S: string;
 declare const ERR_QUEST_FAILED_BAG_FULL_S: string;
 declare const ERR_QUEST_FAILED_CAIS: string;
 declare const ERR_QUEST_FAILED_EXPANSION: string;
 declare const ERR_QUEST_FAILED_LOW_LEVEL: string;
 declare const ERR_QUEST_FAILED_MAX_COUNT_S: string;
 declare const ERR_QUEST_FAILED_MISSING_ITEMS: string;
 declare const ERR_QUEST_FAILED_NOT_ENOUGH_MONEY: string;
 declare const ERR_QUEST_FAILED_S: string;
 declare const ERR_QUEST_FAILED_TOO_MANY_DAILY_QUESTS_I: string;
 declare const ERR_QUEST_FAILED_WRONG_RACE: string;
 declare const ERR_QUEST_FORCE_REMOVED_S: string;
 declare const ERR_QUEST_LOG_FULL: string;
 declare const ERR_QUEST_MUST_CHOOSE: string;
 declare const ERR_QUEST_NEED_PREREQS: string;
 declare const ERR_QUEST_OBJECTIVE_COMPLETE_S: string;
 declare const ERR_QUEST_ONLY_ONE_TIMED: string;
 declare const ERR_QUEST_PUSH_ACCEPTED_S: string;
 declare const ERR_QUEST_PUSH_ALREADY_DONE_S: string;
 declare const ERR_QUEST_PUSH_BUSY_S: string;
 declare const ERR_QUEST_PUSH_DECLINED_S: string;
 declare const ERR_QUEST_PUSH_DIFFERENT_SERVER_DAILY_S: string;
 declare const ERR_QUEST_PUSH_INVALID_S: string;
 declare const ERR_QUEST_PUSH_LOG_FULL_S: string;
 declare const ERR_QUEST_PUSH_NOT_DAILY_S: string;
 declare const ERR_QUEST_PUSH_NOT_IN_PARTY_S: string;
 declare const ERR_QUEST_PUSH_ONQUEST_S: string;
 declare const ERR_QUEST_PUSH_SUCCESS_S: string;
 declare const ERR_QUEST_PUSH_TIMER_EXPIRED_S: string;
 declare const ERR_QUEST_REWARD_EXP_I: string;
 declare const ERR_QUEST_REWARD_ITEM_MULT_IS: string;
 declare const ERR_QUEST_REWARD_ITEM_S: string;
 declare const ERR_QUEST_REWARD_MONEY_S: string;
 declare const ERR_QUEST_UNKNOWN_COMPLETE: string;
 declare const ERR_RAID_DIFFICULTY_CHANGED_S: string;
 declare const ERR_RAID_DIFFICULTY_FAILED: string;
 declare const ERR_RAID_DISALLOWED_BY_LEVEL: string;
 declare const ERR_RAID_GROUP_FULL: string;
 declare const ERR_RAID_GROUP_LOWLEVEL: string;
 declare const ERR_RAID_GROUP_ONLY: string;
 declare const ERR_RAID_GROUP_REQUIREMENTS_UNMATCH: string;
 declare const ERR_RAID_LEADER_READY_CHECK_START_S: string;
 declare const ERR_RAID_LOCKOUT_CHANGED_S: string;
 declare const ERR_RAID_MEMBER_ADDED_S: string;
 declare const ERR_RAID_MEMBER_REMOVED_S: string;
 declare const ERR_RAID_YOU_JOINED: string;
 declare const ERR_RAID_YOU_LEFT: string;
 declare const ERR_READY_CHECK_IN_PROGRESS: string;
 declare const ERR_READY_CHECK_THROTTLED: string;
 declare const ERR_RECEIVE_ITEM_S: string;
 declare const ERR_REFER_A_FRIEND_DIFFERENT_FACTION: string;
 declare const ERR_REFER_A_FRIEND_GRANT_LEVEL_MAX_I: string;
 declare const ERR_REFER_A_FRIEND_INSUFFICIENT_GRANTABLE_LEVELS: string;
 declare const ERR_REFER_A_FRIEND_INSUF_EXPAN_LVL: string;
 declare const ERR_REFER_A_FRIEND_NOT_NOW: string;
 declare const ERR_REFER_A_FRIEND_NOT_REFERRED_BY: string;
 declare const ERR_REFER_A_FRIEND_SUMMON_COOLDOWN: string;
 declare const ERR_REFER_A_FRIEND_SUMMON_LEVEL_MAX_I: string;
 declare const ERR_REFER_A_FRIEND_SUMMON_OFFLINE_S: string;
 declare const ERR_REFER_A_FRIEND_TARGET_TOO_HIGH: string;
 declare const ERR_REFER_A_FRIEND_TOO_FAR: string;
 declare const ERR_REMOVE_FROM_PVP_QUEUE_FACTION_CHANGE_NONE: string;
 declare const ERR_REMOVE_FROM_PVP_QUEUE_GRANT_LEVEL: string;
 declare const ERR_REMOVE_FROM_PVP_QUEUE_XP_GAIN: string;
 declare const ERR_RESTRICTED_ACCOUNT: string;
 declare const ERR_SCALING_STAT_ITEM_LEVEL_EXCEEDED: string;
 declare const ERR_SET_LOOT_FREEFORALL: string;
 declare const ERR_SET_LOOT_GROUP: string;
 declare const ERR_SET_LOOT_MASTER: string;
 declare const ERR_SET_LOOT_NBG: string;
 declare const ERR_SET_LOOT_ROUNDROBIN: string;
 declare const ERR_SET_LOOT_THRESHOLD_S: string;
 declare const ERR_SHAPESHIFT_FORM_CANNOT_EQUIP: string;
 declare const ERR_SKILL_GAINED_S: string;
 declare const ERR_SKILL_UP_SI: string;
 declare const ERR_SLOT_EMPTY: string;
 declare const ERR_SOCKETING_META_GEM_ONLY_IN_METASLOT: string;
 declare const ERR_SOCKETING_REQUIRES_META_GEM: string;
 declare const ERR_SPECIFY_MASTER_LOOTER: string;
 declare const ERR_SPELL_ALREADY_KNOWN_S: string;
 declare const ERR_SPELL_COOLDOWN: string;
 declare const ERR_SPELL_FAILED_ALREADY_AT_FULL_HEALTH: string;
 declare const ERR_SPELL_FAILED_ALREADY_AT_FULL_MANA: string;
 declare const ERR_SPELL_FAILED_ALREADY_AT_FULL_POWER_S: string;
 declare const ERR_SPELL_FAILED_EQUIPPED_ITEM: string;
 declare const ERR_SPELL_FAILED_EQUIPPED_ITEM_CLASS_S: string;
 declare const ERR_SPELL_FAILED_NOTUNSHEATHED: string;
 declare const ERR_SPELL_FAILED_REAGENTS: string;
 declare const ERR_SPELL_FAILED_REAGENTS_GENERIC: string;
 declare const ERR_SPELL_FAILED_S: string;
 declare const ERR_SPELL_FAILED_SHAPESHIFT_FORM_S: string;
 declare const ERR_SPELL_FAILED_TOTEMS: string;
 declare const ERR_SPELL_OUT_OF_RANGE: string;
 declare const ERR_SPELL_UNLEARNED_S: string;
 declare const ERR_SPLIT_FAILED: string;
 declare const ERR_SYSTEM_DISABLED: string;
 declare const ERR_TALENT_WIPE_ERROR: string;
 declare const ERR_TAME_FAILED: string;
 declare const ERR_TARGET_LOGGING_OUT: string;
 declare const ERR_TARGET_NOT_IN_GROUP_S: string;
 declare const ERR_TARGET_NOT_IN_INSTANCE_S: string;
 declare const ERR_TARGET_STUNNED: string;
 declare const ERR_TAXINOPATH: string;
 declare const ERR_TAXINOPATHS: string;
 declare const ERR_TAXINOSUCHPATH: string;
 declare const ERR_TAXINOTENOUGHMONEY: string;
 declare const ERR_TAXINOTSTANDING: string;
 declare const ERR_TAXINOTVISITED: string;
 declare const ERR_TAXINOVENDORNEARBY: string;
 declare const ERR_TAXIPLAYERALREADYMOUNTED: string;
 declare const ERR_TAXIPLAYERBUSY: string;
 declare const ERR_TAXIPLAYERMOVING: string;
 declare const ERR_TAXIPLAYERSHAPESHIFTED: string;
 declare const ERR_TAXISAMENODE: string;
 declare const ERR_TAXITOOFARAWAY: string;
 declare const ERR_TAXIUNSPECIFIEDSERVERERROR: string;
 declare const ERR_TICKET_ALREADY_EXISTS: string;
 declare const ERR_TICKET_CREATE_ERROR: string;
 declare const ERR_TICKET_DB_ERROR: string;
 declare const ERR_TICKET_NO_TEXT: string;
 declare const ERR_TICKET_TEXT_TOO_LONG: string;
 declare const ERR_TICKET_UPDATE_ERROR: string;
 declare const ERR_TOOBUSYTOFOLLOW: string;
 declare const ERR_TOO_FAR_TO_ATTACK: string;
 declare const ERR_TOO_FAR_TO_INTERACT: string;
 declare const ERR_TOO_FEW_TO_SPLIT: string;
 declare const ERR_TOO_MANY_CHAT_CHANNELS: string;
 declare const ERR_TOO_MANY_SOCKETS: string;
 declare const ERR_TOO_MANY_SPECIAL_BAGS: string;
 declare const ERR_TOO_MUCH_GOLD: string;
 declare const ERR_TRADE_BAG: string;
 declare const ERR_TRADE_BAG_FULL: string;
 declare const ERR_TRADE_BLOCKED_S: string;
 declare const ERR_TRADE_BOUND_ITEM: string;
 declare const ERR_TRADE_CANCELLED: string;
 declare const ERR_TRADE_COMPLETE: string;
 declare const ERR_TRADE_EQUIPPED_BAG: string;
 declare const ERR_TRADE_GROUND_ITEM: string;
 declare const ERR_TRADE_MAX_COUNT_EXCEEDED: string;
 declare const ERR_TRADE_NOT_ON_TAPLIST: string;
 declare const ERR_TRADE_QUEST_ITEM: string;
 declare const ERR_TRADE_REQUEST_S: string;
 declare const ERR_TRADE_SELF: string;
 declare const ERR_TRADE_TARGET_BAG_FULL: string;
 declare const ERR_TRADE_TARGET_DEAD: string;
 declare const ERR_TRADE_TARGET_MAX_COUNT_EXCEEDED: string;
 declare const ERR_TRADE_TARGET_MAX_LIMIT_CATEGORY_COUNT_EXCEEDED_IS: string;
 declare const ERR_TRADE_TEMP_ENCHANT_BOUND: string;
 declare const ERR_TRADE_TOO_FAR: string;
 declare const ERR_TRADE_WRONG_REALM: string;
 declare const ERR_UNHEALTHY_TIME: string;
 declare const ERR_UNINVITE_YOU: string;
 declare const ERR_UNIT_NOT_FOUND: string;
 declare const ERR_UNKNOWN_MACRO_OPTION_S: string;
 declare const ERR_USER_SQUELCHED: string;
 declare const ERR_USE_BAD_ANGLE: string;
 declare const ERR_USE_CANT_IMMUNE: string;
 declare const ERR_USE_CANT_OPEN: string;
 declare const ERR_USE_DESTROYED: string;
 declare const ERR_USE_LOCKED: string;
 declare const ERR_USE_LOCKED_WITH_ITEM_S: string;
 declare const ERR_USE_LOCKED_WITH_SPELL_KNOWN_SI: string;
 declare const ERR_USE_LOCKED_WITH_SPELL_S: string;
 declare const ERR_USE_OBJECT_MOVING: string;
 declare const ERR_USE_PREVENTED_BY_MECHANIC_S: string;
 declare const ERR_USE_SPELL_FOCUS: string;
 declare const ERR_USE_TOO_FAR: string;
 declare const ERR_VENDOR_DOESNT_BUY: string;
 declare const ERR_VENDOR_HATES_YOU: string;
 declare const ERR_VENDOR_MISSING_TURNINS: string;
 declare const ERR_VENDOR_NOT_INTERESTED: string;
 declare const ERR_VENDOR_SOLD_OUT: string;
 declare const ERR_VENDOR_TOO_FAR: string;
 declare const ERR_VOICESESSION_FULL: string;
 declare const ERR_VOICE_CHAT_PARENTAL_DISABLE_ALL: string;
 declare const ERR_VOICE_CHAT_PARENTAL_DISABLE_MIC: string;
 declare const ERR_VOICE_IGNORE_ADDED_S: string;
 declare const ERR_VOICE_IGNORE_ALREADY_S: string;
 declare const ERR_VOICE_IGNORE_AMBIGUOUS: string;
 declare const ERR_VOICE_IGNORE_DELETED: string;
 declare const ERR_VOICE_IGNORE_FULL: string;
 declare const ERR_VOICE_IGNORE_NOT_FOUND: string;
 declare const ERR_VOICE_IGNORE_REMOVED_S: string;
 declare const ERR_VOICE_IGNORE_SELF: string;
 declare const ERR_WRONG_BAG_TYPE: string;
 declare const ERR_WRONG_BAG_TYPE_SUBCLASS: string;
 declare const ERR_WRONG_DIRECTION_FOR_ATTACK: string;
 declare const ERR_WRONG_SLOT: string;
 declare const ERR_YELL_RESTRICTED: string;
 declare const ERR_ZONE_EXPLORED: string;
 declare const ERR_ZONE_EXPLORED_XP: string;
 declare const ESES: string;
 declare const ESMX: string;
 declare const EVADE: string;
 declare const EVENTS_LABEL: string;
 declare const EXAMPLE_SPELL_FIREBALL: string;
 declare const EXAMPLE_SPELL_FROSTBOLT: string;
 declare const EXAMPLE_TARGET_MONSTER: string;
 declare const EXAMPLE_TEXT: string;
 declare const EXHAUSTION_LABEL: string;
 declare const EXHAUST_TOOLTIP1: string;
 declare const EXHAUST_TOOLTIP2: string;
 declare const EXHAUST_TOOLTIP3: string;
 declare const EXHAUST_TOOLTIP4: string;
 declare const EXIT: string;
 declare const EXIT_GAME: string;
 declare const EXOTICS: string;
 declare const EXPANSION_NAME0: string;
 declare const EXPANSION_NAME1: string;
 declare const EXPANSION_NAME2: string;
 declare const EXPERIENCE_COLON: string;
 declare const EXPERTISE_ABBR: string;
 declare const EXTENDED: string;
 declare const EXTEND_RAID_LOCK: string;
 declare const EXTRA_ATTACKS: string;
 declare const EYE_SEPARATION: string;
 declare const English: string;
 declare const FACIAL_HAIR_EARRINGS: string;
 declare const FACIAL_HAIR_FEATURES: string;
 declare const FACIAL_HAIR_HAIR: string;
 declare const FACIAL_HAIR_HORNS: string;
 declare const FACIAL_HAIR_MARKINGS: string;
 declare const FACIAL_HAIR_NORMAL: string;
 declare const FACIAL_HAIR_PIERCINGS: string;
 declare const FACIAL_HAIR_TUSKS: string;
 declare const FACING_WRONG_DIRECTION: string;
 declare const FACTION: string;
 declare const FACTION_ALLIANCE: string;
 declare const FACTION_CONTROLLED_TERRITORY: string;
 declare const FACTION_HORDE: string;
 declare const FACTION_INACTIVE: string;
 declare const FACTION_OTHER: string;
 declare const FACTION_STANDING_CHANGED: string;
 declare const FACTION_STANDING_DECREASED: string;
 declare const FACTION_STANDING_DECREASED_GENERIC: string;
 declare const FACTION_STANDING_INCREASED: string;
 declare const FACTION_STANDING_INCREASED_BONUS: string;
 declare const FACTION_STANDING_INCREASED_GENERIC: string;
 declare const FACTION_STANDING_LABEL1: string;
 declare const FACTION_STANDING_LABEL1_FEMALE: string;
 declare const FACTION_STANDING_LABEL2: string;
 declare const FACTION_STANDING_LABEL2_FEMALE: string;
 declare const FACTION_STANDING_LABEL3: string;
 declare const FACTION_STANDING_LABEL3_FEMALE: string;
 declare const FACTION_STANDING_LABEL4: string;
 declare const FACTION_STANDING_LABEL4_FEMALE: string;
 declare const FACTION_STANDING_LABEL5: string;
 declare const FACTION_STANDING_LABEL5_FEMALE: string;
 declare const FACTION_STANDING_LABEL6: string;
 declare const FACTION_STANDING_LABEL6_FEMALE: string;
 declare const FACTION_STANDING_LABEL7: string;
 declare const FACTION_STANDING_LABEL7_FEMALE: string;
 declare const FACTION_STANDING_LABEL8: string;
 declare const FACTION_STANDING_LABEL8_FEMALE: string;
 declare const FAILED: string;
 declare const FAILURES: string;
 declare const FAR: string;
 declare const FARCLIP: string;
 declare const FEATURES_LABEL: string;
 declare const FEATURES_SUBTEXT: string;
 declare const FEATURE_BECOMES_AVAILABLE_AT_LEVEL: string;
 declare const FEAT_OF_STRENGTH_DESCRIPTION: string;
 declare const FEEDPET_LOG_FIRSTPERSON: string;
 declare const FEEDPET_LOG_THIRDPERSON: string;
 declare const FEETSLOT: string;
 declare const FEMALE: string;
 declare const FERAL_DRUID_ITEM_AP: string;
 declare const FILTER: string;
 declare const FILTERS: string;
 declare const FILTER_BY_ENEMIES_COMBATLOG_TOOLTIP: string;
 declare const FILTER_BY_FRIENDS_COMBATLOG_TOOLTIP: string;
 declare const FILTER_BY_HOSTILE_PLAYERS_COMBATLOG_TOOLTIP: string;
 declare const FILTER_BY_ME_COMBATLOG_TOOLTIP: string;
 declare const FILTER_BY_NEUTRAL_COMBATLOG_TOOLTIP: string;
 declare const FILTER_BY_PET_COMBATLOG_TOOLTIP: string;
 declare const FILTER_BY_UNKNOWN_COMBATLOG_TOOLTIP: string;
 declare const FILTER_NAME: string;
 declare const FILTER_TO_FRIENDS_COMBATLOG_TOOLTIP: string;
 declare const FILTER_TO_HOSTILE_COMBATLOG_TOOLTIP: string;
 declare const FILTER_TO_HOSTILE_PLAYERS_COMBATLOG_TOOLTIP: string;
 declare const FILTER_TO_ME_COMBATLOG_TOOLTIP: string;
 declare const FILTER_TO_NEUTRAL_COMBATLOG_TOOLTIP: string;
 declare const FILTER_TO_PET_COMBATLOG_TOOLTIP: string;
 declare const FILTER_TO_UNKNOWN_COMBATLOG_TOOLTIP: string;
 declare const FIND_A_GROUP: string;
 declare const FIND_DUNGEON: string;
 declare const FINGER0SLOT: string;
 declare const FINGER0SLOT_UNIQUE: string;
 declare const FINGER1SLOT: string;
 declare const FINGER1SLOT_UNIQUE: string;
 declare const FIRST_AVAILABLE: string;
 declare const FIRST_AVAILABLE_TOOLTIP: string;
 declare const FIRST_NUMBER_CAP: string;
 declare const FIX_LAG: string;
 declare const FLAG_COUNT_TEMPLATE: string;
 declare const FLOOR: string;
 declare const FLOOR_NUMBER: string;
 declare const FOCUS: string;
 declare const FOCUSTARGET: string;
 declare const FOCUS_CAST_KEY_TEXT: string;
 declare const FOCUS_COST: string;
 declare const FOCUS_COST_PER_TIME: string;
 declare const FOCUS_TOKEN_NOT_FOUND: string;
 declare const FOLLOW: string;
 declare const FOLLOW_TERRAIN: string;
 declare const FONT_SIZE: string;
 declare const FONT_SIZE_TEMPLATE: string;
 declare const FOOD_TIMER: string;
 declare const FOREIGN_SERVER_LABEL: string;
 declare const FORMATED_HOURS: string;
 declare const FORMATTING: string;
 declare const FPS_ABBR: string;
 declare const FRAMERATE_LABEL: string;
 declare const FREE_FOR_ALL_TERRITORY: string;
 declare const FRFR: string;
 declare const FRIEND: string;
 declare const FRIENDLY: string;
 declare const FRIENDS: string;
 declare const FRIENDS_FRIENDS_CHOICE_EVERYONE: string;
 declare const FRIENDS_FRIENDS_CHOICE_MUTUAL: string;
 declare const FRIENDS_FRIENDS_CHOICE_POTENTIAL: string;
 declare const FRIENDS_FRIENDS_HEADER: string;
 declare const FRIENDS_FRIENDS_MUTUAL_TEXT: string;
 declare const FRIENDS_FRIENDS_REQUESTED_TEXT: string;
 declare const FRIENDS_FRIENDS_WAITING: string;
 declare const FRIENDS_LEVEL_TEMPLATE: string;
 declare const FRIENDS_LIST: string;
 declare const FRIENDS_LIST_AVAILABLE: string;
 declare const FRIENDS_LIST_AWAY: string;
 declare const FRIENDS_LIST_BUSY: string;
 declare const FRIENDS_LIST_ENTER_TEXT: string;
 declare const FRIENDS_LIST_NOTE_OFFLINE_TEMPLATE: string;
 declare const FRIENDS_LIST_NOTE_TEMPLATE: string;
 declare const FRIENDS_LIST_OFFLINE: string;
 declare const FRIENDS_LIST_OFFLINE_TEMPLATE: string;
 declare const FRIENDS_LIST_ONLINE: string;
 declare const FRIENDS_LIST_PLAYING: string;
 declare const FRIENDS_LIST_REALM: string;
 declare const FRIENDS_LIST_STATUS_TOOLTIP: string;
 declare const FRIENDS_LIST_TEMPLATE: string;
 declare const FRIENDS_LIST_WOW_TEMPLATE: string;
 declare const FRIENDS_LIST_ZONE: string;
 declare const FRIENDS_TOOLTIP_TOO_MANY_CHARACTERS: string;
 declare const FRIENDS_TOOLTIP_WOW_TOON_TEMPLATE: string;
 declare const FROM: string;
 declare const FUEL: string;
 declare const FULLDATE: string;
 declare const FULLDATE_AND_TIME: string;
 declare const FULLDATE_MONTH_APRIL: string;
 declare const FULLDATE_MONTH_AUGUST: string;
 declare const FULLDATE_MONTH_DECEMBER: string;
 declare const FULLDATE_MONTH_FEBRUARY: string;
 declare const FULLDATE_MONTH_JANUARY: string;
 declare const FULLDATE_MONTH_JULY: string;
 declare const FULLDATE_MONTH_JUNE: string;
 declare const FULLDATE_MONTH_MARCH: string;
 declare const FULLDATE_MONTH_MAY: string;
 declare const FULLDATE_MONTH_NOVEMBER: string;
 declare const FULLDATE_MONTH_OCTOBER: string;
 declare const FULLDATE_MONTH_SEPTEMBER: string;
 declare const FULL_SCREEN_GLOW: string;
 declare const FULL_SIZE_FOCUS_FRAME_TEXT: string;
 declare const FULL_TEXT_COMBATLOG_TOOLTIP: string;
 declare const GAIN_EXPERIENCE: string;
 declare const GAME: string;
 declare const GAMEFIELD_DESELECT_TEXT: string;
 declare const GAMEOPTIONS_MENU: string;
 declare const GAMES: string;
 declare const GAMETIME_TOOLTIP_CALENDAR_INVITES: string;
 declare const GAMETIME_TOOLTIP_TOGGLE_CALENDAR: string;
 declare const GAMETIME_TOOLTIP_TOGGLE_CLOCK: string;
 declare const GAME_SOUND_OUTPUT: string;
 declare const GAME_VERSION_LABEL: string;
 declare const GAMMA: string;
 declare const GEARSETS_POPUP_TEXT: string;
 declare const GEARSETS_TITLE: string;
 declare const GENERAL: string;
 declare const GENERAL_LABEL: string;
 declare const GENERAL_MACROS: string;
 declare const GENERAL_SPELLS: string;
 declare const GENERAL_SUBTEXT: string;
 declare const GIVE_LOOT: string;
 declare const GLANCING_TRAILER: string;
 declare const GLOBAL_CHANNELS: string;
 declare const GLYPHS: string;
 declare const GLYPH_EMPTY: string;
 declare const GLYPH_EMPTY_DESC: string;
 declare const GLYPH_FILLED: string;
 declare const GLYPH_INACTIVE: string;
 declare const GLYPH_LOCKED: string;
 declare const GLYPH_SLOT_REMOVE_TOOLTIP: string;
 declare const GLYPH_SLOT_TOOLTIP1: string;
 declare const GLYPH_SLOT_TOOLTIP2: string;
 declare const GLYPH_SLOT_TOOLTIP3: string;
 declare const GLYPH_SLOT_TOOLTIP4: string;
 declare const GLYPH_SLOT_TOOLTIP5: string;
 declare const GLYPH_SLOT_TOOLTIP6: string;
 declare const GMSURVEYRATING1: string;
 declare const GMSURVEYRATING2: string;
 declare const GMSURVEYRATING3: string;
 declare const GMSURVEYRATING4: string;
 declare const GMSURVEYRATING5: string;
 declare const GMSURVEY_BLOCK_TEXT: string;
 declare const GMSURVEY_EXCELLENT: string;
 declare const GMSURVEY_POOR: string;
 declare const GMSURVEY_REQUEST_TEXT: string;
 declare const GMSURVEY_SUBMITTED: string;
 declare const GMSURVEY_TITLE: string;
 declare const GM_CHAT: string;
 declare const GM_CHAT_LAST_SESSION: string;
 declare const GM_CHAT_OPEN: string;
 declare const GM_CHAT_STATUS_READY: string;
 declare const GM_CHAT_STATUS_READY_DESCRIPTION: string;
 declare const GM_EMAIL_NAME: string;
 declare const GM_RESPONSE_ALERT: string;
 declare const GM_RESPONSE_FRAME_HEADER: string;
 declare const GM_RESPONSE_ISSUE_HEADER: string;
 declare const GM_RESPONSE_MESSAGE_HEADER: string;
 declare const GM_RESPONSE_MORE_HELP: string;
 declare const GM_RESPONSE_POPUP_MUST_RESOLVE_RESPONSE: string;
 declare const GM_RESPONSE_POPUP_NEED_MORE_HELP_WARNING: string;
 declare const GM_RESPONSE_POPUP_RESOLVE_CONFIRM: string;
 declare const GM_RESPONSE_POPUP_VIEW_RESPONSE: string;
 declare const GM_RESPONSE_RESOLVE: string;
 declare const GM_SURVEY_NOT_APPLICABLE: string;
 declare const GM_TICKET_ESCALATED: string;
 declare const GM_TICKET_HIGH_VOLUME: string;
 declare const GM_TICKET_SERVICE_SOON: string;
 declare const GM_TICKET_UNAVAILABLE: string;
 declare const GM_TICKET_WAIT_TIME: string;
 declare const GOLD_AMOUNT: string;
 declare const GOLD_AMOUNT_SYMBOL: string;
 declare const GOLD_AMOUNT_TEXTURE: string;
 declare const GOLD_PER_DAY: string;
 declare const GOODBYE: string;
 declare const GOSSIP_OPTIONS: string;
 declare const GREED: string;
 declare const GREED_NEWBIE: string;
 declare const GROUND_DENSITY: string;
 declare const GROUND_RADIUS: string;
 declare const GROUP: string;
 declare const GROUPS: string;
 declare const GROUP_INVITE: string;
 declare const GUIDE: string;
 declare const GUIDE_TOOLTIP: string;
 declare const GUILD: string;
 declare const GUILDADDRANK_BUTTON_TOOLTIP: string;
 declare const GUILDBANK_AVAILABLE_MONEY: string;
 declare const GUILDBANK_BUYTAB_MONEY_FORMAT: string;
 declare const GUILDBANK_DEPOSIT: string;
 declare const GUILDBANK_DEPOSIT_FORMAT: string;
 declare const GUILDBANK_DEPOSIT_MONEY_FORMAT: string;
 declare const GUILDBANK_INFO_TITLE_FORMAT: string;
 declare const GUILDBANK_LOG_QUANTITY: string;
 declare const GUILDBANK_LOG_TITLE_FORMAT: string;
 declare const GUILDBANK_MOVE_FORMAT: string;
 declare const GUILDBANK_NAME_CONFIG: string;
 declare const GUILDBANK_POPUP_TEXT: string;
 declare const GUILDBANK_REMAINING_MONEY: string;
 declare const GUILDBANK_REPAIR: string;
 declare const GUILDBANK_REPAIR_MONEY_FORMAT: string;
 declare const GUILDBANK_TAB_COLON: string;
 declare const GUILDBANK_TAB_DEPOSIT_ONLY: string;
 declare const GUILDBANK_TAB_FULL_ACCESS: string;
 declare const GUILDBANK_TAB_LOCKED: string;
 declare const GUILDBANK_TAB_NUMBER: string;
 declare const GUILDBANK_TAB_WITHDRAW_ONLY: string;
 declare const GUILDBANK_WITHDRAW: string;
 declare const GUILDBANK_WITHDRAWFORTAB_MONEY_FORMAT: string;
 declare const GUILDBANK_WITHDRAW_FORMAT: string;
 declare const GUILDBANK_WITHDRAW_MONEY_FORMAT: string;
 declare const GUILDCONTROL: string;
 declare const GUILDCONTROL_ALLOWRANK: string;
 declare const GUILDCONTROL_DEPOSIT_ITEMS: string;
 declare const GUILDCONTROL_OPTION1: string;
 declare const GUILDCONTROL_OPTION10: string;
 declare const GUILDCONTROL_OPTION11: string;
 declare const GUILDCONTROL_OPTION12: string;
 declare const GUILDCONTROL_OPTION13: string;
 declare const GUILDCONTROL_OPTION14: string;
 declare const GUILDCONTROL_OPTION15: string;
 declare const GUILDCONTROL_OPTION15_TOOLTIP: string;
 declare const GUILDCONTROL_OPTION16: string;
 declare const GUILDCONTROL_OPTION16_TOOLTIP: string;
 declare const GUILDCONTROL_OPTION17: string;
 declare const GUILDCONTROL_OPTION2: string;
 declare const GUILDCONTROL_OPTION3: string;
 declare const GUILDCONTROL_OPTION4: string;
 declare const GUILDCONTROL_OPTION5: string;
 declare const GUILDCONTROL_OPTION6: string;
 declare const GUILDCONTROL_OPTION7: string;
 declare const GUILDCONTROL_OPTION8: string;
 declare const GUILDCONTROL_OPTION9: string;
 declare const GUILDCONTROL_RANKLABEL: string;
 declare const GUILDCONTROL_SELECTRANK: string;
 declare const GUILDCONTROL_UPDATE_TEXT: string;
 declare const GUILDCONTROL_VIEW_TAB: string;
 declare const GUILDCONTROL_WITHDRAW_GOLD: string;
 declare const GUILDCONTROL_WITHDRAW_ITEMS: string;
 declare const GUILDEVENT_TYPE_DEMOTE: string;
 declare const GUILDEVENT_TYPE_INVITE: string;
 declare const GUILDEVENT_TYPE_JOIN: string;
 declare const GUILDEVENT_TYPE_PROMOTE: string;
 declare const GUILDEVENT_TYPE_QUIT: string;
 declare const GUILDEVENT_TYPE_REMOVE: string;
 declare const GUILDMEMBER_ALERT: string;
 declare const GUILDMOTD_BUTTON_TOOLTIP: string;
 declare const GUILDNOTE_BUTTON_TOOLTIP: string;
 declare const GUILDOFFICERNOTE_BUTTON_TOOLTIP: string;
 declare const GUILDREMOVERANK_BUTTON_TOOLTIP: string;
 declare const GUILD_ACHIEVEMENT: string;
 declare const GUILD_BANK: string;
 declare const GUILD_BANK_LOG: string;
 declare const GUILD_BANK_LOG_TIME: string;
 declare const GUILD_BANK_MONEY_LOG: string;
 declare const GUILD_BANK_TAB_INFO: string;
 declare const GUILD_CHARTER: string;
 declare const GUILD_CHARTER_CREATOR: string;
 declare const GUILD_CHARTER_PURCHASE: string;
 declare const GUILD_CHARTER_REGISTER: string;
 declare const GUILD_CHARTER_TEMPLATE: string;
 declare const GUILD_CHARTER_TITLE: string;
 declare const GUILD_CHAT: string;
 declare const GUILD_CREST_DESIGN: string;
 declare const GUILD_EVENT_LOG: string;
 declare const GUILD_FRAME_TITLE: string;
 declare const GUILD_HELP_TEXT_LINE1: string;
 declare const GUILD_HELP_TEXT_LINE2: string;
 declare const GUILD_HELP_TEXT_LINE3: string;
 declare const GUILD_HELP_TEXT_LINE4: string;
 declare const GUILD_HELP_TEXT_LINE5: string;
 declare const GUILD_HELP_TEXT_LINE6: string;
 declare const GUILD_HELP_TEXT_LINE7: string;
 declare const GUILD_HELP_TEXT_LINE8: string;
 declare const GUILD_HELP_TEXT_LINE9: string;
 declare const GUILD_HELP_TEXT_LINE10: string;
 declare const GUILD_HELP_TEXT_LINE11: string;
 declare const GUILD_HELP_TEXT_LINE12: string;
 declare const GUILD_HELP_TEXT_LINE13: string;
 declare const GUILD_INFORMATION: string;
 declare const GUILD_INFO_EDITLABEL: string;
 declare const GUILD_INFO_TEMPLATE: string;
 declare const GUILD_INVITATION: string;
 declare const GUILD_LEAVE: string;
 declare const GUILD_MEMBER_OPTIONS: string;
 declare const GUILD_MEMBER_TEMPLATE: string;
 declare const GUILD_MESSAGE: string;
 declare const GUILD_MOTD: string;
 declare const GUILD_MOTD_EDITLABEL: string;
 declare const GUILD_MOTD_LABEL: string;
 declare const GUILD_MOTD_LABEL2: string;
 declare const GUILD_MOTD_TEMPLATE: string;
 declare const GUILD_NAME: string;
 declare const GUILD_NAME_TEMPLATE: string;
 declare const GUILD_NOTES_LABEL: string;
 declare const GUILD_NOTE_EDITLABEL: string;
 declare const GUILD_NOT_ALLIED_S: string;
 declare const GUILD_OFFICERNOTES_LABEL: string;
 declare const GUILD_OFFICERNOTE_EDITLABEL: string;
 declare const GUILD_OFFICER_NOTE: string;
 declare const GUILD_ONLINE_LABEL: string;
 declare const GUILD_PETITION_LEADER_INSTRUCTIONS: string;
 declare const GUILD_PETITION_MEMBER_INSTRUCTIONS: string;
 declare const GUILD_PROMOTE: string;
 declare const GUILD_RANK0_DESC: string;
 declare const GUILD_RANK1_DESC: string;
 declare const GUILD_RANK2_DESC: string;
 declare const GUILD_RANK3_DESC: string;
 declare const GUILD_RANK4_DESC: string;
 declare const GUILD_REGISTRAR_PURCHASE_TEXT: string;
 declare const GUILD_ROSTER_TEMPLATE: string;
 declare const GUILD_STATUS: string;
 declare const GUILD_TEMPLATE: string;
 declare const GUILD_TITLE_TEMPLATE: string;
 declare const GUILD_TOTAL: string;
 declare const GUILD_TOTALONLINE: string;
 declare const HAIR_HORNS_COLOR: string;
 declare const HAIR_HORNS_STYLE: string;
 declare const HAIR_NORMAL_COLOR: string;
 declare const HAIR_NORMAL_STYLE: string;
 declare const HANDSSLOT: string;
 declare const HAPPINESS: string;
 declare const HARASSMENT: string;
 declare const HARASSMENT_POLICY_TEXT: string;
 declare const HARASSMENT_TEXT: string;
 declare const HARDWARE: string;
 declare const HARDWARE_CURSOR: string;
 declare const HARMFUL_AURA_COMBATLOG_TOOLTIP: string;
 declare const HATRED: string;
 declare const HAVE_MAIL: string;
 declare const HAVE_MAIL_FROM: string;
 declare const HEADSLOT: string;
 declare const HEAD_BOB: string;
 declare const HEALER: string;
 declare const HEALING_DONE_TOOLTIP: string;
 declare const HEALS: string;
 declare const HEALTH: string;
 declare const HEALTH_COLON: string;
 declare const HEALTH_COST: string;
 declare const HEALTH_COST_PER_TIME: string;
 declare const HEALTH_LOW: string;
 declare const HELPFRAME_ACCOUNT_BULLET1: string;
 declare const HELPFRAME_ACCOUNT_BULLET2: string;
 declare const HELPFRAME_ACCOUNT_BULLET3: string;
 declare const HELPFRAME_ACCOUNT_BULLET4: string;
 declare const HELPFRAME_ACCOUNT_BULLET_TITLE1: string;
 declare const HELPFRAME_ACCOUNT_BUTTON_TEXT: string;
 declare const HELPFRAME_ACCOUNT_ENDTEXT: string;
 declare const HELPFRAME_ACCOUNT_TEXT: string;
 declare const HELPFRAME_ACCOUNT_TITLE: string;
 declare const HELPFRAME_BUG_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_BUG_BUTTON_TEXT: string;
 declare const HELPFRAME_CHARACTER_BULLET1: string;
 declare const HELPFRAME_CHARACTER_BULLET2: string;
 declare const HELPFRAME_CHARACTER_BULLET3: string;
 declare const HELPFRAME_CHARACTER_BULLET4: string;
 declare const HELPFRAME_CHARACTER_BULLET5: string;
 declare const HELPFRAME_CHARACTER_BULLET_TITLE1: string;
 declare const HELPFRAME_CHARACTER_BUTTON_TEXT: string;
 declare const HELPFRAME_CHARACTER_TEXT: string;
 declare const HELPFRAME_CHARACTER_TITLE: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET1: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET2: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET3: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET4: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET5: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET6: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET_TITLE1: string;
 declare const HELPFRAME_ENVIRONMENTAL_BULLET_TITLE2: string;
 declare const HELPFRAME_ENVIRONMENTAL_BUTTON_TEXT: string;
 declare const HELPFRAME_ENVIRONMENTAL_TEXT: string;
 declare const HELPFRAME_ENVIRONMENTAL_TITLE: string;
 declare const HELPFRAME_GENERAL_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_GENERAL_BUTTON_TEXT: string;
 declare const HELPFRAME_GMTALK_ISSUE1: string;
 declare const HELPFRAME_GMTALK_ISSUE1_HEADER: string;
 declare const HELPFRAME_GMTALK_ISSUE2: string;
 declare const HELPFRAME_GMTALK_ISSUE2_HEADER: string;
 declare const HELPFRAME_GMTALK_ISSUE3: string;
 declare const HELPFRAME_GMTALK_ISSUE3_HEADER: string;
 declare const HELPFRAME_GMTALK_TEXT1: string;
 declare const HELPFRAME_GMTALK_TEXT2: string;
 declare const HELPFRAME_GMTALK_TITLE: string;
 declare const HELPFRAME_GM_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_GM_BUTTON_TEXT: string;
 declare const HELPFRAME_GUILD_BULLET1: string;
 declare const HELPFRAME_GUILD_BULLET2: string;
 declare const HELPFRAME_GUILD_BULLET3: string;
 declare const HELPFRAME_GUILD_BULLET_TITLE1: string;
 declare const HELPFRAME_GUILD_BUTTON_TEXT: string;
 declare const HELPFRAME_GUILD_TEXT: string;
 declare const HELPFRAME_GUILD_TITLE: string;
 declare const HELPFRAME_HARASSMENT_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_HARASSMENT_BUTTON_TEXT: string;
 declare const HELPFRAME_HOME_TEXT: string;
 declare const HELPFRAME_ITEM_BULLET1: string;
 declare const HELPFRAME_ITEM_BULLET2: string;
 declare const HELPFRAME_ITEM_BULLET3: string;
 declare const HELPFRAME_ITEM_BULLET4: string;
 declare const HELPFRAME_ITEM_BULLET5: string;
 declare const HELPFRAME_ITEM_BULLET6: string;
 declare const HELPFRAME_ITEM_BULLET7: string;
 declare const HELPFRAME_ITEM_BULLET_TITLE1: string;
 declare const HELPFRAME_ITEM_BULLET_TITLE2: string;
 declare const HELPFRAME_ITEM_BUTTON_TEXT: string;
 declare const HELPFRAME_ITEM_TEXT: string;
 declare const HELPFRAME_ITEM_TITLE: string;
 declare const HELPFRAME_LAG_TEXT1: string;
 declare const HELPFRAME_LAG_TITLE: string;
 declare const HELPFRAME_NONQUEST_BULLET1: string;
 declare const HELPFRAME_NONQUEST_BULLET2: string;
 declare const HELPFRAME_NONQUEST_BULLET3: string;
 declare const HELPFRAME_NONQUEST_BULLET4: string;
 declare const HELPFRAME_NONQUEST_BULLET5: string;
 declare const HELPFRAME_NONQUEST_BULLET6: string;
 declare const HELPFRAME_NONQUEST_BULLET7: string;
 declare const HELPFRAME_NONQUEST_BULLET_TITLE1: string;
 declare const HELPFRAME_NONQUEST_BULLET_TITLE2: string;
 declare const HELPFRAME_NONQUEST_BUTTON_TEXT: string;
 declare const HELPFRAME_NONQUEST_TEXT: string;
 declare const HELPFRAME_NONQUEST_TITLE: string;
 declare const HELPFRAME_OPENTICKET_EDITTEXT: string;
 declare const HELPFRAME_OPENTICKET_FOLLOWUPTEXT: string;
 declare const HELPFRAME_OPENTICKET_TEXT: string;
 declare const HELPFRAME_OTHER_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_OTHER_BUTTON_TEXT: string;
 declare const HELPFRAME_QUEST_BULLET1: string;
 declare const HELPFRAME_QUEST_BULLET2: string;
 declare const HELPFRAME_QUEST_BULLET3: string;
 declare const HELPFRAME_QUEST_BULLET4: string;
 declare const HELPFRAME_QUEST_BULLET5: string;
 declare const HELPFRAME_QUEST_BULLET_TITLE1: string;
 declare const HELPFRAME_QUEST_BULLET_TITLE2: string;
 declare const HELPFRAME_QUEST_BUTTON_TEXT: string;
 declare const HELPFRAME_QUEST_TEXT: string;
 declare const HELPFRAME_QUEST_TITLE: string;
 declare const HELPFRAME_REPORTISSUE_BULLET1: string;
 declare const HELPFRAME_REPORTISSUE_BULLET2: string;
 declare const HELPFRAME_REPORTISSUE_BULLET_TITLE1: string;
 declare const HELPFRAME_REPORTISSUE_TEXT1: string;
 declare const HELPFRAME_REPORTISSUE_TEXT2: string;
 declare const HELPFRAME_REPORTISSUE_TITLE: string;
 declare const HELPFRAME_REPORTLAG_TEXT1: string;
 declare const HELPFRAME_STUCK_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_STUCK_BUTTON_TEXT: string;
 declare const HELPFRAME_STUCK_TEXT1: string;
 declare const HELPFRAME_STUCK_TITLE: string;
 declare const HELPFRAME_SUGGESTION_BUTTON_DESCRIPTION: string;
 declare const HELPFRAME_SUGGESTION_BUTTON_TEXT: string;
 declare const HELPFRAME_TECHNICAL_BULLET1: string;
 declare const HELPFRAME_TECHNICAL_BULLET2: string;
 declare const HELPFRAME_TECHNICAL_BULLET3: string;
 declare const HELPFRAME_TECHNICAL_BULLET4: string;
 declare const HELPFRAME_TECHNICAL_BULLET5: string;
 declare const HELPFRAME_TECHNICAL_BULLET6: string;
 declare const HELPFRAME_TECHNICAL_BULLET7: string;
 declare const HELPFRAME_TECHNICAL_BULLET_TITLE1: string;
 declare const HELPFRAME_TECHNICAL_BULLET_TITLE2: string;
 declare const HELPFRAME_TECHNICAL_BUTTON_TEXT: string;
 declare const HELPFRAME_TECHNICAL_TEXT: string;
 declare const HELPFRAME_TECHNICAL_TITLE: string;
 declare const HELPFRAME_WELCOME_TEXT1: string;
 declare const HELPFRAME_WELCOME_TITLE: string;
 declare const HELP_BUTTON: string;
 declare const HELP_FRAME_TITLE: string;
 declare const HELP_LABEL: string;
 declare const HELP_SUBTEXT: string;
 declare const HELP_TEXT_LINE1: string;
 declare const HELP_TEXT_LINE2: string;
 declare const HELP_TEXT_LINE3: string;
 declare const HELP_TEXT_LINE4: string;
 declare const HELP_TEXT_LINE5: string;
 declare const HELP_TEXT_LINE6: string;
 declare const HELP_TEXT_LINE7: string;
 declare const HELP_TEXT_LINE8: string;
 declare const HELP_TEXT_LINE9: string;
 declare const HELP_TEXT_LINE10: string;
 declare const HELP_TEXT_LINE11: string;
 declare const HELP_TEXT_LINE12: string;
 declare const HELP_TEXT_LINE13: string;
 declare const HELP_TEXT_LINE14: string;
 declare const HELP_TEXT_LINE15: string;
 declare const HELP_TEXT_SIMPLE: string;
 declare const HELP_TICKET_ABANDON: string;
 declare const HELP_TICKET_ABANDON_CONFIRM: string;
 declare const HELP_TICKET_EDIT: string;
 declare const HELP_TICKET_EDIT_ABANDON: string;
 declare const HELP_TICKET_OPEN: string;
 declare const HELP_TICKET_QUEUE_DISABLED: string;
 declare const HEROIC_PREFIX: string;
 declare const HERTZ: string;
 declare const HIDE: string;
 declare const HIDE_OUTDOOR_WORLD_STATE_TEXT: string;
 declare const HIDE_PARTY_INTERFACE_TEXT: string;
 declare const HIDE_PULLOUT_BG: string;
 declare const HIGH: string;
 declare const HIGHLIGHTING: string;
 declare const HIGHLIGHT_ABILITY_COMBATLOG_TOOLTIP: string;
 declare const HIGHLIGHT_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const HIGHLIGHT_KILL_COMBATLOG_TOOLTIP: string;
 declare const HIGHLIGHT_SCHOOL_COMBATLOG_TOOLTIP: string;
 declare const HIGH_BIDDER: string;
 declare const HIT: string;
 declare const HK: string;
 declare const HOME: string;
 declare const HOME_INN: string;
 declare const HONOR: string;
 declare const HONORABLE_KILLS: string;
 declare const HONORABLE_KILLS_TOOLTIP: string;
 declare const HONOR_CONTRIBUTION_POINTS: string;
 declare const HONOR_ESTIMATED_TOOLTIP: string;
 declare const HONOR_GAINED: string;
 declare const HONOR_GAINED_TOOLTIP: string;
 declare const HONOR_HIGHEST_RANK: string;
 declare const HONOR_LASTWEEK: string;
 declare const HONOR_LIFETIME: string;
 declare const HONOR_POINTS: string;
 declare const HONOR_STANDING: string;
 declare const HONOR_THIS_SESSION: string;
 declare const HONOR_TODAY: string;
 declare const HONOR_YESTERDAY: string;
 declare const HOSTILE: string;
 declare const HOURS: string;
 declare const HOURS_ABBR: string;
 declare const HOUR_ONELETTER_ABBR: string;
 declare const HP: string;
 declare const HP_TEMPLATE: string;
 declare const HUNTER_AGILITY_TOOLTIP: string;
 declare const HUNTER_INTELLECT_TOOLTIP: string;
 declare const ICON_TAG_RAID_TARGET_CIRCLE1: string;
 declare const ICON_TAG_RAID_TARGET_CIRCLE2: string;
 declare const ICON_TAG_RAID_TARGET_CROSS1: string;
 declare const ICON_TAG_RAID_TARGET_CROSS2: string;
 declare const ICON_TAG_RAID_TARGET_DIAMOND1: string;
 declare const ICON_TAG_RAID_TARGET_DIAMOND2: string;
 declare const ICON_TAG_RAID_TARGET_MOON1: string;
 declare const ICON_TAG_RAID_TARGET_MOON2: string;
 declare const ICON_TAG_RAID_TARGET_SKULL1: string;
 declare const ICON_TAG_RAID_TARGET_SKULL2: string;
 declare const ICON_TAG_RAID_TARGET_SQUARE1: string;
 declare const ICON_TAG_RAID_TARGET_SQUARE2: string;
 declare const ICON_TAG_RAID_TARGET_STAR1: string;
 declare const ICON_TAG_RAID_TARGET_STAR2: string;
 declare const ICON_TAG_RAID_TARGET_TRIANGLE1: string;
 declare const ICON_TAG_RAID_TARGET_TRIANGLE2: string;
 declare const ID: string;
 declare const IDLE_MESSAGE: string;
 declare const IGNORE: string;
 declare const IGNORED: string;
 declare const IGNORE_DIALOG: string;
 declare const IGNORE_ERRORS: string;
 declare const IGNORE_LIST: string;
 declare const IGNORE_PLAYER: string;
 declare const IGR_BILLING_NAG_DIALOG: string;
 declare const IMMUNE: string;
 declare const IMPORTANT_PEOPLE_IN_GROUP: string;
 declare const IM_STYLE: string;
 declare const INBOX: string;
 declare const INBOX_TOO_MUCH_MAIL: string;
 declare const INBOX_TOO_MUCH_MAIL_TOOLTIP: string;
 declare const INCOMPLETE: string;
 declare const INCREASE_POTENTIAL: string;
 declare const INDIVIDUALS: string;
 declare const INPUT_CHINESE: string;
 declare const INPUT_JAPANESE: string;
 declare const INPUT_KOREAN: string;
 declare const INPUT_ROMAN: string;
 declare const INSCRIPTION: string;
 declare const INSPECT: string;
 declare const INSPECT_NOTIFY: string;
 declare const INSTANCE: string;
 declare const INSTANCE_BOOT_TIMER: string;
 declare const INSTANCE_DIFFICULTY_FORMAT: string;
 declare const INSTANCE_ID: string;
 declare const INSTANCE_LEAVE: string;
 declare const INSTANCE_LOCK_SEPARATOR: string;
 declare const INSTANCE_LOCK_TIMER: string;
 declare const INSTANCE_LOCK_TIMER_PREVIOUSLY_SAVED: string;
 declare const INSTANCE_RESET_FAILED: string;
 declare const INSTANCE_RESET_FAILED_OFFLINE: string;
 declare const INSTANCE_RESET_FAILED_ZONING: string;
 declare const INSTANCE_RESET_SUCCESS: string;
 declare const INSTANCE_SAVED: string;
 declare const INSTANCE_SHUTDOWN_MESSAGE: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_EXPANSION_TOO_LOW: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_GEAR_TOO_HIGH: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_GEAR_TOO_LOW: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_LEVEL_TOO_HIGH: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_LEVEL_TOO_LOW: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_MISSING_ITEM: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_OTHER: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_QUEST_NOT_COMPLETED: string;
 declare const INSTANCE_UNAVAILABLE_OTHER_RAID_LOCKED: string;
 declare const INSTANCE_UNAVAILABLE_SELF_EXPANSION_TOO_LOW: string;
 declare const INSTANCE_UNAVAILABLE_SELF_GEAR_TOO_HIGH: string;
 declare const INSTANCE_UNAVAILABLE_SELF_GEAR_TOO_LOW: string;
 declare const INSTANCE_UNAVAILABLE_SELF_LEVEL_TOO_HIGH: string;
 declare const INSTANCE_UNAVAILABLE_SELF_LEVEL_TOO_LOW: string;
 declare const INSTANCE_UNAVAILABLE_SELF_MISSING_ITEM: string;
 declare const INSTANCE_UNAVAILABLE_SELF_OTHER: string;
 declare const INSTANCE_UNAVAILABLE_SELF_QUEST_NOT_COMPLETED: string;
 declare const INSTANCE_UNAVAILABLE_SELF_RAID_LOCKED: string;
 declare const INT: string;
 declare const INTELLECT_COLON: string;
 declare const INTELLECT_TOOLTIP: string;
 declare const INTERFACE_ACTION_BLOCKED: string;
 declare const INTERFACE_OPTIONS: string;
 declare const INTERNAL_STRING_ERROR: string;
 declare const INTERRUPT: string;
 declare const INTERRUPTED: string;
 declare const INTERRUPTS: string;
 declare const INT_GENERAL_DURATION_DAYS: string;
 declare const INT_GENERAL_DURATION_HOURS: string;
 declare const INT_GENERAL_DURATION_MIN: string;
 declare const INT_GENERAL_DURATION_SEC: string;
 declare const INT_SPELL_DURATION_DAYS: string;
 declare const INT_SPELL_DURATION_HOURS: string;
 declare const INT_SPELL_DURATION_MIN: string;
 declare const INT_SPELL_DURATION_SEC: string;
 declare const INT_SPELL_POINTS_SPREAD_TEMPLATE: string;
 declare const INVENTORY_FULL: string;
 declare const INVENTORY_TOOLTIP: string;
 declare const INVERT_MOUSE: string;
 declare const INVITATION: string;
 declare const INVITE: string;
 declare const INVITE_CONVERSATION_INSTRUCTIONS: string;
 declare const INVITE_FRIEND_TO_CONVERSATION: string;
 declare const INVITE_TO_CONVERSATION: string;
 declare const INVTYPE_2HWEAPON: string;
 declare const INVTYPE_AMMO: string;
 declare const INVTYPE_BAG: string;
 declare const INVTYPE_BODY: string;
 declare const INVTYPE_CHEST: string;
 declare const INVTYPE_CLOAK: string;
 declare const INVTYPE_FEET: string;
 declare const INVTYPE_FINGER: string;
 declare const INVTYPE_HAND: string;
 declare const INVTYPE_HEAD: string;
 declare const INVTYPE_HOLDABLE: string;
 declare const INVTYPE_LEGS: string;
 declare const INVTYPE_NECK: string;
 declare const INVTYPE_QUIVER: string;
 declare const INVTYPE_RANGED: string;
 declare const INVTYPE_RANGEDRIGHT: string;
 declare const INVTYPE_RELIC: string;
 declare const INVTYPE_ROBE: string;
 declare const INVTYPE_SHIELD: string;
 declare const INVTYPE_SHOULDER: string;
 declare const INVTYPE_TABARD: string;
 declare const INVTYPE_THROWN: string;
 declare const INVTYPE_TRINKET: string;
 declare const INVTYPE_WAIST: string;
 declare const INVTYPE_WEAPON: string;
 declare const INVTYPE_WEAPONMAINHAND: string;
 declare const INVTYPE_WEAPONMAINHAND_PET: string;
 declare const INVTYPE_WEAPONOFFHAND: string;
 declare const INVTYPE_WRIST: string;
 declare const ITEMPRESENTINOFFHAND: string;
 declare const ITEMS: string;
 declare const ITEMSLOTTEXT: string;
 declare const ITEMS_EQUIPPED: string;
 declare const ITEMS_IN_INVENTORY: string;
 declare const ITEMS_NOT_IN_INVENTORY: string;
 declare const ITEMS_VARIABLE_QUANTITY: string;
 declare const ITEM_ACCOUNTBOUND: string;
 declare const ITEM_BIND_ON_EQUIP: string;
 declare const ITEM_BIND_ON_PICKUP: string;
 declare const ITEM_BIND_ON_USE: string;
 declare const ITEM_BIND_QUEST: string;
 declare const ITEM_BIND_TO_ACCOUNT: string;
 declare const ITEM_CANT_BE_DESTROYED: string;
 declare const ITEM_CLASSES_ALLOWED: string;
 declare const ITEM_CONJURED: string;
 declare const ITEM_COOLDOWN_TIME: string;
 declare const ITEM_COOLDOWN_TIME_DAYS: string;
 declare const ITEM_COOLDOWN_TIME_HOURS: string;
 declare const ITEM_COOLDOWN_TIME_MIN: string;
 declare const ITEM_COOLDOWN_TIME_SEC: string;
 declare const ITEM_COOLDOWN_TOTAL: string;
 declare const ITEM_COOLDOWN_TOTAL_DAYS: string;
 declare const ITEM_COOLDOWN_TOTAL_HOURS: string;
 declare const ITEM_COOLDOWN_TOTAL_MIN: string;
 declare const ITEM_COOLDOWN_TOTAL_SEC: string;
 declare const ITEM_CREATED_BY: string;
 declare const ITEM_DELTA_DESCRIPTION: string;
 declare const ITEM_DISENCHANT_ANY_SKILL: string;
 declare const ITEM_DISENCHANT_MIN_SKILL: string;
 declare const ITEM_DISENCHANT_NOT_DISENCHANTABLE: string;
 declare const ITEM_DURATION_DAYS: string;
 declare const ITEM_DURATION_HOURS: string;
 declare const ITEM_DURATION_MIN: string;
 declare const ITEM_DURATION_SEC: string;
 declare const ITEM_ENCHANT_DISCLAIMER: string;
 declare const ITEM_ENCHANT_TIME_LEFT_DAYS: string;
 declare const ITEM_ENCHANT_TIME_LEFT_HOURS: string;
 declare const ITEM_ENCHANT_TIME_LEFT_MIN: string;
 declare const ITEM_ENCHANT_TIME_LEFT_SEC: string;
 declare const ITEM_HEROIC: string;
 declare const ITEM_HEROIC_EPIC: string;
 declare const ITEM_LEVEL: string;
 declare const ITEM_LEVEL_AND_MIN: string;
 declare const ITEM_LEVEL_RANGE: string;
 declare const ITEM_LEVEL_RANGE_CURRENT: string;
 declare const ITEM_LIMIT_CATEGORY: string;
 declare const ITEM_LIMIT_CATEGORY_MULTIPLE: string;
 declare const ITEM_LOOT: string;
 declare const ITEM_MILLABLE: string;
 declare const ITEM_MIN_LEVEL: string;
 declare const ITEM_MIN_SKILL: string;
 declare const ITEM_MISSING: string;
 declare const ITEM_MOD_AGILITY: string;
 declare const ITEM_MOD_AGILITY_SHORT: string;
 declare const ITEM_MOD_ARMOR_PENETRATION_RATING: string;
 declare const ITEM_MOD_ARMOR_PENETRATION_RATING_SHORT: string;
 declare const ITEM_MOD_ATTACK_POWER: string;
 declare const ITEM_MOD_ATTACK_POWER_SHORT: string;
 declare const ITEM_MOD_BLOCK_RATING: string;
 declare const ITEM_MOD_BLOCK_RATING_SHORT: string;
 declare const ITEM_MOD_BLOCK_VALUE: string;
 declare const ITEM_MOD_BLOCK_VALUE_SHORT: string;
 declare const ITEM_MOD_CRIT_MELEE_RATING: string;
 declare const ITEM_MOD_CRIT_MELEE_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_RANGED_RATING: string;
 declare const ITEM_MOD_CRIT_RANGED_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_RATING: string;
 declare const ITEM_MOD_CRIT_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_SPELL_RATING: string;
 declare const ITEM_MOD_CRIT_SPELL_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_TAKEN_MELEE_RATING: string;
 declare const ITEM_MOD_CRIT_TAKEN_MELEE_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_TAKEN_RANGED_RATING: string;
 declare const ITEM_MOD_CRIT_TAKEN_RANGED_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_TAKEN_RATING: string;
 declare const ITEM_MOD_CRIT_TAKEN_RATING_SHORT: string;
 declare const ITEM_MOD_CRIT_TAKEN_SPELL_RATING: string;
 declare const ITEM_MOD_CRIT_TAKEN_SPELL_RATING_SHORT: string;
 declare const ITEM_MOD_DAMAGE_PER_SECOND_SHORT: string;
 declare const ITEM_MOD_DEFENSE_SKILL_RATING: string;
 declare const ITEM_MOD_DEFENSE_SKILL_RATING_SHORT: string;
 declare const ITEM_MOD_DODGE_RATING: string;
 declare const ITEM_MOD_DODGE_RATING_SHORT: string;
 declare const ITEM_MOD_EXPERTISE_RATING: string;
 declare const ITEM_MOD_EXPERTISE_RATING_SHORT: string;
 declare const ITEM_MOD_FERAL_ATTACK_POWER: string;
 declare const ITEM_MOD_FERAL_ATTACK_POWER_SHORT: string;
 declare const ITEM_MOD_HASTE_MELEE_RATING: string;
 declare const ITEM_MOD_HASTE_MELEE_RATING_SHORT: string;
 declare const ITEM_MOD_HASTE_RANGED_RATING: string;
 declare const ITEM_MOD_HASTE_RANGED_RATING_SHORT: string;
 declare const ITEM_MOD_HASTE_RATING: string;
 declare const ITEM_MOD_HASTE_RATING_SHORT: string;
 declare const ITEM_MOD_HASTE_SPELL_RATING: string;
 declare const ITEM_MOD_HASTE_SPELL_RATING_SHORT: string;
 declare const ITEM_MOD_HEALTH: string;
 declare const ITEM_MOD_HEALTH_REGEN: string;
 declare const ITEM_MOD_HEALTH_REGENERATION: string;
 declare const ITEM_MOD_HEALTH_REGENERATION_SHORT: string;
 declare const ITEM_MOD_HEALTH_REGEN_SHORT: string;
 declare const ITEM_MOD_HEALTH_SHORT: string;
 declare const ITEM_MOD_HIT_MELEE_RATING: string;
 declare const ITEM_MOD_HIT_MELEE_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_RANGED_RATING: string;
 declare const ITEM_MOD_HIT_RANGED_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_RATING: string;
 declare const ITEM_MOD_HIT_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_SPELL_RATING: string;
 declare const ITEM_MOD_HIT_SPELL_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_TAKEN_MELEE_RATING: string;
 declare const ITEM_MOD_HIT_TAKEN_MELEE_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_TAKEN_RANGED_RATING: string;
 declare const ITEM_MOD_HIT_TAKEN_RANGED_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_TAKEN_RATING: string;
 declare const ITEM_MOD_HIT_TAKEN_RATING_SHORT: string;
 declare const ITEM_MOD_HIT_TAKEN_SPELL_RATING: string;
 declare const ITEM_MOD_HIT_TAKEN_SPELL_RATING_SHORT: string;
 declare const ITEM_MOD_INTELLECT: string;
 declare const ITEM_MOD_INTELLECT_SHORT: string;
 declare const ITEM_MOD_MANA: string;
 declare const ITEM_MOD_MANA_REGENERATION: string;
 declare const ITEM_MOD_MANA_REGENERATION_SHORT: string;
 declare const ITEM_MOD_MANA_SHORT: string;
 declare const ITEM_MOD_MELEE_ATTACK_POWER_SHORT: string;
 declare const ITEM_MOD_PARRY_RATING: string;
 declare const ITEM_MOD_PARRY_RATING_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN0_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN1_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN2_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN3_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN4_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN5_SHORT: string;
 declare const ITEM_MOD_POWER_REGEN6_SHORT: string;
 declare const ITEM_MOD_RANGED_ATTACK_POWER: string;
 declare const ITEM_MOD_RANGED_ATTACK_POWER_SHORT: string;
 declare const ITEM_MOD_RESILIENCE_RATING: string;
 declare const ITEM_MOD_RESILIENCE_RATING_SHORT: string;
 declare const ITEM_MOD_SPELL_DAMAGE_DONE: string;
 declare const ITEM_MOD_SPELL_DAMAGE_DONE_SHORT: string;
 declare const ITEM_MOD_SPELL_HEALING_DONE: string;
 declare const ITEM_MOD_SPELL_HEALING_DONE_SHORT: string;
 declare const ITEM_MOD_SPELL_PENETRATION: string;
 declare const ITEM_MOD_SPELL_PENETRATION_SHORT: string;
 declare const ITEM_MOD_SPELL_POWER: string;
 declare const ITEM_MOD_SPELL_POWER_SHORT: string;
 declare const ITEM_MOD_SPIRIT: string;
 declare const ITEM_MOD_SPIRIT_SHORT: string;
 declare const ITEM_MOD_STAMINA: string;
 declare const ITEM_MOD_STAMINA_SHORT: string;
 declare const ITEM_MOD_STRENGTH: string;
 declare const ITEM_MOD_STRENGTH_SHORT: string;
 declare const ITEM_MOUSE_OVER: string;
 declare const ITEM_NAMES: string;
 declare const ITEM_NAMES_SHOW_BRACES_COMBATLOG_TOOLTIP: string;
 declare const ITEM_NO_DROP: string;
 declare const ITEM_OPENABLE: string;
 declare const ITEM_PROPOSED_ENCHANT: string;
 declare const ITEM_PROSPECTABLE: string;
 declare const ITEM_PURCHASED_COLON: string;
 declare const ITEM_QUALITY0_DESC: string;
 declare const ITEM_QUALITY1_DESC: string;
 declare const ITEM_QUALITY2_DESC: string;
 declare const ITEM_QUALITY3_DESC: string;
 declare const ITEM_QUALITY4_DESC: string;
 declare const ITEM_QUALITY5_DESC: string;
 declare const ITEM_QUALITY6_DESC: string;
 declare const ITEM_QUALITY7_DESC: string;
 declare const ITEM_QUANTITY_TEMPLATE: string;
 declare const ITEM_RACES_ALLOWED: string;
 declare const ITEM_RANDOM_ENCHANT: string;
 declare const ITEM_READABLE: string;
 declare const ITEM_REFUND_MSG: string;
 declare const ITEM_REQ_ARENA_RATING: string;
 declare const ITEM_REQ_ARENA_RATING_3V3: string;
 declare const ITEM_REQ_ARENA_RATING_5V5: string;
 declare const ITEM_REQ_PURCHASE_GROUP: string;
 declare const ITEM_REQ_REPUTATION: string;
 declare const ITEM_REQ_SKILL: string;
 declare const ITEM_RESIST_ALL: string;
 declare const ITEM_RESIST_SINGLE: string;
 declare const ITEM_SET_BONUS: string;
 declare const ITEM_SET_BONUS_GRAY: string;
 declare const ITEM_SET_NAME: string;
 declare const ITEM_SIGNABLE: string;
 declare const ITEM_SLOTS_IGNORED: string;
 declare const ITEM_SOCKETABLE: string;
 declare const ITEM_SOCKETING: string;
 declare const ITEM_SOCKET_BONUS: string;
 declare const ITEM_SOLD_COLON: string;
 declare const ITEM_SOULBOUND: string;
 declare const ITEM_SPELL_CHARGES: string;
 declare const ITEM_SPELL_CHARGES_NONE: string;
 declare const ITEM_SPELL_EFFECT: string;
 declare const ITEM_SPELL_KNOWN: string;
 declare const ITEM_SPELL_TRIGGER_ONEQUIP: string;
 declare const ITEM_SPELL_TRIGGER_ONPROC: string;
 declare const ITEM_SPELL_TRIGGER_ONUSE: string;
 declare const ITEM_STARTS_QUEST: string;
 declare const ITEM_SUFFIX_TEMPLATE: string;
 declare const ITEM_TEXT_FROM: string;
 declare const ITEM_UNIQUE: string;
 declare const ITEM_UNIQUE_EQUIPPABLE: string;
 declare const ITEM_UNIQUE_MULTIPLE: string;
 declare const ITEM_UNSELLABLE: string;
 declare const ITEM_WRAPPED_BY: string;
 declare const ITEM_WRITTEN_BY: string;
 declare const ITEM_WRONG_CLASS: string;
 declare const ITEM_WRONG_RACE: string;
 declare const ITUNES_SHOW_ALL_TRACK_CHANGES: string;
 declare const ITUNES_SHOW_ALL_TRACK_CHANGES_TOOLTIP: string;
 declare const ITUNES_SHOW_FEEDBACK: string;
 declare const ITUNES_SHOW_FEEDBACK_TOOLTIP: string;
 declare const JOIN: string;
 declare const JOINED_PARTY: string;
 declare const JOIN_AS_GROUP: string;
 declare const JOIN_AS_GROUP_TOOLTIP: string;
 declare const JOIN_AS_PARTY: string;
 declare const JOIN_NEW_CHANNEL: string;
 declare const KBASE_ARTICLE_COUNT: string;
 declare const KBASE_ARTICLE_ID: string;
 declare const KBASE_CHARSTUCK: string;
 declare const KBASE_DEFAULT_SEARCH_TEXT: string;
 declare const KBASE_ERROR_LOAD_FAILURE: string;
 declare const KBASE_ERROR_NO_RESULTS: string;
 declare const KBASE_GMTALK: string;
 declare const KBASE_HOT_ISSUE: string;
 declare const KBASE_LAG: string;
 declare const KBASE_RECENTLY_UPDATED: string;
 declare const KBASE_REPORTISSUE: string;
 declare const KBASE_SEARCH_RESULTS: string;
 declare const KBASE_TOP_ISSUES: string;
 declare const KEY1: string;
 declare const KEY2: string;
 declare const KEYBINDINGFRAME_MOUSEWHEEL_ERROR: string;
 declare const KEYRING: string;
 declare const KEY_APOSTROPHE: string;
 declare const KEY_BACKSLASH: string;
 declare const KEY_BACKSPACE: string;
 declare const KEY_BACKSPACE_MAC: string;
 declare const KEY_BINDING: string;
 declare const KEY_BINDINGS: string;
 declare const KEY_BINDINGS_MAC: string;
 declare const KEY_BOUND: string;
 declare const KEY_BUTTON1: string;
 declare const KEY_BUTTON10: string;
 declare const KEY_BUTTON11: string;
 declare const KEY_BUTTON12: string;
 declare const KEY_BUTTON13: string;
 declare const KEY_BUTTON14: string;
 declare const KEY_BUTTON15: string;
 declare const KEY_BUTTON16: string;
 declare const KEY_BUTTON17: string;
 declare const KEY_BUTTON18: string;
 declare const KEY_BUTTON19: string;
 declare const KEY_BUTTON2: string;
 declare const KEY_BUTTON20: string;
 declare const KEY_BUTTON21: string;
 declare const KEY_BUTTON22: string;
 declare const KEY_BUTTON23: string;
 declare const KEY_BUTTON24: string;
 declare const KEY_BUTTON25: string;
 declare const KEY_BUTTON26: string;
 declare const KEY_BUTTON27: string;
 declare const KEY_BUTTON28: string;
 declare const KEY_BUTTON29: string;
 declare const KEY_BUTTON3: string;
 declare const KEY_BUTTON30: string;
 declare const KEY_BUTTON31: string;
 declare const KEY_BUTTON4: string;
 declare const KEY_BUTTON5: string;
 declare const KEY_BUTTON6: string;
 declare const KEY_BUTTON7: string;
 declare const KEY_BUTTON8: string;
 declare const KEY_BUTTON9: string;
 declare const KEY_COMMA: string;
 declare const KEY_DELETE: string;
 declare const KEY_DELETE_MAC: string;
 declare const KEY_DOWN: string;
 declare const KEY_END: string;
 declare const KEY_ENTER: string;
 declare const KEY_ENTER_MAC: string;
 declare const KEY_ESCAPE: string;
 declare const KEY_HOME: string;
 declare const KEY_INSERT: string;
 declare const KEY_INSERT_MAC: string;
 declare const KEY_LEFT: string;
 declare const KEY_LEFTBRACKET: string;
 declare const KEY_MINUS: string;
 declare const KEY_MOUSEWHEELDOWN: string;
 declare const KEY_MOUSEWHEELUP: string;
 declare const KEY_NUMLOCK: string;
 declare const KEY_NUMLOCK_MAC: string;
 declare const KEY_NUMPAD0: string;
 declare const KEY_NUMPAD1: string;
 declare const KEY_NUMPAD2: string;
 declare const KEY_NUMPAD3: string;
 declare const KEY_NUMPAD4: string;
 declare const KEY_NUMPAD5: string;
 declare const KEY_NUMPAD6: string;
 declare const KEY_NUMPAD7: string;
 declare const KEY_NUMPAD8: string;
 declare const KEY_NUMPAD9: string;
 declare const KEY_NUMPADDECIMAL: string;
 declare const KEY_NUMPADDIVIDE: string;
 declare const KEY_NUMPADMINUS: string;
 declare const KEY_NUMPADMULTIPLY: string;
 declare const KEY_NUMPADPLUS: string;
 declare const KEY_PAGEDOWN: string;
 declare const KEY_PAGEUP: string;
 declare const KEY_PAUSE: string;
 declare const KEY_PAUSE_MAC: string;
 declare const KEY_PERIOD: string;
 declare const KEY_PLUS: string;
 declare const KEY_PRINTSCREEN: string;
 declare const KEY_PRINTSCREEN_MAC: string;
 declare const KEY_RIGHT: string;
 declare const KEY_RIGHTBRACKET: string;
 declare const KEY_SCROLLLOCK: string;
 declare const KEY_SCROLLLOCK_MAC: string;
 declare const KEY_SEMICOLON: string;
 declare const KEY_SLASH: string;
 declare const KEY_SPACE: string;
 declare const KEY_TAB: string;
 declare const KEY_TILDE: string;
 declare const KEY_UNBOUND_ERROR: string;
 declare const KEY_UP: string;
 declare const KILLING_BLOWS: string;
 declare const KILLING_BLOW_TOOLTIP: string;
 declare const KILLS: string;
 declare const KILLS_COMBATLOG_TOOLTIP: string;
 declare const KILLS_PVP: string;
 declare const KNOWLEDGEBASE_FRAME_TITLE: string;
 declare const KNOWLEDGE_BASE: string;
 declare const KNOWN_TALENTS_HEADER: string;
 declare const KOKR: string;
 declare const LABEL_NOTE: string;
 declare const LALT_KEY_TEXT: string;
 declare const LANGUAGE: string;
 declare const LANGUAGES_LABEL: string;
 declare const LANGUAGES_SUBTEXT: string;
 declare const LASTONLINE: string;
 declare const LASTONLINE_DAYS: string;
 declare const LASTONLINE_HOURS: string;
 declare const LASTONLINE_MINS: string;
 declare const LASTONLINE_MINUTES: string;
 declare const LASTONLINE_MONTHS: string;
 declare const LASTONLINE_SECS: string;
 declare const LASTONLINE_YEARS: string;
 declare const LAST_ONLINE_COLON: string;
 declare const LATEST_UNLOCKED_ACHIEVEMENTS: string;
 declare const LATEST_UPDATED_STATS: string;
 declare const LAUGH_WORD1: string;
 declare const LAUGH_WORD2: string;
 declare const LAUGH_WORD3: string;
 declare const LAUGH_WORD4: string;
 declare const LAUGH_WORD5: string;
 declare const LAUGH_WORD6: string;
 declare const LAUGH_WORD7: string;
 declare const LAUGH_WORD8: string;
 declare const LAUGH_WORD9: string;
 declare const LCTRL_KEY_TEXT: string;
 declare const LEADER: string;
 declare const LEADER_TOOLTIP: string;
 declare const LEARN: string;
 declare const LEARN_SKILL_TEMPLATE: string;
 declare const LEAVE_ALL: string;
 declare const LEAVE_ARENA: string;
 declare const LEAVE_BATTLEGROUND: string;
 declare const LEAVE_CONVERSATION: string;
 declare const LEAVE_QUEUE: string;
 declare const LEAVE_VEHICLE: string;
 declare const LEAVE_ZONE: string;
 declare const LEAVING_COMBAT: string;
 declare const LEFT_PARTY: string;
 declare const LEGSSLOT: string;
 declare const LESS_THAN_ONE_MINUTE: string;
 declare const LEVEL: string;
 declare const LEVEL_ABBR: string;
 declare const LEVEL_GAINED: string;
 declare const LEVEL_GRANT: string;
 declare const LEVEL_RANGE: string;
 declare const LEVEL_REQUIRED: string;
 declare const LEVEL_TOO_LOW: string;
 declare const LEVEL_UP: string;
 declare const LEVEL_UP_CHAR_POINTS: string;
 declare const LEVEL_UP_HEALTH: string;
 declare const LEVEL_UP_HEALTH_MANA: string;
 declare const LEVEL_UP_SKILL_POINTS: string;
 declare const LEVEL_UP_STAT: string;
 declare const LFD_HOLIDAY_REWARD_EXPLANATION1: string;
 declare const LFD_HOLIDAY_REWARD_EXPLANATION2: string;
 declare const LFD_LEVEL_FORMAT_RANGE: string;
 declare const LFD_LEVEL_FORMAT_SINGLE: string;
 declare const LFD_RANDOM_EXPLANATION: string;
 declare const LFD_RANDOM_REWARD_EXPLANATION1: string;
 declare const LFD_RANDOM_REWARD_EXPLANATION2: string;
 declare const LFD_RANDOM_REWARD_PUG_EXPLANATION: string;
 declare const LFD_REWARDS: string;
 declare const LFGWIZARD_TITLE: string;
 declare const LFG_DESERTER_OTHER: string;
 declare const LFG_DESERTER_YOU: string;
 declare const LFG_DISABLED_LFM_TOOLTIP: string;
 declare const LFG_DISABLED_PARTY_TOOLTIP: string;
 declare const LFG_LABEL: string;
 declare const LFG_OFFER_CONTINUE: string;
 declare const LFG_RANDOM_COOLDOWN_OTHER: string;
 declare const LFG_RANDOM_COOLDOWN_YOU: string;
 declare const LFG_ROLES_TITLE: string;
 declare const LFG_ROLE_CHECK_ROLE_CHOSEN: string;
 declare const LFG_STATISTIC_AVERAGE_WAIT: string;
 declare const LFG_STATISTIC_AVERAGE_WAIT_UNKNOWN: string;
 declare const LFG_STATISTIC_MATCHES_MADE: string;
 declare const LFG_STATISTIC_PARTIES_IN_QUEUE: string;
 declare const LFG_STATISTIC_PLAYERS_IN_QUEUE: string;
 declare const LFG_TITLE: string;
 declare const LFG_TOOLTIP_ROLES: string;
 declare const LFG_TYPE_ANY_DUNGEON: string;
 declare const LFG_TYPE_ANY_HEROIC_DUNGEON: string;
 declare const LFG_TYPE_BATTLEGROUND: string;
 declare const LFG_TYPE_DAILY_DUNGEON: string;
 declare const LFG_TYPE_DAILY_HEROIC_DUNGEON: string;
 declare const LFG_TYPE_DUNGEON: string;
 declare const LFG_TYPE_HEROIC_DUNGEON: string;
 declare const LFG_TYPE_NONE: string;
 declare const LFG_TYPE_QUEST: string;
 declare const LFG_TYPE_RAID: string;
 declare const LFG_TYPE_RANDOM_DUNGEON: string;
 declare const LFG_TYPE_ZONE: string;
 declare const LFM_DISABLED_LFG_TOOLTIP: string;
 declare const LFM_NAME_TEMPLATE: string;
 declare const LFM_NUM_RAID_MEMBER_TEMPLATE: string;
 declare const LFM_TITLE: string;
 declare const LINK_TRADESKILL_TOOLTIP: string;
 declare const LIST_ME: string;
 declare const LIST_MY_GROUP: string;
 declare const LOCALE_INFORMATION: string;
 declare const LOCATION_COLON: string;
 declare const LOCK: string;
 declare const LOCKED: string;
 declare const LOCKED_WITH_ITEM: string;
 declare const LOCKED_WITH_SPELL: string;
 declare const LOCKED_WITH_SPELL_KNOWN: string;
 declare const LOCK_ACTIONBAR_TEXT: string;
 declare const LOCK_BATTLEFIELDMINIMAP: string;
 declare const LOCK_CHANNELPULLOUT_LABEL: string;
 declare const LOCK_EXPIRE: string;
 declare const LOCK_FOCUS_FRAME: string;
 declare const LOCK_WINDOW: string;
 declare const LOGOUT: string;
 declare const LOG_PERIODIC_EFFECTS: string;
 declare const LOOKING: string;
 declare const LOOKING_FOR: string;
 declare const LOOKING_FOR_DUNGEON: string;
 declare const LOOKING_FOR_GROUP_LABEL: string;
 declare const LOOKING_FOR_GROUP_LABEL2: string;
 declare const LOOKING_FOR_GROUP_TEXT: string;
 declare const LOOKING_FOR_MORE: string;
 declare const LOOKING_FOR_MORE_TEXT: string;
 declare const LOOKING_FOR_RAID: string;
 declare const LOOK_FOR_GROUP: string;
 declare const LOOK_FOR_MORE: string;
 declare const LOOT: string;
 declare const LOOTER: string;
 declare const LOOT_FREE_FOR_ALL: string;
 declare const LOOT_GONE: string;
 declare const LOOT_GROUP_LOOT: string;
 declare const LOOT_ITEM: string;
 declare const LOOT_ITEM_CREATED_SELF: string;
 declare const LOOT_ITEM_CREATED_SELF_MULTIPLE: string;
 declare const LOOT_ITEM_MULTIPLE: string;
 declare const LOOT_ITEM_PUSHED_SELF: string;
 declare const LOOT_ITEM_PUSHED_SELF_MULTIPLE: string;
 declare const LOOT_ITEM_SELF: string;
 declare const LOOT_ITEM_SELF_MULTIPLE: string;
 declare const LOOT_KEY_TEXT: string;
 declare const LOOT_MASTER_LOOTER: string;
 declare const LOOT_METHOD: string;
 declare const LOOT_MONEY: string;
 declare const LOOT_MONEY_SPLIT: string;
 declare const LOOT_NEED_BEFORE_GREED: string;
 declare const LOOT_NEXT_PAGE: string;
 declare const LOOT_NO_DROP: string;
 declare const LOOT_NO_DROP_DISENCHANT: string;
 declare const LOOT_PROMOTE: string;
 declare const LOOT_ROLL_ALL_PASSED: string;
 declare const LOOT_ROLL_DISENCHANT: string;
 declare const LOOT_ROLL_DISENCHANT_SELF: string;
 declare const LOOT_ROLL_GREED: string;
 declare const LOOT_ROLL_GREED_SELF: string;
 declare const LOOT_ROLL_INELIGIBLE_REASON1: string;
 declare const LOOT_ROLL_INELIGIBLE_REASON2: string;
 declare const LOOT_ROLL_INELIGIBLE_REASON3: string;
 declare const LOOT_ROLL_INELIGIBLE_REASON4: string;
 declare const LOOT_ROLL_INELIGIBLE_REASON5: string;
 declare const LOOT_ROLL_NEED: string;
 declare const LOOT_ROLL_NEED_SELF: string;
 declare const LOOT_ROLL_PASSED: string;
 declare const LOOT_ROLL_PASSED_AUTO: string;
 declare const LOOT_ROLL_PASSED_AUTO_FEMALE: string;
 declare const LOOT_ROLL_PASSED_SELF: string;
 declare const LOOT_ROLL_PASSED_SELF_AUTO: string;
 declare const LOOT_ROLL_ROLLED_DE: string;
 declare const LOOT_ROLL_ROLLED_GREED: string;
 declare const LOOT_ROLL_ROLLED_NEED: string;
 declare const LOOT_ROLL_WON: string;
 declare const LOOT_ROLL_WON_NO_SPAM_DE: string;
 declare const LOOT_ROLL_WON_NO_SPAM_GREED: string;
 declare const LOOT_ROLL_WON_NO_SPAM_NEED: string;
 declare const LOOT_ROLL_YOU_WON: string;
 declare const LOOT_ROLL_YOU_WON_NO_SPAM_DE: string;
 declare const LOOT_ROLL_YOU_WON_NO_SPAM_GREED: string;
 declare const LOOT_ROLL_YOU_WON_NO_SPAM_NEED: string;
 declare const LOOT_ROUND_ROBIN: string;
 declare const LOOT_THRESHOLD: string;
 declare const LOOT_UNDER_MOUSE_TEXT: string;
 declare const LOSS: string;
 declare const LOW: string;
 declare const LSHIFT_KEY_TEXT: string;
 declare const LUA_ERROR: string;
 declare const MACRO: string;
 declare const MACROFRAME_CHAR_LIMIT: string;
 declare const MACROS: string;
 declare const MACRO_ACTION_FORBIDDEN: string;
 declare const MACRO_HELP_TEXT_LINE1: string;
 declare const MACRO_HELP_TEXT_LINE2: string;
 declare const MACRO_HELP_TEXT_LINE3: string;
 declare const MACRO_HELP_TEXT_LINE4: string;
 declare const MACRO_HELP_TEXT_LINE5: string;
 declare const MACRO_POPUP_CHOOSE_ICON: string;
 declare const MACRO_POPUP_TEXT: string;
 declare const MAC_OPTIONS: string;
 declare const MAGE_INTELLECT_TOOLTIP: string;
 declare const MAGIC_RESISTANCES_COLON: string;
 declare const MAIL_COD_ERROR: string;
 declare const MAIL_COD_ERROR_COLORBLIND: string;
 declare const MAIL_LABEL: string;
 declare const MAIL_LETTER_TOOLTIP: string;
 declare const MAIL_LOOT_KEY_TEXT: string;
 declare const MAIL_MULTIPLE_ITEMS: string;
 declare const MAIL_REPLY_PREFIX: string;
 declare const MAIL_RETURN: string;
 declare const MAIL_SUBJECT_LABEL: string;
 declare const MAIL_TO_LABEL: string;
 declare const MAINASSIST: string;
 declare const MAINHANDSLOT: string;
 declare const MAINMENUBAR_FPS_LABEL: string;
 declare const MAINMENUBAR_LATENCY_LABEL: string;
 declare const MAINMENU_BUTTON: string;
 declare const MAINTANK: string;
 declare const MAIN_ASSIST: string;
 declare const MAIN_MENU: string;
 declare const MAIN_TANK: string;
 declare const MAJOR_GLYPH: string;
 declare const MAKE_INTERACTABLE: string;
 declare const MAKE_MODERATOR: string;
 declare const MAKE_UNINTERACTABLE: string;
 declare const MALE: string;
 declare const MANA: string;
 declare const MANAGE_ACCOUNT: string;
 declare const MANAGE_ACCOUNT_URL: string;
 declare const MANA_COLON: string;
 declare const MANA_COST: string;
 declare const MANA_COST_PER_TIME: string;
 declare const MANA_LOW: string;
 declare const MANA_REGEN: string;
 declare const MANA_REGEN_ABBR: string;
 declare const MANA_REGEN_FROM_SPIRIT: string;
 declare const MANA_REGEN_TOOLTIP: string;
 declare const MAP_QUEST_DIFFICULTY_TEXT: string;
 declare const MARKED_AFK: string;
 declare const MARKED_AFK_MESSAGE: string;
 declare const MARKED_DND: string;
 declare const MASTERY_POINTS_SPENT: string;
 declare const MASTER_LOOTER: string;
 declare const MASTER_VOLUME: string;
 declare const MATCHMAKING_MATCH_S: string;
 declare const MATCHMAKING_PENDING: string;
 declare const MAXIMUM: string;
 declare const MAX_FOLLOW_DIST: string;
 declare const MAX_HP_TEMPLATE: string;
 declare const MEETINGSTONE_LEVEL: string;
 declare const MEETINGSTONE_TOOLTIP: string;
 declare const MELEE: string;
 declare const MELEE_ATTACK: string;
 declare const MELEE_ATTACK_POWER: string;
 declare const MELEE_ATTACK_POWER_TOOLTIP: string;
 declare const MELEE_COMBATLOG_TOOLTIP: string;
 declare const MELEE_CRIT_CHANCE: string;
 declare const MELEE_RANGE: string;
 declare const MEMBERS: string;
 declare const MERCHANT: string;
 declare const MERCHANT_ARENA_POINTS: string;
 declare const MERCHANT_BUYBACK: string;
 declare const MERCHANT_HONOR_POINTS: string;
 declare const MERCHANT_PAGE_NUMBER: string;
 declare const MERCHANT_STOCK: string;
 declare const MESSAGE_SOURCES: string;
 declare const MESSAGE_TYPES: string;
 declare const META_GEM: string;
 declare const MILLISECONDS_ABBR: string;
 declare const MINIMAP_LABEL: string;
 declare const MINIMAP_TRACKING_AUCTIONEER: string;
 declare const MINIMAP_TRACKING_BANKER: string;
 declare const MINIMAP_TRACKING_BATTLEMASTER: string;
 declare const MINIMAP_TRACKING_FLIGHTMASTER: string;
 declare const MINIMAP_TRACKING_INNKEEPER: string;
 declare const MINIMAP_TRACKING_MAILBOX: string;
 declare const MINIMAP_TRACKING_REPAIR: string;
 declare const MINIMAP_TRACKING_STABLEMASTER: string;
 declare const MINIMAP_TRACKING_TOOLTIP_NONE: string;
 declare const MINIMAP_TRACKING_TRAINER_CLASS: string;
 declare const MINIMAP_TRACKING_TRAINER_PROFESSION: string;
 declare const MINIMAP_TRACKING_TRIVIAL_QUESTS: string;
 declare const MINIMAP_TRACKING_VENDOR_AMMO: string;
 declare const MINIMAP_TRACKING_VENDOR_FOOD: string;
 declare const MINIMAP_TRACKING_VENDOR_POISON: string;
 declare const MINIMAP_TRACKING_VENDOR_REAGENT: string;
 declare const MINIMIZE: string;
 declare const MINIMUM: string;
 declare const MINOR_GLYPH: string;
 declare const MINS_ABBR: string;
 declare const MINUTES: string;
 declare const MINUTES_ABBR: string;
 declare const MINUTE_ONELETTER_ABBR: string;
 declare const MISCELLANEOUS: string;
 declare const MISS: string;
 declare const MISSES: string;
 declare const MODE: string;
 declare const MODIFIERS_COLON: string;
 declare const MONEY: string;
 declare const MONEY_COLON: string;
 declare const MONEY_LOOT: string;
 declare const MONSTER_BOSS_EMOTE: string;
 declare const MONSTER_BOSS_WHISPER: string;
 declare const MONTH_APRIL: string;
 declare const MONTH_AUGUST: string;
 declare const MONTH_DECEMBER: string;
 declare const MONTH_FEBRUARY: string;
 declare const MONTH_JANUARY: string;
 declare const MONTH_JULY: string;
 declare const MONTH_JUNE: string;
 declare const MONTH_MARCH: string;
 declare const MONTH_MAY: string;
 declare const MONTH_NOVEMBER: string;
 declare const MONTH_OCTOBER: string;
 declare const MONTH_SEPTEMBER: string;
 declare const MORE_REAGENTS: string;
 declare const MOTD_COLON: string;
 declare const MOUNT: string;
 declare const MOUNTS: string;
 declare const MOUSE_LABEL: string;
 declare const MOUSE_LOOK_SPEED: string;
 declare const MOUSE_SENSITIVITY: string;
 declare const MOUSE_SUBTEXT: string;
 declare const MOVE_FILTER_DOWN: string;
 declare const MOVE_FILTER_UP: string;
 declare const MOVE_TO_CONVERSATION_WINDOW: string;
 declare const MOVE_TO_INACTIVE: string;
 declare const MOVE_TO_NEW_WINDOW: string;
 declare const MOVE_TO_WHISPER_WINDOW: string;
 declare const MOVIE_RECORDING_AIC: string;
 declare const MOVIE_RECORDING_AIC_TOOLTIP: string;
 declare const MOVIE_RECORDING_CANCEL_CONFIRMATION: string;
 declare const MOVIE_RECORDING_CODEC_TOOLTIP: string;
 declare const MOVIE_RECORDING_COMPRESSBUTTON: string;
 declare const MOVIE_RECORDING_COMPRESSDIALOG: string;
 declare const MOVIE_RECORDING_COMPRESSING: string;
 declare const MOVIE_RECORDING_COMPRESSING_CANCEL_NEWBIE_TOOLTIP: string;
 declare const MOVIE_RECORDING_COMPRESSING_CANCEL_TOOLTIP: string;
 declare const MOVIE_RECORDING_COMPRESSION: string;
 declare const MOVIE_RECORDING_COMPRESSION_STARTED: string;
 declare const MOVIE_RECORDING_COMPRESS_TOOLTIP: string;
 declare const MOVIE_RECORDING_DATA_RATE: string;
 declare const MOVIE_RECORDING_DATA_RATE_TOOLTIP: string;
 declare const MOVIE_RECORDING_DV: string;
 declare const MOVIE_RECORDING_DV_TOOLTIP: string;
 declare const MOVIE_RECORDING_ENABLE_COMPRESSION: string;
 declare const MOVIE_RECORDING_ENABLE_COMPRESSION_TOOLTIP: string;
 declare const MOVIE_RECORDING_ENABLE_CURSOR: string;
 declare const MOVIE_RECORDING_ENABLE_CURSOR_TOOLTIP: string;
 declare const MOVIE_RECORDING_ENABLE_GUI: string;
 declare const MOVIE_RECORDING_ENABLE_GUI_TOOLTIP: string;
 declare const MOVIE_RECORDING_ENABLE_ICON: string;
 declare const MOVIE_RECORDING_ENABLE_ICON_TOOLTIP: string;
 declare const MOVIE_RECORDING_ENABLE_RECOVER: string;
 declare const MOVIE_RECORDING_ENABLE_RECOVER_TOOLTIP: string;
 declare const MOVIE_RECORDING_ENABLE_SOUND: string;
 declare const MOVIE_RECORDING_ENABLE_SOUND_TOOLTIP: string;
 declare const MOVIE_RECORDING_FPS_FOURTH: string;
 declare const MOVIE_RECORDING_FPS_HALF: string;
 declare const MOVIE_RECORDING_FPS_THIRD: string;
 declare const MOVIE_RECORDING_FRAMERATE: string;
 declare const MOVIE_RECORDING_FRAMERATE_TOOLTIP: string;
 declare const MOVIE_RECORDING_FULL_RESOLUTION: string;
 declare const MOVIE_RECORDING_GUI_OFF: string;
 declare const MOVIE_RECORDING_GUI_ON: string;
 declare const MOVIE_RECORDING_H264: string;
 declare const MOVIE_RECORDING_H264_TOOLTIP: string;
 declare const MOVIE_RECORDING_MJPEG: string;
 declare const MOVIE_RECORDING_MJPEG_TOOLTIP: string;
 declare const MOVIE_RECORDING_MPEG4: string;
 declare const MOVIE_RECORDING_MPEG4_TOOLTIP: string;
 declare const MOVIE_RECORDING_PIXLET: string;
 declare const MOVIE_RECORDING_QUALITY_TOOLTIP: string;
 declare const MOVIE_RECORDING_RECORDING: string;
 declare const MOVIE_RECORDING_RECORDING_STARTED: string;
 declare const MOVIE_RECORDING_RECORDING_STOPPED: string;
 declare const MOVIE_RECORDING_RECOVERING: string;
 declare const MOVIE_RECORDING_RESOLUTION_TOOLTIP: string;
 declare const MOVIE_RECORDING_TIME: string;
 declare const MOVIE_RECORDING_TIME_TOOLTIP: string;
 declare const MOVIE_RECORDING_UNCOMPRESSED_RGB: string;
 declare const MOVIE_RECORDING_WARNING_COMPRESSING: string;
 declare const MOVIE_RECORDING_WARNING_DISK_FULL: string;
 declare const MOVIE_RECORDING_WARNING_NO_MOVIE: string;
 declare const MOVIE_RECORDING_WARNING_PERF: string;
 declare const MOVIE_RECORDING_WARNING_REQUIREMENTS: string;
 declare const MP: string;
 declare const MULTIPLE_DUNGEONS: string;
 declare const MULTISAMPLE: string;
 declare const MULTISAMPLING_FORMAT_string; string;
 declare const MULTI_CAST_TOOLTIP_NO_TOTEM: string;
 declare const MUSIC_DISABLED: string;
 declare const MUSIC_ENABLED: string;
 declare const MUSIC_VOLUME: string;
 declare const MUTE: string;
 declare const MUTED: string;
 declare const MUTED_LIST: string;
 declare const MUTE_PLAYER: string;
 declare const NAME: string;
 declare const NAMES_LABEL: string;
 declare const NAMES_SUBTEXT: string;
 declare const NAME_CHAT_WINDOW: string;
 declare const NEAR: string;
 declare const NECKSLOT: string;
 declare const NEED: string;
 declare const NEED_NEWBIE: string;
 declare const NET_PROMOTER_HIGH: string;
 declare const NET_PROMOTER_LOW: string;
 declare const NEVER: string;
 declare const NEW: string;
 declare const NEWBIE_TOOLTIP_ABANDONQUEST: string;
 declare const NEWBIE_TOOLTIP_ACHIEVEMENT: string;
 declare const NEWBIE_TOOLTIP_ADDFRIEND: string;
 declare const NEWBIE_TOOLTIP_ADDMEMBER: string;
 declare const NEWBIE_TOOLTIP_ADDTEAMMEMBER: string;
 declare const NEWBIE_TOOLTIP_ALLIANCE: string;
 declare const NEWBIE_TOOLTIP_AUTO_JOIN_VOICE: string;
 declare const NEWBIE_TOOLTIP_BATTLEFIELDMINIMAP_OPTIONS: string;
 declare const NEWBIE_TOOLTIP_BATTLEFIELD_GROUP_JOIN: string;
 declare const NEWBIE_TOOLTIP_CHANNELPULLOUT_OPTIONS: string;
 declare const NEWBIE_TOOLTIP_CHANNELTAB: string;
 declare const NEWBIE_TOOLTIP_CHARACTER: string;
 declare const NEWBIE_TOOLTIP_CHATMENU: string;
 declare const NEWBIE_TOOLTIP_CHATOPTIONS: string;
 declare const NEWBIE_TOOLTIP_CHAT_OVERFLOW: string;
 declare const NEWBIE_TOOLTIP_DEMOTE: string;
 declare const NEWBIE_TOOLTIP_DISHONORABLE_KILLS: string;
 declare const NEWBIE_TOOLTIP_DISPLAY_CHANNEL_PULLOUT: string;
 declare const NEWBIE_TOOLTIP_ENCHANTSLOT: string;
 declare const NEWBIE_TOOLTIP_ENTER_BATTLEGROUND: string;
 declare const NEWBIE_TOOLTIP_EQUIPMENT_MANAGER: string;
 declare const NEWBIE_TOOLTIP_EQUIPMENT_MANAGER_IGNORE_SLOT: string;
 declare const NEWBIE_TOOLTIP_EQUIPMENT_MANAGER_PLACE_IN_BAGS: string;
 declare const NEWBIE_TOOLTIP_EQUIPMENT_MANAGER_UNIGNORE_SLOT: string;
 declare const NEWBIE_TOOLTIP_FIRST_AVAILABLE: string;
 declare const NEWBIE_TOOLTIP_FRAMERATE: string;
 declare const NEWBIE_TOOLTIP_FRIENDSTAB: string;
 declare const NEWBIE_TOOLTIP_GROUPINVITE: string;
 declare const NEWBIE_TOOLTIP_GUILDCONTROL: string;
 declare const NEWBIE_TOOLTIP_GUILDGROUPINVITE: string;
 declare const NEWBIE_TOOLTIP_GUILDPUBLICNOTE: string;
 declare const NEWBIE_TOOLTIP_GUILDREMOVE: string;
 declare const NEWBIE_TOOLTIP_GUILDTAB: string;
 declare const NEWBIE_TOOLTIP_GUILD_INFORMATION: string;
 declare const NEWBIE_TOOLTIP_GUILD_MEMBER_OPTIONS: string;
 declare const NEWBIE_TOOLTIP_HEALTHBAR: string;
 declare const NEWBIE_TOOLTIP_HELP: string;
 declare const NEWBIE_TOOLTIP_HONORABLE_KILLS: string;
 declare const NEWBIE_TOOLTIP_HONOR_CONTRIBUTION_POINTS: string;
 declare const NEWBIE_TOOLTIP_HONOR_STANDING: string;
 declare const NEWBIE_TOOLTIP_HORDE: string;
 declare const NEWBIE_TOOLTIP_IGNOREPLAYER: string;
 declare const NEWBIE_TOOLTIP_IGNORETAB: string;
 declare const NEWBIE_TOOLTIP_LATENCY: string;
 declare const NEWBIE_TOOLTIP_LFGPARENT: string;
 declare const NEWBIE_TOOLTIP_LFMTAB: string;
 declare const NEWBIE_TOOLTIP_MAINMENU: string;
 declare const NEWBIE_TOOLTIP_MANABAR0: string;
 declare const NEWBIE_TOOLTIP_MANABAR1: string;
 declare const NEWBIE_TOOLTIP_MANABAR2: string;
 declare const NEWBIE_TOOLTIP_MANABAR3: string;
 declare const NEWBIE_TOOLTIP_MANABAR4: string;
 declare const NEWBIE_TOOLTIP_MEMORY: string;
 declare const NEWBIE_TOOLTIP_MINIMAPTOGGLE: string;
 declare const NEWBIE_TOOLTIP_MUTEPLAYER: string;
 declare const NEWBIE_TOOLTIP_PARTYOPTIONS: string;
 declare const NEWBIE_TOOLTIP_PLAYEROPTIONS: string;
 declare const NEWBIE_TOOLTIP_PROMOTE: string;
 declare const NEWBIE_TOOLTIP_PVP: string;
 declare const NEWBIE_TOOLTIP_PVPFFA: string;
 declare const NEWBIE_TOOLTIP_QUESTLOG: string;
 declare const NEWBIE_TOOLTIP_RAF_SUMMON_LINKED: string;
 declare const NEWBIE_TOOLTIP_RAIDTAB: string;
 declare const NEWBIE_TOOLTIP_RANK: string;
 declare const NEWBIE_TOOLTIP_RANK_POSITION: string;
 declare const NEWBIE_TOOLTIP_REMOVEFRIEND: string;
 declare const NEWBIE_TOOLTIP_REMOVEPLAYER: string;
 declare const NEWBIE_TOOLTIP_SENDMESSAGE: string;
 declare const NEWBIE_TOOLTIP_SHAREQUEST: string;
 declare const NEWBIE_TOOLTIP_SOCIAL: string;
 declare const NEWBIE_TOOLTIP_SPELLBOOK: string;
 declare const NEWBIE_TOOLTIP_STOPIGNORE: string;
 declare const NEWBIE_TOOLTIP_STOPWATCH_PLAYPAUSEBUTTON: string;
 declare const NEWBIE_TOOLTIP_STOPWATCH_RESETBUTTON: string;
 declare const NEWBIE_TOOLTIP_TALENTS: string;
 declare const NEWBIE_TOOLTIP_TRACKQUEST: string;
 declare const NEWBIE_TOOLTIP_UNIT_DUEL: string;
 declare const NEWBIE_TOOLTIP_UNIT_FOLLOW: string;
 declare const NEWBIE_TOOLTIP_UNIT_FREE_FOR_ALL: string;
 declare const NEWBIE_TOOLTIP_UNIT_GROUP_LOOT: string;
 declare const NEWBIE_TOOLTIP_UNIT_INSPECT: string;
 declare const NEWBIE_TOOLTIP_UNIT_INVITE: string;
 declare const NEWBIE_TOOLTIP_UNIT_LEAVE_PARTY: string;
 declare const NEWBIE_TOOLTIP_UNIT_LOOT_THRESHOLD: string;
 declare const NEWBIE_TOOLTIP_UNIT_MASTER_LOOTER: string;
 declare const NEWBIE_TOOLTIP_UNIT_NEED_BEFORE_GREED: string;
 declare const NEWBIE_TOOLTIP_UNIT_OPT_OUT_LOOT: string;
 declare const NEWBIE_TOOLTIP_UNIT_PET_ABANDON: string;
 declare const NEWBIE_TOOLTIP_UNIT_PET_DISMISS: string;
 declare const NEWBIE_TOOLTIP_UNIT_PET_PAPERDOLL: string;
 declare const NEWBIE_TOOLTIP_UNIT_PET_RENAME: string;
 declare const NEWBIE_TOOLTIP_UNIT_PROMOTE: string;
 declare const NEWBIE_TOOLTIP_UNIT_ROUND_ROBIN: string;
 declare const NEWBIE_TOOLTIP_UNIT_TRADE: string;
 declare const NEWBIE_TOOLTIP_UNIT_UNINVITE: string;
 declare const NEWBIE_TOOLTIP_UNIT_VOTE_TO_KICK: string;
 declare const NEWBIE_TOOLTIP_UNMUTE: string;
 declare const NEWBIE_TOOLTIP_VOICE_CHAT_SELECTOR: string;
 declare const NEWBIE_TOOLTIP_WHOTAB: string;
 declare const NEWBIE_TOOLTIP_WORLDMAP: string;
 declare const NEWBIE_TOOLTIP_XPBAR: string;
 declare const NEW_ACHIEVEMENT_EARNED: string;
 declare const NEW_CHAT_WINDOW: string;
 declare const NEW_CONVERSATION_INSTRUCTIONS: string;
 declare const NEW_LEADER: string;
 declare const NEW_TITLE_EARNED: string;
 declare const NEXT: string;
 declare const NEXT_ABILITY: string;
 declare const NEXT_BATTLE: string;
 declare const NO: string;
 declare const NONE: string;
 declare const NONEQUIPSLOT: string;
 declare const NONE_CAPS: string;
 declare const NONE_KEY: string;
 declare const NORMAL_QUEST_DISPLAY: string;
 declare const NOTE: string;
 declare const NOTE_COLON: string;
 declare const NOTE_SUBMITTED: string;
 declare const NOTE_SUBMIT_FAILED: string;
 declare const NOT_APPLICABLE: string;
 declare const NOT_BOUND: string;
 declare const NOT_ENOUGH_MANA: string;
 declare const NOT_IN_GROUP: string;
 declare const NOT_TAMEABLE: string;
 declare const NOT_YET_SIGNED: string;
 declare const NO_ATTACHMENTS: string;
 declare const NO_BIDS: string;
 declare const NO_COMPLETED_ACHIEVEMENTS: string;
 declare const NO_DAILY_QUESTS_REMAINING: string;
 declare const NO_EMPTY_KEYRING_SLOTS_ERROR: string;
 declare const NO_EQUIPMENT_SLOTS_AVAILABLE: string;
 declare const NO_FRIEND_REQUESTS: string;
 declare const NO_GUILDBANK_TABS: string;
 declare const NO_LFD_WHILE_LFR: string;
 declare const NO_LFR_WHILE_LFD: string;
 declare const NO_RAIDS_AVAILABLE: string;
 declare const NO_RAID_INSTANCES_SAVED: string;
 declare const NO_RESPONSE: string;
 declare const NO_UPDATED_STATS_TEXT: string;
 declare const NO_VIEWABLE_GUILDBANK_LOGS: string;
 declare const NO_VIEWABLE_GUILDBANK_TABS: string;
 declare const NO_VOICE_SESSIONS: string;
 declare const NUMBER_OF_RESULTS_TEMPLATE: string;
 declare const NUM_FREE_SLOTS: string;
 declare const NUM_GUILDBANK_TABS_PURCHASED: string;
 declare const NUM_RAID_MEMBERS: string;
 declare const OBJECTIVES_IGNORE_CURSOR_TEXT: string;
 declare const OBJECTIVES_LABEL: string;
 declare const OBJECTIVES_SHOW_QUEST_MAP: string;
 declare const OBJECTIVES_STOP_TRACKING: string;
 declare const OBJECTIVES_SUBTEXT: string;
 declare const OBJECTIVES_TRACKER_LABEL: string;
 declare const OBJECTIVES_VIEW_ACHIEVEMENT: string;
 declare const OBJECTIVES_VIEW_IN_ACHIEVEMENTS: string;
 declare const OBJECTIVES_VIEW_IN_QUESTLOG: string;
 declare const OBJECTIVES_WATCH_QUESTS_ARENA: string;
 declare const OBJECTIVES_WATCH_TOO_MANY: string;
 declare const OBJECT_ALPHA: string;
 declare const OFF: string;
 declare const OFFICER: string;
 declare const OFFICER_CHAT: string;
 declare const OFFICER_NOTE_COLON: string;
 declare const OKAY: string;
 declare const OLD_TITLE_LOST: string;
 declare const ONLY_EMPTY_BAGS: string;
 declare const ON_COOLDOWN: string;
 declare const OPACITY: string;
 declare const OPENING: string;
 declare const OPENMAIL: string;
 declare const OPEN_LOCK_OTHER: string;
 declare const OPEN_LOCK_SELF: string;
 declare const OPEN_RAID_BROWSER: string;
 declare const OPTIONAL: string;
 declare const OPTIONAL_PARENS: string;
 declare const OPTIONS_BRIGHTNESS: string;
 declare const OPTIONS_MENU: string;
 declare const OPTIONS_SHADERS: string;
 declare const OPTION_CHAT_STYLE_CLASSIC: string;
 declare const OPTION_CHAT_STYLE_IM: string;
 declare const OPTION_CONVERSATION_MODE_INLINE: string;
 declare const OPTION_CONVERSATION_MODE_POPOUT: string;
 declare const OPTION_LOGOUT_REQUIREMENT: string;
 declare const OPTION_PREVIEW_TALENT_CHANGES_DESCRIPTION: string;
 declare const OPTION_RESTART_REQUIREMENT: string;
 declare const OPTION_STEREO_CONVERGENCE: string;
 declare const OPTION_STEREO_SEPARATION: string;
 declare const OPTION_TOOLTIP_ADVANCED_OBJECTIVES: string;
 declare const OPTION_TOOLTIP_ADVANCED_WORLD_MAP: string;
 declare const OPTION_TOOLTIP_AGGRO_WARNING_DISPLAY1: string;
 declare const OPTION_TOOLTIP_AGGRO_WARNING_DISPLAY2: string;
 declare const OPTION_TOOLTIP_AGGRO_WARNING_DISPLAY3: string;
 declare const OPTION_TOOLTIP_AGGRO_WARNING_DISPLAY4: string;
 declare const OPTION_TOOLTIP_ALWAYS_SHOW_MULTIBARS: string;
 declare const OPTION_TOOLTIP_AMBIENCE_VOLUME: string;
 declare const OPTION_TOOLTIP_ANIMATION: string;
 declare const OPTION_TOOLTIP_ANISOTROPIC: string;
 declare const OPTION_TOOLTIP_ASSIST_ATTACK: string;
 declare const OPTION_TOOLTIP_AUTO_DISMOUNT_FLYING: string;
 declare const OPTION_TOOLTIP_AUTO_FOLLOW_SPEED: string;
 declare const OPTION_TOOLTIP_AUTO_JOIN_GUILD_CHANNEL: string;
 declare const OPTION_TOOLTIP_AUTO_LOOT_ALT_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_LOOT_CTRL_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_LOOT_DEFAULT: string;
 declare const OPTION_TOOLTIP_AUTO_LOOT_KEY_TEXT: string;
 declare const OPTION_TOOLTIP_AUTO_LOOT_NONE_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_LOOT_SHIFT_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_QUEST_PROGRESS: string;
 declare const OPTION_TOOLTIP_AUTO_QUEST_WATCH: string;
 declare const OPTION_TOOLTIP_AUTO_RANGED_COMBAT: string;
 declare const OPTION_TOOLTIP_AUTO_SELF_CAST: string;
 declare const OPTION_TOOLTIP_AUTO_SELF_CAST_ALT_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_SELF_CAST_CTRL_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_SELF_CAST_KEY_TEXT: string;
 declare const OPTION_TOOLTIP_AUTO_SELF_CAST_NONE_KEY: string;
 declare const OPTION_TOOLTIP_AUTO_SELF_CAST_SHIFT_KEY: string;
 declare const OPTION_TOOLTIP_BLOCK_TRADES: string;
 declare const OPTION_TOOLTIP_CAMERA1: string;
 declare const OPTION_TOOLTIP_CAMERA2: string;
 declare const OPTION_TOOLTIP_CAMERA3: string;
 declare const OPTION_TOOLTIP_CAMERA4: string;
 declare const OPTION_TOOLTIP_CAMERA_ALWAYS: string;
 declare const OPTION_TOOLTIP_CAMERA_NEVER: string;
 declare const OPTION_TOOLTIP_CAMERA_SMART: string;
 declare const OPTION_TOOLTIP_CAMERA_SMARTER: string;
 declare const OPTION_TOOLTIP_CHARACTER_SHADOWS: string;
 declare const OPTION_TOOLTIP_CHAT_BUBBLES: string;
 declare const OPTION_TOOLTIP_CHAT_LOCKED: string;
 declare const OPTION_TOOLTIP_CHAT_MOUSE_WHEEL_SCROLL: string;
 declare const OPTION_TOOLTIP_CHAT_WHOLE_WINDOW_CLICKABLE: string;
 declare const OPTION_TOOLTIP_CINEMATIC_SUBTITLES: string;
 declare const OPTION_TOOLTIP_CLEAR_AFK: string;
 declare const OPTION_TOOLTIP_CLICKCAMERA_LOCKED: string;
 declare const OPTION_TOOLTIP_CLICKCAMERA_NEVER: string;
 declare const OPTION_TOOLTIP_CLICKCAMERA_SMART: string;
 declare const OPTION_TOOLTIP_CLICK_CAMERA1: string;
 declare const OPTION_TOOLTIP_CLICK_CAMERA2: string;
 declare const OPTION_TOOLTIP_CLICK_CAMERA3: string;
 declare const OPTION_TOOLTIP_CLICK_CAMERA_STYLE: string;
 declare const OPTION_TOOLTIP_CLICK_TO_MOVE: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_MODE: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SCROLL_DOWN: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_AURAS: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_AURA_FADE: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_COMBAT_STATE: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_COMBO_POINTS: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_DODGE_PARRY_MISS: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_ENERGIZE: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_FRIENDLY_NAMES: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_HONOR_GAINED: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_LOW_HEALTH_MANA: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_PERIODIC_ENERGIZE: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_REACTIVES: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_REPUTATION: string;
 declare const OPTION_TOOLTIP_COMBAT_TEXT_SHOW_RESISTANCES: string;
 declare const OPTION_TOOLTIP_CONSOLIDATE_BUFFS: string;
 declare const OPTION_TOOLTIP_DEATH_EFFECT: string;
 declare const OPTION_TOOLTIP_DESKTOP_GAMMA: string;
 declare const OPTION_TOOLTIP_DISABLE_SPAM_FILTER: string;
 declare const OPTION_TOOLTIP_DISPLAY_FREE_BAG_SLOTS: string;
 declare const OPTION_TOOLTIP_ENABLE_ALL_SHADERS: string;
 declare const OPTION_TOOLTIP_ENABLE_AMBIENCE: string;
 declare const OPTION_TOOLTIP_ENABLE_BGSOUND: string;
 declare const OPTION_TOOLTIP_ENABLE_DSP_EFFECTS: string;
 declare const OPTION_TOOLTIP_ENABLE_EMOTE_SOUNDS: string;
 declare const OPTION_TOOLTIP_ENABLE_ERROR_SPEECH: string;
 declare const OPTION_TOOLTIP_ENABLE_GROUP_SPEECH: string;
 declare const OPTION_TOOLTIP_ENABLE_HARDWARE: string;
 declare const OPTION_TOOLTIP_ENABLE_MICROPHONE: string;
 declare const OPTION_TOOLTIP_ENABLE_MUSIC: string;
 declare const OPTION_TOOLTIP_ENABLE_MUSIC_LOOPING: string;
 declare const OPTION_TOOLTIP_ENABLE_PET_SOUNDS: string;
 declare const OPTION_TOOLTIP_ENABLE_REVERB: string;
 declare const OPTION_TOOLTIP_ENABLE_SOFTWARE_HRTF: string;
 declare const OPTION_TOOLTIP_ENABLE_SOUND: string;
 declare const OPTION_TOOLTIP_ENABLE_SOUNDFX: string;
 declare const OPTION_TOOLTIP_ENABLE_SOUND_AT_CHARACTER: string;
 declare const OPTION_TOOLTIP_ENABLE_STEREO_VIDEO: string;
 declare const OPTION_TOOLTIP_ENABLE_VOICECHAT: string;
 declare const OPTION_TOOLTIP_ENVIRONMENT_DETAIL: string;
 declare const OPTION_TOOLTIP_FARCLIP: string;
 declare const OPTION_TOOLTIP_FIX_LAG: string;
 declare const OPTION_TOOLTIP_FOCUS_CAST_ALT_KEY: string;
 declare const OPTION_TOOLTIP_FOCUS_CAST_CTRL_KEY: string;
 declare const OPTION_TOOLTIP_FOCUS_CAST_NONE_KEY: string;
 declare const OPTION_TOOLTIP_FOCUS_CAST_SHIFT_KEY: string;
 declare const OPTION_TOOLTIP_FOLLOW_TERRAIN: string;
 declare const OPTION_TOOLTIP_FULL_SCREEN_GLOW: string;
 declare const OPTION_TOOLTIP_FULL_SIZE_FOCUS_FRAME: string;
 declare const OPTION_TOOLTIP_GAMEFIELD_DESELECT: string;
 declare const OPTION_TOOLTIP_GAMMA: string;
 declare const OPTION_TOOLTIP_GROUND_DENSITY: string;
 declare const OPTION_TOOLTIP_GROUND_RADIUS: string;
 declare const OPTION_TOOLTIP_GUILDMEMBER_ALERT: string;
 declare const OPTION_TOOLTIP_HARDWARE_CURSOR: string;
 declare const OPTION_TOOLTIP_HEAD_BOB: string;
 declare const OPTION_TOOLTIP_HIDE_OUTDOOR_WORLD_STATE: string;
 declare const OPTION_TOOLTIP_HIDE_PARTY_INTERFACE: string;
 declare const OPTION_TOOLTIP_INVERT_MOUSE: string;
 declare const OPTION_TOOLTIP_LOCALE: string;
 declare const OPTION_TOOLTIP_LOCK_ACTIONBAR: string;
 declare const OPTION_TOOLTIP_LOG_PERIODIC_EFFECTS: string;
 declare const OPTION_TOOLTIP_LONG_RANGE_NAMEPLATE: string;
 declare const OPTION_TOOLTIP_LOOT_KEY_TEXT: string;
 declare const OPTION_TOOLTIP_LOOT_UNDER_MOUSE: string;
 declare const OPTION_TOOLTIP_MAP_QUEST_DIFFICULTY: string;
 declare const OPTION_TOOLTIP_MAP_TRACK_QUEST: string;
 declare const OPTION_TOOLTIP_MASTER_VOLUME: string;
 declare const OPTION_TOOLTIP_MAX_FOLLOW_DIST: string;
 declare const OPTION_TOOLTIP_MOUSE_LOOK_SPEED: string;
 declare const OPTION_TOOLTIP_MOUSE_SENSITIVITY: string;
 declare const OPTION_TOOLTIP_MULTISAMPLING: string;
 declare const OPTION_TOOLTIP_MUSIC_VOLUME: string;
 declare const OPTION_TOOLTIP_OBJECTIVES_IGNORE_CURSOR: string;
 declare const OPTION_TOOLTIP_OBJECT_ALPHA: string;
 declare const OPTION_TOOLTIP_PARTICLE_DENSITY: string;
 declare const OPTION_TOOLTIP_PARTY_CHAT_BUBBLES: string;
 declare const OPTION_TOOLTIP_PET_NAMEPLATES: string;
 declare const OPTION_TOOLTIP_PET_SPELL_DAMAGE: string;
 declare const OPTION_TOOLTIP_PHONG_SHADING: string;
 declare const OPTION_TOOLTIP_PLAYER_DETAIL: string;
 declare const OPTION_TOOLTIP_PLAY_AGGRO_SOUNDS: string;
 declare const OPTION_TOOLTIP_PROFANITY_FILTER: string;
 declare const OPTION_TOOLTIP_PROFANITY_FILTER_WITH_WARNING: string;
 declare const OPTION_TOOLTIP_PROJECTED_TEXTURES: string;
 declare const OPTION_TOOLTIP_PUSHTOTALK_SOUND: string;
 declare const OPTION_TOOLTIP_REMOVE_CHAT_DELAY: string;
 declare const OPTION_TOOLTIP_ROTATE_MINIMAP: string;
 declare const OPTION_TOOLTIP_SCROLL_ARC: string;
 declare const OPTION_TOOLTIP_SCROLL_DOWN: string;
 declare const OPTION_TOOLTIP_SCROLL_UP: string;
 declare const OPTION_TOOLTIP_SECURE_ABILITY_TOGGLE: string;
 declare const OPTION_TOOLTIP_SHADOW_QUALITY: string;
 declare const OPTION_TOOLTIP_SHOW_ARENA_ENEMY_CASTBAR: string;
 declare const OPTION_TOOLTIP_SHOW_ARENA_ENEMY_FRAMES: string;
 declare const OPTION_TOOLTIP_SHOW_ARENA_ENEMY_PETS: string;
 declare const OPTION_TOOLTIP_SHOW_BATTLENET_TOASTS: string;
 declare const OPTION_TOOLTIP_SHOW_BUFF_DURATION: string;
 declare const OPTION_TOOLTIP_SHOW_CASTABLE_BUFFS: string;
 declare const OPTION_TOOLTIP_SHOW_CASTABLE_DEBUFFS: string;
 declare const OPTION_TOOLTIP_SHOW_CHAT_ICONS: string;
 declare const OPTION_TOOLTIP_SHOW_CLASS_COLOR_IN_V_KEY: string;
 declare const OPTION_TOOLTIP_SHOW_CLOAK: string;
 declare const OPTION_TOOLTIP_SHOW_CLOCK: string;
 declare const OPTION_TOOLTIP_SHOW_COMBAT_HEALING: string;
 declare const OPTION_TOOLTIP_SHOW_COMBAT_TEXT: string;
 declare const OPTION_TOOLTIP_SHOW_DAMAGE: string;
 declare const OPTION_TOOLTIP_SHOW_DISPELLABLE_DEBUFFS: string;
 declare const OPTION_TOOLTIP_SHOW_FULLSCREEN_STATUS: string;
 declare const OPTION_TOOLTIP_SHOW_GUILD_NAMES: string;
 declare const OPTION_TOOLTIP_SHOW_HELM: string;
 declare const OPTION_TOOLTIP_SHOW_ITEM_LEVEL: string;
 declare const OPTION_TOOLTIP_SHOW_LOOT_SPAM: string;
 declare const OPTION_TOOLTIP_SHOW_LUA_ERRORS: string;
 declare const OPTION_TOOLTIP_SHOW_MULTIBAR1: string;
 declare const OPTION_TOOLTIP_SHOW_MULTIBAR2: string;
 declare const OPTION_TOOLTIP_SHOW_MULTIBAR3: string;
 declare const OPTION_TOOLTIP_SHOW_MULTIBAR4: string;
 declare const OPTION_TOOLTIP_SHOW_NEWBIE_TIPS: string;
 declare const OPTION_TOOLTIP_SHOW_NPC_NAMES: string;
 declare const OPTION_TOOLTIP_SHOW_NUMERIC_THREAT: string;
 declare const OPTION_TOOLTIP_SHOW_OTHER_TARGET_EFFECTS: string;
 declare const OPTION_TOOLTIP_SHOW_OWN_NAME: string;
 declare const OPTION_TOOLTIP_SHOW_PARTY_BACKGROUND: string;
 declare const OPTION_TOOLTIP_SHOW_PARTY_PETS: string;
 declare const OPTION_TOOLTIP_SHOW_PARTY_TEXT: string;
 declare const OPTION_TOOLTIP_SHOW_PET_MELEE_DAMAGE: string;
 declare const OPTION_TOOLTIP_SHOW_PLAYER_NAMES: string;
 declare const OPTION_TOOLTIP_SHOW_PLAYER_TITLES: string;
 declare const OPTION_TOOLTIP_SHOW_QUEST_FADING: string;
 declare const OPTION_TOOLTIP_SHOW_QUEST_OBJECTIVES_ON_MAP: string;
 declare const OPTION_TOOLTIP_SHOW_RAID_RANGE: string;
 declare const OPTION_TOOLTIP_SHOW_TARGET_CASTBAR: string;
 declare const OPTION_TOOLTIP_SHOW_TARGET_CASTBAR_IN_V_KEY: string;
 declare const OPTION_TOOLTIP_SHOW_TARGET_EFFECTS: string;
 declare const OPTION_TOOLTIP_SHOW_TARGET_OF_TARGET: string;
 declare const OPTION_TOOLTIP_SHOW_TIPOFTHEDAY: string;
 declare const OPTION_TOOLTIP_SHOW_TOAST_BROADCAST: string;
 declare const OPTION_TOOLTIP_SHOW_TOAST_CONVERSATION: string;
 declare const OPTION_TOOLTIP_SHOW_TOAST_FRIEND_REQUEST: string;
 declare const OPTION_TOOLTIP_SHOW_TOAST_OFFLINE: string;
 declare const OPTION_TOOLTIP_SHOW_TOAST_ONLINE: string;
 declare const OPTION_TOOLTIP_SHOW_TOAST_WINDOW: string;
 declare const OPTION_TOOLTIP_SHOW_TUTORIALS: string;
 declare const OPTION_TOOLTIP_SHOW_UNIT_NAMES: string;
 declare const OPTION_TOOLTIP_SIMPLE_CHAT: string;
 declare const OPTION_TOOLTIP_SIMPLE_QUEST_WATCH_TEXT: string;
 declare const OPTION_TOOLTIP_SMART_PIVOT: string;
 declare const OPTION_TOOLTIP_SOUND_CHANNELS: string;
 declare const OPTION_TOOLTIP_SOUND_OUTPUT: string;
 declare const OPTION_TOOLTIP_SOUND_QUALITY: string;
 declare const OPTION_TOOLTIP_SOUND_VOLUME: string;
 declare const OPTION_TOOLTIP_SPELL_DETAIL: string;
 declare const OPTION_TOOLTIP_STATUS_BAR: string;
 declare const OPTION_TOOLTIP_STATUS_TEXT_PARTY: string;
 declare const OPTION_TOOLTIP_STATUS_TEXT_PERCENT: string;
 declare const OPTION_TOOLTIP_STATUS_TEXT_PET: string;
 declare const OPTION_TOOLTIP_STATUS_TEXT_PLAYER: string;
 declare const OPTION_TOOLTIP_STATUS_TEXT_TARGET: string;
 declare const OPTION_TOOLTIP_STEREO_HARDWARE_CURSOR: string;
 declare const OPTION_TOOLTIP_STOP_AUTO_ATTACK: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET1: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET2: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET3: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET4: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET5: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET_ALWAYS: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET_PARTY: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET_RAID: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET_RAID_AND_PARTY: string;
 declare const OPTION_TOOLTIP_TARGETOFTARGET_SOLO: string;
 declare const OPTION_TOOLTIP_TERRAIN_HIGHLIGHTS: string;
 declare const OPTION_TOOLTIP_TERRAIN_TEXTURE: string;
 declare const OPTION_TOOLTIP_TEXTURE_DETAIL: string;
 declare const OPTION_TOOLTIP_TIMESTAMPS: string;
 declare const OPTION_TOOLTIP_TOAST_DURATION: string;
 declare const OPTION_TOOLTIP_TRILINEAR: string;
 declare const OPTION_TOOLTIP_TRIPLE_BUFFER: string;
 declare const OPTION_TOOLTIP_UI_SCALE: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_ALLOW_OVERLAP: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_ENEMIES: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_ENEMY_GUARDIANS: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_ENEMY_PETS: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_ENEMY_TOTEMS: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_FRIENDLY_GUARDIANS: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_FRIENDLY_PETS: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_FRIENDLY_TOTEMS: string;
 declare const OPTION_TOOLTIP_UNIT_NAMEPLATES_SHOW_FRIENDS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_ENEMY: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_ENEMY_GUARDIANS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_ENEMY_PETS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_ENEMY_TOTEMS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_FRIENDLY: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_FRIENDLY_GUARDIANS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_FRIENDLY_PETS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_FRIENDLY_TOTEMS: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_GUILD: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_NONCOMBAT_CREATURE: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_NPC: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_OWN: string;
 declare const OPTION_TOOLTIP_UNIT_NAME_PLAYER_TITLE: string;
 declare const OPTION_TOOLTIP_USE_COLORBLIND_MODE: string;
 declare const OPTION_TOOLTIP_USE_ENGLISH_AUDIO: string;
 declare const OPTION_TOOLTIP_USE_REFRESH: string;
 declare const OPTION_TOOLTIP_USE_RESOLUTION: string;
 declare const OPTION_TOOLTIP_USE_UBERTOOLTIPS: string;
 declare const OPTION_TOOLTIP_USE_UISCALE: string;
 declare const OPTION_TOOLTIP_USE_WEATHER_SHADER: string;
 declare const OPTION_TOOLTIP_VERTEX_ANIMATION_SHADERS: string;
 declare const OPTION_TOOLTIP_VERTICAL_SYNC: string;
 declare const OPTION_TOOLTIP_VOICE_ACTIVATION_SENSITIVITY: string;
 declare const OPTION_TOOLTIP_VOICE_AMBIENCE: string;
 declare const OPTION_TOOLTIP_VOICE_INPUT: string;
 declare const OPTION_TOOLTIP_VOICE_INPUT_VOLUME: string;
 declare const OPTION_TOOLTIP_VOICE_MUSIC: string;
 declare const OPTION_TOOLTIP_VOICE_OUTPUT: string;
 declare const OPTION_TOOLTIP_VOICE_OUTPUT_VOLUME: string;
 declare const OPTION_TOOLTIP_VOICE_SOUND: string;
 declare const OPTION_TOOLTIP_VOICE_TYPE1: string;
 declare const OPTION_TOOLTIP_VOICE_TYPE2: string;
 declare const OPTION_TOOLTIP_WATCH_FRAME_WIDTH: string;
 declare const OPTION_TOOLTIP_WATER_COLLISION: string;
 declare const OPTION_TOOLTIP_WEATHER_DETAIL: string;
 declare const OPTION_TOOLTIP_WINDOWED_MAXIMIZED: string;
 declare const OPTION_TOOLTIP_WINDOWED_MODE: string;
 declare const OPTION_TOOLTIP_WINDOW_LOCK: string;
 declare const OPTION_TOOLTIP_WORLD_LOD: string;
 declare const OPTION_TOOLTIP_WORLD_PVP_DISPLAY1: string;
 declare const OPTION_TOOLTIP_WORLD_PVP_DISPLAY2: string;
 declare const OPTION_TOOLTIP_WORLD_PVP_DISPLAY3: string;
 declare const OPTION_TOOLTIP_WORLD_PVP_DISPLAY_ALWAYS: string;
 declare const OPTION_TOOLTIP_WORLD_PVP_DISPLAY_DYNAMIC: string;
 declare const OPTION_TOOLTIP_WORLD_PVP_DISPLAY_NEVER: string;
 declare const OPTION_TOOLTIP_WOW_MOUSE: string;
 declare const OPTION_TOOLTIP_XP_BAR: string;
 declare const OPTION_UI_DEPTH: string;
 declare const OPTION_USE_EQUIPMENT_MANAGER_DESCRIPTION: string;
 declare const OPT_OUT_LOOT_TITLE: string;
 declare const OPT_OUT_LOOT_TOGGLE_OFF: string;
 declare const OPT_OUT_LOOT_TOGGLE_ON: string;
 declare const OR_CAPS: string;
 declare const OTHER: string;
 declare const OTHER_MESSAGES: string;
 declare const OUTBID: string;
 declare const OUTBID_BY: string;
 declare const OUT_OF_ENERGY: string;
 declare const OUT_OF_FOCUS: string;
 declare const OUT_OF_HEALTH: string;
 declare const OUT_OF_MANA: string;
 declare const OUT_OF_POWER_DISPLAY: string;
 declare const OUT_OF_RAGE: string;
 declare const PAGE_NUMBER: string;
 declare const PALADIN_INTELLECT_TOOLTIP: string;
 declare const PALADIN_STRENGTH_TOOLTIP: string;
 declare const PAPERDOLLFRAME_TOOLTIP_FORMAT: string;
 declare const PAPERDOLL_SELECT_TITLE: string;
 declare const PARENS_TEMPLATE: string;
 declare const PARRIED: string;
 declare const PARRY: string;
 declare const PARRY_CHANCE: string;
 declare const PARTICLE_DENSITY: string;
 declare const PARTY: string;
 declare const PARTYRAID_LABEL: string;
 declare const PARTYRAID_SUBTEXT: string;
 declare const PARTY_CHAT_BUBBLES_TEXT: string;
 declare const PARTY_INVITE: string;
 declare const PARTY_LEADER: string;
 declare const PARTY_LEAVE: string;
 declare const PARTY_MESSAGE: string;
 declare const PARTY_OPTIONS_LABEL: string;
 declare const PARTY_PROMOTE: string;
 declare const PARTY_PROMOTE_GUIDE: string;
 declare const PARTY_QUEST_STATUS_NONE: string;
 declare const PARTY_QUEST_STATUS_ON: string;
 declare const PARTY_SILENCE: string;
 declare const PARTY_UNINVITE: string;
 declare const PARTY_UNSILENCE: string;
 declare const PASS: string;
 declare const PASSIVE_PARENS: string;
 declare const PASSWORD: string;
 declare const PENDING_INVITE: string;
 declare const PENDING_INVITE_LIST: string;
 declare const PERCENT_SYMBOL: string;
 declare const PERIODIC: string;
 declare const PERIODIC_MESSAGES: string;
 declare const PET: string;
 declare const PETITION_CREATOR: string;
 declare const PETITION_NUM_SIGNATURES: string;
 declare const PETITION_TITLE: string;
 declare const PETS: string;
 declare const PETTAME_ANOTHERSUMMONACTIVE: string;
 declare const PETTAME_CANTCONTROLEXOTIC: string;
 declare const PETTAME_CREATUREALREADYOWNED: string;
 declare const PETTAME_DEAD: string;
 declare const PETTAME_INTERNALERROR: string;
 declare const PETTAME_INVALIDCREATURE: string;
 declare const PETTAME_NOPETAVAILABLE: string;
 declare const PETTAME_NOTDEAD: string;
 declare const PETTAME_NOTTAMEABLE: string;
 declare const PETTAME_TOOHIGHLEVEL: string;
 declare const PETTAME_TOOMANY: string;
 declare const PETTAME_UNITSCANTTAME: string;
 declare const PETTAME_UNKNOWNERROR: string;
 declare const PET_ABANDON: string;
 declare const PET_ACTION_ATTACK: string;
 declare const PET_ACTION_DISMISS: string;
 declare const PET_ACTION_FOLLOW: string;
 declare const PET_ACTION_WAIT: string;
 declare const PET_AGGRESSIVE: string;
 declare const PET_ATTACK: string;
 declare const PET_BONUS_TOOLTIP_ARMOR: string;
 declare const PET_BONUS_TOOLTIP_INTELLECT: string;
 declare const PET_BONUS_TOOLTIP_RANGED_ATTACK_POWER: string;
 declare const PET_BONUS_TOOLTIP_RESISTANCE: string;
 declare const PET_BONUS_TOOLTIP_SPELLDAMAGE: string;
 declare const PET_BONUS_TOOLTIP_STAMINA: string;
 declare const PET_BONUS_TOOLTIP_WARLOCK_SPELLDMG_FIRE: string;
 declare const PET_BONUS_TOOLTIP_WARLOCK_SPELLDMG_SHADOW: string;
 declare const PET_DAMAGE_PERCENTAGE: string;
 declare const PET_DEFENSIVE: string;
 declare const PET_DIET_TEMPLATE: string;
 declare const PET_DISMISS: string;
 declare const PET_FOLLOW: string;
 declare const PET_HAPPINESS1: string;
 declare const PET_HAPPINESS2: string;
 declare const PET_HAPPINESS3: string;
 declare const PET_INFO: string;
 declare const PET_MODE_AGGRESSIVE: string;
 declare const PET_MODE_DEFENSIVE: string;
 declare const PET_MODE_PASSIVE: string;
 declare const PET_PAPERDOLL: string;
 declare const PET_PASSIVE: string;
 declare const PET_RENAME: string;
 declare const PET_RENAME_CONFIRMATION: string;
 declare const PET_RENAME_LABEL: string;
 declare const PET_SPELLS_TEMPLATE: string;
 declare const PET_SPELL_NOPATH: string;
 declare const PET_TIME_LEFT_MINUTES: string;
 declare const PET_TIME_LEFT_SECONDS: string;
 declare const PET_TYPE_DEMON: string;
 declare const PET_TYPE_PET: string;
 declare const PET_WAIT: string;
 declare const PHONG_SHADING: string;
 declare const PHYSICAL_HARASSMENT: string;
 declare const PHYSICAL_HARASSMENT_DESCRIPTION: string;
 declare const PHYSICAL_HARASSMENT_TEXT1: string;
 declare const PHYSICAL_HARASSMENT_TEXT2: string;
 declare const PHYSICAL_HARASSMENT_TEXT3: string;
 declare const PHYSICAL_HARASSMENT_TEXT4: string;
 declare const PHYSICAL_HARASSMENT_TEXT5: string;
 declare const PHYSICAL_HARASSMENT_TEXT6: string;
 declare const PIXEL_SHADERS: string;
 declare const PLAYBACK: string;
 declare const PLAYED: string;
 declare const PLAYER: string;
 declare const PLAYERSTAT_BASE_STATS: string;
 declare const PLAYERSTAT_DEFENSES: string;
 declare const PLAYERSTAT_MELEE_COMBAT: string;
 declare const PLAYERSTAT_RANGED_COMBAT: string;
 declare const PLAYERSTAT_SPELL_COMBAT: string;
 declare const PLAYERS_IN_GROUP: string;
 declare const PLAYER_COUNT_ALLIANCE: string;
 declare const PLAYER_COUNT_HORDE: string;
 declare const PLAYER_DETAIL: string;
 declare const PLAYER_DIFFICULTY1: string;
 declare const PLAYER_DIFFICULTY2: string;
 declare const PLAYER_IS_PVP_AFK: string;
 declare const PLAYER_LEVEL: string;
 declare const PLAYER_LEVEL_UP: string;
 declare const PLAYER_LIST_DELIMITER: string;
 declare const PLAYER_LOGOUT_FAILED: string;
 declare const PLAYER_LOGOUT_FAILED_ERROR: string;
 declare const PLAYER_MESSAGES: string;
 declare const PLAYER_NOT_FOUND: string;
 declare const PLAYER_OFFLINE: string;
 declare const PLAYER_OPTIONS_LABEL: string;
 declare const PLAYER_SERVER_FIRST_ACHIEVEMENT: string;
 declare const PLAYER_STATUS: string;
 declare const PLAYER_V_PLAYER: string;
 declare const PLAYTIME_TIRED: string;
 declare const PLAYTIME_TIRED_ABILITY: string;
 declare const PLAYTIME_UNHEALTHY: string;
 declare const PLAYTIME_UNHEALTHY_ABILITY: string;
 declare const PLAY_AGGRO_SOUNDS: string;
 declare const PLUS_AMMO_DAMAGE_TEMPLATE: string;
 declare const PLUS_AMMO_SCHOOL_DAMAGE_TEMPLATE: string;
 declare const PLUS_DAMAGE_TEMPLATE: string;
 declare const PLUS_DAMAGE_TEMPLATE_WITH_SCHOOL: string;
 declare const PLUS_SINGLE_DAMAGE_TEMPLATE: string;
 declare const PLUS_SINGLE_DAMAGE_TEMPLATE_WITH_SCHOOL: string;
 declare const POP_IN_CHAT: string;
 declare const POP_OUT_CHAT: string;
 declare const POTION_TIMER: string;
 declare const POWER_ABBR: string;
 declare const POWER_DISPLAY_COST: string;
 declare const POWER_DISPLAY_COST_PER_TIME: string;
 declare const POWER_GAINS: string;
 declare const POWER_GAINS_COMBATLOG_TOOLTIP: string;
 declare const POWER_TYPE_BLOOD_POWER: string;
 declare const POWER_TYPE_HEAT: string;
 declare const POWER_TYPE_OOZE: string;
 declare const POWER_TYPE_PYRITE: string;
 declare const POWER_TYPE_STEAM: string;
 declare const POWER_TYPE_WRATH: string;
 declare const PREFERENCES: string;
 declare const PRESS_TAB: string;
 declare const PREV: string;
 declare const PREVIEW_TALENT_CHANGES: string;
 declare const PREVIOUS: string;
 declare const PRIEST_INTELLECT_TOOLTIP: string;
 declare const PRIMARY: string;
 declare const PRIMARY_SKILLS: string;
 declare const PROC_EVENT0_DESC: string;
 declare const PROC_EVENT1024_DESC: string;
 declare const PROC_EVENT128_DESC: string;
 declare const PROC_EVENT16_DESC: string;
 declare const PROC_EVENT1_DESC: string;
 declare const PROC_EVENT2048_DESC: string;
 declare const PROC_EVENT256_DESC: string;
 declare const PROC_EVENT2_DESC: string;
 declare const PROC_EVENT32_DESC: string;
 declare const PROC_EVENT3_DESC: string;
 declare const PROC_EVENT4_DESC: string;
 declare const PROC_EVENT512_DESC: string;
 declare const PROC_EVENT64_DESC: string;
 declare const PROC_EVENT8_DESC: string;
 declare const PROFANITY_FILTER: string;
 declare const PROFESSION_CONFIRMATION1: string;
 declare const PROFESSION_CONFIRMATION2: string;
 declare const PROFFESSION_CONFIRMATION2: string;
 declare const PROFICIENCIES: string;
 declare const PROFICIENCIES_COLON: string;
 declare const PROFICIENCY_NEEDED: string;
 declare const PROJECTED_TEXTURES: string;
 declare const PTT_BOUND: string;
 declare const PUBLICNOTE_BUTTON_TOOLTIP: string;
 declare const PUBLIC_NOTE: string;
 declare const PURCHASE: string;
 declare const PURCHASED_BY_COLON: string;
 declare const PURCHASE_TAB_TEXT: string;
 declare const PUSHTOTALK_SOUND_TEXT: string;
 declare const PUSH_TO_TALK: string;
 declare const PVP: string;
 declare const PVPBATTLEGROUND_WINTERGRASPTIMER: string;
 declare const PVPBATTLEGROUND_WINTERGRASPTIMER_CANNOT_QUEUE: string;
 declare const PVPBATTLEGROUND_WINTERGRASPTIMER_CAN_QUEUE: string;
 declare const PVPBATTLEGROUND_WINTERGRASPTIMER_TOOLTIP: string;
 declare const PVPFFA: string;
 declare const PVP_DISABLED: string;
 declare const PVP_ENABLED: string;
 declare const PVP_FLAG: string;
 declare const PVP_LABEL_ARENA: string;
 declare const PVP_LABEL_HONOR: string;
 declare const PVP_MEDAL1: string;
 declare const PVP_MEDAL2: string;
 declare const PVP_MEDAL3: string;
 declare const PVP_MEDAL4: string;
 declare const PVP_MEDAL5: string;
 declare const PVP_MEDAL6: string;
 declare const PVP_MEDAL7: string;
 declare const PVP_MEDAL8: string;
 declare const PVP_MINIMAP: string;
 declare const PVP_OPTIONS: string;
 declare const PVP_POLICY_URL: string;
 declare const PVP_RANK_0_0: string;
 declare const PVP_RANK_0_0_FEMALE: string;
 declare const PVP_RANK_0_1: string;
 declare const PVP_RANK_0_1_FEMALE: string;
 declare const PVP_RANK_10_0: string;
 declare const PVP_RANK_10_0_FEMALE: string;
 declare const PVP_RANK_10_1: string;
 declare const PVP_RANK_10_1_FEMALE: string;
 declare const PVP_RANK_11_0: string;
 declare const PVP_RANK_11_0_FEMALE: string;
 declare const PVP_RANK_11_1: string;
 declare const PVP_RANK_11_1_FEMALE: string;
 declare const PVP_RANK_12_0: string;
 declare const PVP_RANK_12_0_FEMALE: string;
 declare const PVP_RANK_12_1: string;
 declare const PVP_RANK_12_1_FEMALE: string;
 declare const PVP_RANK_13_0: string;
 declare const PVP_RANK_13_0_FEMALE: string;
 declare const PVP_RANK_13_1: string;
 declare const PVP_RANK_13_1_FEMALE: string;
 declare const PVP_RANK_14_0: string;
 declare const PVP_RANK_14_0_FEMALE: string;
 declare const PVP_RANK_14_1: string;
 declare const PVP_RANK_14_1_FEMALE: string;
 declare const PVP_RANK_15_0: string;
 declare const PVP_RANK_15_0_FEMALE: string;
 declare const PVP_RANK_15_1: string;
 declare const PVP_RANK_15_1_FEMALE: string;
 declare const PVP_RANK_16_0: string;
 declare const PVP_RANK_16_0_FEMALE: string;
 declare const PVP_RANK_16_1: string;
 declare const PVP_RANK_16_1_FEMALE: string;
 declare const PVP_RANK_17_0: string;
 declare const PVP_RANK_17_0_FEMALE: string;
 declare const PVP_RANK_17_1: string;
 declare const PVP_RANK_17_1_FEMALE: string;
 declare const PVP_RANK_18_0: string;
 declare const PVP_RANK_18_0_FEMALE: string;
 declare const PVP_RANK_18_1: string;
 declare const PVP_RANK_18_1_FEMALE: string;
 declare const PVP_RANK_19_0: string;
 declare const PVP_RANK_19_0_FEMALE: string;
 declare const PVP_RANK_19_1: string;
 declare const PVP_RANK_19_1_FEMALE: string;
 declare const PVP_RANK_1_0: string;
 declare const PVP_RANK_1_0_FEMALE: string;
 declare const PVP_RANK_1_1: string;
 declare const PVP_RANK_1_1_FEMALE: string;
 declare const PVP_RANK_2_0: string;
 declare const PVP_RANK_2_0_FEMALE: string;
 declare const PVP_RANK_2_1: string;
 declare const PVP_RANK_2_1_FEMALE: string;
 declare const PVP_RANK_3_0: string;
 declare const PVP_RANK_3_0_FEMALE: string;
 declare const PVP_RANK_3_1: string;
 declare const PVP_RANK_3_1_FEMALE: string;
 declare const PVP_RANK_4_0: string;
 declare const PVP_RANK_4_0_FEMALE: string;
 declare const PVP_RANK_4_1: string;
 declare const PVP_RANK_4_1_FEMALE: string;
 declare const PVP_RANK_5_0: string;
 declare const PVP_RANK_5_0_FEMALE: string;
 declare const PVP_RANK_5_1: string;
 declare const PVP_RANK_5_1_FEMALE: string;
 declare const PVP_RANK_6_0: string;
 declare const PVP_RANK_6_0_FEMALE: string;
 declare const PVP_RANK_6_1: string;
 declare const PVP_RANK_6_1_FEMALE: string;
 declare const PVP_RANK_7_0: string;
 declare const PVP_RANK_7_0_FEMALE: string;
 declare const PVP_RANK_7_1: string;
 declare const PVP_RANK_7_1_FEMALE: string;
 declare const PVP_RANK_8_0: string;
 declare const PVP_RANK_8_0_FEMALE: string;
 declare const PVP_RANK_8_1: string;
 declare const PVP_RANK_8_1_FEMALE: string;
 declare const PVP_RANK_9_0: string;
 declare const PVP_RANK_9_0_FEMALE: string;
 declare const PVP_RANK_9_1: string;
 declare const PVP_RANK_9_1_FEMALE: string;
 declare const PVP_RANK_LEADER: string;
 declare const PVP_RATING: string;
 declare const PVP_REPORT_AFK: string;
 declare const PVP_REPORT_AFK_ALL: string;
 declare const PVP_REPORT_AFK_ALREADY_NOTIFIED: string;
 declare const PVP_REPORT_AFK_GENERIC_FAILURE: string;
 declare const PVP_REPORT_AFK_NOT_SAME_TEAM: string;
 declare const PVP_REPORT_AFK_PLAYER_NOT_VALID: string;
 declare const PVP_REPORT_AFK_SUCCEEDED: string;
 declare const PVP_REPORT_AFK_SYSTEM_DISABLED: string;
 declare const PVP_REPORT_AFK_SYSTEM_ENABLED: string;
 declare const PVP_REQUIRED_FOR_CAPTURE: string;
 declare const PVP_TEAMSIZE: string;
 declare const PVP_TEAMTYPE: string;
 declare const PVP_TOGGLE_OFF_VERBOSE: string;
 declare const PVP_TOGGLE_ON_VERBOSE: string;
 declare const PVP_YOUR_RATING: string;
 declare const PVP_ZONE_OBJECTIVES: string;
 declare const QUALITY: string;
 declare const QUESTLOG_BUTTON: string;
 declare const QUESTLOG_NO_QUESTS_TEXT: string;
 declare const QUESTS_COLON: string;
 declare const QUESTS_LABEL: string;
 declare const QUESTS_SUBTEXT: string;
 declare const QUEST_ACCEPT: string;
 declare const QUEST_ACCEPT_LOG_FULL: string;
 declare const QUEST_COMPLETE: string;
 declare const QUEST_DASH: string;
 declare const QUEST_DESCRIPTION: string;
 declare const QUEST_DETAILS: string;
 declare const QUEST_FACTION_NEEDED: string;
 declare const QUEST_FACTION_NEEDED_NOPROGRESS: string;
 declare const QUEST_FAILED: string;
 declare const QUEST_FAILED_TAG: string;
 declare const QUEST_HARD: string;
 declare const QUEST_INTERMEDIATE_ITEMS_NEEDED: string;
 declare const QUEST_ITEMS_NEEDED: string;
 declare const QUEST_ITEMS_NEEDED_NOPROGRESS: string;
 declare const QUEST_LOG: string;
 declare const QUEST_LOG_COUNT_TEMPLATE: string;
 declare const QUEST_LOG_DAILY_COUNT_TEMPLATE: string;
 declare const QUEST_LOG_DAILY_TOOLTIP: string;
 declare const QUEST_MONSTERS_KILLED: string;
 declare const QUEST_MONSTERS_KILLED_NOPROGRESS: string;
 declare const QUEST_OBJECTIVES: string;
 declare const QUEST_OBJECTS_FOUND: string;
 declare const QUEST_OBJECTS_FOUND_NOPROGRESS: string;
 declare const QUEST_PLAYERS_KILLED: string;
 declare const QUEST_PLAYERS_KILLED_NOPROGRESS: string;
 declare const QUEST_REWARDS: string;
 declare const QUEST_SUGGESTED_GROUP_NUM: string;
 declare const QUEST_SUGGESTED_GROUP_NUM_TAG: string;
 declare const QUEST_TIMERS: string;
 declare const QUEST_TOOLTIP_ACTIVE: string;
 declare const QUEST_TOOLTIP_REQUIREMENTS: string;
 declare const QUEST_WATCH_NO_OBJECTIVES: string;
 declare const QUEST_WATCH_TOOLTIP: string;
 declare const QUEST_WATCH_TOO_MANY: string;
 declare const QUEUED_FOR: string;
 declare const QUEUED_FOR_SHORT: string;
 declare const QUEUE_TIME_UNAVAILABLE: string;
 declare const QUICKBUTTON_NAME_DEFAULT: string;
 declare const QUICKBUTTON_NAME_EVERYTHING: string;
 declare const QUICKBUTTON_NAME_EVERYTHING_TOOLTIP: string;
 declare const QUICKBUTTON_NAME_FRIENDS: string;
 declare const QUICKBUTTON_NAME_KILLS: string;
 declare const QUICKBUTTON_NAME_KILLS_TOOLTIP: string;
 declare const QUICKBUTTON_NAME_ME: string;
 declare const QUICKBUTTON_NAME_ME_TOOLTIP: string;
 declare const QUICKBUTTON_NAME_SELF: string;
 declare const QUICKBUTTON_NAME_SELF_TOOLTIP: string;
 declare const QUICK_BUTTON_COMBATLOG_TOOLTIP: string;
 declare const QUIT: string;
 declare const QUIT_NOW: string;
 declare const QUIT_TIMER: string;
 declare const RACE: string;
 declare const RACE_CLASS_ONLY: string;
 declare const RACIAL_SKILLS: string;
 declare const RAF_GRANT_LEVEL: string;
 declare const RAF_SUMMON: string;
 declare const RAF_SUMMON_LINKED: string;
 declare const RAF_SUMMON_WITH_COOLDOWN: string;
 declare const RAGE: string;
 declare const RAGE_COST: string;
 declare const RAGE_COST_PER_TIME: string;
 declare const RAID: string;
 declare const RAIDOPTIONS_MENU: string;
 declare const RAID_AND_PARTY: string;
 declare const RAID_ASSISTANT: string;
 declare const RAID_ASSISTANT_TOKEN: string;
 declare const RAID_BOSS_MESSAGE: string;
 declare const RAID_BROWSER_DESCRIPTION: string;
 declare const RAID_CONTROL: string;
 declare const RAID_DESCRIPTION: string;
 declare const RAID_DIFFICULTY: string;
 declare const RAID_DIFFICULTY1: string;
 declare const RAID_DIFFICULTY2: string;
 declare const RAID_DIFFICULTY3: string;
 declare const RAID_DIFFICULTY4: string;
 declare const RAID_DIFFICULTY_10PLAYER: string;
 declare const RAID_DIFFICULTY_10PLAYER_HEROIC: string;
 declare const RAID_DIFFICULTY_20PLAYER: string;
 declare const RAID_DIFFICULTY_25PLAYER: string;
 declare const RAID_DIFFICULTY_25PLAYER_HEROIC: string;
 declare const RAID_DIFFICULTY_40PLAYER: string;
 declare const RAID_GROUPS: string;
 declare const RAID_INFO: string;
 declare const RAID_INFORMATION: string;
 declare const RAID_INFO_DESC: string;
 declare const RAID_INSTANCE_EXPIRED: string;
 declare const RAID_INSTANCE_EXPIRES: string;
 declare const RAID_INSTANCE_EXPIRES_EXPIRED: string;
 declare const RAID_INSTANCE_EXPIRES_EXTENDED: string;
 declare const RAID_INSTANCE_INFO_FMT: string;
 declare const RAID_INSTANCE_INFO_HDR: string;
 declare const RAID_INSTANCE_LOCK_EXTENDED: string;
 declare const RAID_INSTANCE_LOCK_NOT_EXTENDED: string;
 declare const RAID_INSTANCE_WARNING_HOURS: string;
 declare const RAID_INSTANCE_WARNING_MIN: string;
 declare const RAID_INSTANCE_WARNING_MIN_SOON: string;
 declare const RAID_INSTANCE_WELCOME: string;
 declare const RAID_INSTANCE_WELCOME_DH: string;
 declare const RAID_INSTANCE_WELCOME_EXTENDED: string;
 declare const RAID_INSTANCE_WELCOME_HM: string;
 declare const RAID_INSTANCE_WELCOME_LOCKED: string;
 declare const RAID_INSTANCE_WELCOME_LOCKED_EXTENDED: string;
 declare const RAID_LEADER: string;
 declare const RAID_LEADER_TOKEN: string;
 declare const RAID_MEMBERS_AFK: string;
 declare const RAID_MEMBER_NOT_READY: string;
 declare const RAID_MESSAGE: string;
 declare const RAID_SILENCE: string;
 declare const RAID_TARGET_1: string;
 declare const RAID_TARGET_2: string;
 declare const RAID_TARGET_3: string;
 declare const RAID_TARGET_4: string;
 declare const RAID_TARGET_5: string;
 declare const RAID_TARGET_6: string;
 declare const RAID_TARGET_7: string;
 declare const RAID_TARGET_8: string;
 declare const RAID_TARGET_ICON: string;
 declare const RAID_TARGET_NONE: string;
 declare const RAID_UNSILENCE: string;
 declare const RAID_WARNING: string;
 declare const RAID_WARNING_MESSAGE: string;
 declare const RALT_KEY_TEXT: string;
 declare const RANDOM_BATTLEGROUND: string;
 declare const RANDOM_BATTLEGROUND_EXPLANATION: string;
 declare const RANDOM_DUNGEON_IS_READY: string;
 declare const RANDOM_ROLL_RESULT: string;
 declare const RANGED: string;
 declare const RANGEDSLOT: string;
 declare const RANGED_ATTACK: string;
 declare const RANGED_ATTACK_POWER: string;
 declare const RANGED_ATTACK_POWER_TOOLTIP: string;
 declare const RANGED_ATTACK_TOOLTIP: string;
 declare const RANGED_COMBATLOG_TOOLTIP: string;
 declare const RANGED_CRIT_CHANCE: string;
 declare const RANGED_DAMAGE_TOOLTIP: string;
 declare const RANGE_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const RANGE_MISSED_COMBATLOG_TOOLTIP: string;
 declare const RANK: string;
 declare const RANK_COLON: string;
 declare const RANK_POSITION: string;
 declare const RARITY: string;
 declare const RATING: string;
 declare const RATINGS_MENU: string;
 declare const RATINGS_TEXT: string;
 declare const RATING_CHANGE_TOOLTIP: string;
 declare const RCTRL_KEY_TEXT: string;
 declare const REACTIVATE_RAID_LOCK: string;
 declare const READY: string;
 declare const READY_CHECK: string;
 declare const READY_CHECK_ALL_READY: string;
 declare const READY_CHECK_FINISHED: string;
 declare const READY_CHECK_MESSAGE: string;
 declare const READY_CHECK_NO_AFK: string;
 declare const READY_CHECK_START: string;
 declare const READY_CHECK_YOU_WERE_AFK: string;
 declare const RECOVER_CORPSE: string;
 declare const RECOVER_CORPSE_INSTANCE: string;
 declare const RECOVER_CORPSE_TIMER: string;
 declare const RED_GEM: string;
 declare const REFLECT: string;
 declare const REFRESH: string;
 declare const REFRESH_RATE: string;
 declare const REFUND_TIME_REMAINING: string;
 declare const RELICSLOT: string;
 declare const REMOVE: string;
 declare const REMOVE_BLOCK: string;
 declare const REMOVE_CHAT_DELAY_TEXT: string;
 declare const REMOVE_FRIEND: string;
 declare const REMOVE_FRIEND_CONFIRMATION: string;
 declare const REMOVE_GUILDMEMBER_LABEL: string;
 declare const REMOVE_IGNORE: string;
 declare const REMOVE_MODERATOR: string;
 declare const REMOVE_MUTE: string;
 declare const REMOVE_PLAYER: string;
 declare const RENAME_ARENA_TEAM: string;
 declare const RENAME_ARENA_TEAM_LABEL: string;
 declare const RENAME_CHAT_WINDOW: string;
 declare const RENAME_GUILD: string;
 declare const RENAME_GUILD_LABEL: string;
 declare const REPAIR_ALL_ITEMS: string;
 declare const REPAIR_AN_ITEM: string;
 declare const REPAIR_COST: string;
 declare const REPAIR_ITEMS: string;
 declare const REPLACE_ENCHANT: string;
 declare const REPLY_MESSAGE: string;
 declare const REPORT_MULTIPLE_PVP_AFK_SENT: string;
 declare const REPORT_PHYSICAL_HARASSMENT: string;
 declare const REPORT_PVP_AFK_SENT: string;
 declare const REPORT_SPAM: string;
 declare const REPORT_SPAM_CONFIRMATION: string;
 declare const REPORT_VERBAL_HARASSMENT: string;
 declare const REPUTATION: string;
 declare const REPUTATION_ABBR: string;
 declare const REPUTATION_AT_WAR_DESCRIPTION: string;
 declare const REPUTATION_FACTION_DESCRIPTION: string;
 declare const REPUTATION_MOVE_TO_INACTIVE: string;
 declare const REPUTATION_SHOW_AS_XP: string;
 declare const REPUTATION_STANDING_DESCRIPTION: string;
 declare const REPUTATION_STATUS_AT_PEACE: string;
 declare const REPUTATION_STATUS_AT_WAR: string;
 declare const REPUTATION_STATUS_NOT_AT_PEACE: string;
 declare const REPUTATION_STATUS_PERMANENT_AT_PEACE: string;
 declare const REPUTATION_STATUS_PERMANENT_AT_WAR: string;
 declare const REQUEST_SIGNATURE: string;
 declare const REQUIRED_MONEY: string;
 declare const REQUIRES_LABEL: string;
 declare const REQUIRES_RUNIC_POWER: string;
 declare const RESET: string;
 declare const RESETS_IN: string;
 declare const RESET_ALL_WINDOWS: string;
 declare const RESET_CHAT_WINDOW: string;
 declare const RESET_FAILED_NOTIFY: string;
 declare const RESET_INSTANCES: string;
 declare const RESET_TO_DEFAULT: string;
 declare const RESET_TUTORIALS: string;
 declare const RESILIENCE: string;
 declare const RESILIENCE_ABBR: string;
 declare const RESILIENCE_TOOLTIP: string;
 declare const RESIST: string;
 declare const RESISTANCE0_NAME: string;
 declare const RESISTANCE1_NAME: string;
 declare const RESISTANCE2_NAME: string;
 declare const RESISTANCE3_NAME: string;
 declare const RESISTANCE4_NAME: string;
 declare const RESISTANCE5_NAME: string;
 declare const RESISTANCE6_NAME: string;
 declare const RESISTANCE_EXCELLENT: string;
 declare const RESISTANCE_FAIR: string;
 declare const RESISTANCE_GOOD: string;
 declare const RESISTANCE_LABEL: string;
 declare const RESISTANCE_NONE: string;
 declare const RESISTANCE_POOR: string;
 declare const RESISTANCE_TEMPLATE: string;
 declare const RESISTANCE_TOOLTIP_SUBTEXT: string;
 declare const RESISTANCE_TYPE0: string;
 declare const RESISTANCE_TYPE1: string;
 declare const RESISTANCE_TYPE2: string;
 declare const RESISTANCE_TYPE3: string;
 declare const RESISTANCE_TYPE4: string;
 declare const RESISTANCE_TYPE5: string;
 declare const RESISTANCE_TYPE6: string;
 declare const RESISTANCE_VERYGOOD: string;
 declare const RESIST_TRAILER: string;
 declare const RESOLUTION: string;
 declare const RESOLUTION_LABEL: string;
 declare const RESOLUTION_SUBTEXT: string;
 declare const RESURRECT: string;
 declare const RESURRECTABLE: string;
 declare const RESURRECT_REQUEST: string;
 declare const RESURRECT_REQUEST_NO_SICKNESS: string;
 declare const RESURRECT_REQUEST_NO_SICKNESS_TIMER: string;
 declare const RESURRECT_REQUEST_TIMER: string;
 declare const RETRIEVING_ITEM_INFO: string;
 declare const RETURN_TO_GAME: string;
 declare const RETURN_TO_WORLD: string;
 declare const REWARD_AURA: string;
 declare const REWARD_CHOICES: string;
 declare const REWARD_CHOOSE: string;
 declare const REWARD_ITEMS: string;
 declare const REWARD_ITEMS_ONLY: string;
 declare const REWARD_REPUTATION: string;
 declare const REWARD_REPUTATION_TEXT: string;
 declare const REWARD_SPELL: string;
 declare const REWARD_TITLE: string;
 declare const REWARD_TRADESKILL_SPELL: string;
 declare const RID_FRIEND_REQUEST_INFO: string;
 declare const RIGHT_CLICK_MESSAGE: string;
 declare const ROGUE_AGILITY_TOOLTIP: string;
 declare const ROLE: string;
 declare const ROLE_CHECK_IN_PROGRESS_TOOLTIP: string;
 declare const ROLE_DESCRIPTION1: string;
 declare const ROLE_DESCRIPTION2: string;
 declare const ROLE_DESCRIPTION3: string;
 declare const ROLL_DISENCHANT: string;
 declare const ROLL_DISENCHANT_NEWBIE: string;
 declare const ROTATE_MINIMAP: string;
 declare const RSHIFT_KEY_TEXT: string;
 declare const RUNES: string;
 declare const RUNE_COST_BLOOD: string;
 declare const RUNE_COST_FROST: string;
 declare const RUNE_COST_ONGOING: string;
 declare const RUNE_COST_UNHOLY: string;
 declare const RUNIC_POWER: string;
 declare const RUNIC_POWER_COST: string;
 declare const RUNIC_POWER_COST_PER_TIME: string;
 declare const RURU: string;
 declare const RUSSIAN_DECLENSION: string;
 declare const RUSSIAN_DECLENSION_1: string;
 declare const RUSSIAN_DECLENSION_2: string;
 declare const RUSSIAN_DECLENSION_3: string;
 declare const RUSSIAN_DECLENSION_4: string;
 declare const RUSSIAN_DECLENSION_5: string;
 declare const RUSSIAN_DECLENSION_EXAMPLE_1: string;
 declare const RUSSIAN_DECLENSION_EXAMPLE_2: string;
 declare const RUSSIAN_DECLENSION_EXAMPLE_3: string;
 declare const RUSSIAN_DECLENSION_EXAMPLE_4: string;
 declare const RUSSIAN_DECLENSION_EXAMPLE_5: string;
 declare const SALE_PRICE_COLON: string;
 declare const SANCTUARY_TERRITORY: string;
 declare const SAVE: string;
 declare const SAVE_CHANGES: string;
 declare const SAY: string;
 declare const SAY_MESSAGE: string;
 declare const SCORE_DAMAGE_DONE: string;
 declare const SCORE_FLAGS_CAPTURED: string;
 declare const SCORE_FLAGS_RETURNED: string;
 declare const SCORE_HEALING_DONE: string;
 declare const SCORE_HONORABLE_KILLS: string;
 declare const SCORE_HONOR_GAINED: string;
 declare const SCORE_KILLING_BLOWS: string;
 declare const SCORE_POWER_UPS: string;
 declare const SCORE_RATING_CHANGE: string;
 declare const SCORE_TEAM_SKILL: string;
 declare const SCREENSHOT_FAILURE: string;
 declare const SCREENSHOT_SUCCESS: string;
 declare const SEARCH: string;
 declare const SEARCHING_FOR_GROUPS_NEEDS: string;
 declare const SEARCHING_FOR_ITEMS: string;
 declare const SECONDARY: string;
 declare const SECONDARYHANDSLOT: string;
 declare const SECONDARY_SKILLS: string;
 declare const SECONDS: string;
 declare const SECONDS_ABBR: string;
 declare const SECOND_NUMBER_CAP: string;
 declare const SECOND_ONELETTER_ABBR: string;
 declare const SECURE_ABILITY_TOGGLE: string;
 declare const SELECT_CATEGORY: string;
 declare const SELFMUTED: string;
 declare const SELL_PRICE: string;
 declare const SENDMAIL: string;
 declare const SENDMAIL_TEXT: string;
 declare const SEND_BUG: string;
 declare const SEND_LABEL: string;
 declare const SEND_MAIL_COST: string;
 declare const SEND_MESSAGE: string;
 declare const SEND_MONEY: string;
 declare const SEND_MONEY_CONFIRMATION: string;
 declare const SEND_REQUEST: string;
 declare const SEND_SUGGEST: string;
 declare const SERVER_CHANNELS: string;
 declare const SERVER_FIRST_ACHIEVEMENT: string;
 declare const SERVER_MESSAGE_COLON: string;
 declare const SERVER_MESSAGE_PREFIX: string;
 declare const SETTINGS: string;
 declare const SET_COMMENT_LABEL: string;
 declare const SET_FOCUS: string;
 declare const SET_FRIENDNOTE_LABEL: string;
 declare const SET_GUILDMOTD_LABEL: string;
 declare const SET_GUILDOFFICERNOTE_LABEL: string;
 declare const SET_GUILDPLAYERNOTE_LABEL: string;
 declare const SET_MAIN_ASSIST: string;
 declare const SET_MAIN_TANK: string;
 declare const SET_NOTE: string;
 declare const SET_RAID_ASSISTANT: string;
 declare const SET_RAID_LEADER: string;
 declare const SHADOW_QUALITY: string;
 declare const SHAMAN_INTELLECT_TOOLTIP: string;
 declare const SHAMAN_STRENGTH_TOOLTIP: string;
 declare const SHARDS: string;
 declare const SHARE_QUEST: string;
 declare const SHARE_QUEST_ABBREV: string;
 declare const SHARE_QUEST_TEXT: string;
 declare const SHIELDSLOT: string;
 declare const SHIELD_BLOCK_TEMPLATE: string;
 declare const SHIFT_KEY: string;
 declare const SHIFT_KEY_TEXT: string;
 declare const SHIRTSLOT: string;
 declare const SHORTDATE: string;
 declare const SHOULDERSLOT: string;
 declare const SHOW_ALL_SPELL_RANKS: string;
 declare const SHOW_ARENA_ENEMY_CASTBAR_TEXT: string;
 declare const SHOW_ARENA_ENEMY_FRAMES_TEXT: string;
 declare const SHOW_ARENA_ENEMY_PETS_TEXT: string;
 declare const SHOW_BATTLEFIELDMINIMAP_PLAYERS: string;
 declare const SHOW_BATTLENET_TOASTS: string;
 declare const SHOW_BRACES: string;
 declare const SHOW_BRACES_COMBATLOG_TOOLTIP: string;
 declare const SHOW_BUFFS: string;
 declare const SHOW_BUFF_DURATION_TEXT: string;
 declare const SHOW_CASTABLE_BUFFS_TEXT: string;
 declare const SHOW_CASTABLE_DEBUFFS_TEXT: string;
 declare const SHOW_CHAT_ICONS: string;
 declare const SHOW_CLASS_COLOR: string;
 declare const SHOW_CLASS_COLOR_IN_V_KEY: string;
 declare const SHOW_CLOAK: string;
 declare const SHOW_CLOCK: string;
 declare const SHOW_COMBAT_HEALING: string;
 declare const SHOW_COMBAT_TEXT_TEXT: string;
 declare const SHOW_DAMAGE_TEXT: string;
 declare const SHOW_DEBUFFS: string;
 declare const SHOW_DISPELLABLE_DEBUFFS_TEXT: string;
 declare const SHOW_ENEMY_CAST: string;
 declare const SHOW_FACTION_ON_MAINSCREEN: string;
 declare const SHOW_FREE_BAG_SLOTS_TEXT: string;
 declare const SHOW_FRIENDS_LIST: string;
 declare const SHOW_FULLSCREEN_STATUS_TEXT: string;
 declare const SHOW_GUILD_NAMES: string;
 declare const SHOW_HELM: string;
 declare const SHOW_IGNORE_LIST: string;
 declare const SHOW_ITEM_LEVEL: string;
 declare const SHOW_LOOT_SPAM: string;
 declare const SHOW_LUA_ERRORS: string;
 declare const SHOW_MAP: string;
 declare const SHOW_MULTIBAR1_TEXT: string;
 declare const SHOW_MULTIBAR2_TEXT: string;
 declare const SHOW_MULTIBAR3_TEXT: string;
 declare const SHOW_MULTIBAR4_TEXT: string;
 declare const SHOW_NEWBIE_TIPS_TEXT: string;
 declare const SHOW_NPC_NAMES: string;
 declare const SHOW_NUMERIC_THREAT: string;
 declare const SHOW_OFFLINE_MEMBERS: string;
 declare const SHOW_ON_BACKPACK: string;
 declare const SHOW_OTHER_TARGET_EFFECTS: string;
 declare const SHOW_OWN_NAME: string;
 declare const SHOW_PARTY_BACKGROUND_TEXT: string;
 declare const SHOW_PARTY_PETS_TEXT: string;
 declare const SHOW_PARTY_TEXT_TEXT: string;
 declare const SHOW_PET_MELEE_DAMAGE: string;
 declare const SHOW_PET_NAMEPLATES: string;
 declare const SHOW_PET_SPELL_DAMAGE: string;
 declare const SHOW_PLAYER_NAMES: string;
 declare const SHOW_PLAYER_TITLES: string;
 declare const SHOW_QUEST_FADING_TEXT: string;
 declare const SHOW_QUEST_OBJECTIVES_ON_MAP_TEXT: string;
 declare const SHOW_QUICK_BUTTON: string;
 declare const SHOW_RAID_RANGE_TEXT: string;
 declare const SHOW_TARGET: string;
 declare const SHOW_TARGET_CASTBAR: string;
 declare const SHOW_TARGET_CASTBAR_IN_V_KEY: string;
 declare const SHOW_TARGET_EFFECTS: string;
 declare const SHOW_TARGET_OF_TARGET_TEXT: string;
 declare const SHOW_TIMESTAMP: string;
 declare const SHOW_TIPOFTHEDAY_TEXT: string;
 declare const SHOW_TOAST_BROADCAST_TEXT: string;
 declare const SHOW_TOAST_CONVERSATION_TEXT: string;
 declare const SHOW_TOAST_FRIEND_REQUEST_TEXT: string;
 declare const SHOW_TOAST_OFFLINE_TEXT: string;
 declare const SHOW_TOAST_ONLINE_TEXT: string;
 declare const SHOW_TOAST_WINDOW_TEXT: string;
 declare const SHOW_TUTORIALS: string;
 declare const SHOW_UNIT_NAMES: string;
 declare const SIGN_CHARTER: string;
 declare const SILVER_AMOUNT: string;
 declare const SILVER_AMOUNT_SYMBOL: string;
 declare const SILVER_AMOUNT_TEXTURE: string;
 declare const SIMPLE_CHAT_OPTION_ENABLE_INTERRUPT: string;
 declare const SIMPLE_CHAT_TEXT: string;
 declare const SIMPLE_QUEST_WATCH_TEXT: string;
 declare const SINGLE_DAMAGE_TEMPLATE: string;
 declare const SINGLE_DAMAGE_TEMPLATE_WITH_SCHOOL: string;
 declare const SINGLE_PAGE_RESULTS_TEMPLATE: string;
 declare const SKILL: string;
 declare const SKILLS: string;
 declare const SKILLS_ABBR: string;
 declare const SKILLUPS: string;
 declare const SKILL_DESCRIPTION: string;
 declare const SKILL_INCREMENT_COST: string;
 declare const SKILL_INCREMENT_COST_SINGULAR: string;
 declare const SKILL_LEARNING_COST: string;
 declare const SKILL_LEARNING_COST_SINGULAR: string;
 declare const SKILL_LEVEL: string;
 declare const SKILL_POINTS_TOOLTIP: string;
 declare const SKILL_RANK_UP: string;
 declare const SKIN_COLOR: string;
 declare const SLASH_ACHIEVEMENTUI1: string;
 declare const SLASH_ACHIEVEMENTUI2: string;
 declare const SLASH_ACHIEVEMENTUI3: string;
 declare const SLASH_ACHIEVEMENTUI4: string;
 declare const SLASH_ACHIEVEMENTUI5: string;
 declare const SLASH_ACHIEVEMENTUI6: string;
 declare const SLASH_ACHIEVEMENTUI7: string;
 declare const SLASH_ACHIEVEMENTUI8: string;
 declare const SLASH_ASSIST1: string;
 declare const SLASH_ASSIST2: string;
 declare const SLASH_ASSIST3: string;
 declare const SLASH_ASSIST4: string;
 declare const SLASH_BATTLEGROUND1: string;
 declare const SLASH_BATTLEGROUND2: string;
 declare const SLASH_BATTLEGROUND3: string;
 declare const SLASH_BATTLEGROUND4: string;
 declare const SLASH_BENCHMARK1: string;
 declare const SLASH_BENCHMARK2: string;
 declare const SLASH_CALENDAR1: string;
 declare const SLASH_CALENDAR2: string;
 declare const SLASH_CANCELAURA1: string;
 declare const SLASH_CANCELAURA2: string;
 declare const SLASH_CANCELFORM1: string;
 declare const SLASH_CANCELFORM2: string;
 declare const SLASH_CAST1: string;
 declare const SLASH_CAST2: string;
 declare const SLASH_CAST3: string;
 declare const SLASH_CAST4: string;
 declare const SLASH_CASTRANDOM1: string;
 declare const SLASH_CASTRANDOM2: string;
 declare const SLASH_CASTSEQUENCE1: string;
 declare const SLASH_CASTSEQUENCE2: string;
 declare const SLASH_CHANGEACTIONBAR1: string;
 declare const SLASH_CHANGEACTIONBAR2: string;
 declare const SLASH_CHANNEL1: string;
 declare const SLASH_CHANNEL2: string;
 declare const SLASH_CHANNEL3: string;
 declare const SLASH_CHANNEL4: string;
 declare const SLASH_CHATLOG1: string;
 declare const SLASH_CHATLOG2: string;
 declare const SLASH_CHAT_AFK1: string;
 declare const SLASH_CHAT_AFK2: string;
 declare const SLASH_CHAT_AFK3: string;
 declare const SLASH_CHAT_AFK4: string;
 declare const SLASH_CHAT_ANNOUNCE1: string;
 declare const SLASH_CHAT_ANNOUNCE2: string;
 declare const SLASH_CHAT_ANNOUNCE3: string;
 declare const SLASH_CHAT_ANNOUNCE4: string;
 declare const SLASH_CHAT_BAN1: string;
 declare const SLASH_CHAT_BAN2: string;
 declare const SLASH_CHAT_CINVITE1: string;
 declare const SLASH_CHAT_CINVITE2: string;
 declare const SLASH_CHAT_CINVITE3: string;
 declare const SLASH_CHAT_CINVITE4: string;
 declare const SLASH_CHAT_DND1: string;
 declare const SLASH_CHAT_DND2: string;
 declare const SLASH_CHAT_DND3: string;
 declare const SLASH_CHAT_DND4: string;
 declare const SLASH_CHAT_DND5: string;
 declare const SLASH_CHAT_DND6: string;
 declare const SLASH_CHAT_HELP1: string;
 declare const SLASH_CHAT_HELP2: string;
 declare const SLASH_CHAT_HELP3: string;
 declare const SLASH_CHAT_HELP4: string;
 declare const SLASH_CHAT_HELP5: string;
 declare const SLASH_CHAT_KICK1: string;
 declare const SLASH_CHAT_KICK2: string;
 declare const SLASH_CHAT_MODERATE1: string;
 declare const SLASH_CHAT_MODERATE2: string;
 declare const SLASH_CHAT_MODERATOR1: string;
 declare const SLASH_CHAT_MODERATOR2: string;
 declare const SLASH_CHAT_MODERATOR3: string;
 declare const SLASH_CHAT_MODERATOR4: string;
 declare const SLASH_CHAT_MUTE1: string;
 declare const SLASH_CHAT_MUTE2: string;
 declare const SLASH_CHAT_MUTE3: string;
 declare const SLASH_CHAT_MUTE4: string;
 declare const SLASH_CHAT_MUTE5: string;
 declare const SLASH_CHAT_MUTE6: string;
 declare const SLASH_CHAT_OWNER1: string;
 declare const SLASH_CHAT_OWNER2: string;
 declare const SLASH_CHAT_PASSWORD1: string;
 declare const SLASH_CHAT_PASSWORD2: string;
 declare const SLASH_CHAT_PASSWORD3: string;
 declare const SLASH_CHAT_PASSWORD4: string;
 declare const SLASH_CHAT_PASSWORD5: string;
 declare const SLASH_CHAT_UNBAN1: string;
 declare const SLASH_CHAT_UNBAN2: string;
 declare const SLASH_CHAT_UNMODERATOR1: string;
 declare const SLASH_CHAT_UNMODERATOR2: string;
 declare const SLASH_CHAT_UNMODERATOR3: string;
 declare const SLASH_CHAT_UNMODERATOR4: string;
 declare const SLASH_CHAT_UNMUTE1: string;
 declare const SLASH_CHAT_UNMUTE2: string;
 declare const SLASH_CHAT_UNMUTE3: string;
 declare const SLASH_CHAT_UNMUTE4: string;
 declare const SLASH_CHAT_UNMUTE5: string;
 declare const SLASH_CHAT_UNMUTE6: string;
 declare const SLASH_CLEAR1: string;
 declare const SLASH_CLEAR2: string;
 declare const SLASH_CLEARFOCUS1: string;
 declare const SLASH_CLEARFOCUS2: string;
 declare const SLASH_CLEARMAINASSIST1: string;
 declare const SLASH_CLEARMAINASSIST2: string;
 declare const SLASH_CLEARMAINASSIST3: string;
 declare const SLASH_CLEARMAINASSIST4: string;
 declare const SLASH_CLEARMAINTANK1: string;
 declare const SLASH_CLEARMAINTANK2: string;
 declare const SLASH_CLEARMAINTANK3: string;
 declare const SLASH_CLEARMAINTANK4: string;
 declare const SLASH_CLEARTARGET1: string;
 declare const SLASH_CLEARTARGET2: string;
 declare const SLASH_CLICK1: string;
 declare const SLASH_CLICK2: string;
 declare const SLASH_COMBATLOG1: string;
 declare const SLASH_COMBATLOG2: string;
 declare const SLASH_CONSOLE1: string;
 declare const SLASH_CONSOLE2: string;
 declare const SLASH_DISABLE_ADDONS1: string;
 declare const SLASH_DISMOUNT1: string;
 declare const SLASH_DISMOUNT2: string;
 declare const SLASH_DUEL1: string;
 declare const SLASH_DUEL2: string;
 declare const SLASH_DUEL_CANCEL1: string;
 declare const SLASH_DUEL_CANCEL2: string;
 declare const SLASH_DUEL_CANCEL3: string;
 declare const SLASH_DUEL_CANCEL4: string;
 declare const SLASH_DUEL_CANCEL5: string;
 declare const SLASH_DUEL_CANCEL6: string;
 declare const SLASH_DUMP1: string;
 declare const SLASH_DUMP2: string;
 declare const SLASH_DUNGEONS1: string;
 declare const SLASH_DUNGEONS2: string;
 declare const SLASH_DUNGEONS3: string;
 declare const SLASH_DUNGEONS4: string;
 declare const SLASH_DUNGEONS5: string;
 declare const SLASH_DUNGEONS6: string;
 declare const SLASH_EMOTE1: string;
 declare const SLASH_EMOTE2: string;
 declare const SLASH_EMOTE3: string;
 declare const SLASH_EMOTE4: string;
 declare const SLASH_EMOTE5: string;
 declare const SLASH_EMOTE6: string;
 declare const SLASH_EMOTE7: string;
 declare const SLASH_EMOTE8: string;
 declare const SLASH_ENABLE_ADDONS1: string;
 declare const SLASH_EQUIP1: string;
 declare const SLASH_EQUIP2: string;
 declare const SLASH_EQUIP3: string;
 declare const SLASH_EQUIP4: string;
 declare const SLASH_EQUIP_SET1: string;
 declare const SLASH_EQUIP_SET2: string;
 declare const SLASH_EQUIP_TO_SLOT1: string;
 declare const SLASH_EQUIP_TO_SLOT2: string;
 declare const SLASH_EVENTTRACE1: string;
 declare const SLASH_EVENTTRACE2: string;
 declare const SLASH_EVENTTRACE3: string;
 declare const SLASH_EVENTTRACE4: string;
 declare const SLASH_FOCUS1: string;
 declare const SLASH_FOCUS2: string;
 declare const SLASH_FOLLOW1: string;
 declare const SLASH_FOLLOW2: string;
 declare const SLASH_FOLLOW3: string;
 declare const SLASH_FOLLOW4: string;
 declare const SLASH_FOLLOW5: string;
 declare const SLASH_FOLLOW6: string;
 declare const SLASH_FOLLOW7: string;
 declare const SLASH_FRAMESTACK1: string;
 declare const SLASH_FRAMESTACK2: string;
 declare const SLASH_FRAMESTACK3: string;
 declare const SLASH_FRAMESTACK4: string;
 declare const SLASH_FRIENDS1: string;
 declare const SLASH_FRIENDS2: string;
 declare const SLASH_FRIENDS3: string;
 declare const SLASH_FRIENDS4: string;
 declare const SLASH_GUILD1: string;
 declare const SLASH_GUILD2: string;
 declare const SLASH_GUILD3: string;
 declare const SLASH_GUILD4: string;
 declare const SLASH_GUILD5: string;
 declare const SLASH_GUILD6: string;
 declare const SLASH_GUILD7: string;
 declare const SLASH_GUILD8: string;
 declare const SLASH_GUILD9: string;
 declare const SLASH_GUILD_DEMOTE1: string;
 declare const SLASH_GUILD_DEMOTE2: string;
 declare const SLASH_GUILD_DEMOTE3: string;
 declare const SLASH_GUILD_DEMOTE4: string;
 declare const SLASH_GUILD_DISBAND1: string;
 declare const SLASH_GUILD_DISBAND2: string;
 declare const SLASH_GUILD_DISBAND3: string;
 declare const SLASH_GUILD_DISBAND4: string;
 declare const SLASH_GUILD_HELP1: string;
 declare const SLASH_GUILD_HELP2: string;
 declare const SLASH_GUILD_HELP3: string;
 declare const SLASH_GUILD_HELP4: string;
 declare const SLASH_GUILD_HELP5: string;
 declare const SLASH_GUILD_INFO1: string;
 declare const SLASH_GUILD_INFO2: string;
 declare const SLASH_GUILD_INFO3: string;
 declare const SLASH_GUILD_INFO4: string;
 declare const SLASH_GUILD_INVITE1: string;
 declare const SLASH_GUILD_INVITE2: string;
 declare const SLASH_GUILD_INVITE3: string;
 declare const SLASH_GUILD_INVITE4: string;
 declare const SLASH_GUILD_LEADER1: string;
 declare const SLASH_GUILD_LEADER2: string;
 declare const SLASH_GUILD_LEADER3: string;
 declare const SLASH_GUILD_LEADER4: string;
 declare const SLASH_GUILD_LEADER_REPLACE: string;
 declare const SLASH_GUILD_LEAVE1: string;
 declare const SLASH_GUILD_LEAVE2: string;
 declare const SLASH_GUILD_LEAVE3: string;
 declare const SLASH_GUILD_LEAVE4: string;
 declare const SLASH_GUILD_MOTD1: string;
 declare const SLASH_GUILD_MOTD2: string;
 declare const SLASH_GUILD_MOTD3: string;
 declare const SLASH_GUILD_MOTD4: string;
 declare const SLASH_GUILD_PROMOTE1: string;
 declare const SLASH_GUILD_PROMOTE2: string;
 declare const SLASH_GUILD_PROMOTE3: string;
 declare const SLASH_GUILD_PROMOTE4: string;
 declare const SLASH_GUILD_ROSTER1: string;
 declare const SLASH_GUILD_ROSTER2: string;
 declare const SLASH_GUILD_ROSTER3: string;
 declare const SLASH_GUILD_ROSTER4: string;
 declare const SLASH_GUILD_UNINVITE1: string;
 declare const SLASH_GUILD_UNINVITE2: string;
 declare const SLASH_GUILD_UNINVITE3: string;
 declare const SLASH_GUILD_UNINVITE4: string;
 declare const SLASH_GUILD_WHO1: string;
 declare const SLASH_GUILD_WHO2: string;
 declare const SLASH_GUILD_WHO3: string;
 declare const SLASH_GUILD_WHO4: string;
 declare const SLASH_GUILD_WHO5: string;
 declare const SLASH_GUILD_WHO6: string;
 declare const SLASH_HELP1: string;
 declare const SLASH_HELP2: string;
 declare const SLASH_HELP3: string;
 declare const SLASH_HELP4: string;
 declare const SLASH_HELP5: string;
 declare const SLASH_HELP6: string;
 declare const SLASH_IGNORE1: string;
 declare const SLASH_IGNORE2: string;
 declare const SLASH_INSPECT1: string;
 declare const SLASH_INSPECT2: string;
 declare const SLASH_INSPECT3: string;
 declare const SLASH_INSPECT4: string;
 declare const SLASH_INVITE1: string;
 declare const SLASH_INVITE2: string;
 declare const SLASH_INVITE3: string;
 declare const SLASH_INVITE4: string;
 declare const SLASH_INVITE5: string;
 declare const SLASH_INVITE6: string;
 declare const SLASH_INVITE7: string;
 declare const SLASH_JOIN1: string;
 declare const SLASH_JOIN2: string;
 declare const SLASH_JOIN3: string;
 declare const SLASH_JOIN4: string;
 declare const SLASH_JOIN5: string;
 declare const SLASH_JOIN6: string;
 declare const SLASH_JOIN7: string;
 declare const SLASH_LEAVE1: string;
 declare const SLASH_LEAVE2: string;
 declare const SLASH_LEAVE3: string;
 declare const SLASH_LEAVE4: string;
 declare const SLASH_LEAVE5: string;
 declare const SLASH_LEAVE6: string;
 declare const SLASH_LEAVE7: string;
 declare const SLASH_LEAVEVEHICLE1: string;
 declare const SLASH_LEAVEVEHICLE2: string;
 declare const SLASH_LIST_CHANNEL1: string;
 declare const SLASH_LIST_CHANNEL2: string;
 declare const SLASH_LIST_CHANNEL3: string;
 declare const SLASH_LIST_CHANNEL4: string;
 declare const SLASH_LIST_CHANNEL5: string;
 declare const SLASH_LIST_CHANNEL6: string;
 declare const SLASH_LIST_CHANNEL7: string;
 declare const SLASH_LOGOUT1: string;
 declare const SLASH_LOGOUT2: string;
 declare const SLASH_LOGOUT3: string;
 declare const SLASH_LOGOUT4: string;
 declare const SLASH_LOOT_FFA1: string;
 declare const SLASH_LOOT_FFA2: string;
 declare const SLASH_LOOT_GROUP1: string;
 declare const SLASH_LOOT_GROUP2: string;
 declare const SLASH_LOOT_MASTER1: string;
 declare const SLASH_LOOT_MASTER2: string;
 declare const SLASH_LOOT_NEEDBEFOREGREED1: string;
 declare const SLASH_LOOT_NEEDBEFOREGREED2: string;
 declare const SLASH_LOOT_ROUNDROBIN1: string;
 declare const SLASH_LOOT_ROUNDROBIN2: string;
 declare const SLASH_LOOT_SETTHRESHOLD1: string;
 declare const SLASH_LOOT_SETTHRESHOLD2: string;
 declare const SLASH_MACRO1: string;
 declare const SLASH_MACRO2: string;
 declare const SLASH_MACRO3: string;
 declare const SLASH_MACRO4: string;
 declare const SLASH_MACROHELP1: string;
 declare const SLASH_MACROHELP2: string;
 declare const SLASH_MACROHELP3: string;
 declare const SLASH_MAINASSISTOFF1: string;
 declare const SLASH_MAINASSISTOFF2: string;
 declare const SLASH_MAINASSISTOFF3: string;
 declare const SLASH_MAINASSISTOFF4: string;
 declare const SLASH_MAINASSISTON1: string;
 declare const SLASH_MAINASSISTON2: string;
 declare const SLASH_MAINASSISTON3: string;
 declare const SLASH_MAINASSISTON4: string;
 declare const SLASH_MAINTANKOFF1: string;
 declare const SLASH_MAINTANKOFF2: string;
 declare const SLASH_MAINTANKOFF3: string;
 declare const SLASH_MAINTANKOFF4: string;
 declare const SLASH_MAINTANKON1: string;
 declare const SLASH_MAINTANKON2: string;
 declare const SLASH_MAINTANKON3: string;
 declare const SLASH_MAINTANKON4: string;
 declare const SLASH_OFFICER1: string;
 declare const SLASH_OFFICER2: string;
 declare const SLASH_OFFICER3: string;
 declare const SLASH_OFFICER4: string;
 declare const SLASH_OFFICER5: string;
 declare const SLASH_OFFICER6: string;
 declare const SLASH_PARTY1: string;
 declare const SLASH_PARTY2: string;
 declare const SLASH_PARTY3: string;
 declare const SLASH_PARTY4: string;
 declare const SLASH_PARTY5: string;
 declare const SLASH_PET_AGGRESSIVE1: string;
 declare const SLASH_PET_AGGRESSIVE2: string;
 declare const SLASH_PET_ATTACK1: string;
 declare const SLASH_PET_ATTACK2: string;
 declare const SLASH_PET_AUTOCASTOFF1: string;
 declare const SLASH_PET_AUTOCASTOFF2: string;
 declare const SLASH_PET_AUTOCASTON1: string;
 declare const SLASH_PET_AUTOCASTON2: string;
 declare const SLASH_PET_AUTOCASTTOGGLE1: string;
 declare const SLASH_PET_AUTOCASTTOGGLE2: string;
 declare const SLASH_PET_DEFENSIVE1: string;
 declare const SLASH_PET_DEFENSIVE2: string;
 declare const SLASH_PET_FOLLOW1: string;
 declare const SLASH_PET_FOLLOW2: string;
 declare const SLASH_PET_PASSIVE1: string;
 declare const SLASH_PET_PASSIVE2: string;
 declare const SLASH_PET_STAY1: string;
 declare const SLASH_PET_STAY2: string;
 declare const SLASH_PLAYED1: string;
 declare const SLASH_PLAYED2: string;
 declare const SLASH_PROMOTE1: string;
 declare const SLASH_PROMOTE2: string;
 declare const SLASH_PROMOTE3: string;
 declare const SLASH_PROMOTE4: string;
 declare const SLASH_PVP1: string;
 declare const SLASH_PVP2: string;
 declare const SLASH_QUIT1: string;
 declare const SLASH_QUIT2: string;
 declare const SLASH_QUIT3: string;
 declare const SLASH_QUIT4: string;
 declare const SLASH_RAID1: string;
 declare const SLASH_RAID2: string;
 declare const SLASH_RAID3: string;
 declare const SLASH_RAID4: string;
 declare const SLASH_RAID5: string;
 declare const SLASH_RAID6: string;
 declare const SLASH_RAIDBROWSER1: string;
 declare const SLASH_RAIDBROWSER2: string;
 declare const SLASH_RAIDBROWSER3: string;
 declare const SLASH_RAIDBROWSER4: string;
 declare const SLASH_RAIDBROWSER5: string;
 declare const SLASH_RAIDBROWSER6: string;
 declare const SLASH_RAID_INFO1: string;
 declare const SLASH_RAID_INFO2: string;
 declare const SLASH_RAID_WARNING1: string;
 declare const SLASH_RAID_WARNING2: string;
 declare const SLASH_RANDOM1: string;
 declare const SLASH_RANDOM2: string;
 declare const SLASH_RANDOM3: string;
 declare const SLASH_RANDOM4: string;
 declare const SLASH_RANDOM5: string;
 declare const SLASH_RANDOM6: string;
 declare const SLASH_RANDOM7: string;
 declare const SLASH_READYCHECK1: string;
 declare const SLASH_READYCHECK2: string;
 declare const SLASH_RELOAD1: string;
 declare const SLASH_RELOAD2: string;
 declare const SLASH_REMOVEFRIEND1: string;
 declare const SLASH_REMOVEFRIEND2: string;
 declare const SLASH_REMOVEFRIEND3: string;
 declare const SLASH_REMOVEFRIEND4: string;
 declare const SLASH_REPLY1: string;
 declare const SLASH_REPLY2: string;
 declare const SLASH_REPLY3: string;
 declare const SLASH_REPLY4: string;
 declare const SLASH_RESETCHAT1: string;
 declare const SLASH_RESETCHAT2: string;
 declare const SLASH_SAVEGUILDROSTER1: string;
 declare const SLASH_SAVEGUILDROSTER2: string;
 declare const SLASH_SAY1: string;
 declare const SLASH_SAY2: string;
 declare const SLASH_SAY3: string;
 declare const SLASH_SAY4: string;
 declare const SLASH_SCRIPT1: string;
 declare const SLASH_SCRIPT2: string;
 declare const SLASH_SCRIPT3: string;
 declare const SLASH_SCRIPT4: string;
 declare const SLASH_SET_TITLE1: string;
 declare const SLASH_SET_TITLE2: string;
 declare const SLASH_STARTATTACK1: string;
 declare const SLASH_STARTATTACK2: string;
 declare const SLASH_STOPATTACK1: string;
 declare const SLASH_STOPATTACK2: string;
 declare const SLASH_STOPCASTING1: string;
 declare const SLASH_STOPCASTING2: string;
 declare const SLASH_STOPMACRO1: string;
 declare const SLASH_STOPMACRO2: string;
 declare const SLASH_STOPWATCH1: string;
 declare const SLASH_STOPWATCH2: string;
 declare const SLASH_STOPWATCH3: string;
 declare const SLASH_STOPWATCH4: string;
 declare const SLASH_STOPWATCH5: string;
 declare const SLASH_STOPWATCH6: string;
 declare const SLASH_STOPWATCH_PARAM_PAUSE1: string;
 declare const SLASH_STOPWATCH_PARAM_PAUSE2: string;
 declare const SLASH_STOPWATCH_PARAM_PLAY1: string;
 declare const SLASH_STOPWATCH_PARAM_PLAY2: string;
 declare const SLASH_STOPWATCH_PARAM_STOP1: string;
 declare const SLASH_STOPWATCH_PARAM_STOP2: string;
 declare const SLASH_STOPWATCH_PARAM_STOP3: string;
 declare const SLASH_STOPWATCH_PARAM_STOP4: string;
 declare const SLASH_STOPWATCH_PARAM_STOP5: string;
 declare const SLASH_STOPWATCH_PARAM_STOP6: string;
 declare const SLASH_SWAPACTIONBAR1: string;
 declare const SLASH_SWAPACTIONBAR2: string;
 declare const SLASH_TARGET1: string;
 declare const SLASH_TARGET2: string;
 declare const SLASH_TARGET3: string;
 declare const SLASH_TARGET4: string;
 declare const SLASH_TARGET_EXACT1: string;
 declare const SLASH_TARGET_EXACT2: string;
 declare const SLASH_TARGET_LAST_ENEMY1: string;
 declare const SLASH_TARGET_LAST_ENEMY2: string;
 declare const SLASH_TARGET_LAST_FRIEND1: string;
 declare const SLASH_TARGET_LAST_FRIEND2: string;
 declare const SLASH_TARGET_LAST_TARGET1: string;
 declare const SLASH_TARGET_LAST_TARGET2: string;
 declare const SLASH_TARGET_NEAREST_ENEMY1: string;
 declare const SLASH_TARGET_NEAREST_ENEMY2: string;
 declare const SLASH_TARGET_NEAREST_ENEMY_PLAYER1: string;
 declare const SLASH_TARGET_NEAREST_ENEMY_PLAYER2: string;
 declare const SLASH_TARGET_NEAREST_FRIEND1: string;
 declare const SLASH_TARGET_NEAREST_FRIEND2: string;
 declare const SLASH_TARGET_NEAREST_FRIEND_PLAYER1: string;
 declare const SLASH_TARGET_NEAREST_FRIEND_PLAYER2: string;
 declare const SLASH_TARGET_NEAREST_PARTY1: string;
 declare const SLASH_TARGET_NEAREST_PARTY2: string;
 declare const SLASH_TARGET_NEAREST_RAID1: string;
 declare const SLASH_TARGET_NEAREST_RAID2: string;
 declare const SLASH_TEAM_CAPTAIN1: string;
 declare const SLASH_TEAM_CAPTAIN2: string;
 declare const SLASH_TEAM_CAPTAIN3: string;
 declare const SLASH_TEAM_CAPTAIN4: string;
 declare const SLASH_TEAM_DISBAND1: string;
 declare const SLASH_TEAM_DISBAND2: string;
 declare const SLASH_TEAM_DISBAND3: string;
 declare const SLASH_TEAM_DISBAND4: string;
 declare const SLASH_TEAM_INVITE1: string;
 declare const SLASH_TEAM_INVITE2: string;
 declare const SLASH_TEAM_INVITE3: string;
 declare const SLASH_TEAM_INVITE4: string;
 declare const SLASH_TEAM_QUIT1: string;
 declare const SLASH_TEAM_QUIT2: string;
 declare const SLASH_TEAM_QUIT3: string;
 declare const SLASH_TEAM_QUIT4: string;
 declare const SLASH_TEAM_UNINVITE1: string;
 declare const SLASH_TEAM_UNINVITE2: string;
 declare const SLASH_TEAM_UNINVITE3: string;
 declare const SLASH_TEAM_UNINVITE4: string;
 declare const SLASH_TIME1: string;
 declare const SLASH_TIME2: string;
 declare const SLASH_TOKEN1: string;
 declare const SLASH_TOKEN2: string;
 declare const SLASH_TOKEN3: string;
 declare const SLASH_TOKEN4: string;
 declare const SLASH_TRADE1: string;
 declare const SLASH_TRADE2: string;
 declare const SLASH_TRADE3: string;
 declare const SLASH_TRADE4: string;
 declare const SLASH_UNIGNORE1: string;
 declare const SLASH_UNIGNORE2: string;
 declare const SLASH_UNINVITE1: string;
 declare const SLASH_UNINVITE2: string;
 declare const SLASH_UNINVITE3: string;
 declare const SLASH_UNINVITE4: string;
 declare const SLASH_UNINVITE5: string;
 declare const SLASH_UNINVITE6: string;
 declare const SLASH_UNINVITE7: string;
 declare const SLASH_UNINVITE8: string;
 declare const SLASH_UNINVITE9: string;
 declare const SLASH_UNINVITE10: string;
 declare const SLASH_USE1: string;
 declare const SLASH_USE2: string;
 declare const SLASH_USERANDOM1: string;
 declare const SLASH_USERANDOM2: string;
 declare const SLASH_USE_TALENT_SPEC1: string;
 declare const SLASH_USE_TALENT_SPEC2: string;
 declare const SLASH_VOICEMACRO1: string;
 declare const SLASH_VOICEMACRO2: string;
 declare const SLASH_WHISPER1: string;
 declare const SLASH_WHISPER2: string;
 declare const SLASH_WHISPER3: string;
 declare const SLASH_WHISPER4: string;
 declare const SLASH_WHISPER5: string;
 declare const SLASH_WHISPER6: string;
 declare const SLASH_WHISPER7: string;
 declare const SLASH_WHISPER8: string;
 declare const SLASH_WHISPER9: string;
 declare const SLASH_WHISPER10: string;
 declare const SLASH_WHO1: string;
 declare const SLASH_WHO2: string;
 declare const SLASH_YELL1: string;
 declare const SLASH_YELL2: string;
 declare const SLASH_YELL3: string;
 declare const SLASH_YELL4: string;
 declare const SLASH_YELL5: string;
 declare const SLASH_YELL6: string;
 declare const SLASH_YELL7: string;
 declare const SLASH_YELL8: string;
 declare const SLURRED_SPEECH: string;
 declare const SMART_PIVOT: string;
 declare const SOCIALS: string;
 declare const SOCIAL_BUTTON: string;
 declare const SOCIAL_LABEL: string;
 declare const SOCIAL_SUBTEXT: string;
 declare const SOCKET_GEMS: string;
 declare const SOCKET_ITEM_MIN_SKILL: string;
 declare const SOCKET_ITEM_REQ_LEVEL: string;
 declare const SOCKET_ITEM_REQ_SKILL: string;
 declare const SOLD_BY_COLON: string;
 declare const SOLO: string;
 declare const SORT_QUEST: string;
 declare const SOUNDOPTIONS_MENU: string;
 declare const SOUND_CHANNELS: string;
 declare const SOUND_DISABLED: string;
 declare const SOUND_EFFECTS_DISABLED: string;
 declare const SOUND_EFFECTS_ENABLED: string;
 declare const SOUND_LABEL: string;
 declare const SOUND_OPTIONS: string;
 declare const SOUND_QUALITY: string;
 declare const SOUND_SUBTEXT: string;
 declare const SOUND_VOLUME: string;
 declare const SPEAKERMODE: string;
 declare const SPEAKERMODE_HEADPHONES: string;
 declare const SPEAKERMODE_STEREO: string;
 declare const SPEAKERMODE_SURROUND: string;
 declare const SPECIAL: string;
 declare const SPECIAL_SKILLS: string;
 declare const SPECIFIC_DUNGEONS: string;
 declare const SPECIFIC_DUNGEON_IS_READY: string;
 declare const SPEED: string;
 declare const SPEED_ABBR: string;
 declare const SPELLBOOK: string;
 declare const SPELLBOOK_ABILITIES_BUTTON: string;
 declare const SPELLBOOK_BUTTON: string;
 declare const SPELLDISMISSPETOTHER: string;
 declare const SPELLDISMISSPETSELF: string;
 declare const SPELLHAPPINESSDRAINOTHER: string;
 declare const SPELLHAPPINESSDRAINSELF: string;
 declare const SPELLS: string;
 declare const SPELLS_COMBATLOG_TOOLTIP: string;
 declare const SPELL_BONUS: string;
 declare const SPELL_CASTING: string;
 declare const SPELL_CASTING_COMBATLOG_TOOLTIP: string;
 declare const SPELL_CAST_CHANNELED: string;
 declare const SPELL_CAST_FAILED_COMBATLOG_TOOLTIP: string;
 declare const SPELL_CAST_START_COMBATLOG_TOOLTIP: string;
 declare const SPELL_CAST_SUCCESS_COMBATLOG_TOOLTIP: string;
 declare const SPELL_CAST_TIME_INSTANT: string;
 declare const SPELL_CAST_TIME_INSTANT_NO_MANA: string;
 declare const SPELL_CAST_TIME_MIN: string;
 declare const SPELL_CAST_TIME_RANGED: string;
 declare const SPELL_CAST_TIME_SEC: string;
 declare const SPELL_COLOR_BY_SCHOOL_COMBATLOG_TOOLTIP: string;
 declare const SPELL_CREATE_COMBATLOG_TOOLTIP: string;
 declare const SPELL_CRIT_CHANCE: string;
 declare const SPELL_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const SPELL_DAMAGE_NUMBER_COMBATLOG_TOOLTIP: string;
 declare const SPELL_DAMAGE_SCHOOL_COMBATLOG_TOOLTIP: string;
 declare const SPELL_DETAIL: string;
 declare const SPELL_DRAIN_COMBATLOG_TOOLTIP: string;
 declare const SPELL_DURATION: string;
 declare const SPELL_DURATION_DAYS: string;
 declare const SPELL_DURATION_HOURS: string;
 declare const SPELL_DURATION_MIN: string;
 declare const SPELL_DURATION_SEC: string;
 declare const SPELL_DURATION_UNTIL_CANCELLED: string;
 declare const SPELL_EQUIPPED_ITEM: string;
 declare const SPELL_EQUIPPED_ITEM_NOSPACE: string;
 declare const SPELL_EXTRA_ATTACKS_COMBATLOG_TOOLTIP: string;
 declare const SPELL_FAILED_AFFECTING_COMBAT: string;
 declare const SPELL_FAILED_ALREADY_BEING_TAMED: string;
 declare const SPELL_FAILED_ALREADY_HAVE_CHARM: string;
 declare const SPELL_FAILED_ALREADY_HAVE_SUMMON: string;
 declare const SPELL_FAILED_ALREADY_OPEN: string;
 declare const SPELL_FAILED_ARTISAN_RIDING_REQUIREMENT: string;
 declare const SPELL_FAILED_AURA_BOUNCED: string;
 declare const SPELL_FAILED_BAD_IMPLICIT_TARGETS: string;
 declare const SPELL_FAILED_BAD_TARGETS: string;
 declare const SPELL_FAILED_BM_OR_INVISGOD: string;
 declare const SPELL_FAILED_CANT_BE_CHARMED: string;
 declare const SPELL_FAILED_CANT_BE_DISENCHANTED: string;
 declare const SPELL_FAILED_CANT_BE_DISENCHANTED_SKILL: string;
 declare const SPELL_FAILED_CANT_BE_MILLED: string;
 declare const SPELL_FAILED_CANT_BE_PROSPECTED: string;
 declare const SPELL_FAILED_CANT_CAST_ON_TAPPED: string;
 declare const SPELL_FAILED_CANT_DO_THAT_RIGHT_NOW: string;
 declare const SPELL_FAILED_CANT_DUEL_WHILE_INVISIBLE: string;
 declare const SPELL_FAILED_CANT_DUEL_WHILE_STEALTHED: string;
 declare const SPELL_FAILED_CANT_STEALTH: string;
 declare const SPELL_FAILED_CASTER_AURASTATE: string;
 declare const SPELL_FAILED_CASTER_DEAD: string;
 declare const SPELL_FAILED_CASTER_DEAD_FEMALE: string;
 declare const SPELL_FAILED_CAST_NOT_HERE: string;
 declare const SPELL_FAILED_CHARMED: string;
 declare const SPELL_FAILED_CHEST_IN_USE: string;
 declare const SPELL_FAILED_CONFUSED: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_1: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_10: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_11: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_12: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_13: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_14_NONE: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_15: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_16: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_17: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_18: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_19: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_2: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_20: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_21: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_22: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_23: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_24: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_25: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_26: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_27: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_28: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_29: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_3: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_30: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_31: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_32: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_33: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_34: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_35: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_36: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_37: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_38: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_39: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_4: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_40: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_41: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_42: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_43: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_44: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_45: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_46: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_47: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_48: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_49: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_5: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_50: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_51: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_52: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_53: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_54: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_55: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_56: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_57: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_58: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_59: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_6: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_60: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_61: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_62: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_63_NONE: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_64_NONE: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_65: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_66: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_67: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_7: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_75: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_76: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_77: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_78: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_79: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_8: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_83: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_84: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_85: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_86: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_87: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_88: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_9: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_90: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_96: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_97: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_98: string;
 declare const SPELL_FAILED_CUSTOM_ERROR_99: string;
 declare const SPELL_FAILED_DAMAGE_IMMUNE: string;
 declare const SPELL_FAILED_EQUIPPED_ITEM: string;
 declare const SPELL_FAILED_EQUIPPED_ITEM_CLASS: string;
 declare const SPELL_FAILED_EQUIPPED_ITEM_CLASS_MAINHAND: string;
 declare const SPELL_FAILED_EQUIPPED_ITEM_CLASS_OFFHAND: string;
 declare const SPELL_FAILED_ERROR: string;
 declare const SPELL_FAILED_EXPERT_RIDING_REQUIREMENT: string;
 declare const SPELL_FAILED_FISHING_TOO_LOW: string;
 declare const SPELL_FAILED_FIZZLE: string;
 declare const SPELL_FAILED_FLEEING: string;
 declare const SPELL_FAILED_FOOD_LOWLEVEL: string;
 declare const SPELL_FAILED_GLYPH_SOCKET_LOCKED: string;
 declare const SPELL_FAILED_HIGHLEVEL: string;
 declare const SPELL_FAILED_IMMUNE: string;
 declare const SPELL_FAILED_INCORRECT_AREA: string;
 declare const SPELL_FAILED_INTERRUPTED: string;
 declare const SPELL_FAILED_INTERRUPTED_COMBAT: string;
 declare const SPELL_FAILED_INVALID_GLYPH: string;
 declare const SPELL_FAILED_ITEM_ALREADY_ENCHANTED: string;
 declare const SPELL_FAILED_ITEM_AT_MAX_CHARGES: string;
 declare const SPELL_FAILED_ITEM_ENCHANT_TRADE_WINDOW: string;
 declare const SPELL_FAILED_ITEM_GONE: string;
 declare const SPELL_FAILED_ITEM_NOT_FOUND: string;
 declare const SPELL_FAILED_ITEM_NOT_READY: string;
 declare const SPELL_FAILED_LEVEL_REQUIREMENT: string;
 declare const SPELL_FAILED_LEVEL_REQUIREMENT_PET: string;
 declare const SPELL_FAILED_LIMIT_CATEGORY_EXCEEDED: string;
 declare const SPELL_FAILED_LINE_OF_SIGHT: string;
 declare const SPELL_FAILED_LOWLEVEL: string;
 declare const SPELL_FAILED_LOW_CASTLEVEL: string;
 declare const SPELL_FAILED_MAINHAND_EMPTY: string;
 declare const SPELL_FAILED_MIN_SKILL: string;
 declare const SPELL_FAILED_MOVING: string;
 declare const SPELL_FAILED_NEED_AMMO: string;
 declare const SPELL_FAILED_NEED_AMMO_POUCH: string;
 declare const SPELL_FAILED_NEED_EXOTIC_AMMO: string;
 declare const SPELL_FAILED_NEED_MORE_ITEMS: string;
 declare const SPELL_FAILED_NOPATH: string;
 declare const SPELL_FAILED_NOTHING_TO_DISPEL: string;
 declare const SPELL_FAILED_NOTHING_TO_STEAL: string;
 declare const SPELL_FAILED_NOT_BEHIND: string;
 declare const SPELL_FAILED_NOT_FISHABLE: string;
 declare const SPELL_FAILED_NOT_FLYING: string;
 declare const SPELL_FAILED_NOT_HERE: string;
 declare const SPELL_FAILED_NOT_IDLE: string;
 declare const SPELL_FAILED_NOT_INACTIVE: string;
 declare const SPELL_FAILED_NOT_INFRONT: string;
 declare const SPELL_FAILED_NOT_IN_ARENA: string;
 declare const SPELL_FAILED_NOT_IN_BARBERSHOP: string;
 declare const SPELL_FAILED_NOT_IN_BATTLEGROUND: string;
 declare const SPELL_FAILED_NOT_IN_CONTROL: string;
 declare const SPELL_FAILED_NOT_IN_RAID_INSTANCE: string;
 declare const SPELL_FAILED_NOT_KNOWN: string;
 declare const SPELL_FAILED_NOT_MOUNTED: string;
 declare const SPELL_FAILED_NOT_ON_DAMAGE_IMMUNE: string;
 declare const SPELL_FAILED_NOT_ON_GROUND: string;
 declare const SPELL_FAILED_NOT_ON_MOUNTED: string;
 declare const SPELL_FAILED_NOT_ON_SHAPESHIFT: string;
 declare const SPELL_FAILED_NOT_ON_STEALTHED: string;
 declare const SPELL_FAILED_NOT_ON_TAXI: string;
 declare const SPELL_FAILED_NOT_ON_TRANSPORT: string;
 declare const SPELL_FAILED_NOT_READY: string;
 declare const SPELL_FAILED_NOT_SHAPESHIFT: string;
 declare const SPELL_FAILED_NOT_STANDING: string;
 declare const SPELL_FAILED_NOT_TRADEABLE: string;
 declare const SPELL_FAILED_NOT_TRADING: string;
 declare const SPELL_FAILED_NOT_UNSHEATHED: string;
 declare const SPELL_FAILED_NOT_WHILE_FATIGUED: string;
 declare const SPELL_FAILED_NOT_WHILE_GHOST: string;
 declare const SPELL_FAILED_NOT_WHILE_LOOTING: string;
 declare const SPELL_FAILED_NOT_WHILE_TRADING: string;
 declare const SPELL_FAILED_NO_AMMO: string;
 declare const SPELL_FAILED_NO_CHAMPION: string;
 declare const SPELL_FAILED_NO_CHARGES_REMAIN: string;
 declare const SPELL_FAILED_NO_COMBO_POINTS: string;
 declare const SPELL_FAILED_NO_DUELING: string;
 declare const SPELL_FAILED_NO_EDIBLE_CORPSES: string;
 declare const SPELL_FAILED_NO_ENDURANCE: string;
 declare const SPELL_FAILED_NO_EVASIVE_CHARGES: string;
 declare const SPELL_FAILED_NO_FISH: string;
 declare const SPELL_FAILED_NO_ITEMS_WHILE_SHAPESHIFTED: string;
 declare const SPELL_FAILED_NO_MAGIC_TO_CONSUME: string;
 declare const SPELL_FAILED_NO_MOUNTS_ALLOWED: string;
 declare const SPELL_FAILED_NO_PET: string;
 declare const SPELL_FAILED_NO_PLAYTIME: string;
 declare const SPELL_FAILED_ONLY_ABOVEWATER: string;
 declare const SPELL_FAILED_ONLY_BATTLEGROUNDS: string;
 declare const SPELL_FAILED_ONLY_DAYTIME: string;
 declare const SPELL_FAILED_ONLY_INDOORS: string;
 declare const SPELL_FAILED_ONLY_IN_ARENA: string;
 declare const SPELL_FAILED_ONLY_MOUNTED: string;
 declare const SPELL_FAILED_ONLY_NIGHTTIME: string;
 declare const SPELL_FAILED_ONLY_OUTDOORS: string;
 declare const SPELL_FAILED_ONLY_SHAPESHIFT: string;
 declare const SPELL_FAILED_ONLY_STEALTHED: string;
 declare const SPELL_FAILED_ONLY_UNDERWATER: string;
 declare const SPELL_FAILED_OUT_OF_RANGE: string;
 declare const SPELL_FAILED_PACIFIED: string;
 declare const SPELL_FAILED_PARTIAL_PLAYTIME: string;
 declare const SPELL_FAILED_PET_CAN_RENAME: string;
 declare const SPELL_FAILED_POSSESSED: string;
 declare const SPELL_FAILED_PREVENTED_BY_MECHANIC: string;
 declare const SPELL_FAILED_REAGENTS: string;
 declare const SPELL_FAILED_REPUTATION: string;
 declare const SPELL_FAILED_REQUIRES_AREA: string;
 declare const SPELL_FAILED_REQUIRES_SPELL_FOCUS: string;
 declare const SPELL_FAILED_ROCKET_PACK: string;
 declare const SPELL_FAILED_ROOTED: string;
 declare const SPELL_FAILED_SILENCED: string;
 declare const SPELL_FAILED_SPELL_IN_PROGRESS: string;
 declare const SPELL_FAILED_SPELL_LEARNED: string;
 declare const SPELL_FAILED_SPELL_UNAVAILABLE: string;
 declare const SPELL_FAILED_SPELL_UNAVAILABLE_PET: string;
 declare const SPELL_FAILED_STUNNED: string;
 declare const SPELL_FAILED_SUMMON_PENDING: string;
 declare const SPELL_FAILED_TARGETS_DEAD: string;
 declare const SPELL_FAILED_TARGET_AFFECTING_COMBAT: string;
 declare const SPELL_FAILED_TARGET_AURASTATE: string;
 declare const SPELL_FAILED_TARGET_CANNOT_BE_RESURRECTED: string;
 declare const SPELL_FAILED_TARGET_DUELING: string;
 declare const SPELL_FAILED_TARGET_ENEMY: string;
 declare const SPELL_FAILED_TARGET_ENRAGED: string;
 declare const SPELL_FAILED_TARGET_FREEFORALL: string;
 declare const SPELL_FAILED_TARGET_FRIENDLY: string;
 declare const SPELL_FAILED_TARGET_IN_COMBAT: string;
 declare const SPELL_FAILED_TARGET_IS_PLAYER: string;
 declare const SPELL_FAILED_TARGET_IS_PLAYER_CONTROLLED: string;
 declare const SPELL_FAILED_TARGET_IS_TRIVIAL: string;
 declare const SPELL_FAILED_TARGET_LOCKED_TO_RAID_INSTANCE: string;
 declare const SPELL_FAILED_TARGET_NOT_DEAD: string;
 declare const SPELL_FAILED_TARGET_NOT_GHOST: string;
 declare const SPELL_FAILED_TARGET_NOT_IN_INSTANCE: string;
 declare const SPELL_FAILED_TARGET_NOT_IN_PARTY: string;
 declare const SPELL_FAILED_TARGET_NOT_IN_RAID: string;
 declare const SPELL_FAILED_TARGET_NOT_IN_SANCTUARY: string;
 declare const SPELL_FAILED_TARGET_NOT_LOOTED: string;
 declare const SPELL_FAILED_TARGET_NOT_PLAYER: string;
 declare const SPELL_FAILED_TARGET_NO_POCKETS: string;
 declare const SPELL_FAILED_TARGET_NO_RANGED_WEAPONS: string;
 declare const SPELL_FAILED_TARGET_NO_WEAPONS: string;
 declare const SPELL_FAILED_TARGET_ON_TAXI: string;
 declare const SPELL_FAILED_TARGET_UNSKINNABLE: string;
 declare const SPELL_FAILED_TOO_CLOSE: string;
 declare const SPELL_FAILED_TOO_MANY_OF_ITEM: string;
 declare const SPELL_FAILED_TOO_SHALLOW: string;
 declare const SPELL_FAILED_TOTEMS: string;
 declare const SPELL_FAILED_TOTEM_CATEGORY: string;
 declare const SPELL_FAILED_TRANSFORM_UNUSABLE: string;
 declare const SPELL_FAILED_TRY_AGAIN: string;
 declare const SPELL_FAILED_UNIQUE_GLYPH: string;
 declare const SPELL_FAILED_UNIT_NOT_BEHIND: string;
 declare const SPELL_FAILED_UNIT_NOT_INFRONT: string;
 declare const SPELL_FAILED_UNKNOWN: string;
 declare const SPELL_FAILED_WRONG_PET_FOOD: string;
 declare const SPELL_FAILED_WRONG_WEATHER: string;
 declare const SPELL_HASTE: string;
 declare const SPELL_HASTE_ABBR: string;
 declare const SPELL_HASTE_TOOLTIP: string;
 declare const SPELL_HEAL_COMBATLOG_TOOLTIP: string;
 declare const SPELL_INSTAKILL_COMBATLOG_TOOLTIP: string;
 declare const SPELL_INSTANT_EFFECT: string;
 declare const SPELL_INTERRUPT_COMBATLOG_TOOLTIP: string;
 declare const SPELL_LASTING_EFFECT: string;
 declare const SPELL_MESSAGES: string;
 declare const SPELL_MISSED_COMBATLOG_TOOLTIP: string;
 declare const SPELL_NAMES: string;
 declare const SPELL_NAMES_COMBATLOG_TOOLTIP: string;
 declare const SPELL_NAMES_SHOW_BRACES_COMBATLOG_TOOLTIP: string;
 declare const SPELL_NOT_SHAPESHIFTED: string;
 declare const SPELL_NOT_SHAPESHIFTED_NOSPACE: string;
 declare const SPELL_ON_NEXT_RANGED: string;
 declare const SPELL_ON_NEXT_SWING: string;
 declare const SPELL_OTHER_MESSAGES: string;
 declare const SPELL_PASSIVE: string;
 declare const SPELL_PASSIVE_EFFECT: string;
 declare const SPELL_PENETRATION: string;
 declare const SPELL_PENETRATION_TOOLTIP: string;
 declare const SPELL_PERIODIC_COMBATLOG_TOOLTIP: string;
 declare const SPELL_PERIODIC_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const SPELL_PERIODIC_HEAL_COMBATLOG_TOOLTIP: string;
 declare const SPELL_PERIODIC_MISSED_COMBATLOG_TOOLTIP: string;
 declare const SPELL_PERIODIC_OTHER_COMBATLOG_TOOLTIP: string;
 declare const SPELL_POINTS_SPREAD_TEMPLATE: string;
 declare const SPELL_RANGE: string;
 declare const SPELL_RANGE_AREA: string;
 declare const SPELL_RANGE_DUAL: string;
 declare const SPELL_RANGE_UNLIMITED: string;
 declare const SPELL_REAGENTS: string;
 declare const SPELL_RECAST_TIME_INSTANT: string;
 declare const SPELL_RECAST_TIME_MIN: string;
 declare const SPELL_RECAST_TIME_SEC: string;
 declare const SPELL_REQUIRED_FORM: string;
 declare const SPELL_REQUIRED_FORM_NOSPACE: string;
 declare const SPELL_RESURRECT_COMBATLOG_TOOLTIP: string;
 declare const SPELL_SCHOOL0_CAP: string;
 declare const SPELL_SCHOOL0_NAME: string;
 declare const SPELL_SCHOOL1_CAP: string;
 declare const SPELL_SCHOOL1_NAME: string;
 declare const SPELL_SCHOOL2_CAP: string;
 declare const SPELL_SCHOOL2_NAME: string;
 declare const SPELL_SCHOOL3_CAP: string;
 declare const SPELL_SCHOOL3_NAME: string;
 declare const SPELL_SCHOOL4_CAP: string;
 declare const SPELL_SCHOOL4_NAME: string;
 declare const SPELL_SCHOOL5_CAP: string;
 declare const SPELL_SCHOOL5_NAME: string;
 declare const SPELL_SCHOOL6_CAP: string;
 declare const SPELL_SCHOOL6_NAME: string;
 declare const SPELL_SCHOOLALL: string;
 declare const SPELL_SCHOOLMAGICAL: string;
 declare const SPELL_SKILL_LINE: string;
 declare const SPELL_STAT1_NAME: string;
 declare const SPELL_STAT2_NAME: string;
 declare const SPELL_STAT3_NAME: string;
 declare const SPELL_STAT4_NAME: string;
 declare const SPELL_STAT5_NAME: string;
 declare const SPELL_STATALL: string;
 declare const SPELL_SUMMON_COMBATLOG_TOOLTIP: string;
 declare const SPELL_TARGET_CENTER_CASTER: string;
 declare const SPELL_TARGET_CENTER_LOC: string;
 declare const SPELL_TARGET_CHAIN_TEMPLATE: string;
 declare const SPELL_TARGET_CONE_TEMPLATE: string;
 declare const SPELL_TARGET_CREATURE_TYPE12_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE13_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE1_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE2_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE3_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE8_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE_DEAD12_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE_DEAD13_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE_DEAD1_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE_DEAD2_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE_DEAD3_DESC: string;
 declare const SPELL_TARGET_CREATURE_TYPE_DEAD8_DESC: string;
 declare const SPELL_TARGET_MULTIPLE_TEMPLATE: string;
 declare const SPELL_TARGET_TEMPLATE: string;
 declare const SPELL_TARGET_TYPE0_DESC: string;
 declare const SPELL_TARGET_TYPE10_DESC: string;
 declare const SPELL_TARGET_TYPE11_DESC: string;
 declare const SPELL_TARGET_TYPE12_DESC: string;
 declare const SPELL_TARGET_TYPE13_DESC: string;
 declare const SPELL_TARGET_TYPE14_DESC: string;
 declare const SPELL_TARGET_TYPE15_DESC: string;
 declare const SPELL_TARGET_TYPE16_DESC: string;
 declare const SPELL_TARGET_TYPE17_DESC: string;
 declare const SPELL_TARGET_TYPE1_DESC: string;
 declare const SPELL_TARGET_TYPE2_DESC: string;
 declare const SPELL_TARGET_TYPE3_DESC: string;
 declare const SPELL_TARGET_TYPE4_DESC: string;
 declare const SPELL_TARGET_TYPE5_DESC: string;
 declare const SPELL_TARGET_TYPE6_DESC: string;
 declare const SPELL_TARGET_TYPE7_DESC: string;
 declare const SPELL_TARGET_TYPE8_DESC: string;
 declare const SPELL_TARGET_TYPE9_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD11_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD12_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD13_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD14_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD16_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD17_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD1_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD2_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD3_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD4_DESC: string;
 declare const SPELL_TARGET_TYPE_DEAD8_DESC: string;
 declare const SPELL_TIMER: string;
 declare const SPELL_TIME_REMAINING_DAYS: string;
 declare const SPELL_TIME_REMAINING_HOURS: string;
 declare const SPELL_TIME_REMAINING_MIN: string;
 declare const SPELL_TIME_REMAINING_SEC: string;
 declare const SPELL_TOTEMS: string;
 declare const SPELL_USE_ALL_ENERGY: string;
 declare const SPELL_USE_ALL_FOCUS: string;
 declare const SPELL_USE_ALL_HEALTH: string;
 declare const SPELL_USE_ALL_MANA: string;
 declare const SPELL_USE_ALL_POWER_DISPLAY: string;
 declare const SPELL_USE_ALL_RAGE: string;
 declare const SPI: string;
 declare const SPIRIT_COLON: string;
 declare const SPIRIT_HEALER_RELEASE_RED: string;
 declare const SPIRIT_TOOLTIP: string;
 declare const STA: string;
 declare const STABLED_PETS: string;
 declare const STABLES: string;
 declare const STABLE_PET_INFO_TEXT: string;
 declare const STABLE_PET_INFO_TOOLTIP_TEXT: string;
 declare const STABLE_SLOT_TEXT: string;
 declare const STACKS: string;
 declare const STAMINA_COLON: string;
 declare const STAMINA_TOOLTIP: string;
 declare const STANDING: string;
 declare const START: string;
 declare const STARTING_PRICE: string;
 declare const STARTUP_TEXT_LINE1: string;
 declare const STARTUP_TEXT_LINE2: string;
 declare const STARTUP_TEXT_LINE3: string;
 declare const STARTUP_TEXT_LINE4: string;
 declare const STATISTICS: string;
 declare const STATS_LABEL: string;
 declare const STATUS: string;
 declare const STATUSTEXT_LABEL: string;
 declare const STATUSTEXT_SUBTEXT: string;
 declare const STATUS_BAR_TEXT: string;
 declare const STATUS_TEXT: string;
 declare const STATUS_TEXT_PARTY: string;
 declare const STATUS_TEXT_PERCENT: string;
 declare const STATUS_TEXT_PET: string;
 declare const STATUS_TEXT_PLAYER: string;
 declare const STATUS_TEXT_TARGET: string;
 declare const STAT_ATTACK_POWER: string;
 declare const STAT_BLOCK: string;
 declare const STAT_BLOCK_TOOLTIP: string;
 declare const STAT_DODGE: string;
 declare const STAT_EXPERTISE: string;
 declare const STAT_FORMAT: string;
 declare const STAT_PARRY: string;
 declare const STAT_RESILIENCE: string;
 declare const STAT_TEMPLATE: string;
 declare const STEREO_HARDWARE_CURSOR: string;
 declare const STEREO_VIDEO_LABEL: string;
 declare const STEREO_VIDEO_SUBTEXT: string;
 declare const STOPWATCH_TIME_UNIT: string;
 declare const STOPWATCH_TITLE: string;
 declare const STOP_AUTO_ATTACK: string;
 declare const STOP_IGNORE: string;
 declare const STR: string;
 declare const STRENGTH_COLON: string;
 declare const STRENGTH_TOOLTIP: string;
 declare const STRING_ENVIRONMENTAL_DAMAGE_DROWNING: string;
 declare const STRING_ENVIRONMENTAL_DAMAGE_FALLING: string;
 declare const STRING_ENVIRONMENTAL_DAMAGE_FATIGUE: string;
 declare const STRING_ENVIRONMENTAL_DAMAGE_FIRE: string;
 declare const STRING_ENVIRONMENTAL_DAMAGE_LAVA: string;
 declare const STRING_ENVIRONMENTAL_DAMAGE_SLIME: string;
 declare const STRING_SCHOOL_ARCANE: string;
 declare const STRING_SCHOOL_CHAOS: string;
 declare const STRING_SCHOOL_CHROMATIC: string;
 declare const STRING_SCHOOL_DIVINE: string;
 declare const STRING_SCHOOL_ELEMENTAL: string;
 declare const STRING_SCHOOL_FIRE: string;
 declare const STRING_SCHOOL_FIRESTORM: string;
 declare const STRING_SCHOOL_FLAMESTRIKE: string;
 declare const STRING_SCHOOL_FROST: string;
 declare const STRING_SCHOOL_FROSTFIRE: string;
 declare const STRING_SCHOOL_FROSTSTORM: string;
 declare const STRING_SCHOOL_FROSTSTRIKE: string;
 declare const STRING_SCHOOL_HOLY: string;
 declare const STRING_SCHOOL_HOLYFIRE: string;
 declare const STRING_SCHOOL_HOLYFROST: string;
 declare const STRING_SCHOOL_HOLYSTORM: string;
 declare const STRING_SCHOOL_HOLYSTRIKE: string;
 declare const STRING_SCHOOL_MAGIC: string;
 declare const STRING_SCHOOL_NATURE: string;
 declare const STRING_SCHOOL_PHYSICAL: string;
 declare const STRING_SCHOOL_SHADOW: string;
 declare const STRING_SCHOOL_SHADOWFLAME: string;
 declare const STRING_SCHOOL_SHADOWFROST: string;
 declare const STRING_SCHOOL_SHADOWHOLY: string;
 declare const STRING_SCHOOL_SHADOWLIGHT: string;
 declare const STRING_SCHOOL_SHADOWSTORM: string;
 declare const STRING_SCHOOL_SHADOWSTRIKE: string;
 declare const STRING_SCHOOL_SPELLFIRE: string;
 declare const STRING_SCHOOL_SPELLFROST: string;
 declare const STRING_SCHOOL_SPELLSHADOW: string;
 declare const STRING_SCHOOL_SPELLSTORM: string;
 declare const STRING_SCHOOL_SPELLSTRIKE: string;
 declare const STRING_SCHOOL_STORMSTRIKE: string;
 declare const STRING_SCHOOL_UNKNOWN: string;
 declare const STUCK_BUTTON2_TEXT: string;
 declare const STUCK_BUTTON_TEXT: string;
 declare const STUN: string;
 declare const STUNNED: string;
 declare const STUN_CAPS: string;
 declare const SUBCATEGORY: string;
 declare const SUBMIT: string;
 declare const SUCCESS: string;
 declare const SUGGESTFRAME_TITLE: string;
 declare const SUGGEST_SUBMITTED: string;
 declare const SUGGEST_SUBMIT_FAILED: string;
 declare const SUGGEST_TOOLTIP_TEXT: string;
 declare const SUMMARY_ACHIEVEMENT_INCOMPLETE: string;
 declare const SUMMARY_ACHIEVEMENT_INCOMPLETE_TEXT: string;
 declare const SUMMON: string;
 declare const SUMMONS: string;
 declare const SWING_DAMAGE_COMBATLOG_TOOLTIP: string;
 declare const SWING_MISSED_COMBATLOG_TOOLTIP: string;
 declare const SYSTEM_DEFAULT: string;
 declare const SYSTEM_MESSAGES: string;
 declare const TABARDSLOT: string;
 declare const TABARDVENDORALREADYSETGREETING: string;
 declare const TABARDVENDORCOST: string;
 declare const TABARDVENDORGREETING: string;
 declare const TABARDVENDORNOGUILDGREETING: string;
 declare const TAKE_ATTACHMENTS: string;
 declare const TAKE_GM_SURVEY: string;
 declare const TALENTS: string;
 declare const TALENTS_BUTTON: string;
 declare const TALENTS_INVOLUNTARILY_RESET: string;
 declare const TALENTS_INVOLUNTARILY_RESET_PET: string;
 declare const TALENT_ACTIVE_SPEC_STATUS: string;
 declare const TALENT_POINTS: string;
 declare const TALENT_POINTS_TOOLTIP: string;
 declare const TALENT_SPECTAB_TOOLTIP_ACTIVE: string;
 declare const TALENT_SPECTAB_TOOLTIP_POINTS_SPENT: string;
 declare const TALENT_SPEC_ACTIVATE: string;
 declare const TALENT_SPEC_PET_PRIMARY: string;
 declare const TALENT_SPEC_PRIMARY: string;
 declare const TALENT_SPEC_PRIMARY_GLYPH: string;
 declare const TALENT_SPEC_SECONDARY: string;
 declare const TALENT_SPEC_SECONDARY_GLYPH: string;
 declare const TALENT_TOOLTIP_ADDPREVIEWPOINT: string;
 declare const TALENT_TOOLTIP_LEARNTALENTGROUP: string;
 declare const TALENT_TOOLTIP_REMOVEPREVIEWPOINT: string;
 declare const TALENT_TOOLTIP_RESETTALENTGROUP: string;
 declare const TALENT_TRAINER: string;
 declare const TAMEABLE: string;
 declare const TAMEABLE_EXOTIC: string;
 declare const TANK: string;
 declare const TARGET: string;
 declare const TARGETFOCUS: string;
 declare const TARGETICONS: string;
 declare const TARGET_ICON_SET: string;
 declare const TARGET_TOKEN_NOT_FOUND: string;
 declare const TASKS_COLON: string;
 declare const TAXINODEYOUAREHERE: string;
 declare const TAXISAMENODE: string;
 declare const TEAM: string;
 declare const TEAM_KICK: string;
 declare const TEAM_LEAVE: string;
 declare const TEAM_PROMOTE: string;
 declare const TEAM_SKILL_TOOLTIP: string;
 declare const TELEPORT_OUT_OF_DUNGEON: string;
 declare const TELEPORT_TO_DUNGEON: string;
 declare const TERRAIN_HIGHLIGHTS: string;
 declare const TERRAIN_MIP: string;
 declare const TEST_TAG_TEST: string;
 declare const TEXTURE_DETAIL: string;
 declare const TEXT_MODE_A: string;
 declare const TEXT_MODE_A_STRING_1: string;
 declare const TEXT_MODE_A_STRING_2: string;
 declare const TEXT_MODE_A_STRING_3: string;
 declare const TEXT_MODE_A_STRING_4: string;
 declare const TEXT_MODE_A_STRING_5: string;
 declare const TEXT_MODE_A_STRING_ACTION: string;
 declare const TEXT_MODE_A_STRING_BRACE_ITEM: string;
 declare const TEXT_MODE_A_STRING_BRACE_SPELL: string;
 declare const TEXT_MODE_A_STRING_BRACE_UNIT: string;
 declare const TEXT_MODE_A_STRING_DEST: string;
 declare const TEXT_MODE_A_STRING_DEST_ICON: string;
 declare const TEXT_MODE_A_STRING_DEST_UNIT: string;
 declare const TEXT_MODE_A_STRING_ITEM: string;
 declare const TEXT_MODE_A_STRING_POSSESSIVE: string;
 declare const TEXT_MODE_A_STRING_POSSESSIVE_string; string;
 declare const TEXT_MODE_A_STRING_RESULT: string;
 declare const TEXT_MODE_A_STRING_RESULT_ABSORB: string;
 declare const TEXT_MODE_A_STRING_RESULT_BLOCK: string;
 declare const TEXT_MODE_A_STRING_RESULT_CRITICAL: string;
 declare const TEXT_MODE_A_STRING_RESULT_CRITICAL_SPELL: string;
 declare const TEXT_MODE_A_STRING_RESULT_CRUSHING: string;
 declare const TEXT_MODE_A_STRING_RESULT_FORMAT: string;
 declare const TEXT_MODE_A_STRING_RESULT_GLANCING: string;
 declare const TEXT_MODE_A_STRING_RESULT_OVERHEALING: string;
 declare const TEXT_MODE_A_STRING_RESULT_OVERKILLING: string;
 declare const TEXT_MODE_A_STRING_RESULT_REFLECT: string;
 declare const TEXT_MODE_A_STRING_RESULT_RESIST: string;
 declare const TEXT_MODE_A_STRING_RESULT_VULNERABILITY: string;
 declare const TEXT_MODE_A_STRING_SOURCE: string;
 declare const TEXT_MODE_A_STRING_SOURCE_ICON: string;
 declare const TEXT_MODE_A_STRING_SOURCE_UNIT: string;
 declare const TEXT_MODE_A_STRING_SPELL: string;
 declare const TEXT_MODE_A_STRING_SPELL_EXTRA: string;
 declare const TEXT_MODE_A_STRING_SPELL_EXTRA_LINK: string;
 declare const TEXT_MODE_A_STRING_SPELL_LINK: string;
 declare const TEXT_MODE_A_STRING_TIMESTAMP: string;
 declare const TEXT_MODE_A_STRING_TOKEN_ICON: string;
 declare const TEXT_MODE_A_STRING_VALUE: string;
 declare const TEXT_MODE_A_STRING_VALUE_SCHOOL: string;
 declare const TEXT_MODE_A_STRING_VALUE_TYPE: string;
 declare const TEXT_MODE_A_TIMESTAMP: string;
 declare const THIS_DUNGEON_IN_PROGRESS: string;
 declare const THREAT_TOOLTIP: string;
 declare const TICKET_STATUS: string;
 declare const TICKET_TYPE1: string;
 declare const TICKET_TYPE2: string;
 declare const TICKET_TYPE3: string;
 declare const TICKET_TYPE4: string;
 declare const TIMEMANAGER_12HOUR: string;
 declare const TIMEMANAGER_24HOUR: string;
 declare const TIMEMANAGER_24HOURMODE: string;
 declare const TIMEMANAGER_ALARM_DISABLED: string;
 declare const TIMEMANAGER_ALARM_ENABLED: string;
 declare const TIMEMANAGER_ALARM_MESSAGE: string;
 declare const TIMEMANAGER_ALARM_TIME: string;
 declare const TIMEMANAGER_ALARM_TOOLTIP_TURN_OFF: string;
 declare const TIMEMANAGER_AM: string;
 declare const TIMEMANAGER_LOCALTIME: string;
 declare const TIMEMANAGER_MINUTE: string;
 declare const TIMEMANAGER_PM: string;
 declare const TIMEMANAGER_SHOW_STOPWATCH: string;
 declare const TIMEMANAGER_TICKER_12HOUR: string;
 declare const TIMEMANAGER_TICKER_24HOUR: string;
 declare const TIMEMANAGER_TITLE: string;
 declare const TIMEMANAGER_TOOLTIP_LOCALTIME: string;
 declare const TIMEMANAGER_TOOLTIP_REALMTIME: string;
 declare const TIMEMANAGER_TOOLTIP_TITLE: string;
 declare const TIMESTAMPS_LABEL: string;
 declare const TIMESTAMP_COMBATLOG_TOOLTIP: string;
 declare const TIMESTAMP_FORMAT_HHMM: string;
 declare const TIMESTAMP_FORMAT_HHMMSS: string;
 declare const TIMESTAMP_FORMAT_HHMMSS_24HR: string;
 declare const TIMESTAMP_FORMAT_HHMMSS_AMPM: string;
 declare const TIMESTAMP_FORMAT_HHMM_24HR: string;
 declare const TIMESTAMP_FORMAT_HHMM_AMPM: string;
 declare const TIMESTAMP_FORMAT_NONE: string;
 declare const TIME_DAYHOURMINUTESECOND: string;
 declare const TIME_ELAPSED: string;
 declare const TIME_IN_QUEUE: string;
 declare const TIME_PLAYED_LEVEL: string;
 declare const TIME_PLAYED_MSG: string;
 declare const TIME_PLAYED_TOTAL: string;
 declare const TIME_REMAINING: string;
 declare const TIME_TEMPLATE_LONG: string;
 declare const TIME_TO_PORT: string;
 declare const TIME_TO_PORT_ARENA: string;
 declare const TIME_TWELVEHOURAM: string;
 declare const TIME_TWELVEHOURPM: string;
 declare const TIME_TWENTYFOURHOURS: string;
 declare const TIME_UNIT_DELIMITER: string;
 declare const TIME_UNKNOWN: string;
 declare const TIME_UNTIL_DELETED: string;
 declare const TIME_UNTIL_RETURNED: string;
 declare const TITLE_DOESNT_EXIST: string;
 declare const TITLE_REWARD: string;
 declare const TITLE_TEMPLATE: string;
 declare const TOAST_DURATION_TEXT: string;
 declare const TOGGLESTICKYCAMERA: string;
 declare const TOGGLE_BATTLEFIELDMINIMAP_TOOLTIP: string;
 declare const TOKENS: string;
 declare const TOKEN_MOVE_TO_UNUSED: string;
 declare const TOKEN_OPTIONS: string;
 declare const TOKEN_SHOW_ON_BACKPACK: string;
 declare const TOOLTIP_ARENA_POINTS: string;
 declare const TOOLTIP_HONOR_POINTS: string;
 declare const TOOLTIP_RAID_CLASS_BUTTON: string;
 declare const TOOLTIP_RAID_CONTROL_TIP: string;
 declare const TOOLTIP_RAID_DRAG_TIP: string;
 declare const TOOLTIP_RAID_SHIFT_TIP: string;
 declare const TOOLTIP_TALENT_LEARN: string;
 declare const TOOLTIP_TALENT_NEXT_RANK: string;
 declare const TOOLTIP_TALENT_PREREQ: string;
 declare const TOOLTIP_TALENT_RANK: string;
 declare const TOOLTIP_TALENT_TIER_POINTS: string;
 declare const TOOLTIP_TRACKER_FILTER_ACHIEVEMENTS: string;
 declare const TOOLTIP_TRACKER_FILTER_COMPLETED_QUESTS: string;
 declare const TOOLTIP_TRACKER_FILTER_REMOTE_ZONES: string;
 declare const TOOLTIP_TRACKER_SORT_DIFFICULTY_HIGH: string;
 declare const TOOLTIP_TRACKER_SORT_DIFFICULTY_LOW: string;
 declare const TOOLTIP_TRACKER_SORT_MANUAL: string;
 declare const TOOLTIP_TRACKER_SORT_PROXIMITY: string;
 declare const TOOLTIP_UNIT_LEVEL: string;
 declare const TOOLTIP_UNIT_LEVEL_CLASS: string;
 declare const TOOLTIP_UNIT_LEVEL_CLASS_TYPE: string;
 declare const TOOLTIP_UNIT_LEVEL_RACE_CLASS: string;
 declare const TOOLTIP_UNIT_LEVEL_RACE_CLASS_TYPE: string;
 declare const TOOLTIP_UNIT_LEVEL_TYPE: string;
 declare const TOO_FAR_TO_LOOT: string;
 declare const TOO_MANY_LUA_ERRORS: string;
 declare const TOO_MANY_WATCHED_TOKENS: string;
 declare const TOTAL_MEM_KB_ABBR: string;
 declare const TOTAL_MEM_MB_ABBR: string;
 declare const TRACKER_FILTER_ACHIEVEMENTS: string;
 declare const TRACKER_FILTER_COMPLETED_QUESTS: string;
 declare const TRACKER_FILTER_LABEL: string;
 declare const TRACKER_FILTER_REMOTE_ZONES: string;
 declare const TRACKER_SORT_DIFFICULTY_HIGH: string;
 declare const TRACKER_SORT_DIFFICULTY_LOW: string;
 declare const TRACKER_SORT_LABEL: string;
 declare const TRACKER_SORT_MANUAL: string;
 declare const TRACKER_SORT_MANUAL_BOTTOM: string;
 declare const TRACKER_SORT_MANUAL_DOWN: string;
 declare const TRACKER_SORT_MANUAL_TOP: string;
 declare const TRACKER_SORT_MANUAL_UP: string;
 declare const TRACKER_SORT_MANUAL_WARNING: string;
 declare const TRACKER_SORT_PROXIMITY: string;
 declare const TRACK_ACHIEVEMENT: string;
 declare const TRACK_ACHIEVEMENT_TOOLTIP: string;
 declare const TRACK_QUEST: string;
 declare const TRACK_QUEST_ABBREV: string;
 declare const TRADE: string;
 declare const TRADEFRAME_ENCHANT_SLOT_LABEL: string;
 declare const TRADEFRAME_NOT_MODIFIED_TEXT: string;
 declare const TRADESKILLS: string;
 declare const TRADESKILL_LOG_FIRSTPERSON: string;
 declare const TRADESKILL_LOG_THIRDPERSON: string;
 declare const TRADESKILL_SERVICE_LEARN: string;
 declare const TRADESKILL_SERVICE_PASSIVE: string;
 declare const TRADESKILL_SERVICE_STEP: string;
 declare const TRADE_POTENTIAL_BIND_ENCHANT: string;
 declare const TRADE_SKILLS: string;
 declare const TRADE_SKILL_TITLE: string;
 declare const TRADE_WITH_QUESTION: string;
 declare const TRAIN: string;
 declare const TRAINER_CAST_TIME_INSTANT: string;
 declare const TRAINER_CAST_TIME_MIN: string;
 declare const TRAINER_CAST_TIME_SEC: string;
 declare const TRAINER_COOLDOWN_TIME_INSTANT: string;
 declare const TRAINER_COOLDOWN_TIME_MIN: string;
 declare const TRAINER_COOLDOWN_TIME_SEC: string;
 declare const TRAINER_COST_SP: string;
 declare const TRAINER_COST_SP_RED: string;
 declare const TRAINER_COST_TP: string;
 declare const TRAINER_COST_TP_RED: string;
 declare const TRAINER_LIST_SP: string;
 declare const TRAINER_MANA_COST: string;
 declare const TRAINER_MANA_COST_PER_TIME: string;
 declare const TRAINER_RANGE: string;
 declare const TRAINER_REQ_ABILITY: string;
 declare const TRAINER_REQ_ABILITY_RED: string;
 declare const TRAINER_REQ_LEVEL: string;
 declare const TRAINER_REQ_LEVEL_RED: string;
 declare const TRAINER_REQ_SKILL_RANK: string;
 declare const TRAINER_REQ_SKILL_RANK_RED: string;
 declare const TRANSFER_ABORT_DIFFICULTY1: string;
 declare const TRANSFER_ABORT_DIFFICULTY2: string;
 declare const TRANSFER_ABORT_DIFFICULTY3: string;
 declare const TRANSFER_ABORT_INSUF_EXPAN_LVL1: string;
 declare const TRANSFER_ABORT_INSUF_EXPAN_LVL2: string;
 declare const TRANSFER_ABORT_MAP_NOT_ALLOWED: string;
 declare const TRANSFER_ABORT_MAX_PLAYERS: string;
 declare const TRANSFER_ABORT_NEED_GROUP: string;
 declare const TRANSFER_ABORT_NOT_FOUND: string;
 declare const TRANSFER_ABORT_REALM_ONLY: string;
 declare const TRANSFER_ABORT_TOO_MANY_INSTANCES: string;
 declare const TRANSFER_ABORT_TOO_MANY_REALM_INSTANCES: string;
 declare const TRANSFER_ABORT_UNIQUE_MESSAGE1: string;
 declare const TRANSFER_ABORT_ZONE_IN_COMBAT: string;
 declare const TRILINEAR_FILTERING: string;
 declare const TRINKET0SLOT: string;
 declare const TRINKET0SLOT_UNIQUE: string;
 declare const TRINKET1SLOT: string;
 declare const TRINKET1SLOT_UNIQUE: string;
 declare const TRIPLE_BUFFER: string;
 declare const TRIVIAL_QUEST_DISPLAY: string;
 declare const TURN_IN_ITEMS: string;
 declare const TURN_IN_QUEST: string;
 declare const TUTORIAL1: string;
 declare const TUTORIAL2: string;
 declare const TUTORIAL3: string;
 declare const TUTORIAL4: string;
 declare const TUTORIAL5: string;
 declare const TUTORIAL6: string;
 declare const TUTORIAL7: string;
 declare const TUTORIAL8: string;
 declare const TUTORIAL9: string;
 declare const TUTORIAL10: string;
 declare const TUTORIAL11: string;
 declare const TUTORIAL12: string;
 declare const TUTORIAL13: string;
 declare const TUTORIAL14: string;
 declare const TUTORIAL15: string;
 declare const TUTORIAL16: string;
 declare const TUTORIAL17: string;
 declare const TUTORIAL18: string;
 declare const TUTORIAL19: string;
 declare const TUTORIAL20: string;
 declare const TUTORIAL21: string;
 declare const TUTORIAL22: string;
 declare const TUTORIAL23: string;
 declare const TUTORIAL24: string;
 declare const TUTORIAL25: string;
 declare const TUTORIAL26: string;
 declare const TUTORIAL27: string;
 declare const TUTORIAL28: string;
 declare const TUTORIAL29: string;
 declare const TUTORIAL30: string;
 declare const TUTORIAL31: string;
 declare const TUTORIAL32: string;
 declare const TUTORIAL33: string;
 declare const TUTORIAL34: string;
 declare const TUTORIAL35: string;
 declare const TUTORIAL36: string;
 declare const TUTORIAL37: string;
 declare const TUTORIAL38: string;
 declare const TUTORIAL39: string;
 declare const TUTORIAL40: string;
 declare const TUTORIAL41: string;
 declare const TUTORIAL42: string;
 declare const TUTORIAL43: string;
 declare const TUTORIAL44: string;
 declare const TUTORIAL45: string;
 declare const TUTORIAL46: string;
 declare const TUTORIAL47: string;
 declare const TUTORIAL48: string;
 declare const TUTORIAL49: string;
 declare const TUTORIAL50: string;
 declare const TUTORIAL51: string;
 declare const TUTORIAL52: string;
 declare const TUTORIAL53: string;
 declare const TUTORIAL54: string;
 declare const TUTORIAL55: string;
 declare const TUTORIAL56: string;
 declare const TUTORIAL57: string;
 declare const TUTORIAL58: string;
 declare const TUTORIAL59: string;
 declare const TUTORIAL60: string;
 declare const TUTORIAL61: string;
 declare const TUTORIAL_TITLE1: string;
 declare const TUTORIAL_TITLE2: string;
 declare const TUTORIAL_TITLE3: string;
 declare const TUTORIAL_TITLE4: string;
 declare const TUTORIAL_TITLE5: string;
 declare const TUTORIAL_TITLE6: string;
 declare const TUTORIAL_TITLE7: string;
 declare const TUTORIAL_TITLE8: string;
 declare const TUTORIAL_TITLE9: string;
 declare const TUTORIAL_TITLE10: string;
 declare const TUTORIAL_TITLE11: string;
 declare const TUTORIAL_TITLE12: string;
 declare const TUTORIAL_TITLE13: string;
 declare const TUTORIAL_TITLE14: string;
 declare const TUTORIAL_TITLE15: string;
 declare const TUTORIAL_TITLE16: string;
 declare const TUTORIAL_TITLE17: string;
 declare const TUTORIAL_TITLE18: string;
 declare const TUTORIAL_TITLE19: string;
 declare const TUTORIAL_TITLE20: string;
 declare const TUTORIAL_TITLE21: string;
 declare const TUTORIAL_TITLE22: string;
 declare const TUTORIAL_TITLE23: string;
 declare const TUTORIAL_TITLE24: string;
 declare const TUTORIAL_TITLE25: string;
 declare const TUTORIAL_TITLE26: string;
 declare const TUTORIAL_TITLE27: string;
 declare const TUTORIAL_TITLE28: string;
 declare const TUTORIAL_TITLE29: string;
 declare const TUTORIAL_TITLE30: string;
 declare const TUTORIAL_TITLE31: string;
 declare const TUTORIAL_TITLE32: string;
 declare const TUTORIAL_TITLE33: string;
 declare const TUTORIAL_TITLE34: string;
 declare const TUTORIAL_TITLE35: string;
 declare const TUTORIAL_TITLE36: string;
 declare const TUTORIAL_TITLE37: string;
 declare const TUTORIAL_TITLE38: string;
 declare const TUTORIAL_TITLE39: string;
 declare const TUTORIAL_TITLE40: string;
 declare const TUTORIAL_TITLE41: string;
 declare const TUTORIAL_TITLE42: string;
 declare const TUTORIAL_TITLE43: string;
 declare const TUTORIAL_TITLE44: string;
 declare const TUTORIAL_TITLE45: string;
 declare const TUTORIAL_TITLE46: string;
 declare const TUTORIAL_TITLE47: string;
 declare const TUTORIAL_TITLE48: string;
 declare const TUTORIAL_TITLE49: string;
 declare const TUTORIAL_TITLE50: string;
 declare const TUTORIAL_TITLE51: string;
 declare const TUTORIAL_TITLE52: string;
 declare const TUTORIAL_TITLE53: string;
 declare const TUTORIAL_TITLE54: string;
 declare const TUTORIAL_TITLE55: string;
 declare const TUTORIAL_TITLE56: string;
 declare const TUTORIAL_TITLE57: string;
 declare const TUTORIAL_TITLE58: string;
 declare const TUTORIAL_TITLE59: string;
 declare const TUTORIAL_TITLE60: string;
 declare const TUTORIAL_TITLE61: string;
 declare const TWOHANDEDWEAPONBEINGWIELDED: string;
 declare const TWO_HANDED: string;
 declare const TYPE: string;
 declare const TYPE_LFR_COMMENT_HERE: string;
 declare const UIOPTIONS_MENU: string;
 declare const UI_DEPTH: string;
 declare const UI_HIDDEN: string;
 declare const UI_SCALE: string;
 declare const UKNOWNBEING: string;
 declare const UNABLE_TO_REFUND_ITEM: string;
 declare const UNAVAILABLE: string;
 declare const UNBIND: string;
 declare const UNEXTEND_RAID_LOCK: string;
 declare const UNITFRAME_LABEL: string;
 declare const UNITFRAME_SUBTEXT: string;
 declare const UNITNAME_SUMMON_TITLE1: string;
 declare const UNITNAME_SUMMON_TITLE10: string;
 declare const UNITNAME_SUMMON_TITLE11: string;
 declare const UNITNAME_SUMMON_TITLE12: string;
 declare const UNITNAME_SUMMON_TITLE2: string;
 declare const UNITNAME_SUMMON_TITLE3: string;
 declare const UNITNAME_SUMMON_TITLE4: string;
 declare const UNITNAME_SUMMON_TITLE5: string;
 declare const UNITNAME_SUMMON_TITLE6: string;
 declare const UNITNAME_SUMMON_TITLE7: string;
 declare const UNITNAME_SUMMON_TITLE8: string;
 declare const UNITNAME_SUMMON_TITLE9: string;
 declare const UNITNAME_TITLE: string;
 declare const UNITNAME_TITLE_CHARM: string;
 declare const UNITNAME_TITLE_COMPANION: string;
 declare const UNITNAME_TITLE_CREATION: string;
 declare const UNITNAME_TITLE_GUARDIAN: string;
 declare const UNITNAME_TITLE_MINION: string;
 declare const UNITNAME_TITLE_OPPONENT: string;
 declare const UNITNAME_TITLE_PET: string;
 declare const UNITNAME_TITLE_SQUIRE: string;
 declare const UNIT_COLORS: string;
 declare const UNIT_LETHAL_LEVEL_DEAD_TEMPLATE: string;
 declare const UNIT_LETHAL_LEVEL_TEMPLATE: string;
 declare const UNIT_LEVEL_DEAD_TEMPLATE: string;
 declare const UNIT_LEVEL_TEMPLATE: string;
 declare const UNIT_NAMEPLATES: string;
 declare const UNIT_NAMEPLATES_ALLOW_OVERLAP: string;
 declare const UNIT_NAMEPLATES_SHOW_ENEMIES: string;
 declare const UNIT_NAMEPLATES_SHOW_ENEMY_GUARDIANS: string;
 declare const UNIT_NAMEPLATES_SHOW_ENEMY_PETS: string;
 declare const UNIT_NAMEPLATES_SHOW_ENEMY_TOTEMS: string;
 declare const UNIT_NAMEPLATES_SHOW_FRIENDLY_GUARDIANS: string;
 declare const UNIT_NAMEPLATES_SHOW_FRIENDLY_PETS: string;
 declare const UNIT_NAMEPLATES_SHOW_FRIENDLY_TOTEMS: string;
 declare const UNIT_NAMEPLATES_SHOW_FRIENDS: string;
 declare const UNIT_NAMES: string;
 declare const UNIT_NAMES_COMBATLOG_TOOLTIP: string;
 declare const UNIT_NAMES_SHOW_BRACES_COMBATLOG_TOOLTIP: string;
 declare const UNIT_NAME_ENEMY: string;
 declare const UNIT_NAME_ENEMY_GUARDIANS: string;
 declare const UNIT_NAME_ENEMY_PETS: string;
 declare const UNIT_NAME_ENEMY_TOTEMS: string;
 declare const UNIT_NAME_FRIENDLY: string;
 declare const UNIT_NAME_FRIENDLY_GUARDIANS: string;
 declare const UNIT_NAME_FRIENDLY_PETS: string;
 declare const UNIT_NAME_FRIENDLY_TOTEMS: string;
 declare const UNIT_NAME_GUILD: string;
 declare const UNIT_NAME_NONCOMBAT_CREATURE: string;
 declare const UNIT_NAME_NPC: string;
 declare const UNIT_NAME_OWN: string;
 declare const UNIT_NAME_PLAYER_TITLE: string;
 declare const UNIT_PLUS_LEVEL_TEMPLATE: string;
 declare const UNIT_PVP_NAME: string;
 declare const UNIT_SKINNABLE_BOLTS: string;
 declare const UNIT_SKINNABLE_HERB: string;
 declare const UNIT_SKINNABLE_LEATHER: string;
 declare const UNIT_SKINNABLE_ROCK: string;
 declare const UNIT_TYPE_LETHAL_LEVEL_TEMPLATE: string;
 declare const UNIT_TYPE_LEVEL_TEMPLATE: string;
 declare const UNIT_TYPE_PLUS_LEVEL_TEMPLATE: string;
 declare const UNIT_YOU: string;
 declare const UNIT_YOU_DEST: string;
 declare const UNIT_YOU_DEST_POSSESSIVE: string;
 declare const UNIT_YOU_SOURCE: string;
 declare const UNIT_YOU_SOURCE_POSSESSIVE: string;
 declare const UNKNOWN: string;
 declare const UNKNOWNOBJECT: string;
 declare const UNLEARN: string;
 declare const UNLEARN_SKILL: string;
 declare const UNLEARN_SKILL_TOOLTIP: string;
 declare const UNLIMITED: string;
 declare const UNLIST_ME: string;
 declare const UNLIST_MY_GROUP: string;
 declare const UNLOCK_FOCUS_FRAME: string;
 declare const UNLOCK_WINDOW: string;
 declare const UNMUTE: string;
 declare const UNSPENT_TALENT_POINTS: string;
 declare const UNTRACK_ACHIEVEMENT_TOOLTIP: string;
 declare const UNUSED: string;
 declare const UPDATE: string;
 declare const USABLE_ITEMS: string;
 declare const USE: string;
 declare const USED: string;
 declare const USE_COLON: string;
 declare const USE_COLORBLIND_MODE: string;
 declare const USE_ENGLISH_AUDIO: string;
 declare const USE_EQUIPMENT_MANAGER: string;
 declare const USE_FULL_TEXT_MODE: string;
 declare const USE_GUILDBANK_REPAIR: string;
 declare const USE_ITEM: string;
 declare const USE_NO_DROP: string;
 declare const USE_PERSONAL_FUNDS: string;
 declare const USE_SOULSTONE: string;
 declare const USE_UBERTOOLTIPS: string;
 declare const USE_UISCALE: string;
 declare const USE_WEATHER_SHADER: string;
 declare const VEHICLE_LEAVE: string;
 declare const VEHICLE_STEAM: string;
 declare const VERBAL_HARASSMENT: string;
 declare const VERBAL_HARASSMENT_DESCRIPTION: string;
 declare const VERBAL_HARASSMENT_TEXT1: string;
 declare const VERBAL_HARASSMENT_TEXT2: string;
 declare const VERBAL_HARASSMENT_TEXT3: string;
 declare const VERBAL_HARASSMENT_TEXT4: string;
 declare const VERTEX_ANIMATION_SHADERS: string;
 declare const VERTICAL_SYNC: string;
 declare const VICTORY_TEXT0: string;
 declare const VICTORY_TEXT1: string;
 declare const VICTORY_TEXT_ARENA0: string;
 declare const VICTORY_TEXT_ARENA1: string;
 declare const VICTORY_TEXT_ARENA_DRAW: string;
 declare const VICTORY_TEXT_ARENA_WINS: string;
 declare const VIDEOOPTIONS_MENU: string;
 declare const VIDEO_QUALITY_LABEL1: string;
 declare const VIDEO_QUALITY_LABEL2: string;
 declare const VIDEO_QUALITY_LABEL3: string;
 declare const VIDEO_QUALITY_LABEL4: string;
 declare const VIDEO_QUALITY_LABEL5: string;
 declare const VIDEO_QUALITY_LABEL6: string;
 declare const VIDEO_QUALITY_S: string;
 declare const VIDEO_QUALITY_SUBTEXT1: string;
 declare const VIDEO_QUALITY_SUBTEXT2: string;
 declare const VIDEO_QUALITY_SUBTEXT3: string;
 declare const VIDEO_QUALITY_SUBTEXT4: string;
 declare const VIDEO_QUALITY_SUBTEXT5: string;
 declare const VIDEO_QUALITY_SUBTEXT6: string;
 declare const VIEW_FRIENDS_OF_FRIENDS: string;
 declare const VOICE: string;
 declare const VOICECHAT_DISABLED: string;
 declare const VOICECHAT_DISABLED_TEXT: string;
 declare const VOICEMACRO_0_Dw_0: string;
 declare const VOICEMACRO_0_Dw_0_FEMALE: string;
 declare const VOICEMACRO_0_Dw_1: string;
 declare const VOICEMACRO_0_Dw_1_FEMALE: string;
 declare const VOICEMACRO_0_Gn_0: string;
 declare const VOICEMACRO_0_Gn_0_FEMALE: string;
 declare const VOICEMACRO_0_Gn_1: string;
 declare const VOICEMACRO_0_Gn_1_FEMALE: string;
 declare const VOICEMACRO_0_Gn_2_FEMALE: string;
 declare const VOICEMACRO_0_Hu_0: string;
 declare const VOICEMACRO_0_Hu_0_FEMALE: string;
 declare const VOICEMACRO_0_Hu_1: string;
 declare const VOICEMACRO_0_Hu_1_FEMALE: string;
 declare const VOICEMACRO_0_Ni_0: string;
 declare const VOICEMACRO_0_Ni_0_FEMALE: string;
 declare const VOICEMACRO_0_Ni_1: string;
 declare const VOICEMACRO_0_Ni_1_FEMALE: string;
 declare const VOICEMACRO_0_Ni_2: string;
 declare const VOICEMACRO_0_Or_0: string;
 declare const VOICEMACRO_0_Or_0_FEMALE: string;
 declare const VOICEMACRO_0_Or_1: string;
 declare const VOICEMACRO_0_Or_1_FEMALE: string;
 declare const VOICEMACRO_0_Sc_0: string;
 declare const VOICEMACRO_0_Sc_0_FEMALE: string;
 declare const VOICEMACRO_0_Sc_1: string;
 declare const VOICEMACRO_0_Sc_1_FEMALE: string;
 declare const VOICEMACRO_0_Ta_0: string;
 declare const VOICEMACRO_0_Ta_0_FEMALE: string;
 declare const VOICEMACRO_0_Ta_1: string;
 declare const VOICEMACRO_0_Ta_1_FEMALE: string;
 declare const VOICEMACRO_0_Ta_2: string;
 declare const VOICEMACRO_0_Tr_0: string;
 declare const VOICEMACRO_0_Tr_0_FEMALE: string;
 declare const VOICEMACRO_0_Tr_1: string;
 declare const VOICEMACRO_0_Tr_1_FEMALE: string;
 declare const VOICEMACRO_10_Dw_0: string;
 declare const VOICEMACRO_10_Dw_0_FEMALE: string;
 declare const VOICEMACRO_10_Dw_1: string;
 declare const VOICEMACRO_10_Dw_1_FEMALE: string;
 declare const VOICEMACRO_10_Gn_0: string;
 declare const VOICEMACRO_10_Gn_0_FEMALE: string;
 declare const VOICEMACRO_10_Gn_1: string;
 declare const VOICEMACRO_10_Gn_1_FEMALE: string;
 declare const VOICEMACRO_10_Hu_0: string;
 declare const VOICEMACRO_10_Hu_0_FEMALE: string;
 declare const VOICEMACRO_10_Hu_1: string;
 declare const VOICEMACRO_10_Hu_1_FEMALE: string;
 declare const VOICEMACRO_10_Ni_0: string;
 declare const VOICEMACRO_10_Ni_0_FEMALE: string;
 declare const VOICEMACRO_10_Ni_1: string;
 declare const VOICEMACRO_10_Ni_1_FEMALE: string;
 declare const VOICEMACRO_10_Or_0: string;
 declare const VOICEMACRO_10_Or_0_FEMALE: string;
 declare const VOICEMACRO_10_Or_1: string;
 declare const VOICEMACRO_10_Or_1_FEMALE: string;
 declare const VOICEMACRO_10_Or_2_FEMALE: string;
 declare const VOICEMACRO_10_Sc_0: string;
 declare const VOICEMACRO_10_Sc_0_FEMALE: string;
 declare const VOICEMACRO_10_Sc_1: string;
 declare const VOICEMACRO_10_Sc_1_FEMALE: string;
 declare const VOICEMACRO_10_Ta_0: string;
 declare const VOICEMACRO_10_Ta_0_FEMALE: string;
 declare const VOICEMACRO_10_Ta_1: string;
 declare const VOICEMACRO_10_Ta_1_FEMALE: string;
 declare const VOICEMACRO_10_Tr_0: string;
 declare const VOICEMACRO_10_Tr_0_FEMALE: string;
 declare const VOICEMACRO_10_Tr_1: string;
 declare const VOICEMACRO_10_Tr_1_FEMALE: string;
 declare const VOICEMACRO_12_Dw_0: string;
 declare const VOICEMACRO_12_Dw_0_FEMALE: string;
 declare const VOICEMACRO_12_Dw_1: string;
 declare const VOICEMACRO_12_Dw_1_FEMALE: string;
 declare const VOICEMACRO_12_Dw_2: string;
 declare const VOICEMACRO_12_Dw_2_FEMALE: string;
 declare const VOICEMACRO_12_Dw_3: string;
 declare const VOICEMACRO_12_Gn_0: string;
 declare const VOICEMACRO_12_Gn_0_FEMALE: string;
 declare const VOICEMACRO_12_Gn_1: string;
 declare const VOICEMACRO_12_Gn_1_FEMALE: string;
 declare const VOICEMACRO_12_Gn_2: string;
 declare const VOICEMACRO_12_Gn_2_FEMALE: string;
 declare const VOICEMACRO_12_Gn_3: string;
 declare const VOICEMACRO_12_Hu_0: string;
 declare const VOICEMACRO_12_Hu_0_FEMALE: string;
 declare const VOICEMACRO_12_Hu_1: string;
 declare const VOICEMACRO_12_Hu_1_FEMALE: string;
 declare const VOICEMACRO_12_Hu_2: string;
 declare const VOICEMACRO_12_Hu_2_FEMALE: string;
 declare const VOICEMACRO_12_Hu_3: string;
 declare const VOICEMACRO_12_Ni_0: string;
 declare const VOICEMACRO_12_Ni_0_FEMALE: string;
 declare const VOICEMACRO_12_Ni_1: string;
 declare const VOICEMACRO_12_Ni_1_FEMALE: string;
 declare const VOICEMACRO_12_Ni_2: string;
 declare const VOICEMACRO_12_Ni_2_FEMALE: string;
 declare const VOICEMACRO_12_Ni_3_FEMALE: string;
 declare const VOICEMACRO_12_Or_0: string;
 declare const VOICEMACRO_12_Or_0_FEMALE: string;
 declare const VOICEMACRO_12_Or_1: string;
 declare const VOICEMACRO_12_Or_1_FEMALE: string;
 declare const VOICEMACRO_12_Or_2: string;
 declare const VOICEMACRO_12_Or_2_FEMALE: string;
 declare const VOICEMACRO_12_Sc_0: string;
 declare const VOICEMACRO_12_Sc_0_FEMALE: string;
 declare const VOICEMACRO_12_Sc_1: string;
 declare const VOICEMACRO_12_Sc_1_FEMALE: string;
 declare const VOICEMACRO_12_Sc_2: string;
 declare const VOICEMACRO_12_Sc_2_FEMALE: string;
 declare const VOICEMACRO_12_Ta_0: string;
 declare const VOICEMACRO_12_Ta_0_FEMALE: string;
 declare const VOICEMACRO_12_Ta_1: string;
 declare const VOICEMACRO_12_Ta_1_FEMALE: string;
 declare const VOICEMACRO_12_Ta_2: string;
 declare const VOICEMACRO_12_Ta_2_FEMALE: string;
 declare const VOICEMACRO_12_Tr_0: string;
 declare const VOICEMACRO_12_Tr_0_FEMALE: string;
 declare const VOICEMACRO_12_Tr_1: string;
 declare const VOICEMACRO_12_Tr_1_FEMALE: string;
 declare const VOICEMACRO_12_Tr_2: string;
 declare const VOICEMACRO_12_Tr_2_FEMALE: string;
 declare const VOICEMACRO_13_Dw_0: string;
 declare const VOICEMACRO_13_Dw_0_FEMALE: string;
 declare const VOICEMACRO_13_Dw_1: string;
 declare const VOICEMACRO_13_Dw_1_FEMALE: string;
 declare const VOICEMACRO_13_Dw_2: string;
 declare const VOICEMACRO_13_Dw_2_FEMALE: string;
 declare const VOICEMACRO_13_Gn_0: string;
 declare const VOICEMACRO_13_Gn_0_FEMALE: string;
 declare const VOICEMACRO_13_Gn_1: string;
 declare const VOICEMACRO_13_Gn_1_FEMALE: string;
 declare const VOICEMACRO_13_Gn_2: string;
 declare const VOICEMACRO_13_Gn_2_FEMALE: string;
 declare const VOICEMACRO_13_Gn_3: string;
 declare const VOICEMACRO_13_Gn_3_FEMALE: string;
 declare const VOICEMACRO_13_Hu_0: string;
 declare const VOICEMACRO_13_Hu_0_FEMALE: string;
 declare const VOICEMACRO_13_Hu_1: string;
 declare const VOICEMACRO_13_Hu_1_FEMALE: string;
 declare const VOICEMACRO_13_Hu_2: string;
 declare const VOICEMACRO_13_Hu_2_FEMALE: string;
 declare const VOICEMACRO_13_Ni_0: string;
 declare const VOICEMACRO_13_Ni_0_FEMALE: string;
 declare const VOICEMACRO_13_Ni_1: string;
 declare const VOICEMACRO_13_Ni_1_FEMALE: string;
 declare const VOICEMACRO_13_Ni_2: string;
 declare const VOICEMACRO_13_Ni_2_FEMALE: string;
 declare const VOICEMACRO_13_Or_0: string;
 declare const VOICEMACRO_13_Or_0_FEMALE: string;
 declare const VOICEMACRO_13_Or_1: string;
 declare const VOICEMACRO_13_Or_1_FEMALE: string;
 declare const VOICEMACRO_13_Or_2: string;
 declare const VOICEMACRO_13_Or_2_FEMALE: string;
 declare const VOICEMACRO_13_Sc_0: string;
 declare const VOICEMACRO_13_Sc_0_FEMALE: string;
 declare const VOICEMACRO_13_Sc_1: string;
 declare const VOICEMACRO_13_Sc_1_FEMALE: string;
 declare const VOICEMACRO_13_Sc_2: string;
 declare const VOICEMACRO_13_Sc_2_FEMALE: string;
 declare const VOICEMACRO_13_Ta_0: string;
 declare const VOICEMACRO_13_Ta_0_FEMALE: string;
 declare const VOICEMACRO_13_Ta_1: string;
 declare const VOICEMACRO_13_Ta_1_FEMALE: string;
 declare const VOICEMACRO_13_Ta_2: string;
 declare const VOICEMACRO_13_Ta_2_FEMALE: string;
 declare const VOICEMACRO_13_Tr_0: string;
 declare const VOICEMACRO_13_Tr_0_FEMALE: string;
 declare const VOICEMACRO_13_Tr_1: string;
 declare const VOICEMACRO_13_Tr_1_FEMALE: string;
 declare const VOICEMACRO_13_Tr_2: string;
 declare const VOICEMACRO_13_Tr_2_FEMALE: string;
 declare const VOICEMACRO_14_Dw_0: string;
 declare const VOICEMACRO_14_Dw_0_FEMALE: string;
 declare const VOICEMACRO_14_Dw_1: string;
 declare const VOICEMACRO_14_Dw_1_FEMALE: string;
 declare const VOICEMACRO_14_Dw_2: string;
 declare const VOICEMACRO_14_Dw_2_FEMALE: string;
 declare const VOICEMACRO_14_Dw_3: string;
 declare const VOICEMACRO_14_Gn_0: string;
 declare const VOICEMACRO_14_Gn_0_FEMALE: string;
 declare const VOICEMACRO_14_Gn_1: string;
 declare const VOICEMACRO_14_Gn_1_FEMALE: string;
 declare const VOICEMACRO_14_Gn_2: string;
 declare const VOICEMACRO_14_Gn_2_FEMALE: string;
 declare const VOICEMACRO_14_Hu_0: string;
 declare const VOICEMACRO_14_Hu_0_FEMALE: string;
 declare const VOICEMACRO_14_Hu_1: string;
 declare const VOICEMACRO_14_Hu_1_FEMALE: string;
 declare const VOICEMACRO_14_Hu_2: string;
 declare const VOICEMACRO_14_Hu_2_FEMALE: string;
 declare const VOICEMACRO_14_Ni_0: string;
 declare const VOICEMACRO_14_Ni_0_FEMALE: string;
 declare const VOICEMACRO_14_Ni_1: string;
 declare const VOICEMACRO_14_Ni_1_FEMALE: string;
 declare const VOICEMACRO_14_Ni_2: string;
 declare const VOICEMACRO_14_Ni_2_FEMALE: string;
 declare const VOICEMACRO_14_Or_0: string;
 declare const VOICEMACRO_14_Or_0_FEMALE: string;
 declare const VOICEMACRO_14_Or_1: string;
 declare const VOICEMACRO_14_Or_1_FEMALE: string;
 declare const VOICEMACRO_14_Or_2: string;
 declare const VOICEMACRO_14_Or_2_FEMALE: string;
 declare const VOICEMACRO_14_Or_3: string;
 declare const VOICEMACRO_14_Or_3_FEMALE: string;
 declare const VOICEMACRO_14_Sc_0: string;
 declare const VOICEMACRO_14_Sc_0_FEMALE: string;
 declare const VOICEMACRO_14_Sc_1: string;
 declare const VOICEMACRO_14_Sc_1_FEMALE: string;
 declare const VOICEMACRO_14_Sc_2: string;
 declare const VOICEMACRO_14_Sc_2_FEMALE: string;
 declare const VOICEMACRO_14_Ta_0: string;
 declare const VOICEMACRO_14_Ta_0_FEMALE: string;
 declare const VOICEMACRO_14_Ta_1: string;
 declare const VOICEMACRO_14_Ta_1_FEMALE: string;
 declare const VOICEMACRO_14_Ta_2: string;
 declare const VOICEMACRO_14_Ta_2_FEMALE: string;
 declare const VOICEMACRO_14_Tr_0: string;
 declare const VOICEMACRO_14_Tr_0_FEMALE: string;
 declare const VOICEMACRO_14_Tr_1: string;
 declare const VOICEMACRO_14_Tr_1_FEMALE: string;
 declare const VOICEMACRO_14_Tr_2: string;
 declare const VOICEMACRO_14_Tr_2_FEMALE: string;
 declare const VOICEMACRO_14_Tr_3: string;
 declare const VOICEMACRO_15_Dw_0: string;
 declare const VOICEMACRO_15_Dw_0_FEMALE: string;
 declare const VOICEMACRO_15_Dw_1: string;
 declare const VOICEMACRO_15_Dw_1_FEMALE: string;
 declare const VOICEMACRO_15_Dw_2: string;
 declare const VOICEMACRO_15_Dw_2_FEMALE: string;
 declare const VOICEMACRO_15_Dw_3: string;
 declare const VOICEMACRO_15_Gn_0: string;
 declare const VOICEMACRO_15_Gn_0_FEMALE: string;
 declare const VOICEMACRO_15_Gn_1: string;
 declare const VOICEMACRO_15_Gn_1_FEMALE: string;
 declare const VOICEMACRO_15_Gn_2: string;
 declare const VOICEMACRO_15_Gn_2_FEMALE: string;
 declare const VOICEMACRO_15_Hu_0: string;
 declare const VOICEMACRO_15_Hu_0_FEMALE: string;
 declare const VOICEMACRO_15_Hu_1: string;
 declare const VOICEMACRO_15_Hu_1_FEMALE: string;
 declare const VOICEMACRO_15_Hu_2: string;
 declare const VOICEMACRO_15_Hu_2_FEMALE: string;
 declare const VOICEMACRO_15_Hu_3: string;
 declare const VOICEMACRO_15_Ni_0: string;
 declare const VOICEMACRO_15_Ni_0_FEMALE: string;
 declare const VOICEMACRO_15_Ni_1: string;
 declare const VOICEMACRO_15_Ni_1_FEMALE: string;
 declare const VOICEMACRO_15_Ni_2: string;
 declare const VOICEMACRO_15_Ni_2_FEMALE: string;
 declare const VOICEMACRO_15_Or_0: string;
 declare const VOICEMACRO_15_Or_0_FEMALE: string;
 declare const VOICEMACRO_15_Or_1: string;
 declare const VOICEMACRO_15_Or_1_FEMALE: string;
 declare const VOICEMACRO_15_Or_2: string;
 declare const VOICEMACRO_15_Or_2_FEMALE: string;
 declare const VOICEMACRO_15_Sc_0: string;
 declare const VOICEMACRO_15_Sc_0_FEMALE: string;
 declare const VOICEMACRO_15_Sc_1: string;
 declare const VOICEMACRO_15_Sc_1_FEMALE: string;
 declare const VOICEMACRO_15_Sc_2: string;
 declare const VOICEMACRO_15_Sc_2_FEMALE: string;
 declare const VOICEMACRO_15_Ta_0: string;
 declare const VOICEMACRO_15_Ta_0_FEMALE: string;
 declare const VOICEMACRO_15_Ta_1: string;
 declare const VOICEMACRO_15_Ta_1_FEMALE: string;
 declare const VOICEMACRO_15_Ta_2: string;
 declare const VOICEMACRO_15_Ta_2_FEMALE: string;
 declare const VOICEMACRO_15_Tr_0: string;
 declare const VOICEMACRO_15_Tr_0_FEMALE: string;
 declare const VOICEMACRO_15_Tr_1: string;
 declare const VOICEMACRO_15_Tr_1_FEMALE: string;
 declare const VOICEMACRO_15_Tr_2: string;
 declare const VOICEMACRO_15_Tr_2_FEMALE: string;
 declare const VOICEMACRO_15_Tr_3: string;
 declare const VOICEMACRO_16_Dw_0: string;
 declare const VOICEMACRO_16_Dw_0_FEMALE: string;
 declare const VOICEMACRO_16_Dw_1: string;
 declare const VOICEMACRO_16_Dw_1_FEMALE: string;
 declare const VOICEMACRO_16_Dw_2: string;
 declare const VOICEMACRO_16_Dw_2_FEMALE: string;
 declare const VOICEMACRO_16_Dw_3: string;
 declare const VOICEMACRO_16_Dw_3_FEMALE: string;
 declare const VOICEMACRO_16_Gn_0: string;
 declare const VOICEMACRO_16_Gn_0_FEMALE: string;
 declare const VOICEMACRO_16_Gn_1: string;
 declare const VOICEMACRO_16_Gn_1_FEMALE: string;
 declare const VOICEMACRO_16_Gn_2: string;
 declare const VOICEMACRO_16_Gn_2_FEMALE: string;
 declare const VOICEMACRO_16_Hu_0: string;
 declare const VOICEMACRO_16_Hu_0_FEMALE: string;
 declare const VOICEMACRO_16_Hu_1: string;
 declare const VOICEMACRO_16_Hu_1_FEMALE: string;
 declare const VOICEMACRO_16_Hu_2: string;
 declare const VOICEMACRO_16_Hu_2_FEMALE: string;
 declare const VOICEMACRO_16_Ni_0: string;
 declare const VOICEMACRO_16_Ni_0_FEMALE: string;
 declare const VOICEMACRO_16_Ni_1: string;
 declare const VOICEMACRO_16_Ni_1_FEMALE: string;
 declare const VOICEMACRO_16_Ni_2: string;
 declare const VOICEMACRO_16_Ni_2_FEMALE: string;
 declare const VOICEMACRO_16_Or_0: string;
 declare const VOICEMACRO_16_Or_0_FEMALE: string;
 declare const VOICEMACRO_16_Or_1: string;
 declare const VOICEMACRO_16_Or_1_FEMALE: string;
 declare const VOICEMACRO_16_Or_2: string;
 declare const VOICEMACRO_16_Or_2_FEMALE: string;
 declare const VOICEMACRO_16_Sc_0: string;
 declare const VOICEMACRO_16_Sc_0_FEMALE: string;
 declare const VOICEMACRO_16_Sc_1: string;
 declare const VOICEMACRO_16_Sc_1_FEMALE: string;
 declare const VOICEMACRO_16_Sc_2: string;
 declare const VOICEMACRO_16_Sc_2_FEMALE: string;
 declare const VOICEMACRO_16_Ta_0: string;
 declare const VOICEMACRO_16_Ta_0_FEMALE: string;
 declare const VOICEMACRO_16_Ta_1: string;
 declare const VOICEMACRO_16_Ta_1_FEMALE: string;
 declare const VOICEMACRO_16_Ta_2: string;
 declare const VOICEMACRO_16_Ta_2_FEMALE: string;
 declare const VOICEMACRO_16_Ta_3: string;
 declare const VOICEMACRO_16_Tr_0: string;
 declare const VOICEMACRO_16_Tr_0_FEMALE: string;
 declare const VOICEMACRO_16_Tr_1: string;
 declare const VOICEMACRO_16_Tr_1_FEMALE: string;
 declare const VOICEMACRO_16_Tr_2: string;
 declare const VOICEMACRO_16_Tr_2_FEMALE: string;
 declare const VOICEMACRO_17_Dw_0: string;
 declare const VOICEMACRO_17_Dw_0_FEMALE: string;
 declare const VOICEMACRO_17_Dw_1: string;
 declare const VOICEMACRO_17_Dw_1_FEMALE: string;
 declare const VOICEMACRO_17_Dw_2: string;
 declare const VOICEMACRO_17_Dw_2_FEMALE: string;
 declare const VOICEMACRO_17_Gn_0: string;
 declare const VOICEMACRO_17_Gn_0_FEMALE: string;
 declare const VOICEMACRO_17_Gn_1: string;
 declare const VOICEMACRO_17_Gn_1_FEMALE: string;
 declare const VOICEMACRO_17_Gn_2: string;
 declare const VOICEMACRO_17_Gn_2_FEMALE: string;
 declare const VOICEMACRO_17_Hu_0: string;
 declare const VOICEMACRO_17_Hu_0_FEMALE: string;
 declare const VOICEMACRO_17_Hu_1: string;
 declare const VOICEMACRO_17_Hu_1_FEMALE: string;
 declare const VOICEMACRO_17_Hu_2: string;
 declare const VOICEMACRO_17_Hu_2_FEMALE: string;
 declare const VOICEMACRO_17_Ni_0: string;
 declare const VOICEMACRO_17_Ni_0_FEMALE: string;
 declare const VOICEMACRO_17_Ni_1: string;
 declare const VOICEMACRO_17_Ni_1_FEMALE: string;
 declare const VOICEMACRO_17_Ni_2: string;
 declare const VOICEMACRO_17_Ni_2_FEMALE: string;
 declare const VOICEMACRO_17_Or_0: string;
 declare const VOICEMACRO_17_Or_0_FEMALE: string;
 declare const VOICEMACRO_17_Or_1: string;
 declare const VOICEMACRO_17_Or_1_FEMALE: string;
 declare const VOICEMACRO_17_Or_2: string;
 declare const VOICEMACRO_17_Or_2_FEMALE: string;
 declare const VOICEMACRO_17_Sc_0: string;
 declare const VOICEMACRO_17_Sc_0_FEMALE: string;
 declare const VOICEMACRO_17_Sc_1: string;
 declare const VOICEMACRO_17_Sc_1_FEMALE: string;
 declare const VOICEMACRO_17_Sc_2_FEMALE: string;
 declare const VOICEMACRO_17_Ta_0: string;
 declare const VOICEMACRO_17_Ta_0_FEMALE: string;
 declare const VOICEMACRO_17_Ta_1: string;
 declare const VOICEMACRO_17_Ta_1_FEMALE: string;
 declare const VOICEMACRO_17_Ta_2: string;
 declare const VOICEMACRO_17_Ta_2_FEMALE: string;
 declare const VOICEMACRO_17_Tr_0: string;
 declare const VOICEMACRO_17_Tr_0_FEMALE: string;
 declare const VOICEMACRO_17_Tr_1: string;
 declare const VOICEMACRO_17_Tr_1_FEMALE: string;
 declare const VOICEMACRO_17_Tr_2: string;
 declare const VOICEMACRO_17_Tr_2_FEMALE: string;
 declare const VOICEMACRO_18_Dw_0: string;
 declare const VOICEMACRO_18_Dw_0_FEMALE: string;
 declare const VOICEMACRO_18_Dw_1: string;
 declare const VOICEMACRO_18_Dw_1_FEMALE: string;
 declare const VOICEMACRO_18_Dw_2: string;
 declare const VOICEMACRO_18_Dw_2_FEMALE: string;
 declare const VOICEMACRO_18_Dw_3: string;
 declare const VOICEMACRO_18_Dw_3_FEMALE: string;
 declare const VOICEMACRO_18_Dw_4: string;
 declare const VOICEMACRO_18_Gn_0: string;
 declare const VOICEMACRO_18_Gn_0_FEMALE: string;
 declare const VOICEMACRO_18_Gn_1: string;
 declare const VOICEMACRO_18_Gn_1_FEMALE: string;
 declare const VOICEMACRO_18_Gn_2: string;
 declare const VOICEMACRO_18_Gn_2_FEMALE: string;
 declare const VOICEMACRO_18_Gn_3_FEMALE: string;
 declare const VOICEMACRO_18_Hu_0: string;
 declare const VOICEMACRO_18_Hu_0_FEMALE: string;
 declare const VOICEMACRO_18_Hu_1: string;
 declare const VOICEMACRO_18_Hu_1_FEMALE: string;
 declare const VOICEMACRO_18_Hu_2: string;
 declare const VOICEMACRO_18_Hu_2_FEMALE: string;
 declare const VOICEMACRO_18_Ni_0: string;
 declare const VOICEMACRO_18_Ni_0_FEMALE: string;
 declare const VOICEMACRO_18_Ni_1: string;
 declare const VOICEMACRO_18_Ni_1_FEMALE: string;
 declare const VOICEMACRO_18_Ni_2: string;
 declare const VOICEMACRO_18_Ni_2_FEMALE: string;
 declare const VOICEMACRO_18_Or_0: string;
 declare const VOICEMACRO_18_Or_0_FEMALE: string;
 declare const VOICEMACRO_18_Or_1: string;
 declare const VOICEMACRO_18_Or_1_FEMALE: string;
 declare const VOICEMACRO_18_Or_2: string;
 declare const VOICEMACRO_18_Or_2_FEMALE: string;
 declare const VOICEMACRO_18_Sc_0: string;
 declare const VOICEMACRO_18_Sc_0_FEMALE: string;
 declare const VOICEMACRO_18_Sc_1: string;
 declare const VOICEMACRO_18_Sc_1_FEMALE: string;
 declare const VOICEMACRO_18_Sc_2: string;
 declare const VOICEMACRO_18_Sc_2_FEMALE: string;
 declare const VOICEMACRO_18_Sc_3_FEMALE: string;
 declare const VOICEMACRO_18_Ta_0: string;
 declare const VOICEMACRO_18_Ta_0_FEMALE: string;
 declare const VOICEMACRO_18_Ta_1: string;
 declare const VOICEMACRO_18_Ta_1_FEMALE: string;
 declare const VOICEMACRO_18_Ta_2: string;
 declare const VOICEMACRO_18_Ta_2_FEMALE: string;
 declare const VOICEMACRO_18_Tr_0: string;
 declare const VOICEMACRO_18_Tr_0_FEMALE: string;
 declare const VOICEMACRO_18_Tr_1: string;
 declare const VOICEMACRO_18_Tr_1_FEMALE: string;
 declare const VOICEMACRO_18_Tr_2: string;
 declare const VOICEMACRO_18_Tr_2_FEMALE: string;
 declare const VOICEMACRO_19_Dw_0: string;
 declare const VOICEMACRO_19_Dw_0_FEMALE: string;
 declare const VOICEMACRO_19_Dw_1: string;
 declare const VOICEMACRO_19_Dw_1_FEMALE: string;
 declare const VOICEMACRO_19_Dw_2: string;
 declare const VOICEMACRO_19_Dw_2_FEMALE: string;
 declare const VOICEMACRO_19_Dw_3: string;
 declare const VOICEMACRO_19_Dw_3_FEMALE: string;
 declare const VOICEMACRO_19_Dw_4: string;
 declare const VOICEMACRO_19_Dw_4_FEMALE: string;
 declare const VOICEMACRO_19_Dw_5: string;
 declare const VOICEMACRO_19_Gn_0: string;
 declare const VOICEMACRO_19_Gn_0_FEMALE: string;
 declare const VOICEMACRO_19_Gn_1: string;
 declare const VOICEMACRO_19_Gn_1_FEMALE: string;
 declare const VOICEMACRO_19_Gn_2: string;
 declare const VOICEMACRO_19_Gn_2_FEMALE: string;
 declare const VOICEMACRO_19_Gn_3: string;
 declare const VOICEMACRO_19_Gn_3_FEMALE: string;
 declare const VOICEMACRO_19_Gn_4_FEMALE: string;
 declare const VOICEMACRO_19_Hu_0: string;
 declare const VOICEMACRO_19_Hu_0_FEMALE: string;
 declare const VOICEMACRO_19_Hu_1: string;
 declare const VOICEMACRO_19_Hu_1_FEMALE: string;
 declare const VOICEMACRO_19_Hu_2: string;
 declare const VOICEMACRO_19_Hu_2_FEMALE: string;
 declare const VOICEMACRO_19_Hu_3: string;
 declare const VOICEMACRO_19_Hu_4: string;
 declare const VOICEMACRO_19_Hu_5: string;
 declare const VOICEMACRO_19_Ni_0: string;
 declare const VOICEMACRO_19_Ni_0_FEMALE: string;
 declare const VOICEMACRO_19_Ni_1: string;
 declare const VOICEMACRO_19_Ni_1_FEMALE: string;
 declare const VOICEMACRO_19_Ni_2: string;
 declare const VOICEMACRO_19_Ni_2_FEMALE: string;
 declare const VOICEMACRO_19_Ni_3: string;
 declare const VOICEMACRO_19_Ni_3_FEMALE: string;
 declare const VOICEMACRO_19_Ni_4: string;
 declare const VOICEMACRO_19_Or_0: string;
 declare const VOICEMACRO_19_Or_0_FEMALE: string;
 declare const VOICEMACRO_19_Or_1: string;
 declare const VOICEMACRO_19_Or_1_FEMALE: string;
 declare const VOICEMACRO_19_Or_2: string;
 declare const VOICEMACRO_19_Or_2_FEMALE: string;
 declare const VOICEMACRO_19_Or_3: string;
 declare const VOICEMACRO_19_Or_3_FEMALE: string;
 declare const VOICEMACRO_19_Or_4: string;
 declare const VOICEMACRO_19_Or_4_FEMALE: string;
 declare const VOICEMACRO_19_Or_5: string;
 declare const VOICEMACRO_19_Or_5_FEMALE: string;
 declare const VOICEMACRO_19_Sc_0: string;
 declare const VOICEMACRO_19_Sc_0_FEMALE: string;
 declare const VOICEMACRO_19_Sc_1: string;
 declare const VOICEMACRO_19_Sc_1_FEMALE: string;
 declare const VOICEMACRO_19_Sc_2: string;
 declare const VOICEMACRO_19_Sc_2_FEMALE: string;
 declare const VOICEMACRO_19_Sc_3: string;
 declare const VOICEMACRO_19_Sc_3_FEMALE: string;
 declare const VOICEMACRO_19_Sc_4: string;
 declare const VOICEMACRO_19_Sc_4_FEMALE: string;
 declare const VOICEMACRO_19_Sc_5: string;
 declare const VOICEMACRO_19_Sc_5_FEMALE: string;
 declare const VOICEMACRO_19_Ta_0: string;
 declare const VOICEMACRO_19_Ta_0_FEMALE: string;
 declare const VOICEMACRO_19_Ta_1: string;
 declare const VOICEMACRO_19_Ta_1_FEMALE: string;
 declare const VOICEMACRO_19_Ta_2: string;
 declare const VOICEMACRO_19_Ta_2_FEMALE: string;
 declare const VOICEMACRO_19_Ta_3: string;
 declare const VOICEMACRO_19_Ta_3_FEMALE: string;
 declare const VOICEMACRO_19_Ta_4: string;
 declare const VOICEMACRO_19_Ta_4_FEMALE: string;
 declare const VOICEMACRO_19_Ta_5: string;
 declare const VOICEMACRO_19_Tr_0: string;
 declare const VOICEMACRO_19_Tr_0_FEMALE: string;
 declare const VOICEMACRO_19_Tr_1: string;
 declare const VOICEMACRO_19_Tr_1_FEMALE: string;
 declare const VOICEMACRO_19_Tr_2: string;
 declare const VOICEMACRO_19_Tr_2_FEMALE: string;
 declare const VOICEMACRO_19_Tr_3: string;
 declare const VOICEMACRO_19_Tr_3_FEMALE: string;
 declare const VOICEMACRO_19_Tr_4_FEMALE: string;
 declare const VOICEMACRO_1_Dw_0: string;
 declare const VOICEMACRO_1_Dw_0_FEMALE: string;
 declare const VOICEMACRO_1_Dw_1: string;
 declare const VOICEMACRO_1_Dw_1_FEMALE: string;
 declare const VOICEMACRO_1_Gn_0: string;
 declare const VOICEMACRO_1_Gn_0_FEMALE: string;
 declare const VOICEMACRO_1_Hu_0: string;
 declare const VOICEMACRO_1_Hu_0_FEMALE: string;
 declare const VOICEMACRO_1_Hu_1: string;
 declare const VOICEMACRO_1_Hu_1_FEMALE: string;
 declare const VOICEMACRO_1_Ni_0: string;
 declare const VOICEMACRO_1_Ni_0_FEMALE: string;
 declare const VOICEMACRO_1_Ni_1: string;
 declare const VOICEMACRO_1_Ni_1_FEMALE: string;
 declare const VOICEMACRO_1_Or_0: string;
 declare const VOICEMACRO_1_Or_0_FEMALE: string;
 declare const VOICEMACRO_1_Or_1: string;
 declare const VOICEMACRO_1_Or_1_FEMALE: string;
 declare const VOICEMACRO_1_Or_2: string;
 declare const VOICEMACRO_1_Sc_0: string;
 declare const VOICEMACRO_1_Sc_0_FEMALE: string;
 declare const VOICEMACRO_1_Sc_1: string;
 declare const VOICEMACRO_1_Sc_1_FEMALE: string;
 declare const VOICEMACRO_1_Ta_0: string;
 declare const VOICEMACRO_1_Ta_0_FEMALE: string;
 declare const VOICEMACRO_1_Ta_1: string;
 declare const VOICEMACRO_1_Ta_1_FEMALE: string;
 declare const VOICEMACRO_1_Ta_2_FEMALE: string;
 declare const VOICEMACRO_1_Tr_0: string;
 declare const VOICEMACRO_1_Tr_0_FEMALE: string;
 declare const VOICEMACRO_1_Tr_1: string;
 declare const VOICEMACRO_1_Tr_1_FEMALE: string;
 declare const VOICEMACRO_20_Dw_0: string;
 declare const VOICEMACRO_20_Dw_0_FEMALE: string;
 declare const VOICEMACRO_20_Dw_1: string;
 declare const VOICEMACRO_20_Dw_1_FEMALE: string;
 declare const VOICEMACRO_20_Dw_2: string;
 declare const VOICEMACRO_20_Dw_2_FEMALE: string;
 declare const VOICEMACRO_20_Dw_3: string;
 declare const VOICEMACRO_20_Dw_3_FEMALE: string;
 declare const VOICEMACRO_20_Dw_4: string;
 declare const VOICEMACRO_20_Dw_4_FEMALE: string;
 declare const VOICEMACRO_20_Dw_5: string;
 declare const VOICEMACRO_20_Dw_5_FEMALE: string;
 declare const VOICEMACRO_20_Dw_6: string;
 declare const VOICEMACRO_20_Gn_0: string;
 declare const VOICEMACRO_20_Gn_0_FEMALE: string;
 declare const VOICEMACRO_20_Gn_1: string;
 declare const VOICEMACRO_20_Gn_1_FEMALE: string;
 declare const VOICEMACRO_20_Gn_2: string;
 declare const VOICEMACRO_20_Gn_2_FEMALE: string;
 declare const VOICEMACRO_20_Gn_3: string;
 declare const VOICEMACRO_20_Gn_3_FEMALE: string;
 declare const VOICEMACRO_20_Gn_4: string;
 declare const VOICEMACRO_20_Gn_5: string;
 declare const VOICEMACRO_20_Hu_0: string;
 declare const VOICEMACRO_20_Hu_0_FEMALE: string;
 declare const VOICEMACRO_20_Hu_1: string;
 declare const VOICEMACRO_20_Hu_1_FEMALE: string;
 declare const VOICEMACRO_20_Hu_2: string;
 declare const VOICEMACRO_20_Hu_2_FEMALE: string;
 declare const VOICEMACRO_20_Hu_3: string;
 declare const VOICEMACRO_20_Hu_3_FEMALE: string;
 declare const VOICEMACRO_20_Hu_4: string;
 declare const VOICEMACRO_20_Hu_4_FEMALE: string;
 declare const VOICEMACRO_20_Hu_5: string;
 declare const VOICEMACRO_20_Hu_5_FEMALE: string;
 declare const VOICEMACRO_20_Hu_6_FEMALE: string;
 declare const VOICEMACRO_20_Ni_0: string;
 declare const VOICEMACRO_20_Ni_0_FEMALE: string;
 declare const VOICEMACRO_20_Ni_1: string;
 declare const VOICEMACRO_20_Ni_1_FEMALE: string;
 declare const VOICEMACRO_20_Ni_2: string;
 declare const VOICEMACRO_20_Ni_2_FEMALE: string;
 declare const VOICEMACRO_20_Ni_3: string;
 declare const VOICEMACRO_20_Ni_3_FEMALE: string;
 declare const VOICEMACRO_20_Ni_4: string;
 declare const VOICEMACRO_20_Ni_4_FEMALE: string;
 declare const VOICEMACRO_20_Ni_5: string;
 declare const VOICEMACRO_20_Ni_6: string;
 declare const VOICEMACRO_20_Ni_7: string;
 declare const VOICEMACRO_20_Or_0: string;
 declare const VOICEMACRO_20_Or_0_FEMALE: string;
 declare const VOICEMACRO_20_Or_1: string;
 declare const VOICEMACRO_20_Or_1_FEMALE: string;
 declare const VOICEMACRO_20_Or_2: string;
 declare const VOICEMACRO_20_Or_2_FEMALE: string;
 declare const VOICEMACRO_20_Or_3: string;
 declare const VOICEMACRO_20_Or_3_FEMALE: string;
 declare const VOICEMACRO_20_Or_4: string;
 declare const VOICEMACRO_20_Or_4_FEMALE: string;
 declare const VOICEMACRO_20_Or_5: string;
 declare const VOICEMACRO_20_Or_5_FEMALE: string;
 declare const VOICEMACRO_20_Sc_0: string;
 declare const VOICEMACRO_20_Sc_0_FEMALE: string;
 declare const VOICEMACRO_20_Sc_1: string;
 declare const VOICEMACRO_20_Sc_1_FEMALE: string;
 declare const VOICEMACRO_20_Sc_2: string;
 declare const VOICEMACRO_20_Sc_2_FEMALE: string;
 declare const VOICEMACRO_20_Sc_3: string;
 declare const VOICEMACRO_20_Sc_3_FEMALE: string;
 declare const VOICEMACRO_20_Sc_4: string;
 declare const VOICEMACRO_20_Sc_4_FEMALE: string;
 declare const VOICEMACRO_20_Sc_5_FEMALE: string;
 declare const VOICEMACRO_20_Sc_6_FEMALE: string;
 declare const VOICEMACRO_20_Sc_7_FEMALE: string;
 declare const VOICEMACRO_20_Ta_0: string;
 declare const VOICEMACRO_20_Ta_0_FEMALE: string;
 declare const VOICEMACRO_20_Ta_1: string;
 declare const VOICEMACRO_20_Ta_1_FEMALE: string;
 declare const VOICEMACRO_20_Ta_2: string;
 declare const VOICEMACRO_20_Ta_2_FEMALE: string;
 declare const VOICEMACRO_20_Ta_3: string;
 declare const VOICEMACRO_20_Ta_3_FEMALE: string;
 declare const VOICEMACRO_20_Ta_4: string;
 declare const VOICEMACRO_20_Tr_0: string;
 declare const VOICEMACRO_20_Tr_0_FEMALE: string;
 declare const VOICEMACRO_20_Tr_1: string;
 declare const VOICEMACRO_20_Tr_1_FEMALE: string;
 declare const VOICEMACRO_20_Tr_2: string;
 declare const VOICEMACRO_20_Tr_2_FEMALE: string;
 declare const VOICEMACRO_20_Tr_3: string;
 declare const VOICEMACRO_20_Tr_3_FEMALE: string;
 declare const VOICEMACRO_20_Tr_4: string;
 declare const VOICEMACRO_20_Tr_4_FEMALE: string;
 declare const VOICEMACRO_20_Tr_5: string;
 declare const VOICEMACRO_2_Dw_0: string;
 declare const VOICEMACRO_2_Dw_0_FEMALE: string;
 declare const VOICEMACRO_2_Dw_1: string;
 declare const VOICEMACRO_2_Dw_1_FEMALE: string;
 declare const VOICEMACRO_2_Gn_0: string;
 declare const VOICEMACRO_2_Gn_0_FEMALE: string;
 declare const VOICEMACRO_2_Gn_1: string;
 declare const VOICEMACRO_2_Gn_1_FEMALE: string;
 declare const VOICEMACRO_2_Gn_2: string;
 declare const VOICEMACRO_2_Hu_0: string;
 declare const VOICEMACRO_2_Hu_0_FEMALE: string;
 declare const VOICEMACRO_2_Hu_1: string;
 declare const VOICEMACRO_2_Hu_1_FEMALE: string;
 declare const VOICEMACRO_2_Ni_0: string;
 declare const VOICEMACRO_2_Ni_0_FEMALE: string;
 declare const VOICEMACRO_2_Ni_1: string;
 declare const VOICEMACRO_2_Ni_1_FEMALE: string;
 declare const VOICEMACRO_2_Ni_2_FEMALE: string;
 declare const VOICEMACRO_2_Or_0: string;
 declare const VOICEMACRO_2_Or_0_FEMALE: string;
 declare const VOICEMACRO_2_Or_1: string;
 declare const VOICEMACRO_2_Or_1_FEMALE: string;
 declare const VOICEMACRO_2_Or_2: string;
 declare const VOICEMACRO_2_Or_2_FEMALE: string;
 declare const VOICEMACRO_2_Sc_0: string;
 declare const VOICEMACRO_2_Sc_0_FEMALE: string;
 declare const VOICEMACRO_2_Sc_1: string;
 declare const VOICEMACRO_2_Sc_1_FEMALE: string;
 declare const VOICEMACRO_2_Ta_0: string;
 declare const VOICEMACRO_2_Ta_0_FEMALE: string;
 declare const VOICEMACRO_2_Ta_1: string;
 declare const VOICEMACRO_2_Ta_1_FEMALE: string;
 declare const VOICEMACRO_2_Ta_2: string;
 declare const VOICEMACRO_2_Tr_0: string;
 declare const VOICEMACRO_2_Tr_0_FEMALE: string;
 declare const VOICEMACRO_2_Tr_1: string;
 declare const VOICEMACRO_2_Tr_1_FEMALE: string;
 declare const VOICEMACRO_3_Dw_0: string;
 declare const VOICEMACRO_3_Dw_0_FEMALE: string;
 declare const VOICEMACRO_3_Dw_1: string;
 declare const VOICEMACRO_3_Dw_1_FEMALE: string;
 declare const VOICEMACRO_3_Dw_2: string;
 declare const VOICEMACRO_3_Gn_0: string;
 declare const VOICEMACRO_3_Gn_0_FEMALE: string;
 declare const VOICEMACRO_3_Gn_1: string;
 declare const VOICEMACRO_3_Gn_1_FEMALE: string;
 declare const VOICEMACRO_3_Gn_2: string;
 declare const VOICEMACRO_3_Gn_2_FEMALE: string;
 declare const VOICEMACRO_3_Hu_0: string;
 declare const VOICEMACRO_3_Hu_0_FEMALE: string;
 declare const VOICEMACRO_3_Hu_1: string;
 declare const VOICEMACRO_3_Hu_1_FEMALE: string;
 declare const VOICEMACRO_3_Ni_0: string;
 declare const VOICEMACRO_3_Ni_0_FEMALE: string;
 declare const VOICEMACRO_3_Ni_1: string;
 declare const VOICEMACRO_3_Ni_1_FEMALE: string;
 declare const VOICEMACRO_3_Or_0: string;
 declare const VOICEMACRO_3_Or_0_FEMALE: string;
 declare const VOICEMACRO_3_Or_1: string;
 declare const VOICEMACRO_3_Or_1_FEMALE: string;
 declare const VOICEMACRO_3_Sc_0: string;
 declare const VOICEMACRO_3_Sc_0_FEMALE: string;
 declare const VOICEMACRO_3_Sc_1: string;
 declare const VOICEMACRO_3_Sc_1_FEMALE: string;
 declare const VOICEMACRO_3_Ta_0: string;
 declare const VOICEMACRO_3_Ta_0_FEMALE: string;
 declare const VOICEMACRO_3_Ta_1: string;
 declare const VOICEMACRO_3_Ta_1_FEMALE: string;
 declare const VOICEMACRO_3_Tr_0: string;
 declare const VOICEMACRO_3_Tr_0_FEMALE: string;
 declare const VOICEMACRO_3_Tr_1: string;
 declare const VOICEMACRO_3_Tr_1_FEMALE: string;
 declare const VOICEMACRO_4_Dw_0: string;
 declare const VOICEMACRO_4_Dw_0_FEMALE: string;
 declare const VOICEMACRO_4_Dw_1: string;
 declare const VOICEMACRO_4_Dw_1_FEMALE: string;
 declare const VOICEMACRO_4_Dw_2: string;
 declare const VOICEMACRO_4_Gn_0: string;
 declare const VOICEMACRO_4_Gn_0_FEMALE: string;
 declare const VOICEMACRO_4_Gn_1: string;
 declare const VOICEMACRO_4_Gn_1_FEMALE: string;
 declare const VOICEMACRO_4_Hu_0: string;
 declare const VOICEMACRO_4_Hu_0_FEMALE: string;
 declare const VOICEMACRO_4_Hu_1: string;
 declare const VOICEMACRO_4_Hu_1_FEMALE: string;
 declare const VOICEMACRO_4_Ni_0: string;
 declare const VOICEMACRO_4_Ni_0_FEMALE: string;
 declare const VOICEMACRO_4_Ni_1: string;
 declare const VOICEMACRO_4_Ni_1_FEMALE: string;
 declare const VOICEMACRO_4_Ni_2_FEMALE: string;
 declare const VOICEMACRO_4_Or_0: string;
 declare const VOICEMACRO_4_Or_0_FEMALE: string;
 declare const VOICEMACRO_4_Or_1: string;
 declare const VOICEMACRO_4_Or_1_FEMALE: string;
 declare const VOICEMACRO_4_Or_2: string;
 declare const VOICEMACRO_4_Or_2_FEMALE: string;
 declare const VOICEMACRO_4_Sc_0: string;
 declare const VOICEMACRO_4_Sc_0_FEMALE: string;
 declare const VOICEMACRO_4_Sc_1: string;
 declare const VOICEMACRO_4_Sc_1_FEMALE: string;
 declare const VOICEMACRO_4_Ta_0: string;
 declare const VOICEMACRO_4_Ta_0_FEMALE: string;
 declare const VOICEMACRO_4_Ta_1: string;
 declare const VOICEMACRO_4_Ta_1_FEMALE: string;
 declare const VOICEMACRO_4_Tr_0: string;
 declare const VOICEMACRO_4_Tr_0_FEMALE: string;
 declare const VOICEMACRO_4_Tr_1: string;
 declare const VOICEMACRO_4_Tr_1_FEMALE: string;
 declare const VOICEMACRO_5_Dw_0: string;
 declare const VOICEMACRO_5_Dw_0_FEMALE: string;
 declare const VOICEMACRO_5_Dw_1: string;
 declare const VOICEMACRO_5_Dw_1_FEMALE: string;
 declare const VOICEMACRO_5_Gn_0: string;
 declare const VOICEMACRO_5_Gn_0_FEMALE: string;
 declare const VOICEMACRO_5_Gn_1: string;
 declare const VOICEMACRO_5_Gn_1_FEMALE: string;
 declare const VOICEMACRO_5_Hu_0: string;
 declare const VOICEMACRO_5_Hu_0_FEMALE: string;
 declare const VOICEMACRO_5_Hu_1: string;
 declare const VOICEMACRO_5_Hu_1_FEMALE: string;
 declare const VOICEMACRO_5_Ni_0: string;
 declare const VOICEMACRO_5_Ni_0_FEMALE: string;
 declare const VOICEMACRO_5_Ni_1: string;
 declare const VOICEMACRO_5_Ni_1_FEMALE: string;
 declare const VOICEMACRO_5_Or_0: string;
 declare const VOICEMACRO_5_Or_0_FEMALE: string;
 declare const VOICEMACRO_5_Or_1: string;
 declare const VOICEMACRO_5_Or_1_FEMALE: string;
 declare const VOICEMACRO_5_Sc_0: string;
 declare const VOICEMACRO_5_Sc_0_FEMALE: string;
 declare const VOICEMACRO_5_Sc_1: string;
 declare const VOICEMACRO_5_Sc_1_FEMALE: string;
 declare const VOICEMACRO_5_Ta_0: string;
 declare const VOICEMACRO_5_Ta_0_FEMALE: string;
 declare const VOICEMACRO_5_Ta_1: string;
 declare const VOICEMACRO_5_Ta_1_FEMALE: string;
 declare const VOICEMACRO_5_Tr_0: string;
 declare const VOICEMACRO_5_Tr_0_FEMALE: string;
 declare const VOICEMACRO_5_Tr_1: string;
 declare const VOICEMACRO_5_Tr_1_FEMALE: string;
 declare const VOICEMACRO_6_Dw_0: string;
 declare const VOICEMACRO_6_Dw_0_FEMALE: string;
 declare const VOICEMACRO_6_Dw_1: string;
 declare const VOICEMACRO_6_Dw_1_FEMALE: string;
 declare const VOICEMACRO_6_Dw_2: string;
 declare const VOICEMACRO_6_Gn_0: string;
 declare const VOICEMACRO_6_Gn_0_FEMALE: string;
 declare const VOICEMACRO_6_Gn_1: string;
 declare const VOICEMACRO_6_Hu_0: string;
 declare const VOICEMACRO_6_Hu_0_FEMALE: string;
 declare const VOICEMACRO_6_Hu_1: string;
 declare const VOICEMACRO_6_Hu_1_FEMALE: string;
 declare const VOICEMACRO_6_Ni_0: string;
 declare const VOICEMACRO_6_Ni_0_FEMALE: string;
 declare const VOICEMACRO_6_Ni_1: string;
 declare const VOICEMACRO_6_Ni_1_FEMALE: string;
 declare const VOICEMACRO_6_Or_0: string;
 declare const VOICEMACRO_6_Or_0_FEMALE: string;
 declare const VOICEMACRO_6_Or_1: string;
 declare const VOICEMACRO_6_Or_1_FEMALE: string;
 declare const VOICEMACRO_6_Sc_0: string;
 declare const VOICEMACRO_6_Sc_0_FEMALE: string;
 declare const VOICEMACRO_6_Sc_1: string;
 declare const VOICEMACRO_6_Sc_1_FEMALE: string;
 declare const VOICEMACRO_6_Ta_0: string;
 declare const VOICEMACRO_6_Ta_0_FEMALE: string;
 declare const VOICEMACRO_6_Ta_1: string;
 declare const VOICEMACRO_6_Ta_1_FEMALE: string;
 declare const VOICEMACRO_6_Tr_0: string;
 declare const VOICEMACRO_6_Tr_0_FEMALE: string;
 declare const VOICEMACRO_6_Tr_1: string;
 declare const VOICEMACRO_6_Tr_1_FEMALE: string;
 declare const VOICEMACRO_7_Dw_0: string;
 declare const VOICEMACRO_7_Dw_0_FEMALE: string;
 declare const VOICEMACRO_7_Dw_1: string;
 declare const VOICEMACRO_7_Dw_1_FEMALE: string;
 declare const VOICEMACRO_7_Dw_2: string;
 declare const VOICEMACRO_7_Gn_0: string;
 declare const VOICEMACRO_7_Gn_0_FEMALE: string;
 declare const VOICEMACRO_7_Gn_1: string;
 declare const VOICEMACRO_7_Gn_1_FEMALE: string;
 declare const VOICEMACRO_7_Hu_0: string;
 declare const VOICEMACRO_7_Hu_0_FEMALE: string;
 declare const VOICEMACRO_7_Hu_1: string;
 declare const VOICEMACRO_7_Hu_1_FEMALE: string;
 declare const VOICEMACRO_7_Hu_2: string;
 declare const VOICEMACRO_7_Hu_2_FEMALE: string;
 declare const VOICEMACRO_7_Ni_0: string;
 declare const VOICEMACRO_7_Ni_0_FEMALE: string;
 declare const VOICEMACRO_7_Ni_1: string;
 declare const VOICEMACRO_7_Ni_1_FEMALE: string;
 declare const VOICEMACRO_7_Or_0: string;
 declare const VOICEMACRO_7_Or_0_FEMALE: string;
 declare const VOICEMACRO_7_Or_1: string;
 declare const VOICEMACRO_7_Or_1_FEMALE: string;
 declare const VOICEMACRO_7_Sc_0: string;
 declare const VOICEMACRO_7_Sc_0_FEMALE: string;
 declare const VOICEMACRO_7_Sc_1: string;
 declare const VOICEMACRO_7_Sc_1_FEMALE: string;
 declare const VOICEMACRO_7_Ta_0: string;
 declare const VOICEMACRO_7_Ta_0_FEMALE: string;
 declare const VOICEMACRO_7_Ta_1: string;
 declare const VOICEMACRO_7_Ta_1_FEMALE: string;
 declare const VOICEMACRO_7_Ta_2: string;
 declare const VOICEMACRO_7_Tr_0: string;
 declare const VOICEMACRO_7_Tr_0_FEMALE: string;
 declare const VOICEMACRO_7_Tr_1: string;
 declare const VOICEMACRO_7_Tr_1_FEMALE: string;
 declare const VOICEMACRO_7_Tr_2: string;
 declare const VOICEMACRO_7_Tr_2_FEMALE: string;
 declare const VOICEMACRO_8_Dw_0: string;
 declare const VOICEMACRO_8_Dw_0_FEMALE: string;
 declare const VOICEMACRO_8_Dw_1: string;
 declare const VOICEMACRO_8_Dw_1_FEMALE: string;
 declare const VOICEMACRO_8_Dw_2: string;
 declare const VOICEMACRO_8_Dw_2_FEMALE: string;
 declare const VOICEMACRO_8_Gn_0: string;
 declare const VOICEMACRO_8_Gn_0_FEMALE: string;
 declare const VOICEMACRO_8_Gn_1: string;
 declare const VOICEMACRO_8_Gn_1_FEMALE: string;
 declare const VOICEMACRO_8_Hu_0: string;
 declare const VOICEMACRO_8_Hu_0_FEMALE: string;
 declare const VOICEMACRO_8_Hu_1: string;
 declare const VOICEMACRO_8_Hu_1_FEMALE: string;
 declare const VOICEMACRO_8_Ni_0: string;
 declare const VOICEMACRO_8_Ni_0_FEMALE: string;
 declare const VOICEMACRO_8_Ni_1: string;
 declare const VOICEMACRO_8_Ni_1_FEMALE: string;
 declare const VOICEMACRO_8_Or_0: string;
 declare const VOICEMACRO_8_Or_0_FEMALE: string;
 declare const VOICEMACRO_8_Or_1: string;
 declare const VOICEMACRO_8_Or_1_FEMALE: string;
 declare const VOICEMACRO_8_Sc_0: string;
 declare const VOICEMACRO_8_Sc_0_FEMALE: string;
 declare const VOICEMACRO_8_Sc_1: string;
 declare const VOICEMACRO_8_Sc_1_FEMALE: string;
 declare const VOICEMACRO_8_Ta_0: string;
 declare const VOICEMACRO_8_Ta_0_FEMALE: string;
 declare const VOICEMACRO_8_Ta_1: string;
 declare const VOICEMACRO_8_Ta_1_FEMALE: string;
 declare const VOICEMACRO_8_Tr_0: string;
 declare const VOICEMACRO_8_Tr_0_FEMALE: string;
 declare const VOICEMACRO_8_Tr_1: string;
 declare const VOICEMACRO_8_Tr_1_FEMALE: string;
 declare const VOICEMACRO_8_Tr_2: string;
 declare const VOICEMACRO_8_Tr_2_FEMALE: string;
 declare const VOICEMACRO_LABEL: string;
 declare const VOICEMACRO_LABEL_AID1: string;
 declare const VOICEMACRO_LABEL_ATTACKMYTARGET1: string;
 declare const VOICEMACRO_LABEL_ATTACKMYTARGET2: string;
 declare const VOICEMACRO_LABEL_CHARGE1: string;
 declare const VOICEMACRO_LABEL_CHEER1: string;
 declare const VOICEMACRO_LABEL_CONGRATULATIONS1: string;
 declare const VOICEMACRO_LABEL_CONGRATULATIONS2: string;
 declare const VOICEMACRO_LABEL_CONGRATULATIONS3: string;
 declare const VOICEMACRO_LABEL_FLEE1: string;
 declare const VOICEMACRO_LABEL_FLEE2: string;
 declare const VOICEMACRO_LABEL_FLIRT1: string;
 declare const VOICEMACRO_LABEL_FOLLOW1: string;
 declare const VOICEMACRO_LABEL_FOLLOWME1: string;
 declare const VOICEMACRO_LABEL_FOLLOWME2: string;
 declare const VOICEMACRO_LABEL_FOLLOWME3: string;
 declare const VOICEMACRO_LABEL_GOODBYE1: string;
 declare const VOICEMACRO_LABEL_GOODBYE2: string;
 declare const VOICEMACRO_LABEL_HEALME1: string;
 declare const VOICEMACRO_LABEL_HEALME2: string;
 declare const VOICEMACRO_LABEL_HELLO1: string;
 declare const VOICEMACRO_LABEL_HELP1: string;
 declare const VOICEMACRO_LABEL_HELPME1: string;
 declare const VOICEMACRO_LABEL_HELPME2: string;
 declare const VOICEMACRO_LABEL_INCOMING1: string;
 declare const VOICEMACRO_LABEL_INCOMING2: string;
 declare const VOICEMACRO_LABEL_JOKE1: string;
 declare const VOICEMACRO_LABEL_NO1: string;
 declare const VOICEMACRO_LABEL_OPENFIRE1: string;
 declare const VOICEMACRO_LABEL_OPENFIRE2: string;
 declare const VOICEMACRO_LABEL_OUTOFMANA1: string;
 declare const VOICEMACRO_LABEL_OUTOFMANA2: string;
 declare const VOICEMACRO_LABEL_RASPBERRY1: string;
 declare const VOICEMACRO_LABEL_RASPBERRY2: string;
 declare const VOICEMACRO_LABEL_SILLY1: string;
 declare const VOICEMACRO_LABEL_THANKYOU1: string;
 declare const VOICEMACRO_LABEL_THANKYOU2: string;
 declare const VOICEMACRO_LABEL_THANKYOU3: string;
 declare const VOICEMACRO_LABEL_TRAIN1: string;
 declare const VOICEMACRO_LABEL_WAITHERE1: string;
 declare const VOICEMACRO_LABEL_WAITHERE2: string;
 declare const VOICEMACRO_LABEL_YES1: string;
 declare const VOICEMACRO_LABEL_YOUREWELCOME1: string;
 declare const VOICEMACRO_LABEL_YOUREWELCOME2: string;
 declare const VOICE_ACTIVATED: string;
 declare const VOICE_ACTIVATION_SENSITIVITY: string;
 declare const VOICE_AMBIENCE: string;
 declare const VOICE_CHAT: string;
 declare const VOICE_CHAT_AUDIO_DUCKING: string;
 declare const VOICE_CHAT_BATTLEGROUND: string;
 declare const VOICE_CHAT_MODE: string;
 declare const VOICE_CHAT_NORMAL: string;
 declare const VOICE_CHAT_OPTIONS: string;
 declare const VOICE_CHAT_OUTPUT_DEVICE: string;
 declare const VOICE_CHAT_PARTY_RAID: string;
 declare const VOICE_GAME_DUCKING: string;
 declare const VOICE_INPUT_VOLUME: string;
 declare const VOICE_LABEL: string;
 declare const VOICE_LISTENING: string;
 declare const VOICE_MICROPHONE_TEST: string;
 declare const VOICE_MIC_TEST_PLAY: string;
 declare const VOICE_MIC_TEST_RECORD: string;
 declare const VOICE_MUSIC: string;
 declare const VOICE_OUTPUT_VOLUME: string;
 declare const VOICE_SOUND: string;
 declare const VOICE_SUBTEXT: string;
 declare const VOICE_TALKING: string;
 declare const VOLUME: string;
 declare const VOTE_BOOT_PLAYER: string;
 declare const VOTE_BOOT_REASON_REQUIRED: string;
 declare const VOTE_TO_KICK: string;
 declare const VULNERABLE_TRAILER: string;
 declare const WAISTSLOT: string;
 declare const WARLOCK_INTELLECT_TOOLTIP: string;
 declare const WARRIOR_STRENGTH_TOOLTIP: string;
 declare const WATCHFRAME_LOCK: string;
 declare const WATCH_FRAME_WIDTH_TEXT: string;
 declare const WATER_COLLISION: string;
 declare const WATER_DETAIL: string;
 declare const WEAPON_SKILL_RATING: string;
 declare const WEAPON_SKILL_RATING_BONUS: string;
 declare const WEAPON_SPEED: string;
 declare const WEATHER_DETAIL: string;
 declare const WEEKDAY_FRIDAY: string;
 declare const WEEKDAY_MONDAY: string;
 declare const WEEKDAY_SATURDAY: string;
 declare const WEEKDAY_SUNDAY: string;
 declare const WEEKDAY_THURSDAY: string;
 declare const WEEKDAY_TUESDAY: string;
 declare const WEEKDAY_WEDNESDAY: string;
 declare const WHISPER: string;
 declare const WHISPER_MESSAGE: string;
 declare const WHO: string;
 declare const WHO_FRAME_SHOWN_TEMPLATE: string;
 declare const WHO_FRAME_TOTAL_TEMPLATE: string;
 declare const WHO_LIST: string;
 declare const WHO_LIST_FORMAT: string;
 declare const WHO_LIST_GUILD_FORMAT: string;
 declare const WHO_NUM_RESULTS: string;
 declare const WHO_TAG_CLASS: string;
 declare const WHO_TAG_GUILD: string;
 declare const WHO_TAG_NAME: string;
 declare const WHO_TAG_RACE: string;
 declare const WHO_TAG_ZONE: string;
 declare const WIDESCREEN_TAG: string;
 declare const WIN: string;
 declare const WINDOWED_MAXIMIZED: string;
 declare const WINDOWED_MODE: string;
 declare const WINDOW_LOCK: string;
 declare const WINTERGRASP_IN_PROGRESS: string;
 declare const WIN_LOSS: string;
 declare const WITHDRAW: string;
 declare const WORK_IN_PROGRESS: string;
 declare const WORLDMAP_BUTTON: string;
 declare const WORLD_APPEARANCE: string;
 declare const WORLD_LOD: string;
 declare const WORLD_MAP: string;
 declare const WORLD_PORT_ROOT_TIMER: string;
 declare const WORLD_PVP_DISPLAY: string;
 declare const WORLD_PVP_ENTER: string;
 declare const WORLD_PVP_EXITED_BATTLE: string;
 declare const WORLD_PVP_FAIL: string;
 declare const WORLD_PVP_INVITED: string;
 declare const WORLD_PVP_INVITED_WARMUP: string;
 declare const WORLD_PVP_LOW_LEVEL: string;
 declare const WORLD_PVP_PENDING: string;
 declare const WORLD_PVP_PENDING_REMOTE: string;
 declare const WORLD_PVP_QUEUED: string;
 declare const WORLD_PVP_QUEUED_WARMUP: string;
 declare const WOW_MOUSE: string;
 declare const WOW_MOUSE_NOT_FOUND: string;
 declare const WRISTSLOT: string;
 declare const WRONG_SLOT_FOR_ITEM: string;
 declare const XP: string;
 declare const XPBAR_LABEL: string;
 declare const XP_BAR_TEXT: string;
 declare const XP_TEXT: string;
 declare const YELL: string;
 declare const YELLOW_GEM: string;
 declare const YELL_MESSAGE: string;
 declare const YES: string;
 declare const YOU: string;
 declare const YOUR_BID: string;
 declare const YOUR_CLASS_MAY_NOT_PERFORM_ROLE: string;
 declare const YOUR_ROLE: string;
 declare const YOU_ARE_IN_DUNGEON_GROUP: string;
 declare const YOU_ARE_LISTED_IN_LFR: string;
 declare const YOU_LOOT_MONEY: string;
 declare const YOU_MAY_NOT_QUEUE_FOR_DUNGEON: string;
 declare const YOU_MAY_NOT_QUEUE_FOR_THIS: string;
 declare const YOU_RECEIVED: string;
 declare const ZHCN: string;
 declare const ZHTW: string;
 declare const ZONE: string;
 declare const ZONE_COLON: string;
 declare const ZONE_UNDER_ATTACK: string;
 declare const ZOOM_IN: string;
 declare const ZOOM_OUT: string;
 declare const ZOOM_OUT_BUTTON_TEXT: string;
 declare const _RECORDING_WARNING_CORRUPTED: string;

/**
 * ##################################
 * FRAME MANAGEMENT
 * ##################################
 */

// global frame related functions

/**
 * set the width for the given dropdown frame
 *
 * @param dropdown the dropdown frame
 * @param width the new width
 */
declare function UIDropDownMenu_SetWidth(dropdown: WoWAPI.Frame, width: number): void;

/**
 * set the text for the given dropdown frame
 *
 * @param dropdown the dropdown frame
 * @param text the text to set
 */
declare function UIDropDownMenu_SetText(dropdown: WoWAPI.Frame, text: string): void;

/**
 * initialize the given dropdown frame
 *
 * @param dropdown the dropdown frame
 * @param initFunc the initializer function
 * @param displayMode if "MENU", the visual elements of dropDown will be hidden and the menu, when shown, will be styled as a context menu rather than a dropdown list
 */
declare function UIDropDownMenu_Initialize(dropdown: WoWAPI.Frame, initFunc: (self: WoWAPI.Frame, level: number, menuList: object) => void, displayMode?: WoWAPI.UIDropDownMenuDisplayMode, level?: number, menuList?: object): void;

/**
 * create an info object for a dropdown element
 */
declare function UIDropDownMenu_CreateInfo(): WoWAPI.UIDropdownInfo;

/**
 * add the given info object to the current inizialized dropdown frame
 *
 * @param info the info to add
 * @param level nesting level to which the menu item should be added. If 1, the menu item will be added to the outer-most menu level; 2 will add it to the first open sub-menu, 3 to the second open sub-menu, etc.
 */
declare function UIDropDownMenu_AddButton(info: WoWAPI.UIDropdownInfo, level?: number): void;

/**
 * Toggles a dropdown menu
 * 
 * @param level Nesting level of this dropdown
 * @param value Custom value for the dropdown item, if 'level' > 1
 * @param dropDownFrame The frame object to toggle, not its string name. This object should be derived from 'UIDropDownMenuTemplate'
 * @param anchorName Sets the 'relativeTo' member of this frame
 * @param xOffset Sets the x offset
 * @param yOffset Sets the y offset
 * @param menuList Automatically Passed to the to 'menuList' on the API UIDropDownMenu_Initialize function, and set to 'menuList' member on the dropDownFrame frame table
 * @param button Drop down menu anchor point. Default is 'dropDownFrame' or successive parent dropdown menu button
 * @param autoHideDelay Seconds to delay before hiding an inactive menu. Default is 2.
 */
declare function ToggleDropDownMenu(level: number, value: any, dropDownFrame: WoWAPI.Frame, anchorName?: string | WoWAPI.Frame, xOffset?: number, yOffset?: number, menuList?: object, button?: object, autoHideDelay?: number): void;

declare function PlaySoundFile(path:string): void;
declare function PlaySound(soundIndex:number): void;

/**
 * comma separated list of enabled flags
 */
declare type FontInstanceFlags = "OUTLINE" | "MONOCHROME" | "THICKOUTLINE";
declare type LoopType = "NONE" | "REPEAT" | "BOUNCE";
declare type LoopState = "NONE" | "FORWARD" | "REVERSE";
declare type SmoothType = "IN" | "OUT" | "IN_OUT" | "OUT_IN";
declare type CurveType = "SMOOTH" | "NONE";
declare type ClickType = "LeftButtonUp" | "RightButtonUp" | "MiddleButtonUp" | "Button4Up" | "Button5Up" | "LeftButtonDown" | "RightButtonDown" | "MiddleButtonDown" | "Button4Down" | "Button5Down" | "AnyUp" | "AnyDown";

/**
 * Creates a new UI frame.
 *
 * @param frameType Type of the frame to be created (XML tag name): "Frame", "Button", etc. See UIOBJECT_Frame
 * @param frameName Name of the newly created frame. If nil, no frame name is assigned. The function will also set a global
 * variable of this name to point to the newly created frame.
 * @param parentFrame The frame object that will be used as the created Frame's parent (cannot be a string!) Does not default to UIParent if given nil.
 * @param inheritsFrame a comma-delimited list of names of virtual frames to inherit from (the same as in XML). If nil,
 * no frames will be inherited. These frames cannot be frames that were created using this function,
 * they must be created using XML with virtual="true" in the tag.
 * @param id ID to assign to the frame. See API Frame SetID
 */
declare function CreateFrame(frameType: WoWAPI.FrameType, frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number,): WoWAPI.UIObject;
declare function CreateFrame(frameType: "Frame", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.Frame;
declare function CreateFrame(frameType: "Slider", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.Slider;
declare function CreateFrame(frameType: "EditBox", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.EditBox;
declare function CreateFrame(frameType: "Button", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.Button;
declare function CreateFrame(frameType: "CheckButton", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.CheckButton;
declare function CreateFrame(frameType: "LootButton", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.LootButton;
declare function CreateFrame(frameType: "GameTooltip", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.GameTooltip;
declare function CreateFrame(frameType: "Model", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.Model;
declare function CreateFrame(frameType: "PlayerModel", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.PlayerModel;
declare function CreateFrame(frameType: "DressUpModel", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.DressUpModel;
declare function CreateFrame(frameType: "StatusBar", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.StatusBar;
declare function CreateFrame(frameType: "ScrollFrame", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.ScrollFrame;
declare function CreateFrame(frameType: "ScrollingMessageFrame", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.ScrollingMessageFrame;
declare function CreateFrame(frameType: "Minimap", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.Minimap;
declare function CreateFrame(frameType: "MessageFrame", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.MessageFrame;
declare function CreateFrame(frameType: "Cooldown", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.Cooldown;
declare function CreateFrame(frameType: "ColorSelect", frameName?: string, parentFrame?: WoWAPI.UIObject, inheritsFrame?: string, id?: number): WoWAPI.ColorSelect;

/**
 * Draws a line with the defined texture between two points.
 * @param texture WoWAPI.Texture to use, texture path example "Interface\\TaxiFrame\\UI-Taxi-Line"
 * @param canvasFrame Canvas Frame (for anchoring)
 * @param sx X position for the start point of the line
 * @param sy Y position for the start point of the line
 * @param ex X position for the end point of the line
 * @param ey Y position for the end point of the line
 * @param width Width of the line
 * @param relPoint Relative point on canvas to interpret coords (Default BOTTOMLEFT)
 */
declare function DrawRouteLine(texture:WoWAPI.Texture, canvasFrame:WoWAPI.Frame, sx:number, sy:number, ex:number, ey:number, width:number, relPoint?:WoWAPI.Point);

/**
 * Adds a configuration panel (with the fields described in #Panel fields below set) to the category list.
 * The optional position argument (number) allows addons to insert top-level panels at arbitrary positions in the category list.
 *
 * @param panel the panel to add
 */
declare function InterfaceOptions_AddCategory(panel: WoWAPI.FrameInterfaceCategory): void;


declare namespace WoWAPI {
    type UnitIdArena = "arena1" | "arena2" | "arena3" | "arena4" | "arena5";
    type UnitIdBoss = "boss1" | "boss2" | "boss3" | "boss4" | "boss5" | "boss6" | "boss7" | "boss8";
    type UnitIdRaidPlayer = "raid1" | "raid2" | "raid3" | "raid4" | "raid5" | "raid6" | "raid7" | "raid8" | "raid9" |
        "raid10" | "raid11" | "raid12" | "raid13" | "raid14" | "raid15" | "raid16" | "raid17" | "raid18" | "raid19" | "raid20" |
        "raid21" | "raid22" | "raid23" | "raid24" | "raid25" | "raid26" | "raid27" | "raid28" | "raid29" | "raid30" | "raid31" |
        "raid32" | "raid33" | "raid34" | "raid35" | "raid36" | "raid37" | "raid38" | "raid39" | "raid40";
    type UnitIdRaidPlayerPet = "raidpet1" | "raidpet2" | "raidpet3" | "raidpet4" | "raidpet5" | "raidpet6" | "raidpet7" | "raidpet8" | "raidpet9" |
                               "raidpet10" | "raidpet11" | "raidpet12" | "raidpet13" | "raidpet14" | "raidpet15" | "raidpet16" | "raidpet17" | "raidpet18" |
                               "raidpet19" | "raidpet20" | "raidpet21" | "raidpet22" | "raidpet23" | "raidpet24" | "raidpet25" | "raidpet26" | "raidpet27" |
                               "raidpet28" | "raidpet29" | "raidpet30" | "raidpet31" | "raidpet32" | "raidpet33" | "raidpet34" | "raidpet35" | "raidpet36" |
                               "raidpet37" | "raidpet38" | "raidpet39" | "raidpet40";
    type UnitIdParty = "party1" | "party2" | "party3" | "party4";
    type UnitIdPartyPet = "partypet1" | "partypet2" | "partypet3" | "partypet4";
    type UnitIdOther = "player" | "pet" | "focus" | "mouseover" | "vehicle" | "target" | "none" | "npc" | "targettarget";
    type UnitId = UnitIdOther | UnitIdArena | UnitIdBoss | UnitIdRaidPlayer | UnitIdRaidPlayerPet | UnitIdParty | UnitIdPartyPet;

    type UnitRoleType = "TANK" | "DAMAGER" | "HEALER";

    type Guid = string;
}

/**
 * Returns the GUID of the specified unit
 * @param unitId unit to look up the GUID of
 * @see https://wow.gamepedia.com/API_UnitGUID
 * @since 2.4.0
 */
declare function UnitGUID(unitId: WoWAPI.UnitId): WoWAPI.Guid;

/**
 * Returns basic information about another player from their GUID
 * @param unitGUID The GUID of the player you're querying about
 * @see https://wow.gamepedia.com/API_GetPlayerInfoByGUID
 * @since 3.2.0
 */
declare function GetPlayerInfoByGUID(unitGUID: WoWAPI.Guid): LuaMultiReturn<[string, number, string, number, number, string, string]>;

/**
 * Returns the name and realm of the specified unit
 * @param unitId The UnitId to query (e.g. "player", "party2", "pet", "target" etc.)
 * @see https://wow.gamepedia.com/API_GetUnitName
 */
declare function GetUnitName(unitId: WoWAPI.UnitId, showServerName: boolean): string;

/**
 * Determines if the unit exists
 * @param unitId The unit to query (e.g. "player", "party2", "pet", "target" etc.)
 * @see https://wow.gamepedia.com/API_UnitExists
 */
declare function UnitExists(unitId: WoWAPI.UnitId): 1 | null;

/**
 * Checks if a specified unit is a player
 * @param unitId UnitId of the unit to check.
 * @see https://wow.gamepedia.com/API_UnitIsPlayer
 */
declare function UnitIsPlayer(unitId: WoWAPI.UnitId): boolean;

/**
 * Returns the number of skill lines in the skill window, including headers.
 * @see https://wowpedia.fandom.com/wiki/API_GetNumSkillLines
 */
declare function GetNumSkillLines(): number

/**
 * Returns information on a skill line/header.
 * @argument index The index of a line in the skills window, can be a header or skill line. Indices can change depending on collapsed/expanded headers.
 * @returns
 * 1. skillName - string - Name of the skill line.
 * 2. header - number - Returns 1 if the line is a header, nil otherwise.
 * 3. isExpanded - number - Returns 1 if the line is a header and expanded, nil otherwise.
 * 4. skillRank - number - The current rank for the skill, 0 if not applicable.
 * 5. numTempPoints - number - Temporary points for the current skill.
 * 6. skillModifier - number - Skill modifier value for the current skill.
 * 7. skillMaxRank - number - The maximum rank for the current skill. If this is 1 the skill is a proficiency.
 * 8. isAbandonable - number - Returns 1 if this skill can be unlearned, nil otherwise.
 * 9. stepCost - number - Returns 1 if skill can be learned, nil otherwise.
 * 10. rankCost - number - Returns 1 if skill can be trained, nil otherwise.
 * 11. minLevel - number - Minimum level required to learn this skill.
 * 12. skillCostType - number
 * 13. skillDescription - string - Localized skill description text
 */
declare function GetSkillLineInfo(index: number): LuaMultiReturn<[string,number,number,number,number,number,number,number,number,number,number,number,string]>
 
/**
 * Returns the unit's level
 * @param unitId The unitId to get information from. (e.g. "player", "target")
 * @return The unit level. Returns -1 for bosses, or players more than 10 levels above the player
 * @see https://wow.gamepedia.com/API_UnitEffectiveLevel
 */
declare function UnitLevel(unitId: WoWAPI.UnitId): number;

/**
 * Get the name of the faction (Horde/Alliance) a unit belongs to
 * @param unitId unit you want to get the faction for
 * @see https://wow.gamepedia.com/API_UnitFactionGroup
 */
declare function UnitFactionGroup(unitId: WoWAPI.UnitId): LuaMultiReturn<[string, string]>;

/**
 * Returns the class of the specified unit
 * @param unitId unit to query, e.g. "player"
 * @see https://wow.gamepedia.com/API_UnitClass
 */
declare function UnitClass(unitId: WoWAPI.UnitId): LuaMultiReturn<[string, string, number]>;

/**
 * Returns the current health of the specified unit
 * @param unitId identifies the unit to query health for
 * @see https://wow.gamepedia.com/API_UnitHealth
 */
declare function UnitHealth(unitId: WoWAPI.UnitId): number;

/**
 * Returns the maximum health of the specified unit
 * @param unitId the unit whose max health to query
 * @see https://wow.gamepedia.com/API_UnitHealthMax
 */
declare function UnitHealthMax(unitId: WoWAPI.UnitId): number;

/**
 * Returns 1 if the unit is a player in your party, nil otherwise
 * @param unitId unitId who should be checked
 * @see https://wow.gamepedia.com/API_UnitInParty
 */
declare function UnitInParty(unitId: WoWAPI.UnitId): boolean;

// Json
declare class TSJsonObject {
    setBool(key: string, value: boolean): this;
    getBool(key: string, def?: boolean): boolean;
    hasBool(key: string): boolean;

    setNumber(key: string, value: double): this;
    getNumber(key: string, def?: double): double;
    hasNumber(key: string): boolean;

    setString(key: string, value: string): this;
    getString(key: string, def?: string): string;
    hasString(key: string): boolean;

    setObject(key: string, value: TSJsonObject): this;
    getObject(key: string, def?: TSJsonObject): TSJsonObject;
    hasObject(key: string): boolean;

    setArray(key: string, value: TSJsonArray): this;
    getArray(key: string, def?: TSJsonArray): TSJsonArray;
    hasArray(key: string): boolean;

    setNull(key: string): this;
    hasNull(key: string): bool

    remove(key: string): this;
    toString(): string;
    isValid(): boolean
    get length(): uint32
}

declare class TSJsonArray {
    setBool(index: uint32, value: bool): this;
    getBool(index: uint32, def?: bool): bool;
    hasBool(index: uint32): bool;
    insertBool(index: uint32, value: bool): this;
    pushBool(value: bool): this;

    setNumber(index: uint32, value: double): this;
    getNumber(index: uint32, def?: double): double;
    hasNumber(index: uint32): bool;
    insertNumber(index: uint32, value: double): this;
    pushNumber(value: double): this;

    setString(index: uint32, value: string): this;
    getString(index: uint32, def?: string): string;
    hasString(index: uint32): bool;
    insertString(index: uint32, value: string): this;
    pushString(value: string): this;

    setObject(index: uint32, value: TSJsonObject): this;
    getObject(index: uint32, def?: TSJsonObject): TSJsonObject;
    hasObject(index: uint32): bool;
    insertObject(index: uint32, value: TSJsonObject): this;
    pushObject(value: TSJsonObject): this;

    setArray(index: uint32, value: TSJsonArray): this;
    getArray(index: uint32, def?: TSJsonArray): TSJsonArray;
    hasArray(index: uint32): bool;
    insertArray(index: uint32, value: TSJsonArray): this;
    pushArray(value: TSJsonArray): this;

    setNull(index: uint32): this;
    hasNull(index: uint32): bool
    insertNull(index: uint32): this
    pushNull(index: uint32): this

    remove(index: uint32): this;
    toString(): string;
    isValid(): boolean
    get length(): uint32;
}

declare const TSJSON: {
    parseObject(str: string): TSJsonObject,
    parseArray(str: string): TSJsonArray,
}



declare function CreateCustomPacket(opcode: uint32, size: uint32): TSPacketWrite;
declare function OnCustomPacket(opcode: uint32, callback: (packet: TSPacketRead)=>void)
declare class TSPacketWrite {
    WriteUInt8(value: uint8): TSPacketWrite;
    WriteInt8(value: int8): TSPacketWrite;

    WriteUInt16(value: uint16): TSPacketWrite;
    WriteInt16(value: int16): TSPacketWrite;

    WriteUInt16(value: uint16): TSPacketWrite;
    WriteInt16(value: int16): TSPacketWrite;

    WriteUInt32(value: uint32): TSPacketWrite;
    WriteInt32(value: int32): TSPacketWrite;

    WriteUInt64(value: uint64): TSPacketWrite;
    WriteInt64(value: int64): TSPacketWrite;

    WriteFloat(value: float): TSPacketWrite;
    WriteDouble(value: double): TSPacketWrite;

    WriteString(value: string): TSPacketWrite;

    Size(): uint32

    Send(): void
}

declare class TSPacketRead {
    ReadUInt8(def?: uint8): uint8;
    ReadInt8(def?: int8): int8;

    ReadUInt16(def?: uint16): uint16;
    ReadInt16(def?: int16): int16;

    ReadUInt32(def?: uint32): uint32;
    ReadInt32(def?: int32): int32;

    ReadUInt64(def?: uint64): uint64;
    ReadInt64(def?: int64): int64;

    ReadFloat(def?: float): float;
    ReadDouble(def?: double): double;

    ReadString(def?: string): string;

    Size(): uint32
}

declare function UTAG(mod: string, name: string): number
declare function TAG(mod: string, name: string): number[]
declare function HAS_TAG(id: number, mod: string, name: string);
