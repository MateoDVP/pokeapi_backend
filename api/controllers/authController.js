require('dotenv').config();
const jwt = require('jsonwebtoken');
const authService = require("../services/authService");

async function logIn(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: true, message: "Se requiere email y contraseña" });
        }

        const response = await authService.login(email, password);

        return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error en logIn:", error);
        return res.status(500).json({ error: true, message: "Error interno del servidor" });
    }
}


async function tokenValidation(req, res, next) {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(403).json({ error: true, message: "Token no incluido" });
		}

		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: true, message: "Token inválido o expirado" });
			}

			req.user = decoded.user;
			next();
		});
	} catch (error) {
		console.error("Error en tokenValidation:", error);
		return res.status(500).json({ error: true, message: "Error interno del servidor" });
	}
}

module.exports = {
	logIn,
	tokenValidation
}
