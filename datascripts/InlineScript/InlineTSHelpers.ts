import ts from "typescript";

export function getTSChildren(node: ts.Node) {
    let children: ts.Node[] = []
    node.forEachChild(x=>{children.push(x)})
    return children;
}

export function getTSChild(node: ts.Node, index: number, assertType?: ts.SyntaxKind) {
    let children = getTSChildren(node);
    if(children.length <= index) {
        throw new Error(
              `Node index out of bound:`
            + ` ${index} (max is ${children.length})`
            + ` (this is a tswow fuckup, please call us)`
        )
    }
    const child = children[index];
    if(assertType !== undefined && child.kind !== assertType) {
        throw new Error(
                `tsc: invalid child type:`
            + ` expected ${ts.SyntaxKind[assertType]}`
            + ` but got ${ts.SyntaxKind[child.kind]}`
            + ` (this is a tswow fuckup, please call us)`
        )
    }
    return child
}