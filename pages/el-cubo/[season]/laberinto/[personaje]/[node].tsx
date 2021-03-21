import React from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';
import styled from 'styled-components';

import Hls from 'hls.js';
import Plyr from 'plyr';

import { NavLabyrinthStyles } from 'styles/navlabyrinth.style';
import { LabyrinthStyles } from 'styles/labyrinth.style';

import NextNodes from 'components/Labyrinth/NextNodes';
import BackToCharacters from 'components/Labyrinth/BackToCharacters';

import LabyrinthVideoPlayer from 'components/VideoPlayer/LabyrinthVideoPlayer';

import fetcher from 'libs/fetcher';

const FullPlayerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: black;
  position: relative;
`;

// TODO: Remove all nodes fetch, get it inside every node.
const LabyrinthNode = ({ character, node, data, allNodes }) => {

    console.log('NODE DATA', data);

    const nodeTitle = data.field_ec_video_title;
    const bgVideoImage = data.field_ec_background_video_image;
    const bgEndImage = data.field_ec_end_image;
    const triggerCommentsTime = data.field_ec_trigger_comments_time;
    const videoId = data.field_ec_episode_json[0].field_ec_asset_id
    const nextNodes = data.field_ec_labyrinth_items_json;

    React.useEffect(() => {
        // Fade In Page
        // let opacity = 0;
        // let intervalID = 0;
        const video = document.querySelector('.pane-video');

        const time_comments = video.dataset.comments;
        const video_duration = video.dataset.duration;

        // Create marker
        function createSquare(pClass) {
            let percent = calculatePercent(time_comments, video_duration);

            let square = document.createElement('div');
            square.setAttribute("class", pClass);
            square.setAttribute("style", "left: " + percent + "%;");
            return square;
        }

        function createTitle(pTitle) {
            let plyr_title = document.createElement('h2');
            plyr_title.setAttribute("class", 'plyr_title');
            plyr_title.innerHTML = pTitle;
            return plyr_title;
        }

        window.onload = function () {
            setTimeout(() => {

                // document.querySelectorAll('.steal')[0].classList.add('black');
                fadeOut(document.querySelectorAll('.steal')[0], 40);
                loadPlayer(video.dataset.video, video.dataset.poster);

                document.querySelectorAll('.pane-video')[0].classList.add('visible');


                var promise = player.play();

                if (promise !== undefined) {
                    promise.then(_ => {
                        // Autoplay started!

                    }).catch(error => {

                        // Autoplay was prevented.
                        // Show a "Play" button so that user can start playback.
                    });
                }

                settime(time_comments);

                document.getElementsByClassName('steal_title')[0].classList.add('hide');

                // Add time marker
                if (video.hasAttribute("data-comments")) {
                    const controls = document.querySelector('.plyr__progress');
                    controls.appendChild(createSquare('marker'));
                }

                // Add title plyr
                const controls_extra = document.querySelector('.plyr--video');
                controls_extra.prepend(createTitle(video.dataset.title));

            }, 3000);
        };

        // Pane Slide VIDEO
        const button_open = document.querySelectorAll('.toggle');
        const button_close = document.querySelectorAll('.close');
        const pane = document.querySelector('.pane');
        const pane_cover = document.querySelector('.pane-cover');

        if (button_open) {
            button_open.forEach(function (link) {

                link.addEventListener('click', () => {

                    loadPlayer(video.dataset.video, video.dataset.poster);

                    //pane.classList.add('open');
                    //fadeOut(document.querySelector('.hero-laberinto'), 100);

                    fadeIn(pane, 150);

                    pane.classList.remove('is-hidden');

                    document.querySelectorAll('.close')[0].classList.remove('hide');

                    if (video.hasAttribute("data-comments")) {
                        comment_init = false;
                        comment_end = false;
                        settime(time_comments);
                    }
                    player.play();
                });
            });
        }

        if (button_close) {
            button_close.forEach(function (link) {
                link.addEventListener('click', () => {
                    pane.classList.toggle('open');

                    fadeOut(pane, 40);
                    //fadeIn(document.querySelector('.hero-laberinto'), 100);

                    hideComments();

                    setTimeout(() => {
                        //player.stop();

                        loadPlayer('test', 'test');
                    }, 500);
                });
            });
        }

        function loadPlayer(sURL, sPoster) {

            let source = 'https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:' + sURL + '.smil/playlist.m3u8';
            const video = document.querySelector('video');

            //video.setAttribute('poster', sPoster);

            // For more options see: https://github.com/sampotts/plyr/#options
            // captions.update is required for captions to work with hls.js
            const player = new Plyr(video, {
                title: 'Example title',
                captions: {
                    active: true,
                    update: true,
                    language: 'es'
                }
            });

            if (!Hls.isSupported()) {
                video.src = source;
            } else {
                // For more Hls.js options, see https://github.com/dailymotion/hls.js
                const hls = new Hls();
                hls.loadSource(source);
                hls.attachMedia(video);
                window.hls = hls;

                // Handle changing captions
                player.on('languagechange', () => {
                    // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
                    //setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
                });

                player.on('ready', event => {
                    console.log(player);
                });

                player.on('play', function () {
                    console.log('dura: ' + player.duration);
                });

                player.on('ended', function () {

                    pane.classList.add('is-hidden');

                    fadeOut(pane, 80);
                    //fadeIn(documents.querySelector('.hero-laberinto'), 120);

                    //pane.classList.toggle('open');

                    hideComments();
                    // player.fullscreen.exit();
                    comment_init = false;
                    comment_end = false;
                });

                player.on('controlsshown', function () {
                    document.getElementsByClassName('plyr_title')[0].classList.remove('hide');
                });

                player.on('controlshidden', function () {
                    document.getElementsByClassName('plyr_title')[0].classList.add('hide');
                });
            }
        }

        function fadeOut(el, pTime) {
            el.style.opacity = 1;

            (function fade() {
                if ((el.style.opacity -= .07) < 0) {
                    el.style.display = "none";
                } else {
                    setTimeout(fade, pTime);
                }
            })();
        }

        function fadeIn(el, pTime) {
            el.style.opacity = 0;
            el.style.display = "block";

            (function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .07) > 1)) {
                    el.style.opacity = val;
                    setTimeout(fade, pTime);
                }
            })();
        }


        /* Select option */
        const answer_select = document.querySelectorAll('.pulse');
        const next_select = document.getElementById('link-next');

        if (answer_select) {
            answer_select.forEach(function (link) {

                link.addEventListener('click', () => {

                    window.location.href = link.dataset.rel;

                });
            });
        }

        // Pane Slide Comments
        const button_open_comments = document.querySelectorAll('.open-comments');
        const button_close_comments = document.querySelector('.close-comments');
        const pane_comments = document.querySelector('.pane-comments');
        const pane_cover_comments = document.querySelector('.pane-cover-comments');

        if (button_open_comments) {
            button_open_comments.forEach(function (link) {
                link.addEventListener('click', () => {
                    pane_comments.classList.add('open');
                    pane_cover_comments.classList.toggle('visible');
                    player.pause();
                });
            });
        }

        if (button_close_comments) {
            button_close_comments.addEventListener('click', () => {
                pane_comments.classList.toggle('open');
                pane_cover_comments.classList.toggle('visible');
                player.play();
            });
        }



        // Comment trigger
        let comment_init = false;
        let comment_end = false;

        let video_force_end = false;

        function settime(pTimeComments) {

            let time_end = parseInt(pTimeComments) + 15;

            let timer = setInterval(function () {

                if (pTimeComments < player.currentTime) {
                    if (!comment_init) {
                        comment_init = true;
                        showComments();
                    }
                } else {
                    comment_init = false;
                }

                if (time_end < player.currentTime) {
                    if (comment_init && !comment_end) {
                        comment_end = true;
                    }
                } else {
                    comment_end = false;
                }

                // Se cumplen los 2
                if (comment_init && comment_end) {
                    hideComments();
                }

                // Force close end
                /*if (video.hasAttribute("data-end")) {
                    if (!video_force_end) {
                        if (video.dataset.end < player.currentTime) {
                            video_force_end = true;
                            button_close[0].click();
                            console.log(end);
                        }
                    }
                }*/

            }, 1000);

        }

        function showComments() {
            document.querySelectorAll('.comments-bullet')[0].classList.add('visible');
        }

        function hideComments() {
            document.querySelectorAll('.comments-bullet')[0].classList.remove('visible');
        }

        function calculatePercent(num1, total) {
            return (num1 / total) * 100;
        }
    }, []);

    return (
        <AppLayout onlyContent>
            <NavLabyrinthStyles />
            <LabyrinthStyles />

            <Head>
                <title>Laberinto - El cubo</title>
                <link rel='stylesheet' href='https://unpkg.com/plyr@3/dist/plyr.css'></link>
            </Head>

            <BackToCharacters />

            <div className="app-elcubo laberinto">
                <div className="pane open pane-bg">
                    <h2 className="steal_title">{nodeTitle}</h2>
                    <img className="steal" src={bgVideoImage} />
                    <a className="close hide">
                        <img src="/laberinto/img/pane-close.svg" />
                    </a>
                    <div className="pane-video" data-video={videoId} data-poster="" data-title={nodeTitle} data-duration="306" data-comments={triggerCommentsTime}>

                        {/* <LabyrinthVideoPlayer /> */}

                        {/* <FullPlayerWrapper>
                            <LabyrinthVideoPlayer
                                showBackButton
                                backLink="/el-cubo/temporada-1/personajes"
                                title={'title'}
                                poster={'/img/alba/screens/ALBA_1_424264.jpg'}
                                source={'https://rtvcplay-v2.s3.amazonaws.com/s3fs-public/field/ec-avatar/video/Mercado%20432.mp4'}
                                // onBackClick={handleBackClick}
                                // onNextClick={handleNextClick}
                                // onChaptersClick={handleChapterClick}
                                // chapterButtonName={showChapters ? 'Ocultar Cronología' : 'Mostrar Cronología'}
                                showPrevButton={true}
                                showNextButton={true}
                            // onVideoEnded={handleVideoEnded}
                            >
                            </LabyrinthVideoPlayer>
                        </FullPlayerWrapper> */}

                        <video className="hide" controls crossOrigin="true" playsInline></video>
                    </div>
                </div>

                <div className="comments-bullet open-comments">
                    <img src="/laberinto/img/comment-bullet.svg" />
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                    <p>Clic aquí
                    <br />para comentar</p>
                </div>

                <div className="pane-cover-comments"></div>

                <div className="pane-comments" data-relation="">
                    <a className="close-comments">
                        <img src="/laberinto/img/pane-close-black.svg" />
                    </a>
                    <p className="intro">
                        Lorem ipsumulis, ultricies ante a, vulputate libero. Vivamus pharetra iaculiue id varius. Nullam eleifend rutrum nulla, ac
                        tristique
                    </p>

                    <div className="pane-iframe">
                        <div className="facebook-comments">
                            <div id="fb-root"></div>
                            {/* <script>
                                (function (d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) return;
                            js = d.createElement(s);
                            js.id = id;
                            js.src =
                                "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.3&appId=115441168616341";
                            fjs.parentNode.insertBefore(js, fjs);
                            }(document, 'script', 'facebook-jssdk'));
                            </script> */}
                            <div className="fb-comments" data-href="https://www.facebook.com/ElCuboHistorias3D" data-numposts="5" data-colorscheme="dark"
                                data-order-by="reverse-time" width="320"></div>
                        </div>
                    </div>
                </div>

                <NextNodes nextNodes={nextNodes} bgEndImage={bgEndImage} allNodes={allNodes} />

            </div>

        </AppLayout>
    );
};

export async function getStaticPaths() {

    const nodes = await fetcher('/api/v1/elcubo/season/4731/labyrinth/all');
    const pathsData = nodes.map(node => ({
        nodeId: node.nid,
        characterName: node.field_ec_character_json[0].character_name.split(' ').slice(-1).join(' ').trim().toLowerCase(),
    }));

    return {
        paths: pathsData.map(data => ({ params: { season: 'temporada-1', personaje: data.characterName, node: String(data.nodeId) } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {

    const nodeId = context.params.node;
    const nodeData = await fetcher(`/api/v1/elcubo/season/4731/labyrinth/${nodeId}`);

    const allNodes = await fetcher('/api/v1/elcubo/season/4731/labyrinth/all');

    return {
        props: {
            character: context.params.personaje,
            node: nodeId,
            data: nodeData[0],
            allNodes: allNodes,
        },
    };
};

export default LabyrinthNode;