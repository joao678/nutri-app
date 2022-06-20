export default function (sequelize, Sequelize) {
    const ExercicioDiario = sequelize.define("exercicio_diario", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        codigo_exercicio: { type: Sequelize.INTEGER },
        tempo: { type: Sequelize.TIME },
        data_praticada: { type: Sequelize.DATE },
        descricao: { type: Sequelize.STRING },
        met: { type: Sequelize.DECIMAL },
    });

    return ExercicioDiario;
}