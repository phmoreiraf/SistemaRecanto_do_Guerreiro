const { Router } = require("express");
const router = new Router();
const cliente = require("../controllers/clienteController");
const verificacao = require("../requireAuth");

// Defina suas rotas
router.get("/", (req, res) => {
  res.send("Bem-vindo ao Recanto do Guerreiro!");
});

router.post("/cliente", verificacao, cliente.create);
router.get("/cliente", verificacao, cliente.index);
router.get("/filterIdCliente/:id", verificacao, cliente.filterIdCliente);
router.put("/clientePut/:id", verificacao, cliente.update);
router.delete("/cliente/:id", verificacao, cliente.delete);

module.exports = router;
