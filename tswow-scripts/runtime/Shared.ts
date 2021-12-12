import { ipaths } from "../util/Paths";
import { ModuleEndpoint } from "./Modules";

export class Shared {
    readonly mod: ModuleEndpoint

    get path() {
        return this.mod.path.shared
    }

    initialize() {
        ipaths.bin.include_addon.shared_global_d_ts
            .copy(this.path.global_d_ts)
        return this;
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
    }

    static create(mod: ModuleEndpoint) {
        return new Shared(mod).initialize()
    }
}