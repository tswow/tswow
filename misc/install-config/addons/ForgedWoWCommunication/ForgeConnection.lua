local playerName = UnitName("player")
local listeners = {}
local awaitingMessage = {}

--- Serializes a message
--- @param serializerDefinition table
--- @param obj table
--- @return string string The serialized string
--- @useage SerializeMessageerializeMessage(SerializerDefinitions.UPDATE_SPEC, obj)
function SerializeMessage(serializerDefinition, obj)
    return ResursiveSerilize(serializerDefinition, obj, "");
end

--- @return string string The serialized string
function ResursiveSerilize(serializerDefinition, obj, msg)
    if serializerDefinition.OBJECT then
        for i, f in ipairs(serializerDefinition.FIELDS) do
            if f.OBJECT then
                msg = ResursiveSerilize(serializerDefinition, obj, msg)
            else
                for i, field in ipairs(serializerDefinition.FIELDS) do
                    if msg == "" then
                        msg = msg .. obj[field.NAME]
                    else
                        msg = msg .. f.DELIMITER .. obj[field.NAME]
                    end
                end
            end
        end
    elseif serializerDefinition.DELIMITER and serializerDefinition.FIELDS then
        for i, field in ipairs(serializerDefinition.FIELDS) do
            if msg == "" then
                msg = msg .. obj[field.NAME]
            else
                msg = msg .. serializerDefinition.DELIMITER .. obj[field.NAME]
            end
        end
    end

    return msg;
end

--- Deserializes a message
--- @param deserializerDefinition table
--- @param msg string
--- @return table Object deserialized message
--- @useage local listOfObjects = DeserializeMessage(DeserializerDefinitions.GET_SPELL_TALENTS, message)
function DeserializeMessage(deserializerDefinition, msg)
    if not deserializerDefinition or not deserializerDefinition.OBJECT then
        return {}
    end
    local objects = {}

    if deserializerDefinition.DICT then
        objects = ParseObjectPart(objects, msg, deserializerDefinition)
    else
        local serializedObjs = ForgeSplit(deserializerDefinition.OBJECT, msg)
        if deserializerDefinition.FIELDS then
            for i, objStr in ipairs(serializedObjs) do
                objects[i] = ParseObjectPart({}, objStr, deserializerDefinition.FIELDS)
            end
        elseif deserializerDefinition.TYPE then
            for i, objStr in ipairs(serializedObjs) do
                objects[i] = ParseType(deserializerDefinition, objStr)
            end
        else
            objects = serializedObjs;
        end
    end
    return objects
end

--- internal for deserializer.
function ParseObjectPart(obj, objStr, fields)
    if not fields then
        return obj
    end

    if fields.DICT then
        local dict = {}
        local kvps = ForgeSplit(fields.OBJECT, objStr)

        for i, str in ipairs(kvps) do
            local kvp = ForgeSplit(fields.DICT, str)
            if kvp[1] then
                local key = kvp[1];
                local val = kvp[2];
                if fields.TYPE then
                    key = ParseType(fields, kvp[1]);
                end
                if fields.FIELDS then
                    val = {}
                    val = ParseObjectPart(val, fields.FIELDS, kvp[2])
                end
                dict[key] = val; -- regular kvp of dict
            end
        end

        if fields.NAME then
            obj[fields.NAME] = dict
        else
            obj = dict
        end

    elseif fields.OBJECT then
        obj[fields.NAME] = DeserializeMessage(fields, objStr); -- list of objects
    elseif fields.NAME then
        if fields.TYPE then
            obj[fields.NAME] = ParseType(fields, objStr)
        else
            obj[fields.NAME] = objStr; -- field
        end
    else
        local splitFields = ForgeSplit(fields.DELIMITER, objStr);
        for j, fldStr in ipairs(splitFields) do
            obj = ParseObjectPart(obj, fldStr, fields.FIELDS[j])
        end
    end
    return obj;
end

function ParseType(fields, objStr)
    local typeValue = fields.TYPE
    if typeValue then
        if typeValue == FieldType.NUMBER then
            return tonumber(objStr) or 0
        elseif typeValue == FieldType.BOOL then
            return objStr == "1"
        end
    end
    return nil
end

--- Subscribes to a topic
--- @param topic integer
--- @param listener function
--- @return nil nil Void return
function SubscribeToForgeTopic(topic, listener)
    listeners[topic] = listener
end

--- Sends a message to the server, ForgeTopic has descriptors on each enum value for what the message contents should be
--- @param topic integer
--- @param msg string
--- @return nil nil Void return
function PushForgeMessage(topic, msg)
    if not msg then
        return
    end
    SendAddonMessage(MESSAGE_PREFIX, topic .. "|" .. tostring(msg), "WHISPER", playerName)
end

local fs = CreateFrame("Frame")
fs:RegisterEvent("CHAT_MSG_ADDON")
fs:SetScript("OnEvent", function(self, event, ...)
    local prefix, msg, msgType, sender = ...
    if event ~= "CHAT_MSG_ADDON" or prefix ~= MESSAGE_PREFIX or msgType ~= "WHISPER" then
        return
    end
    local split = ForgeSplit("|", msg)
    local numberStartIndex = string.find(split[1], "}")
    local messageContent = split[2]
    if numberStartIndex then
        local headerSplit = ForgeSplit("}", split[1]) -- we got a big message, its coming in parts.
        local topic = tonumber(headerSplit[1])

        awaitingMessage[topic] = awaitingMessage[topic] or {}
        awaitingMessage[topic][tonumber(headerSplit[2])] = messageContent

        if #awaitingMessage[topic] == tonumber(headerSplit[3]) then
            if listeners[topic] then
                listeners[topic](table.concat(awaitingMessage[topic]))
            end
            awaitingMessage[topic] = nil
        end
    else
        local topic = tonumber(split[1]);
        if listeners[topic] then
            listeners[topic](messageContent)
        end
    end
end)

function SplitByChunk(text, chunkSize)
    local chunks = {}
    for i = 1, #text, chunkSize do
        table.insert(chunks, text:sub(i, i + chunkSize - 1))
    end
    return chunks
end

-- This will sort by key and itterate over the key
function PairsByKeys(t, f)
    local keys = {}
    for key in pairs(t) do
        table.insert(keys, key)
    end
    table.sort(keys, f)

    local i = 0
    local iter = function()
        i = i + 1
        if keys[i] then
            return keys[i], t[keys[i]]
        else
            return nil
        end
    end
    return iter
end

function dump(o)
    if type(o) == 'table' then
        local s = '{'
        for k, v in pairs(o) do
            if type(k) ~= 'number' then
                k = '"' .. k .. '"'
            end
            s = s .. '[' .. k .. '] = ' .. dump(v) .. ','
        end
        return s .. '}'
    else
        return tostring(o)
    end
end

function ForgeSplit(delim, str)
    local t = {};
    local part = "";

    for i = 1, #str do
        local c = str:sub(i, i)

        if c == delim then
            table.insert(t, part);
            part = "";
        else
            part = part .. c;
        end
    end

    if part ~= "" then
        table.insert(t, part);
    end

    return t;
end

