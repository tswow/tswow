# Design

This document should outline design guidelines and decisions for various aspects of tswow. The first design decision is to not split this document into a hundred million different documents, so keep ALL design-related stuff in here.

## General
- All submitted code should use the license `GPL-3.0-only`, not `GPL-3.0-or-later`. See the file `tswow-scripts/runtime/Main.ts` for how to format the header. All code files should use the full header, and all `package.json` files should specify the license as `GPL-3.0-only`.
- Configuration files should use the **yaml** format.
- Use TypeScript as much as possible. 
    - Use c++ only when the performance is actually needed (such as mpqbuilder), or in the `tswow-module` interface to azerothcore.
    - Use python only for blender scripts.
- Use `tsc --watch` processes. Only use plain `tsc` for publishing or when the user explicitly commands it.
- There should only be two interactive processes: One for compiling (as in, compiling tswow) and one for running. These should manage all tsc watching and commands from the user.
- **Full** releases should come with batteries included, the user should not have to download anything except for the WoW 3.3.5 client. This includes things such as node_modules and external editors we support.
- Until the project actually needs to publish its own changes to git submodules, all submodules should point at the official repositories.
- Git submodules should only be used for standalone projects, or external projects we depend on. Everything else should go in the main repository.
- Modules should be easy to set up as git repositories and use with the **vscodium** editor. 
    - Generate `.gitignore` files for build directories and build files (such as `.wmo` and `.blp`)
    - Generate `.vscode/settings.json` files to hide build files and folders.
- There are no plans to support other WoW versions or server projects such as TrinityCore. The project is simply too complex for me to support multiple build targets while also support
- We should support at least windows and debian/ubuntu linux. Some editors might not run on linux, but tswow itself should compile to it.
- There are no plans to support OS X because I don't own a mac.

## Code Style
TODO but we should enforce a code style.