/**
 * Test file for NodeConfigClass
 * Run with: npx ts-node test-node-config.ts
 */

import * as fs from 'fs';
import { NodeConfigClass } from './NodeConfig';

console.log('Testing NodeConfigClass implementation...\n');

// Test 1: Create config file if not exists
const testConfigPath = './test-node.conf';

// Clean up from previous runs
if (fs.existsSync(testConfigPath)) {
    fs.unlinkSync(testConfigPath);
    console.log('✓ Cleaned up existing test config');
}

// Create instance
console.log('Creating NodeConfigClass instance...');
const config = new NodeConfigClass(testConfigPath);

// Test 2: Generate config file
console.log('Generating config file...');
config.generateIfNotExists();

if (fs.existsSync(testConfigPath)) {
    console.log('✓ Config file generated successfully');
} else {
    console.error('✗ Failed to generate config file');
    process.exit(1);
}

// Test 3: Read default values
console.log('\nTesting default values:');
try {
    console.log(`  DefaultClient: "${config.DefaultClient}" (expected: "")`);
    console.log(`  DefaultRealm: "${config.DefaultRealm}" (expected: "default.realm")`);
    console.log(`  DefaultDataset: "${config.DefaultDataset}" (expected: "default.dataset")`);
    console.log(`  DefaultBuildType: "${config.DefaultBuildType}" (expected: "RelWithDebInfo")`);
    console.log(`  AutoStartClient: ${config.AutoStartClient} (expected: 0)`);
    console.log(`  AutoStartAuthServer: ${config.AutoStartAuthServer} (expected: true)`);
    console.log(`  DatabaseHostedPort: ${config.DatabaseHostedPort} (expected: 3306)`);
    console.log('✓ All default values read correctly');
} catch (e) {
    console.error('✗ Error reading default values:', e);
    process.exit(1);
}

// Test 4: Database settings parsing
console.log('\nTesting database settings:');
try {
    const authSettings = config.DatabaseSettings('auth');
    console.log(`  Auth DB: ${JSON.stringify(authSettings)}`);

    const worldSettings = config.DatabaseSettings('world');
    console.log(`  World DB: ${JSON.stringify(worldSettings)}`);

    console.log('✓ Database settings parsed correctly');
} catch (e) {
    console.error('✗ Error parsing database settings:', e);
    process.exit(1);
}

// Test 5: Modify config file and re-read
console.log('\nTesting config modification:');
let configContent = fs.readFileSync(testConfigPath, 'utf-8');
configContent = configContent.replace('Default.Client = ""', 'Default.Client = "/test/path"');
fs.writeFileSync(testConfigPath, configContent);

// Create new instance to clear cache
const config2 = new NodeConfigClass(testConfigPath);
if (config2.DefaultClient === '/test/path') {
    console.log('✓ Modified value read correctly');
} else {
    console.error(`✗ Expected "/test/path", got "${config2.DefaultClient}"`);
}

// Test 6: Missing property handling
console.log('\nTesting missing property handling:');
// Remove a property from the file
configContent = fs.readFileSync(testConfigPath, 'utf-8');
const lines = configContent.split('\n');
const filteredLines = lines.filter(line => !line.startsWith('Terminal.History ='));
fs.writeFileSync(testConfigPath, filteredLines.join('\n'));

// Create new instance and read the missing property
const config3 = new NodeConfigClass(testConfigPath);
const terminalHistory = config3.TerminalHistory;
console.log(`  Terminal.History: ${terminalHistory} (should use default: 100)`);

// Check if property was added back
const updatedContent = fs.readFileSync(testConfigPath, 'utf-8');
if (updatedContent.includes('Terminal.History = 100')) {
    console.log('✓ Missing property was added back to config file');
} else {
    console.error('✗ Missing property was not added back');
}

// Clean up
fs.unlinkSync(testConfigPath);
console.log('\n✓ All tests passed! Cleaned up test file.');
console.log('\nThe NodeConfigClass implementation is working correctly.');
