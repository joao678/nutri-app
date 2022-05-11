import usuarioController from '../controllers/usuario.js';
import express from 'express';

const router = express.Router();

//create 
router.post("/create", usuarioController.create);

//login 
router.post("/login", usuarioController.login);

//logout
router.post("/logout", usuarioController.logout);

//recuperarSenha
router.post("/recuperar-senha", usuarioController.recuperarSenha);

//alterarSenha
router.post("/alterar-senha", usuarioController.alterarSenha);

//confirmar
router.post("/confirmar", usuarioController.confirmar);

//alterarUsuario
router.post("/:id/alterar", usuarioController.alterarUsuario);

export default router;