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

  return (
    <AppLayout>
      <ElcuboGlobalStyles />

      <Head>
        <title>El cubo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <MouseCircle href="/el-cubo/temporada-1" text="Ver más" isBig={bigMouse} />

        <HeaderTop />

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
              <div class="arrow-down no-link">
                  <a href="#hero-1">
                      <img src="/images/arrow-down-cyan.svg" />
                  </a>
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
              <video className="video-bg" autoPlay muted loop>
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
