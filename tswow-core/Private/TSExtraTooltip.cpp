#include "TSExtraTooltip.h"
#include "TSPlayer.h"

#include "CreatureData.h"

const std::string TSWOW_ITEM_PREFIX = "tswow_item:";
const std::string TSWOW_CREATURE_PREFIX = "tswow_creature:";

bool handle_extra_tooltip_message(Player* player, Player* receiver, std::string& msgIn)
{
    if (msgIn.size() < 2) return false;
    std::string msg = msgIn.substr(1);

#if TRINITY
    if (player != receiver || !player->CanBeGameMaster()) {
#elif AZEROTHCORE
    if (player != receiver || player->GetSession()->GetSecurity() < AccountTypes::SEC_GAMEMASTER) {
#endif
        return false;
    }

    if (msg == "tswow_am_i_gm") {
        TSPlayer(player)->SendAddonMessage("", "tswow_you_are_gm", 7, TSPlayer(player));
        return true;
    }

    if (msg.rfind(TSWOW_ITEM_PREFIX, 0) == 0) {
        int itemId = atoi(msg.substr(TSWOW_ITEM_PREFIX.size()).c_str());
        auto data = sObjectMgr->GetItemTemplate(itemId);
        if (!data) return true;
        int displayId = data->DisplayInfoID;
        TSPlayer(player)->SendAddonMessage(
            "",
                std::string("tswow_item_response:") +
                std::to_string(itemId) +
                ":" +
                std::to_string(displayId),
            7,
            TSPlayer(player));
        return true;
    }

    if (msg.rfind(TSWOW_CREATURE_PREFIX, 0) == 0)
    {
        int creatureId = atoi(msg.substr(TSWOW_CREATURE_PREFIX.size()).c_str());
        auto data = sObjectMgr->GetCreatureTemplate(creatureId);
        if (!data) return true;
        TSPlayer(player)->SendAddonMessage(
            "", 
                std::string("tswow_creature_response:") + std::to_string(creatureId) +
                ":" + std::to_string(data->faction) +
                ":" + std::to_string(data->Modelid1) +
                ":" + std::to_string(data->Modelid2) +
                ":" + std::to_string(data->Modelid3) +
                ":" + std::to_string(data->Modelid4),
            7,
            TSPlayer(player));
        return true;
    }
    return false;
}
