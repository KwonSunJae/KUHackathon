const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
const allowedIP = '';

// CORS 미들웨어를 설정하여 특정 IP 주소로의 요청만 허용합니다.
const corsOptions = {
  origin: (origin, callback) => {
    if ( true) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

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
