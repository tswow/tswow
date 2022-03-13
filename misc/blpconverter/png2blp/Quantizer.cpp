#include <cstring>
#include <stdexcept>
#include <libimagequant.h>
#include "Quantizer.h"

template<typename T>
class LiqElement {
protected:
    T* ptr;
public:
    operator T* () {
        return ptr;
    }

    operator const T*() const {
        return ptr;
    }
};

class LiqAttr : public LiqElement<liq_attr> {
    LiqAttr(const LiqAttr&) { }
    void operator = (const LiqAttr&) { }

public:
    LiqAttr() {
        ptr = liq_attr_create();
    }

    ~LiqAttr() {
        liq_attr_destroy(ptr);
    }
};

class LiqImage : public LiqElement<liq_image> {
    LiqImage(const LiqImage&) { }
    void operator = (const LiqImage&) { }

public:
    LiqImage(liq_image* image) { ptr = image; }
    ~LiqImage() {
        liq_image_destroy(ptr);
    }
};

class LiqResult : public LiqElement<liq_result> {
    LiqResult(const LiqResult&) { }
    void operator = (const LiqResult&) { }

public:
    LiqResult(liq_result* result) { ptr = result; }
    ~LiqResult() {
        liq_result_destroy(ptr);
    }
};

void Quantizer::quantize(const std::vector<uint32_t> &colorData, uint32_t width, uint32_t height, uint8_t minQuality,
                         uint8_t maxQuality, std::vector<uint8_t> &indices, std::vector<uint32_t> &palette) {
    LiqAttr liqAttr;
    liq_set_max_colors(liqAttr, 256);
    liq_set_quality(liqAttr, minQuality, maxQuality);
    std::vector<uint32_t> opaqueColors(colorData);
    for(uint32_t i = 0; i < opaqueColors.size(); ++i) {
        opaqueColors[i] |= 0xFF000000;
    }
    LiqImage liqImage(liq_image_create_rgba(liqAttr, opaqueColors.data(), width, height, 0.0));
    liq_result* result = NULL;
    liq_error error = liq_image_quantize(liqImage, liqAttr, &result);
    if(error != LIQ_OK) {
        throw std::runtime_error("Error running liq_image_quantize");
    }

    LiqResult liqResult(result);
    indices.resize(width * height);
    error = liq_write_remapped_image(liqResult, liqImage, indices.data(), indices.size());
    if(error != LIQ_OK) {
        throw std::runtime_error("Error running liq_write_remapped_image");
    }

    const liq_palette* liqPalette = liq_get_palette(result);
    palette.resize(liqPalette->count);
    memcpy(palette.data(), liqPalette->entries, liqPalette->count * sizeof(uint32_t));
}
