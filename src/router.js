const express = require('express');
const timesController = require('./controllers/timesController');

const router = express.Router();

router.get('/times', timesController.read);

router.post('/times', timesController.create);

router.delete('/times/:id', timesController.remove);

module.exports = router;
