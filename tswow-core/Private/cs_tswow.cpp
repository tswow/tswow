#include "ScriptMgr.h"
#include "Chat.h"
#include <vector>
#include <fstream>
#include <string>
#include "Map.h"
#include "Player.h"
#include "ChatCommand.h"
#include "TSTests.h"
#include <boost/filesystem.hpp>

#if TRINITY
using namespace Trinity::ChatCommands;
#endif

#if TRINITY_COMPILER == TRINITY_COMPILER_GNU
#pragma GCC diagnostic ignored "-Wdeprecated-declarations"
#endif

static std::pair<std::string, std::string> parseSessionWArgs(std::string const& args)
{
    size_t leadSpaceIndex = args.find_first_not_of(' ');
    if (leadSpaceIndex == std::string::npos)
    {
        return std::make_pair("", "");
    }

    size_t spaceIndex = args.find(' ');
    if (spaceIndex == std::string::npos)
    {
        return std::make_pair(args, "");
    }
    else
    {
        return std::make_pair(args.substr(0, spaceIndex), args.substr(spaceIndex + 1));
    }
}

boost::filesystem::path findPositionsFile()
{
    constexpr char const* positions_txt = "positions.txt";
    boost::filesystem::path cur_path = boost::filesystem::current_path();
    while (true)
    {
        boost::filesystem::path coredata = cur_path / "coredata";
        if (boost::filesystem::exists(coredata))
        {
            return coredata / positions_txt;
        }

        if (!cur_path.has_parent_path())
        {
            return boost::filesystem::current_path() / positions_txt;
        }
        cur_path = cur_path.parent_path();
    }
}

class wp_tswow : public CommandScript
{
public:
    wp_tswow() : CommandScript("wp_tswow") { }

    std::vector<ChatCommand> GetCommands() const override
    {
#if TRINITY
        static std::vector<ChatCommand> testTable = {
            { "start", HandleTestStartCommand, rbac::RBAC_PERM_TEST, Console::No},
            { "pass", HandleTestPassCommand, rbac::RBAC_PERM_TEST, Console::No},
            { "fail", HandleTestFailCommand, rbac::RBAC_PERM_TEST, Console::No},
            { "info", HandleTestInfoCommand, rbac::RBAC_PERM_TEST, Console::No}
        };
#endif

#if TRINITY
        static std::vector<ChatCommand> commandTable = {
            { "at", At, rbac::RBAC_PERM_AT, Console::No},
            { "clearat", ClearAt, rbac::RBAC_PERM_CLEAR_AT, Console::No},
            { "id", Id, rbac::RBAC_PERM_ID, Console::No},
            { "test", testTable}
        };
#endif
        return commandTable;
    }

#if TRINITY
    static bool HandleTestStartCommand(ChatHandler* handler, char const* args)
    {
        std::pair<std::string, std::string> sessionArgs = parseSessionWArgs(args);
        if (sessionArgs.first.size() == 0)
        {
            handler->SendSysMessage("[Tests]: Need to provide a name for your session.");
            return true;
        }
        StartTestSession(handler->GetPlayer(), sessionArgs.first, sessionArgs.second);
        return true;
    }

    static bool HandleTestPassCommand(ChatHandler* handler, char const* args)
    {
        std::string sArgs(args);
        if (sArgs.size() == 0)
        {
            handler->SendSysMessage("[Tests]: Need to specify the session to pass.");
            return true;
        }
        NextTestStep(handler->GetPlayer(), sArgs, false, "");
        return true;
    }

    static bool HandleTestFailCommand(ChatHandler* handler, char const* args)
    {
        std::pair<std::string,std::string> pair = parseSessionWArgs(args);
        if (pair.first.size() == 0)
        {
            handler->SendSysMessage("[Tests]: Need to specify the session to fail.");
            return true;
        }
        NextTestStep(handler->GetPlayer(), pair.first, true, pair.second);
        return true;
    }

    static bool HandleTestInfoCommand(ChatHandler* handler, char const* args)
    {
        std::string session(args);
        if (session.size() == 0)
        {
            handler->SendSysMessage("[Tests]: Need to specify the session to read info from.");
            return true;
        }
        PrintSessionStatus(handler->GetPlayer(), session);
        return true;
    }
#endif

    static bool Id(ChatHandler* handler, char const* args)
    {
        Creature* target = handler->getSelectedCreature();
        if (!target)
        {
            handler->SendSysMessage(LANG_SELECT_CREATURE);
            handler->SetSentErrorMessage(true);
            return false;
        }

        Player* player = handler->GetPlayer();
        if (player) {
            CreatureTemplate const* cInfo = target->GetCreatureTemplate();
            ChatHandler(player->GetSession())
                .SendSysMessage(cInfo->Name+" "+std::to_string(cInfo->Entry));
            return true;
        }
        return false;
    }

    static bool ClearAt(ChatHandler* handler, char const* args)
    {
        std::ofstream outfile;
        outfile.open(findPositionsFile().string().c_str(), std::ofstream::out | std::ofstream::trunc);
        Player* player = handler->GetPlayer();
        if (player) {
            ChatHandler(player->GetSession())
                .SendSysMessage("Cleared positions file.");
        }
        return true;
    }

    static bool At(ChatHandler* handler, char const* args)
    {
        Player* player = handler->GetPlayer();
        // Can't do this command without player
        if (!player)
        {
            return false;
        }

        std::string str = "{" +
            std::string("map:")+std::to_string(player->GetMap()->GetId()) + "," +
            std::string("x:")+std::to_string(player->GetPositionX()) + "," +
            std::string("y:")+std::to_string(player->GetPositionY()) + "," +
            std::string("z:")+std::to_string(player->GetPositionZ()) + "," +
            std::string("o:")+std::to_string(player->GetOrientation()) + "},";

        if(args && strlen(args)>0)
        {
            str += " // ";
            str+=args;
        }

        ChatHandler(player->GetSession()).SendSysMessage(("Wrote " + str).c_str());
        std::ofstream outfile;
        outfile.open(findPositionsFile().string().c_str(), std::ios_base::app);
        outfile << str << "\n";
        return true;
    }
};

void AddSC_tswow_commandscript()
{
    new wp_tswow();
}
