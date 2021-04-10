import React from 'react';
import NextNodes from 'components/Labyrinth/NextNodes';
import { FacebookProvider, Comments } from 'react-facebook';

const LabVideoPlayer = ({ data }) => {

    const nodeTitle = data.field_ec_video_title;
    const bgVideoImage = data.field_ec_background_video_image;
    const bgEndImage = data.field_ec_end_image;
    const triggerCommentsTime = data.field_ec_trigger_comments_time;
    const videoId = data.field_ec_episode_json[0].field_ec_asset_id.trim();
    const nextNodes = data.field_ec_labyrinth_items_json;
    const introText = data.field_ec_intro_comments;
    const commentsUrl = data.field_ec_url_comments;
    const videoForceEnd = data.field_ec_trigger_end_video;
    const opacity = data.field_ec_end_image_opaccity;

    return (
        <div className="app-elcubo laberinto">

            <div className="pane open pane-bg">
                <h2 className="steal_title">{nodeTitle}</h2>
                <img className="steal" src={bgVideoImage} />
                <a className="close hide">
                    <img src="/images/laberinto/pane-close.svg" />
                </a>
                <div className="pane-video"
                    data-video={videoId}
                    data-end={videoForceEnd}
                    data-title={nodeTitle}
                    data-comments={triggerCommentsTime}>
                    <video className="hide" controls crossOrigin="true" playsInline></video>
                </div>
            </div>

            <div className="comments-bullet open-comments">
                <img src="/images/laberinto/comment-bullet.svg" />
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                <p>
                    Clic aquí
                    <br />para comentar
                </p>
            </div>

            <div className="pane-cover-comments"></div>

            <div className="pane-comments" data-relation="">
                <a className="close-comments">
                    <img src="/images/laberinto/pane-close-black.svg" />
                </a>
                <p className="intro">
                    {introText}
                </p>
                <div className="pane-iframe">
                    <FacebookProvider appId="115441168616341">
                        <Comments width={200} href={commentsUrl} />
                    </FacebookProvider>
                </div>
            </div>

            <NextNodes nextNodes={nextNodes} bgEndImage={bgEndImage} opacity={opacity} />

        </div>
    );
};

export default LabVideoPlayer;