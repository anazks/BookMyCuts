const mongoose = require('mongoose')
const ShoperModel = require('../../Auth/Model/ShoperModel')

const BankDetailsShema = mongoose.Schema({
    ShoperId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ShoperModel',
        required:true
    },
    BankName:{
        type:String,
        required:true
    },
    BranchName:{
        type:String,
        required:true
    },
    AccountHolderName:{
        type:String,
        required:true
    },
    AccountNumber:{
        type:String,
        required:true,
        trim:true
    },
    ifceCode:{
        type:String,
        required:true,
        trim:true
    },
    AccountType:{
        type:String,
        enum:["savings","current","other"]
    }

},{timeStamp:true})

const BankDetailsModel = mongoose.model("BankDetails",BankDetailsShema)

module.exports = BankDetailsModel