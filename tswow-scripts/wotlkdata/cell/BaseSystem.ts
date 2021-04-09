export class BaseSystem {
    private uniqueRefs: boolean = true;

    static getUniqueRefs(system: BaseSystem) {
        return system.uniqueRefs;
    }

    static setUniqueRefs(system: BaseSystem, uniqueRefs: boolean) {
        system.uniqueRefs = uniqueRefs;
    }
}
