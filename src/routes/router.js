const express = require("express");
const {cadastrarUsuario, login} = require("../controller/usuario")
const {cadastrarTarefa, atualizarTarefa, deletarTarefa, listarTarefa, detalharTarefas} = require("../controller/todos");
const verificaLogin = require("../middleware/verificaLogin")
const router = express.Router()

router.post("/cadastro", cadastrarUsuario);
router.post("/login", login)

router.use(verificaLogin);

router.post("/cadastrarTarefa", cadastrarTarefa),
router.put("/atualizarTarefa/:id", atualizarTarefa)
router.get("/listarTarefa", listarTarefa)
router.get("/detalharTarefa/:id", detalharTarefas)
router.delete("/deletarTarefa/:id", deletarTarefa)

module.exports = router