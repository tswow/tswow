--
-- $Id: BugGrabber.lua 152 2010-07-03 00:15:19Z rabbit $
--
-- The BugSack and BugGrabber team is:
-- Current Developer: Rabbit
-- Past Developers: Rowne, Ramble, industrial, Fritti, kergoth, ckknight
-- Testers: Ramble, Sariash
--
--[[

BugGrabber, World of Warcraft addon that catches errors and formats them with a debug stack.
Copyright (C) 2008 The BugGrabber Team

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

]]

MAX_BUGGRABBER_ERRORS = 1000

-- If we get more errors than this per second, we stop all capturing until the
-- user tells us to continue.
BUGGRABBER_ERRORS_PER_SEC_BEFORE_THROTTLE = 20
BUGGRABBER_TIME_TO_RESUME = 60
BUGGRABBER_SUPPRESS_THROTTLE_CHAT = nil

-- Localization
local CMD_CREATED = "An error has been detected, use /buggrabber to print it."
local USAGE = "Usage: /buggrabber <1-%d>."
local ERROR_INDEX = "The provided index must be a number."
local ERROR_UNKNOWN_INDEX = "The index %d does not exist in the load error table."
local STARTUP_ERRORS = "There were %d startup errors:"
local STARTUP_ERRORS_MANY = "There were %d startup errors, please use /buggrabber <number> to print them."
local UNIQUE_CAPTURE = "BugGrabber captured a unique error:\n%s\n---"
local ADDON_CALL_PROTECTED = "[%s] AddOn '%s' tried to call the protected function '%s'."
local ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (AddOn '.*' tried to call the protected function '.*'.)$"
local ADDON_DISABLED = "|cffffff7fBugGrabber|r and |cffffff7f%s|r cannot coexist together. |cffffff7f%s|r has been disabled because of this. If you want to, you may exit out, disable |cffffff7fBugGrabber|r and reenable |cffffff7f%s|r."
local BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r has stopped capturing errors, since it has captured more than %d errors per second. Capturing will resume in %d seconds."
local BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r is capturing errors again."

if GetLocale() == "koKR" then
	USAGE = "사용법: /buggrabber <1-%d>."
	ERROR_INDEX = "색인값은 숫자이어야 합니다."
	ERROR_UNKNOWN_INDEX = "불러온 오류목록에 %d번째 오류는 존재하지 않습니다."
	STARTUP_ERRORS = "%d개의 시작시 오류가 발생:"
	STARTUP_ERRORS_MANY = "%d개의 시작시 오류가 발생했습니다, /buggrabber <숫자>를 사용해서 해당 오류를 볼 수 있습니다."
	UNIQUE_CAPTURE = "벌레잡이가 발견한 오류:\n%s\n---"
elseif GetLocale() == "deDE" then
	CMD_CREATED = "Ein Fehler wurde entdeckt, benutze /buggrabber um ihn anzuzeigen."
	USAGE = "Benutzung: /buggrabber <1-%d>."
	ERROR_INDEX = "Der zur Verfügung gestellte Index muß eine Zahl sein."
	ERROR_UNKNOWN_INDEX = "Der Index %d existiert nicht in der geladenen Fehlerliste."
	STARTUP_ERRORS = "Es gab %d Fehler beim Start:"
	STARTUP_ERRORS_MANY = "Es gab %d Fehler beim Start, verwende bitte /buggrabber <Anzahl> um sie aufzulisten."
	UNIQUE_CAPTURE = "BugGrabber hat einen einzigartigen Fehler aufgezeichnet:\n%s\n---"
	ADDON_CALL_PROTECTED = "[%s] AddOn '%s' hat versucht die geschützte Funktion '%s' aufzurufen."
	ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (AddOn '.*' hat versucht die geschützte Funktion '.*' aufzurufen.)$"
	ADDON_DISABLED = "|cffffff7fBugGrabber|r und |cffffff7f%s|r können nicht zusammen laufen, |cffffff7f%s|r wurde deshalb deaktiviert. Du kannst jetzt WoW schließen, |cffffff7fBugGrabber|r deaktivieren und |cffffff7f%s|r erneut aktivieren."
	BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r hat die Aufzeichnung von Fehlern gestoppt, weil mehr als %d Fehler pro Sekunde erzeugt wurden. Die Aufzeichnung wird in %d Sekunden fortgesetzt."
	BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r zeichnet nun wieder Fehler auf."
elseif GetLocale() == "esES" then
	CMD_CREATED = "Un error ha sido detectado, utiliza /buggrabber para imprimirlo."
	USAGE = "Uso: /buggrabber <1-%d>."
	ERROR_INDEX = "El \195\173ndice introducido debe ser un n\195\186mero."
	ERROR_UNKNOWN_INDEX = "El \195\173ndice %d no existe en la tabla de errores de carga."
	STARTUP_ERRORS = "Ha habido %d errores de arranque:"
	STARTUP_ERRORS_MANY = "Ha habido %d errores de arranque, por favor, usa /buggrabber <number> para listarlos."
	UNIQUE_CAPTURE = "BugGrabber ha capturado un \195\186nico error:\n%s\n---"
	ADDON_CALL_PROTECTED = "[%s] El accesorio '%s' ha intentado llamar a la funci\195\179n protegida '%s'."
	ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (El accesorio '.*' ha intentado llamar a la funci\195\179n protegida '.*'.)$"
	ADDON_DISABLED = "|cffffff7fBugGrabber|r y |cffffff7f%s|r no pueden coexistir juntos. |cffffff7f%s|r ha sido desactivado por este motivo. Si lo deseas, puedes salir, desactivar |cffffff7fBugGrabber|r y reactivar |cffffff7f%s|r."
	BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r ha detenido la captuta de errores, ya que ha capturado m\195\161s de %d errores por segundo. La captura se reanudar\195\161 en %d segundos."
	BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r est\195\161 capturando errores de nuevo."
elseif GetLocale() == "zhTW" then
	CMD_CREATED = "發現錯誤，用 /buggrabber 列出這錯誤。"
	USAGE = "用法：/buggrabber <1-%d>。"
	ERROR_INDEX = "提供的索引值必須是數字。"
	ERROR_UNKNOWN_INDEX = "提供的索引值「%d」不是正確的。"
	STARTUP_ERRORS = "在啟動時發生%d個錯誤："
	STARTUP_ERRORS_MANY = "在啟動時發生%d個錯誤，請使用 /buggrabber <索引值> 來列出。"
	UNIQUE_CAPTURE = "捕捉到新的錯誤：\n%s\n---"
	ADDON_CALL_PROTECTED = "[%s] 插件 '%s' 嘗試調用保護功能 '%s'。"
	ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (插件 '.*' 嘗試調用保護功能 '.*'.)$"
	ADDON_DISABLED = "|cffffff7fBugGrabber|r 和 |cffffff7f%s|r 不能共存。|cffffff7f%s|r 已停用。可在插件介面停用 |cffffff7fBugGrabber|r，再用 |cffffff7f%s|r。"
	BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r 現正暫停，因為每秒捕捉到超過%d個錯誤。它會在%d秒後重新開始。"
	BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r 已重新開始。"
elseif GetLocale() == "zhCN" then
	CMD_CREATED = "发现一个错误，用 /buggrabber 列出这个错误。"
	USAGE = "用法：/buggrabber <1-%d>。"
	ERROR_INDEX = "提供的索引值必须是数字。"
	ERROR_UNKNOWN_INDEX = "提供的索引值「%d」不是正确的。"
	STARTUP_ERRORS = "在启动时发生%d个错误："
	STARTUP_ERRORS_MANY = "在启动时发生%d个错误，请使用 /buggrabber <索引值>来列出。"
	UNIQUE_CAPTURE = "BugGrabber 捕捉到新的错误：\n%s\n---"
	ADDON_CALL_PROTECTED = "[%s] 插件 '%s' 尝试调用保护功能 '%s'。"
	ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (插件 '.*' 尝试调用保护功能 '.*'.)$"
	ADDON_DISABLED = "|cffffff7fBugGrabber|r 和 |cffffff7f%s|r 不能共存。|cffffff7f%s|r 已停用。可在插件界面停用 |cffffff7fBugGrabber|r 再用 |cffffff7f%s|r。"
	BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r 现正暂停，因为每秒捕捉到超过%d个错误。它会在%d秒后重新开始。"
	BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r 已重新开始。"
elseif GetLocale() == "ruRU" then
	CMD_CREATED = "Ошибка была обнаружена, спользуйте /buggrabber чтобы напечатать ее."
	USAGE = "Использование: /buggrabber <1-%d>."
	ERROR_INDEX = "Предоставленный индекс должен быть числом"
	ERROR_UNKNOWN_INDEX = "Индекс  %d  не существует в загруженной таблице ошибок."
	STARTUP_ERRORS = "были %d Ошибками Старта:"
	STARTUP_ERRORS_MANY = "Были %d Ошибками Запуска, используйте /buggrabber <номер> чтобы их напечатать."
	UNIQUE_CAPTURE = "BugGrabber захватил уникальную ошибку:\n%s\n---"
	--ADDON_CALL_PROTECTED = "[%s] Аддон '%s' Пытался исполнить защищенную '%s' Функцию."
	--ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (Аддон '.*' пытался исполнить '.*' функцию.)$"
	ADDON_DISABLED = "|cffffff7fBugGrabber|r и |cffffff7f%s|r не может существовать вместе, |cffffff7f%s|r был неисправный. если хотите выдите из WoW nun отключите неисправный аддон, |cffffff7fBugGrabber|r повторно запустил аддон|cffffff7f%s|r."
	BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r прекратил захватытвать ошибки, так как он захватил больше %d ошибок  в секунду. Захват возобновиться в течении %d Секунд."
	BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r захватил ошибки снова."
elseif GetLocale() == "frFR" then
	CMD_CREATED = "Une erreur a été détectée, tapez /buggrabber pour l'afficher."
	USAGE = "Utilisation: /buggrabber <1-%d>."
	ERROR_INDEX = "L'élément donné doit être un nombre."
	ERROR_UNKNOWN_INDEX = "L'élément %d n'existe pas dans la table d'erreurs chargée."
	STARTUP_ERRORS = "Il y a eu %d erreurs au démarrage:"
	STARTUP_ERRORS_MANY = "Il y a eu %d erreurs au démarrage, merci d'utiliser /buggrabber <nombre> pour les afficher."
	--UNIQUE_CAPTURE = "BugGrabber a capturé une seule erreur:\n%s\n---"
	ADDON_CALL_PROTECTED = "[%s] L'AddOn '%s' a tenté d'appeler la fonction protégée '%s'."
	ADDON_CALL_PROTECTED_MATCH = "^%[(.*)%] (L'AddOn '.*' a tenté d'appeler la fonction protégée '.*'.)$"
	ADDON_DISABLED = "|cffffff7fBugGrabber|r et |cffffff7f%s|r ne peuvent pas être lancés en même temps. |cffffff7f%s|r a été désactivé. Si vous le souhaitez, vous pouvez vous déconnecter, désactiver |cffffff7fBugGrabber|r et réactiver |cffffff7f%s|r."
	BUGGRABBER_STOPPED = "|cffffff7fBugGrabber|r a cessé de capturer des erreurs, car plus de %d erreurs ont été capturées par seconde. La capture sera reprise dans %d secondes."
	BUGGRABBER_RESUMING = "|cffffff7fBugGrabber|r capture les erreurs à nouveau."
end

local _G = getfenv(0)

local BugGrabber = {}
local frame = CreateFrame("Frame")

local real_seterrorhandler = seterrorhandler

local totalElapsed = 0
local errorsSinceLastReset = 0
local paused = nil
local looping = false

local stateErrorDatabase = {}
local slashCmdCreated = nil
local slashCmdErrorList = {}

local isBugGrabbedRegistered = false
local callbacks = nil
local function setupCallbacks()
	if not callbacks and LibStub and LibStub("CallbackHandler-1.0", true) then
		callbacks = LibStub("CallbackHandler-1.0"):New(BugGrabber)
		function callbacks:OnUsed(target, eventname)
			if eventname == "BugGrabber_BugGrabbed" then isBugGrabbedRegistered = true end
		end
		function callbacks:OnUnused(target, eventname)
			if eventname == "BugGrabber_BugGrabbed" then isBugGrabbedRegistered = false end
		end
	end
end
local function triggerEvent(...)
	if not callbacks then setupCallbacks() end
	if callbacks then callbacks:Fire(...) end
end

local function slashHandler(index)
	if not index or tostring(index) == "" then
		print(USAGE:format(#slashCmdErrorList))
		return
	end
	if not tonumber(index) then
		print(ERROR_INDEX)
		return
	end
	index = tonumber(index)
	if not slashCmdErrorList[index] then
		print(ERROR_UNKNOWN_INDEX:format(index))
		return
	end
	local err = slashCmdErrorList[index]
	if type(err) ~= "table" or (type(err.message) ~= "string" and type(err.message) ~= "table") then return end
	if BugSack and type(BugSack.FormatError) == "function" then
		print(tostring(index) .. ". " .. BugSack:FormatError(err))
	else
		local m = err.message
		if type(m) == "table" then
			m = table.concat(m, "")
		end
		print(tostring(index) .. ". " .. m)
	end
end

local function createSlashCmd()
	if slashCmdCreated then return end
	local name = "BUGGRABBERCMD"
	local counter = 0
	repeat
		name = "BUGGRABBERCMD"..tostring(counter)
		counter = counter + 1
	until not _G.SlashCmdList[name] and not _G["SLASH_"..name.."1"]
	_G.SlashCmdList[name] = slashHandler
	_G["SLASH_"..name.."1"] = "/buggrabber"

	slashCmdCreated = true
	if not isBugGrabbedRegistered then
		print(CMD_CREATED)
	end
end

local function saveError(message, errorType)
	-- Start with the date, time and session
	local oe = {}
	oe.message = message .. "\n  ---"
	oe.session = BugGrabberDB.session
	oe.time = date("%Y/%m/%d %H:%M:%S")
	oe.type = errorType
	oe.counter = 1

	-- WoW crashes when strings > 983 characters are stored in the
	-- SavedVariables file, so make sure we don't exceed that limit.
	-- For lack of a better thing to do, just truncate the error :-/
	if oe.message:len() > 980 then
		local m = oe.message
		oe.message = {}
		local maxChunks, chunks = 5, 0
		while m:len() > 980 and chunks <= maxChunks do
			local q
			q, m = m:sub(1, 980), m:sub(981)
			oe.message[#oe.message + 1] = q
			chunks = chunks + 1
		end
		if m:len() > 980 then m = m:sub(1, 980) end
		oe.message[#oe.message + 1] = m
	end

	-- Insert the error into the correct database if it's not there already.
	-- If it is, just increment the counter.
	local found = false
	local db = BugGrabber:GetDB()
	local oe_message = oe.message
	if type(oe_message) == "table" then
		oe_message = oe_message[1]
	end
	for i, err in next, db do
		local err_message = err.message
		if type(err_message) == "table" then
			err_message = err_message[1]
		end
		if err_message == oe_message and err.session == oe.session then
			-- This error already exists in the current session, just increment
			-- the counter on it.
			if type(err.counter) ~= "number" then
				err.counter = 1
			end
			err.counter = err.counter + 1

			oe = nil
			oe = err

			found = true
			break
		end
	end

	-- If the error was not found in the current session, append it to the
	-- database.
	if not found then
		BugGrabber:StoreError(oe)
	end

	-- Trigger event.
	if not looping then
		local e = "BugGrabber_" .. (errorType == "event" and "Event" or "Bug") .. "Grabbed" .. (found and "Again" or "")
		triggerEvent(e, oe)

		if not found then
			slashCmdErrorList[#slashCmdErrorList + 1] = oe
			createSlashCmd()
		end
	end
end

function BugGrabber:StoreError(errorObject)
	local db = BugGrabber:GetDB()
	db[#db + 1] = errorObject

	-- Save only the last <limit> errors (otherwise the SV gets too big)
	if #db > BugGrabberDB.limit then
		table.remove(db, 1)
	end
end

local function scan(o)
	local version, revision = nil, nil
	for k, v in pairs(o) do
		if type(k) == "string" then
			local low = k:lower()
			if not version and (low == "version" or low:find("version")) and (type(v) == "string" or type(v) == "number") then
				version = v
			elseif not revision and (low == "rev" or low:find("revision")) and (type(v) == "string" or type(v) == "number")  then
				revision = v
			end
		end
		if version and revision then break end
	end
	return version, revision
end

-- Error handler
local function grabError(err)
	if paused then return end
	err = tostring(err)

	-- Get the full backtrace
	local real =
		err:find("^.-([^\\]+\\)([^\\]-)(:%d+):(.*)$") or
		err:find("^%[string \".-([^\\]+\\)([^\\]-)\"%](:%d+):(.*)$") or
		err:find("^%[string (\".-\")%](:%d+):(.*)$") or err:find("^%[C%]:(.*)$")

	err = err .. "\n" .. debugstack(real and 4 or 3)
	local errorType = "error"

	-- Normalize the full paths into last directory component and filename.
	local errmsg = ""
	looping = false

	for trace in err:gmatch("(.-)\n") do
		local match, found, path, file, line, msg, _
		found = false

		-- First detect an endless loop so as to abort it below
		if trace:find("BugGrabber") then
			looping = true
		end

		-- "path\to\file-2.0.lua:linenum:message" -- library
		if not found then
			match, _, path, file, line, msg = trace:find("^.-([^\\]+\\)([^\\]-%-%d+%.%d+%.lua)(:%d+):(.*)$")
			local addon = trace:match("^.-[A%.][d%.][d%.][Oo]ns\\([^\\]-)\\")
			if match then
				if LibStub then
					local major = file:gsub("%.lua$", "")
					local lib, minor = LibStub(major, true)
					path = major .. "-" .. (minor or "?")
					if addon then
						file = " (" .. addon .. ")"
					else
						file = ""
					end
				end
				found = true
			end
		end
		
		-- "Interface\AddOns\path\to\file.lua:linenum:message"
		if not found then
			match, _, path, file, line, msg = trace:find("^.-[A%.][d%.][d%.][Oo]ns\\(.*)([^\\]-)(:%d+):(.*)$")
			if match then
				found = true
				local addon = path:gsub("\\.*$", "")
				local addonObject = _G[addon]
				if not addonObject then
					addonObject = _G[addon:match("^[^_]+_(.*)$")]
				end
				local version, revision = nil, nil
				if LibStub and LibStub(addon, true) then
					local _, r = LibStub(addon, true)
					version = r
				end
				if type(addonObject) == "table" then
					local v, r = scan(addonObject)
					if v then version = v end
					if r then revision = r end
				end
				local objectName = addon:upper()
				if not version then version = _G[objectName .. "_VERSION"] end
				if not revision then revision = _G[objectName .. "_REVISION"] or _G[objectName .. "_REV"] end
				if not version then version = GetAddOnMetadata(addon, "Version") end
				if not version and revision then version = revision
				elseif type(version) == "string" and revision and not version:find(revision) then
					version = version .. "." .. revision
				end
				if not version then version = GetAddOnMetadata(addon, "X-Curse-Packaged-Version") end
				if version then
					path = addon .. "-" .. version .. path:gsub("^[^\\]*", "")
				end
			end
		end
		
		-- "path\to\file.lua:linenum:message"
		if not found then
			match, _, path, file, line, msg = trace:find("^.-([^\\]+\\)([^\\])(:%d+):(.*)$")
			if match then
				found = true
			end
		end

		-- "[string \"path\\to\\file.lua:<foo>\":linenum:message"
		if not found then
			match, _, path, file, line, msg = trace:find("^%[string \".-([^\\]+\\)([^\\]-)\"%](:%d+):(.*)$")
			if match then
				found = true
			end
		end

		-- "[string \"FOO\":linenum:message"
		if not found then
			match, _, file, line, msg = trace:find("^%[string (\".-\")%](:%d+):(.*)$")
			if match then
				found = true
				path = "<string>:"
			end
		end

		-- "[C]:message"
		if not found then
			match, _, msg = trace:find("^%[C%]:(.*)$")
			if match then
				found = true
				path = "<in C code>"
				file = ""
				line = ""
			end
		end

		-- ADDON_ACTION_BLOCKED
		if not found then
			match, _, file, msg = trace:find(ADDON_CALL_PROTECTED_MATCH)
			if match then
				found = true
				path = "<event>"
				file = "ADDON_ACTION_BLOCKED"
				line = ""
				errorType = "event"
			end
		end

		-- Anything else
		if not found then
			path = trace--"<unknown>"
			file = ""
			line = ""
			msg = line
		end

		-- Add it to the formatted error
		errmsg = errmsg .. path .. file .. line .. ":" .. msg .. "\n"
	end

	errorsSinceLastReset = errorsSinceLastReset + 1

	local locals = debuglocals(real and 4 or 3)
	if locals then
		errmsg = errmsg .. "\nLocals:|r\n" .. locals
	end

	-- Store the error
	saveError(errmsg, errorType)
end

local function onUpdateFunc(self, elapsed)
	totalElapsed = totalElapsed + elapsed
	if totalElapsed > 1 then
		if not paused then
			-- Seems like we're getting more errors/sec than we want.
			if errorsSinceLastReset > BUGGRABBER_ERRORS_PER_SEC_BEFORE_THROTTLE then
				BugGrabber:Pause()
			end
			errorsSinceLastReset = 0
			totalElapsed = 0
		elseif totalElapsed > BUGGRABBER_TIME_TO_RESUME and paused then
			BugGrabber:Resume()
		end
	end
end

function BugGrabber:Reset()
	stateErrorDatabase = {}
	BugGrabberDB.errors = {}
end

-- Determine the proper DB and return it
function BugGrabber:GetDB()
	return BugGrabberDB.save and BugGrabberDB.errors or stateErrorDatabase
end

function BugGrabber:GetSessionId()
	return BugGrabberDB.session
end

-- Simple setters/getters for settings, meant to be accessed by BugSack
function BugGrabber:GetSave()
	return BugGrabberDB.save
end

function BugGrabber:ToggleSave()
	BugGrabberDB.save = not BugGrabberDB.save
	if BugGrabberDB.save then
		BugGrabberDB.errors = stateErrorDatabase
		stateErrorDatabase = {}
	else
		stateErrorDatabase = BugGrabberDB.errors
		BugGrabberDB.errors = {}
	end
end

function BugGrabber:GetLimit()
	return BugGrabberDB.limit
end

function BugGrabber:SetLimit(l)
	if type(l) ~= "number" or l < 10 or l > MAX_BUGGRABBER_ERRORS then
		return
	end

	BugGrabberDB.limit = math.floor(l)
	local db = self:GetDB()
	while #db > l do
		table.remove(db, 1)
	end
end

function BugGrabber:IsThrottling()
	return BugGrabberDB.throttle
end

function BugGrabber:UseThrottling(flag)
	BugGrabberDB.throttle = flag and true or false
	if flag and not frame:GetScript("OnUpdate") then
		frame:SetScript("OnUpdate", onUpdateFunc)
	elseif not flag then
		frame:SetScript("OnUpdate", nil)
	end
end

function BugGrabber:RegisterAddonActionEvents()
	frame:RegisterEvent("ADDON_ACTION_BLOCKED")
	frame:RegisterEvent("ADDON_ACTION_FORBIDDEN")
	triggerEvent("BugGrabber_AddonActionEventsRegistered")
end

function BugGrabber:UnregisterAddonActionEvents()
	frame:UnregisterEvent("ADDON_ACTION_BLOCKED")
	frame:UnregisterEvent("ADDON_ACTION_FORBIDDEN")
	triggerEvent("BugGrabber_AddonActionEventsUnregistered")
end

function BugGrabber:IsPaused()
	return paused
end

function BugGrabber:Pause()
	if paused then return end

	if not BUGGRABBER_SUPPRESS_THROTTLE_CHAT then
		print(string.format(BUGGRABBER_STOPPED, BUGGRABBER_ERRORS_PER_SEC_BEFORE_THROTTLE, BUGGRABBER_TIME_TO_RESUME))
	end
	self:UnregisterAddonActionEvents()
	paused = true
	triggerEvent("BugGrabber_CapturePaused")
end

function BugGrabber:Resume()
	if not paused then return end

	if not BUGGRABBER_SUPPRESS_THROTTLE_CHAT then
		print(BUGGRABBER_RESUMING)
	end
	self:RegisterAddonActionEvents()
	paused = nil
	triggerEvent("BugGrabber_CaptureResumed")
	totalElapsed = 0
end

local function createSwatter()
	-- Need this so Stubby will feed us errors instead of just
	-- dumping them to the chat frame.
	_G.Swatter = {
		IsEnabled = function() return true end,
		OnError = function(msg, frame, stack, etype, ...)
			grabError(tostring(msg) .. tostring(stack))
		end,
	}
end

local function addonLoaded(addon)
	if addon == "!BugGrabber" then
		real_seterrorhandler(grabError)

		-- Persist defaults and make sure we have sane SavedVariables
		if type(BugGrabberDB) ~= "table" then BugGrabberDB = {} end
		local sv = BugGrabberDB
		if type(sv.session) ~= "number" then sv.session = 0 end
		if type(sv.errors) ~= "table" then sv.errors = {} end
		if type(sv.limit) ~= "number" then sv.limit = 50 end
		if type(sv.save) ~= "boolean" then sv.save = true end
		if type(sv.throttle) ~= "boolean" then sv.throttle = true end

		-- From now on we can persist errors. Create a new session.
		sv.session = sv.session + 1

		-- Determine the correct database
		local db = BugGrabber:GetDB()
		-- Cut down on the nr of errors if it is over the limit
		while #db > sv.limit do
			table.remove(db, 1)
		end
		if sv.throttle then
			frame:SetScript("OnUpdate", onUpdateFunc)
		end
	elseif (addon == "!Swatter" or (type(SwatterData) == "table" and SwatterData.enabled)) and Swatter then
		print(string.gsub(ADDON_DISABLED, "%%s", "Swatter"))
		DisableAddOn("!Swatter")
		SwatterData.enabled = nil
		real_seterrorhandler(grabError)
		SlashCmdList.SWATTER = nil
		SLASH_SWATTER1, SLASH_SWATTER2 = nil, nil
		for k, v in pairs(Swatter) do
			if type(v) == "table" and v.UnregisterEvent then
				v:UnregisterEvent("ADDON_ACTION_FORBIDDEN")
				v:UnregisterEvent("ADDON_ACTION_BLOCKED")
				if v.UnregisterAllEvents then
					v:UnregisterAllEvents()
				end
			end
		end
	elseif addon == "Stubby" then
		createSwatter()
	end
end

-- Now register for our needed events
frame:SetScript("OnEvent", function(self, event, arg1, arg2)
	if event == "ADDON_ACTION_BLOCKED" or event == "ADDON_ACTION_FORBIDDEN" then
		grabError(ADDON_CALL_PROTECTED:format(event, arg1, arg2))
	elseif event == "ADDON_LOADED" then
		addonLoaded(arg1)
		if not callbacks then setupCallbacks() end
	elseif event == "PLAYER_LOGIN" then
		real_seterrorhandler(grabError)
		if IsAddOnLoaded("Stubby") and type(_G.Swatter) ~= "table" then
			createSwatter()
		end
	end
end)
frame:RegisterEvent("ADDON_LOADED")
frame:RegisterEvent("PLAYER_LOGIN")
BugGrabber:RegisterAddonActionEvents()

real_seterrorhandler(grabError)
function seterrorhandler() --[[ noop ]] end

_G.BugGrabber = BugGrabber

-- vim:set ts=4:
