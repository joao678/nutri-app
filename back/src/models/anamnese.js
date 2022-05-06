import aguaDiario from "./aguaDiario.js";
import alimentoDiario from "./alimentoDiario.js";
import exercicioDiario from "./exercicioDiario.js";

export default function (sequelize, Sequelize) {
    const Anamnese = sequelize.define("anamnese", {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
        meta: { type: Sequelize.INTEGER },
        peso_perder: { type: Sequelize.DECIMAL },
        peso_ganhar: { type: Sequelize.DECIMAL },
        nivel_atividade: { type: Sequelize.INTEGER },
        geb: { type: Sequelize.DECIMAL },
        get: { type: Sequelize.STRING },
        cal_total: { type: Sequelize.DECIMAL }
    });

    Anamnese.hasMany(exercicioDiario(sequelize, Sequelize));
    Anamnese.hasMany(aguaDiario(sequelize, Sequelize));
    Anamnese.hasMany(alimentoDiario(sequelize, Sequelize));
    
    return Anamnese;
}