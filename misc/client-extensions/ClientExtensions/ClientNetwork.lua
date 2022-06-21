local LuaNetworkOpcode = {
    ["WRITE_SIZE"]          = 0,
    ["READ_SIZE"]           = 1,
    ["WRITE_UINT8"]         = 2,
    ["WRITE_INT8"]          = 3,
    ["WRITE_UINT16"]        = 4,
    ["WRITE_INT16"]         = 5,
    ["WRITE_UINT32"]        = 6,
    ["WRITE_INT32"]         = 7,
    ["WRITE_UINT64"]        = 8,
    ["WRITE_INT64"]         = 9,
    ["WRITE_FLOAT"]         = 10,
    ["WRITE_DOUBLE"]        = 11,
    ["WRITE_STRING"]        = 12,

    ["READ_UINT8"]          = 13,
    ["READ_INT8"]           = 14,
    ["READ_UINT16"]         = 15,
    ["READ_INT16"]          = 16,
    ["READ_UINT32"]         = 17,
    ["READ_INT32"]          = 18,
    ["READ_UINT64"]         = 19,
    ["READ_INT64"]          = 20,
    ["READ_FLOAT"]          = 21,
    ["READ_DOUBLE"]         = 22,
    ["READ_STRING"]         = 23,
    ["MAKE_CUSTOM_PACKET"]  = 24,
    ["SEND_CUSTOM_PACKET"]  = 25,
    ["RESET_CUSTOM_PACKET"] = 26,
};

function CreateCustomPacket(opcode,size)
    local writer = { id = _CLIENT_NETWORK(LuaNetworkOpcode.MAKE_CUSTOM_PACKET,opcode,size) }

    function writer:WriteUInt8(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_UINT8,self.id,value); return self end
    function writer:WriteInt8(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_INT8,self.id,value); return self end

    function writer:WriteUInt16(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_UINT16,self.id,value); return self end
    function writer:WriteInt16(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_INT16,self.id,value); return self end

    function writer:WriteUInt32(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_UINT32,self.id,value); return self end
    function writer:WriteInt32(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_INT32,self.id,value); return self end
    
    function writer:WriteUInt64(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_UINT64,self.id,value); return self end
    function writer:WriteInt64(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_INT64,self.id,value); return self end

    function writer:WriteFloat(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_FLOAT,self.id,value); return self end
    function writer:WriteDouble(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_DOUBLE,self.id,value); return self end

    function writer:WriteString(value) _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_STRING,self.id,value); return self end

    function writer:Size() return _CLIENT_NETWORK(LuaNetworkOpcode.WRITE_SIZE,self.id) end

    function writer:Send()
        _CLIENT_NETWORK(LuaNetworkOpcode.SEND_CUSTOM_PACKET,self.id)
        return self
    end

    return writer
end

function __ReadCustomPacket()
    local reader = {}
    function reader:ReadUInt8() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_UINT8) end
    function reader:ReadInt8() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_INT8) end

    function reader:ReadUInt16() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_UINT16) end
    function reader:ReadInt16() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_INT16) end

    function reader:ReadUInt32() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_UINT32) end
    function reader:ReadInt32() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_INT32) end
    
    function reader:ReadUInt64() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_UINT32) end
    function reader:ReadInt64() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_INT32) end

    function reader:ReadFloat() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_FLOAT) end
    function reader:ReadDouble() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_DOUBLE) end

    function reader:ReadString() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_STRING) end

    function reader:Size() return _CLIENT_NETWORK(LuaNetworkOpcode.READ_SIZE) end

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
        _CLIENT_NETWORK(LuaNetworkOpcode.RESET_CUSTOM_PACKET)
    end
end
