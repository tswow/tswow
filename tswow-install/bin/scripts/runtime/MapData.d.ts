import { BuildType } from '../util/BuildType';
import { Dataset } from './Dataset';
/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export declare namespace MapData {
    function dbc(dataset: Dataset, type?: BuildType): void;
    function map(dataset: Dataset, type?: BuildType, maps?: number[], tiles?: number[]): void;
    function vmap_extract(dataset: Dataset, type?: BuildType): void;
    function vmap_assemble(dataset: Dataset, type?: BuildType): void;
    function mmaps(dataset: Dataset, type?: BuildType, maps?: number[], tiles?: number[], threadCount?: number): void;
    function luaxml(dataset: Dataset): void;
    function initialize(): void;
}
