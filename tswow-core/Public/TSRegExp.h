#pragma once

#include "TSBase.h"
#include "TSString.h"
#include <regex>
#include <string>
#include <stdexcept>

class TC_GAME_API TSRegExp
{
private:
    std::regex m_regex;
    std::string m_pattern;
    std::string m_flags;
    bool m_global;
    bool m_ignoreCase;
    bool m_multiline;
    bool m_dotall;

    // Helper function to preprocess pattern for dotall mode
    std::string preprocessPattern(const std::string& pattern, bool dotall)
    {
        if (!dotall) {
            return pattern;
        }

        // Replace unescaped dots with [\s\S] to match any character including newlines
        std::string result;
        bool escaped = false;
        bool inCharClass = false;
        
        for (size_t i = 0; i < pattern.length(); ++i) {
            char c = pattern[i];
            
            if (escaped) {
                result += c;
                escaped = false;
            } else if (c == '\\') {
                result += c;
                escaped = true;
            } else if (c == '[') {
                result += c;
                inCharClass = true;
            } else if (c == ']' && inCharClass) {
                result += c;
                inCharClass = false;
            } else if (c == '.' && !inCharClass) {
                // Replace dot with [\s\S] to match any character including newlines
                result += "[\\s\\S]";
            } else {
                result += c;
            }
        }
        
        return result;
    }

    std::regex_constants::syntax_option_type parseFlags(const std::string& flags)
    {
        auto options = std::regex_constants::ECMAScript;
        m_dotall = false;

        for (char flag : flags) {
            switch (flag) {
                case 'i':
                    m_ignoreCase = true;
                    options |= std::regex_constants::icase;
                    break;
                case 'g':
                    m_global = true;
                    // Global flag is handled in methods, not in regex construction
                    break;
                case 'm':
                    m_multiline = true;
                    // In ECMAScript mode, ^ and $ already match line boundaries with multiline
                    break;
                case 's':
                    // Dotall mode - . matches newlines
                    // Since std::regex doesn't support dotall, we preprocess the pattern
                    m_dotall = true;
                    break;
            }
        }

        return options;
    }

public:
    // Constructor with pattern only
    TSRegExp(const std::string& pattern)
        : m_pattern(pattern)
        , m_flags("")
        , m_global(false)
        , m_ignoreCase(false)
        , m_multiline(false)
        , m_dotall(false)
    {
        try {
            m_regex = std::regex(pattern, std::regex_constants::ECMAScript);
        } catch (const std::regex_error& e) {
            throw std::runtime_error("Invalid regular expression: " + pattern);
        }
    }

    // Constructor with pattern and flags
    TSRegExp(const std::string& pattern, const std::string& flags)
        : m_pattern(pattern)
        , m_flags(flags)
        , m_global(false)
        , m_ignoreCase(false)
        , m_multiline(false)
        , m_dotall(false)
    {
        try {
            auto options = parseFlags(flags);
            // Preprocess pattern if dotall flag is set
            std::string processedPattern = preprocessPattern(pattern, m_dotall);
            m_regex = std::regex(processedPattern, options);
        } catch (const std::regex_error& e) {
            throw std::runtime_error("Invalid regular expression: " + pattern);
        }
    }

    // test() method - returns true if pattern matches
    bool test(const std::string& str) const
    {
        return std::regex_search(str, m_regex);
    }

    // Basic exec() method - returns first match (for future enhancement)
    std::string exec(const std::string& str) const
    {
        std::smatch match;
        if (std::regex_search(str, match, m_regex)) {
            return match[0].str();
        }
        return "";
    }

    // Get the source pattern
    std::string source() const
    {
        return m_pattern;
    }

    // Get flags
    bool global() const { return m_global; }
    bool ignoreCase() const { return m_ignoreCase; }
    bool multiline() const { return m_multiline; }

    // String representation
    std::string toString() const
    {
        return "/" + m_pattern + "/" + m_flags;
    }
};

// Helper function for creating regex (matches TypeScript new RegExp())
inline TSRegExp RegExp(const std::string& pattern)
{
    return TSRegExp(pattern);
}

inline TSRegExp RegExp(const std::string& pattern, const std::string& flags)
{
    return TSRegExp(pattern, flags);
}
