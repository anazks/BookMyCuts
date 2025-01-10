const asyncHandler = require("express-async-handler");
const {addShop,viewAllShops,addServices,viewAllServices} = require('../Repo/ShopRepo')
const AddShop = asyncHandler(async (req,res)=>{
    const data = req.body;
    console.log(data,"data")
     let shopAdded = await  addShop(data)
     console.log(shopAdded,"shopAdded")
     if(shopAdded){
            res.json({
                success:true,
                message:"Shop added successfully",
                data:shopAdded
            })
     }else{
        res.json({
            success:false,
            message:"Shop not added",
     })}
})
const ViewAllShop = asyncHandler(async (req,res)=>{
    let allShops = await  viewAllShops()
    if(allShops){
        res.json({
            success:true,
            message:"All Shops",
            data:allShops
        })
    }else{
        res.json({
            success:false,
            message:"No Shop Found",
        })
    }
})
const addService = asyncHandler(async (req,res)=>{
    const data = req.body;
    console.log(data,"data")
    let addServicess = await  addServices(data)
    console.log(addServicess,"shopAdded")
    if(addServicess){
        res.json({
            success:true,
            message:"Services added successfully",
            data:addServicess
        })
    }else{
        res.json({
            success:false,
            message:"Services not added",
        })}
})
const ViewAllServices = asyncHandler(async (req,res)=>{
    let allService = await  viewAllServices()
    if(allService){
        res.json({
            success:true,
            message:"All Services",
            data:allService
        })
    }else{
        res.json({
            success:false,
            message:"No Services Found",
        })
    }
})
module.exports = {AddShop,ViewAllShop,addService,ViewAllServices}