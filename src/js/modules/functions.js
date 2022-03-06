export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export const lockPadding = () => {
    const body = document.body;
    const fixBlocks = document.querySelectorAll('.fix-block');
    const paddingOffset = window.innerWidth - body.offsetWidth + 'px';
    if (fixBlocks.length === 0) {return}

    fixBlocks.forEach(block => {
        block.style.paddingRight = paddingOffset;
    });
    body.style.paddingRight = paddingOffset;
}
