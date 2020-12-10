import React, { useState } from 'react';
import { StyledMouseCircle } from './MouseCircle.style';

const MouseCircle = ({ show = true, isBig = false, noLink = false, href, text }) => {
  const ref = React.useRef();
  const [isMobile] = useState(
    process.browser ? !window.matchMedia('(min-width: 768px)').matches : false,
  );

  React.useEffect(() => {
    // Cursor
    if (!isMobile) {
      let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = ref.current;
      if (mouseCircle) {
        document.onmousemove = (e) => {
          mousePosX = e.pageX;
          mousePosY = e.pageY;
        };

        let delay = 3;
        let revisedMousePosX = 0;
        let revisedMousePosY = 0;

        function delayMouseFollow() {
          requestAnimationFrame(delayMouseFollow);
          revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
          revisedMousePosY += (mousePosY - revisedMousePosY) / delay;
          if (ref.current) {
            ref.current.style.top = revisedMousePosY + 'px';
            ref.current.style.left = revisedMousePosX + 'px';
          }
        }
        delayMouseFollow();
      }
    }
  }, [isMobile]);

  return (
    !isMobile && (
      <StyledMouseCircle
        ref={ref}
        className={`
      ${isBig ? 'big' : ''}
      ${!show ? 'is-hidden' : ''}
    `}
        onMouseMove={(e) => e.stopPropagation()}
      >
        {!noLink && (
          <span>
            <a href={href}>{text}</a>
          </span>
        )}
      </StyledMouseCircle>
    )
  );
};

export default MouseCircle;
