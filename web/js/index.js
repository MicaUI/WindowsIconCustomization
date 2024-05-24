const doms = {
	/**
	 * searchInput
	 * @type {HTMLInputElement} searchInput - searchInput
	 */
	searchInput: document.querySelector('.searchInput'),
	/**
	 * leftNav
	 * @type {HTMLDivElement} leftNav - leftNav
	 */
	leftNav: document.querySelector('.leftNav'),
	/**
	 * content
	 * @type {HTMLDivElement} content - content
	 */
	content: document.querySelector('.mainContent .content'),
};
let inputHasFocus = false;
doms.searchInput.addEventListener('focusin', (e) => {
	inputHasFocus = true;
	doms.leftNav.classList.add('show');
});
doms.searchInput.addEventListener('focusout', (e) => {
	inputHasFocus = false;
	doms.leftNav.classList.remove('show');
});

const parseData = () => {
	console.log(config);
};
parseData();
const createIconItemElement = () => {
	data.home.forEach((h) => {
		const iconItem = document.createElement('div');
		iconItem.innerHTML = `<div class="iconItem">
            <img src="${h.pic}" title="${h.tip}" alt="">
         </div>`;
		iconItem.addEventListener('click', () => {
			window.open(h.url);
		});
		doms.content.appendChild(iconItem);
	});
	doms.content.classList.remove('showIconWrap');
	doms.content.classList.add('showIconItem');
};
const createIconWrapElement = (what) => {
	config[what].forEach((a, i) => {
		const content = config[what][i][Object.keys(config[what][i])[0]];
		console.log(content);
		const iconWrap = document.createElement('div');
		iconWrap.innerHTML = `<div class="iconWrap">
    <div class="iconWrapContent">
        <div class="bigIcon" style='display:${content[0] ? 'block' : 'none'}'>
            <img src="${content[0] ? content[0].pic : ''}" alt="">
        </div>
        <div class="bigIcon" style='display:${content[1] ? 'block' : 'none'}'>
            <img src="${content[1] ? content[1].pic : ''}" alt="">
        </div>
        <div class="bigIcon" style='display:${content[2] ? 'block' : 'none'}'>
            <img src="${content[2] ? content[2].pic : ''}" alt="">
        </div>
        <div class="smallIconWrap">
            <div class="smallIcon" style='display:${
				content[3] ? 'block' : 'none'
			}'>
                <img src="${content[3] ? content[3].pic : ''}" alt="">
            </div>
            <div class="smallIcon" style='display:${
				content[4] ? 'block' : 'none'
			}'>
                <img src="${content[4] ? content[4].pic : ''}" alt="">
            </div>
            <div class="smallIcon" style='display:${
				content[5] ? 'block' : 'none'
			}'>
                <img src="${content[5] ? content[5].pic : ''}" alt="">
            </div>
            <div class="smallIcon" style='display:${
				content[6] ? 'block' : 'none'
			}'>
                <img src="${content[6] ? content[6].pic : ''}" alt="">
            </div>
        </div>
    </div>
    <div class="bottomInfo">
        <p class="name">
            ${Object.keys(config[what][i])[0]}
        </p>
        <span class="sum">
            (${content.length})
        </span>
    </div>
        </div>`;
		doms.content.appendChild(iconWrap);
	});
	doms.content.classList.remove('showIconItem');
	doms.content.classList.add('showIconWrap');
};

// createHomeElement();

createIconWrapElement('app');

{
	/* <div class="iconWrap">
    <div class="iconWrapContent">
        <div class="bigIcon">
            <img src="./asset/1716458856474.png" alt="">
        </div>
        <div class="bigIcon">
            <img src="./asset/1716515782501.png" alt="">
        </div>
        <div class="bigIcon">
            <img src="./asset/1716515799621.png" alt="">
        </div>
        <div class="smallIconWrap">
            <div class="smallIcon">
                <img src="./asset/1716515811590.png" alt="">
            </div>
            <div class="smallIcon">
                <img src="./asset/1716515811590.png" alt="">
            </div>
            <div class="smallIcon">
                <img src="./asset/1716515811590.png" alt="">
            </div>
            <div class="smallIcon">
                <img src="./asset/1716515811590.png" alt="">
            </div>
        </div>
    </div>
    <div class="bottomInfo">
        <p class="name">
            xygod
        </p>
        <span class="sum">
            (99)
        </span>
    </div>
</div> */
}
