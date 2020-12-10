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
        });
    });
}

if (button_close) {
    button_close.addEventListener('click', () => {
        pane.classList.toggle('open');
        pane_cover.classList.toggle('visible');
    });
}