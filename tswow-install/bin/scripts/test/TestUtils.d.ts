/**
 * Test utilities for TSWoW modules
 */
export declare class TestUtils {
    /**
     * Clean up temporary files created during tests
     */
    static cleanupTempFiles(...filePaths: string[]): void;
    /**
     * Assert that a file exists
     */
    static assertFileExists(filePath: string, message?: string): void;
    /**
     * Assert that a file does not exist
     */
    static assertFileNotExists(filePath: string, message?: string): void;
    /**
     * Assert that a directory exists
     */
    static assertDirectoryExists(dirPath: string, message?: string): void;
    /**
     * Create a temporary directory for testing
     */
    static createTempDir(prefix?: string): string;
    /**
     * Remove a directory and all its contents
     */
    static removeDir(dirPath: string): void;
    /**
     * Assert that a value is within a range
     */
    static assertWithinRange(value: number, min: number, max: number, message?: string): void;
    /**
     * Assert that an array contains a specific item
     */
    static assertArrayContains<T>(array: T[], item: T, message?: string): void;
    /**
     * Assert that an array has a specific length
     */
    static assertArrayLength<T>(array: T[], expectedLength: number, message?: string): void;
    /**
     * Wait for a specific amount of time (for async testing)
     */
    static wait(ms: number): Promise<void>;
    /**
     * Assert that a promise rejects
     */
    static assertRejects(promise: Promise<any>, message?: string): Promise<void>;
    /**
     * Assert that a promise resolves
     */
    static assertResolves(promise: Promise<any>, message?: string): Promise<void>;
}
/**
 * Random test data generator
 */
export declare class TestRandom {
    private static seed;
    /**
     * Generate a random integer between min and max (inclusive)
     */
    static int(min?: number, max?: number): number;
    /**
     * Generate a random string of specified length
     */
    static string(length?: number): string;
    /**
     * Generate a random ID suitable for TSWoW objects
     */
    static id(): number;
    /**
     * Pick a random element from an array
     */
    static pick<T>(array: T[]): T;
    /**
     * Generate a random boolean
     */
    static boolean(): boolean;
    /**
     * Reset the random seed for reproducible tests
     */
    static resetSeed(seed?: number): void;
}
/**
 * Database test helpers
 */
export declare class DBTestUtils {
    /**
     * Check if a test database is available
     */
    static isDatabaseAvailable(): boolean;
    /**
     * Reset test database to known state
     */
    static resetTestDatabase(): Promise<void>;
    /**
     * Execute a test query safely
     */
    static executeTestQuery(query: string): Promise<any>;
}
/**
 * Module test helpers
 */
export declare class ModuleTestUtils {
    /**
     * Create a temporary test module
     */
    static createTestModule(name: string, endpoints?: string[]): string;
    /**
     * Clean up a test module
     */
    static cleanupTestModule(modulePath: string): void;
    /**
     * Assert that a module was created correctly
     */
    static assertModuleStructure(modulePath: string, endpoints: string[]): void;
}
