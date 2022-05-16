import alimento from "./alimento.js";

export default function (sequelize, Sequelize) {
    const AlimentoDiario = sequelize.define("alimento_diario", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        quantidade: { type: Sequelize.DECIMAL },
        qtd_fracionado: { type: Sequelize.DECIMAL },
        data_consumo: { type: Sequelize.DATE },
        data_consumo: { type: Sequelize.DATE }
    });

    return AlimentoDiario;
}