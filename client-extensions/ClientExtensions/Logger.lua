-- from https://stackoverflow.com/a/6081639/17188274

local function serializeTable(val, name, skipnewlines, depth)
    skipnewlines = skipnewlines or false
    depth = depth or 0

    local tmp = string.rep(" ", depth)

    if name then tmp = tmp .. name .. " = " end

    if type(val) == "table" then
        tmp = tmp .. "{" .. (not skipnewlines and "\n" or "")

        for k, v in pairs(val) do
            tmp =  tmp .. serializeTable(v, k, skipnewlines, depth + 1) .. "," .. (not skipnewlines and "\n" or "")
        end

        tmp = tmp .. string.rep(" ", depth) .. "}"
    elseif type(val) == "number" then
        tmp = tmp .. tostring(val)
    elseif type(val) == "string" then
        tmp = tmp .. string.format("%q", val)
    elseif type(val) == "boolean" then
        tmp = tmp .. (val and "true" or "false")
    else
        tmp = tmp .. "\"[inserializeable datatype:" .. type(val) .. "]\""
    end

    return tmp
end

local function stringify(...)
    local arg = {...}
    local str = ""
    for i,v in ipairs(arg) do
        if type(v) == "string" then
            str = str .. v
        elseif type(v) == "number" or type(v) == "boolean" then
            str = str .. tostring(v)
        elseif type(v) == "table" then
            str = str .. serializeTable(v,nil,true)
        else
            str = str .. type(v)
        end
    end
    return str
end

function LOG_DEBUG(...)
    _LOG_DEBUG(stringify(select(1,...)))
end

function LOG_INFO(...)
    _LOG_INFO(stringify(select(1,...)))
end

function LOG_WARN(...)
    _LOG_WARN(stringify(select(1,...)))
end

function LOG_ERROR(...)
    _LOG_ERROR(stringify(select(1,...)))
end
