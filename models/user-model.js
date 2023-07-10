// const { TramOutlined } = require('@material-ui/icons')
const mongoose = require('mongoose')

const newSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
    
},{
    timestamps:true
});

const collection = mongoose.model("collection", newSchema)
module.exports= collection;