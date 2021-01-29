import React, { useRef } from 'react';
import Head from 'next/head';

import { GetStaticProps } from 'next';
import { Container } from 'styles/Home';
import AppLayout from 'layouts/AppLayout';
import fetch from 'libs/fetcher';

import useOnMouseOutside from 'libs/hooks/useOnMouseOutside';
import HeaderTop from 'components/HeaderTop/HeaderTop';
import { ElcuboGlobalStyles } from 'styles/elcubo.style';
import dynamic from 'next/dynamic';
const MouseCircle = dynamic(() => import('components/MouseCircle/MouseCircle'), { ssr: false });

export default function SeasonPage({ data }) {
  // if (process.browser) {
  //   console.log({ data });
  // }
  // const { title, field_ec_contents_paragraph_json } = data[0];
  // console.log(JSON.parse(field_ec_contents_page_ref_json));
  const ref = useRef();
  const refHeader = useRef();
  const [bigMouse, setBigMouse] = React.useState(false);
  const [showMouse, setShowMouse] = React.useState(true);

  const handleMouseEnter = () => {
    setBigMouse(true);
    setShowMouse(true);
  };
  useOnMouseOutside(ref, (event) => {
    setShowMouse(false);
  });
  useOnMouseOutside(refHeader, (event) => {
    setBigMouse(true);
  });

  const { title, field_ec_contents, field_ec_contents_paragraph } = data;


  React.useEffect(() => {

    const video3 = document.querySelector("#hero-3 video");
    if (video3) {
      video3.addEventListener('play', hideVideo, false);
      function hideVideo(e) {
        console.log('play')
        video3.classList.add('hide');
      }

      video3.addEventListener('ended', removeVideo, false);
      function removeVideo(e) {
        console.log('end')
        video3.remove();
      }
    }



  }, []);


  return (
    <AppLayout>
      <ElcuboGlobalStyles />

      <Head>
        <title>{title} - El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container onMouseEnter={handleMouseEnter} ref={ref}>
        <MouseCircle
          href="/el-cubo/temporada-1/personajes"
          text="Empezar"
          isBig={bigMouse}
          show={showMouse}
          className="circle-temp"
        />

        {/* <div className="header-top" ref={refHeader} onMouseEnter={() => setBigMouse(false)}>
          <div className="header-top-inner">
            <div className="logo-elcubo">
              <a href="/" className="logo--link">
                <img className="logo--image" src="/images/logo-elcubo.png" />
              </a>
            </div>
          </div>
        </div> */}
        <div ref={refHeader} onMouseEnter={() => setBigMouse(false)}>
          <HeaderTop />
        </div>

        {field_ec_contents.map((c, index) => {
          const paragraph = field_ec_contents_paragraph.find((p) => p.id[0].value === Number(c));
          // console.log({ paragraph });
          let videoOverlayHTML = '<div></div>';
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

          return (
            <div
              key={c}
              id={`hero-${index + 3}`}
              className={`hero hero-${index + 3} no-link`}
              onMouseEnter={index === 2 ? handleMouseEnter : undefined}
              ref={index === 2 ? ref : undefined}
            >
              <video className="video-bg" autoPlay muted >
                <source src={desktopVideoURL} type="video/mp4" />
              </video>
              <img className="img-bg-pc" src={paragraph.field_ec_image[0].url} />
              <img className="img-bg-mobile" src={paragraph.field_ec_image_mb[0].url} />

              <div
                className="video-overlay"
                dangerouslySetInnerHTML={{ __html: videoOverlayHTML }}
              />
              {index === 0 && (
                <div className="arrow-down no-link">
                  <a href="#hero-4">
                    <img src="/images/arrow-down-cyan.svg" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </AppLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { season: 'temporada-1' } }],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`/api/v1/el-cubo/page/5365`);

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
