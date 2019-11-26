import * as vscode   from 'vscode';
import * as path   from 'path';
import * as fs   from 'fs';
const { fileSuffixs,aliasMap,configPath } = (<any>vscode.workspace.getConfiguration().get('fileAliasSetting'))
const locfileSuffix = ["js","ts","vue","jsx"];
const fileSuffixCON = Array.from(new Set(locfileSuffix.concat(fileSuffixs)));
const WEBPACK_DEFAULT_CONFIG_NAME = "webpack.config.js";
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
const aliasMatch:any= (aliaName: string,webpackAliasConfig:object) =>{
    let aliasMaps = Object.assign(webpackAliasConfig, aliasMap); // 合并，以setting.json  的 fileAliasSetting.aliasMap 为主
    
    let filename = '';
    for(let i in aliasMaps) {
        filename = aliaName.replace(new RegExp( i, 'g'),aliasMaps[i]); // 替换映射名称与真实名称
        if(!filename.includes(i)){ // 不再包含映射名则 判断为成功匹配
            break;
        }
    }
    
    return filename;
}
/**
 * 获取webpack config 文件，进而获取 配置文件内容 alias 配置
 */
const getConfigFile: any = (workDir: string) => {
    
    let ConfigFilePos = ''; // 返回的配置文件位置
    const workDirArr = workDir.split('\\'); // 切位数组，循环遍历查找 文件位置
    let workDirArrTemp = workDirArr.slice(0); // 获取临时数组，会改变
    let filePos = workDir; // 当前循环到哪个文件夹
    let configName = '';
    for (const key in configPath) { // 循环遍历 setting.json 里的 fileAliasSetting.configPos 配置
        if(RegExp(key,'g').test(workDir)){
            configName = configPath[key];
        }
    }
    configName = configName ? configName: (configPath.default || WEBPACK_DEFAULT_CONFIG_NAME); // 默认名称
    if(configName){
        for (let index = 0; index < workDirArr.length; index++) { // 遍历 文件夹，找到 config文件位置
            if(isFileExists(filePos + configName)){
                ConfigFilePos = filePos + configName;
                break;
            }else{
                workDirArrTemp.pop(); // 未匹配则去掉最后一个文件名继续匹配
                filePos = workDirArrTemp.join('\\') +'\\';
            }
        }
        return ConfigFilePos;
    }
}
export {
    realFilePath,
    aliasMatch,
    getConfigFile
}