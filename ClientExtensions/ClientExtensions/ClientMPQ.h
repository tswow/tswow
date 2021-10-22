#pragma once

#include <string>

namespace ClientMPQ
{
	// If the file is not found, size 0 is returned and no error
	// message is logged.
	size_t readFile(
			std::string const& filename
		, char** buf
	);

	// If the file is not found, size 0 is returned and no error
	// message is logged.
	std::string readFile(
			std::string const& filename
	);
}
