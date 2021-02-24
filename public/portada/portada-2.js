   /* Observer videos */
   const video1 = document.querySelector("#hero-1 video");
   const video2 = document.querySelector("#hero-2 video");

   /* Sound */
   let track = document.getElementById('track');

   const video0 = document.querySelector("#hero-0 video");
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

   if (video1) {
       video1.addEventListener('ended', removeVideo1, false);

       function removeVideo1(e) {
           video1.remove();
       }
   }

   if (video2) {
       video2.addEventListener('ended', removeVideo2, false);

       function removeVideo2(e) {
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



   window.onscroll = function (ev) {


       var someDiv4 = document.getElementsByClassName('hero-1')[0];
       var distanceToTop = someDiv4.getBoundingClientRect().top;

       if (distanceToTop <= 100) {
           video1.play();
           video1.classList.add('hide');
           document.getElementById("hero-1").classList.add('playing');
           document.getElementsByClassName('cover-reveal-row-5')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-5')[1].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-5')[2].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-6')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-6')[1].classList.add('active');
       }


       var someDiv5 = document.getElementsByClassName('hero-2')[0];
       var distanceToTop5 = someDiv5.getBoundingClientRect().top;

       if (distanceToTop5 <= 100) {
           video2.play();
           video2.classList.add('hide');
           document.getElementById("hero-2").classList.add('playing');
           document.getElementsByClassName('cover-reveal-row-7')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-row-7')[1].classList.add('active');
       }


   };



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



   //var header = document.getElementById('header');
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
           opacity = 1 - (scrollTop - distanceScrollTop) / elementHeight;
       }

       if (scrollTop < distanceScrollTop) {
           opacity = 1 - ((distanceScrollTop - scrollTop) / 300);
       }

       if (opacity >= 0) {
           element.style.opacity = opacity;
       }
   }


   function fadeOutOnScroll2(element) {
       if (!element) {
           return;
       }

       var distanceScrollTop = window.pageYOffset + element.getBoundingClientRect().top;
       var elementHeight = element.offsetHeight;
       var scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

       var opacity = 1;

       if (scrollTop > distanceScrollTop) {
           opacity = 1 - (scrollTop - distanceScrollTop + 100) / elementHeight;
       }

       if (scrollTop < distanceScrollTop) {
           opacity = 1 - ((distanceScrollTop - scrollTop) / 600);
       }

       if (opacity >= 0) {
           element.style.opacity = opacity;
       }
   }

   function scrollHandler() {
       document.querySelectorAll('.cover-scroll').forEach(function (fadeElement) {
           fadeOutOnScroll(fadeElement);
       });

       document.querySelectorAll('.cover-scroll-2').forEach(function (fadeElement) {
           fadeOutOnScroll2(fadeElement);
       });

   }

   window.addEventListener('scroll', scrollHandler);




   // Scroll for Hero-0
   const main = document.querySelector('.scroll-container');

   const scrollEvent = () => {

       var reveal_2 = document.getElementsByClassName('cover-reveal-row-2')[0];
       if (isScrolledIntoView(reveal_2)) {
           fadeOutOnScroll(document.getElementsByClassName('cover-scroll')[0]);

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


   }

   main.addEventListener('scroll', scrollEvent);