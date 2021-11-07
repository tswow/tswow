type uint8 = number;
type uint16 = number;
type uint32 = number;
type uint64 = number;
type int8 = number;
type int16 = number;
type int32 = number;
type int64 = number;
type float = number;
type bool = boolean;
type double = number;
type TSArray<T> = T[];
type TSString = string;

declare class TSPacketWrite {
    WriteUInt8(value: uint8): TSPacketWrite;
    WriteInt8(value: int8): TSPacketWrite;

    WriteUInt16(value: uint16): TSPacketWrite;
    WriteInt16(value: int16): TSPacketWrite;

    WriteUInt16(value: uint16): TSPacketWrite;
    WriteInt16(value: int16): TSPacketWrite;

    WriteUInt32(value: uint32): TSPacketWrite;
    WriteInt32(value: int32): TSPacketWrite;

    WriteUInt64(value: uint64): TSPacketWrite;
    WriteInt64(value: int64): TSPacketWrite;

    WriteFloat(value: float): TSPacketWrite;
    WriteDouble(value: double): TSPacketWrite;

    WriteString(value: string): TSPacketWrite;

    Size(): uint32
}

declare class TSPacketRead {
    ReadUInt8(def?: uint8): uint8;
    ReadInt8(def?: int8): int8;

    ReadUInt16(def?: uint16): uint16;
    ReadInt16(def?: int16): int16;

    ReadUInt32(def?: uint32): uint32;
    ReadInt32(def?: int32): int32;

    ReadUInt64(def?: uint64): uint64;
    ReadInt64(def?: int64): int64;

    ReadFloat(def?: float): float;
    ReadDouble(def?: double): double;

    ReadString(def?: string): string;

    Size(): uint32
}

declare function MakeCustomPacket(opcode: uint32, size: uint32): TSPacketWrite;