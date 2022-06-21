#include "TSEvent.h"

static std::vector<TSEvent<void*>*> ts_all_events;

void ts_clear_events()
{
    for (TSEvent<void*>* evt : ts_all_events)
    {
        evt->clear();
    }
}

void __ts_add_event(TSEvent<void*>* evt)
{
    ts_all_events.push_back(evt);
}
