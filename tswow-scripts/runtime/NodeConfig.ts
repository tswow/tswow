import { NodeConfigClass } from "../util/NodeConfig";
import { ipaths } from "../util/Paths";

export const NodeConfig = new NodeConfigClass(ipaths.node_conf.get());