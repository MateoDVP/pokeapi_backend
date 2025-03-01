const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    types: [{ type: String, required: true }],
    stats: {
        attack: Number,
        special_attack: Number,
        defense: Number,
        special_defense: Number,
        speed: Number
    }
});


module.exports = mongoose.model("Pokemon", PokemonSchema);
