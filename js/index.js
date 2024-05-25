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

console.log(doms);
let inputHasFocus = false;
doms.searchInput.addEventListener('focusin', (e) => {
	inputHasFocus = true;
	doms.leftNav.classList.add('show');
});
doms.searchInput.addEventListener('focusout', (e) => {
	inputHasFocus = false;
	doms.leftNav.classList.remove('show');
});

const createHomeElement = () => {
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
};
createHomeElement();
