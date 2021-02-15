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
           threshold: .4
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
           threshold: .2
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
       var B = document.body; //IE 'quirks'
       var D = document.documentElement; //IE with doctype
       D = (D.clientHeight) ? D : B;

       if (D.scrollTop == 0) {
           document.getElementsByClassName('arrow-down')[0].classList.remove('scrolled');
           document.getElementsByClassName('header-temporal')[0].classList.remove('scrolled');
       } else {
           document.getElementsByClassName('arrow-down')[0].classList.add('scrolled');
           document.getElementsByClassName('header-temporal')[0].classList.add('scrolled');
       }
   };




   /* Scroll */
   window.requestAnimationFrame = (function () {
       return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function (callback) {
               window.setTimeout(callback, 2000 / 30);
           };
   })();


   var scrollEngine = function () {
       var amount = 0;
       var scrollInProgess = false;
       var tailOff = 40;

       function evaluate(functionName) {
           amount = amount - Math.ceil(amount / tailOff);
           if (amount > 0) {
               requestAnimationFrame(functionName);
           } else {
               scrollInProgess = false;
           }
       }

       function scroll(timestamp) {
           window.scrollBy(0, Math.ceil(amount / tailOff));
           evaluate(scroll);
       }

       function scrollUp(timestamp) {
           window.scrollBy(0, -Math.ceil(amount / tailOff));
           evaluate(scrollUp);
       }

       return {
           setTailoff: function (tailAmount) {
               tailOff = tailAmount;
           },
           scrollToElementById: function (id, offset) {
               if (!scrollInProgess) {
                   if (offset === undefined) {
                       offset = 0;
                   }
                   scrollInProgess = true;
                   var alreadyScrolled = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                   amount = document.getElementById(id).offsetTop - alreadyScrolled;
                   amount = amount - offset;
                   if (amount >= 0) {
                       requestAnimationFrame(scroll);
                   } else {
                       amount = -amount;
                       requestAnimationFrame(scrollUp);
                   }
               }
           }
       };
   }();


   function handleClick(e) {
       e.preventDefault();
       var idSplit = this.getAttribute('href').split('#');
       if (idSplit.length > 1) {
           scrollEngine.scrollToElementById(idSplit[1], 20);
       }
   }

   var links = document.querySelectorAll('.arrow-down [href^=\'#\']');
   var limit = links.length;
   for (var n = 0; n < limit; n++) {
       links[n].addEventListener('click', handleClick);
   }