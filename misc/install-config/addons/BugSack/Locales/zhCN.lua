local L = LibStub("AceLocale-3.0"):NewLocale("BugSack", "zhCN")
if not L then return end

-- Common
L["You have no bugs, yay!"] = "没有发生错误。\\^o^//"

-- BugSack window
L["Next >"] = "下一个>"
L["< Previous"] = "<前一个"
L["Send bugs"] = "发送错误"
L["Today"] = "今日"
L["Sent by %s (%s)"] = "%s发送（%s）"
L["Local (%s)"] = "本地（%s）"

L["Send"] = "发送"
L["Send all bugs from the currently viewed session (%d) in the sack to the player specified below."] = "发送当前查看会话（%d）所有错误给下列玩家。"

-- Options
L["Auto popup"] = "自动弹出"
L.autoDesc = "遇到错误是否自动弹出 BugSack 窗口。"
L["Chatframe output"] = "聊天栏输出"
L.chatFrameDesc = "当发生错误的时，在聊天栏中显示。不是整个错误，只是一个提醒！"
L["Sound"] = "音效"
L["Filter addon mistakes"] = "过滤插件错误"
L.filterDesc = "不论 BugSack 可能对 ADDON_ACTION_BLOCKED 和 ADDON_ACTION_FORBIDDEN 事件认为错误与否。如果这样做没有意义，忽略这个选项。"
L["Throttle at excessive amount"] = "过度错误数量过滤"
L.throttleDesc = "一些插件可能每秒生成成百个错误，从而影响了正常游戏。启用此选项，将会截流错误，防止发生影响正常游戏。"
L["Save errors"] = "保存错误"
L.saveDesc = "保存在数据库中的错误。如果次选项关闭，错误也不会从会话到会话。"
L["Limit"] = "限制"
L["Wipe saved bugs"] = "清除已保存错误"
L.wipeDesc = "清除数据库中所有已保存错误。"

-- Chat messages
L["You've received %d bugs from %s."] = "你已接收到%d个错误从%s。"
L["%d bugs have been sent to %s. He must have BugSack to be able to examine them."] = "%d个错误已经发送给%s。他必须安装 BugSack 插件才能查看错误信息。"
L["All stored bugs have been exterminated painfully."] = "所有已保存的错误已经被清除。"
L["There's a bug in your soup!"] = "这里有一个恶心的错误！"

-- LDB
L["|cffeda55fClick|r to open BugSack with the last bug. |cffeda55fShift-Click|r to reload the user interface. |cffeda55fAlt-Click|r to clear the sack."] = "|cffeda55f点击|r打开 BugSack 及最后一错误信息。|cffeda55fShift-点击|r重新加载用户界面。|cffeda55fAlt-点击|r清除储存错误信息。"
L["Minimap icon"] = "小地图按钮"
L["Toggle the minimap icon."] = "切换小地图按钮。"

