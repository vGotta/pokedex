import mongoose from 'mongoose'

/******** SCHEMA A RESPECTER POUR CREER UN UTILISATEUR **********/


const pokeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "pas de Nom"]
    },
    LVL: {
        type: Number,
        required: [true, "Pas de lvl"]
    },
    type: {
        type: String,
        required: [true, "pas de type"]
    },
    trainer: {
        type:String,
    required: [true, "pas d'eleveur"]
}
})

const pokeModel = mongoose.model('pokemon', pokeSchema)
export default pokeModel