const express = require("express");

const router = express.Router();

const Article = require("../schemas/article");

router.get("/load-all-articles", async (req, res) => {
  const articleDatas = await Article.find({}).sort("-date");

  res.json(articleDatas);
});

router.get("/create", async (req, res) => {
  res.render("postpage", { isModify: false });
});

router.post("/create", async (req, res) => {
  const { date, author, title, content, password } = req.body;
  await Article.create({ date, author, title, content, password });

  res.json({ result: "success" });
});

router.get("/:articleId", async (req, res) => {
  const { articleId } = req.params;
  let oneArticleData = await Article.find({ _id: articleId });
  let { _id, title, content, date, author } = oneArticleData[0];
  const parsedDate = new Date(date);

  date = `${parsedDate.getFullYear()}년 ${
    parsedDate.getMonth() + 1
  }월 ${parsedDate.getDate()}일`;

  res.render("article", { _id, title, content, date, author });
});

router.get("/:articleId/modify", async (req, res) => {
  const { articleId } = req.params;
  const oneArticleData = await Article.findOne({ _id: articleId });
  const { title, content, author } = oneArticleData;

  res.render("postpage", { articleId, title, content, author, isModify: true });
});

router.post("/:articleId/modify/checkpw", async (req, res) => {
  const { articleId } = req.params;
  const { password } = req.body;

  const oneArticleData = await Article.findOne({ _id: articleId });

  if (oneArticleData.password === password) {
    res.json({ result: "success" });
  } else {
    res.json({ result: "failed" });
  }
});

router.patch("/:articleId/modify", async (req, res) => {
  const { articleId } = req.params;
  const { lastFixDate, author, title, content, password } = req.body;

  const oneArticleData = await Article.findOne({ _id: articleId });

  if (oneArticleData) {
    await Article.updateOne(
      { _id: articleId },
      { $set: { lastFixDate, author, title, content, password } }
    );
    res.json({ msg: "수정이 완료되었습니다🤗" });
  } else {
    res.json({ msg: "존재하지 않는 글입니다." });
  }
});

router.delete("/:articleId/remove", async (req, res) => {
  const { articleId } = req.params;
  const { password } = req.body;
  const oneArticleData = await Article.find({ _id: articleId });
  if (password === oneArticleData[0].password) {
    await Article.deleteOne({ _id: articleId });
    res.json({ result: "success" });
  } else {
    res.json({ result: "failed" });
  }
});

module.exports = router;
