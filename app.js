const fs = require('fs');
const path = require('path');

// 函数用于遍历目录下的所有文件
function traverseDirectory(dir, rootDir) {
	const companies = {};

	// 获取目录下的所有文件和文件夹
	const items = fs.readdirSync(dir);

	for (const item of items) {
		if (item === '.git' || item === 'web' || item.endsWith('.md')) {
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
				companies['_files'].push({
					path: relativePath,
					name: item.split('.')[0],
					type: item.split('.')[1],
				});
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
