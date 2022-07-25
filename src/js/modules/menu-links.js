import SmoothScroll from 'smooth-scroll';
import { transitionTime } from './cssProperties.js';

const navLinks = document.querySelectorAll('[data-scroll]');
const sections = document.querySelectorAll('[data-scroll-section]');
const footer = document.querySelector('.footer');
const windowHeight = document.documentElement.clientHeight;



const disableScroll = () => {
    setTimeout(() => {
        const body = document.body;
        const currentPosition = window.scrollY;

        body.classList.add('disable-scroll')
        body.dataset.position = currentPosition;
        body.style.top = currentPosition + 'px';
    }, transitionTime)
}

const enableScroll = () => {
    const body = document.body;
    const currentPosition = parseInt(body.dataset.position, 10);

    body.style.top = '';
    body.classList.remove('disable-scroll');
    window.scrollTo({top: currentPosition, left: 0});
    body.removeAttribute('data-position');
}

const activateLink = (id) => {
    navLinks.forEach(link => {
        const href = link.href
        const startIndex = href.indexOf('#');
        const strWidthLinkId = href.substr(startIndex);

        link.classList.toggle(
            'nav__link--active',
            strWidthLinkId === `#${id}`
        )
    })
}

const scroll = new SmoothScroll('a[href*="#"]', {
    speed: transitionTime,
    header: '.header'
});

const findCurrentSection = (y) => {
    sections.forEach(el => {
        const elPosition = el.getBoundingClientRect().top + window.scrollY;

        if (y + (document.documentElement.clientHeight / 2) >= elPosition) {
            const id = el.getAttribute('id');
            activateLink(id);
        }
    })
}

window.addEventListener('scroll', () => {
    const offset = window.scrollY;

    findCurrentSection(offset);
})

findCurrentSection(window.scrollY);

window.addEventListener('resize', () => {
    const pageWidth = Math.max(
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
        document.documentElement.scrollWidth
    );

    if (pageWidth <= 767.98) {
        document.addEventListener('scrollStart', enableScroll, true);
        document.addEventListener('scrollStop', disableScroll, true);
    } else {
        document.removeEventListener('scrollStart', enableScroll, true);
        document.removeEventListener('scrollStop', disableScroll, true);
    }
})






