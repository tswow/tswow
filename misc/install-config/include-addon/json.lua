--
-- json.lua
--
-- Copyright (c) 2020 rxi
--
-- Permission is hereby granted, free of charge, to any person obtaining a copy of
-- this software and associated documentation files (the "Software"), to deal in
-- the Software without restriction, including without limitation the rights to
-- use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
-- of the Software, and to permit persons to whom the Software is furnished to do
-- so, subject to the following conditions:
--
-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.
--
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.
--

-- Modified by TSWoW

TSJSON = { _version = "0.1.2" }
local NULL_LITERAL = "__null_literal_"

-------------------------------------------------------------------------------
-- Class
-------------------------------------------------------------------------------
TSJsonObject = __TS__Class()
TSJsonObject.name = "TSJsonObject"
function TSJsonObject.prototype.____constructor(self,table,valid)
  table._is_array = false
  self._table = table
  if valid == nil then self._valid = true else self._valid = valid end
end

function TSJsonObject.prototype.isValid(self)
  return self._valid
end

function TSJsonObject.prototype.toString(self)
  local str = "{"
  local fst = true
  for k,v in pairs(self._table) do
    if k ~= '_is_array' then
      if not fst then str = str .. "," end
      fst = false
      str = str .. '"'..k..'":'
      if(self:hasObject(k)) then str = str .. __TS__New(TSJsonObject,v,true):toString()
      elseif(self:hasArray(k)) then str = str .. __TS__New(TSJsonArray,v,true):toString()
      elseif(self:hasString(k)) then str = str .. '"'..self:getString(k)..'"'
      elseif(self:hasNull(k)) then str = str .. "null"
      elseif(self:hasBool(k)) then 
        if v == true then str = str.."true" else str = str.."false" end
      else str = str .. v
      end
    end
  end
  str = str .. "}"
  return str
end

function TSJsonObject.prototype.__tostring(self)
  return self:toString()
end

__TS__SetDescriptor(
    TSJsonObject.prototype,
    "length",
    {
        get = function(self)
          local count = 0 
          for k in pairs(self._table) do 
            if k ~= '_is_array' then
              count = count + 1 
            end
          end
          return count
        end
    }
)

function TSJsonObject.prototype.remove(self,key)
  self._table[key] = nil
end

function TSJsonObject.prototype.setBool(self,key,value)
  self._table[key] = value
  return self
end

function TSJsonObject.prototype.hasBool(self,key)
  return type(self._table[key]) == 'boolean'
end

function TSJsonObject.prototype.getBool(self,key,def)
  if not self:hasBool(key) then
    if def == nil then 
      def = false 
    end
    return def
  else
    return self._table[key]
  end
end

function TSJsonObject.prototype.setNumber(self,key,value)
  self._table[key] = value
  return self
end

function TSJsonObject.prototype.hasNumber(self,key)
  return type(self._table[key]) == 'number'
end

function TSJsonObject.prototype.getNumber(self,key,def)
  if not self:hasNumber(key) then
    if def == nil then def = 0 end
    return def
  else
    return self._table[key]
  end
end

function TSJsonObject.prototype.setNull(self,key)
  self._table[key] = NULL_LITERAL
  return self
end

function TSJsonObject.prototype.hasNull(self, key)
  return self._table[key] == NULL_LITERAL
end

function TSJsonObject.prototype.setString(self,key,value)
  self._table[key] = value
  return self
end

function TSJsonObject.prototype.hasString(self,key)
  local val = self._table[key]
  return type(val) == 'string' and val ~= NULL_LITERAL
end

function TSJsonObject.prototype.getString(self,key,def)
  if not self:hasString(key) then
    if def == nil then def = "" end
    return def
  else
    return self._table[key]
  end
end

function TSJsonObject.prototype.setObject(self,key,value)
  self._table[key] = value._table
  return self
end

function TSJsonObject.prototype.hasObject(self,key)
  local obj = self._table[key]
  return type(obj) == 'table' and not obj._is_array
end

function TSJsonObject.prototype.getObject(self,key,def)
  if not self:hasObject(key) then
    if def == nil then def = __TS__New(TSJsonObject,{},true) end
    return def
  else
    return __TS__New(TSJsonObject,self._table[key],true)
  end
end

function TSJsonObject.prototype.setArray(self,key,value)
  self._table[key] = value._table
  return self
end

function TSJsonObject.prototype.hasArray(self,key)
  local obj = self._table[key]
  return type(obj) == 'table' and obj._is_array
end

function TSJsonObject.prototype.getArray(self,key,def)
  if not self:hasArray(key) then
    if def == nil then def = __TS__New(TSJsonArray,{},true) end
    return def
  else
    return __TS__New(TSJsonArray,self._table[key],true)
  end
end

TSJsonArray = __TS__Class()
TSJsonArray.name = "TSJsonArray"
__TS__ClassExtends(TSJsonArray,TSJsonObject)

function TSJsonArray.prototype.____constructor(self,table,valid)
  table._is_array = true
  self._table = table
  if valid == nil then self._valid = true else self._valid = valid end
end

function TSJsonArray.prototype.isValid(self)
  return self._valid
end

function TSJsonArray.prototype.toString(self)
  local str = "["
  local fst = true
  for k,v in pairs(self._table) do
    if k ~= '_is_array' then
      if not fst then str = str .. "," end
      fst = false
      if(self:hasObject(k-1)) then str = str .. __TS__New(TSJsonObject,v,true):toString()
      elseif(self:hasArray(k-1)) then str = str .. __TS__New(TSJsonArray,v,true):toString()
      elseif(self:hasString(k-1)) then str = str .. '"'..v..'"'
      elseif(self:hasNull(k-1)) then str = str .. 'null'
      elseif(self:hasBool(k-1)) then 
        if v == true then str = str.."true" else str = str.."false" end
      else str = str .. v
      end
    end
  end
  str = str .. "]"
  return str
end

function TSJsonArray.prototype.resizeTo(self,index)
  local len = self.length
  if len > index then return end
  for i=len,index do
    self:pushNull()
  end
end

function TSJsonArray.prototype.remove(self,key)
  table.remove(self._table,key+1)
end

function TSJsonArray.prototype.__tostring(self)
  return self:toString()
end

function TSJsonArray.prototype.setBool(self,index,value)
  self:resizeTo(index)
  self._table[index+1] = value
  return self
end

function TSJsonArray.prototype.getBool(self,index,def)
  if not self:hasBool(index) then
    if def == nil then 
      def = false 
    end
    return def
  else
    return self._table[index+1]
  end
end

function TSJsonArray.prototype.hasBool(self,index)
  return type(self._table[index+1]) == 'boolean'
end


function TSJsonArray.prototype.setNumber(self,index,value)
  self:resizeTo(index)
  self._table[index+1] = value
end

function TSJsonArray.prototype.getNumber(self,index,def)
  if not self:hasNumber(index) then
    if def == nil then def = 0 end
    return def
  else
    return self._table[index+1]
  end
end

function TSJsonArray.prototype.hasNumber(self,index)
  return type(self._table[index+1]) == 'number'
end

function TSJsonArray.prototype.setString(self,index,value)
  self:resizeTo(index)
  self._table[index+1] = value
end

function TSJsonArray.prototype.getString(self,index,def)
  if not self:hasString(index) then
    if def == nil then def = "" end
    return def
  else
    return self._table[index+1]
  end
end

function TSJsonArray.prototype.hasString(self,index)
  local val = self._table[index+1]
  return type(val) == 'string' and val ~= NULL_LITERAL
end

function TSJsonArray.prototype.setNull(self,index)
  self:resizeTo(index)
  self._table[index+1] = NULL_LITERAL
  return self
end

function TSJsonArray.prototype.hasNull(self,index)
  return self._table[index+1] == NULL_LITERAL
end

function TSJsonArray.prototype.setObject(self,index,value)
  self:resizeTo(index)
  self._table[index+1] = value._table
  return self
end

function TSJsonArray.prototype.getObject(self,index,def)
  if not self:hasObject(index) then
    if def == nil then def = __TS__New(TSJsonObject,{},true) end
    return def
  else
    return __TS__New(TSJsonObject,self._table[index+1],true)
  end
end

function TSJsonArray.prototype.hasObject(self,index)
  local obj = self._table[index+1]
  return type(obj) == 'table' and not obj._is_array
end

function TSJsonArray.prototype.setArray(self,index,value)
  self:resizeTo(index)
  self._table[index+1] = value._table
  return self
end

function TSJsonArray.prototype.getArray(self,index,def)
  if not self:hasArray(index) then
    if def == nil then def = __TS__New(TSJsonArray,{},true) end
    return def
  else
    return __TS__New(TSJsonArray,self._table[index+1],true)
  end
end

function TSJsonArray.prototype.hasArray(self,index)
  local obj = self._table[index+1]
  return type(obj) == 'table' and obj._is_array
end

function TSJsonArray.prototype.pushBool(self,value)
  table.insert(self._table,value)
end

function TSJsonArray.prototype.insertBool(self,index,value)
  self:resizeTo(index-1)
  table.insert(self._table,index+1,value)
end

function TSJsonArray.prototype.pushNumber(self,value)
  table.insert(self._table,value)
end

function TSJsonArray.prototype.insertNumber(self,index,value)
  self:resizeTo(index-1)
  table.insert(self._table,index+1,value)
end

function TSJsonArray.prototype.pushString(self,value)
  table.insert(self._table,value)
end

function TSJsonArray.prototype.insertString(self,index,value)
  self:resizeTo(index-1)
  table.insert(self._table,index+1,value)
end

function TSJsonArray.prototype.pushNull(self)
  table.insert(self._table,NULL_LITERAL)
end

function TSJsonArray.prototype.insertNull(self,index)
  self:resizeTo(index-1)
  table.insert(self._table,index+1,NULL_LITERAL)
end

function TSJsonArray.prototype.pushObject(self,value)
  table.insert(self._table,value._table)
end

function TSJsonArray.prototype.insertObject(self,index,value)
  self:resizeTo(index-1)
  table.insert(self._table,index+1,value._table)
end

function TSJsonArray.prototype.pushArray(self,value)
  table.insert(self._table,value._table)
end

function TSJsonArray.prototype.insertArray(self,index,value)
  self:resizeTo(index-1)
  table.insert(self._table,index+1,value._table)
end
-------------------------------------------------------------------------------
-- Encode
-------------------------------------------------------------------------------

local encode

local escape_char_map = {
  [ "\\" ] = "\\",
  [ "\"" ] = "\"",
  [ "\b" ] = "b",
  [ "\f" ] = "f",
  [ "\n" ] = "n",
  [ "\r" ] = "r",
  [ "\t" ] = "t",
}

local escape_char_map_inv = { [ "/" ] = "/" }
for k, v in pairs(escape_char_map) do
  escape_char_map_inv[v] = k
end


local function escape_char(c)
  return "\\" .. (escape_char_map[c] or string.format("u%04x", c:byte()))
end


local function encode_nil(val)
  return "null"
end


local function encode_table(val, stack)
  local res = {}
  stack = stack or {}

  -- Circular reference?
  if stack[val] then error("circular reference") end

  stack[val] = true

  if rawget(val, 1) ~= nil or next(val) == nil then
    -- Treat as array -- check keys are valid and it is not sparse
    local n = 0
    for k in pairs(val) do
      if type(k) ~= "number" then
        error("invalid table: mixed or invalid key types")
      end
      n = n + 1
    end
    if n ~= #val then
      error("invalid table: sparse array")
    end
    -- Encode
    for i, v in ipairs(val) do
      table.insert(res, encode(v, stack))
    end
    stack[val] = nil
    return "[" .. table.concat(res, ",") .. "]"

  else
    -- Treat as an object
    for k, v in pairs(val) do
      if type(k) ~= "string" then
        error("invalid table: mixed or invalid key types")
      end
      table.insert(res, encode(k, stack) .. ":" .. encode(v, stack))
    end
    stack[val] = nil
    return "{" .. table.concat(res, ",") .. "}"
  end
end


local function encode_string(val)
  return '"' .. val:gsub('[%z\1-\31\\"]', escape_char) .. '"'
end


local function encode_number(val)
  -- Check for NaN, -inf and inf
  if val ~= val or val <= -math.huge or val >= math.huge then
    error("unexpected number value '" .. tostring(val) .. "'")
  end
  return string.format("%.14g", val)
end


local type_func_map = {
  [ "nil"     ] = encode_nil,
  [ "table"   ] = encode_table,
  [ "string"  ] = encode_string,
  [ "number"  ] = encode_number,
  [ "boolean" ] = tostring,
}


encode = function(val, stack)
  local t = type(val)
  local f = type_func_map[t]
  if f then
    return f(val, stack)
  end
  error("unexpected type '" .. t .. "'")
end


function TSJSON.stringify(val)
  return ( encode(val) )
end


-------------------------------------------------------------------------------
-- Decode
-------------------------------------------------------------------------------

local parse

local function create_set(...)
  local res = {}
  for i = 1, select("#", ...) do
    res[ select(i, ...) ] = true
  end
  return res
end

local space_chars   = create_set(" ", "\t", "\r", "\n")
local delim_chars   = create_set(" ", "\t", "\r", "\n", "]", "}", ",")
local escape_chars  = create_set("\\", "/", '"', "b", "f", "n", "r", "t", "u")
local literals      = create_set("true", "false", "null")

local literal_map = {
  [ "true"  ] = true,
  [ "false" ] = false,
  [ "null"  ] = NULL_LITERAL,
}


local function next_char(str, idx, set, negate)
  for i = idx, #str do
    if set[str:sub(i, i)] ~= negate then
      return i
    end
  end
  return #str + 1
end


local function decode_error(str, idx, msg)
  local line_count = 1
  local col_count = 1
  for i = 1, idx - 1 do
    col_count = col_count + 1
    if str:sub(i, i) == "\n" then
      line_count = line_count + 1
      col_count = 1
    end
  end
  error( string.format("%s at line %d col %d", msg, line_count, col_count) )
end


local function codepoint_to_utf8(n)
  -- http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=iws-appendixa
  local f = math.floor
  if n <= 0x7f then
    return string.char(n)
  elseif n <= 0x7ff then
    return string.char(f(n / 64) + 192, n % 64 + 128)
  elseif n <= 0xffff then
    return string.char(f(n / 4096) + 224, f(n % 4096 / 64) + 128, n % 64 + 128)
  elseif n <= 0x10ffff then
    return string.char(f(n / 262144) + 240, f(n % 262144 / 4096) + 128,
                       f(n % 4096 / 64) + 128, n % 64 + 128)
  end
  error( string.format("invalid unicode codepoint '%x'", n) )
end


local function parse_unicode_escape(s)
  local n1 = tonumber( s:sub(1, 4),  16 )
  local n2 = tonumber( s:sub(7, 10), 16 )
   -- Surrogate pair?
  if n2 then
    return codepoint_to_utf8((n1 - 0xd800) * 0x400 + (n2 - 0xdc00) + 0x10000)
  else
    return codepoint_to_utf8(n1)
  end
end


local function parse_string(str, i)
  local res = ""
  local j = i + 1
  local k = j

  while j <= #str do
    local x = str:byte(j)

    if x < 32 then
      decode_error(str, j, "control character in string")

    elseif x == 92 then -- `\`: Escape
      res = res .. str:sub(k, j - 1)
      j = j + 1
      local c = str:sub(j, j)
      if c == "u" then
        local hex = str:match("^[dD][89aAbB]%x%x\\u%x%x%x%x", j + 1)
                 or str:match("^%x%x%x%x", j + 1)
                 or decode_error(str, j - 1, "invalid unicode escape in string")
        res = res .. parse_unicode_escape(hex)
        j = j + #hex
      else
        if not escape_chars[c] then
          decode_error(str, j - 1, "invalid escape char '" .. c .. "' in string")
        end
        res = res .. escape_char_map_inv[c]
      end
      k = j + 1

    elseif x == 34 then -- `"`: End of string
      res = res .. str:sub(k, j - 1)
      return res, j + 1
    end

    j = j + 1
  end

  decode_error(str, i, "expected closing quote for string")
end


local function parse_number(str, i)
  local x = next_char(str, i, delim_chars)
  local s = str:sub(i, x - 1)
  local n = tonumber(s)
  if not n then
    decode_error(str, i, "invalid number '" .. s .. "'")
  end
  return n, x
end


local function parse_literal(str, i)
  local x = next_char(str, i, delim_chars)
  local word = str:sub(i, x - 1)
  if not literals[word] then
    decode_error(str, i, "invalid literal '" .. word .. "'")
  end
  return literal_map[word], x
end


local function parse_array(str, i)
  local res = {
    _is_array = true
  }
  local n = 1
  i = i + 1
  while 1 do
    local x
    i = next_char(str, i, space_chars, true)
    -- Empty / end of array?
    if str:sub(i, i) == "]" then
      i = i + 1
      break
    end
    -- Read token
    x, i = parse(str, i)
    res[n] = x
    n = n + 1
    -- Next token
    i = next_char(str, i, space_chars, true)
    local chr = str:sub(i, i)
    i = i + 1
    if chr == "]" then break end
    if chr ~= "," then decode_error(str, i, "expected ']' or ','") end
  end
  return res, i
end


local function parse_object(str, i)
  local res = {
    _is_array = false
  }
  i = i + 1
  while 1 do
    local key, val
    i = next_char(str, i, space_chars, true)
    -- Empty / end of object?
    if str:sub(i, i) == "}" then
      i = i + 1
      break
    end
    -- Read key
    if str:sub(i, i) ~= '"' then
      decode_error(str, i, "expected string for key")
    end
    key, i = parse(str, i)
    -- Read ':' delimiter
    i = next_char(str, i, space_chars, true)
    if str:sub(i, i) ~= ":" then
      decode_error(str, i, "expected ':' after key")
    end
    i = next_char(str, i + 1, space_chars, true)
    -- Read value
    val, i = parse(str, i)
    -- Set
    res[key] = val
    -- Next token
    i = next_char(str, i, space_chars, true)
    local chr = str:sub(i, i)
    i = i + 1
    if chr == "}" then break end
    if chr ~= "," then decode_error(str, i, "expected '}' or ','") end
  end
  return res, i
end


local char_func_map = {
  [ '"' ] = parse_string,
  [ "0" ] = parse_number,
  [ "1" ] = parse_number,
  [ "2" ] = parse_number,
  [ "3" ] = parse_number,
  [ "4" ] = parse_number,
  [ "5" ] = parse_number,
  [ "6" ] = parse_number,
  [ "7" ] = parse_number,
  [ "8" ] = parse_number,
  [ "9" ] = parse_number,
  [ "-" ] = parse_number,
  [ "t" ] = parse_literal,
  [ "f" ] = parse_literal,
  [ "n" ] = parse_literal,
  [ "[" ] = parse_array,
  [ "{" ] = parse_object,
}


parse = function(str, idx)
  local chr = str:sub(idx, idx)
  local f = char_func_map[chr]
  if f then
    return f(str, idx)
  end
  decode_error(str, idx, "unexpected character '" .. chr .. "'")
end

local function parseInternal(str)
  if type(str) ~= "string" then
    error("expected argument of type string, got " .. type(str))
  end
  local res, idx = parse(str, next_char(str, 1, space_chars, true))
  idx = next_char(str, idx, space_chars, true)
  if idx <= #str then
    decode_error(str, idx, "trailing garbage")
  end
  return res
end

function TSJSON:parseObject(str)
  local worked,res = pcall(function() return parseInternal(str) end)
  if not worked then
    return __TS__New(TSJsonObject,{}, false)
  else
    return __TS__New(TSJsonObject,res, true)
  end
end

function TSJSON:parseArray(str)
  local worked,res = pcall(function() return parseInternal(str) end)
  if not worked then
    return __TS__New(TSJsonArray,{}, false)
  else
    return __TS__New(TSJsonArray,res, true)
  end
end

return TSJSON