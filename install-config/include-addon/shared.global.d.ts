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

declare function Message(classTarget: any): any
declare function MsgClass(classTarget: any, name: string): any
declare function MsgClassArray(size: number): (field: any, name: any)=>void
declare function MsgPrimitive(classTarget: any, name: string): any
declare function MsgPrimitiveArray(capacity: number): (field: any, name: any)=>void;
declare function MsgString(size: number): (field: any, name: any)=>void
declare function MsgStringArray(arrSize: number, stringSize: number): (field: any, name: any)=>void