declare class Allocation {
    low: number;
    high: number;
    constructor(low: number, high: number);
}
export declare class Allocator {
    allocations: Allocation[];
    get length(): number;
    get totalIds(): number;
    print(prefix?: string): void;
    get(index: number): Allocation;
    contains(num: number): boolean;
    get min(): number;
    get max(): number;
    get fragmentation(): number;
    add(low: number, size: number): number;
}
export {};
