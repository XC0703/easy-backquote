const processText = (text: string, type: 'single' | 'batch' = 'batch') => {
	if (type === 'single') {
		return '`' + text + '`';
	}
	let newText = text;
	// 只考虑单词边界情况，同时忽略已有反引号包裹的内容或加粗显示的内容
	newText = newText.replace(/\b(?<!`)(?<!\*\*)([a-zA-Z0-9_\-.]+)\b(?!`)(?!\*\*)/g, '`$1`');
	return newText;
};

export default processText;
