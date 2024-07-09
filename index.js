const express = require("express");
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const connectToDB = require("./database/main")
const characterRouter = require("./routes/character")
const io = require("socket.io")(8080, {
    cors : {
        origin : "http://127.0.0.1:5501",
    }
})
dotenv.config()


app.use(express.json())
app.use(cors({
    origin: "http://127.0.0.1:5501", 
}));

app.use("/characters",characterRouter)

app.use(function(req,res){
    res.status(404).json("page not found")
})


io.on('connection', (socket) => {
    console.log('test')
    socket.on('click', (data)=> {
        socket.broadcast.emit('move',{index:data.index,player:data.player})
    })
    socket.on('restart', () => {
        io.emit('restart');
      });
    
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

