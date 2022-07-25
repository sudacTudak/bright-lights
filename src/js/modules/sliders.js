import Swiper, { Navigation, Lazy } from 'swiper';
import { transitionTime } from './cssProperties.js';

const news = document.querySelector('.news__slider');
const tours = document.querySelector('.slider-tours');

if (news) {
    const sliderNews = new Swiper(news, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        speed: transitionTime,
        modules: [Lazy],
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            checkInView: true,
        },
        breakpoints: {
            768: {
                watchSlidesProgress: true,
                slidesPerView: 2,
            },
            993: {
                slidesPerView: 3,
            }
        }
    })
}

if (tours) {
    const sliderTours = new Swiper(tours, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        speed: transitionTime,
        modules: [Navigation, Lazy],
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            checkInView: true,
        },
        navigation: {
            prevEl: '.nav-tours__btn_prev',
            nextEl: '.nav-tours__btn_next',
        },
        breakpoints: {
            479: {
                watchSlidesProgress: true,
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            }
        }
    })
}
