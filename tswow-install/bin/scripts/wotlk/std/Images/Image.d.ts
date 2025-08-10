export type ExportFormat = 'PNG' | 'BLP' | 'PNG+BLP';
export declare class TSImage {
    protected bitmap: any;
    protected get context(): any;
    get width(): any;
    get height(): any;
    constructor(bitmap: any);
    clone(): TSImage;
    drawImage(image: TSImage, x: number, y: number, width?: any, height?: any, xIn?: number, yIn?: number, widthIn?: any, heightIn?: any): this;
    addFilter(callback: (color: number, x: number, y: number) => number): this;
    addFilterSplit(callback: (r: number, g: number, b: number, a: number, x: number, y: number) => [number, number, number, number]): this;
    write(pathIn: string, format?: ExportFormat): Promise<void>;
    writeToModule(mod: string, localPath: string, format?: ExportFormat): Promise<void>;
    static create(width: number, height: number): TSImage;
    static read(str: string): TSImage;
}
export declare const TSImages: {
    create(width: number, height: number): TSImage;
    /**
     * Loads from any path
     * @param pathIn
     */
    read(pathIn: string): TSImage;
    /**
     * Loads from the assets directory of a module
     * @param mod
     * @param localPath
     */
    readFromModule(mod: string, localPath: string): TSImage;
};
