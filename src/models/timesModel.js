const supabase = require('../database');

const generateUniqueID = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000);

  return `${timestamp}-${randomNum}`;
};

const read = async (idTime) => {
  if (idTime) {
    const { data, error } = await supabase
      .from('times')
      .select()
      .eq('id', idTime);

    return { data, error };
  }

  const { data, error } = await supabase.from('times').select();

  return { data, error };
};

const create = async (body) => {
  const { author, title, date, hour, local, description } = body;
  const id = generateUniqueID();

  const bodyObj = { id, author, title, date, hour, local, description };

  const { error } = await supabase.from('times').insert(bodyObj);

  return { data: { message: 'Horário criado com sucesso', id }, error };
};

const remove = async (id) => {
  const { error } = await supabase.from('times').delete().eq('id', id);

  return { data: { message: 'Horário deletado com sucesso', id }, error };
};

module.exports = {
  read,
  create,
  remove,
};
