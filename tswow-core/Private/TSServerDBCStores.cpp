/*
 * This file is part of the TrinityCore Project. See AUTHORS file for Copyright information
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
#include "TSServerDBCStores.h"

#include "Common.h"
#include "Config.h"

std::map<char const*, SDBC*> loaded;

static std::filesystem::path sdbc_path(char const* name)
{
    return (std::filesystem::path(sConfigMgr->GetStringDefault("DataDir", "./"))) / "dbc_server" / name;
}

bool SDBCExists(char const* name)
{
    return std::filesystem::exists(sdbc_path(name));
}

SDBC* GetSDBC(char const* name)
{
    if (!SDBCExists(name))
    {
        return nullptr;
    }

    auto itr = loaded.find(name);
    if (itr != loaded.end())
    {
        return itr->second;
    }
    return loaded[name] = new SDBC(name);
}

void UnloadAllSDBC()
{
    for (auto &[_,dbc] : loaded)
    {
        delete dbc;
    }
    loaded.clear();
}

SDBC::SDBC(char const* serverDbc)
    : m_name(serverDbc)
{
    std::ifstream stream(sdbc_path(serverDbc), std::ios::binary);
    stream.read(reinterpret_cast<char*>(&m_header), sizeof(SDBCHeader));
    std::cout << "Loading sdbc " 
        << serverDbc << ": " 
        << m_header.m_magic << " magic. "
        << m_header.m_rowCount << " rows. "
        << m_header.m_rowSize << " size. "
        << "\n"
        ;
    m_rows.resize(m_header.m_rowSize * m_header.m_rowCount);
    m_strings.resize(m_header.m_stringSize);
    stream.read(m_rows.data(), m_rows.size());
    stream.read(m_strings.data(), m_strings.size());

    m_loaded = true;
}

uint32 SDBC::RowCount()
{
    return m_header.m_rowCount;
}

bool SDBC::IsLoaded()
{
    return m_loaded;
}

void SDBCLoc::write(SDBC* dbc, std::vector<std::string>& target, bool writeDef)
{
    if (writeDef && enUS.ref)
    {
        if (target.size() <= LOCALE_enUS)
            target.resize(LOCALE_enUS + 1);
        target[LOCALE_enUS] = enUS.read(dbc);
    }
    if (koKR.ref)
    {
        if (target.size() <= LOCALE_koKR)
            target.resize(LOCALE_koKR + 1);
        target[LOCALE_koKR] = koKR.read(dbc);
    }
    if (frFR.ref)
    {
        if (target.size() <= LOCALE_frFR)
            target.resize(LOCALE_frFR + 1);
        target[LOCALE_frFR] = frFR.read(dbc);
    }
    if (deDE.ref)
    {
        if (target.size() <= LOCALE_deDE)
            target.resize(LOCALE_deDE+ 1);
        target[LOCALE_deDE] = deDE.read(dbc);
    }
    if (zhCN.ref)
    {
        if (target.size() <= LOCALE_zhCN)
            target.resize(LOCALE_zhCN + 1);
        target[LOCALE_zhCN] = zhCN.read(dbc);
    }
    if (zhTW.ref)
    {
        if (target.size() <= LOCALE_zhTW)
            target.resize(LOCALE_zhTW + 1);
        target[LOCALE_zhTW] = zhTW.read(dbc);
    }
    if (esES.ref)
    {
        if (target.size() <= LOCALE_esES)
            target.resize(LOCALE_esES + 1);
        target[LOCALE_esES] = esES.read(dbc);
    }
    if (esMX.ref)
    {
        if (target.size() <= LOCALE_esMX)
            target.resize(LOCALE_esMX + 1);
        target[LOCALE_esMX] = esMX.read(dbc);
    }
    if (ruRU.ref)
    {
        if (target.size() <= LOCALE_ruRU)
            target.resize(LOCALE_ruRU + 1);
        target[LOCALE_ruRU] = ruRU.read(dbc);
    }
}

bool SDBCString::valid()
{
    return ref;
}

char* SDBCString::read(SDBC * dbc)
{
    return dbc->m_strings.data() + ref;
}

