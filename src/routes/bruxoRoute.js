import { Router } from "express";
import * as BruxoController from "./../controllers/bruxoController.js";

const router = Router();

// Rota GetAll em /
router.get("/", BruxoController.listarTodos);
// Rota GetById
router.get("/:id", BruxoController.listarUm);
//Rota Create
router.post("/", BruxoController.criar);

export default router;
