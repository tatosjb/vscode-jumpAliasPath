// ### 获取项目名~~
import * as vscode from 'vscode';
import * as path   from 'path';
const { configPath } = (<any>vscode.workspace.getConfiguration().get('fileAliasSetting'))
import { realFilePath,aliasMatch,getConfigFileFun } from './utils'
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
			const spaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(fileName)) || {name:''};
			let aliasconfigStr = '';
			if(configPath[spaceFolder.name]){
				aliasconfigStr = configPath[spaceFolder.name];
			}else{
				aliasconfigStr = getConfigFileFun(spaceFolder); // 获取配置文件
			}
			const aliasconfig = aliasconfigStr ? require(aliasconfigStr) : {};
			let aliaName = filepathArr[1]; // 匹配的字符串
			if(/^@.*\/*/.test(aliaName)){
				aliaName = aliasMatch(aliaName,aliasconfig.resolve.alias); // 获取这次的映射名称
				
				file = realFilePath(path.resolve(workDir,aliaName));
				// let openTextDocument =  vscode.workspace.openTextDocument(vscode.Uri.file(file));
				// openTextDocument.then((res)=>{
				// 	console.log(res);
					
				// })
				return new vscode.Location(vscode.Uri.file(file), new vscode.Position(0, 0));
			}
			return null;
		}
	});

	context.subscriptions.push(hoverHander);
}

// this method is called when your extension is deactivated
export function deactivate() {}
