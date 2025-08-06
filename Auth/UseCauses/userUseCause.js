const { createUser,findUser,createShoper,findShoper } = require("../Repos/userRepo");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

const secretKey =  process.env.secretKey;


module.exports.registerUserUseCase = async (data)=>{
    let {password} = data ;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    data.password = hashedPassword;
    const user = await createUser(data);
    console.log(user,"user in usecase")
    return user;
}

module.exports.loginuserUsecause = async (data) => {
    let email = data.email;
    console.log(email, "email in usecause");
    // Problem: You're passing email directly, but findUser expects an object with email property
    let user = await findUser({email: email}); // Fix: Pass an object with email property
    // Check if user exists
    if (!user) {
        return {message: "User not found"};
    }
    
    let {password} = data;
    console.log(password, "---------", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return {message: "Invalid password",success:false}; // Password is incorrect
    }
    
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    let {firstName} = user;
    let {mobileNo} = user;
    let {city} = user;
    let userData = {
        firstName,
        mobileNo,
        city 
    };
    
    console.log(token);
    return {token, userData};
};

module.exports.registerShoperUseCase =asyncHandler (async(data)=>{
    let {password} = data ;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    data.password = hashedPassword;
    const shop = await createShoper(data);
    return shop;
})
module.exports.loginShoperUsecause = asyncHandler(async(data)=>{
    console.log(data,"data in usecase shoperlll")
    let user = await findShoper(data)
    let {password} = data;
    console.log(user,"shoper")
    console.log(data,"---------0000")
    if(!user){
        return {message:"Invalid Email"}
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password'); // Password is incorrect
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    let  {firstName} = user;
    let {mobileNo} = user;
    let {city} = user;
    let userData ={
            firstName,
            mobileNo,
            city 
    }
    console.log(token)
    return {token,userData}
})