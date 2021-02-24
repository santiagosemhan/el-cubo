   /* Sound */
   let track = document.getElementById('track');

   const video0 = document.querySelector("#hero-0 .video-0");
   if (video0) {
       video0.addEventListener('play', hideVideo1, false);

       function hideVideo1(e) {
           video0.classList.add('hide');
       }

       video0.addEventListener('ended', removeVideo0, false);

       function removeVideo0(e) {
           video0.remove();
       }
   }

   /* Observer videos */
   const video1 = document.querySelector("#hero-1 video");
   const video2 = document.querySelector("#hero-2 video");

   console.log(video1);

   if (video1) {
       //video1.pause;
       video1.addEventListener('ended', removeVideo1, false);

       function removeVideo1(e) {
           console.log('se elimina 1');
           video1.remove();
       }
   }

   if (video2) {
       //video2.pause;
       video2.addEventListener('ended', removeVideo2, false);

       function removeVideo2(e) {
           console.log('se elimina 2');
           video2.remove();
       }
   }



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




   // Check if element is in view
   function isScrolledIntoView(el) {
       var rect = el.getBoundingClientRect();
       var elemTop = rect.top;
       var elemBottom = rect.bottom;

       // Only completely visible elements return true:
       var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
       // Partially visible elements return true:
       //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
       return isVisible;
   }



   // Scroll for Hero-0
   const main = document.querySelector('.scroll-container');

   const scrollEvent = () => {

       var reveal_2 = document.getElementsByClassName('cover-reveal-row-2')[0];
       if (isScrolledIntoView(reveal_2)) {
           document.getElementsByClassName('cover-reveal-row-2')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-2')[1].classList.add('active');
       }

       var reveal_3 = document.getElementsByClassName('cover-reveal-row-3')[0];
       if (isScrolledIntoView(reveal_3)) {
           document.getElementsByClassName('cover-reveal-row-3')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-3')[1].classList.add('active');
       }

       var reveal_4 = document.getElementsByClassName('cover-reveal-row-4')[0];
       if (isScrolledIntoView(reveal_4)) {
           document.getElementsByClassName('cover-reveal-row-4')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-4')[1].classList.add('active');
       } else {

       }


       var someDiv4 = document.getElementsByClassName('cover-reveal-row-5')[0];
       var distanceToTop = someDiv4.getBoundingClientRect().top;

       console.log(isScrolledIntoView(someDiv4));

       if (isScrolledIntoView(someDiv4)) {
           video1.play();
           video1.classList.add('hide');
           document.getElementById("hero-1").classList.add('playing');
           document.getElementsByClassName('cover-reveal-row-line')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-5')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-5')[1].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-5')[2].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-6')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-6')[1].classList.add('active');
       }


       var someDiv5 = document.getElementsByClassName('cover-reveal-row-7')[0];
       var distanceToTop5 = someDiv5.getBoundingClientRect().top;

       if (isScrolledIntoView(someDiv5)) {
           video2.play();
           video2.classList.add('hide');
           document.getElementById("hero-2").classList.add('playing');
           document.getElementsByClassName('cover-reveal-row-7')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-7')[1].classList.add('active');
       }


   }

   main.addEventListener('scroll', scrollEvent);





   // Scroll Fade
   let fadeElement = document.getElementsByClassName('cover-scroll')[0];

   function fadeOutOnScroll(element) {
       if (!element) {
           return;
       }

       var distanceScrollTop = window.pageYOffset + element.getBoundingClientRect().top;
       var elementHeight = element.offsetHeight;
       var scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

       var opacity = 1;

       if (scrollTop > distanceScrollTop) {
           opacity = 1 - (scrollTop - distanceScrollTop + 20) / elementHeight;
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