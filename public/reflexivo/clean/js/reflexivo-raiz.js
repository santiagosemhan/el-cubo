
const video = document.querySelector('.pane-video');

const pane = document.querySelector('.pane');
const pane_video = document.querySelector('.pane-video');

window.onload = function () {

    setTimeout(() => {

        fadeOut(document.querySelectorAll('.steal')[0], 40);
        loadPlayer(video.dataset.video, video.dataset.poster);


        var promise = player.play();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!

            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }

        document.getElementsByClassName('steal_title')[0].classList.add('hide');
        document.querySelectorAll('.close')[0].classList.remove('hide');

        // Add title plyr
        const controls_extra = document.querySelector('.plyr--video');
        controls_extra.prepend(createTitle(video.dataset.title));

    }, 3000);
};


function createTitle(pTitle) {
    let plyr_title = document.createElement('h2');
    plyr_title.setAttribute("class", 'plyr_title');
    plyr_title.innerHTML = pTitle;
    return plyr_title;
}



// Pane Slide
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelectorAll('.close');

if (button_open) {
    button_open.forEach(function (link) {

        link.addEventListener('click', () => {
            pane.classList.add('open');

            pane_video.classList.toggle('visible');

            console.log(link.dataset.relation);
            pane.dataset.relation = link.dataset.relation;

            fadeIn(pane, 150);

            loadPlayer(link.dataset.video, link.dataset.poster);


            player.play();

            //document.querySelectorAll('.close')[0].classList.remove('hide');


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

            fadeOut(pane, 40);
            pane_video.classList.toggle('visible');

            fake_cover.classList.add('visible');

            setTimeout(() => {
                player.stop();
                loadPlayer('test', 'test');
            }, 500);


        });
    });
}


function fadeOut(el, pTime) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .07) < 0) {
            el.style.display = "none";
        } else {
            setTimeout(fade, pTime);
        }
    })();
}


function fadeIn(el, pTime) {
    el.style.opacity = 0;
    el.style.display = "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .07) > 1)) {
            el.style.opacity = val;
            setTimeout(fade, pTime);
        }
        else {
            el.style.opacity = 1;
        }
    })();
}



const button_select = document.getElementById('select-personaje');
let character = "unselect";

if (button_select) {
    button_select.addEventListener('click', () => {

        character = button_select.dataset.personaje;

        pane.classList.toggle('open');
        pane_video.classList.toggle('visible');

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
    });

}



function loadPlayer(sURL, sPoster) {
    let source = 'https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:' + sURL + '.smil/playlist.m3u8';
    const video = document.querySelector('video');

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


        player.on('ended', function () {
            //pane_cover.classList.toggle('visible');
            pane.classList.toggle('open');
            pane_video.classList.toggle('visible');

            //fake_cover.classList.add('visible');
            fadeOut(pane, 40);

            // Add selected to child
            document.getElementsByClassName(pane.dataset.relation)[0].classList.add('selected');

            if (viewedAll()) {
                document.getElementsByClassName('row-second')[0].classList.add('visible');
                document.getElementsByClassName('characters')[0].classList.add('is-viewed');
            }

            player.fullscreen.exit();

        });

        // Show Hide Title
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




// Disabled fake cover
/*fake_cover.addEventListener('mousemove', () => {
    fake_cover.classList.remove('visible');
});*/




// Answer select
const answer_select = document.querySelectorAll('.li-questions li');

if (answer_select) {
    answer_select.forEach(function (link) {
        next_select = link.childNodes[1];
        console.log(next_select);
        next_select.href = link.dataset.rel;
    });
}