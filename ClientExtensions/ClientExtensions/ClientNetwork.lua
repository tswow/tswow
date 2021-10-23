function MakeCustomPacket(opcode,size)
	local writer = { id = _MakeCustomPacket(opcode,size) }

	function writer:WriteUInt8(value) _WriteUInt8(self.id,value); return self end
	function writer:WriteInt8(value) _WriteInt8(self.id,value); return self end

	function writer:WriteUInt16(value) _WriteUInt16(self.id,value); return self end
	function writer:WriteInt16(value) _WriteInt16(self.id,value); return self end

	function writer:WriteUInt32(value) _WriteUInt32(self.id,value); return self end
	function writer:WriteInt32(value) _WriteInt32(self.id,value); return self end

	function writer:WriteFloat(value) _WriteFloat(self.id,value); return self end
	function writer:WriteDouble(value) _WriteDouble(self.id,value); return self end

	function writer:WriteString(value) _WriteString(id,value); return self end

	function writer:Send()
		_SendCustomPacket(self.id)
		return self
	end

	return writer
end

function __ReadCustomPacket()
	local reader = {}
	function reader:ReadUInt8() return _ReadUInt8() end
	function reader:ReadInt8() return _ReadInt8() end

	function reader:ReadUInt16() return _ReadUInt16() end
	function reader:ReadInt16() return _ReadInt16() end

	function reader:ReadUInt32() return _ReadUInt32() end
	function reader:ReadInt32() return _ReadInt32() end

	function reader:ReadFloat() return _ReadFloat() end
	function reader:ReadDouble() return _ReadDouble() end

	function reader:ReadString() return _ReadString() end

	return reader
end

-- todo: not sure if we can do real callbacks,
-- so we will just cheat a little and
-- execute the string '__FireCustomPacket()' whenever
-- we receive a message in c++

__callbacks = {}
function OnCustomPacket(opcode,cb)
	if(__callbacks[opcode] == nil) then
		__callbacks[opcode] = {}
	end
	table.insert(__callbacks[opcode],cb)
end

function __FireCustomPacket(opcode)
	if(__callbacks[opcode] == nil) then return end
	for _,v in pairs(__callbacks[opcode]) do
		v(__ReadCustomPacket(v))
		-- if we have multiple consumers
		_ResetCustomPacket()
	end
end