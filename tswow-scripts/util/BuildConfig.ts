import { ConfigFile, Property, Section } from "./ConfigFile";

export class BuildConfigClass extends ConfigFile {
    protected description(): string {
        return "Build Configuration"
    }

    @Section('Paths')

    @Property({
        name: 'BuildDirectory'
      , description: 'Where build artifacts are stored during compilation'
      , examples: [['../tswow-build','Default build directory']]
    })
    BuildDirectory: string = '../tswow-build'

    @Property({
        name: 'InstallDirectory'
      , description: 'Where the built project is installed after compilation'
      , examples: [['../tswow-install','Default installation directory']]
    })
    InstallDirectory: string = '../tswow-install'

    @Section('Terminal')

    @Property({
        name: 'Terminal.DisplayNames'
      , description: 'Whether to show component names in terminal output'
      , examples: [[true,'Show names'], [false,'Hide names']]
    })
    TerminalDisplayNames: boolean = true

    @Property({
        name: 'Terminal.DisplayTimestamps'
      , description: 'Whether to show timestamps in terminal output'
      , examples: [[true,'Show timestamps'], [false,'Hide timestamps']]
    })
    TerminalDisplayTimestamps: boolean = true
}
