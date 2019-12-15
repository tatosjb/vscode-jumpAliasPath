// ### 获取项目名~~
import * as vscode from 'vscode';
import * as path   from 'path';
import { realFilePath,aliasMatch,getConfigFile, getWorkSpaceName, getVscodeConfig } from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const hoverHander = vscode.languages.registerDefinitionProvider([
		{ scheme: 'file', language: 'vue' },
		{ scheme: 'file', language: 'javascript' },
		{ scheme: 'file', language: 'typescript' },
		{ scheme: 'file', language: 'javascriptreact' }
	], {
		provideDefinition(document, position, token) {
			const linetext = document.lineAt(position).text; // 当前行字符串
			let filepathArr = linetext.match(/import.*?from '(.*)'|"(.*)";*/);
			let pos = linetext.search(/'(.*)'|"(.*)";*/);
			if(!filepathArr || position.character < pos){ // 点击引用字符串才能跳转（点击名字后续增加）
				return null;
			}
			let file = '';
			const fileName = document.fileName; // 当前文件的绝对路径加文件名
			const workDir = path.dirname(fileName); // 当前文件的绝对路径
			// 首先查询 工作区名称
			const workspace = getWorkSpaceName(workDir);
			// 通过工作区名称在配置内查找配置文件                     // 失败则查找 文件夹内是否有默认名称配置文件
			const ConfigFile = workspace ? getConfigFile(workspace) : '';
			
			const webpackAliasConfig = ConfigFile ? require(ConfigFile).resolve.alias || {} : {}; // 获取配置文件
			
			// 最后查找配置项是否有匹配，如果查到配置文件则使用配置项对文件内配置进行覆盖，没有查到则返回配置项，不管是否为空
			const aliasConfig = Object.assign(webpackAliasConfig,getVscodeConfig(workspace.name));
			
			let aliaName = filepathArr[1]; // 匹配的字符串
			if(/^@.*\/*/.test(aliaName)){
				aliaName = aliasMatch(aliaName,aliasConfig); // 获取这次的映射名称
				file = realFilePath(path.resolve(workDir,aliaName));
				console.log(aliaName);
				
				return new vscode.Location(vscode.Uri.file(file), new vscode.Position(0, 0));
			}
			return null;
		}
	});

	context.subscriptions.push(hoverHander);
}

// this method is called when your extension is deactivated
export function deactivate() {}
