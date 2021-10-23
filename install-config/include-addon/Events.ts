
/*
 * MIT License
 * Copyright (c) 2021 TSWoW
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

class EventHolder {
    events: {[key: string]: ((...args: any[])=>void)[]} = {}
    messageEvents: {[key: number]: ((...args: any[])=>void)[]} = {}

    registeredAddonMessage = false;
    registeredBufferedMessage = false;

    constructor() {
    }
}

const eventHolders : {[key:string]:EventHolder}= {}

const messageHolders: {[id: number]:new ()=> any} = {};

export function addConstructor(con: any) {
    messageHolders[con.GetID()] = con;
}

export function addEvent(frame: any, name: string, callback: (...args: any[])=>void) {
    if(eventHolders[frame.GetName()]===undefined) {
        let holder = eventHolders[frame.GetName()] = new EventHolder();
        frame.SetScript('OnEvent',(frameInner: any,eventName: any,...args: any[])=>{
            for(let event of holder.events[eventName]) {
                event(__TS__Unpack(args));
            }
        });
    }

    let holder = eventHolders[frame.GetName()];
    if(holder.events[name]===undefined) {
        holder.events[name] = []
    }
    frame.RegisterEvent(name);
    holder.events[name].push(callback);
}

export const Events = {
    AchievementInfo: {
        /**
         *
         * Patch added: 3.0.3
         *
         * @param achievementID The id of the achievement gained.
         * @param alreadyEarned (nilable)
         */
        OnAchievementEarned(frame: WoWAPI.Frame, callback: (achievementID: number,alreadyEarned?: boolean)=>void) { addEvent(frame,'ACHIEVEMENT_EARNED',callback)},

        /**
         * Fires several times at once, presumably for different levels of achievements and yet-unknown feats of strength, but this has yet to be confirmed and there may be another use for this event.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCriteriaUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CRITERIA_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param GUID|guid Reference to the player character for whom achievement info is now ready
         */
        OnInspectAchievementReady(frame: WoWAPI.Frame, callback: (guid: string)=>void) { addEvent(frame,'INSPECT_ACHIEVEMENT_READY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnReceivedAchievementList(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'RECEIVED_ACHIEVEMENT_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param achievementID
         */
        OnReceivedAchievementMemberList(frame: WoWAPI.Frame, callback: (achievementID: number)=>void) { addEvent(frame,'RECEIVED_ACHIEVEMENT_MEMBER_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param achievementID
         * @param criteriaID (nilable)
         * @param elapsed (nilable) - Actual time
         * @param duration (nilable) - Time limit
         */
        OnTrackedAchievementUpdate(frame: WoWAPI.Frame, callback: (achievementID: number,criteriaID?: number,elapsed?: number,duration?: number)=>void) { addEvent(frame,'TRACKED_ACHIEVEMENT_UPDATE',callback)},
    },
    ActionBar: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnActionbarHidegrid(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ACTIONBAR_HIDEGRID',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnActionbarPageChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ACTIONBAR_PAGE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnActionbarShowgrid(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ACTIONBAR_SHOWGRID',callback)},

        /**
         * On 4/24/2006, [[Slouken]] stated "ACTIONBAR_SLOT_CHANGED is also sent whenever something changes whether or not the button should be dimmed. The first argument is the slot which changed." This means actions that affect the internal fields of action bar buttons also generate this event for the affected button(s). Examples include the Start and End of casting channeled spells, casting a new buff on yourself, and the cancellation or expiration of a buff on yourself.
         *
         * Patch added: ?
         *
         * @param slot
         */
        OnActionbarSlotChanged(frame: WoWAPI.Frame, callback: (slot: number)=>void) { addEvent(frame,'ACTIONBAR_SLOT_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnActionbarUpdateCooldown(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ACTIONBAR_UPDATE_COOLDOWN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnActionbarUpdateState(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ACTIONBAR_UPDATE_STATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnActionbarUpdateUsable(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ACTIONBAR_UPDATE_USABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBarUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BAR_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateBonusActionbar(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_BONUS_ACTIONBAR',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateExtraActionbar(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_EXTRA_ACTIONBAR',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateMultiCastActionbar(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_MULTI_CAST_ACTIONBAR',callback)},
    },
    AddOns: {
        /**
         *
         * Patch added: ?
         *
         * @param addOnName
         */
        OnAddonLoaded(frame: WoWAPI.Frame, callback: (addOnName: string)=>void) { addEvent(frame,'ADDON_LOADED',callback)},
    },
    ArtifactUI: {
        /**
         *
         * Patch added: ?
         *
         * @param newItem
         */
        OnArtifactUpdate(frame: WoWAPI.Frame, callback: (newItem: boolean)=>void) { addEvent(frame,'ARTIFACT_UPDATE',callback)},
    },
    AuctionHouse: {
        /**
         * It appears to fire twice, but the reason is unknown.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAuctionHouseClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AUCTION_HOUSE_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAuctionHouseDisabled(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AUCTION_HOUSE_DISABLED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param auctionID
         */
        OnAuctionHouseNewBidReceived(frame: WoWAPI.Frame, callback: (auctionID: number)=>void) { addEvent(frame,'AUCTION_HOUSE_NEW_BID_RECEIVED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAuctionHouseShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AUCTION_HOUSE_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAuctionMultisellFailure(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AUCTION_MULTISELL_FAILURE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param numRepetitions total number of stacks the client has to list.
         */
        OnAuctionMultisellStart(frame: WoWAPI.Frame, callback: (numRepetitions: number)=>void) { addEvent(frame,'AUCTION_MULTISELL_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param createdCount number of stacks listed so far.
         * @param totalToCreate total number of stacks in the current mass-listing operation.
         */
        OnAuctionMultisellUpdate(frame: WoWAPI.Frame, callback: (createdCount: number,totalToCreate: number)=>void) { addEvent(frame,'AUCTION_MULTISELL_UPDATE',callback)},
    },
    Bank: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBankframeClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BANKFRAME_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBankframeOpened(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BANKFRAME_OPENED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerbankbagslotsChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYERBANKBAGSLOTS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param slot When (slot &lt;= NUM_BANKGENERIC_SLOTS), slot is the index of the generic bank slot that changed.  When (slot > NUM_BANKGENERIC_SLOTS), (slot - NUM_BANKGENERIC_SLOTS) is the index of the equipped bank bag that changed.
         */
        OnPlayerbankslotsChanged(frame: WoWAPI.Frame, callback: (slot: number)=>void) { addEvent(frame,'PLAYERBANKSLOTS_CHANGED',callback)},
    },
    BarberShop: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBarberShopAppearanceApplied(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BARBER_SHOP_APPEARANCE_APPLIED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBarberShopClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BARBER_SHOP_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBarberShopOpen(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BARBER_SHOP_OPEN',callback)},
    },
    BattlePet: {
        /**
         * This event fires twice at the very end of a pet battle, instructing the client to transition back to normal character controls.
          *
         ** The &lt;code>[petbattle]&lt;/code> [[macro conditional]] evaluates to true during the first firing, and false during the second.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBattleClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BATTLE_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param owner Team index of the team that won the pet battle; 1 for the player's team, 2 for the opponent.
         */
        OnPetBattleFinalRound(frame: WoWAPI.Frame, callback: (owner: number)=>void) { addEvent(frame,'PET_BATTLE_FINAL_ROUND',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBattleOver(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BATTLE_OVER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param owner index of the team the active pet of which has changed.
         */
        OnPetBattlePetChanged(frame: WoWAPI.Frame, callback: (owner: number)=>void) { addEvent(frame,'PET_BATTLE_PET_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param owner team to which the pet belongs, 1 for the player's team, 2 for the opponent.
         * @param petIndex pet index within the team.
         * @param xpChange amount of XP gained.
         */
        OnPetBattleXpChanged(frame: WoWAPI.Frame, callback: (owner: number,petIndex: number,xpChange: number)=>void) { addEvent(frame,'PET_BATTLE_XP_CHANGED',callback)},
    },
    Calendar: {
        /**
         *
         * Patch added: ?
         *
         * @param pending
         */
        OnCalendarActionPending(frame: WoWAPI.Frame, callback: (pending: boolean)=>void) { addEvent(frame,'CALENDAR_ACTION_PENDING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCalendarCloseEvent(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CALENDAR_CLOSE_EVENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param title
         * @param hour
         * @param minute
         */
        OnCalendarEventAlarm(frame: WoWAPI.Frame, callback: (title: string,hour: number,minute: number)=>void) { addEvent(frame,'CALENDAR_EVENT_ALARM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isCopy
         */
        OnCalendarNewEvent(frame: WoWAPI.Frame, callback: (isCopy: boolean)=>void) { addEvent(frame,'CALENDAR_NEW_EVENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param calendarType
         */
        OnCalendarOpenEvent(frame: WoWAPI.Frame, callback: (calendarType: string)=>void) { addEvent(frame,'CALENDAR_OPEN_EVENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param errorReason
         */
        OnCalendarUpdateError(frame: WoWAPI.Frame, callback: (errorReason: string)=>void) { addEvent(frame,'CALENDAR_UPDATE_ERROR',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCalendarUpdateEvent(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CALENDAR_UPDATE_EVENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCalendarUpdateEventList(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CALENDAR_UPDATE_EVENT_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCalendarUpdateGuildEvents(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CALENDAR_UPDATE_GUILD_EVENTS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param hasCompleteList (nilable)
         */
        OnCalendarUpdateInviteList(frame: WoWAPI.Frame, callback: (hasCompleteList?: boolean)=>void) { addEvent(frame,'CALENDAR_UPDATE_INVITE_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCalendarUpdatePendingInvites(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CALENDAR_UPDATE_PENDING_INVITES',callback)},
    },
    ChatInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param displayIndex channel id (item number in Blizzards ChannelFrame. See also {{api|GetChannelDisplayInfo}}
         * @param count number of players in channel
         */
        OnChannelCountUpdate(frame: WoWAPI.Frame, callback: (displayIndex: number,count: number)=>void) { addEvent(frame,'CHANNEL_COUNT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param displayIndex channel id (item number in Blizzards ChannelFrame. See also {{api|GetChannelDisplayInfo}}
         */
        OnChannelFlagsUpdated(frame: WoWAPI.Frame, callback: (displayIndex: number)=>void) { addEvent(frame,'CHANNEL_FLAGS_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param channelID
         * @param name
         */
        OnChannelInviteRequest(frame: WoWAPI.Frame, callback: (channelID: string,name: string)=>void) { addEvent(frame,'CHANNEL_INVITE_REQUEST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param channelID
         */
        OnChannelPasswordRequest(frame: WoWAPI.Frame, callback: (channelID: string)=>void) { addEvent(frame,'CHANNEL_PASSWORD_REQUEST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param displayIndex
         * @param count
         */
        OnChannelRosterUpdate(frame: WoWAPI.Frame, callback: (displayIndex: number,count: number)=>void) { addEvent(frame,'CHANNEL_ROSTER_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnChannelUiUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CHANNEL_UI_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgAchievement(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_ACHIEVEMENT',callback)},

        /**
         *
         * Patch added: 1.12.0
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgAddon(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_ADDON',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgAfk(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_AFK',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBgSystemAlliance(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BG_SYSTEM_ALLIANCE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBgSystemHorde(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BG_SYSTEM_HORDE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBgSystemNeutral(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BG_SYSTEM_NEUTRAL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBn(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnInlineToastAlert(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_INLINE_TOAST_ALERT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnInlineToastBroadcast(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_INLINE_TOAST_BROADCAST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnInlineToastBroadcastInform(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_INLINE_TOAST_BROADCAST_INFORM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnInlineToastConversation(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_INLINE_TOAST_CONVERSATION',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnWhisper(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_WHISPER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnWhisperInform(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_WHISPER_INFORM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgBnWhisperPlayerOffline(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_BN_WHISPER_PLAYER_OFFLINE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgChannel(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CHANNEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgChannelJoin(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CHANNEL_JOIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgChannelLeave(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CHANNEL_LEAVE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgChannelList(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CHANNEL_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgChannelNotice(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CHANNEL_NOTICE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgChannelNoticeUser(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CHANNEL_NOTICE_USER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgCombatFactionChange(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_COMBAT_FACTION_CHANGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgCombatHonorGain(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_COMBAT_HONOR_GAIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgCombatMiscInfo(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_COMBAT_MISC_INFO',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgCombatXpGain(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_COMBAT_XP_GAIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgCurrency(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_CURRENCY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgDnd(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_DND',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgEmote(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_EMOTE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgFiltered(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_FILTERED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgGuild(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_GUILD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgGuildAchievement(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_GUILD_ACHIEVEMENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgIgnored(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_IGNORED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgLoot(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_LOOT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgMoney(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_MONEY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgMonsterEmote(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_MONSTER_EMOTE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgMonsterParty(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_MONSTER_PARTY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgMonsterSay(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_MONSTER_SAY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgMonsterWhisper(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_MONSTER_WHISPER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgMonsterYell(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_MONSTER_YELL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgOfficer(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_OFFICER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgOpening(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_OPENING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgParty(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_PARTY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgPartyLeader(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_PARTY_LEADER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgPetInfo(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_PET_INFO',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgRaid(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_RAID',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgRaidBossEmote(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_RAID_BOSS_EMOTE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgRaidBossWhisper(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_RAID_BOSS_WHISPER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgRaidLeader(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_RAID_LEADER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgRaidWarning(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_RAID_WARNING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgRestricted(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_RESTRICTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgSay(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_SAY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgSkill(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_SKILL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgSystem(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_SYSTEM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgTargeticons(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_TARGETICONS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgTextEmote(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_TEXT_EMOTE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgTradeskills(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_TRADESKILLS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgWhisper(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_WHISPER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgWhisperInform(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_WHISPER_INFORM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text Text content being received in the message
         * @param playerName Name of the player sending the message
         * @param langName Name of the language (if applicable) of the message
         * @param channelName Name of the channel
         * @param playerName2 Name of the second player, if involved (used in whispers)
         * @param specialFlags
         * @param zoneChannelID
         * @param channelIndex
         * @param channelBaseName
         * @param unused
         * @param lineID
         * @param guid
         */
        OnChatMsgYell(frame: WoWAPI.Frame, callback: (text: string,playerName: string,langName: string,channelName: string,playerName2: string,specialFlags: string,zoneChannelID: string,channelIndex: number,channelBaseName: string,unused: number,lineID: number,guid: string)=>void) { addEvent(frame,'CHAT_MSG_YELL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isInitialMessage (nilable)
         */
        OnChatServerDisconnected(frame: WoWAPI.Frame, callback: (isInitialMessage?: boolean)=>void) { addEvent(frame,'CHAT_SERVER_DISCONNECTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnChatServerReconnected(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CHAT_SERVER_RECONNECTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnClearBossEmotes(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CLEAR_BOSS_EMOTES',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLanguageListChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LANGUAGE_LIST_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text
         * @param playerName
         * @param displayTime
         * @param enableBossEmoteWarningSound
         */
        OnRaidBossEmote(frame: WoWAPI.Frame, callback: (text: string,playerName: string,displayTime: number,enableBossEmoteWarningSound: boolean)=>void) { addEvent(frame,'RAID_BOSS_EMOTE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param text
         * @param playerName
         * @param displayTime
         * @param enableBossEmoteWarningSound
         */
        OnRaidBossWhisper(frame: WoWAPI.Frame, callback: (text: string,playerName: string,displayTime: number,enableBossEmoteWarningSound: boolean)=>void) { addEvent(frame,'RAID_BOSS_WHISPER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param mapname instance name
         * @param timeLeft seconds until reset
         * @param locked
         * @param extended
         */
        OnRaidInstanceWelcome(frame: WoWAPI.Frame, callback: (mapname: string,timeLeft: number,locked: number,extended: number)=>void) { addEvent(frame,'RAID_INSTANCE_WELCOME',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name Chat type
         * @param r red
         * @param g green
         * @param b blue
         */
        OnUpdateChatColor(frame: WoWAPI.Frame, callback: (name: string,r: number,g: number,b: number)=>void) { addEvent(frame,'UPDATE_CHAT_COLOR',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name
         * @param colorNameByClass
         */
        OnUpdateChatColorNameByClass(frame: WoWAPI.Frame, callback: (name: string,colorNameByClass: boolean)=>void) { addEvent(frame,'UPDATE_CHAT_COLOR_NAME_BY_CLASS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateChatWindows(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_CHAT_WINDOWS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateFloatingChatWindows(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_FLOATING_CHAT_WINDOWS',callback)},
    },
    Cinematic: {
        /**
         *
         * Patch added: ?
         *
         * @param  canBeCancelled Intuitively true when a cinematic may be interrupted by the player, but comments in the FrameXML code suggest this payload is true when the cinematic is "real".&lt;ref>{{ref FrameXML|CinematicFrame.lua|4.0.1|13164|51|20101019}}&lt;/ref>
         */
        OnCinematicStart(frame: WoWAPI.Frame, callback: ( canBeCancelled: boolean)=>void) { addEvent(frame,'CINEMATIC_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCinematicStop(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CINEMATIC_STOP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param movieID
         */
        OnPlayMovie(frame: WoWAPI.Frame, callback: (movieID: number)=>void) { addEvent(frame,'PLAY_MOVIE',callback)},
    },
    CombatLog: {
        /**
         * 9 base parameters from CLEU (event, source unit and dest unit)
          *
         ** 0-3 prefix params from CLEU (spell/environmental events)
          *
         ** 16 advanced parameters which require CVar {{api|t=c|advancedCombatLogging}} (added in 6.0.2) to be enabled for meaningful values.
          *
         ** 10 suffix params from CLEU
          *
         ** '''Stats''' – Those are the current stat values at the time of the log line. Secondary stats are in terms of the Rating amount, not a %.
          *
         ** '''Armor''' – This is the Armor amount before multipliers (such as Bear Form).
          *
         ** '''Talents''' – A list of the selected talents. Today’s build will print this ID as a TalentID, a record type that is not dataminable. This will be fixed in a future build to be the SpellID of the talent.
          *
         ** '''Artifact Traits''' – This will be a list of the selected traits for the character’s current specialization’s artifact (even if it’s not equipped). The Artifact Trait ID is an ID to a new record type to 7.0, which should be dataminable already. Trait Effective Level is the number of points placed in that talent. Note that some Relics will allow this to go beyond the max.
          *
         ** '''Equipment''' – This is a list of all equipped gear on the character. The first ID is the standard Item ID of the item, followed by its ilvl. After that is a list of enchants on the item, one of each of the 3 possible enchantment types (using the ItemEnchantment ID).
          *
         ** '''Interesting Auras''' – This is a list of interesting auras (buffs/debuffs) that we have manually flagged to be included in this log line. We’ll welcome feedback about what should be included here but currently plan for set bonuses, well fed, flasks, combat potions, Vantus runes, and player buffs. Nothing has been flagged for this yet, so you won’t see anything here in the current build.
          *
         ** {{Patch 8.0.1|note=COMBAT_LOG_EVENT and CLEU no longer have any payload, which is now returned by {{api|CombatLogGetCurrentEventInfo}}(). The payload itself is unchanged. &lt;ref>{{ref web|url=https://us.battle.net/forums/en/wow/topic/20762318007|author=[[Ythisens]]|date=2018-04-24 16:45|title=Combat Log Event Changes}}&lt;/ref>}}
          *
         **{{Patch 6.1.0|note=Additional parameters: recapID is added to UNIT_DIED; and unconsciousOnDeath is added to UNIT_DIED, UNIT_DESTROYED and UNIT_DISSIPATES.&lt;ref>{{ref FrameXML|Blizzard_CombatLog/Blizzard_CombatLog.lua|8.1.5||2684|}}&lt;/ref>}}
          *
         ** {{Patch 5.0.4|note=The environmental types are now a non-localized, proper-case strings instead of capitalized ones (e.g. "Falling" instead "FALLING").}}
          *
         ** {{Patch 4.2.0|note=Added two new parameters, [[raidFlag|sourceRaidFlags]] and [[raidFlag|destRaidFlags]], after sourceFlags and destFlags respectively.}}
          *
         ** {{Patch 4.1.0|note=Added hideCaster, after the event param.}}
          *
         ** {{Patch 2.4.0|note=Reworked to support filters and the terse format. &lt;ref>{{ref web|url=https://blue.mmo-champion.com/topic/86577-05-02-240-guide-to-the-new-combat-log/|author=[[Slouken]]|date=2008-02-05|title=2.4.0 Guide to the New Combat Log}}&lt;/ref>}}
          *
         ** {{Hotfix|date=2020-06-22|classic=|doc=|link=https://us.forums.blizzard.com/en/wow/t/wow-classic-hotfixes-updated-september-14/361448|note=The Combat Log is no longer restricted for dungeons and raids. The open world remains restricted to 50 yards.}}
          *
         ** {{Hotfix|date=2019-11-20|classic=|doc=|link=https://us.forums.blizzard.com/en/wow/t/in-game-combat-log-range-decreased/370390|note=The Combat Log is restricted to events within 50 yards of the player. (Build 32600)}}
          *
         ** {{Patch 1.13.2|note=The spellId and extraSpellId parameters are defunct in Classic, returning &lt;code>0&lt;/code> to resemble the pre-2.4.0 combat log.}}
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCombatLogEvent(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMBAT_LOG_EVENT',callback)},

        /**
         * 9 base parameters from CLEU (event, source unit and dest unit)
          *
         ** 0-3 prefix params from CLEU (spell/environmental events)
          *
         ** 16 advanced parameters which require CVar {{api|t=c|advancedCombatLogging}} (added in 6.0.2) to be enabled for meaningful values.
          *
         ** 10 suffix params from CLEU
          *
         ** '''Stats''' – Those are the current stat values at the time of the log line. Secondary stats are in terms of the Rating amount, not a %.
          *
         ** '''Armor''' – This is the Armor amount before multipliers (such as Bear Form).
          *
         ** '''Talents''' – A list of the selected talents. Today’s build will print this ID as a TalentID, a record type that is not dataminable. This will be fixed in a future build to be the SpellID of the talent.
          *
         ** '''Artifact Traits''' – This will be a list of the selected traits for the character’s current specialization’s artifact (even if it’s not equipped). The Artifact Trait ID is an ID to a new record type to 7.0, which should be dataminable already. Trait Effective Level is the number of points placed in that talent. Note that some Relics will allow this to go beyond the max.
          *
         ** '''Equipment''' – This is a list of all equipped gear on the character. The first ID is the standard Item ID of the item, followed by its ilvl. After that is a list of enchants on the item, one of each of the 3 possible enchantment types (using the ItemEnchantment ID).
          *
         ** '''Interesting Auras''' – This is a list of interesting auras (buffs/debuffs) that we have manually flagged to be included in this log line. We’ll welcome feedback about what should be included here but currently plan for set bonuses, well fed, flasks, combat potions, Vantus runes, and player buffs. Nothing has been flagged for this yet, so you won’t see anything here in the current build.
          *
         ** {{Patch 8.0.1|note=COMBAT_LOG_EVENT and CLEU no longer have any payload, which is now returned by {{api|CombatLogGetCurrentEventInfo}}(). The payload itself is unchanged. &lt;ref>{{ref web|url=https://us.battle.net/forums/en/wow/topic/20762318007|author=[[Ythisens]]|date=2018-04-24 16:45|title=Combat Log Event Changes}}&lt;/ref>}}
          *
         **{{Patch 6.1.0|note=Additional parameters: recapID is added to UNIT_DIED; and unconsciousOnDeath is added to UNIT_DIED, UNIT_DESTROYED and UNIT_DISSIPATES.&lt;ref>{{ref FrameXML|Blizzard_CombatLog/Blizzard_CombatLog.lua|8.1.5||2684|}}&lt;/ref>}}
          *
         ** {{Patch 5.0.4|note=The environmental types are now a non-localized, proper-case strings instead of capitalized ones (e.g. "Falling" instead "FALLING").}}
          *
         ** {{Patch 4.2.0|note=Added two new parameters, [[raidFlag|sourceRaidFlags]] and [[raidFlag|destRaidFlags]], after sourceFlags and destFlags respectively.}}
          *
         ** {{Patch 4.1.0|note=Added hideCaster, after the event param.}}
          *
         ** {{Patch 2.4.0|note=Reworked to support filters and the terse format. &lt;ref>{{ref web|url=https://blue.mmo-champion.com/topic/86577-05-02-240-guide-to-the-new-combat-log/|author=[[Slouken]]|date=2008-02-05|title=2.4.0 Guide to the New Combat Log}}&lt;/ref>}}
          *
         ** {{Hotfix|date=2020-06-22|classic=|doc=|link=https://us.forums.blizzard.com/en/wow/t/wow-classic-hotfixes-updated-september-14/361448|note=The Combat Log is no longer restricted for dungeons and raids. The open world remains restricted to 50 yards.}}
          *
         ** {{Hotfix|date=2019-11-20|classic=|doc=|link=https://us.forums.blizzard.com/en/wow/t/in-game-combat-log-range-decreased/370390|note=The Combat Log is restricted to events within 50 yards of the player. (Build 32600)}}
          *
         ** {{Patch 1.13.2|note=The spellId and extraSpellId parameters are defunct in Classic, returning &lt;code>0&lt;/code> to resemble the pre-2.4.0 combat log.}}
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCombatLogEventUnfiltered(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMBAT_LOG_EVENT_UNFILTERED',callback)},

        /**
         *
         * Patch added: 1.12.0
         *
         * @param combatTextType Combat message type. Known values include
         */
        OnCombatTextUpdate(frame: WoWAPI.Frame, callback: (combatTextType: string)=>void) { addEvent(frame,'COMBAT_TEXT_UPDATE',callback)},
    },
    Commentator: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCommentatorEnterWorld(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMMENTATOR_ENTER_WORLD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCommentatorMapUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMMENTATOR_MAP_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCommentatorPlayerUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMMENTATOR_PLAYER_UPDATE',callback)},
    },
    CompactUnitFrames: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCompactUnitFrameProfilesLoaded(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMPACT_UNIT_FRAME_PROFILES_LOADED',callback)},
    },
    Console: {
        /**
         *
         * Patch added: ?
         *
         * @param eventName The "scriptCVar" parameter from {{api|C_CVar.SetCVar}}.
         * @param value
         */
        OnCvarUpdate(frame: WoWAPI.Frame, callback: (eventName: string,value: string)=>void) { addEvent(frame,'CVAR_UPDATE',callback)},
    },
    Container: {
        /**
         *
         * Patch added: ?
         *
         * @param bagID
         */
        OnBagClosed(frame: WoWAPI.Frame, callback: (bagID: number)=>void) { addEvent(frame,'BAG_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param bagID
         */
        OnBagOpen(frame: WoWAPI.Frame, callback: (bagID: number)=>void) { addEvent(frame,'BAG_OPEN',callback)},

        /**
         *  Bag zero, the sixteen slot default backpack, may not fire on login. Upon login (or reloading the console) this event fires even for bank bags. When moving an item in your inventory, this fires multiple times: once each for the source and destination bag. If the bag involved is the default backpack, this event will also fire with a container ID of "-2" (twice if you are moving the item inside the same bag).
         *
         * Patch added: ?
         *
         * @param bagID
         */
        OnBagUpdate(frame: WoWAPI.Frame, callback: (bagID: number)=>void) { addEvent(frame,'BAG_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBagUpdateCooldown(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BAG_UPDATE_COOLDOWN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInventorySearchUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INVENTORY_SEARCH_UPDATE',callback)},

        /**
         * Usually fires in pairs when an item is swapping with another.
          *
         ** Empty slots do not lock.
          *
         ** {{api|GetContainerItemInfo}} and {{api|IsInventoryItemLocked}} can be used to query lock status.
          *
         ** This does NOT fire on ammo pickups.
         *
         * Patch added: ?
         *
         * @param bagOrSlotIndex If slotIndex is nil: Equipment slot of item; otherwise bag of updated item.
         * @param slotIndex (nilable) - Slot of updated item.
         */
        OnItemLockChanged(frame: WoWAPI.Frame, callback: (bagOrSlotIndex: number,slotIndex?: number)=>void) { addEvent(frame,'ITEM_LOCK_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param bagOrSlotIndex
         * @param slotIndex (nilable)
         */
        OnItemLocked(frame: WoWAPI.Frame, callback: (bagOrSlotIndex: number,slotIndex?: number)=>void) { addEvent(frame,'ITEM_LOCKED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param bagOrSlotIndex
         * @param slotIndex (nilable)
         */
        OnItemUnlocked(frame: WoWAPI.Frame, callback: (bagOrSlotIndex: number,slotIndex?: number)=>void) { addEvent(frame,'ITEM_UNLOCKED',callback)},
    },
    CurrencyInfo: {
        /**
         * As of Patch 5.0.5 it seems currencies are already available on {{api|t=e|PLAYER_ENTERING_WORLD}}.
         *
         * Patch added: ?
         *
         * @param currencyType (nilable)
         * @param quantity (nilable)
         * @param quantityChange (nilable)
         * @param quantityGainSource (nilable)
         * @param quantityLostSource (nilable)
         */
        OnCurrencyDisplayUpdate(frame: WoWAPI.Frame, callback: (currencyType?: number,quantity?: number,quantityChange?: number,quantityGainSource?: number,quantityLostSource?: number)=>void) { addEvent(frame,'CURRENCY_DISPLAY_UPDATE',callback)},

        /**
         * To get the amount of money earned/lost, you'll need to save the return value from {{api|GetMoney}} from the last time PLAYER_MONEY fired and compare it to the new return value from GetMoney.
          *
         ** [[User:Egingell/PLAYER_MONEY|Egingell:PLAYER_MONEY]]
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerMoney(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_MONEY',callback)},
    },
    Cursor: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCursorUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CURSOR_UPDATE',callback)},
    },
    DeathInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAreaSpiritHealerInRange(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AREA_SPIRIT_HEALER_IN_RANGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAreaSpiritHealerOutOfRange(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AREA_SPIRIT_HEALER_OUT_OF_RANGE',callback)},

        /**
         * ''History: Way back before WoW was released, you lost experience rather than durability when you resurrected at a spirit healer.''
          *
         ** {{api|AcceptXPLoss}}
          *
         ** [https://www.townlong-yak.com/framexml/live/Blizzard_APIDocumentation#CONFIRM_XP_LOSS Blizzard API Documentation]
         *
         * Patch added: ?
         *
         * @param args
         */
        OnConfirmXpLoss(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CONFIRM_XP_LOSS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCorpseInInstance(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CORPSE_IN_INSTANCE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCorpseInRange(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CORPSE_IN_RANGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCorpseOutOfRange(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CORPSE_OUT_OF_RANGE',callback)},

        /**
         * Does '''not''' fire when the player is alive after being a ghost. {{api|t=e|PLAYER_UNGHOST}} is triggered in that case.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerAlive(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_ALIVE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerDead(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_DEAD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param hasFreeRepop
         */
        OnPlayerSkinned(frame: WoWAPI.Frame, callback: (hasFreeRepop: number)=>void) { addEvent(frame,'PLAYER_SKINNED',callback)},

        /**
         * Performing a successful corpse run and the player accepts the 'Resurrect Now' box.
          *
         ** Accepting a resurrect from another player after releasing from a death.
          *
         ** Zoning into an instance where the player is dead.
          *
         ** When the player accept a resurrect from a Spirit Healer.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerUnghost(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_UNGHOST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isGossipTriggered
         */
        OnRequestCemeteryListResponse(frame: WoWAPI.Frame, callback: (isGossipTriggered: boolean)=>void) { addEvent(frame,'REQUEST_CEMETERY_LIST_RESPONSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param inviter player name
         */
        OnResurrectRequest(frame: WoWAPI.Frame, callback: (inviter: string)=>void) { addEvent(frame,'RESURRECT_REQUEST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSelfResSpellChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SELF_RES_SPELL_CHANGED',callback)},
    },
    DuelInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDuelFinished(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DUEL_FINISHED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDuelInbounds(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DUEL_INBOUNDS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDuelOutofbounds(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DUEL_OUTOFBOUNDS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param playerName opponent name
         */
        OnDuelRequested(frame: WoWAPI.Frame, callback: (playerName: string)=>void) { addEvent(frame,'DUEL_REQUESTED',callback)},
    },
    EncounterInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDisableLowLevelRaid(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DISABLE_LOW_LEVEL_RAID',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEnableLowLevelRaid(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ENABLE_LOW_LEVEL_RAID',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInstanceLockStart(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSTANCE_LOCK_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInstanceLockStop(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSTANCE_LOCK_STOP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInstanceLockWarning(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSTANCE_LOCK_WARNING',callback)},

        /**
         * Does not get triggered if a mob wearing a raid target icon dies (the icon is removed from that mob, however.)
         *
         * Patch added: 1.11.0
         *
         * @param args
         */
        OnRaidTargetUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'RAID_TARGET_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateInstanceInfo(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_INSTANCE_INFO',callback)},
    },
    EncounterJournal: {
        /**
         *
         * Patch added: ?
         *
         * @param itemID (nilable)
         */
        OnEjLootDataRecieved(frame: WoWAPI.Frame, callback: (itemID?: number)=>void) { addEvent(frame,'EJ_LOOT_DATA_RECIEVED',callback)},
    },
    EquipmentSet: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEquipmentSetsChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'EQUIPMENT_SETS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param result True if the set change was successful
         * @param setID (nilable) - The ID of the set that was changed.
         */
        OnEquipmentSwapFinished(frame: WoWAPI.Frame, callback: (result: boolean,setID?: number)=>void) { addEvent(frame,'EQUIPMENT_SWAP_FINISHED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEquipmentSwapPending(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'EQUIPMENT_SWAP_PENDING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param setID
         */
        OnWearEquipmentSet(frame: WoWAPI.Frame, callback: (setID: number)=>void) { addEvent(frame,'WEAR_EQUIPMENT_SET',callback)},
    },
    FriendList: {
        /**
         *
         * Patch added: ?
         *
         * @param blockType
         */
        OnBnBlockFailedTooMany(frame: WoWAPI.Frame, callback: (blockType: string)=>void) { addEvent(frame,'BN_BLOCK_FAILED_TOO_MANY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBnBlockListUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BN_BLOCK_LIST_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param senderID
         */
        OnBnChatWhisperUndeliverable(frame: WoWAPI.Frame, callback: (senderID: number)=>void) { addEvent(frame,'BN_CHAT_WHISPER_UNDELIVERABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param suppressNotification
         */
        OnBnConnected(frame: WoWAPI.Frame, callback: (suppressNotification: boolean)=>void) { addEvent(frame,'BN_CONNECTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param id (nilable)
         */
        OnBnCustomMessageChanged(frame: WoWAPI.Frame, callback: (id?: number)=>void) { addEvent(frame,'BN_CUSTOM_MESSAGE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBnCustomMessageLoaded(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BN_CUSTOM_MESSAGE_LOADED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param result
         * @param suppressNotification
         */
        OnBnDisconnected(frame: WoWAPI.Frame, callback: (result: boolean,suppressNotification: boolean)=>void) { addEvent(frame,'BN_DISCONNECTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param friendId
         * @param isCompanionApp
         */
        OnBnFriendAccountOffline(frame: WoWAPI.Frame, callback: (friendId: number,isCompanionApp: boolean)=>void) { addEvent(frame,'BN_FRIEND_ACCOUNT_OFFLINE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param friendId
         * @param isCompanionApp
         */
        OnBnFriendAccountOnline(frame: WoWAPI.Frame, callback: (friendId: number,isCompanionApp: boolean)=>void) { addEvent(frame,'BN_FRIEND_ACCOUNT_ONLINE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param friendIndex (nilable)
         */
        OnBnFriendInfoChanged(frame: WoWAPI.Frame, callback: (friendIndex?: number)=>void) { addEvent(frame,'BN_FRIEND_INFO_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param accountID
         */
        OnBnFriendInviteAdded(frame: WoWAPI.Frame, callback: (accountID: number)=>void) { addEvent(frame,'BN_FRIEND_INVITE_ADDED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param listSize
         */
        OnBnFriendInviteListInitialized(frame: WoWAPI.Frame, callback: (listSize: number)=>void) { addEvent(frame,'BN_FRIEND_INVITE_LIST_INITIALIZED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBnFriendInviteRemoved(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BN_FRIEND_INVITE_REMOVED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param accountID (nilable)
         */
        OnBnFriendListSizeChanged(frame: WoWAPI.Frame, callback: (accountID?: number)=>void) { addEvent(frame,'BN_FRIEND_LIST_SIZE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBnRequestFofSucceeded(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BN_REQUEST_FOF_SUCCEEDED',callback)},

        /**
         * You log in
          *
         ** Open the friends window (twice)
          *
         ** Switch from the ignore list to the friend's list
          *
         ** Switch from the guild, raid, or who tab back to the friends tab (twice)
          *
         ** Add a friend
          *
         ** Remove a friend
          *
         ** Friend comes online
          *
         ** Friend goes offline
         *
         * Patch added: ?
         *
         * @param args
         */
        OnFriendlistUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'FRIENDLIST_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnIgnorelistUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'IGNORELIST_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMutelistUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MUTELIST_UPDATE',callback)},

        /**
         * Use {{api|C_FriendList.SetWhoToUi}} to manipulate this functionality. This event is only triggered if the Who panel was open at the time the Who data was received (this includes the case where the Blizzard UI opens it automatically because the return data was too big to display in the chat frame).
         *
         * Patch added: ?
         *
         * @param args
         */
        OnWhoListUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'WHO_LIST_UPDATE',callback)},
    },
    GMTicketInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param name
         * @param info
         */
        OnGmPlayerInfo(frame: WoWAPI.Frame, callback: (name: string,info: string)=>void) { addEvent(frame,'GM_PLAYER_INFO',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnItemRestorationButtonStatus(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ITEM_RESTORATION_BUTTON_STATUS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetitionClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PETITION_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetitionShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PETITION_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param invitedByGUID
         */
        OnPlayerReportSubmitted(frame: WoWAPI.Frame, callback: (invitedByGUID: string)=>void) { addEvent(frame,'PLAYER_REPORT_SUBMITTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuickTicketSystemStatus(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUICK_TICKET_SYSTEM_STATUS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuickTicketThrottleChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUICK_TICKET_THROTTLE_CHANGED',callback)},
    },
    GossipInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGossipClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GOSSIP_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param gossipIndex
         * @param text
         * @param cost
         */
        OnGossipConfirm(frame: WoWAPI.Frame, callback: (gossipIndex: number,text: string,cost: number)=>void) { addEvent(frame,'GOSSIP_CONFIRM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGossipConfirmCancel(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GOSSIP_CONFIRM_CANCEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param gossipIndex
         */
        OnGossipEnterCode(frame: WoWAPI.Frame, callback: (gossipIndex: number)=>void) { addEvent(frame,'GOSSIP_ENTER_CODE',callback)},

        /**
         * :This event typically fires when you are given several choices, including choosing to sell item, select available and active quests, just talk about something, or bind to a location. Even when the the only available choices are quests, this event is often used instead of {{api|t=e|QUEST_GREETING}}.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGossipShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GOSSIP_SHOW',callback)},
    },
    GuildBank: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankItemLockChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANK_ITEM_LOCK_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param guildBankTab
         */
        OnGuildbankTextChanged(frame: WoWAPI.Frame, callback: (guildBankTab: number)=>void) { addEvent(frame,'GUILDBANK_TEXT_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankUpdateMoney(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANK_UPDATE_MONEY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankUpdateTabs(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANK_UPDATE_TABS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param guildBankTab
         */
        OnGuildbankUpdateText(frame: WoWAPI.Frame, callback: (guildBankTab: number)=>void) { addEvent(frame,'GUILDBANK_UPDATE_TEXT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankUpdateWithdrawmoney(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANK_UPDATE_WITHDRAWMONEY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankbagslotsChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANKBAGSLOTS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankframeClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANKFRAME_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbankframeOpened(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANKFRAME_OPENED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildbanklogUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDBANKLOG_UPDATE',callback)},
    },
    GuildInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCloseTabardFrame(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CLOSE_TABARD_FRAME',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDisableDeclineGuildInvite(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DISABLE_DECLINE_GUILD_INVITE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEnableDeclineGuildInvite(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ENABLE_DECLINE_GUILD_INVITE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param challengeType
         * @param currentCount
         * @param maxCount
         * @param goldAwarded
         */
        OnGuildChallengeCompleted(frame: WoWAPI.Frame, callback: (challengeType: number,currentCount: number,maxCount: number,goldAwarded: number)=>void) { addEvent(frame,'GUILD_CHALLENGE_COMPLETED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildChallengeUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_CHALLENGE_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildEventLogUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_EVENT_LOG_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildInviteCancel(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_INVITE_CANCEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param inviter
         * @param guildName
         * @param guildAchievementPoints
         * @param oldGuildName
         * @param isNewGuild (nilable)
         * @param tabardInfo GuildTabardInfo (nilable)
         */
        OnGuildInviteRequest(frame: WoWAPI.Frame, callback: (inviter: string,guildName: string,guildAchievementPoints: number,oldGuildName: string,isNewGuild?: boolean,tabardInfo?: any)=>void) { addEvent(frame,'GUILD_INVITE_REQUEST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param motdText
         */
        OnGuildMotd(frame: WoWAPI.Frame, callback: (motdText: string)=>void) { addEvent(frame,'GUILD_MOTD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildNewsUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_NEWS_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param inGuildParty
         */
        OnGuildPartyStateUpdated(frame: WoWAPI.Frame, callback: (inGuildParty: boolean)=>void) { addEvent(frame,'GUILD_PARTY_STATE_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildRanksUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_RANKS_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildRecipeKnownByMembers(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_RECIPE_KNOWN_BY_MEMBERS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildRegistrarClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_REGISTRAR_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildRegistrarShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_REGISTRAR_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param flagSet
         */
        OnGuildRenameRequired(frame: WoWAPI.Frame, callback: (flagSet: boolean)=>void) { addEvent(frame,'GUILD_RENAME_REQUIRED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildRewardsList(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_REWARDS_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param canRequestRosterUpdate
         */
        OnGuildRosterUpdate(frame: WoWAPI.Frame, callback: (canRequestRosterUpdate: boolean)=>void) { addEvent(frame,'GUILD_ROSTER_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildTradeskillUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILD_TRADESKILL_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnGuildtabardUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'GUILDTABARD_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnOpenTabardFrame(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'OPEN_TABARD_FRAME',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerGuildUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_GUILD_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param success
         */
        OnRequiredGuildRenameResult(frame: WoWAPI.Frame, callback: (success: boolean)=>void) { addEvent(frame,'REQUIRED_GUILD_RENAME_RESULT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTabardCansaveChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TABARD_CANSAVE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTabardSavePending(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TABARD_SAVE_PENDING',callback)},
    },
    InstanceEncounter: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInstanceEncounterEngageUnit(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSTANCE_ENCOUNTER_ENGAGE_UNIT',callback)},
    },
    Item: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBindEnchant(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BIND_ENCHANT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnConfirmBeforeUse(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CONFIRM_BEFORE_USE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param itemName
         * @param qualityID
         * @param bonding
         * @param questWarn
         */
        OnDeleteItemConfirm(frame: WoWAPI.Frame, callback: (itemName: string,qualityID: number,bonding: number,questWarn: number)=>void) { addEvent(frame,'DELETE_ITEM_CONFIRM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param reason
         */
        OnEndBoundTradeable(frame: WoWAPI.Frame, callback: (reason: string)=>void) { addEvent(frame,'END_BOUND_TRADEABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param  itemID The Item ID of the received item info.
         * @param  success
         */
        OnGetItemInfoReceived(frame: WoWAPI.Frame, callback: ( itemID: number, success: boolean)=>void) { addEvent(frame,'GET_ITEM_INFO_RECEIVED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param existingStr enchantment
         * @param replacementStr current enchantment
         */
        OnReplaceEnchant(frame: WoWAPI.Frame, callback: (existingStr: string,replacementStr: string)=>void) { addEvent(frame,'REPLACE_ENCHANT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param existing new enchantment
         * @param replacement current enchantment
         */
        OnTradeReplaceEnchant(frame: WoWAPI.Frame, callback: (existing: string,replacement: string)=>void) { addEvent(frame,'TRADE_REPLACE_ENCHANT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUseBindConfirm(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'USE_BIND_CONFIRM',callback)},
    },
    ItemSocketInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSocketInfoAccept(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SOCKET_INFO_ACCEPT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSocketInfoClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SOCKET_INFO_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSocketInfoSuccess(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SOCKET_INFO_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSocketInfoUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SOCKET_INFO_UPDATE',callback)},
    },
    ItemText: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnItemTextBegin(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ITEM_TEXT_BEGIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnItemTextClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ITEM_TEXT_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnItemTextReady(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ITEM_TEXT_READY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param delay
         */
        OnItemTextTranslation(frame: WoWAPI.Frame, callback: (delay: number)=>void) { addEvent(frame,'ITEM_TEXT_TRANSLATION',callback)},
    },
    KeyBindings: {
        /**
         *
         * Patch added: ?
         *
         * @param key "LSHIFT", "RSHIFT", "LCTRL", "RCTRL", "LALT", "RALT"
         * @param down 1 for pressed, 0 for released
         */
        OnModifierStateChanged(frame: WoWAPI.Frame, callback: (key: string,down: number)=>void) { addEvent(frame,'MODIFIER_STATE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateBindings(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_BINDINGS',callback)},
    },
    KnowledgeBase: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseArticleLoadFailure(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_ARTICLE_LOAD_FAILURE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseArticleLoadSuccess(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_ARTICLE_LOAD_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseQueryLoadFailure(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_QUERY_LOAD_FAILURE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseQueryLoadSuccess(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_QUERY_LOAD_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseServerMessage(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_SERVER_MESSAGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseSetupLoadFailure(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_SETUP_LOAD_FAILURE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseSetupLoadSuccess(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_SETUP_LOAD_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnKnowledgeBaseSystemMotdUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'KNOWLEDGE_BASE_SYSTEM_MOTD_UPDATED',callback)},
    },
    LFGInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgBootProposalUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_BOOT_PROPOSAL_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgCompletionReward(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_COMPLETION_REWARD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param reason
         * @param subReason1
         * @param subReason2
         */
        OnLfgInvalidErrorMessage(frame: WoWAPI.Frame, callback: (reason: number,subReason1: number,subReason2: number)=>void) { addEvent(frame,'LFG_INVALID_ERROR_MESSAGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgLockInfoReceived(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_LOCK_INFO_RECEIVED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name
         * @param LfgDungeonID|lfgDungeonsID
         * @param typeID
         */
        OnLfgOfferContinue(frame: WoWAPI.Frame, callback: (name: string,lfgDungeonsID: number,typeID: number)=>void) { addEvent(frame,'LFG_OFFER_CONTINUE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param LfgDungeonID|dungeonID
         */
        OnLfgOpenFromGossip(frame: WoWAPI.Frame, callback: (dungeonID: number)=>void) { addEvent(frame,'LFG_OPEN_FROM_GOSSIP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgProposalFailed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_PROPOSAL_FAILED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgProposalShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_PROPOSAL_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgProposalSucceeded(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_PROPOSAL_SUCCEEDED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgProposalUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_PROPOSAL_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgQueueStatusUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_QUEUE_STATUS_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgRoleCheckHide(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_ROLE_CHECK_HIDE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name
         * @param isTank
         * @param isHealer
         * @param isDamage
         */
        OnLfgRoleCheckRoleChosen(frame: WoWAPI.Frame, callback: (name: string,isTank: boolean,isHealer: boolean,isDamage: boolean)=>void) { addEvent(frame,'LFG_ROLE_CHECK_ROLE_CHOSEN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isRequeue
         */
        OnLfgRoleCheckShow(frame: WoWAPI.Frame, callback: (isRequeue: boolean)=>void) { addEvent(frame,'LFG_ROLE_CHECK_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgRoleCheckUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_ROLE_CHECK_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgRoleUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_ROLE_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfgUpdateRandomInfo(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LFG_UPDATE_RANDOM_INFO',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateLfgList(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_LFG_LIST',callback)},
    },
    LFGuildInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfGuildBrowseUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LF_GUILD_BROWSE_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfGuildMembershipListChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LF_GUILD_MEMBERSHIP_LIST_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param numApplicationsRemaining
         */
        OnLfGuildMembershipListUpdated(frame: WoWAPI.Frame, callback: (numApplicationsRemaining: number)=>void) { addEvent(frame,'LF_GUILD_MEMBERSHIP_LIST_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfGuildPostUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LF_GUILD_POST_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfGuildRecruitListChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LF_GUILD_RECRUIT_LIST_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLfGuildRecruitsUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LF_GUILD_RECRUITS_UPDATED',callback)},
    },
    Loot: {
        /**
         *
         * Patch added: ?
         *
         * @param rollID
         */
        OnCancelLootRoll(frame: WoWAPI.Frame, callback: (rollID: number)=>void) { addEvent(frame,'CANCEL_LOOT_ROLL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param rollID
         * @param rollType 1=Need, 2=Greed, 3=Disenchant
         */
        OnConfirmDisenchantRoll(frame: WoWAPI.Frame, callback: (rollID: number,rollType: number)=>void) { addEvent(frame,'CONFIRM_DISENCHANT_ROLL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param rollID
         * @param rollType 1=Need, 2=Greed, 3=Disenchant
         * @param confirmReason
         */
        OnConfirmLootRoll(frame: WoWAPI.Frame, callback: (rollID: number,rollType: number,confirmReason: string)=>void) { addEvent(frame,'CONFIRM_LOOT_ROLL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param bagSlot the bag that has received the new item
         * @param iconFileID the [[FileID]] of the item's icon
         */
        OnItemPush(frame: WoWAPI.Frame, callback: (bagSlot: number,iconFileID: number)=>void) { addEvent(frame,'ITEM_PUSH',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param lootSlot
         */
        OnLootBindConfirm(frame: WoWAPI.Frame, callback: (lootSlot: number)=>void) { addEvent(frame,'LOOT_BIND_CONFIRM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLootClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LOOT_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param autoLoot Equal to [[CVar_autoLootDefault|autoLootDefault]].
         * @param isFromItem
         */
        OnLootOpened(frame: WoWAPI.Frame, callback: (autoLoot: boolean,isFromItem: boolean)=>void) { addEvent(frame,'LOOT_OPENED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param lootSlot
         */
        OnLootSlotChanged(frame: WoWAPI.Frame, callback: (lootSlot: number)=>void) { addEvent(frame,'LOOT_SLOT_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param lootSlot
         */
        OnLootSlotCleared(frame: WoWAPI.Frame, callback: (lootSlot: number)=>void) { addEvent(frame,'LOOT_SLOT_CLEARED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnOpenMasterLootList(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'OPEN_MASTER_LOOT_LIST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param rollID
         * @param rollTime
         * @param lootHandle (nilable)
         */
        OnStartLootRoll(frame: WoWAPI.Frame, callback: (rollID: number,rollTime: number,lootHandle?: number)=>void) { addEvent(frame,'START_LOOT_ROLL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTrialCapReachedMoney(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRIAL_CAP_REACHED_MONEY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateMasterLootList(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_MASTER_LOOT_LIST',callback)},
    },
    LossOfControl: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerControlGained(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_CONTROL_GAINED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerControlLost(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_CONTROL_LOST',callback)},
    },
    Macro: {
        /**
         *
         * Patch added: ?
         *
         * @param chatLine The macro text body to execute.
         */
        OnExecuteChatLine(frame: WoWAPI.Frame, callback: (chatLine: string)=>void) { addEvent(frame,'EXECUTE_CHAT_LINE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateMacros(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_MACROS',callback)},
    },
    Mail: {
        /**
         *
         * Patch added: ?
         *
         * @param mailIndex
         */
        OnCloseInboxItem(frame: WoWAPI.Frame, callback: (mailIndex: number)=>void) { addEvent(frame,'CLOSE_INBOX_ITEM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMailClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MAIL_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param itemID (nilable)
         */
        OnMailFailed(frame: WoWAPI.Frame, callback: (itemID?: number)=>void) { addEvent(frame,'MAIL_FAILED',callback)},

        /**
         * Fires when the inbox list is loaded while the frame is open
          *
         ** Fires when mail item changes from new to read
          *
         ** Fires when mail item is opened for the first time in a session
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMailInboxUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MAIL_INBOX_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param attachSlot Mail Slot
         * @param itemLink
         */
        OnMailLockSendItems(frame: WoWAPI.Frame, callback: (attachSlot: number,itemLink: string)=>void) { addEvent(frame,'MAIL_LOCK_SEND_ITEMS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMailSendInfoUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MAIL_SEND_INFO_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMailSendSuccess(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MAIL_SEND_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMailShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MAIL_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param itemID (nilable)
         */
        OnMailSuccess(frame: WoWAPI.Frame, callback: (itemID?: number)=>void) { addEvent(frame,'MAIL_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMailUnlockSendItems(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MAIL_UNLOCK_SEND_ITEMS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSendMailCodChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SEND_MAIL_COD_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSendMailMoneyChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SEND_MAIL_MONEY_CHANGED',callback)},

        /**
         * Fired when the player enters the world and enters/leaves an instance, if there is mail in the player's mailbox.
          *
         ** Fired when new mail is received.
          *
         ** Fired when mailbox window is closed if the number of mail items in the inbox changed (I.E. you deleted mail)
          *
         ** Does not appear to trigger when auction outbid mail is received... may not in other cases as well
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdatePendingMail(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_PENDING_MAIL',callback)},
    },
    Map: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnZoneChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ZONE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnZoneChangedIndoors(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ZONE_CHANGED_INDOORS',callback)},

        /**
         * When this event fires, the UI may still think you're in the zone you just left. Don't depend on {{api|GetRealZoneText}} and similar functions to report the new zone in reaction to ZONE_CHANGED_NEW_AREA. (untested for similar events)
         *
         * Patch added: ?
         *
         * @param args
         */
        OnZoneChangedNewArea(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ZONE_CHANGED_NEW_AREA',callback)},
    },
    MerchantFrame: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMerchantClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MERCHANT_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMerchantShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MERCHANT_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMerchantUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MERCHANT_UPDATE',callback)},
    },
    Minimap: {
        /**
         *
         * Patch added: ?
         *
         * @param unitTarget Unit that created the ping (i.e. "player" or any of the group members)
         * @param y
         * @param x
         */
        OnMinimapPing(frame: WoWAPI.Frame, callback: (unitTarget: string,y: number,x: number)=>void) { addEvent(frame,'MINIMAP_PING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMinimapUpdateTracking(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MINIMAP_UPDATE_TRACKING',callback)},

        /**
         * This event does not relate to the '''+''' and '''-''' minimap zoom buttons.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMinimapUpdateZoom(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MINIMAP_UPDATE_ZOOM',callback)},
    },
    PaperDollInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param change indicates number of talent points changed.
         */
        OnCharacterPointsChanged(frame: WoWAPI.Frame, callback: (change: number)=>void) { addEvent(frame,'CHARACTER_POINTS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCombatRatingUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMBAT_RATING_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDisableXpGain(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DISABLE_XP_GAIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEnableXpGain(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ENABLE_XP_GAIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param slot
         */
        OnEquipBindConfirm(frame: WoWAPI.Frame, callback: (slot: number)=>void) { addEvent(frame,'EQUIP_BIND_CONFIRM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInspectHonorUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSPECT_HONOR_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param inspecteeGUID [[GUID]]
         */
        OnInspectReady(frame: WoWAPI.Frame, callback: (inspecteeGUID: string)=>void) { addEvent(frame,'INSPECT_READY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnMasteryUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'MASTERY_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetSpellPowerUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_SPELL_POWER_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param equipmentSlot [[InventorySlotId]]
         * @param hasCurrent true for an item or false for emptied
         */
        OnPlayerEquipmentChanged(frame: WoWAPI.Frame, callback: (equipmentSlot: number,hasCurrent: boolean)=>void) { addEvent(frame,'PLAYER_EQUIPMENT_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateFaction(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_FACTION',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateInventoryAlerts(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_INVENTORY_ALERTS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateInventoryDurability(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_INVENTORY_DURABILITY',callback)},
    },
    PartyInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEnteredDifferentInstanceFromParty(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ENTERED_DIFFERENT_INSTANCE_FROM_PARTY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInstanceBootStart(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSTANCE_BOOT_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnInstanceBootStop(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'INSTANCE_BOOT_STOP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPartyInviteCancel(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PARTY_INVITE_CANCEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name player that invited you.
         * @param isTank
         * @param isHealer
         * @param isDamage
         * @param isNativeRealm invite is cross realm (boolean)
         * @param allowMultipleRoles
         * @param inviterGUID
         * @param isQuestSessionActive
         */
        OnPartyInviteRequest(frame: WoWAPI.Frame, callback: (name: string,isTank: boolean,isHealer: boolean,isDamage: boolean,isNativeRealm: boolean,allowMultipleRoles: boolean,inviterGUID: string,isQuestSessionActive: boolean)=>void) { addEvent(frame,'PARTY_INVITE_REQUEST',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPartyLeaderChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PARTY_LEADER_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPartyLfgRestricted(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PARTY_LFG_RESTRICTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPartyLootMethodChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PARTY_LOOT_METHOD_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPartyMemberDisable(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PARTY_MEMBER_DISABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPartyMemberEnable(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PARTY_MEMBER_ENABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerDifficultyChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_DIFFICULTY_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerRolesAssigned(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_ROLES_ASSIGNED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnRaidRosterUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'RAID_ROSTER_UPDATE',callback)},

        /**
         *
         * Patch added: 1.11.0
         *
         * @param initiatorName
         * @param readyCheckTimeLeft Time before automatic check completion in seconds (usually 30).
         */
        OnReadyCheck(frame: WoWAPI.Frame, callback: (initiatorName: string,readyCheckTimeLeft: number)=>void) { addEvent(frame,'READY_CHECK',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]] (raid1, party1). Fires twice if the confirming player is in your raid sub-group.
         * @param isReady
         */
        OnReadyCheckConfirm(frame: WoWAPI.Frame, callback: (unitTarget: string,isReady: boolean)=>void) { addEvent(frame,'READY_CHECK_CONFIRM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param preempted
         */
        OnReadyCheckFinished(frame: WoWAPI.Frame, callback: (preempted: boolean)=>void) { addEvent(frame,'READY_CHECK_FINISHED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param changedName player name
         * @param fromName source of change
         * @param oldRole previous role
         * @param newRole new role
         */
        OnRoleChangedInform(frame: WoWAPI.Frame, callback: (changedName: string,fromName: string,oldRole: string,newRole: string)=>void) { addEvent(frame,'ROLE_CHANGED_INFORM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param fromName
         */
        OnRolePollBegin(frame: WoWAPI.Frame, callback: (fromName: string)=>void) { addEvent(frame,'ROLE_POLL_BEGIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name Name of the player you wanted to initiate a kick vote for.
         * @param resultGUID
         */
        OnVoteKickReasonNeeded(frame: WoWAPI.Frame, callback: (name: string,resultGUID: string)=>void) { addEvent(frame,'VOTE_KICK_REASON_NEEDED',callback)},
    },
    PetInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetAttackStart(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_ATTACK_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetAttackStop(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_ATTACK_STOP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBarHidegrid(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BAR_HIDEGRID',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBarShowgrid(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BAR_SHOWGRID',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBarUpdateCooldown(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BAR_UPDATE_COOLDOWN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param delay
         */
        OnPetDismissStart(frame: WoWAPI.Frame, callback: (delay: number)=>void) { addEvent(frame,'PET_DISMISS_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name
         * @param declinedName1 (nilable)
         * @param declinedName2 (nilable)
         * @param declinedName3 (nilable)
         * @param declinedName4 (nilable)
         * @param declinedName5 (nilable)
         */
        OnPetForceNameDeclension(frame: WoWAPI.Frame, callback: (name: string,declinedName1?: string,declinedName2?: string,declinedName3?: string,declinedName4?: string,declinedName5?: string)=>void) { addEvent(frame,'PET_FORCE_NAME_DECLENSION',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetUiClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_UI_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnRaisedAsGhoul(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'RAISED_AS_GHOUL',callback)},
    },
    PetJournal: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCompanionLearned(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMPANION_LEARNED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCompanionUnlearned(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'COMPANION_UNLEARNED',callback)},

        /**
         * If the type is nil, the UI should update if it's visible, regardless of which type it's managing. If the type is non-nil, then it will be either "CRITTER" or "MOUNT" and that signifies that the active companion has changed and the UI should update if it's currently showing that type.
          *
         ** "Range" appears to be at least 40 yards.  If you are in a major city, expect this event to fire constantly.
          *
         ** You, or anyone within range, summons or dismisses a critter
          *
         ** You, or anyone within range, mounts or dismounts
          *
         ** Someone enters range with a critter summoned
          *
         ** Someone enters range while mounted
         *
         * Patch added: ?
         *
         * @param companionType (nilable)
         */
        OnCompanionUpdate(frame: WoWAPI.Frame, callback: (companionType?: string)=>void) { addEvent(frame,'COMPANION_UPDATE',callback)},
    },
    PvP: {
        /**
         *
         * Patch added: ?
         *
         * @param unitToken
         * @param updateReason
         */
        OnArenaOpponentUpdate(frame: WoWAPI.Frame, callback: (unitToken: string,updateReason: string)=>void) { addEvent(frame,'ARENA_OPPONENT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnArenaSeasonWorldState(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ARENA_SEASON_WORLD_STATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBattlefieldQueueTimeout(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BATTLEFIELD_QUEUE_TIMEOUT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnBattlefieldsClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'BATTLEFIELDS_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isArena (nilable)
         * @param battleMasterListID (nilable)
         */
        OnBattlefieldsShow(frame: WoWAPI.Frame, callback: (isArena?: boolean,battleMasterListID?: number)=>void) { addEvent(frame,'BATTLEFIELDS_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerEnteringBattleground(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_ENTERING_BATTLEGROUND',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPvpRatedStatsUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PVP_RATED_STATS_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPvpRewardsUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PVP_REWARDS_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param wargameBattlegrounds
         * @param ratedBattlegrounds
         * @param ratedArenas
         */
        OnPvpTypesEnabled(frame: WoWAPI.Frame, callback: (wargameBattlegrounds: boolean,ratedBattlegrounds: boolean,ratedArenas: boolean)=>void) { addEvent(frame,'PVP_TYPES_ENABLED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPvpqueueAnywhereShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PVPQUEUE_ANYWHERE_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPvpqueueAnywhereUpdateAvailable(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PVPQUEUE_ANYWHERE_UPDATE_AVAILABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateBattlefieldScore(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_BATTLEFIELD_SCORE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param battleFieldIndex
         */
        OnUpdateBattlefieldStatus(frame: WoWAPI.Frame, callback: (battleFieldIndex: number)=>void) { addEvent(frame,'UPDATE_BATTLEFIELD_STATUS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param opposingPartyMemberName
         * @param battlegroundName
         * @param timeoutSeconds
         * @param tournamentRules
         */
        OnWargameRequested(frame: WoWAPI.Frame, callback: (opposingPartyMemberName: string,battlegroundName: string,timeoutSeconds: number,tournamentRules: boolean)=>void) { addEvent(frame,'WARGAME_REQUESTED',callback)},
    },
    QuestLog: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestAccepted(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_ACCEPTED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param questId
         */
        OnQuestAutocomplete(frame: WoWAPI.Frame, callback: (questId: number)=>void) { addEvent(frame,'QUEST_AUTOCOMPLETE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestComplete(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_COMPLETE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param questStartItemID (nilable) - The ItemID of the item which begins the quest displayed in the quest detail view.
         */
        OnQuestDetail(frame: WoWAPI.Frame, callback: (questStartItemID?: number)=>void) { addEvent(frame,'QUEST_DETAIL',callback)},

        /**
         * viewing a quest for the first time in a session in the Quest Log
          *
         ** every time the player changes zones across an instance boundary
          *
         ** every time the player picks up a non-grey item; every time after the player completes a quest goal, such as killing a mob for a ques
          *
         ** It also fires whenever the player (or addon using the {{api|t=e|CollapseQuestHeader}} or {{api|t=e|ExpandQuestHeader}} functions) collapses or expands any zone header in the quest log.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestLogUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_LOG_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestPoiUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_POI_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestWatchUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_WATCH_UPDATE',callback)},
    },
    QuestOffer: {
        /**
         *
         * Patch added: ?
         *
         * @param name Name of player who is starting escort quest.
         * @param questTitle Title of escort quest.  Eg. "Protecting the Shipment"
         */
        OnQuestAcceptConfirm(frame: WoWAPI.Frame, callback: (name: string,questTitle: string)=>void) { addEvent(frame,'QUEST_ACCEPT_CONFIRM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestFinished(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_FINISHED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestGreeting(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_GREETING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestItemUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_ITEM_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnQuestProgress(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'QUEST_PROGRESS',callback)},
    },
    ResearchInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnArchaeologyClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ARCHAEOLOGY_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnArchaeologyToggle(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ARCHAEOLOGY_TOGGLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name The name of the completed artifact.
         */
        OnResearchArtifactComplete(frame: WoWAPI.Frame, callback: (name: string)=>void) { addEvent(frame,'RESEARCH_ARTIFACT_COMPLETE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnResearchArtifactDigSiteUpdated(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'RESEARCH_ARTIFACT_DIG_SITE_UPDATED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnResearchArtifactHistoryReady(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'RESEARCH_ARTIFACT_HISTORY_READY',callback)},
    },
    RestrictedActions: {
        /**
         *
         * Patch added: ?
         *
         * @param isTainted
         * @param func
         */
        OnAddonActionBlocked(frame: WoWAPI.Frame, callback: (isTainted: string,func: string)=>void) { addEvent(frame,'ADDON_ACTION_BLOCKED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isTainted Name of the AddOn that was last involved in the execution path. It's very possible that the name will not be the name of the addon that tried to call the protected function.
         * @param func The protected function that was called.
         */
        OnAddonActionForbidden(frame: WoWAPI.Frame, callback: (isTainted: string,func: string)=>void) { addEvent(frame,'ADDON_ACTION_FORBIDDEN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param func
         */
        OnMacroActionBlocked(frame: WoWAPI.Frame, callback: (func: string)=>void) { addEvent(frame,'MACRO_ACTION_BLOCKED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param func The name of the forbidden function, e.g. "ToggleRun()"
         */
        OnMacroActionForbidden(frame: WoWAPI.Frame, callback: (func: string)=>void) { addEvent(frame,'MACRO_ACTION_FORBIDDEN',callback)},
    },
    SkillInfo: {
        /**
         * Using [[API Frame RegisterUnitEvent|Frame:RegisterUnitEvent]] to register for this event does not appear to work.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSkillLinesChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SKILL_LINES_CHANGED',callback)},
    },
    Sound: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSoundDeviceUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SOUND_DEVICE_UPDATE',callback)},
    },
    SpecializationInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param curr Index of the talent group that is now active.
         * @param prev Index of the talent group that was active before changing.
         */
        OnActiveTalentGroupChanged(frame: WoWAPI.Frame, callback: (curr: number,prev: number)=>void) { addEvent(frame,'ACTIVE_TALENT_GROUP_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param cost Cost in copper.
         * @param respecType
         */
        OnConfirmTalentWipe(frame: WoWAPI.Frame, callback: (cost: number,respecType: number)=>void) { addEvent(frame,'CONFIRM_TALENT_WIPE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerTalentUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_TALENT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param isPetTalents
         */
        OnTalentsInvoluntarilyReset(frame: WoWAPI.Frame, callback: (isPetTalents: boolean)=>void) { addEvent(frame,'TALENTS_INVOLUNTARILY_RESET',callback)},
    },
    SpellActivationOverlay: {
        /**
         *
         * Patch added: ?
         *
         * @param spellID
         */
        OnSpellActivationOverlayGlowHide(frame: WoWAPI.Frame, callback: (spellID: number)=>void) { addEvent(frame,'SPELL_ACTIVATION_OVERLAY_GLOW_HIDE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param spellID
         */
        OnSpellActivationOverlayGlowShow(frame: WoWAPI.Frame, callback: (spellID: number)=>void) { addEvent(frame,'SPELL_ACTIVATION_OVERLAY_GLOW_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param spellID (nilable)
         */
        OnSpellActivationOverlayHide(frame: WoWAPI.Frame, callback: (spellID?: number)=>void) { addEvent(frame,'SPELL_ACTIVATION_OVERLAY_HIDE',callback)},
    },
    SpellBook: {
        /**
         *
         * Patch added: ?
         *
         * @param cancelledCast
         */
        OnCurrentSpellCastChanged(frame: WoWAPI.Frame, callback: (cancelledCast: boolean)=>void) { addEvent(frame,'CURRENT_SPELL_CAST_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param spellID
         * @param skillInfoIndex Number of the tab which the spell/ability is added to.
         * @param isGuildPerkSpell
         */
        OnLearnedSpellInTab(frame: WoWAPI.Frame, callback: (spellID: number,skillInfoIndex: number,isGuildPerkSpell: boolean)=>void) { addEvent(frame,'LEARNED_SPELL_IN_TAB',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param clampedNewQueueWindowMs
         */
        OnMaxSpellStartRecoveryOffsetChanged(frame: WoWAPI.Frame, callback: (clampedNewQueueWindowMs: number)=>void) { addEvent(frame,'MAX_SPELL_START_RECOVERY_OFFSET_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param totemSlot The number of the totem slot (1-4) affected by the update.  See {{api|GetTotemInfo|GetTotemInfo}}.
         */
        OnPlayerTotemUpdate(frame: WoWAPI.Frame, callback: (totemSlot: number)=>void) { addEvent(frame,'PLAYER_TOTEM_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param flyoutID (nilable)
         * @param spellID (nilable)
         * @param isLearned (nilable)
         */
        OnSpellFlyoutUpdate(frame: WoWAPI.Frame, callback: (flyoutID?: number,spellID?: number,isLearned?: boolean)=>void) { addEvent(frame,'SPELL_FLYOUT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param spellID
         * @param slot
         * @param page
         */
        OnSpellPushedToActionbar(frame: WoWAPI.Frame, callback: (spellID: number,slot: number,page: number)=>void) { addEvent(frame,'SPELL_PUSHED_TO_ACTIONBAR',callback)},

        /**
         * The spell you cast doesn't need to have any explicit "cooldown" of its own, since this event also triggers off of anything that incurs a GCD (global cooldown). In other words, it basically fires whenever you cast any spell or channel any spell.
          *
         ** ''(It may possibly even trigger from spells that are "off the GCD" and which don't have any cooldown of their own; but there's no way to verify that, since all spells in game that are "off the GCD" are special class "burst" abilities with long cooldowns.)''
          *
         ** It's worth noting that this event does NOT fire when spells ''finish'' their cooldown!
          *
         ** {{api|GetSpellCooldown}}
          *
         ** [https://www.townlong-yak.com/framexml/live/Blizzard_APIDocumentation#SPELL_UPDATE_COOLDOWN Blizzard API Documentation]
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSpellUpdateCooldown(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SPELL_UPDATE_COOLDOWN',callback)},

        /**
         * The definition of useable and unusable is somewhat confusing. Firstly, range is not taken into account. Secondly if a spell requires a valid target and doesn't have one it gets marked as useable. If it requires mana or rage and there isn't enough then it gets marked as unusable. This results in the following behaviour:
          *
         ** It appears that the definition of useable is a little inaccurate and relates more to how it is displayed on the action bar than whether you can use the spell. Also after being attacked the event started firing every two seconds and this continued until well after the attacker was dead. Targetting a fresh enemy seemed to stop it.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSpellUpdateUsable(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SPELL_UPDATE_USABLE',callback)},

        /**
         * ''In prior game versions, this event also fired every time the player navigated the spellbook (swapped pages/tabs), since that caused UpdateSpells to be called which in turn always triggered a SPELLS_CHANGED event. However, that API has been removed since [[Patch_4.0.1/API_changes|Patch 4.0.1]].''
         *
         * Patch added: ?
         *
         * @param args
         */
        OnSpellsChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SPELLS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnStartAutorepeatSpell(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'START_AUTOREPEAT_SPELL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnStopAutorepeatSpell(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'STOP_AUTOREPEAT_SPELL',callback)},

        /**
         * Fired when a unit tries to cast an instant, non-instant, or channeling spell even if out of range or out of line-of-sight (unless the unit is attempting to cast a non-instant spell while already casting or attempting to cast a spell that is on cooldown).
         *
         * Patch added: 2.0.1
         *
         * @param unit
         * @param target
         * @param castGUID e.g. for [[Flare]] (Spell ID 1543) &lt;code>"Cast-3-3783-1-7-1543-000197DD84"&lt;/code>
         * @param spellID
         */
        OnUnitSpellcastSent(frame: WoWAPI.Frame, callback: (unit: string,target: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_SENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateShapeshiftCooldown(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_SHAPESHIFT_COOLDOWN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateShapeshiftForm(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_SHAPESHIFT_FORM',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateShapeshiftForms(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_SHAPESHIFT_FORMS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateShapeshiftUsable(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_SHAPESHIFT_USABLE',callback)},
    },
    StableInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetStableClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_STABLE_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetStableShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_STABLE_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetStableUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_STABLE_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetStableUpdatePaperdoll(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_STABLE_UPDATE_PAPERDOLL',callback)},
    },
    System: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDisableTaxiBenchmark(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DISABLE_TAXI_BENCHMARK',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnEnableTaxiBenchmark(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'ENABLE_TAXI_BENCHMARK',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLogoutCancel(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LOGOUT_CANCEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerCamping(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_CAMPING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerEnteringWorld(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_ENTERING_WORLD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerLeavingWorld(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_LEAVING_WORLD',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerLogin(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_LOGIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerLogout(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_LOGOUT',callback)},

        /**
         * The dialog which appears after this event, has choices of "Exit Now" or "Cancel".
          *
         ** The dialog from {{api|t=e|PLAYER_CAMPING}} which appears when you try to '''logout''' outside an inn, only has a "Cancel" choice.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerQuiting(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_QUITING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param string
         * @param r
         * @param g
         * @param b
         */
        OnSysmsg(frame: WoWAPI.Frame, callback: (string: string,r: number,g: number,b: number)=>void) { addEvent(frame,'SYSMSG',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param totalTimePlayed Total time played in seconds.
         * @param timePlayedThisLevel Time played for the current level in seconds.
         */
        OnTimePlayedMsg(frame: WoWAPI.Frame, callback: (totalTimePlayed: number,timePlayedThisLevel: number)=>void) { addEvent(frame,'TIME_PLAYED_MSG',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param errorType see {{api|GetGameMessageInfo}}
         * @param message
         */
        OnUiErrorMessage(frame: WoWAPI.Frame, callback: (errorType: number,message: string)=>void) { addEvent(frame,'UI_ERROR_MESSAGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param errorType see {{api|GetGameMessageInfo}}
         * @param message
         */
        OnUiInfoMessage(frame: WoWAPI.Frame, callback: (errorType: number,message: string)=>void) { addEvent(frame,'UI_INFO_MESSAGE',callback)},

        /**
         * Since key bindings and macros in particular may be stored on the server they event may be delayed a bit beyond the original loading sequence.
          *
         ** Previously (prior to 3.0.1) this event was part of the loading sequence.  Although it still occurs within the same general timeframe as the other events, it no longer has a guaranteed order that can be relied on. This may be problematic to addons that relied on the order of {{api|t=e|VARIABLES_LOADED}}, specifically that it would fire before {{api|t=e|PLAYER_ENTERING_WORLD}}.
          *
         ** Addons should not use this event to check if their addon's saved variables have loaded.  They can use {{api|t=e|ADDON_LOADED}} (testing for arg1 being the name of the addon) or another appropriate event to initialize, ensuring that the addon works when loaded on demand.
          *
         ** [[AddOn loading process]]
          *
         ** [https://www.townlong-yak.com/framexml/live/Blizzard_APIDocumentation#VARIABLES_LOADED Blizzard API Documentation]
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVariablesLoaded(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VARIABLES_LOADED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnWowMouseNotFound(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'WOW_MOUSE_NOT_FOUND',callback)},
    },
    TaxiMap: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTaximapClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TAXIMAP_CLOSED',callback)},

        /**
         * This will fire even if you know no flight paths connected to the one you're at, so the map doesn't actually open.
         *
         * Patch added: ?
         *
         * @param system
         */
        OnTaximapOpened(frame: WoWAPI.Frame, callback: (system: number)=>void) { addEvent(frame,'TAXIMAP_OPENED',callback)},
    },
    TradeInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerTradeCurrency(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_TRADE_CURRENCY',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerTradeMoney(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_TRADE_MONEY',callback)},

        /**
         * Target agree status only shown when he has done it first. By this, player and target agree status is only shown together (playerAccepted  == 1 and targetAccepted == 1), when player agreed after target.
         *
         * Patch added: ?
         *
         * @param playerAccepted Player has agreed to the trade (1) or not (0)
         * @param targetAccepted Target has agreed to the trade (1) or not (0)
         */
        OnTradeAcceptUpdate(frame: WoWAPI.Frame, callback: (playerAccepted: number,targetAccepted: number)=>void) { addEvent(frame,'TRADE_ACCEPT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeCurrencyChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_CURRENCY_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeMoneyChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_MONEY_CHANGED',callback)},

        /**
         * Not initially fired when trading is started by dropping an item on target.
         *
         * Patch added: ?
         *
         * @param tradeSlotIndex
         */
        OnTradePlayerItemChanged(frame: WoWAPI.Frame, callback: (tradeSlotIndex: number)=>void) { addEvent(frame,'TRADE_PLAYER_ITEM_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param canBecomeBoundForTrade
         */
        OnTradePotentialBindEnchant(frame: WoWAPI.Frame, callback: (canBecomeBoundForTrade: boolean)=>void) { addEvent(frame,'TRADE_POTENTIAL_BIND_ENCHANT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param name
         */
        OnTradeRequest(frame: WoWAPI.Frame, callback: (name: string)=>void) { addEvent(frame,'TRADE_REQUEST',callback)},

        /**
         * Upon a trade being cancelled (as in, either part clicking the cancel button), TRADE_CLOSED is fired twice, and then {{api|t=e|TRADE_REQUEST_CANCEL}} once.
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeRequestCancel(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_REQUEST_CANCEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param tradeSlotIndex
         */
        OnTradeTargetItemChanged(frame: WoWAPI.Frame, callback: (tradeSlotIndex: number)=>void) { addEvent(frame,'TRADE_TARGET_ITEM_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_UPDATE',callback)},
    },
    TradeSkillUI: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeSkillClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_SKILL_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeSkillNameUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_SKILL_NAME_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTradeSkillShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRADE_SKILL_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateTradeskillRecast(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_TRADESKILL_RECAST',callback)},
    },
    Trainer: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTrainerClosed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRAINER_CLOSED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTrainerDescriptionUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRAINER_DESCRIPTION_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTrainerShow(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRAINER_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTrainerUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRAINER_UPDATE',callback)},
    },
    Transmog: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTransmogrifyClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRANSMOGRIFY_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTransmogrifyOpen(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRANSMOGRIFY_OPEN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTransmogrifySuccess(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRANSMOGRIFY_SUCCESS',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTransmogrifyUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRANSMOGRIFY_UPDATE',callback)},
    },
    Tutorial: {
        /**
         *
         * Patch added: ?
         *
         * @param tutorialIndex
         * @param forceShow
         */
        OnTutorialTrigger(frame: WoWAPI.Frame, callback: (tutorialIndex: number,forceShow: boolean)=>void) { addEvent(frame,'TUTORIAL_TRIGGER',callback)},
    },
    UI: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUiScaleChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UI_SCALE_CHANGED',callback)},
    },
    Vehicle: {
        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         * @param vehicleUIIndicatorID
         */
        OnPlayerGainsVehicleData(frame: WoWAPI.Frame, callback: (unitTarget: string,vehicleUIIndicatorID: number)=>void) { addEvent(frame,'PLAYER_GAINS_VEHICLE_DATA',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerLosesVehicleData(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_LOSES_VEHICLE_DATA',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         * @param showVehicleFrame Vehicle has vehicle UI.
         * @param isControlSeat
         * @param vehicleUIIndicatorID VehicleType (possible values are 'Natural' and 'Mechanical' and 'VehicleMount' and 'VehicleMount_Organic' or empty string).
         * @param vehicleGUID
         * @param mayChooseExit
         * @param hasPitch Vehicle can aim.
         */
        OnUnitEnteredVehicle(frame: WoWAPI.Frame, callback: (unitTarget: string,showVehicleFrame: boolean,isControlSeat: boolean,vehicleUIIndicatorID: number,vehicleGUID: string,mayChooseExit: boolean,hasPitch: boolean)=>void) { addEvent(frame,'UNIT_ENTERED_VEHICLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         * @param showVehicleFrame
         * @param isControlSeat
         * @param vehicleUIIndicatorID
         * @param vehicleGUID
         * @param mayChooseExit
         * @param hasPitch
         */
        OnUnitEnteringVehicle(frame: WoWAPI.Frame, callback: (unitTarget: string,showVehicleFrame: boolean,isControlSeat: boolean,vehicleUIIndicatorID: number,vehicleGUID: string,mayChooseExit: boolean,hasPitch: boolean)=>void) { addEvent(frame,'UNIT_ENTERING_VEHICLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitExitedVehicle(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_EXITED_VEHICLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitExitingVehicle(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_EXITING_VEHICLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param shouldShow (nilable)
         */
        OnVehicleAngleShow(frame: WoWAPI.Frame, callback: (shouldShow?: number)=>void) { addEvent(frame,'VEHICLE_ANGLE_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVehiclePassengersChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VEHICLE_PASSENGERS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param shouldShow (nilable)
         */
        OnVehiclePowerShow(frame: WoWAPI.Frame, callback: (shouldShow?: number)=>void) { addEvent(frame,'VEHICLE_POWER_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVehicleUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VEHICLE_UPDATE',callback)},
    },
    VideoOptions: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnDisplaySizeChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'DISPLAY_SIZE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnScreenshotFailed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SCREENSHOT_FAILED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnScreenshotSucceeded(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'SCREENSHOT_SUCCEEDED',callback)},
    },
    VoidStorageInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param slot Slot Index for {{api|GetVoidTransferDepositInfo}}
         * @param link Item Link
         */
        OnVoidDepositWarning(frame: WoWAPI.Frame, callback: (slot: number,link: string)=>void) { addEvent(frame,'VOID_DEPOSIT_WARNING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVoidStorageClose(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VOID_STORAGE_CLOSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVoidStorageContentsUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VOID_STORAGE_CONTENTS_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param slot Slot Index for {{api|GetVoidTransferDepositInfo}}
         */
        OnVoidStorageDepositUpdate(frame: WoWAPI.Frame, callback: (slot: number)=>void) { addEvent(frame,'VOID_STORAGE_DEPOSIT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVoidStorageOpen(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VOID_STORAGE_OPEN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVoidStorageUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VOID_STORAGE_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnVoidTransferDone(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'VOID_TRANSFER_DONE',callback)},
    },
    WorldStateInfo: {
        /**
         *
         * Patch added: ?
         *
         * @param timerType
         * @param timeRemaining
         * @param totalTime
         */
        OnStartTimer(frame: WoWAPI.Frame, callback: (timerType: number,timeRemaining: number,totalTime: number)=>void) { addEvent(frame,'START_TIMER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param timerID
         */
        OnWorldStateTimerStart(frame: WoWAPI.Frame, callback: (timerID: number)=>void) { addEvent(frame,'WORLD_STATE_TIMER_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param timerID
         */
        OnWorldStateTimerStop(frame: WoWAPI.Frame, callback: (timerID: number)=>void) { addEvent(frame,'WORLD_STATE_TIMER_STOP',callback)},
    },
    Unit: {
        /**
         *
         * Patch added: ?
         *
         * @param name The unit you are following. Not necessarily your target (in case of right-clicking a group member's portrait or using the "/follow" command).
         */
        OnAutofollowBegin(frame: WoWAPI.Frame, callback: (name: string)=>void) { addEvent(frame,'AUTOFOLLOW_BEGIN',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnAutofollowEnd(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'AUTOFOLLOW_END',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnCancelSummon(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'CANCEL_SUMMON',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param areaName
         */
        OnConfirmBinder(frame: WoWAPI.Frame, callback: (areaName: string)=>void) { addEvent(frame,'CONFIRM_BINDER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param summonReason
         * @param skippingStartExperience
         */
        OnConfirmSummon(frame: WoWAPI.Frame, callback: (summonReason: number,skippingStartExperience: boolean)=>void) { addEvent(frame,'CONFIRM_SUMMON',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnIncomingResurrectChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'INCOMING_RESURRECT_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnKnownTitlesUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'KNOWN_TITLES_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnLocalplayerPetRenamed(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'LOCALPLAYER_PET_RENAMED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param timerName
         * @param paused pause duration
         */
        OnMirrorTimerPause(frame: WoWAPI.Frame, callback: (timerName: string,paused: number)=>void) { addEvent(frame,'MIRROR_TIMER_PAUSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param timerName e.g. "BREATH"
         * @param value start-time in ms, e.g. 180000
         * @param maxValue max-time in ms, e.g. 180000
         * @param scale time added per second in seconds, for e.g. -1
         * @param paused
         * @param timerLabel e.g. "Breath"
         */
        OnMirrorTimerStart(frame: WoWAPI.Frame, callback: (timerName: string,value: number,maxValue: number,scale: number,paused: number,timerLabel: string)=>void) { addEvent(frame,'MIRROR_TIMER_START',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param timerName e.g. "BREATH"
         */
        OnMirrorTimerStop(frame: WoWAPI.Frame, callback: (timerName: string)=>void) { addEvent(frame,'MIRROR_TIMER_STOP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetBarUpdateUsable(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_BAR_UPDATE_USABLE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPetUiUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PET_UI_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerDamageDoneMods(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_DAMAGE_DONE_MODS',callback)},

        /**
         * PLAYER_ENTER_COMBAT and {{api|t=e|PLAYER_LEAVE_COMBAT}} are for *MELEE* combat only. They fire when you initiate autoattack and when you turn it off. However, any spell or ability that does not turn on autoattack does not trigger it. Nor does it trigger when you get aggro.
          *
         ** You probably want {{api|t=e|PLAYER_REGEN_DISABLED}} (fires when you get aggro) and {{api|t=e|PLAYER_REGEN_ENABLED}} (fires when you lose aggro).''
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerEnterCombat(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_ENTER_COMBAT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerFarsightFocusChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_FARSIGHT_FOCUS_CHANGED',callback)},

        /**
         * WoW condenses simultaneous flag changes into a single event. If you are currently AFK and not(DND) but you type /dnd you'll see two Chat Log messages ("You are no longer AFK" and "You are now DND: Do Not Disturb") but you'll only see a single PLAYER_FLAGS_CHANGED event.
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerFlagsChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_FLAGS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerFocusChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_FOCUS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerLeaveCombat(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_LEAVE_COMBAT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param 1. level New player level. ''Note that {{api|UnitLevel}}("player") will most likely return an incorrect value when called in this event handler or shortly after, so use this value.''
         * @param 2. healthDelta Hit points gained from leveling.
         * @param 3. powerDelta Mana points gained from leveling.
         * @param 4. numNewTalents Talent points gained from leveling.
         * @param 5. numNewPvpTalentSlots
         * @param 6. strengthDelta
         * @param 7. agilityDelta
         * @param 8. staminaDelta
         * @param 9. intellectDelta
         */
        OnPlayerLevelUp(frame: WoWAPI.Frame, callback: (level: number,healthDelta: number,powerDelta: number,numNewTalents: number,numNewPvpTalentSlots: number,strengthDelta: number,agilityDelta: number,staminaDelta: number,intellectDelta: number)=>void) { addEvent(frame,'PLAYER_LEVEL_UP',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerPvpKillsChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_PVP_KILLS_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerPvpRankChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_PVP_RANK_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerRegenDisabled(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_REGEN_DISABLED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerRegenEnabled(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_REGEN_ENABLED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerTargetChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_TARGET_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlayerUpdateResting(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYER_UPDATE_RESTING',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnPlayerXpUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'PLAYER_XP_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param runeIndex
         * @param added (nilable) - is the rune usable (if usable, it's not cooling, if not usable it's cooling)
         */
        OnRunePowerUpdate(frame: WoWAPI.Frame, callback: (runeIndex: number,added?: boolean)=>void) { addEvent(frame,'RUNE_POWER_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitAttack(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_ATTACK',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitAttackPower(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_ATTACK_POWER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitAttackSpeed(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_ATTACK_SPEED',callback)},

        /**
         * This event fires before the associated effects take place.
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitAura(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_AURA',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitClassificationChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_CLASSIFICATION_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         * @param event Action, Damage, etc (e.g. HEAL, DODGE, BLOCK, WOUND, MISS, PARRY, RESIST, ...)
         * @param flagText Critical/Glancing indicator (e.g. CRITICAL, CRUSHING, GLANCING)
         * @param amount The numeric damage
         * @param schoolMask Damage type in numeric value (1 - physical; 2 - holy; 4 - fire; 8 - nature; 16 - frost; 32 - shadow; 64 - arcane)
         */
        OnUnitCombat(frame: WoWAPI.Frame, callback: (unitTarget: string,event: string,flagText: string,amount: number,schoolMask: number)=>void) { addEvent(frame,'UNIT_COMBAT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         * @param isConnected
         */
        OnUnitConnection(frame: WoWAPI.Frame, callback: (unitTarget: string,isConnected: boolean)=>void) { addEvent(frame,'UNIT_CONNECTION',callback)},

        /**
         * Be warned that this often gets fired multiple times, for example when you change weapons.
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitDamage(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_DAMAGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitDefense(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_DEFENSE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitDisplaypower(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_DISPLAYPOWER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitHealPrediction(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_HEAL_PREDICTION',callback)},

        /**
         *
         * Patch added: 1.1.0
         *
         * @param args
         */
        OnUnitHealth(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UNIT_HEALTH',callback)},

        /**
         * This event is not triggered when equipping/unequipping rings or trinkets.
          *
         ** This can also be called if your target or party members changes equipment (untested for hostile targets).
          *
         ** This event is also raised when a new item is placed in the player's containers, taking up a new slot. If the new item(s) are placed onto an existing stack or when two stacks already in the containers are merged, the event is not raised. When an item is moved inside the container or to the bank, the event is not raised. The event ''is'' raised when an existing stack is split inside the player's containers.
          *
         ** This event is also raised when a temporary enhancement (poison, lure, etc..) is applied to the player's weapon (untested for other units). It will again be raised when that enhancement is removed, including by manual cancellation or buff expiration.
          *
         ** If multiple slots are equipped/unequipped at once it only fires once now.
          *
         ** This event is triggered during initial character login but not during subsequent reloads.
          *
         ** This event is no longer triggered when changing zones. Inventory information is available when {{api|t=e|PLAYER_ENTERING_WORLD}} is triggered.
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitInventoryChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_INVENTORY_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitLevel(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_LEVEL',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUnitMana(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UNIT_MANA',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitMaxhealth(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_MAXHEALTH',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitModelChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_MODEL_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitNameUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_NAME_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[unitId]] that has just become visible or invisible to the player
         */
        OnUnitPhase(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_PHASE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitPortraitUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_PORTRAIT_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitPowerBarHide(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_POWER_BAR_HIDE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitPowerBarShow(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_POWER_BAR_SHOW',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitPowerBarTimerUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_POWER_BAR_TIMER_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         * @param powerType
         */
        OnUnitPowerFrequent(frame: WoWAPI.Frame, callback: (unitTarget: string,powerType: string)=>void) { addEvent(frame,'UNIT_POWER_FREQUENT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         * @param powerType resource whose value changed: "MANA", "RAGE", "ENERGY", "FOCUS", "HAPPINESS", "RUNIC_POWER", "HOLY_POWER".
         */
        OnUnitPowerUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string,powerType: string)=>void) { addEvent(frame,'UNIT_POWER_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitQuestLogChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_QUEST_LOG_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitRangedAttackPower(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_RANGED_ATTACK_POWER',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitRangeddamage(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_RANGEDDAMAGE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitResistances(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_RESISTANCES',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastChannelStart(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_CHANNEL_START',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastChannelStop(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_CHANNEL_STOP',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastChannelUpdate(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_CHANNEL_UPDATE',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastDelayed(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_DELAYED',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastFailed(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_FAILED',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastFailedQuiet(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_FAILED_QUIET',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastInterrupted(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_INTERRUPTED',callback)},

        /**
         *
         * Patch added: 3.2.0
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitSpellcastInterruptible(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_SPELLCAST_INTERRUPTIBLE',callback)},

        /**
         *
         * Patch added: 3.2.0
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitSpellcastNotInterruptible(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_SPELLCAST_NOT_INTERRUPTIBLE',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastStart(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_START',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unitTarget
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastStop(frame: WoWAPI.Frame, callback: (unitTarget: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_STOP',callback)},

        /**
         *
         * Patch added: 2.0.1
         *
         * @param unit [[UnitId]]
         * @param castGUID
         * @param spellID
         */
        OnUnitSpellcastSucceeded(frame: WoWAPI.Frame, callback: (unit: string,castGUID: string,spellID: number)=>void) { addEvent(frame,'UNIT_SPELLCAST_SUCCEEDED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitStats(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_STATS',callback)},

        /**
         * Should also work for 'pet' and 'focus'. This event only fires when the triggering unit is within the player's visual range.
         *
         * Patch added: ?
         *
         * @param unitTarget [[UnitId]]
         */
        OnUnitTarget(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_TARGET',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param unitTarget
         */
        OnUnitTargetableChanged(frame: WoWAPI.Frame, callback: (unitTarget: string)=>void) { addEvent(frame,'UNIT_TARGETABLE_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUnitThreatListUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UNIT_THREAT_LIST_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUnitThreatSituationUpdate(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UNIT_THREAT_SITUATION_UPDATE',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateExhaustion(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_EXHAUSTION',callback)},

        /**
         * Fired when the target of the "mouseover" [[UnitId]] has changed and is a 3d model. (Does not fire when {{api|UnitExists}}("mouseover") becomes nil, or if you mouse over a unitframe.)
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateMouseoverUnit(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_MOUSEOVER_UNIT',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnUpdateStealth(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'UPDATE_STEALTH',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param normalizedPitch
         * @param radians
         */
        OnVehicleAngleUpdate(frame: WoWAPI.Frame, callback: (normalizedPitch: number,radians: number)=>void) { addEvent(frame,'VEHICLE_ANGLE_UPDATE',callback)},
    },
    NonBlizzard_documented: {
        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnPlaytimeChanged(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'PLAYTIME_CHANGED',callback)},

        /**
         *
         * Patch added: ?
         *
         * @param args
         */
        OnTrialCapReachedLevel(frame: WoWAPI.Frame, callback: (...args: any[])=>void) { addEvent(frame,'TRIAL_CAP_REACHED_LEVEL',callback)},
    },
}