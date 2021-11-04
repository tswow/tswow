import { FileChangeModule } from "../util/FileChanges";
import { ipaths } from "../util/Paths";

export const TRANSPILER_CHANGES = new FileChangeModule(
    ipaths.bin.changes.changeFile('transpilers').get()
)