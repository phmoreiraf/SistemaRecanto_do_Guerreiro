const { Router } = require("express");
const router = new Router();
const gestao = require("../controllers/gestaoController");
const verificacao = require("../requireAuth");
// Defina suas rotas
router.get("/", (req, res) => {
  res.send("Bem-vindo ao Recanto do Guerreiro!");
});
router.post("/gestao", verificacao, gestao.create);
router.get("/gestao", verificacao, gestao.index);
router.get("/filterIdGestao/:id", verificacao, gestao.filterIdGestao);
router.put("/gestaoPut/:id", verificacao, gestao.update);
router.delete("/gestao/:id", verificacao, gestao.delete);

module.exports = router;
