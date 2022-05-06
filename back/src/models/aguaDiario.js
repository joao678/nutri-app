export default function (sequelize, Sequelize) {
    const AguaDiario = sequelize.define("agua_diario", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        quantidade: { type: Sequelize.INTEGER },
        data_consumo: { type: Sequelize.DATE }
    });
    
    return AguaDiario;
}