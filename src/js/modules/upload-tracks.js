export const req = new Request('../../files/tracks.json');
const tracksList = document.querySelector('.tracks');

const uploadTracks = (url) => {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            renderTracks(data)
        })
        .catch(error => {
            const message = `An error has occured: ${error}`;
            throw new Error(message);
        })
}

const makeNumber = (index) => {
    const result = (index + 1) < 10 ? `0${++index}` : `${++index}`;

    return result;
}

const renderTracks = (array) => {
    array.forEach(( track, index ) => {
        const {title, src} = track;

        const trackElem = document.createElement('li');
        trackElem.classList.add('tracks__item', 'track');
        trackElem.dataset.src = src;
        trackElem.dataset.index = index;
        trackElem.innerHTML = `
            <button class="track__btn">
                <span class="track__number">${makeNumber(index)}</span>
                <span class="track__title">${title}</span>
            </button>
        `

        tracksList.append(trackElem);
    });
}

uploadTracks(req);
