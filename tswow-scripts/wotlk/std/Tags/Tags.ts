import { finish } from "../../../data";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { BuildArgs, ipaths } from "../../../data/Settings";

const reverse: {[key: number]: [string,string][]} = {}
const tags: {[key: string]: number[]} = {}
const uniqueTags: {[key: string]: boolean} = {}

function fullTagName(mod: string, name: string) {
    return `${mod}.${name}`
}

function AddTag(mod: string, name: string, id: number) {
    let fullTag = fullTagName(mod,name);
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

    add(mod: string, id: string) {
        AddTag(mod,id,this.id);
        return this.owner;
    }

    addUnique(mod: string, id: string) {
        AddUniqueTag(mod,id,this.id);
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
    if(BuildArgs.READ_ONLY || !BuildArgs.WRITE_SERVER) return;
    ipaths.coredata.tags.remove();
    Object.entries(tags).forEach(([key,value])=>{
        ipaths.coredata.tags.tagfile(key).writeJson(value)
    });
});