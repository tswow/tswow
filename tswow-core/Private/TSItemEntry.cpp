#include "TSItemEntry.h"

uint32 TSItemEntry::GetEntry()
{
    return m_entry;
}

uint32 TSItemEntry::GetCount()
{
    return m_count;
}

TSItemEntry CreateItemEntry(uint32 entry, uint32 count)
{
    return TSItemEntry(entry,count);
}