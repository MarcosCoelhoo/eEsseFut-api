const sql = require('../database');

const generateUniqueID = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000);

  return `${timestamp}-${randomNum}`;
};

const read = async (idTime) => {
  try {
    if (idTime) {
      const time = await sql`select * from times where id = ${idTime}`;

      return time;
    }

    const times = await sql`select * from times`;

    return times;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const create = async (body) => {
  const { author, title, date, hour, local, description } = body;

  try {
    const id = generateUniqueID();
    await sql`insert into times (author, title, date, hour, local, description, id) values (${author}, ${title}, ${date}, ${hour}, ${local}, ${description}, ${id})`;

    return { message: 'Horário criado com sucesso', id };
  } catch (error) {
    console.log(error);
    return { erro: error };
  }
};

module.exports = {
  read,
  create,
};
