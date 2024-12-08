// src/routes/market.routes.js
const express = require("express");
const router = express.Router();
const marketController = require("../controllers/market.controller");

router.post("/create", marketController.createMarket);
router.post("/createTrial", marketController.createMarketTrial);
router.get("/:marketId", marketController.getMarketInfo);

module.exports = router;
