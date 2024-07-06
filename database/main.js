const mongoose = require("mongoose")

async function connectToDB(url) {
    await mongoose.connect(url,{
        dbName: "X-O"
    })
    console.log("DATABASE CONNECTED SUCCESFULLY")
}

module.exports = connectToDB