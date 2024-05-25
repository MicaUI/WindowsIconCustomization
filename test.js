function convertConfigToData(config) {
	const data = [];

	for (const company in config) {
		if (company === 'folders') {
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
			console.log(app);
			console.log(fileList);

			fileList.forEach((file) => {
				const fileData = {
					pic: file.path,
					tip: file.name,
					url: '#',
					name: file.name,
				};
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
}

document.addEventListener('DOMContentLoaded', function () {
	$.getJSON('../../config.json', function (_config) {
		//data 代表读取到的json中的数据
		const data = convertConfigToData(_config);
		console.log(data);
	});
});
