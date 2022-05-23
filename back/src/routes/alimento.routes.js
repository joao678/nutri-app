import express from 'express';
import alimentoController from '../controllers/alimento.js';

const router = express.Router();

//adicionarAlimento
router.post("/adicionarAlimento", alimentoController.adicionarAlimento);

export default router;