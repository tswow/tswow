export class BoundingBox {
    minX: number;
    minY: number;
    minZ: number;

    maxX: number;
    maxY: number;
    maxZ: number;

    constructor(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number) {
        this.minX = minX;
        this.minY = minY;
        this.minZ = minZ;
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxZ = maxZ;
    }
}