const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: String,
    desc: String,
    slug: {
        type: String,
        unique: true
    },
    date: Date,
    type: String,
    Eligibility: {
        MinTenPerc: Number,
        MinTwePerc: Number,
        MinBack: Number,
        MinBCGPA: Number,
        MinMCGPA: Number,
        MinYearGap: Number,
    },
    Eldegree: [String],
    Bbranch: [String],
    Mbranch: [String],
    requiredFields: [String],
    data: [Number]
})

module.exports = mongoose.model("Company", companySchema)
