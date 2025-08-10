import { FilePath } from './FileTree';
import { TerminalCategory } from './TerminalCategories';
export declare function watchTsc(nodeExecutable: string, tscEntry: string, dir: FilePath, name: TerminalCategory): void;
export declare function destroyTSWatcher(dir: string): Promise<void>;
export declare function clearTscWatchers(): Promise<void[]>;
export declare function compileTsc(dir: string): void;
