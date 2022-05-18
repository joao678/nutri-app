import express from 'express';
import exercicioController from '../controllers/exercicio.js';

const router = express.Router();

//recuperarExercicios 
router.get("/recuperarExercicios", exercicioController.recuperarExercicios);

//adicionarExercicio
router.post("/adicionarExercicio", exercicioController.adicionarExercicio);

export default router;