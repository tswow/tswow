#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp >

#include "Arguments.h"

namespace ClientArguments
{
	void initialize(std::string const& value);
}

TEST_CASE("[ClientArguments] Has")
{
	ClientArguments::initialize("arg1 arg2");
	SECTION("accepts correct args") {
		REQUIRE(ClientArguments::Has("arg1") == true);
		REQUIRE(ClientArguments::Has("arg2") == true);
	}

	SECTION("does not accept incorrect args") {
		REQUIRE(ClientArguments::Has("arg3") == false);
	}
}

TEST_CASE("[ClientArguments] GetString")
{
	// todo: CommandLineToArgvW doesn't seem to accept quotes from here(?)
	ClientArguments::initialize("without_quotes=without_quotes");
	SECTION("finds non-quoted")
	{
		REQUIRE_THAT(
			ClientArguments::GetString("without_quotes",""), Catch::Matchers::Equals("without_quotes")
		);
	}
}

TEST_CASE("[ClientArguments] GetInt")
{
	ClientArguments::initialize("arg1=1");
	SECTION("finds valid argument")
	{
		REQUIRE(ClientArguments::GetInt("arg1", 0) == 1);
	}

	SECTION("does not find invalid argument")
	{
		REQUIRE(ClientArguments::GetInt("arg2", 25) == 25);
	}
}

TEST_CASE("[ClientArguments] GetFloat")
{
	ClientArguments::initialize("arg1=1.5");
	SECTION("finds valid argument")
	{
		REQUIRE(ClientArguments::GetFloat("arg1", 0) == 1.5);
	}

	SECTION("does not find invalid argument")
	{
		REQUIRE(ClientArguments::GetFloat("arg2", 25.5) == 25.5);
	}
}

TEST_CASE("[ClientArguments] GetDouble")
{
	ClientArguments::initialize("arg1=1007688.1007688");
	SECTION("finds valid argument")
	{
		REQUIRE(ClientArguments::GetDouble("arg1", 0) == 1007688.1007688);
	}

	SECTION("does not find invalid argument")
	{
		REQUIRE(ClientArguments::GetDouble("arg2", 8867001.8867001) == 8867001.8867001);
	}
}