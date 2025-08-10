import { BuildPaths, SourcePaths, tdbFilename } from "../util/Paths";

export const bpaths = function(){
  let arg = process.argv.find(x=>x.startsWith('--bpaths='));
  if(arg === undefined) {
      throw new Error(`No --bpaths argument provided`);
  }
  return BuildPaths(arg.substring('--bpaths='.length),tdbFilename())
}();
export const spaths = SourcePaths(process.cwd())
