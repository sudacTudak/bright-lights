const animationElements = document.querySelectorAll('[data-animation]');
const elementsPosition = [];

const startAnimation = (y) => {
    if (elementsPosition.length === 0) {return;}

    const currentPosition = y + document.documentElement.clientHeight / 4 * 3;

    elementsPosition.forEach((pos, index) => {
        if (currentPosition >= pos) {
            const currentEl = animationElements[index];

            currentEl.classList.remove('animated-hidden');

            if (currentEl.dataset.animation === "title") {
                currentEl.classList.add('animated-title');
            };
            if (currentEl.dataset.animation === "up") {
                currentEl.classList.add('animated-up');
            };
            if (currentEl.dataset.animation === "right") {
                currentEl.classList.add('animated-right');
            }

            currentEl.removeAttribute('data-animation');
            delete elementsPosition[index];
        }
    })


}

if (animationElements.length > 0) {
    animationElements.forEach(el => {
        if (el.hasAttribute('data-animation')) {
            const elPosition = el.getBoundingClientRect().top + window.scrollY;

            el.classList.add('animated-hidden');
            elementsPosition.push(elPosition);
        }
    })

    startAnimation(window.scrollY);
}

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    startAnimation(currentScroll);
})

