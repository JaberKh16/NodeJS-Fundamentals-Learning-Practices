const express = require('express');

const router = express.Router();

const urlController = require('../controllers/url.controller');

router.post('/generate', urlController.handleGenerationOfURL);

router.get('/findUrl/:shortId', urlController.findUrlById);

router.get('/findUrl/analytics/:shortId', urlController.getURLAnalyticsInfo);

module.exports = router;
