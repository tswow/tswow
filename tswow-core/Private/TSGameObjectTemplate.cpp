#include "TSGameObjectTemplate.h"
#include "GameObjectData.h"
#include "ObjectMgr.h"

TSGameObjectTemplate::TSGameObjectTemplate(GameObjectTemplate * gtIn)
    : TSEntityProvider(&gtIn->m_tsEntity)
    , gt(gtIn)
{}

uint32 TSGameObjectTemplate::GetEntry()
{
    return gt->entry;
}

uint32 TSGameObjectTemplate::GetType()
{
    return gt->type;
}

uint32 TSGameObjectTemplate::GetDisplayID()
{
    return gt->displayId;
}

TSString TSGameObjectTemplate::GetName()
{
    return gt->name;
}

TSString TSGameObjectTemplate::GetIconName()
{
    return gt->IconName;
}

TSString TSGameObjectTemplate::GetCastBarCaption()
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
