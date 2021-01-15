// Fade In Page
let opacity = 0;
let intervalID = 0;
window.onload = fadeIn;

function fadeIn() {
    setInterval(show, 200);
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

    loadPlayer();
}


function loadPlayer() {
    let source = 'https://rtvcplay-media-content.s3.amazonaws.com/vod-content/424404/424404.m3u8';
    const video = document.querySelector('video');

    const player = new Plyr(video, {

    });

    if (!Hls.isSupported()) {
        video.src = source;
    } else {

        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        window.hls = hls;



        player.on('ready', function () {


        });

        player.on('ended', function () {
            console.log('end');
            //document.getElementsByClassName('pane-video')[0].classList.add('hide');
            //document.getElementsByClassName('hero-onboarding')[0].classList.remove('hide'); 
        });



    }

    window.player = player;

}