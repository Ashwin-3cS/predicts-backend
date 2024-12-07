const CoinbaseService = require("../services/coinbase.service");
const Market = require("../models/market.model");

const coinbaseService = new CoinbaseService();

exports.createMarket = async (req, res) => {
  try {
    const {
      walletId,
      contractAddress,
      title,
      description,
      resolutionDate,
      oracle,
    } = req.body;

    if (
      !walletId ||
      !contractAddress ||
      !title ||
      !description ||
      !resolutionDate ||
      !oracle
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const result = await coinbaseService.createPredictionMarket(
      walletId,
      contractAddress,
      title,
      description,
      resolutionDate,
      oracle
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Create market controller error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getMarketInfo = async (req, res) => {
  try {
    const { marketId } = req.params;

    const market = await Market.findOne({ marketId: Number(marketId) });
    if (!market) {
      return res.status(404).json({
        success: false,
        error: "Market not found",
      });
    }

    const marketInfo = await coinbaseService.getMarketInfo(
      market.contractAddress,
      marketId
    );

    res.status(200).json({
      success: true,
      data: {
        ...market.toObject(),
        ...marketInfo,
      },
    });
  } catch (error) {
    console.error("Get market info controller error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
