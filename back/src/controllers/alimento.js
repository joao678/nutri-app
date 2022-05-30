import defaultResponse from '../core/base.response.js';
import db from '../models/index.js';

const Anamnese = db.anamnese;
const AlimentoDiario = db.alimentoDiario;

const alimentoController = {
    adicionarAlimento: async function (req, res) {
        /* #swagger.tags = ['Alimento'] */
        /* #swagger.parameters['Alimento'] = {
                in: 'body',
                schema: {
                    $codigo_alimento: 0,
                    $quantidade: 0,
                }
        } */
        try {
            const anamnese = await Anamnese.findOne({ where: { usuarioId: req.session.usuarioId } });
            
            const alimentoDiario = await AlimentoDiario.create({
                anamneseId: anamnese.id,
                codigo_alimento: req.body.codigo_alimento,
                data_consumo: new Date(),
                quantidade: req.body.quantidade,
                carboidratos: req.body.carboidratos,
                proteinas: req.body.proteinas,
                gorduras: req.body.gorduras,
                calorias: req.body.calorias,
            });
            
            return res.send(defaultResponse(true, `alimento adicionado com sucesso`, alimentoDiario));
        } catch (error) {
            res.send(defaultResponse(false, error.toString()));
        }
    }
}

export default alimentoController;