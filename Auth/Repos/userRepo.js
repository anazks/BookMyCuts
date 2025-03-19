const UserModel = require("../Model/UserModel")
const shoperModel = require('../Model/ShoperModel')
const asyncHandler = require("express-async-handler");

module.exports.createUser = asyncHandler(async (data)=>{
    return await UserModel.create(data);
})

module.exports.findUser = asyncHandler(async(data) => {
    let {email} = data;
    console.log(email, "email in rep####");
    return await UserModel.findOne({email: email});
});

module.exports.createShoper = asyncHandler(async (data)=>{
    return await shoperModel.create(data)
})
module.exports.findShoper = asyncHandler(async (data)=>{
    let {email}  = data;
    console.log(email,"email----------------------")
    return await shoperModel.findOne({email:email})
})