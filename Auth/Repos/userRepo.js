const UserModel = require("../Model/UserModel")

module.exports.createUser = async (data)=>{
    return await UserModel.create(data);
}

module.exports.findUser = async(data)=>{
        let {mobileNo}  = data;
        return await UserModel.findOne({mobileNo:mobileNo})
}