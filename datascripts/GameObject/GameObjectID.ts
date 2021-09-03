export const all_gobj_types : any = {}
export function GameObjectID(id: number) {
    return function(target: any) {
        all_gobj_types[id] = target;
    }
}
