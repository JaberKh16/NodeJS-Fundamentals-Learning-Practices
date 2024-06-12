/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const { v4: uuidv4 } = require('uuid');
const URLModel = require('../models/url.model');

const urlController = {};

urlController.handleGenerationOfURL = async (req, res) => {
    const shortId = uuidv4();
    if (!req.body.url) {
        return res.status(400).json({ msg: 'Url is required' });
    }
    const createdData = await URLModel.create({
        shortId,
        redirectUrl: req.body.url,
        visitHistory: [],
    });

    return res
        .status(200)
        .json({ msg: 'Data stored successfully.', data: createdData, id: shortId });
};

urlController.findUrlById = async (req, res) => {
    const { shortId } = req.params;
    const findEntry = await URLModel.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
    );
    if (!findEntry) {
        return res.status(200).json({ msg: 'Data not found', data: [] });
    }
    return res.status(200).json({ msg: 'Find success', data: findEntry });
};

urlController.getURLAnalyticsInfo = async (req, res) => {
    const { shortId } = req.params;
    const findAnalytics = await URLModel.findOne({ shortId });

    if (!findAnalytics) {
        return res.status(200).json({ msg: 'Data not found', data: [] });
    }
    return res.status(200).json({
        msg: 'Found Analytics Info',
        data: findAnalytics.visitHistory,
        totalClicks: findAnalytics.visitHistory.length,
    });
};

module.exports = urlController;
