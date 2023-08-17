import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import remarkGfm from 'remark-gfm'
import MDEditor from '@uiw/react-md-editor';
import Comment from './reaple';
import { getTeam, writeReaple, likeTeam,dislikeTeam,isLikeAvailable } from '../../apis/team';
const View = ({ uuid }) => {
    const [readmeURL, setReadmeURL] = useState('');
    const [markdownContent, setMarkdownContent] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [name,setName] = useState('');
    const [availabeLike, setAvailableLike] = useState(true);
    const [likeList, setLikeList] = useState(0);

    useEffect(() => {
        // 여기에 실행하고자 하는 함수를 작성합니다.
        const sUuid = localStorage.getItem('Suuid');
        const userUuid = localStorage.getItem('uuid');
        isLikeAvailable(userUuid).then(data=>{
            console.log(data);
            setAvailableLike(data.isAvailable);
        })
        
        getTeam( localStorage.getItem('Suuid')).then(teamInfo=>{
            console.log(sUuid);
            setReadmeURL('http://117.16.137.217:5000/image?url='+teamInfo.readmeURL);
            setComments(teamInfo.reapleList);
            setName(teamInfo.name);
            console.log(teamInfo.likeNameList);
            setLikeList(teamInfo.likeNameList);
            handleFetchClick('http://117.16.137.217:5000/image?url='+teamInfo.readmeURL);
        });
        
        


         //readme rendering

        // 필요에 따라 정리(clean-up) 함수를 반환할 수 있습니다.
        // 이 함수는 컴포넌트가 unmount될 때 실행됩니다.
        
    }, []);
    
    const handleLikeClick = () => {
        const userUuid = localStorage.getItem('uuid');
        if ( availabeLike){
            setLiked(!liked);
            if(liked){
                const data = dislikeTeam({uuid : userUuid ,dislikeTeamName : name});
            }else{
                const data = likeTeam({uuid : userUuid ,likeTeamName : name});
            }
            

        }
        
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            const userName = localStorage.getItem('name');
            const targetuuid = localStorage.getItem('Suuid');
            const data = writeReaple({name : userName, teamUuid : targetuuid,contents : comment});

            setComment('');

        }
    };

    

    const handleFetchClick = (u) => {
        fetch(u)
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
            <h1>{name}</h1>
            <div className="markdown-container" >
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]} ></ReactMarkdown> */}
                <MDEditor.Markdown
                    style={{ padding: 10 }}
                    source={markdownContent}
                />
            </div>
            <div className="like-container">
                <button onClick={handleLikeClick}>
                    {availabeLike ? (liked ? 'Unlike' : 'Like'): '불가'}
                </button>
                <span>{availabeLike? `${likeList==null?0:likeList.length}명 투표했습니다.`: '이미 10팀이상에게 투표하였습니다.'}</span>
            </div>
            <div className="comment-container">
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit</button>
                {comments.map((comment, index) => (
                    <Comment key={index} name={comment.name} contents={comment.contents} />
                ))}
            </div>
        </div>
    );
};

export default View;
