import usuarioController from '../controllers/usuario.controller.js';
import express from 'express';

const router = express.Router();

//create 
router.post("/", usuarioController.create);

//login 
router.post("/login", usuarioController.login);

//logout
router.post("/logout", usuarioController.logout);

//restricted_func
router.get("/restricted_func", usuarioController.restricted_func);

// //read
// router.get("/", usuarioController.findAll);
// router.get("/:id", usuarioController.findOne);

// //update
// router.put("/:id", usuarioController.update);

// //delete
// router.delete("/:id", usuarioController.delete);
// router.delete("/", usuarioController.deleteAll);

export default router;