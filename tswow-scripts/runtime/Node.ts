import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";

// Use the current Node.js executable when possible, fallback to PATH resolution
export const NodeExecutable = typeof process !== 'undefined' && process.execPath
    ? process.execPath
    : (isWindows() ? ipaths.bin.node.node_exe.abs().get() : 'node')
export const NpxExecutable = isWindows() ? ipaths.bin.node.npx_exe.abs().get() : 'npx'
export const NpmExecutable = isWindows() ? ipaths.bin.node.npm_exe.abs().get() : 'npm'
