local L = LibStub("AceLocale-3.0"):NewLocale("BugSack", "zhTW")
if not L then return end

-- Common
L["You have no bugs, yay!"] = "沒有發生錯誤。\\^o^//"

-- BugSack window
L["Next >"] = "下一個>"
L["< Previous"] = "<前一個"
L["Send bugs"] = "發送錯誤"
L["Today"] = "今日"
L["Sent by %s (%s)"] = "%s發送（%s）"
L["Local (%s)"] = "本地（%s）"

L["Send"] = "發送"
L["Send all bugs from the currently viewed session (%d) in the sack to the player specified below."] = "發送當前查看會話（%d）所有錯誤給下列玩家。"

-- Options
L["Auto popup"] = "自動彈出"
L.autoDesc = "遇到錯誤是否自動彈出 BugSack 窗口。"
L["Chatframe output"] = "聊天欄輸出"
L.chatFrameDesc = "當發生錯誤的時，在聊天欄中顯示。不是整個錯誤，只是一個提醒！"
L["Sound"] = "音效"
L["Mute"] = "沈默"
L.muteDesc = "Prevents BugSack from playing the 'Worms'-style sound when a bug is detected."
L["Filter addon mistakes"] = "過濾插件錯誤"
L.filterDesc = "不論 BugSack 可能對 ADDON_ACTION_BLOCKED 和 ADDON_ACTION_FORBIDDEN 事件認為錯誤與否。如果這樣做沒有意義，忽略這個選項。"
L["Throttle at excessive amount"] = "過度錯誤數量過濾"
L.throttleDesc = "一些插件可能每秒生成成百個錯誤，從而影響了正常遊戲。啟用此選項，將會截流錯誤，防止發生影響正常遊戲。"
L["Save errors"] = "保存錯誤"
L.saveDesc = "保存在數據庫中的錯誤。如果次選項關閉，錯誤也不會從會話到會話。"
L["Limit"] = "限制"
L["Wipe saved bugs"] = "清除已保存錯誤"
L.wipeDesc = "清除數據庫中所有已保存錯誤。"
L["Minimap icon"] = "小地圖圖示"
L.minimapDesc = "圍繞著你的小地圖顯示BugSack圖示。"

-- Chat messages
L["You've received %d bugs from %s."] = "你已從%s接收到%d個錯誤。"
L["%d bugs have been sent to %s. He must have BugSack to be able to examine them."] = "%d個錯誤已經發送給%s。他必須安裝 BugSack 插件才能查看錯誤信息。"
L["All stored bugs have been exterminated painfully."] = "所有已保存的錯誤已經被清除。"
L["There's a bug in your soup!"] = "這裡有一個噁心的錯誤！"

-- LDB
L["|cffeda55fClick|r to open BugSack with the last bug. |cffeda55fShift-Click|r to reload the user interface. |cffeda55fAlt-Click|r to clear the sack."] = "|cffeda55f點擊|r打開BugSack 及最後一錯誤信息。|cffeda55fShift-點擊|r重新加載用戶界面。|cffeda55fAlt-點擊|r清除儲存錯誤信息。"
L["Minimap icon"] = "小地圖按鈕"
L["Toggle the minimap icon."] = "切換小地圖按鈕。" 