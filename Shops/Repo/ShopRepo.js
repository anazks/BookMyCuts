const ShopModel = require('../Model/ShopModel');
const ServiceModel = require('../Model/ServiceModel');
const BarberModel = require('../Model/BarbarModel');
module.exports.addShop = async (data) => {
    try {
       return await ShopModel.create(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports.viewAllShops = async () => {
    try {
        return await ShopModel.find();
    } catch (error) {
        console.log(error);
    }
}

module.exports.addServices = async (data) => {
        try {
           return  await  ServiceModel.create(data); 
        } catch (error) {
            console.log(error);
        }
}
module.exports.viewAllServices = async () => {
    try {
       return await ServiceModel.find(); 
    } catch (error) {
        console.log(error);
    }
}
module.exports.addBarbers = async (data) => {
    try {
        return await BarberModel.create(data);
    } catch (error) {
        console.log(error);   
    }
}
module.exports.viewAllBarbers = async () => {
    try {
        return await BarberModel.find();
    } catch (error) {
        console.log(error);
    }
}
module.exports.getAShop = async(id)=>{
    try {
        return await ShopModel.find({_id:id})
    } catch (error) {
        console.log(error)
    }
}