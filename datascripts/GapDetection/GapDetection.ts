export function findGaps(
      name: string
    , tableName: string
    , start: number
    , values: number[]
    , additional: (cur: number, last: number)=>boolean = ()=>false
) {
    values.reduce((p,c)=>{
        if(!(additional(c,p)) && c !== p+1) {
            console.error
            (
                `\x1b[31m`
                + `Error: Hole detected in ${name} (${tableName}) list:`
                + ` ${p} -> ${c}\n\n`
                + `This likely means you've removed a ${name}`
                + ` from your scripts and added another one.\n\n`
                + `For strategies to resolve this issue, see `
                + `https://tswow.github.io/tswow-wiki/documentation/ids/#persistent-allocation`
                + `\x1b[0m\n`
            )
            process.exit(1);
        }
        return c;
    } , start)
}