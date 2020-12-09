export class Position {
    readonly map: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly o: number;

    constructor(map: number, x: number, y: number, z: number, o: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.o = o;
        this.map = map;
    }
}

export function Pos(map: number, x: number, y: number, z: number, o: number) {
    return new Position(map,x,y,z,o);
}