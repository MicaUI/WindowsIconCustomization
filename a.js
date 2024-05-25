const fs = require('fs');
const path = require('path');

// 函数用于遍历目录下的所有文件
function traverseDirectory(dir, rootDir) {
	const companies = {};
	const fs = require('fs');
	const path = require('path');

	// 函数用于遍历目录下的所有文件，并按照指定格式组织成对象
	function traverseDirectory(dir, result = {}) {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			// 排除特定文件和文件夹
			if (file === '.git' || file === 'web') {
				continue;
			}
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				// 如果是文件夹，则递归遍历
				const subResult = traverseDirectory(filePath, {});
				// 检查是否是最后一级目录
				if (Object.keys(subResult).length === 0) {
					// 如果是最后一级目录，则将文件名添加到上级目录的数组中
					result[file] = [];
				} else {
					// 如果不是最后一级目录，则添加到当前目录的对象中
					result[file] = subResult;
				}
			} else {
				// 如果是文件，则将文件名添加到对应的文件夹中
				const parentDir = path.basename(dir);
				if (parentDir === 'WindowsIconCustomizationClone') {
					continue;
				}
				if (!result[parentDir]) {
					result[parentDir] = [];
				}
				if (!result[parentDir].includes(file)) {
					result[parentDir].push(file);
				}
			}
		}

		return result;
	}

	console.log(__dirname);

	// 遍历当前目录
	const fileList = traverseDirectory(__dirname);

	// 将结果写入config.json文件
	const outputDir = __dirname;
	const configPath = path.join(outputDir, 'config.json');
	fs.writeFileSync(configPath, JSON.stringify(fileList, null, 2));

	console.log('config.json 文件已生成');

	// 获取目录下的所有文件和文件夹
	const items = fs.readdirSync(dir);

	for (const item of items) {
		if (item === '.git' || item === 'web') {
			// 如果是 .git 或者 web 目录，则跳过
			continue;
		}

		const itemPath = path.join(dir, item);
		const relativePath = path.relative(rootDir, itemPath);
		const stats = fs.statSync(itemPath);

		if (stats.isDirectory()) {
			// 如果是文件夹，则递归遍历
			const software = traverseDirectory(itemPath, rootDir);
			companies[item] = software;
		} else {
			if (dir !== rootDir) {
				// 如果是根目录下的单个文件，则跳过
				if (!companies['_files']) {
					companies['_files'] = [];
				}
				companies['_files'].push(relativePath);
			}
		}
	}

	return companies;
}

// 遍历当前目录
const rootDir = __dirname;
const result = traverseDirectory(rootDir, rootDir);

// 将结果写入config.json文件
const outputDir = __dirname;
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}

const configPath = path.join(outputDir, 'config.json');
fs.writeFileSync(configPath, JSON.stringify(result, null, 2));

console.log('config.json 文件已生成');
