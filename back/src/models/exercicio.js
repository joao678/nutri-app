export default function (sequelize, Sequelize) {
    const Exercicio = sequelize.define("exercicio", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        descricao: { type: Sequelize.STRING },
        cal_gasta: { type: Sequelize.DECIMAL }
    });
    
    return Exercicio;
}