export type TerminalColor = "BLACK" | "RED" | "GREEN" | "YELLOW" | "BLUE" | "MAGENTA" | "CYAN" | "WHITE";
export declare namespace termc {
    function col(value: string, fg?: TerminalColor, bg?: TerminalColor): string;
    function red(value: string): string;
    function blue(value: string): string;
    function green(value: string): string;
    function magenta(value: string): string;
    function yellow(value: string): string;
    function cyan(value: string): string;
}
