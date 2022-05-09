import aguaController from '../controllers/agua.js';
import express from 'express';

const router = express.Router();

//adicionar_agua 
router.post("/adicionarAgua", aguaController.adicionarAgua);

export default router;