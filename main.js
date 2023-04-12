const playList = document.querySelector('.playlist');
const heading = document.querySelector('header h2');
const cdImg = document.querySelector('.cd__img');
const audio = document.querySelector('#audio');
const btnPlay = document.querySelector('.btn__play');
const player = document.querySelector('.player');
const progress = document.querySelector('#progress');
const btnNext = document.querySelector('.btn__next');
const btnPrev = document.querySelector('.btn__prev');
const btnRandom = document.querySelector('.btn__random');
const bntRepeat = document.querySelector('.btn__repeat');
const app = {
    songs: [{
            name: 'Bật Tình Yêu Lên',
            singer: 'Hòa MINZY',
            path: './song/Bật tình yêu lên.mp4',
            image: './img/img_1.jpg'
        },
        {
            name: 'Bộ Tộc',
            singer: 'PHÚC DU X PHÁO X ĐỘ MIXI',
            path: './song/ĐỘ TỘC 2 - FROM MIXI WITH LOVE - MASEW x PHÚC DU x PHÁO x ĐỘ MIXI [OFFICIAL MV LYRIC].mp4',
            image: './img/img_2.jpg'
        },
        {
            name: 'Lối Nhỏ',
            singer: 'Đen X Anh Đào',
            path: './song/Đen - Lối Nhỏ ft. Phương Anh Đào (M-V).mp4',
            image: './img/img_11.jpg'
        },
        {
            name: 'Tiếng mưa rơi',
            singer: 'Grey D',
            path: './song/dự báo thời tiết hôm nay mưa.mp4',
            image: './img/img_15.jpg'
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: './song/Ed Sheeran - Shape of You (Official Music Video).mp4',
            image: './img/img_3.jpg'
        },
        {
            name: 'Gió',
            singer: 'Jank',
            path: './song/Gió - Jank ( Lyrics Video) - Gió Mang Hương Về Giờ Em Ở Đâu....mp4',
            image: './img/img_12.jpg'
        },
        {
            name: 'Kìa Bóng Dáng Ai',
            singer: 'Pháo',
            path: './song/Pháo Northside - Kìa Bóng Dáng Ai (ft Sterry) - (OFFICIAL VISUALIZER MUSIC VIDEO).mp4',
            image: './img/img_14.jpg'
        },
        {
            name: 'FLOWER',
            singer: 'JISOO',
            path: './song/꽃 (FLOWER).mp4',
            image: './img/img_13.webp'
        },
        {
            name: 'Là Anh',
            singer: 'Mộng Nhiên',
            path: './song/LÀ ANH - Cover Nhạc Ngoại Lời Việt by PHẠM LỊCH ( It’s You -Mộng Nhiên).mp4',
            image: './img/img_7.jpg'
        },
        {
            name: 'Kimetsu No Yaiba',
            singer: 'Ẩn danh',
            path: './song/Lyrics & Vietsub - 𝐊𝐀𝐌𝐀𝐃𝐎 𝐓𝐀𝐍𝐉𝐈𝐑𝐎 𝐍𝐎 𝐔𝐓𝐀 (Kimetsu No Yaiba EP 19 OST) • Bày Đặt Làm Sub •.mp4',
            image: './img/img_8.jpg'
        },
        {
            name: 'Yume To Hazakura',
            singer: 'Ẩn danh',
            path: './song/Nightcore - 夢と葉桜 -- Yume To Hazakura「 ヲタみん -- Wotamin Cover 」Original song by- 青木月光 -- Aoki Gekkoh.mp4',
            image: './img/img_9.jpg'
        }
    ],
    CurrentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    getCurrentSong: function() {
        return this.songs[this.CurrentIndex];
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return (
                `
                <div class="song ${index === this.CurrentIndex ? 'active' : ''}" data-index="${index}">
                <img src="${song.image}" alt="" class="song__img">
                <div class="song__title">
                    <h4 class="song__titile-name">${song.name}</h4>
                    <div class="song__title-author">${song.singer}</div>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                </div>`
            )
        });
        playList.innerHTML = htmls.join('');
    },
    loadCurrentSong: function() {
        heading.textContent = this.getCurrentSong().name;
        cdImg.src = this.getCurrentSong().image;
        audio.src = this.getCurrentSong().path;
    },
    nextSong: function() {
        this.CurrentIndex++;
        if (this.CurrentIndex >= this.songs.length) {
            this.CurrentIndex = 0;
        };
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.CurrentIndex--;
        if (this.CurrentIndex < 0) {
            this.CurrentIndex = this.songs.length;
        }
        this.loadCurrentSong();
    },
    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while (newIndex === this.CurrentIndex)
        this.CurrentIndex = newIndex;
        this.loadCurrentSong();
    },
    ScrollToActiveSong: function() {
        setTimeout(function() {
            const songAtive = document.querySelector('.song.active');
            songAtive.scrollIntoView({
                behavior: "smooth",
                block: 'nearest'
            });
        }, 500);
    },
    handleEvent: function() {
        const _this = this;

        const cdImgAnimate = cdImg.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdImgAnimate.pause();
        btnPlay.addEventListener('click', () => {
            if (_this.isPlaying) {
                player.classList.remove('playing');
                audio.pause();
                this.isPlaying = false;
                cdImgAnimate.pause();
            } else {
                player.classList.add('playing');
                audio.play();
                this.isPlaying = true;
                cdImgAnimate.play();
            }
        })
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime;
        }

        btnNext.addEventListener('click', () => {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            if (player.classList.contains('playing'))
                audio.play();
            _this.render();
            _this.ScrollToActiveSong();
        })

        btnPrev.addEventListener('click', () => {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            if (player.classList.contains('playing'))
                audio.play();
            _this.render();
            _this.ScrollToActiveSong();

        })
        btnRandom.addEventListener('click', () => {
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle('active', _this.isRandom);
        })
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else {
                btnNext.click();
            }
        }
        bntRepeat.addEventListener('click', () => {
            _this.isRepeat = !_this.isRepeat;
            bntRepeat.classList.toggle('active', _this.isRepeat);
        })
        playList.addEventListener('click', (event) => {
            const songNode = event.target.closest('.song:not(.active)');
            if (songNode || event.target.closest('.option')) {
                if (songNode) {
                    _this.CurrentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    if (player.classList.contains('playing'))
                        audio.play();
                }
                if (event.target.closest('.option')) {

                }
            }
        })
    },

    strat: function() {
        this.handleEvent();
        this.loadCurrentSong();
        this.render();
    },
};

app.strat();