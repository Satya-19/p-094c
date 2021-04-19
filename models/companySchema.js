const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: String,
    desc: String,
    slug: {
        type: String,
        unique: true
    },
    date: Date,
    requiredFields: [String],
    data: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Database"
        },
    ]
})

module.exports = mongoose.model("Company", companySchema)
