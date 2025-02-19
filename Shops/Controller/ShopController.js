const asyncHandler = require("express-async-handler");
const {addShop,viewAllShops,addServices,viewAllServices,addBarbers,viewAllBarbers,getAShop} = require('../Repo/ShopRepo')
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
const addBarber = asyncHandler(async (req,res)=>{
    const data = req.body;
    console.log(data,"data")
    let addBarber = await  addBarbers(data)
    console.log(addBarber,"shopAdded")
    if(addBarber){
        res.json({
            success:true,
            message:"Barber added successfully",
            data:addBarber
        })
    }else{
        res.json({
            success:false,
            message:"Barber not added",
        })}
})
const ViewAllBarbers = asyncHandler(async (req,res)=>{
    let allBarber = await  viewAllBarbers()
    if(allBarber){
        res.json({
            success:true,
            message:"All Barbers",
            data:allBarber
        })
    }else{
        res.json({
            success:false,
            message:"No Barbers Found",
        })
    }
})
const viewSigleShop = asyncHandler(async(req,res)=>{
    let id = req.body.id
    let singleShop = await getAShop(id)
    res.json({
        success:true,
        message:"Single shop",
        data:singleShop
    })

})
module.exports = {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop}