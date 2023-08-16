const express = require("express");
const app = express();
const router = require("./routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
global.logger || (global.logger = require("./modules/winton"));
const db = require("./models");
dotenv.config();
const path = require("path");
const cors = require("cors");
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync()
    .then(() => {
        console.log("db연결");
    }); //연결되었는지 확인
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/apis", router); //routes/index로 연결

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ status: "failed", message: err.message });
});

app.listen(3000, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});

module.exports = app;