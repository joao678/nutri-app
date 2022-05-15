import defaultResponse from '../core/base.response.js';
import Compendium from '../dados/Compendium.js';
import db from '../models/index.js';

const Anamnese = db.anamnese;
const ExercicioDiario = db.exercicioDiario;

const exercicioController = {
    recuperarExercicios: async function (req, res) {
        /* #swagger.tags = ['Água'] */
        /* #swagger.parameters['Água'] = {
                in: 'body',
                schema: {
                    $quantidade: 0
                }
        } */
        try {
            const compendium = Compendium;

            return res.send(defaultResponse(true, ``, compendium));
        } catch (error) {
            res.send(defaultResponse(false, error.toString()));
        }
    },

    adicionarExercicio: async function (req, res) {
        /* #swagger.tags = ['Exercício'] */
        /* #swagger.parameters['Exercício'] = {
                in: 'body',
                schema: {
                    $codigo_exercicio: 0,
                    tempo: '00:00:00'
                }
        } */
        try {
            const anamnese = await Anamnese.findOne({ where: { usuarioId: req.session.usuarioId } });
            
            const exercicioDiario = await ExercicioDiario.create({
                anamneseId: anamnese.id,
                codigo_exercicio: req.body.codigo_exercicio,
                data_praticada: new Date(),
                tempo: req.body.tempo,
            });
            
            return res.send(defaultResponse(true, `Exercício adicionado com sucesso`, exercicioDiario));
        } catch (error) {
            res.send(defaultResponse(false, error.toString()));
        }
    }
}

export default exercicioController;