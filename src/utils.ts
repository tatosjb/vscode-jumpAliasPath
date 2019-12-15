import * as vscode   from 'vscode';
import * as path   from 'path';
import * as fs   from 'fs';
const { fileSuffixs,aliasMap,configPos } = (<any>vscode.workspace.getConfiguration().get('fileAliasSetting'))
const locfileSuffix = ["js","ts","vue","jsx"];
const fileSuffixCON = Array.from(new Set(locfileSuffix.concat(fileSuffixs)));
const WEBPACK_DEFAULT_CONFIG_NAME = ['webpack.config.js','webpack.config.dev.js','webpack.config.prod.js'];
/**
 * 确定文件位置与后缀
 */
const realFilePath: any = (targetPath: string) => {
    
    const extname = path.extname(targetPath);
    if(!extname){
        for (const item of fileSuffixCON) {
            if (isFileExists(`${targetPath}.${item}`)) {
                return `${targetPath}.${item}`;
            }
        }
        targetPath = path.join(targetPath, 'index');
        if(isFileExists(targetPath)){
            return targetPath;
        }
        for (const item of fileSuffixCON) {
            if (isFileExists(`${targetPath}.${item}`)) {
                return `${targetPath}.${item}`;
            }
        }
    }else{ // 带后缀~
        return targetPath;
    }
}
/**
 * 确定文件是否存在
 */
const isFileExists: any = (targetPath: string)=>{
    return fs.existsSync(targetPath);
}
/**
 * 匹配别名映射
 * 
 * 简单粗暴
 */
const aliasMatch:any= (aliaName: string,webpackAliasConfig:any) =>{
    const aliaNameArr = aliaName.split('/');
    
    const aliaFlag:any = aliaNameArr.shift();
    return webpackAliasConfig[aliaFlag] + '/' +aliaNameArr.join('/');
}
/**
 * 获取webpack config 文件，进而获取 配置文件内容 alias 配置
 */
const getConfigFile: any = (workspace: any) => {
    const configFile = configPos[workspace.name] ||  getDefaultConfigFile(workspace);
    return configFile ? workspace.uri.fsPath + '\\'+configFile :''; // 返回的配置文件位置
}
// 
const getWorkSpaceName: any = (workDir: string) => {
    const vscodeWorkSpace = vscode.workspace;
    let workSpaceMatchSuccessful: any[] = [];
    workSpaceMatchSuccessful = (vscodeWorkSpace.workspaceFolders || []).filter((item: { name: string; }) => {
        return new RegExp('\\\\'+item.name+'\\\\', "g").test(workDir);
    });
    if(workSpaceMatchSuccessful.length === 0){
        return false;
    } else if (workSpaceMatchSuccessful.length === 1) {
        return workSpaceMatchSuccessful[0];
    }else{
        //TODO: 多个匹配处理

    }
}
const getDefaultConfigFile: any = (workspace: any) => {
    let fileArry: any[] = [];
    fileArry = WEBPACK_DEFAULT_CONFIG_NAME.filter(item=>{
        return isFileExists(`${workspace.uri.fsPath}\\${item}` )
    });
    return fileArry[0];
}
const getVscodeConfig: any = (workspacename: string) => {
    return Object.assign(aliasMap[workspacename]||{}, aliasMap['default']||[]);
}
export {
    realFilePath,
    aliasMatch,
    getConfigFile,
    getWorkSpaceName,
    getVscodeConfig
}