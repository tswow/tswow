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

#include <algorithm>
#include <functional>
#include <vector>
#include <iostream>
#include "TSStringConvert.h"

// After this many characters, use newlines when stringifying.
#define ARRAY_STRING_OVERFLOW 40

template <typename T>
struct TSArrayKeys
{
  typedef TSArrayKeys<T> iterator;

  T _index;
  T _end;

  TSArrayKeys(T end_) : _index(0), _end(end_)
  {
  }

  iterator& begin()
  {
    return *this;
  }

  iterator& end()
  {
    return *this;
  }

  const T& operator*()
  {
    return _index;
  }

  bool operator!=(const iterator& rhs)
  {
    return _index != rhs._end;
  }

  iterator& operator++()
  {
    _index++;
    return *this;
  }
};

template <class T>
struct TSArray {
  std::shared_ptr<std::vector<T>> vec;

public:
  TSArray() {
    this->vec = std::make_shared<std::vector<T>>(0);
  }

  TSArray(size_t size) {
    this->vec = std::make_shared<std::vector<T>>(size);
  }

  TSArray(std::initializer_list<T> list) {
    this->vec = std::make_shared<std::vector<T>>(list);
  }

  TSArray(std::vector<T> vec) {
    // copies the vector
    this->vec = std::make_shared<std::vector<T>>(vec);
  }

  template <typename G>
  G join(G delim)
  {
    G str;
    for (int i = 0; i < this->get_length(); ++i)
    {
      str = str + (*vec)[i];
      if (i < this->get_length() - 1)
      {
        str = str + delim;
      }
    }
    return str;
  }

  void reserve(size_t size)
  {
      vec->reserve(size);
  }

  auto pop() {
    auto value = (*vec)[vec->size() - 1];
    vec->pop_back();
    return value;
  }

  constexpr TSArray* operator->()
  {
    return this;
  }

  template <typename... Args>
  void splice(size_t position, size_t size, Args... args)
  {
    vec->erase(vec->cbegin() + position, vec->cbegin() + position + size);
    vec->insert(vec->cbegin() + position, { args... });
  }

  template <typename... Args>
  void unshift(Args... args)
  {
    vec->insert(vec->cbegin(), { args... });
  }

  TSArray slice(size_t first, size_t last)
  {
    return TSArray(std::vector<T>(vec->cbegin() + first, vec->cbegin() + last));
  }

  bool includes(const T& e)
  {
    return indexOf(e) != -1;
  }

  double indexOf(const T& e)
  {
    for (int i = 0; i < get_length(); ++i)
    {
      if ((*vec)[i] == e)
      {
        return i;
      }
    }
    return -1;
  }

  double lastIndexOf(const T& e)
  {
    for (int i = get_length() - 1; i >= 0; --i)
    {
      if ((*vec)[i] == e)
      {
        return i;
      }
    }
    return -1;
  }

  bool removeElement(const T& e)
  {
    auto res = vec->erase(std::find(vec->cbegin(), vec->cend(), e)) != vec->cend();
    return res;
  }

  auto keys() {
    return TSArrayKeys<size_t>(vec->size());
  }

  auto begin() {
    return vec->begin();
  }

  auto end() {
    return vec->end();
  }

  auto get_length() {
    return vec->size();
  }

  auto& operator[](int index) {
    return (*vec)[index];
  }

  auto& operator[](int index) const {
    return (*vec)[index];
  }

  auto get(int index) {
    return (*vec)[index];
  }

  auto set(int index, T value) {
    (*vec)[index] = value;
  }

  template<typename M>
  TSArray<M> map(std::function<M(T, size_t, TSArray<T>&)> p)
  {
    std::vector<M> result;
    result.resize(get_length());
    for(int i=0; i < get_length(); ++i)
    {
      result[i] = p((*vec)[i], i, *this);
    }
    return TSArray<M>(result);
  }

  double findIndex(std::function<bool(T, double, TSArray<T>&)> p)
  {
      for (size_t i = 0; i < get_length(); ++i)
      {
          if (p((*vec)[i], double(i), *this))
          {
              return double(i);
          }
      }
      return -1;
  }

  T findDefault(T def, std::function<bool(T, size_t, TSArray<T>&)> p)
  {
      for (size_t i = 0; i < get_length(); ++i)
      {
          if (p((*vec)[i], i, *this))
          {
              return (*vec)[i];
          }
      }
      return def;
  }

  TSArray<T> filter(std::function<bool(T, size_t, TSArray<T> &)> p)
  {
    std::vector<T> result;
    for (int i = 0; i < get_length(); ++i)
    {
      if (p((*vec)[i], i, *this))
      {
        result.push_back((*vec)[i]);
      }
    }
    return TSArray(result);
  }

  template <typename P>
  auto reduce(P p)
  {
    auto cur = this[0];
    for (int i = 0; i < get_length(); ++i) {
      cur = p(cur, get(i), i, *this);
    }
    return cur;
  }

  template <typename P, typename I>
  auto reduce(P p, I initial)
  {
    I cur = initial;
    for (int i = 0; i < this->vec->size(); ++i)
    {
      cur = p(cur, get(i), i, *this);
    }
    return cur;
  }

  void forEach(std::function<void(T, size_t,TSArray<T>&)> p)
  {
    for (int i = 0; i < vec->size(); ++i) {
      p((*vec)[i], i, *this);
    }
  }

#if TRINITY
  template <typename... Args>
  void push(Args...args) {
    for (const auto& item : { args... })
    {
      vec->push_back(item);
    }
  }
#elif AZEROTHCORE
  void push(T const& i1) { vec->push_back(i1); }
  void push(T const& i1, T const& i2) { push(i1); push(i2); }
  void push(T const& i1, T const& i2, T const& i3) { push(i1, i2); push(i3); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4) { push(i1, i2, i3); push(i4); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5) { push(i1, i2, i3, i4); push(i5); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5, T const& i6) { push(i1, i2, i3, i4, i5); push(i6); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5, T const& i6, T const& i7) { push(i1, i2, i3, i4, i5, i6); push(i7); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5, T const& i6, T const& i7, T const& i8) { push(i1, i2, i3, i4, i5, i6, i7); push(i8); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5, T const& i6, T const& i7, T const& i8, T const& i9) { push(i1, i2, i3, i4, i5, i6, i7, i8); push(i8); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5, T const& i6, T const& i7, T const& i8, T const& i9, T const& i10) { push(i1, i2, i3, i4, i5, i6, i7, i8, i9); push(i10); }
  void push(T const& i1, T const& i2, T const& i3, T const& i4, T const& i5, T const& i6, T const& i7, T const& i8, T const& i9, T const& i10, T const& i11) { push(i1, i2, i3, i4, i5, i6, i7, i8, i9, i10); push(i11); }
#endif

  T shift()
  {
    T value = (*vec)[0];
    vec->erase(vec->begin());
    return value;
  }

  void insert(uint32_t position, T value)
  {
    vec->insert(vec->begin() + position, value);
  }

  TSArray<T> concat(TSArray<T> addition)
  {
    TSArray<T> clone;
    clone.vec->insert(clone.end(), this->begin(), this->end());
    clone.vec->insert(clone.end(), addition->begin(), addition->end());
    return clone;
  }

  friend std::ostream& operator<<(std::ostream& os, TSArray<T> arr)
  {
    os << arr.stringify().c_str();
    return os;
  }

  friend std::ostream& operator<<(std::ostream& os, TSArray<T>* arr)
  {
    os << (*arr);
    return os;
  }

  std::string stringify(int indention = 0)
  {
    std::vector<std::string> strs;
    strs.reserve(get_length());
    unsigned int size = 0;
    for (unsigned int i = 0; i < get_length(); ++i)
    {
      strs.push_back(ToStr((*vec)[i],indention));
      size += strs[i].size() + 2; // 2 for " " and ","
      if (size < ARRAY_STRING_OVERFLOW && strs[i].find("\n") != std::string::npos)
      {
        size += ARRAY_STRING_OVERFLOW;
      }
    }

    bool multiline = size > ARRAY_STRING_OVERFLOW;

    std::string str = "[";
    if (multiline) str += "\n";
    for (unsigned int i = 0; i < get_length(); ++i)
    {
      if (multiline) str += spaces(indention + 1);
      str += ToStr((*this)[i],indention+1);
      if (i < get_length() - 1)
      {
        str += ",";
      }
      if (multiline) str += "\n";
    }
    if(multiline) str+= spaces(indention);
    return str + "]";
  }
};

#define CreateArray TSArray