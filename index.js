const express = require("express");
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const connectToDB = require("./database/main")
const characterRouter = require("./routes/character")
dotenv.config()


app.use(express.json())
app.use(cors())

app.use("/characters",characterRouter)

app.use(function(req,res){
    res.status(404).json("page not found")
})

const PORT = 3000

async function start() {
    try {
        await connectToDB(process.env.DATABASE_URI)
        app.listen(3000,function() {
            console.log(`coonected to ${PORT}`)
        })
    } catch (err) {
        console.log(`error happened : ${err}`)
    }
}

start()
