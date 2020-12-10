import styled from 'styled-components';

export const VideoPlayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .back-to-season {
    position: absolute;
    top: 20px;
    left: 10px;
    z-index: 10;
    opacity: 1;
    transition: all 0.3s ease;
    will-change: opacity;
    outline: none;
    color: white;
    font-size: 18px;
    font-weight: 400;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 5px 20px;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  &.in-fullscreen {
    .back-to-season {
      top: 80px;
    }
  }

  .plyr--video {
    overflow: hidden !important;

    &.plyr--hide-controls {
      .back-to-season {
        opacity: 0;
      }
    }
  }
`;
