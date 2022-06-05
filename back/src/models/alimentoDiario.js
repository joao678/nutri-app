export default function (sequelize, Sequelize) {
    const AlimentoDiario = sequelize.define("alimento_diario", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        codigo_alimento: { type: Sequelize.INTEGER },
        quantidade: { type: Sequelize.DECIMAL },
        carboidratos: { type: Sequelize.DECIMAL },
        proteinas: { type: Sequelize.DECIMAL },
        gorduras: { type: Sequelize.DECIMAL },
        calorias: { type: Sequelize.DECIMAL },
        data_consumo: { type: Sequelize.DATE },
        descricao: { type: Sequelize.STRING }
    });

    return AlimentoDiario;
}