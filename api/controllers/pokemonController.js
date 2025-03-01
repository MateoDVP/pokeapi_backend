const pokemonService = require("../services/pokemonService");

const getAllPokemons = async (req, res) => {
    try {
      const pokemons = await pokemonService.getAllPokemons();
      res.json({ error: false, data: pokemons });
    } catch (error) {
      res.status(500).json({ error: true, message: "Error al obtener los Pokemon" });
    }
  };

async function getPokemonByName(req, res) {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json({ error: true, message: "Se requiere un nombre de Pokemon" });
        }

        const result = await pokemonService.getPokemonByName(name.toLowerCase());
        if (result.error) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en getPokemonByName:", error);
        return res.status(500).json({ error: true, message: "Error interno del servidor" });
    }
}

async function getPokemonById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: true, message: "Se requiere un ID de Pokemon" });
        }

        const result = await pokemonService.getPokemonById(id);
        if (result.error) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error en getPokemonById:", error);
        return res.status(500).json({ error: true, message: "Error interno del servidor" });
    }
}

module.exports = { 
    getPokemonByName,
    getPokemonById,
    getAllPokemons
};