import express from "express";
import cors from "cors";
import cookie from "cookie-parser";
import bodyParser from "body-parser";

export class App {
  constructor() {
    this.app = express();
  }

  setup() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(cookie());
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  connetDB() {}

  runServer(server) {
    this.app.listen(server.port, () => {
      console.log(`Server is running on http://localhost:${server.port}`);
    });
  }
}
