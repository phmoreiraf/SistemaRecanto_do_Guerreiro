const { Router } = require("express");
const router = new Router();
const reservasRoutes = require("./routes/reservasRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const gestaoRoutes = require("./routes/gestaoRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoute = require("./routes/authRoute");

router.use(reservasRoutes, clienteRoutes, gestaoRoutes, userRoutes, authRoute);

module.exports = router;