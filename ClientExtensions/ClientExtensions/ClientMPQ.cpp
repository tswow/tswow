#include "Logger.h"
#include "CustompacketChunk.h"
#include "ClientMacros.h"

#include "windows.h"

CLIENT_FUNC_STDCALL(
		SFileOpenFile
	, 0x00424F80
	, int
	, (
		  char const* filename
		, HANDLE* a2 /*file handle out*/
		)
)

CLIENT_FUNC_STDCALL(
		SFileGetFileSize
	, 0x004218C0
	, DWORD /*lowest 32 bits in size*/
	, (
			HANDLE handle
		, DWORD* highSize /*highest 32 bits in size*/
		)
)

CLIENT_FUNC_STDCALL(
		SFileReadFile
	, 0x00422530
	, int
	, (
		  HANDLE handle // likely a handle
		, char* data
		, DWORD bytesToRead
		, DWORD* bytesRead
		, int overlap // just set to 0
		, int unk // just set to 0
		)
)

CLIENT_FUNC_STDCALL(
	  SFileCloseFile
	, 0x00422910
	, int
	, (
			HANDLE a1
		)
)

namespace ClientMPQ {
	// todo: it looks like normal GetLastError isn't working here,
	//       so we need to find the address the client uses. Until then,
	//       we cannot specify exactly what read errors occurred if any.

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
