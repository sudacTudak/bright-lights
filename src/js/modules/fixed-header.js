const header = document.querySelector('.header');
const heroContent = document.querySelector('.hero__content');

const toggleHeaderBG = (y) => {
    if (y > heroContent.offsetTop - 200) {
        header.classList.add('header_moving');
    } else {
        header.classList.remove('header_moving');
    }
}

window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    toggleHeaderBG(offset);
})

toggleHeaderBG(window.scrollY);
