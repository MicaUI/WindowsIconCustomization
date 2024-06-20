const lightColors = {
	inputBackgroundColor: '#ffffff',
	inputBorderColor: '#00000035',
	inputLabelColor: '#000000',

	leftNavBackground: '#f3f3f3',
	leftNavItemHoverBackgroundColor: '#00000017',
	leftCurNavItemBackgroundColor: '#00000017',
	leftCurNavItemHoverBackgroundColor: '#00000017',

	label: '#000000',
	icon: '#000000',
	title: 'rgb(159, 151, 139)',

	mainContentBackground: '#f3f3f3',
	mainContentLeftTitle: '#000000',
	mainContentLeftSum: '#7a7979',
	backBtnColor: '#000000',
	mainContentIconWrapContent: '#ffffff',
	mainContentIconWrapContentBottomInfoNameCOlor: '#000000',
	mainContentIconWrapContentBottomInfoSumCOlor: '#000000',

	showInfoBackgroundColor: 'rgba(255, 255, 255, 0.82)',
	showInfoBorderColor: '#00000042',
	showInfoLabelBorderColor: '#00000038',
	showInfoLabelColor: '#000000',
	closeColor: '#000000',
	maskColor: '#2b2b2b',
	downloadBtnColor: ' rgba(0,0,0,0.8956)',
	downloadBtnBorderColor: 'rgba(255, 255, 255, 0.0786)',
	downloadBtnBackgroundColor: 'rgba(255, 255, 255, 0.80)',
};

const darkColors = {
	inputBackgroundColor: '#ffffff0d',
	inputBorderColor: '#ffffff14',
	inputLabelColor: 'rgba(255, 255, 255, 0.786)',

	leftNavBackground: '#202020',
	leftNavItemHoverBackgroundColor: 'rgba(255, 255, 255, 0.0605)',
	leftCurNavItemBackgroundColor: 'rgba(255, 255, 255, 0.0605)',
	leftCurNavItemHoverBackgroundColor: 'rgba(255, 255, 255, 0.0605)',

	label: '#FFFFFF',
	icon: '#FFFFFF',
	title: 'rgb(159, 151, 139)',

	mainContentBackground: '#202020',
	mainContentLeftTitle: '#ffffff',
	mainContentLeftSum: '#ffffff',
	backBtnColor: '#ffffff',
	mainContentIconWrapContent: '#2b2b2b',
	mainContentIconWrapContentBottomInfoNameCOlor: '#ffffff',
	mainContentIconWrapContentBottomInfoSumCOlor: '#ffffff',

	showInfoBackgroundColor: '#2c2c2cf0',
	showInfoBorderColor: '#ffffff0d',
	showInfoLabelBorderColor: '#ffffff17',
	showInfoLabelColor: '#FFFFFF',
	closeColor: '#FFFFFF',
	maskColor: '#2b2b2b',
	downloadBtnColor: ' #ffffff',
	downloadBtnBorderColor: 'rgba(255, 255, 255, 0.0786)',
	downloadBtnBackgroundColor: '#393939',
};

// auto change light dark
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (e) => {
	toggleTheme(e.matches);
});
toggleTheme(darkModeMediaQuery.matches);
function toggleTheme(dark = false) {
	const colors = dark ? darkColors : lightColors;
	Object.keys(colors).forEach((key) => {
		document.documentElement.style.setProperty(`--${key}`, colors[key]);
	});
	return dark ? 'dark' : 'light';
}
