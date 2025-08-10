export type InlineType = 'livescript' | 'lua';
export declare function getInlineID(owner: any, id: number, type: string, inlineType: InlineType): any;
export declare function getInline(owner: any, type: string, inlineType: InlineType): any;
export declare const InlineScript: TSEvents;
export declare function getAny(owner: any, prefix: string, type: string, inlineType: InlineType): any;
