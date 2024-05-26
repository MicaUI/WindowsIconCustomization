function excludeDifferentExtensions(data) {
	for (const key in data) {
		if (key === '_files') {
			const filenames = new Set();
			console.log(key);
			data[key] = data[key].filter((file) => {
				const filename = file.name;
				console.log(filename);
				if (filenames.has(filename)) {
					return false; // 如果已经存在相同文件名，则排除该文件
				} else {
					filenames.add(filename);
					return true;
				}
			});
		} else if (typeof data[key] === 'object') {
			data[key] = excludeDifferentExtensions(data[key]); // 递归处理嵌套结构
		}
	}

	return data; // 返回处理后的数据
}

// 测试数据
const testdata = {
	Google: {
		Android: {
			FileTypeIcon: {
				_files: [
					{
						path: 'Google\\Android\\FileTypeIcon\\apk.ico',
						name: 'apk',
						type: 'ico',
					},
					{
						path: 'Google\\Android\\FileTypeIcon\\apk.png',
						name: 'apk',
						type: 'png',
					},
					{
						path: 'Google\\Android\\FileTypeIcon\\apk2.ico',
						name: 'apk2',
						type: 'ico',
					},
					{
						path: 'Google\\Android\\FileTypeIcon\\apk2.png',
						name: 'apk2',
						type: 'png',
					},
				],
			},
		},
	},
};

// 调用函数并打印处理后的数据
const processedData = excludeDifferentExtensions(testdata);
console.log(JSON.stringify(processedData, null, 2));
