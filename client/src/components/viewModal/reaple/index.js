import React from 'react';
import './index.css'; // Comment 컴포넌트의 스타일을 정의한 CSS 파일을 불러옵니다.

const Comment = ({ name, contents }) => {
  return (
    <div className="comment">
      <div className="comment-author">{name}</div>
      <div className="comment-contents">{contents}</div>
    </div>
  );
};

export default Comment;
