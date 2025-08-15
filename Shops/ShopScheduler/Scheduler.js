const ShopModel = require("../Model/ShopModel")

const checkExpiredPremium = async () => {
    try {
    
       const  expiredPremiumShops = await ShopModel.updateMany({ 
                                    PremiumEndDate:{$lt: new Date()},
                                    IsPremium:true 
                                },
                                    {
                                        $Set:{IsPremium:false}
                                    });
        console.log("expired premium shops:",expiredPremiumShops)
       return expiredPremiumShops
    } catch (error) {
       console.error(error) 
    }
}

module.exports = checkExpiredPremium;