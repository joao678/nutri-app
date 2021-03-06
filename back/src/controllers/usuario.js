import 'dotenv/config';
import bcrypt from 'bcrypt';
import enviarEmail from '../../email.js';
import defaultResponse from '../core/base.response.js';
import db from '../models/index.js';
import Compendium from '../dados/Compendium.js';

const Usuario = db.usuarios;
const Anamnese = db.anamnese;
const AguaDiario = db.aguaDiario;
const ExercicioDiario = db.exercicioDiario;
const AlimentoDiario = db.alimentoDiario;
const Op = db.Sequelize.Op;

const usuarioController = {
    create: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        /* #swagger.parameters['Usuário'] = {
                in: 'body',
                schema: {
                    $email: 'joao678@gmail.com',
                    $senha: 'v12fv452'
                }
        } */
        try {
            if (req.body.senha === '') throw "A Senha não foi informada!";
            const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);

            const usuarioEntidade = await Usuario.create({
                email: req.body.email,
                senha: senhaCriptografada,
                anamnese: {}
            }, {
                include: [Anamnese]
            });

            return enviarEmail(
                req.body.email,
                'Confirmar usuário - Nutri App',
                `<a href="http://${process.env.HOST}:3000/confirmar-usuario/${usuarioEntidade.id}">Clique aqui para confirmar seu usuário</a>`,
                () => {
                    return res.send(defaultResponse(true, `O email de confirmação foi enviado`));
                });
        } catch (error) {
            res.send(defaultResponse(false, error.toString()));
        }
    },

    login: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        /* #swagger.parameters['Usuário'] = {
                in: 'body',
                schema: {
                    $email: "joao678@gmail.com",
                    $senha: "v12fv452"
                }
        } */
        try {
            const TODAY_START = new Date().setHours(0, 0, 0, 0);
            const NOW = new Date();

            const usuario = await Usuario.findOne({
                where: { email: { [Op.like]: req.body.email } },
                include: [{
                    model: Anamnese,
                    include: [{
                        model: AguaDiario,
                        as: 'agua_diarios',
                        required: false,
                        where: {
                            data_consumo: {
                                [Op.gt]: TODAY_START,
                                [Op.lt]: NOW
                            }
                        }
                    }, {
                        model: ExercicioDiario,
                        required: false,
                        as: 'exercicio_diarios',
                        where: {
                            data_praticada: {
                                [Op.gt]: TODAY_START,
                                [Op.lt]: NOW
                            }
                        }
                    }, {
                        model: AlimentoDiario,
                        required: false,
                        as: 'alimento_diarios',
                        where: {
                            data_consumo: {
                                [Op.gt]: TODAY_START,
                                [Op.lt]: NOW
                            }
                        }
                    }]
                }]
            });

            if (!usuario) throw "Usuário inexistente.";

            if (await bcrypt.compare(req.body.senha, usuario.senha)) {
                req.session.loggedin = true;
                req.session.usuarioId = usuario.id;
                req.session.username = req.body.email;
                req.session.save();

                usuario.anamnese.exercicio_diarios.forEach((exercicio) => {
                    exercicio.dataValues.met = Compendium[exercicio.codigo_exercicio].met;
                });

                return res.send(defaultResponse(true, "Logado com sucesso!!!", usuario));
            }

            res.send(defaultResponse(false, "Senha incorreta", {}));
        } catch (error) {
            res.send(defaultResponse(false, error));
        }
    },

    recuperarInfoUsuarioLogado: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        try {
            const TODAY_START = new Date().setHours(0, 0, 0, 0);
            const NOW = new Date();

            const usuario = await Usuario.findOne({
                where: { id: req.session.usuarioId },
                order: [
                    [{model: Anamnese, as: 'anamnese'}, {model: AguaDiario, as: 'agua_diarios'}, 'createdAt', 'DESC'],
                    [{model: Anamnese, as: 'anamnese'}, {model: ExercicioDiario, as: 'exercicio_diarios'}, 'createdAt', 'DESC'],
                    [{model: Anamnese, as: 'anamnese'}, {model: AlimentoDiario, as: 'alimento_diarios'}, 'createdAt', 'DESC']
                ],
                include: [{
                    model: Anamnese,
                    as: 'anamnese',
                    include: [{
                        model: AguaDiario,
                        as: 'agua_diarios',
                        required: false
                    }, {
                        model: ExercicioDiario,
                        required: false,
                        as: 'exercicio_diarios'
                    }, {
                        model: AlimentoDiario,
                        required: false,
                        as: 'alimento_diarios'
                    }]
                }]
            });

            if (!usuario) throw "Usuário inexistente.";

            return res.send(defaultResponse(true, "", usuario));
        } catch (error) {
            res.send(defaultResponse(false, error));
        }
    },

    logout: function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        if (!req.session.loggedin) return res.send(defaultResponse(false, "Primeiro efetue um login."));

        req.session.loggedin = false;
        req.session.username = null;
        req.session.usuarioId = null;
        req.session.destroy();

        res.send(defaultResponse(true, "Usuário deslogado com sucesso"));
    },

    recuperarSenha: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        /* #swagger.parameters['Usuário'] = {
                in: 'body',
                schema: {
                    $email: "joao678@gmail.com",
                }
        } */
        try {
            const usuario = await Usuario.findOne({
                where: { email: { [Op.like]: req.body.email } }
            });

            const usuarioId = usuario.id;

            return enviarEmail(
                req.body.email,
                'Recuperar senha - Nutri App',
                `Clique aqui para recuperar sua senha: <a href="http://10.0.0.100:3000/alterar-senha/${usuarioId}">Recuperar senha</a>`,
                () => {
                    return res.send(defaultResponse(true, `O email de recuperação foi enviado`));
                });
        } catch (error) {
            return res.send(defaultResponse(false, error || `O email informado não pertence a nenhum usuário.`));
        }
    },

    alterarSenha: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        /* #swagger.parameters['Usuário'] = {
                in: 'body',
                schema: {
                    $id: "",
                    $senha: "",
                }
        } */
        const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);

        Usuario.update({ senha: senhaCriptografada }, {
            where: { id: req.body.id }
        }).then(num => {
            if (num == 1) res.send(defaultResponse(true, `A senha foi alterada com sucesso`));
            else res.send(defaultResponse(false, `Ocorreu um erro ao alterar a senha`));
        }).catch(err => {
            res.send(defaultResponse(false, `Ocorreu um erro desconhecido: ${err}`));
        });
    },

    confirmar: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        /* #swagger.parameters['Usuário'] = {
                in: 'body',
                schema: {
                    $id: "",
                }
        } */
        const usuario = await Usuario.findOne({ where: { id: req.body.id } });

        Usuario.update({ confirmado: true }, {
            where: { id: req.body.id }
        }).then(num => {
            if (num == 1) res.send(defaultResponse(true, `O usuário foi confirmado com sucesso`, usuario));
            else res.send(defaultResponse(false, `Ocorreu um erro ao confirmar o usuário`));
        }).catch(err => {
            res.send(defaultResponse(false, `Ocorreu um erro desconhecido: ${err}`));
        });
    },

    alterarUsuario: async function (req, res) {
        /* #swagger.tags = ['Usuário'] */
        /* #swagger.parameters['Usuário'] = {
                in: 'body',
                schema: {
                    $id: "string",
                    $email: "string",
                    $senha: "string",
                    $nome: "string",
                    $peso: 0.0,
                    $altura: 0.0,
                    $data_nasc: '',
                    $sexo: "m",
                    $anamnese: {
                        $meta: 0.0,
                        $peso_perder: 0.0,
                        $peso_ganhar: 0.0,
                        $nivel_atividade: 0,
                        $geb: 0.0,
                        $_get: 0.0,
                        $cal_total: 0.0,
                    },
                    $admin: false,
                    $confirmado: false,
                    $etapa: 1
                }
        } */
        try {
            const dto = req.body;
            const usuario = await Usuario.findByPk(req.body.id);

            await usuario.update(dto);

            const anamnese = await Anamnese.findOne({ where: { usuarioId: dto.id } });

            await anamnese.update(dto.anamnese);

            if (usuario.data_nasc && usuario.peso && usuario.altura && usuario.sexo && typeof anamnese.nivel_atividade === 'number') {
                const idadeAnos = new Date().getFullYear() - new Date(usuario.data_nasc).getFullYear();

                switch (usuario.sexo) {
                    case 'm':
                        dto.anamnese.geb = (13.75 * usuario.peso) + (5 * usuario.altura) - (6.76 * idadeAnos) + 66.5;
                        break;
                    case 'f':
                        dto.anamnese.geb = (9.56 * usuario.peso) + (1.85 * usuario.altura) - (4.68 * idadeAnos) + 66.5;
                        break;
                }

                switch (anamnese.nivel_atividade) {
                    case 0:
                        dto.anamnese._get = dto.anamnese.geb * 1.2;
                        break;
                    case 1:
                        dto.anamnese._get = dto.anamnese.geb * 1.375;
                        break;
                    case 2:
                        dto.anamnese._get = dto.anamnese.geb * 1.55;
                        break;
                    case 3:
                        dto.anamnese._get = dto.anamnese.geb * 1.725;
                        break;
                }

                await anamnese.update(dto.anamnese);
            }

            res.send(defaultResponse(true, `O usuário foi alterado com sucesso`));
        } catch (error) {
            res.send(defaultResponse(false, error.toString()));
        }
    }
}

export default usuarioController;