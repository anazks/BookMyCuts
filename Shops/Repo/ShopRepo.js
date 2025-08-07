const ShopModel = require('../Model/ShopModel');
const ServiceModel = require('../Model/ServiceModel');
const BarberModel = require('../Model/BarbarModel');
const BookingModel = require('../../Booking/Models/BookingModel')

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
module.exports.getAShop = async(shopOwnerId)=>{
    try {
        return await ShopModel.find({ShopOwnerId:shopOwnerId})
    } catch (error) {
        console.log(error)
    }
}
module.exports.getMyService = async(id)=>{
    try {
        return await ServiceModel.find({shopId:id})
    } catch (error) {
        console.log(error)
        res.json(false)   
    }
}
module.exports.getMyBarbers = async(id)=>{
    try {
        return await BarberModel.find({shopId:id})
    } catch (error) {
        console.log(error)
        res.json(false)   
    }
}


module.exports.getAllBookingsOfShop = async (id) => {
    try {
        return await BookingModel.find({shopId:id})
    } catch (error) {
        console.error(error)

module.exports.getShopUser = async (shopId) => {
    try {
        return await ShopModel.findById({_id:shopId});
    } catch (error) {
        console.log(error);
        return null;

    }
}