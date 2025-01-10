const ShopModel = require('../Model/ShopModel');
module.exports.addShop = async (data) => {
    try {
        await ShopModel.create(data);
    } catch (error) {
        console.log(error);
    }
}