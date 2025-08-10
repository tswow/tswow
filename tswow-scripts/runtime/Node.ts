import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";

// Helper function to quote paths containing spaces
function quotePath(path: string): string {
    return path.includes(' ') ? `"${path}"` : path;
}

// Use bundled node on Windows, system node on other platforms
export const NodeExecutable = isWindows() 
    ? quotePath(ipaths.bin.node.node_exe.abs().get())
    : 'node'
export const NpxExecutable = isWindows() 
    ? quotePath(ipaths.bin.node.npx_exe.abs().get())
    : 'npx'
export const NpmExecutable = isWindows() 
    ? quotePath(ipaths.bin.node.npm_exe.abs().get())
    : 'npm'
