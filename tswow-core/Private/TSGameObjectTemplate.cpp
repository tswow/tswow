#include "TSGameObjectTemplate.h"
#if TRINITY
#include "GameObjectData.h"
#elif AZEROTHCORE
#include "GameObject.h"
#endif
#include "ObjectMgr.h"

TSGameObjectTemplate::TSGameObjectTemplate(GameObjectTemplate * gtIn)
    : TSEntityProvider(&gtIn->m_tsEntity)
    , gt(gtIn)
{}

TSNumber<uint32> TSGameObjectTemplate::GetEntry()
{
    return gt->entry;
}

TSNumber<uint32> TSGameObjectTemplate::GetType()
{
    return gt->type;
}

TSNumber<uint32> TSGameObjectTemplate::GetDisplayID()
{
    return gt->displayId;
}

std::string TSGameObjectTemplate::GetName()
{
    return gt->name;
}

std::string TSGameObjectTemplate::GetIconName()
{
    return gt->IconName;
}

std::string TSGameObjectTemplate::GetCastBarCaption()
{
    return gt->castBarCaption;
}

TSEntity * TSGameObjectTemplate::GetData()
{
    return &gt->m_tsEntity;
}

TSGameObjectTemplate GetGameObjectTemplate(uint32 id)
{
    return TSGameObjectTemplate(const_cast<GameObjectTemplate*>(
        sObjectMgr->GetGameObjectTemplate(id)));
}

TSNumber<uint32> TSGameObjectTemplate::GetGOData(uint32 index)
{
    return gt->raw.data[index];
}
