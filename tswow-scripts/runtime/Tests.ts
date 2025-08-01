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

import { ConfigFile, Property, Section } from "../util/ConfigFile";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { termCustom } from "../util/TerminalCategories";
import { BuildCommand, CleanCommand, ListCommand } from "./CommandActions";
import { Module, ModuleEndpoint } from "./Modules";
import { NodeExecutable, NpmExecutable, NpxExecutable } from "./Node";

const test_example_ts = (name: string) =>
`import * as assert from 'assert';

describe('${name} Tests', () => {
    describe('Basic Tests', () => {
        it('should pass a simple assertion', () => {
            assert.strictEqual(1 + 1, 2);
        });

        it('should handle async operations', async () => {
            const result = await Promise.resolve('test');
            assert.strictEqual(result, 'test');
        });
    });

    describe('Module Structure', () => {
        it('should have access to module utilities', () => {
            // Example of testing module structure
            // Add your module-specific tests here
            assert.ok(true, 'Module structure test placeholder');
        });
    });
});`;

const test_package_json = (name: string) => ({
    'name': `${name}-tests`,
    'version': '1.0.0',
    'description': `Test suite for ${name}`,
    'scripts': {
        'test': 'mocha',
        'test:watch': 'mocha --watch'
    },
    'devDependencies': {
        'mocha': '^11.7.1'
    }
});

const test_tsconfig = {
    "compilerOptions": {
        "target": "es2018",
        "module": "commonjs",
        "lib": ["es2018"],
        "outDir": "./bin",
        "rootDir": "./",
        "strict": false,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "sourceMap": true,
        "declaration": true,
        "declarationMap": true,
        "experimentalDecorators": true,
        "useDefineForClassFields": false,
        "paths": {
            "wow/wotlk": ["../../bin/scripts/wow/wotlk"],
            "wow/wotlk/*": ["../../bin/scripts/wow/wotlk/*"]
        }
    },
    "include": [
        "tests/**/*"
    ],
    "exclude": [
        "bin/**/*"
    ]
};

const test_mocharc = {
    "extension": ["js"],
    "spec": "bin/tests/**/*.js",
    "require": [],
    "recursive": true,
    "reporter": "spec",
    "timeout": 10000,
    "exit": true,
    "colors": true
};

export class TestsConfig extends ConfigFile {
    protected description(): string {
        return "Test settings";
    }

    @Section('Test')

    @Property({
        name: 'Test.Framework',
        description: 'Test framework to use',
        examples: [
            ['mocha', 'Use Mocha test framework']
        ]
    })
    Framework: string = this.undefined();

    @Property({
        name: 'Test.Timeout',
        description: 'Test timeout in milliseconds',
        examples: [
            [5000, 'Tests timeout after 5 seconds'],
            [10000, 'Tests timeout after 10 seconds']
        ]
    })
    Timeout: number = this.undefined();

    @Property({
        name: 'Test.Dependencies',
        description: 'Test dependencies',
        examples: [
            [[], 'No test dependencies'],
            [['other-module'], 'other-module tests will run before this one']
        ]
    })
    protected _dependencies: string[] = this.undefined();

    get Dependencies() {
        return this.getArrayAll(this._dependencies, []);
    }
}

export class Tests {
    mod: ModuleEndpoint;
    config: TestsConfig;

    get path() {
        return this.mod.path.tests;
    }

    logName() {
        return termCustom('tests', this.mod.fullName);
    }

    initialize() {
        this.path.mkdir();

        // Create test directories
        this.path.tests.mkdir();
        this.path.bin.mkdir();
        this.path.bin.tests.mkdir();

        // Create example test if none exists
        if (!this.path.tests.example_test_ts.exists()) {
            this.path.tests.example_test_ts.write(test_example_ts(this.mod.subId));
        }

        // Copy global types
        ipaths.bin.include.global_d_ts.copy(this.path.global_d_ts);

        // Create configuration files
        this.path.tsconfig_json.writeJson(test_tsconfig);
        this.path.package_json.writeJson(test_package_json(this.mod.fullName));
        this.path.mocharc_json.writeJson(test_mocharc);

        if (!this.path.test_conf.exists()) {
            this.config.generateIfNotExists();
        }

        // Install test dependencies
        this.installDependencies();

        return this;
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
        this.config = new TestsConfig(this.path.test_conf.get());
    }

    exists() {
        return this.path.exists();
    }

    installDependencies() {
        term.log(this.logName(), `Installing test dependencies...`);
        try {
            wsys.execIn(this.path.get(), `${NpmExecutable} install`, 'inherit');
        } catch (err) {
            term.error(this.logName(), `Failed to install test dependencies`);
        }
    }

    compile() {
        term.debug('tests', `Compiling tests at ${this.path.abs().get()}`);
        try {
            wsys.execIn(this.path.get(), `${NpxExecutable} tsc`, 'inherit');
        } catch (err) {
            term.error(this.logName(), `Failed to compile tests`);
            throw err;
        }
    }

    run() {
        term.log(this.logName(), `Running tests...`);
        try {
            this.compile();
            wsys.execIn(this.path.get(), `${NpmExecutable} test`, 'inherit');
        } catch (err) {
            term.error(this.logName(), `Tests failed`);
            throw err;
        }
    }

    static all() {
        return Module.endpoints()
            .filter(x => x.path.tests.exists())
            .map(x => new Tests(x));
    }

    static create(mod: ModuleEndpoint) {
        return new Tests(mod).initialize();
    }

    static initialize() {
        term.debug('misc', `Initializing tests`);

        BuildCommand.addCommand(
            'tests',
            'modules',
            'Run tests for specified modules',
            args => {
                const mods = args.length === 0
                    ? Module.endpoints().filter(x => x.path.tests.exists())
                    : Module.endpoints().filter(x => args.includes(x.fullName) && x.path.tests.exists());

                mods.forEach(mod => {
                    const tests = new Tests(mod);
                    tests.run();
                });
            }
        ).addAlias('test');

        ListCommand.addCommand(
            'tests',
            'modules?',
            'List available test modules',
            args => {
                const testModules = Module.endpoints().filter(x => x.path.tests.exists());
                testModules.forEach(mod => {
                    term.log('tests', mod.fullName);
                });
            }
        ).addAlias('test');

        CleanCommand.addCommand(
            'tests',
            'modules',
            'Clean test build artifacts',
            args => {
                const mods = args.length === 0
                    ? Module.endpoints().filter(x => x.path.tests.exists())
                    : Module.endpoints().filter(x => args.includes(x.fullName) && x.path.tests.exists());

                mods.forEach(mod => {
                    term.log('tests', `Cleaning ${mod.path.tests.bin}`);
                    mod.path.tests.bin.remove();
                });
                term.log('tests', `Cleaned ${mods.length} test builds`);
            }
        ).addAlias('test');
    }
}
