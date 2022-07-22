#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSMail.h"

void TSLua::load_mail_methods(sol::state& state)
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
    LUA_FIELD(ts_mail, TSMail, GetSubject);
    LUA_FIELD(ts_mail, TSMail, GetBody);
    LUA_FIELD(ts_mail, TSMail, SetSubject);
    LUA_FIELD(ts_mail, TSMail, SetBody);
    ts_mail.set_function("GetItems", &TSMail::LGetItems);
    ts_mail.set_function("FilterItems", &TSMail::LFilterItems);
    LUA_FIELD_OVERLOAD_2_1(ts_mail, TSMail, AddItem, uint32, uint8, TSPlayer);

    auto ts_maildraft = state.new_usertype<TSMailDraft>("TSMailDraft");
    LUA_FIELD(ts_maildraft, TSMailDraft, GetTemplateID);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetMoney);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetCOD);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetItem);
    LUA_FIELD(ts_maildraft, TSMailDraft, SetTemplateID);
    LUA_FIELD(ts_maildraft, TSMailDraft, SetSubject);
    LUA_FIELD(ts_maildraft, TSMailDraft, SetBody);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetSubject);
    LUA_FIELD(ts_maildraft, TSMailDraft, GetBody);
    LUA_FIELD_OVERLOAD_2_1(ts_maildraft, TSMailDraft, AddItem, uint32, uint8, TSPlayer);
    ts_maildraft.set_function("GetItemKeys", &TSMailDraft::LGetItemKeys);
    ts_maildraft.set_function("FilterItems", &TSMailDraft::LFilterItems);
}
