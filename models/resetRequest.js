const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    r_id: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('resetRequest', requestSchema)