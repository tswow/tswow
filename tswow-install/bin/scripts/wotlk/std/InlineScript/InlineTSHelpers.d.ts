import ts from "typescript";
export declare function getTSChildren(node: ts.Node): ts.Node[];
export declare function getTSChild(node: ts.Node, index: number, assertType?: ts.SyntaxKind): ts.Node;
