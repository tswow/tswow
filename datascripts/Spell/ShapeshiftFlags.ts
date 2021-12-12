export enum ShapeshiftFlags {
    IS_SHAPESHIFT                     = 0x1,
    PREVENT_CANCEL                    = 0x2,
    ALLOW_INTERACTION                 = 0x8,
    GET_ATTACK_CONTRIBUTION_FROM_STAT = 0x20,
    CAN_EQUIP_ITEMS                   = 0x40,
    CAN_USE_ITEMS                     = 0x80,
    CAN_AUTO_UNSHIFT                  = 0x100,
    PREVENT_LFG                       = 0x200,
    PREVENT_NON_SHAPESHIFT_SPELLS     = 0x400,
    CANCEL_AT_FLIGHT_MASTER           = 0x800,
    PREVENT_EMOTE_SOUND               = 0x1000,
}