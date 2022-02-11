import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { gameobject_templateQuery, gameobject_templateRow } from "wotlkdata/wotlkdata/sql/types/gameobject_template";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { RefStatic } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { TaxiNodeConstructor, TaxiPathRegistry } from "../Taxi/Taxi";
import { KeyFrameCon } from "./ElevatorKeyframes";
import { GameObjectAreaDamage, GameObjectAuraGenerator, GameObjectBarberChair, GameObjectButton, GameObjectCamera, GameObjectCapturePoint, GameObjectChair, GameObjectChest, GameObjectDestructibleBuilding, GameObjectDoor, GameObjectDungeonDifficulty, GameObjectElevator, GameObjectFishingHole, GameObjectFlagDrop, GameObjectFlagStand, GameObjectGoober, GameObjectGuardPost, GameObjectGuildBank, GameObjectMailbox, GameObjectMeetingStone, GameObjectMinigame, GameObjectPlain, GameObjectQuestGiver, GameObjectShip, GameObjectSpellCaster, GameObjectSpellFocus, GameObjectSummoningRitual, GameObjectTemplate, GameObjectText, GameObjectTrap, GameObjectTrapdoor } from "./GameObjectTemplate";

export abstract class GameObjectRegistryBaseClass<T extends GameObjectTemplate>
    extends RegistryRowBase<T,gameobject_templateRow,gameobject_templateQuery>
{
    ref<O>(owner: O, cell: Cell<number,any>) {
        return new RefStatic(owner, cell, this);
    }

    protected FindByID(id: number): gameobject_templateRow {
        return SQL.gameobject_template.query({entry:id});
    }

    protected EmptyQuery(): gameobject_templateQuery {
        return {}
    }

    ID(e: T): number {
        return e.ID
    }

    protected Table(): Table<any, gameobject_templateQuery, gameobject_templateRow> {
        return SQL.gameobject_template
    }

    protected abstract ClearGO(r: GameObjectPlain, mod: string, id: string): void;
    protected abstract CloneGO(r: T, parent: T, mod: string, id: string): void;

    /** Unused, see ClearGO instead */
    Clear(r: T): void {}

    private clearRow(r: gameobject_templateRow) {
            r.AIName.set("")
            .Data0.set(0)
            .Data1.set(0)
            .Data10.set(0)
            .Data11.set(0)
            .Data12.set(0)
            .Data13.set(0)
            .Data14.set(0)
            .Data15.set(0)
            .Data16.set(0)
            .Data17.set(0)
            .Data18.set(0)
            .Data19.set(0)
            .Data2.set(0)
            .Data20.set(0)
            .Data21.set(0)
            .Data22.set(0)
            .Data23.set(0)
            .Data3.set(0)
            .Data4.set(0)
            .Data5.set(0)
            .Data6.set(0)
            .Data7.set(0)
            .Data8.set(0)
            .Data9.set(0)
            .IconName.set("")
            .ScriptName.set("")
            .castBarCaption.set("")
            .displayId.set(0)
            .name.set("")
            .size.set(1)
            .type.set(0)
            .unk1.set("")
    }

    protected abstract GOEntity(plain: GameObjectPlain): T;

    protected Entity(row: gameobject_templateRow) {
        return this.GOEntity(new GameObjectPlain(row));
    }

    create(mod: string, id: string, parent = 0) {
        let nid = Ids.gameobject_template.id(mod,id);
        if(parent !== 0) {
            let parentRow = SQL.gameobject_template.query({entry:parent});
            let parentEntity = this.Entity(parentRow);
            // we should use ".Entity" now because we got the type from the parent
            let entity = this.Entity(parentRow.clone(nid))
            if(parentEntity.AddonRow.exists()) {
                parentEntity.AddonRow.get().clone(entity.ID)
            }
            this.CloneGO(entity,parentEntity,mod,id);
            return entity;
        } else {
            let row = SQL.gameobject_template.add(nid)
            this.clearRow(row);
            this.ClearGO(new GameObjectPlain(row),mod,id)
            // now we can safely use .Entity, because
            // ClearGO should have set up the type correctly
            return this.Entity(row);
        }
    }
}

export class GOPlainRegistryClsas
    extends GameObjectRegistryBaseClass<GameObjectPlain>
{
    // Do not change the type
    protected ClearGO(r: GameObjectPlain): void {
        // Default type
        r.Type.GENERIC.set()
    }
    protected CloneGO(r: GameObjectPlain, parent: GameObjectPlain): void {}
    protected GOEntity(plain: GameObjectPlain): GameObjectPlain {
        // Do not assert type here, we can take any
        // game object as a plain
        return plain;
    }
}

export class GODoorRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectDoor> {
    protected CloneGO(r: GameObjectDoor, parent: GameObjectDoor): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.DOOR.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.DOOR.as();
    }
}

export class GOButtonRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectButton> {
    protected CloneGO(r: GameObjectButton, parent: GameObjectButton): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.BUTTON.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.BUTTON.as();
    }
}

export class GOQuestGiverRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectQuestGiver> {
    protected CloneGO(r: GameObjectQuestGiver, parent: GameObjectQuestGiver): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.QUESTGIVER.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.QUESTGIVER.as();
    }
}

export class GOChestRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectChest> {
    protected CloneGO(r: GameObjectChest, parent: GameObjectChest): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.CHEST.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.CHEST.as();
    }
}

export class GOTrapRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectTrap> {
    protected CloneGO(r: GameObjectTrap, parent: GameObjectTrap): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.TRAP.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.TRAP.as();
    }
}

export class GOChairRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectChair> {
    protected CloneGO(r: GameObjectChair, parent: GameObjectChair): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.CHAIR.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.CHAIR.as();
    }
}

export class GOSpellFocusRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectSpellFocus> {
    protected CloneGO(r: GameObjectSpellFocus, parent: GameObjectSpellFocus): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.SPELL_FOCUS.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.SPELL_FOCUS.as();
    }
}

export class GOTextRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectText> {
    protected CloneGO(r: GameObjectText, parent: GameObjectText): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.TEXT.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.TEXT.as();
    }
}

export class GOGooberRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectGoober> {
    protected CloneGO(r: GameObjectGoober, parent: GameObjectGoober): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.GOOBER.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.GOOBER.as();
    }
}

export class GOElevatorRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectElevator> {
    protected CloneGO(r: GameObjectElevator, parent: GameObjectElevator): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.ELEVATOR.set()
         .Flags.TRANSPORT.set(true)
         .Display.set(455) // undercity elevator
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.ELEVATOR.as();
    }

    createLocalTemplate(mod: string, id: string, keyframes: KeyFrameCon[]) {
        return this.create(mod,id)
            .Flags.TRANSPORT.set(true)
            .Keyframes.addDefault(keyframes)
    }

    createGlobalInstance(mod: string, id: string, keyframes: (Position&{time?:number})[]) {
        let origin = keyframes[0];
        keyframes = keyframes.map(x=>{
            return Object.assign({},x,{
                  x:x.x-origin.x
                , y:x.y-origin.y
                , z:x.z-origin.z
            })
        });
        let template = this.createLocalTemplate(mod,`${id}-template`,keyframes)
        let spawn = template.Spawns.add(mod,`${id}-instance`,Object.assign({x:0,y:0,z:0,map:0},origin))
        return {Template: template,Spawn: spawn};
    }
}

export class GOAreaDamageRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectAreaDamage> {
    protected CloneGO(r: GameObjectAreaDamage, parent: GameObjectAreaDamage): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.AREA_DAMAGE.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.AREA_DAMAGE.as();
    }
}

export class GOCameraRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectCamera> {
    protected CloneGO(r: GameObjectCamera, parent: GameObjectCamera): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.CAMERA.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.CAMERA.as();
    }
}

export class GOShipRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectShip> {
    protected CloneGO(r: GameObjectShip, parent: GameObjectShip): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.SHIP.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.SHIP.as();
    }

    createSimple(mod: string, id: string, points: TaxiNodeConstructor[]) {
        let nid = Ids.transports.id(mod,id)
        let taxiPath = TaxiPathRegistry.createUni(mod,`${id}-path`,'PLAIN',1,0,points,false);
        let gameObject = this.create(mod,`${id}-gameobject`)
            .Type.SHIP.set()
            .SpawnGroup.set(0)
            .Display.set(3015) // generic boat
            .Size.set(1)
            .MoveSpeed.set(30)
            .StartEvent.set(0)
            .StopEvent.set(0)
            .TaxiPath.set(taxiPath.ID)
            .AccelRate.set(9)
            .Flags.set(40)

        SQL.transports.add(nid)
            .entry.set(gameObject.ID)
            .name.set('tswow')

        return gameObject;
    }
}

export class GORitualRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectSummoningRitual> {
    protected CloneGO(r: GameObjectSummoningRitual, parent: GameObjectSummoningRitual): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.RITUAL.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.RITUAL.as();
    }
}

export class GOMailboxRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectMailbox> {
    protected CloneGO(r: GameObjectMailbox, parent: GameObjectMailbox): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.MAILBOX.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.MAILBOX.as();
    }
}


export class GOGuardPostRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectGuardPost> {
    protected CloneGO(r: GameObjectGuardPost, parent: GameObjectGuardPost): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.GUARD_POST.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.GUARD_POST.as();
    }
}


export class GOSpellCasterRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectSpellCaster> {
    protected CloneGO(r: GameObjectSpellCaster, parent: GameObjectSpellCaster): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.SPELL_CASTER.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.SPELL_CASTER.as();
    }
}

export class GOMeetingStoneRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectMeetingStone> {
    protected CloneGO(r: GameObjectMeetingStone, parent: GameObjectMeetingStone): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.MEETING_STONE.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.MEETING_STONE.as();
    }
}

export class GOFlagStandRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectFlagStand> {
    protected CloneGO(r: GameObjectFlagStand, parent: GameObjectFlagStand): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.FLAG_STAND.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.FLAG_STAND.as();
    }
}

export class GOFishingHoleRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectFishingHole> {
    protected CloneGO(r: GameObjectFishingHole, parent: GameObjectFishingHole): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.FISHING_HOLE.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.FISHING_HOLE.as();
    }
}

export class GOFlagDropRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectFlagDrop> {
    protected CloneGO(r: GameObjectFlagDrop, parent: GameObjectFlagDrop): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.FLAG_DROP.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.FLAG_DROP.as();
    }
}

export class GOMinigameRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectMinigame> {
    protected CloneGO(r: GameObjectMinigame, parent: GameObjectMinigame): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.MINIGAME.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.MINIGAME.as();
    }
}

export class GOCapturePointRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectCapturePoint> {
    protected CloneGO(r: GameObjectCapturePoint, parent: GameObjectCapturePoint): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.CAPTURE_POINT.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.CAPTURE_POINT.as();
    }
}

export class GOAuraGeneratorRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectAuraGenerator> {
    protected CloneGO(r: GameObjectAuraGenerator, parent: GameObjectAuraGenerator): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.AURA_GENERATOR.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.AURA_GENERATOR.as();
    }
}

export class GODungeonDifficultyRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectDungeonDifficulty> {
    protected CloneGO(r: GameObjectDungeonDifficulty, parent: GameObjectDungeonDifficulty): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.DUNGEON_DIFFICULTY.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.DUNGEON_DIFFICULTY.as();
    }
}

export class GOBarberChairRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectBarberChair> {
    protected CloneGO(r: GameObjectBarberChair, parent: GameObjectBarberChair): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.BARBER_CHAIR.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.BARBER_CHAIR.as();
    }
}

export class GODestructibleBuildingRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectDestructibleBuilding> {
    protected CloneGO(r: GameObjectDestructibleBuilding, parent: GameObjectDestructibleBuilding): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.DESTRUCTIBLE_BUILDING.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.DESTRUCTIBLE_BUILDING.as();
    }
}

export class GOGuildBankRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectGuildBank> {
    protected CloneGO(r: GameObjectGuildBank, parent: GameObjectGuildBank): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.GUILD_BANK.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.GUILD_BANK.as();
    }
}

export class GOTrapdoorRegistryClass
    extends GameObjectRegistryBaseClass<GameObjectTrapdoor> {
    protected CloneGO(r: GameObjectTrapdoor, parent: GameObjectTrapdoor): void {}
    protected ClearGO(r: GameObjectPlain): void {
        r.Type.TRAPDOOR.set()
    }
    protected GOEntity(plain: GameObjectPlain) {
        return plain.Type.TRAPDOOR.as();
    }
}

export const GORegistry = {
      Doors: new GODoorRegistryClass()
    , Buttons: new GOButtonRegistryClass()
    , QuestGivers: new GOQuestGiverRegistryClass()
    , Chests: new GOChestRegistryClass()
    , Traps: new GOTrapRegistryClass()
    , Chairs: new GOChairRegistryClass()
    , SpellFocus: new GOSpellFocusRegistryClass()
    , Text: new GOTextRegistryClass()
    , Goobers: new GOGooberRegistryClass()
    /** Elevators */
    , Elevators: new GOElevatorRegistryClass()
    , AreaDamage: new GOAreaDamageRegistryClass()
    , Cameras: new GOCameraRegistryClass()
    /** Ships, zeppelins etc. */
    , Ships: new GOShipRegistryClass()
    , Rituals: new GORitualRegistryClass()
    , Mailboxes: new GOMailboxRegistryClass()
    , GuardPosts: new GOGuardPostRegistryClass()
    , SpellCasters: new GOSpellCasterRegistryClass()
    , MeetingStones: new GOMeetingStoneRegistryClass()
    , FlagStands: new GOFlagStandRegistryClass()
    , FishingHoles: new GOFishingHoleRegistryClass()
    , FlagDrops: new GOFlagDropRegistryClass()
    , Minigames: new GOMinigameRegistryClass()
    , CapturePoints: new GOCapturePointRegistryClass()
    , AuraGenerators: new GOAuraGeneratorRegistryClass()
    , DungeonDifficulties: new GODungeonDifficultyRegistryClass()
    , BarberChairs: new GOBarberChairRegistryClass()
    , Desctructibles: new GODestructibleBuildingRegistryClass()
    , GuildBanks: new GOGuildBankRegistryClass()
    , Trapdoors: new GOTrapdoorRegistryClass()
    , Plain: new GOPlainRegistryClsas()
    , Generic: new GOPlainRegistryClsas()
}