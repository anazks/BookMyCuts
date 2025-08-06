const UserModel = require("../Model/UserModel")
const shoperModel = require('../Model/ShoperModel')
const asyncHandler = require("express-async-handler");

module.exports.createUser = asyncHandler(async (data)=>{
    try {
        console.log("saving user now")
        const user = await UserModel.create(data);
        console.log('user saved successful')
        return user
    } catch (error) { 
        console.error(error)
    }
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