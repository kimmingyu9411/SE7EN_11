import { App } from "./app.js";
import { config } from "./config.js";

const app = new App();

app.setup();
app.connetDB();
app.runServer(config.server);