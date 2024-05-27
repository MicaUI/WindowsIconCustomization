function extractDataToShowInfo(infoData, showInfoData) {
	for (const key in showInfoData) {
		if (infoData[key] !== undefined) {
			showInfoData[key] = infoData[key];
		}
	}
}

// // 测试数据
// const showInfoData = {
// 	pic: '',
// 	app: '',
// 	company: '',
// 	type: [],
// };

// const infoData = {
// 	pic: 'xygod.png',
// 	app: 'xygod',
// 	company: 'xygod',
// 	type: ['文件夹图标'],
// 	name: '123',
// };

// 调用函数并打印处理后的数据
extractDataToShowInfo(infoData, showInfoData);
console.log(showInfoData);
