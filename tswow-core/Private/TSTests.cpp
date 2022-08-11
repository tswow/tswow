/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#include "TSTests.h"
#include "TSPlayer.h"
#include "TSDatabase.h"
#include "Chat.h"
#include "Player.h"

#include "CharacterDatabase.h"

#include <boost/filesystem.hpp>

#include <algorithm>
#include <set>
#include <string>
#include <regex>
#include <fstream>

#define TEST_RUN_TABLE " test_sessions "
#define TEST_ERRORS_TABLE " test_errors "

#define SESSION_NAME_FIELD " sessionName "
#define MOD_NAME_FIELD " modName "
#define TEST_NAME_FIELD " testName "
#define STEP_NAME_FIELD " stepName "
#define FILTER_FIELD " filter "
#define FINISHED_FIELD " finished "
#define ERROR_COUNT_FIELD " errorCount "
#define TOTAL_COUNT_FIELD " totalCount "
#define TEST_NAME_FIELD " testName "
#define STEP_TYPE_FIELD " stepType "
#define ERROR_MESSAGE_FIELD " errorMessage "

#ifdef TRINITY

static uint32_t stmnt_createSession =
    CharacterDatabase.PrepareCustomStatement(
        "INSERT INTO " TEST_RUN_TABLE " VALUES (?,?,?,?,?,?,?,?);"
    );
static uint32_t stmnt_createError =
    CharacterDatabase.PrepareCustomStatement(
        "INSERT INTO " TEST_ERRORS_TABLE " VALUES (?,?,?,?,?,?);"
    );
static uint32_t stmnt_deleteSession =
    CharacterDatabase.PrepareCustomStatement(
        "DELETE FROM " TEST_RUN_TABLE " WHERE " SESSION_NAME_FIELD " = ?;"
    );
static uint32_t stmnt_deleteErrors =
    CharacterDatabase.PrepareCustomStatement(
        "DELETE FROM " TEST_ERRORS_TABLE " WHERE " SESSION_NAME_FIELD " = ?;"
    );
static uint32_t stmnt_updateSession =
    CharacterDatabase.PrepareCustomStatement(
        "UPDATE " TEST_RUN_TABLE " SET "
        MOD_NAME_FIELD " = ?, "
        TEST_NAME_FIELD " = ?, "
        STEP_NAME_FIELD " = ?, "
        ERROR_COUNT_FIELD " = ?, "
        TOTAL_COUNT_FIELD " = ?, "
        FINISHED_FIELD " = ? "
        " WHERE "
        SESSION_NAME_FIELD " = ?;"
    );
static uint32_t stmnt_getSession =
    CharacterDatabase.PrepareCustomStatement(
        "SELECT "
            MOD_NAME_FIELD ", "
            TEST_NAME_FIELD ", "
            STEP_NAME_FIELD ", "
            FILTER_FIELD ", "
            ERROR_COUNT_FIELD ", "
            TOTAL_COUNT_FIELD ", "
            FINISHED_FIELD " "
        " FROM " TEST_RUN_TABLE " WHERE " SESSION_NAME_FIELD " = ?;"
    );
static uint32_t stmnt_getErrors =
    CharacterDatabase.PrepareCustomStatement(
        "SELECT * FROM " TEST_ERRORS_TABLE " WHERE " SESSION_NAME_FIELD " = ?;"
    );

static std::set<TSManualStep> manualSteps;
static std::set<TSAutomaticTest> automaticTests;

static void testMessage(Player* player, std::string const& message)
{
    ChatHandler(player->GetSession()).SendSysMessage("[Tests]: " + message);
}

static void createTestDir()
{
    boost::filesystem::create_directories("tests");
}

TSTestException::TSTestException(std::string const& what)
    : std::runtime_error(what)
{}

TSTestBase::TSTestBase(
      std::string const& modName
    , std::string const& testName
    )
    : m_modName(modName)
    , m_testName(testName)
{}

bool TSTestBase::matchRegex(std::regex const& regex) const
{
    return std::regex_search(searchName(), regex);
}

TSAutomaticTest::TSAutomaticTest(std::string modName, std::string testName, TSTestCallback callback)
    : TSTestBase(modName,testName)
    , m_callback(callback)
{}

const char* TSAutomaticTest::testPrefix() const
{
    return "auto";
}

std::string TSAutomaticTest::searchName() const
{
    return std::string(testPrefix()) + "@" + m_modName + ":" + m_testName;
}

bool TSAutomaticTest::operator<(TSAutomaticTest const& test) const
{
    if (m_modName != test.m_modName)
    {
        return m_modName > test.m_modName;
    }

    return m_testName > test.m_testName;
}

std::pair<bool,std::string> TSAutomaticTest::run(Player * player) const
{
    try {
        m_callback(TSPlayer(player),TSAssert());
        return std::make_pair(true,"");
    } catch (TSTestException e) {
        return std::make_pair(false, e.what());
    }
}

void TSAssert::IsTrue(bool expression, std::string const& message)
{
    if (!expression)
    {
        throw TSTestException(message);
    }
}

void TSAssert::IsFalse(bool expression, std::string const& message)
{
    if (expression)
    {
        throw TSTestException(message);
    }
}

void TSAssert::HasItem(TSPlayer player, uint32_t itemId, uint32_t count, bool checkBank, std::string message)
{
    if (!player.HasItem(itemId, count, checkBank))
    {
        if (message.size() == 0)
        {
            message =
                player->GetName()
                + " does not have item"
                + std::to_string(itemId);
        }
        throw TSTestException(message);
    }
}

void TSAssert::HasSpell(TSPlayer player, uint32_t spellId, std::string message)
{
    if (!player.HasSpell(spellId))
    {
        if (message.size() == 0)
        {
            message =
                  player->GetName()
                + " does not have spell "
                + std::to_string(spellId);
        }
        throw TSTestException(message);
    }
}

TSManualStep::TSManualStep(
      std::string const& modName
    , std::string const& testName
    , std::string const& stepName
    , uint32_t stepIndex
    )
    : TSTestBase(modName,testName)
    , m_stepName(stepName)
    , m_stepIndex(stepIndex)
{}

const char* TSManualStep::testPrefix() const
{
    return "manual";
}

std::string TSManualStep::searchName() const
{
    return std::string(testPrefix()) + "@" + m_modName + ":" + m_testName + ":" + m_stepName;
}

bool TSManualStep::operator<(TSManualStep const& step) const
{
    if (m_modName != step.m_modName)
    {
        return m_modName > step.m_modName;
    }

    if (m_testName != step.m_testName)
    {
        return m_testName > step.m_testName;
    }

    return m_stepIndex < step.m_stepIndex;
}

void TSManualStep::start(Player * player) const
{
   if (m_setup != nullptr)
   {
       m_setup(TSPlayer(player));
   }
   instruct(player);
}

void TSManualStep::instruct(Player * player) const
{
    std::string message = m_testName + ":" + m_description;
    player->GetSession()->SendNotification("%s", message.c_str());
    testMessage(player, message);
}

static void reportFail(
      Player * player
    , std::string const& sessionName
    , std::string const& errorType
    , std::string const& modName
    , std::string const& testName
    , std::string const& stepName
    , std::string const& reason
)
{
    testMessage(player,
        "Failed test "
        + modName + ":"
        + testName + ":"
        + stepName
        + " (reason = " + reason + ")"
    );
    PreparedStatementBase params(0,6);
    params.setString(0, sessionName);
    params.setString(1, errorType);
    params.setString(2, modName);
    params.setString(3, testName);
    params.setString(4, stepName);
    params.setString(5, reason);
    CharacterDatabase.QueryCustomStatement(stmnt_createError, &params);
}

void TSManualStep::fail(Player * player, std::string const& sessionName,std::string const& reason) const
{
    reportFail(player, sessionName, this->testPrefix(), m_modName, m_testName, m_stepName, reason);
}

bool TSManualStep::verify(Player * player, std::string const& sessionName) const
{
    if (m_verify != nullptr)
    {
        try {
            m_verify(player, TSAssert());
        }
        catch (TSTestException e)
        {
            fail(player, sessionName, e.what());
            return false;
        }
    }
    return true;
}

TSManualStepBuilder::TSManualStepBuilder(
      std::string const& modName
    , std::string const& testName
    , std::string const& stepName
    , uint32_t stepIndex
    )
{
    // colliding with previous stepIndex means this test already exists
    if (manualSteps.find(TSManualStep(modName, testName, stepName, stepIndex)) != manualSteps.end())
    {
        throw std::runtime_error("Duplicate manual test " + modName + ":" + testName);
    }

    auto step = &(*manualSteps.insert(TSManualStep(
          modName
        , testName
        , stepName
        , stepIndex
    )).first);
    // we don't change modName/testName/stepName
    m_step = const_cast<TSManualStep*>(step);
}

TSManualStepBuilder * TSManualStepBuilder::description(std::string const& description)
{
    m_step->m_description = description;
    return this;
}

TSManualStepBuilder * TSManualStepBuilder::setup(TSStepSetup setup)
{
    m_step->m_setup = setup;
    return this;
}

TSManualStepBuilder * TSManualStepBuilder::verify(TSTestCallback verify)
{
    m_step->m_verify = verify;
    return this;
}

TSManualTestBuilder::TSManualTestBuilder(
      std::string const& modName
    , std::string const& testName
  )
  : m_modName(modName)
  , m_testName(testName)
{
}

TSManualTestBuilder* TSManualTestBuilder::step(std::string const& name, std::string const& description)
{
    TSManualStepBuilder builder(
          m_modName
        , m_testName
        , name
        , m_stepCtr++
    );
    builder.description(description);
    return this;
}

TSManualTestBuilder* TSManualTestBuilder::step(std::string const& name, TSStepBuilderCallback callback)
{
    TSManualStepBuilder builder(
          m_modName
        , m_testName
        , name
        , m_stepCtr++
    );
    callback(&builder);
    return this;
}

void ClearTest(std::string name)
{
    PreparedStatementBase params(0, 1);
    params.setString(0, name);
    CharacterDatabase.QueryCustomStatement(stmnt_deleteErrors, &params);
    CharacterDatabase.QueryCustomStatement(stmnt_deleteSession, &params);
}

void ClearTests()
{
    CharacterDatabase.Query(
        "DELETE FROM "
        TEST_RUN_TABLE
        ";"
    );
    CharacterDatabase.Query(
        "DELETE FROM "
        TEST_ERRORS_TABLE
        ";"
    );
}

void RegisterAutomaticTest(std::string const& modName, std::string const& testName, TSTestCallback callback)
{
    if (automaticTests.find(TSAutomaticTest(modName, testName, callback)) != automaticTests.end())
    {
        throw std::runtime_error("Duplicate automatic test "+modName+":"+testName);
    }
    automaticTests.insert(TSAutomaticTest(modName, testName, callback));
}

std::shared_ptr<TSManualTestBuilder> TC_GAME_API RegisterManualTest(std::string const& modName, std::string const& name)
{
    return std::make_shared<TSManualTestBuilder>(modName,name);
}

void UnloadTestModule()
{
    manualSteps.clear();
}

void TC_GAME_API StartTestSession(Player * player, std::string const& sessionName, std::string const& filter)
{
    std::regex regexFilter;
    try {
        regexFilter = std::regex(filter);
    }
    catch (std::exception const& e)
    {
        testMessage(player, "Failed to compile regex: " + std::string(e.what()));
        return;
    }
    ClearTest(sessionName);

    uint32_t totalCtr = 0;
    uint32_t errorCtr = 0;


    // Run automatic tests first
    for (auto& test : automaticTests)
    {
        if(!test.matchRegex(regexFilter))
        {
            continue;
        }
        totalCtr++;
        auto res = test.run(player);
        if (!res.first)
        {
            reportFail(
                  player
                , sessionName
                , test.testPrefix()
                , test.m_modName
                , test.m_testName
                , ""
                , res.second
            );
            errorCtr++;
        }
    }

    for (auto& step : manualSteps)
    {
        if (!step.matchRegex(regexFilter))
        {
            continue;
        }
        step.start(player);

        PreparedStatementBase params(0, 8);
        params.setString(0, sessionName);
        params.setString(1, step.m_modName);
        params.setString(2, step.m_testName);
        params.setString(3, step.m_stepName);
        params.setString(4, filter);
        params.setUInt32(5, errorCtr);
        params.setUInt32(6, totalCtr);
        params.setUInt8(7, 0);
        CharacterDatabase.QueryCustomStatement(stmnt_createSession, &params);
        return;
    }

    if (totalCtr == 0)
    {
        testMessage(player, "Your test selection contained 0 tests!");
    }
    else
    {
        PreparedStatementBase params(0, 8);
        params.setString(0, sessionName);
        params.setString(1, "");
        params.setString(2, "");
        params.setString(3, "");
        params.setString(4, filter);
        params.setUInt32(5, errorCtr);
        params.setUInt32(6, totalCtr);
        params.setUInt8(7, 1);
        CharacterDatabase.QueryCustomStatement(stmnt_createSession, &params);
        PrintSessionStatus(player, sessionName);
    }

}

static void endSession(Player* player, std::string const& sessionName, uint32_t errorCount, uint32_t totalCount)
{
    PreparedStatementBase updateParams(0, 7);
    updateParams.setString(0, "");
    updateParams.setString(1, "");
    updateParams.setString(2, "");
    updateParams.setUInt32(3, errorCount);
    updateParams.setUInt32(4, totalCount);
    updateParams.setUInt8(5, 1);
    updateParams.setString(6, sessionName);
    CharacterDatabase.QueryCustomStatement(stmnt_updateSession, &updateParams);
    PrintSessionStatus(player, sessionName);
}

void TC_GAME_API NextTestStep(Player * player, std::string const& sessionName, bool isFail, std::string const& failMessage)
{
    PreparedStatementBase params(0, 1);
    params.setString(0, sessionName);
    auto res = CharacterDatabase.QueryCustomStatement(stmnt_getSession, &params);

    if (!res || res->GetRowCount() == 0)
    {
        testMessage(player, "No test session called " + sessionName);
        ClearTest(sessionName);
        return;
    }

    auto field = res->Fetch();

    auto modName = field++->GetString();
    auto testName = field++->GetString();
    auto stepName = field++->GetString();
    auto filter = field++->GetString();
    uint32_t errorCount = field++->GetUInt32();
    uint32_t totalCount = field++->GetUInt32();
    bool finished = field++->GetUInt8();

    if (finished)
    {
        testMessage(player, "Session is already finished");
        return;
    }

    auto itr = manualSteps.begin();
    while (itr != manualSteps.end())
    {
        if (itr->m_modName == modName
            && itr->m_testName == testName
            && itr->m_stepName == stepName)
        {
            break;
        }
        itr++;
    }

    if (itr == manualSteps.end())
    {
        testMessage(player,
              "Corrupt test, invalid step "
            + modName + ":"
            + testName + ":"
            + stepName
        );
        ClearTest(sessionName);
        return;
    }

    if (isFail)
    {
        itr->fail(player, sessionName, failMessage);
    }
    else
    {
        isFail = !itr->verify(player, sessionName);
    }

    // skip the rest of this test if we did not succeed
    if (isFail)
    {
        totalCount++;
        errorCount++;
        while (itr != manualSteps.end()
            && itr->m_modName == modName
            && itr->m_testName == testName)
        {
            itr++;
        }

        // done
        if (itr == manualSteps.end())
        {
            endSession(player, sessionName, errorCount, totalCount);
            return;
        }
    }
    else
    {
        ++itr;
        if (itr == manualSteps.end() || itr->m_testName != testName || itr->m_modName != modName)
        {
            totalCount++;
        }
    }

    std::regex regexFilter;
    try {
        regexFilter = std::regex(filter);
    }
    catch (std::exception const& e)
    {
        testMessage(player,
              "Corrupt test, failed to compile database regex: "
            + std::string(e.what())
        );
        ClearTest(sessionName);
        return;
    }
    while (itr != manualSteps.end() && !itr->matchRegex(regexFilter))
    {
        ++itr;
    }

    if (itr == manualSteps.end())
    {
        endSession(player, sessionName, errorCount, totalCount);
        return;
    }

    itr->start(player);
    PreparedStatementBase updateParams(0, 7);
    updateParams.setString(0, itr->m_modName);
    updateParams.setString(1, itr->m_testName);
    updateParams.setString(2, itr->m_stepName);
    updateParams.setUInt32(3, errorCount);
    updateParams.setUInt32(4, totalCount);
    updateParams.setUInt8(5, 0);
    updateParams.setString(6, sessionName);
    CharacterDatabase.QueryCustomStatement(stmnt_updateSession, &updateParams);
}

void PrintSessionStatus(Player* player, std::string const& sessionName)
{
    createTestDir();
    PreparedStatementBase params(0, 1);
    params.setString(0, sessionName);
    auto sessionRes = CharacterDatabase.QueryCustomStatement(stmnt_getSession, &params);
    auto errorsRes = CharacterDatabase.QueryCustomStatement(stmnt_getErrors, &params);

    if (!sessionRes || sessionRes->GetRowCount() == 0)
    {
        testMessage(player, "No session called " + sessionName);
        return;
    }

    auto field = sessionRes->Fetch();
    auto modName = field++->GetString();
    auto testName = field++->GetString();
    auto stepName = field++->GetString();
    auto filterName = field++->GetString();
    uint32_t errorCount = field++->GetUInt32();
    uint32_t totalCount = field++->GetUInt32();
    uint32_t passCount = totalCount - errorCount;
    auto finished = field++->GetUInt8();

    if (finished)
    {
        testMessage(player, "Session finished");
    }
    else
    {
        testMessage(player, "Session at " + modName + ":" + testName + ":" + stepName);
    }

    std::ofstream sessionFile;
    auto path = boost::filesystem::path("tests") / (sessionName + ".session.txt");
    sessionFile.open(path.string());

    sessionFile
        << "Test Session \""
        << sessionName
        << "\""
        << (!finished ? "(unfinished)" :"")
        << "\n"
        ;

    auto passStr = std::to_string(passCount)
        + "/"
        + std::to_string(totalCount)
        + " tests passed"
        ;

    sessionFile << passStr << "\n\n";

    if (!errorsRes || errorsRes->GetRowCount() == 0)
    {
        testMessage(player, "No errors");
    }
    else
    {
        sessionFile << "Failures:" << "\n";
        do {
            auto errorField = errorsRes->Fetch();
            errorField++;
            auto errorType = errorField++->GetString();
            auto errorMod = errorField++->GetString();
            auto errorTest = errorField++->GetString();
            auto errorStep = errorField++->GetString();
            auto errorMessage = errorField++->GetString();
            auto str =
                errorType + "@"
                + errorMod + ":"
                + errorTest
                ;
            if (errorStep.size() > 0)
            {
                str += ":" + errorStep;
            }
            str+=
                  " (reason = "
                + errorMessage
                + ")"
                ;
            sessionFile << str << "\n";
            testMessage(player,
                "Failed test " + str
            );
        } while (errorsRes->NextRow());
        // print this afterwards to player can clearly see it
        testMessage(player, passStr);
    }

    testMessage(player, "Wrote test results to " + boost::filesystem::absolute(path).string());
    sessionFile.close();
}
#endif
