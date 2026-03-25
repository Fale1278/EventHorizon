const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('./config/logger');
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Connected to MongoDB', {
            database: 'MongoDB',
            status: 'connected',
            uri: process.env.MONGO_URI?.replace(/\/\/.*@/, '//***@'),
        });

        app.listen(PORT, () => {
            logger.info('Server started successfully', {
                port: PORT,
                environment: process.env.NODE_ENV || 'development',
                pid: process.pid,
            });
        });
    })
    .catch((err) => {
        logger.error('MongoDB connection failed', {
            error: err.message,
            stack: err.stack,
            database: 'MongoDB',
        });
        process.exit(1);
    });

// TODO: Initialize Workers
// const eventPoller = require('./worker/poller');
// eventPoller.start();
