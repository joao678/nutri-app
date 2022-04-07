export default function(sequelize, Sequelize) {
    const Usuario = sequelize.define("usuario", {
    email: { type: Sequelize.STRING, unique: true },
    senha: { type: Sequelize.STRING }
  });

  return Usuario;
}