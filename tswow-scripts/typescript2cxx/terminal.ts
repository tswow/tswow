export namespace terminal {
    export function error(message: string) {
        console.error(`\x1b[31m${message}\x1b[0m`)
    }

    export function cyan(message: string) {
        console.log(`\x1b[36m${message}\x1b[0m`)
    }
}
