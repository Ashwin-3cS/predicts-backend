// src/routes/oracles.routes.js
const express = require('express');
const router = express.Router();
const oracleController = require('../controllers/oracle.controller');

router.get('/companies', oracleController.getCompanyList);
router.get('/esg/:companySymbol', oracleController.getESGData);

module.exports = router;