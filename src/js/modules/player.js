import { req } from "./upload-tracks.js";
const trackList = document.querySelector(".tracks");
const players = document.querySelectorAll(".player");
const audioBars = document.querySelectorAll(".player__line");
const audioProgress = document.querySelectorAll(".player__progress");
const playerIcons = {
    play: "img/sprite/sprite.svg#play",
    pause: "img/sprite/sprite.svg#pause",
};
let tracksArray = [];
let previousActiveTrack = null;
let currentTrackIndex = 0;

const trueNumber = (number) => {
    const result = number < 10 ? `0${number}` : `${number}`;
    return result;
};

const uploadTracks = (url) => {
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            tracksArray = data;
            initPlayers();
        })
        .catch((error) => {
            const message = `An error has occured: ${error}`;
            throw new Error(message);
        });
};

const setActiveEl = (index) => {
    const track = trackList.querySelector(`.track[data-index="${index}"]`);

    if (previousActiveTrack) {
        previousActiveTrack.classList.remove("track_active");
    }
    previousActiveTrack = track;
    track.classList.add("track_active");
};

const setTotalTime = (element, totalTime) => {
    const timeInSeconds = Math.floor(totalTime);
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;

    element.textContent = `${trueNumber(minutes)}:${trueNumber(seconds)}`;
};

const changeTime = (element, currentTime) => {
    const timeInSeconds = Math.floor(currentTime);
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;

    element.textContent = `${trueNumber(minutes)}:${trueNumber(seconds)}`;
};

const setTrack = (player, index) => {
    const audio = player.querySelector(".player__audio");
    const src = tracksArray[index].src;

    audio.src = src;
    currentTrackIndex = index;

    if (player.classList.contains("music__player")) {
        setActiveEl(index);
    }
};

const setNewTrack = (player) => {
    const newTrackIndex =
        currentTrackIndex + 1 < tracksArray.length ? currentTrackIndex + 1 : 0;

    setTrack(player, newTrackIndex);
};

const changeProgress = (progressBar, currentTime, totalTime) => {
    const progressWidth = `${(currentTime / totalTime) * 100}%`;
    progressBar.style.width = progressWidth;
};

const stopOtherAudio = () => {
    if (document.querySelectorAll(".player.--playing").length === 0) {
        return;
    }

    players.forEach((player) => {
        const audio = player.querySelector(".player__audio");
        pauseAudio(player, audio);
    });
};

const pauseAudio = (player, audio) => {
    const playerBtn = player.querySelector(".player__btn");
    const playerBtnIcon = playerBtn.querySelector(".player__btn use");
    audio.pause();
    audio.removeAttribute("data-play");
    audio.setAttribute("data-pause", "");
    player.classList.remove("--playing");
    playerBtn.classList.remove("--pause");
    playerBtnIcon.setAttribute("href", `${playerIcons.play}`);
};

const playAudio = (player, audio) => {
    stopOtherAudio();

    const playerBtn = player.querySelector(".player__btn");
    const playerBtnIcon = playerBtn.querySelector(".player__btn use");
    audio.play();
    audio.removeAttribute("data-pause");
    audio.setAttribute("data-play", "");
    player.classList.add("--playing");
    playerBtn.classList.add("--pause");
    playerBtnIcon.setAttribute("href", `${playerIcons.pause}`);
};

const scrollAudio = (bar, x, audio) => {
    const progress = bar.querySelector(".player__progress");
    const percent = (x / bar.scrollWidth) * 100;
    const time = (audio.duration / 100) * percent;

    audio.currentTime = time;
    changeProgress(progress, time, audio.duration);
};

const moveProgress = (playerBarWidth, progressBar, x) => {
    const percent = (x / playerBarWidth) * 100;

    progressBar.style.width = `${percent}%`;
};

const initPlayers = () => {
    players.forEach((player) => {
        const playerBar = player.querySelector(".player__bar");
        const progressBar = playerBar.querySelector(".player__progress");
        const currentProgress = progressBar.querySelector(".player__current");
        const totalTimeEl = player.querySelector(".time-audio__total");
        const currentTimeEl = player.querySelector(".time-audio__current");
        const audio = player.querySelector(".player__audio");
        let isMouseDown = false;

        setTrack(player, 0);

        audio.addEventListener("loadedmetadata", () => {
            setTotalTime(totalTimeEl, audio.duration);
        });

        player.addEventListener("click", (e) => {
            const self = e.target;

            if (self.closest(".player__btn")) {
                audio.hasAttribute("data-play")
                    ? pauseAudio(player, audio)
                    : playAudio(player, audio);
            }

            if (self.closest(".player__bar")) {
                const x = e.pageX;
                const rect = playerBar.getBoundingClientRect();
                const xInner = Math.abs(x - rect.left);
                scrollAudio(playerBar, xInner, audio);
            }
        });

        currentProgress.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (e.which === 1) {
                isMouseDown = true;
                player.classList.add("--playing");
            }
        });

        currentProgress.addEventListener("mouseup", (e) => {
            e.preventDefault();
            if (e.which === 1) {
                isMouseDown = true;
                player.classList.remove("--playing");
            }
        });

        currentProgress.addEventListener("mousemove", (e) => {
            e.preventDefault();
            if (isMouseDown && e.which === 1) {
                const x = e.pageX;
                const rect = playerBar.getBoundingClientRect();
                const xInner = Math.abs(x - rect.left);
                const barWidth = playerBar.scrollWidth;

                moveProgress(barWidth, progressBar, xInner);
            }
        });

        audio.addEventListener("timeupdate", (e) => {
            changeProgress(progressBar, audio.currentTime, audio.duration);
            changeTime(currentTimeEl, audio.currentTime);
        });

        audio.addEventListener("ended", () => {
            if (player.classList.contains("hero__player")) {
                playAudio(player, audio);
            } else {
                setNewTrack(player);
                playAudio(player, audio);
            }
        });
    });

    trackList.addEventListener("click", (e) => {
        const self = e.target;
        const track = self.closest(".track");

        if (track) {
            const player = Array.prototype.find.call(players, (elem) =>
                elem.classList.contains("music__player")
            );
            const audio = player.querySelector(".player__audio");
            setTrack(player, track.dataset.index);
            playAudio(player, audio);
        }
    });
};

uploadTracks(req);
