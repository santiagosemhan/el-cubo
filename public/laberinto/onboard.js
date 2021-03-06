// Fade In Page
let opacity = 0;
let intervalID = 0;
window.onload = fadeIn;

video = document.getElementsByClassName('pane-video')[0].dataset.video;
loadPlayer(video);


function fadeIn() {
    setInterval(show, 200);
    player.play();
}

function show() {
    let body = document.getElementById("body");
    opacity = Number(window.getComputedStyle(body)
        .getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity = opacity + 0.3;
        body.style.opacity = opacity
    } else {
        clearInterval(intervalID);
    }
}

function loadPlayer(sURL) {
    document.addEventListener('DOMContentLoaded', () => {
        let source = 'https://rtvcplay-media-content.s3.amazonaws.com/vod-content/' + sURL + '/' + sURL + '.m3u8';
        const video = document.querySelector('video');
        // For more options see: https://github.com/sampotts/plyr/#options
        // captions.update is required for captions to work with hls.js
        const player = new Plyr(video, {
            ratio: "16:9"
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
                setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
            });

            player.on('ended', function () {
                console.log('end');
                document.getElementsByClassName('pane-video')[0].classList.add('hide');
                document.getElementsByClassName('hero-onboarding')[0].classList.remove('hide');
                document.getElementsByClassName('hero-onboarding')[0].classList.add('visible');
            });
        }

        // Expose player so it can be used from the console
        window.player = player;

    });

}



/* Select option */

const answer_select = document.querySelectorAll('.li-questions li');
const next_select = document.getElementById('link-onboard');

if (answer_select) {
    answer_select.forEach(function (link) {

        link.addEventListener('click', () => {

            [].forEach.call(answer_select, function (el) {
                el.classList.remove('selected');
            });

            link.classList.add('selected');

            if (next_select) {
                next_select.classList.add('selected');
                next_select.href = link.dataset.rel;
            }
        });
    });
}