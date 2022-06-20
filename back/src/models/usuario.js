export default function (sequelize, Sequelize) {
    const Usuario = sequelize.define("usuario", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
        email: { type: Sequelize.STRING, unique: true },
        senha: { type: Sequelize.STRING },
        data_nasc: { type: Sequelize.DATE },
        peso: { type: Sequelize.DECIMAL },
        altura: { type: Sequelize.DECIMAL },
        sexo: { type: Sequelize.CHAR(1) },
        admin: { type: Sequelize.BOOLEAN },
        confirmado: { type: Sequelize.BOOLEAN, defaultValue: false, },
        etapa: { type: Sequelize.INTEGER, defaultValue: 1, }
    });

    return Usuario;
}