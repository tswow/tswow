/*
 * Test template installation script
 * This script copies test template files to a module directory
 */

const fs = require('fs');
const path = require('path');

function copyTemplate(sourcePath, targetPath, moduleName) {
    // Ensure target directory exists
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }

    // Copy files and replace template variables
    const files = [
        'package.json',
        'tsconfig.json',
        'test.conf',
        '.mocharc.json'
    ];

    files.forEach(file => {
        const sourceFile = path.join(sourcePath, file);
        const targetFile = path.join(targetPath, file);

        if (fs.existsSync(sourceFile)) {
            let content = fs.readFileSync(sourceFile, 'utf-8');
            // Replace template variables
            content = content.replace(/\{\{module_name\}\}/g, moduleName);
            fs.writeFileSync(targetFile, content);
        }
    });

    // Copy test directory
    const testsSourceDir = path.join(sourcePath, 'tests');
    const testsTargetDir = path.join(targetPath, 'tests');

    if (fs.existsSync(testsSourceDir)) {
        if (!fs.existsSync(testsTargetDir)) {
            fs.mkdirSync(testsTargetDir, { recursive: true });
        }

        const testFiles = fs.readdirSync(testsSourceDir);
        testFiles.forEach(file => {
            const sourceFile = path.join(testsSourceDir, file);
            const targetFile = path.join(testsTargetDir, file);

            let content = fs.readFileSync(sourceFile, 'utf-8');
            content = content.replace(/\{\{module_name\}\}/g, moduleName);
            fs.writeFileSync(targetFile, content);
        });
    }

    console.log(`Test template installed for module: ${moduleName}`);
}

// Export for use by other scripts
module.exports = { copyTemplate };

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: node install.js <source-path> <target-path> <module-name>');
        process.exit(1);
    }

    const [sourcePath, targetPath, moduleName] = args;
    copyTemplate(sourcePath, targetPath, moduleName);
}
