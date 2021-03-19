window.onload = function () {
    // Add title plyr
    const controls_extra = document.querySelector('.plyr--video');
    controls_extra.prepend(createTitle(video.dataset.title));
};

const video = document.querySelector('.pane-video');

// Pane Slide VIDEO
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelectorAll('.close');
const pane = document.querySelector('.pane');
const pane_cover = document.querySelector('.pane-cover');

if (button_open) {
    button_open.forEach(function (link) {

        link.addEventListener('click', () => {

            loadPlayer(video.dataset.video, video.dataset.poster);

            fadeIn(pane, 120);

            pane.classList.remove('is-hidden');

            player.play();

        });
    });
}

if (button_close) {
    button_close.forEach(function (link) {
        link.addEventListener('click', () => {
            pane.classList.toggle('open');

            fadeOut(pane, 40);

            setTimeout(() => {
                //player.stop();

                loadPlayer('test', 'test');
            }, 500);


        });
    });
}





function loadPlayer(sURL, sPoster) {

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

        player.on('ended', function () {

            pane.classList.add('is-hidden');

            fadeOut(pane, 50);

            player.fullscreen.exit();

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
        } else {
            el.style.opacity = 1;
        }
    })();
}

function createTitle(pTitle) {
    let plyr_title = document.createElement('h2');
    plyr_title.setAttribute("class", 'plyr_title');
    plyr_title.innerHTML = pTitle;
    return plyr_title;
}