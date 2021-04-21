const mongoose = require('mongoose'),
      localmongoose = require('passport-local-mongoose')

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: String,
    password: String,
    active: {
        type: Boolean,
        default: false
    },
    role: { 
        type: String, 
        default: 'student' 
    }
})

authSchema.plugin(localmongoose)

module.exports = mongoose.model("Users", authSchema)

