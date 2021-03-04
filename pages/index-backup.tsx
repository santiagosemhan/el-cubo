import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Container } from '../styles/Home';
import AppLayout from '../layouts/AppLayout';
import fetch from 'libs/fetcher';

import useOnMouseOutside from 'libs/hooks/useOnMouseOutside';
import HeaderTop from 'components/HeaderTop/HeaderTop';
import { RTVCGlobalStyles } from 'styles/rtvc.style';
import { ElcuboGlobalStyles } from 'styles/elcubo.style';

import dynamic from 'next/dynamic';

const MouseCircle = dynamic(() => import('components/MouseCircle/MouseCircle'), { ssr: false });

export default function Home({ data }) {
  const ref = useRef();
  const [bigMouse, setBigMouse] = React.useState(false);

  const handleMouseEnter = () => {
    setBigMouse(true);
  };

  useOnMouseOutside(ref, () => setBigMouse(false));

  const { field_ec_contents, field_ec_contents_paragraph } = data;

  {/* Custom Josi */ }
  React.useEffect(() => {

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
      }, { threshold: .4 });

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
      }, { threshold: .2 });

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
      }
      else {
        document.getElementsByClassName('arrow-down')[0].classList.add('scrolled');
        document.getElementsByClassName('header-temporal')[0].classList.add('scrolled');
      }
    };






  }, []);

  return (
    <AppLayout>
      <ElcuboGlobalStyles />

      <Head>
        <title>El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <MouseCircle href="/el-cubo/temporada-1" text="Ver más" isBig="{bigMouse}" />

        <div>
          <audio id="track" autoplay>
            <source src="/audios/loop-1.mp3" type="audio/mpeg" />
          </audio>

          <div id="audio-player-container">
            <div id="play-pause" className="play no-link">
              <div className="column-1">
                <span className="mute hide play-text">
                  silenciar</span>
                <span className="listen play-text">
                  escuchar</span>
              </div>
              <div class="column-2">
                <div className="Sound off">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="arrow-down">
          <a href="#hero-1" class="no-link">
            <img src="/images/arrow-down-cyan.svg" />
          </a>
        </div>

        <div class="arrow-down arrow-down-2">
          <a href="#hero-2" class="no-link">
            <img src="/images/arrow-down-cyan.svg" />
          </a>
        </div>


        <div className="header-top header-temporal">
          <div className="header-top-inner">
            <div className="logo-elcubo">
              <a href="https://elcubo.vercel.app/" className="logo--link no-link">
                <img className="logo--image" src="/images/logo2021.png" />
              </a>
            </div>

          </div>
        </div>

        {/*<HeaderTop />*/}

        {field_ec_contents.map((c, index) => {
          const paragraph = field_ec_contents_paragraph.find((p) => p.id[0].value === Number(c));
          // console.log({ paragraph });
          let videoOverlayHTML = '';
          if (paragraph.type[0].target_id === 'ec_hero_title') {
            let copyCoverHTML = paragraph.field_ec_text.map((t) => t.value).join('');
            // console.log({ copyCoverHTML });
            videoOverlayHTML = `
              <div class="copy-cover">
                ${copyCoverHTML}
              </div>
              
            `;
          } else {
            videoOverlayHTML = paragraph.field_ec_full_text[0].processed;
          }

          let desktopVideoURL = paragraph.field_ec_video[0].url;
          let mobileVideoURL = paragraph.field_ec_video_mb[0].url;
          // console.log({ videoOverlayHTML });
          return (
            <div
              id={`hero-${index}`}
              key={c}
              className={`hero hero-${index} no-link`}
              onMouseEnter={index === 2 ? handleMouseEnter : undefined}
              ref={index === 2 ? ref : undefined}
            >
              <video className="video-bg" autoPlay muted>
                <source src={desktopVideoURL} type="video/mp4" />
              </video>
              <img className="img-bg-pc" src={paragraph.field_ec_image[0].url} />
              <img className="img-bg-mobile" src={paragraph.field_ec_image_mb[0].url} />

              <div
                className="video-overlay"
                dangerouslySetInnerHTML={{ __html: videoOverlayHTML }}
              />
            </div>
          );
        })}
      </Container>
    </AppLayout>
  );


}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`/api/v1/el-cubo/page/5364`);

  if (!data.length) {
    return { props: { data: {} } };
  }

  const { field_ec_contents, field_ec_contents_paragraph_json, title } = data[0];

  return {
    props: {
      data: {
        title,
        field_ec_contents: field_ec_contents.split(',').map((c) => c.trim()),
        field_ec_contents_paragraph: JSON.parse(field_ec_contents_paragraph_json),
      },
    },
  };
};





