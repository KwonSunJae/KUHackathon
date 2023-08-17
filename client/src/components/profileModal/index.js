import React, { useEffect, useState } from 'react';
import { getTeam,updateTeam } from '../../apis/team';
import './index.css';

const Profile = () => {
  const [profileImg, setProfileImg] = useState('');
  const [readmeURL, setReadmeURL] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=>{
    const userUuid = localStorage.getItem('uuid');
    getTeam(userUuid).then(data=>{
      
      setProfileImg(data.profileImg);
    setReadmeURL(data.readmeURL);
    setTitle(data.title);
    setDescription(data.description);
    });
    
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userUuid = localStorage.getItem('uuid');
    // 여기서 데이터를 서버로 보내는 작업을 수행할 수 있습니다.
    updateTeam({profileImg: profileImg, readmeURL : readmeURL, title : title, description: description, uuid : userUuid}).then(data=>{
      console.log(data);
    })
    
  };

  return (
    <div className="container">
      <h1>Upload Project</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profileImg">Profile Image URL:</label>
        <input
          type="text"
          id="profileImg"
          value={profileImg}
          onChange={(e) => setProfileImg(e.target.value)}
          required
        />

        <label htmlFor="readmeURL">github Readme.md URL:</label>
        <input
          type="text"
          id="readmeURL"
          value={readmeURL}
          onChange={(e) => setReadmeURL(e.target.value)}
          required
        />

        <label htmlFor="title">프로젝트 명:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">설명:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
