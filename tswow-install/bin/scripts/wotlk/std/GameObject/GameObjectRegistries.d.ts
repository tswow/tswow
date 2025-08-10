import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { gameobject_templateQuery, gameobject_templateRow } from "../../sql/gameobject_template";
import { Position } from "../Misc/Position";
import { RefStatic } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { RegistryBase } from "../Refs/RegistryBase";
import { TaxiNodeConstructor } from "../Taxi/Taxi";
import { KeyFrameCon } from "./ElevatorKeyframes";
import { GameObjectAreaDamage, GameObjectAuraGenerator, GameObjectBarberChair, GameObjectButton, GameObjectCamera, GameObjectCapturePoint, GameObjectChair, GameObjectChest, GameObjectDestructibleBuilding, GameObjectDoor, GameObjectDungeonDifficulty, GameObjectElevator, GameObjectFishingHole, GameObjectFlagDrop, GameObjectFlagStand, GameObjectGoober, GameObjectGuardPost, GameObjectGuildBank, GameObjectMailbox, GameObjectMeetingStone, GameObjectMinigame, GameObjectPlain, GameObjectQuestGiver, GameObjectShip, GameObjectSpellCaster, GameObjectSpellFocus, GameObjectSummoningRitual, GameObjectTemplate, GameObjectText, GameObjectTrap, GameObjectTrapdoor } from "./GameObjectTemplate";
export declare abstract class GameObjectRegistryBaseClass<T extends GameObjectTemplate> extends RegistryRowBase<T, gameobject_templateRow, gameobject_templateQuery> {
    ref<O>(owner: O, cell: Cell<number, any>): RefStatic<O, T>;
    protected FindByID(id: number): gameobject_templateRow;
    protected EmptyQuery(): gameobject_templateQuery;
    ID(e: T): number;
    protected Table(): Table<any, gameobject_templateQuery, gameobject_templateRow>;
    protected abstract GOType(): number;
    protected abstract ClearGO(r: GameObjectPlain, mod: string, id: string): void;
    protected abstract CloneGO(r: T, parent: T, mod: string, id: string): void;
    protected getAll(): T[];
    /** Unused, see ClearGO instead */
    Clear(r: T): void;
    private clearRow;
    protected abstract GOEntity(plain: GameObjectPlain): T;
    protected Entity(row: gameobject_templateRow): T;
    create(mod: string, id: string, parent?: number): T;
}
export declare class GOAllRegistryClass extends RegistryBase<GameObjectPlain, gameobject_templateRow> {
    protected getAll(): GameObjectPlain[];
    protected Entity(r: gameobject_templateRow): GameObjectPlain;
    ID(e: GameObjectPlain): number;
}
export declare class GOGenericRegistryClass extends GameObjectRegistryBaseClass<GameObjectPlain> {
    protected GOType(): number;
    protected ClearGO(r: GameObjectPlain): void;
    protected CloneGO(r: GameObjectPlain, parent: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectPlain;
}
export declare class GODoorRegistryClass extends GameObjectRegistryBaseClass<GameObjectDoor> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectDoor, parent: GameObjectDoor): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectDoor;
}
export declare class GOButtonRegistryClass extends GameObjectRegistryBaseClass<GameObjectButton> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectButton, parent: GameObjectButton): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectButton;
}
export declare class GOQuestGiverRegistryClass extends GameObjectRegistryBaseClass<GameObjectQuestGiver> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectQuestGiver, parent: GameObjectQuestGiver): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectQuestGiver;
}
export declare class GOChestRegistryClass extends GameObjectRegistryBaseClass<GameObjectChest> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectChest, parent: GameObjectChest): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectChest;
}
export declare class GOTrapRegistryClass extends GameObjectRegistryBaseClass<GameObjectTrap> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectTrap, parent: GameObjectTrap): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectTrap;
}
export declare class GOChairRegistryClass extends GameObjectRegistryBaseClass<GameObjectChair> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectChair, parent: GameObjectChair): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectChair;
}
export declare class GOSpellFocusRegistryClass extends GameObjectRegistryBaseClass<GameObjectSpellFocus> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectSpellFocus, parent: GameObjectSpellFocus): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectSpellFocus;
}
export declare class GOTextRegistryClass extends GameObjectRegistryBaseClass<GameObjectText> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectText, parent: GameObjectText): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectText;
}
export declare class GOGooberRegistryClass extends GameObjectRegistryBaseClass<GameObjectGoober> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectGoober, parent: GameObjectGoober): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectGoober;
}
export declare class GOElevatorRegistryClass extends GameObjectRegistryBaseClass<GameObjectElevator> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectElevator, parent: GameObjectElevator): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectElevator;
    createLocalTemplate(mod: string, id: string, keyframes: KeyFrameCon[]): GameObjectElevator;
    createGlobalInstance(mod: string, id: string, keyframes: (Position & {
        time?: number;
    })[]): {
        Template: GameObjectElevator;
        Spawn: GameObjectElevator;
    };
}
export declare class GOAreaDamageRegistryClass extends GameObjectRegistryBaseClass<GameObjectAreaDamage> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectAreaDamage, parent: GameObjectAreaDamage): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectAreaDamage;
}
export declare class GOCameraRegistryClass extends GameObjectRegistryBaseClass<GameObjectCamera> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectCamera, parent: GameObjectCamera): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectCamera;
}
export declare class GOShipRegistryClass extends GameObjectRegistryBaseClass<GameObjectShip> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectShip, parent: GameObjectShip): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectShip;
    createSimple(mod: string, id: string, points: TaxiNodeConstructor[]): GameObjectShip;
}
export declare class GORitualRegistryClass extends GameObjectRegistryBaseClass<GameObjectSummoningRitual> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectSummoningRitual, parent: GameObjectSummoningRitual): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectSummoningRitual;
}
export declare class GOMailboxRegistryClass extends GameObjectRegistryBaseClass<GameObjectMailbox> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectMailbox, parent: GameObjectMailbox): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectMailbox;
}
export declare class GOGuardPostRegistryClass extends GameObjectRegistryBaseClass<GameObjectGuardPost> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectGuardPost, parent: GameObjectGuardPost): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectGuardPost;
}
export declare class GOSpellCasterRegistryClass extends GameObjectRegistryBaseClass<GameObjectSpellCaster> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectSpellCaster, parent: GameObjectSpellCaster): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectSpellCaster;
}
export declare class GOMeetingStoneRegistryClass extends GameObjectRegistryBaseClass<GameObjectMeetingStone> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectMeetingStone, parent: GameObjectMeetingStone): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectMeetingStone;
}
export declare class GOFlagStandRegistryClass extends GameObjectRegistryBaseClass<GameObjectFlagStand> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectFlagStand, parent: GameObjectFlagStand): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectFlagStand;
}
export declare class GOFishingHoleRegistryClass extends GameObjectRegistryBaseClass<GameObjectFishingHole> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectFishingHole, parent: GameObjectFishingHole): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectFishingHole;
}
export declare class GOFlagDropRegistryClass extends GameObjectRegistryBaseClass<GameObjectFlagDrop> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectFlagDrop, parent: GameObjectFlagDrop): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectFlagDrop;
}
export declare class GOMinigameRegistryClass extends GameObjectRegistryBaseClass<GameObjectMinigame> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectMinigame, parent: GameObjectMinigame): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectMinigame;
}
export declare class GOCapturePointRegistryClass extends GameObjectRegistryBaseClass<GameObjectCapturePoint> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectCapturePoint, parent: GameObjectCapturePoint): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectCapturePoint;
}
export declare class GOAuraGeneratorRegistryClass extends GameObjectRegistryBaseClass<GameObjectAuraGenerator> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectAuraGenerator, parent: GameObjectAuraGenerator): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectAuraGenerator;
}
export declare class GODungeonDifficultyRegistryClass extends GameObjectRegistryBaseClass<GameObjectDungeonDifficulty> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectDungeonDifficulty, parent: GameObjectDungeonDifficulty): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectDungeonDifficulty;
}
export declare class GOBarberChairRegistryClass extends GameObjectRegistryBaseClass<GameObjectBarberChair> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectBarberChair, parent: GameObjectBarberChair): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectBarberChair;
}
export declare class GODestructibleBuildingRegistryClass extends GameObjectRegistryBaseClass<GameObjectDestructibleBuilding> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectDestructibleBuilding, parent: GameObjectDestructibleBuilding): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectDestructibleBuilding;
}
export declare class GOGuildBankRegistryClass extends GameObjectRegistryBaseClass<GameObjectGuildBank> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectGuildBank, parent: GameObjectGuildBank): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectGuildBank;
}
export declare class GOTrapdoorRegistryClass extends GameObjectRegistryBaseClass<GameObjectTrapdoor> {
    protected GOType(): number;
    protected CloneGO(r: GameObjectTrapdoor, parent: GameObjectTrapdoor): void;
    protected ClearGO(r: GameObjectPlain): void;
    protected GOEntity(plain: GameObjectPlain): GameObjectTrapdoor;
}
export declare const GORegistry: {
    Doors: GODoorRegistryClass;
    Buttons: GOButtonRegistryClass;
    QuestGivers: GOQuestGiverRegistryClass;
    Chests: GOChestRegistryClass;
    Traps: GOTrapRegistryClass;
    Chairs: GOChairRegistryClass;
    SpellFocus: GOSpellFocusRegistryClass;
    Text: GOTextRegistryClass;
    Goobers: GOGooberRegistryClass;
    Elevators: GOElevatorRegistryClass;
    AreaDamage: GOAreaDamageRegistryClass;
    Cameras: GOCameraRegistryClass;
    Ships: GOShipRegistryClass;
    Rituals: GORitualRegistryClass;
    Mailboxes: GOMailboxRegistryClass;
    GuardPosts: GOGuardPostRegistryClass;
    SpellCasters: GOSpellCasterRegistryClass;
    MeetingStones: GOMeetingStoneRegistryClass;
    FlagStands: GOFlagStandRegistryClass;
    FishingHoles: GOFishingHoleRegistryClass;
    FlagDrops: GOFlagDropRegistryClass;
    Minigames: GOMinigameRegistryClass;
    CapturePoints: GOCapturePointRegistryClass;
    AuraGenerators: GOAuraGeneratorRegistryClass;
    DungeonDifficulties: GODungeonDifficultyRegistryClass;
    BarberChairs: GOBarberChairRegistryClass;
    Desctructibles: GODestructibleBuildingRegistryClass;
    GuildBanks: GOGuildBankRegistryClass;
    Trapdoors: GOTrapdoorRegistryClass;
    All: GOAllRegistryClass;
    Generic: GOGenericRegistryClass;
};
