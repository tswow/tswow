--[[
/*
 * MIT License
 * Copyright (c) 2020 Brusalk, Tim Stirrat
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 /*
  * Modified by TSWoW 
  */
--]]
local preloadFns = {}
local modules = {}
local function ends_with(str, ending)
  return ending == "" or str:sub(-#ending) == ending
end

function tstl_register_module(name, exportFn)
  preloadFns[name] = exportFn
end

function require(name)
  if ends_with(name, "@wartoshika.wow-declarations") then
    return _G
  end
  if (modules[name]) then
    return modules[name]
  end

  if (preloadFns[name]) then
    modules[name] = preloadFns[name]()
    return modules[name]
  else
    error('Module not preloaded: ' .. name)
  end
end

tstl_register_module(
  'lualib_bundle',
  function()
    return {}
  end
)
