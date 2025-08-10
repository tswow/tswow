/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test utilities for TSWoW modules
 */
export class TestUtils {
    /**
     * Clean up temporary files created during tests
     */
    static cleanupTempFiles(...filePaths: string[]) {
        filePaths.forEach(filePath => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }

    /**
     * Assert that a file exists
     */
    static assertFileExists(filePath: string, message?: string) {
        assert.ok(fs.existsSync(filePath), message || `File should exist: ${filePath}`);
    }

    /**
     * Assert that a file does not exist
     */
    static assertFileNotExists(filePath: string, message?: string) {
        assert.ok(!fs.existsSync(filePath), message || `File should not exist: ${filePath}`);
    }

    /**
     * Assert that a directory exists
     */
    static assertDirectoryExists(dirPath: string, message?: string) {
        assert.ok(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory(),
                  message || `Directory should exist: ${dirPath}`);
    }

    /**
     * Create a temporary directory for testing
     */
    static createTempDir(prefix: string = 'tswow-test-'): string {
        const tempDir = fs.mkdtempSync(path.join(process.cwd(), prefix));
        return tempDir;
    }

    /**
     * Remove a directory and all its contents
     */
    static removeDir(dirPath: string) {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
        }
    }

    /**
     * Assert that a value is within a range
     */
    static assertWithinRange(value: number, min: number, max: number, message?: string) {
        assert.ok(value >= min && value <= max,
                  message || `Value ${value} should be between ${min} and ${max}`);
    }

    /**
     * Assert that an array contains a specific item
     */
    static assertArrayContains<T>(array: T[], item: T, message?: string) {
        assert.ok(array.includes(item),
                  message || `Array should contain item: ${item}`);
    }

    /**
     * Assert that an array has a specific length
     */
    static assertArrayLength<T>(array: T[], expectedLength: number, message?: string) {
        assert.strictEqual(array.length, expectedLength,
                          message || `Array should have length ${expectedLength}, got ${array.length}`);
    }

    /**
     * Wait for a specific amount of time (for async testing)
     */
    static async wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Assert that a promise rejects
     */
    static async assertRejects(promise: Promise<any>, message?: string): Promise<void> {
        try {
            await promise;
            assert.fail(message || 'Promise should have rejected');
        } catch (error) {
            // Expected to reject
        }
    }

    /**
     * Assert that a promise resolves
     */
    static async assertResolves(promise: Promise<any>, message?: string): Promise<void> {
        try {
            await promise;
        } catch (error) {
            assert.fail(message || `Promise should have resolved: ${error.message}`);
        }
    }
}

/**
 * Random test data generator
 */
export class TestRandom {
    private static seed = 12345;

    /**
     * Generate a random integer between min and max (inclusive)
     */
    static int(min: number = 0, max: number = 100): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        const rnd = this.seed / 233280;
        return Math.floor(rnd * (max - min + 1)) + min;
    }

    /**
     * Generate a random string of specified length
     */
    static string(length: number = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(this.int(0, chars.length - 1));
        }
        return result;
    }

    /**
     * Generate a random ID suitable for TSWoW objects
     */
    static id(): number {
        return this.int(100000, 999999);
    }

    /**
     * Pick a random element from an array
     */
    static pick<T>(array: T[]): T {
        return array[this.int(0, array.length - 1)];
    }

    /**
     * Generate a random boolean
     */
    static boolean(): boolean {
        return this.int(0, 1) === 1;
    }

    /**
     * Reset the random seed for reproducible tests
     */
    static resetSeed(seed: number = 12345) {
        this.seed = seed;
    }
}

/**
 * Database test helpers
 */
export class DBTestUtils {
    /**
     * Check if a test database is available
     */
    static isDatabaseAvailable(): boolean {
        // This would check for test database connectivity
        // Implementation would depend on the database setup
        return true; // Placeholder
    }

    /**
     * Reset test database to known state
     */
    static async resetTestDatabase(): Promise<void> {
        // Implementation would reset test database
        // This is a placeholder for the actual implementation
    }

    /**
     * Execute a test query safely
     */
    static async executeTestQuery(query: string): Promise<any> {
        // Implementation would execute query against test database
        // This is a placeholder for the actual implementation
        return {};
    }
}

/**
 * Module test helpers
 */
export class ModuleTestUtils {
    /**
     * Create a temporary test module
     */
    static createTestModule(name: string, endpoints: string[] = ['datascripts']): string {
        // Implementation would create a temporary module for testing
        // This is a placeholder for the actual implementation
        return path.join(process.cwd(), 'modules', name);
    }

    /**
     * Clean up a test module
     */
    static cleanupTestModule(modulePath: string): void {
        TestUtils.removeDir(modulePath);
    }

    /**
     * Assert that a module was created correctly
     */
    static assertModuleStructure(modulePath: string, endpoints: string[]): void {
        TestUtils.assertDirectoryExists(modulePath);
        endpoints.forEach(endpoint => {
            TestUtils.assertDirectoryExists(path.join(modulePath, endpoint));
        });
    }
}
