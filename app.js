const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const connector = require("./database/db.js");
const config = require("./config.js");
const router = require("./routes/index.js");

class App {
  constructor() {
    this.app = express();
    this.connector = connector;
  }
  setup() {
    this.app.use(
      cors({
        origin:['http://127.0.0.1:5500','http://localhost:5500'],
        credentials:true,
        methods:['GET','POST','PUT','DELETE']
      })
    );
    this.app.use(cookie());
    this.app.use(express.json());
    //frontend 폴더 자체를 들고 갈게
    this.app.use(express.static("frontend"));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/", router);
    this.app.get("/", (req, res) => {
      res.sendFile(__dirname + "/frontend/main.html");
    });
    this.app.get("/auth", (req, res) => {
      res.sendFile(__dirname + "/frontend/auth.html");
    });
    this.app.get("/detailProduct", (req, res) => {
      res.sendFile(__dirname + "/frontend/detailProduct.html");
    });

    this.app.get("/zone", (req, res) => {
      res.sendFile(__dirname + "/frontend/zone.html");
    });
    this.app.get("/information", (req, res) => {
      res.sendFile(__dirname + "/frontend/information.html");
    });
    this.app.get("/mycart", (req, res) => {
      res.sendFile(__dirname + "/frontend/mycart.html");
    });
    this.app.get("/singup", (req, res) => {
      res.sendFile(__dirname + "/frontend/singup.html");
    });
  }

  runServer() {
    this.app.listen(config.server.port, () => {
      console.log("🔥".repeat(40));
      console.log(
        `Server is running on http://localhost:${config.server.port}`
      );
    });
  }
}

module.exports = App;
