const mongoose = require("mongoose")

const CharacterSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    level : {
        type : Number,
        required : true,
    },
})

const CharacterModel = mongoose.model("characters",CharacterSchema)

module.exports = CharacterModel