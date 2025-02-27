const UserModel = require("../Model/UserModel")
const shoperModel = require('../Model/ShoperModel')
const asyncHandler = require("express-async-handler");

module.exports.createUser = asyncHandler(async (data)=>{
    return await UserModel.create(data);
})

module.exports.findUser = asyncHandler(async(data)=>{
    let {email}  = data;
    return await UserModel.findOne({email:email})
})

module.exports.createShoper = asyncHandler(async (data)=>{
    return await shoperModel.create(data)
})
module.exports.findShoper = asyncHandler(async (data)=>{
    let {email}  = data;
    console.log(email,"mobile no")
    return await shoperModel.findOne({email:email})
})