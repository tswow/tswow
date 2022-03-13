
#include <sstream>
#include "PngReader.h"
#include <png.hpp>

std::vector<uint32_t> PngReader::operator()(const std::vector<uint8_t> &pngData,
                                            size_t pngSize, uint32_t &width, uint32_t &height) {
    std::stringstream stream;
    stream.write((const char*) pngData.data(), pngSize);
    png::image<png::rgba_pixel> image(stream);
    width = image.get_width();
    height = image.get_height();

    std::vector<uint32_t> retColors(width * height);
    const png::pixel_buffer<png::rgba_pixel>& pixBuf = image.get_pixbuf();
    for(uint32_t i = 0u; i < height; ++i) {
        memcpy(retColors.data() + i * width, pixBuf.get_row(i).data(), sizeof(uint32_t) * width);
    }

    return retColors;
}
