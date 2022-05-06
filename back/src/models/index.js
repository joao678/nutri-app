import dbConfig from '../../db_config.js';
import Sequelize from 'sequelize';
import usuario from './usuario.js';
import anamnese from './anamnese.js';
import exercicioDiario from './exercicioDiario.js';
import exercicio from './exercicio.js';
import aguaDiario from './aguaDiario.js';
import alimento from './alimento.js';
import alimentoDiario from './alimentoDiario.js';

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

export default {
    Sequelize: Sequelize,
    sequelize: sequelize,
    alimento: alimento(sequelize, Sequelize),
    exercicio: exercicio(sequelize, Sequelize),
    exercicioDiario: exercicioDiario(sequelize, Sequelize),
    aguaDiario: aguaDiario(sequelize, Sequelize),
    alimentoDiario: alimentoDiario(sequelize, Sequelize),
    anamnese: anamnese(sequelize, Sequelize),
    usuarios: usuario(sequelize, Sequelize)
}