#include "BotAccountMgr.h"

#include "Config.h"
#include "AccountMgr.h"
#include "Log.h"

#include <nlohmann/json.hpp>

#include <filesystem>
#include <fstream>
#include <string>
#include <iostream>

namespace fs = std::filesystem;

void InstallBotAccounts()
{
    TC_LOG_INFO("server.loading", "Loading Bot Accounts...");
    fs::path accountsJson = fs::path(sConfigMgr->GetStringDefault("DataDir", "./")) / "accounts.json";
    if (!fs::exists(accountsJson))
    {
        TC_LOG_WARN("server.loading", "No accounts.json, not installing bot accounts\n ");
        return;
    }

    std::ifstream ifs(accountsJson);
    nlohmann::json json = nlohmann::json::parse(ifs);
    for (auto& [key,value]: json.items())
    {
        std::string username = value["username"];
        std::string password = value["password"];
        uint32 id = sAccountMgr->GetId(username);
        if (!id)
        {
            sAccountMgr->CreateAccount(username, password);
        }
        else
        {
            sAccountMgr->ChangePassword(id, password);
        }
    }
}