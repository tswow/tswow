import { finish } from "../../../data";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { BuildArgs, ipaths } from "../../../data/Settings";

const reverse: {[key: number]: [string,string][]} = {}
const tags: {[key: string]: number[]} = {}
const uniqueTags: {[key: string]: boolean} = {}

// Debug: log total tags at intervals
let tagCount = 0;
const checkTags = () => {
    const currentCount = Object.keys(tags).length;
    if (currentCount !== tagCount) {
        if (BuildArgs.DEBUG) {
            console.log(`[TAGS] Total tags registered so far: ${currentCount}`);
        }
        tagCount = currentCount;
    }
};
// Check immediately and then every second
if (BuildArgs.DEBUG) {
    checkTags();
    const interval = setInterval(checkTags, 1000);
    // Clear interval after 30 seconds to avoid memory leak
    setTimeout(() => clearInterval(interval), 30000);
}

function fullTagName(mod: string, name: string) {
    return `${mod}.${name}`
}

function AddTag(mod: string, name: string, id: number) {
    let fullTag = fullTagName(mod,name);
    // Debug logging
    if (BuildArgs.DEBUG) {
        if (Object.keys(tags).length === 0) {
            console.log(`[TAGS] First tag being added: ${fullTag} with id: ${id}`);
        }
        if (fullTag === 'tswow-tests.addon-messages-npc') {
            console.log(`[TAGS] Adding specific tag: ${fullTag} with id: ${id}`);
        }
    }
    if(uniqueTags[fullTag]) {
        throw new Error(`Attempted to add tag ${mod}:${name}, but another entity already claimed it as unique.`)
    }
    let map = (tags[fullTag]||(tags[fullTag] = []))
    if(map.includes(id)) {
        return;
    }
    map.push(id);
    (reverse[id]||(reverse[id] = [])).push([mod,name])
}

function RemoveTag(mod: string, name: string, id: number) {
    let fullTag = fullTagName(mod,name);
    if(tags[fullTag] === undefined || reverse[id] === undefined) return;
    tags[fullTag] = tags[fullTag].filter(x=>x !==id);
    reverse[id] = reverse[id]
        .filter(([mod,name])=>mod !== mod || name !== name)
}

function TagExists(mod: string, name: string, id: number) {
    return (tags[fullTagName(mod,name)]||[]).includes(id)
}

function AddUniqueTag(mod: string, name: string, id: number) {
    if(tags[fullTagName(mod,name)] !== undefined) {
        throw new Error(`Attempted claim tag ${mod}:${name} as unique, but it's already in use!`);
    }
    AddTag(mod,name,id);
}

export class EntityTag extends CellSystemTop {
    readonly ID: number;
    readonly Mod: string;
    readonly Name: string;

    protected fullId() {
        return this.Mod+'.'+this.Name;
    }

    constructor(id: number, mod: string, name: string) {
        super();
        this.ID = id;
        this.Mod = mod;
        this.Name = name;
    }

    isDeleted() {
        return TagExists(this.Mod,this.Name,this.ID)
    }

    delete() {
        RemoveTag(this.Mod,this.Name,this.ID)
    }

    undelete() {
        AddTag(this.Mod,this.Name,this.ID);
    }
}

export class EntityTags<T> extends MultiRowSystem<EntityTag,T> {
    protected id: number;

    constructor(owner: T, id: number) {
        super(owner);
        this.id = id;
    }

    add(mod: string, name: string) {
        AddTag(mod,name,this.id);
        return this.owner;
    }

    addUnique(mod: string, name: string) {
        AddUniqueTag(mod,name,this.id);
        return this.owner;
    }

    protected getAllRows(): EntityTag[] {
        return (reverse[this.id]||[])
            .map(([mod,name])=>new EntityTag(this.id,mod,name))
    }

    protected isDeleted(value: EntityTag): boolean {
        return value.isDeleted();
    }
}

export const Tags = {
    add(mod: string, name: string, id: number) {
        AddTag(mod,name,id)
    },

    addUnique(mod: string, name: string, id: number) {
        AddUniqueTag(mod, name, id);
    },

    remove(mod: string, name: string, id: number) {
        RemoveTag(mod,name,id)
    }
}

finish('tags',()=>{
    if (BuildArgs.DEBUG) {
        console.log('[TAGS] Running tags finish function');
        console.log(`[TAGS] BuildArgs.READ_ONLY: ${BuildArgs.READ_ONLY}`);
        console.log(`[TAGS] BuildArgs.WRITE_SERVER: ${BuildArgs.WRITE_SERVER}`);
    }

    if(BuildArgs.READ_ONLY || !BuildArgs.WRITE_SERVER) {
        if (BuildArgs.DEBUG) {
            console.log('[TAGS] Skipping tag file generation due to build flags');
        }
        return;
    }

    if (BuildArgs.DEBUG) {
        console.log(`[TAGS] Writing ${Object.keys(tags).length} tag files...`);
    }
    ipaths.coredata.tags.remove();
    Object.entries(tags).forEach(([key,value])=>{
        const tagFile = ipaths.coredata.tags.tagfile(key);
        console.log(`[TAGS] Writing tag file: ${tagFile.get()}`);
        tagFile.writeJson(value)
    });
    if (BuildArgs.DEBUG) {
        console.log('[TAGS] Tag file generation complete');
    }
});
