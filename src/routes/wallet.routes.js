// src/routes/wallet.routes.js
const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

router.post("/create", walletController.createWallet);
router.get("/user/:userId", walletController.getUserWallet);

// Get wallet balance
router.get("/balance/:userId", walletController.getWalletBalance);

// Create a transaction
router.post("/transaction", walletController.createTransaction);

// Get transaction status
router.get(
  "/transaction/:transactionId",
  walletController.getTransactionStatus
);

// Get transaction history
router.get("/transactions/:userId", walletController.getTransactionHistory);

module.exports = router;
