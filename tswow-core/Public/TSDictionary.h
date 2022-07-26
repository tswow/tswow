/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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

#include <map>
#include <iostream>
#include "TSArray.h"

template <typename K, typename V>
struct TSDictionary {
  std::shared_ptr<std::map<K, V>> _map;
public:
  TSDictionary() {
    _map = std::make_shared<std::map<K, V>>();
  }

  TSDictionary(std::initializer_list<std::pair<K, V>> list) {
    _map = std::make_shared<std::map<K, V>>();
    for (auto& item : list)
    {
      _map->insert(item);
    }
  }

  V& operator[](K index) {
    return (*_map)[index];
  }

  auto contains(K key) {
    return _map->find(key) != _map->end();
  }

  double get_length() {
    return _map->size();
  }

  auto get(K key)
  {
    return (*_map)[key];
  }

  auto set(K key, V value)
  {
    (*_map)[key] = value;
  }

  constexpr TSDictionary* operator->()
  {
    return this;
  }

  template <typename M>
  TSDictionary<K,M> map(std::function<M(K,V,TSDictionary<K,V>&)> p)
  {
    TSDictionary<K,M> dict;
    typename std::map<K, V>::iterator it;
    for (it = _map->begin(); it != _map->end(); ++it)
    {
      dict[it->first] = p(it->first, it->second, *this);
    }
    return dict;
  }

  TSArray<K> keys()
  {
    TSArray<K> array;
    typename std::map<K, V>::iterator it;
    for (it = _map->begin(); it != _map->end(); ++it)
    {
      array.push(it->first);
    }
    return array;
  }

  auto filter(std::function<bool(K, V)> p)
  {
    TSDictionary<K, V> dest;
    typename std::map<K, V>::iterator it;
    for (it = _map->begin(); it != _map->end(); ++it)
    {
      if (p(it->first, it->second))
      {
        dest.set(it->first, it->second);
      }
    }
    return dest;
  }

  template <typename P, typename I>
  auto reduce(P p, I initial)
  {
    I cur = initial;
    typename std::map<K, V>::iterator it;
    for (it = _map->begin(); it != _map->end(); ++it)
    {
      cur = p(cur, it->first, it->second);
    }
    return cur;
  }

  void forEach(std::function<void(K, V)> p)
  {
    typename std::map<K, V>::iterator it;
    for (it = _map->begin(); it != _map->end(); ++it)
    {
      p(it->first, it->second);
    }
  }

  std::string stringify(int indention = 0)
  {
    std::string str = "{";
    if (get_length() > 0)
    {
      str = str + "\n";
    }

    unsigned int ctr = 0;
    for (auto& e : *_map)
    {
      if (++ctr >= get_length())
      {
        str += spaces(indention+1) + ToStr(e.first, indention+1) + ":" + ToStr(e.second,indention+1) + "\n";
      }
      else
      {
        str += spaces(indention+1) + ToStr(e.first,indention+1) + ":" + ToStr(e.second,indention+1) + ",\n";
      }
    }
    return str + spaces(indention)+"}";
  }

  friend std::ostream& operator<<(std::ostream& os, TSDictionary<K,V> arr)
  {
    os << arr.stringify().c_str();
    return os;
  }

  friend std::ostream& operator<<(std::ostream& os, TSDictionary<K,V>* arr)
  {
    os << (*arr);
    return os;
  }

};
#define CreateDictionary TSDictionary