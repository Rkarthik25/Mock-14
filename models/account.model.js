const mongoose=require("mongoose")
const accountSchema= mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    initialBalance:{
        type:Number,
        required:true
    },
    adharNo:{
        type:Number,
        required:true
    },
    panNo:{
        type:String,
        required:true
    },
    statement:[],


})

const accountModel= mongoose.model("account",accountSchema)

module.exports={accountModel}
