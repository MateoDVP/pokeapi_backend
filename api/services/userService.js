const bcrypt = require("bcrypt");
const { sh_user } = require("../models");

async function createUser(email, password, name) {
	try {
		// Validaciones
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return { status: 400, response: { error: true, message: "El email no es válido" } };
		}

		if (password.length < 6) {
			return { status: 400, response: { error: true, message: "La contraseña debe tener al menos 6 caracteres" } };
		}

		if (name.length < 3) {
			return { status: 400, response: { error: true, message: "El nombre debe tener al menos 3 caracteres" } };
		}

		const existingUser = await sh_user.findOne({ email });
		if (existingUser) {
			return { status: 400, response: { error: true, message: "El email ya está en uso" } };
		}

		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

		const newUser = new sh_user({
			email,
			password: hashedPassword,
			name
		});

		await newUser.save();

		return {
			status: 201,
			response: {
				error: false,
				message: "Usuario creado exitosamente",
				data: { email: newUser.email, name: newUser.name }
			}
		};
	} catch (error) {
		console.error("Error en userService.createUser:", error);
		return { status: 500, response: { error: true, message: "Error interno del servidor" } };
	}
}

module.exports = {
	createUser
};
