// src/models/wallet.model.js
const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    networkId: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
