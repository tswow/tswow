#include "TSString.h"
#include "TSArray.h"

std::string __ts_string_substring(std::string const& str, double begin, double end)
{
    if (end == str.size() || end < 0)
    {
        return str.substr(begin);
    }
    else
    {
        return str.substr(begin, end - begin);
    }
}

std::string __ts_string_substr(std::string const& str, double start, double end)
{
    return __ts_string_substring(str, start, end);
}

std::string __ts_string_toUpperCase(std::string const& str)
{
    std::string cpy = std::string(str);
    std::transform(cpy.begin(), cpy.end(), cpy.begin(), ::toupper);
    return cpy;
}

std::string __ts_string_toLowerCase(std::string const& str)
{
    std::string cpy = std::string(str);
    std::transform(cpy.begin(), cpy.end(), cpy.begin(), ::tolower);
    return cpy;
}

bool __ts_string_startsWith(std::string const& str, std::string const& start)
{
    return str.rfind(start, 0) == 0;
}

bool __ts_string_endsWith(std::string const& str, std::string const& ending)
{
    if (ending.size() > str.size()) return false;
    return std::equal(ending.rbegin(), ending.rend(), str.rbegin());
}

bool __ts_string_includes(std::string const& str, std::string const& sub)
{
    return str.find(sub) != std::string::npos;
}

std::string __ts_string_replace(std::string str, std::string const& from, std::string const& to) {
    size_t start_pos = str.find(from);
    if (start_pos == std::string::npos)
        return str;
    str.replace(start_pos, from.size(), to);
    return str;
}

std::string __ts_string_replaceAll(std::string str, std::string const& from, std::string const& to) {
    if (from.empty())
        return str;
    size_t start_pos = 0;
    while ((start_pos = str.find(from, start_pos)) != std::string::npos) {
        str.replace(start_pos, from.length(), to);
        start_pos += to.length(); // In case 'to' contains 'from', like replacing 'x' with 'yx'
    }
    return str;
}

double __ts_string_indexOf(std::string const& str, std::string const& sub)
{
    size_t value = str.find(sub);
    if (value == std::string::npos)
    {
        return -1;
    }
    else
    {
        return value;
    }
}

double __ts_string_lastIndexOf(std::string const& str, std::string const& sub)
{
    size_t value = str.rfind(sub);
    if (value == std::string::npos)
    {
        return -1;
    }
    else
    {
        return value;
    }
}

std::string __ts_string_charAt(std::string const& str, double index)
{
    return __ts_string_substring(str, index, index + 1);
}

TSArray<std::string> __ts_string_split(std::string const& str, std::string const& delim)
{
    TSArray<std::string> arr;
    size_t start = 0;
    size_t end = str.find(delim);
    while (end != std::string::npos)
    {
        if (end != start) {
            arr.push(str.substr(start, end - start));
        }
        start = end + delim.size();
        end = str.find(delim, start);
    }

    end = str.size();
    if (start != end) {
        arr.push(str.substr(start, end - start));
    }

    return arr;
}

double __ts_string_length(std::string const& str)
{
    return str.size();
}
