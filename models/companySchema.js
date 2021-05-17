const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: String,
    desc: String,
    slug: {
        type: String,
        unique: true
    },
    date: Date,
    Eligibility: {
        MinTenPerc: Number,
        MinTwePerc: Number,
        MinBack: Number,
        MinBCGPA: Number,
        MinMCGPA: Number,
        MinYearGap: Number,
    },
    requiredFields: [String],
    data: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Database"
        },
    ]
})

module.exports = mongoose.model("Company", companySchema)
