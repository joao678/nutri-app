export default function (sequelize, Sequelize) {
    const Alimento = sequelize.define("alimento", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        descricao: { type: Sequelize.STRING },
        categoria: { type: Sequelize.STRING },
        perc_unidade: { type: Sequelize.DECIMAL },
        energy_kcal: { type: Sequelize.DECIMAL }
    });
    
    return Alimento;
}