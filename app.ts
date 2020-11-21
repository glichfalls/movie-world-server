import express from "express";

const app = express();

app.get('/', (req, res) => {
    console.log(req, res);
});

app.listen(5000, () => {
    console.log('server is running on port 5000.');
});
