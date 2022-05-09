import defaultResponse from '../core/base.response.js';
import db from '../models/index.js';

const Anamnese = db.anamnese;
const AguaDiario = db.aguaDiario;

const aguaController = {
    adicionarAgua: async function (req, res) {
        /* #swagger.tags = ['Água'] */
        /* #swagger.parameters['Água'] = {
                in: 'body',
                schema: {
                    $quantidade: 0
                }
        } */
        try {
            const anamnese = await Anamnese.findOne({ where: { usuarioId: req.session.usuarioId } });
            
            const aguaDiario = await AguaDiario.create({
                anamneseId: anamnese.id,
                quantidade: req.body.quantidade,
                data_consumo: new Date()
            });
            
            return res.send(defaultResponse(true, `Água adicionada com sucesso`, aguaDiario));
        } catch (error) {
            res.send(defaultResponse(false, error.toString()));
        }
    }
}

export default aguaController;