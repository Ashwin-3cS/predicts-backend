// src/controllers/wallet.controller.js
const CoinbaseService = require("../services/coinbase.service");
const Wallet = require("../models/wallet.model");
const MemoryService = require("../utils/memoryStore");

const coinbaseService = new CoinbaseService();
const memoryService = new MemoryService();

exports.createWallet = async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from request

    // Check if user already has a wallet
    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
      return res.status(200).json({
        success: true,
        data: existingWallet,
        message: "Existing wallet found",
      });
    }

    // Create new wallet if none exists
    console.log("Creating CDP wallet...");
    const cdpWallet = await coinbaseService.createWallet();
    console.log("CDP wallet created:", cdpWallet);

    const wallet = await Wallet.create({
      userId: userId,
      address: cdpWallet.addresses[0].id,
      networkId: cdpWallet.model.network_id,
      walletId: cdpWallet.model.id,
    });

    // console.log("Wallet saved to DB:", wallet);

    await memoryService.storeWallet(userId, cdpWallet)
    const checkMemory = memoryService.hasWallet(userId)
    // console.log(checkMemory, "... memory check")

    const getWallet = await memoryService.retrieveWallet(userId)
    console.log(getWallet, "... check Wallet... data exist")

    res.status(201).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// Add a new endpoint to get user's wallet
exports.getUserWallet = async (req, res) => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "No wallet found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.signTransaction = async (req, res) => {
  try {
    const { walletAddress, transaction } = req.body;

    // Verify wallet exists
    const wallet = await Wallet.findOne({ address: walletAddress });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "Wallet not found",
      });
    }

    // Sign transaction
    const signedTransaction = await coinbaseService.signTransaction(
      wallet,
      transaction
    );

    res.status(200).json({
      success: true,
      data: signedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Extend the existing wallet controller with new functionalities

exports.faucetUsdc = async (req, res) => {
  try {
    const { userId } = req.body;
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    // Request USDC faucet transaction
    const faucetTransaction = await wallet.faucet(Coinbase.assets.Usdc);

    // Wait for the transaction to be confirmed
    await faucetTransaction.wait();

    console.log(`Faucet transaction: ${faucetTransaction}`);

    res.status(200).json({
      success: true,
      transaction: faucetTransaction,
    });
  } catch (error) {
    console.error("Faucet transaction failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.getWalletBalance = async (req, res) => {
  try {
    console.log("get wallet balance..");
    const { userId } = req.params;

    // Get wallet from database
    const dbWallet = await Wallet.findOne({ userId });
    if (!dbWallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found for this user",
      });
    }

    // Get balance using the walletId stored in database
    console.log(dbWallet, "wallet found for this user");
    console.log(dbWallet.walletId, "walletId found for this user");

    const balance = await coinbaseService.getWalletBalance(dbWallet.walletId);

    return res.status(200).json({
      success: true,
      data: balance,
    });
  } catch (error) {
    console.error("Error retrieving wallet balance:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createWebhook = async (req, res) => {
  try {
    const { userId, callbackUrl } = req.body;
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    // Create a webhook
    const webhook = await wallet.createWebhook(callbackUrl);

    res.status(201).json({
      success: true,
      webhook: webhook,
    });
  } catch (error) {
    console.error("Failed to create webhook:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Add these to wallet.controller.js

exports.createTransaction = async (req, res) => {
  try {
    const { userId, amount, currency } = req.body;
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    // Implement your transaction creation logic here
    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    // Implement your transaction status check logic here
    res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    // Implement your transaction history retrieval logic here
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


exports.getUserWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    const getWallet = await memoryService.retrieveWallet(userId)
    console.log(getWallet, "getWallet.....Details ")

    res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    console.error("Get wallet error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

