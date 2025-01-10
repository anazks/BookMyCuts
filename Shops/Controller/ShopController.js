const asyncHandler = require("express-async-handler");
const {addShop} = require('../Repo/ShopRepo')
const AddShop = asyncHandler(async (req,res)=>{
    const data = req.body;
    console.log(data,"data")
     let shopAdded = await  addShop(data)
     console.log(shopAdded,"shopAdded")
    res.json({
        success:true,
        message:"Shop added successfully",
        data
    })
})

module.exports = {AddShop}