// middleware/requireAuth.js
const jwt = require("jsonwebtoken");

// Middleware para verificar o token de autenticação
function verificarAutenticacao(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  jwt.verify(token, "suaChaveSecreta", (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido." });
    }

    // Adicione informações do usuário ao objeto de solicitação para uso posterior
    req.usuario = decoded;
    next();
  });
}

module.exports = verificarAutenticacao;
