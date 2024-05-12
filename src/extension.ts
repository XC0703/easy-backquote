import * as vscode from 'vscode';
import processText from './processText';

export const activate = (context: vscode.ExtensionContext) => {
	const singleChange = vscode.commands.registerCommand('easy-backquote.single', () => {
		// 获取当前打开的编辑窗口
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		// 获取当前打开的文档，只处理 Markdown 文件
		const document = editor.document;
		const fileType = document.languageId;
		if (fileType !== 'markdown') {
			return;
		}

		// 如果当前有选中的文本,则只对选中的文本进行处理
		const selection = editor.selection;
		const selectedText = document.getText(selection);
		if (selectedText) {
			// 进行处理并替换选中的文本
			const processedText = processText(selectedText, 'single');
			editor.edit(builder => {
				builder.replace(selection, processedText);
			});
		}
	});
	const batchingChange = vscode.commands.registerCommand('easy-backquote.batching', () => {
		// 获取当前打开的编辑窗口
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		// 获取当前打开的文档，只处理 Markdown 文件
		const document = editor.document;
		const fileType = document.languageId;
		if (fileType !== 'markdown') {
			return;
		}

		// 如果当前有选中的文本,则只对选中的文本进行处理
		const selection = editor.selection;
		const selectedText = document.getText(selection);
		if (selectedText) {
			// 进行处理并替换选中的文本
			const processedText = processText(selectedText);
			editor.edit(builder => {
				builder.replace(selection, processedText);
			});
			return;
		} else {
			vscode.window.showInformationMessage('暂不支持扫描整个文档，请选择有效的内容进行处理!');
		}

		/**
		 * 使用 vscode.workspace.edit 方法对整个文档进行逐行处理（暂不支持）
		 */
		// const lineCount = document.lineCount;
		// editor.edit(builder => {
		// 	for (let i = 0; i < lineCount; i++) {
		// 		// 获取当前行的文本
		// 		const textLine = document.lineAt(i);
		// 		const oriTrimText = textLine.text.trimEnd();
		// 		// 分情况进行处理
		// 		if (oriTrimText.length === 0) {
		// 			builder.replace(textLine.range, '');
		// 		} else {
		// 			// 进行处理并替换当前行
		// 			const processedText = processText(oriTrimText);
		// 			builder.replace(textLine.range, processedText);
		// 		}
		// 	}
		// });

		/**
		 * 使用 vscode.workspace.applyEdit 方法对整个文档进行逐行处理（为每行文本建立一个 TextEdit 编辑对象）（暂不支持）
		 */
		// const lineCount = document.lineCount;
		// const textEdits = [];
		// for (let i = 0; i < lineCount; i++) {
		// 	// 获取当前行的文本
		// 	const textLine = document.lineAt(i);
		// 	const oriTrimText = textLine.text.trimEnd();
		// 	// 分情况进行处理
		// 	if (oriTrimText.length === 0) {
		// 		textEdits.push(new vscode.TextEdit(textLine.range, ''));
		// 	} else {
		// 		// 进行处理并替换当前行
		// 		const processedText = processText(oriTrimText);
		// 		textEdits.push(new vscode.TextEdit(textLine.range, processedText));
		// 	}
		// }
		// // 应用编辑
		// const workspaceEdit = new vscode.WorkspaceEdit();
		// workspaceEdit.set(document.uri, textEdits);
		// vscode.workspace.applyEdit(workspaceEdit);
	});
	context.subscriptions.push(singleChange, batchingChange);
};
