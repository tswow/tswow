#pragma once

#include <string>

class TSClass
{
public:
  virtual std::string stringify(int indention = 0) { return "[TSClass (stringify not implemented)]"; };
};

class DBTable : public TSClass
{
};