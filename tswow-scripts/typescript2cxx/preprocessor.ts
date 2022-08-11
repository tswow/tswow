import * as ts from 'typescript';
import { Emitter } from './emitter';
import { IdentifierResolver } from './resolvers';

export class Preprocessor {

    public constructor(private resolver: IdentifierResolver, private emitter: Emitter) {
    }

    public preprocessStatement(node: ts.Declaration | ts.Statement): ts.Declaration | ts.Statement {
        if (!node) {
            return node;
        }

        switch (node.kind) {
            case ts.SyntaxKind.VariableStatement:
                return this.preprocessVariableStatement(<ts.VariableStatement>node);
            case ts.SyntaxKind.ClassDeclaration:
                return this.preprocessClassDeclaration(<ts.ClassDeclaration>node);
        }

        return node;
    }

    public preprocessExpression(node: ts.Expression): ts.Expression {
        if (!node) {
            return node;
        }

        switch (node.kind) {
            case ts.SyntaxKind.BinaryExpression:
                return this.preprocessBinaryExpression(<ts.BinaryExpression>node);
            case ts.SyntaxKind.PropertyAccessExpression:
                return this.preprocessPropertyAccessExpression(<ts.PropertyAccessExpression>node);
            case ts.SyntaxKind.CallExpression:
                return this.preprocessCallExpression(<ts.CallExpression>node);
        }

        return node;
    }

    private compareTypesOfParameters(p0: ts.ParameterDeclaration, p1: ts.ParameterDeclaration): boolean {
        if (p0 && !p1 || !p0 && p1) {
            return false;
        }

        if (p0.type && p1.type && p0.type.kind === p1.type.kind) {
            return true;
        }

        if (p0.initializer && p1.initializer && p0.initializer.kind === p1.initializer.kind) {
            return true;
        }

        return false;
    }

    private preprocessClassDeclaration(node: ts.ClassDeclaration): ts.Declaration | ts.Statement {

        const inheritance = node.heritageClauses && node.heritageClauses.filter(i => i.token === ts.SyntaxKind.ExtendsKeyword);
        if (!inheritance || inheritance.length === 0) {
            return node;
        }

        const firstType = inheritance[0].types[0];
        const type = this.resolver.getOrResolveTypeOf(firstType.expression);
        const baseClassDeclaration = <ts.ClassDeclaration>type.symbol.valueDeclaration;

        const constructors = <ts.ConstructorDeclaration[]>node.members
            .filter(m => m.kind === ts.SyntaxKind.Constructor);
        const baseConstructors = <ts.ConstructorDeclaration[]>baseClassDeclaration
            .members.filter(m => m.kind === ts.SyntaxKind.Constructor);

        baseConstructors
            .filter(e => constructors.findIndex(c => c.parameters.every((p, index) =>
                this.compareTypesOfParameters(e.parameters[index], p))) === -1)
            .forEach(element => {
            const c = ts.createConstructor(
                null,
                null,
                element.parameters.map(p => ts.createParameter(
                    p.decorators,
                    p.modifiers && p.modifiers.filter(m => m.kind !== ts.SyntaxKind.PrivateKeyword
                        && m.kind !== ts.SyntaxKind.ProtectedKeyword && m.kind !== ts.SyntaxKind.PublicKeyword),
                    p.dotDotDotToken,
                    p.name,
                    p.questionToken,
                    p.type,
                    p.initializer)),
                ts.createBlock(
                    [ts.createStatement(
                        ts.createCall(
                            ts.createSuper(),
                            null,
                            element.parameters.map(p => <ts.Identifier>p.name)))]));
            this.fixupParentReferences(c, node);
            (<any>node.members).push(c);
        });

        return node;
    }

    private preprocessVariableStatement(variableStatement: ts.VariableStatement): ts.Statement {
        const declaration0 = variableStatement.declarationList.declarations[0];
        const init = declaration0.initializer;
        if (init && init.kind === ts.SyntaxKind.FunctionExpression) {
            const funcExpr = <ts.FunctionExpression>init;
            if (this.emitter.isTemplate(funcExpr)) {
                const funcNode = ts.createFunctionDeclaration(
                    funcExpr.decorators,
                    funcExpr.modifiers,
                    undefined,
                    <ts.Identifier>declaration0.name,
                    funcExpr.typeParameters,
                    funcExpr.parameters,
                    funcExpr.type,
                    funcExpr.body);

                return funcNode;
            }
        }

        return variableStatement;
    }

    private preprocessBinaryExpression(node: ts.BinaryExpression) {
        switch (node.operatorToken.kind) {
            case ts.SyntaxKind.EqualsToken:

                if (node.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
                    const propertyAccess = <ts.PropertyAccessExpression>node.left;

                    const symbolInfo = this.resolver.getSymbolAtLocation(propertyAccess.name);
                    const getAccess = symbolInfo
                        && symbolInfo.declarations
                        && (symbolInfo.declarations.length > 0 && symbolInfo.declarations[0].kind === ts.SyntaxKind.SetAccessor
                            || symbolInfo.declarations.length > 1 && symbolInfo.declarations[1].kind === ts.SyntaxKind.SetAccessor)
                        || propertyAccess.name.text === 'length' && this.resolver.isArrayOrStringTypeFromSymbol(symbolInfo);

                    if (getAccess) {
                        const newCall = ts.createCall(node.left, null, [node.right]);
                        (<any>newCall.expression).__set = true;
                        return this.fixupParentReferences(newCall, node.parent);
                    }
                }
                break;
            case ts.SyntaxKind.PlusToken:
                let leftType = this.resolver.getTypeAtLocation(node.left)
                let rightType = this.resolver.getTypeAtLocation(node.right)
                if(leftType.isStringLiteral() && rightType.isStringLiteral()) {
                    node = ts.createBinary(ts.createCall(ts.createIdentifier('std::string'),null,[node.left]),ts.SyntaxKind.PlusToken,ts.createCall(ts.createIdentifier('std::string'),null,[node.right]))
                } else {
                    let leftStr = this.resolver.isStringType(leftType)
                    let rightStr = this.resolver.isStringType(rightType)
                    const TO_STR_FUNC = 'ToStr'
                    if((leftStr && ! rightStr) || (rightStr && ! leftStr)) {
                        if(!leftStr) {
                            node = ts.createBinary(ts.createCall(ts.createIdentifier(TO_STR_FUNC), null, [node.left]), ts.SyntaxKind.PlusToken, node.right);
                        }
                        if(!rightStr) {
                            node = ts.createBinary(node.left, ts.SyntaxKind.PlusToken, ts.createCall(ts.createIdentifier(TO_STR_FUNC), null, [node.right]));
                        }
                    }
                }
                break;
        }

        return node;
    }

    private preprocessPropertyAccessCall(node: ts.CallExpression, prop: ts.PropertyAccessExpression) {
        if(prop.getChildCount() < 2) {
            return node;
        }
        let type = this.emitter.resolver.getTypeOf(prop.getChildAt(0))
        let isString = this.emitter.resolver.isStringType(type);
        let isNumber = this.emitter.resolver.isNumberType(type);
        let methodName = prop.getChildAt(2).getText(node.getSourceFile())
        if(!isString && !isNumber) {
            return node;
        }
        let ident = ts.createIdentifier(`__ts_${isString ? 'string' : 'number'}_${methodName}`)
        return ts.createCall(ident,node.typeArguments,[prop.getChildAt(0) as ts.Expression, ...node.arguments])
    }

    private preprocessCreateArrayCall(node: ts.CallExpression) {
        if(node.getChildCount() < 3) {
            return node;
        }
        let arrCont = node.getChildAt(node.getChildCount()-2);
        if(arrCont.kind !== ts.SyntaxKind.SyntaxList || arrCont.getChildCount() < 1) {
            return node;
        }

        let arr = arrCont.getChildAt(0);
        if(arr.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
            return node;
        }

        let arrItems = arr.getChildAt(1)
        if(arrItems.kind !== ts.SyntaxKind.SyntaxList) {
            return node;
        }

        let entries = arrItems.getChildren().filter(x=>x.kind !== ts.SyntaxKind.CommaToken)
        if(entries.length === 0) {
            return ts.createCall(node.getChildAt(0) as ts.Expression,node.typeArguments,[]);
        }

        let typestr = node.typeArguments[0].getText(node.getSourceFile());
        if(!['int','uint8','uint16','uint32','uint64','int8','int16','int32','int64','float'].includes(typestr)) {
            return node
        }

        // todo: handle spread operator
        let entriesOut = entries
            .map(x=>ts.createCall(ts.createIdentifier(typestr),null,[x as ts.Expression]))
        let arrLit = ts.createArrayLiteral(entriesOut);
        (arrLit as any).__isIntLiteralArray = true;
        return ts.createCall(node.getChildAt(0) as ts.Expression,node.typeArguments,[arrLit])
    }

    private preprocessIdentifierCall(node: ts.CallExpression, ident: ts.Identifier) {
        switch(ident.text) {
            case 'CreateArray':
                return this.preprocessCreateArrayCall(node);
        }
        return node;
    }

    private preprocessCallExpression(node: ts.CallExpression): ts.Expression {
        if(node.pos < 0) {
            return node;
        }
        if(node.getChildCount() < 1) {
            return node;
        }

        let expr = node.getChildAt(0)
        switch(expr.kind) {
            case ts.SyntaxKind.Identifier:
                return this.preprocessIdentifierCall(node, expr as ts.Identifier);
            case ts.SyntaxKind.PropertyAccessExpression:
                return this.preprocessPropertyAccessCall(node,expr as ts.PropertyAccessExpression);
        }
        return node;
    }

    private preprocessPropertyAccessExpression(node: ts.PropertyAccessExpression): ts.Expression {
        if(node.pos >= 0) {
            let firstChild = node.getChildAt(0)
            let firstChildType = this.resolver.getTypeOf(firstChild);
            if(this.resolver.isStringType(firstChildType)) {
                let lastChild = node.getChildAt(node.getChildCount() - 1)
                if(lastChild.pos >= 0 && lastChild.getText() == 'length') {
                    return ts.createCall(ts.createIdentifier('__ts_string_length'),null,[node.getChildAt(0) as ts.Expression])
                }
            }
        }

        let expression = <ts.Expression>node.expression;
        while (expression.kind === ts.SyntaxKind.ParenthesizedExpression) {
            expression = (<ts.ParenthesizedExpression>expression).expression;
        }

        const isConstValue = expression.kind ===
            ts.SyntaxKind.NumericLiteral
            || expression.kind === ts.SyntaxKind.StringLiteral
            || expression.kind === ts.SyntaxKind.TrueKeyword
            || expression.kind === ts.SyntaxKind.FalseKeyword;

        if (isConstValue) {
            (<any>expression).__boxing = true;
        }

        return node;
    }

    private fixupParentReferences<T extends ts.Node>(rootNode: T, setParent?: ts.Node): T {
        let parent: ts.Node = rootNode;
        if (setParent) {
            (rootNode as any).parent = setParent;
        }

        ts.forEachChild(rootNode, visitNode);

        return rootNode;

        function visitNode(n: ts.Node): void {
            // walk down setting parents that differ from the parent we think it should be.  This
            // allows us to quickly bail out of setting parents for sub-trees during incremental
            // parsing
            if (n.parent !== parent) {
                (n as any).parent = parent;

                const saveParent = parent;
                parent = n;
                ts.forEachChild(n, visitNode);

                parent = saveParent;
            }
        }
    }
}
