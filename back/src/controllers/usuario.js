import db from '../models/index.js';
import baseController from '../core/base.controller.js';
import defaultResponse from '../core/base.response.js';
import bcrypt from 'bcrypt';

const Usuario = db.usuarios;
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
            const usuario = {
                email: req.body.email,
                senha: senhaCriptografada
            }

            const retorno = await baseController.create(usuario, res, Usuario);

            res.send(defaultResponse(true, "Usuário criado com sucesso", retorno));
        } catch (error) {
            
            res.send(defaultResponse(false, error));
        }
    },

    login: async function(req, res) {
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
                where: { email: { [Op.like]: req.body.email } }
            });
            
            if(!usuario) throw "Usuário inexistente.";

            if(await bcrypt.compare(req.body.senha, usuario.senha)){
                req.session.loggedin = true;
				req.session.username = req.body.email;
                req.session.save();

                return res.send(defaultResponse(true, "Logado com sucesso!!!", usuario));
            }

            res.send(defaultResponse(false, "Senha incorreta", {}));
        } catch (error) {
            res.send(defaultResponse(false, error));
        }
    },

    logout: function(req, res) {
        /* #swagger.tags = ['Usuário'] */
        if (!req.session.loggedin) return res.send(defaultResponse(false, "Primeiro efetue um login."));
        
        req.session.loggedin = false;
        req.session.username = null;
        req.session.destroy();

        res.send(defaultResponse(true, "Usuário deslogado com sucesso"));
    },

    restricted_func: function(req,res) {
        /* #swagger.tags = ['Usuário'] */
        if (req.session.loggedin)
            return res.send(defaultResponse(true, `O usuário ${req.session.username} está logado.`));
        
        return res.send(defaultResponse(false, `O usuário não pode acessar este conteúdo`));
    }

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
}

export default usuarioController;