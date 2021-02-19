   /* Observer videos */
   const video1 = document.querySelector("#hero-1 video");
   if (video1) {
       video1.pause();
       const observer = new IntersectionObserver((entries) => {
           entries.forEach((entry) => {
               if (!entry.isIntersecting) {
                   //video.pause();
               } else {
                   video1.play();
                   video1.classList.add('hide');
                   document.getElementById("hero-1").classList.add('playing');
               }
           });
       }, {
           threshold: .1
       });

       observer.observe(video1);
   }

   const video2 = document.querySelector("#hero-2 video");
   if (video2) {
       video2.pause();
       const observer2 = new IntersectionObserver((entries) => {
           entries.forEach((entry) => {
               if (!entry.isIntersecting) {
                   //video.pause();
               } else {
                   video2.play();
                   video2.classList.add('hide');
                   document.getElementById("hero-2").classList.add('playing');
               }
           });
       }, {
           threshold: .1
       });

       observer2.observe(video2);
   }

   /* Sound */
   let track = document.getElementById('track');


   const video0 = document.querySelector("#hero-0 video");
   if (video0) {
       video0.addEventListener('play', hideVideo1, false);
       //track.play();
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

       var someDiv1 = document.getElementsByClassName('cover-reveal-2')[0];
       var distanceToTop = someDiv1.getBoundingClientRect().top;

       if (distanceToTop <= 100) {
           document.getElementsByClassName('cover-reveal-2')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-2')[1].classList.add('active');
       }

       var someDiv2 = document.getElementsByClassName('cover-reveal-3')[0];
       var distanceToTop = someDiv2.getBoundingClientRect().top;

       if (distanceToTop <= 100) {
           document.getElementsByClassName('cover-reveal-3')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-3')[1].classList.add('active');
       }

       var someDiv3 = document.getElementsByClassName('cover-reveal-4')[0];
       var distanceToTop = someDiv3.getBoundingClientRect().top;

       if (distanceToTop <= 100) {
           document.getElementsByClassName('cover-reveal-4')[0].classList.add('active');
           document.getElementsByClassName('cover-reveal-4')[1].classList.add('active');
       }

   };



   //var header = document.getElementById('header');
   //let fadeElement = document.getElementsByClassName('cover-scroll')[0];

   function fadeOutOnScroll(element) {
       if (!element) {
           return;
       }

       var distanceScrollTop = window.pageYOffset + element.getBoundingClientRect().top;
       var elementHeight = element.offsetHeight;
       var scrollTop = document.documentElement.scrollTop;

       var opacity = 1;

       console.log(scrollTop + '/' + distanceScrollTop);

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

   function scrollHandler() {

       document.querySelectorAll('.cover-scroll').forEach(function (fadeElement) {
           fadeOutOnScroll(fadeElement);
       });

   }

   window.addEventListener('scroll', scrollHandler);





   /*

      var FancyScroll = (function () {

          var elements = {
              theThing: document.querySelector('.cover-reveal.active');
          };


          var e = elements;
          var pageHeight = window.outerHeight;

          if (e.theThing) {
              window.addEventListener('scroll', function () {

                  var scrollPos = window.scrollY;
                  var opacity = 1 - (scrollPos / 250);

                  if (scrollPos < pageHeight / 2) {
                      requestAnimationFrame(function () {
                          e.theThing.style.opacity = opacity;
                      });
                  }
              });
          }


      }());
      */