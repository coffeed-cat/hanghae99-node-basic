const express = require("express");
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const articleRouter = require("./routers/article");
app.use("/article", articleRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
