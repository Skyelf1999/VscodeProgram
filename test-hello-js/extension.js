// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test-hello-js" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let helloWorld_1 = vscode.commands.registerCommand('test-hello-js.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from test_Hello_js!');
	});
	let helloWorld_2 = vscode.commands.registerCommand('test-hello-js.helloWorld2' , function(){
		vscode.window.showInformationMessage('Hello World 2');
	})
	let helloWorld_3 = vscode.commands.registerCommand('test-hello-js.helloWorld3' , function(){
		vscode.window.showInformationMessage('Hello World 3');
	})
	let helloWorld_4 = vscode.commands.registerCommand('test-hello-js.helloWorld4' , function(){
		vscode.window.showInformationMessage('Hello World 4');
	})

	context.subscriptions.push(helloWorld_1);
	context.subscriptions.push(helloWorld_2);
	context.subscriptions.push(helloWorld_3);
	context.subscriptions.push(helloWorld_4);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}



//转小写
function toLowerCaseOrUpperCase(command) 
{
	//获取activeTextEditor
	const editor = vscode.window.activeTextEditor;
	if (editor) 
	{
		const document = editor.document;
		const selection = editor.selection;
		//获取选中单词文本
		const word = document.getText(selection);
		//文本转大小写
		const newWord = command == 'toLowerCase' ? word.toLowerCase() : word.toUpperCase();
		//替换原来文本
		editor.edit((editBuilder) => {
			editBuilder.replace(selection, newWord);
		});
	}
}
