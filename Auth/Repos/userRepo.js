const UserModel = require("../Model/UserModel")
const shoperModel = require('../Model/ShoperModel')
const asyncHandler = require("express-async-handler");

module.exports.createUser = asyncHandler(async (data)=>{
    return await UserModel.create(data);
})

module.exports.findUser = asyncHandler(async(data)=>{
    let {mobileNo}  = data;
    return await UserModel.findOne({mobileNo:mobileNo})
})

module.exports.createShoper = asyncHandler(async (data)=>{
    return await shoperModel.create(data)
})
module.exports.findShoper = asyncHandler(async (data)=>{
    let {mobileNo}  = data;
    console.log(mobileNo,"mobile no")
    return await shoperModel.findOne({mobileNo:mobileNo})
})