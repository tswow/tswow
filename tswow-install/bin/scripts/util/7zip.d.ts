export declare namespace SevenZip {
    function extract(sevenZipPath: string, archive: string, out: string): void;
    function makeArchive(sevenZipPath: string, zipPath: string, directoryIn: string[]): void;
}
