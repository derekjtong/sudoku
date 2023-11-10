const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { ppid } = require("process");

app.use(express.static(path.join(__dirname, "/dist")));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
