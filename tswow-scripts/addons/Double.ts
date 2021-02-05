/**
 * From https://stackoverflow.com/a/57443984
 */
const Double = 
`--Define some commonly used constants here so we don't have to do this at runtime
--ln(2), used for change of base down the line
local log2 = math.log(2)

--Used to convert the fraction into a (very large) integer
local pow2to52 = math.pow(2,52)

--Used for bit-shifting
local f08 = math.pow(2, 8)
local f16 = math.pow(2,16)
local f24 = math.pow(2,24)
local f32 = math.pow(2,32)
local f40 = math.pow(2,40)
local f48 = math.pow(2,48)

function encodeDouble(number)
    --IEEE double-precision floating point number
    --Specification: https://en.wikipedia.org/wiki/Double-precision_floating-point_format

    --Separate out the sign, exponent and fraction
    local sign      = number < 0 and 1 or 0
    local exponent  = math.ceil(math.log(math.abs(number))/log2) - 1
    local fraction  = math.abs(number)/math.pow(2,exponent) - 1

    --Make sure the exponent stays in range - allowed values are -1023 through 1024
    if (exponent < -1023) then 
        --We allow this case for subnormal numbers and just clamp the exponent and re-calculate the fraction
        --without the offset of 1
        exponent = -1023
        fraction = math.abs(number)/math.pow(2,exponent)
    elseif (exponent > 1024) then
        --If the exponent ever goes above this value, something went horribly wrong and we should probably stop
        error("Exponent out of range: " .. exponent)
    end

    --Handle special cases
    if (number == 0) then
        --Zero
        exponent = -1023
        fraction = 0
    elseif (math.abs(number) == math.huge) then
        --Infinity
        exponent = 1024
        fraction = 0
    elseif (number ~= number) then
        --NaN
        exponent = 1024
        fraction = (pow2to52-1)/pow2to52
    end

    --Prepare the values for encoding
    local expOut = exponent + 1023                                  --The exponent is an 11 bit offset-binary
    local fractionOut = fraction * pow2to52                         --The fraction is 52 bit, so multiplying it by 2^52 will give us an integer


    --Combine the values into 8 bytes and return the result
    return char(
            128*sign + math.floor(expOut/16),                       --Byte 0: Sign and then shift exponent down by 4 bit
            (expOut%16)*16 + math.floor(fractionOut/f48),           --Byte 1: Shift fraction up by 4 to give most significant bits, and fraction down by 48
            math.floor(fractionOut/f40)%256,                        --Byte 2: Shift fraction down 40 bit
            math.floor(fractionOut/f32)%256,                        --Byte 3: Shift fraction down 32 bit
            math.floor(fractionOut/f24)%256,                        --Byte 4: Shift fraction down 24 bit
            math.floor(fractionOut/f16)%256,                        --Byte 5: Shift fraction down 16 bit
            math.floor(fractionOut/f08)%256,                        --Byte 6: Shift fraction down 8 bit
            math.floor(fractionOut % 256)                           --Byte 7: Last 8 bits of the fraction
        )
end

function decodeDouble(str)
    --Get bytes from the string
    local byte0 = byte(substr(str,1,1))
    local byte1 = byte(substr(str,2,2))
    local byte2 = byte(substr(str,3,3))
    local byte3 = byte(substr(str,4,4))
    local byte4 = byte(substr(str,5,5))
    local byte5 = byte(substr(str,6,6))
    local byte6 = byte(substr(str,7,7))
    local byte7 = byte(substr(str,8,8))

    --Separate out the values
    local sign = byte0 >= 128 and 1 or 0
    local exponent = (byte0%128)*16 + math.floor(byte1/16)
    local fraction = (byte1%16)*f48 
                     + byte2*f40 + byte3*f32 + byte4*f24 
                     + byte5*f16 + byte6*f08 + byte7

    --Handle special cases
    if (exponent == 2047) then
        --Infinities
        if (fraction == 0) then return math.pow(-1,sign) * math.huge end

        --NaN
        if (fraction == pow2to52-1) then return 0/0 end
    end

    --Combine the values and return the result
    if (exponent == 0) then
        --Handle subnormal numbers
        return math.pow(-1,sign) * math.pow(2,exponent-1023) * (fraction/pow2to52)
    else
        --Handle normal numbers
        return math.pow(-1,sign) * math.pow(2,exponent-1023) * (fraction/pow2to52 + 1)
    end
end`