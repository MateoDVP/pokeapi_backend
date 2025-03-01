const userService = require("../services/userService");

async function createUser(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: true, message: "Todos los campos son obligatorios" });
        }

        const result = await userService.createUser(email, password, name);
        return res.status(result.status).json(result.response);
    } catch (error) {
        console.error("Error en userController.createUser:", error);
        return res.status(500).json({ error: true, message: "Error interno del servidor" });
    }
}

module.exports = {
    createUser
};
