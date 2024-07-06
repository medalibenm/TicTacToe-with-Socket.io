const express = require("express")
const router = express.Router()
const CharacterModel = require("../database/models/character")

router.get("/",async function(req,res){
    const data = await CharacterModel.find({})
    res.json(data)
})

router.post("/", async function(req,res){
    const name = req.body.name
    const level = req.body.level

    if (!name || !level) {
        res.json("name or level required")
    } 

    await CharacterModel.create({
        name,
        level
    })
    res.json(`${name} created  succesfully`)
})

router.put("/:id", async function(req,res){
    const id = req.params.id
    const name = req.body.name
    const level = req.body.level

    try {
        const updatedCharacter = await CharacterModel.findByIdAndUpdate(id,{name,level})

         // TO DO : dir condition t3  id not found
      
          res.json(updatedCharacter);
    } catch(e) {
        res.status(500).json(`error : ${e}`);
    }
})

router.delete("/:id",async function(req,res){
    const id = req.params.id

    try {
        await CharacterModel.findByIdAndDelete(id)

      // TO DO : dir condition t3  id not found

          res.json("character deleted");
    } catch(e) {
        console.log(`error : ${e}`)
    }
})



module.exports = router