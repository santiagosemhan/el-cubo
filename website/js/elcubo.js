// Fade In Page
let opacity = 0;
let intervalID = 0;
window.onload = fadeIn;

function fadeIn() {
    setInterval(show, 100);
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

// Click Button Cookies
const button = document.getElementById('AtCookieAlert__Button');
button.addEventListener('click', event => {
    document.getElementsByClassName('app__CookieAlert')[0].classList.add('hidden');
});

// Click search
const search_button = document.getElementsByClassName('iconsearch')[0];
search_button.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('cover-search').classList.toggle("hidden");
});

// Close search
const search_close = document.getElementsByClassName('AtSearchFocus__AtIconButtonCloseModal')[0];
search_close.addEventListener('click', event => {
    document.getElementById('cover-search').classList.toggle("hidden");
    event.stopPropagation();
});

const search_this_close = document.getElementById('cover-search');
search_this_close.addEventListener('click', event => {
    search_this_close.classList.toggle("hidden");
    event.stopPropagation();
});

const input_search = document.getElementById('inputsearch');
input_search.addEventListener('click', event => {
    event.stopPropagation();
});

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && !(search_this_close.classList.contains("hidden"))) {
        search_this_close.classList.toggle("hidden");
    }
})


// Hover links menu
const nav_links = document.querySelectorAll('nav div a.has-submenu');
nav_links.forEach(function (link) {

    link.addEventListener('mouseenter', e => {

        var elems = document.querySelectorAll(".submenu");
        [].forEach.call(elems, function (el) {
            el.classList.remove("visible");
        });

        document.getElementsByClassName('submenu-container')[0].style.height = "auto";
        document.getElementById(link.dataset.submenu).classList.add("visible");

        sub_item = document.querySelector("#" + link.dataset.submenu + " .submenu-items");

        if (sub_item !== null) {
            let coords_left = getCoords(link).left;
            sub_item.style.left = coords_left + "px";
        }
    });

});

// Hover Ninos
const link_ninos = document.getElementById('link-ninos');

link_ninos.addEventListener('mouseenter', e => {
  var elems = document.querySelectorAll(".submenu");
    [].forEach.call(elems, function (el) {
        el.classList.remove("visible");
    });
});

// Leave header
const header_container = document.querySelector('header');
header_container.addEventListener('mouseleave', e => {
    var elems = document.querySelectorAll(".submenu");
    [].forEach.call(elems, function (el) {
        el.classList.remove("visible");
    });
    document.getElementById('mouse-circle').classList.add("is-hidden");
});

// Menu Mobile
const button_menu_mobile = document.getElementById('menu-mobile-button');
button_menu_mobile.addEventListener('click', e => {
    document.getElementById('menu-mobile-container').classList.toggle("is-open");
    event.stopPropagation();
});

// Menu Mobile Close
const close_menu_mobile = document.getElementById('menu-mobile-close');
close_menu_mobile.addEventListener('click', e => {
    document.getElementById('menu-mobile-container').classList.toggle("is-open");
    event.stopPropagation();
});

// Get Coordenadas del elemento
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}



// Cursor
if (window.matchMedia("(min-width: 768px)").matches) {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById("mouse-circle");

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    };

    let delay = 3,
        revisedMousePosX = 0,
        revisedMousePosY = 0;

    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

        mouseCircle.style.top = revisedMousePosY + "px";
        mouseCircle.style.left = revisedMousePosX + "px";
    }
    delayMouseFollow();
}


// Hover link-texto active

const link_texto_0 = document.getElementsByClassName('hero-0')[0];
link_texto_0.addEventListener('mouseenter', e => {
  document.getElementById('mouse-circle').classList.remove("big");
  document.getElementById('mouse-circle').classList.remove("is-hidden");
});


const link_texto_1 = document.getElementsByClassName('hero-1')[0];
link_texto_1.addEventListener('mouseenter', e => {
  document.getElementById('mouse-circle').classList.add("big");
  document.getElementById('mouse-circle').classList.remove("is-hidden");
});

const link_texto_2 = document.getElementsByClassName('hero-2')[0];
link_texto_2.addEventListener('mouseenter', e => {
  document.getElementById('mouse-circle').classList.add("big");
  document.getElementById('mouse-circle').classList.remove("is-hidden");
});

const link_footer = document.querySelector('footer');
link_footer.addEventListener('mouseenter', e => {
  document.getElementById('mouse-circle').classList.add("is-hidden");
});



