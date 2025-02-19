const { createUser,findUser } = require("../Repos/userRepo");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
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
    let user = await findUser(data)
    let {password} = data;
    console.log(data,"---------")
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
}