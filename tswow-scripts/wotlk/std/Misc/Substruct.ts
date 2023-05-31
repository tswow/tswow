import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";

export class Substruct<T,O> extends CellSystem<T>
{
    @Transient
    protected realOwner: O;
    constructor(owner: T, realOwner: O)
    {
        super(owner);
        this.realOwner = realOwner;
    }

    injectThis(self: any)
    {
        this.owner = self;
    }
}