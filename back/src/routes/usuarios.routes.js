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

//restricted_func
router.get("/restricted_func", usuarioController.restricted_func);

//read
// router.get("/", usuarioController.findAll);
// router.get("/:id", usuarioController.findOne);

// //update
// router.put("/:id", usuarioController.update);

// //delete
// router.delete("/:id", usuarioController.delete);
// router.delete("/", usuarioController.deleteAll);

export default router;