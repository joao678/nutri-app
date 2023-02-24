import dbConfig from '../../db_config.js';
import Sequelize from 'sequelize';
import usuario from './usuario.js';
import anamnese from './anamnese.js';
import exercicioDiario from './exercicioDiario.js';
import aguaDiario from './aguaDiario.js';
import alimentoDiario from './alimentoDiario.js';

const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

const modelIndex = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    
    exercicioDiario: exercicioDiario(sequelize, Sequelize),
    aguaDiario: aguaDiario(sequelize, Sequelize),
    alimentoDiario: alimentoDiario(sequelize, Sequelize),
    anamnese: anamnese(sequelize, Sequelize),
    usuarios: usuario(sequelize, Sequelize)
}

modelIndex.usuarios.hasOne(modelIndex.anamnese);
modelIndex.anamnese.belongsTo(modelIndex.usuarios);

modelIndex.anamnese.hasMany(modelIndex.alimentoDiario, { as: 'alimento_diarios'});
modelIndex.alimentoDiario.belongsTo(modelIndex.anamnese);

modelIndex.anamnese.hasMany(modelIndex.aguaDiario, { as: 'agua_diarios'});
modelIndex.aguaDiario.belongsTo(modelIndex.anamnese);

modelIndex.anamnese.hasMany(modelIndex.exercicioDiario, { as: 'exercicio_diarios' });
modelIndex.exercicioDiario.belongsTo(modelIndex.anamnese);

export default modelIndex;