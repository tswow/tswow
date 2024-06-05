## TSWoW - Duskhaven Edition

Duskhaven is built utilizing the modding framework from TSWoW (TypeScript WoW) this repository is a fork of that project with duskhaven specific changes. All credits for the modding framework go to TSWoW. 

Any other TSWoW projects are welcome to cherry pick our changes from this.

##
TSWoW (TypeScript WoW) is a **free** modding framework, mod loader and integrated development environment for the World of Warcraft: Wrath of the Lich King (WotLK) expansion build around the [TrinityCore](https://github.com/trinitycore/trinitycore) emulator.

With TSWoW, you use the TypeScript programming language and the VSCodium editor to easily modify the World of Warcraft game data and to script the behavior of the server.

## Who is TSWoW for?

- Modding Beginners - We have [crash course](https://tswow.github.io/tswow-wiki/) aimed just at getting new people started!

- Modding Veterans - TSWoW is primarily aimed at making modding more efficient and powerful. You will very fast realize the power of improving your workflow using programming.

TSWoW is a **programming environment**, and the language we use is _TypeScript_. This is among the easier languages to learn, and is very similar to Java, C#, JavaScript, Python etc. If you know any of those, you can probably learn TSWoW by just following the crash course. However, if any of the following is foreign to you then you might want to review them before you get started:

- Integrated development environment (IDE)
- JSON
- Functions, objects, classes, methods
- Callback functions / Delegates
- Command-line interface

## Links for getting started

[Introduction & Installation](https://tswow.github.io/tswow-wiki/)

[Issues](https://github.com/tswow/tswow/issues)

[Discord](https://discord.gg/M89n6TZh9x)

--------------------------

The purpose of this document is to walk through building the Duskhaven fork of TS-WoW with TrinityCore from source as well as link to relevant upstream documentation.

*Credits to Project Epoch for utilizing their instruction installations and modifying to be Duskhaven specific.*

**Important Notes**

- Please make sure there are **no spaces** anywhere in the pathname to your **WoW client** or the **TSWoW installation**.

### Pre-Requisites

- [Git](https://github.com/git-for-windows/git/releases/download/v2.30.0.windows.2/Git-2.30.0.2-64-bit.exe)
- [Node.js (exactly version 18.12.1)](https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)
- [VC Redist Latest x86](https://aka.ms/vs/16/release/vc_redist.x86.exe)
- [VC Redist Latest x64](https://aka.ms/vs/16/release/vc_redist.x64.exe)
- [VC Redist 2013 x86](https://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x86.exe)
- [VC Redist 2013 x64](https://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x64.exe)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio 2022 Community](https://visualstudio.microsoft.com/downloads/)
- World of Warcraft 3.3.5a Client

### Build Stage Directory / File Setup

It is recommended to keep your Client alongside your source build due to a Windows limitation with symlinking required for TS-WoW to function.

- Create a directory in a location of your choosing named `DuskhavenSource`.
- Within `DuskhavenSource` create the following subdirectories:
    - `build`
    - `client` (Paste the contents of your 3.3.5a enUS / enGB client within)
    - `release`
- Using a terminal of your choosing such as `PowerShell` or `Git Bash` reach your `DuskhavenSource` directory.
- `git clone https://github.com/duskhaven-reforged/dusk-tswow.git --recurse source`
- Wait for clone to complete, you should have a final `source` directory alongside your other 3 `build`, `client`, `release` folders.
- Copy `source/build.default.conf` to `source/build.conf` and open it. Here you can configure where tswow should place build and install directories.
- Set the following within `source/build.conf`

```
BuildDirectory = "../build"
InstallDirectory = "../release"
```

- Using a terminal of your choosing such as `PowerShell` or `Git Bash` reach your `DuskhavenSource/source` directory.
- Run the command `npm i`

### Building Stage - Compiling (First Time)

- When compiling it is recommended that you have closed your world and auth servers, if this is your first build this is irrelevant.
- Using a terminal of your choosing such as `PowerShell` or `Git Bash` reach your `DuskhavenSource/source` directory.
- For a first setup we strongly recommend a full build which will get any further dependencies and compile every part of TS-WoW. From this point you can later more strategically compile only certain aspects.
- Run `npm run build full`
- This may take a long time to complete.
- Once this completes your `DuskhavenSource/release` directory should now be populated.

### Building Stage - Server Core

- To rebuild only the core ensure that you have closed any running framework instances or world / auth servers.
- Run `npm run build trinitycore-relwithdebinfo`.
- Once complete run `npm run start` within your `DuskhavenSource/release` directory.

### Final Setup

- Within `DuskhavenSource/release` open `node.conf` and set `Default.Client` to your WoW client path. This should be in the `DuskhavenSource/client` directory.
- Using a terminal of your choosing such as `PowerShell` or `Git Bash` reach your `DuskhavenSource/release` directory.
- Run the command `npm run start`. This will start the automatic installation and then start the server. Wait for the core database installation and maps to be extracted. This is a long process on the first installation and can take a long time depending on your machine. 20-30 minutes isn’t rare. You know the installation is done when you see a message similar to 

```
TrinityCore rev. 2a67a101096e 2021-04-23 09:24:53 +0200 (tswow branch) (Win64, RelWithDebInfo, Dynamic) (worldserver-daemon) ready...
```

- To create a gm account, type `create account myuser mypassword 3`
- You can now start the client with the command `start client` and log in to the game

### Known Issues

For common issues when installing please refer to upstream [TS-WoW Documentation](https://tswow.github.io/tswow-wiki/installation/compiling#known-issues).
