window.onload = function (event) {
    console.log('lalla');

    setTimeout(() => {
        document.getElementsByClassName('cover-reveal-row-1')[0].classList.add('active');
        document.getElementsByClassName('cover-reveal-row-1')[1].classList.add('active');
        document.getElementsByClassName('cover-reveal-row-1')[2].classList.add('active');
    }, 1000);



};

/* Sound * /

/* Track play */
track.loop = true;

let controlBtn = document.getElementById('play-pause');

function playPause() {

    document.getElementsByClassName('Sound')[0].classList.toggle('off');
    document.getElementsByClassName('play-text')[0].classList.toggle('hide');
    document.getElementsByClassName('play-text')[1].classList.toggle('hide');

    if (track.paused) {
        track.play();
        //controlBtn.textContent = "Pause";
        controlBtn.className = "pause";
    } else {
        track.pause();
        //controlBtn.textContent = "Play";
        controlBtn.className = "play";
    }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function () {
    controlBtn.className = "play";
});


function getRelationScroll(pObject) {
    let relation = pObject.getBoundingClientRect().top / (main.clientHeight / 2) * 100;
    return relation;
}


// Scroll for Hero-0

const scrollEvent = () => {

    document.getElementsByClassName('cover-reveal-row-2')[0].classList.add('active');

    document.getElementsByClassName('paragraph-message-1')[0].classList.add('active-fadein');

    document.getElementsByClassName('paragraph-message-2')[0].classList.add('active-fadein');

}

document.addEventListener('scroll', scrollEvent);





// Scroll Fade
let fadeElement = document.getElementsByClassName('cover-scroll')[0];

function fadeOutOnScroll(element) {
    if (!element) {
        return;
    }

    var distanceScrollTop = window.pageYOffset + element.getBoundingClientRect().top - 250;
    var elementHeight = element.offsetHeight;
    var scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

    var opacity = 1;

    if (scrollTop > distanceScrollTop) {
        opacity = 1 - (scrollTop - distanceScrollTop) / elementHeight;
    }

    if (opacity >= 0) {
        element.style.opacity = opacity;
    }
}


function scrollHandler() {
    document.querySelectorAll('.cover-scroll').forEach(function (fadeElement) {
        fadeOutOnScroll(fadeElement);
    });
}

main.addEventListener('scroll', scrollHandler);