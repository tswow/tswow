#include "TSLuaLoader.h"
#include "TSObject.h"
#include "TSWorldObject.h"
#include "TSUnit.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSPlayer.h"
#include "TSItem.h"
#include "TSMap.h"
#include "TSBattleground.h"
#include "TSAchievementTemplate.h"
#include "TSCreatureTemplate.h"
#include "TSGameObjectTemplate.h"
#include "TSSpellInfo.h"
#include "TSAreaTrigger.h"
#include "TSAuction.h"
#include "TSAura.h"
#include "TSSpell.h"
#include "TSChannel.h"
#include "TSCorpse.h"
#include "TSDamageInfo.h"
#include "TSFileSystem.h"
#include "TSGroup.h"
#include "TSGuild.h"
#include "TSJson.h"
#include "TSLoot.h"
#include "TSMail.h"
#include "TSMutableString.h"
#include "TSPosition.h"
#include "TSQuest.h"
#include "TSSmartScript.h"
#include "TSOutfit.h"
#include "TSCustomPacket.h"
#include "TSVehicle.h"

//
// Shared methods (used by multiple types, e.g. inheritance)
//

#define JsonMethods(value,V)\
    value.set_function("SetNumber", &V::LSetNumber);\
    value.set_function("GetNumber", sol::overload(&V::LGetNumber0, &V::LGetNumber1));\
    value.set_function("HasNumber", &V::LSetNumber);\
    value.set_function("SetBool", &V::LSetBool);\
    value.set_function("GetBool", sol::overload(&V::LGetBool0, &V::LGetBool1));\
    value.set_function("HasBool", &V::LSetBool);\
    value.set_function("SetString", &V::LSetString);\
    value.set_function("GetString", sol::overload(&V::LGetString0, &V::LGetString1));\
    value.set_function("HasString", &V::LSetString);\
    value.set_function("SetJsonObject", &V::LSetJsonObject);\
    value.set_function("GetJsonObject", sol::overload(&V::LGetJsonObject0, &V::LGetJsonObject1));\
    value.set_function("HasJsonObject", &V::LSetJsonObject);\
    value.set_function("SetJsonArray", &V::LSetJsonArray);\
    value.set_function("GetJsonArray", sol::overload(&V::LGetJsonArray0, &V::LGetJsonArray1));\
    value.set_function("HasJsonArray", &V::LSetJsonArray);\
    value.set_function("Remove", &V::LRemove);\

#define TSEntityMethods(value)\
    LUA_METHOD(value, TSEntityProvider, SetRawUInt8);\
    LUA_METHOD(value, TSEntityProvider, GetRawUInt8);\
    LUA_METHOD(value, TSEntityProvider, SetRawInt8);\
    LUA_METHOD(value, TSEntityProvider, GetRawInt8);\
    LUA_METHOD(value, TSEntityProvider, SetRawUInt16);\
    LUA_METHOD(value, TSEntityProvider, GetRawUInt16);\
    LUA_METHOD(value, TSEntityProvider, SetRawInt16);\
    LUA_METHOD(value, TSEntityProvider, GetRawInt16);\
    LUA_METHOD(value, TSEntityProvider, SetRawUInt32);\
    LUA_METHOD(value, TSEntityProvider, GetRawUInt32);\
    LUA_METHOD(value, TSEntityProvider, SetRawInt32);\
    LUA_METHOD(value, TSEntityProvider, GetRawInt32);\
    LUA_METHOD(value, TSEntityProvider, SetRawUInt64);\
    LUA_METHOD(value, TSEntityProvider, GetRawUInt64);\
    LUA_METHOD(value, TSEntityProvider, GetRawInt64);\
    LUA_METHOD(value, TSEntityProvider, SetRawInt64);\
    LUA_METHOD(value, TSEntityProvider, SetRawFloat);\
    LUA_METHOD(value, TSEntityProvider, GetRawFloat);\
    LUA_METHOD(value, TSEntityProvider, SetRawDouble);\
    value.set_function("HasObject", &TSEntityProvider::LHasObject);\
    value.set_function("LSetUInt", &TSEntityProvider::LSetUInt);\
    value.set_function("LGetUInt", sol::overload(&TSEntityProvider::LGetUInt0, &TSEntityProvider::LGetUInt1));\
    value.set_function("LHasUInt", &TSEntityProvider::LSetUInt);\
    value.set_function("LSetInt", &TSEntityProvider::LSetInt);\
    value.set_function("LGetInt", sol::overload(&TSEntityProvider::LGetInt0, &TSEntityProvider::LGetInt1));\
    value.set_function("LHasInt", &TSEntityProvider::LSetInt);\
    value.set_function("LSetFloat", &TSEntityProvider::LSetFloat);\
    value.set_function("LGetFloat", sol::overload(&TSEntityProvider::LGetFloat0, &TSEntityProvider::LGetFloat1));\
    value.set_function("LHasFloat", &TSEntityProvider::LSetFloat);\

#define TSWorldEntityMethods(value,C)\
    TSEntityMethods(value);\
    LUA_METHOD(value, TSWorldEntityProvider<C>, GetEntityGroup);\
    LUA_METHOD(value, TSWorldEntityProvider<C>, RemoveEntityGroup);\
    LUA_METHOD(value, TSWorldEntityProvider<C>, ClearEntityGroup);\

#define TSObjectMethods(value)\
    LUA_METHOD(value, TSObject, IsNull);\
    LUA_METHOD(value, TSObject, IsInWorld);\
    LUA_METHOD(value, TSObject, GetScale);\
    LUA_METHOD(value, TSObject, GetEntry);\
    LUA_METHOD(value, TSObject, GetGUID);\
    LUA_METHOD(value, TSObject, GetGUIDLow);\
    LUA_METHOD(value, TSObject, GetTypeID);\
    LUA_METHOD(value, TSObject, SetScale);\
    LUA_METHOD(value, TSObject, SetFlag);\
    LUA_METHOD(value, TSObject, RemoveFlag);\
    LUA_METHOD(value, TSObject, HasFlag);\
    LUA_METHOD(value, TSObject, SetCoreInt32);\
    LUA_METHOD(value, TSObject, SetCoreUInt32);\
    LUA_METHOD(value, TSObject, UpdateCoreUInt32);\
    LUA_METHOD(value, TSObject, SetCoreFloat);\
    LUA_METHOD(value, TSObject, SetCoreByte);\
    LUA_METHOD(value, TSObject, SetCoreUInt16);\
    LUA_METHOD(value, TSObject, SetCoreInt16);\
    LUA_METHOD(value, TSObject, SetCoreUInt64);\
    LUA_METHOD(value, TSObject, GetCoreByte);\
    LUA_METHOD(value, TSObject, GetCoreInt32);\
    LUA_METHOD(value, TSObject, GetCoreUInt32);\
    LUA_METHOD(value, TSObject, GetCoreFloat);\
    LUA_METHOD(value, TSObject, GetCoreUInt16);\
    LUA_METHOD(value, TSObject, GetCoreUInt64);\
    LUA_METHOD(value, TSObject, ToPlayer);\
    LUA_METHOD(value, TSObject, ToUnit);\
    LUA_METHOD(value, TSObject, ToCreature);\
    LUA_METHOD(value, TSObject, ToWorldObject);\
    LUA_METHOD(value, TSObject, ToGameObject);\
    LUA_METHOD(value, TSObject, ToCorpse);\
    LUA_METHOD(value, TSObject, ToItem);\
    LUA_METHOD(value, TSObject, GetEffectiveOwner);\
    LUA_METHOD(value, TSObject, IsPlayer);\
    LUA_METHOD(value, TSObject, IsGameObject);\
    LUA_METHOD(value, TSObject, IsCreature);\
    LUA_METHOD(value, TSObject, IsUnit);\
    LUA_METHOD(value, TSObject, IsCorpse);\
    LUA_METHOD(value, TSObject, IsItem);\

#define TSWorldObjectMethods(value)\
    TSWorldEntityMethods(value,TSWorldObject);\
    TSObjectMethods(value);\
    LUA_METHOD(value, TSWorldObject, GetCreaturesInRange);\
    LUA_METHOD(value, TSWorldObject, GetPlayersInRange);\
    LUA_METHOD(value, TSWorldObject, GetUnitsInRange);\
    LUA_METHOD(value, TSWorldObject, GetGameObjectsInRange);\
    LUA_METHOD(value, TSWorldObject, GetNearestPlayer);\
    LUA_METHOD(value, TSWorldObject, GetNearestGameObject);\
    LUA_METHOD(value, TSWorldObject, GetNearestCreature);\
    LUA_METHOD(value, TSWorldObject, GetDistance);\
    LUA_METHOD(value, TSWorldObject, GetDistanceToPoint);\
    LUA_METHOD(value, TSWorldObject, GetDistance2d);\
    LUA_METHOD(value, TSWorldObject, GetDistanceToPoint2d);\
    LUA_METHOD(value, TSWorldObject, SummonGameObject);\
    LUA_METHOD(value, TSWorldObject, SpawnCreature);\
    LUA_METHOD(value, TSWorldObject, IsWithinLoS);\
    LUA_METHOD(value, TSWorldObject, IsInMap);\
    LUA_METHOD(value, TSWorldObject, IsWithinDist);\
    LUA_METHOD(value, TSWorldObject, IsWithinDistInMap);\
    LUA_METHOD(value, TSWorldObject, IsInRange);\
    LUA_METHOD(value, TSWorldObject, IsInFront);\
    LUA_METHOD(value, TSWorldObject, IsInBack);\
    LUA_METHOD(value, TSWorldObject, PlayMusic);\
    LUA_METHOD(value, TSWorldObject, PlayDirectSound);\
    LUA_METHOD(value, TSWorldObject, PlayDistanceSound);\
    LUA_METHOD(value, TSWorldObject, GetMap);\
    LUA_METHOD(value, TSWorldObject, GetName);\
    LUA_METHOD(value, TSWorldObject, GetPhaseMask);\
    LUA_METHOD(value, TSWorldObject, GetPhaseID);\
    LUA_METHOD(value, TSWorldObject, SetPhaseMask);\
    LUA_METHOD(value, TSWorldObject, GetInstanceID);\
    LUA_METHOD(value, TSWorldObject, GetAreaID);\
    LUA_METHOD(value, TSWorldObject, GetZoneID);\
    LUA_METHOD(value, TSWorldObject, GetMapID);\
    LUA_METHOD(value, TSWorldObject, GetAngle);\
    LUA_METHOD(value, TSWorldObject, GetX);\
    LUA_METHOD(value, TSWorldObject, GetY);\
    LUA_METHOD(value, TSWorldObject, GetZ);\
    LUA_METHOD(value, TSWorldObject, GetO);\
    LUA_METHOD(value, TSWorldObject, GetPosition);\
    LUA_METHOD(value, TSWorldObject, GetRelativePoint);\
    LUA_METHOD(value, TSWorldObject, IsWithinDist2d);\
    LUA_METHOD(value, TSWorldObject, IsWithinDist3d);\
    LUA_METHOD(value, TSWorldObject, IsInRange2d);\
    LUA_METHOD(value, TSWorldObject, IsInRange3d);\
    LUA_METHOD(value, TSWorldObject, IsFriendlyTo);\
    LUA_METHOD(value, TSWorldObject, IsHostileTo);\
    LUA_METHOD(value, TSWorldObject, IsFriendlyToPlayers);\
    LUA_METHOD(value, TSWorldObject, IsHostileToPlayers);\
    LUA_METHOD(value, TSWorldObject, IsNeutralToAll);\
    LUA_METHOD(value, TSWorldObject, GetGameObject);\
    LUA_METHOD(value, TSWorldObject, GetCorpse);\
    LUA_METHOD(value, TSWorldObject, GetUnit);\
    LUA_METHOD(value, TSWorldObject, GetCreature);\
    LUA_METHOD(value, TSWorldObject, GetPlayer);\
    LUA_METHOD(value, TSWorldObject, HasCollision);\
    LUA_METHOD(value, TSWorldObject, AddCollision);\
    LUA_METHOD(value, TSWorldObject, GetCollision);\
    LUA_METHOD(value, TSWorldObject, GetCollisions);\
    LUA_METHOD(value, TSWorldObject, SetActive);\
    LUA_METHOD(value, TSWorldObject, IsActive);\

#define TSUnitMethods(target)\
    TSWorldObjectMethods(target);\
    LUA_METHOD(target, TSUnit, Attack);\
    LUA_METHOD(target, TSUnit, AttackStop);\
    LUA_METHOD(target, TSUnit, IsStandState);\
    LUA_METHOD(target, TSUnit, IsMounted);\
    LUA_METHOD(target, TSUnit, IsRooted);\
    LUA_METHOD(target, TSUnit, IsFullHealth);\
    LUA_METHOD(target, TSUnit, IsInAccessiblePlaceFor);\
    LUA_METHOD(target, TSUnit, IsAuctioneer);\
    LUA_METHOD(target, TSUnit, IsGuildMaster);\
    LUA_METHOD(target, TSUnit, IsInnkeeper);\
    LUA_METHOD(target, TSUnit, IsTrainer);\
    LUA_METHOD(target, TSUnit, IsGossip);\
    LUA_METHOD(target, TSUnit, IsTaxi);\
    LUA_METHOD(target, TSUnit, IsSpiritHealer);\
    LUA_METHOD(target, TSUnit, IsSpiritGuide);\
    LUA_METHOD(target, TSUnit, IsTabardDesigner);\
    LUA_METHOD(target, TSUnit, IsServiceProvider);\
    LUA_METHOD(target, TSUnit, IsSpiritService);\
    LUA_METHOD(target, TSUnit, IsAlive);\
    LUA_METHOD(target, TSUnit, IsDead);\
    LUA_METHOD(target, TSUnit, IsDying);\
    LUA_METHOD(target, TSUnit, IsBanker);\
    LUA_METHOD(target, TSUnit, IsVendor);\
    LUA_METHOD(target, TSUnit, IsBattleMaster);\
    LUA_METHOD(target, TSUnit, IsCharmed);\
    LUA_METHOD(target, TSUnit, IsArmorer);\
    LUA_METHOD(target, TSUnit, IsAttackingPlayer);\
    LUA_METHOD(target, TSUnit, IsPvPFlagged);\
    LUA_METHOD(target, TSUnit, IsOnVehicle);\
    LUA_METHOD(target, TSUnit, IsInCombat);\
    LUA_METHOD(target, TSUnit, IsUnderWater);\
    LUA_METHOD(target, TSUnit, IsInWater);\
    LUA_METHOD(target, TSUnit, IsStopped);\
    LUA_METHOD(target, TSUnit, IsQuestGiver);\
    LUA_METHOD(target, TSUnit, HealthBelowPct);\
    LUA_METHOD(target, TSUnit, HealthAbovePct);\
    LUA_METHOD(target, TSUnit, HasAura);\
    LUA_METHOD(target, TSUnit, HasAuraType);\
    LUA_METHOD(target, TSUnit, IsCasting);\
    LUA_METHOD(target, TSUnit, HasUnitState);\
    LUA_METHOD(target, TSUnit, GetOwner);\
    LUA_METHOD(target, TSUnit, GetOwnerGUID);\
    LUA_METHOD(target, TSUnit, GetMountID);\
    LUA_METHOD(target, TSUnit, GetCreatorGUID);\
    LUA_METHOD(target, TSUnit, GetCharmerGUID);\
    LUA_METHOD(target, TSUnit, GetCharmGUID);\
    LUA_METHOD(target, TSUnit, GetPetGUID);\
    LUA_METHOD(target, TSUnit, GetPet);\
    LUA_METHOD(target, TSUnit, GetController);\
    LUA_METHOD(target, TSUnit, GetControllerGUID);\
    LUA_METHOD(target, TSUnit, GetControllerGUIDS);\
    LUA_METHOD(target, TSUnit, GetStat);\
    LUA_METHOD(target, TSUnit, GetBaseSpellPower);\
    LUA_METHOD(target, TSUnit, GetVictim);\
    LUA_METHOD(target, TSUnit, GetCurrentSpell);\
    LUA_METHOD(target, TSUnit, GetStandState);\
    LUA_METHOD(target, TSUnit, GetDisplayID);\
    LUA_METHOD(target, TSUnit, GetNativeDisplayID);\
    LUA_METHOD(target, TSUnit, GetLevel);\
    LUA_METHOD(target, TSUnit, GetHealth);\
    LUA_METHOD(target, TSUnit, PowerSelectorHelper);\
    LUA_METHOD(target, TSUnit, GetPower);\
    LUA_METHOD(target, TSUnit, GetMaxPower);\
    LUA_METHOD(target, TSUnit, GetPowerPct);\
    LUA_METHOD(target, TSUnit, GetGender);\
    LUA_METHOD(target, TSUnit, GetRace);\
    LUA_METHOD(target, TSUnit, GetClass);\
    LUA_METHOD(target, TSUnit, GetRaceMask);\
    LUA_METHOD(target, TSUnit, GetClassMask);\
    LUA_METHOD(target, TSUnit, GetCreatureType);\
    LUA_METHOD(target, TSUnit, GetClassAsString);\
    LUA_METHOD(target, TSUnit, GetRaceAsString);\
    LUA_METHOD(target, TSUnit, GetFaction);\
    LUA_METHOD(target, TSUnit, GetAura);\
    LUA_METHOD(target, TSUnit, GetFriendlyUnitsInRange);\
    LUA_METHOD(target, TSUnit, GetUnfriendlyUnitsInRange);\
    LUA_METHOD(target, TSUnit, GetVehicleKit);\
    LUA_METHOD(target, TSUnit, GetVehicle);\
    LUA_METHOD(target, TSUnit, GetCritterGUID);\
    LUA_METHOD(target, TSUnit, GetSpeed);\
    LUA_METHOD(target, TSUnit, GetMovementType);\
    LUA_METHOD(target, TSUnit, SetOwnerGUID);\
    LUA_METHOD(target, TSUnit, SetPvP);\
    LUA_METHOD(target, TSUnit, SetSheath);\
    LUA_METHOD(target, TSUnit, SetName);\
    LUA_METHOD(target, TSUnit, SetSpeed);\
    LUA_METHOD(target, TSUnit, SetFaction);\
    LUA_METHOD(target, TSUnit, SetLevel);\
    LUA_METHOD(target, TSUnit, SetHealth);\
    LUA_METHOD(target, TSUnit, SetMaxHealth);\
    LUA_METHOD(target, TSUnit, SetPower);\
    LUA_METHOD(target, TSUnit, ModifyPower);\
    LUA_METHOD(target, TSUnit, SetMaxPower);\
    LUA_METHOD(target, TSUnit, SetPowerType);\
    LUA_METHOD(target, TSUnit, SetDisplayID);\
    LUA_METHOD(target, TSUnit, SetNativeDisplayID);\
    LUA_METHOD(target, TSUnit, SetFacing);\
    LUA_METHOD(target, TSUnit, SetFacingToObject);\
    LUA_METHOD(target, TSUnit, SetCreatorGUID);\
    LUA_METHOD(target, TSUnit, SetPetGUID);\
    LUA_METHOD(target, TSUnit, SetWaterWalk);\
    LUA_METHOD(target, TSUnit, SetStandState);\
    LUA_METHOD(target, TSUnit, SetFFA);\
    LUA_METHOD(target, TSUnit, SetSanctuary);\
    LUA_METHOD(target, TSUnit, SetCritterGUID);\
    LUA_METHOD(target, TSUnit, SetRooted);\
    LUA_METHOD(target, TSUnit, SetConfused);\
    LUA_METHOD(target, TSUnit, SetFeared);\
    LUA_METHOD(target, TSUnit, ClearThreatList);\
    LUA_METHOD(target, TSUnit, Mount);\
    LUA_METHOD(target, TSUnit, Dismount);\
    LUA_METHOD(target, TSUnit, PerformEmote);\
    LUA_METHOD(target, TSUnit, EmoteState);\
    LUA_METHOD(target, TSUnit, CountPctFromCurHealth);\
    LUA_METHOD(target, TSUnit, CountPctFromMaxHealth);\
    LUA_METHOD(target, TSUnit, SendChatMessageToPlayer);\
    LUA_METHOD(target, TSUnit, MoveStop);\
    LUA_METHOD(target, TSUnit, MoveExpire);\
    LUA_METHOD(target, TSUnit, MoveClear);\
    LUA_METHOD(target, TSUnit, MoveIdle);\
    LUA_METHOD(target, TSUnit, MoveRandom);\
    LUA_METHOD(target, TSUnit, MoveHome);\
    LUA_METHOD(target, TSUnit, MoveFollow);\
    LUA_METHOD(target, TSUnit, MoveChase);\
    LUA_METHOD(target, TSUnit, MoveConfused);\
    LUA_METHOD(target, TSUnit, MoveFleeing);\
    LUA_METHOD(target, TSUnit, MoveTo);\
    LUA_METHOD(target, TSUnit, MoveJump);\
    LUA_METHOD(target, TSUnit, SendUnitWhisper);\
    LUA_METHOD(target, TSUnit, SendUnitEmote);\
    LUA_METHOD(target, TSUnit, SendUnitSay);\
    LUA_METHOD(target, TSUnit, SendUnitYell);\
    LUA_METHOD(target, TSUnit, DeMorph);\
    LUA_METHOD(target, TSUnit, CastSpell);\
    LUA_METHOD(target, TSUnit, CastCustomSpell);\
    LUA_METHOD(target, TSUnit, CastSpellAoF);\
    LUA_METHOD(target, TSUnit, ClearInCombat);\
    LUA_METHOD(target, TSUnit, StopSpellCast);\
    LUA_METHOD(target, TSUnit, InterruptSpell);\
    LUA_METHOD(target, TSUnit, AddAura);\
    LUA_METHOD(target, TSUnit, RemoveAura);\
    LUA_METHOD(target, TSUnit, RemoveAllAuras);\
    LUA_METHOD(target, TSUnit, AddUnitState);\
    LUA_METHOD(target, TSUnit, ClearUnitState);\
    LUA_METHOD(target, TSUnit, NearTeleport);\
    LUA_METHOD(target, TSUnit, DealDamage);\
    LUA_METHOD(target, TSUnit, DealHeal);\
    LUA_METHOD(target, TSUnit, Kill);\
    LUA_METHOD(target, TSUnit, AddThreat);\
    LUA_METHOD(target, TSUnit, ScaleThreat);\
    LUA_METHOD(target, TSUnit, GetResistance);\
    LUA_METHOD(target, TSUnit, GetArmor);\
    LUA_METHOD(target, TSUnit, SetResistance);\
    LUA_METHOD(target, TSUnit, SetArmor);\

#define TSMapMethods(target)\
    TSWorldEntityMethods(target,TSMap);\
    LUA_METHOD(target, TSMap, IsArena);\
    LUA_METHOD(target, TSMap, IsBG);\
    LUA_METHOD(target, TSMap, ToBG);\
    LUA_METHOD(target, TSMap, IsDungeon);\
    LUA_METHOD(target, TSMap, IsEmpty);\
    LUA_METHOD(target, TSMap, IsHeroic);\
    LUA_METHOD(target, TSMap, GetName);\
    LUA_METHOD(target, TSMap, GetHeight);\
    LUA_METHOD(target, TSMap, GetDifficulty);\
    LUA_METHOD(target, TSMap, GetInstanceID);\
    LUA_METHOD(target, TSMap, GetPlayerCount);\
    LUA_METHOD(target, TSMap, GetMapID);\
    LUA_METHOD(target, TSMap, IsInstance);\
    LUA_METHOD(target, TSMap, ToInstance);\
    LUA_METHOD(target, TSMap, GetCreature);\
    LUA_METHOD(target, TSMap, GetGameObject);\
    LUA_METHOD(target, TSMap, GetPlayer);\
    LUA_METHOD(target, TSMap, GetCreatureByDBGUID);\
    LUA_METHOD(target, TSMap, GetGameObjectByDBGUID);\
    LUA_METHOD(target, TSMap, SpawnCreature);\
    LUA_METHOD(target, TSMap, SpawnGameObject);\
    LUA_METHOD(target, TSMap, GetAreaID);\
    LUA_METHOD(target, TSMap, GetWorldObject);\
    LUA_METHOD(target, TSMap, SetWeather);\
    target.set_function("GetName", &TSMap::LGetName);\
    target.set_function("GetUnits", &TSMap::GetUnits);\
    target.set_function("GetPlayers", sol::overload(\
          &TSMap::LGetPlayers0\
        , &TSMap::LGetPlayers1\
    ));\
    target.set_function("GetGameObjects", sol::overload(\
          &TSMap::LGetGameObjects0\
        , &TSMap::LGetGameObjects1\
    ));\
    target.set_function("GetCreatures", sol::overload(\
          &TSMap::LGetCreatures0\
        , &TSMap::LGetCreatures1\
    ));\

//
// Events
//
void LuaState::load_events()
{
    auto world_events = new_usertype<TSEvents::WorldEvents>("WorldEvents");
    LUA_HANDLE(world_events, WorldEvents, OnOpenStateChange);
    LUA_HANDLE(world_events, WorldEvents, OnStartup);
    LUA_HANDLE(world_events, WorldEvents, OnShutdown);
    LUA_HANDLE(world_events, WorldEvents, OnShutdownCancel);
    LUA_HANDLE(world_events, WorldEvents, OnConfigLoad);
    LUA_HANDLE(world_events, WorldEvents, OnMotdChange);
    LUA_HANDLE(world_events, WorldEvents, OnShutdownInitiate);
    LUA_HANDLE(world_events, WorldEvents, OnUpdate);
    LUA_HANDLE(world_events, WorldEvents, OnCalcHonor);

    auto auction_events = new_usertype<TSEvents::AuctionEvents>("AuctionEvents");
    LUA_HANDLE(auction_events, AuctionEvents, OnAuctionAdd);
    LUA_HANDLE(auction_events, AuctionEvents, OnAuctionRemove);
    LUA_HANDLE(auction_events, AuctionEvents, OnAuctionSuccessful);
    LUA_HANDLE(auction_events, AuctionEvents, OnAuctionExpire);

    auto vehicle_events = new_usertype<TSEvents::VehicleEvents>("VehicleEvents");
    LUA_HANDLE(vehicle_events, VehicleEvents, OnInstall);
    LUA_HANDLE(vehicle_events, VehicleEvents, OnUninstall);
    LUA_HANDLE(vehicle_events, VehicleEvents, OnReset);
    LUA_HANDLE(vehicle_events, VehicleEvents, OnInstallAccessory);
    LUA_HANDLE(vehicle_events, VehicleEvents, OnAddPassenger);
    LUA_HANDLE(vehicle_events, VehicleEvents, OnRemovePassenger);

    auto achievement_events = new_usertype<TSEvents::AchievementEvents>("AchievementEvents");
    LUA_HANDLE(achievement_events, AchievementEvents, OnComplete);
    LUA_HANDLE(achievement_events, AchievementEvents, OnUpdate);

    auto achievement_id_events = new_usertype<TSEvents::AchievementIDEvents>("AchievementIDEvents");
    LUA_HANDLE(achievement_id_events, AchievementIDEvents, OnComplete);
    LUA_HANDLE(achievement_id_events, AchievementIDEvents, OnUpdate);

    auto player_events = new_usertype<TSEvents::PlayerEvents>("PlayerEvents");
    LUA_HANDLE(player_events, PlayerEvents, OnPVPKill);
    LUA_HANDLE(player_events, PlayerEvents, OnCreatureKill);
    LUA_HANDLE(player_events, PlayerEvents, OnPlayerKilledByCreature);
    LUA_HANDLE(player_events, PlayerEvents, OnLevelChanged);
    LUA_HANDLE(player_events, PlayerEvents, OnFreeTalentPointsChanged);
    LUA_HANDLE(player_events, PlayerEvents, OnTalentsReset);
    LUA_HANDLE(player_events, PlayerEvents, OnMoneyChanged);
    LUA_HANDLE(player_events, PlayerEvents, OnMoneyLimit);
    LUA_HANDLE(player_events, PlayerEvents, OnGiveXP);
    LUA_HANDLE(player_events, PlayerEvents, OnReputationChange);
    LUA_HANDLE(player_events, PlayerEvents, OnDuelRequest);
    LUA_HANDLE(player_events, PlayerEvents, OnDuelStart);
    LUA_HANDLE(player_events, PlayerEvents, OnDuelEnd);
    LUA_HANDLE(player_events, PlayerEvents, OnSay);
    LUA_HANDLE(player_events, PlayerEvents, OnWhisper);
    LUA_HANDLE(player_events, PlayerEvents, OnChatGroup);
    LUA_HANDLE(player_events, PlayerEvents, OnChatGuild);
    LUA_HANDLE(player_events, PlayerEvents, OnChat);
    LUA_HANDLE(player_events, PlayerEvents, OnCommand);
    LUA_HANDLE(player_events, PlayerEvents, OnEmote);
    LUA_HANDLE(player_events, PlayerEvents, OnTextEmote);
    LUA_HANDLE(player_events, PlayerEvents, OnSpellCast);
    LUA_HANDLE(player_events, PlayerEvents, OnLogin);
    LUA_HANDLE(player_events, PlayerEvents, OnReload);
    LUA_HANDLE(player_events, PlayerEvents, OnLogout);
    LUA_HANDLE(player_events, PlayerEvents, OnCreate);
    LUA_HANDLE(player_events, PlayerEvents, OnCreateEarly);
    LUA_HANDLE(player_events, PlayerEvents, OnDelete);
    LUA_HANDLE(player_events, PlayerEvents, OnFailedDelete);
    LUA_HANDLE(player_events, PlayerEvents, OnSave);
    LUA_HANDLE(player_events, PlayerEvents, OnBindToInstance);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateZone);
    LUA_HANDLE(player_events, PlayerEvents, OnMapChanged);
    LUA_HANDLE(player_events, PlayerEvents, OnQuestObjectiveProgress);
    LUA_HANDLE(player_events, PlayerEvents, OnQuestStatusChange);
    LUA_HANDLE(player_events, PlayerEvents, OnMovieComplete);
    LUA_HANDLE(player_events, PlayerEvents, OnPlayerRepop);
    LUA_HANDLE(player_events, PlayerEvents, OnSendMail);
    LUA_HANDLE(player_events, PlayerEvents, OnGossipSelect);
    LUA_HANDLE(player_events, PlayerEvents, OnGossipSelectCode);
    LUA_HANDLE(player_events, PlayerEvents, OnGenerateItemLoot);
    LUA_HANDLE(player_events, PlayerEvents, OnLearnTalent);
    LUA_HANDLE(player_events, PlayerEvents, OnLootCorpse);
    // todo: why is this not exposed?
    //LUA_HANDLE(player_events, PlayerEvents, OnTradeComplete);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateDodgePercentage);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateBlockPercentage);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateParryPercentage);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateArmor);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateMaxHealth);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateMaxPower);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateManaRegen);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateMeleeHitChance);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateRuneRegen);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateExpertise);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateSpellCrit);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateArmorPenetration);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateMeleeHitChances);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateRangedHitChances);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateSpellHitChances);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateResistance);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateShieldBlock);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateCrit);
    LUA_HANDLE(player_events, PlayerEvents, OnCalcGreyLevel);
    LUA_HANDLE(player_events, PlayerEvents, OnCalcZeroDiff);
    LUA_HANDLE(player_events, PlayerEvents, OnCalcGroupGain);
    LUA_HANDLE(player_events, PlayerEvents, OnCalcIntellectManaBonus);
    LUA_HANDLE(player_events, PlayerEvents, OnCalcSkillGainChance);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateAttackPower);
    LUA_HANDLE(player_events, PlayerEvents, OnUpdateRangedAttackPower);

    auto account_events = new_usertype<TSEvents::AccountEvents>("AccountEvents");
    LUA_HANDLE(account_events, AccountEvents, OnAccountLogin);
    LUA_HANDLE(account_events, AccountEvents, OnFailedAccountLogin);
    LUA_HANDLE(account_events, AccountEvents, OnEmailChange);
    LUA_HANDLE(account_events, AccountEvents, OnFailedEmailChange);
    LUA_HANDLE(account_events, AccountEvents, OnPasswordChange);
    LUA_HANDLE(account_events, AccountEvents, OnFailedPasswordChange);


    auto guild_events = new_usertype<TSEvents::GuildEvents>("GuildEvents");
    LUA_HANDLE(guild_events, GuildEvents, OnAddMember);
    LUA_HANDLE(guild_events, GuildEvents, OnRemoveMember);
    LUA_HANDLE(guild_events, GuildEvents, OnMOTDChanged);
    LUA_HANDLE(guild_events, GuildEvents, OnInfoChanged);
    LUA_HANDLE(guild_events, GuildEvents, OnCreate);
    LUA_HANDLE(guild_events, GuildEvents, OnDisband);
    LUA_HANDLE(guild_events, GuildEvents, OnMemberWitdrawMoney);
    LUA_HANDLE(guild_events, GuildEvents, OnMemberDepositMoney);
    LUA_HANDLE(guild_events, GuildEvents, OnEvent);
    LUA_HANDLE(guild_events, GuildEvents, OnBankEvent);


    auto group_events = new_usertype<TSEvents::GroupEvents>("GroupEvents");
    LUA_HANDLE(group_events, GroupEvents, OnAddMember);
    LUA_HANDLE(group_events, GroupEvents, OnInviteMember);
    LUA_HANDLE(group_events, GroupEvents, OnRemoveMember);
    LUA_HANDLE(group_events, GroupEvents, OnChangeLeader);
    LUA_HANDLE(group_events, GroupEvents, OnDisband);

    auto unit_events = new_usertype<TSEvents::UnitEvents>("UnitEvents");
    LUA_HANDLE(unit_events, UnitEvents, OnCalcMissChance);
    LUA_HANDLE(unit_events, UnitEvents, OnCalcHeal);
    LUA_HANDLE(unit_events, UnitEvents, OnMeleeDamageEarly);
    LUA_HANDLE(unit_events, UnitEvents, OnMeleeDamageLate);
    LUA_HANDLE(unit_events, UnitEvents, OnCalcMeleeCrit);
    LUA_HANDLE(unit_events, UnitEvents, OnCalcMeleeOutcome);
    LUA_HANDLE(unit_events, UnitEvents, OnCalcThreatEarly);
    LUA_HANDLE(unit_events, UnitEvents, OnCalcThreatLate);
    LUA_HANDLE(unit_events, UnitEvents, OnCalcScaleThreat);
    LUA_HANDLE(unit_events, UnitEvents, OnDeathEarly);
    LUA_HANDLE(unit_events, UnitEvents, OnDeath);
    LUA_HANDLE(unit_events, UnitEvents, OnEnterCombat);
    LUA_HANDLE(unit_events, UnitEvents, OnExitCombat);
    LUA_HANDLE(unit_events, UnitEvents, OnExitCombat);
    LUA_HANDLE(unit_events, UnitEvents, OnEnterCombatWith);
    LUA_HANDLE(unit_events, UnitEvents, OnExitCombatWith);

    auto spell_events = new_usertype<TSEvents::SpellEvents>("SpellEvents");
    LUA_HANDLE(spell_events, SpellEvents, OnCast);
    LUA_HANDLE(spell_events, SpellEvents, OnCheckCast);
    LUA_HANDLE(spell_events, SpellEvents, OnDispel);
    LUA_HANDLE(spell_events, SpellEvents, OnEffect);
    LUA_HANDLE(spell_events, SpellEvents, OnHit);
    LUA_HANDLE(spell_events, SpellEvents, OnTick);
    LUA_HANDLE(spell_events, SpellEvents, OnRemove);
    LUA_HANDLE(spell_events, SpellEvents, OnApply);
    LUA_HANDLE(spell_events, SpellEvents, OnDamageEarly);
    LUA_HANDLE(spell_events, SpellEvents, OnDamageLate);
    LUA_HANDLE(spell_events, SpellEvents, OnPeriodicDamage);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcCrit);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcAuraCrit);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcReflect);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcHit);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcResist);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcMeleeMiss);
    LUA_HANDLE(spell_events, SpellEvents, OnCalcSpellPowerLevelPenalty);
    LUA_HANDLE(spell_events, SpellEvents, OnTrainerSend);

    auto spell_id_events = new_usertype<TSEvents::SpellIDEvents>("SpellIDEvents");
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCast);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCheckCast);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnDispel);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnEffect);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnHit);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnTick);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnRemove);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnApply);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnDamageEarly);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnDamageLate);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnPeriodicDamage);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcCrit);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcAuraCrit);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcReflect);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcHit);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcResist);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcMeleeMiss);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnCalcSpellPowerLevelPenalty);
    LUA_HANDLE(spell_id_events, SpellIDEvents, OnTrainerSend);

    auto creature_events = new_usertype<TSEvents::CreatureEvents>("CreatureEvents");
    LUA_HANDLE(creature_events, CreatureEvents, OnMoveInLOS);
    LUA_HANDLE(creature_events, CreatureEvents, OnJustEnteredCombat);
    LUA_HANDLE(creature_events, CreatureEvents, OnJustEngagedWith);
    LUA_HANDLE(creature_events, CreatureEvents, OnDeathEarly);
    LUA_HANDLE(creature_events, CreatureEvents, OnDeath);
    LUA_HANDLE(creature_events, CreatureEvents, OnKilledUnit);
    LUA_HANDLE(creature_events, CreatureEvents, OnSummoned);
    LUA_HANDLE(creature_events, CreatureEvents, OnIsSummoned);
    LUA_HANDLE(creature_events, CreatureEvents, OnSummonDespawn);
    LUA_HANDLE(creature_events, CreatureEvents, OnSummonDies);
    LUA_HANDLE(creature_events, CreatureEvents, OnHitBySpell);
    LUA_HANDLE(creature_events, CreatureEvents, OnSpellHitTarget);
    LUA_HANDLE(creature_events, CreatureEvents, OnSpellCastFinished);
    LUA_HANDLE(creature_events, CreatureEvents, OnJustAppeared);
    LUA_HANDLE(creature_events, CreatureEvents, OnCharmed);
    LUA_HANDLE(creature_events, CreatureEvents, OnReachedHome);
    LUA_HANDLE(creature_events, CreatureEvents, OnReceiveEmote);
    LUA_HANDLE(creature_events, CreatureEvents, OnOwnerAttacked);
    LUA_HANDLE(creature_events, CreatureEvents, OnOwnerAttacks);
    LUA_HANDLE(creature_events, CreatureEvents, OnCorpseRemoved);
    LUA_HANDLE(creature_events, CreatureEvents, OnWaypointStarted);
    LUA_HANDLE(creature_events, CreatureEvents, OnWaypointReached);
    LUA_HANDLE(creature_events, CreatureEvents, OnWaypointPathEnded);
    LUA_HANDLE(creature_events, CreatureEvents, OnPassengerBoarded);
    LUA_HANDLE(creature_events, CreatureEvents, OnSpellClick);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateAI);
    LUA_HANDLE(creature_events, CreatureEvents, OnGenerateLoot);
    LUA_HANDLE(creature_events, CreatureEvents, OnCreate);
    LUA_HANDLE(creature_events, CreatureEvents, OnReload);
    LUA_HANDLE(creature_events, CreatureEvents, OnRemove);
    LUA_HANDLE(creature_events, CreatureEvents, OnCanGeneratePickPocketLoot);
    LUA_HANDLE(creature_events, CreatureEvents, OnGeneratePickPocketLoot);
    LUA_HANDLE(creature_events, CreatureEvents, OnGenerateSkinningLoot);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateLvlDepMaxHealth);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateLvlDepMaxMana);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateLvlDepBaseDamage);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateLvlDepArmor);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateLvlDepAttackPower);
    LUA_HANDLE(creature_events, CreatureEvents, OnSendVendorItem);
    LUA_HANDLE(creature_events, CreatureEvents, OnGossipHello);
    LUA_HANDLE(creature_events, CreatureEvents, OnGossipSelect);
    LUA_HANDLE(creature_events, CreatureEvents, OnGossipSelectCode);
    LUA_HANDLE(creature_events, CreatureEvents, OnQuestAccept);
    LUA_HANDLE(creature_events, CreatureEvents, OnQuestReward);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateResistance);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateArmor);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateMaxHealth);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateMaxPower);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateAttackPowerDamage);
    LUA_HANDLE(creature_events, CreatureEvents, OnUpdateDamagePhysical);
    LUA_HANDLE(creature_events, CreatureEvents, OnCalcColorCode);
    LUA_HANDLE(creature_events, CreatureEvents, OnCalcGain);
    LUA_HANDLE(creature_events, CreatureEvents, OnCalcBaseGain);

    auto creature_id_events = new_usertype<TSEvents::CreatureIDEvents>("CreatureIDEvents");
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnMoveInLOS);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnJustEnteredCombat);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnJustEngagedWith);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnDeathEarly);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnDeath);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnKilledUnit);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSummoned);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnIsSummoned);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSummonDespawn);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSummonDies);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnHitBySpell);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSpellHitTarget);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSpellCastFinished);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnJustAppeared);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCharmed);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnReachedHome);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnReceiveEmote);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnOwnerAttacked);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnOwnerAttacks);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCorpseRemoved);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnWaypointStarted);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnWaypointReached);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnWaypointPathEnded);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnPassengerBoarded);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSpellClick);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateAI);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnGenerateLoot);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCreate);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnReload);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnRemove);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCanGeneratePickPocketLoot);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnGeneratePickPocketLoot);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnGenerateSkinningLoot);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateLvlDepMaxHealth);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateLvlDepMaxMana);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateLvlDepBaseDamage);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateLvlDepArmor);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateLvlDepAttackPower);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnSendVendorItem);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnGossipHello);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnGossipSelect);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnGossipSelectCode);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnQuestAccept);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnQuestReward);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateResistance);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateArmor);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateMaxHealth);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateMaxPower);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateAttackPowerDamage);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnUpdateDamagePhysical);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCalcColorCode);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCalcGain);
    LUA_HANDLE(creature_id_events, CreatureIDEvents, OnCalcBaseGain);

    auto gameobject_events = new_usertype<TSEvents::GameObjectEvents>("GameObjectEvents");
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnUpdate);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnDialogStatus);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnDestroyed);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnDamaged);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnLootStateChanged);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnGOStateChanged);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnGossipHello);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnGossipSelect);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnGossipSelectCode);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnCreate);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnReload);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnRemove);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnUse);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnQuestAccept);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnQuestReward);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnGenerateLoot);
    LUA_HANDLE(gameobject_events, GameObjectEvents, OnGenerateFishLoot);

    auto gameobject_id_events = new_usertype<TSEvents::GameObjectIDEvents>("GameObjectIDEvents");
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnUpdate);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnDialogStatus);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnDestroyed);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnDamaged);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnLootStateChanged);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnGOStateChanged);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnGossipHello);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnGossipSelect);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnGossipSelectCode);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnCreate);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnReload);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnRemove);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnUse);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnQuestAccept);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnQuestReward);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnGenerateLoot);
    LUA_HANDLE(gameobject_id_events, GameObjectIDEvents, OnGenerateFishLoot);

    auto map_events = new_usertype<TSEvents::MapEvents>("MapEvents");
    LUA_HANDLE(map_events, MapEvents, OnCreate);
    LUA_HANDLE(map_events, MapEvents, OnReload);
    LUA_HANDLE(map_events, MapEvents, OnUpdate);
    LUA_HANDLE(map_events, MapEvents, OnPlayerEnter);
    LUA_HANDLE(map_events, MapEvents, OnPlayerLeave);
    LUA_HANDLE(map_events, MapEvents, OnCreatureCreate);
    LUA_HANDLE(map_events, MapEvents, OnCreatureRemove);
    LUA_HANDLE(map_events, MapEvents, OnGameObjectCreate);
    LUA_HANDLE(map_events, MapEvents, OnGameObjectRemove);
    LUA_HANDLE(map_events, MapEvents, OnCheckEncounter);
    LUA_HANDLE(map_events, MapEvents, OnMessage);

    auto map_id_events = new_usertype<TSEvents::MapIDEvents>("MapIDEvents");
    LUA_HANDLE(map_id_events, MapIDEvents, OnCreate);
    LUA_HANDLE(map_id_events, MapIDEvents, OnReload);
    LUA_HANDLE(map_id_events, MapIDEvents, OnUpdate);
    LUA_HANDLE(map_id_events, MapIDEvents, OnPlayerEnter);
    LUA_HANDLE(map_id_events, MapIDEvents, OnPlayerLeave);
    LUA_HANDLE(map_id_events, MapIDEvents, OnCreatureCreate);
    LUA_HANDLE(map_id_events, MapIDEvents, OnCreatureRemove);
    LUA_HANDLE(map_id_events, MapIDEvents, OnGameObjectCreate);
    LUA_HANDLE(map_id_events, MapIDEvents, OnGameObjectRemove);
    LUA_HANDLE(map_id_events, MapIDEvents, OnCheckEncounter);
    LUA_HANDLE(map_id_events, MapIDEvents, OnMessage);

    auto battleground_events = new_usertype<TSEvents::BattlegroundEvents>("BattlegroundEvents");
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnCanCreate);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnReload);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnCreate);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnReset);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnOpenDoors);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnCloseDoors);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnDestroyGate);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnAchievementCriteria);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnAddPlayer);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnPlayerLogin);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnPlayerLogout);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnUpdateScore);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnEndEarly);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnEndLate);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnUpdateEarly);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnUpdateLate);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnRemovePlayer);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnKillPlayer);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnKillCreature);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnAddCreature);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnAddGameObject);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnAddSpiritGuide);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnAreaTrigger);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnGenericEvent);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnDropFlag);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnClickFlag);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnPlayerUnderMap);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnWeight);
    LUA_HANDLE(battleground_events, BattlegroundEvents, OnSelect);


    auto battleground_id_events = new_usertype<TSEvents::BattlegroundIDEvents>("BattlegroundIDEvents");
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnCanCreate);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnReload);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnCreate);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnReset);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnOpenDoors);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnCloseDoors);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnDestroyGate);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnAchievementCriteria);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnAddPlayer);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnPlayerLogin);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnPlayerLogout);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnUpdateScore);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnEndEarly);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnEndLate);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnUpdateEarly);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnUpdateLate);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnRemovePlayer);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnKillPlayer);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnKillCreature);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnAddCreature);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnAddGameObject);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnAddSpiritGuide);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnAreaTrigger);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnGenericEvent);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnDropFlag);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnClickFlag);
    LUA_HANDLE(battleground_id_events, BattlegroundIDEvents, OnPlayerUnderMap);

    auto instance_events = new_usertype<TSEvents::InstanceEvents>("InstanceEvents");
    LUA_HANDLE(instance_events, InstanceEvents, OnCreate);
    LUA_HANDLE(instance_events, InstanceEvents, OnReload);
    LUA_HANDLE(instance_events, InstanceEvents, OnLoad);
    LUA_HANDLE(instance_events, InstanceEvents, OnSave);
    LUA_HANDLE(instance_events, InstanceEvents, OnUpdate);
    LUA_HANDLE(instance_events, InstanceEvents, OnPlayerEnter);
    LUA_HANDLE(instance_events, InstanceEvents, OnPlayerLeave);
    LUA_HANDLE(instance_events, InstanceEvents, OnBossStateChange);
    LUA_HANDLE(instance_events, InstanceEvents, OnCanKillBoss);
    LUA_HANDLE(instance_events, InstanceEvents, OnFillInitialWorldStates);
    LUA_HANDLE(instance_events, InstanceEvents, OnSetBossNumber);
    LUA_HANDLE(instance_events, InstanceEvents, OnLoadBossBoundaries);
    LUA_HANDLE(instance_events, InstanceEvents, OnLoadMinionData);
    LUA_HANDLE(instance_events, InstanceEvents, OnLoadDoorData);
    LUA_HANDLE(instance_events, InstanceEvents, OnLoadObjectData);

    auto instance_id_events = new_usertype<TSEvents::InstanceIDEvents>("InstanceIDEvents");
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnCreate);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnReload);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnLoad);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnSave);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnUpdate);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnPlayerEnter);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnPlayerLeave);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnBossStateChange);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnCanKillBoss);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnFillInitialWorldStates);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnSetBossNumber);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnLoadBossBoundaries);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnLoadMinionData);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnLoadDoorData);
    LUA_HANDLE(instance_id_events, InstanceIDEvents, OnLoadObjectData);

    auto item_events = new_usertype<TSEvents::ItemEvents>("ItemEvents");
    LUA_HANDLE(item_events, ItemEvents, OnUse);
    LUA_HANDLE(item_events, ItemEvents, OnExpire);
    LUA_HANDLE(item_events, ItemEvents, OnRemove);
    LUA_HANDLE(item_events, ItemEvents, OnCastSpell);
    LUA_HANDLE(item_events, ItemEvents, OnQuestAccept);
    LUA_HANDLE(item_events, ItemEvents, OnGossipHello);
    LUA_HANDLE(item_events, ItemEvents, OnGossipSelect);
    LUA_HANDLE(item_events, ItemEvents, OnGossipSelectCode);
    LUA_HANDLE(item_events, ItemEvents, OnCanChangeEquipState);
    LUA_HANDLE(item_events, ItemEvents, OnUnequip);
    LUA_HANDLE(item_events, ItemEvents, OnBank);
    LUA_HANDLE(item_events, ItemEvents, OnCanEquip);
    LUA_HANDLE(item_events, ItemEvents, OnEquip);
    LUA_HANDLE(item_events, ItemEvents, OnCanUse);
    LUA_HANDLE(item_events, ItemEvents, OnCanUseType);
    LUA_HANDLE(item_events, ItemEvents, OnLFGRollEarly);
    LUA_HANDLE(item_events, ItemEvents, OnDestroyEarly);
    LUA_HANDLE(item_events, ItemEvents, OnTakenAsLoot);

    auto item_id_events = new_usertype<TSEvents::ItemIDEvents>("ItemIDEvents");
    LUA_HANDLE(item_id_events, ItemIDEvents, OnUse);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnExpire);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnRemove);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnCastSpell);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnQuestAccept);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnGossipHello);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnGossipSelect);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnGossipSelectCode);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnCanChangeEquipState);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnUnequip);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnBank);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnCanEquip);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnEquip);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnCanUse);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnCanUseType);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnLFGRollEarly);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnDestroyEarly);
    LUA_HANDLE(item_id_events, ItemIDEvents, OnTakenAsLoot);

    auto quest_events = new_usertype<TSEvents::QuestEvents>("QuestEvents");
    LUA_HANDLE(quest_events, QuestEvents, OnAccept);
    LUA_HANDLE(quest_events, QuestEvents, OnReward);
    LUA_HANDLE(quest_events, QuestEvents, OnRewardXP);
    LUA_HANDLE(quest_events, QuestEvents, OnObjectiveProgress);
    LUA_HANDLE(quest_events, QuestEvents, OnStatusChanged);
    LUA_HANDLE(quest_events, QuestEvents, OnSpellFinish);

    auto quest_id_events = new_usertype<TSEvents::QuestIDEvents>("QuestIDEvents");
    LUA_HANDLE(quest_id_events, QuestIDEvents, OnAccept);
    LUA_HANDLE(quest_id_events, QuestIDEvents, OnReward);
    LUA_HANDLE(quest_id_events, QuestIDEvents, OnRewardXP);
    LUA_HANDLE(quest_id_events, QuestIDEvents, OnObjectiveProgress);
    LUA_HANDLE(quest_id_events, QuestIDEvents, OnStatusChanged);
    LUA_HANDLE(quest_id_events, QuestIDEvents, OnSpellFinish);

#if TRINITY
    auto area_trigger_events = new_usertype<TSEvents::AreaTriggerEvents>("AreaTriggerEvents");
    LUA_HANDLE(area_trigger_events, AreaTriggerEvents, OnTrigger);

    auto area_trigger_id_events = new_usertype<TSEvents::AreaTriggerIDEvents>("AreaTriggerIDEvents");
    LUA_HANDLE(area_trigger_id_events, AreaTriggerIDEvents, OnTrigger);
#endif
    auto gameevent_events = new_usertype<TSEvents::GameEventsEvents>("GameEventsEvents");
    LUA_HANDLE(gameevent_events, GameEventsEvents, OnStart);
    LUA_HANDLE(gameevent_events, GameEventsEvents, OnUpdateState);
    LUA_HANDLE(gameevent_events, GameEventsEvents, OnEnd);

    auto gameevent_id_events = new_usertype<TSEvents::GameEventIDEvents>("GameEventIDEvents");
    LUA_HANDLE(gameevent_id_events, GameEventIDEvents, OnStart);
    LUA_HANDLE(gameevent_id_events, GameEventIDEvents, OnUpdateState);
    LUA_HANDLE(gameevent_id_events, GameEventIDEvents, OnEnd);

    auto smartaction_events = new_usertype<TSEvents::SmartActionEvents>("SmartActionEvents");
    LUA_HANDLE(smartaction_events, SmartActionEvents, OnActivateEarly);
    LUA_HANDLE(smartaction_events, SmartActionEvents, OnActivateLate);

    auto smartaction_id_events = new_usertype<TSEvents::SmartActionIDEvents>("SmartActionIDEvents");
    LUA_HANDLE(smartaction_id_events, SmartActionIDEvents, OnActivateEarly);
    LUA_HANDLE(smartaction_id_events, SmartActionIDEvents, OnActivateLate);

    auto condition_events = new_usertype<TSEvents::ConditionEvents>("ConditionEvents");
    LUA_HANDLE(condition_events, ConditionEvents, OnCheck);

    auto condition_id_events = new_usertype<TSEvents::ConditionIDEvents>("ConditionIDEvents");
    LUA_HANDLE(condition_id_events, ConditionIDEvents, OnCheck);

    auto custompacket_events = new_usertype<TSEvents::CustomPacketEvents>("CustomPacketEvents");
    LUA_HANDLE(custompacket_events, CustomPacketEvents, OnReceive);

    auto custompacket_id_events = new_usertype<TSEvents::CustomPacketIDEvents>("CustomPacketIDEvents");
    LUA_HANDLE(custompacket_id_events, CustomPacketIDEvents, OnReceive);

    auto worldpacket_events = new_usertype<TSEvents::WorldPacketEvents>("WorldPacketEvents");
    LUA_HANDLE(worldpacket_events, WorldPacketEvents, OnReceive);
    LUA_HANDLE(worldpacket_events, WorldPacketEvents, OnSend);

    auto worldpacket_id_events = new_usertype<TSEvents::WorldPacketIDEvents>("WorldPacketIDEvents");
    LUA_HANDLE(worldpacket_id_events, WorldPacketIDEvents, OnReceive);
    LUA_HANDLE(worldpacket_id_events, WorldPacketIDEvents, OnSend);

    auto ts_events = new_usertype<TSEvents>("CTSEvents");

    ts_events["World"] = &TSEvents::World;
    ts_events["Unit"] = &TSEvents::Unit;
    ts_events["AuctionHouse"] = &TSEvents::AuctionHouse;
    ts_events["Vehicle"] = &TSEvents::Vehicle;
    ts_events["Player"] = &TSEvents::Player;
    ts_events["Account"] = &TSEvents::Account;
    ts_events["Guild"] = &TSEvents::Guild;
    ts_events["Group"] = &TSEvents::Group;
    ts_events["Spells"] = &TSEvents::Spells;
    ts_events["SpellID"] = &TSEvents::SpellID;
    ts_events["Creatures"] = &TSEvents::Creatures;
    ts_events["CreatureID"] = &TSEvents::CreatureID;
    ts_events["Battlegrounds"] = &TSEvents::Battlegrounds;
    ts_events["BattlegroundID"] = &TSEvents::BattlegroundID;
    ts_events["Items"] = &TSEvents::Items;
    ts_events["ItemID"] = &TSEvents::ItemID;
    ts_events["Quests"] = &TSEvents::Quests;
    ts_events["QuestID"] = &TSEvents::QuestID;
#if TRINITY
    ts_events["AreaTriggers"] = &TSEvents::AreaTriggers;
    ts_events["AreaTriggerID"] = &TSEvents::AreaTriggerID;
#endif
    ts_events["Maps"] = &TSEvents::Maps;
    ts_events["MapID"] = &TSEvents::MapID;
    ts_events["Instances"] = &TSEvents::Instances;
    ts_events["InstanceiD"] = &TSEvents::InstanceID;
    ts_events["Achievements"] = &TSEvents::Achievements;
    ts_events["AchievementID"] = &TSEvents::AchievementID;
    ts_events["GameEvents"] = &TSEvents::GameEvents;
    ts_events["GameEventID"] = &TSEvents::GameEventID;
    ts_events["SmartActions"] = &TSEvents::SmartActions;
    ts_events["SmartActionID"] = &TSEvents::SmartActionID;
    ts_events["Conditions"] = &TSEvents::Conditions;
    ts_events["ConditionID"] = &TSEvents::ConditionID;
    ts_events["CustomPackets"] = &TSEvents::CustomPackets;
    ts_events["CustomPacketID"] = &TSEvents::CustomPacketID;
    ts_events["WorldPackets"] = &TSEvents::WorldPackets;
    ts_events["WorldPacketID"] = &TSEvents::WorldPacketID;
}

// 
// Methods (TS* classes)
//
void LuaState::load_methods()
{
    auto ts_worldobjectgroup = new_usertype<TSWorldObjectGroup>("TSWorldObjectGroup");
    LUA_METHOD(ts_worldobjectgroup, TSWorldObjectGroup, Add);
    LUA_METHOD(ts_worldobjectgroup, TSWorldObjectGroup, Remove);
    LUA_METHOD(ts_worldobjectgroup, TSWorldObjectGroup, RemovedByObject);
    LUA_METHOD(ts_worldobjectgroup, TSWorldObjectGroup, Clear);

    auto ts_worldobjectgroups = new_usertype<TSWorldObjectGroups>("TSWorldObjectGroups");
    LUA_METHOD(ts_worldobjectgroups, TSWorldObjectGroups, GetGroup);
    LUA_METHOD(ts_worldobjectgroups, TSWorldObjectGroups, RemoveGroup);
    LUA_METHOD(ts_worldobjectgroups, TSWorldObjectGroups, ClearGroups);

    auto ts_creature = new_usertype<TSCreature>("TSCreature");
    ts_creature.set_function("GetScriptName", &TSCreature::LGetScriptName);
    ts_creature.set_function("GetAIName", &TSCreature::LGetAIName);
    ts_creature.set_function("GetAITargets", &TSCreature::LGetAITargets);
    ts_creature.set_function("GetOutfitCopy", sol::overload(
          &TSCreature::LGetOutfitCopy0
        , &TSCreature::LGetOutfitCopy1
        , &TSCreature::LGetOutfitCopy2
        , &TSCreature::LGetOutfitCopy3
    ));
    LUA_METHOD(ts_creature, TSCreature, IsReputationGainDisabled);
    LUA_METHOD(ts_creature, TSCreature, IsReputationGainDisabled);
    LUA_METHOD(ts_creature, TSCreature, CanCompleteQuest);
    LUA_METHOD(ts_creature, TSCreature, IsTargetableForAttack);
    LUA_METHOD(ts_creature, TSCreature, CanAssistTo);
    LUA_METHOD(ts_creature, TSCreature, HasSearchedAssistance);
    LUA_METHOD(ts_creature, TSCreature, IsTappedBy);
    LUA_METHOD(ts_creature, TSCreature, HasLootRecipient);
    LUA_METHOD(ts_creature, TSCreature, CanAggro);
    LUA_METHOD(ts_creature, TSCreature, CanSwim);
    LUA_METHOD(ts_creature, TSCreature, CanWalk);
    LUA_METHOD(ts_creature, TSCreature, IsInEvadeMode);
    LUA_METHOD(ts_creature, TSCreature, IsElite);
    LUA_METHOD(ts_creature, TSCreature, IsGuard);
    LUA_METHOD(ts_creature, TSCreature, IsCivilian);
    LUA_METHOD(ts_creature, TSCreature, IsRacialLeader);
    LUA_METHOD(ts_creature, TSCreature, IsWorldBoss);
    LUA_METHOD(ts_creature, TSCreature, HasCategoryCooldown);
    LUA_METHOD(ts_creature, TSCreature, HasSpell);
    LUA_METHOD(ts_creature, TSCreature, HasQuest);
    LUA_METHOD(ts_creature, TSCreature, HasSpellCooldown);
    LUA_METHOD(ts_creature, TSCreature, CanFly);
    LUA_METHOD(ts_creature, TSCreature, IsTrigger);
    LUA_METHOD(ts_creature, TSCreature, IsDamageEnoughForLootingAndReward);
    LUA_METHOD(ts_creature, TSCreature, CanStartAttack);
    LUA_METHOD(ts_creature, TSCreature, HasLootMode);
    LUA_METHOD(ts_creature, TSCreature, GetAttackDistance);
    LUA_METHOD(ts_creature, TSCreature, GetRespawnDelay);
    LUA_METHOD(ts_creature, TSCreature, GetWanderRadius);
    LUA_METHOD(ts_creature, TSCreature, UpdateLevelDependantStats);
    LUA_METHOD(ts_creature, TSCreature, GetWaypointPath);
    LUA_METHOD(ts_creature, TSCreature, GetCurrentWaypointID);
    LUA_METHOD(ts_creature, TSCreature, GetDefaultMovementType);
    LUA_METHOD(ts_creature, TSCreature, GetAggroRange);
    LUA_METHOD(ts_creature, TSCreature, GetLootRecipientGroup);
    LUA_METHOD(ts_creature, TSCreature, GetLootRecipient);
    LUA_METHOD(ts_creature, TSCreature, GetScriptID);
    LUA_METHOD(ts_creature, TSCreature, GetCreatureSpellCooldownDelay);
    LUA_METHOD(ts_creature, TSCreature, GetCorpseDelay);
    LUA_METHOD(ts_creature, TSCreature, GetHomePosition);
    LUA_METHOD(ts_creature, TSCreature, SetHomePosition);
    LUA_METHOD(ts_creature, TSCreature, GetAITarget);
    LUA_METHOD(ts_creature, TSCreature, GetAITargetsCount);
    LUA_METHOD(ts_creature, TSCreature, GetNPCFlags);
    LUA_METHOD(ts_creature, TSCreature, GetShieldBlockValue);
    LUA_METHOD(ts_creature, TSCreature, GetLootMode);
    LUA_METHOD(ts_creature, TSCreature, GetDBTableGUIDLow);
    LUA_METHOD(ts_creature, TSCreature, SetNPCFlags);
    LUA_METHOD(ts_creature, TSCreature, SetDisableGravity);
    LUA_METHOD(ts_creature, TSCreature, SetLootMode);
    LUA_METHOD(ts_creature, TSCreature, SetDeathState);
    LUA_METHOD(ts_creature, TSCreature, SetWalk);
    LUA_METHOD(ts_creature, TSCreature, SetEquipmentSlots);
    LUA_METHOD(ts_creature, TSCreature, SetAggroEnabled);
    LUA_METHOD(ts_creature, TSCreature, SetDisableReputationGain);
    LUA_METHOD(ts_creature, TSCreature, SetInCombatWithZone);
    LUA_METHOD(ts_creature, TSCreature, SetWanderRadius);
    LUA_METHOD(ts_creature, TSCreature, SetRespawnDelay);
    LUA_METHOD(ts_creature, TSCreature, SetDefaultMovementType);
    LUA_METHOD(ts_creature, TSCreature, SetNoSearchAssistance);
    LUA_METHOD(ts_creature, TSCreature, SetNoCallAssistance);
    LUA_METHOD(ts_creature, TSCreature, SetHover);
    LUA_METHOD(ts_creature, TSCreature, DespawnOrUnsummon);
    LUA_METHOD(ts_creature, TSCreature, Respawn);
    LUA_METHOD(ts_creature, TSCreature, RemoveCorpse);
    LUA_METHOD(ts_creature, TSCreature, MoveWaypoint);
    LUA_METHOD(ts_creature, TSCreature, CallAssistance);
    LUA_METHOD(ts_creature, TSCreature, CallForHelp);
    LUA_METHOD(ts_creature, TSCreature, FleeToGetAssistance);
    LUA_METHOD(ts_creature, TSCreature, AttackStart);
    LUA_METHOD(ts_creature, TSCreature, SetReactState);
    LUA_METHOD(ts_creature, TSCreature, GetReactState);
    LUA_METHOD(ts_creature, TSCreature, SaveToDB);
    LUA_METHOD(ts_creature, TSCreature, SelectVictim);
    LUA_METHOD(ts_creature, TSCreature, UpdateEntry);
    LUA_METHOD(ts_creature, TSCreature, ResetLootMode);
    LUA_METHOD(ts_creature, TSCreature, RemoveLootMode);
    LUA_METHOD(ts_creature, TSCreature, AddLootMode);
    LUA_METHOD(ts_creature, TSCreature, GetCreatureFamily);
    LUA_METHOD(ts_creature, TSCreature, GetLoot);
    LUA_METHOD(ts_creature, TSCreature, GetTemplate);
    LUA_METHOD(ts_creature, TSCreature, SetOutfit);
    LUA_METHOD(ts_creature, TSCreature, GetOutfit);
    LUA_METHOD(ts_creature, TSCreature, FireSmartEvent);
    LUA_METHOD(ts_creature, TSCreature, IsAIEnabled);
    LUA_METHOD(ts_creature, TSCreature, SetLootRecipient);
    LUA_METHOD(ts_creature, TSCreature, GetMainhandEquip);
    LUA_METHOD(ts_creature, TSCreature, GetOffhandEquip);
    LUA_METHOD(ts_creature, TSCreature, GetRangedEquip);
    LUA_METHOD(ts_creature, TSCreature, EquipMainhand);
    LUA_METHOD(ts_creature, TSCreature, EquipOffhand);
    LUA_METHOD(ts_creature, TSCreature, EquipRanged);

    auto ts_gameobject = new_usertype<TSGameObject>("TSGameObject");
    LUA_METHOD(ts_gameobject, TSGameObject, HasQuest);
    LUA_METHOD(ts_gameobject, TSGameObject, IsSpawned);
    LUA_METHOD(ts_gameobject, TSGameObject, IsTransport);
    LUA_METHOD(ts_gameobject, TSGameObject, IsActive);
    LUA_METHOD(ts_gameobject, TSGameObject, GetDisplayID);
    LUA_METHOD(ts_gameobject, TSGameObject, GetGoState);
    LUA_METHOD(ts_gameobject, TSGameObject, GetLootState);
    LUA_METHOD(ts_gameobject, TSGameObject, GetLootRecipient);
    LUA_METHOD(ts_gameobject, TSGameObject, GetLootRecipientGroup);
    LUA_METHOD(ts_gameobject, TSGameObject, GetDBTableGUIDLow);
    LUA_METHOD(ts_gameobject, TSGameObject, SetGoState);
    LUA_METHOD(ts_gameobject, TSGameObject, SetLootState);
    LUA_METHOD(ts_gameobject, TSGameObject, SaveToDB);
    LUA_METHOD(ts_gameobject, TSGameObject, RemoveFromWorld);
    LUA_METHOD(ts_gameobject, TSGameObject, UseDoorOrButton);
    LUA_METHOD(ts_gameobject, TSGameObject, Despawn);
    LUA_METHOD(ts_gameobject, TSGameObject, Respawn);
    LUA_METHOD(ts_gameobject, TSGameObject, SetRespawnTime);
    LUA_METHOD(ts_gameobject, TSGameObject, GetLoot);
    LUA_METHOD(ts_gameobject, TSGameObject, FireSmartEvent);
    LUA_METHOD(ts_gameobject, TSGameObject, IsAIEnabled);

    auto ts_player = new_usertype <TSPlayer>("TSPlayer");
    LUA_METHOD(ts_player, TSPlayer, CanTitanGrip);
    LUA_METHOD(ts_player, TSPlayer, HasTalent);
    LUA_METHOD(ts_player, TSPlayer, HasAchieved);
    LUA_METHOD(ts_player, TSPlayer, HasQuest);
    LUA_METHOD(ts_player, TSPlayer, HasSkill);
    LUA_METHOD(ts_player, TSPlayer, HasSpell);
    LUA_METHOD(ts_player, TSPlayer, HasAtLoginFlag);
    LUA_METHOD(ts_player, TSPlayer, HasQuestForGO);
    LUA_METHOD(ts_player, TSPlayer, HasTitle);
    LUA_METHOD(ts_player, TSPlayer, HasItem);
    LUA_METHOD(ts_player, TSPlayer, HasQuestForItem);
    LUA_METHOD(ts_player, TSPlayer, CanUseItem);
    LUA_METHOD(ts_player, TSPlayer, HasSpellCooldown);
    LUA_METHOD(ts_player, TSPlayer, CanShareQuest);
    LUA_METHOD(ts_player, TSPlayer, CanSpeak);
    LUA_METHOD(ts_player, TSPlayer, CanUninviteFromGroup);
    LUA_METHOD(ts_player, TSPlayer, CanFly);
    LUA_METHOD(ts_player, TSPlayer, IsInWater);
    LUA_METHOD(ts_player, TSPlayer, IsMoving);
    LUA_METHOD(ts_player, TSPlayer, IsFlying);
    LUA_METHOD(ts_player, TSPlayer, IsInGroup);
    LUA_METHOD(ts_player, TSPlayer, IsInGuild);
    LUA_METHOD(ts_player, TSPlayer, IsGM);
    LUA_METHOD(ts_player, TSPlayer, IsInArenaTeam);
    LUA_METHOD(ts_player, TSPlayer, IsImmuneToDamage);
    LUA_METHOD(ts_player, TSPlayer, CanCompleteQuest);
    LUA_METHOD(ts_player, TSPlayer, IsHorde);
    LUA_METHOD(ts_player, TSPlayer, IsAlliance);
    LUA_METHOD(ts_player, TSPlayer, IsDND);
    LUA_METHOD(ts_player, TSPlayer, IsAFK);
    LUA_METHOD(ts_player, TSPlayer, IsFalling);
    LUA_METHOD(ts_player, TSPlayer, IsGroupVisibleFor);
    LUA_METHOD(ts_player, TSPlayer, IsInSameRaidWith);
    LUA_METHOD(ts_player, TSPlayer, IsInSameGroupWith);
    LUA_METHOD(ts_player, TSPlayer, IsHonorOrXPTarget);
    LUA_METHOD(ts_player, TSPlayer, IsVisibleForPlayer);
    LUA_METHOD(ts_player, TSPlayer, IsGMVisible);
    LUA_METHOD(ts_player, TSPlayer, IsTaxiCheater);
    LUA_METHOD(ts_player, TSPlayer, IsGMChat);
    LUA_METHOD(ts_player, TSPlayer, IsAcceptingWhispers);
    LUA_METHOD(ts_player, TSPlayer, IsRested);
    LUA_METHOD(ts_player, TSPlayer, InBGQueue);
    LUA_METHOD(ts_player, TSPlayer, InArena);
    LUA_METHOD(ts_player, TSPlayer, InBG);
    LUA_METHOD(ts_player, TSPlayer, CanBlock);
    LUA_METHOD(ts_player, TSPlayer, CanParry);
    LUA_METHOD(ts_player, TSPlayer, GetSpecsCount);
    LUA_METHOD(ts_player, TSPlayer, GetActiveSpec);
    LUA_METHOD(ts_player, TSPlayer, GetPhaseMaskForSpawn);
    LUA_METHOD(ts_player, TSPlayer, GetArenaPoints);
    LUA_METHOD(ts_player, TSPlayer, GetHonorPoints);
    LUA_METHOD(ts_player, TSPlayer, GetShieldBlockValue);
    LUA_METHOD(ts_player, TSPlayer, GetSpellCooldownDelay);
    LUA_METHOD(ts_player, TSPlayer, GetLatency);
    LUA_METHOD(ts_player, TSPlayer, GetChampioningFaction);
    LUA_METHOD(ts_player, TSPlayer, GetOriginalSubGroup);
    LUA_METHOD(ts_player, TSPlayer, GetOriginalGroup);
    LUA_METHOD(ts_player, TSPlayer, GetNextRandomRaidMember);
    LUA_METHOD(ts_player, TSPlayer, GetSubGroup);
    LUA_METHOD(ts_player, TSPlayer, GetGroupInvite);
    LUA_METHOD(ts_player, TSPlayer, GetXPRestBonus);
    LUA_METHOD(ts_player, TSPlayer, GetBGTypeID);
    LUA_METHOD(ts_player, TSPlayer, GetBattlegroundID);
    LUA_METHOD(ts_player, TSPlayer, GetReputationRank);
    LUA_METHOD(ts_player, TSPlayer, GetDrunkValue);
    LUA_METHOD(ts_player, TSPlayer, GetSkillTempBonusValue);
    LUA_METHOD(ts_player, TSPlayer, GetSkillPermBonusValue);
    LUA_METHOD(ts_player, TSPlayer, GetPureSkillValue);
    LUA_METHOD(ts_player, TSPlayer, GetBaseSkillValue);
    LUA_METHOD(ts_player, TSPlayer, GetSkillValue);
    LUA_METHOD(ts_player, TSPlayer, GetPureMaxSkillValue);
    LUA_METHOD(ts_player, TSPlayer, GetMaxSkillValue);
    LUA_METHOD(ts_player, TSPlayer, GetManaBonusFromIntellect);
    LUA_METHOD(ts_player, TSPlayer, GetHealthBonusFromStamina);
    LUA_METHOD(ts_player, TSPlayer, GetDifficulty);
    LUA_METHOD(ts_player, TSPlayer, GetGuildRank);
    LUA_METHOD(ts_player, TSPlayer, GetFreeTalentPoints);
    LUA_METHOD(ts_player, TSPlayer, GetReputation);
    LUA_METHOD(ts_player, TSPlayer, GetComboTarget);
    LUA_METHOD(ts_player, TSPlayer, GetComboPoints);
    LUA_METHOD(ts_player, TSPlayer, GetInGameTime);
    LUA_METHOD(ts_player, TSPlayer, GetQuestStatus);
    LUA_METHOD(ts_player, TSPlayer, GetQuestRewardStatus);
    LUA_METHOD(ts_player, TSPlayer, GetReqKillOrCastCurrentCount);
    LUA_METHOD(ts_player, TSPlayer, GetQuestLevel);
    LUA_METHOD(ts_player, TSPlayer, GetEquippedItemBySlot);
    LUA_METHOD(ts_player, TSPlayer, GetRestBonus);
    LUA_METHOD(ts_player, TSPlayer, GetChatTag);
    LUA_METHOD(ts_player, TSPlayer, SetBankBagSlotCount);
    LUA_METHOD(ts_player, TSPlayer, GetItemByPos);
    LUA_METHOD(ts_player, TSPlayer, GetItemByGUID);
    LUA_METHOD(ts_player, TSPlayer, GetGossipTextID);
    LUA_METHOD(ts_player, TSPlayer, GetSelection);
    LUA_METHOD(ts_player, TSPlayer, GetGMRank);
    LUA_METHOD(ts_player, TSPlayer, GetGuildID);
    LUA_METHOD(ts_player, TSPlayer, GetTeam);
    LUA_METHOD(ts_player, TSPlayer, GetItemCount);
    LUA_METHOD(ts_player, TSPlayer, GetLifetimeKills);
    LUA_METHOD(ts_player, TSPlayer, GetLevelPlayedTime);
    LUA_METHOD(ts_player, TSPlayer, GetTotalPlayedTime);
    LUA_METHOD(ts_player, TSPlayer, GetGuild);
    LUA_METHOD(ts_player, TSPlayer, GetGroup);
    LUA_METHOD(ts_player, TSPlayer, GetAccountID);
    LUA_METHOD(ts_player, TSPlayer, GetCorpse);
    LUA_METHOD(ts_player, TSPlayer, GetDbLocaleIndex);
    LUA_METHOD(ts_player, TSPlayer, GetDbcLocale);
    LUA_METHOD(ts_player, TSPlayer, SetPlayerLock);
    LUA_METHOD(ts_player, TSPlayer, SetAtLoginFlag);
    LUA_METHOD(ts_player, TSPlayer, SetSheath);
    LUA_METHOD(ts_player, TSPlayer, SetDrunkValue);
    LUA_METHOD(ts_player, TSPlayer, SetFactionForRace);
    LUA_METHOD(ts_player, TSPlayer, SetSkill);
    LUA_METHOD(ts_player, TSPlayer, SetGuildRank);
    LUA_METHOD(ts_player, TSPlayer, SetFreeTalentPoints);
    LUA_METHOD(ts_player, TSPlayer, SetReputation);
    LUA_METHOD(ts_player, TSPlayer, SetQuestStatus);
    LUA_METHOD(ts_player, TSPlayer, SetRestBonus);
    LUA_METHOD(ts_player, TSPlayer, SetAcceptWhispers);
    LUA_METHOD(ts_player, TSPlayer, SetPvPDeath);
    LUA_METHOD(ts_player, TSPlayer, SetGMVisible);
    LUA_METHOD(ts_player, TSPlayer, SetTaxiCheat);
    LUA_METHOD(ts_player, TSPlayer, SetGMChat);
    LUA_METHOD(ts_player, TSPlayer, SetGameMaster);
    LUA_METHOD(ts_player, TSPlayer, SetGender);
    LUA_METHOD(ts_player, TSPlayer, SetArenaPoints);
    LUA_METHOD(ts_player, TSPlayer, SetHonorPoints);
    LUA_METHOD(ts_player, TSPlayer, SetLifetimeKills);
    LUA_METHOD(ts_player, TSPlayer, SetMoney);
    LUA_METHOD(ts_player, TSPlayer, GetMoney);
    LUA_METHOD(ts_player, TSPlayer, TryAddMoney);
    LUA_METHOD(ts_player, TSPlayer, TryReduceMoney);
    LUA_METHOD(ts_player, TSPlayer, SetBindPoint);
    LUA_METHOD(ts_player, TSPlayer, SetKnownTitle);
    LUA_METHOD(ts_player, TSPlayer, ResetPetTalents);
    LUA_METHOD(ts_player, TSPlayer, ResetAchievements);
    LUA_METHOD(ts_player, TSPlayer, SendShowMailBox);
    LUA_METHOD(ts_player, TSPlayer, ModifyArenaPoints);
    LUA_METHOD(ts_player, TSPlayer, ModifyHonorPoints);
    LUA_METHOD(ts_player, TSPlayer, SaveToDB);
    LUA_METHOD(ts_player, TSPlayer, SummonPlayer);
    LUA_METHOD(ts_player, TSPlayer, Mute);
    LUA_METHOD(ts_player, TSPlayer, RewardQuest);
    LUA_METHOD(ts_player, TSPlayer, SendAuctionMenu);
    LUA_METHOD(ts_player, TSPlayer, SendTaxiMenu);
    LUA_METHOD(ts_player, TSPlayer, SendCreatureQueryPacket);
    LUA_METHOD(ts_player, TSPlayer, SendGameObjectQueryPacket);
    LUA_METHOD(ts_player, TSPlayer, SendItemQueryPacket);
    LUA_METHOD(ts_player, TSPlayer, SendSpiritResurrect);
    LUA_METHOD(ts_player, TSPlayer, SendTabardVendorActivate);
    LUA_METHOD(ts_player, TSPlayer, SendShowBank);
    LUA_METHOD(ts_player, TSPlayer, SendListInventory);
    LUA_METHOD(ts_player, TSPlayer, SendTrainerList);
    LUA_METHOD(ts_player, TSPlayer, SendGuildInvite);
    LUA_METHOD(ts_player, TSPlayer, LogoutPlayer);
    LUA_METHOD(ts_player, TSPlayer, RemoveFromBGRaid);
    LUA_METHOD(ts_player, TSPlayer, UnbindInstance);
    LUA_METHOD(ts_player, TSPlayer, UnbindAllInstances);
    LUA_METHOD(ts_player, TSPlayer, LeaveBG);
    LUA_METHOD(ts_player, TSPlayer, DurabilityRepair);
    LUA_METHOD(ts_player, TSPlayer, DurabilityRepairAll);
    LUA_METHOD(ts_player, TSPlayer, DurabilityPointLossForEquipSlot);
    LUA_METHOD(ts_player, TSPlayer, DurabilityPointsLossAll);
    LUA_METHOD(ts_player, TSPlayer, DurabilityPointsLoss);
    LUA_METHOD(ts_player, TSPlayer, DurabilityLoss);
    LUA_METHOD(ts_player, TSPlayer, DurabilityLossAll);
    LUA_METHOD(ts_player, TSPlayer, RemoveFromGroup);
    LUA_METHOD(ts_player, TSPlayer, ResetTalentsCost);
    LUA_METHOD(ts_player, TSPlayer, ResetTalents);
    LUA_METHOD(ts_player, TSPlayer, RemoveSpell);
    LUA_METHOD(ts_player, TSPlayer, ClearComboPoints);
    LUA_METHOD(ts_player, TSPlayer, AddComboPoints);
    LUA_METHOD(ts_player, TSPlayer, TalkedToCreature);
    LUA_METHOD(ts_player, TSPlayer, KilledMonsterCredit);
    LUA_METHOD(ts_player, TSPlayer, GroupEventHappens);
    LUA_METHOD(ts_player, TSPlayer, AreaExploredOrEventHappens);
    LUA_METHOD(ts_player, TSPlayer, FailQuest);
    LUA_METHOD(ts_player, TSPlayer, IncompleteQuest);
    LUA_METHOD(ts_player, TSPlayer, CompleteQuest);
    LUA_METHOD(ts_player, TSPlayer, AddQuest);
    LUA_METHOD(ts_player, TSPlayer, RemoveQuest);
    LUA_METHOD(ts_player, TSPlayer, GiveXP);
    LUA_METHOD(ts_player, TSPlayer, SetXP);
    LUA_METHOD(ts_player, TSPlayer, GetXP);
    LUA_METHOD(ts_player, TSPlayer, AddXP);
    LUA_METHOD(ts_player, TSPlayer, ToggleDND);
    LUA_METHOD(ts_player, TSPlayer, ToggleAFK);
    LUA_METHOD(ts_player, TSPlayer, CanEquipItem);
    LUA_METHOD(ts_player, TSPlayer, GetAverageItemLevel);
    LUA_METHOD(ts_player, TSPlayer, UnsetKnownTitle);
    LUA_METHOD(ts_player, TSPlayer, AdvanceSkillsToMax);
    LUA_METHOD(ts_player, TSPlayer, AdvanceAllSkills);
    LUA_METHOD(ts_player, TSPlayer, AdvanceSkill);
    LUA_METHOD(ts_player, TSPlayer, Teleport);
    LUA_METHOD(ts_player, TSPlayer, AddLifetimeKills);
    LUA_METHOD(ts_player, TSPlayer, RemoveLifetimeKills);
    LUA_METHOD(ts_player, TSPlayer, ResetSpellCooldown);
    LUA_METHOD(ts_player, TSPlayer, ResetTypeCooldowns);
    LUA_METHOD(ts_player, TSPlayer, ResetAllCooldowns);
    LUA_METHOD(ts_player, TSPlayer, KickPlayer);
    LUA_METHOD(ts_player, TSPlayer, ModifyMoney);
    LUA_METHOD(ts_player, TSPlayer, LearnSpell);
    LUA_METHOD(ts_player, TSPlayer, LearnTalent);
    LUA_METHOD(ts_player, TSPlayer, ResurrectPlayer);
    LUA_METHOD(ts_player, TSPlayer, GossipComplete);
    LUA_METHOD(ts_player, TSPlayer, GossipClearMenu);
    LUA_METHOD(ts_player, TSPlayer, StartTaxi);
    LUA_METHOD(ts_player, TSPlayer, GossipAddQuests);
    LUA_METHOD(ts_player, TSPlayer, SendQuestTemplate);
    LUA_METHOD(ts_player, TSPlayer, SpawnBones);
    LUA_METHOD(ts_player, TSPlayer, RemovedInsignia);
    LUA_METHOD(ts_player, TSPlayer, GetBGPlayer);
    LUA_METHOD(ts_player, TSPlayer, GetBG);
    LUA_METHOD(ts_player, TSPlayer, GetInstance);
    LUA_METHOD(ts_player, TSPlayer, GroupInvite);
    LUA_METHOD(ts_player, TSPlayer, GroupCreate);
    LUA_METHOD(ts_player, TSPlayer, SendCinematicStart);
    LUA_METHOD(ts_player, TSPlayer, SendMovieStart);
    LUA_METHOD(ts_player, TSPlayer, CanBeTank);
    LUA_METHOD(ts_player, TSPlayer, CanBeHealer);
    LUA_METHOD(ts_player, TSPlayer, CanBeDPS);
    LUA_METHOD(ts_player, TSPlayer, CanBeLeader);
    LUA_METHOD(ts_player, TSPlayer, GetHairStyle);
    LUA_METHOD(ts_player, TSPlayer, SetHairStyle);
    LUA_METHOD(ts_player, TSPlayer, GetHairColor);
    LUA_METHOD(ts_player, TSPlayer, SetHairColor);
    LUA_METHOD(ts_player, TSPlayer, GetFacialStyle);
    LUA_METHOD(ts_player, TSPlayer, SetFacialStyle);
    LUA_METHOD(ts_player, TSPlayer, GetSkinColor);
    LUA_METHOD(ts_player, TSPlayer, SetSkinColor);
    LUA_METHOD(ts_player, TSPlayer, GetFace);
    LUA_METHOD(ts_player, TSPlayer, SetFace);
    LUA_METHOD(ts_player, TSPlayer, SendUpdateWorldState);
    LUA_METHOD(ts_player, TSPlayer, SendUpdateEventStates);
    LUA_METHOD(ts_player, TSPlayer, GetMails);
    LUA_METHOD(ts_player, TSPlayer, RemoveMail);
    ts_player.set_function("GetPlayerIP", &TSPlayer::LGetPlayerIP);
    ts_player.set_function("GetGuildName", &TSPlayer::LGetGuildName);
    ts_player.set_function("GetAccountName", &TSPlayer::LGetAccountName);
    ts_player.set_function("KillPlayer", sol::overload(
        &TSPlayer::LKillPlayer0
        , &TSPlayer::LKillPlayer1
    ));
    ts_player.set_function("Whisper", &TSPlayer::LWhisper);
    ts_player.set_function("TextEmote", &TSPlayer::LTextEmote);
    ts_player.set_function("Yell", &TSPlayer::LYell);
    ts_player.set_function("Say", &TSPlayer::LSay);
    ts_player.set_function("AddItem", sol::overload(
        &TSPlayer::LAddItem0
        , &TSPlayer::LAddItem1
    ));
    ts_player.set_function("AddItemToSlotRaw", sol::overload(
        &TSPlayer::LAddItemToSlotRaw0
        , &TSPlayer::LAddItemToSlotRaw1
    ));
    ts_player.set_function("RemoveItem", sol::overload(
        &TSPlayer::LRemoveItem0
        , &TSPlayer::LRemoveItem1
    ));
    ts_player.set_function("RemoveItemByEntry", sol::overload(
        &TSPlayer::LRemoveItemByEntry0
        , &TSPlayer::LRemoveItemByEntry1
    ));
    ts_player.set_function("SendBroadcastMessage", &TSPlayer::LSendBroadcastMessage);
    ts_player.set_function("SendAreaTriggerMessage", &TSPlayer::LSendAreaTriggerMessage);
    ts_player.set_function("SendNotification", &TSPlayer::LSendNotification);
    ts_player.set_function("SendAddonMessage", &TSPlayer::LSendAddonMessage);
    ts_player.set_function("LearnClassSpells", sol::overload(
          &TSPlayer::LLearnClassSpells0
        , &TSPlayer::LLearnClassSpells1
    ));
    ts_player.set_function("GossipMenuAddItem", sol::overload(
        &TSPlayer::LGossipMenuAddItem0
        , &TSPlayer::LGossipMenuAddItem1
        , &TSPlayer::LGossipMenuAddItem2
        , &TSPlayer::LGossipMenuAddItem3
        , &TSPlayer::LGossipMenuAddItem4
        , &TSPlayer::LGossipMenuAddItem5
    ));
    ts_player.set_function("GossipSendMenu", sol::overload(
        &TSPlayer::LGossipSendMenu0
        , &TSPlayer::LGossipSendMenu1
    ));
    ts_player.set_function("GossipSendTextMenu", sol::overload(
        &TSPlayer::LGossipSendTextMenu0
        , &TSPlayer::LGossipSendTextMenu1
        , &TSPlayer::LGossipSendTextMenu2
        , &TSPlayer::LGossipSendTextMenu3
        , &TSPlayer::LGossipSendTextMenu4
        , &TSPlayer::LGossipSendTextMenu5
        , &TSPlayer::LGossipSendTextMenu6
        , &TSPlayer::LGossipSendTextMenu7
        , &TSPlayer::LGossipSendTextMenu8
    ));
    ts_player.set_function("GossipSendTextMenuGendered", sol::overload(
        &TSPlayer::LGossipSendTextMenuGendered0
        , &TSPlayer::LGossipSendTextMenuGendered1
        , &TSPlayer::LGossipSendTextMenuGendered2
        , &TSPlayer::LGossipSendTextMenuGendered3
        , &TSPlayer::LGossipSendTextMenuGendered4
        , &TSPlayer::LGossipSendTextMenuGendered5
        , &TSPlayer::LGossipSendTextMenuGendered6
        , &TSPlayer::LGossipSendTextMenuGendered7
        , &TSPlayer::LGossipSendTextMenuGendered8
    ));
    ts_player.set_function("GossipSendPOI", &TSPlayer::LGossipSendPOI);
    ts_player.set_function("SendMail", sol::overload(
        &TSPlayer::LSendMail0
        , &TSPlayer::LSendMail1
        , &TSPlayer::LSendMail2
        , &TSPlayer::LSendMail3
        , &TSPlayer::LSendMail4
    ));
    ts_player.set_function("GetOutfitCopy", sol::overload(
        &TSPlayer::LGetOutfitCopy0
        , &TSPlayer::LGetOutfitCopy1
        , &TSPlayer::LGetOutfitCopy2
        , &TSPlayer::LGetOutfitCopy3
    ));


    auto ts_item = new_usertype < TSItem>("TSItem");
    ts_item.set_function("GetItemLink", &TSItem::LGetItemLink);
    ts_item.set_function("GetName", &TSItem::LGetName);
    LUA_METHOD(ts_item, TSItem, IsSoulBound);
    LUA_METHOD(ts_item, TSItem, IsBoundAccountWide);
    LUA_METHOD(ts_item, TSItem, IsBoundByEnchant);
    LUA_METHOD(ts_item, TSItem, IsNotBoundToPlayer);
    LUA_METHOD(ts_item, TSItem, IsLocked);
    LUA_METHOD(ts_item, TSItem, IsBag);
    LUA_METHOD(ts_item, TSItem, IsCurrencyToken);
    LUA_METHOD(ts_item, TSItem, IsNotEmptyBag);
    LUA_METHOD(ts_item, TSItem, IsBroken);
    LUA_METHOD(ts_item, TSItem, CanBeTraded);
    LUA_METHOD(ts_item, TSItem, IsInTrade);
    LUA_METHOD(ts_item, TSItem, IsInBag);
    LUA_METHOD(ts_item, TSItem, IsEquipped);
    LUA_METHOD(ts_item, TSItem, HasQuest);
    LUA_METHOD(ts_item, TSItem, IsPotion);
    LUA_METHOD(ts_item, TSItem, IsWeaponVellum);
    LUA_METHOD(ts_item, TSItem, IsArmorVellum);
    LUA_METHOD(ts_item, TSItem, IsConjuredConsumable);
    LUA_METHOD(ts_item, TSItem, GetTemplate);
    LUA_METHOD(ts_item, TSItem, GetOwnerGUID);
    LUA_METHOD(ts_item, TSItem, GetCount);
    LUA_METHOD(ts_item, TSItem, GetMaxStackCount);
    LUA_METHOD(ts_item, TSItem, GetSlot);
    LUA_METHOD(ts_item, TSItem, GetBagSlot);
    LUA_METHOD(ts_item, TSItem, GetEnchantmentID);
    LUA_METHOD(ts_item, TSItem, GetSpellID);
    LUA_METHOD(ts_item, TSItem, GetSpellTrigger);
    LUA_METHOD(ts_item, TSItem, GetClass);
    LUA_METHOD(ts_item, TSItem, GetSubClass);
    LUA_METHOD(ts_item, TSItem, GetDisplayID);
    LUA_METHOD(ts_item, TSItem, GetQuality);
    LUA_METHOD(ts_item, TSItem, GetBuyCount);
    LUA_METHOD(ts_item, TSItem, GetBuyPrice);
    LUA_METHOD(ts_item, TSItem, GetSellPrice);
    LUA_METHOD(ts_item, TSItem, GetInventoryType);
    LUA_METHOD(ts_item, TSItem, GetAllowableClass);
    LUA_METHOD(ts_item, TSItem, GetAllowableRace);
    LUA_METHOD(ts_item, TSItem, GetItemLevel);
    LUA_METHOD(ts_item, TSItem, GetRequiredLevel);
    LUA_METHOD(ts_item, TSItem, GetStatsCount);
    LUA_METHOD(ts_item, TSItem, GetRandomProperty);
    LUA_METHOD(ts_item, TSItem, GetRandomSuffix);
    LUA_METHOD(ts_item, TSItem, GetItemSet);
    LUA_METHOD(ts_item, TSItem, GetBagSize);
    LUA_METHOD(ts_item, TSItem, SetOwner);
    LUA_METHOD(ts_item, TSItem, SetBinding);
    LUA_METHOD(ts_item, TSItem, SetCount);
    LUA_METHOD(ts_item, TSItem, SetEnchantment);
    LUA_METHOD(ts_item, TSItem, ClearEnchantment);
    LUA_METHOD(ts_item, TSItem, SaveToDB);
    set_function("CreateItem", sol::overload(
          &LCreateItem0
        , &LCreateItem1
        , &LCreateItem2
    ));

    auto ts_guidset = new_usertype<TSGuidSet>("TSGuidSet");
    LUA_METHOD(ts_guidset, TSGuidSet, Contains);
    LUA_METHOD(ts_guidset, TSGuidSet, Add);
    LUA_METHOD(ts_guidset, TSGuidSet, Remove);

    auto ts_bossinfo = new_usertype<TSBossInfo>("TSBossInfo");
    LUA_METHOD(ts_bossinfo, TSBossInfo, GetBossState);
    LUA_METHOD(ts_bossinfo, TSBossInfo, GetMinionGUIDs);
    LUA_METHOD(ts_bossinfo, TSBossInfo, GetDoorsOpenDuringEncounter);
    LUA_METHOD(ts_bossinfo, TSBossInfo, GetDoorsClosedDuringEncounter);
    LUA_METHOD(ts_bossinfo, TSBossInfo, GetDoorsOpenAfterEncounter);

    auto ts_instance = new_usertype<TSInstance>("TSInstance");
    LUA_METHOD(ts_instance, TSInstance, SaveInstanceToDB);
    LUA_METHOD(ts_instance, TSInstance, IsEncounterInProgress);
    LUA_METHOD(ts_instance, TSInstance, GetObjectGUID);
    LUA_METHOD(ts_instance, TSInstance, DoCloseDoorOrButton);
    LUA_METHOD(ts_instance, TSInstance, DoRespawnGameObject);
    LUA_METHOD(ts_instance, TSInstance, DoUpdateWorldState);
    LUA_METHOD(ts_instance, TSInstance, DoUpdateAchievementCriteria);
    LUA_METHOD(ts_instance, TSInstance, DoStartTimedAchievement);
    LUA_METHOD(ts_instance, TSInstance, DoStopTimedAchievement);
    LUA_METHOD(ts_instance, TSInstance, DoRemoveAurasDueToSpellOnPlayers);
    LUA_METHOD(ts_instance, TSInstance, DoStartTimedAchievement);
    LUA_METHOD(ts_instance, TSInstance, DoStopTimedAchievement);
    LUA_METHOD(ts_instance, TSInstance, DoRemoveAurasDueToSpellOnPlayers);
    LUA_METHOD(ts_instance, TSInstance, SetBossState);
    LUA_METHOD(ts_instance, TSInstance, GetBossState);
    LUA_METHOD(ts_instance, TSInstance, MarkAreaTriggerDone);
    LUA_METHOD(ts_instance, TSInstance, ResetAreaTriggerDone);
    LUA_METHOD(ts_instance, TSInstance, GetEncounterCount);
    LUA_METHOD(ts_instance, TSInstance, BindAllPlayers);
    LUA_METHOD(ts_instance, TSInstance, HasPermBoundPlayers);
    LUA_METHOD(ts_instance, TSInstance, GetMaxPlayers);
    LUA_METHOD(ts_instance, TSInstance, GetMaxResetDelay);
    LUA_METHOD(ts_instance, TSInstance, GetTeamIDInInstance);
    LUA_METHOD(ts_instance, TSInstance, GetFactionInInstance);
    LUA_METHOD(ts_instance, TSInstance, GetBossInfo);
    ts_instance.set_function("DoCastSpellOnPlayers", sol::overload(
          &TSInstance::LDoCastSpellOnPlayers0
        , &TSInstance::LDoCastSpellOnPlayers1
        , &TSInstance::LDoCastSpellOnPlayers2
    ));
    ts_instance.set_function("DoUseDoorOrButton", sol::overload(
          &TSInstance::LDoUseDoorOrButton0
        , &TSInstance::LDoUseDoorOrButton1
        , &TSInstance::LDoUseDoorOrButton2
    ));
    ts_instance.set_function("DoSendNotify", &TSInstance::LDoSendNotify);
    ts_instance.set_function("DoRemoveAurasDueToSpellOnPlayers", sol::overload(
          &TSInstance::LDoRemoveAurasDueToSpellOnPlayers0
        , &TSInstance::LDoRemoveAurasDueToSpellOnPlayers1
        , &TSInstance::LDoRemoveAurasDueToSpellOnPlayers2
    ));

    auto ts_battlegroundplayer = new_usertype<TSBattlegroundPlayer>("TSBattlegroundPlayer");
    LUA_METHOD(ts_battlegroundplayer, TSBattlegroundPlayer, GetGUID);
    LUA_METHOD(ts_battlegroundplayer, TSBattlegroundPlayer, GetTeam);
    LUA_METHOD(ts_battlegroundplayer, TSBattlegroundPlayer, GetOfflineRemoveTime);

    auto ts_battleground = new_usertype<TSBattleground>("TSBattleground");
    LUA_METHOD(ts_battleground, TSBattleground, GetBracketID);
    LUA_METHOD(ts_battleground, TSBattleground, GetAlivePlayersCountByTeam);
    LUA_METHOD(ts_battleground, TSBattleground, GetBonusHonorFromKillCount);
    LUA_METHOD(ts_battleground, TSBattleground, GetEndTime);
    LUA_METHOD(ts_battleground, TSBattleground, GetFreeSlotsForTeam);
    LUA_METHOD(ts_battleground, TSBattleground, GetInstanceID);
    LUA_METHOD(ts_battleground, TSBattleground, GetTypeID);
    LUA_METHOD(ts_battleground, TSBattleground, GetMaxLevel);
    LUA_METHOD(ts_battleground, TSBattleground, GetMinLevel);
    LUA_METHOD(ts_battleground, TSBattleground, GetMaxPlayers);
    LUA_METHOD(ts_battleground, TSBattleground, GetMinPlayers);
    LUA_METHOD(ts_battleground, TSBattleground, GetMaxPlayersPerTeam);
    LUA_METHOD(ts_battleground, TSBattleground, GetMinPlayersPerTeam);
    LUA_METHOD(ts_battleground, TSBattleground, GetWinner);
    LUA_METHOD(ts_battleground, TSBattleground, GetStatus);
    LUA_METHOD(ts_battleground, TSBattleground, IsRandom);
    LUA_METHOD(ts_battleground, TSBattleground, GetBGPlayer);
    LUA_METHOD(ts_battleground, TSBattleground, GetBGPlayers);
    LUA_METHOD(ts_battleground, TSBattleground, SetStartPosition);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartX);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartY);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartZ);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartO);
    LUA_METHOD(ts_battleground, TSBattleground, SetStartMaxDist);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartMaxDist);
    LUA_METHOD(ts_battleground, TSBattleground, SendPacket);
    LUA_METHOD(ts_battleground, TSBattleground, UpdateWorldState);
    LUA_METHOD(ts_battleground, TSBattleground, GetBGRaid);
    LUA_METHOD(ts_battleground, TSBattleground, GetBGPlayerCount);
    LUA_METHOD(ts_battleground, TSBattleground, OpenDoor);
    LUA_METHOD(ts_battleground, TSBattleground, CloseDoor);
    LUA_METHOD(ts_battleground, TSBattleground, IsPlayerInBG);
    LUA_METHOD(ts_battleground, TSBattleground, GetTeamScore);
    LUA_METHOD(ts_battleground, TSBattleground, SendMessage);
    LUA_METHOD(ts_battleground, TSBattleground, GetUniqueBracketID);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartDelayTime);
    LUA_METHOD(ts_battleground, TSBattleground, SetStartDelayTime);
    LUA_METHOD(ts_battleground, TSBattleground, SetStartTime);
    LUA_METHOD(ts_battleground, TSBattleground, GetStartTime);
    LUA_METHOD(ts_battleground, TSBattleground, RemoveCreature);
    LUA_METHOD(ts_battleground, TSBattleground, RemoveObject);
    LUA_METHOD(ts_battleground, TSBattleground, RemoveObjectFromWorld);
    LUA_METHOD(ts_battleground, TSBattleground, GetObjectType);
    LUA_METHOD(ts_battleground, TSBattleground, SetHoliday);
    LUA_METHOD(ts_battleground, TSBattleground, IsHoliday);
    LUA_METHOD(ts_battleground, TSBattleground, GetBGGameObject);
    LUA_METHOD(ts_battleground, TSBattleground, GetBGCreature);
    ts_battleground.set_function("GetBGName", &TSBattleground::LGetBGName);
    ts_battleground.set_function("PlaySound", sol::overload(
          &TSBattleground::LPlaySound0
        , &TSBattleground::LPlaySound1
    ));
    ts_battleground.set_function("CastSpell", sol::overload(
          &TSBattleground::LCastSpell0
        , &TSBattleground::LCastSpell1
    ));
    ts_battleground.set_function("RemoveAura", sol::overload(
          &TSBattleground::LRemoveAura0
        , &TSBattleground::LRemoveAura1
    ));
    ts_battleground.set_function("RewardHonor", sol::overload(
          &TSBattleground::LRewardHonor0
        , &TSBattleground::LRewardHonor1
    ));

    ts_battleground.set_function("RewardReputation", sol::overload(
          &TSBattleground::LRewardReputation0
        , &TSBattleground::LRewardReputation1
    ));

    ts_battleground.set_function("EndBG", sol::overload(
          &TSBattleground::LEndBG0
        , &TSBattleground::LEndBG1
    ));

    ts_battleground.set_function("GetBGPlayerCount", sol::overload(
          &TSBattleground::LGetBGPlayerCount0
        , &TSBattleground::LGetBGPlayerCount1
    ));
    ts_battleground.set_function("GetBGAlivePlayerCount", sol::overload(
          &TSBattleground::LGetBGAlivePlayerCount0
        , &TSBattleground::LGetBGAlivePlayerCount1
    ));
    ts_battleground.set_function("AddCreature", sol::overload(
          &TSBattleground::LAddCreature0
        , &TSBattleground::LAddCreature1
        , &TSBattleground::LAddCreature2
    ));
    ts_battleground.set_function("AddObject", sol::overload(
          &TSBattleground::LAddObject0
        , &TSBattleground::LAddObject1
        , &TSBattleground::LAddObject2
    ));
    ts_battleground.set_function("AddSpiritGuide", sol::overload(
          &TSBattleground::LAddSpiritGuide0
        , &TSBattleground::LAddSpiritGuide1
    ));
    ts_battleground.set_function("GetBGGameObject", sol::overload(
          &TSBattleground::LGetBGGameObject0
        , &TSBattleground::LGetBGGameObject1
    ));
    ts_battleground.set_function("GetBGCreature", sol::overload(
          &TSBattleground::LGetBGCreature0
        , &TSBattleground::LGetBGCreature1
    ));

    auto ts_achievemententry = new_usertype<TSAchievementEntry>("TSAchievementEntry");
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetEntry);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetFaction);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetInstanceID);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetCategory);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetPoints);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetFlags);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetMinimumCriteria);
    LUA_METHOD(ts_achievemententry, TSAchievementEntry, GetSharesCriteria);
    ts_achievemententry.set_function("GetTitles", &TSAchievementEntry::LGetTitles);

    auto ts_achievementcriteriaentry = new_usertype<TSAchievementCriteriaEntry>("TSAchievementCriteriaEntry");
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetEntry);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAchievementEntry);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetType);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAssetID);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetQuantity);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalType1);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalAsset1);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalType2);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetAdditionalAsset2);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetFlags);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetStartEvent);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetStartAsset);
    LUA_METHOD(ts_achievementcriteriaentry, TSAchievementCriteriaEntry, GetStartTimer);
    set_function("GetAchievementTemplate", &GetAchievementTemplate);
    set_function("GetAchievementCriteria", &GetAchievementCriteria);

    auto ts_creaturetemplate = new_usertype < TSCreatureTemplate>("TSCreatureTemplate");
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetEntry);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetDifficultyEntryA);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetDifficultyEntryB);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetDifficultyEntryC);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetKillCreditA);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetKillCreditB);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModelID1);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModelID2);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModelID3);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModelID4);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetGossipMenuID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMinLevel);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMaxLevel);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetExpansion);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFaction);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetNPCFlag);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpeedWalk);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpeedRun);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetScale);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRank);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetDamageSchool);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetBaseAttackTime);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRangeAttackTime);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetBaseVariance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRangeVariance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetUnitClass);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetUnitFlags);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetUnitFlags2);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetDynamicFlags);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFamily);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetType);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetTypeFlags);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetLootID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetPickpocketLootID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSkinLootID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetNormalResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetHolyResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFireResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetNatureResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFrostResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetShadowResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetArcaneResistance);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellA);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellB);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellC);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellE);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellF);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellG);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellH);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetPetSpellDataID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetVehicleID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMinGold);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMaxGold);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMovementType);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetHoverHeight);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModHealth);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModMana);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModArmor);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModDamage);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetModExperience);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRacialLeader);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMovementID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRegenHealth);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetMechanicImmuneMask);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSpellSchoolImmuneMask);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFlagsExtra);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetScriptID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRandomValidModelID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFirstValidModelID);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFirstInvisibleModel);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFirstVisibleModel);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRequiredLootSkill);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetIsExotic);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetIsTameable);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetGroundMovement);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetFlightMovement);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetSwims);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRooted);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetChaseMovement);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetRandomMovement);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetInteractionPauseTimer);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetIsGroundAllowed);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetIsSwimAllowed);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetIsFlightAllowed);
    LUA_METHOD(ts_creaturetemplate, TSCreatureTemplate, GetIsRooted);
    ts_creaturetemplate.set_function("GetName", &TSCreatureTemplate::LGetName);
    ts_creaturetemplate.set_function("GetTitle", &TSCreatureTemplate::LGetTitle);
    ts_creaturetemplate.set_function("GetIconName", &TSCreatureTemplate::LGetIconName);
    ts_creaturetemplate.set_function("GetAIName", &TSCreatureTemplate::GetAIName);
    set_function("GetCreatureTemplate", &GetCreatureTemplate);

    auto ts_gameobjecttemplate = new_usertype<TSGameObjectTemplate>("TSGameObjectTemplate");
    LUA_METHOD(ts_gameobjecttemplate, TSGameObjectTemplate, GetEntry);
    LUA_METHOD(ts_gameobjecttemplate, TSGameObjectTemplate, GetType);
    LUA_METHOD(ts_gameobjecttemplate, TSGameObjectTemplate, GetDisplayID);
    ts_gameobjecttemplate.set_function("GetName", &TSGameObjectTemplate::LGetName);
    ts_gameobjecttemplate.set_function("GetIconName", &TSGameObjectTemplate::LGetIconName);
    ts_gameobjecttemplate.set_function("GetCastBarCaption", & TSGameObjectTemplate::LGetCastBarCaption);

    auto ts_spelleffectinfo = new_usertype<TSSpellEffectInfo>("TSSpellEffectInfo");
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetEffectIndex);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetType);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetAura);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetAmplitude);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetDieSides);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetRealPointsPerLevel);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetBasePoints);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetPointsPerComboPoint);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetValueMultiplier);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetDamageMultiplier);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetBonusMultiplier);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetMiscValue);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetMiscValueB);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetMechanic);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetChainTarget);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetItemType);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, GetTriggerSpell);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, IsEffect);
    LUA_METHOD(ts_spelleffectinfo, TSSpellEffectInfo, IsAura);

    auto ts_spellinfo = new_usertype<TSSpellInfo>("TSSpellInfo");
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetEntry);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSchool);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetBaseLevel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetDmgClass);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetActiveIconID);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAreaGroupID);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributes);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesCu);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx2);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx3);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx4);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx5);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx6);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAttributesEx7);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetAuraInterruptFlags);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetCasterAuraSpell);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetCasterAuraState);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetCasterAuraStateNot);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetCategoryRecoveryTime);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetChannelInterruptFlags);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetDispel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetEquippedItemClass);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetEquippedItemInventoryTypeMask);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetExcludeCasterAuraSpell);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetExcludeTargetAuraSpell);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetExplicitTargetMask);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetFacingCasterFlags);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetInterruptFlags);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetManaCost);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetManaCostPercentage);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetManaCostPerlevel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetManaPerSecond);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetManaPerSecondPerLevel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetMaxAffectedTargets);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetMaxLevel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetMaxTargetLevel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetMechanic);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetPowerType);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetPreventionType);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetPriority);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetProcChance);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetProcCharges);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetProcFlags);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetRecoveryTime);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetRequiresSpellFocus);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetRuneCostID);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSchoolMask);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSpeed);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSpellFamilyFlags);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSpellFamilyName);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSpellIconID);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetSpellLevel);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetStackAmount);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetStances);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetStancesNot);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetStartRecoveryCategory);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetTargetAuraSpell);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetTargetAuraState);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetTargetAuraStateNot);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetTargetCreatureType);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetTargets);
    LUA_METHOD(ts_spellinfo, TSSpellInfo, GetEffect);
    set_function("GetSpellInfo", &GetSpellInfo);

#if TRINITY
    auto ts_areatriggerentry = new_usertype<TSAreaTriggerEntry>("TSAreaTriggerEntry");
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetEntry);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetContinentID);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetX);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetY);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetZ);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetRadius);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetBoxLength);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetBoxWidth);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetBoxHeight);
    LUA_METHOD(ts_areatriggerentry, TSAreaTriggerEntry, GetBoxYaw);
#endif

    auto ts_auctionentry = new_usertype<TSAuctionEntry>("TSAuctionEntry");
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetID);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetHouseID);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetItemID);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetItemEntry);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetItemCount);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetOwnerID);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetStartBid);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetBid);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetBuyout);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetExpireTime);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetBidder);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetDeposit);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetETime);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, GetFlags);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetItemID);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetItemEntry);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetItemCount);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetOwnerID);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetStartBid);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetBid);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetBuyout);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetBidder);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetDeposit);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetETime);
    LUA_METHOD(ts_auctionentry, TSAuctionEntry, SetFlags);
    ts_auctionentry.set_function("GetBidders", &TSAuctionEntry::LGetBidders);

    auto ts_auctionhouseobject = new_usertype<TSAuctionHouseObject>("TSAuctionHouseObject");
    ts_auctionhouseobject.set_function("GetKeys", &TSAuctionHouseObject::LGetKeys);
    LUA_METHOD(ts_auctionhouseobject, TSAuctionHouseObject, GetEntry);
    LUA_METHOD(ts_auctionhouseobject, TSAuctionHouseObject, GetCount);
    LUA_METHOD(ts_auctionhouseobject, TSAuctionHouseObject, AddAuction);

    auto ts_auraeffect = new_usertype<TSAuraEffect>("TSAuraEffect");
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetCaster);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetCasterGUID);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetAura);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetSpellInfo);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetID);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetEffectIndex);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetAmplitude);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetMiscValueB);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetMiscValue);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetAuraType);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetAmount);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, SetAmount);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetPeriodicTimer);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, SetPeriodicTimer);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetTickNumber);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetRemainingTicks);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, GetTotalTicks);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, ResetPeriodic);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, ResetTicks);
    LUA_METHOD(ts_auraeffect, TSAuraEffect, IsPeriodic);

    auto ts_auraapplication = new_usertype<TSAuraApplication>("TSAuraApplication");
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetTarget);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetAura);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetSlot);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetFlags);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetEffectMask);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetAppliedEffects);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, GetRemoveMode);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, IsPositive);
    LUA_METHOD(ts_auraapplication, TSAuraApplication, IsSelfCast);

    auto ts_aura = new_usertype<TSAura>("TSAura");
    LUA_METHOD(ts_aura, TSAura, GetCaster);
    LUA_METHOD(ts_aura, TSAura, GetCasterGUID);
    LUA_METHOD(ts_aura, TSAura, GetCasterLevel);
    LUA_METHOD(ts_aura, TSAura, GetDuration);
    LUA_METHOD(ts_aura, TSAura, GetAuraID);
    LUA_METHOD(ts_aura, TSAura, GetMaxDuration);
    LUA_METHOD(ts_aura, TSAura, GetStackAmount);
    LUA_METHOD(ts_aura, TSAura, GetOwner);
    LUA_METHOD(ts_aura, TSAura, SetDuration);
    LUA_METHOD(ts_aura, TSAura, SetMaxDuration);
    LUA_METHOD(ts_aura, TSAura, SetStackAmount);
    LUA_METHOD(ts_aura, TSAura, Remove);
    ts_aura.set_function("GetApplications", &TSAura::LGetApplications);

    auto ts_spell = new_usertype<TSSpell>("TSSpell");
    LUA_METHOD(ts_spell, TSSpell, IsAutoRepeat);
    LUA_METHOD(ts_spell, TSSpell, GetCaster);
    LUA_METHOD(ts_spell, TSSpell, GetCastTime);
    LUA_METHOD(ts_spell, TSSpell, GetEntry);
    LUA_METHOD(ts_spell, TSSpell, GetPowerCost);
    LUA_METHOD(ts_spell, TSSpell, GetDuration);
    LUA_METHOD(ts_spell, TSSpell, GetTargetDest);
    LUA_METHOD(ts_spell, TSSpell, GetTarget);
    LUA_METHOD(ts_spell, TSSpell, GetSpellInfo);
    LUA_METHOD(ts_spell, TSSpell, SetAutoRepeat);
    LUA_METHOD(ts_spell, TSSpell, Cast);
    LUA_METHOD(ts_spell, TSSpell, Cancel);
    LUA_METHOD(ts_spell, TSSpell, Finish);

    auto ts_channel = new_usertype<TSChannel>("TSChannel");
    ts_channel.set_function("GetName", sol::overload(
          &TSChannel::LGetName0
        , &TSChannel::LGetName1
    ));
    LUA_METHOD(ts_channel, TSChannel, GetID);
    LUA_METHOD(ts_channel, TSChannel, IsConstant);
    LUA_METHOD(ts_channel, TSChannel, IsLFG);
    LUA_METHOD(ts_channel, TSChannel, IsAnnounce);
    LUA_METHOD(ts_channel, TSChannel, SetAnnounce);
    LUA_METHOD(ts_channel, TSChannel, SetDirty);
    LUA_METHOD(ts_channel, TSChannel, GetNumPlayers);
    LUA_METHOD(ts_channel, TSChannel, GetFlags);
    LUA_METHOD(ts_channel, TSChannel, HasFlag);
    LUA_METHOD(ts_channel, TSChannel, JoinChannel);
    LUA_METHOD(ts_channel, TSChannel, LeaveChannel);
    LUA_METHOD(ts_channel, TSChannel, SetInvisible);
    LUA_METHOD(ts_channel, TSChannel, SetOwner);
    ts_channel.set_function("Say", &TSChannel::LSay);
    ts_channel.set_function("SetPassword", &TSChannel::LSetPassword);
    ts_channel.set_function("CheckPassword", &TSChannel::LCheckPassword);
    ts_channel.set_function("JoinChannel", sol::overload(
          &TSChannel::LJoinChannel0
        , &TSChannel::LJoinChannel1
    ));

    auto ts_corpse = new_usertype<TSCorpse>("TSCorpse");
    LUA_METHOD(ts_corpse, TSCorpse, GetOwnerGUID);
    LUA_METHOD(ts_corpse, TSCorpse, GetGhostTime);
    LUA_METHOD(ts_corpse, TSCorpse, GetType);
    LUA_METHOD(ts_corpse, TSCorpse, GetLoot);
    LUA_METHOD(ts_corpse, TSCorpse, ResetGhostTime);
    LUA_METHOD(ts_corpse, TSCorpse, SaveToDB);

    auto ts_packetwrite = new_usertype<TSPacketWrite>("TSPacketWrite");
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteUInt8);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteInt8);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteUInt16);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteInt16);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteUInt32);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteInt32);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteUInt64);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteInt64);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteFloat);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, WriteDouble);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, Size);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, SendToPlayer);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, BroadcastMap);
    LUA_METHOD(ts_packetwrite, TSPacketWrite, BroadcastAround);
    ts_packetwrite.set_function("WriteString", &TSPacketWrite::WriteString);

    auto ts_packetread = new_usertype<TSPacketRead>("TSPacketRead");
    LUA_METHOD(ts_packetread, TSPacketRead, ReadUInt8);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadInt8);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadUInt16);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadInt16);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadUInt32);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadInt32);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadUInt64);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadInt64);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadFloat);
    LUA_METHOD(ts_packetread, TSPacketRead, ReadDouble);
    LUA_METHOD(ts_packetread, TSPacketRead, Size);
    ts_packetread.set_function("ReadString", &TSPacketRead::ReadString);

    auto ts_meleedamageinfo = new_usertype<TSMeleeDamageInfo>("TSDamageInfo");
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAttacker);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetTarget);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetSchool1);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetSchool2);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetDamage1);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetDamage2);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAbsorb1);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAbsorb2);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetResist1);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetResist2);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetBlocked);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetHitInfo);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetTargetState);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAttackType);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetProcAttacker);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetHitInfo);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetTargetState);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetAttackType);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetProcAttacker);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetProcVictim);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetCleanDamage);
    LUA_METHOD(ts_meleedamageinfo, TSMeleeDamageInfo, GetMeleeHitOutcome);

    auto ts_spelldamageinfo = new_usertype<TSSpellDamageInfo>("TSSpellDamageInfo");
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetAttacker);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetTarget);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetSpellID);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetDamage);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetOverkill);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetSchoolMask);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetAbsorb);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetResist);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetPeriodicLog);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetUnused);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetBlocked);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetHitInfo);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetCleanDamage);
    LUA_METHOD(ts_spelldamageinfo, TSSpellDamageInfo, GetFullBlock);

    auto ts_group = new_usertype<TSGroup>("TSGroup");
    LUA_METHOD(ts_group, TSGroup, IsLeader);
    LUA_METHOD(ts_group, TSGroup, IsFull);
    LUA_METHOD(ts_group, TSGroup, IsRaidGroup);
    LUA_METHOD(ts_group, TSGroup, IsBGGroup);
    LUA_METHOD(ts_group, TSGroup, IsMember);
    LUA_METHOD(ts_group, TSGroup, IsAssistant);
    LUA_METHOD(ts_group, TSGroup, SameSubGroup);
    LUA_METHOD(ts_group, TSGroup, HasFreeSlotSubGroup);
    LUA_METHOD(ts_group, TSGroup, AddMember);
    LUA_METHOD(ts_group, TSGroup, GetLeaderGUID);
    LUA_METHOD(ts_group, TSGroup, GetGUID);
    LUA_METHOD(ts_group, TSGroup, GetMemberGUID);
    LUA_METHOD(ts_group, TSGroup, GetMembersCount);
    LUA_METHOD(ts_group, TSGroup, GetMemberGroup);
    LUA_METHOD(ts_group, TSGroup, SetLeader);
    LUA_METHOD(ts_group, TSGroup, RemoveMember);
    LUA_METHOD(ts_group, TSGroup, Disband);
    LUA_METHOD(ts_group, TSGroup, ConvertToRaid);
    LUA_METHOD(ts_group, TSGroup, SetMembersGroup);
    LUA_METHOD(ts_group, TSGroup, SetTargetIcon);
    LUA_METHOD(ts_group, TSGroup, IsLFGGroup);
    LUA_METHOD(ts_group, TSGroup, IsBFGroup);
    ts_group.set_function("GetMembers", &TSGroup::LGetMembers);
    ts_group.set_function("SendPacket", &TSGroup::LSendPacket);

    auto ts_guild = new_usertype<TSGuild>("TSGuild");
    LUA_METHOD(ts_guild, TSGuild, GetMemberCount);
    LUA_METHOD(ts_guild, TSGuild, GetLeader);
    LUA_METHOD(ts_guild, TSGuild, GetLeaderGUID);
    LUA_METHOD(ts_guild, TSGuild, GetID);
    LUA_METHOD(ts_guild, TSGuild, SetLeader);
    LUA_METHOD(ts_guild, TSGuild, SetBankTabText);
    LUA_METHOD(ts_guild, TSGuild, Disband);
    LUA_METHOD(ts_guild, TSGuild, AddMember);
    LUA_METHOD(ts_guild, TSGuild, DeleteMember);
    LUA_METHOD(ts_guild, TSGuild, SetMemberRank);
    ts_guild.set_function("GetMembers", &TSGuild::LGetMembers);
    ts_guild.set_function("GetName", &TSGuild::LGetName);
    ts_guild.set_function("GetMOTD", &TSGuild::LGetMOTD);
    ts_guild.set_function("GetInfo", &TSGuild::LGetInfo);
    ts_guild.set_function("SendPacket", &TSGuild::LSendPacket);
    ts_guild.set_function("SendPacketToRanked", &TSGuild::LSendPacketToRanked);

    auto ts_jsonobject = new_usertype<TSJsonObject>("TSJsonObject");
    JsonMethods(ts_jsonobject, TSJsonObject);

    auto ts_jsonarray = new_usertype<TSJsonArray>("TSJsonArray");
    LUA_METHOD(ts_jsonarray, TSJsonArray, GetJsonArray);
    LUA_METHOD(ts_jsonarray, TSJsonArray, HasJsonArray);
    LUA_METHOD(ts_jsonarray, TSJsonArray, Remove);
    LUA_METHOD(ts_jsonarray, TSJsonArray, isValid);
    LUA_METHOD(ts_jsonarray, TSJsonArray, SetBool);
    LUA_METHOD(ts_jsonarray, TSJsonArray, HasBool);
    LUA_METHOD(ts_jsonarray, TSJsonArray, InsertBool);
    LUA_METHOD(ts_jsonarray, TSJsonArray, PushBool);
    LUA_METHOD(ts_jsonarray, TSJsonArray, SetNumber);
    LUA_METHOD(ts_jsonarray, TSJsonArray, HasNumber);
    LUA_METHOD(ts_jsonarray, TSJsonArray, InsertNumber);
    LUA_METHOD(ts_jsonarray, TSJsonArray, PushNumber);
    LUA_METHOD(ts_jsonarray, TSJsonArray, HasString);
    LUA_METHOD(ts_jsonarray, TSJsonArray, SetNull);
    LUA_METHOD(ts_jsonarray, TSJsonArray, HasNull);
    LUA_METHOD(ts_jsonarray, TSJsonArray, InsertNull);
    LUA_METHOD(ts_jsonarray, TSJsonArray, PushNull);
    LUA_METHOD(ts_jsonarray, TSJsonArray, HasJsonObject);
    LUA_METHOD(ts_jsonarray, TSJsonArray, SetJsonObject);


    ts_jsonarray.set_function("GetBool", sol::overload(
          &TSJsonArray::LGetBool0
        , &TSJsonArray::LGetBool1
    ));
    ts_jsonarray.set_function("GetNumber", sol::overload(
          &TSJsonArray::LGetNumber0
        , &TSJsonArray::LGetNumber1
    ));
    ts_jsonarray.set_function("GetString", sol::overload(
          &TSJsonArray::LGetString0
        , &TSJsonArray::LGetString1
    ));
    ts_jsonarray.set_function("SetString", &TSJsonArray::LSetString);
    ts_jsonarray.set_function("InsertString", &TSJsonArray::LInsertString);
    ts_jsonarray.set_function("LPushString", &TSJsonArray::LPushString),
    ts_jsonarray.set_function("SetJsonObject", sol::overload(
          &TSJsonArray::LSetJsonObject0
        , &TSJsonArray::LSetJsonObject1
    ));
    ts_jsonarray.set_function("GetJsonObject", sol::overload(
          &TSJsonArray::LGetJsonObject0
        , &TSJsonArray::LGetJsonObject1
    ));
    ts_jsonarray.set_function("InsertJsonObject", sol::overload(
          &TSJsonArray::LInsertJsonObject0
        , &TSJsonArray::LInsertJsonObject1
    ));
    ts_jsonarray.set_function("PushJsonObject", sol::overload(
          &TSJsonArray::LPushJsonObject0
        , &TSJsonArray::LPushJsonObject1
    ));
    ts_jsonarray.set_function("SetJsonArray", sol::overload(
          &TSJsonArray::LSetJsonArray0
        , &TSJsonArray::LSetJsonArray1
    ));
    ts_jsonarray.set_function("GetJsonArray", sol::overload(
          &TSJsonArray::LGetJsonArray0
        , &TSJsonArray::LGetJsonArray1
    ));
    ts_jsonarray.set_function("InsertJsonArray", sol::overload(
          &TSJsonArray::LInsertJsonArray0
        , &TSJsonArray::LInsertJsonArray1
    ));
    ts_jsonarray.set_function("PushJsonArray", sol::overload(
          &TSJsonArray::LPushJsonArray0
        , &TSJsonArray::LPushJsonArray1
    ));
    ts_jsonarray.set_function("toString", sol::overload(
          &TSJsonArray::LtoString0
        , &TSJsonArray::LtoString1
    ));

    auto ts_lootitem = new_usertype<TSLootItem>("TSLootItem");
    LUA_METHOD(ts_lootitem, TSLootItem, GetItemID);
    LUA_METHOD(ts_lootitem, TSLootItem, GetRandomSuffix);
    LUA_METHOD(ts_lootitem, TSLootItem, GetRandomPropertyID);
    LUA_METHOD(ts_lootitem, TSLootItem, GetCount);
    LUA_METHOD(ts_lootitem, TSLootItem, SetItemID);
    LUA_METHOD(ts_lootitem, TSLootItem, SetRandomSuffix);
    LUA_METHOD(ts_lootitem, TSLootItem, SetRandomPropertyID);
    LUA_METHOD(ts_lootitem, TSLootItem, SetCount);

    auto ts_loot = new_usertype<TSLoot>("TSLoot");
    ts_loot.set_function("AddItem", sol::overload(
          &TSLoot::LAddItem0
        , &TSLoot::LAddItem1
        , &TSLoot::LAddItem2
        , &TSLoot::LAddItem3
    ));
    ts_loot.set_function("Filter", &TSLoot::LFilter);
    LUA_METHOD(ts_loot, TSLoot, Clear);
    LUA_METHOD(ts_loot, TSLoot, IsLooted);
    LUA_METHOD(ts_loot, TSLoot, AddItem);
    LUA_METHOD(ts_loot, TSLoot, AddLooter);
    LUA_METHOD(ts_loot, TSLoot, RemoveLooter);
    LUA_METHOD(ts_loot, TSLoot, GetLootType);
    LUA_METHOD(ts_loot, TSLoot, SetLootType);
    LUA_METHOD(ts_loot, TSLoot, GetMoney);
    LUA_METHOD(ts_loot, TSLoot, SetMoney);
    LUA_METHOD(ts_loot, TSLoot, GetLootOwner);
    LUA_METHOD(ts_loot, TSLoot, SetLootOwner);
    LUA_METHOD(ts_loot, TSLoot, GetItemCount);
    LUA_METHOD(ts_loot, TSLoot, GetQuestItemCount);
    LUA_METHOD(ts_loot, TSLoot, GetItem);
    LUA_METHOD(ts_loot, TSLoot, GetQuestItem);
    LUA_METHOD(ts_loot, TSLoot, GetGeneratesNormally);
    LUA_METHOD(ts_loot, TSLoot, SetGeneratesNormally);

    auto ts_mailiteminfo = new_usertype < TSMailItemInfo>("TSMailItemInfo");
    LUA_METHOD(ts_mailiteminfo, TSMailItemInfo, GetGUID);
    LUA_METHOD(ts_mailiteminfo, TSMailItemInfo, GetItemTemplate);

    auto ts_itemtemplate = new_usertype < TSItemTemplate>("TSItemTemplate");
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetEntry);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDamageMinA);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDamageMinB);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDamageMaxA);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDamageMaxB);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDamageTypeA);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDamageTypeB);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetClass);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetSubClass);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetSoundOverrideSubclass);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDisplayInfoID);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetQuality);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetFlags);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetFlags2);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetBuyCount);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetBuyPrice);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetSellPrice);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetInventoryType);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetAllowableClass);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetAllowableRace);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetItemLevel);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredLevel);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredSkill);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredSkillRank);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredSpell);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredHonorRank);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredCityRank);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredReputationFaction);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredReputationRank);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMaxCount);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetStackable);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetContainerSlots);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetStatsCount);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetStatType);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetStatValue);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetScalingStatDistribution);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetScalingStatValue);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetArmor);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetHolyRes);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetFireRes);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetNatureRes);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetFrostRes);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetShadowRes);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetArcaneRes);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDelay);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetAmmoType);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRangedModRange);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetBonding);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetPageText);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetLanguageID);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetPageMaterial);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetStartQuest);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetLockID);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMaterial);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetSheath);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRandomProperty);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRandomSuffix);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetBlock);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetItemSet);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMaxDurability);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetArea);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMap);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetBagFamily);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetTotemCategory);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetSocketBonus);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetGemProperties);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetRequiredDisenchantSkill);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetArmorDamageModifier);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDuration);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetItemLimitCategory);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetHolidayID);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetScriptID);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDisenchantID);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetFoodType);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMinMoneyLoot);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMaxMoneyLoot);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetFlagsCu);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, IsCurrencyToken);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetMaxStackSize);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetDPS);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, CanChangeEquipStateInCombat);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetTotalAPBonus);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetItemLevelIncludingQuality);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, GetSkill);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, IsPotion);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, IsWeaponVellum);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, IsArmorVellum);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, IsConjuredConsumable);
    LUA_METHOD(ts_itemtemplate, TSItemTemplate, HasSignature);

    ts_itemtemplate.set_function("GetFeralBonus", sol::overload(
          &TSItemTemplate::LGetFeralBonus0
        , &TSItemTemplate::LGetFeralBonus1
    ));
    ts_itemtemplate.set_function("GetName", &TSItemTemplate::LGetName);
    ts_itemtemplate.set_function("GetDescription", &TSItemTemplate::LGetDescription);
    set_function("GetItemTemplate", &GetItemTemplate);

    auto ts_mail = new_usertype<TSMail>("TSMail");
    LUA_METHOD(ts_mail, TSMail, GetID);
    LUA_METHOD(ts_mail, TSMail, GetType);
    LUA_METHOD(ts_mail, TSMail, GetTemplateID);
    LUA_METHOD(ts_mail, TSMail, GetSender);
    LUA_METHOD(ts_mail, TSMail, GetReceiver);
    LUA_METHOD(ts_mail, TSMail, GetState);
    LUA_METHOD(ts_mail, TSMail, GetMoney);
    LUA_METHOD(ts_mail, TSMail, GetCOD);
    LUA_METHOD(ts_mail, TSMail, GetChecked);
    LUA_METHOD(ts_mail, TSMail, GetItemCount);
    LUA_METHOD(ts_mail, TSMail, RemoveAllItems);
    LUA_METHOD(ts_mail, TSMail, AddItem);
    LUA_METHOD(ts_mail, TSMail, SetMoney);
    LUA_METHOD(ts_mail, TSMail, SetCOD);
    LUA_METHOD(ts_mail, TSMail, SetChecked);
    LUA_METHOD(ts_mail, TSMail, SetSender);
    LUA_METHOD(ts_mail, TSMail, SetState);
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

    auto ts_maildraft = new_usertype<TSMailDraft>("TSMailDraft");
    LUA_METHOD(ts_maildraft, TSMailDraft, GetTemplateID);
    LUA_METHOD(ts_maildraft, TSMailDraft, GetMoney);
    LUA_METHOD(ts_maildraft, TSMailDraft, GetCOD);
    LUA_METHOD(ts_maildraft, TSMailDraft, GetItem);
    LUA_METHOD(ts_maildraft, TSMailDraft, SetTemplateID);
    LUA_METHOD(ts_maildraft, TSMailDraft, SetSubject);
    LUA_METHOD(ts_maildraft, TSMailDraft, SetBody);

    ts_maildraft.set_function("GetSubject", &TSMailDraft::LGetSubject);
    ts_maildraft.set_function("GetBody", &TSMailDraft::LGetBody);
    ts_maildraft.set_function("GetItemKeys", &TSMailDraft::LGetItemKeys);
    ts_maildraft.set_function("AddItem", sol::overload(
          &TSMailDraft::LAddItem0
        , &TSMailDraft::LAddItem1
    ));
    ts_maildraft.set_function("FilterItems", &TSMailDraft::LFilterItems);

    auto ts_mutablestring = new_usertype<TSMutableString>("TSMutableString");
    LUA_METHOD(ts_mutablestring, TSMutableString, Lset);
    LUA_METHOD(ts_mutablestring, TSMutableString, Lget);

    auto ts_position = new_usertype < TSPosition>("TSPosition");
    ts_position["x"] = &TSPosition::x;
    ts_position["y"] = &TSPosition::y;
    ts_position["z"] = &TSPosition::z;
    ts_position["o"] = &TSPosition::o;
    ts_position["map"] = &TSPosition::map;

    auto ts_quest = new_usertype<TSQuest>("TSQuest");
    LUA_METHOD(ts_quest, TSQuest, HasFlag);
    LUA_METHOD(ts_quest, TSQuest, IsDaily);
    LUA_METHOD(ts_quest, TSQuest, IsRepeatable);
    LUA_METHOD(ts_quest, TSQuest, GetID);
    LUA_METHOD(ts_quest, TSQuest, GetLevel);
    LUA_METHOD(ts_quest, TSQuest, GetMinLevel);
    LUA_METHOD(ts_quest, TSQuest, GetNextQuestID);
    LUA_METHOD(ts_quest, TSQuest, GetPrevQuestID);
    LUA_METHOD(ts_quest, TSQuest, GetNextQuestInChain);
    LUA_METHOD(ts_quest, TSQuest, GetFlags);
    LUA_METHOD(ts_quest, TSQuest, GetType);

    auto ts_condition = new_usertype<TSCondition>("TSCondition");
    LUA_METHOD(ts_condition, TSCondition, GetSourceType);
    LUA_METHOD(ts_condition, TSCondition, GetSourceGroup);
    LUA_METHOD(ts_condition, TSCondition, GetSouceEntry);
    LUA_METHOD(ts_condition, TSCondition, GetElseGroup);
    LUA_METHOD(ts_condition, TSCondition, GetConditionType);
    LUA_METHOD(ts_condition, TSCondition, GetConditionValue1);
    LUA_METHOD(ts_condition, TSCondition, GetConditionValue2);
    LUA_METHOD(ts_condition, TSCondition, GetConditionValue3);
    LUA_METHOD(ts_condition, TSCondition, GetErrorType);
    LUA_METHOD(ts_condition, TSCondition, GetErrorTextID);
    LUA_METHOD(ts_condition, TSCondition, GetReferenceID);
    LUA_METHOD(ts_condition, TSCondition, GetScriptID);
    LUA_METHOD(ts_condition, TSCondition, GetConditionTarget);
    LUA_METHOD(ts_condition, TSCondition, IsNegativeCondition);
    LUA_METHOD(ts_condition, TSCondition, IsNull);
    ts_condition.set_function("ToString", sol::overload(
          &TSCondition::LToString0
        , &TSCondition::LToString1
    ));

    auto ts_conditionsourceinfo = new_usertype<TSConditionSourceInfo>("TSConditionSourceInfo");
    LUA_METHOD(ts_conditionsourceinfo, TSConditionSourceInfo, GetTarget);
    LUA_METHOD(ts_conditionsourceinfo, TSConditionSourceInfo, GetLastFailedCondition);

    auto ts_smartscriptvalues = new_usertype<TSSmartScriptValues>("TSSmartScriptValues");
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEntryOrGUID);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetSourceType);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventID);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetLink);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventPhaseMask);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventChance);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventFlags);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument1);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument2);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument3);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument4);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument5);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument6);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument1);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument2);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument3);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument4);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument5);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetParam1);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetParam2);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetParam3);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetX);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetY);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetZ);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetTimer);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetPriority);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetLastInvoker);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, StoreCounter);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetCounterValue);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetUnitArg);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetUIntArg1);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetUIntArg2);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetBoolArg);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetSpellArg);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetGameObjectArg);
    LUA_METHOD(ts_smartscriptvalues, TSSmartScriptValues, GetSelf);
    ts_smartscriptvalues.set_function("GetTargets", &TSSmartScriptValues::LGetTargets);
    ts_smartscriptvalues.set_function("GetTargetList", &TSSmartScriptValues::LGetTargetList);
    ts_smartscriptvalues.set_function("StoreTargetList", &TSSmartScriptValues::LStoreTargetList);

    auto ts_map = new_usertype<TSMap>("TSMap");
    auto ts_object = new_usertype<TSObject>("TSObject");
    auto ts_worldobject = new_usertype<TSWorldObject>("TSWorldObject");
    auto ts_unit = new_usertype<TSUnit>("TSUnit");

    // Apply inheritance

    TSMapMethods(ts_map);
    TSMapMethods(ts_instance);
    TSMapMethods(ts_battleground);

    TSObjectMethods(ts_object);

    TSWorldObjectMethods(ts_worldobject);
    TSWorldObjectMethods(ts_gameobject);

    TSUnitMethods(ts_unit);
    TSUnitMethods(ts_player);
    TSUnitMethods(ts_creature);
}