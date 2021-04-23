export type BuildType = 'Release'|'Debug'|'RelWithDebInfo'

export const DEFAULT_BUILD_TYPE: BuildType = 'RelWithDebInfo';

export function findBuildType(args: string[], def: BuildType = DEFAULT_BUILD_TYPE) {
    if(args.includes(def)) return def;
    if(args.includes('Debug')) return 'Debug';
    if(args.includes('Release')) return 'Release';
    if(args.includes('RelWithDebInfo')) return 'RelWithDebInfo';
    return def;
}

export const BUILD_TYPES: BuildType[] = ['Release','Debug','RelWithDebInfo'];