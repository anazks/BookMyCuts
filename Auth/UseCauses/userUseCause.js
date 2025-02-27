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
    await createUser(data);
    return true;
}

module.exports.loginuserUsecause = async (data)=>{
    let email = data.email;
    console.log(email,"email in usecause")
    let user = await findUser(email)
    let {password} = data;
    console.log(password,"---------",user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
         return  {message:"Invalid password"}
        // throw new Error('Invalid password'); // Password is incorrect
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
}
module.exports.registerShoperUseCase =asyncHandler (async(data)=>{
    let {password} = data ;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    data.password = hashedPassword;
    await createShoper(data);
    return true;
})
module.exports.loginShoperUsecause = asyncHandler(async(data)=>{
    let user = await findShoper(data)
    let {password} = data;
    console.log(user,"shoper")
    console.log(data,"---------0000")
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