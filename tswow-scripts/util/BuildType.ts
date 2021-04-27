export type BuildType = 'Release'|'Debug'|'RelWithDebInfo'

export const DEFAULT_BUILD_TYPE: BuildType = 'RelWithDebInfo';

export function findBuildType(args: string[], def: BuildType = DEFAULT_BUILD_TYPE) {
    args = args.map(x=>x.toLowerCase());
    if(args.includes(def)) return def;
    if(args.includes('debug')) return 'Debug';
    if(args.includes('release')) return 'Release';
    if(args.includes('relwithdebinfo')) return 'RelWithDebInfo';
    return def;
}

export const BUILD_TYPES: BuildType[] = ['Release','Debug','RelWithDebInfo'];