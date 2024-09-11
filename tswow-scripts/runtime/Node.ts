import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";

export const NodeExecutable = isWindows() ? ipaths.bin.node.node_exe.abs().get() : 'node'