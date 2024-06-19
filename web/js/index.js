import { doms } from './modules/dom.js';
let iconData, folders, file, highContrast, app, softwareData, lastData;

let allIconItemData,
	allFolderIconItemData,
	allFileIconItemData,
	allHighContrastIconItemData,
	allAppIconItemData;

/**
 * 将要生成的图标类型(是公司还是应用)
 * @type {string}
 */
let curWillCreateType;

/**
 * 当前页面
 * @type {string}
 */
let curPage = 'home';

/**
 * 不显示返回按钮的页面
 * @type {Array<string>}
 */
let noShowBackBtnPage = ['home', 'folders', 'file', 'company', 'software'];

/**
 * 最后位置
 * @type {Array<string>}
 */
let lastPosition = [];

/**
 * 配置文件的URL
 * @type {string}
 */
let configUrl = 'https://micaui.github.io/WindowsIconCustomization/CONFIG.json';
// configUrl = './../config.json';

/* 下载文件的基础路径 */
const baseUrl = 'https://micaui.github.io/WindowsIconCustomization/';

/* 启动函数 */
document.addEventListener('DOMContentLoaded', async function () {
	const configPromise = (await fetch(configUrl)).json();
	const config = await configPromise;
	main(config);
});
/* 主函数 */
const main = (_config) => {
	//_config 代表读取到的json中的数据
	iconData = convertConfigToIconData(_config);
	folders = convertFoldersToFoldersData(_config['folders']);
	file = convertConfigToFileData(_config);
	highContrast = convertConfigToHighContrastData(_config);
	app = convertConfigToAppData(_config);
	softwareData = convertConfigToSoftwareData(_config);

	allIconItemData = extractData(iconData, true);
	allFolderIconItemData = extractData(folders, true);
	allFileIconItemData = extractData(file, true);
	allHighContrastIconItemData = extractData(highContrast, true);
	allAppIconItemData = extractData(app, true);
	allIconItemData.push(...allFolderIconItemData);

	doms.sum.innerText = `(${countSpecificTypeObjects(iconData)})`;
	doms.sum.style.opacity = 1;
	// createIconWrapElement(iconData);
	createHomePage();
	setCurStatus(doms.mainHome);
	// hideLeftNav();
};

/**
 * Deconstructs the file object into a new object with specified properties.
 *
 * @param {Object} file - The file object to be deconstructed.
 * @param {string} file.path - The path of the file.
 * @param {string} file.name - The name of the file.
 * @param {string} file.company - The company associated with the file.
 * @param {string} file.app - The application associated with the file.
 * @param {string} file.type - The type of the file.
 * @return {Object} The deconstructed object with the following properties:
 *   - pic: The path of the file.
 *   - tip: The name of the file.
 *   - url: The URL of the file.
 *   - name: The name of the file.
 *   - company: The company associated with the file.
 *   - app: The application associated with the file.
 *   - type: The type of the file.
 */
const deconstructionFileData = (file) => {
	return {
		pic: file.path,
		tip: file.name,
		url: baseUrl + file.path,
		name: file.name,
		suffix: file.suffix,
		company: file.company,
		app: file.app,
		type: file.type,
	};
};
const convertConfigToIconData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders' || company === 'HighContrast') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].FileTypeIcon) {
				if (config[company][app].FileTypeIcon._files)
					fileList = config[company][app].FileTypeIcon._files;
			} else {
				if (config[company][app].AppIcon._files)
					fileList = config[company][app].AppIcon._files;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}

		data.push({
			[company]: apps,
		});
	}

	return data;
};
const convertFoldersToFoldersData = (folders) => {
	const data = [];
	for (const folder in folders) {
		let fileList = folders[folder]._files;

		const folderData = [];

		fileList.forEach((file) => {
			const fileData = deconstructionFileData(file);
			folderData.push(fileData);
		});

		data.push({
			[folder]: folderData,
		});
	}

	return data;
};
const convertConfigToFileData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders' || company === 'HighContrast') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].FileTypeIcon) {
				if (config[company][app].FileTypeIcon._files)
					fileList = config[company][app].FileTypeIcon._files;
			} else {
				continue;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}

		data.push({
			[company]: apps,
		});
	}

	return data;
};
const convertConfigToHighContrastData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders') {
			continue;
		} else if (company !== 'HighContrast') {
			const apps = [];

			for (const app in config[company]) {
				let highContrastList;
				if (config[company][app].AppIcon) {
					if (config[company][app].AppIcon._files)
						highContrastList = config[company][app].AppIcon._files;
				} else {
					continue;
				}
				const appData = [];
				highContrastList.forEach((file) => {
					if (
						file.name.endsWith('_HighContrastDark_Line') ||
						file.name.endsWith('_HighContrastDark')
					) {
						const fileData = deconstructionFileData(file);
						appData.push(fileData);
					}
				});

				apps.push({
					[app]: appData,
				});
			}

			data.push({
				[company]: apps,
			});
		} else {
			const highContrastList = config[company]._files;
			const appData = [];

			highContrastList.forEach((file) => {
				if (
					file.name.endsWith('_HighContrastDark_Line') ||
					file.name.endsWith('_HighContrastDark')
				) {
					const fileData = deconstructionFileData(file);
					appData.push(fileData);
				}
			});
			data.push({
				[company]: appData,
			});
		}
	}

	return data;
};
const convertConfigToAppData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders' || company === 'HighContrast') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].AppIcon) {
				if (config[company][app].AppIcon._files)
					fileList = config[company][app].AppIcon._files;
			} else {
				continue;
			}
			const appData = [];

			fileList.forEach((file) => {
				if (!file.name.endsWith('_HighContrastDark')) {
					const fileData = deconstructionFileData(file);
					appData.push(fileData);
				}
			});

			apps.push({
				[app]: appData,
			});
		}
		if (apps.length !== 0) {
			data.push({
				[company]: apps,
			});
		}
	}

	return data;
};
const convertConfigToSoftwareData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders' || company === 'HighContrast') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].FileTypeIcon) {
				if (config[company][app].FileTypeIcon._files)
					fileList = config[company][app].FileTypeIcon._files;
			} else {
				if (config[company][app].AppIcon._files)
					fileList = config[company][app].AppIcon._files;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}

		data.push(...apps);
	}

	return data;
};

let curLeftNavStatus = true;
const toggleLeftNav = () => {
	console.log('toggle');
	curLeftNavStatus = !curLeftNavStatus;
	curLeftNavStatus ? showLeftNav() : hideLeftNav();
};
const showLeftNav = () => {
	curLeftNavStatus = true;
	doms.leftNav.classList.remove('hide');
	doms.leftNav.classList.remove('show');
	doms.leftNav.classList.add('show');
};
const hideLeftNav = () => {
	curLeftNavStatus = false;
	doms.leftNav.classList.remove('hide');
	doms.leftNav.classList.remove('show');
	doms.leftNav.classList.add('hide');
};

doms.close.addEventListener('click', (e) => {
	hideShowInfo();
});

doms.inputIcon.addEventListener('click', (e) => {
	search();
});

doms.small.addEventListener('click', (e) => {
	showLeftNav();
	doms.searchInput.focus();
});

doms.control.addEventListener('click', (e) => {
	toggleLeftNav();
});

/**
 * setCurStatus
 * @param {HTMLElement} who - who
 */
const setCurStatus = (who) => {
	[
		doms.mainHome,
		doms.folders,
		doms.file,
		doms.app,
		doms.company,
		doms.software,
		doms.highContrast,
	].forEach((d) => {
		if (who.className != d.className) {
			d.classList.remove('cur');
		}
	});
	setTimeout(() => {
		if (who.className === 'label' || who.className === 'icon') {
			who.parentNode.classList.add('cur');
		} else {
			who.classList.add('cur');
		}
	}, 100);
};

doms.mainHome.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createHomePage();
});
doms.folders.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createFoldersPage();
});
doms.file.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createFilePage();
});
doms.highContrast.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createHighContrastPage();
});
doms.app.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createAppPage();
});
doms.company.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createCompanyPage();
});
doms.software.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createSoftwarePage();
});
doms.searchInput.addEventListener('focusin', (e) => {
	inputHasFocus = true;
	// doms.leftNav.classList.add('show');
});
doms.searchInput.addEventListener('focusout', (e) => {
	inputHasFocus = false;
	// doms.leftNav.classList.remove('show');
});

/**
 * Recursively traverses an object to extract data based on a target type.
 *
 * @param {Object} obj - The object to traverse.
 * @param {boolean} [more=false] - Whether to extract all data or only the first `targetCount` matches.
 * @param {number} [targetCount=7] - The maximum number of matches to extract.
 * @param {string} [targetType='tip'] - The type of data to extract.
 * @param {Array} [extractedData=[]] - The array to store the extracted data.
 * @return {Array} The extracted data, either the first `targetCount` matches or all matches if `more` is true.
 */
function extractData(
	obj,
	more = false,
	targetCount = 7,
	targetType = 'tip',
	extractedData = []
) {
	// Helper function to recursively traverse the object
	function traverse(obj) {
		// Check if the target count has been reached
		if (extractedData.length === targetCount && !more) {
			return;
		}

		// Check if the current object is an array
		if (Array.isArray(obj)) {
			// If it's an array, traverse each element
			obj.forEach((element) => traverse(element));
		} else if (typeof obj === 'object' && obj !== null) {
			// If it's an object, check if it contains the target type
			if (obj[targetType]) {
				extractedData.push(obj);
			}
			// Traverse each key-value pair
			Object.values(obj).forEach((value) => traverse(value));
		}
	}

	// Start traversing the object
	traverse(obj);
	if (!more) {
		return extractedData.slice(0, targetCount); // Return only the required number of extracted data
	} else {
		return extractedData;
	}
}

/**
 * Recursively counts the number of objects in the input object that contain a specific type specified by `targetType`.
 *
 * @param {Object} obj - The object to traverse and count specific type objects.
 * @param {string} [targetType='tip'] - The type of object to count.
 * @return {number} The total count of objects that match the specified type.
 */
function countSpecificTypeObjects(obj, targetType = 'tip') {
	let count = 0;

	function traverse(obj) {
		if (Array.isArray(obj)) {
			obj.forEach((element) => traverse(element));
		} else if (typeof obj === 'object' && obj !== null) {
			if (obj[targetType]) {
				count++;
			}
			Object.values(obj).forEach((value) => traverse(value));
		}
	}

	traverse(obj);

	return count;
}

const createHomePage = () => {
	curPage = 'home';
	createIconItemElement(allIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allIconItemData)})`;
	hideBack();
};
const createFoldersPage = () => {
	curPage = 'folders';
	createIconItemElement(allFolderIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allFolderIconItemData)})`;
	hideBack();
};
const createFilePage = () => {
	curPage = 'file';
	createIconItemElement(allFileIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allFileIconItemData)})`;
	hideBack();
};
const createHighContrastPage = () => {
	curPage = 'file';
	createIconItemElement(allHighContrastIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(
		allHighContrastIconItemData
	)})`;
	hideBack();
};
const createAppPage = () => {
	curPage = 'app';
	console.log(allAppIconItemData);
	createIconItemElement(allAppIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allAppIconItemData)})`;
	hideBack();
};

/* bottom categorization */
const createCompanyPage = () => {
	curPage = 'company';
	createIconWrapElement(iconData);
	doms.sum.innerText = `(${countSpecificTypeObjects(iconData)})`;
	hideBack();
};
const createSoftwarePage = () => {
	curPage = 'software';
	createAppElement(softwareData);
	doms.sum.innerText = `(${countSpecificTypeObjects(softwareData)})`;
	hideBack();
};

/* create right iconWrap and iconItem */

const createIconWrapElement = (what) => {
	doms.content.innerHTML = '';
	what.forEach((data) => {
		const companyName = Object.keys(data)[0];
		const allIconNum = countSpecificTypeObjects(data[companyName]);
		const iconWrap = document.createElement('div');
		const showIconData = extractData(data[companyName]);
		iconWrap.id = companyName;
		iconWrap.classList.add('iconWrap');
		iconWrap.innerHTML = `<div class="iconWrapContent">
	        <div class="smallIconWrap">
	        </div>
	    </div>
	    <div class="bottomInfo">
	        <p class="name">
	            ${companyName}
	        </p>
	        <span class="sum">
	            (${allIconNum})
	        </span>
	    </div>`;
		doms.content.appendChild(iconWrap);
		const iconWrapContent = iconWrap.querySelector('.iconWrapContent');
		const smallIconWrap = iconWrap.querySelector('.smallIconWrap');
		for (let i = 0; i < showIconData.length; i++) {
			if (i >= 3) {
				const smallIcon = document.createElement('div');
				smallIcon.classList.add('smallIcon');
				smallIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				smallIconWrap.appendChild(smallIcon);
			} else {
				const bigIcon = document.createElement('div');
				bigIcon.classList.add('bigIcon');
				bigIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				iconWrapContent.insertBefore(bigIcon, smallIconWrap);
			}
		}
		iconWrapContent.addEventListener('click', () => {
			lastData = what;
			curWillCreateType = 'wrap';
			curPage = 'canShowBack';
			lastPosition.push(companyName);
			createAppElement(data[companyName]);
		});
	});
	hideBack();
	doms.content.classList.remove('showIconItem');
	doms.content.classList.add('showIconWrap');
};
const createAppElement = (data = []) => {
	doms.content.innerHTML = '';
	data.forEach((d) => {
		const appName = Object.keys(d)[0];
		const allIconNum = countSpecificTypeObjects(d[appName]);
		const iconWrap = document.createElement('div');
		const showIconData = extractData(d[appName]);
		iconWrap.id = appName;
		iconWrap.classList.add('iconWrap');
		iconWrap.innerHTML = `<div class="iconWrapContent">
	        <div class="smallIconWrap">
	        </div>
	    </div>
	    <div class="bottomInfo">
	        <p class="name">
	            ${appName}
	        </p>
	        <span class="sum">
	            (${allIconNum})
	        </span>
	    </div>`;
		doms.content.appendChild(iconWrap);
		const iconWrapContent = iconWrap.querySelector('.iconWrapContent');
		const smallIconWrap = iconWrap.querySelector('.smallIconWrap');
		for (let i = 0; i < showIconData.length; i++) {
			if (i >= 3) {
				const smallIcon = document.createElement('div');
				smallIcon.classList.add('smallIcon');
				smallIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				smallIconWrap.appendChild(smallIcon);
			} else {
				const bigIcon = document.createElement('div');
				bigIcon.classList.add('bigIcon');
				bigIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				iconWrapContent.insertBefore(bigIcon, smallIconWrap);
			}
		}
		iconWrapContent.addEventListener('click', () => {
			curWillCreateType = 'app';
			lastData = data;
			lastPosition.push(appName);
			createIconItemElement(d[appName]);
		});
	});
	showBack();
	console.log(curPage);
	if (noShowBackBtnPage.includes(curPage)) {
		hideBack();
	}
	doms.content.classList.remove('showIconItem');
	doms.content.classList.add('showIconWrap');
};
/* create IconItem */
const createIconItemElement = (data) => {
	doms.content.innerHTML = '';
	data.forEach((d) => {
		const iconItem = document.createElement('div');
		iconItem.classList.add('iconItem');
		iconItem.title = d.tip;
		iconItem.innerHTML = `<img id="${d.name}" src="${d.pic}" alt="">`;
		iconItem.addEventListener('click', () => {
			// window.open(d.url);
			showShowInfo(d);
		});
		doms.content.appendChild(iconItem);
	});
	showBack();
	// if (!noShowBackBtnPage.includes(curPage)) {
	// showBack();
	// }
	doms.content.classList.remove('showIconWrap');
	doms.content.classList.add('showIconItem');
};

/* showInfo */
const showInfoDataInit = {
	pic: '',
	app: '',
	company: '',
	type: [],
};

const showInfoCapitalCaseMap = {
	app: 'App',
	company: 'Company',
	type: 'Type',
};

let showInfoData = showInfoDataInit;
const extractDataToShowInfo = (infoData, showInfoData) => {
	for (const key in showInfoData) {
		if (infoData[key] !== undefined) {
			showInfoData[key] = infoData[key];
		}
	}
};

const showShowInfo = (infoData) => {
	console.log(infoData);
	extractDataToShowInfo(infoData, showInfoData);
	doms.coverImgShow.src = showInfoData.pic;
	for (let key in showInfoData) {
		if (key === 'pic' || showInfoData[key] === '') {
			continue;
		}
		const infoItem = document.createElement('li');
		infoItem.classList.add('infoItem');
		infoItem.innerHTML = `<div class="what" title="${showInfoCapitalCaseMap[key]}">${showInfoCapitalCaseMap[key]}</div>
                        <div class="info" title="${showInfoData[key]}">${showInfoData[key]}</div>`;
		if (key === 'company' || key === 'app') {
			addEventListenerInfoItemClickWillGo(
				infoItem,
				key,
				showInfoData[key]
			);
		}
		doms.infoList.appendChild(infoItem);
	}
	doms.downloadBtn.onclick = () => {
		downLoadFile(infoData);
	};
	doms.showInfo.classList.remove('show');
	doms.showInfo.classList.remove('hide');
	doms.showInfo.classList.add('show');
};

const hideShowInfo = () => {
	doms.infoList.innerHTML = '';
	showInfoData = showInfoDataInit;
	doms.showInfo.classList.remove('show');
	doms.showInfo.classList.remove('hide');
	doms.showInfo.classList.add('hide');
};

/**
 * addEventListenerInfoItemClickWillGo
 * @type {HTMLDivElement} infoItem - infoItem
 * @type {string} key - key
 * @type {string} will - will
 */
const addEventListenerInfoItemClickWillGo = (
	infoItem = new HTMLDivElement(),
	key,
	will
) => {
	switch (key) {
		case 'company': {
			infoItem.removeEventListener('click', (e) => {
				hideShowInfo();
				createCompanyPage();
			});
			infoItem.addEventListener('click', (e) => {
				hideShowInfo();
				createCompanyPage();
				location.href = `#${will}`;

				// setTimeout(() => {
				// 	location.href = `#${will}`;
				// }, 1);
			});
			break;
		}
		case 'app': {
			infoItem.removeEventListener('click', (e) => {
				hideShowInfo();
				createAppPage();
			});
			infoItem.addEventListener('click', (e) => {
				hideShowInfo();
				createSoftwarePage();
				location.href = `#${will}`;

				// setTimeout(() => {
				// 	location.href = `#${will}`;
				// }, 1);
			});
			break;
		}
	}
};

/* back */
let isBackShow = false;
const hideBack = () => {
	doms.back.style.opacity = 0;
	isBackShow = false;
};
const showBack = () => {
	doms.back.style.opacity = 1;
	isBackShow = true;
};
const back = () => {
	if (!isBackShow) {
		return;
	}
	switch (curWillCreateType) {
		case 'wrap': {
			createIconWrapElement(iconData);
			location.href = `#${lastPosition.pop()}`;
			break;
		}
		case 'app': {
			createAppElement(lastData);
			location.href = `#${lastPosition.pop()}`;
		}
	}
	curWillCreateType = 'wrap';
};
doms.back.addEventListener('click', back);

const downLoadFile = (fileData) => {
	fetch(fileData.url)
		.then((response) => response.blob())
		.then((blob) => {
			// 将下载的文件保存到本地
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = `${fileData.name}.${fileData.suffix}`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		})
		.catch((error) => {
			console.error('下载失败:', error);
		});
};
