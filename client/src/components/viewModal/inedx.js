import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import remarkGfm from 'remark-gfm'
import MDEditor from '@uiw/react-md-editor';
const View = ({ url }) => {
    const [readmeURL, setReadmeURL] = useState(url);
    const [markdownContent, setMarkdownContent] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    useEffect(() => {
        // 여기에 실행하고자 하는 함수를 작성합니다.
        handleFetchClick();

        // 필요에 따라 정리(clean-up) 함수를 반환할 수 있습니다.
        // 이 함수는 컴포넌트가 unmount될 때 실행됩니다.
        return () => {
            console.log('Component will unmount!');
        };
    }, []);

    const handleFetchClick = () => {
        fetch(readmeURL)
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                setMarkdownContent(data);
            })
            .catch((error) => {
                console.error('Error fetching readme:', error);
                setMarkdownContent('Error fetching readme.');
            });
    };

    return (
        <div className="container">
            <h1>Render README</h1>
            <div className="markdown-container" >
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]} ></ReactMarkdown> */}
                <MDEditor.Markdown
                    style={{ padding: 10 }}
                    source={markdownContent}
                />
            </div>
            <div className="like-container">
                <button onClick={handleLikeClick}>
                    {liked ? 'Unlike' : 'Like'}
                </button>
                <span>{liked ? 'Liked!' : 'Not Liked'}</span>
            </div>
            <div className="comment-container">
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit</button>
                <div className="comments">
                    {comments.map((c, index) => (
                        <div key={index}>{c}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default View;
