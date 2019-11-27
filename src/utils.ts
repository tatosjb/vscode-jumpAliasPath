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
};
/**
 * 确定文件是否存在
 */
const isFileExists: any = (targetPath: string)=>{
    return fs.existsSync(targetPath);
};
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
};
/**
 * 获取webpack config 文件，进而获取 配置文件内容 alias 配置
 */
const getConfigFileFun: any = (workDir: object) => {
    
    let ConfigFilePos = ''; // 返回的配置文件位置
    const packageConfig =isFileExists(workDir.uri + 'package.json')
    if(packageConfig){
        if(packageConfig[devDependencies]['webpak'] || packageConfig[dependencies]['webpak']){
            let path = workDir.uri + WEBPACK_DEFAULT_CONFIG_NAME;
            return ConfigFilePos = isFileExists(path)? path: '';
        }else{
            return ConfigFilePos;
        }
    }else{
        return ConfigFilePos;
    }
};
export {
    realFilePath,
    aliasMatch,
    getConfigFileFun
}