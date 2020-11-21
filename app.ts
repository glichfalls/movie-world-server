import express from "express";
import {SERVER_PORT} from "./config/config";
import routes from "./routes";

const app = express();

routes(app);

app.listen(SERVER_PORT, () => {
    console.log('server is running on port 5000.');
});
