const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    r_id: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        expires: 86400000,
        default: Date.now
    }
})

module.exports = mongoose.model('resetRequest', requestSchema)
