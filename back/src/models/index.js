import dbConfig from '../../db_config.js';
import Sequelize from 'sequelize';
import usuario from './usuario.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

/*const db = {
    //Sequelize: Sequelize,
    sequelize: sequelize,
    usuarios: usuario(sequelize, Sequelize)
};*/

//export default db;
export default {
    Sequelize: Sequelize,
    sequelize: sequelize,
    usuarios: usuario(sequelize, Sequelize)
}