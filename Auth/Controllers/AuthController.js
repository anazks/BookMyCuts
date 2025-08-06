const asyncHandler = require("express-async-handler");
const { registerUserUseCase,loginuserUsecause,registerShoperUseCase,loginShoperUsecause } = require("../UseCauses/userUseCause");
const decorder = require("../../TokenDecoder/Decoder");
const {getUserProfile} = require("../Repos/userRepo")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userRegistration = asyncHandler(async (req,res)=>{
    const data = req.body;
    const result = await registerUserUseCase(data);
    console.log(result,"user registartion")
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
    const shop = await registerShoperUseCase(data);
    res.json({
        success:true, 
        message:"User registration successfull",
        shop
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
const userModel = require('../Model/UserModel')
const getUsers = asyncHandler(async(req,res)=>{
    let users = await userModel.find({})
    res.json(users)
})

const getProfile = asyncHandler(async (req, res) => {
    let token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    } 
  try {
    let tokenData = await decorder(token);
    console.log(tokenData, "tokenData in getProfile");
    let userData = await getUserProfile(tokenData);
    res.json({
        success: true,
        message: "User profile fetched successfully",
        user: userData})
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
);
module.exports = {userRegistration,userLogin,ShopRegister,login,getUsers,getProfile}