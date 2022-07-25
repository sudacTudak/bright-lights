const media1 = 1152;
const media3 = 767.98;
const quoteContent = document.querySelector('.quote-about__content');
const quoteInfo = document.querySelector('.quote-about__info');
const quoteImage = document.querySelector('.quote-about__image');
const musicTitle = document.querySelector('.music__title');
const musicContainer = document.querySelector('.music__container');
const musicColumnRight = document.querySelector('.music__column--right');
const pageWidth = Math.max(
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth,
    document.documentElement.scrollWidth
);

const replaceQuoteImage = (maxWidth) => {
    if (maxWidth < media3) {
        quoteInfo.prepend(quoteImage);
    } else {
        quoteContent.append(quoteImage);
    }
}

window.addEventListener('resize', () => {
    const pageWidth = Math.max(
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
        document.documentElement.scrollWidth
    );

    replaceQuoteImage(pageWidth);
})

replaceQuoteImage(pageWidth);
