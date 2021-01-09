const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const app = express();

const articlePath = path.join(__dirname, "data", "articles.json");
const accountPath = path.join(__dirname, "data", "accounts.json")

app.use(express.json());
app.use(cors());

app.get("/api/article", (req, res) => {
  res.sendFile(articlePath);
});

app.get("/api/article/:title", (req, res) => {
  const file = JSON.parse(fs.readFileSync(articlePath));
  res.send(file.articles.filter(article => article.title === req.params.title)[0]);
});

app.post("/api/article", (req, res) => {
  const file = JSON.parse(fs.readFileSync(articlePath));
  file.articles.push(req.body);
  fs.writeFileSync(articlePath, JSON.stringify(file, null, 2));

  res.sendStatus(200);
});

app.post("/api/login", (req, res) => {
  const file = JSON.parse(fs.readFileSync(accountPath));
  for (let account of file.accounts) {
    if (account.email === req.body.email && account.password === req.body.password) {
      return res.send({
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        role: account.role,
        link: account.link,
      });
    }
  }
  res.sendStatus(400);
});

if (app.settings.env === "production") {
  app.enable('trust proxy');
  app.use('*', (req, res, next) => {
    if (req.secure) {
      return next();
    }
    res.redirect(`https://${req.hostname}${req.url}`);
  });
  
  app.use(express.static(path.join(__dirname, "../build")));
  app.get(["/", "/*"], (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
