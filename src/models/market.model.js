// src/models/market.model.js
const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    marketId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resolutionDate: {
      type: Date,
      required: true,
    },
    oracle: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "active", "resolved"],
      default: "created",
    },
    contractAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Market", marketSchema);
