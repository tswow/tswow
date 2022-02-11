export function CommonStruct(value: string) {
    return function(cls: any) {
        cls.prototype.__struct_id = value;
    }
}