const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const app = express();

const articlePath = path.join(__dirname, "data", "articles.json");
const accountPath = path.join(__dirname, "data", "accounts.json");

// NOTE: This is a very minimal API that probably shouldn't be used in the *actual* Billy

app.use(express.json());
app.use(compression());
app.use(cors());

app.get("/api/article", (req, res) => {
  res.sendFile(articlePath);
});

app.get("/api/article/:title", (req, res) => {
  const file = JSON.parse(fs.readFileSync(articlePath));
  res.send(file.articles.filter((article) => article.title === req.params.title)[0]);
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
        organization: account.organization,
        link: account.link,
      });
    }
  }
  res.sendStatus(400);
});

app.patch("/api/article/:oldTitle", (req, res) => {
  let file = JSON.parse(fs.readFileSync(articlePath));
  file = file.articles.map((article) => {
    if (article.title === req.params.oldTitle) {
      article.title = req.body.title;
      article.headCategory = req.body.headCategory;
      article.subCategory = req.body.subCategory;
      article.text = req.body.text;
      article.description = req.body.description;
      article.readTime = req.body.readTime;
      article.link = req.body.link;
      article.links = req.body.links;
      article.edits = req.body.edits;
    }
    return article;
  });
  fs.writeFileSync(articlePath, JSON.stringify({ articles: file }, null, 2));

  res.sendStatus(200);
});

app.delete("/api/article/:title", (req, res) => {
  const file = JSON.parse(fs.readFileSync(articlePath));
  const filteredArticles = file.articles.filter((article) => article.title !== req.params.title);
  fs.writeFileSync(articlePath, JSON.stringify({ articles: filteredArticles }, null, 2));

  res.sendStatus(200);
});

if (app.settings.env === "production") {
  app.enable("trust proxy");
  // HTTPS redirect
  app.use("*", (req, res, next) => {
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
