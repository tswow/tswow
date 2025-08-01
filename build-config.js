/**
 * This file generates or reads build.conf using the modern generateIfNotExists pattern.
 * It replaces the old template-copy approach with the same pattern used by node.conf
 */
const fs = require('fs');

function generateBuildConfigIfNotExists() {
    const configPath = './build.conf';

    if (fs.existsSync(configPath)) {
        // Config exists, read it
        const content = fs.readFileSync(configPath, 'utf-8');
        const buildDir = (content.match(/^BuildDirectory *= *"(.+?)"/m) || ['', '../tswow-build'])[1];
        const installDir = (content.match(/^InstallDirectory *= *"(.+?)"/m) || ['', '../tswow-install'])[1];
        const displayNames = (content.match(/^Terminal\.DisplayNames *= *(.+)/m) || ['', 'true'])[1];
        const displayTimestamps = (content.match(/^Terminal\.DisplayTimestamps *= *(.+)/m) || ['', 'true'])[1];

        return {
            buildDir,
            installDir,
            shouldDisplayNames: displayNames === 'true' || displayNames === '1',
            shouldDisplayTimestamps: displayTimestamps === 'true' || displayTimestamps === '1'
        };
    } else {
        // Config doesn't exist, generate it with proper sections and comments
        const defaultConfig = `################################################################################
# Build Configuration #
################################################################################

[Paths]

# Where build artifacts are stored during compilation
# Examples:
#   BuildDirectory = "../tswow-build"  # Default build directory
BuildDirectory = "../tswow-build"

# Where the built project is installed after compilation
# Examples:
#   InstallDirectory = "../tswow-install"  # Default installation directory
InstallDirectory = "../tswow-install"

[Terminal]

# Whether to show component names in terminal output
# Examples:
#   Terminal.DisplayNames = true  # Show names
#   Terminal.DisplayNames = false  # Hide names
Terminal.DisplayNames = true

# Whether to show timestamps in terminal output
# Examples:
#   Terminal.DisplayTimestamps = true  # Show timestamps
#   Terminal.DisplayTimestamps = false  # Hide timestamps
Terminal.DisplayTimestamps = true
`;

        fs.writeFileSync(configPath, defaultConfig);

        return {
            buildDir: '../tswow-build',
            installDir: '../tswow-install',
            shouldDisplayNames: true,
            shouldDisplayTimestamps: true
        };
    }
}

module.exports = generateBuildConfigIfNotExists();
