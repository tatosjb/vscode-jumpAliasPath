import * as vscode   from 'vscode';
import * as path   from 'path';
import * as fs   from 'fs';
const { fileSuffixs,aliasMap,configPos } = (<any>vscode.workspace.getConfiguration().get('fileAliasSetting'))
const locfileSuffix = ["js","ts","vue","jsx"];
const fileSuffixCON = Array.from(new Set(locfileSuffix.concat(fileSuffixs)));
const WEBPACK_DEFAULT_CONFIG_NAME = ['webpack.config.js','webpack.config.dev.js','webpack.config.prod.js'];
/**
 * Determine file location and suffix
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
    }else{ // With suffix ~
        return targetPath;
    }
}
/**
 * Determine if the file exists
 */
const isFileExists: any = (targetPath: string)=>{
    return fs.existsSync(targetPath);
}
/**
 * Match alias mapping
 * 
 * Simple and rude
 */
const aliasMatch:any= (aliaName: string,webpackAliasConfig:any) =>{
    const aliaNameArr = aliaName.split('/');
    
    const aliaFlag:any = aliaNameArr.shift();
    return webpackAliasConfig[aliaFlag] + '/' +aliaNameArr.join('/');
}
/**
 * Get the webpack config file, and then get the configuration file content alias configuration
 */
const getConfigFile: any = (workspace: any) => {
    const configFile = configPos[workspace.name] ||  getDefaultConfigFile(workspace);
    return configFile ? workspace.uri.fsPath + '\\'+configFile :''; // Configuration file location returned
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
        //TODO: Multiple matching processing

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
