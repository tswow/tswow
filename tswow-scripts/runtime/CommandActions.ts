import { commands } from "../util/Commands";

export const BuildCommand = commands.addCommand('build', '', 'Builds various TSWoW components (datascripts, livescripts, addons, etc.)')
export const CreateCommand = commands.addCommand('create', '', 'Creates new TSWoW components (modules, datasets, realms, etc.)')
export const ListCommand = commands.addCommand('list', '', 'Lists available TSWoW components and configurations')
export const StartCommand = commands.addCommand('start', '', 'Starts TSWoW services (realms, clients, authserver)')
export const StopCommand = commands.addCommand('stop', '', 'Stops running TSWoW services')
export const SendCommand = commands.addCommand('send', '', 'Sends commands to running TSWoW services')
export const CleanCommand = commands.addCommand('clean', '', 'Removes build artifacts and cache files');
