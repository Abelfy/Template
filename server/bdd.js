var Sequelize = require('sequelize');

let conf = require(`${__dirname}/conf.json`);

module.exports = new Sequelize(conf.db.name, conf.db.user, conf.db.pwd, {
    dialect: 'mysql',
    host: conf.db.host,
    port: conf.db.port,
    timezone: 'Europe/Paris',
    logging: conf.env === 'dev' ? console.log : false
  });
