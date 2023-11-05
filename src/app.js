const express = require('express');
const cors = require('cors');
const router = require('./router');
const cronDeleteAtEvery24H = require('./cron/cronJobs');

const app = express();

// cronDeleteAtEvery24H();

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;