
export enum GameObjectFlags {
    IN_USE             = 0x1,
    LOCKED             = 0x2,
    CONDITIONAL_SELECT = 0x4,
    TRANSPORT          = 0x8,
    NOT_SELECTABLE     = 0x10,
    NO_DESPAWN         = 0x20,
    TRIGGERED          = 0x40,
    DAMAGED            = 0x200,
    DESTROYED          = 0x400,
}