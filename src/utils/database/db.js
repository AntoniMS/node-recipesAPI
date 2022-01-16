const mongoose = require('mongoose');
require('dotenv').config()

const urlDb = process.env.MONGO_DB

const connectDb = async () => {
    try {
        const db = await mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })
        const { name, host } = db.connection
        console.log(name)
        console.log(`Connected with DB 🥗🥩🍗🍔🍕 name: ${name} in host: ${host}`)
    } catch (error) {
        console.error('Error to connect with DB', error);
    }
}

module.exports = { connectDb }