const asyncHandler = require("express-async-handler");
const { registerUserUseCase,loginuserUsecause,registerShoperUseCase,loginShoperUsecause } = require("../UseCauses/userUseCause");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userRegistration = asyncHandler(async (req,res)=>{
    const data = req.body;
    const result = await registerUserUseCase(data);
    res.json({
        success:true,
        message:"User registration successfull",
        result
    })
});
 
const userLogin = asyncHandler(async (req,res)=>{
        const data = req.body;
        console.log(data,"data")
        const user = await loginuserUsecause(data)
        console.log(user,"token")
        res.json({
            success:true,
            message:"login Data",
            result:user
        })
})
const ShopRegister = asyncHandler (async (req,res)=>{
    const data = req.body;
    console.log(data)
    const result = await registerShoperUseCase(data);
    res.json({
        success:true,
        message:"User registration successfull",
        result
    })
})
const login = asyncHandler(async(req,res)=>{
    const data = req.body;
    console.log(data,"data")
    const user = await loginShoperUsecause(data)
    console.log(user,"token")
    res.json({
        success:true,
        message:"login Data",
        result:user
    })
})
module.exports = {userRegistration,userLogin,ShopRegister,login}