
import * as vscode from 'vscode';
import * as path   from 'path';

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
			let file = '';
			const fileName = document.fileName; // 当前文件的绝对路径加文件名
			const workDir = path.dirname(fileName); // 当前文件的绝对路径
			const linetext = document.lineAt(position).text; // 当前行字符串
			let name = linetext.match(/import.*?from '(.*)'|"(.*)";*\r/);
			let pos = linetext.search(/'(.*)'|"(.*)";*/);

			if(!name || position.character < pos){
				return null;
			}

			if(/^@\//.test(name[1])){
				file = /^@\//.test(name[1]) ?name[1] :'';
				file = file.replace(/^@\//,'./hellos/');
				file = path.resolve(workDir,file)+'.js';
				
				return new vscode.Location(vscode.Uri.file(file), new vscode.Position(0, 0));
			}
			return null;
		}
	  });

	context.subscriptions.push(hoverHander);
}

// this method is called when your extension is deactivated
export function deactivate() {}
