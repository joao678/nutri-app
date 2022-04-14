export default function (sequelize, Sequelize) {
  const Usuario = sequelize.define("usuario", {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, },
    email: { type: Sequelize.STRING, unique: true },
    senha: { type: Sequelize.STRING },
    nome: { type: Sequelize.STRING },
    idade: { type: Sequelize.INTEGER },
    peso: { type: Sequelize.DECIMAL },
    altura: { type: Sequelize.DECIMAL },
    meta: { type: Sequelize.DECIMAL },
    peso_perder: { type: Sequelize.DECIMAL },
    peso_ganhar: { type: Sequelize.DECIMAL },
    sexo: { type: Sequelize.CHAR },
    nivel_atividade: { type: Sequelize.INTEGER },
    geb: { type: Sequelize.DECIMAL },
    get: { type: Sequelize.STRING },
    cal_total: { type: Sequelize.DECIMAL },
    admin: { type: Sequelize.BOOLEAN },
    confirmado: { type: Sequelize.BOOLEAN },
    etapa: { type: Sequelize.INTEGER, defaultValue: 1, }
  });

  return Usuario;
}