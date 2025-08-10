import { ModuleEndpoint } from "./Modules";
export declare namespace Snippets {
    class Snippet {
        constructor(name: string);
        name: string;
        description: string[];
        body: string[];
    }
    function parseText(content: string, removeComments: boolean, noEmptyTrail: boolean, indentArg?: string): Snippet[];
    function cleanSnippets(modules: ModuleEndpoint[]): any;
    function generateSnippets(modules: ModuleEndpoint[], removeComments: boolean, noEmptyTrail: boolean, indention?: string): void;
    function initialize(): void;
}
