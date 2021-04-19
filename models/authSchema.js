const mongoose = require('mongoose'),
      localmongoose = require('passport-local-mongoose')

const authSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { 
        type: String, 
        default: 'student' 
    }
})

authSchema.plugin(localmongoose)

module.exports = mongoose.model("Users", authSchema)

