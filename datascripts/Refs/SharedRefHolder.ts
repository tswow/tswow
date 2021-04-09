export interface SharedRefHolder {
    setCloneRefs(clone: boolean): void;
    getCloneRefs(): boolean
}