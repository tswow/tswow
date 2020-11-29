# Modules

A module is a single coherent set of modifications to the World of Warcraft client and/or the AzerothCore server.

## Structure
All installed modules can be found inside the `modules` subdirectory of your tswow installation. A module should contain the following folders:

- **scripts** - Contains serverside run-time scripts. These are converted to c++ and linked directly to azerothcore. Since they are converted directly to c++, scripts here only support a subset of TypeScript and they cannot communicate with any scripts outside of the directory.

- **data** - Contains compile-time scripts for editing **DBC** files and **SQL**. While the language used is the same as the `scripts` folder, these scripts are not converted to c++, but are just executed as javascript when you type `buildmpq` into the tswow program.

- **assets** - Contains any files you want to bundle in your output `.mpq` patch, such as 3D models, textures or sound. Don't put `.dbc` files here, use scripts in the `data` directory instead. When building your mpq patch with the `buildmpq` command, assets folders of **all** modules are combined into a single `.mpq` file that is placed in your World of Warcraft installation.

_Note: don't put `.dbc` files in your `asset` folder, use scripts in the `data` directory instead. When you use the `buildmpq` command, these scripts will be called and place the resulting `.dbc` in your `.mpq` archive automatically._