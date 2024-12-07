// src/controllers/oracle.controller.js
const ChainlinkService = require("../services/chainlink.service");
const chainlinkService = new ChainlinkService();

const getCompanyList = async (req, res) => {
    try {
        const companies = await chainlinkService.getCompanyList();
        res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getESGData = async (req, res) => {
    try {
        const { companySymbol } = req.params;
        console.log(`Processing company profile request for: ${companySymbol}`);
        
        const companyData = await chainlinkService.getESGData(companySymbol.toUpperCase());
        
        res.status(200).json({
            success: true,
            data: companyData
        });
    } catch (error) {
        console.error(`Company data fetch failed for ${req.params.companySymbol}:`, error);
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
};

// Export the controller functions
module.exports = {
    getCompanyList,
    getESGData
};