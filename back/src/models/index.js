import dbConfig from '../../db_config.js';
import Sequelize from 'sequelize';
import usuario from './usuario.js';
import anamnese from './anamnese.js';
import exercicioDiario from './exercicioDiario.js';
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

/* const sequelize = new Sequelize({
    storage: dbConfig.storage,
    dialect: dbConfig.dialect,
}); */

const modelIndex = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    
    alimento: alimento(sequelize, Sequelize),
    exercicioDiario: exercicioDiario(sequelize, Sequelize),
    aguaDiario: aguaDiario(sequelize, Sequelize),
    alimentoDiario: alimentoDiario(sequelize, Sequelize),
    anamnese: anamnese(sequelize, Sequelize),
    usuarios: usuario(sequelize, Sequelize)
}

modelIndex.usuarios.hasOne(modelIndex.anamnese);
modelIndex.anamnese.belongsTo(modelIndex.usuarios);

/* modelIndex.alimentoDiario.hasOne(modelIndex.alimento);
modelIndex.alimento.belongsTo(modelIndex.alimentoDiario); */

modelIndex.anamnese.hasMany(modelIndex.alimentoDiario, { as: 'alimento_diarios'});
modelIndex.alimentoDiario.belongsTo(modelIndex.anamnese);

modelIndex.anamnese.hasMany(modelIndex.aguaDiario, { as: 'agua_diarios'});
modelIndex.aguaDiario.belongsTo(modelIndex.anamnese);

modelIndex.anamnese.hasMany(modelIndex.exercicioDiario, { as: 'exercicio_diarios' });
modelIndex.exercicioDiario.belongsTo(modelIndex.anamnese);

export default modelIndex;