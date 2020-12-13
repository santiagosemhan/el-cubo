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
}

// Pane Slide
const button_open = document.querySelectorAll('.toggle');
const button_close = document.querySelector('.close');
const pane = document.querySelector('.pane');
const pane_cover = document.querySelector('.pane-cover');

if (button_open) {
    button_open.forEach(function (link) {
        link.addEventListener('click', () => {
            pane.classList.add('open');
            pane_cover.classList.toggle('visible');
            document.getElementById('video1').src = link.dataset.video;
            document.getElementById('select-personaje').dataset.personaje = link.dataset.personaje;
            document.getElementById('name-personaje').innerHTML = link.dataset.nombre;
            document.getElementById('desc-personaje').innerHTML = link.dataset.desc;


            myVideo.play();
        });
    });
}

if (button_close) {
    button_close.addEventListener('click', () => {
        pane.classList.toggle('open');
        pane_cover.classList.toggle('visible');
        myVideo.pause();
        myVideo.currentTime = 0;
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

let myVideo = document.getElementById("video1");
if (myVideo) {
    function playPause() {
        if (myVideo.paused)
            myVideo.play();
        else
            myVideo.pause();
    }

    function makeBig() {
        myVideo.width = 560;
    }

    function makeSmall() {
        myVideo.width = 320;
    }

    function makeNormal() {
        myVideo.width = 420;
    }

}