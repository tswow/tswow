#pragma once

#include <string>
#include <memory>

class TSClass: public std::enable_shared_from_this<TSClass>
{
public:
  virtual std::string stringify(int indention = 0) { return "[TSClass (stringify not implemented)]"; };

  void ts_constructor() {}

  template <typename T>
  std::shared_ptr<T> ts_shared_from_this()
  {
    return std::dynamic_pointer_cast<T>(std::enable_shared_from_this<TSClass>::shared_from_this());
  }
};

class DBTable : public TSClass
{
};

template <typename T, typename ... ArgTypes>
std::shared_ptr<T> ts_make_shared(ArgTypes&& ... args)
{
  auto ptr = std::make_shared<T>();
  ptr->ts_constructor(std::forward<ArgTypes&&>(args)...);
  return ptr;
}