export declare let trace: boolean;
/**
* Functions concerning the tswow interactive prompts.
*/
export declare namespace commands {
    /**
    * Represents a command, or group of commands,
    * that a user can invoke in the tswow interactive prompt.
    *
    * A command can contain a function to invoke when called,
    * or contain named child commands, or both.
    */
    class Command {
        readonly handler?: (args: string[]) => void;
        readonly children: {
            [key: string]: Command;
        };
        readonly description?: string;
        readonly argDesc?: string;
        readonly name: string;
        readonly aliases: string[];
        readonly parent?: Command;
        constructor(name: string, argDesc?: string, description?: string, onCommand?: (args: string[]) => void, parent?: Command);
        /**
        * The full name of this command (the full command a user has to type to invoke it)
        */
        get fullname(): string;
        /**
        * Registers a child command that can be executed when following this command.
        * @param name - Name of the root command
        * @param argDesc - Description of the argument the command expects
        * @param help - Description of what the command does.
        * @param callback - The function to call when the command is typed.
        *
        * @example
        *     addCommand('printHi','','Prints string "hello world"',async()=>console.log('Hello world!'))
        *     addCommand('printArgs','args[]','Prints arguments to console',async(args)=>conosle.log(args.join(' ')))
        */
        addCommand(name: string, argDesc?: string, description?: string, handler?: (args: string[]) => any): Command;
        /**
         * Removes a command from this compound
         * @param name
         */
        removeCommand(name: string): void;
        addAlias(alias: string): this;
        /**
        * Finds a command from an input chain
        * @param input
        */
        findCommand(input: string[]): Command;
        /**
        * Invokes this commmand with some provided arguments.
        *
        * If this command contains no function and no children matching the first argument, an exception is thrown.
        *
        * If this command contains a child matching the first argument,
        * we call the `handle` method on the child object and won't invoke our own function.
        *
        * For example, the command `a b` will first check if command `a` has a child `b`,
        * and only if it doesn't call `a` directly with `b` as an argument.
        *
        * @param args
        */
        handle(args: string[]): Promise<void>;
    }
    function getRootCommand(): Command;
    function sendCommand(input: string): Promise<void>;
    /**
    * Enters the tswow interactive program, allowing the user to type in commands into the window and executing them.
    */
    function enterLoop(callback?: (input: string) => void): Promise<void>;
    /**
    * Registers a root command that can be directly executed when typed by a user.
    * @param name - Name of the root command
    * @param argDesc - Description of the argument the command expects
    * @param help - Description of what the command does.
    * @param callback - The function to call when the command is typed.
    *
    * @example
    *     addCommand('printHi','','Prints string "hello world"',async()=>console.log('Hello world!'))
    *     addCommand('printArgs','args[]','Prints arguments to console',async(args)=>conosle.log(args.join(' ')))
    */
    function addCommand(name: string, argDesc?: string, help?: string, callback?: (args: string[]) => any): Command;
}
