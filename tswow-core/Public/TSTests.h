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
#pragma once

#include <cstdint>
#include <functional>
#include <string>
#include <stdexcept>
#include <vector>
#include <regex>
#include <memory>
#include "TSMain.h"

#if TRINITY

class TSPlayer;
class Player;

class TC_GAME_API TSTestException : public std::runtime_error {
public:
    TSTestException(std::string const& what);
};

class TC_GAME_API TSAssert {
public:
    TSAssert * operator->() { return this; }
    void IsTrue(bool expression, std::string const& message = "");
    void IsFalse(bool expression, std::string const& message = "");
    void HasSpell(TSPlayer player, uint32_t spellId, std::string message = "");
    void HasItem(TSPlayer player, uint32_t itemId, uint32_t count = 1, bool checkBank = false, std::string message = "");
    template <typename T>
    void Equals(T a, T b, std::string const& message = "")
    {
        if (a != b)
        {
            throw TSTestException(message);
        }
    }
};

class TC_GAME_API TSTestBase {
    virtual std::string searchName() const = 0;
public:
    TSTestBase(
          std::string const& modName
        , std::string const& testName
    );
    const std::string m_modName;
    const std::string m_testName;
    virtual const char* testPrefix() const = 0;
    bool matchRegex(std::regex const& regex) const;
};

typedef std::function<void(TSPlayer,TSAssert)> TSTestCallback;
class TC_GAME_API TSAutomaticTest : public TSTestBase {
    const TSTestCallback m_callback;
    virtual std::string searchName() const;
public:
    TSAutomaticTest(
          std::string modName
        , std::string testName
        , TSTestCallback callback
    );
    TSAutomaticTest * operator->() { return this; }
    virtual const char* testPrefix() const;
    std::pair<bool,std::string> run(Player * player) const;
    bool operator < (TSAutomaticTest const& step) const;
};

typedef std::function<void(TSPlayer)> TSStepSetup;
class TC_GAME_API TSManualStep : public TSTestBase {
    const uint32_t m_stepIndex;
    virtual std::string searchName() const;
public:
    TSManualStep(
          std::string const& modName
        , std::string const& testName
        , std::string const& stepName
        , uint32_t stepIndex
    );
    TSManualStep * operator->() { return this; }
    std::string m_description;
    TSStepSetup m_setup;
    TSTestCallback m_verify;
    const std::string m_stepName;
    virtual const char* testPrefix() const;
    void start(Player * player) const;
    void instruct(Player * player) const;
    void fail(Player * player, std::string const& sessionName, std::string const& reason) const;
    bool verify(Player * player, std::string const& sessionName) const;
    bool operator < (TSManualStep const& step) const;
};

class TC_GAME_API TSManualStepBuilder {
    TSManualStep* m_step;
public:
    TSManualStepBuilder(
          std::string const& modName
        , std::string const& testName
        , std::string const& stepName
        , uint32_t stepIndex
    );
    TSManualStepBuilder * operator->() { return this; }
    TSManualStepBuilder * description(std::string const& description);
    TSManualStepBuilder * setup(TSStepSetup setup);
    TSManualStepBuilder * verify(TSTestCallback verify);
};

typedef std::function<void(TSManualStepBuilder*)> TSStepBuilderCallback;
class TC_GAME_API TSManualTestBuilder {
    std::string m_modName;
    std::string m_testName;
    std::vector<TSManualStepBuilder> m_steps;
    uint32_t m_stepCtr;
public:
    TSManualTestBuilder(
          std::string const& modName
        , std::string const& testName
    );
    TSManualTestBuilder * operator->() { return this; }
    TSManualTestBuilder * step(std::string const& name, std::string const& description);
    TSManualTestBuilder * step(std::string const& name, TSStepBuilderCallback callback);
};

void TC_GAME_API ClearTest(std::string name);
void TC_GAME_API ClearTests();
void TC_GAME_API UnloadTestModule();
void TC_GAME_API StartTestSession(Player * player, std::string const& sessionName, std::string const& filter);
void TC_GAME_API NextTestStep(Player * player, std::string const& sessionName, bool isFail, std::string const& failMessage);
void TC_GAME_API RegisterAutomaticTest(std::string const& modName,std::string const& name, TSTestCallback callback);
void TC_GAME_API PrintSessionStatus(Player* player, std::string const& sessionName);

std::shared_ptr<TSManualTestBuilder> TC_GAME_API RegisterManualTest(std::string const& modName, std::string const& name);

#endif
