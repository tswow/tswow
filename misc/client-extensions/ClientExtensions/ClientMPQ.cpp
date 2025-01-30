#include "Logger.h"
#include "CustompacketChunk.h"
#include "SharedDefines.h"

#include "windows.h"

namespace ClientMPQ {
    // todo: it looks like normal GetLastError isn't working here,
    //       so we need to find the address the client uses. Until then,
    //       we cannot specify exactly what read errors have occurred if we get them.

    size_t readFile(std::string const& filename, char** buf)
    {
        HANDLE handle = nullptr;
        bool res = SFileOpenFile(filename.c_str(), &handle);
        if (!res)
        {
            return 0;
        }
        DWORD high = 0;
        DWORD low = SFileGetFileSize(handle, &high);
        if (high > 0)
        {
            // such large files cannot be read into memory in one go
            LOG_ERROR << "File is too large to be read:" << filename;
            return 0;
        }
        char* data = new char[low];
        DWORD read = 0;
        int readRes = SFileReadFile(handle, data, low, &read, 0, 0);
        if (!readRes)
        {
            LOG_ERROR << "Unknown read error: " << filename;
            delete[] data;
            return 0;
        }
        SFileCloseFile(handle);
        *buf = data;
        return read;
    }

    std::string readFile(std::string const& filename)
    {
        char* buf;
        size_t size = readFile(filename, &buf);
        if (size == 0)
        {
            return "";
        }
        else
        {
            std::string s(buf, size);
            delete[] buf;
            return s;
        }
    }
}
