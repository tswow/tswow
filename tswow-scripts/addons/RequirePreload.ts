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
*/
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
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
    // @ts-ignore
    [ts.SyntaxKind.SourceFile]: (node, context) => {
      const [fileContent] = context.superTransformNode(node) as Block[];
      if (context.isModule) {
        const moduleFunction = createFunctionExpression(
          fileContent,
          undefined,
          undefined,
          undefined
        );

        let moduleName = context.sourceFile.fileName.split("addons")[1];
        if(moduleName===undefined) {
          moduleName = 'shared'+context.sourceFile.fileName.split("shared")[1];
        } else {
          moduleName = 'addons'+moduleName;
        }

        if (moduleName.startsWith("/")) moduleName = moduleName.substring(1);
        if (moduleName.endsWith(".tsx")) moduleName = moduleName.substring(0, moduleName.length - 4);
        if (moduleName.endsWith(".ts")) moduleName = moduleName.substring(0, moduleName.length - 3);
        moduleName = moduleName.split("/").join(".");
        moduleName = moduleName.replace(".index", "");
        // Skip init.lua so it can be the entry-point
        if (moduleName.endsWith('-addon')) return fileContent;

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
        // @ts-ignore
        block.luaLibFeatures = fileContent.luaLibFeatures;
        // @ts-ignore
        block.trivia = fileContent.trivia;
        return block;
      }
      return fileContent;
    },
  },
};