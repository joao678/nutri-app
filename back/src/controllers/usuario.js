import bcrypt from 'bcrypt';
import enviarEmail from '../../email.js';
import defaultResponse from '../core/base.response.js';
import db from '../models/index.js';

const Usuario = db.usuarios;
const Anamnese = db.anamnese;
const AguaDiario = db.aguaDiario;
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
                `<a href="http://10.0.0.100:3000/confirmar-usuario/${usuarioEntidade.id}">Clique aqui para confirmar seu usuário</a>`,
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
            const usuario = await Usuario.findOne({
                where: { email: { [Op.like]: req.body.email } },
                //include: Anamnese
                include: [{
                    model: Anamnese,
                    include: AguaDiario
                }]
            });

            if (!usuario) throw "Usuário inexistente.";

            if (await bcrypt.compare(req.body.senha, usuario.senha)) {
                req.session.loggedin = true;
                req.session.usuarioId = usuario.id;
                req.session.username = req.body.email;
                req.session.save();

                /* const anamnese = await Anamnese.findOne({ where: { usuarioId: usuario.id } });
                const aguaDiario = await AguaDiario.findOne({ where: { anamneseId: anamnese.id } });  */

                /* usuario.agua_diario = {
                    quantidade: aguaDiario.quantidade
                }; */

                return res.send(defaultResponse(true, "Logado com sucesso!!!", usuario));
            }

            res.send(defaultResponse(false, "Senha incorreta", {}));
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
                        $get: 0.0,
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

            res.send(defaultResponse(true, `O usuário foi alterado com sucesso`));
        } catch(error) {
            res.send(defaultResponse(false, error.toString()));
        }
    }
}

export default usuarioController;

// findAll: function (req, res) {
//     /* 	#swagger.tags = ['Usuário'] */
//     const nome = req.query.nome;
//     var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

//     Marca.findAll({ where: condition }).then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occurred while retrieving Pessoas."
//         });
//     });
// },

// findOne: function (req, res) {
//     /* 	#swagger.tags = ['Usuário'] */
//     const id = req.params.id;

//     Marca.findByPk(id)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving Pessoa with id=" + id
//             });
//         });
// },

// update: function (req, res) {
//     /* 	#swagger.tags = ['Usuário'] */
//     const id = req.params.id;

//     Marca.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Pessoa was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Pessoa with id=${id}. Maybe Pessoa was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Pessoa with id=" + id
//             });
//         });
// },

// delete: function (req, res) {
//     /* 	#swagger.tags = ['Usuário'] */
//     const id = req.params.id;

//     Marca.destroy({
//         where: { id: id }
//     }).then(num => {
//         if (num == 1) {
//             res.send({
//                 message: "Pessoa was deleted successfully!"
//             });
//         } else {
//             res.send({
//                 message: `Cannot delete Pessoa with id=${id}. Maybe Pessoa was not found!`
//             });
//         }
//     }).catch(err => {
//         res.status(500).send({
//             message: "Could not delete Pessoa with id=" + id
//         });
//     });
// },

// deleteAll: function (req, res) {
//     /* 	#swagger.tags = ['Usuário'] */
//     Marca.destroy({
//         where: {},
//         truncate: false
//     }).then(nums => {
//         res.send({ message: `${nums} Pessoas were deleted successfully!` });
//     }).catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occurred while removing all Pessoas."
//         });
//     });
// }