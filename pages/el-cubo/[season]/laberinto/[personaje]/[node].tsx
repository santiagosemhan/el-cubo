import React from 'react';
import AppLayout from 'layouts/AppLayout';
import Head from 'next/head';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { NavLabyrinthStyles } from 'styles/navlabyrinth.style';
import { LabyrinthStyles } from 'styles/labyrinth.style';
import LabVideoPlayer from 'components/Labyrinth/LabVideoPlayer';
import BackToCharacters from 'components/Labyrinth/BackToCharacters';
import fetcher from 'libs/fetcher';

const LabyrinthNode = ({ data }) => {

    React.useEffect(() => {

        // Comment trigger
        let comment_init = false;
        let comment_end = false;
        let video_force_end = false;

        // Pane Slide
        const button_open = document.querySelectorAll('.toggle');
        const button_close = document.querySelectorAll('.close');
        const pane = document.querySelector('.pane');

        // Select option
        const answer_select = document.querySelectorAll('.pulse');

        // Pane Slide Comments
        const button_open_comments = document.querySelectorAll('.open-comments');
        const button_close_comments = document.querySelector('.close-comments');
        const pane_comments = document.querySelector('.pane-comments');
        const pane_cover_comments = document.querySelector('.pane-cover-comments');

        // Video variables
        const video = document.querySelector('.pane-video');
        const time_comments = video.dataset.comments;
        let video_duration = 0;

        const calculatePercent = (num1, total) => {
            return (num1 / total) * 100;
        };

        const createSquare = (pClass) => {
            console.log('DATOS CUANDO VOY A CREAR EL CUADRADOOOO', time_comments, video_duration);
            let percent = calculatePercent(time_comments, video_duration);
            let square = document.createElement('div');
            square.setAttribute("class", pClass);
            square.setAttribute("style", "left: " + percent + "%;");
            return square;
        };

        const updateQuality = (newQuality) => {
            if (window.hls) {
                console.log('LEVELS:', window.hls.levels);
                window.hls.levels.forEach((level, levelIndex) => {
                    console.log(level.height, newQuality);
                    if (level.height === newQuality) {
                        console.log('Found quality match with ' + newQuality);
                        window.hls.currentLevel = levelIndex;
                    }
                });
            }
        };

        const loadPlayer = (sURL) => {
            let source = 'https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:' + sURL + '.smil/playlist.m3u8';
            const video = document.querySelector('video');
            const player = new Plyr(video, {
                captions: {
                    active: true,
                    update: true,
                    language: 'es'
                },
                quality: {
                    default: 720,
                    options: [720, 360, 270],
                    forced: true,
                    onChange: (e) => updateQuality(e),
                },
                controls: [
                    'play',
                    'progress',
                    'current-time',
                    'mute',
                    'volume',
                    'settings',
                    'fullscreen',
                ],
                settings: ['quality'],
            });
            if (!Hls.isSupported()) {
                video.src = source;
            } else {
                const hls = new Hls();
                hls.loadSource(source);
                hls.attachMedia(video);
                window.hls = hls;
                player.on('play', event => {
                    video_duration = player.duration;
                    // Add time marker
                    if (time_comments) {
                        settime(time_comments);
                        const controls = document.querySelector('.plyr__progress');
                        controls.appendChild(createSquare('marker'));
                    }
                });
                player.on('ended', event => {
                    pane.classList.add('is-hidden');
                    fadeOut(pane, 80);
                    hideComments();
                    comment_init = false;
                    comment_end = false;
                });
                player.on('controlsshown', event => {
                    const plyrTitle = document.getElementsByClassName('plyr_title');
                    if (plyrTitle && plyrTitle.length) {
                        document.getElementsByClassName('plyr_title')[0].classList.remove('hide');
                    }
                });
                player.on('controlshidden', event => {
                    const plyrTitle = document.getElementsByClassName('plyr_title');
                    if (plyrTitle && plyrTitle.length) {
                        document.getElementsByClassName('plyr_title')[0].classList.add('hide');
                    }
                });
            }
            return player;
        };



        const fadeOut = (el, pTime) => {
            el.style.opacity = 1;

            (function fade() {
                if ((el.style.opacity -= .07) < 0) {
                    el.style.display = "none";
                } else {
                    setTimeout(fade, pTime);
                }
            })();
        };

        const fadeIn = (el, pTime) => {
            el.style.opacity = 0;
            el.style.display = "block";

            (function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .07) > 1)) {
                    el.style.opacity = val;
                    setTimeout(fade, pTime);
                } else {
                    el.style.opacity = 1;
                }
            })();
        };

        const showComments = () => {
            document.querySelectorAll('.comments-bullet')[0].classList.add('visible');
        };

        const hideComments = () => {
            document.querySelectorAll('.comments-bullet')[0].classList.remove('visible');
        };

        const settime = (pTimeComments) => {
            let time_end = parseInt(pTimeComments) + 15;
            setInterval(() => {
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
                // TODO: end has to be video_duration - field_ec_trigger_end_video
                // Check field_ec_trigger_end_video exists
                if (video_force_end && video.hasAttribute("data-end") && video.dataset.end > 0) {
                    // if (video.dataset.end < player.currentTime) {
                    if (player.currentTime > (video_duration - video.dataset.end)) {
                        button_close[0].click();
                    }
                }
            }, 1000);
        };




        const createTitle = (pTitle) => {
            let plyr_title = document.createElement('h2');
            plyr_title.setAttribute("class", 'plyr_title');
            plyr_title.innerHTML = pTitle;
            return plyr_title;
        };

        const player = loadPlayer(video.dataset.video);

        // Fix mobile Tap play/pause
        const { wrapper, container } = player.elements
        if (!container._clickListener) {
            container._clickListener = event => {
                const targets = [container, wrapper]

                // Ignore if click if not container or in video wrapper
                if (!targets.includes(event.target) && !wrapper.contains(event.target)) {
                    return
                }

                if (player.touch) player.togglePlay()
            }
            container.addEventListener('click', container._clickListener)
        }

        if (button_open) {
            button_open.forEach((link) => {
                link.addEventListener('click', () => {
                    fadeIn(pane, 150);
                    pane.classList.remove('is-hidden');
                    document.querySelectorAll('.close')[0].classList.remove('hide');
                    if (time_comments) {
                        comment_init = false;
                        comment_end = false;
                        settime(time_comments);
                    }
                    player.play();
                });
            });
        }

        if (button_close) {
            button_close.forEach((link) => {
                link.addEventListener('click', () => {
                    fadeOut(pane, 40);
                    pane.classList.toggle('open');
                    hideComments();
                    player.stop();
                });
            });
        }

        if (answer_select) {
            answer_select.forEach((link) => {

                link.addEventListener('click', () => {

                    window.location.href = link.dataset.rel;

                });
            });
        }

        if (button_open_comments) {
            button_open_comments.forEach((link) => {
                link.addEventListener('click', () => {
                    pane_comments.classList.add('open');
                    pane_cover_comments.classList.toggle('visible');
                    player.pause();
                });
            });
        }

        if (button_close_comments) {
            button_close_comments.addEventListener('click', () => {
                pane_comments.classList.remove('open');
                pane_cover_comments.classList.remove('visible');
                player.play();
            });
        }

        const onLoadFadeout = () => {
            window.setTimeout(() => {
                fadeOut(document.querySelectorAll('.steal')[0], 40);
                document.querySelectorAll('.pane-video')[0].classList.add('visible');
                player.play();
                document.getElementsByClassName('steal_title')[0].classList.add('hide');

                // Add title plyr
                const controls_extra = document.querySelector('.plyr--video');
                controls_extra.prepend(createTitle(video.dataset.title));
            }, 3000)
        };
        onLoadFadeout();
    }, []);

    return (
        <AppLayout onlyContent>
            <NavLabyrinthStyles />
            <LabyrinthStyles />

            <Head>
                <title>Laberinto - El cubo</title>
            </Head>

            <BackToCharacters />
            <LabVideoPlayer data={data} />

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

    return {
        props: {
            data: nodeData[0],
        },
    };
};

export default LabyrinthNode;