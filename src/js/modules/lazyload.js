const lazyLoad = () => {
    const lazyImages = document.querySelectorAll('img[data-lazy-src]');
    const windowHeight = document.documentElement.clientHeight;
    const lazyImagesPosition = [];

    let lazyImgCount = 0;

    const showLazyImages = (imgIndex) => {
        const lazyImage = lazyImages[imgIndex];

        lazyImage.src = lazyImage.dataset.lazySrc;
        lazyImage.removeAttribute('data-lazy-src');

        delete lazyImagesPosition[imgIndex];
        lazyImgCount--;
    }

    const lazyScrollCheck = () => {
        if (lazyImagesPosition.length > 0) {
            let imgIndex = lazyImagesPosition.findIndex(
                item => window.scrollY  >= item - windowHeight
            );

            if (imgIndex >= 0) {
                if (lazyImages[imgIndex].dataset.lazySrc) {
                    showLazyImages(imgIndex);
                }
            }
        }
    }

    const lazyScroll = () => {
        if (lazyImgCount > 0) {
            lazyScrollCheck();
        }
    }

    if (lazyImages.length > 0) {
        lazyImages.forEach(img => {
            if (img.dataset.lazySrc) {
                lazyImagesPosition.push(img.getBoundingClientRect().top + window.scrollY);
                lazyImgCount++;
                lazyScrollCheck();
            }
        })
    }


    window.addEventListener('scroll', lazyScroll);
}

lazyLoad();
