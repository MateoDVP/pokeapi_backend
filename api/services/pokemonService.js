const axios = require("axios");
const Pokemon = require("../models/pokemon");
require("dotenv").config();

async function getAllPokemons() {
    try {
        const pokemons = await Pokemon.find();

        if (!pokemons || pokemons.length === 0) {
            return {
                error: false,
                message: 'No se encontraron Pokemon.',
                status: 200, 
                data: [],
            };
        }

        console.log(`Se encontraron ${pokemons.length} Pokemon.`);
        return {
            error: false,
            message: 'Pokemon encontrados exitosamente.',
            status: 200,
            data: pokemons,
        };
    } catch (error) {
        console.error('Error al obtener los Pokemon:', error);
        return {
            error: true,
            message: 'Error al obtener los Pokemon.',
            status: 500, 
            data: null,
        };
    }
}

async function getPokemonByName(name) {
    try {
        let pokemon = await Pokemon.findOne({ name });

        if (!pokemon) {
            const response = await axios.get(`${process.env.POKEAPI_URL}/pokemon/${name}`).catch(err => err.response);
            if (!response || response.status === 404) {
                return { error: true, message: "Pokemon no encontrado" };
            }
            
            const data = response.data;
            pokemon = new Pokemon({
                name: data.name,
                id: data.id,
                types: data.types.map(t => t.type.name),
                stats: {
                    attack: data.stats[1].base_stat,
                    special_attack: data.stats[3].base_stat,
                    defense: data.stats[2].base_stat,
                    special_defense: data.stats[4].base_stat,
                    speed: data.stats[5].base_stat
                }
            });
            await pokemon.save();
        }
        return { error: false, data: pokemon };
    } catch (error) {
        console.error("Error en getPokemonByName:", error);
        return { error: true, message: "Error al obtener información del Pokemon" };
    }
}

async function getPokemonById(id) {
    try {
        let pokemon = await Pokemon.findOne({ id });

        if (!pokemon) {
            const response = await axios.get(`${process.env.POKEAPI_URL}/pokemon/${id}`).catch(err => err.response);
            if (!response || response.status === 404) {
                return { error: true, message: "El Pokemon no existe" };
            }
            
            const data = response.data;
            pokemon = new Pokemon({
                name: data.name,
                id: data.id,
                types: data.types.map(t => t.type.name),
                stats: {
                    attack: data.stats[1].base_stat,
                    special_attack: data.stats[3].base_stat,
                    defense: data.stats[2].base_stat,
                    special_defense: data.stats[4].base_stat,
                    speed: data.stats[5].base_stat
                }
            });
            await pokemon.save();
        }
        return { error: false, data: pokemon };
    } catch (error) {
        console.error("Error en getPokemonById:", error);
        return { error: true, message: "Error al obtener información del Pokemon" };
    }
}

module.exports = { getPokemonByName, getPokemonById, getAllPokemons};