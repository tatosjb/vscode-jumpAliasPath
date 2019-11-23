import * as vscode   from 'vscode';
import * as path   from 'path';
import * as fs   from 'fs';
const { fileSuffixs,aliasMap } = (<any>vscode.workspace.getConfiguration().get('fileAliasSetting'))
const locfileSuffix = ["js","ts","vue","jsx"];
const fileSuffixCON = Array.from(new Set(locfileSuffix.concat(fileSuffixs)));

const realFilePath: any = (targetPath: string) => {
    const extname = path.extname(targetPath);
    if(!extname){
        for (const item of fileSuffixCON) {
            if (fs.existsSync(`${targetPath}.${item}`)) {
                return `${targetPath}.${item}`;
            }
        }
        targetPath = path.join(targetPath, 'index');
        if(fs.existsSync(targetPath)){
            return targetPath;
        }
        for (const item of fileSuffixCON) {
            if (fs.existsSync(`${targetPath}.${item}`)) {
                return `${targetPath}.${item}`;
            }
        }
    }
    return '';
}
const aliasMatch:any= (aliaName: string) =>{
    let filename = '';
    for(let i in aliasMap) {
        filename = aliaName.replace(new RegExp( i, 'g'),aliasMap[i]);
        if(!filename.includes(i)){
            break;
        }
    }
    return filename;
}
export {
    realFilePath,
    aliasMatch,
}