"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processText = (text, type = 'batch') => {
    if (type === 'single') {
        return '`' + text + '`';
    }
    let newText = text;
    // 只考虑单词边界情况，同时忽略已有反引号包裹的内容或加粗显示的内容
    newText = newText.replace(/\b(?<!`)(?<!\*\*)([a-zA-Z0-9_\-.]+)\b(?!`)(?!\*\*)/g, '`$1`');
    return newText;
};
exports.default = processText;
//# sourceMappingURL=processText.js.map