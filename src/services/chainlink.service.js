// src/services/chainlink.service.js
const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

class ChainlinkService {
  constructor() {
    this.apiKey = process.env.FMP_API_KEY;
    if (!this.apiKey) {
      throw new Error("FMP_API_KEY environment variable is not set");
    }
    console.log("Company Profile Service initialized successfully");
  }

  // Add initialize method
  async initialize() {
    try {
      console.log("Initializing Chainlink Service...");
      // Any initialization logic can go here
      return true;
    } catch (error) {
      console.error("Failed to initialize ChainlinkService:", error);
      throw error;
    }
  }

  async getCompanyList() {
    // Implementation for getting company list
  }

  async getESGData(companySymbol) {
    if (!companySymbol) {
      throw new Error("Company symbol is required");
    }

    console.log(`Retrieving company profile data for ${companySymbol}`);

    const options = {
      hostname: "financialmodelingprep.com",
      port: 443,
      path: `/api/v3/profile/${encodeURIComponent(companySymbol)}?apikey=${
        this.apiKey
      }`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const parsedData = JSON.parse(data);

            if (
              !parsedData ||
              (Array.isArray(parsedData) && parsedData.length === 0)
            ) {
              reject(
                new Error(`No company data available for ${companySymbol}`)
              );
              return;
            }

            resolve(parsedData);
          } catch (error) {
            reject(
              new Error(
                `Failed to parse company data for ${companySymbol}: ${error.message}`
              )
            );
          }
        });
      });

      req.on("error", (error) => {
        reject(
          new Error(
            `Network error while fetching company data: ${error.message}`
          )
        );
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error("Request timeout"));
      });

      req.end();
    });
  }
}

module.exports = ChainlinkService;
