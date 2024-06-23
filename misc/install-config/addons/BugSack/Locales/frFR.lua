local L = LibStub("AceLocale-3.0"):NewLocale("BugSack", "frFR")
if not L then return end

-- Common
L["You have no bugs, yay!"] = "Vous n'avez aucune erreur, youpi!"

-- BugSack window
L["Next >"] = "Suivant >"
L["< Previous"] = "< Précédent"
L["Send bugs"] = "Envoyer les erreurs"
L["Today"] = "Aujourd'hui"
L["Sent by %s (%s)"] = "Envoyé par (%s)"
L["Local (%s)"] = "Local (%s)"

L["Send"] = "Envoyé"
L["Send all bugs from the currently viewed session (%d) in the sack to the player specified below."] = "Envoyer toutes les erreurs de la session courante (%d) dans le sac du joueur spécifié ci-dessous."

-- Options
L["Auto popup"] = "Popup automatique"
L.autoDesc = "Fait en sorte que BugSack s'ouvre automatiquement quand une erreur est rencontrée."
L["Chatframe output"] = "Sortie fenêtre de conversation"
L.chatFrameDesc = "Affiche un rappel dans la fenêtre de conversation quand une erreur est rencontrée. N'affiche pas l'erreur complète, juste un rappel!"
L["Sound"] = "Son"
L["Mute"] = "Muet"
L.muteDesc = "Empêche BugSack de jouer le son 'Worms' lorsqu'un bug est détecté."
L["Filter addon mistakes"] = "Filtrer les erreurs des addons"
L.filterDesc = "Défini si BugSack devrait traiter les évènements ADDON_ACTION_BLOCKED et ADDON_ACTION_FORBIDDEN comme des erreurs ou non. Si cela n'a aucun sens, ignorez cette option."
L["Throttle at excessive amount"] = "Réduire à partir un certain nombre"
L.throttleDesc = "Parfois, les addons peuvent générer des centaines d'erreurs par secondes, ceci peut entrainer un bloquage du jeu. Activer cette option permettra de réduire la récupération des erreurs, prévenant le blocage quand cela se produit."
L["Save errors"] = "Sauver les erreurs"
L.saveDesc = "Saves the bugs in the database. If this is off, bugs will not persist in the sack from session to session."
L["Limit"] = "Limite"
L["Wipe saved bugs"] = "Suppr. les erreurs"
L.wipeDesc = "Effacer toutes les erreurs sauvegardées de la base."
L["Minimap icon"] = "Icône de la minicarte"
L.minimapDesc = "Affiche l'icône de BugSack autour de votre minicarte."

-- Chat messages
L["You've received %d bugs from %s."] = "Vous avez reçu %d erreurs de %s."
L["%d bugs have been sent to %s. He must have BugSack to be able to examine them."] = "%d erreurs ont été transmises à %s. Il doit avoir BugSack pour pouvoir les examiner."
L["All stored bugs have been exterminated painfully."] = "Toutes les erreurs sauvegardées ont été effacées péniblement."
L["There's a bug in your soup!"] = "Vous avec un insecte dans votre soupe!"

-- LDB
L["|cffeda55fClick|r to open BugSack with the last bug. |cffeda55fShift-Click|r to reload the user interface. |cffeda55fAlt-Click|r to clear the sack."] = "|cffeda55fClic|r pour ouvrir BugSack sur la dernière erreur. |cffeda55fMaj-Clic|r pour recharger l'interface utilisateur. |cffeda55fAlt-Clic|r pour effacer le contenu du sac."
L["Minimap icon"] = "Icône de la minicarte"
L["Toggle the minimap icon."] = "Afficher l'icône de la minicarte"

