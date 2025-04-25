--[[
    Copyright (c) Dmitriy. All rights reserved.
    Licensed under the MIT license. See LICENSE file in the project root for details.
]]

function CreateNineSliceFrame(width, height, textureInfos, scale)
    local frame = CreateFrame("Frame", nil, UIParent)
    frame:SetSize(width, height)

    -- TOP
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("TOP", 0, 5)
        SetAtlasTexture(texture, textureInfos['TOP'])
        texture:SetHorizTile(true)
        texture:SetSize(width - texture:GetWidth(), texture:GetHeight() * scale)
    end

    -- BOTTOM
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("BOTTOM", 0, -5)
        SetAtlasTexture(texture, textureInfos['BOTTOM'])
        texture:SetHorizTile(true)
        texture:SetSize(width - texture:GetWidth(), texture:GetHeight() * scale)
    end

    -- TOPLEFT
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("TOPLEFT", -4, 5)
        SetAtlasTexture(texture, textureInfos['TOPLEFT'])
        texture:SetSize(texture:GetWidth() * scale, texture:GetHeight() * scale)
    end

    -- TOPRIGHT
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("TOPRIGHT", 4, 5)
        SetAtlasTexture(texture, textureInfos['TOPRIGHT'])
        texture:SetSize(texture:GetWidth() * scale, texture:GetHeight() * scale)
    end

    -- BOTTOMRIGHT
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("BOTTOMRIGHT", 4, -5)
        SetAtlasTexture(texture, textureInfos['BOTTOMRIGHT'])
        texture:SetSize(texture:GetWidth() * scale, texture:GetHeight() * scale)
    end

    -- BOTTOMLEFT
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("BOTTOMLEFT", -4, -5)
        SetAtlasTexture(texture, textureInfos['BOTTOMLEFT'])
        texture:SetSize(texture:GetWidth() * scale, texture:GetHeight() * scale)
    end

    -- LEFT
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("LEFT", -4, 0)
        SetAtlasTexture(texture, textureInfos['LEFT'])
        texture:SetSize(texture:GetWidth() * scale, height - texture:GetHeight())
    end

    -- RIGHT
    do
        local texture = frame:CreateTexture(nil, "BORDER")
        texture:SetPoint("RIGHT", 4, 0)
        SetAtlasTexture(texture, textureInfos['RIGHT'])
        texture:SetSize(texture:GetWidth() * scale, height - texture:GetHeight())
    end

    return frame
end
