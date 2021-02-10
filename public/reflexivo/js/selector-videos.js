// Fade In Page
let opacity = 0;
let intervalID = 0;
window.onload = fadeIn;

window.onload = function () {
    disableScroll();
};

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
}

// Pane Slide
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelectorAll('.close');
const pane = document.querySelector('.pane');
const pane_cover = document.querySelector('.pane-cover');

if (button_open) {
    button_open.forEach(function (link) {

        link.addEventListener('click', () => {
            pane.classList.add('open');

            console.log(link.dataset.relation);
            pane.dataset.relation = link.dataset.relation;

            pane_cover.classList.toggle('visible');

            loadPlayer(link.dataset.video, link.dataset.poster);


            player.play();

            //document.querySelector('video').setAttribute('src', '');

            // Hide temp progress
            document.querySelectorAll('.progress-0')[0].classList.add('hide');


        });
    });
}

if (button_close) {
    button_close.forEach(function (link) {
        link.addEventListener('click', () => {
            console.log('click');
            pane.classList.toggle('open');
            pane_cover.classList.toggle('visible');

            fake_cover.classList.add('visible');

            setTimeout(() => {
                player.stop();
                loadPlayer('test');
            }, 500);


        });
    });
}


const button_select = document.getElementById('select-personaje');
let character = "unselect";

if (button_select) {
    button_select.addEventListener('click', () => {

        character = button_select.dataset.personaje;

        pane.classList.toggle('open');
        pane_cover.classList.toggle('visible');
        myVideo.pause();
        myVideo.currentTime = 0;

        var personaje_child = document.querySelectorAll(".child");
        [].forEach.call(personaje_child, function (el) {
            el.classList.remove("is-selected");
        });

        document.getElementsByClassName(button_select.dataset.personaje)[0].classList.add("is-selected");

        var selector = document.querySelectorAll(".selector-mode");
        [].forEach.call(selector, function (el) {
            el.classList.remove('is-hidden');
        });


        console.log(character);
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
            setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
        });

        player.on('ended', function () {
            pane_cover.classList.toggle('visible');
            pane.classList.toggle('open');

            fake_cover.classList.add('visible');

            // Add selected to child
            document.getElementsByClassName(pane.dataset.relation)[0].classList.add('selected');



            if (viewedAll()) {
                document.getElementsByClassName('row-second')[0].classList.add('visible');
                document.getElementsByClassName('characters')[0].classList.add('is-viewed');
            }

            player.fullscreen.exit();

        });
    }

    // Expose player so it can be used from the console
    window.player = player;
    //});

}


// Check si ya fueron visto los 3
function viewedAll() {
    let all_videos = document.querySelectorAll('.toggle').length;
    let viewed_videos = document.querySelectorAll('.toggle.selected').length;

    if (all_videos === viewed_videos) {
        return true;
    } else {
        return false;
    }
}



// Enable Disable Scroll

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            },
        }),
    );
} catch (e) {}

let wheelOpt = supportsPassive ? {
    passive: false
} : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}



/* Modal Onboarding */

const openModalTriggerEl = document.querySelector('.open-modal');
const closeModalTriggerEl = document.querySelector('.close-modal');
const modalEl = document.querySelector('.modal');

/* Fake cover */
const fake_cover = document.querySelector('.fake-cover');


function modal() {
    if (openModalTriggerEl) {
        openModalTriggerEl.addEventListener('click', () => {
            modalEl.classList.add('open');
            console.log(openModalTriggerEl);
        });
    }
    if (closeModalTriggerEl) {
        closeModalTriggerEl.addEventListener('click', () => {
            modalEl.classList.remove('open');
            fake_cover.classList.add('visible');

        });
    }
    window.addEventListener('click', () => {
        if (event.target === modalEl) {
            modalEl.classList.remove('open');
        }
    })

    function keyPress(e) {
        if (e.key === "Escape") {
            modalEl.classList.remove('open');
        }
    }
}

modal();


// Disabled fake cover
fake_cover.addEventListener('mousemove', () => {
    fake_cover.classList.remove('visible');
});





function loadProgress(sPar, sVelocity) {

    // Timer
    let timer = 0;
    let limit = sVelocity; //ms

    timerEnd = limit / 10;
    let blockWidth = 100 / timerEnd;
    const progress = document.querySelectorAll("." + sPar + " .progress");

    console.log(limit);

    let countdown = setInterval(function () {
        timer++;
        for (var i = 0; i < progress.length; ++i) {
            progress[i].style.width = timer * blockWidth + "%";

            // setear a 0
            if (document.querySelector('.pane').classList.contains('open')) {
                clearInterval(countdown);
            }

        }
        //console.log(timer);
        // document.getElementById("countdown").textContent = timer/100;
        if (timer >= timerEnd) {
            clearInterval(countdown);
            document.getElementsByClassName('toggle')[0].click();
        }
    }, 10);

}
//miliseconds
console.log('kionda');


// Para cuando no hay modal al inicio
const progress_direct = document.getElementsByClassName("progress-direct")[0];

if (progress_direct) {
    let velocity = document.getElementsByClassName("progress-0")[0].dataset.velocity;
    if (velocity !== undefined) {
        console.log('a verrrr' + velocity);
        loadProgress('progress-0', velocity);
    } else {
        loadProgress('progress-0', 30000);
    }
}
//




// Click Button OK
const button_ok = document.getElementById('button_ok');

if (button_ok) {
    button_ok.addEventListener('click', () => {
        let velocity = document.getElementsByClassName("progress-0")[0].dataset.velocity;
        if (velocity !== undefined) {
            console.log('a verrrr' + velocity);
            loadProgress('progress-0', velocity);
        } else {
            loadProgress('progress-0', 30000);
        }
    });
}

/* Select option */

/*
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

*/

const answer_select = document.querySelectorAll('.li-questions li');

if (answer_select) {
    answer_select.forEach(function (link) {
        next_select = link.childNodes[1];
        console.log(next_select);
        next_select.href = link.dataset.rel;
    });
}