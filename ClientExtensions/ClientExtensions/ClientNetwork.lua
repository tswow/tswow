function WriteMessage(opcode,size)
	local writer = { id = _WriteMessage(opcode,size) }

	function writer:WriteUInt8(value)
	 _WriteUInt8(self.id,value)
		return self
	end

	function writer:Send()
		_SendMessage(self.id)
		return self
	end

	return writer
end

function __ReadMessage()
	local reader = {}
	function reader:ReadUInt8()
		return _ReadUInt8()
	end
	return reader
end

-- todo: not sure if we can do real callbacks,
-- so we will just cheat a little and
-- execute the string '__FireMessage()' whenever
-- we receive a message in c++

__callbacks = {}
function OnMessage(opcode,cb)
	if(__callbacks[opcode] == nil) then
		__callbacks[opcode] = {}
	end
	table.insert(__callbacks[opcode],cb)
end

function __FireMessage(opcode)
	if(__callbacks[opcode] == nil) then return end
	for _,v in pairs(__callbacks[opcode]) do
		v(__ReadMessage(v))
		-- if we have multiple consumers
		_ResetMessage()
	end
end