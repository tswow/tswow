export type BuildType = 'Release' | 'Debug' | 'RelWithDebInfo';
export declare const DEFAULT_BUILD_TYPE: BuildType;
export declare function findBuildType(args: string[], def?: BuildType): BuildType;
export declare const BUILD_TYPES: BuildType[];
