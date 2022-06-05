#include "TSLua.h"
#include "TSMail.h"

void TSLuaState::load_mail_methods(sol::state& state)
{
    auto ts_mailiteminfo = state.new_usertype < TSMailItemInfo>("TSMailItemInfo");
    LUA_FIELD(ts_mailiteminfo, TSMailItemInfo, GetGUID);
    LUA_FIELD(ts_mailiteminfo, TSMailItemInfo, GetItemTemplate);

    auto ts_mail = state.new_usertype<TSMail>("TSMail");
    LUA_FIELD(ts_mail, TSMail, GetID);
    LUA_FIELD(ts_mail, TSMail, GetType);
    LUA_FIELD(ts_mail, TSMail, GetTemplateID);
    LUA_FIELD(ts_mail, TSMail, GetSender);
    LUA_FIELD(ts_mail, TSMail, GetReceiver);
    LUA_FIELD(ts_mail, TSMail, GetState);
    LUA_FIELD(ts_mail, TSMail, GetMoney);
    LUA_FIELD(ts_mail, TSMail, GetCOD);
    LUA_FIELD(ts_mail, TSMail, GetChecked);
    LUA_FIELD(ts_mail, TSMail, GetItemCount);
    LUA_FIELD(ts_mail, TSMail, RemoveAllItems);
    LUA_FIELD(ts_mail, TSMail, AddItem);
    LUA_FIELD(ts_mail, TSMail, SetMoney);
    LUA_FIELD(ts_mail, TSMail, SetCOD);
    LUA_FIELD(ts_mail, TSMail, SetChecked);
    LUA_FIELD(ts_mail, TSMail, SetSender);
    LUA_FIELD(ts_mail, TSMail, SetState);
    ts_mail.set_function("GetSubject", &TSMail::LGetSubject);
    ts_mail.set_function("GetBody", &TSMail::LGetBody);
    ts_mail.set_function("GetItems", &TSMail::LGetItems);
    ts_mail.set_function("FilterItems", &TSMail::LFilterItems);
    ts_mail.set_function("AddItem", sol::overload(
        &TSMail::LAddItem0
        , &TSMail::LAddItem1
    ));
    ts_mail.set_function("SetSubject", &TSMail::LSetSubject);
    ts_mail.set_function("SetBody", &TSMail::LSetBody);

    auto ts_maildraft = state.new_usertype<TSMailDraft>("TSMailDraft");
    LUA_FIELD(ts_maildraft, TSMailDraft, GetTemplateID);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetMoney);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetCOD);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetItem);
    LUA_FIELD(ts_maildraft, TSMailDraft, SetTemplateID);
    LUA_FIELD(ts_maildraft, TSMailDraft, SetSubject);
    LUA_FIELD(ts_maildraft, TSMailDraft, SetBody);

    ts_maildraft.set_function("GetSubject", &TSMailDraft::LGetSubject);
    ts_maildraft.set_function("GetBody", &TSMailDraft::LGetBody);
    ts_maildraft.set_function("GetItemKeys", &TSMailDraft::LGetItemKeys);
    ts_maildraft.set_function("AddItem", sol::overload(
        &TSMailDraft::LAddItem0
        , &TSMailDraft::LAddItem1
    ));
    ts_maildraft.set_function("FilterItems", &TSMailDraft::LFilterItems);
}
