const openModalTriggerEl = document.querySelector('.open-modal');
const closeModalTriggerEl = document.querySelector('.close-modal');
const modalEl = document.querySelector('.modal');

function modal() {
    if (openModalTriggerEl) {
        openModalTriggerEl.addEventListener('click', () => {
            console.log('hola');
            currentStep = 1;
            modalEl.classList.add('open');

        });
    }
    if (closeModalTriggerEl) {
        closeModalTriggerEl.addEventListener('click', () => {
            modalEl.classList.remove('open');
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

/* Wizard */
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById('validate');
const numberOfSteps = 3;
let currentStep = 1;

previousButton.onclick = goPrevious;
nextButton.onclick = goNext;

function goNext(e) {
    e.preventDefault();
    currentStep += 1;
    goToStep(currentStep);
}

function goPrevious(e) {
    e.preventDefault();
    currentStep -= 1;
    goToStep(currentStep);
}

function goToStep(stepNumber) {
    currentStep = stepNumber;

    let inputsToHide = document.getElementsByClassName('step');
    let inputs = document.getElementsByClassName(`step${currentStep}`);

    //hide all input
    for (let i = 0; i < inputsToHide.length; ++i) {
        hide(inputsToHide[i]);
    }

    //only show the right one
    for (let i = 0; i < inputs.length; ++i) {
        show(inputs[i])
    }

    //if we reached final step
    if (currentStep === numberOfSteps) {
        enable(previousButton);
        disable(nextButton);
        show(submitButton);
    }

    //else if first step
    else if (currentStep === 1) {
        disable(previousButton);
        enable(next);
        hide(submitButton);
    } else {
        enable(previousButton);
        enable(next);
        hide(submitButton);
    }
}

function enable(elem) {
    elem.classList.remove("disabled");
    elem.disabled = false;
}

function disable(elem) {
    elem.classList.add("disabled");
    elem.disabled = true;
}

function show(elem) {
    console.log(elem);
    if (elem) {
        elem.classList.remove('hidden');

        let str = elem.className;
        let res = str.charAt(str.length - 1)
        modalEl.className = 'modal open step-' + res;
    }
}

function hide(elem) {
    elem.classList.add('hidden');
}