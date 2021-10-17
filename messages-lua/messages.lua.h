// auto-generated file, do not edit
#pragma once
#define MESSAGES_LUA \
"function WriteMessage(size)\n" \
"	-- TODO: implement\n" \
"	local writer = { id = MakeWriteMessage(size) }\n" \
"\n" \
"	function writer:WriteUInt8(value)\n" \
"		_WriteUInt8(self.id,value)\n" \
"		return self\n" \
"	end\n" \
"\n" \
"	return writer\n" \
"end\n" \
"\n" \
"function __ReadMessage()\n" \
"	local reader = {}\n" \
"	function reader:ReadUInt8()\n" \
"		return _ReadUInt8()\n" \
"	end\n" \
"	return reader\n" \
"end\n" \
"\n" \
"__callbacks = {}\n" \
"lol = {}\n" \
"function OnMessage(cb)\n" \
"	table.insert(__callbacks,cb)\n" \
"end\n" \
"\n" \
"-- todo: not sure if we can do real callbacks,\n" \
"-- so we will just cheat a little\n" \
"function __FireMessage()\n" \
"	for k,v in pairs(__callbacks) do\n" \
"		v(__ReadMessage(v))\n" \
"	end\n" \
"end\n" \
