import React from 'react';

const CommentsBubble = (props) => {
  return (
    <div className="comments-bullet open-comments">
      <img src="/images/laberinto/comment-bullet.svg" />
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
      <p>
        Clic aquí
        <br />
        para comentar
      </p>
    </div>
  );
};

export default CommentsBubble;
