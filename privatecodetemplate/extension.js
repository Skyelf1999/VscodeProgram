// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

var readFilePath = "";				// 模板路径
var fileType = ".txt";		// 默认模板文件类型


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "PrivateCodeTemplate" is now active!');

	initConst(context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	regCommand(context , 'PrivateCodeTemplate.helloWorld' , cmdHello);
	regCommand(context , 'PrivateCodeTemplate.test' , cmdTest);
	regCommand(context , 'PrivateCodeTemplate.insertTemplate' , cmdInsertTemplate);

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


/**
 * 注册command
 * @param {vscode.ExtensionContext} context 
 * @param {string} cmd 命令名称
 * @param {(...args: any[]) => any} func 
 */
function regCommand(context , cmd , func)
{
	let disposable = vscode.commands.registerCommand(cmd, func);
	context.subscriptions.push(disposable);
}


/**
 * 初始化参数
 * @param {vscode.ExtensionContext} context 
 */
function initConst(context)
{
	readFilePath = __dirname;
	vscode.workspace.getConfiguration().update('PrivateCodeTemplate.templateFolderPath', __dirname);
	fileType = vscode.workspace.getConfiguration().get('PrivateCodeTemplate.defaultFileType');
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(configChangeCallback));
}


/**
 * 配置修改处理
 */
function configChangeCallback()
{
	const curConfig = vscode.workspace.getConfiguration();
	const curFilePath = curConfig.get('PrivateCodeTemplate.templateFolderPath');
	const curFileType = curConfig.get('PrivateCodeTemplate.defaultFileType');
	
	if(readFilePath!==curFilePath)
	{
		vscode.window.showInformationMessage("修改模板文件路径: " + readFilePath + " --> " + curFilePath);
		readFilePath = curFilePath;
	}
	if(fileType!==curFileType)
	{
		vscode.window.showInformationMessage("修改默认文件类型: " + fileType + " --> " + curFileType);
		fileType = curFileType;
	}
}


/**
 * 读取文件内容
 * @param {string} folder 文件所在路径
 * @param {string} file 文件名
 * @returns string
 */
function readFile(folder , file)
{
	if (folder==__dirname)
	{
		// 未设置模板路径，读取默认模板
		folder = path.join(__dirname, "defaultTemplate");
		file = "Template.txt";
	}else{
		if(!file.includes(".")) file = file + "." + fileType;
	}
	const filePath = path.join(folder, file);
	console.log("读取文件：" + filePath);
	vscode.window.showInformationMessage("读取文件：" + filePath);
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		console.log(fileContent);
		return fileContent;
	} catch (error) {
		console.error('读取文件出错:', error);
		vscode.window.showInformationMessage(error)
		return "";
	}
}


/**
 * 在当前位置插入字符串
 * @param {string} str 
 */
function writeIn(str)
{
	//获取activeTextEditor
	const editor = vscode.window.activeTextEditor;
	if (editor) 
	{
		const selection = editor.selection;
		//替换原来文本
		editor.edit((editBuilder) => {
			editBuilder.replace(selection, str);
		});
	}
}


function cmdHello(){
	vscode.window.showInformationMessage('Hello World from PrivateCodeTemplate : ');
}
function cmdTest(){
	vscode.window.showInputBox({prompt: '请输入'}).then((input)=>{
		vscode.window.showInformationMessage('test from PrivateCodeTemplate : ' + input);
	});
}


/**
 * 命令：插入模板
 */
function cmdInsertTemplate()
{
	vscode.window.showInputBox({prompt: '请输入模板名称（后缀可选）'}).then((input)=>{
		const fileContent = readFile(readFilePath , input);
		writeIn(fileContent);
	});
}
