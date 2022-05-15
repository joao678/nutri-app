import express from 'express';
import exercicioController from '../controllers/exercicio.js';

const router = express.Router();

//adicionar_agua 
router.get("/recuperarExercicios", exercicioController.recuperarExercicios);

//adicionar_exercicio
router.post("/adicionarExercicio", exercicioController.adicionarExercicio);

export default router;