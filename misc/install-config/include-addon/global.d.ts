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
    interface GameTooltip extends UIObject, GameTooltipHookScript, GameTooltipSetScript {

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

        RegisterForClicks(clickType:ClickType): void;

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
        RegisterForClicks(clickType: ClickType): void;
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
declare function tonumber(value: string|number, radix?:number): number

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
