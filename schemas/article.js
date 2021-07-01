const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = new Schema({
  date: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastFixDate: {
    type: Number,
  },
});

module.exports = mongoose.model("Article", articleSchema);
