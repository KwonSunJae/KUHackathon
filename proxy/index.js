const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// 프록시 엔드포인트 설정
app.get('/image', (req, res) => {
  const imageUrl = req.query.url;
  
  if (!imageUrl) {
    return res.status(400).send('Missing image URL');
  }

  axios.get(imageUrl, { responseType: 'arraybuffer' })
    .then((response) => {
      const contentType = response.headers['content-type'];
      res.set('Content-Type', contentType);
      res.send(response.data);
    })
    .catch((error) => {
      console.error('Error fetching image:', error);
      res.status(500).send('Error fetching image');
    });
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
