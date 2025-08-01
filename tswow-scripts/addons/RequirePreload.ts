/*
 * MIT License
 * Copyright (c) 2020 Brusalk, Tim Stirrat
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Modified by TSWoW
 *
 * This file contains a plugin for typescript-to-lua
 * to enable CommonJS-style calls to "require"
 */

/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import * as path from "path";
import * as ts from "typescript";
import {
    Block,
    createBlock,
    createCallExpression,
    createExpressionStatement,
    createFunctionExpression,
    createIdentifier,
    createStringLiteral,
    Plugin
} from "typescript-to-lua";

export const RequirePreload: Plugin = {
  visitors: {
    // @ts-expect-error - Dynamic SyntaxKind as object key
    [ts.SyntaxKind.SourceFile]: (node, context) => {
      const [fileContent] = context.superTransformNode(node) as Block[];
      if (context.isModule) {
        const moduleFunction = createFunctionExpression(
          fileContent,
          undefined,
          undefined,
          undefined
        );

        let moduleName: string = "";
        let fullName = context.sourceFile.fileName.split('\\').join('/');
        let libName = fullName.split('/include-addon/')[1]

        if(libName!==undefined) {
          moduleName = libName;
        } else {
          let modulesRoot = fullName
          while(true) {
            if(path.basename(modulesRoot) == 'modules') {
              break;
            }
            if(path.dirname(modulesRoot) === modulesRoot) {
              throw new Error(`Could not find "modules" part of pathname`)
            }
            modulesRoot = path.dirname(modulesRoot);
          }

          let splitAddon = fullName.split('addon');
          if(splitAddon.length>1) {
            let modName = path.relative(modulesRoot,splitAddon[0]).split('\\').join('/')
            let addonName = splitAddon.slice(1).join('addon');

            // ignore entrypoint
            if(addonName === '/addon.ts') return fileContent;

            moduleName = `TSAddons/${modName}/addon${addonName}`
          } else {
            let splitShared = fullName.split('shared');
            let modName = path.relative(modulesRoot,splitShared[0]).split('\\').join('/');
            let sharedName = splitShared[1];
            moduleName = `TSAddons/${modName}/shared${sharedName}`
          }
        }

        if (moduleName.startsWith("/")) moduleName = moduleName.substring(1);
        if (moduleName.endsWith(".tsx")) moduleName = moduleName.substring(0, moduleName.length - 4);
        if (moduleName.endsWith(".ts")) moduleName = moduleName.substring(0, moduleName.length - 3);
        moduleName = moduleName.split("/").join(".");
        moduleName = moduleName.replace(".index", "");

        // Generates:
        // tstl_register_module("module/name", function() ... end)
        const moduleCallExpression = createCallExpression(
          createIdentifier("tstl_register_module"),
          [createStringLiteral(moduleName), moduleFunction]
        );

        const es = createExpressionStatement(moduleCallExpression);
        const block = createBlock([es]);
        const s = new Set<number>();
        s.add(100);
        // @ts-expect-error - Adding typescript-to-lua specific properties to AST node
        block.luaLibFeatures = fileContent.luaLibFeatures;
        // @ts-expect-error - Adding typescript-to-lua specific properties to AST node
        block.trivia = fileContent.trivia;
        return block;
      }
      return fileContent;
    },
  },
};
