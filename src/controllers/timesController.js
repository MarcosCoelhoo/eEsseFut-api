const timesModel = require('../models/timesModel');

const read = async (req, res) => {
  const idTime = req.query.id;

  const { data, error } = await timesModel.read(idTime);

  if (error) {
    console.error('Erro ai ler horários: ', error);
    return res.status(401).send();
  }

  return res.status(201).json(data);
};

const create = async (req, res) => {
  const { data, error } = await timesModel.create(req.body);

  if (error) {
    console.error('Erro ao criar horário: ', error);
    return res.status(401).send();
  }

  return res.status(200).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await timesModel.remove(id);

  if (error) {
    console.error('Erro ao deletar usuário: ', error);
    return res.status(400).json(error);
  }

  return res.status(200).json(data);
};

module.exports = {
  read,
  create,
  remove,
};
