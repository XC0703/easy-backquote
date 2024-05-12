"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const processText_1 = __importDefault(require("./processText"));
const activate = (context) => {
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
            const processedText = (0, processText_1.default)(selectedText, 'single');
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
            const processedText = (0, processText_1.default)(selectedText);
            editor.edit(builder => {
                builder.replace(selection, processedText);
            });
            return;
        }
        else {
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
exports.activate = activate;
//# sourceMappingURL=extension.js.map