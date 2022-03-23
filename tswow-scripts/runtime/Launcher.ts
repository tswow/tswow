
export class Launcher {
    static initialize() {
        /*
        if(!NodeConfig.LauncherEnabled) {
            return;
        }

        let packagestr = "{}"
        const findDatasets = ()=> {
            let packages = {}
            let datasets = NodeConfig.LauncherDatasets.includes('*')
                ? Dataset.all()
                : Identifier.getDatasets(NodeConfig.LauncherDatasets,'MATCH_ALL')

            datasets.forEach(dataset=>{
                let meta = ipaths.package.join(`${dataset.fullName}.meta.json`)
                if(meta.exists()) {
                    packages[dataset.fullName] = meta.toFile().readJson({})
                }
            });
            packagestr = JSON.stringify(packages);
        }
        findDatasets();
        // todo: when to re-query for this?

        http.createServer((req,res)=>{
            if(req.url.endsWith('meta')) {
                res.end(packagestr);
            }
            res.end('TODO')
        }).listen(NodeConfig.LauncherPort,()=>{
            term.log('launcher',`Launcher service running on ${NodeConfig.LauncherPort}`)
        })
    */
    }
}