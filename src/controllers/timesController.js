const timesModel = require('../models/timesModel');

const read = async (req, res) => {
  const idTime = req.query.id;
  try {
    const times = await timesModel.read(idTime);

    return res.status(201).json(times);
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }
};

const create = async (req, res) => {
  try {
    const times = await timesModel.create(req.body);

    return res.status(200).json(times);
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }
};

module.exports = {
  read,
  create,
};
