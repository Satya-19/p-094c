const mongoose = require('mongoose')

const PlacementSchema = new mongoose.Schema({
    Email: String,
    Name: String,
    RegdNo: Number,
    Branch: String,
    ContactNo: Number,
    DOB: String,
    Gender: String,
    Category: String,
    PhyCha: String,
    TenPercentage: Number,
    TenMarksheet: String,
    TenBoard: String,
    YOPTen: Number,
    TwelvePercentage: String,
    TwelveMarksheet: String,
    TwelveBoard: String,
    YOPTwelve: String,
    DiplomaPercentage: String,
    DiplomaMarksheet: String,
    DiplomaBoard: String,
    YOPDiploma: String,
    YOP: Number,
    Degree: String,
    SGPA1: {
        type: Number,
        default: 0
    },
    SGPA2: {
        type: Number,
        default: 0
    },
    SGPA3: {
        type: Number,
        default: 0
    },
    SGPA4: {
        type: Number,
        default: 0
    },
    SGPA5: {
        type: Number,
        default: 0
    },
    SGPA6: {
        type: Number,
        default: 0
    },
    SGPA7: {
        type: Number,
        default: 0
    },
    SGPA8: {
        type: Number,
        default: 0
    },
    BCGPA: Number,
    MCGPA: Number,
    Honours: String,
    Backlogs: Number,
    YearGap: Number,
    PresentAddress: String,
    PermanentAddress: String,
    FatherName: String,
    FatherOccupation: String,
    FatherCN: Number,
    MotherName: String,
    MotherOccupation: String,
    MotherCN: Number,
    "Elder Brother/Sister's Name (if any)": String,
    "Elder Brother/Sister's Current Occupation": String,
    "Certified Courses Done (if any)": String,
    "Training Undertaken (if any)": String,
    "Training Certificates (if Any)": String,
    Aadhar: String,
    PAN: String,
    DL: String,
})

module.exports = mongoose.model("Database", PlacementSchema, "Database")