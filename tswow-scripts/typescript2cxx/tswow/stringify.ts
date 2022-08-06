import ts = require("typescript");
import { CodeWriter } from "../codewriter";

export function generateStringify(node: ts.ClassDeclaration, writer: CodeWriter) {
    const name = node.name.getText(node.getSourceFile());
    writer.writeString('std::string stringify(int indention = 0) override ')
    writer.BeginBlock();
    writer.writeString(`return "${name} {\\n`);
    node.members.forEach((memberRaw)=>{
        if(memberRaw.kind!==ts.SyntaxKind.PropertyDeclaration) {
            return;
        }
        const member = memberRaw as ts.PropertyDeclaration;
        const name = member.name.getText(member.getSourceFile());
        const type = member.type.getText();

        const normalTypes = [
            'uint8','uint16','uint32','uint64',
            'int8','int16','int32','int64','bool','boolean',
            'float','double','number','string','std::string','TSArray','TSDictionary'];

        if(member.type.kind == ts.SyntaxKind.FunctionType) {
            return;
        }

        let isNormal = type === 'int';
        for(const normalType of normalTypes) {
            if(type.includes(normalType)) {
                isNormal = true;
                break;
            }
        }

        if(type=='string') {
            writer.writeString(`" +spaces(indention+1) + "${name}:\\""+::ToStr(this->${name},indention+1)+"\\"\\n`)
        } else if (isNormal) {
            writer.writeString(`" +spaces(indention+1) + "${name}:"+::ToStr(this->${name},indention+1)+"\\n`)
        } else {
            writer.writeString(`" +spaces(indention+1) + "${name}:"+(this->${name}->stringify(indention+1))+"\\n`)
        }
    });
    writer.writeString('" + spaces(indention) + "}";');
    writer.EndBlock();
}