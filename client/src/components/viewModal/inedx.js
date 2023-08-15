import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const ExtractedContent = ({ content }) => {
    return (
        <div className="extracted-content" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

const App = () => {
    const [readmeURL, setReadmeURL] = useState('');
    const [extractedContent, setExtractedContent] = useState('');

    const handleURLChange = (e) => {
        setReadmeURL(e.target.value);
    };

    const handleFetchClick = () => {
        axios.get(readmeURL)
            .then((response) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data, 'text/html');
                const targetDiv = doc.querySelector('#target-div'); // Change to your target div selector
                if (targetDiv) {
                    setExtractedContent(targetDiv.innerHTML);
                } else {
                    setExtractedContent('Target div not found.');
                }
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
                setExtractedContent('Error fetching content.');
            });
    };

    return (
        <div className="container">
            <h1>Extract Content</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={readmeURL}
                    onChange={handleURLChange}
                />
                <button onClick={handleFetchClick}>Fetch</button>
            </div>
            <div className="extracted-container">
                <ExtractedContent content={extractedContent} />
            </div>
        </div>
    );
};

export default App;
