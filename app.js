const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "/pub")));
app.get("/", (req, res) => {
  res.send("<a href='/index.html'>Hello</a>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
