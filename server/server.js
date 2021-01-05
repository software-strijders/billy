const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const app = express();

const articlePath = path.join(__dirname, "data", "articles.json");

app.use(express.json());
app.use(cors());

app.get("/api/article", (req, res) => {
  res.sendFile(articlePath);
});

app.post("/api/article", (req, res) => {
  console.log(req.body);
  const file = JSON.parse(fs.readFileSync(articlePath));
  file.articles.push(req.body);
  fs.writeFileSync(articlePath, JSON.stringify(file, null, 2));

  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
