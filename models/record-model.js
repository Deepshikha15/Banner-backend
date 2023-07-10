const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Records = new Schema(
    {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        
        time: { type: [String] },
        age: { type: Number, required: true },
    

        // height:{type: String},
        // weight:{type: String}

       name: { type: String }
        
    },
    { timestamps: true },
)

const Record = mongoose.model('records', Records)

module.exports = Record;