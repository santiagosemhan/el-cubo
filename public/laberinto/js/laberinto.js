// Fade In Page
let opacity = 0;
let intervalID = 0;

const video = document.querySelector('.pane-video');
console.log('video: ' + video.dataset.video);


window.onload = function () {
    loadPlayer(video.dataset.video, video.dataset.poster);
    window.player.play();
};


// Pane Slide
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelectorAll('.close');
const pane = document.querySelector('.pane');
const pane_cover = document.querySelector('.pane-cover');

if (button_open) {
    button_open.forEach(function (link) {

        link.addEventListener('click', () => {
            pane.classList.add('open');

            loadPlayer(video.dataset.video, video.dataset.poster);
            player.play();

        });
    });
}

if (button_close) {
    button_close.forEach(function (link) {
        link.addEventListener('click', () => {
            pane.classList.toggle('open');

            setTimeout(() => {
                player.stop();
                loadPlayer('test', 'test');
            }, 500);


        });
    });
}





function loadPlayer(sURL, sPoster) {
    //document.addEventListener('DOMContentLoaded', () => {
    let source = 'https://rtvcplay-media-content.s3.amazonaws.com/vod-content/' + sURL + '/' + sURL + '.m3u8';

    const video = document.querySelector('video');

    video.setAttribute('poster', sPoster);


    // For more options see: https://github.com/sampotts/plyr/#options
    // captions.update is required for captions to work with hls.js
    const player = new Plyr(video, {
        captions: {
            active: true,
            update: true,
            language: 'en'
        }
    });

    if (!Hls.isSupported()) {
        video.src = source;
    } else {
        // For more Hls.js options, see https://github.com/dailymotion/hls.js
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        window.hls = hls;

        // Handle changing captions
        player.on('languagechange', () => {
            // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
            //setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
        });

        player.on('ended', function () {

            pane.classList.toggle('open');

            player.fullscreen.exit();

        });
    }

    // Expose player so it can be used from the console
    window.player = player;
    //});

}






// Click Button OK
const button_ok = document.getElementById('button_ok');

if (button_ok) {
    button_ok.addEventListener('click', () => {
        loadProgress('progress-0');
    });
}

/* Select option */

const answer_select = document.querySelectorAll('.pulse');
const next_select = document.getElementById('link-next');

if (answer_select) {
    answer_select.forEach(function (link) {

        link.addEventListener('click', () => {

            [].forEach.call(answer_select, function (el) {
                el.parentElement.classList.remove('selected');
            });

            link.parentElement.classList.add('selected');

            if (next_select) {
                next_select.classList.add('selected');
                next_select.href = link.dataset.rel;
            }
        });
    });
}