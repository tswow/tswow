class DBEntry {}

abstract class DBArrayEntry {
    MarkDirty() {
        this.__isDirty = true;
    }
    Delete() {
        this.__isRemoved = true;
    }
    IsDeleted() {
        return this.__isRemoved;
    }
    IsDirty() {
        return this.__isDirty;
    }

    abstract _Delete(): void;
    abstract Save(): void;

    __index = 0;
    __isRemoved = false;
    __isDirty = false;
    __container?: DBContainer<any>
}

class DBContainer<T extends DBArrayEntry> {
    protected values: T[] = []

    Size() {
        return this.nonDeletedValues().length;
    }

    TotalSize() {
        return this.values.length;
    }

    // @alsoin LuaORM.ts
    __Add(value: T) {
        this.values.push(value);
    }

    Add(value: T) {
        if(value.__container) {
            throw new Error(`Attempted to add DBArrayEntry to multiple containers`)
        }
        value.__isRemoved = false;
        value.__isDirty = true;
        value.__container = this;
        this.values.push(value)
        return value;
    }

    Save() {
        if(this.values.length === 0) {
            return;
        }

        for(let i=0;i<this.values.length;) {
            let val = this.values[i];
            if(val.IsDeleted()) {
                if(val.__index > 0) {
                    val._Delete();
                }
                this.values.splice(i,1);
            } else {
                if(val.IsDirty()) {
                    val.Save();
                    val.__isDirty = false;
                }
                ++i;
            }
        }
    }

    private nonDeletedValues() {
        return this.values.filter(x=>!x.IsDeleted());
    }

    forEach(callback: (value: T) => void) {
        this.nonDeletedValues().forEach(x=>callback(x));
    }

    reduce<M>(callback: (v: M, value: T) => M, init: M) {
        return this.nonDeletedValues().reduce((v,value)=>callback(v,value), init);
    }

    find(callback: (value: T) => boolean) {
        return this.nonDeletedValues().find((value)=>callback(value));
    }

    ToArray() {
        return this.nonDeletedValues();
    }
}

function CreateDBContainer() {
    return new DBContainer<any>();
}