local L = LibStub("AceLocale-3.0"):NewLocale("BugSack", "deDE")
if not L then return end

-- Common
L["You have no bugs, yay!"] = "Du hast keine Fehler, jeehaa!"

-- BugSack window
L["Next >"] = "Nächster >"
L["< Previous"] = "< Vorheriger"
L["Send bugs"] = "Sende Fehler"
L["Today"] = "Heute"
L["Sent by %s (%s)"] = "Gesendet von %s (%s)"
L["Local (%s)"] = "Lokal (%s)"

L["Send"] = "Senden"
L["Send all bugs from the currently viewed session (%d) in the sack to the player specified below."] = "Sendet alle Fehler der momentanen Sitzung (%d) im Sack an den unten stehenden Spieler."

-- Options
L["Auto popup"] = "Automatisches Aufpoppen"
L.autoDesc = "Öffnet BugSack automatisch, sobald ein Fehler auftritt." 
L["Chatframe output"] = "Chatfenster Ausgabe"
L.chatFrameDesc = "Gibt eine Erinnerung im Chatfenster aus, dass ein Fehler aufgetreten ist. Zeigt nicht den kompletten Fehler an!" 
L["Sound"] = "Sound"
L["Mute"] = "Stumm"
L.muteDesc = "Hindert BugSack daran, den 'Worms'-Sound abzuspielen, sobald ein Fehler entdeckt wurde."
L["Filter addon mistakes"] = "Filtere falsche Addon Fehler"
L.filterDesc = "Bestimmt, ob BugSack die Events ADDON_ACTION_BLOCKED und ADDON_ACTION_FORBIDDEN als Fehler betrachten soll oder nicht. Falls dies keinen Sinn ergibt, ignoriere die Option."
L["Throttle at excessive amount"] = "Bei Übermaß temporär drosseln"
L.throttleDesc = "Manchmal können Addons hunderte von Fehlern pro Sekunde generieren, was wiederum das Spiel einfrieren lassen kann. Das Aktivieren dieser Option drosselt die Fehleraufzeichnung und verhindert das Einfrieren des Spiels."
L["Save errors"] = "Fehler speichern"
L.saveDesc = "Speichert Fehler in der Datenbank. Falls diese Option ausgeschalten ist, werden Fehler nicht von Sitzung zu Sitzung im Sack überdauern."
L["Limit"] = "Begrenzung"
L["Wipe saved bugs"] = "Lösche gespeich. Fehler"
L.wipeDesc = "Löscht alle gespeicherten Fehler aus der Datenbank."
L["Minimap icon"] = "Minimap Symbol"
L.minimapDesc = "Zeigt oder versteckt das Minimap Symbol."

-- Chat messages
L["You've received %d bugs from %s."] = "Du hast %d Fehler von %s empfangen."
L["%d bugs have been sent to %s. He must have BugSack to be able to examine them."] = "%d Fehler wurden an %s gesendet. Er muss BugSack haben, um in der Lage zu sein, die Fehler zu lesen."
L["All stored bugs have been exterminated painfully."] = "Alle gespeicherten Fehler wurden auf schmerzvollste Art gelöscht."
L["There's a bug in your soup!"] = "Du hast einen Fehler entdeckt!"

-- LDB
L["|cffeda55fClick|r to open BugSack with the last bug. |cffeda55fShift-Click|r to reload the user interface. |cffeda55fAlt-Click|r to clear the sack."] = "|cffeda55fKlicken|r, um BugSack mit dem letzten Fehler anzuzeigen. |cffeda55fShift-Klicken|r, um die UI neu zu laden. |cffeda55fAlt-Klicken|r, um alle Fehler zu löschen."
L["Minimap icon"] = "Minimap Symbol"
L["Toggle the minimap icon."] = "Zeigt oder versteckt das Minimap Symbol."
