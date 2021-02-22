// Fade In Page
let opacity = 0;
let intervalID = 0;

const video = document.querySelector('.pane-video');
const time_comments = video.dataset.comments;
const video_duration = video.dataset.duration;


function createSquare(pClass) {
    let percent = calculatePercent(time_comments, video_duration);

    let square = document.createElement('div');
    square.setAttribute("class", pClass);
    square.setAttribute("style", "left: " + percent + "%;");
    return square;
}

function createTitle(pTitle) {
    let plyr_title = document.createElement('h2');
    plyr_title.setAttribute("class", 'plyr_title');
    plyr_title.innerHTML = pTitle;
    return plyr_title;
}





window.onload = function () {


    setTimeout(() => {
        //player.stop();
        document.querySelectorAll('.steal')[0].classList.add('black');
        loadPlayer(video.dataset.video, video.dataset.poster);
        //window.player.play();

        //player.volume = 0;
        //player.play();

        document.querySelectorAll('.close')[0].classList.remove('hide');


        var promise = player.play();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
                console.log('lalallaa 1');
            }).catch(error => {
                console.log('lalallaa');
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }





        // Set Time comments
        //comment_init = false;
        // comment_end = false;
        settime(time_comments);

        document.getElementsByClassName('steal_title')[0].classList.add('hide');

        // Add time marker
        if (video.hasAttribute("data-comments")) {
            const controls = document.querySelector('.plyr__progress');
            controls.appendChild(createSquare('marker'));
        }

        // Add title plyr
        const controls_extra = document.querySelector('.plyr--video');
        controls_extra.prepend(createTitle(video.dataset.title));

    }, 3000);

    //volumen_boton.click();


};



// Pane Slide
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelectorAll('.close');
const pane = document.querySelector('.pane');
const pane_cover = document.querySelector('.pane-cover');

if (button_open) {
    button_open.forEach(function (link) {

        link.addEventListener('click', () => {


            loadPlayer(video.dataset.video, video.dataset.poster);
            pane.classList.add('open');

            if (video.hasAttribute("data-comments")) {
                comment_init = false;
                comment_end = false;
                settime(time_comments);
            }
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

    //video.setAttribute('poster', sPoster);


    // For more options see: https://github.com/sampotts/plyr/#options
    // captions.update is required for captions to work with hls.js
    const player = new Plyr(video, {
        title: 'Example title',
        captions: {
            active: true,
            update: true,
            language: 'es'
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

        player.on('ready', event => {
            //delayedPlay();
            //player.volume = 0.5;
        });

        player.on('play', function () {
            console.log('dura: ' + player.duration);
        });

        player.on('ended', function () {
            pane.classList.toggle('open');
            hideComments();
            player.fullscreen.exit();
            comment_init = false;
            comment_end = false;
        });

        player.on('controlsshown', function () {
            document.getElementsByClassName('plyr_title')[0].classList.remove('hide');
        });

        player.on('controlshidden', function () {
            document.getElementsByClassName('plyr_title')[0].classList.add('hide');
        });


    }

    // Expose player so it can be used from the console
    window.player = player;
    //});

}



function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

async function delayedPLay() {
    console.log("Hello");
    await sleep(2000);
    volumen_boton.click();
}

//delayedPlay();





/* Select option */

const answer_select = document.querySelectorAll('.pulse');
const next_select = document.getElementById('link-next');

if (answer_select) {
    answer_select.forEach(function (link) {

        link.addEventListener('click', () => {

            /* [].forEach.call(answer_select, function (el) {
                 el.parentElement.classList.remove('selected');
             });

             link.parentElement.classList.add('selected');

             if (next_select) {
                 next_select.classList.add('selected');
                 next_select.href = link.dataset.rel;
             }*/

            console.log(link.dataset.rel);

            window.location.href = link.dataset.rel;

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

let video_force_end = false;

function settime(pTimeComments) {

    time_end = parseInt(pTimeComments) + 15;

    let timer = setInterval(function () {

        if (pTimeComments < player.currentTime) {
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
            }
        } else {
            comment_end = false;
        }

        // Se cumplen los 2
        if (comment_init && comment_end) {
            hideComments();
        }

        // Force close end
        if (video.hasAttribute("data-end")) {
            if (!video_force_end) {
                if (video.dataset.end < player.currentTime) {
                    video_force_end = true;
                    button_close[0].click();
                    console.log(end);
                }
            }
        }

    }, 1000);

}

function showComments() {
    document.querySelectorAll('.comments-bullet')[0].classList.add('visible');
}

function hideComments() {
    document.querySelectorAll('.comments-bullet')[0].classList.remove('visible');
}

function calculatePercent(num1, total) {
    return (num1 / total) * 100;
}