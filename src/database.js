require('dotenv').config();
const postgres = require('postgres');

const URL = process.env.PG_URL;
const sql = postgres(URL);

module.exports = sql;
