const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tmdbId: { type: Number, required: true },
  type: { type: String, enum: ["movie", "tv"], required: true },
});

module.exports = mongoose.model("Like", likeSchema);
