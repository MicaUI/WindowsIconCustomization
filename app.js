const fs = require('fs');
const path = require('path');

function excludeDifferentExtensions(data) {
	for (const key in data) {
		if (key === '_files') {
			const filenames = new Set();
			data[key] = data[key].filter((file) => {
				const filename = file.name;
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

const noCreateFileName = [
	'16w',
	'20w',
	'32w',
	'40w',
	'48w',
	'60w',
	'64w',
	'72w',
	'80w',
	'96w',
	'256w',
	'16',
	'20',
	'32',
	'40',
	'48',
	'60',
	'64',
	'72',
	'80',
	'96',
	'256',
];
function containsKeyword(fileName) {
	for (let i = 0; i < noCreateFileName.length; i++) {
		if (fileName.includes(noCreateFileName[i])) {
			return true;
		}
	}
	return false;
}

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
				// Au16w Au20w Au32w
				if (!containsKeyword(item.split('.')[0]))
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
let result = traverseDirectory(rootDir, rootDir);
result = excludeDifferentExtensions(result);
// 将结果写入config.json文件
const outputDir = __dirname;
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}

const configPath = path.join(outputDir, 'config.json');
fs.writeFileSync(configPath, JSON.stringify(result, null, 2));

console.log('config.json 文件已生成');
