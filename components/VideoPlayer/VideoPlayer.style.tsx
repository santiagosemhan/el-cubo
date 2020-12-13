import { ListChronoCover } from 'components/PlayerChronology/PlayerChronology.style';
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

    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 5px 10px;
    display: flex;
    align-items: center;

    & span {
      color: white;
      margin-left: 5px;
      opacity: 0;
      transition: opacity 0.5s ease;
      will-change: opacity;
      font-family: Inter;
      font-size: 16px;
      font-weight: 500;
    }

    &:hover {
      span {
        opacity: 1;
      }
    }
  }

  &.in-fullscreen {
    .back-to-season {
      top: 80px;
    }

    ${ListChronoCover} {
      top: 80px;
    }
  }

  .plyr--video {
    overflow: hidden !important;

    &.plyr--hide-controls {
      .plyr__extra_controls {
        opacity: 0;
      }
    }

    .plyr__control[data-plyr='chapters'] {
      display: none;
    }
  }
`;
