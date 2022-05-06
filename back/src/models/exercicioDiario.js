import exercicio from "./exercicio.js";

export default function (sequelize, Sequelize) {
    const ExercicioDiario = sequelize.define("exercicio_diario", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        tempo_min: { type: Sequelize.INTEGER },
        data_praticado: { type: Sequelize.DATE }
    });
    
    ExercicioDiario.hasOne(exercicio(sequelize, Sequelize));

    return ExercicioDiario;
}