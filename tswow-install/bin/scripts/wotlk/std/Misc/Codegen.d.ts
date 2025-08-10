export type CodegenSettings = {
    indention?: number;
    space_per_indent?: number;
    indent_last_block_line?: boolean;
    include_registry?: boolean;
};
interface Codifiable {
    codify(settings: any): string;
}
export declare function GenerateCode(settings: CodegenSettings, regLine: string, callback: (gen: Codegen) => void): string;
export declare class Codegen {
    constructor(settings: CodegenSettings);
    raw_objectify(obj: any): void;
    raw_objectify_non_zero(obj: any): void;
    non_zero_bitmask(key: string, value: any): void;
    non_zero_enum(key: string, value: any): void;
    num(key: string, value: any): void;
    non_def_num(key: string, value: any, def?: number): void;
    enum_line(propertyName: string, obj: any): void;
    line(text: string): void;
    write(text: string): void;
    begin_block(text: string): void;
    bitmask(attribName: string, obj: any): void;
    lowercase(name: string, cell: any): void;
    loc(key: string, loc: any): void;
    end_block(text: string): void;
    get(): string;
    include_registry(): boolean;
    substruct(sub: Codifiable, settings: any): void;
    private indention;
    private str;
    private nextIndent;
    private spacePerIndention;
    private indentLastBlockLine;
    private includeRegistry;
}
export {};
