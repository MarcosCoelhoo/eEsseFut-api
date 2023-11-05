const schedule = require('node-schedule');
const sql = require('../database');

const MIN = 10;
const MIN_IN_SEC = MIN * 60;

const cronDeleteAtEvery24H = () => {
  console.log('cron iniciado!');
  schedule.scheduleJob('* * * * *', async () => {
    try {
      console.log('Varredura...\n');
      const dataTimes = await sql`select * from times`;

      const infoTimes = dataTimes
        .map(({ id, created_at, title }) => {
          const timestamps = {
            title,
            id,
            created_at: new Date(created_at).getTime(),
          };
          const currentDate = new Date().getTime();

          const diferenceInMs = currentDate - timestamps.created_at;

          const diferenceInSec = Math.floor(diferenceInMs / 1000);

          if (diferenceInSec >= MIN_IN_SEC) {
            return timestamps;
          }

          return null;
        })
        .filter((item) => item !== null);

      if (infoTimes.length) {
        for (let i = 0; i < infoTimes.length; i++) {
          await sql`delete from times where id = ${infoTimes[i].id}`;
          console.log(`${infoTimes[i].title} foi deletado!\n`);
        }
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

module.exports = cronDeleteAtEvery24H;
