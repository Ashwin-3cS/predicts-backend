// server.js
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./utils/db.connect");
const walletRoutes = require("./routes/wallet.routes");
const oracleRoutes = require("./routes/oracles.routes");
const marketRoutes = require("./routes/market.routes");

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//simpel

// Routes
app.use("/api/wallet", walletRoutes);
app.use("/api/oracle", oracleRoutes);
app.use("/api/markets", marketRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 5000;

// Initialize server with database connection
const startServer = async () => {
  try {
    if (!process.env.RPC_URL) {
      throw new Error("Please configure RPC_URL in your .env file");
    }

    await connectDB();

    const ChainlinkService = require("./services/chainlink.service");
    const chainlinkService = new ChainlinkService();
    await chainlinkService.initialize();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Oracle endpoints available at /api/oracle/*`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
