

// Pane Slide
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelectorAll('.close');
const pane = document.querySelector('.pane');
const pane_video = document.querySelector('.pane-video');

if (button_open) {
    button_open.forEach(function (link) {

        link.addEventListener('click', () => {
            pane.classList.add('open');

            console.log(link.dataset.relation);
            pane.dataset.relation = link.dataset.relation;

            pane_video.classList.toggle('visible');

            fadeIn(pane, 40);

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

            fadeOut(pane, 40);
            pane_video.classList.toggle('visible');

            //fake_cover.classList.add('visible');

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
            //pane_cover.classList.toggle('visible');
           pane.classList.toggle('open');

           pane_video.classList.toggle('visible');

            fadeOut(pane, 40);


            // Add selected to child
            document.getElementsByClassName(pane.dataset.relation)[0].classList.add('selected');



            if (viewedAll()) {
                document.getElementsByClassName('row-second')[0].classList.add('visible');
                document.getElementsByClassName('characters')[0].classList.add('is-viewed');
            }

            

            player.fullscreen.exit();

            //button_close[0].click();

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







/* Fake cover */
const fake_cover = document.querySelector('.fake-cover');


// Disabled fake cover
/*fake_cover.addEventListener('mousemove', () => {
    fake_cover.classList.remove('visible');
});*/





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


/* Hover */
var select_scene = document.querySelectorAll(".parent");
       
if (select_scene) {

    [].forEach.call(select_scene, function (el) {

        el.addEventListener("mouseenter", function() {   
            // highlight the mouseenter target
            el.classList.add('focus');
        }, false);

        el.addEventListener("mouseleave", function() {   
            // highlight the leave target
            setTimeout(function() {
                el.classList.remove('focus');
              }, 0);
            
        }, false);

    });
    
}

