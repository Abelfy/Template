let Sequelize = require('sequelize');

module.exports = () => {
    let conf = require(`${__dirname}/../conf.json`);
    var model = {};

    model.Operators = Sequelize.Op;
    let sequelize = new Sequelize(conf.db.name,
        conf.db.user,
        conf.db.pwd, {
            dialect: 'mysql',
            host: conf.db.host,
            port: conf.db.port,
            timezone: 'Europe/Paris',
            logging: false
        }
    );


    require('fs').readdirSync(`${__dirname}/models`).forEach(file => model[file.split('.')[0]] = sequelize.import(`${__dirname}/models/${file}`));

    sequelize.sync();

    model.sequelize = sequelize;

    return model;
};