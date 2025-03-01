const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sh_user } = require('../models'); // modelo


async function validateUser(email, password) {
	try {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return { error: true, message: "Formato de email inválido" };
		}

		const user = await sh_user.findOne({ email });

		if (!user) {
			return { error: true, message: "Credenciales incorrectas" };
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return { error: true, message: "Credenciales incorrectas" };
		}

		return {
			error: false,
			user: {
				_id: user._id,
				email: user.email,
				type: user.type
			}
		};
	} catch (error) {
		console.error("Error en validateUser:", error);
		return { error: true, message: "Error al validar credenciales" };
	}
}

async function login(email, password) {
    const validation = await validateUser(email, password);

    if (validation.error) {
        return { 
            error: true, 
            message: validation.message, 
            status: 400
        };
    }
    const token = jwt.sign({ user: validation.user }, process.env.SECRET, { expiresIn: process.env.EXP });

    return { 
        error: false, 
        message: "Inicio de sesión exitoso", 
        status: 200, 
        data: { token, user: validation.user } 
    };
}

module.exports = {
	login
};
