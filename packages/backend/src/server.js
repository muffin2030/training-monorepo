const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");

const port = 3001;

const app = express();

app.use(bodyParser.json());
app.use("/api/v1", api);

app.listen(port, "localhost", (err) => {
    console.log(`server listening on port ${port}`);
    if (err) {
        console.log(err);

        return;
    }
});
