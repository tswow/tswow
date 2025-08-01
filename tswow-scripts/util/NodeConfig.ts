import { BuildType } from "../util/BuildType";
import * as fs from 'fs';
import * as path from 'path';

export interface DatabaseSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export type DatabaseType = 'world' | 'auth' | 'characters' | 'world_source';

interface ConfigProperty {
    name: string;
    description: string;
    defaultValue: any;
    examples?: [any, string][];
    important?: string;
}

interface ConfigSection {
    name: string;
    description?: string;
    properties: ConfigProperty[];
}

interface ConfigSchema {
    description: string;
    sections: ConfigSection[];
}

abstract class ModernConfigFile {
    protected readonly filename: string;
    protected abstract getSchema(): ConfigSchema;
    private cachedValues: Map<string, any> = new Map();

    constructor(filename: string) {
        this.filename = filename;
    }

    protected getValue<T>(propertyName: string): T {
        if (this.cachedValues.has(propertyName)) {
                return this.cachedValues.get(propertyName) as T;
        }

        const schema = this.getSchema();
        let defaultValue: any = undefined;

        for (const section of schema.sections) {
            for (const prop of section.properties) {
                if (prop.name === propertyName) {
                    defaultValue = prop.defaultValue;
                    break;
                }
            }
            if (defaultValue !== undefined) break;
        }

        if (defaultValue === undefined) {
            throw new Error(`Property ${propertyName} not found in schema`);
        }

        let value = defaultValue;

        if (fs.existsSync(this.filename)) {
            const content = fs.readFileSync(this.filename, 'utf-8');
            const lines = content.split('\n');

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith(propertyName + ' =')) {
                    const valueStr = trimmed.substring((propertyName + ' =').length).trim();
                    value = this.parseValue(valueStr, typeof defaultValue);
                    break;
                }
            }
        }

        this.cachedValues.set(propertyName, value);
        this.ensurePropertyInFile(propertyName, value);
        return value as T;
    }

    private parseValue(valueStr: string, expectedType: string): any {
        if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
            return valueStr.substring(1, valueStr.length - 1);
        }

        if (expectedType === 'boolean') {
            return valueStr === 'true';
        }

        if (expectedType === 'number') {
            return parseInt(valueStr);
        }

        if (expectedType === 'object' && valueStr.startsWith('[')) {
            return JSON.parse(valueStr);
        }

        return valueStr;
    }

    private ensurePropertyInFile(propertyName: string, value: any): void {
        if (!fs.existsSync(this.filename)) {
            return;
        }

        const content = fs.readFileSync(this.filename, 'utf-8');
        const lines = content.split('\n');

        let found = false;
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith(propertyName + ' =')) {
                found = true;
                break;
            }
        }

        if (!found) {
            let valueStr: string;
            if (typeof value === 'string') {
                valueStr = `"${value}"`;
            } else if (typeof value === 'object') {
                valueStr = JSON.stringify(value);
            } else {
                valueStr = String(value);
            }

            const newLine = `${propertyName} = ${valueStr}`;
            const updatedContent = content + '\n' + newLine;
            fs.writeFileSync(this.filename, updatedContent);
        }
    }

    public generateIfNotExists(): void {
        if (fs.existsSync(this.filename)) {
            return;
        }

        const schema = this.getSchema();
        const dir = path.dirname(this.filename);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        let content = `# ${schema.description}\n\n`;

        for (const section of schema.sections) {
            content += `# ${section.name}\n`;
            if (section.description) {
                content += `# ${section.description}\n`;
            }
            content += '\n';

            for (const prop of section.properties) {
                content += `# ${prop.description}\n`;
                if (prop.important) {
                    content += `# Important: ${prop.important}\n`;
                }
                if (prop.examples) {
                    content += `# Examples:\n`;
                    for (const [example, desc] of prop.examples) {
                        content += `#   ${prop.name} = ${typeof example === 'string' ? `"${example}"` : JSON.stringify(example)}`;
                        if (desc) content += ` # ${desc}`;
                        content += '\n';
                    }
                }

                let valueStr: string;
                if (typeof prop.defaultValue === 'string') {
                    valueStr = `"${prop.defaultValue}"`;
                } else if (typeof prop.defaultValue === 'object') {
                    valueStr = JSON.stringify(prop.defaultValue);
                } else {
                    valueStr = String(prop.defaultValue);
                }

                content += `${prop.name} = ${valueStr}\n\n`;
            }
        }

        fs.writeFileSync(this.filename, content);
    }
}

export class NodeConfigClass extends ModernConfigFile {
    private readonly buildType: string;

    constructor(filename: string, buildType?: string) {
        super(filename);
        this.buildType = buildType || 'RelWithDebInfo';
    }

    protected getSchema(): ConfigSchema {
        return {
            description: "Installation Configuration",
            sections: [
                {
                    name: "Defaults",
                    properties: [
                        {
                            name: "Default.Client",
                            description: "The client that is automatically selected if none is specified in the current dataset",
                            important: "No spaces allowed!",
                            examples: [["C:\\wowdev\\client", ""]],
                            defaultValue: ""
                        },
                        {
                            name: "Default.Realm",
                            description: "The realm automatically selected in commands if none other is specified",
                            examples: [["default.realm", ""]],
                            defaultValue: "default.realm"
                        },
                        {
                            name: "Default.Dataset",
                            description: "The dataset automatically selected in commands if none other is specified",
                            examples: [["default.dataset", ""]],
                            defaultValue: "default.dataset"
                        },
                        {
                            name: "Default.BuildType",
                            description: "The build type automatically selected in commands if none other is specified",
                            examples: [
                                ["RelWithDebInfo", "Has debugging symbols. Rarely slower than release, but needs individual profiling."],
                                ["Release", "No debugging symbols, but worthless error logs."],
                                ["Debug", "All debugging symbols, but (very) slow. Only recommended when debugging a specific problem"]
                            ],
                            defaultValue: this.buildType
                        }
                    ]
                },
                {
                    name: "AutoStart",
                    properties: [
                        {
                            name: "AutoStart.Client",
                            description: "How many of the default client that should be started every startup",
                            examples: [[1, ""]],
                            defaultValue: 0
                        },
                        {
                            name: "AutoStart.AuthServer",
                            description: "Whether the authserver should be automatically started",
                            examples: [[true, ""]],
                            defaultValue: true
                        },
                        {
                            name: "AutoRestart.AuthServer",
                            description: "Whether the authserver should be automatically restarted if it crashes.",
                            examples: [[false, ""]],
                            defaultValue: false
                        },
                        {
                            name: "AutoStart.LauncherServer",
                            description: "Whether the launcher server should be automatically started",
                            examples: [[true, ""]],
                            defaultValue: true
                        },
                        {
                            name: "AutoStart.Realms",
                            description: "What clients should be automatically started",
                            examples: [
                                [["default.realm"], "Default realm"],
                                [[], "no realm"]
                            ],
                            defaultValue: []
                        }
                    ]
                },
                {
                    name: "Database",
                    properties: [
                        {
                            name: "Database.UsePooling",
                            description: "If the MySQL connector in datascripts should use pooling. Sometimes necessary on slower systems to avoid connection loss, but causes issues for others.",
                            examples: [[false, ""]],
                            defaultValue: false
                        },
                        {
                            name: "Database.MySQLExecutable",
                            description: "Location of an external MySQL executable. Set this if you plan to use an external database on Windows",
                            examples: [["", ""]],
                            defaultValue: ""
                        },
                        {
                            name: "Database.HostedPort",
                            description: "What port to host MySQL on, if any. Windows-only",
                            examples: [[3306, ""], [0, "Will not host a MySQL process"]],
                            defaultValue: 3306
                        },
                        {
                            name: "Database.Prefix",
                            description: "Prefix used for all tswow databases",
                            examples: [
                                ["", "no prefix"],
                                ["example", "All databases will start with \"example.\""]
                            ],
                            defaultValue: ""
                        },
                        {
                            name: "Database.WorldSource",
                            description: "This is the database used to read datascripts.",
                            examples: [["localhost;3306;tswow;password", ""]],
                            defaultValue: "localhost;3306;tswow;password"
                        },
                        {
                            name: "Database.WorldDest",
                            description: "This is the database used by the worldserver. Datascripts writes to this database.",
                            examples: [["localhost;3306;tswow;password", ""]],
                            defaultValue: "localhost;3306;tswow;password"
                        },
                        {
                            name: "Database.Auth",
                            description: "This is the database used by the auth server.",
                            examples: [["localhost;3306;tswow;password", ""]],
                            defaultValue: "localhost;3306;tswow;password"
                        },
                        {
                            name: "Database.Characters",
                            description: "This is the database storing dynamic game data, such as characters.",
                            examples: [["localhost;3306;tswow;password", ""]],
                            defaultValue: "localhost;3306;tswow;password"
                        }
                    ]
                },
                {
                    name: "Launcher",
                    properties: [
                        {
                            name: "Launcher.PatchChunkSize",
                            description: "How large individual download patch chunks should be",
                            examples: [[33554432, "32mb"]],
                            defaultValue: 33554432
                        }
                    ]
                },
                {
                    name: "Misc",
                    properties: [
                        {
                            name: "Terminal.History",
                            description: "How many lines of terminal input should be stored",
                            examples: [[100, ""]],
                            defaultValue: 100
                        },
                        {
                            name: "Terminal.DisplayTimestamps",
                            description: "Whether terminal output should include timestamps",
                            examples: [[true, ""]],
                            defaultValue: true
                        },
                        {
                            name: "Terminal.DisplayNames",
                            description: "Whether terminal output should include submodule names",
                            examples: [[true, ""]],
                            defaultValue: true
                        },
                        {
                            name: "Positions.WriteToClipboard",
                            description: "Whether .at command output is written to the clipboard",
                            examples: [[true, ""]],
                            defaultValue: true
                        }
                    ]
                }
            ]
        };
    }

    // Property getters
    get DefaultClient(): string {
        return this.getValue<string>("Default.Client");
    }

    get DefaultRealm(): string {
        return this.getValue<string>("Default.Realm");
    }

    get DefaultDataset(): string {
        return this.getValue<string>("Default.Dataset");
    }

    get DefaultBuildType(): BuildType {
        return this.getValue<BuildType>("Default.BuildType");
    }

    get AutoStartClient(): number {
        return this.getValue<number>("AutoStart.Client");
    }

    get AutoStartAuthServer(): boolean {
        return this.getValue<boolean>("AutoStart.AuthServer");
    }

    get AutoRestartAuthServer(): boolean {
        return this.getValue<boolean>("AutoRestart.AuthServer");
    }

    get AutoStartLauncherServer(): boolean {
        return this.getValue<boolean>("AutoStart.LauncherServer");
    }

    get AutoStartRealms(): string[] {
        return this.getValue<string[]>("AutoStart.Realms");
    }

    get UsePooling(): boolean {
        return this.getValue<boolean>("Database.UsePooling");
    }

    get MySQLExecutable(): string {
        return this.getValue<string>("Database.MySQLExecutable");
    }

    get DatabaseHostedPort(): number {
        return this.getValue<number>("Database.HostedPort");
    }

    get DatabasePrefix(): string {
        return this.getValue<string>("Database.Prefix");
    }

    get DatabaseWorldSource(): string {
        return this.getValue<string>("Database.WorldSource");
    }

    get DatabaseWorldDest(): string {
        return this.getValue<string>("Database.WorldDest");
    }

    get DatabaseAuth(): string {
        return this.getValue<string>("Database.Auth");
    }

    get DatabaseCharacters(): string {
        return this.getValue<string>("Database.Characters");
    }

    get LauncherPatchChunkSize(): number {
        return this.getValue<number>("Launcher.PatchChunkSize");
    }

    get TerminalHistory(): number {
        return this.getValue<number>("Terminal.History");
    }

    get TerminalTimestamps(): boolean {
        return this.getValue<boolean>("Terminal.DisplayTimestamps");
    }

    get TerminalNames(): boolean {
        return this.getValue<boolean>("Terminal.DisplayNames");
    }

    get WritePosToClipboard(): boolean {
        return this.getValue<boolean>("Positions.WriteToClipboard");
    }

    // Database methods
    DatabaseString(type: DatabaseType, name?: string): string {
        let settings = this.DatabaseSettings(type, name);
        return `${settings.host};${settings.port};${settings.user};${settings.password};${settings.database}`;
    }

    DatabaseSettings(type: DatabaseType, name?: string): DatabaseSettings {
        const makeSettings = (str: string, suffix?: string): DatabaseSettings => {
            const [host, port, user, password] = str.split(';');
            let prefix = this.DatabasePrefix.length > 0
                ? `${this.DatabasePrefix}.`
                : '';
            name = name
                ? `${name}.`
                : '';
            return {
                host,
                port: parseInt(port),
                user,
                password,
                database: `${prefix}${name}${suffix}`
            };
        };

        switch (type) {
            case 'auth':
                return makeSettings(this.DatabaseAuth, 'auth');
            case 'characters':
                return makeSettings(this.DatabaseCharacters, 'characters');
            case 'world':
                return makeSettings(this.DatabaseWorldDest, 'world.dest');
            case 'world_source':
                return makeSettings(this.DatabaseWorldSource, 'world.source');
        }
    }
}
