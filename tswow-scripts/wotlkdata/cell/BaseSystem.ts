export const BaseSystem = {
    getUniqueRefs(system: any) {
        if(!system) return true;
        if(typeof(system)!='object') throw new Error(`Tried using non-object as owner`);
        if(system.uniqueRefs === undefined) return true;
        return system.uniqueRefs;
    },

    setUniqueRefs(system: any, uniqueRefs: boolean) {
        if(!system) throw new Error(`Tried setting unique refs on null object`);
        if(typeof(system)!=='object') throw new Error(`Tried setting unique refs on non-object`);
        system.uniqueRefs = uniqueRefs;
    }
}