// Fade In Page
let opacity = 0;
let intervalID = 0;

const video = document.querySelector('.pane-video');


function createSquare(pClass) {
    let square = document.createElement('div');
    square.setAttribute("class", pClass);
    return square;
}



window.onload = function () {



    setTimeout(() => {
        //player.stop();
        document.querySelectorAll('.pane-bg')[0].classList.add('black');
        loadPlayer(video.dataset.video, video.dataset.poster);
        window.player.play();
    }, 3000);


    comment_init = false;
    comment_end = false;
    settime(60);

    // get the ul#menu
    const controls = document.querySelector('.plyr__progress');
    // add menu item
    controls.appendChild(createSquare('marker'));

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
            comment_init = false;
            comment_end = false;
            settime(100);
            player.play();

        });
    });
}

if (button_close) {
    button_close.forEach(function (link) {
        link.addEventListener('click', () => {
            pane.classList.toggle('open');
            hideComments();

            setTimeout(() => {
                //player.stop();

                loadPlayer('test', 'test');
            }, 500);


        });
    });
}





function loadPlayer(sURL, sPoster) {
    //document.addEventListener('DOMContentLoaded', () => {


    //let source = 'https://rtvcplay-media-content.s3.amazonaws.com/vod-content/' + sURL + '/' + sURL + '.m3u8';

    let source = 'https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:' + sURL + '.smil/playlist.m3u8';
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
            hideComments();
            player.fullscreen.exit();
            comment_init = false;
            comment_end = false;

        });
    }

    // Expose player so it can be used from the console
    window.player = player;
    //});

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



// Pane Slide Comments
const button_open_comments = document.querySelectorAll('.open-comments');
const button_close_comments = document.querySelector('.close-comments');
const pane_comments = document.querySelector('.pane-comments');
const pane_cover_comments = document.querySelector('.pane-cover-comments');

if (button_open_comments) {
    button_open_comments.forEach(function (link) {
        link.addEventListener('click', () => {
            pane_comments.classList.add('open');
            pane_cover_comments.classList.toggle('visible');
            player.pause();
        });
    });
}

if (button_close_comments) {
    button_close_comments.addEventListener('click', () => {
        pane_comments.classList.toggle('open');
        pane_cover_comments.classList.toggle('visible');
        player.play();
    });
}



// Comment trigger
let comment_init = false;
let comment_end = false;

function settime(pSecond) {

    time_end = pSecond + 15;

    let timer = setInterval(function () {
        console.log(player.currentTime);
        if (pSecond < player.currentTime) {
            if (!comment_init) {
                comment_init = true;
                showComments();
            }
        } else {
            comment_init = false;
        }

        if (time_end < player.currentTime) {
            if (comment_init && !comment_end) {
                comment_end = true;
                hideComments();
            }
        } else {
            comment_end = false;
        }

        // Se cumplen los 2
        if (comment_init && comment_end) {
            console.log('se cumplen los 2');
        }

    }, 1000);

}

function showComments() {
    document.querySelectorAll('.comments-bullet')[0].classList.add('visible');
}

function hideComments() {
    document.querySelectorAll('.comments-bullet')[0].classList.remove('visible');
}