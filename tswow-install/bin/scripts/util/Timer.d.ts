/**
 * Represents a lap on a timer with a specific tag.
 * A Timer can contain multiple laps with the same tag.
 */
interface Lap {
    tag: string;
    lapTime: number;
}
/**
 * Represents a timer that starts when created.
 * Optionally supports taking multiple 'laps' with tags for more complex operations.
 */
export declare class Timer {
    private constructor();
    startTime: number;
    laps: Lap[];
    /**
     * Starts and returns a new Timer object.
     */
    static start(): Timer;
    /**
     * Creats a new lap
     * @param tag
     */
    lap(tag: string): void;
    /**
     * Times the amount of seconds since the last lap with the specified tag, or since the timer began.
     * @param decimals How many decimals should be in the output seconds.
     * @param tag Which tag, if any, we should time against.
     */
    timeSec(decimals?: number, tag?: string): string;
    /**
     * Times the amount of seconds since the last lap with the specified tag, or since the timer began.
     * @param tag Which tag, if any, we should time against.
     */
    time(tag?: string): number;
    timeRestart(): number;
}
export {};
